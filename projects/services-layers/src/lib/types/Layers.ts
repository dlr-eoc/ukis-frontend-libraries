import { Type } from '@angular/core';

export interface IAnyObject {
  [k: string]: any;
}

interface IDynamicComponent {
  component: Type<any>;
  inputs?: { [input: string]: any };
  outputs?: { [inputChange: string]: (value) => void };
}

export interface ILayerContent extends IAnyObject {
  /** MIME type of the Content */
  type: string;
  href?: string;
  title?: string;
  /** String type, not empty that can contain any text encoded media type */
  content?: string;
}

export interface ILayerStyleSet extends IAnyObject {
  name: string;
  title: string;
  abstract?: string;
  default?: boolean;
  legendURL?: string;
  content?: ILayerContent;
}

export interface popup {
  /** limit layer or feature properties: only those properties of a layer/feature, that are listed in this array, are being passed through to a popup-render-function */
  filterkeys?: Array<string>;
  /** To overwrite the keys (and only the keys) of the layer/feature properties. Object has the form {"oldKey": "newKey"} */
  properties?: IAnyObject;
  /** function to create html string - popupobj: nativeLayer */
  pupupFunktion?: (popupobj: IAnyObject) => string;
  /** async function where you can paste a html string to the callback - popupobj: nativeLayer */
  asyncPupup?: (popupobj: any, cb: (html: any) => void) => void;
  /** create popup using angular component */
  dynamicPopup?: {
    component: Type<any>;
    getAttributes?: (args: any) => object;
  };
  /** default event is click - use move for a popup on hover */
  event?: 'move' | 'click';
  /** default is false - removes the other popups if the next is added */
  single?: boolean;
  /** options which get assigned on the popup creations e.g. ol/Overlay */
  options?: IAnyObject;
}


/**
 * Layer events like rendering or Source events like data load, change, error...
 */
export interface ILayerEvent {
  event: string;
  listener: (args?: any) => void;
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

export const Filtertypes = {
  Baselayer: 'Baselayer',
  Overlays: 'Overlays',
  Layers: 'Layers'
} as const;
export type TFiltertypes = keyof typeof Filtertypes;



export function isVectorLayertype(inpt: string): inpt is TVectorLayertype {
  return [GeojsonLayertype, WfsLayertype, CustomLayertype].includes(inpt);
}

export function isRasterLayertype(inpt: string): inpt is TRasterLayertype {
  return [WmsLayertype, WmtsLayertype, XyzLayertype, CustomLayertype].includes(inpt);
}

export function isLayertype(inpt: string): inpt is TLayertype {
  return (isRasterLayertype(inpt) || isVectorLayertype(inpt));
}


/**
 * geographic coordinates
 * like ol.extent: minX, minY, maxX, maxY
 */
export type TGeoExtent = [number, number, number, number] | [number, number, number, number, number, number];

/*
 * There are effectively only two values that we may set for cors:
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin
 */
export type CrossOriginType = 'anonymous' | 'use-credentials';


export interface ILayerOptions {
  name: string;
  id: string;
  // id: string
  type: TLayertype;

  filtertype?: TFiltertypes;
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
  minZoom?: number;
  maxZoom?: number;
  /** legend for the layer as image or a angular component */
  legendImg?: string | IDynamicComponent;
  /** geographic coordinates */
  bbox?: TGeoExtent;
  dimensions?: ILayerDimensions;
  /** true: show popup on click | array: show popup on click and limit properties | or use a popup object to configure the popup
   * if a popup should be shown on multiple events use an array of popup object (only unique events)
   */
  // https://stackoverflow.com/questions/57016728/is-there-a-way-to-define-type-for-array-with-unique-items-in-typescript
  popup?: boolean | Array<string> | popup | popup[];
  events?: {
    /** e.g. https://openlayers.org/en/v6.5.0/apidoc/module-ol_layer_Layer-Layer.html Fires */
    layer?: ILayerEvent[];
    /** e.g. https://openlayers.org/en/v6.5.0/apidoc/module-ol_source_Source.html Tile | Image | Raster | Vector */
    source?: ILayerEvent[];
  };
  actions?: [{ title: string, icon: string, action: (Layer) => void }];
  /** optional angular component that can be used e.g. to change the layer style, filter the data or request new data */
  action?: IDynamicComponent;
  /** a layer might have more than one style; eg. true color and false color for the same dataset */
  styles?: ILayerStyleSet[];
  /** The crossOrigin attribute for loaded images if you want to access pixel data with the Canvas renderer */
  crossOrigin?: CrossOriginType;
  /** UI is expanded */
  expanded?: boolean;
  /**
   * CSS Class for custom styling
   *
   * If class 'hide' is included in the string, the layer is not shown in the UI - this can probably bring side effects when Layers are reordered, because the hidden layers could be moved on top off all!
   */
  cssClass?: string;
}

export interface ILayerDimensions extends IAnyObject {
  time?: ILayerTimeDimension;
  elevation?: ILayerElevationDimension;
}

export interface ILayerIntervalAndPeriod {
  /**
   * Example: "2016-01-01T00:00:00.000Z/2018-01-01T00:00:00.000Z"
   */
  interval: string;
  /**
   * Example: "P1Y"
   */
  periodicity: string;
}

export interface ILayerTimeDimension {
  values: string[] | ILayerIntervalAndPeriod[] | ILayerIntervalAndPeriod;
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
  params?: IRasterLayerParams;
  /** check if the service supports this tilesize */
  tileSize?: number;
  type: TRasterLayertype;
}

export interface IVectorLayerOptions extends ILayerOptions {
  /** data: geojson data */
  data?: any;
  url?: string;
  subdomains?: Array<string>;
  /** vector options like style, pointToLayer... depends on the map-library */
  options?: {
    /** ol/style/Style */
    style: any;
    [k: string]: any;
  };
  /** if true clusters points | or set a Object with cluster options e.g. distance ... depends on the map-library */
  cluster?: boolean | IAnyObject;
  type: TVectorLayertype;
}

/**
 * Deliberately does not have the `crossOrigin` property.
 * When using openlayers as a map-engine, `crossOrigin` is a property that UKIS just passes on to the layersource.
 * Since that layersource is provided by the user in a CustomLayer, setting `crossOrigin` in the ICustomLayerOptions would have no effect.
 */
export interface ICustomLayerOptions extends Omit<ILayerOptions, 'type' | 'crossOrigin'> {
  type?: TLayertype;
  custom_layer: any;
}

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

  filtertype?: TFiltertypes = 'Layers';
  continuousWorld = false;
  attribution?: string;
  displayName?: string;
  description?: string;
  protected protTime?: string;
  minResolution?: number;
  maxResolution?: number;
  minZoom?: number;
  maxZoom?: number;
  legendImg?: string | IDynamicComponent;

  bbox?: TGeoExtent;
  dimensions?: ILayerDimensions;

  popup?: ILayerOptions['popup'];
  events?: ILayerOptions['events'];
  actions?: [{ title: string, icon: string, action: (Layer) => void }];

  action?: IDynamicComponent;

  styles?: ILayerStyleSet[];
  crossOrigin?: CrossOriginType;
  expanded = false;
  cssClass?: string;

  constructor(options: ILayerOptions) {
    Object.assign(this, options);
  }

  get time() {
    return this.protTime;
  }
  set time(time: string) {
    this.protTime = time;
  }
}
/** raster params like wms params -> time, layers... depends on the map-library */
export interface IRasterLayerParams extends IAnyObject {
  LAYERS?: string;
  FORMAT?: string;
  TIME?: string;
  VERSION?: string;
  TILED?: string;
  TRANSPARENT?: boolean;
  STYLES?: string;
}

export class RasterLayer extends Layer implements IRasterLayerOptions {
  type: TRasterLayertype;
  url: string;
  subdomains?: Array<string>;
  params?: IRasterLayerParams;
  /** check if the service supports this tilesize */
  tileSize?: number;

  constructor(options: IRasterLayerOptions) {
    super(options);

    // if styles are given, set params and legendImg accordingly.
    if (this.styles && this.styles.length > 0) {
      let defaultStyle = this.styles.find(s => s.default);

      if (!defaultStyle) {
        defaultStyle = this.styles[0];
      }

      this.legendImg = defaultStyle.legendURL;
      if (this.params) {
        if (this.type === WmsLayertype) {
          this.params.STYLES = defaultStyle.name;
        } else if (this.type === WmtsLayertype) {
          this.params.style = defaultStyle.name;
        }
        this.params.STYLES = defaultStyle.name;
      } else if (this.type === WmtsLayertype) {
        if (!this.params) {
          this.params = {};
        }
        this.params.style = defaultStyle.name;
      }
    }
  }

  set time(time: string) {
    if (this.params) {
      this.params.TIME = time;
    }
    this.protTime = time;
  }

  get time() {
    return this.protTime;
  }
}

export const isRasterLayer = (layer: Layer): layer is RasterLayer => {
  return isRasterLayertype(layer.type);
};


export class VectorLayer extends Layer implements IVectorLayerOptions {
  type: TVectorLayertype;
  /** data: geojson data */
  data?: any;
  url?: string;
  subdomains?: Array<string>;
  /** vector options like style, pointToLayer... depend on the map-library, e.g.:
   * iconUrl: string - to specify icon for points
   * rotationPropName: string - property containing rotation angle in degrees
   */
  options?: IVectorLayerOptions['options'];
  cluster?: IVectorLayerOptions['cluster'];
  constructor(options: IVectorLayerOptions) {
    super(options);
  }
}

export const isVectorLayer = (layer: Layer): layer is VectorLayer => {
  return isVectorLayertype(layer.type);
};

export class CustomLayer extends Layer implements ICustomLayerOptions {
  type = 'custom';
  custom_layer: ICustomLayerOptions['custom_layer'] = {};
  constructor(options: ICustomLayerOptions) {
    super(options as ILayerOptions);
    Object.assign(this, options);
  }
}
