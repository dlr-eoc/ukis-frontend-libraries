import { TextureObject, createShaderProgram, createFloatBuffer, getAttributeLocation, bindBufferToAttribute, clearBackground, getUniformLocation, bindTextureToUniform, bindProgram, bindValueToUniform, createTexture } from './webgl';
import { rectangleA } from './engine.shapes';



export const displayImageOn = (canvas: HTMLCanvasElement, image: HTMLImageElement): void => {

    const gl = canvas.getContext('webgl');
    if (!gl) {
        throw new Error('No context');
    }

    const vertexShaderSource = `
    attribute vec4 a_vertex;
    attribute vec2 a_textureCoord;
    varying vec2 v_textureCoord;
    void main() {
        v_textureCoord = a_textureCoord;
        gl_Position = a_vertex;
    }
    `;
    const fragmentShaderSource = `
    precision mediump float;
    uniform sampler2D u_texture;
    // uniform vec2 u_textureSize;
    varying vec2 v_textureCoord;
    void main() {
        // vec2 delta = vec2(1., 1.) / u_textureSize;
        gl_FragColor = texture2D(u_texture, v_textureCoord); //  * 0. + vec4(5., 5., 0., 1.);
    }
    `;
    const program = createShaderProgram(gl, vertexShaderSource, fragmentShaderSource);
    bindProgram(gl, program);

    const rct = rectangleA(1.3, 1.3);

    const bxData = createFloatBuffer(gl, rct.vertices);
    const bxLoc = getAttributeLocation(gl, program, 'a_vertex');
    bindBufferToAttribute(gl, bxLoc, bxData);

    const texCoords = createFloatBuffer(gl, rct.texturePositions);
    const texCoordsLoc = getAttributeLocation(gl, program, 'a_textureCoord');
    bindBufferToAttribute(gl, texCoordsLoc, texCoords);

    const texture = createTexture(gl, image);
    const textureLoc = getUniformLocation(gl, program, 'u_texture');
    bindTextureToUniform(gl, texture.texture, 0, textureLoc);

    clearBackground(gl, [.9, .9, .9, 1.0]);
    gl.drawArrays(gl.TRIANGLES, 0, rct.vertices.length);
};



export const createTextCanvas = (text: string, width: number = 256, height: number = 256, color: string = 'red') => {
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) {
        throw new Error('no context');
    }
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    ctx.font = `bold ${height * 5 / 6 | 0}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText(text, width / 2, height / 2);
    return ctx.canvas;
};


export const canvasToImage = (canvas: HTMLCanvasElement): HTMLImageElement => {
    const image = document.createElement('img');
    image.width = canvas.width;
    image.height = canvas.height;
    image.src = canvas.toDataURL('image/png');
    return image;
};


export function downloadJson(data: object, fileName: string) {
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: 'text/json;charset=utf-8;' });
    return downloadBlob(blob, fileName);
}


export function downloadBlob(blob: Blob, fileName: string) {
    const url = window.URL.createObjectURL(blob);
    downloadUrl(url, fileName);
}


export function downloadUrl(url: string, fileName: string) {
    // window.open(url) doesn't work here. Instead, we create a temporary link item and simulate a click on it.
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = fileName;
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

