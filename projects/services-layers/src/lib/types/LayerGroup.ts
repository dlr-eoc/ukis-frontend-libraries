import { Layer, TGeoExtent, TFiltertypes, ILayerExpanded } from './Layers';
import { IDynamicComponent } from '@dlr-eoc/core-ui';

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
  /** description for the group as string/html or a angular component */
  description?: string | IDynamicComponent;
  /** legend for the group as image or a angular component */
  legendImg?: string | IDynamicComponent;
  actions?: [{ title: string, icon: string, action: (LayerGroup) => void }];
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

  protected protVisible?: boolean;
  displayName?: string;
  filtertype?: TFiltertypes = 'Layers';
  removable = true;
  layerRemovable = true;
  bbox?: [number, number, number, number];
  description?: string | IDynamicComponent;
  legendImg?: string | IDynamicComponent;
  actions?: [{ title: string, icon: string, action: (LayerGroup) => void }];
  action?: IDynamicComponent;
  expanded: boolean | ILayerExpanded = false;
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
