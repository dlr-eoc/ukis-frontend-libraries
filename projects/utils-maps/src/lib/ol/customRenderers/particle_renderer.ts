import { Feature } from 'ol';
import { FrameState } from 'ol/PluggableMap';
import LayerRenderer from 'ol/renderer/Layer';
import VectorLayer from 'ol/layer/Vector';
import Point from 'ol/geom/Point';
import Delaunator from 'delaunator';
import { Shader, Framebuffer, Program, Uniform, Texture, renderLoop, Attribute } from '../../webgl/engine.core';
import { rectangleA } from '../../webgl/engine.shapes';
import { flattenRecursive } from '../../webgl/utils';


export class WindFieldLayer extends VectorLayer {
    constructor(options) {
        super(options);
    }

    createRenderer(): ParticleRenderer {
        return new ParticleRenderer(this);
    }

    startAnimation(fps: number): void {
        // @ts-ignore
        (this.getRenderer() as ParticleRenderer).startAnimation(fps);
    }
}

/**
 * This renderer illustrates how WebGL can be used to to pixel-by-pixel calculations
 * that would be too expensive on a CPU but are easily done on a GPU.
 * In our shader we go through every pixel and calculate its new state from
 * its old state and that of it's environment.
 *
 * Note how similar in principle this is to Conway's Game of Life: one pixel's state is determined
 * by its surroundings from the time-step before.
 *
 * This renderer also illustrates another common technique in WebGL: `framebuffer-ping-pong`.
 * This is where the output of one shader is stored on a framebuffer and then passed to a subsequent shader.
 * With this, we can create a multi-step-pipeline, where each shader uses the previous
 * one's output as its own input.
 */
export class ParticleRenderer extends LayerRenderer<VectorLayer> {


    readonly canvas: HTMLCanvasElement;
    readonly gl: WebGLRenderingContext;
    readonly interpolationShader: Shader;
    readonly particleShader: Shader;
    readonly textureMixShader: Shader;
    readonly interpolFb: Framebuffer;
    readonly particleFb1: Framebuffer;
    readonly particleFb2: Framebuffer;
    private fps = 30;

    constructor(layer: VectorLayer) {
        super(layer);

        // setting up canvas
        const canvas = document.createElement('canvas');
        canvas.width = 1000;
        canvas.height = 1000;
        canvas.style.position = 'absolute';


        // preparing data
        const source = layer.getSource();
        const features = source.getFeatures() as Feature<Point>[];
        const aObservation = this.pointsToObservations(features);

        const gl = canvas.getContext('webgl');
        const rect = rectangleA(2.0, 2.0);



        // --------- Step 1: interpolating field between data points. ------------------------------------------

        const interpolProgram = new Program(gl, `
            attribute vec4 a_observation;
            uniform mat3 u_world2pix;
            uniform mat3 u_pix2canv;
            varying vec2 v_value;

            void main() {
                vec3 pixelPosition = u_world2pix * vec3(a_observation.x, a_observation.y, 1.);
                vec3 canvasPosition = u_pix2canv * pixelPosition;
                v_value = (a_observation.zw / 2.0) + 0.5;
                gl_Position = vec4(canvasPosition.xy, 0.0, 1.0);
            }
        `, `
            precision mediump float;
            varying vec2 v_value;

            void main() {
                gl_FragColor = vec4(v_value.xy, 0.0, 1.0);
            }
        `);

        const interpolShader = new Shader(interpolProgram, [
            new Attribute(gl, interpolProgram, 'a_observation', aObservation)
        ], [
            new Uniform(gl, interpolProgram, 'u_world2pix', 'mat3', flattenRecursive([
                [1., 0., 0.],
                [0., 1., 0.],
                [0., 0., 1.]
            ])),
            new Uniform(gl, interpolProgram, 'u_pix2canv', 'mat3', flattenRecursive([
                [1. /  (canvas.width / 2),  0.,                        0. ],
                [0,                        -1. / (canvas.height / 2),  0. ],
                [-1.,                      1.,                         1. ]
            ]))
        ], []);

        const interpolFb = new Framebuffer(gl, canvas.width, canvas.height);




        // ------------------ Step 2: moving particles along force field ------------------------------------

        const particleFb1 = new Framebuffer(gl, canvas.width, canvas.height);
        const particleFb2 = new Framebuffer(gl, canvas.width, canvas.height);

        const particleProgram = new Program(gl, `
            attribute vec3 a_vertex;
            attribute vec2 a_textureCoord;
            varying vec2 v_textureCoord;
            void main() {
                v_textureCoord = a_textureCoord;
                gl_Position = vec4(a_vertex.xyz, 1.0);
            }
        `, `
        precision mediump float;
        uniform sampler2D u_forceTexture;
        uniform sampler2D u_particleTexture;
        uniform float u_deltaT;
        varying vec2 v_textureCoord;

        float rand(vec2 co){
            return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
        }

        void main() {
            // moving particles
            vec2 speed = ((texture2D(u_forceTexture, v_textureCoord) - 0.5 ) * 2.0).xy;
            vec2 samplePoint = v_textureCoord - speed * u_deltaT * 0.1;
            samplePoint = mod(samplePoint, 1.0);
            gl_FragColor = texture2D(u_particleTexture, samplePoint);

            // fade out
            float fadeRate = 0.95;
            if (gl_FragColor.x != 1.0) {
                vec4 lastColor = texture2D(u_particleTexture, v_textureCoord);
                vec4 fadedColor = vec4(lastColor.xyz * fadeRate, 1.0);
                gl_FragColor = fadedColor;
            }

            // spawn and die-off
            float spawnChance = 0.0005;
            float dieChance = 0.2;
            float randVal = rand(v_textureCoord * abs(sin(u_deltaT)) * 0.01);
            if (randVal > (1. - spawnChance)) {  // spawn
                gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
            } if (randVal < dieChance) {   // die off
                gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
            }

            // no particles outside texture
            if (texture2D(u_forceTexture, v_textureCoord) == vec4(0.0, 0.0, 0.0, 0.0)) {
                gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
            }
        }
        `);

        const particleShader = new Shader(particleProgram, [
            new Attribute(gl, particleProgram, 'a_vertex', rect.vertices),
            new Attribute(gl, particleProgram, 'a_textureCoord', rect.texturePositions)
        ], [
            new Uniform(gl, particleProgram, 'u_deltaT', 'float', [0.01])
        ], [
            new Texture(gl, particleProgram, 'u_forceTexture', interpolFb.fbo.texture, 0),
            new Texture(gl, particleProgram, 'u_particleTexture', particleFb1.fbo.texture, 1)
        ]);




        // ------------------ Step 3: Mixing background-field and particles ------------------------------------

        const textureMixProgram = new Program(gl, `
            attribute vec3 a_vertex;
            attribute vec2 a_textureCoord;
            varying vec2 v_textureCoord;
            void main() {
                v_textureCoord = a_textureCoord;
                gl_Position = vec4(a_vertex.xyz, 1.0);
            }
        `, `
            precision mediump float;
            uniform sampler2D u_bgTexture;
            uniform sampler2D u_particleTexture;
            varying vec2 v_textureCoord;
            void main() {
                vec4 bgColor = texture2D(u_bgTexture, v_textureCoord);
                vec4 particleColor = texture2D(u_particleTexture, v_textureCoord);
                vec4 colorMix = max(particleColor, bgColor);
                gl_FragColor = colorMix;
            }
        `);
        const textureMixShader = new Shader(textureMixProgram, [
            new Attribute(gl, textureMixProgram, 'a_vertex', rect.vertices),
            new Attribute(gl, textureMixProgram, 'a_textureCoord', rect.texturePositions)
        ], [], [
            new Texture(gl, textureMixProgram, 'u_bgTexture', interpolFb.fbo.texture, 0),
            new Texture(gl, textureMixProgram, 'u_particleTexture', particleFb1.fbo.texture, 1)
        ]);


        // Setup
        interpolShader.bind(gl);
        interpolShader.render(gl, [0, 0, 0, 0], interpolFb.fbo);
        textureMixShader.bind(gl);
        textureMixShader.render(gl);
        particleShader.bind(gl);

        // making data available for later
        this.canvas = canvas;
        this.gl = gl;
        this.interpolationShader = interpolShader;
        this.particleShader = particleShader;
        this.textureMixShader = textureMixShader;
        this.interpolFb = interpolFb;
        this.particleFb1 = particleFb1;
        this.particleFb2 = particleFb2;
    }

    /**
     * We could also have just started the animation right in the constructor.
     * Instead we created a separate `startAnimation` function so that it can optionally be run outside angular's zone,
     * preventing it from firing too many change cycles.
     * We leave this decision to the user, however, because it is not an ol-renderers duty to handle any angular-logic.
     */
    startAnimation(fps: number): void {
        this.fps = fps;

        // Animation loop
        let i = 0;
        let fbIn;
        let fbOut;
        renderLoop(this.fps, (deltaT: number) => {
            i += 1;

            // framebuffer ping-pong
            if (i % 2 === 1) {
                fbIn = this.particleFb1;
                fbOut = this.particleFb2;
            } else {
                fbIn = this.particleFb2;
                fbOut = this.particleFb1;
            }

            // particle shader
            this.particleShader.textures[1].texture = fbIn.fbo.texture;
            this.particleShader.updateUniformData(this.gl, 'u_deltaT', [deltaT]);
            this.particleShader.bind(this.gl);
            this.particleShader.render(this.gl, null, fbOut.fbo);

            // texture to output
            this.textureMixShader.textures[1].texture = fbOut.fbo.texture;
            this.textureMixShader.bind(this.gl);
            this.textureMixShader.render(this.gl);
        });
    }

    stopAnimation(): void {
        this.fps = 0;
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
        this.interpolationShader.updateUniformData(this.gl, 'u_world2pix', flattenRecursive(worldToPixelTransform));

        // update pix2canvas
        const pix2canv = [
            [1. /  (this.canvas.width / 2),  0.,                              0. ],
            [0,                              -1. / (this.canvas.height / 2),  0. ],
            [-1.,                            1.,                              1. ]
        ];
        this.interpolationShader.updateUniformData(this.gl, 'u_pix2canv', flattenRecursive(pix2canv));

        // bind new data and render
        this.interpolationShader.bind(this.gl);
        this.interpolationShader.render(this.gl, [0, 0, 0, 0], this.interpolFb.fbo);

        return true;
    }


    renderFrame(frameState: FrameState, target: HTMLElement): HTMLElement {
        return this.canvas;
    }


    private pointsToObservations(features: Feature<Point>[]): number[][] {

        const pointToObservation = (feature: Feature<Point>): number[] => {
            const coords = feature.getGeometry().getCoordinates();
            const props = feature.getProperties();
            return [coords[0], coords[1], props.wind[0], props.wind[1]];
        };

        const coordinates = features.map(f => f.getGeometry().getCoordinates());
        const delauney = Delaunator.from(coordinates);
        const indices = delauney.triangles;
        const aObservations = [];
        for (const i of indices) {
            const o = pointToObservation(features[i]);
            aObservations.push(o);
        }

        return aObservations;
    }
}
