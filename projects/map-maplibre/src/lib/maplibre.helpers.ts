
import { Map as glMap, LngLatBounds, LngLat, LayerSpecification, TypedStyleLayer, SourceSpecification } from 'maplibre-gl';
import { TGeoExtent, Layer as ukisLayer, TFiltertypes, TFiltertypesUncap } from '@dlr-eoc/services-layers';

/** Layers can consist of multiple layers and sources, e.g. if they are a VectorTileLayer - StyleSpecification   */
export type SourceIdSpecification = { [id: string]: SourceSpecification };
export type LayerSourceSpecification = { sources: SourceIdSpecification, layers: LayerSpecification[] };

type Tgroupfiltertype = TFiltertypesUncap | TFiltertypes;

export const UKIS_METADATA = {
    layerID: 'ukis:layerID',
    filtertype: 'ukis:filtertype'
};


export function setExtent(map: glMap, extent: TGeoExtent, geographic?: boolean, fitOptions?: any): TGeoExtent {
    const bounds = new LngLatBounds([extent[0], extent[1]], [extent[2], extent[3]]);
    map.fitBounds(bounds);

    // TODO: wait before return ?
    return getExtent(map, geographic);
}

export function getExtent(map: glMap, geographic?: boolean): TGeoExtent {
    const newbounds = map.getBounds();
    const newExtent = [newbounds.getSouth(), newbounds.getWest(), newbounds.getNorth(), newbounds.getEast()] as TGeoExtent;
    return newExtent;
}


export function setCenter(map: glMap, center: number[], geographic?: boolean): number[] {
    const lngLat = new LngLat(center[0], center[1]);
    map.setCenter(lngLat);


    // TODO: wait before return ?
    return getCenter(map, geographic);
}

export function getCenter(map: glMap, geographic?: boolean): number[] {
    const newLngLat = map.getCenter();
    return [newLngLat.lng, newLngLat.lat];
}


export function setZoom(map: glMap, zoom: number, notifier?: 'map' | 'user') {
    map.setZoom(zoom);
}

export function getZoom(map: glMap, notifier?: 'map' | 'user') {
    return map.getZoom();
}


export function setVisibility(map: glMap, layerOrId: string | TypedStyleLayer, visibility: boolean, cb?: () => void) {
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

export function setOpacity(map: glMap, layerOrId: string | TypedStyleLayer, opacity: number, cb?: () => void) {
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

export function getOpacity(map: glMap, layerOrId: string | TypedStyleLayer) {
    let mllayer;
    if (typeof layerOrId === 'string') {
        mllayer = map.getLayer(layerOrId) as TypedStyleLayer | undefined;
    } else {
        mllayer = layerOrId;
    }
    if (mllayer) {
        return styleLayerGetOpacity(mllayer);
    }
}

export function styleLayerGetOpacity(mllayer: TypedStyleLayer) {
    let opacityPaintProperty = getOpacityPaintProperty(mllayer.type);
    return mllayer.getPaintProperty(opacityPaintProperty);
}

export function getOpacityPaintProperty(type: string) {
    let _type = type;
    if (type === 'symbol') {
        _type = 'icon';
    }

    let opacityPaintProperty = `${_type}-opacity`;

    if (type === 'circle') {
        opacityPaintProperty = 'circle-stroke-opacity';
    }

    // hillshade only has visibility
    // https://github.com/maplibre/maplibre-gl-js/issues/1439
    if (type === 'hillshade') {
        opacityPaintProperty = 'hillshade-exaggeration';
    }

    return opacityPaintProperty;
}

export function getAllLayers(map: glMap, filtertype?: Tgroupfiltertype) {
    const layers = map.getStyle().layers;
    let filteredlayers = layers;
    if (filtertype) {
        const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
        filteredlayers = layers.filter(l => (l.metadata as any)?.[UKIS_METADATA.filtertype]?.toLowerCase() === lowerType);
    }

    return filteredlayers;
}


export function getUkisLayerIDs(map: glMap, filtertype?: Tgroupfiltertype) {
    let filteredlayers = getAllLayers(map, filtertype)
    const ids: string[] = filteredlayers.filter(l => (l.metadata as any)?.[UKIS_METADATA.layerID]).map(l => (l.metadata as any)?.[UKIS_METADATA.layerID]);
    return [...new Set(ids)];
}

export function getLayersAndSources(map: glMap, ukisLayerID: string) {
    const allLayers = getAllLayers(map);
    const filtered = allLayers.filter(l => {
        if ((l.metadata as any)?.[UKIS_METADATA.layerID] === ukisLayerID) {
            return true;
        } else {
            return;
        }
    });
    const styleSources = map.getStyle().sources;
    const filteredSources = filtered.reduce((results, l) => {
        let sid: string;
        if ('source' in l && typeof l['source'] === 'string') {
            sid = l['source'];
        } else {
            sid = l.id;
        }

        const s = styleSources[sid];
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

export function removeLayerAndSource(map: glMap, ukisLayerID: string | string[]) {
    const toRemove: {
        layers: LayerSpecification[],
        sources: SourceIdSpecification
    } = { layers: [], sources: {} };

    let groupIds = [];
    const allLayers = getAllLayers(map);
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

    const sourcesInOtherLayers = allLayers
        .filter(l => !toRemove.layers.map(r => r.id).includes(l.id)) // Difference
        .map(l => (l as any)?.source) // get sources
        .filter((value, index, array) => array.indexOf(value) === index && value); // unique and not undefined
    // only remove source if not used by other layer !!!
    Object.keys(toRemove.sources).forEach(k => {
        if (map.getSource(k) && !sourcesInOtherLayers.includes(k)) {
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
    let orderChanges: {
        layerId: string,
        beforeId: string
    }[] = [];

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


            /**
             * https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Map/#movelayer
             * The ID of an existing layer to insert the new layer before. 
             * When viewing the map, layer.id will appear beneath the beforeId layer. 
             * If beforeId is omitted, the layer will be appended to the end of the layers array and appear above all other layers on the map.
             */
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
    return orderChanges;
}


/**
 * Change the order of map layers based on the new ukisLayers
 */
export function changeOrderOfLayers(map: glMap, layers: ukisLayer[], mapLayerIds: string[], filtertype: Tgroupfiltertype) {
    const layerChange = getLayerChangeOrder(layers, mapLayerIds);
    const length = layerChange.length;
    if (length) {
        for (let index = 0; index < length; index++) {
            const lc = layerChange[index];
            if (index >= 1) {
                const newMapLayerIds = getUkisLayerIDs(map, filtertype)
                const newlayerChange = getLayerChangeOrder(layers, newMapLayerIds);
                // Stop moving layers because the order is already the same as in the new layer array.
                if (newlayerChange.length === 0) {
                    break;
                }
            }
            changeOrderOfLayer(map, lc);
        }
    }
}

export function changeOrderOfLayer(map: glMap, layerChange: { layerId: string, beforeId: string }) {
    if (layerChange) {
        const layerMapLayers = getLayersAndSources(map, layerChange.layerId).layers;
        const beforeMapLayers = getLayersAndSources(map, layerChange.beforeId).layers;
        /* const layerMapLayers = getFirstAndLastLayer(map, layerChange.layerId);
        const beforeMapLayers = getFirstAndLastLayer(map, layerChange.beforeId); */
        /** 
         * if the layer before the one to be moved has several layers, move the layer on beforeMapLayers[0]
         * If there is no layer before, move it to the top.
         * 
         * https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Map/#movelayer
         * -  If beforeId is omitted, the layer will be appended to the end of the layers array... -
         */
        if (beforeMapLayers.length >= 1) {
            layerChange.beforeId = beforeMapLayers[0].id;
        } else {
            layerChange.beforeId = null;
        }


        /** If the layer which should be moved has several layers, move all of them. */
        if (layerMapLayers.length > 1) {
            // reverse to move
            layerMapLayers.reverse();
            layerMapLayers.forEach((value: LayerSpecification, index: number) => {
                // Move the first layer to the Before ID and then move all layer after the moved layer.
                if (index === 0) {
                    if (layerChange.beforeId) {
                        map.moveLayer(value.id, layerChange.beforeId);
                    } else {
                        map.moveLayer(value.id);
                    }
                } else {
                    const beforeLayer = layerMapLayers[index - 1];
                    map.moveLayer(value.id, beforeLayer.id);
                }
            });
        } else if (layerMapLayers.length === 1) {
            const layer = layerMapLayers[0];
            if (layerChange.beforeId) {
                map.moveLayer(layer.id, layerChange.beforeId);
            } else {
                map.moveLayer(layer.id)
            }
        } else {
            // layerMapLayers.length === 0 
            // there is nothing to move
        }
    }
}