export type Vec2 = [number, number];
export type Vec3 = [number, number, number];
export type Vector = number[];
export type V2Matrix = Vec2[];
export type V3Matrix = Vec3[];
export type Matrix = number[][];


export const binaryVectorOp = (vec0: Vector, vec1: Vector, operation: (a: number, b: number) => number): Vector => {
    if (vec0.length !== vec1.length) {
        throw new Error('');
    }
    const newVec = [];
    for (let i = 0; i < vec0.length; i++) {
        newVec.push(operation(vec0[i], vec1[i]));
    }
    return newVec;
};

export const vectorAddition = (vec0: Vector, vec1: Vector): Vector => {
    return binaryVectorOp(vec0, vec1, (a, b) => a + b);
};

export const vectorSubtraction = (vec0: Vector, vec1: Vector): Vector => {
    return binaryVectorOp(vec0, vec1, (a, b) => a - b);
};

export const pointWiseVectorMultiplication = (vec0: Vector, vec1: Vector): Vector => {
    return binaryVectorOp(vec0, vec1, (a, b) => a * b);
};

export const scalarProduct = (scalar: number, vector: Vector): Vector => {
    return vector.map(el => scalar * el);
};

export const vectorLength = (vec: Vector): number => {
    const sq = vec.reduce((prevVal: number, currVal: number) => prevVal + currVal*currVal, 0);
    return Math.sqrt(sq);
};


export const pointDistance = (p0: Vector, p1: Vector): number => {
    const diff = vectorSubtraction(p0, p1);
    const size = vectorLength(diff);
    return size;
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
