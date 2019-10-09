import { Layer, RasterLayer, IRasterLayerOptions } from './Layers';
/**
 * The following classes try to incorporate any information that map-libraries (ol, mapbox, leaflet) might need to display raster-layers.
 * Like Layers.ts, these classes are intended as an abstraction over all map-libraries. 
 * However, they were developed with open-layers in mind, and as such might not (yet) contain all information that other map-libraries require. 
 * Please extend these classes with any required information you might find.
 */



export interface IWmtsOptions extends IRasterLayerOptions {
    type: 'wmts';
    params: IWmtsParams;
}


export class WmtsLayer extends RasterLayer implements IWmtsOptions {
    type: 'wmts';
    params: IWmtsParams;
    constructor(options: IWmtsOptions) {
        super(options);
    }
}

export interface IWmtsMatrixSet {
    /** EPSG-Code */
    srs: string;
    matrixSet: string;
    matrixIds: string[];
    origin: {
        x: number,
        y: number
    };
    resolutions: number[];
    tilesize: {
        height: number,
        width: number
    };
}

export interface IWmtsParams {
    /** Layer name as advertised in the WMTS capabilities. */
    layer: string;
    /** Style name as advertised in the WMTS capabilities. */
    style: string;
    matrixSet: IWmtsMatrixSet;
    projection: string;
    format?: string;
    version?: string;
}

export const isWmtsLayer = (layer: Layer): layer is WmtsLayer => {
    return layer.type === 'wmts';
};

export interface IWmsOptions extends IRasterLayerOptions {
    type: 'wms';
    params: IWmsParams;
}

export class WmsLayer extends RasterLayer implements IWmsOptions {
    type: 'wms';
    params: IWmsParams;
    constructor(options: IWmsOptions) {
        super(options);
    }
}

export interface IWmsParams {
    LAYERS: string;
    FORMAT?: string;
    TIME?: string;
    VERSION?: string;
    TILED?: string;
    TRANSPARENT?: boolean;
    STYLES?: string;
}

export const isWmsLayer = (layer: Layer): layer is WmsLayer => {
    return layer.type === 'wms';
}