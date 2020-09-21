/**
 * While webgl's clip space has coordinates [-1, 1] (left to right), [-1, 1] (bottom to top),
 * textures go from [0, 1] (left to right), [0, 1] (bottom to top).
 */



export interface ShapeA {
    vertices: [number, number, number][];
    texturePositions: [number, number][];
}

export interface ShapeE {
    vertices: [number, number, number][];
    texturePositions: [number, number][];
    vertexIndices: [number, number, number][];
}



export const triangleA = (width: number, height: number): ShapeA => {
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


export const triangleE = (width: number, height: number): ShapeE => {
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
        ],
        vertexIndices: [
            [0, 1, 2]
        ]
    };
};


export const rectangleA = (width: number, height: number): ShapeA => {
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

export const rectangleE = (width: number, height: number): ShapeE => {
    return {
        vertices: [
            [-width / 2,  height / 2, 0],
            [-width / 2, -height / 2, 0],
            [ width / 2, -height / 2, 0],
            [ width / 2,  height / 2, 0],
        ],
        texturePositions: [
            [0, 1],
            [0, 0],
            [1, 0],
            [1, 1]
        ],
        vertexIndices: [
            [0, 1, 2],
            [0, 2, 3]
        ]
    };
};

