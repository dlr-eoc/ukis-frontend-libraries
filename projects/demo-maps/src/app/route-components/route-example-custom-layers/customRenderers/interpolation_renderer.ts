import { Feature } from 'ol';
import { FrameState } from 'ol/PluggableMap';
import LayerRenderer from 'ol/renderer/Layer';
import VectorLayer from 'ol/layer/Vector';
import Point from 'ol/geom/Point';
import { Vector as VectorSource } from 'ol/source';
import Delaunator from 'delaunator';
import { Shader, Program, Attribute, Uniform, flattenMatrix, pointDistance, Texture,
    Framebuffer, getCurrentFramebuffersPixels, Matrix, matrixVectorProduct, rectangleA, Index } from '@dlr-eoc/utils-maps';


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
        return new InterpolationRenderer(this, this.options.maxEdgeLength, this.options.distanceWeightingPower, this.options.colorRamp, this.options.smooth, this.options.valueProperty);
    }

    updateParas(power: number, smooth: boolean, colorRamp: ColorRamp): void {
        // (super.getRenderer() as InterpolationRenderer).setParas(power, smooth, colorRamp);
    }
}


export class InterpolationRenderer extends LayerRenderer<VectorLayer> {

    private webGlCanvas: HTMLCanvasElement;
    private gl: WebGLRenderingContext;
    private interpolationShader: Shader;
    private valueFb: Framebuffer;
    private colorizationShader: Shader;
    private world2Pix: Matrix;
    private pix2Clip: Matrix;
    private observationsWorld: number[][];
    private observationsPx: number[][];
    private observationsClip: number[][];
    private interpolatedValues: Uint8Array;

    constructor(layer: VectorLayer, maxEdgeLength: number, power: number, colorRamp: ColorRamp, smooth: boolean, valueProperty: string) {
        super(layer);

        // setting up canvas
        const canvas = document.createElement('canvas');
        canvas.width = 1000;
        canvas.height = 1000;
        canvas.style.position = 'absolute';

        this.world2Pix = [
            [1,   0,    0. ],
            [0,   1,    0. ],
            [0,   0,    1. ]
        ];

        this.pix2Clip = [
            [1. /  (canvas.width / 2),  0.,                        -1. ],
            [0,                         1. / (canvas.height / 2),  1.  ],
            [0.,                        0.,                        1.  ]
        ];

        // preparing data
        const source = layer.getSource();
        const features = source.getFeatures() as Feature<Point>[];
        const observationsWorld = features.map(f => {
            const coords = f.getGeometry().getCoordinates();
            const props = f.getProperties();
            return [
                coords[0],
                coords[1],
                props.val as number
            ];
        });
        const indices = this.featuresToDelaunay(observationsWorld.map(o => [o[0], o[1]]));

        // const observationsWorld = this.readFeatureData(features, maxEdgeLength, valueProperty);
        const observationsPx = this.applyMatrix(observationsWorld, this.world2Pix);
        const observationsClip = this.applyMatrix(observationsPx, this.pix2Clip);
        const bbox = this.getBbox(observationsWorld);

        // Getting rendering context
        const gl = canvas.getContext('webgl');

        // Setting up first shader
        const interpolationProgram = this.compileInterpolationProgram(gl, observationsWorld.length);
        const interpolationShader = new Shader(interpolationProgram, [
            new Attribute(gl, interpolationProgram, 'a_position', observationsClip.map(o => [o[0], o[1]]))
        ], [
            new Uniform(gl, interpolationProgram, 'u_power', 'float', [power]),
            new Uniform(gl, interpolationProgram, 'u_dataPoints', 'vec3[]', flattenMatrix(observationsClip))
        ], [], new Index(gl, indices));

        const valueFb = new Framebuffer(gl, canvas.width, canvas.height);

        // Setting up second shader
        const colorizationProgram = this.compileColorizationProgram(gl, Object.keys(colorRamp).length);
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

        // making data available for later
        this.webGlCanvas = canvas;
        this.gl = gl;
        this.interpolationShader = interpolationShader;
        this.valueFb = valueFb;
        this.colorizationShader = colorizationShader;
        this.observationsWorld = observationsWorld;
        this.observationsPx = observationsPx;
        this.observationsClip = observationsClip;
    }

    prepareFrame(frameState: FrameState): boolean {
        const layerState = frameState.layerStatesArray[frameState.layerIndex];
        const size = frameState.size;
        const opacity = layerState.opacity;
        if (size[0] !== this.webGlCanvas.width || size[1] !== this.webGlCanvas.height) {
            this.webGlCanvas.width = size[0];
            this.webGlCanvas.height = size[1];
        }
        this.webGlCanvas.style.opacity = `${opacity}`;

        const c2pT = frameState.coordinateToPixelTransform;
        this.world2Pix = [
            [c2pT[0],   c2pT[2], c2pT[4] ],
            [c2pT[1],   c2pT[3], c2pT[5] ],
            [0.,        0.,      1.      ]
        ];
        this.pix2Clip = [
            [1. /  (this.webGlCanvas.width / 2),  0.,                                  -1. ],
            [0,                                  -1. / (this.webGlCanvas.height / 2),   1. ],
            [0.,                                 0.,                                    1. ]
        ];

        this.observationsPx = this.applyMatrix(this.observationsWorld, this.world2Pix);
        this.observationsClip = this.applyMatrix(this.observationsPx, this.pix2Clip);
        this.interpolationShader.updateAttributeData(this.gl, 'a_position', this.observationsClip.map(o => [o[0], o[1]]));
        this.interpolationShader.updateUniformData(this.gl, 'u_dataPoints', flattenMatrix(this.observationsClip));

        return true;
    }

    renderFrame(frameState: FrameState, target: HTMLElement): HTMLElement {
        this.interpolationShader.bind(this.gl);
        this.interpolationShader.render(this.gl, [0, 0, 0, 0], this.valueFb.fbo);
        this.interpolatedValues = getCurrentFramebuffersPixels(this.webGlCanvas) as Uint8Array;
        this.colorizationShader.bind(this.gl);
        this.colorizationShader.render(this.gl, [0, 0, 0, 0]);
        return this.webGlCanvas;
    }

    private compileInterpolationProgram(gl: WebGLRenderingContext, nrObservations: number): Program {
        const interpolationProgram = new Program(gl, `
            attribute vec2 a_position;
            varying vec2 v_pos;

            void main() {
                v_pos = a_position;
                gl_Position = vec4(a_position.xy, 0.0, 1.0);
            }
        `, `
            precision mediump float;
            uniform float u_power;
            uniform vec3 u_dataPoints[${nrObservations}];
            varying vec2 v_pos;

            float interpolate(vec2 pos, vec3 observations[${nrObservations}]) {
                float valSum = 0.0;
                float wSum = 0.0;
                for (int i = 0; i < ${nrObservations}; i++) {
                    float d = distance(pos, observations[i].xy);
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

        return interpolationProgram;
    }

    private compileColorizationProgram(gl: WebGLRenderingContext, colorRampSize: number): Program {
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
            uniform float u_colorRampValues[${colorRampSize}];
            uniform vec3 u_colorRampColors[${colorRampSize}];
            uniform bool u_smooth;
            uniform sampler2D u_valueTexture;
            varying vec2 v_textureCoord;

            vec3 valueToSmoothColor(in float value) {
                for (int i = 1; i < ${colorRampSize}; i++) {
                    if (value <= u_colorRampValues[i]) {
                        float alpha = (value - u_colorRampValues[i-1]) / (u_colorRampValues[i] - u_colorRampValues[i-1]);
                        vec3 color = alpha * (u_colorRampColors[i] - u_colorRampColors[i-1]) + u_colorRampColors[i-1];
                        return color;
                    }
                }
            }

            vec3 valueToStepColor(in float value) {
                for (int i = 1; i < ${colorRampSize}; i++) {
                    if (value <= u_colorRampValues[i]) {
                        return u_colorRampColors[i - 1];
                    }
                }
                return u_colorRampColors[${colorRampSize} - 1];
            }

            float rand(vec2 co){
                return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
            }

            void main() {
                vec4 pixelData = texture2D(u_valueTexture, v_textureCoord);
                float val = pixelData.x * u_colorRampValues[${colorRampSize} - 1];
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

        return colorizationProgram;
    }


    private readFeatureData(features: Feature<Point>[], maxEdgeLength: number, valueProperty: string): number[][] {

        const pointToObservation = (feature: Feature<Point>): number[] => {
            const coordinates = feature.getGeometry().getCoordinates();
            const props = feature.getProperties();
            return [coordinates[0], coordinates[1], props[valueProperty]];
        };

        const coordinates = features.map(f => f.getGeometry().getCoordinates());
        const delaunay = Delaunator.from(coordinates);

        let smallTriangles;
        if (maxEdgeLength) {
            smallTriangles = this.filterTrianglesByMaxEdgeLength(coordinates, delaunay.triangles, maxEdgeLength);
        } else {
            smallTriangles = delaunay.triangles;
        }

        const aObservations = [];
        for (const i of smallTriangles) {
            const o = pointToObservation(features[i]);
            aObservations.push(o);
        }

        return aObservations;
    }

    private featuresToDelaunay(coords: number[][]): number[][] {
        const delaunay = Delaunator.from(coords);
        return delaunay.triangles;
    }

    private filterTrianglesByMaxEdgeLength(pointCoords: number[][], triangleIndices: number[], threshold: number): number[] {
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
    }

    private extractCoordsAndValue(features: Feature<Point>[], valueProperty: string): number[][] {
        const extract = (feature: Feature<Point>): number[] => {
            const coordinates = feature.getGeometry().getCoordinates();
            const props = feature.getProperties();
            return [coordinates[0], coordinates[1], props[valueProperty]];
        };
        return features.map(f => extract(f));
    }

    private applyMatrix(obs: Matrix, transform: Matrix): Matrix {
        const out = [];
        for (const o of obs) {
            const v = o[2];
            const p = [o[0], o[1], 1];
            const t = matrixVectorProduct(transform, p);
            out.push([t[0], t[1], v]);
        }
        return out;
    }

    private getBbox(obs: Matrix): number[] {
        const xs = obs.map(p => p[0]);
        const ys = obs.map(p => p[1]);
        const xMin = Math.min(...xs);
        const xMax = Math.max(...xs);
        const yMin = Math.min(...ys);
        const yMax = Math.max(...ys);
        return [xMin, yMin, xMax, yMax];
    }
}

