export type Vec2 = [number, number];
export type Vec3 = [number, number, number];
export type Vector = number[];
export type V2Matrix = Vec2[];
export type V3Matrix = Vec3[];
export type Matrix = number[][];


export function scalarProduct(scalar: number, vector: Vector): Vector {
    return vector.map(el => scalar * el);
}

export function vectorAddition(vec0: Vector, vec1: Vector): Vector {
    if (vec0.length !== vec1.length) {
        throw new Error('');
    }
    const newVec = [];
    for (let i = 0; i < vec0.length; i++) {
        newVec.push(vec0[i] + vec1[i]);
    }
    return newVec;
}

export function bezier(p0: Vector, p1: Vector, t: number): Vector {
    return vectorAddition(scalarProduct( (1.0 - t), p0),  scalarProduct(t, p1));
}

export function multiBezier(ps: Vector[], t: number): Vector {
    const length = ps.length;
    if (length === 2) {
        return bezier(ps[0], ps[1], t);
    } else {
        const vec0 = multiBezier(ps.slice(0, length - 1), t);
        const vec1 = multiBezier(ps.slice(1, length), t);
        return bezier(vec0, vec1, t);
    }
}

export function bezierGenerator(ps: Vector[]): (t: number) => Vector {
    return (t: number) => {
        return multiBezier(ps, t);
    };
}




/**
 * While webgl's clip space has coordinates [-1, 1] (left to right), [-1, 1] (bottom to top),
 * textures go from [0, 1] (left to right), [0, 1] (bottom to top).
 */



export interface Shape {
    vertices: V3Matrix;
    texturePositions: V2Matrix;
}


export const triangle = (width: number, height: number): Shape => {
    return {
        vertices: [
            [-width / 2, -height / 2, 0],
            [         0,  height / 2, 0],
            [ width / 2, -height / 2, 0]
        ],
        texturePositions: [
            [0, 0],
            [0, 1],
            [1, 0]
        ]
    };
};


export const rectangle = (width: number, height: number): Shape => {
    return {
        vertices: [
            [-width / 2,  height / 2, 0],
            [-width / 2, -height / 2, 0],
            [ width / 2, -height / 2, 0],
            [-width / 2,  height / 2, 0],
            [ width / 2, -height / 2, 0],
            [ width / 2,  height / 2, 0],
        ],
        texturePositions: [
            [0, 1],
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 0],
            [1, 1]
        ]
    };
};

export const box = (width: number, height: number, depth: number): Shape => {
    return {
        vertices: [
                // face 1
            [-width / 2,  height / 2, depth / 2],
            [ width / 2,  height / 2, depth / 2],
            [-width / 2, -height / 2, depth / 2],
            [ width / 2,  height / 2, depth / 2],
            [-width / 2, -height / 2, depth / 2],
            [ width / 2, -height / 2, depth / 2],

            // face 2
            [-width / 2,  height / 2,  depth / 2],
            [ width / 2,  height / 2,  depth / 2],
            [ width / 2,  height / 2, -depth / 2],
            [-width / 2,  height / 2,  depth / 2],
            [ width / 2,  height / 2, -depth / 2],
            [-width / 2,  height / 2, -depth / 2],

            // face 3
            [ width / 2,  height / 2,  depth / 2],
            [ width / 2,  height / 2, -depth / 2],
            [ width / 2, -height / 2, -depth / 2],
            [ width / 2,  height / 2,  depth / 2],
            [ width / 2, -height / 2, -depth / 2],
            [ width / 2, -height / 2,  depth / 2],

            // face 4
            [-width / 2, -height / 2,  depth / 2],
            [ width / 2, -height / 2,  depth / 2],
            [ width / 2, -height / 2, -depth / 2],
            [-width / 2, -height / 2,  depth / 2],
            [ width / 2, -height / 2, -depth / 2],
            [-width / 2, -height / 2, -depth / 2],

            // face 5
            [-width / 2,  height / 2, -depth / 2],
            [ width / 2,  height / 2, -depth / 2],
            [-width / 2, -height / 2, -depth / 2],
            [ width / 2,  height / 2, -depth / 2],
            [-width / 2, -height / 2, -depth / 2],
            [ width / 2, -height / 2, -depth / 2],

            // face 6
            [-width / 2,  height / 2,  depth / 2],
            [-width / 2,  height / 2, -depth / 2],
            [-width / 2, -height / 2, -depth / 2],
            [-width / 2,  height / 2,  depth / 2],
            [-width / 2, -height / 2, -depth / 2],
            [-width / 2, -height / 2,  depth / 2]
        ],
        texturePositions: [
            // face 1
            [0, 0],
            [0, 1],
            [1, 0],
            [0, 1],
            [1, 1],
            [1, 0],

            // face 2
            [0, 0],
            [0, 1],
            [1, 0],
            [0, 1],
            [1, 1],
            [1, 0],

            // face 3
            [0, 0],
            [0, 1],
            [1, 0],
            [0, 1],
            [1, 1],
            [1, 0],

            // face 4
            [0, 0],
            [0, 1],
            [1, 0],
            [0, 1],
            [1, 1],
            [1, 0],

            // face 5
            [0, 0],
            [0, 1],
            [1, 0],
            [0, 1],
            [1, 1],
            [1, 0],

            // face 6
            [0, 0],
            [0, 1],
            [1, 0],
            [0, 1],
            [1, 1],
            [1, 0],
        ]
    };
};


export const edgeDetectKernel = (): Matrix => {
    return [
        [-1., -1., -1.],
        [-1.,  8., -1.],
        [-1., -1., -1.]
    ];
};

export const normalKernel = (): Matrix => {
    return [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
      ];
};

export const  gaussianKernel = (): Matrix => {
    return [
        [0.045, 0.122, 0.045],
        [0.122, 0.332, 0.122],
        [0.045, 0.122, 0.045]
  ];
};

export const unsharpenKernel = (): Matrix => {
    return [
        [-1, -1, -1],
        [-1,  9, -1],
        [-1, -1, -1]
  ];
};

export const embossKernel = (): Matrix => {
    return [
        [-2, -1,  0],
        [-1,  1,  1],
        [ 0,  1,  2]
  ];
};

export const flattenMatrix = (m: Matrix): number[] => {
    let flat: number[] = [];
    for (const row of m) {
        flat = Array.prototype.concat(flat, row);
    }
    return flat;
};

export const sumMatrix = (m: Matrix): number => {
    let sum = 0.;
    for (const row of m) {
        for (const entry of row) {
            sum += entry;
        }
    }
    return sum;
};
