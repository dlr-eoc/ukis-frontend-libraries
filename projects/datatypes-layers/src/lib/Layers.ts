export type popup = {
  properties?: any
  pupupFunktion?: (popupobj: any) => string;
  asyncPupup?: (popupobj: any, cb: Function) => void;
}


export type TWmsLayertype = "wms";
export type TWmtsLayertype = "wmts";
export type TXyzLayertype = "xyz";
export type TGeojsonLayertype = "geojson";
export type TWfsLayertype = "wfs";
export type TCustomLayertype = "custom";
export type TOmsVectorLayertype = TGeojsonLayertype | TWfsLayertype | TCustomLayertype;
export function isOmsVectorLayertype(inpt: string): inpt is TOmsType {
  return ["geojson", "wfs", "custom"].includes(inpt);
};
export type TOmsRasterLayertype = TWmsLayertype | TWmtsLayertype | TXyzLayertype | TCustomLayertype;
export function isOmsRasterLayertype(inpt: string): inpt is TOmsType {
  return ["wms", "wmts", "xyz", "custom"].includes(inpt);
};
export type TOmsType = TWmsLayertype | TWmtsLayertype | TXyzLayertype | TGeojsonLayertype | TWfsLayertype | TCustomLayertype;
export function isOmsType(inpt: string): inpt is TOmsType {
  return ["wms", "wmts", "xyz", "geojson", "wfs", "custom"].includes(inpt);
};

 
/** geographic coordinates */
export type TGeoExtent = [number, number, number, number] | [number, number, number, number, number, number];

export interface ILayerOptions {
  name: string
  id: string
  //id: string
  type: TOmsType

  filtertype?: 'Overlays' | 'Baselayers' | string;
  opacity?: number
  visible?: boolean
  removable?: boolean
  continuousWorld?: boolean
  attribution?: string
  displayName?: string
  description?: string
  time?: string
  zIndex?: number
  minResolution?: number
  maxResolution?: number
  legendImg?: string
  /** geographic coordinates */
  bbox?: TGeoExtent
  /** true if show popup or set properties or popup-function  */
  popup?: boolean | Array<string> | popup
}

export interface IRasterLayerOptions extends ILayerOptions {
  url: string;
  subdomains?: Array<string>;
  /** raster params like wms params -> time, layers... depends on the map-library */
  params?: any;
  type: TOmsRasterLayertype;
}

export interface IVectorLayerOptions extends ILayerOptions {
  data?: any
  url?: string;
  subdomains?: Array<string>;
  /** vector options like style, pointToLayer... depends on the map-library */
  options?: any
  /** true if show popup or set Array with keys of properties to show in popup  */
  cluster?: any;
  type: TOmsVectorLayertype;
}

export interface ICustomLayerOptions extends ILayerOptions {
  custom_layer: any
}

/**
* Classes for layer construction
*/
export class Layer implements ILayerOptions {
  name: string = '';
  id: string = '';
  type: TOmsType;
  opacity: number = 1;
  visible: boolean = true;
  removable: boolean = false;

  filtertype?: 'Overlays' | 'Baselayers' | string = 'Overlays';
  continuousWorld?: boolean = false;
  attribution?: string;
  displayName?: string;
  description?: string;
  time?: string;
  zIndex?: number;
  minResolution?: number;
  maxResolution?: number;
  legendImg?: string;

  /** geographic coordinates */
  bbox?: TGeoExtent
  /** true if show popup or set properties or popup-function  */
  popup?: boolean | Array<string> | popup

  constructor(options: ILayerOptions) {
    Object.assign(this, options);
  }
}

export class RasterLayer extends Layer implements IRasterLayerOptions {
  type: TOmsRasterLayertype;
  url: string;
  subdomains?: Array<string>;
  /** raster params like wms params -> time, layers... depends on the map-library */
  params?: any;

  constructor(options: IRasterLayerOptions) {
    super(options)
  }
}

export class VectorLayer extends Layer implements IVectorLayerOptions {
  type: TOmsVectorLayertype;
  data?: any;
  url?: string;
  subdomains?: Array<string>;
  /** vektor options like style, pointToLayer... depends on the map-library, e.g.:
   * iconUrl: string - to specify icon for points
   * rotationPropName: string - property containing rotation angle in degrees
   * */
  options?: any;
  cluster?: any;
  constructor(options: IVectorLayerOptions) {
    super(options);
  }
}

export class CustomLayer extends Layer implements ICustomLayerOptions {
  type: 'custom';
  custom_layer: any = {};
  constructor(options: ICustomLayerOptions) {
    super(options);
    Object.assign(this, options);
  }
}