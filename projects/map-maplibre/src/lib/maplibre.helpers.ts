
import { Map, LngLatBounds, LngLat, LayerSpecification, TypedStyleLayer, SourceSpecification } from 'maplibre-gl';
import { TGeoExtent, Layer as ukisLayer, TFiltertypes, TFiltertypesUncap } from '@dlr-eoc/services-layers';

/** Layers can consist of multiple layers and sources, e.g. if they are a VectorTileLayer - StyleSpecification   */
export type SourceIdSpecification = { [id: string]: SourceSpecification };
export type LayerSourceSpecification = { sources: SourceIdSpecification, layers: LayerSpecification[] };

type Tgroupfiltertype = TFiltertypesUncap | TFiltertypes;

export const UKIS_METADATA = {
    layerID: 'ukis:layerID',
    filtertype: 'ukis:filtertype'
};


export function setExtent(map: Map, extent: TGeoExtent, geographic?: boolean, fitOptions?: any): TGeoExtent {
    const bounds = new LngLatBounds([extent[0], extent[1]], [extent[2], extent[3]]);
    map.fitBounds(bounds);

    // TODO: wait before return ?
    return getExtent(map, geographic);
}

export function getExtent(map: Map, geographic?: boolean): TGeoExtent {
    const newbounds = map.getBounds();
    const newExtent = [newbounds.getSouth(), newbounds.getWest(), newbounds.getNorth(), newbounds.getEast()] as TGeoExtent;
    return newExtent;
}


export function setCenter(map: Map, center: number[], geographic?: boolean): number[] {
    const lngLat = new LngLat(center[0], center[1]);
    map.setCenter(lngLat);


    // TODO: wait before return ?
    return getCenter(map, geographic);
}

export function getCenter(map: Map, geographic?: boolean): number[] {
    const newLngLat = map.getCenter();
    return [newLngLat.lng, newLngLat.lat];
}


export function setZoom(map: Map, zoom: number, notifier?: 'map' | 'user') {
    map.setZoom(zoom);
}

export function getZoom(map: Map, notifier?: 'map' | 'user') {
    return map.getZoom();
}


export function setVisibility(map: Map, layerOrId: string | TypedStyleLayer, visibility: boolean, cb?: () => void) {
    let mllayer;
    if (typeof layerOrId === 'string') {
        mllayer = map.getLayer(layerOrId) as TypedStyleLayer | undefined;
    } else {
        mllayer = layerOrId;
    }
    if (mllayer && (mllayer.visibility === 'visible') !== visibility) {
        // On custom layers, only the group is set, not the layers, so they can be controlled by the user
        // layerOrGroupSetVisible(mllayer, layer.visible, layer instanceof CustomLayer);
        map.setLayoutProperty(mllayer.id, 'visibility', (visibility) ? 'visible' : 'none');

        // fixes https://github.com/dlr-eoc/ukis-frontend-libraries/issues/120
        // When a layer is set hidden, it's associated popups get a hidden class.
        /* this.mapSvc.hideAllPopups(!layer.visible, (item) => {
          // only hide the popups from the current layer
          const elementID = item.getId();
          const layerID = elementID.toString().split(':')[0];
          if (layerID) {
            if (layerID === layer.id) {
              return layerID === layer.id;
            }
          } else {
            return true;
          }
        }); */
    }
}

export function setOpacity(map: Map, layerOrId: string | TypedStyleLayer, opacity: number, cb?: () => void) {
    let mllayer;
    if (typeof layerOrId === 'string') {
        mllayer = map.getLayer(layerOrId) as TypedStyleLayer | undefined;
    } else {
        mllayer = layerOrId;
    }
    if (mllayer) {
        let type: any = mllayer.type;
        if (mllayer.type === 'symbol') {
            type = 'icon';
        }

        let opacityPaintProperty = `${type}-opacity`;

        if (mllayer.type === 'circle') {
            opacityPaintProperty = 'circle-stroke-opacity';
        }

        // hillshade only has visibility
        // https://github.com/maplibre/maplibre-gl-js/issues/1439
        if (mllayer.type === 'hillshade') {
            opacityPaintProperty = 'hillshade-exaggeration';
        }

        if (mllayer.getPaintProperty(opacityPaintProperty) !== opacity) {
            // TODO: custom layers -- On custom layers, only the group is set, not the layers, so they can be controlled by the user
            // TODO: layerOrGroupSetOpacity(mllayer, layer.opacity, layer instanceof CustomLayer);
            map.setPaintProperty(mllayer.id, opacityPaintProperty, opacity);

            // https://github.com/maplibre/maplibre-gl-js/issues/3001
            /* map.setLayoutProperty(mllayer.id, 'visibility', 'none');
            setTimeout(() => {
                map.setLayoutProperty(mllayer.id, 'visibility', 'visible');
            }, 200); */
            //-------------------------------------------------------
        }
    }
}

export function getAllLayers(map: Map, filtertype?: Tgroupfiltertype) {
    const layers = map.getStyle().layers;
    let filteredlayers = layers;
    if (filtertype) {
        const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
        filteredlayers = layers.filter(l => (l.metadata as any)?.[UKIS_METADATA.filtertype]?.toLowerCase() === lowerType);
    }

    return filteredlayers;
}

export function getIndexOfLayer(map: Map, layerID: string) {
    const layers = map.getStyle().layers;
    return layers.findIndex(l => l.id === layerID);
}

export function getUkisLayerIDs(map: Map, filtertype?: Tgroupfiltertype) {
    let filteredlayers = getAllLayers(map, filtertype)
    const ids: string[] = filteredlayers.filter(l => (l.metadata as any)?.[UKIS_METADATA.layerID]).map(l => (l.metadata as any)?.[UKIS_METADATA.layerID]);
    return [...new Set(ids)];
}

export function getLayersAndSources(map: Map, ukisLayerID: string) {
    const style = map.getStyle();
    const filtered = style.layers.filter(l => {
        if ((l.metadata as any)?.[UKIS_METADATA.layerID] === ukisLayerID) {
            return true;
        } else {
            return;
        }
    });
    const filteredSources = filtered.reduce((results, l) => {
        let sid: string;
        if ('source' in l && typeof l['source'] === 'string') {
            sid = l['source'];
        } else {
            sid = l.id;
        }

        const s = style.sources[sid];
        if (s) {
            results[sid] = s;
        }

        return results
    }, {} as SourceIdSpecification);
    return {
        layers: filtered,
        sources: filteredSources
    }
}

export function removeLayerAndSource(map: Map, ukisLayerID: string | string[]) {
    const toRemove: {
        layers: LayerSpecification[],
        sources: SourceIdSpecification
    } = { layers: [], sources: {} };

    let groupIds = [];
    if (Array.isArray(ukisLayerID)) {
        groupIds = ukisLayerID;
    } else {
        groupIds.push(ukisLayerID);
    }

    groupIds.forEach(item => {
        const ls = getLayersAndSources(map, item);
        toRemove.layers.push(...ls.layers);
        toRemove.sources = ls.sources;
    });

    toRemove.layers.forEach(l => {
        if (map.getLayer(l.id)) {
            map.removeLayer(l.id);
        }
    });

    Object.keys(toRemove.sources).forEach(k => {
        if (map.getSource(k)) {
            map.removeSource(k);
        }
    });
}


export function getFirstAndLastLayer(map: Map, ukisLayerID: string) {
    const filtered = map.getStyle().layers.filter(l => {
        if ((l.metadata as any)?.[UKIS_METADATA.layerID] === ukisLayerID) {
            return true;
        } else {
            return false;
        }
    });

    const filteredLength = filtered.length;

    if (filteredLength <= 1) {
        return [filtered[0]].filter(i => i);
    } else {
        const layers: LayerSpecification[] = [];
        filtered.forEach((item, index) => {
            if (index === 0) {
                layers.push(filtered[0]);
            } else if (index === filteredLength - 1) {
                layers.push(filtered[index]);
            } else {
                layers.push(filtered[index]);
            }
        })
        return layers.filter(i => i);
    }
}

/**
 * Detect changes in layer order
 */
export function getLayerChangeOrder(layers: ukisLayer[], mapLayerIds: string[]) {
    let layerChange: null | {
        layerId: string,
        beforeId: string
    }[] = [];
    const orderChanges = [];
    const layerIndexDiff = [];

    let layersLength = mapLayerIds.length;

    let index = layersLength;
    while (index--) {
        const mapLayer = mapLayerIds[index];
        const layer = layers[index];


        if (mapLayer !== layer.id) {
            const orderChange = {
                layerId: layer.id,
                beforeId: null as any
            };
            const indexMapLayer = mapLayerIds.indexOf(layer.id);
            layerIndexDiff.push(index > indexMapLayer);


            const beforeIndex = index + 1;
            if (beforeIndex < layersLength) {
                const beforeId = layers[beforeIndex].id;
                orderChange.beforeId = beforeId;
            } else if (beforeIndex === 0) {
                const beforeId = layers[beforeIndex].id;
                orderChange.beforeId = beforeId;
            }

            orderChanges.push(orderChange);
        }
    }

    const up = layerIndexDiff.filter(i => i).length < layerIndexDiff.filter(i => !i).length;
    const down = layerIndexDiff.filter(i => !i).length < layerIndexDiff.filter(i => i).length;

    if (down && !up) {
        // if more true in layerIndexDiff direction is down. Reverse changes so that the last change is used first.
        layerChange = orderChanges.reverse();
    } else if (up && !down) {
        // if more false in layerIndexDiff direction is up
        layerChange = orderChanges;
    } else if (!down && !up) {
        // if only two values, only two layers are swapped so it doesn't matter which change to take
        layerChange = orderChanges;
    }

    return layerChange;
}