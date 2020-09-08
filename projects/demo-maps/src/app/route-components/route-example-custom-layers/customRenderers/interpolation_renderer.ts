import { Feature } from 'ol';
import { FrameState } from 'ol/PluggableMap';
import LayerRenderer from 'ol/renderer/Layer';
import VectorLayer from 'ol/layer/Vector';
import Point from 'ol/geom/Point';
import { Vector as VectorSource } from 'ol/source';
import Delaunator from 'delaunator';
import { Shader, Program, Attribute, Uniform, flattenMatrix, pointDistance } from '@dlr-eoc/utils-maps';


export interface ColorRamp {
    [key: number]: [number, number, number]
}

export interface InterpolationLayerOptions {
    source: VectorSource<Point>;
    maxEdgeLength: number;
    distanceWeightingPower: number;
    colorRamp: ColorRamp;
    smooth: boolean;
    [key: string]: any;
}


export class InterpolationLayer extends VectorLayer {

    readonly options: InterpolationLayerOptions;

    constructor(options: InterpolationLayerOptions) {
        super(options);
        this.options = options;
    }

    createRenderer(): InterpolationRenderer {
        return new InterpolationRenderer(this, this.options.maxEdgeLength, this.options.distanceWeightingPower, this.options.colorRamp, this.options.smooth);
    }

    updateParas(power: number, smooth: boolean, colorRamp: ColorRamp): void {
        (super.getRenderer() as InterpolationRenderer).setPower(power);
    }
}


export class InterpolationRenderer extends LayerRenderer<VectorLayer> {

    readonly canvas: HTMLCanvasElement;
    readonly gl: WebGLRenderingContext;
    readonly waveHeightShader: Shader;

    constructor(layer: VectorLayer, maxEdgeLength: number, power: number, colorRamp: ColorRamp, smooth: boolean) {
        super(layer);

        // setting up canvas
        const canvas = document.createElement('canvas');
        canvas.width = 1000;
        canvas.height = 1000;
        canvas.style.position = 'absolute';


        // preparing data
        const source = layer.getSource();
        const features = source.getFeatures() as Feature<Point>[];
        const uObservations = this.pointsToObservations(features, maxEdgeLength);

        const gl = canvas.getContext('webgl');


        const waveHeightProgram = new Program(gl, `
            precision mediump float;
            attribute vec2 a_position;
            uniform mat3 u_world2pix;
            uniform mat3 u_pix2canv;
            varying vec2 v_pos;

            void main() {
                vec3 pixelPosition = u_world2pix * vec3(a_position.x, a_position.y, 1.);
                vec3 canvasPosition = u_pix2canv * pixelPosition;
                v_pos = canvasPosition.xy;
                gl_Position = vec4(canvasPosition.xy, 0.0, 1.0);
            }
        `, `
            precision mediump float;
            uniform vec3 u_dataPoints[${uObservations.length}];
            uniform float u_power;
            uniform mat3 u_world2pix;
            uniform mat3 u_pix2canv;
            uniform float u_colorRampValues[${Object.keys(colorRamp).length}];
            uniform vec3 u_colorRampColors[${Object.values(colorRamp).length}];
            uniform bool u_smooth;
            varying vec2 v_pos;

            vec2 worldToCanvCoords(vec2 worldCoords) {
                vec3 pixelPosition = u_world2pix * vec3(worldCoords.xy, 1.);
                vec3 canvasPosition = u_pix2canv * pixelPosition;
                return canvasPosition.xy;
            }

            float interpolate(vec2 pos, vec3 observations[${uObservations.length}]) {
                float valSum = 0.0;
                float wSum = 0.0;
                for (int i = 0; i < ${uObservations.length}; i++) {
                    float d = distance(pos, worldToCanvCoords(observations[i].xy));
                    float w = 1.0 / pow(d, u_power);
                    valSum += observations[i].z * w;
                    wSum += w;
                }
                return valSum / wSum;
            }

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
                float val = interpolate(v_pos, u_dataPoints);
                vec3 rgb = vec3(0.0, 0.0, 0.0);
                if (u_smooth) {
                    rgb = valueToSmoothColor(val);
                } else {
                    rgb = valueToStepColor(val);
                }
                gl_FragColor = vec4(rgb.x / 255.0, rgb.z / 255.0, rgb.y / 255.0, 1.0);
            }
        `);

        const waveHeightShader = new Shader(waveHeightProgram, [
            new Attribute(gl, waveHeightProgram, 'a_position',
                uObservations.map(obs => { return [obs[0], obs[1]]; })
            )
        ], [
            new Uniform(gl, waveHeightProgram, 'u_world2pix', 'mat3', flattenMatrix([
                [1., 0., 0.],
                [0., 1., 0.],
                [0., 0., 1.]
            ])),
            new Uniform(gl, waveHeightProgram, 'u_pix2canv', 'mat3', flattenMatrix([
                [1. /  (canvas.width / 2),  0.,                        0. ],
                [0,                        -1. / (canvas.height / 2),  0. ],
                [-1.,                      1.,                         1. ]
            ])),
            new Uniform(gl, waveHeightProgram, 'u_dataPoints', 'vec3[]', flattenMatrix(uObservations)),
            new Uniform(gl, waveHeightProgram, 'u_power', 'float', [power]),
            new Uniform(gl, waveHeightProgram, 'u_colorRampValues', 'float[]', Object.keys(colorRamp).map(k => parseFloat(k))),
            new Uniform(gl, waveHeightProgram, 'u_colorRampColors', 'vec3[]', flattenMatrix(Object.values(colorRamp))),
            new Uniform(gl, waveHeightProgram, 'u_smooth', 'bool', [smooth ? 1 : 0])
        ], []);

        // Setup
        waveHeightShader.bind(gl);
        waveHeightShader.render(gl, [0, 0, 0, 0]);

        // making data available for later
        this.canvas = canvas;
        this.gl = gl;
        this.waveHeightShader = waveHeightShader;
    }

    prepareFrame(frameState: FrameState): boolean {
        const layerState = frameState.layerStatesArray[frameState.layerIndex];
        const size = frameState.size;
        const opacity = layerState.opacity;
        if (size[0] !== this.canvas.width || size[1] !== this.canvas.height) {
            this.canvas.width = size[0];
            this.canvas.height = size[1];
        }
        this.canvas.style.opacity = `${opacity}`;

        // update world2pix
        const c2pT = frameState.coordinateToPixelTransform;
        const worldToPixelTransform = [
            [c2pT[0],   c2pT[1],    0. ],
            [c2pT[2],   c2pT[3],    0. ],
            [c2pT[4],   c2pT[5],    1. ]
        ];
        this.waveHeightShader.updateUniformData(this.gl, 'u_world2pix', flattenMatrix(worldToPixelTransform));

        // update pix2canvas
        const pix2canv = [
            [1. /  (this.canvas.width / 2),  0.,                              0. ],
            [0,                              -1. / (this.canvas.height / 2),  0. ],
            [-1.,                            1.,                              1. ]
        ];
        this.waveHeightShader.updateUniformData(this.gl, 'u_pix2canv', flattenMatrix(pix2canv));

        return true;
    }

    renderFrame(frameState: FrameState, target: HTMLElement): HTMLElement {
        this.waveHeightShader.bind(this.gl);
        this.waveHeightShader.render(this.gl, [0, 0, 0, 0]);
        return this.canvas;
    }

    public setPower(power: number) {
        this.waveHeightShader.updateUniformData(this.gl, 'u_power', [power]);
        this.waveHeightShader.bind(this.gl);
        this.waveHeightShader.render(this.gl, [0, 0, 0, 0]);
    }


    private pointsToObservations(features: Feature<Point>[], maxEdgeLength: number): number[][] {

        const pointToObservation = (feature: Feature<Point>): number[] => {
            const coordinates = feature.getGeometry().getCoordinates();
            const props = feature.getProperties();
            return [coordinates[0], coordinates[1], props.val];
        };

        const coordinates = features.map(f => f.getGeometry().getCoordinates());
        const delaunay = Delaunator.from(coordinates);

        let smallTriangles;
        if (maxEdgeLength) {
            smallTriangles = this.filterDelaunayTrianglesByMaxEdgeLength(coordinates, delaunay.triangles, maxEdgeLength);
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

    private filterDelaunayTrianglesByMaxEdgeLength(pointCoords: number[][], triangleIndices: number[], threshold: number): number[] {
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
}

