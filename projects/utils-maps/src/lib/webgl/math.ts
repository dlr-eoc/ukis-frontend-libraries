export type Vec2 = [number, number];
export type Vec3 = [number, number, number];
export type Vector = number[];
export type V2Matrix = Vec2[];
export type V3Matrix = Vec3[];
export type Matrix = number[][];


export const binaryVectorOp = (vec0: Vector, vec1: Vector, operation: (a: number, b: number) => number): Vector => {
    if (vec0.length !== vec1.length) {
        throw new Error('Vectors are not of the same length');
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
    const sq = vec.reduce((prevVal: number, currVal: number) => prevVal + currVal * currVal, 0);
    return Math.sqrt(sq);
};

export const vectorSum = (vec: Vector): number => {
    return vec.reduce((prev: number, val: number) => prev + val, 0);
};

export const pointDistance = (p0: Vector, p1: Vector): number => {
    const diff = vectorSubtraction(p0, p1);
    const size = vectorLength(diff);
    return size;
};


export const flattenRecursive = (m: any[]): number[] => {
    let flat: number[] = [];
    for (const row of m) {
        let flattenedRow;
        if (Array.isArray(row[0])) {
            flattenedRow = flattenRecursive(row);
        } else {
            flattenedRow = row;
        }
        flat = Array.prototype.concat(flat, flattenedRow);
    }
    return flat;
};

export const matrixSum = (m: Matrix): number => {
    let sum = 0.;
    for (const row of m) {
        for (const entry of row) {
            sum += entry;
        }
    }
    return sum;
};

export const matrixVectorProduct = (m: Matrix, v: Vector): Vector => {
    const out = [];
    for (const row of m) {
        const s = vectorSum(pointWiseVectorMultiplication(row, v));
        out.push(s);
    }
    return out;
};

export const logN = (val: number, root: number): number => {
    return Math.log(val) / Math.log(root);
};

export const isPowerOf = (val: number, root: number): boolean => {
    return logN(val, root) % 1 === 0;
};

export const nextPowerOf = (val: number, root: number): number => {
    const exponent = Math.ceil(logN(val, root));
    return Math.pow(2, exponent);
};

export const createNDimArray = (dimensions: number[]) => {
    if (dimensions.length > 0) {
        const dim = dimensions[0];
        const rest = dimensions.slice(1);
        const newArray = new Array(dim);
        for (let i = 0; i < dim; i++) {
            newArray[i] = createNDimArray(rest);
        }
        return newArray;
     } else {
        return undefined;
     }
};
