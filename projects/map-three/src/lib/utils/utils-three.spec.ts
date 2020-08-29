import { deg2Rad, rad2Deg, Map2SphereConverter, widthFromHeight, heightAboveWidth, zoom2width } from './utils-three';


describe('basic geometry', () => {

    it('radians and degrees', () => {
        const deg = 225;
        const rad = deg2Rad(deg);
        expect(rad).toBeCloseTo( 5 * Math.PI / 4);

        const deg2 = rad2Deg(rad);
        expect(deg2).toBeCloseTo(deg);
    });

    it('height and view-swath', () => {
        const fov = 60;
        const height = 1;

        const width = widthFromHeight(height, fov);
        expect(width).toBeCloseTo(2 / Math.sqrt(3));

        const height1 = heightAboveWidth(width, fov);
        expect(height1).toBeCloseTo(height);
    });

    it('zoom and width', () => {
        const zoom = 0;
        const mapWidth = 360;
        const w = zoom2width(zoom, mapWidth);
        expect(w).toBeCloseTo(mapWidth);

        const zoom1 = 30;
        const w1 = zoom2width(zoom1, mapWidth);
        expect(w1).toBeCloseTo(0);

        const zoom2 = 1;
        const w2 = zoom2width(zoom2, mapWidth);
        expect(w / w2).toBeCloseTo(2);
    });
});


describe('Map2SphereConverter', () => {

    it('lon/lat/zoom to x/y/z conversion and back', () => {
        const converter = new Map2SphereConverter(360 / (2 * Math.PI), 10, 52);

        const lon = 0;
        const lat = 0;
        const zoom = 0;
        const [x, y, z] = converter.lonLatZoom2XYZ(lon, lat, zoom);
        expect(x).toBeCloseTo(0);
        expect(y).toBeCloseTo(0);
        expect(z).toBeCloseTo(74.41);

        const [lon1, lat1, zoom1] = converter.xyz2LonLatZoom(x, y, z);
        expect(lon1).toBeCloseTo(lon);
        expect(lat1).toBeCloseTo(lat);
        expect(zoom1).toBeCloseTo(zoom);

        const lon2 = 0;
        const lat2 = 0;
        const zoom2 = 20;
        const [x2, y2, z2] = converter.lonLatZoom2XYZ(lon2, lat2, zoom2);
        expect(x2).toBeCloseTo(0);
        expect(y2).toBeCloseTo(0);
        expect(z2).toBeCloseTo(converter.sphereRadiusSU);

        const lon3 = 180;
        const lat3 = 0;
        const zoom3 = 20;
        const [x3, y3, z3] = converter.lonLatZoom2XYZ(lon3, lat3, zoom3);
        expect(x3).toBeCloseTo(0);
        expect(y3).toBeCloseTo(0);
        expect(z3).toBeCloseTo(-converter.sphereRadiusSU);

        const lon4 = 180;
        const lat4 = 90;
        const zoom4 = 20;
        const [x4, y4, z4] = converter.lonLatZoom2XYZ(lon4, lat4, zoom4);
        expect(x4).toBeCloseTo(0);
        expect(y4).toBeCloseTo(converter.sphereRadiusSU);
        expect(z4).toBeCloseTo(0);
    });
});
