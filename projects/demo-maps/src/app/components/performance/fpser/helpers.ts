


export async function meanFps(nrSamples: number): Promise<number> {
    return repeatPromise<number>(timeOneCycle(), nrSamples, []).then((results: number[]) => {
        return mean(results);
    });
}


export async function repeatPromise<T>(p: Promise<T>, nrInvocations: number, aggregatedResults: T[]): Promise<T[]> {
    return p.then((r: T) => {
        aggregatedResults.push(r);
        if (nrInvocations > 1) {
            return repeatPromise(p, nrInvocations - 1, aggregatedResults);
        } else {
            return aggregatedResults;
        }
    });
}


export async function timeOneCycle(): Promise<number> {
    const p = new Promise<number>((resolve, reject) => {
        const t0 = window.performance.now();
        setTimeout(() => {
            const t1 = window.performance.now();
            const delta = t1 - t0;
            const fps = 1000 / delta;
            resolve(fps);
        }, 0);
    });
    return p;
}

export function round(nr: number, precission: number) {
    const fac = Math.pow(10, precission);
    const nrB = Math.floor(nr * fac);
    return nrB / fac;
}


export function mean(arr: number[]): number {
    return sum(arr) / arr.length;
}

export function sum(arr: number[]): number {
    let sum = 0;
    for (const el of arr) {
        sum += el;
    }
    return sum;
}
