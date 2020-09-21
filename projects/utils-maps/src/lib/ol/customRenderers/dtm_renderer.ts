import LayerRenderer from 'ol/renderer/Layer';
import ImageLayer from 'ol/layer/Image';
import { FrameState } from 'ol/PluggableMap';
import { transformExtent } from 'ol/proj';
import Static from 'ol/source/ImageStatic';
import { Shader, Program, Uniform, Texture, Attribute } from '../../webgl/engine.core';
import { createTextCanvas } from '../../webgl/engine.helpers';
import { bindProgram } from '../../webgl/webgl';
import { ShapeA, rectangleA } from '../../webgl/engine.shapes';
import { flattenRecursive } from '../../webgl/utils';



export class DtmLayer extends ImageLayer {
    private renderer: DtmImageRenderer;

    constructor(options) {
        super(options);
    }

    createRenderer(): DtmImageRenderer {
        this.renderer = new DtmImageRenderer(this);
        return this.renderer;
    }

    updateSunAngle(angle: number[]): void {
        this.renderer.updateSunAngle(angle);
    }
}


/**
 * This renderer serves as a illustration of a very common technique in WebGL: normal-maps.
 * Here we use a texture from NASA's SRTM mission as our base-DTM.
 * Based on this, we calculate surface-normals. For each pixel in the DTM, we check how the surface-normal
 * is aligned with an incoming sun-ray.
 *
 * In real-world applications, many more such techniques are employed. Alongside normal-maps there are:
 *  - specular maps,
 *  - occlusion maps,
 *  - ...
 */
export class DtmImageRenderer extends LayerRenderer<ImageLayer> {

    readonly canvas: HTMLCanvasElement;
    readonly gl: WebGLRenderingContext;
    readonly shader: Shader;
    readonly projection;
    private state: 'loading' | 'ready' = 'loading';

    constructor(layer: ImageLayer) {
        super(layer);

        // Step 1: setting up canvas
        const canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 800;
        canvas.style.position = 'absolute';

        // Step 2: setting up webgl
        const gl = canvas.getContext('webgl');

        // Step 3: setting up variables for program
        const source = layer.getSource() as Static;
        const currentProjection = source.getProjection();
        const bbox = source.getImageExtent();
        const rectangleInWorldPosition = this.bboxOntoRectangle(2, 2, bbox);
        const image = createTextCanvas('test', 2048, 2048, 'red');

        // Step 4: setting up program
        const program = new Program(gl, `
            attribute vec3 a_position;
            attribute vec2 a_texturePosition;
            uniform mat3 u_world2pix;
            uniform mat3 u_pix2canv;
            varying vec2 v_texturePosition;
            void main() {
                vec3 pixelPosition = u_world2pix * vec3(a_position.x, a_position.y, 1.);
                vec3 canvasPosition = u_pix2canv * pixelPosition;
                gl_Position = vec4(canvasPosition.x, canvasPosition.y, 0., 1.);
                v_texturePosition = a_texturePosition;
            }
        `, `
            precision mediump float;
            uniform sampler2D u_srtm;
            uniform float u_imageSize;
            uniform vec3 u_sun;
            varying vec2 v_texturePosition;
            void main() {
                float delta = 4. / u_imageSize;
                float top = texture2D(u_srtm, vec2(v_texturePosition.x,         1. - v_texturePosition.y + delta)).r;
                float bot = texture2D(u_srtm, vec2(v_texturePosition.x,         1. - v_texturePosition.y - delta)).r;
                float lft = texture2D(u_srtm, vec2(v_texturePosition.x + delta, 1. - v_texturePosition.y        )).r;
                float rgt = texture2D(u_srtm, vec2(v_texturePosition.x - delta, 1. - v_texturePosition.y        )).r;

                vec3 surfaceNormal = vec3(
                    lft - rgt,
                    bot - top,
                    2. * delta
                );
                surfaceNormal = normalize(surfaceNormal);
                vec3 sunNormal = normalize(u_sun);
                float alignment = abs(dot(sunNormal, surfaceNormal));

                gl_FragColor = vec4(0., 0., 0., 0.5 * alignment);
            }
        `);
        bindProgram(gl, program.program); // todo: is this required?

        const shader = new Shader(
            program,
            [
                new Attribute(gl, program, 'a_position', rectangleInWorldPosition.vertices),
                new Attribute(gl, program, 'a_texturePosition', rectangleInWorldPosition.texturePositions)
            ], [
                new Uniform(gl, program, 'u_imageSize', 'float', [2048.]),
                new Uniform(gl, program, 'u_sun', 'vec3', [0., 0., 1.]),  // array, pointing to sun from middle of map.
                new Uniform(gl, program, 'u_world2pix', 'mat3', flattenRecursive([
                    [1., 0., 0.],
                    [0., 1., 0.],
                    [0., 0., 1.]
                ])),
                new Uniform(gl, program, 'u_pix2canv', 'mat3', flattenRecursive([
                    [1. /  (canvas.width / 2),  0.,                        0. ],
                    [0,                        -1. / (canvas.height / 2),  0. ],
                    [-1.,                      1.,                         1. ]
                ]))
            ], [
                new Texture(gl, program, 'u_srtm', image, 0)
            ]
        );
        shader.bind(gl);

        // binding data for later use
        this.shader = shader;
        this.canvas = canvas;
        this.gl = gl;
        this.projection = currentProjection;

        // step 5: loading actual image
        const imageWrapper = source.getImage(bbox, 0.02197265625, 2.440000295639038, currentProjection);
        imageWrapper.addEventListener('change', (evt: Event) => {
            const newImage = imageWrapper.getImage() as HTMLImageElement | HTMLCanvasElement;
            this.shader.updateTextureData(this.gl, 'u_srtm', newImage);
            this.shader.bind(this.gl);
            this.state = 'ready';
            super.getLayer().changed();
        });
        imageWrapper.load();
    }


    prepareFrame(frameState: FrameState): boolean {
        if (this.state === 'ready') {
            const c2pT = frameState.coordinateToPixelTransform;
            const worldToPixelTransform = [
                [c2pT[0],   c2pT[1],    0. ],
                [c2pT[2],   c2pT[3],    0. ],
                [c2pT[4],   c2pT[5],    1. ]
            ];
            this.shader.updateUniformData(this.gl, 'u_world2pix', flattenRecursive(worldToPixelTransform));
            this.shader.bind(this.gl); // <--- @TODO: inefficient! Only re-bind world2pix matrix.

            if (frameState.viewState.projection !== this.projection) {
                this.reprojectImage(frameState.viewState.projection);
            }
        }

        return true;
    }


    renderFrame(frameState: FrameState, target: HTMLElement): HTMLElement {
        if (this.state === 'ready') {
            this.shader.render(this.gl);
            this.transformCanvas(frameState);
        }
        return this.canvas;
    }


    updateSunAngle(angle: number[]): void {
        this.shader.updateUniformData(this.gl, 'u_sun', [angle[0], angle[1], 1.0]);
        this.shader.bind(this.gl);
        this.shader.render(this.gl);
    }


    private bboxOntoRectangle(width: number, height: number, bbox: number[]): ShapeA {
        const rect = rectangleA(width, height);
        for (const vertex of rect.vertices) {
            const x = vertex[0];
            const y = vertex[1];
            vertex[0] = (x === width / 2) ? bbox[2] : bbox[0];
            vertex[1] = (y === height / 2) ? bbox[3] : bbox[1];
        }
        return rect;
    }

    private reprojectImage(targetProjection): void {
        const source = super.getLayer().getSource() as Static;
        const sourceProjection = source.getProjection();
        const bbox = source.getImageExtent();
        const bboxInTargetProj = transformExtent(bbox, sourceProjection, targetProjection);
        const newRectangleInWorldPosition = this.bboxOntoRectangle(2, 2, bboxInTargetProj);
        this.shader.updateAttributeData(this.gl, 'a_position', newRectangleInWorldPosition.vertices);
        this.shader.bind(this.gl);
    }

    private transformCanvas(frameState: FrameState): void {
        const layerState = frameState.layerStatesArray[frameState.layerIndex];
        const pixelRatio = frameState.pixelRatio;
        const size = frameState.size;
        const width = Math.round(size[0] * pixelRatio);
        const height = Math.round(size[1] * pixelRatio);
        const opacity = layerState.opacity;

        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.opacity = `${opacity}`;

        const pix2canv = [
            [1. /  (this.canvas.width / 2),  0.,                              0. ],
            [0,                              -1. / (this.canvas.height / 2),  0. ],
            [-1.,                            1.,                              1. ]
        ];
        this.shader.updateUniformData(this.gl, 'u_pix2canv', flattenRecursive(pix2canv));
        // this.interpolationShader.bind(this.gl); <-- not required: already happens in `prepareFrame`
    }
}
