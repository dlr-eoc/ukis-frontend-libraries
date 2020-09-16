/**
 * WEBGL
 *
 * A rasterization engine that allows to draw points, line segments, or triangles.
 *
 * Vertex shaders take whatever coordinates you use and return a 3-d array with elements between -1 and 1.
 * Basically, this is a 3d-array, but WebGl does not use the z-axis for real perspective, but only to differentiate
 * what pixel lies in front of another.
 * This is not like looking in a 3d-box, but rather like looking on multiple stacked sheets on a projector.
 * Actually, this is a lie. WebGl uses 4 coordinates: x, y, z and w. The above only holds if you keep w at 1.
 * After applying the vertex shader, WebGl divides all coordinates by w, yielding (x/w, y/w, z/w, 1).
 * This can be used to calculate projections - google for 'homogeneous coordinates' to find out more.
 * Compare this [site](https://www.tomdalling.com/blog/modern-opengl/explaining-homogenous-coordinates-and-projective-geometry/)
 * and the shader `basic3d.vert.glsl`.
 *
 * WebGL knows two data structures:
 *  - buffers (generic byte arrays): usually positions, normals, texture-coordinates, vertex-colors etc.
 *    buffers are accessed in shaders as 'attributes'.
 *    note that buffers contain one entry for each vertex.
 *  - textures (bitmap images).
 *
 * Shaders use these data structures in two different ways.
 *  - Attributes are values, one per vertex.
 *    For the shader, attributes are read-only.
 *    Attributes default to [0, 0, 0, 1]
 *  - Uniforms are values, one per shader.
 *    For the shader, uniforms are read-only.
 *
 * Apart from this, shaders know about two more types of data:
 *  - Varyings are values that are passed from vertex-shader to fragment-shader.
 *    They are read-only only for the fragment-shader.
 *  - Const: a compile-time constant.
 *
 * A program is just a list of compiled and linked vertex- and fragment-shaders.
 *
 *
 * Drawing: there's drawArrays and drawElements.
 *  - drawArrays is the robust all-rounder.
 *  - drawElements can be more performant if you share vertices between objects.
 *
 *
 * Rendering data is fast, but uploading it into GPU memory is slow.
 * Optimizing WebGl performance mostly means: Avoiding having GPU and CPU wait for each other.
 * The more the GPU can do in bulk, the better. The more often you have to upload data from CPU to GPU, the worse.
 *  - So avoid switching programs, buffers and uniforms if you can.
 *    (You won't be able to avoid switching buffers, because every object is likely different. But sort your objects by their shaders, and you'll save a lot of time.)
 *  - Try to do translations, rotations and shears inside the vertex-shader instead of altering the object's buffer.
 *  - If appropriate, create über-shaders and über-buffers, that contain information for more than just one object.
 *
 * There is another thing that affects performance:
 * WebGL will only run fragment-shaders when the object's pixels aren't already obscured by a larger object in front of it.
 * That means it makes sense to first draw large objects that are close to the camera - all objects behind them won't need their fragment-shader executed.
 *
 * All `create*` functions unbind variables after setting their values. This is to avoid unwanted side-effects.
 *
 *
 *
 * WebGL components
 *    - global-state
 *        - ARRAY_BUFFER_BINDING: currently bound buffer
 *        - VERTEX_ARRAY_BINDING: currently bound vertex-array (in WebGL 1 this was always only the global vertex-array, in WebGL 2 you can now create your own ones)
 *        - ACTIVE_TEXTURE: currently bound texture
 *        - texture-units: a list of pointers to texture-buffers.
 *        - uniform-buffer-bindings (WebGL2 only): a list of pointers to uniform-buffers.
 *    - vertex-array: a list of pointers to attribute-buffers (+ metadata like datatype, stride, offset etc.).
 *        - all attributes must have the same number of elements (though one attribute's elements may be vec2's, while another one's may be vec3's)
 *        - drawArray: attributes repeat elements in groups of three for drawing triangles
 *        - drawElements: the indices for the triangles are defined in ELEMENT_ARRAY_BUFFER_BINDING
 *        - WebGL 2.0: allows you to create your own vertex-arrays, whereas 1.0 always only used one global vertex-array.
 */

import { flattenRecursive, isPowerOf } from './math';



const shaderInputTextureBindPoint = 0;
const textureConstructionBindPoint = 7;




/**
 * Compile shader.
 */
export const compileShader = (gl: WebGLRenderingContext, typeBit: number, shaderSource: string): WebGLShader => {
    const shader = gl.createShader(typeBit);
    if (!shader) {
        throw new Error('No shader was created');
    }
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        throw new Error(`An error occurred compiling the shader: ${gl.getShaderInfoLog(shader)}.    \n\n Shader code: ${shaderSource}`);
    }
    return shader;
};


/**
 * Note that every program *must* have one and only one vertex-shader
 * and one and only one fragment shader.
 * That means you cannot add multiple fragment-shaders in one program. Instead, either load them in consecutively as part of different programs,
 * or generate an über-shader that contains both codes.
 */
export const createShaderProgram = (gl: WebGLRenderingContext, vertexShaderSource: string, fragmentShaderSource: string): WebGLProgram => {

    const program = gl.createProgram();
    if (!program) {
        throw new Error('No program was created');
    }

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    gl.detachShader(program, vertexShader);
    gl.detachShader(program, fragmentShader);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        gl.deleteProgram(program);
        throw new Error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
    }

    return program;
};


export const setup3dScene = (gl: WebGLRenderingContext): void => {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.cullFace(gl.BACK);
    clearBackground(gl, [0, 0, 0, 1]);
};

export const updateViewPort = (gl: WebGLRenderingContext, x0: number, y0: number, x1: number, y1: number): void => {
    gl.viewport(x0, y0, x1, y1);
};


export const bindProgram = (gl: WebGLRenderingContext, program: WebGLProgram): void => {
    gl.useProgram(program);
};


export const clearBackground = (gl: WebGLRenderingContext, color: number[]): void => {
    gl.clearColor(color[0], color[1], color[2], color[3]);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
};


 /**
  * A generic buffer, together with it's metadata.
  */
export interface BufferObject {
    buffer: WebGLBuffer;
    vectorSize: number;
    vectorCount: number;
    type: number;
    normalize: boolean;
    stride: number;
    offset: number;
    drawingMode: number; // gl.TRIANGLES, gl.POINTS, or gl.LINES
}


/**
 * Create buffer. Creation is slow! Do *before* render loop.
 */
export const createFloatBuffer = (gl: WebGLRenderingContext, data: number[][], drawingMode: number = gl.TRIANGLES): BufferObject => {

    const dataFlattened = new Float32Array(flattenRecursive(data));

    const buffer = gl.createBuffer();
    if (!buffer) {
        throw new Error('No buffer was created');
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, dataFlattened, gl.STATIC_DRAW);
    // STATIC_DRAW: tells WebGl that we are not likely to change this data much.
    gl.bindBuffer(gl.ARRAY_BUFFER, null);  // unbinding

    const bufferObject: BufferObject = {
        buffer: buffer,
        vectorSize: data[0].length,
        vectorCount: data.length,
        type: gl.FLOAT,   // the data is 32bit floats
        normalize: false, // don't normalize the data
        stride: 0,        // 0 = move forward size * sizeof(type) each iteration to get the next position. Only change this in very-high-performance jobs.
        offset: 0,        // start at the beginning of the buffer. Only change this in very-high-performance jobs.
        drawingMode: drawingMode
    };

    return bufferObject;
};


export const drawArray = (gl: WebGLRenderingContext, bo: BufferObject): void => {
    gl.drawArrays(bo.drawingMode, bo.offset, bo.vectorCount);
};



export const updateBufferData = (gl: WebGLRenderingContext, bo: BufferObject, newData: number[][]): BufferObject => {

    const dataFlattened = new Float32Array(flattenRecursive(newData));

    gl.bindBuffer(gl.ARRAY_BUFFER, bo.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, dataFlattened, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);  // unbinding

    const newBufferObject: BufferObject = {
        buffer: bo.buffer,
        vectorSize: newData[0].length,
        vectorCount: newData.length,
        type: gl.FLOAT,   // the data is 32bit floats
        normalize: false, // don't normalize the data
        stride: 0,        // 0 = move forward size * sizeof(type) each iteration to get the next position. Only change this in very-high-performance jobs.
        offset: 0,        // start at the beginning of the buffer. Only change this in very-high-performance jobs.
        drawingMode: bo.drawingMode,
    };

    return newBufferObject;
};




/**
 * Fetch attribute's location (attribute declared in some shader). Slow! Do *before* render loop.
 */
export const getAttributeLocation = (gl: WebGLRenderingContext, program: WebGLProgram, attributeName: string): number => {
    const loc = gl.getAttribLocation(program, attributeName);
    if (loc === -1) {
        throw new Error(`Couldn't find attribute ${attributeName} in program.`);
    }
    return loc;
};



/**
 * Attributes vary from vertex to vertex - that means that there are *many* of them.
 * So it makes sense for WebGl to store attribute values in a dedicated data structure - the buffer.
 */
export const bindBufferToAttribute = (gl: WebGLRenderingContext, attributeLocation: number, bufferObject: BufferObject): void => {
    // Bind buffer to global-state ARRAY_BUFFER
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferObject.buffer);
    // Enable editing of vertex-array-location
    gl.enableVertexAttribArray(attributeLocation);
    // Bind the buffer currently at global-state ARRAY_BUFFER to a vertex-array-location.
    gl.vertexAttribPointer(
        attributeLocation,
        bufferObject.vectorSize, bufferObject.type, bufferObject.normalize, bufferObject.stride, bufferObject.offset);
    // gl.disableVertexAttribArray(attributeLocation); <-- must not do this!
};


export interface IndexBufferObject {
    buffer: WebGLBuffer;
    count: number;
    type: number; // must be gl.UNSIGNED_SHORT
    offset: number;
    drawingMode: number; // gl.TRIANGLES, gl.POINTS, or gl.LINES
}

export const createIndexBuffer = (gl: WebGLRenderingContext, indices: number[][], drawingMode: number = gl.TRIANGLES): IndexBufferObject => {

    const indicesFlattened = new Uint16Array(flattenRecursive(indices));

    const buffer = gl.createBuffer();
    if (!buffer) {
        throw new Error('No buffer was created');
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicesFlattened, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    const bufferObject: IndexBufferObject = {
        buffer: buffer,
        count: indicesFlattened.length,
        type: gl.UNSIGNED_SHORT,
        offset: 0,
        drawingMode: drawingMode
    };

    return bufferObject;
};

export const bindIndexBuffer = (gl: WebGLRenderingContext, ibo: IndexBufferObject) => {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo.buffer);
};

export const drawElements = (gl: WebGLRenderingContext, ibo: IndexBufferObject): void => {
    gl.drawElements(ibo.drawingMode, ibo.count, ibo.type, ibo.offset);
};






export interface TextureObject {
    texture: WebGLTexture;
    width: number;
    height: number;
    level: number;
    internalformat: number;
    format: number;
    type: number;
    border: number;
}

/**
 * A shader's attributes get their buffer-values from the VERTEX_ARRAY, but they are constructed in the ARRAY_BUFFER.
 * Textures analogously are served from the TEXTURE_UNITS, while for construction they are bound to ACTIVE_TEXTURE.
 *
 * There is a big difference, however. Contrary to buffers which receive their initial value while still outside the ARRAY_BUFFER,
 * a texture does already have to be bound into the TEXTURE_UNITS when it's being created.
 * Since it'll always be bound into the slot that ACTIVE_TEXTURE points to, you can inadvertently overwrite another texture that is
 * currently in this place. To avoid this, we provide a dedicated `textureConstructionBindPoint`.
 *
 * Buffers are easier in this, since with vertexAttribPointer we are guaranteed to get a slot in the VERTEX_ARRAY that is not
 * already occupied by another buffer.
 */
export const createTexture = (gl: WebGLRenderingContext, image: HTMLImageElement | HTMLCanvasElement): TextureObject => {

    const texture = gl.createTexture();  // analog to createBuffer
    if (!texture) {
        throw new Error('No texture was created');
    }
    gl.activeTexture(gl.TEXTURE0 + textureConstructionBindPoint); // so that we don't overwrite another texture in the next line.
    gl.bindTexture(gl.TEXTURE_2D, texture);  // analog to bindBuffer. Binds texture to currently active texture-bindpoint (aka. texture unit).

    const level = 0;
    const internalFormat = gl.RGBA;
    const format = gl.RGBA;
    const type = gl.UNSIGNED_BYTE;

    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, format, type, image);  // analog to bufferData
    gl.generateMipmap(gl.TEXTURE_2D); // mipmaps are mini-versions of the texture.
    gl.bindTexture(gl.TEXTURE_2D, null);  // unbinding

    let w, h: number;
    if (image instanceof HTMLImageElement) {
        w = image.naturalWidth;
        h = image.naturalHeight;
    } else {
        w = image.width;
        h = image.height;
    }

    const textureObj: TextureObject = {
        texture: texture,
        level: level,
        internalformat: internalFormat,
        format: format,
        type: type,
        width: w,
        height: h,
        border: 0
    };

    return textureObj;
};


export type textureDataType = '';

/**
 * This is just another texture, but optimized for carrying data, not for display.
 *
 * Valid combinations of texture-data parameters:
 *
 * | Internal Format | Format          | Type                      | Source Bytes Per Pixel |
 * |-----------------|-----------------|---------------------------|------------------------|
 * | RGBA            | RGBA            | UNSIGNED_BYTE             | 4                      |
 * | RGB	         | RGB             | UNSIGNED_BYTE             | 3                      |
 * | RGBA            | RGBA            | UNSIGNED_SHORT_4_4_4_4    | 2                      |
 * | RGBA            | RGBA            | UNSIGNED_SHORT_5_5_5_1	   | 2                      |
 * | RGB             | RGB             | UNSIGNED_SHORT_5_6_5      | 2                      |
 * | LUMINANCE_ALPHA | LUMINANCE_ALPHA | UNSIGNED_BYTE	           | 2                      |
 * | LUMINANCE       | LUMINANCE       | UNSIGNED_BYTE             | 1                      |
 * | ALPHA           | ALPHA           | UNSIGNED_BYTE             | 1                      |
 * Plus many more in WebGL2.
 *
 */
export const createDataTexture = (gl: WebGLRenderingContext, data: number[][][]): TextureObject => {
    const height = data.length;
    const width = data[0].length;
    const channels = data[0][0].length;
    if ( !isPowerOf(width, 2) || !isPowerOf(height, 2) ) {
        throw new Error(`Texture-data-dimensions must be a power of two, but are ${width} x ${height}`);
    }
    if ( channels !== 4) {
        // @todo: remove this when we implement non-rgba data-textures.
        throw new Error(`Expecting 4 channels, but ${channels} provided`);
    }

    const texture = gl.createTexture();  // analog to createBuffer
    if (!texture) {
        throw new Error('No texture was created');
    }
    gl.activeTexture(gl.TEXTURE0 + textureConstructionBindPoint); // so that we don't overwrite another texture in the next line.
    gl.bindTexture(gl.TEXTURE_2D, texture);  // analog to bindBuffer. Binds texture to currently active texture-bindpoint (aka. texture unit).

    // to be used for data. we want no interpolation of data, so disallow mipmap and interpolation.
    const level = 0;
    const border = 0;
    const internalFormat = gl.RGBA;
    const format = gl.RGBA;
    const type = gl.UNSIGNED_BYTE;

    const binData = new Uint8Array(flattenRecursive(data));

    if (channels !== 4) {
        // have WebGL digest data one byte at a time.
        // (Per default tries 4 bytes at a time, which causes errors when our data is not a mulitple of 4).
        const alignment = 1; // valid values are 1, 2, 4, and 8.
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, alignment);
    }

    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, format, type, binData); // analog to bufferData
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);  // unbinding


    const textureObj: TextureObject = {
        texture: texture,
        level: level,
        internalformat: internalFormat,
        format: format,
        type: type,
        width: width,
        height: height,
        border: border
    };

    return textureObj;
};



export const createEmptyTexture = (gl: WebGLRenderingContext, width: number, height: number): TextureObject => {
    if (width <= 0 || height <= 0) {
        throw new Error('Width and height must be positive.');
    }
    const texture = gl.createTexture();
    if (!texture) {
        throw new Error('No texture was created');
    }
    gl.activeTexture(gl.TEXTURE0 + textureConstructionBindPoint); // so that we don't overwrite another texture in the next line.
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);

    const textureObj: TextureObject = {
        texture: texture,
        level: 0,
        internalformat: gl.RGBA,
        format: gl.RGBA,
        type: gl.UNSIGNED_BYTE,
        width: width,
        height: height,
        border: 0
    };

    return textureObj;
};


/**
 * Even though we reference textures as uniforms in a fragment shader, assigning an actual texture-value to that uniform works differently from normal uniforms.
 * Normal uniforms have a concrete value.
 * Texture uniforms, on the other hand, are just an integer-index that points to a special slot in the GPU memory (the bindPoint) where the actual texture value lies.
 */
export const bindTextureToUniform = (gl: WebGLRenderingContext, texture: WebGLTexture, bindPoint: number, uniformLocation: WebGLUniformLocation): void =>  {
    if (bindPoint > gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS)) {
        throw new Error(`There are only ${gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS)} texture bind points, but you tried to bind to point nr. ${bindPoint}.`);
    }
    if (bindPoint === textureConstructionBindPoint) {
        console.error(`You are about to bind to the dedicated texture-construction bind point (nr. ${bindPoint}).
        If after this call another texture is built, your shader will now use that new texture instead of this one!
        Consider using another bind point.`);
    }
    gl.activeTexture(gl.TEXTURE0 + bindPoint);  // analog to enableVertexAttribArray
    gl.bindTexture(gl.TEXTURE_2D, texture);  // analog to bindBuffer. Binds texture to currently active texture-bindpoint (aka. texture unit).
    gl.uniform1i(uniformLocation, bindPoint); // analog to vertexAttribPointer
};



export const updateTexture = (gl: WebGLRenderingContext, to: TextureObject, newData: HTMLImageElement | HTMLCanvasElement | number[][][]): TextureObject => {

    gl.activeTexture(gl.TEXTURE0 + textureConstructionBindPoint); // so that we don't overwrite another texture in the next line.
    gl.bindTexture(gl.TEXTURE_2D, to.texture);  // analog to bindBuffer. Binds texture to currently active texture-bindpoint (aka. texture unit).
    if (newData instanceof HTMLImageElement || newData instanceof HTMLCanvasElement) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, newData);  // analog to bufferData
    } else {
        const width = newData[0].length;
        const height = newData.length;
        if ( !isPowerOf(width, 2) || !isPowerOf(height, 2) ) {
            throw new Error(`Texture-data-dimensions must be a power of two, but are ${height} x ${width}`);
        }
        const binData = new Uint8Array(flattenRecursive(newData));  // @todo: use another ArrayBufferView depending on to.format?
        gl.texImage2D(gl.TEXTURE_2D, to.level, to.internalformat, to.width, to.height, to.border, to.format, to.type, binData);
    }
    gl.generateMipmap(gl.TEXTURE_2D); // mipmaps are mini-versions of the texture.
    gl.bindTexture(gl.TEXTURE_2D, null);  // unbinding

    if (newData instanceof HTMLImageElement) {
        to.width = newData.naturalWidth;
        to.height = newData.naturalHeight;
    } else if (newData instanceof HTMLCanvasElement) {
        to.width = newData.width;
        to.height = newData.height;
    } else {
        to.width = newData[0].length;
        to.height = newData.length;
    }

    return to;
};


export interface FramebufferObject {
    framebuffer: WebGLFramebuffer;
    texture: TextureObject;
    width: number;
    height: number;
}


export const createFramebuffer = (gl: WebGLRenderingContext): WebGLFramebuffer => {
    const fb = gl.createFramebuffer();  // analog to createBuffer
    if (!fb) {
        throw new Error(`Error creating framebuffer`);
    }
    return fb;
};


/**
 * The operations `clear`, `drawArrays` and `drawElements` only affect the currently bound framebuffer.
 *
 * Note that binding the framebuffer does *not* mean binding its texture.
 * In fact, if there is a bound texture, it must be the *input* to a shader, not the output.
 * Therefore, a framebuffer's texture must not be bound when the framebuffer is.
 */
export const bindFramebuffer = (gl: WebGLRenderingContext, fbo: FramebufferObject, manualViewport?: [number, number, number, number]) => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.framebuffer);
    // It's EXTREMELY IMPORTANT to remember to call gl.viewport and set it to the size of the thing your rendering to.
    // https://webglfundamentals.org/webgl/lessons/webgl-render-to-texture.html
    if (manualViewport) {
        if ((fbo.width / fbo.height) !== (manualViewport[2] / manualViewport[3])) {
            console.warn(`Your viewport-aspect is different from the framebuffer-aspect.`);
        }
        gl.viewport(...manualViewport);
    } else {
        gl.viewport(0, 0, fbo.width, fbo.height);
    }
};

/**
 * Webgl renders to the viewport, which is relative to canvas.width * canvas.height.
 * (To be more precise, only *polygons* are clipped to the viewport.
 * Operations like `clearColor()` et.al., will still draw to the *full* canvas.width * height!
 * If you want to also constrain clearColor, use `scissor` instead of viewport.)
 * That canvas.width * canvas.height then gets stretched to canvas.clientWidth * canvas.clientHeight.
 * (Note: the full canvas.width gets stretched to clientWidth, not just the viewport!)
 */
export const bindOutputCanvasToFramebuffer = (gl: WebGLRenderingContext, manualViewport?: [number, number, number, number]) => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    // It's EXTREMELY IMPORTANT to remember to call gl.viewport and set it to the size of the thing your rendering to.
    // https://webglfundamentals.org/webgl/lessons/webgl-render-to-texture.html
    if (manualViewport) {
        if ((gl.canvas.width / gl.canvas.height) !== (manualViewport[2] / manualViewport[3])) {
            console.warn(`Your viewport-aspect is different from the canvas-aspect.`);
        }
        gl.viewport(...manualViewport);
    } else {
        // Note: don't use clientWidth here.
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
};


/**
 * A framebuffer can have a texture - that is the bitmap that the shader-*out*put is drawn on.
 * Shaders may also have one or more *in*put texture(s), which must be provided to the shader as a uniform sampler2D.
 * Only the shader needs to know about any potential input texture, the framebuffer will always only know about it's output texture.
 */
export const bindTextureToFramebuffer = (gl: WebGLRenderingContext, texture: TextureObject, fb: WebGLFramebuffer): FramebufferObject => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture.texture, 0); // analog to bufferData

    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
        throw new Error(`Error creating framebuffer: framebuffer-status: ${gl.checkFramebufferStatus(gl.FRAMEBUFFER)} ; error-code: ${gl.getError()}`);
    }

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    const fbo: FramebufferObject = {
        framebuffer: fb,
        texture: texture,
        width: texture.width,
        height: texture.height
    };

    return fbo;
};










/**
 * Fetch uniform's location (uniform declared in some shader). Slow! Do *before* render loop.
 */
export const getUniformLocation = (gl: WebGLRenderingContext, program: WebGLProgram, uniformName: string): WebGLUniformLocation => {
    const loc = gl.getUniformLocation(program, uniformName);
    if (loc === null) {
        throw new Error(`Couldn't find uniform ${uniformName} in program.`);
    }
    return loc;
};




export type WebGLVariableType = 'bool'  | 'bvec2' | 'bvec3' | 'bvec4'| 'bool[]'  | 'bvec2[]' | 'bvec3[]' | 'bvec4[]'
                              | 'int'   | 'ivec2' | 'ivec3' | 'ivec4'| 'int[]'   | 'ivec2[]' | 'ivec3[]' | 'ivec4[]'
                              | 'float' | 'vec2'  | 'vec3'  | 'vec4' | 'float[]' | 'vec2[]'  | 'vec3[]'  | 'vec4[]'
                                        | 'mat2'  | 'mat3'  | 'mat4';


/**
 * Contrary to attributes, uniforms don't need to be stored in a buffer. (Note: in WebGL 2.0, however, there *are* uniform buffers!)
 *
 * 'v' is not about the shader, but how you provide data from the js-side.
 * uniform1fv(loc, [3.19]) === uniform1f(loc, 3.19)
 *
 * |js                                      |          shader                  |
 * |----------------------------------------|----------------------------------|
 * |uniform1f(loc, 3.19)                    |  uniform float u_pi;             |
 * |uniform2f(loc, 3.19, 2.72)              |  uniform vec2 u_constants;       |
 * |uniform2fv(loc, [3.19, 2.72])           |  uniform vec2 u_constants;       |
 * |uniform1fv(loc, [1, 2, 3, 4, 5, 6])     |  uniform float u_kernel[6];      |
 * |uniform2fv(loc, [1, 2, 3, 4, 5, 6])     |  uniform vec2 u_observations[3]; |
 * |uniformMatrix3fv(loc, [[...], [...]])   |  uniform mat3 u_matrix;          |
 *
 * A note about `structs`. A shader code like this:
 * ```glsl
 * struct LightInfo {
 *    vec4 Position;
 *    vec3 La;
 * };
 * uniform LightInfo Light;
 * ```
 * ... is accessed like that:
 * ```js
 * const lightPosLoc = gl.getUniformLocation(program, "Light.Position");
 * const lightLaLoc = gl.getUniformLocation(program, "Light.La");
 * gl.uniform4fv(lightPosLoc, [1, 2, 3, 4]);
 * gl.uniform3fv(lightLaLoc, [1, 2, 3]);
 * ```
 *
 */
export const bindValueToUniform = (gl: WebGLRenderingContext, uniformLocation: WebGLUniformLocation, type: WebGLVariableType, values: number[]): void => {
    switch (type) {
        case 'bool':
            gl.uniform1i(uniformLocation, values[0]);
            break;
        case 'bvec2':
            gl.uniform2i(uniformLocation, values[0], values[1]);
            break;
        case 'bvec3':
            gl.uniform3i(uniformLocation, values[0], values[1], values[2]);
            break;
        case 'bvec4':
            gl.uniform4i(uniformLocation, values[0], values[1], values[2], values[3]);
            break;
        case 'bool[]':
            gl.uniform1iv(uniformLocation, values);
            break;
        case 'bvec2[]':
            gl.uniform2iv(uniformLocation, values);
            break;
        case 'bvec3[]':
            gl.uniform3iv(uniformLocation, values);
            break;
        case 'bvec4[]':
            gl.uniform4iv(uniformLocation, values);
            break;

        case 'int':
            gl.uniform1i(uniformLocation, values[0]);
            break;
        case 'ivec2':
            gl.uniform2i(uniformLocation, values[0], values[1]);
            break;
        case 'ivec3':
            gl.uniform3i(uniformLocation, values[0], values[1], values[2]);
            break;
        case 'ivec4':
            gl.uniform4i(uniformLocation, values[0], values[1], values[2], values[3]);
            break;
        case 'int[]':
            gl.uniform1iv(uniformLocation, values);
            break;
        case 'ivec2[]':
            gl.uniform2iv(uniformLocation, values);
            break;
        case 'ivec3[]':
            gl.uniform3iv(uniformLocation, values);
            break;
        case 'ivec4[]':
            gl.uniform4iv(uniformLocation, values);
            break;

        case 'float':
            gl.uniform1f(uniformLocation, values[0]);
            break;
        case 'vec2':
            gl.uniform2f(uniformLocation, values[0], values[1]);
            break;
        case 'vec3':
            gl.uniform3f(uniformLocation, values[0], values[1], values[2]);
            break;
        case 'vec4':
            gl.uniform4f(uniformLocation, values[0], values[1], values[2], values[3]);
            break;
        case 'float[]':
            gl.uniform1fv(uniformLocation, values);
            break;
        case 'vec2[]':
            gl.uniform2fv(uniformLocation, values);
            break;
        case 'vec3[]':
            gl.uniform3fv(uniformLocation, values);
            break;
        case 'vec4[]':
            gl.uniform4fv(uniformLocation, values);
            break;

        // In the following *matrix* calls, the 'transpose' parameter must always be false.
        // Quoting the OpenGL ES 2.0 spec:
        // If the transpose parameter to any of the UniformMatrix* commands is
        // not FALSE, an INVALID_VALUE error is generated, and no uniform values are
        // changed.
        case 'mat2':
            gl.uniformMatrix2fv(uniformLocation, false, values);
            break;

        case 'mat3':
            gl.uniformMatrix3fv(uniformLocation, false, values);
            break;

        case 'mat4':
            gl.uniformMatrix4fv(uniformLocation, false, values);
            break;

        default:
            throw Error(`Type ${type} not implemented.`);
    }
};


/**
 * (From https://hacks.mozilla.org/2013/04/the-concepts-of-webgl/ and https://stackoverflow.com/questions/56303648/webgl-rendering-buffers:)
 * Ignoring handmade framebuffers, WebGl has two framebuffers that are always in use: the `frontbuffer/displaybuffer` and the `backbuffer/drawingbuffer`.
 * WebGl per default renders to the `drawingbuffer`, aka. the `backbuffer`.
 * There is also the currently displayed buffer, named the `frontbuffer` aka. the `displaybuffer`.
 * the WebGL programmer has no explicit access to the frontbuffer whatsoever.
 *
 * Once you called `clear`, `drawElements` or `drawArrays`, the browser marks the canvas as `needs to be composited`.
 * Assuming `preserveDrawingBuffer == false` (the default): Immediately before compositing, the browser
 *  - swaps the back- and frontbuffer
 *  - clears the new backbuffer.
 * If `preserveDrawingBuffer === true`: Immediately before compositing, the browser
 *  - copies the drawingbuffer to the frontbuffer.
 *
 * As a consequence, if you're going to use canvas.toDataURL or canvas.toBlob or gl.readPixels or any other way of getting data from a WebGL canvas,
 * unless you read it in the same event then it will likely be clear when you try to read it.
 *
 * In the past, old games always preserved the drawing buffer, so they'd only have to change those pixels that have actually changed. Nowadays preserveDrawingBuffer is false by default.
 *
 * A (almost brutal) workaround to get the canvas to preserve the drawingBuffer can be found here: https://stackoverflow.com/questions/26783586/canvas-todataurl-returns-blank-image
 */
export const getCurrentFramebuffersPixels = (canvas: HTMLCanvasElement): ArrayBuffer  => {
    const gl = canvas.getContext('webgl');
    if (!gl) {
        throw new Error('no context');
    }

    const format = gl.getParameter(gl.IMPLEMENTATION_COLOR_READ_FORMAT);
    const type = gl.getParameter(gl.IMPLEMENTATION_COLOR_READ_TYPE);

    let pixels;
    if (type === gl.UNSIGNED_BYTE) {
        pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
    } else if (type === gl.UNSIGNED_SHORT_5_6_5 || type === gl.UNSIGNED_SHORT_4_4_4_4 || type === gl.UNSIGNED_SHORT_5_5_5_1) {
        pixels = new Uint16Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
    } else if (type === gl.FLOAT) {
        pixels = new Float32Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
    } else {
        throw new Error(`Did not understand pixel data type ${type} for format ${format}`);
    }

    // Just like `toDataURL` or `toBlob`, `readPixels` does not access the frontbuffer.
    // It accesses the backbuffer or any other currently active framebuffer.
    gl.readPixels(0, 0, canvas.width, canvas.height, format, type, pixels);

    return pixels;
};

export const getDebugInfo = (gl: WebGLRenderingContext): object => {
    const baseInfo = {
        renderer: gl.getParameter(gl.RENDERER),
        currentProgram: gl.getParameter(gl.CURRENT_PROGRAM),
        arrayBuffer: gl.getParameter(gl.ARRAY_BUFFER_BINDING),
        elementArrayBuffer: gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING),
        frameBuffer: gl.getParameter(gl.FRAMEBUFFER_BINDING),
        renderBuffer: gl.getParameter(gl.RENDERBUFFER_BINDING),
        texture: gl.getParameter(gl.TEXTURE_BINDING_2D),
        viewPort: gl.getParameter(gl.VIEWPORT)
    };
    const programInfo = {
        infoLog: gl.getProgramInfoLog(baseInfo.currentProgram)
    };
    return {
        baseInfo, programInfo
    }
};
