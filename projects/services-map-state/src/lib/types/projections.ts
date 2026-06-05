import { ProjectionDefinition } from "proj4";

export type TepsgCode = `EPSG:${number}` | `ESRI:${number}`;
/**
 * https://spatialreference.org/
 * https://github.com/proj4js/proj4js
 * https://epsg.io/
 * https://epsg.org/
 * https://github.com/openlayers/openlayers/blob/main/src/ol/proj/Projection.js
 */
export type IProjDef = IProj4jsDef | IProjjDef;
interface IProjDefBase {
    code: TepsgCode; // e.g.: "EPSG:3857"
    title: string; // projection title shown on switch, e.g.: "Spherical Mercator",
    extent: [number, number, number, number]; // projection extent in projected coordinates, e.g.: [-20026376.39, -20048966.10, 20026376.39, 20048966.10],
    worldExtent: [number, number, number, number]; // projection extent in geographical coordinates, e.g.:[-180.0, -85.06, 180.0, 85.06],
    global: true | false; // whether is global or local projection
    units: 'radians' | 'degrees' | 'ft' | 'm' | 'pixels' | 'tile-pixels' | 'us-ft';
}
interface IProj4jsDef extends IProjDefBase {
    proj4js: string; // ' proj4 string, e.g.: "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs"
}
interface IProjjDef extends IProjDefBase {
    projjson: ProjectionDefinition; // projjson object https://github.com/proj4js/proj4js#using
}

export const WebMercator = 'EPSG:3857';
export const WGS84 = 'EPSG:4326';

export const EPSG_3995_Def: IProjDef = {
    code: 'EPSG:3995',
    proj4js: '+proj=stere +lat_0=90 +lat_ts=71 +lon_0=0 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs +type=crs',
    title: 'Arctic Polar Stereographic',
    extent: [-3299207.53, -3333134.03, 3299207.53, 3333134.03],
    worldExtent: [-180.0, 60.0, 180.0, 90.0],
    global: false,
    units: 'm'
};

export const EPSG_3031_Def: IProjDef = {
    code: `EPSG:3031`,
    proj4js: '+proj=stere +lat_0=-90 +lat_ts=-71 +lon_0=0 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs +type=crs',
    title: 'Antarctic Polar Stereographic',
    extent: [-3299207.53, -3333134.03, 3299207.53, 3333134.03],
    worldExtent: [-180.0, -90.0, 180.0, -60.0],
    global: false,
    units: 'm'
};

export const EPSG_3857_Def: IProjDef = {
    code: WebMercator,
    proj4js: '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs',
    title: 'Spherical Mercator',
    extent: [-20037508.34, -20048966.1, 20037508.34, 20048966.1],
    worldExtent: [-180.0, -85.06, 180.0, 85.06],
    global: true,
    units: 'm'
};

export const EPSG_4326_Def: IProjDef = {
    code: WGS84,
    proj4js: '+proj=longlat +datum=WGS84 +no_defs +type=crs',
    title: 'WGS 84',
    extent: [-180.0, -90.0, 180.0, 90.0],
    worldExtent: [-180.0, -90.0, 180.0, 90.0],
    global: true,
    units: 'degrees'
};

export const EPSG_3035_Def: IProjDef = {
    code: `EPSG:3035`,
    title: 'ETRS89-extended / LAEA Europe',
    proj4js: '+proj=laea +lat_0=52 +lon_0=10 +x_0=4321000 +y_0=3210000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs +axis=neu', // +axis=neu was missing in proj4js string!! 
    // projjson: // https://spatialreference.org/ref/epsg/3035/projjson.json
    extent: [1908523.29, 1137678.21, 6901611.5, 6872461.46], // EPSG.io
    worldExtent: [-16.1, 33.26, 38.01, 84.73],
    global: false,
    units: 'm'
}


interface AxisTransform {
    eastIdx: number;    // Which index is East? (0 or 1)
    northIdx: number;   // Which index is North? (0 or 1)
    eastSign: number;   // 1 for East, -1 for West
    northSign: number;  // 1 for North, -1 for South
}
type AxisType = 'enu' | 'ned' | 'neu' | 'uen' | 'esu' | 'wnu';
/**
 * Adjusts a Bounding Box [minX, minY, maxX, maxY] 
 * based on the axis string (e.g., 'enu', 'ned').
 * Target is always ENU (East, North).
 * 
 * **Definition | X-Axis | Y-Axis | Z-Axis**
 * **`+axis=enu`** | **East** | **North** | **Up** | **The Standard.
 * **`+axis=ned`** | **North** | **East** | **Down** 
 * **`+axis=neu`** | **North** | **East** | **Up**
 * **`+axis=uen`** | **Up** | **East** | **North**
 * **`+axis=esu`** | **East** | **South** | **Up**
 * **`+axis=wnu`** | **West** | **North** | **Up**
 * 
 * https://github.com/openlayers/openlayers/issues/12406
 * https://github.com/proj4js/proj4js/blob/main/lib/adjust_axis.js
 */
export function adjustBBoxAxis(bbox: [number, number, number, number], axis: AxisType) {
    const AXIS_MAP: Record<AxisType, AxisTransform> = {
        // X=East, Y=North
        'enu': { eastIdx: 0, northIdx: 1, eastSign: 1, northSign: 1 },
        // X=North, Y=East
        'ned': { eastIdx: 1, northIdx: 0, eastSign: 1, northSign: 1 },
        'neu': { eastIdx: 1, northIdx: 0, eastSign: 1, northSign: 1 },
        // X=Up, Y=East (Warning: North is the Z-axis here, not in the BBOX)
        'uen': { eastIdx: 1, northIdx: 0, eastSign: 1, northSign: 1 },
        // X=East, Y=South
        'esu': { eastIdx: 0, northIdx: 1, eastSign: 1, northSign: -1 },
        // X=West, Y=North
        'wnu': { eastIdx: 0, northIdx: 1, eastSign: -1, northSign: 1 },
    };

    const config = (axis) ? AXIS_MAP[axis] : undefined;

    if (!config) {
        throw new Error(`Unsupported axis definition: ${axis}`);
    }

    const [minX, minY, maxX, maxY] = bbox;

    // Helper to get the value and apply sign from the correct index
    const getVal = (idx: number, sign: number, isMax: boolean) => {
        const val = isMax ? (idx === 0 ? maxX : maxY) : (idx === 0 ? minX : minY);
        return val * sign;
    };

    // Calculate the new East (X) and North (Y) values
    const eastMin = getVal(config.eastIdx, config.eastSign, false);
    const eastMax = getVal(config.eastIdx, config.eastSign, true);

    const northMin = getVal(config.northIdx, config.northSign, false);
    const northMax = getVal(config.northIdx, config.northSign, true);

    /**
     * CRITICAL: When multiplying by -1 (West or South), 
     * the minimum value becomes the maximum value.
     * We must use Math.min/max to ensure the BBOX remains valid.
     */
    return [
        Math.min(eastMin, eastMax),
        Math.min(northMin, northMax),
        Math.max(eastMin, eastMax),
        Math.max(northMin, northMax)
    ] as [number, number, number, number];

}

export function adjustBBoxAxisToEnu(bbox: [number, number, number, number], axis?: AxisType, proj?: TepsgCode) {
    if (!axis ||
        !proj ||
        proj &&
        proj === WGS84 && axis === 'neu') {
        return bbox;
    } else {
        const adjustBBox = adjustBBoxAxis(bbox, axis);
        console.log('adjustBBoxAxis', bbox, axis, 'to', adjustBBox);
        return adjustBBox;
    }
}