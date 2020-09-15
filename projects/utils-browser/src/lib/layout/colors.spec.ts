import { rgbToHex, hexToRgb, hsvToRgb, rgbToHsv, hslToRgb, rgbToHsl } from "./colors";


describe('Color test suite', () => {
    it('hex/rgb/hsv/hsl conversion', () => {
        const rgb = [206, 129, 212];
        const hsv = [296 / 360, 39 / 100, 83 / 100];
        const hsl = [296 / 360, 49 / 100, 67 / 100];
        const hex = '#ce81d4';

        const hsvTransl = rgbToHsv(rgb[0], rgb[1], rgb[2]);
        const hslTransl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
        const hexTransl = rgbToHex(rgb[0], rgb[1], rgb[2]);
        expect(hsvTransl[0]).toBeCloseTo(hsv[0]);
        expect(hsvTransl[1]).toBeCloseTo(hsv[1]);
        expect(hsvTransl[2]).toBeCloseTo(hsv[2]);
        expect(hslTransl[0]).toBeCloseTo(hsl[0]);
        expect(hslTransl[1]).toBeCloseTo(hsl[1]);
        expect(hslTransl[2]).toBeCloseTo(hsl[2]);
        expect(hexTransl).toEqual(hex);
        const rgbReconstrHex = hexToRgb(hexTransl);
        const rgbReconstrHsv = hsvToRgb(hsvTransl[0], hsvTransl[1], hsvTransl[2]);
        const rgbReconstrHsl = hslToRgb(hslTransl[0], hslTransl[1], hslTransl[2]);
        expect(rgbReconstrHex[0]).toBeCloseTo(rgb[0]);
        expect(rgbReconstrHex[1]).toBeCloseTo(rgb[1]);
        expect(rgbReconstrHex[2]).toBeCloseTo(rgb[2]);
        expect(rgbReconstrHsv[0]).toBeCloseTo(rgb[0]);
        expect(rgbReconstrHsv[1]).toBeCloseTo(rgb[1]);
        expect(rgbReconstrHsv[2]).toBeCloseTo(rgb[2]);
        expect(rgbReconstrHsl[0]).toBeCloseTo(rgb[0]);
        expect(rgbReconstrHsl[1]).toBeCloseTo(rgb[1]);
        expect(rgbReconstrHsl[2]).toBeCloseTo(rgb[2]);

        const rgb2 = [101, 224, 220];
        const hsv2 = [178 / 360, 55 / 100, 88 / 100];
        const hsl2 = [178 / 360, 66 / 100, 64 / 100];
        const hex2 = '#65e0dc';

        const hsvTransl2 = rgbToHsv(rgb2[0], rgb2[1], rgb2[2]);
        const hslTransl2 = rgbToHsl(rgb2[0], rgb2[1], rgb2[2]);
        const hexTransl2 = rgbToHex(rgb2[0], rgb2[1], rgb2[2]);
        expect(hsvTransl2[0]).toBeCloseTo(hsv2[0]);
        expect(hsvTransl2[1]).toBeCloseTo(hsv2[1]);
        expect(hsvTransl2[2]).toBeCloseTo(hsv2[2]);
        expect(hslTransl2[0]).toBeCloseTo(hsl2[0]);
        expect(hslTransl2[1]).toBeCloseTo(hsl2[1]);
        expect(hslTransl2[2]).toBeCloseTo(hsl2[2]);
        expect(hexTransl2).toEqual(hex2);
        const rgbReconstrHex2 = hexToRgb(hexTransl2);
        const rgbReconstrHsv2 = hsvToRgb(hsvTransl2[0], hsvTransl2[1], hsvTransl2[2]);
        const rgbReconstrHsl2 = hslToRgb(hslTransl2[0], hslTransl2[1], hslTransl2[2]);
        expect(rgbReconstrHex2[0]).toBeCloseTo(rgb2[0]);
        expect(rgbReconstrHex2[1]).toBeCloseTo(rgb2[1]);
        expect(rgbReconstrHex2[2]).toBeCloseTo(rgb2[2]);
        expect(rgbReconstrHsv2[0]).toBeCloseTo(rgb2[0]);
        expect(rgbReconstrHsv2[1]).toBeCloseTo(rgb2[1]);
        expect(rgbReconstrHsv2[2]).toBeCloseTo(rgb2[2]);
        expect(rgbReconstrHsl2[0]).toBeCloseTo(rgb2[0]);
        expect(rgbReconstrHsl2[1]).toBeCloseTo(rgb2[1]);
        expect(rgbReconstrHsl2[2]).toBeCloseTo(rgb2[2]);
    });
});
