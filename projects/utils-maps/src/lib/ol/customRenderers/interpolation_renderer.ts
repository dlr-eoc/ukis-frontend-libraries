import { Feature } from 'ol';
import { FrameState } from 'ol/PluggableMap';
import LayerRenderer from 'ol/renderer/Layer';
import CanvasVectorLayerRenderer from 'ol/renderer/canvas/VectorLayer';
import VectorLayer from 'ol/layer/Vector';
import Point from 'ol/geom/Point';
import { Vector as VectorSource, Cluster as olCluster } from 'ol/source';
import { replaceChildren } from 'ol/dom';
import { Projection } from 'ol/proj';
import { Shader, Framebuffer, Program, Uniform, Index, Texture, Attribute, DataTexture } from '../../webgl/engine.core';
import { FramebufferObject, getCurrentFramebuffersPixels } from '../../webgl/webgl';
import { rectangleA, rectangleE } from '../../webgl/engine.shapes';
import { nextPowerOf, flattenRecursive, createNDimArray } from '../../webgl/utils';




export type ColorRamp = {val: number, rgb: [number, number, number]}[];



export interface InterpolationLayerOptions {
    source: VectorSource<Point>;
    renderSettings: InterpolationRendererSettings;
    [key: string]: any;
}

export interface InterpolationRendererSettings {
    /** maximum distance for interpolation */
    maxEdgeLength: number;
    power: number;
    /** `val`/`color` pairs. a given `color` is used for all values strictly smaller than `val`.  */
    colorRamp: ColorRamp;
    /** show a smooth color-gradient or isolines? */
    smooth: boolean;
    /** which feature-property should be interpolated? */
    valueProperty: string;
    showLabels: boolean;
    /** allows you to read out interpolated pixel values, but bad for performance */
    storeInterpolatedPixelData: boolean;
}


export class InterpolationLayer extends VectorLayer {

    readonly options: InterpolationLayerOptions;

    constructor(options: InterpolationLayerOptions) {
        super(options);
        this.options = options;
    }

    createRenderer(): InterpolationRenderer {
        return new InterpolationRenderer(this, this.options.renderSettings);
    }

    updateParas(power: number, smooth: boolean, showLabels: boolean): void {
        const newSettings: InterpolationRendererSettings = {
            colorRamp: this.options.renderSettings.colorRamp,
            maxEdgeLength: this.options.renderSettings.maxEdgeLength,
            storeInterpolatedPixelData: this.options.renderSettings.storeInterpolatedPixelData,
            valueProperty: this.options.renderSettings.valueProperty,
            power: power,
            showLabels: showLabels,
            smooth: smooth,
        };
        (super.getRenderer() as InterpolationRenderer).updateSettings(newSettings);
        this.options.renderSettings = newSettings;
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
    private pointRenderer: CanvasVectorLayerRenderer;
    private webGlCanvas: HTMLCanvasElement;
    private gl: WebGLRenderingContext;
    private interpolationShader: Shader;
    private valueFb: Framebuffer;
    private colorizationShader: Shader;
    private colorFb: Framebuffer;
    private arrangementShader: Shader;
    private interpolatedValues: Uint8Array;

    private projection: Projection;
    private bbox: number[];

    constructor(layer: VectorLayer, private settings: InterpolationRendererSettings) {
        super(layer);

        // setting up HTML element
        this.container = document.createElement('div');
        this.container.classList.add('ol-layer');
        this.container.style.setProperty('position', 'absolute');
        this.container.style.setProperty('width', '100%');
        this.container.style.setProperty('height', '100%');

        this.webGlCanvas = document.createElement('canvas');
        this.webGlCanvas.style.setProperty('position', 'absolute');
        this.webGlCanvas.style.setProperty('left', '0px');
        this.webGlCanvas.style.setProperty('top', '0px');
        this.webGlCanvas.style.setProperty('width', '100%');
        this.webGlCanvas.style.setProperty('height', '100%');
        this.webGlCanvas.width = 1000;  // <-- make smaller for better performance
        this.webGlCanvas.height = 1000;  // <-- make smaller for better performance
        this.gl = this.webGlCanvas.getContext('webgl');
        this.container.appendChild(this.webGlCanvas);

        // setting up point-renderer
        this.pointRenderer = new CanvasVectorLayerRenderer(layer);

        // preparing data
        const source = layer.getSource();
        this.projection = source.getProjection();
        const { coords, values, bboxDelta, maxVal } = this.parseData(source, this.settings.valueProperty, this.settings.maxEdgeLength);
        const { observationsBbox, maxEdgeLengthBbox } = this.parseDataBbox(bboxDelta, coords, values, maxVal, this.settings.maxEdgeLength);
        this.bbox = bboxDelta;

        // setting up shaders
        const identity = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
        this.interpolationShader = createInverseDistanceInterpolationShader(this.gl, observationsBbox, maxVal, this.settings.power, maxEdgeLengthBbox);
        this.valueFb = new Framebuffer(this.gl, this.webGlCanvas.width, this.webGlCanvas.height);
        this.colorizationShader = createColorizationShader(this.gl, this.settings.colorRamp, maxVal, this.settings.smooth, this.valueFb);
        this.colorFb = new Framebuffer(this.gl, this.webGlCanvas.width, this.webGlCanvas.height);
        this.arrangementShader = createArrangementShader(this.gl, identity, identity, bboxDelta, this.colorFb);

        // running first two shaders once
        this.runInterpolationShader(this.valueFb.fbo);
        this.runColorizationShader(this.colorFb.fbo);
    }

    prepareFrame(frameState: FrameState): boolean {
        const layerState = frameState.layerStatesArray[frameState.layerIndex];
        this.webGlCanvas.style.opacity = `${layerState.opacity}`;

        if (frameState.viewState.projection !== this.projection) {
            this.projection = frameState.viewState.projection;
            const source = super.getLayer().getSource();
            const { coords, values, bboxDelta, maxVal } = this.parseData(source, this.settings.valueProperty, this.settings.maxEdgeLength);
            const { observationsBbox, maxEdgeLengthBbox } = this.parseDataBbox(bboxDelta, coords, values, maxVal, this.settings.maxEdgeLength);
            this.updateInterpolationShader(this.settings.power, observationsBbox, maxEdgeLengthBbox);
            this.runInterpolationShader(this.valueFb.fbo);
            this.runColorizationShader(this.colorFb.fbo);
            this.bbox = bboxDelta;
        }

        const c2pT = frameState.coordinateToPixelTransform;
        // using frameState.size instead of this.webGlCanvas.clientWidth because the latter is null when layer invisible.
        this.updateArrangementShader(c2pT, frameState.size[0], frameState.size[1], this.bbox);
        this.pointRenderer.prepareFrame(frameState);
        return true;
    }

    renderFrame(frameState: FrameState, target: HTMLElement): HTMLElement {
        this.runArrangementShader();  // @todo: arrangement shader could be replaced with a simple css-transformation-matrix.
        if (this.settings.showLabels) {
            const pointCanvas = this.pointRenderer.renderFrame(frameState, this.container);
            replaceChildren(this.container, [this.webGlCanvas, pointCanvas]);
        } else {
            replaceChildren(this.container, [this.webGlCanvas]);
        }
        return this.container;
    }

    renderDeclutter(frameState: FrameState) {
    }

    public updateSettings(newSettings: InterpolationRendererSettings) {
        const oldSettings = this.settings;
        this.settings = newSettings;
        if (newSettings.power !== oldSettings.power) {
            this.updateInterpolationShader(newSettings.power);
            this.runInterpolationShader(this.valueFb.fbo);
            this.updateColorizationShader(newSettings.smooth);
            this.runColorizationShader(this.colorFb.fbo);
        } else if (newSettings.smooth !== oldSettings.smooth) {
            this.updateColorizationShader(newSettings.smooth);
            this.runColorizationShader(this.colorFb.fbo);
        }
        super.getLayer().changed();
    }

    /**
     * Called at every renderFrame. Fast.
     */
    private updateArrangementShader(coordinateToPixelTransform: number[], canvasWidth: number, canvasHeight: number, bbox: number[]): void {
        const world2pix = [
            [coordinateToPixelTransform[0], coordinateToPixelTransform[1], 0.],
            [coordinateToPixelTransform[2], coordinateToPixelTransform[3], 0.],
            [coordinateToPixelTransform[4], coordinateToPixelTransform[5], 1.]
        ];
        const pix2clip = [
            [1. / (canvasWidth / 2), 0., 0.],
            [0, -1. / (canvasHeight / 2), 0.],
            [-1., 1., 1.]
        ];
        this.arrangementShader.updateUniformData(this.gl, 'u_world2pix', flattenRecursive(world2pix));
        this.arrangementShader.updateUniformData(this.gl, 'u_pix2clip', flattenRecursive(pix2clip));
        this.arrangementShader.updateUniformData(this.gl, 'u_bbox', bbox);
    }

    /**
     * Called at every renderFrame. Fast.
     */
    private runArrangementShader(target?: FramebufferObject): void {
        this.arrangementShader.bind(this.gl);
        this.arrangementShader.render(this.gl, [0, 0, 0, 0], target);
    }

    /**
     * Slow! Avoid calling this too often.
     */
    private updateInterpolationShader(power: number, observations?: number[][], maxEdgeLengthBbox?: number): void {
        this.interpolationShader.updateUniformData(this.gl, 'u_power', [power]);
        if (observations) {
            this.interpolationShader.updateTextureData(this.gl, 'u_dataTexture', [observations]);
        }
        if (maxEdgeLengthBbox) {
            this.interpolationShader.updateUniformData(this.gl, 'u_maxDistance', [maxEdgeLengthBbox]);
        }
    }

    /**
     * Slow! Avoid calling this too often.
     */
    private runInterpolationShader(target?: FramebufferObject): void {
        this.interpolationShader.bind(this.gl);
        this.interpolationShader.render(this.gl, [0, 0, 0, 0], target);
        if (this.settings.storeInterpolatedPixelData) {
            this.interpolatedValues = getCurrentFramebuffersPixels(this.webGlCanvas) as Uint8Array;
        }
    }

    /**
     * Slow! Avoid calling this too often.
     */
    private updateColorizationShader(smooth: boolean): void {
        // this.colorizationShader.updateUniformData(this.gl, 'u_colorRampValues', colorRamp.map(e => e.val));
        // this.colorizationShader.updateUniformData(this.gl, 'u_colorRampColors', flattenRecursive( colorRamp.map(e => e.rgb) ));
        this.colorizationShader.updateUniformData(this.gl, 'u_smooth', [smooth ? 1 : 0]);
    }

    /**
     * Slow! Avoid calling this too often.
     */
    private runColorizationShader(target?: FramebufferObject): void {
        this.colorizationShader.bind(this.gl);
        this.colorizationShader.render(this.gl, [0, 0, 0, 0], target);
    }

    private parseData(source, valueProperty: string, maxEdgeLength: number) {
        let features: Feature<Point>[] = source.getFeatures() as Feature<Point>[];
        if (source instanceof olCluster) {
            features = source.getSource().getFeatures() as Feature<Point>[];
        } else {
            features = source.getFeatures() as Feature<Point>[];
        }

        const coords = features.map(f => f.getGeometry().getCoordinates());
        const values = features.map(f => parseFloat(f.getProperties()[valueProperty]));

        const bbox = getBbox(coords);
        const deltaX = bbox[2] - bbox[0];
        const deltaY = bbox[3] - bbox[1];
        let addX: number, addY: number;
        if (deltaX > deltaY) {
            addY = deltaX - deltaY;
            addX = 0;
        } else {
            addY = 0;
            addX = deltaY - deltaX;
        }
        const bboxDelta = [
            bbox[0] - maxEdgeLength,
            bbox[1] - maxEdgeLength,
            bbox[2] + addX + maxEdgeLength,
            bbox[3] + addY + maxEdgeLength
        ];
        const maxVal = values.reduce((prev, curr) => curr > prev ? curr : prev, 0);

        return {
            coords, values, bboxDelta, maxVal
        };
    }

    private parseDataBbox(bbox, coords, values, maxVal, maxEdgeLength) {
        const observationsBbox = zip(coords, values).map(o => {
            const coordsBbox = worldCoords2clipBbox([o[0], o[1]], bbox);
            return [
                255 * (coordsBbox[0] + 1) / 2,
                255 * (coordsBbox[1] + 1) / 2,
                255 * o[2] / maxVal,
                255
            ];
        });
        const nrObservations = observationsBbox.length;
        const nextPowerOfTwo = nextPowerOf(nrObservations, 2);
        for (let i = 0; i < nextPowerOfTwo - nrObservations; i++) {
            observationsBbox.push([0, 0, 0, 0]);
        }

        const deltaX = bbox[2] - bbox[0];
        const deltaY = bbox[3] - bbox[1];
        const maxEdgeLengthBbox = maxEdgeLength / Math.max(deltaX, deltaY);

        return { observationsBbox, maxEdgeLengthBbox };
    }
}

const worldCoords2clipBbox = (point: number[], bbox: number[]): number[] => {
    const xPerct = (point[0] - bbox[0]) / (bbox[2] - bbox[0]);
    const yPerct = (point[1] - bbox[1]) / (bbox[3] - bbox[1]);
    const xClip = 2 * xPerct - 1;
    const yClip = 2 * yPerct - 1;
    return [xClip, yClip];
};

const createInverseDistanceInterpolationShader = (gl: WebGLRenderingContext, observationsBbox: number[][], maxValue: number, power: number, maxEdgeLengthBbox: number): Shader => {

    const maxObservations = 10000;
    const inverseDistanceProgram = new Program(gl, `
            precision mediump float;
            attribute vec3 a_position;
            attribute vec2 a_texturePosition;
            varying vec2 v_position;
            varying vec2 v_texturePosition;

            void main() {
                v_position = a_position.xy;
                v_texturePosition = a_texturePosition;
                gl_Position = vec4(a_position.xy, 0.0, 1.0);
            }
        `, `
            precision mediump float;
            uniform float u_power;
            uniform sampler2D u_dataTexture;
            uniform int u_nrDataPoints;
            uniform float u_maxValue;
            uniform float u_maxDistance;
            varying vec2 v_position;
            varying vec2 v_texturePosition;

            void main() {

                float valSum = 0.0;
                float wSum = 0.0;
                float minD = 10000.0;
                for (int i = 0; i < ${maxObservations}; i++) {
                    if (i > u_nrDataPoints) {
                        break;
                    }
                    vec4 dataPoint = texture2D(u_dataTexture, vec2(float(i) / float(u_nrDataPoints), 0.5));
                    if (dataPoint.w > 0.0) {  // texture is padded to next power of two with transparent 0-values.
                        vec2 coords = dataPoint.xy * 2.0 - 1.0;  // transforming coords from [0, 1] to [-1, 1]
                        float value = dataPoint.z * u_maxValue;  // transforming value from [0, 1] to [0, maxValue]

                        float d = distance(v_position, coords);
                        float w = 1.0 / pow(d, u_power);
                        valSum += value * w;
                        wSum += w;
                        if (d < minD) {
                            minD = d;
                        }
                    }
                }
                float interpolatedValue = valSum / wSum;
                float alpha = 1.0;
                if (minD > u_maxDistance) {
                    alpha = 0.0;
                }
                vec4 color = vec4(interpolatedValue / u_maxValue, 0.0, 0.0, alpha);

                gl_FragColor = color;
            }
        `);

    const viewPort = rectangleE(2, 2);
    const inverseDistanceShader = new Shader(inverseDistanceProgram, [
        new Attribute(gl, inverseDistanceProgram, 'a_position', viewPort.vertices),
        new Attribute(gl, inverseDistanceProgram, 'a_texturePosition', viewPort.texturePositions)
    ], [
        new Uniform(gl, inverseDistanceProgram, 'u_power', 'float', [power]),
        new Uniform(gl, inverseDistanceProgram, 'u_nrDataPoints', 'int', [observationsBbox.length]),
        new Uniform(gl, inverseDistanceProgram, 'u_maxValue', 'float', [maxValue]),
        new Uniform(gl, inverseDistanceProgram, 'u_maxDistance', 'float', [maxEdgeLengthBbox])
    ], [
        new DataTexture(gl, inverseDistanceProgram, 'u_dataTexture', [observationsBbox], 0)
    ], new Index(gl, viewPort.vertexIndices));

    return inverseDistanceShader;
};

const createColorizationShader = (gl: WebGLRenderingContext, colorRamp: ColorRamp, maxVal: number, smooth: boolean, valueFb: Framebuffer): Shader => {

    const maxColorRampValues = 15;
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
            uniform float u_colorRampValues[${maxColorRampValues}];
            uniform vec3 u_colorRampColors[${maxColorRampValues}];
            uniform int u_nrColorRampValues;
            uniform float u_maxValue;
            uniform bool u_smooth;
            uniform sampler2D u_valueTexture;
            varying vec2 v_textureCoord;

            vec3 valueToSmoothColor(in float value) {
                if (value < u_colorRampValues[0]) {
                    return u_colorRampColors[0];
                }
                for (int i = 1; i < ${maxColorRampValues}; i++) {
                    if (i > u_nrColorRampValues) {
                        break;
                    }
                    if (value < u_colorRampValues[i]) {
                        float alpha = (value - u_colorRampValues[i-1]) / (u_colorRampValues[i] - u_colorRampValues[i-1]);
                        vec3 color = alpha * (u_colorRampColors[i] - u_colorRampColors[i-1]) + u_colorRampColors[i-1];
                        return color;
                    }
                    if (i == u_nrColorRampValues) {
                        return u_colorRampColors[i];
                    }
                }
            }

            vec3 valueToStepColor(in float value) {
                for (int i = 0; i < ${maxColorRampValues}; i++) {
                    if (i > u_nrColorRampValues) {
                        break;
                    }
                    if (value < u_colorRampValues[i]) {
                        return u_colorRampColors[i];
                    }
                    if (i == u_nrColorRampValues) {
                        return u_colorRampColors[i];
                    }
                }
            }

            void main() {
                vec4 pixelData = texture2D(u_valueTexture, v_textureCoord);
                float val = pixelData.r * u_maxValue;
                float alpha = pixelData.w;
                vec3 rgb = vec3(0.0, 0.0, 0.0);
                if (alpha > 0.01) {
                    if (u_smooth) {
                        rgb = valueToSmoothColor(val);
                    } else {
                        rgb = valueToStepColor(val);
                    }
                }
                gl_FragColor = vec4(rgb.x / 255.0, rgb.y / 255.0, rgb.z / 255.0, alpha);
            }
        `);

    const colorizationShader = new Shader(colorizationProgram, [
        new Attribute(gl, colorizationProgram, 'a_position', rectangleA(2.0, 2.0).vertices),
        new Attribute(gl, colorizationProgram, 'a_textureCoord', rectangleA(2.0, 2.0).texturePositions)
    ], [
        new Uniform(gl, colorizationProgram, 'u_colorRampValues', 'float[]', colorRamp.map(e => e.val)),
        new Uniform(gl, colorizationProgram, 'u_colorRampColors', 'vec3[]', flattenRecursive( colorRamp.map(e => e.rgb) )),
        new Uniform(gl, colorizationProgram, 'u_nrColorRampValues', 'int', [colorRamp.length]),
        new Uniform(gl, colorizationProgram, 'u_maxValue', 'float', [maxVal]),
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
        new Uniform(gl, arrangementProgram, 'u_world2pix', 'mat3', flattenRecursive(world2pix)),
        new Uniform(gl, arrangementProgram, 'u_pix2clip', 'mat3', flattenRecursive(pix2clip)),
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

const zip = (arr0: any[], arr1: any[]): any[] => {
    const out = [];
    for (let i = 0; i < arr0.length; i++) {
        out.push(arr0[i].concat(arr1[i]));
    }
    return out;
};

const createDistanceMatrix = (coords: number[][]): number[][] => {
    const matrix = createNDimArray([coords.length, coords.length]);
    for (let i = 0; i < coords.length; i++) {
        for (let j = i + 1; j < coords.length; j++) {
            const d = pointDistance(coords[i], coords[j]);
            matrix[i][j] = d;
            matrix[j][i] = d;
        }
    }
    return matrix;
};

const create7NearestNeighborsTextureData = (distanceMatrix: number[][], coords: number[][], values: number[]): number[][][] => {
    const rows = nextPowerOf(values.length, 2);
    const data = createNDimArray([rows, 8, 4]);
    for (let r = 0; r < values.length; r++) {
        data[r][0] = [coords[r][0], coords[r][1], values[r], 255];
        const neighborIndices = getNIndicesSmallest(7, distanceMatrix[r]);
        for (let n = 1; n < 8; n++) {
            const ni = neighborIndices[n - 1];
            data[r][n] = [coords[ni][0], coords[ni][1], values[ni], 255];
        }
    }
    return data;
};

const pointDistance = (a: number[], b: number[]): number => {
    return Math.sqrt(Math.pow((a[0] - b[0]), 2) + Math.pow((a[1] - b[1]), 2));
};

const getNIndicesSmallest = (n: number, values: number[]): number[] => {
    const smallest = getNSmallest(n, values);
    const indices = getIndicesInArray(smallest, values);
    return indices;
};

const getIndicesInArray = (pickedValues: number[], allValues: number[]): number[] => {
    return pickedValues.map(v => allValues.findIndex(a => a === v));
};

const getNSmallest = (n: number, values: number[]): number[] => {
    return values.sort(function(a, b){ return a - b; }).slice(0, n);
};
