export interface IProjDef {
    code: string; // e.g.: "EPSG:3857"
    proj4js: string; // ' proj4 string, e.g.: "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs"
    title: string; // projection title shown on switch, e.g.: "Spherical Mercator",
    extent: [number, number, number, number]; // projection extent in projected coordinates, e.g.: [-20026376.39, -20048966.10, 20026376.39, 20048966.10],
    worldExtent: [number, number, number, number]; // projection extent in geographical coordinates, e.g.:[-180.0, -85.06, 180.0, 85.06],
    global: true | false; // whether is global or local projection
    units: 'radians' | 'degrees' | 'ft' | 'm' | 'pixels' | 'tile-pixels' | 'us-ft';
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