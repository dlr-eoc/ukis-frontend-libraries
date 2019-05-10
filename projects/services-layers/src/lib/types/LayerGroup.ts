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
    removable?: boolean
    layerRemovable?: boolean
    bbox?: TGeoExtent
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
    removable?: boolean = true;
    layerRemovable?: boolean = true;
    bbox?: [number, number, number, number];
    constructor(options: ILayerGroupOptions) {
        Object.assign(this, options);
    }
}
