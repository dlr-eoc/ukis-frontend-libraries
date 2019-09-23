export interface IOwsContent {
  /** MIME type of the Content */
  type: string;
  href?: string;
  title?: string;
  /** String type, not empty that can contain any text encoded media type */
  content?: string;
  [k: string]: any;
}

export interface IOwsStyleSet {
  name: string;
  title: string;
  abstract?: string;
  default?: boolean;
  legendURL?: string;
  content?: IOwsContent;
  [k: string]: any;
}

export interface popup {
  properties?: any;
  pupupFunktion?: (popupobj: any) => string;
  asyncPupup?: (popupobj: any, cb: Function) => void;
}


export const WmsLayertype = 'wms';
export const WmtsLayertype = 'wmts';
export const XyzLayertype = 'xyz';
export const GeojsonLayertype = 'geojson';
export const WfsLayertype = 'wfs';
export const CustomLayertype = 'custom';
export type TVectorLayertype = 'geojson' | 'wfs' | 'custom';
export type TRasterLayertype = 'wms' | 'wmts' | 'xyz' | 'custom';
export type TLayertype = TRasterLayertype | TVectorLayertype | string;



export function isVectorLayertype(inpt: string): inpt is TVectorLayertype {
  return [GeojsonLayertype, WfsLayertype, CustomLayertype].includes(inpt);
}

export function isRasterLayertype(inpt: string): inpt is TRasterLayertype {
  return [WmsLayertype, WmtsLayertype, XyzLayertype, CustomLayertype].includes(inpt);
}

export function isLayertype(inpt: string): inpt is TLayertype {
  return (isRasterLayertype(inpt) || isVectorLayertype(inpt));
}


/** geographic coordinates */
export type TGeoExtent = [number, number, number, number] | [number, number, number, number, number, number];

export interface ILayerOptions {
  name: string;
  id: string;
  // id: string
  type: TLayertype;

  filtertype?: 'Baselayers' | 'Overlays' | 'Layers';
  opacity?: number;
  visible?: boolean;
  removable?: boolean;
  continuousWorld?: boolean;
  attribution?: string;
  displayName?: string;
  description?: string;
  time?: string;
  /** zIndex: DEPRECIATED handeld internal by the layer service */
  zIndex?: number;
  minResolution?: number;
  maxResolution?: number;
  legendImg?: string;
  /** geographic coordinates */
  bbox?: TGeoExtent;
  dimensions?: ILayerDimensions;
  /** true if show popup or set properties or popup-function  */
  popup?: boolean | Array<string> | popup;
  actions?: [{ title: string, icon: string, action: (Layer) => void }];
}

export interface ILayerDimensions {
  time?: ILayerTimeDimension;
  elevation?: ILayerElevationDimension;
  [k: string]: any;
}

export interface ILayerIntervalAndPeriod {
  interval: string,
  periodicity: string
}

export interface ILayerTimeDimension {
  values: string[] | ILayerIntervalAndPeriod;
  units: string;
  display?: {
    format?: string;
    period?: string;
    default?: string;
  };
}

export interface ILayerElevationDimension {
  /** Default steps to display in elevation slider */
  display?: string;
  units: string;
  value?: string;
}

export interface IRasterLayerOptions extends ILayerOptions {
  url: string;
  subdomains?: Array<string>;
  /** raster params like wms params -> time, layers... depends on the map-library */
  params?: any;
  type: TRasterLayertype;
  /** a layer might have more than one style; eg. true color and false color for the same dataset */
  styles?: IOwsStyleSet[];
}

export interface IVectorLayerOptions extends ILayerOptions {
  data?: any;
  url?: string;
  subdomains?: Array<string>;
  /** vector options like style, pointToLayer... depends on the map-library */
  options?: any;
  /** true if show popup or set Array with keys of properties to show in popup  */
  cluster?: any;
  type: TVectorLayertype;
}

export interface ICustomLayerOptions extends ILayerOptions {
  custom_layer: any;
}
;
/**
* Classes for layer construction
*/
export class Layer implements ILayerOptions {
  name = '';
  id = '';
  type: TLayertype;
  opacity = 1;
  visible = true;
  removable = false;

  filtertype?: 'Baselayers' | 'Overlays' | 'Layers' = 'Layers';
  continuousWorld = false;
  attribution?: string;
  displayName?: string;
  description?: string;
  time?: string;
  /** zIndex: DEPRECIATED handeld internal by the layer service */
  zIndex?: number;
  minResolution?: number;
  maxResolution?: number;
  legendImg?: string;

  /** geographic coordinates */
  bbox?: TGeoExtent;
  /** true if show popup or set properties or popup-function  */
  popup?: boolean | Array<string> | popup;
  actions?: [{ title: string, icon: string, action: (Layer) => void }];

  /** a layer might have more than one style; eg. true color and false color for the same dataset */
  styles?: IOwsStyleSet[];

  constructor(options: ILayerOptions) {
    Object.assign(this, options);
  }
}

export class RasterLayer extends Layer implements IRasterLayerOptions {
  type: TRasterLayertype;
  url: string;
  subdomains?: Array<string>;
  /** raster params like wms params -> time, layers... depends on the map-library */
  params?: any;

  constructor(options: IRasterLayerOptions) {
    super(options);

    // if styles are given, set params and legendImg accordingly.
    if (this.styles && this.styles.length > 0) {
      let defaultStyle = this.styles.find(s => s.default);

      if (!defaultStyle) {
        defaultStyle = this.styles[0];
      }

      this.legendImg = defaultStyle.legendURL;
      if (this.type === WmsLayertype) {
        this.params.STYLES = defaultStyle.name;
      } else if (this.type === WmtsLayertype) {
        this.params.style = defaultStyle.name;
      }

    }
  }

}

export const isRasterLayer = (layer: Layer): layer is RasterLayer => {
  return isRasterLayertype(layer.type);
};


export class VectorLayer extends Layer implements IVectorLayerOptions {
  type: TVectorLayertype;
  data?: any;
  url?: string;
  subdomains?: Array<string>;
  /** vector options like style, pointToLayer... depends on the map-library, e.g.:
   * iconUrl: string - to specify icon for points
   * rotationPropName: string - property containing rotation angle in degrees
   * */
  options?: any;
  cluster?: any;
  constructor(options: IVectorLayerOptions) {
    super(options);
  }
}

export const isVectorLayer = (layer: Layer): layer is VectorLayer => {
  return isVectorLayertype(layer.type);
};

export class CustomLayer extends Layer implements ICustomLayerOptions {
  type = 'custom';
  custom_layer: any = {};
  constructor(options: ICustomLayerOptions) {
    super(options);
    Object.assign(this, options);
  }
}
