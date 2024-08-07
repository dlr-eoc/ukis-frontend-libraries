import {
    CircleLayerSpecification, FillLayerSpecification, GeoJSONSourceSpecification, LayerSpecification, Map as glMap,
    LineLayerSpecification, RasterLayerSpecification, RasterSourceSpecification, SourceSpecification, StyleSpecification, SymbolLayerSpecification, TypedStyleLayer, VectorSourceSpecification, Source, FilterSpecification, DataDrivenPropertyValueSpecification,
    MapGeoJSONFeature
} from "maplibre-gl";
import {
    RasterLayer as ukisRasterLayer, WmsLayer as ukisWmsLayer, WmtsLayer as ukisWtmsLayer,
    WmtsLayer as ukisWmtsLayer, VectorLayer as ukisVectorLayer, CustomLayer as ukisCustomLayer, Layer as ukisLayer, StackedLayer, XyzLayertype, WmsLayertype, WmtsLayertype, TmsLayertype, GeojsonLayertype, KmlLayertype, WfsLayertype, CustomLayertype, StackedLayertype, TFiltertypes
} from '@dlr-eoc/services-layers';
import { LayerSourceSpecification, SourceIdSpecification, UKIS_METADATA, getAllLayers, getOpacityPaintProperty, getLayerbeforeId, addUkisLayerMetadata } from "./maplibre.helpers";
import { propsEqual, clone } from '@dlr-eoc/utilities';

export function createGetMapUrl(l: ukisWmsLayer) {
    const baseurl = l.url;
    const properties = l.params
    let url = `${baseurl}?bbox={bbox-epsg-3857}&format=${properties?.FORMAT || 'image/png'}&service=WMS&version=${properties?.VERSION || '1.1.1'}&request=GetMap&srs=EPSG:3857&transparent=${properties?.TRANSPARENT || 'true'}&width=${l.tileSize || 256}&height=${l.tileSize || 256}&layers=${properties?.LAYERS}`;
    if (properties.STYLES) {
        url += `&styles=${properties.STYLES}`
    }
    return url;
}

export function createGetTileUrl(l: ukisWtmsLayer) {
    const baseurl = l.url;
    const properties = l.params;
    const matrix = 'EPSG:3857:{z}';

    // https://github1s.com/openlayers/openlayers/blob/HEAD/src/ol/source/WMTS.js#L70-L71

    // https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Abasemap&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11
    // bbox={bbox-epsg-3857}&ratio={ratio}&quadkey={quadkey}&z={z}&x={x}&y={y}
    const url = `${baseurl}?layer=${properties?.layer}&style=${properties.style}&tilematrixset=${properties.matrixSetOptions?.matrixSet}&service=WTMS&version=${properties?.version || '1.0.0'}&request=GetTile&TileMatrix=${matrix}&TileCol={x}&TileRow={y}&format=${properties?.format || 'image/png'}`;
    return url;
}

function returnSourcesAndLayers(l: ukisLayer, source: SourceSpecification | KmlSourceSpecification, layers: LayerSpecification[]) {
    const sources: SourceIdSpecification = {};
    sources[l.id] = source as SourceSpecification;

    return {
        sources,
        layers
    } as LayerSourceSpecification;
}


export function layerIsSupported(layer: ukisLayer) {
    const supportedLayers = [XyzLayertype, WmsLayertype, WmtsLayertype, TmsLayertype, GeojsonLayertype, CustomLayertype, WfsLayertype, KmlLayertype, StackedLayertype];
    const supported = supportedLayers.includes(layer.type);
    if (!supported) {
        console.warn(`layer of type ${layer.type} is not supported!`)
    }
    return supported;
}

/**
 * This function is used as the basis for all layers.
 * Wms | Xyz | Wmts | Geojson | Wfs | Kml
 */
export function createBaseLayer<T>(l: ukisRasterLayer | ukisVectorLayer) {
    const source: VectorSourceSpecification | RasterSourceSpecification | GeoJSONSourceSpecification | KmlSourceSpecification = {} as any;
    const layer: FillLayerSpecification | LineLayerSpecification | SymbolLayerSpecification | CircleLayerSpecification | RasterLayerSpecification = {} as any;

    if (l instanceof ukisVectorLayer) {
        source.type = 'vector';

        if (l.type === 'geojson' || l.type === 'wfs') {
            source.type = 'geojson';
            (source as GeoJSONSourceSpecification).data = l.data || { type: 'FeatureCollection', features: [] };
        } else if (l.type === 'kml') {
            source.type = 'kml';
            (source as KmlSourceSpecification).data = l.data || { type: 'FeatureCollection', features: [] };
        }

        if (source.type === 'kml' || source.type === 'geojson') {
            if (l.data) {
                source.data = l.data;
            } else if (l.url) {
                source.data = l.url;
            }

            if (l.cluster) {
                source.cluster = true;
                if (typeof l.cluster !== 'boolean') {
                    if (l.cluster?.clusterRadius || l.cluster.distance) source.clusterRadius = l.cluster.clusterRadius | l.cluster.distance;
                    if (l.cluster?.clusterMaxZoom) source.clusterMaxZoom = l.cluster.clusterMaxZoom;
                    if (l.cluster?.clusterMinPoints) source.clusterMinPoints = l.cluster.clusterMinPoints;
                    if (l.cluster?.clusterProperties) source.clusterProperties = l.cluster.clusterProperties;
                }
            }
        }

        if (l.bbox && source.type === 'vector') {
            source.bounds = l.bbox as any;
        }

    } else if (l instanceof ukisRasterLayer) {
        source.type = 'raster';
        if (l.bbox && source.type === 'raster') {
            source.bounds = l.bbox as any;
        }
    }

    if (l.attribution) {
        source.attribution = l.attribution;
    }

    if (source.type === 'raster' && l instanceof ukisRasterLayer) {
        if (l.tileSize) { source.tileSize = l.tileSize; }
        else { source.tileSize = 256; }
    }

    layer.id = l.id;
    layer.type = 'raster';
    layer.source = l.id;
    layer.paint = {
        'raster-opacity': l.opacity
    };
    layer.layout = {
        visibility: (l.visible) ? 'visible' : 'none'
    };
    layer.metadata = addUkisLayerMetadata(l);

    if (l.maxZoom || l.maxZoom === 0) { layer.maxzoom = l.maxZoom; }
    if (l.minZoom || l.minZoom === 0) { layer.minzoom = l.minZoom; }

    return {
        source: source as T,
        layer
    }
}

export function createWmsLayer(l: ukisWmsLayer) {
    const { source, layer } = createBaseLayer<RasterSourceSpecification>(l);
    source.tiles = (l.subdomains) ? l.subdomains.map(s => {
        l.url = l.url.replace('{s}', s);
        return createGetMapUrl(l);
    }) : [createGetMapUrl(l)];
    return returnSourcesAndLayers(l, source, [layer]);
}

export function createXyzLayer(l: ukisRasterLayer) {
    const { source, layer } = createBaseLayer<RasterSourceSpecification>(l);
    source.tiles = (l.subdomains) ? l.subdomains.map(s => l.url.replace('{s}', s)) : [l.url];
    source.scheme = 'xyz';
    return returnSourcesAndLayers(l, source, [layer]);
}

export function createWmtsLayer(l: ukisWtmsLayer) {
    const { source, layer } = createBaseLayer<RasterSourceSpecification>(l);
    source.tiles = [createGetTileUrl(l)];
    return returnSourcesAndLayers(l, source, [layer]);
}


type tmsReturnType<T> = T extends ukisRasterLayer ? LayerSourceSpecification :
    T extends ukisVectorLayer ? StyleSpecification : never;

export function createTmsLayer<T extends ukisRasterLayer | ukisVectorLayer>(l: T): tmsReturnType<T> {
    let layerSourceOrStyleSpecification: any;
    if (l instanceof ukisRasterLayer) {
        const sl = createXyzLayer(l);

        layerSourceOrStyleSpecification = sl as LayerSourceSpecification;

    } else if (l instanceof ukisVectorLayer) {
        if(l?.options?.style){
            const style = clone(l?.options?.style) as StyleSpecification;
            const sourceKey = l?.options?.styleSource;
            Object.entries(style.sources).forEach(item => {
                const key = item[0];
                const source = item[1];
                if (!(source as any).attribution && l.attribution) {
                    (source as any).attribution = l.attribution;
                }
                if (key === sourceKey) {
                    setSubdomains(l,source);
                }
            });
            style.layers.forEach(ls => {
                (ls.metadata as any) = Object.assign(ls.metadata as any || {}, addUkisLayerMetadata(l))
                // Set not visible on start... This is not working with the new updateStyleLayerProperties
                if (!ls.layout) {
                    ls.layout = {
                        visibility: (l.visible) ? 'visible' : 'none'
                    }
                } else {
                    ls.layout.visibility = (l.visible) ? 'visible' : 'none'
                }
            });
            layerSourceOrStyleSpecification = style as StyleSpecification;
            // TODO: merge styles??? 
        }
    }
    return layerSourceOrStyleSpecification;
}

/** use subdomains to setUrl/s on source */
function setSubdomains(l: ukisLayer, source: SourceSpecification): void {
    if (l instanceof ukisVectorLayer || l instanceof ukisRasterLayer) {
        if (l.subdomains && source.type === 'vector' || source.type === 'raster' || source.type === 'raster-dem') {
            if (l.type === 'wfs' && l instanceof ukisVectorLayer) {
                source.tiles = [l.url.replace('{s}', `${l.subdomains[0]}-${l.subdomains[l.subdomains.length - 1]}`)];
            } else {
                const urls = l.subdomains.map((item) => l.url.replace('{s}', `${item}`));
                source.tiles = urls;
            }
        }
    }
}

export function createGeojsonLayer(l: ukisVectorLayer) {
    const { source } = createBaseLayer<GeoJSONSourceSpecification>(l)
    let layers: LayerSpecification[] = [];
    if (typeof l.data === 'object') {
        if (l.data.type === 'Feature') {
            layers = [createLayersFromGeojsonTypes(l.data, l)];
        } else if (l.data.type === 'FeatureCollection') {
            if (!l.data || !l.data.features.length) {
                layers = creteDefaultGeojsonLayers(l);
            } else {
                const features: MapGeoJSONFeature[] = l.data.features;
                const geomTypes = features.map(i => i.geometry.type);
                const uniqueGeomTypes = geomTypes.filter((t, i) => geomTypes.findIndex(t2 => t2 === t) === i);
                const uniqueFeatures = [];
                const hasPoly = uniqueGeomTypes.filter(i => i === 'Polygon' || i === 'MultiPolygon').length;
                const hasLine = uniqueGeomTypes.filter(i => i === 'LineString' || i === 'MultiLineString').length;
                const hasPoint = uniqueGeomTypes.filter(i => i === 'Point').length;

                if(hasPoly){
                    const defaultPoly = getDefaultGeoms().find(f => f.geometry.type === 'Polygon') as MapGeoJSONFeature;
                    uniqueFeatures.push(defaultPoly);
                }

                if(hasLine){
                    const defaultLine = getDefaultGeoms().find(f => f.geometry.type === 'LineString') as MapGeoJSONFeature;
                    uniqueFeatures.push(defaultLine);
                }

                if(hasPoint){
                    const defaultPoint = getDefaultGeoms().find(f => f.geometry.type === 'Point') as MapGeoJSONFeature;
                    uniqueFeatures.push(defaultPoint);
                }

                if (hasPoly && !hasLine) {
                    const defaultLine = getDefaultGeoms().find(f => f.geometry.type === 'LineString') as MapGeoJSONFeature;
                    uniqueFeatures.push(defaultLine);
                }
                
                layers = uniqueFeatures.map((f: MapGeoJSONFeature) => createLayersFromGeojsonTypes(f, l));
            }
        }
    } else {
        // url data
        const defaultGeom = getDefaultGeoms();
        layers = defaultGeom.map((f: any) => createLayersFromGeojsonTypes(f, l));
    }

    return returnSourcesAndLayers(l, source, layers);
}

export function createLayersFromGeojsonTypes(feature: MapGeoJSONFeature, l: ukisLayer, index?: number) {
    let layer: LayerSpecification = {} as never;

    // https://wiki.openstreetmap.org/wiki/Geojson_CSS
    // https://github.com/mapbox/simplestyle-spec/tree/master/1.1.0
    const defaultStyle = {
        fill: 'rgba(255,255,255,0.4)',
        stroke: '#3399CC',
        'stroke-width': 1.25,
        'circle-radius': 5
    } as const;

    const coalesce = <T>(key: keyof typeof defaultStyle) => {
        const style: DataDrivenPropertyValueSpecification<T> = ['coalesce', ['get', key], defaultStyle[key]];
        return style;
    }

    const type = feature.geometry.type;
    switch (type) {
        case 'Polygon':
        case 'MultiPolygon':
            layer = {
                id: `${l.id}:fill`,
                type: 'fill',
                source: l.id,
                paint: {
                    'fill-opacity': l.opacity,
                    'fill-color': coalesce('fill')
                },
                layout: {
                    visibility: (l.visible) ? 'visible' : 'none'
                },
                metadata: {},
                filter: ['==', '$type', 'Polygon']
            };
            layer.metadata[UKIS_METADATA.filtertype] = l.filtertype;
            layer.metadata[UKIS_METADATA.layerID] = l.id;
            break;
        case 'LineString':
        case 'MultiLineString':
            layer = {
                id: `${l.id}:line`,
                type: 'line',
                source: l.id,
                paint: {
                    'line-opacity': l.opacity,
                    'line-color': coalesce('stroke'),
                    'line-width': coalesce('stroke-width')
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round',
                    visibility: (l.visible) ? 'visible' : 'none'
                },
                metadata: {},
                filter: ['in', '$type', 'LineString', 'Polygon']
            };
            layer.metadata[UKIS_METADATA.filtertype] = l.filtertype;
            layer.metadata[UKIS_METADATA.layerID] = l.id;
            break;
        case 'Point':
            layer = {
                id: `${l.id}:circle`,
                type: 'circle',
                source: l.id,
                paint: {
                    'circle-opacity': l.opacity,
                    'circle-stroke-opacity': l.opacity,
                    'circle-stroke-color': coalesce('stroke'),
                    'circle-color': coalesce('fill'),
                    'circle-radius': coalesce('circle-radius'),
                    'circle-stroke-width': coalesce('stroke-width'),
                },
                layout: {
                    visibility: (l.visible) ? 'visible' : 'none'
                },
                metadata: {},
                filter: ['==', '$type', 'Point']
            };
            layer.metadata[UKIS_METADATA.filtertype] = l.filtertype;
            layer.metadata[UKIS_METADATA.layerID] = l.id;
            break;
    }

    if (typeof index === 'number') {
        layer.id += `:${index}`;
    }

    if (l.maxZoom || l.maxZoom === 0) layer.maxzoom = l.maxZoom;
    if (l.minZoom || l.minZoom === 0) layer.minzoom = l.minZoom;

    return layer;
}

export function creteDefaultGeojsonLayers(l: ukisVectorLayer) {
    const defaultGeom = getDefaultGeoms();
    return defaultGeom.map((f: MapGeoJSONFeature) => createLayersFromGeojsonTypes(f, l));
}

function getDefaultGeoms() {
    const defaultGeom: Omit<MapGeoJSONFeature, '_geometry' | 'id' | '_vectorTileFeature' | 'source' | 'layer' | 'state' | 'toJSON'>[] = [
        {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [] as any
            },
            properties: {
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: [] as any
            },
            properties: {
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [] as any
            },
            properties: {
 
            }
        }
    ];
    return defaultGeom;
}

/**
 * This could be improved by something like
 * - https://github.com/maplibre/maplibre-gl-js/discussions/1078 ->  addProtocol
 * - https://openlayers.org/en/latest/apidoc/module-ol_source_Vector.html#~LoadingStrategy
 * - https://openlayers.org/en/latest/apidoc/module-ol_source_TileWMS-TileWMS.html
 *  Or force the server to provide vector tiles :D -> e.g. https://docs.geoserver.org/main/en/user/extensions/vectortiles/tutorial.html
 */
export function createWfsLayer(l: ukisVectorLayer) {
    let url = null;
    if (l.url) {
        if (l.url.indexOf('http://') === 0 || l.url.indexOf('https://') === 0) {
            url = new URL(l.url);
        } else {
            url = new URL(l.url, window.location.origin);
        }

        // making sure that srsname is set to projection for GeoJson
        url.searchParams.set('srsname', 'EPSG:4326');
        // url.searchParams.set('bbox', `{bbox-epsg-3857},EPSG:3857`);

        l.url = url.toString();
    }

    return createGeojsonLayer(l);
}


export type KmlSourceSpecification = Omit<GeoJSONSourceSpecification, 'type'> & { type: "kml" };
export function createKmlLayer(l: ukisVectorLayer) {
    /**
     * use addSourceType('kml', KMLSource,...)
     * and extend the geojson source to convert kml to geojson and then use it.
     * see -> map-maplibre.component.ts
     */
    const { sources, layers } = createGeojsonLayer(l);
    const source: KmlSourceSpecification = sources[l.id] as never;
    source.type = 'kml';
    return returnSourcesAndLayers(l, source, layers);
}



export function createCustomLayer(l: ukisCustomLayer) {

    const isStyleSpec = l.custom_layer?.version && l.custom_layer?.sources && l.custom_layer?.layers;
    if (!isStyleSpec) {
        console.error('custom_layer is not a StyleSpecification');
    }

    const style = clone(l.custom_layer) as StyleSpecification;

    const sources: SourceIdSpecification = style.sources;
    Object.keys(sources).forEach(key => {
        const s = sources[key];
        if (!(s as any).attribution && l.attribution) {
            (s as any).attribution = l.attribution;
        }
    });


    const layers: LayerSpecification[] = style.layers;
    layers.forEach(ls => {
        // add l.id only if not already added
        if (ls.id.indexOf(l.id) === -1) {
            ls.id = `${ls.id}:${l.id}`;
        }
        ls.metadata = Object.assign(ls.metadata as any || {}, addUkisLayerMetadata(l));

        // Set visibility only if it is not ignored in a custom layer.
        // Allow hidden or always visible layers in a custom layer.
        const ignoreVisibility = ls.metadata?.[UKIS_METADATA.ignoreVisibility]
        if (!ignoreVisibility) {
            if (!ls.layout) {
                ls.layout = {};
            }
            ls.layout.visibility = (l.visible) ? 'visible' : 'none';
        }

        const opacityPaintProperty = (ls.paint) ? getOpacityPaintProperty(ls.type) : null;
        // Set the opacity only if it is not ignored in a custom layer.
        const ignoreOpacity = ls.metadata?.[UKIS_METADATA.ignoreOpacity]
        if (opacityPaintProperty && !ignoreOpacity) {
            if (!ls.paint) {
                ls.paint = {};
            }
            (ls.paint as any)[opacityPaintProperty] = l.opacity;
        }
    });


    return style;
}


export function createStackedLayer(l: StackedLayer) {
    if (l instanceof StackedLayer) {
        const layersStyles = l.layers.map(ml => {
            // Set visibility and opacity from the StackedLayer as start for all the layers
            // they will be updated later in map-component 
            ml.visible = l.visible;
            ml.opacity = l.opacity;

            /** popups are get from the olLayer later so add them */
            /* if (l.popup) {
                ml.popup = l.popup;
            } */

            /** events are get from the olLayer later so add them */
            /* if (l.events) {
                ml.events = l.events;
            } */

            /** Only crete layers that are not stacked. */
            if (ml instanceof StackedLayer !== true) {
                return createLayer(ml);
            }
        });

        const sources: SourceIdSpecification | StyleSpecification['sources'] = {};
        const layers: LayerSpecification[] = [];
        // This has to be done like for a custom layer, so only one mlLayer exists for the stack.
        layersStyles.forEach(lsGroup => {
            lsGroup.layers.forEach(ls => {
                // add l.id only if not already added
                if (ls.id.indexOf(l.id) === -1) {
                    ls.id = `${ls.id}:${l.id}`;
                }
                ls.metadata = Object.assign(ls.metadata as any || {}, addUkisLayerMetadata(l));
                layers.push(ls);
            });

            Object.keys(lsGroup.sources).forEach(s => {
                sources[s] = lsGroup.sources[s];
            });
        });

        return {
            sources,
            layers
        } as LayerSourceSpecification;
    } else {
        console.log('layer is not of type StackedLayer!', l);
    }
}

/**
 * all layers 
 */

export function createLayer(newLayer: ukisLayer) {
    let newLlayer: (LayerSourceSpecification | StyleSpecification | undefined);
    switch (newLayer.type) {
        case XyzLayertype:
            newLlayer = createXyzLayer(newLayer as ukisRasterLayer);
            break;
        case WmsLayertype:
            newLlayer = createWmsLayer(newLayer as ukisWmsLayer);
            break;
        case WmtsLayertype:
            newLlayer = createWmtsLayer(newLayer as ukisWmtsLayer);
            break;
        case TmsLayertype:
            newLlayer = createTmsLayer(newLayer as ukisVectorLayer | ukisRasterLayer);
            break;
        case GeojsonLayertype:
            newLlayer = createGeojsonLayer(newLayer as ukisVectorLayer);
            break;
        case KmlLayertype:
            newLlayer = createKmlLayer(newLayer as ukisVectorLayer);
            break;
        case WfsLayertype:
            newLlayer = createWfsLayer(newLayer as ukisVectorLayer);
            break;
        case CustomLayertype:
            newLlayer = createCustomLayer(newLayer as ukisCustomLayer);
            break;
        case StackedLayertype:
            newLlayer = createStackedLayer(newLayer as StackedLayer);
            break;
    }
    return newLlayer;
}


export function updateSource(map: glMap, layer: ukisLayer, oldSource: Source) {
    /* if (oldSource.type === 'geojson' && oldSource instanceof GeoJSONSource) {
        if (layer.type === 'geojson' && layer instanceof ukisVectorLayer) {
            if (typeof layer.cluster === 'object') {
                oldSource.setClusterOptions(layer.cluster)
            }
            
            oldSource.setData(layer.data);
            return;
        }
    } */

    /* if(oldSource.type === 'image'){
        oldSource.updateImage()
    } */

    const oldSourceSpec = map.getStyle().sources[layer.id];
    if (oldSourceSpec) {
        const allLayers = getAllLayers(map);
        const layersWhitSource = allLayers.filter(l => {
            if (l.type !== 'background') {
                return l.source === layer.id;
            }
        });
        const newLS = createLayer(layer);
        const newSourceSpec = newLS.sources[layer.id];

        const diff = !propsEqual(newSourceSpec, oldSourceSpec);
        if (diff) {
            layersWhitSource.forEach(l => {
                map.removeLayer(l.id);
            });
            map.removeSource(layer.id);

            console.log('update source', layer.id, newSourceSpec);
            map.addSource(layer.id, newSourceSpec);
            layersWhitSource.forEach(l => {
                map.addLayer(l);
                // console.log('update layer for source', l.id);
            });
        }
    }
}

export function updateStyleLayerProperties(map: glMap, mllayer: TypedStyleLayer, layer: ukisLayer) {
    // https://maplibre.org/maplibre-style-spec/layers/#layer-properties
    // paint -> map.setPaintProperty(l.id...)
    // layout -> map.setLayoutProperty(l.id...)
    // maxzoom/minzoom -> map.setLayerZoomRange(l.id...)
    // filter -> map.setFilter(l.id...)
    // source -> mllayer.source =
    // source-layer -> mllayer.sourceLayer =
    // metadata -> TODO

    const newLS = createLayer(layer);
    const newStyleLayer = newLS.layers.find(l => l.id === mllayer.id);

    if (newStyleLayer) {

        type TlayerProp = keyof LayerSpecification;
        Object.entries(newStyleLayer).map((p: [TlayerProp | 'filter' | 'source' | 'source-layer', any]) => {
            const propKey = p[0];
            const value = p[1];
            switch (propKey) {
                case 'paint':
                    const diff = Object.entries(value as LayerSpecification['paint']).map(item => {
                        const key = item[0];
                        // Set opacity only if it is not ignored in a custom layer. Here we do not need to check for UKIS_METADATA.ignoreOpacity like on setOpacity because it is set in -> createLayer(layer) -> createCustomLayer
                        const oldProp = mllayer.getPaintProperty(key);
                        const newProp = item[1];
                        if (oldProp !== newProp) {
                            if (map.getTerrain()) {
                                // if has terrain use workaround remove and add layer
                                return true;
                            } else {
                                // https://github.com/maplibre/maplibre-gl-js/issues/3001
                                map.setPaintProperty(mllayer.id, key, newProp);
                                // map.style.setPaintProperty(mllayer.id, key, newProp);
                                return false
                            }
                        } else {
                            false;
                        }
                    }).filter(i => i === true);

                    // workaround remove and add layer
                    // https://github.com/maplibre/maplibre-gl-js/issues/3001
                    if (diff.length) {
                        // get beforeId before layer is removed, then the layer can be removed and added again
                        const beforeId = getLayerbeforeId(map, mllayer);
                        map.removeLayer(mllayer.id);
                        map.addLayer(newStyleLayer, beforeId);
                    }

                    break;
                case 'layout':
                    type TlayoutProps = keyof LayerSpecification['layout'];
                    // Set visibility only if it is not ignored in a custom layer. Here we do not need to check for UKIS_METADATA.ignoreVisibility] like on setVisibility because it is set in -> createLayer(layer) -> createCustomLayer
                    Object.entries(value).forEach((item: [TlayoutProps, any]) => {
                        const key = item[0];
                        const oldProp = mllayer.getLayoutProperty(key);
                        const newProp = item[1];
                        if (oldProp !== newProp) {
                            map.setLayoutProperty(mllayer.id, key, newProp);
                        }
                    })
                    break;
                case 'maxzoom':
                    if (mllayer.maxzoom !== value) {
                        map.setLayerZoomRange(mllayer.id, mllayer.minzoom, value as number);
                    }
                    break;
                case 'minzoom':
                    if (mllayer.minzoom !== value) {
                        map.setLayerZoomRange(mllayer.id, value as number, mllayer.maxzoom);
                    }
                    break;
                case 'filter':
                    const newFilter = value as FilterSpecification;
                    let filterChnanged = false;
                    if (newFilter) {
                        const oldFilter = mllayer.filter;
                        if (oldFilter) {
                            filterChnanged = !propsEqual(oldFilter as never, newFilter as never);
                        } else {
                            filterChnanged = true
                        }

                        if (newStyleLayer.type !== 'background' && filterChnanged) {
                            map.setFilter(mllayer.id, value as FilterSpecification);
                        }
                    }
                    break;
                case 'source':
                    if (mllayer.source !== value) {
                        mllayer.source = value;
                    }
                    break;
                case 'source-layer':
                    if (mllayer.sourceLayer !== value) {
                        mllayer.sourceLayer = value;
                    }
                    break;
            }
        });
    }
}



