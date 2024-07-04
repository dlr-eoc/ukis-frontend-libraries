import { Type } from '@angular/core';

export interface IAnyObject {
  [k: string]: any;
}

/**
 * When using dynamic components for layers you should keep in mind to handle the state (with a service or object binding) if needed,
 * because `legendIng` or `action` are placed inside `ngIf` directives in the template and are destroyed when they are hidden.
 */
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

export interface IPopupParams {
  layerId: string;
  layerName: string;
  mapEvent: any;
  layer: any;
  feature?: any;
  color?: Uint8ClampedArray | Uint8Array | Float32Array | DataView | string;
  /** properties of the feature/layer or asyncData */
  properties?: IAnyObject
}

export interface popup {
  /** limit layer or feature properties: only those properties of a layer/feature, that are listed in this array, are being passed through to a popup-render-function */
  filterkeys?: Array<string>;
  /** To overwrite the keys (and only the keys) of the layer/feature properties. Object has the form {"oldKey": "newKey"} */
  properties?: IAnyObject;
  /** 
   * function to create the popup content.
   * Return an HTML string or an object from which an HTML string is generated.
   */
  popupFunction?: (popupParams: IPopupParams) => string | IAnyObject;
  /** 
   * async function to create the popup content.
   * Pass an HTML string, or an object from which an HTML string is generated, to the callback..
   */
  asyncPopup?: (popupParams: IPopupParams, cb: (content: string | IAnyObject) => void) => void;
  /** create popup using angular component */
  dynamicPopup?: {
    component: Type<any>;
    getAttributes?: (args: IPopupParams) => object;
  };
  /** default event is click - use move for a popup on hover */
  event?: 'move' | 'click';
  /** default is false - removes the other popups if the next is added */
  single?: boolean;
  /** options which get assigned on the popup creations e.g. ol/Overlay */
  options?: IAnyObject;
  /** If the layer should be filtered out and the popup beneath should be shown e.g. text overlays use filterLayer: true */
  filterLayer?: boolean;
  /** Use this to not add a popup to the map and instead publish events to view data in an external UI. */
  asObservable?: boolean;
}

export interface IPopupEvent {
  popupObj: popup;
  popupParams: IPopupParams;
}

/**
 * Layer events like rendering or Source events like data load, change, error...
 */
export interface ILayerEvent {
  event: string;
  listener: (args?: any) => void;
}

/** can be raster and vector */
export const TmsLayertype = 'tms';
export const WmsLayertype = 'wms';
export const WmtsLayertype = 'wmts';
export const XyzLayertype = 'xyz';
export const GeojsonLayertype = 'geojson';
export const KmlLayertype = 'kml';
export const WfsLayertype = 'wfs';
/** can be raster and vector */
export const CustomLayertype = 'custom';
/** can have multiple layers raster, vector... */
export const StackedLayertype = 'stacked';
export type TVectorLayertype = typeof GeojsonLayertype | typeof WfsLayertype | typeof TmsLayertype | typeof KmlLayertype | typeof CustomLayertype;
export type TRasterLayertype = typeof WmsLayertype | typeof WmtsLayertype | typeof XyzLayertype | typeof TmsLayertype | typeof CustomLayertype;
export type TLayertype = TRasterLayertype | TVectorLayertype | string;

export const Filtertypes = {
  Baselayers: 'Baselayers',
  Overlays: 'Overlays',
  Layers: 'Layers'
} as const;
export type TFiltertypes = keyof typeof Filtertypes;
export type TFiltertypesUncap = Uncapitalize<TFiltertypes>;


/**
 * @deprecated The method should not be used because it can be false positive
 *
 * CustomLayertype and TmsLayertype can be raster and vector.
 * You have to double check by yourself later!
 */
export function isVectorLayertype(inpt: string): inpt is TVectorLayertype {
  return [GeojsonLayertype, WfsLayertype, CustomLayertype, KmlLayertype, TmsLayertype].includes(inpt);
}


/**
 * @deprecated The method should not be used because it can be false positive
 *
 * CustomLayertype and TmsLayertype can be raster and vector.
 * You have to double check by yourself later!
 */
export function isRasterLayertype(inpt: string): inpt is TRasterLayertype {
  return [WmsLayertype, WmtsLayertype, XyzLayertype, CustomLayertype, TmsLayertype].includes(inpt);
}

export function isLayertype(type: string): type is TLayertype {
  return [TmsLayertype, WmsLayertype, WmtsLayertype, XyzLayertype, GeojsonLayertype, KmlLayertype, WfsLayertype, CustomLayertype].includes(type);
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


export interface ILayerExpanded {
  /** tab: settings | legend | description */
  tab: string;
  /** optional to not expand the tab - for overriding defaults */
  expanded?: boolean;
}

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
  description?: string | IDynamicComponent;
  time?: string;
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
    /** e.g. https://openlayers.org/en/latest/apidoc/module-ol_layer_Layer-Layer.html Fires */
    layer?: ILayerEvent[];
    /** e.g. https://openlayers.org/en/latest/apidoc/module-ol_source_Source.html Tile | Image | Raster | Vector */
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
  expanded?: boolean | ILayerExpanded;
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
  units: string;
  values: string;
  display?: {
    format?: string;
    step?: string;
    default?: string;
  };
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
    /** styleSource=OpenMapStyle.sourceKey if style is a OpenMapStyle Obj */
    styleSource?: string;
    [k: string]: any;
  };
  /** if true clusters points | or set a Object with cluster options e.g. distance ... depends on the map-library */
  cluster?: boolean | IAnyObject;
  type: TVectorLayertype;
}

/**
 * The `crossOrigin` property can overwrite the one set in the layersource of the custom_layer if there is such a property e.g. when using OpenLayers as a map-engine
 * It also can be used to disable get color values for a OpenLayers layer in the layer popup when set to crossOrigin: null
 */
export interface ICustomLayerOptions<T = any> extends Omit<ILayerOptions, 'type'> {
  type?: TLayertype;
  custom_layer: T;
}

/**
 * Layers is an array of layers which get stacked together and shown as one layer
 */
export interface IStackedLayerOptions extends Omit<ILayerOptions, 'type'> {
  type?: TLayertype;
  layers: Layer[];
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
  description?: string | IDynamicComponent;
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
  expanded: boolean | ILayerExpanded = false;
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
  /** https://docs.geoserver.org/latest/en/user/tutorials/cql/cql_tutorial.html#cql-tutorial */
  CQL_FILTER?: string;
  /** https://docs.geoserver.org/latest/en/user/styling/sld/reference/filters.html */
  FILTER?: string;
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

/**
 * @deprecated The method should not be used because it can be false positive
 */
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

/**
 * @deprecated The method should not be used because it can be false positive
 */
export const isVectorLayer = (layer: Layer): layer is VectorLayer => {
  return isVectorLayertype(layer.type);
};

export class CustomLayer<T = any> extends Layer implements ICustomLayerOptions<T> {
  type = CustomLayertype;
  // tslint:disable-next-line: variable-name
  custom_layer: T = {} as T;
  constructor(options: ICustomLayerOptions<T>) {
    super(options as ILayerOptions);
    Object.assign(this, options);
  }
}

export class StackedLayer extends Layer implements IStackedLayerOptions {
  type = StackedLayertype;
  layers: Layer[] = [];
  constructor(options: IStackedLayerOptions) {
    super(options as ILayerOptions);
    Object.assign(this, options);
  }
}
