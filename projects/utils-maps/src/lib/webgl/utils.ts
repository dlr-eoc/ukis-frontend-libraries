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