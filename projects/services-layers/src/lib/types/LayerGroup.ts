import { Layer, TGeoExtent, TFiltertypes } from './Layers';

/**
 *  LayerGroups
 */
export interface ILayerGroupOptions {
  id: string;
  name: string;
  layers: Layer[];

  visible?: boolean;
  displayName?: string;
  filtertype?: TFiltertypes;
  removable?: boolean;
  layerRemovable?: boolean;
  bbox?: TGeoExtent;
  description?: string;
  actions?: [{ title: string, icon: string, action: (LayerGroup) => void }];
  /** UI is expanded */
  expanded?: boolean;
  /** CSS Class for custom styling */
  cssClass?: string;
}

/**
 * Classes for layer construction
 */
export class LayerGroup implements ILayerGroupOptions {
  id: string;
  name: string;
  layers: Layer[];

  protected protVisible?: boolean;
  displayName?: string;
  filtertype?: TFiltertypes = 'Layers';
  removable = true;
  layerRemovable = true;
  bbox?: [number, number, number, number];
  description?: string;
  actions?: [{ title: string, icon: string, action: (LayerGroup) => void }];
  /** UI is expanded */
  expanded = false;
  /** CSS Class for custom styling */
  cssClass?: string;

  constructor(options: ILayerGroupOptions) {
    if (options && options.visible !== undefined && options.layers && options.layers.length) {
      options.layers = options.layers.map(l => {
        l.visible = options.visible;
        return l;
      });
    }
    Object.assign(this, options);
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
