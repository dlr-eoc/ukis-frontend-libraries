import { Feature } from 'ol';
import { FrameState } from 'ol/PluggableMap';
import LayerRenderer from 'ol/renderer/Layer';
import VectorLayer from 'ol/layer/Vector';
import Point from 'ol/geom/Point';
import { Vector as VectorSource } from 'ol/source';
import Delaunator from 'delaunator';
import { Shader, Program, Attribute, Uniform, flattenMatrix, pointDistance,
    Texture, Framebuffer, getCurrentFramebuffersPixels, Matrix, rectangleA,
    Index, identity, matrixVectorProduct } from '@dlr-eoc/utils-maps';
import { Coordinate } from 'ol/coordinate';
import { FeatureLike } from 'ol/Feature';
import { Layer } from 'ol/layer';
import RenderFeature from 'ol/render/Feature';


export interface ColorRamp {
    [key: number]: [number, number, number];
}

export interface InterpolationLayerOptions {
    source: VectorSource<Point>;
    /** Max length of delaunay-triangle-edges. To prevent concave shapes to be filled by superfluous triangles. */
    maxEdgeLength: number;
    /** Power for inverse distance weighting */
    distanceWeightingPower: number;
    /** key = value, value = color[RGB] */
    colorRamp: ColorRamp;
    /** Should color-ramp be interpolated? */
    smooth: boolean;
    /** Should labels be displayed over datapoints? */
    showLabels: boolean;
    /** Under which feature-property do we find the value to be interpolated? */
    valueProperty: string;
    [key: string]: any;
}


export class InterpolationLayer extends VectorLayer {

    readonly options: InterpolationLayerOptions;

    constructor(options: InterpolationLayerOptions) {
        super(options);
        this.options = options;
    }

    createRenderer(): InterpolationRenderer {
        return new InterpolationRenderer(this, this.options.maxEdgeLength, this.options.distanceWeightingPower, this.options.colorRamp, this.options.smooth, this.options.valueProperty, this.options.showLabels);
    }

    updateParas(power: number, smooth: boolean, colorRamp: ColorRamp, showLabels: boolean): void {
        (super.getRenderer() as InterpolationRenderer).setParas(power, smooth, colorRamp, showLabels);
    }
}

/**
 * This renderer runs three shaders in a row.
 *  1. interpolationShader: takes every observation at every pixel and executes the interpolation. The values are stored in `valueFb`.
 *  2. colorizationShader: uses the interpolated values from valueFb to apply the colorization according to the given colorRamp and smoothing-options.
 *  3. arrangementShader: the previous shaders have moved the data in the center of the canvas. this shader now arranges the pixels to the correct position relative to the map.
 *
 * Only the third shader needs to be executed with every frame. This way, the operation-heavy interpolation does not slow down the map.
 * It generally makes sense to arrange shaders in such a way that all openlayers-perspective-operations occur in the last shader.
 *
 * valueFb is also being used to handle click events: from this structure we get the actual value at a pixel when the user clicks.
 *
 * Note a few caveats.
 * This implementation is not really intended for updating observations, maxEdgeLength or colorRamps at runtime. These parameters are rather intended for the developer to set once.
 * While you can change the color-ramp at runtime, it's length is hardcoded in the colorization shader, so you'd have to recompile it to properly reflect the new ramp.
 * In the same way, the interpolation-shader has the number of observations baked into it. When new data becomes available, you must recompile the interpolation shader.
 */
export class InterpolationRenderer extends LayerRenderer<VectorLayer> {

    private container: HTMLDivElement;
    private twodCanvas: HTMLCanvasElement;
    private webGlCanvas: HTMLCanvasElement;

    private gl: WebGLRenderingContext;
    private interpolationShader: Shader;
    private valueFb: Framebuffer;
    private colorizationShader: Shader;
    private colorFb: Framebuffer;
    private arrangementShader: Shader;

    private values: number[];
    private coordsWorld: number[][];
    private interpolatedValues: Uint8Array;
    private showLabels: boolean;

    constructor(layer: VectorLayer, maxEdgeLength: number, power: number, colorRamp: ColorRamp, smooth: boolean, valueProperty: string, showLabels: boolean) {
        super(layer);

        this.showLabels = showLabels;

        // setting up HTML element
        this.container = document.createElement('div');
        this.container.style.setProperty('position', 'relative');
        this.container.style.setProperty('width', '100%');
        this.container.style.setProperty('height', '100%');

        this.webGlCanvas = document.createElement('canvas');
        this.webGlCanvas.style.setProperty('position', 'absolute');
        this.webGlCanvas.style.setProperty('left', '0px');
        this.webGlCanvas.style.setProperty('top', '0px');
        this.webGlCanvas.style.setProperty('width', '100%');
        this.webGlCanvas.style.setProperty('height', '100%');
        this.webGlCanvas.width = 1000;
        this.webGlCanvas.height = 1000;
        this.gl = this.webGlCanvas.getContext('webgl');
        this.container.appendChild(this.webGlCanvas);

        this.twodCanvas = document.createElement('canvas');
        this.twodCanvas.style.setProperty('position', 'absolute');
        this.twodCanvas.style.setProperty('left', '0px');
        this.twodCanvas.style.setProperty('top', '0px');
        this.twodCanvas.style.setProperty('width', '100%');
        this.twodCanvas.style.setProperty('height', '100%');
        this.twodCanvas.width = 1000;
        this.twodCanvas.height = 1000;
        this.container.appendChild(this.twodCanvas);

        // preparing data
        const source = layer.getSource();
        const features = source.getFeatures() as Feature<Point>[];

        const coords = features.map(f => f.getGeometry().getCoordinates());
        const values = features.map(f => f.getProperties()[valueProperty]);
        const d = Delaunator.from(coords);
        const indices = d.triangles;
        const indicesFiltered = filterTrianglesByMaxEdgeLength(coords, indices, maxEdgeLength);
        const coordsFiltered = pickIndices(coords, unique(indicesFiltered));
        const valuesFiltered = pickIndices(values, unique(indicesFiltered));
        const bbox = getBbox(coordsFiltered);
        this.values = valuesFiltered;
        this.coordsWorld = coordsFiltered;

        // setting up shaders
        this.interpolationShader = createInterpolationShader(this.gl, zip(coordsFiltered, valuesFiltered), indices, power, bbox);
        this.valueFb = new Framebuffer(this.gl, this.webGlCanvas.width, this.webGlCanvas.height);
        this.colorizationShader = createColorizationShader(this.gl, colorRamp, smooth, this.valueFb);
        this.colorFb = new Framebuffer(this.gl, this.webGlCanvas.width, this.webGlCanvas.height);
        this.arrangementShader = createArrangementShader(this.gl, identity(), identity(), bbox, this.colorFb);


        // running first two shaders once
        this.runInterpolationShader();
        this.runColorizationShader();
    }

    prepareFrame(frameState: FrameState): boolean {
        const layerState = frameState.layerStatesArray[frameState.layerIndex];
        const size = frameState.size;
        const opacity = layerState.opacity;
        if (size[0] !== this.webGlCanvas.width || size[1] !== this.webGlCanvas.height) {
            this.webGlCanvas.width = size[0];
            this.webGlCanvas.height = size[1];
            this.twodCanvas.width = size[0];
            this.twodCanvas.height = size[1];
        }
        this.webGlCanvas.style.opacity = `${opacity}`;

        const c2pT = frameState.coordinateToPixelTransform;
        this.updateArrangementShader(c2pT, this.webGlCanvas.width, this.webGlCanvas.height);
        this.updateTextCanvas(c2pT, frameState.viewState.zoom);

        return true;
    }

    renderFrame(frameState: FrameState, target: HTMLElement): HTMLElement {
        this.runArrangementShader();
        return this.container;
    }


  forEachFeatureAtCoordinate<T>(
    coordinate: Coordinate,
    frameState: FrameState,
    hitTolerance: number,
    callback: (arg0: Feature<any> | RenderFeature, arg1: Layer<any>) => T,
    declutteredFeatures: FeatureLike[]
  ) {
      // @TODO: query the valueFb to provide data at the given point.
      callback(null, super.layer_);
  }

    public setParas(power: number, smooth: boolean, colorRamp: ColorRamp, showLabels: boolean) {
        this.showLabels = showLabels;
        this.updateInterpolationShader(power);
        this.updateColorizationShader(colorRamp, smooth);
        this.runInterpolationShader();
        this.runColorizationShader();
        this.runArrangementShader();
    }

    /**
     * Called at every renderFrame. Designed for speed.
     */
    private updateArrangementShader(coordinateToPixelTransform: number[], canvasWidth: number, canvasHeight: number): void {
        const world2pix = [
            [coordinateToPixelTransform[0], coordinateToPixelTransform[1], 0.],
            [coordinateToPixelTransform[2], coordinateToPixelTransform[3], 0.],
            [coordinateToPixelTransform[4], coordinateToPixelTransform[5], 1.]
        ];
        const pix2clip = [
            [1. / (this.webGlCanvas.width / 2), 0., 0.],
            [0, -1. / (this.webGlCanvas.height / 2), 0.],
            [-1., 1., 1.]
        ];
        this.arrangementShader.updateUniformData(this.gl, 'u_world2pix', flattenMatrix(world2pix));
        this.arrangementShader.updateUniformData(this.gl, 'u_pix2clip', flattenMatrix(pix2clip));
    }

    /**
     * Called at every renderFrame. Designed for speed.
     */
    private runArrangementShader(): void {
        this.arrangementShader.bind(this.gl);
        this.arrangementShader.render(this.gl, [0, 0, 0, 0]);
    }

    /**
     * Slow! Avoid calling this too often.
     */
    private updateInterpolationShader(power: number): void {
        this.interpolationShader.updateUniformData(this.gl, 'u_power', [power]);
    }

    /**
     * Slow! Avoid calling this too often.
     */
    private runInterpolationShader(): void {
        this.interpolationShader.bind(this.gl);
        this.interpolationShader.render(this.gl, [0, 0, 0, 0], this.valueFb.fbo);
        this.interpolatedValues = getCurrentFramebuffersPixels(this.webGlCanvas) as Uint8Array;
    }

    /**
     * Slow! Avoid calling this too often.
     */
    private updateColorizationShader(colorRamp: ColorRamp, smooth: boolean): void {
        this.colorizationShader.updateUniformData(this.gl, 'u_colorRampValues', Object.keys(colorRamp).map(k => parseFloat(k)));
        this.colorizationShader.updateUniformData(this.gl, 'u_colorRampColors', flattenMatrix(Object.values(colorRamp)));
        this.colorizationShader.updateUniformData(this.gl, 'u_smooth', [smooth ? 1 : 0]);
    }

    /**
     * Slow! Avoid calling this too often.
     */
    private runColorizationShader(): void {
        this.colorizationShader.bind(this.gl);
        this.colorizationShader.render(this.gl, [0, 0, 0, 0], this.colorFb.fbo);
    }

    private updateTextCanvas(coordinateToPixelTransform: number[], zoom: number): void {
        const context = this.twodCanvas.getContext('2d');
        context.clearRect(0, 0, this.twodCanvas.width, this.twodCanvas.height);

        if (this.showLabels) {
            const world2pix = [
                [coordinateToPixelTransform[0], coordinateToPixelTransform[2], coordinateToPixelTransform[4] ],
                [coordinateToPixelTransform[1], coordinateToPixelTransform[3], coordinateToPixelTransform[5] ],
                [0,                             0,                             1                             ]
            ];
            const coordsWorldAugm = this.coordsWorld.map(c => [...c, 1]);
            const coordsPix = applyTransformToEach(coordsWorldAugm, world2pix);

            context.font = '8pt Tahoma';
            context.lineWidth = 1;
            context.strokeStyle = 'white';
            context.fillStyle = 'black';

            for (let i = 0; i < coordsPix.length; i++) {
                // context.fillText(`${this.values[i].toPrecision(5)}`, coordsPix[i][0], coordsPix[i][1]);
                context.strokeText(`${this.values[i].toPrecision(5)}`, coordsPix[i][0], coordsPix[i][1]);
            }
        }
    }
}



const createInterpolationShader = (gl: WebGLRenderingContext, observationsWorld: number[][], indices: number[][], power: number, bbox: number[]): Shader => {
    const interpolationProgram = new Program(gl, `
            precision mediump float;
            attribute vec2 a_position;
            uniform vec4 u_bbox;
            varying vec2 v_pos;

            vec2 worldCoords2clipBbx(vec2 point, vec4 bbox) {
                float xPerct = (point.x - bbox.x) / (bbox.z - bbox.x);
                float yPerct = (point.y - bbox.y) / (bbox.w - bbox.y);
                float xClip = 2.0 * xPerct - 1.0;
                float yClip = 2.0 * yPerct - 1.0;
                return vec2(xClip, yClip);
            }

            void main() {
                vec2 pos = worldCoords2clipBbx(a_position.xy, u_bbox);
                v_pos = pos;
                gl_Position = vec4(pos.xy, 0.0, 1.0);
            }
        `, `
            precision mediump float;
            uniform float u_power;
            uniform vec4 u_bbox;
            uniform vec3 u_dataPoints[${observationsWorld.length}];
            varying vec2 v_pos;

            vec2 worldCoords2clipBbx(vec2 point, vec4 bbox) {
                float xPerct = (point.x - bbox.x) / (bbox.z - bbox.x);
                float yPerct = (point.y - bbox.y) / (bbox.w - bbox.y);
                float xClip = 2.0 * xPerct - 1.0;
                float yClip = 2.0 * yPerct - 1.0;
                return vec2(xClip, yClip);
            }

            float interpolate(vec2 pos, vec3 observations[${observationsWorld.length}]) {
                float valSum = 0.0;
                float wSum = 0.0;
                for (int i = 0; i < ${observationsWorld.length}; i++) {
                    float d = distance(pos, worldCoords2clipBbx(observations[i].xy, u_bbox));
                    float w = 1.0 / pow(d, u_power);
                    valSum += observations[i].z * w;
                    wSum += w;
                }
                return valSum / wSum;
            }

            void main() {
                float val = interpolate(v_pos, u_dataPoints);
                gl_FragColor = vec4(val / 22.5, 0.0, 0.0, 1.0);
            }
        `);

    const interpolationShader = new Shader(interpolationProgram, [
        new Attribute(gl, interpolationProgram, 'a_position', observationsWorld.map(o => [o[0], o[1]]))
    ], [
        new Uniform(gl, interpolationProgram, 'u_power', 'float', [power]),
        new Uniform(gl, interpolationProgram, 'u_dataPoints', 'vec3[]', flattenMatrix(observationsWorld)),
        new Uniform(gl, interpolationProgram, 'u_bbox', 'vec4', bbox)
    ], [], new Index(gl, indices));

    return interpolationShader;
};


const createColorizationShader = (gl: WebGLRenderingContext, colorRamp: ColorRamp, smooth: boolean, valueFb: Framebuffer): Shader => {
    const colorizationProgram = new Program(gl, `
            precision mediump float;
            attribute vec2 a_position;
            attribute vec2 a_textureCoord;
            varying vec2 v_textureCoord;

            void main() {
                v_textureCoord = a_textureCoord;
                gl_Position = vec4(a_position.xy, 0.0, 1.0);
            }
        `, `
            precision mediump float;
            uniform float u_colorRampValues[${Object.keys(colorRamp).length}];
            uniform vec3 u_colorRampColors[${Object.keys(colorRamp).length}];
            uniform bool u_smooth;
            uniform sampler2D u_valueTexture;
            varying vec2 v_textureCoord;

            vec3 valueToSmoothColor(in float value) {
                for (int i = 1; i < ${Object.keys(colorRamp).length}; i++) {
                    if (value <= u_colorRampValues[i]) {
                        float alpha = (value - u_colorRampValues[i-1]) / (u_colorRampValues[i] - u_colorRampValues[i-1]);
                        vec3 color = alpha * (u_colorRampColors[i] - u_colorRampColors[i-1]) + u_colorRampColors[i-1];
                        return color;
                    }
                }
            }

            vec3 valueToStepColor(in float value) {
                for (int i = 1; i < ${Object.keys(colorRamp).length}; i++) {
                    if (value <= u_colorRampValues[i]) {
                        return u_colorRampColors[i - 1];
                    }
                }
                return u_colorRampColors[${Object.keys(colorRamp).length} - 1];
            }

            void main() {
                vec4 pixelData = texture2D(u_valueTexture, v_textureCoord);
                float val = pixelData.x * u_colorRampValues[${Object.keys(colorRamp).length} - 1];
                float dataFlag = pixelData.w;
                vec3 rgb = vec3(0.0, 0.0, 0.0);
                if (dataFlag > 0.01) {
                    if (u_smooth) {
                        rgb = valueToSmoothColor(val);
                    } else {
                        rgb = valueToStepColor(val);
                    }
                }
                gl_FragColor = vec4(rgb.x / 255.0, rgb.z / 255.0, rgb.y / 255.0, dataFlag);
            }
        `);

    const colorizationShader = new Shader(colorizationProgram, [
        new Attribute(gl, colorizationProgram, 'a_position', rectangleA(2.0, 2.0).vertices),
        new Attribute(gl, colorizationProgram, 'a_textureCoord', rectangleA(2.0, 2.0).texturePositions)
    ], [
        new Uniform(gl, colorizationProgram, 'u_colorRampValues', 'float[]', Object.keys(colorRamp).map(k => parseFloat(k))),
        new Uniform(gl, colorizationProgram, 'u_colorRampColors', 'vec3[]', flattenMatrix(Object.values(colorRamp))),
        new Uniform(gl, colorizationProgram, 'u_smooth', 'bool', [smooth ? 1 : 0]),
    ], [
        new Texture(gl, colorizationProgram, 'u_valueTexture', valueFb.fbo.texture, 0)
    ]);

    return colorizationShader;
};


const createArrangementShader = (gl: WebGLRenderingContext, world2pix: number[][], pix2clip: number[][], bbox: number[], colorFb: Framebuffer): Shader => {
    const arrangementProgram = new Program(gl, `
            precision mediump float;
            attribute vec3 a_pos;
            attribute vec2 a_posTexture;
            uniform mat3 u_world2pix;
            uniform mat3 u_pix2clip;
            uniform vec4 u_bbox;
            varying vec2 v_posTexture;

            vec2 clipBbx2worldCoords(vec2 clipCoords, vec4 bbox) {
                float xPerct = ( clipCoords.x + 1.0 ) / 2.0;
                float yPerct = ( clipCoords.y + 1.0 ) / 2.0;
                float xWorld = xPerct * (bbox.z - bbox.x) + bbox.x;
                float yWorld = yPerct * (bbox.w - bbox.y) + bbox.y;
                return vec2(xWorld, yWorld);
            }

            void main() {
                v_posTexture = a_posTexture;
                vec2 worldPos = clipBbx2worldCoords(a_pos.xy, u_bbox);
                vec3 clipPos = u_pix2clip * u_world2pix * vec3(worldPos.xy, 1.0);
                gl_Position = vec4(clipPos.xy, 0.0, 1.0);
            }
        `, `
            precision mediump float;
            uniform sampler2D u_texture;
            varying vec2 v_posTexture;

            void main() {
                gl_FragColor = texture2D(u_texture, v_posTexture);
            }
        `);

    const arrangementShader = new Shader(arrangementProgram, [
        new Attribute(gl, arrangementProgram, 'a_pos', rectangleA(2, 2).vertices),
        new Attribute(gl, arrangementProgram, 'a_posTexture', rectangleA(2, 2).texturePositions),
    ], [
        new Uniform(gl, arrangementProgram, 'u_world2pix', 'mat3', flattenMatrix(world2pix)),
        new Uniform(gl, arrangementProgram, 'u_pix2clip', 'mat3', flattenMatrix(pix2clip)),
        new Uniform(gl, arrangementProgram, 'u_bbox', 'vec4', bbox)
    ], [
        new Texture(gl, arrangementProgram, 'u_texture', colorFb.fbo.texture, 0)
    ]);

    return arrangementShader;
};


const getBbox = (obs: number[][]): number[] => {
    const xs = obs.map(p => p[0]);
    const ys = obs.map(p => p[1]);
    const xMin = Math.min(...xs);
    const xMax = Math.max(...xs);
    const yMin = Math.min(...ys);
    const yMax = Math.max(...ys);
    return [xMin, yMin, xMax, yMax];
};

const filterTrianglesByMaxEdgeLength = (pointCoords: number[][], triangleIndices: number[], threshold: number): number[] => {
    const smallEdges = [];
    const largeEdges = [];
    const smallTriangles = [];
    for (let i = 0; i < triangleIndices.length; i += 3) {
        const thisTriangleIndices = [triangleIndices[i], triangleIndices[i + 1], triangleIndices[i + 2]];
        let isSmallTriangle = true;

        for (let j = 0; j < 3; j++) {

            const indx0 = thisTriangleIndices[j];
            const indx1 = thisTriangleIndices[(j + 1) % 3];
            const p0 = pointCoords[indx0];
            const p1 = pointCoords[indx1];

            if (smallEdges.includes([indx1, indx0])) {
                continue;
            } else if (largeEdges.includes([indx1, indx0])) {
                isSmallTriangle = false;
                continue;
            } else {
                if (pointDistance(p0, p1) <= threshold) {
                    smallEdges.push([indx0, indx1]);
                } else {
                    largeEdges.push([indx0, indx1]);
                    isSmallTriangle = false;
                }
            }
        }

        if (isSmallTriangle) {
            smallTriangles.push(...thisTriangleIndices);
        }
    }

    return smallTriangles;
};

const pickIndices = (arr: any[], indices: number[]): any[] => {
    const out = [];
    for (const index of indices) {
        out.push(arr[index]);
    }
    return out;
};

const zip = (arr0: any[], arr1: any[]): any[] => {
    const out = [];
    for (let i = 0; i < arr0.length; i++) {
        out.push(arr0[i].concat(arr1[i]));
    }
    return out;
};

const unique = (arr: any[]): any[] => {
    const unique = arr.filter((v, i, a) => a.indexOf(v) === i);
    return unique;
};

const applyTransformToEach = (arr: number[][], matrix: number[][]): number[][] => {
    const out = [];
    for (const vec of arr) {
        const vec1 = matrixVectorProduct(matrix, vec);
        out.push(vec1);
    }
    return out;
};
