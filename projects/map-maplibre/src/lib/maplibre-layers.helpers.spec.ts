import { CustomLayer, Layer, RasterLayer, VectorLayer, WmsLayer, WmtsLayer } from '@dlr-eoc/services-layers';
import {
    addUkisLayerMetadata, createWmsLayer, createWmtsLayer, createGeojsonLayer, createCustomLayer,
    createGetMapUrl, createGetTileUrl, createBaseLayer, updateStyleLayerProperties
} from './maplibre-layers.helpers';
import testFeatureCollection from '@dlr-eoc/shared-assets/geojson/testFeatureCollection.json';
import { RasterSourceSpecification, StyleSpecification, TypedStyleLayer, Map as glMap } from 'maplibre-gl';
import { UKIS_METADATA, getOpacityPaintProperty } from './maplibre.helpers';
import { TestBed } from '@angular/core/testing';
import { MapMaplibreService } from './map-maplibre.service';

const createMapTarget = (size: number[]) => {
    const container = document.createElement('div');
    container.style.border = 'solid 1px #000';
    container.style.width = `${size[0]}px`;
    container.style.height = `${size[1]}px`;
    document.body.appendChild(container);
    return {
        size,
        container
    };
};

let ukisOsm: RasterLayer;
let ukisCustom: CustomLayer<StyleSpecification>;
let ukisWms: WmsLayer;
let ukisWmts: WmtsLayer;
let ukisGeoJson: VectorLayer;

const createLayers = () => {
    ukisOsm = new RasterLayer({
        name: 'OpenStreetMap',
        displayName: 'OpenStreetMap',
        id: 'osm_2',
        visible: false,
        type: 'xyz',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        subdomains: ['a', 'b', 'c'],
        attribution: '&copy, <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors',
        continuousWorld: false,
        legendImg: 'https://a.tile.openstreetmap.org/3/4/3.png',
        description: 'OpenStreetMap z-x-y Tiles',
        opacity: 1
    });

    ukisCustom = new CustomLayer<StyleSpecification>({
        id: 'waterway-planet_eoc',
        name: 'waterway',
        visible: true,
        removable: true,
        custom_layer: {
            version: 8,
            // Use a different source for layers, to improve render quality
            sources: {
                'waterway-planet_eoc': // 'planet_eoc':
                {
                    "type": "vector",
                    //@ts-ignore
                    "__Comment": "The url to the tilejson is not public available so we use the tiles array to skip the request, to make use of the tms service. See https://github.com/openlayers/ol-mapbox-style/blob/v8.2.1/src/util.js#L109",
                    "url": "",
                    "tiles": [
                        "https://a.tiles.geoservice.dlr.de/service/tms/1.0.0/planet_eoc@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf?flipy=true",
                        "https://b.tiles.geoservice.dlr.de/service/tms/1.0.0/planet_eoc@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf?flipy=true",
                        "https://c.tiles.geoservice.dlr.de/service/tms/1.0.0/planet_eoc@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf?flipy=true",
                        "https://d.tiles.geoservice.dlr.de/service/tms/1.0.0/planet_eoc@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf?flipy=true"
                    ]
                }
            },
            layers: [{
                "id": "waterway",
                "type": "line",
                "source": "waterway-planet_eoc", // 'planet_eoc',
                "source-layer": "waterway",
                "filter": [
                    "==",
                    "$type",
                    "LineString"
                ],
                "layout": {
                    "visibility": "visible"
                },
                "paint": {
                    "line-color": "hsl(198, 100%, 28%)"
                }
            },
            {
                "id": "water",
                "type": "fill",
                "source": "waterway-planet_eoc", // 'planet_eoc',
                "source-layer": "water",
                "filter": [
                    "all",
                    [
                        "==",
                        "$type",
                        "Polygon"
                    ],
                    [
                        "!=",
                        "brunnel",
                        "tunnel"
                    ]
                ],
                "layout": {
                    "visibility": "visible"
                },
                "paint": {
                    "fill-antialias": true,
                    "fill-color": "hsl(198, 100%, 28%)"
                }
            },
            {
                "id": "water_name",
                "type": "symbol",
                "source": "waterway-planet_eoc", // 'planet_eoc',
                "source-layer": "water_name",
                "filter": [
                    "==",
                    "$type",
                    "LineString"
                ],
                "layout": {
                    "symbol-placement": "line",
                    "symbol-spacing": 500,
                    "text-field": "{name:latin}\n{name:nonlatin}",
                    "text-font": [
                        "Metropolis Medium Italic",
                        // "Noto Sans Italic"
                    ],
                    "text-rotation-alignment": "map",
                    "text-size": 12
                },
                "paint": {
                    "text-color": "rgb(157,169,177)",
                    "text-halo-blur": 1,
                    "text-halo-color": "rgb(242,243,240)",
                    "text-halo-width": 1
                }
            }
            ]
        }
    });


    ukisWms = new WmsLayer({
        name: 'Sentinel-2 Europe',
        id: 'sentinel2Europe',
        visible: false,
        type: 'wms',
        removable: false,
        params: {
            LAYERS: 'rgb',
            FORMAT: 'image/png',
            TRANSPARENT: true
        },
        url: 'https://sgx.geodatenzentrum.de/wms_sen2europe',
        attribution: '&copy, <a href="https://gdz.bkg.bund.de/index.php/default/open-data/wms-europamosaik-aus-sentinel-2-daten-wms-sen2europe.html" target="_blank">Europäische Union - BKG</a>',
        continuousWorld: false,
        legendImg: 'https://sgx.geodatenzentrum.de/wms_sen2europe?service=WMS&version=1.3.0&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=rg',
        opacity: 1,
        tileSize: 256
    });

    ukisWmts = new WmtsLayer({
        name: 'EOC Litemap Tile',
        displayName: 'EOC Litemap Tile',
        id: 'eoc_litemap_tile',
        visible: false,
        type: 'wmts',
        removable: false,
        params: {
            layer: 'eoc:litemap',
            format: 'image/png',
            style: '_empty',
            matrixSetOptions: {
                matrixSet: 'EPSG:3857',
                tileMatrixPrefix: 'EPSG:3857'
            }
        },
        url: 'https://tiles.geoservice.dlr.de/service/wmts',
        attribution: '&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',
        continuousWorld: false,
        legendImg: 'https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Alitemap&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11',
        description: 'EOC Litemap as web map tile service',
        opacity: 1
    });

    ukisGeoJson = new VectorLayer({
        id: 'geojson_test',
        name: 'GeoJSON Vector Layer',
        attribution: `© DLR GeoJSON`,
        type: 'geojson',
        data: testFeatureCollection,
        visible: false
    });
}

describe('MaplibreLayerHelpers', () => {
    beforeEach(async () => {
        createLayers();
    });

    it('should create ukis Metadata for LayerSourceSpecification', () => {
        const layer = new Layer({
            id: 'testlayer',
            name: 'Test Layer',
            type: 'custom',
            filtertype: 'Layers',
        });

        const metadata = addUkisLayerMetadata(layer);
        expect(metadata[UKIS_METADATA.filtertype]).toBe(layer.filtertype);
        expect(metadata[UKIS_METADATA.layerID]).toBe(layer.id);
    });

    it('should create a base LayerSourceSpecification from ukis Rasterlayer', () => {
        const ls = createBaseLayer<RasterSourceSpecification>(ukisOsm);

        const source = ls.source;
        expect(source.type).toBe('raster');
        if (source.type === 'raster') {
            expect(source.attribution).toBe(ukisOsm.attribution);
            expect(source.tileSize).toBe(ukisOsm.tileSize || 256);
        }

        const layer = ls.layer;
        expect(layer.id).toBe(ukisOsm.id);
        expect(layer.type).toBe('raster');
        if (layer.type === 'raster') {
            expect(layer.source).toBe(ukisOsm.id);
            // Type instantiation is excessively deep and possibly infinite
            expect((layer.paint as any)['raster-opacity']).toBe(ukisOsm.opacity);
            expect((layer.layout as any).visibility).toBe((ukisOsm.visible) ? 'visible' : 'none');
            expect(layer.metadata).toEqual(addUkisLayerMetadata(ukisOsm));
            expect(layer.minzoom).toBe(ukisOsm.minZoom);
            expect(layer.maxzoom).toBe(ukisOsm.maxZoom);
        }
    });

    it('should create LayerSourceSpecification from ukis WmsLayer', () => {
        const ls = createWmsLayer(ukisWms);
        const source = ls.sources[ukisWms.id];

        if (source.type === 'raster') {
            expect(source.tiles).toEqual([createGetMapUrl(ukisWms)]);
        }
    });

    it('should create LayerSourceSpecification from ukis WmtsLayer', () => {
        const ls = createWmtsLayer(ukisWmts);
        const source = ls.sources[ukisWmts.id];

        if (source.type === 'raster') {
            expect(source.tiles).toEqual([createGetTileUrl(ukisWmts)]);
        }
    });

    it('should create LayerSourceSpecification from ukis ukisGeoJson', () => {
        const ls = createGeojsonLayer(ukisGeoJson);
        const source = ls.sources[ukisGeoJson.id];

        if (source.type === 'geojson') {
            expect(source.data).toBe(ukisGeoJson.data);
        }
    });

    it('should create LayerSpecification from ukis ukisGeoJson', () => {
        // There is only one layer for each geometry type of the geo features. If Polygon are in the feature also a layer for lins is created
        const ls = createGeojsonLayer(ukisGeoJson);

        const geomTypes = ukisGeoJson.data.features.map(i => i.geometry.type);
        const uniqueGeomTypes = geomTypes.filter((t, i) => geomTypes.findIndex(t2 => t2 === t) === i);

        const geoJsonLayers = ls.layers.map(l => l.id);
        // This is not true if there is only one polygon in the features, then there is one more layer.
        expect(uniqueGeomTypes.length).toEqual(geoJsonLayers.length);
    });
    //  TODO:createLayersFromGeojsonTypes

    //  TODO:creteDefaultGeojsonLayers

    //  TODO:createXyzLayer

    //  TODO:createTmsLayer

    //  TODO:createWfsLayer

    //  TODO:createKmlLayer

    it('should create LayerSourceSpecification from ukis custom layer', () => {
        const styleSpec = createCustomLayer(ukisCustom);

        const sources = styleSpec.sources;
        Object.keys(sources).forEach(key => {
            const s: any = sources[key];
            expect(s.attribution).toBe(ukisCustom.attribution);
        });


        const layers = styleSpec.layers;
        layers.forEach(ls => {
            const metadata = addUkisLayerMetadata(ukisCustom);
            expect(ls.metadata[UKIS_METADATA.filtertype]).toBe(metadata[UKIS_METADATA.filtertype]);
            expect(ls.metadata[UKIS_METADATA.layerID]).toBe(metadata[UKIS_METADATA.layerID]);
            // id is created by `styleLayer.id:ukisLayer.id`
            const partID = ls.id.split(':');
            const partIDUkisLayer = partID[1];
            const partIDStyleLayer = partID[0]
            expect(partIDUkisLayer).toBe(ukisCustom.id);
            // object should not modify the old object whil creating layer.
            const layerIndexOriginalObjet = ukisCustom.custom_layer.layers.findIndex(item => item.id === partIDStyleLayer);
            const layerFromOriginalObjet = ukisCustom.custom_layer.layers[layerIndexOriginalObjet];
            expect(ls.id).not.toBe(layerFromOriginalObjet.id);

            expect(ls.layout.visibility).toBe((ukisCustom.visible) ? 'visible' : 'none');


            const opacityPaintProperty = getOpacityPaintProperty(ls.type);
            if (opacityPaintProperty) {
                expect((ls.paint as any)[opacityPaintProperty]).toBe(ukisCustom.opacity);
            }
        });

    });

    it('should create LayerSourceSpecification from ukis custom layer but ignore some visibility', () => {
        // set ignore-visibility
        const customLayer_1 = ukisCustom.custom_layer.layers[1];
        customLayer_1.metadata = {
            [UKIS_METADATA.ignoreVisibility]: true,
            [UKIS_METADATA.ignoreOpacity]: true
        };
        const styleSpec = createCustomLayer(ukisCustom);

        const layer_1 = styleSpec.layers[1];
        expect(layer_1.metadata[UKIS_METADATA.ignoreVisibility]).toBe(true);
        expect(layer_1.layout.visibility).toBe(customLayer_1.layout.visibility);

        const opacityPaintProperty = getOpacityPaintProperty(layer_1.type);
        if (opacityPaintProperty) {
            expect(layer_1.paint[opacityPaintProperty]).toBe(customLayer_1.paint[opacityPaintProperty]);
        }

        // remove ignore-visibility
        delete customLayer_1.metadata[UKIS_METADATA.ignoreVisibility];
        delete customLayer_1.metadata[UKIS_METADATA.ignoreOpacity];
    });


    //  TODO:createStackedLayer
});

describe('MaplibreLayerHelpers - use mapservice', () => {
    let service: MapMaplibreService;
    let map: glMap;

    beforeEach(async () => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MapMaplibreService);
        createLayers();

        const baseStyle: StyleSpecification = {
            "version": 8,
            "name": "Merged Style Specifications",
            "metadata": {
            },
            "sources": {},
            "sprite": "https://openmaptiles.github.io/positron-gl-style/sprite",
            "glyphs": "http://fonts.openmaptiles.org/{fontstack}/{range}.pbf",
            "layers": []
        };

        const mapTarget = createMapTarget([1024, 768]);
        map = new glMap({
            container: mapTarget.container,
            style: baseStyle as StyleSpecification
        });

        // https://github.com/maplibre/maplibre-gl-js/discussions/2193
        await new Promise((resolve, reject) => {
            map.once('idle', (evt) => {
                resolve(evt);
            });
        });
    });

    it('should update as StyleLayer', () => {
        const filtertype = 'Layers';
        const waterId = 'water';
        const waterIdStyledObj = `${waterId}:${ukisCustom.id}`;
        service.setUkisLayers([ukisCustom], filtertype, map);
        const layerBeforUpdate = service.getLayersForId(ukisCustom.id, filtertype, map).styleLayers
        const waterLayerBefor = layerBeforUpdate.find(l => l.id === waterIdStyledObj);

        ukisCustom.visible = true;
        const paintProp = 'fill-color'
        const newColor = 'hsl(200, 100%, 30%)';
        // TODO: service.setUkisLayers changes the id on the original object????
        const waterLayer = ukisCustom.custom_layer.layers.find(l => l.id === waterId);
        waterLayer.paint[paintProp] = newColor;
        updateStyleLayerProperties(map, waterLayerBefor as TypedStyleLayer, ukisCustom)

        const layerAfterUpdate = service.getLayersForId(ukisCustom.id, filtertype, map).styleLayers;
        const waterLayerAfter = layerAfterUpdate.find(l => l.id === waterIdStyledObj);

        expect(waterLayerAfter.visibility).toBe("visible");
        expect(waterLayerAfter.getPaintProperty(paintProp)).toBe(newColor);
    });

});