import { Layer, TGeoExtent } from './Layers';

/**
 *  LayerGroups
 */
export interface ILayerGroupOptions {
    id: string;
    name: string;
    layers: Layer[];

    visible?: boolean;
    displayName?: string;
    filtertype?: 'Baselayers' | 'Overlays' | 'Layers';
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

    displayName?: string;
    filtertype?: 'Baselayers' | 'Overlays' | 'Layers' = 'Layers';
    removable = true;
    layerRemovable = true;
    bbox?: [number, number, number, number];
    description?: string;
    actions?: [{ title: string, icon: string, action: (LayerGroup) => void }];
    constructor(options: ILayerGroupOptions) {
        if (options.visible && options.layers) {
            options.layers = options.layers.map(l => {
                l.visible = options.visible;
                return l;
            });
        }
        Object.assign(this, options);
    }

    get visible() {
        return this.layers.filter(l => l.visible).length > 0;
    }
    set visible(value: boolean) {
        if (this.layers) {
            this.layers = this.layers.map(l => {
                l.visible = value;
                return l;
            });
        }
    }
}
