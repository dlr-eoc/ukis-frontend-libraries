import { TestBed } from '@angular/core/testing';

import { MapMaplibreService } from './map-maplibre.service';
import { StyleSpecification, Map as glMap } from 'maplibre-gl';
import { CustomLayer, RasterLayer, VectorLayer, WmsLayer, Layer as ukisLayer } from '@dlr-eoc/services-layers';
import testFeatureCollection from '@dlr-eoc/shared-assets/geojson/testFeatureCollection.json';
import { createGeojsonLayer, createCustomLayer } from './maplibre-layers.helpers';

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
          "tiles": "abcd".split('').map(s => `s=>https://${s}.tiles.geoservice.dlr.de/service/tms/1.0.0/planet_eoc@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf?flipy=true`)
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

describe('MapMaplibreService', () => {
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should reset/add ukisLayers from a Type', () => {
    const layers = [ukisCustom, ukisOsm, ukisGeoJson, ukisWms];
    const filtertype = 'Layers';
    service.setUkisLayers(layers, 'Layers', map);
    const mapStyle = map.getStyle();
    expect(mapStyle.metadata[`ukis:${filtertype}IDs`]).toEqual(layers.map(b => b.id));
  });

  it('should get all layers from a Type', () => {
    const layers = [ukisCustom, ukisOsm, ukisGeoJson, ukisWms];
    const filtertype = 'Layers';
    service.setUkisLayers(layers, 'Layers', map);

    const addedLayers = service.getLayers(filtertype, map);
    // ukisCustom layers.length and geojson layers for each type
    const customLayers = createCustomLayer(ukisCustom).layers.map(l => l.id);
    // There is only one layer for each geometry type of the geo features. If Polygon are in the feature also a layer for lins is created
    const geoJsonLayers = createGeojsonLayer(ukisGeoJson).layers.map(l => l.id);
    expect(addedLayers.styleLayers.map(l => l.id)).toEqual([...customLayers, ukisOsm.id, ...geoJsonLayers, ukisWms.id]);
    expect(addedLayers.styleLayers.length).toEqual((layers.length - 2) + customLayers.length + geoJsonLayers.length);
  });

  it('should get all layers for one ukis layer id', () => {
    const layers = [ukisCustom, ukisOsm, ukisGeoJson, ukisWms];
    const filtertype = 'Layers';
    service.setUkisLayers(layers, 'Layers', map);

    const addedLayers = service.getLayersForId(ukisCustom.id, filtertype, map);
    expect(addedLayers.styleLayers.length).toEqual(ukisCustom.custom_layer.layers.length);
  });


  it('should update a TypedStyleLayer with updateMlLayer', () => {
    const layers = [ukisGeoJson];
    const filtertype = 'Layers';
    service.setUkisLayers(layers, filtertype, map);

    const layerBeforUpdate = service.getLayersForId(ukisGeoJson.id, filtertype, map).styleLayers;

    ukisGeoJson.visible = true;
    layerBeforUpdate.forEach(l => {
      service.updateMlLayer(l as any, ukisGeoJson, map);
    });

    const layerAfterUpdate = service.getLayersForId(ukisGeoJson.id, filtertype, map).styleLayers;
    layerAfterUpdate.forEach(l => {
      expect(l.visibility).toBe("visible");
    });
  });

  it('should update one ukisLayer from a Type - not reset', () => {
    const layers = [ukisGeoJson];
    const filtertype = 'Layers';
    service.setUkisLayers(layers, filtertype, map);

    const layerBeforUpdate = service.getLayersForId(ukisGeoJson.id, filtertype, map).styleLayers;
    layerBeforUpdate.forEach(l => {
      expect(l.visibility).toBe("none");
    });

    ukisGeoJson.visible = true;
    service.setUkisLayers(layers, 'Layers', map);
    const layerAfterUpdate = service.getLayersForId(ukisGeoJson.id, filtertype, map).styleLayers;
    layerAfterUpdate.forEach(l => {
      expect(l.visibility).toBe("visible");
    });
  });


  it('should add layers and sources from LayerSourceSpecification | StyleSpecification if they are not already on the map', () => {
    const style: StyleSpecification = ukisCustom.custom_layer;
    service.setLayers([style], map);

    const mapStyle = map.getStyle();
    expect(mapStyle.layers.length).toEqual(style.layers.length);
    expect(Object.keys(mapStyle.sources).length).toEqual(Object.keys(style.sources).length);
  });


  it('should only allow supported layers to be added', () => {
    const newLayer = new ukisLayer({
      name: 'test layer',
      id: 'test',
      type: 'test'
    });

    // supported layers
    // [XyzLayertype, WmsLayertype, WmtsLayertype, TmsLayertype, GeojsonLayertype, CustomLayertype, WfsLayertype, KmlLayertype, StackedLayertype];
    expect(service.layerIsSupported(newLayer)).toBe(false);
  });
});
