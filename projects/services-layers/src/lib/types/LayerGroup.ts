import { Layer, TGeoExtent } from './Layers';

/**
 *  LayerGroups
 */
export interface ILayerGroupOptions {
    id: string;
    name: string;
    layers: Layer[];

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
        Object.assign(this, options);
    }
}
