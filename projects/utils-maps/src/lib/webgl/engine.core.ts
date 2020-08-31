import { createShaderProgram, setup3dScene, createFloatBuffer, getAttributeLocation, bindBufferToAttribute, getUniformLocation, bindValueToUniform, clearBackground, BufferObject, UniformType, bindProgram, createTexture, bindTextureToUniform, TextureObject, FramebufferObject, bindFramebuffer, bindOutputCanvasToFramebuffer, updateBufferData, bindTextureToFramebuffer, createEmptyTexture, createFramebuffer, updateTexture, createIndexBuffer, IndexBufferObject, drawArray } from './webgl';


// dead-simple hash function - not intended to be secure in any way.
const hash = function(s: string): string {
    let h = 0;
    for (const c of s) {
        h += c.charCodeAt(0);
    }
    return `${h}`;
};


export interface IProgram {
    program: WebGLProgram;
    id: string;
    vertexShaderSource: string;
    fragmentShaderSource: string;
}


export class Program implements IProgram {

    readonly program: WebGLProgram;
    readonly id: string;

    constructor(gl: WebGLRenderingContext,
        readonly vertexShaderSource: string,
        readonly fragmentShaderSource: string) {
        this.program = createShaderProgram(gl, vertexShaderSource, fragmentShaderSource);
        this.id = hash(vertexShaderSource + fragmentShaderSource);
    }
}


export interface IUniform {
    location: WebGLUniformLocation;
    type: UniformType;
    value: number[];
    variableName: string;
}


export class Uniform implements IUniform {

    readonly location: WebGLUniformLocation;
    readonly type: UniformType;
    readonly value: number[];
    readonly variableName: string;

    constructor(gl: WebGLRenderingContext, program: IProgram, variableName: string, type: UniformType, data: number[]) {
        this.location = getUniformLocation(gl, program.program, variableName);
        this.type = type;
        this.value = data;
        this.variableName = variableName;
    }
}


export interface ITexture {
    location: WebGLUniformLocation;
    bindPoint: number;
    texture: TextureObject;
    variableName: string;
}

export class Texture implements ITexture {

    readonly location: WebGLUniformLocation;
    readonly bindPoint: number;
    readonly texture: TextureObject;
    readonly variableName: string;

    constructor(gl: WebGLRenderingContext, program: IProgram, variableName: string, im: HTMLImageElement | HTMLCanvasElement | TextureObject, bindPoint: number) {
        this.location = getUniformLocation(gl, program.program, variableName);
        if (im instanceof HTMLImageElement || im instanceof  HTMLCanvasElement) {
            this.texture = createTexture(gl, im);
        } else {
            this.texture = im;
        }
        this.bindPoint = bindPoint;
        this.variableName = variableName;
    }
}


export interface IAttribute {
    location: number;
    value: BufferObject;
    variableName: string;
}


export class Attribute implements IAttribute {

    readonly location: number;
    readonly value: BufferObject;
    readonly variableName: string;
    readonly drawingMode: number;

    constructor(gl: WebGLRenderingContext, program: IProgram, variableName: string, data: number[][], drawingMode: number = gl.TRIANGLES) {
        this.location = getAttributeLocation(gl, program.program, variableName);
        this.value = createFloatBuffer(gl, data, drawingMode);
        this.variableName = variableName;
        this.drawingMode = drawingMode;
    }
}


/**
 * @TODO: this is not yet used anywhere.
 */
export class ElementAttribute implements IAttribute {
    readonly location: number;
    readonly value: BufferObject;
    readonly indices: IndexBufferObject;
    readonly variableName: string;

    constructor(gl: WebGLRenderingContext, program: IProgram, variableName: string, data: number[][], indices: number[][]) {
        this.location = getAttributeLocation(gl, program.program, variableName);
        this.value = createFloatBuffer(gl, data);
        this.indices = createIndexBuffer(gl, indices);
        this.variableName = variableName;
    }
}



function first<T>(arr: T[], condition: (el: T) => boolean): T | null {
    for (const el of arr) {
        if (condition(el)) {
            return el;
        }
    }
    return null;
}


function parseProgram(program: IProgram): [string[], string[], string[]] {
    const attributeRegex = /^\s*attribute (int|float|vec2|vec3|vec4|mat2|mat3|mat4) (\w*);/gm;
    const uniformRegex = /^\s*uniform (int|float|vec2|vec3|vec4|mat2|mat3|mat4) (\w*)(\[\d\])*;/gm;
    const textureRegex = /^\s*uniform sampler2D (\w*);/gm;

    const shaderCode = program.fragmentShaderSource + '\n\n\n' + program.vertexShaderSource;

    const attributeNames = [];
    let attributeMatches;
    while ((attributeMatches = attributeRegex.exec(shaderCode)) !== null) {
        attributeNames.push(attributeMatches[2]);
    }
    const uniformNames = [];
    let uniformMatches;
    while ((uniformMatches = uniformRegex.exec(shaderCode)) !== null) {
        uniformNames.push(uniformMatches[2]);
    }
    const textureNames = [];
    let textureMatches;
    while ((textureMatches = textureRegex.exec(shaderCode)) !== null) {
        textureNames.push(textureMatches[1]);
    }

    return [attributeNames, uniformNames, textureNames];
}


export type RenderMode = 'points' | 'lines' | 'triangles';

interface IShader {
    program: IProgram;
    attributes: IAttribute[];
    uniforms: IUniform[];
    textures: ITexture[];
    bind: (gl: WebGLRenderingContext) => void;
    render: (gl: WebGLRenderingContext, background?: number[], frameBuffer?: FramebufferObject) => void;
    updateAttributeData: (gl: WebGLRenderingContext, variableName: string, newData: number[][]) => void;
    updateUniformData: (gl: WebGLRenderingContext, variableName: string, newData: number[]) => void;
    updateTextureData: (gl: WebGLRenderingContext, variableName: string, newImage: HTMLImageElement | HTMLCanvasElement) => void;
}

export class Shader implements IShader {
    constructor(
        readonly program: IProgram,
        readonly attributes: IAttribute[],
        readonly uniforms: IUniform[],
        readonly textures: ITexture[]
    ) {
        const [attributeNames, uniformNames, textureNames] = parseProgram(program);
        for (const attrName of attributeNames) {
            const found = attributes.filter(a => a.variableName === attrName);
            if (found.length !== 1) {
                throw new Error(`Provided ${found.length} values for shader's attribute ${attrName}.`);
            }
        }
        for (const uniformName of uniformNames) {
            const found = uniforms.filter(a => a.variableName === uniformName);
            if (found.length !== 1) {
                throw new Error(`Provided ${found.length} values for shader's uniform ${uniformName}.`);
            }
        }
        for (const texName of textureNames) {
            const found = textures.filter(a => a.variableName === texName);
            if (found.length !== 1) {
                throw new Error(`Provided ${found.length} values for shader's texture ${texName}.`);
            }
        }
    }

    public bind(gl: WebGLRenderingContext): void {
        bindProgram(gl, this.program.program);
        for (const a of this.attributes) {
            bindBufferToAttribute(gl, a.location, a.value);
        }
        for (const u of this.uniforms) {
            bindValueToUniform(gl, u.location, u.type, u.value);
        }
        for (const t of this.textures) {
            bindTextureToUniform(gl, t.texture.texture, t.bindPoint, t.location);
        }
    }

    public render(gl: WebGLRenderingContext, background?: number[], frameBuffer?: FramebufferObject): void {
        if (!frameBuffer) {
            bindOutputCanvasToFramebuffer(gl);
        } else {
            bindFramebuffer(gl, frameBuffer);
        }
        if (background) {
            clearBackground(gl, background);
        }

        const firstAttribute = this.attributes[0].value;
        drawArray(gl, firstAttribute);
    }


    public updateAttributeData(gl: WebGLRenderingContext, variableName: string, newData: number[][]): void {
        const attribute = first<IAttribute>(this.attributes, el => el.variableName === variableName);
        if (!attribute) {
            throw new Error(`No such attribute ${variableName} to be updated.`);
        }
        updateBufferData(gl, attribute.value, newData);
    }

    public updateUniformData(gl: WebGLRenderingContext, variableName: string, newData: number[]): void {
        const uniform = first<IUniform>(this.uniforms, el => el.variableName === variableName);
        if (!uniform) {
            throw new Error(`No such uniform ${variableName} to be updated.`);
        }
        uniform.value = newData;
    }

    public updateTextureData(gl: WebGLRenderingContext, variableName: string, newImage: HTMLImageElement | HTMLCanvasElement): void {
        const original = first<ITexture>(this.textures, t => t.variableName === variableName);
        if (!original) {
            throw new Error(`No such original ${variableName} to be updated.`);
        }
        const newTextureObject = updateTexture(gl, original.texture, newImage);
        original.texture = newTextureObject;
    }
}


export class Framebuffer {

    readonly fbo: FramebufferObject;

    constructor(gl: WebGLRenderingContext, width: number, height: number) {
        const fb = createFramebuffer(gl);
        const fbTexture = createEmptyTexture(gl, width, height);
        const fbo = bindTextureToFramebuffer(gl, fbTexture, fb);
        this.fbo = fbo;
    }
}




export function renderLoop(fps: number, renderFunction: (tDelta: number) => void): void {

    const tDeltaTarget = 1000 * 1.0 / fps;
    let tDelta = tDeltaTarget;
    let tStart, tNow, tSleep: number;

    const render = () => {
        tStart = window.performance.now();

        renderFunction(tDelta);

        tNow = window.performance.now();
        tDelta = tNow - tStart;
        tSleep = Math.max(tDeltaTarget - tDelta, 0);
        setTimeout(() => {
            requestAnimationFrame(render);
        }, tSleep);

    };

    render();
}







interface IEntity {
    program: IProgram;
    attributes: IAttribute[]; // note that attributes must all have the same number of entries!
    uniforms: IUniform[];
    textures: ITexture[];
    update: (tDelta: number) => void;
}



export class Entity implements IEntity {

    constructor(
        readonly program: IProgram,
        readonly attributes: IAttribute[],
        readonly uniforms: IUniform[],
        readonly textures: ITexture[],
        readonly updateFunction: (tDelta: number, attrs: IAttribute[], unis: IUniform[]) => void) {}

    update(tDelta: number): void {
        this.updateFunction(tDelta, this.attributes, this.uniforms);
    }
}




export class Engine {

    readonly entities: IEntity[] = [];

    constructor() {}

    public renderLoop(gl: WebGLRenderingContext, fps: number): void {
        setup3dScene(gl);

        const tDeltaTarget = 1000 * 1.0 / fps;
        let tStart, tNow: number, tDelta: number, tSleep;
        let currentShader = '';
        const render = () => {
            tStart = window.performance.now();

            // Part 1: allow objects to update their state
            for (const e of this.entities) {
                e.update(tDeltaTarget);
            }

            // Part 2: do the actual rendering work here
            clearBackground(gl, [.7, .7, .7, 1]);
            for (const e of this.entities) {
                if (e.program.id !== currentShader) {
                    bindProgram(gl, e.program.program);
                    currentShader = e.program.id;
                }
                for (const a of e.attributes) {
                    bindBufferToAttribute(gl, a.location, a.value);
                }
                for (const u of e.uniforms) {
                    bindValueToUniform(gl, u.location, u.type, u.value);
                }
                for (const t of e.textures) {
                    bindTextureToUniform(gl, t.texture.texture, t.bindPoint, t.location);
                }
                gl.drawArrays(gl.TRIANGLES, 0, e.attributes[0].value.vectorCount);
            }

            // Part 3: time-management
            tNow = window.performance.now();
            tDelta = tNow - tStart;
            tSleep = Math.max(tDeltaTarget - tDelta, 0);
            setTimeout(() => {
                requestAnimationFrame(render);
            }, tSleep);

        };

        render();
    }

    public addEntity(entity: IEntity): void {
        this.entities.push(entity);
        this.sortEntities();
    }


    private sortEntities(): void {
        this.entities.sort((a: IEntity, b: IEntity) => {
            return (a.program.id > b.program.id) ? 1 : -1;
        });
    }


}