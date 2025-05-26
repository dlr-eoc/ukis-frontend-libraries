import { FrameState } from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { createShaderProgram, bindProgram, clearBackground } from '../../webgl/webgl';
import CanvasVectorLayerRenderer from 'ol/renderer/canvas/VectorLayer';


export class CustomWebGlVectorLayer extends VectorLayer<VectorSource> {
    createRenderer(): MinimalWebGlRenderer {
        return new MinimalWebGlRenderer(this, {});
    }
}


/**
 * This renderer aims to be an absolute minimum example of how a webgl-renderer can look.
 * It doesn't even do word-coordinate to canvas-coordinate transformation.
 * All it tries to show is what interfaces to implement to display *something* on the map with webgl.
 */
export class MinimalWebGlRenderer extends CanvasVectorLayerRenderer  {

    private canvas: HTMLCanvasElement;
    private gl: WebGLRenderingContext;

    constructor(layer: VectorLayer<VectorSource>, options: Object) {
        super(layer);

        this.canvas = document.createElement('canvas');
        this.canvas.width = 600;
        this.canvas.height = 400;
        this.canvas.style.position = 'absolute';

        const gl = this.canvas.getContext('webgl');

        const vertexShader = `
            void main() {
                gl_Position = vec4(0, 0, 0, 1);
                gl_PointSize = 100.0;
            }
        `;
        const fragmentShader = `
            precision highp float;
            void main() {
                gl_FragColor = vec4(1, 0.5, 0, 1);
            }
        `;
        const program = createShaderProgram(gl, vertexShader, fragmentShader);
        bindProgram(gl, program);

        this.gl = gl;
    }

    /**
     * Determine whether render should be called.
     * Mostly this means: has a new part of the map been moved into view?
     * This is rather important, so that re-render happens only at the *end* of a zoom/pan.
     * @return {boolean} Layer is ready to be rendered.
     */
    prepareFrame(frameState: FrameState): boolean {
        return true;
    }


    /**
     * Render the layer.
     * @param {HTMLElement} target Target that may be used to render content to.
     * @return {HTMLElement} The rendered element.
     */
    renderFrame(frameState: FrameState, target: HTMLElement): HTMLElement {
        const gl = this.gl;

        clearBackground(gl, [0, 0, 0, 0]);
        gl.drawArrays(gl.POINTS, 0, 1);

        return this.canvas;
    }

    renderDeclutter(frameState: FrameState) {
    }


}
