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
}

/**
* Classes for layer construction
*/
export class LayerGroup {
  id: string;
  name: string;
  layers: Layer[];

  protected _visible?: boolean;
  displayName?: string;
  filtertype?: TFiltertypes = 'Layers';
  removable = true;
  layerRemovable = true;
  bbox?: [number, number, number, number];
  description?: string;
  actions?: [{ title: string, icon: string, action: (LayerGroup) => void }];
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
      this._visible = this.layers.filter(l => l.visible).length > 0;
    }
    return this._visible;
  }
  set visible(value: boolean) {
    this._visible = value;
    if (this.layers && this.layers.length) {
      this.layers = this.layers.map(l => {
        l.visible = value;
        return l;
      });
    }
  }
}
