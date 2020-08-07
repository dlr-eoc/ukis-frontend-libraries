
export type PaperFormat = 'A0' | 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6';
export type Orientation = 'landscape' | 'portrait';
export type Resolution = number;

const PaperSizeTable = {
    A6: {
        longCm: 14.8,
        shortCm: 10.5
    },
    A5: {
        longCm: 21.0,
        shortCm: 14.8
    },
    A4: {
        longCm: 29.7,
        shortCm: 21.0
    },
    A3: {
        longCm: 42.0,
        shortCm: 29.7
    },
    A2: {
        longCm: 59.4,
        shortCm: 42.0
    },
    A1: {
        longCm: 84.1,
        shortCm: 59.4
    },
    A0: {
        longCm: 118.9,
        shortCm: 84.1
    },
};

const inchPerCm = 0.393701;


/**
 * A utility class intended to help with getting the dimensions of a paper.
 * Especially useful for preparing html that needs to be printed.
 */
export class Paper {

    readonly widthCm: number;
    readonly heightCm: number;
    readonly widthPx: number;
    readonly heightPx: number;
    constructor(
        readonly format: PaperFormat,
        readonly resolution: Resolution,
        readonly orientation: Orientation) {

        const shortCm = PaperSizeTable[format].shortCm;
        const longCm = PaperSizeTable[format].longCm;
        const shortPx = Math.floor(shortCm * inchPerCm * resolution);
        const longPx = Math.floor(longCm * inchPerCm * resolution);

        if (orientation === 'portrait') {
            this.widthCm = shortCm;
            this.heightCm = longCm;
            this.widthPx = shortPx;
            this.heightPx = longPx;
        } else {
            this.widthCm = longCm;
            this.heightCm = shortCm;
            this.widthPx = longPx;
            this.heightPx = shortPx;
        }
    }

    updateFormat(format: PaperFormat): Paper {
        return new Paper(format, this.resolution, this.orientation);
    }

    updateResolution(resolution: Resolution): Paper {
        return new Paper(this.format, resolution, this.orientation);
    }

    updateOrientation(orientation: Orientation): Paper {
        return new Paper(this.format, this.resolution, orientation);
    }

}