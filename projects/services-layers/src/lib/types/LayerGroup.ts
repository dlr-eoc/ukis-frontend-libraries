import { Layer, TGeoExtent, TFiltertypes, ILayerExpanded } from './Layers';
import { IDynamicComponent } from '@dlr-eoc/ngx-ukis-utilities';

/**
 *  LayerGroups
 */
export interface ILayerGroupOptions {
  id: string;
  name: string;
  /** Layers to group - Higher indexes get drawn above lower indexes */
  layers: Layer[];

  visible?: boolean;
  displayName?: string;
  filtertype?: TFiltertypes;
  removable?: boolean;
  layerRemovable?: boolean;
  bbox?: TGeoExtent;
  nativeBbox?: {
    /** the EPSG code for the bbox  */
    epsg: string,
    /** native coordinates for projected layers - this can be helpful when zooming to the extent of a projected layer */
    bbox: TGeoExtent
  };
  /** description for the group as string/html or a angular component */
  description?: string | IDynamicComponent;
  /** legend for the group as image or a angular component */
  legendImg?: string | IDynamicComponent;
  actions?: [{ title: string, icon: string, action: (LayerGroup: LayerGroup) => void }];
  /** optional angular component that can be used e.g. to change the layer style, filter the data or request new data */
  action?: IDynamicComponent;
  /** UI is expanded */
  expanded?: boolean | ILayerExpanded;
  /**
   * CSS Class for custom styling
   *
   * If class 'hide' is included in the string, the group is not shown in the UI - this can probably bring side effects when Layers are reordered, because the hidden layers could be moved on top off all!
   */
  cssClass?: string;
}

/**
 * Classes for layer construction
 */
export class LayerGroup implements ILayerGroupOptions {
  id: string;
  name: string;
  layers: Layer[];

  protected protVisible!: boolean;
  displayName?: string;
  filtertype: TFiltertypes;
  removable: boolean;
  layerRemovable: boolean;
  bbox?: TGeoExtent;
  nativeBbox?: {
    epsg: string,
    bbox: TGeoExtent
  };
  description?: string | IDynamicComponent;
  legendImg?: string | IDynamicComponent;
  actions?: [{ title: string, icon: string, action: (LayerGroup: LayerGroup) => void }];
  action?: IDynamicComponent;
  expanded: boolean | ILayerExpanded;
  cssClass?: string;

  constructor(options: ILayerGroupOptions) {
    this.id = options.id || '';
    this.name = options.name || '';
    this.layers = options.layers;
    this.displayName = options.displayName;
    this.filtertype = options.filtertype || 'Layers';
    this.removable = options.removable || true;
    this.layerRemovable = options.layerRemovable || true;
    this.bbox = options.bbox;
    this.nativeBbox = options.nativeBbox;
    this.description = options.description;
    this.legendImg = options.legendImg;
    this.actions = options.actions;
    this.action = options.action;
    this.expanded = options.expanded || false;
    this.cssClass = options.cssClass;

    const visible = options.visible;
    if (options && visible !== undefined && options.layers && options.layers.length) {
      options.layers = options.layers.map(l => {
        l.visible = visible;
        return l;
      });
    }
  }

  get visible() {
    if (this.layers && this.layers.length) {
      this.protVisible = this.layers.filter(l => l.visible).length > 0;
    }
    return this.protVisible;
  }
  set visible(value: boolean) {
    this.protVisible = value;
    if (this.layers && this.layers.length) {
      this.layers = this.layers.map(l => {
        l.visible = value;
        return l;
      });
    }
  }
}
