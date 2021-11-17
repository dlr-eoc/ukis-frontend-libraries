import { Layer, RasterLayer, IRasterLayerOptions, IRasterLayerParams } from './Layers';
/**
 * The following classes try to incorporate any information that map-libraries (ol, mapbox, leaflet) might need to display raster-layers.
 * Like Layers.ts, these classes are intended as an abstraction over all map-libraries.
 * However, they were developed with open-layers in mind, and as such might not (yet) contain all information that other map-libraries require.
 * Please extend these classes with any required information you might find.
 */



export interface IWmtsOptions extends IRasterLayerOptions {
  type: 'wmts';
  params: IWmtsParams;
  /** check if the service supports this tilesize */
  tileSize?: number;
}


export class WmtsLayer extends RasterLayer implements IWmtsOptions {
  type: 'wmts';
  params: IWmtsParams;
  /** check if the service supports this tilesize */
  tileSize?: number;
  constructor(options: IWmtsOptions) {
    super(options);
  }
}


export interface IBaseMatrixSet {
  /** the MatrixSet ID in WMTS Capabilities - used for GetTile Request */
  matrixSet: string;
}
export interface IListMatrixSet extends IBaseMatrixSet {
  matrixIds: string[];
  resolutions: number[];
}

export interface ISimpleMatrixSet extends IBaseMatrixSet {
  /** levels to create resolutions and matrixIds */
  resolutionLevels?: number;
  /** Prefix of the matrixId  */
  tileMatrixPrefix?: string;
}

export interface IWmtsParams {
  /** Layer name as advertised in the WMTS capabilities. */
  layer: string;
  /** Style name as advertised in the WMTS capabilities. */
  style: string;
  matrixSetOptions?: ISimpleMatrixSet | IListMatrixSet;
  projection?: string;
  format?: string;
  version?: string;
}

export const isWmtsLayer = (layer: Layer): layer is WmtsLayer => {
  return layer.type === 'wmts';
};

export interface IWmsOptions extends IRasterLayerOptions {
  type: 'wms';
  params: IWmsParams;
  /** check if the service supports this tilesize */
  tileSize?: number;
}

export class WmsLayer extends RasterLayer implements IWmsOptions {
  type: 'wms';
  params: IWmsParams;
  /** check if the service supports this tilesize */
  tileSize?: number;
  constructor(options: IWmsOptions) {
    super(options);
  }
}

export interface IWmsParams extends IRasterLayerParams {
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
};
