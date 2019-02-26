import { Layer, TGeoExtent } from './Layers';

/**
 *  LayerGroups
 */
export interface ILayerGroupOptions {
    id: string;
    name: string;
    layers: Layer[];
    filtertype?: 'Overlays' | 'Baselayers' | string;
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

    filtertype?: 'Overlays' | 'Baselayers' | string = 'Overlays';
    removable?: boolean = true;
    layerRemovable?: boolean = true;
    bbox?: [number, number, number, number];
    constructor(options: ILayerGroupOptions) {
        Object.assign(this, options);
    }
}
