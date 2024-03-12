import { getOpacity, setOpacity, setVisibility, getAllLayers, getUkisLayerIDs, getLayersAndSources, removeLayerAndSource, changeOrderOfLayers, LayerSourceSpecification, setRotation, setPitch, getRotation } from './maplibre.helpers';
import { StyleSpecification, LayerSpecification, SourceSpecification, Map as glMap } from 'maplibre-gl';
import { CustomLayer } from '@dlr-eoc/services-layers';
import { addUkisLayerMetadata } from './maplibre-layers.helpers';

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

let ukisWaterLayer: CustomLayer<LayerSourceSpecification>;
let ukisLandLayer: CustomLayer<LayerSourceSpecification>;
let ukisPlaceLayer: CustomLayer<LayerSourceSpecification>;

let planet_eoc: SourceSpecification;
let waterLayer: LayerSpecification;
let waterwayLayer: LayerSpecification;
let waterSymbolLayer: LayerSpecification;

let landcoverLayer: LayerSpecification;
let landuseLayer: LayerSpecification;

let placeVillage: LayerSpecification;
let placeTown: LayerSpecification;
let placeCity: LayerSpecification;

const ukisWaterID = 'water-group';
const ukisLandID = 'land-group';
const ukisPlaceID = 'place-group';

const createLayers = () => {
    planet_eoc = {
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
    };

    waterLayer = {
        "id": "water",
        "type": "fill",
        "source": "planet_eoc",
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
            "fill-color": "hsl(198, 100%, 28%)",
            "fill-opacity": 1
        }
    };

    waterwayLayer = {
        "id": "waterway",
        "type": "line",
        "source": 'planet_eoc',
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
    }

    waterSymbolLayer = {
        "id": "water_name",
        "type": "symbol",
        "source": 'planet_eoc',
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

    landcoverLayer = {
        "id": "landcover_wood",
        "type": "fill",
        "source": 'planet_eoc',
        "source-layer": "landcover",
        "minzoom": 10,
        "filter": [
            "all",
            ["==", "$type", "Polygon"],
            ["==", "class", "wood"]
        ],
        "layout": { "visibility": "visible" },
        "paint": {
            "fill-color": "rgba(106, 97, 68, 1)",
            "fill-opacity": 1
        }
    }

    landuseLayer = {
        "id": "landuse_residential",
        "type": "fill",
        "source": 'planet_eoc',
        "source-layer": "landuse",
        "maxzoom": 16,
        "filter": [
            "all",
            ["==", "$type", "Polygon"],
            ["==", "class", "residential"]
        ],
        "layout": { "visibility": "visible" },
        "paint": {
            "fill-color": "rgba(135, 135, 49, 1)",
            "fill-opacity": 0.9
        }
    }

    placeVillage = {
        "id": "place_village",
        "type": "symbol",
        "source": "planet_eoc",
        "source-layer": "place",
        "minzoom": 11,
        "maxzoom": 24,
        "filter": [
            "all",
            [
                "==",
                "$type",
                "Point"
            ],
            [
                "==",
                "class",
                "village"
            ]
        ],
        "layout": {
            "icon-size": 0.4,
            "text-anchor": "left",
            "text-field": "{name:latin}\n{name:nonlatin}",
            "text-font": [
                "Metropolis Regular",
                "Noto Sans Regular"
            ],
            "text-justify": "left",
            "text-offset": [
                0.5,
                0.2
            ],
            "text-size": 10,
            "text-transform": "uppercase",
            "visibility": "visible"
        },
        "paint": {
            "icon-opacity": 0.7,
            "text-color": "rgb(117, 129, 145)",
            "text-halo-blur": 1,
            "text-halo-color": "rgb(242,243,240)",
            "text-halo-width": 1
        }
    };
    placeTown = {
        "id": "place_town",
        "type": "symbol",
        "source": "planet_eoc",
        "source-layer": "place",
        "minzoom": 9,
        "maxzoom": 15,
        "filter": [
            "all",
            [
                "==",
                "$type",
                "Point"
            ],
            [
                "==",
                "class",
                "town"
            ]
        ],
        "layout": {
            "icon-image": "circle-11",
            "icon-size": 0.4,
            "text-anchor": "center",
            "text-field": "{name:latin}\n{name:nonlatin}",
            "text-font": [
                "Metropolis Regular",
                "Noto Sans Regular"
            ],
            "text-justify": "left",
            "text-offset": [
                0.5,
                0.2
            ],
            "text-size": 10,
            "text-transform": "uppercase",
            "visibility": "visible"
        },
        "paint": {
            "icon-opacity": 0.7,
            "text-color": "rgb(117, 129, 145)",
            "text-halo-blur": 1,
            "text-halo-color": "rgb(242,243,240)",
            "text-halo-width": 1
        }
    };
    placeCity = {
        "id": "place_city",
        "type": "symbol",
        "source": "planet_eoc",
        "source-layer": "place",
        "minzoom": 7,
        "maxzoom": 14,
        "filter": [
            "all",
            [
                "==",
                "$type",
                "Point"
            ],
            [
                "all",
                [
                    "!=",
                    "capital",
                    2
                ],
                [
                    "==",
                    "class",
                    "city"
                ],
                [
                    ">",
                    "rank",
                    3
                ]
            ]
        ],
        "layout": {
            "icon-image": "circle-11",
            "icon-size": 0.4,
            "text-anchor": "center",
            "text-field": "{name:latin}\n{name:nonlatin}",
            "text-font": [
                "Metropolis Regular",
                "Noto Sans Regular"
            ],
            "text-justify": "left",
            "text-offset": [
                0.5,
                0.2
            ],
            "text-size": 10,
            "text-transform": "uppercase",
            "visibility": "visible"
        },
        "paint": {
            "icon-opacity": 0.7,
            "text-color": "rgb(117, 129, 145)",
            "text-halo-blur": 1,
            "text-halo-color": "rgb(242,243,240)",
            "text-halo-width": 1
        }
    };

    ukisWaterLayer = new CustomLayer({
        id: ukisWaterID,
        name: ukisWaterID,
        filtertype: 'Layers',
        visible: true,
        custom_layer: {
            version: 8,
            // Use a different source for layers, to improve render quality
            sources: {
                planet_eoc: planet_eoc
            },
            layers: [waterLayer, waterwayLayer, waterSymbolLayer]
        }
    });
    ukisWaterLayer.custom_layer.layers.forEach(l => {
        l.metadata = addUkisLayerMetadata(ukisWaterLayer);
    });

    ukisLandLayer = new CustomLayer({
        id: ukisLandID,
        name: ukisLandID,
        filtertype: 'Layers',
        visible: true,
        custom_layer: {
            version: 8,
            // Use a different source for layers, to improve render quality
            sources: {
                planet_eoc: planet_eoc
            },
            layers: [landcoverLayer, landuseLayer]
        }
    });
    ukisLandLayer.custom_layer.layers.forEach(l => {
        l.metadata = addUkisLayerMetadata(ukisLandLayer);
    })

    ukisPlaceLayer = new CustomLayer({
        id: ukisPlaceID,
        name: ukisPlaceID,
        filtertype: 'Overlays',
        visible: true,
        custom_layer: {
            version: 8,
            // Use a different source for layers, to improve render quality
            sources: {
                planet_eoc: planet_eoc
            },
            layers: [placeVillage, placeTown, placeCity]
        }
    });
    ukisPlaceLayer.custom_layer.layers.forEach(l => {
        l.metadata = addUkisLayerMetadata(ukisPlaceLayer);
    });


}


describe('MaplibreHelpers', () => {
    let map: glMap;

    beforeEach(async () => {
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

    it('should set Layout Property visibility of a layer', () => {
        map.addSource('planet_eoc', planet_eoc);
        map.addLayer(waterLayer);

        const mapLayer = map.getLayer(waterLayer.id);
        expect(mapLayer.visibility).toBe('visible');
        setVisibility(map, waterLayer.id, false);

        const newMapLayer = map.getLayer(waterLayer.id);
        expect(newMapLayer.visibility).toBe('none');
    });


    it('should set/get Paint Property opacity of a layer', () => {
        map.addSource('planet_eoc', planet_eoc);
        map.addLayer(waterLayer);

        const opacity = 0.6;
        expect(getOpacity(map, waterLayer.id)).toBe(1);
        setOpacity(map, waterLayer.id, opacity);

        expect(getOpacity(map, waterLayer.id)).toBe(opacity);
    });

    it('should get all Layers from the style with a filtertype', () => {
        map.addSource('planet_eoc', planet_eoc);
        const layers = [...ukisWaterLayer.custom_layer.layers, ...ukisLandLayer.custom_layer.layers];
        layers.forEach(l => {
            map.addLayer(l);
        });

        ukisPlaceLayer.custom_layer.layers.forEach(l => {
            map.addLayer(l);
        });

        const maplayers = getAllLayers(map, 'Layers');
        expect(maplayers.length).toBe(layers.length);
        expect(maplayers.map(l => l.id)).toEqual(layers.map(l => l.id));
    });


    it('should get all LayerGroups from the style', () => {
        map.addSource('planet_eoc', planet_eoc);
        const layers = [...ukisWaterLayer.custom_layer.layers, ...ukisLandLayer.custom_layer.layers];
        layers.forEach(l => {
            map.addLayer(l);
        });

        ukisPlaceLayer.custom_layer.layers.forEach(l => {
            map.addLayer(l);
        });

        const layerGroups = getUkisLayerIDs(map);
        expect(layerGroups.length).toBe(3);
        expect(layerGroups[0]).toBe(ukisWaterID);
        expect(layerGroups[1]).toBe(ukisLandID);
        expect(layerGroups[2]).toBe(ukisPlaceID);
    });


    it('should get layers and sources for ukis:layerID', () => {
        map.addSource('planet_eoc', planet_eoc);
        const layers = [...ukisWaterLayer.custom_layer.layers, ...ukisLandLayer.custom_layer.layers];
        layers.forEach(l => {
            map.addLayer(l);
        });

        ukisPlaceLayer.custom_layer.layers.forEach(l => {
            map.addLayer(l);
        });

        const layerSources = getLayersAndSources(map, ukisWaterID);
        expect(layerSources.layers).toEqual(ukisWaterLayer.custom_layer.layers);
        expect(layerSources.sources['planet_eoc']).toEqual(planet_eoc);
    });

    it('should remove a layer and source for ukis:layerID', () => {
        map.addSource('planet_eoc', planet_eoc);
        map.addLayer({
            "id": "background",
            "type": "background",
            "paint": {
                "background-color": "rgb(242,243,240)"
            }
        });

        const layers = [...ukisWaterLayer.custom_layer.layers, ...ukisLandLayer.custom_layer.layers];
        layers.forEach(l => {
            map.addLayer(l);
        });

        ukisPlaceLayer.custom_layer.layers.forEach(l => {
            map.addLayer(l);
        });

        // only remove source if not used by other layer !!!
        removeLayerAndSource(map, ukisWaterID);
        const maplayers = getAllLayers(map);
        expect(maplayers.length).toBe(1 + ukisLandLayer.custom_layer.layers.length + ukisPlaceLayer.custom_layer.layers.length);
        expect(map.getSource('planet_eoc')).toBeDefined();
    });

    it('should change order of map layers', () => {
        map.addSource('planet_eoc', planet_eoc);
        const layers = [...ukisWaterLayer.custom_layer.layers, ...ukisLandLayer.custom_layer.layers];
        layers.forEach(l => {
            map.addLayer(l);
        });

        const ukisMapLayers = getUkisLayerIDs(map, 'Layers');

        const changeLayers = [ukisLandLayer, ukisWaterLayer];
        const allChangeLayers = changeLayers.map(l => l.custom_layer.layers).flat(1).map(l => l.id);

        changeOrderOfLayers(map, changeLayers, ukisMapLayers, 'Layers');
        const newMapLayers = getAllLayers(map, 'Layers').map(l => l.id);
        expect(newMapLayers).toEqual(allChangeLayers);
    });

    it('should set/get rotation and view angle', () => {
      const rotation = 45;
      const viewAngle = 45;
      setRotation(map,rotation);
      setPitch(map, viewAngle);
      expect(getRotation(map)).toBe(rotation);
      expect(map.getPitch()).toBe(viewAngle);
    });

});
