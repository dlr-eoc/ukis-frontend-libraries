export class OffscreenCanvasMock {
    width: number;
    height: number;
    constructor(w = 0, h = 0) {
        this.width = w;
        this.height = h;
    }
    getContext(type: string) {
        if (type === '2d') {
            const canvas: HTMLCanvasElement = this as never;
            return {
                canvas: canvas,
                // add methods your code calls:
                getImageData: (_x = 0, _y = 0, _w = 0, _h = 0) => ({ data: new Uint8ClampedArray(0), width: 0, height: 0 }),
                putImageData: () => { },
                measureText: (text: string) => ({ width: text.length * 10 }),
                fillRect: () => { },
                clearRect: () => { },
                // ...add anything else you need
            };
        }
        // Return a minimal WebGL-like context if your code requests 'webgl'
        if (type === 'webgl' || type === 'webgl2') {
            return {
                createTexture: () => ({}),
                bindTexture: () => { },
                texImage2D: () => { },
                texParameteri: () => { },
                getExtension: () => null,
                // expand with the WebGL functions you use
            };
        }
        return null;
    }
}

export const ResizeObserverMock = class {
    observe(): void { }
    unobserve(): void { }
    disconnect(): void { }
};


// Minimal canvas & OffscreenCanvas mocks for Vitest/jsdom tests.
// Expand methods/properties to match what OpenLayers uses.

export class MockCanvasRenderingContext2D {
    canvas: any;
    constructor(canvas?: any) { this.canvas = canvas; }
    // Common 2D context methods used by many libs — add more as needed
    beginPath() { }
    closePath() { }
    moveTo() { }
    lineTo() { }
    stroke() { }
    fill() { }
    fillRect() { }
    clearRect() { }
    drawImage() { }
    measureText(text: string) { return { width: String(text).length * 10 }; }
    setTransform() { }
    transform() { }
    save() { }
    restore() { }
    translate() { }
    scale() { }
    rotate() { }
    createLinearGradient() { return { addColorStop: () => { } }; }
    createPattern() { return null; }
    // ...add more if your code calls them
}

class MockOffscreenCanvas {
    width: number;
    height: number;
    constructor(w = 0, h = 0) {
        this.width = w;
        this.height = h;
    }
    getContext(_type: string) {
        // Return a fresh context instance; attach canvas so instanceof checks may still work
        const ctx = new MockCanvasRenderingContext2D(this);
        return ctx;
    }
    transferToImageBitmap() {
        return {}; // stub if your code calls this
    }
}

// Attach constructors/objects to globalThis
; (globalThis as any).OffscreenCanvas = MockOffscreenCanvas;
; (globalThis as any).CanvasRenderingContext2D = MockCanvasRenderingContext2D;
; (globalThis as any).HTMLCanvasElement = OffscreenCanvasMock;

// Provide ImageData and Image if missing (OpenLayers sometimes expects them)
if (!(globalThis as any).ImageData) {
    (globalThis as any).ImageData = class {
        data: Uint8ClampedArray;
        width: number;
        height: number;
        constructor(data: Uint8ClampedArray | number, width?: number, height?: number) {
            if (typeof data === 'number') {
                this.width = width || 0;
                this.height = height || 0;
                this.data = new Uint8ClampedArray(data);
            } else {
                this.data = data;
                this.width = width || 0;
                this.height = height || 0;
            }
        }
    };
}
if (!(globalThis as any).Image) {
    (globalThis as any).Image = class { };
}

// Optional: log to verify setup loaded
// console.log('Vitest canvas mocks initialized');