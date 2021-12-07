import { TestBed } from '@angular/core/testing';
import { IPopupArgs, MapOlService } from './map-ol.service';
import { RasterLayer, VectorLayer, CustomLayer, WmtsLayer, LayerGroup, WmsLayer, popup, Layer, StackedLayer } from '@dlr-eoc/services-layers';

import olMap from 'ol/Map';
import olView from 'ol/View';

import olTileLayer from 'ol/layer/Tile';
import olXYZ from 'ol/source/XYZ';
import olOSM from 'ol/source/OSM';

import olVectorLayer from 'ol/layer/Vector';
import olVectorImageLayer from 'ol/layer/VectorImage';
import olVectorSource from 'ol/source/Vector';
import olTileSource from 'ol/source/Tile';
import olImageSource from 'ol/source/Image';
import olGeometry from 'ol/geom/Geometry';
import olVectorTileLayer from 'ol/layer/VectorTile';
import olVectorTileSource from 'ol/source/VectorTile';
import olMVT from 'ol/format/MVT';
import olGeoJSON from 'ol/format/GeoJSON';
import olImageLayer from 'ol/layer/Image';
import olImageStaticSource from 'ol/source/ImageStatic';
import olLayerGroup from 'ol/layer/Group';

import { getUid } from 'ol/util';

import { platformModifierKeyOnly } from 'ol/events/condition';
import olWMTSTileGrid from 'ol/tilegrid/WMTS';
import olTileGrid from 'ol/tilegrid/TileGrid';
import { DEFAULT_MAX_ZOOM, DEFAULT_TILE_SIZE } from 'ol/tilegrid/common';

import testFeatureCollection from '../assets/testFeatureCollection.json';
import olOverlay from 'ol/Overlay';
import { getUid as olGetUid } from 'ol/util';
import { get as getProjection, transform, transformExtent } from 'ol/proj';
import { Options as olProjectionOptions } from 'ol/proj/Projection';
import olPoint from 'ol/geom/Point';
import { Subject } from 'rxjs';
import { ApplicationRef, Component, Input } from '@angular/core';
import { getCenter as olGetCenter } from 'ol/extent';
import olMapBrowserEvent from 'ol/MapBrowserEvent';


const WebMercator = 'EPSG:3857';
const WGS84 = 'EPSG:4326';

let mapTarget: { size: number[], container: HTMLDivElement };

/** ol/layer/Tile - ID-raster */
let rasterLayer: olTileLayer<olTileSource>;

/** ol/layer/Vector -ID-vector */
let vectorLayer: olVectorLayer<olVectorSource<olGeometry>>;

/** ol/layer/Image - ID-image */
let imageLayer: olImageLayer<olImageSource>;

/** ol/layer/VectorImage - ID-vector-image */
let vectorImageLayer: olVectorImageLayer<olVectorSource<olGeometry>>, vectorImageData;

/** ol/layer/VectorImage - ID-vector-tile */
let vectorTileLayer: olVectorTileLayer;

/** ID-ukis-raster */
let ukisRasterLayer: RasterLayer;

/** ID-ukis-wms */
let ukisWmsLayer: WmsLayer;

/** ID-ukis-wmts */
let ukisWmtsLayer: WmtsLayer;

/** ID-ukis-vector */
let ukisVectorLayerJson: VectorLayer;

/** ID-ukis-vector-wfs */
let ukisVectorLayerWfs: VectorLayer;

/** ID-ukis-vector-image */
let ukisCustomLayerVector: CustomLayer;

/** ID-ukis-raster-image */
let ukisCustomLayerRaster: CustomLayer;

/** ID-ukis-group-layer */
let ukisGroupLayer: LayerGroup;

/** ID-ukis-merge-layer */
let ukisMergeLayer: StackedLayer;

/** ID-group-layer1 */
let groupLayer1: olLayerGroup;
/** ID-group-layer2 */
let groupLayer2: olLayerGroup;
/** ID-group-layer3 */
let groupLayer3: olLayerGroup;

const createMapTarget = (size: number[]) => {
  const container = document.createElement('div');
  container.style.border = 'solid 1px #000';
  container.id = 'map';
  container.style.width = `${size[0]}px`;
  container.style.height = `${size[1]}px`;
  document.body.appendChild(container);
  return {
    size,
    container
  };
};

@Component({
  selector: 'app-mock-popup',
  template: `<div>{{ data | json }}</div>`
})
class MockPopupComponent {
  @Input() data: any;
  constructor() { }
}

const beforeEachCreateMapFn = () => {
  mapTarget = createMapTarget([1024, 768]);
};

const beforeEachFn = () => {
  TestBed.configureTestingModule({
    declarations: [MockPopupComponent]
  });

  beforeEachCreateMapFn();

  rasterLayer = new olTileLayer({
    source: new olXYZ({
      url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attributions: ['&copy, <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors'],
      wrapX: false
    })
  });
  rasterLayer.set('id', 'ID-raster');
  rasterLayer.set('name', 'OpenStreetMap');

  vectorLayer = new olVectorLayer({
    source: new olVectorSource({
      features: (new olGeoJSON({
        dataProjection: WGS84,
        featureProjection: WebMercator
      })).readFeatures(testFeatureCollection)
    })
  });
  vectorLayer.set('id', 'ID-vector');
  vectorLayer.set('name', 'GeoJSON Vector Layer');

  const imageExtent = [
    -105.41888884797893,
    6.480590573390401,
    -15.540298246016693,
    42.53496284727569
  ];
  imageLayer = new olImageLayer({
    source: new olImageStaticSource({
      attributions: '© OpenStreetMap contributors',
      url: 'base/src/assets/osmTestImg.jpg',
      imageExtent: imageExtent,
      projection: 'EPSG:4326'
    }),
    extent: transformExtent(imageExtent, WGS84, WebMercator)
  });
  imageLayer.set('id', 'ID-image');


  vectorImageData = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [
            4.74609375,
            44.32384807250689
          ]
        }
      }
    ]
  };
  vectorImageLayer = new olVectorImageLayer({
    imageRatio: 2,
    source: new olVectorSource({
      features: (new olGeoJSON({
        dataProjection: WGS84,
        featureProjection: WebMercator
      })).readFeatures(vectorImageData)
    })
  });
  vectorImageLayer.set('id', 'ID-vector-image');

  vectorTileLayer = new olVectorTileLayer({
    source: new olVectorTileSource({
      maxZoom: 15,
      format: new olMVT({
        idProperty: 'iso_a3',
      }),
      url:
        'https://ahocevar.com/geoserver/gwc/service/tms/1.0.0/' +
        'ne:ne_10m_admin_0_countries@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf',
    })
  });
  vectorTileLayer.set('id', 'ID-vector-tile');

  groupLayer1 = new olLayerGroup({
    layers: [rasterLayer]
  });
  groupLayer1.set('id', 'ID-group-layer1');

  groupLayer2 = new olLayerGroup({
    layers: [groupLayer1]
  });
  groupLayer2.set('id', 'ID-group-layer2');

  groupLayer3 = new olLayerGroup({
    layers: [vectorLayer, vectorImageLayer]
  });
  groupLayer3.set('id', 'ID-group-layer3');

  /** UKIS Layers ----------------------- */
  ukisCustomLayerVector = new CustomLayer({
    id: 'ID-ukis-custom',
    name: 'Custom Layer KML',
    type: 'custom',
    custom_layer: vectorImageLayer,
    visible: false,
    popup: {
      single: true
    },
  });

  ukisCustomLayerRaster = new CustomLayer({
    id: 'ID-ukis-raster-image',
    name: 'OSM Clip',
    visible: true,
    custom_layer: new olTileLayer({
      source: new olOSM()
    }),
    bbox: [
      -105.41888884797893,
      6.480590573390401,
      -15.540298246016693,
      42.53496284727569
    ]
  });

  ukisRasterLayer = new RasterLayer({
    id: 'ID-ukis-raster',
    name: 'OpenStreetMap',
    displayName: 'OpenStreetMap',
    visible: false,
    type: 'xyz',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    subdomains: ['a', 'b', 'c'],
    attribution: '&copy, <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors',
    continuousWorld: true,
    popup: {
      event: 'move',
      options: { autoPan: false }
    },
  });


  ukisWmsLayer = new WmsLayer({
    type: 'wms',
    id: 'ID-ukis-wms',
    url: 'https://{s}.geoservice.dlr.de/eoc/imagery/wms?',
    name: 'S2_L3A_WASP_FRC_P1M',
    subdomains: ['a', 'b', 'c', 'd'],
    attribution: '| &copy; <a href="http://www.dlr.de" target="_blank">DLR</a> Contains modified Copernicus Sentinel Data [2020]',
    params: {
      LAYERS: 'S2_L3A_WASP_FRC_P1M',
      VERSION: '1.1.0',
      FORMAT: 'image/png',
    },
    styles: [
      {
        default: true,
        legendURL: 'https://geoservice.dlr.de/eoc/imagery/wms?service=WMS&request=GetLegendGraphic&format=image/png&width=20&height=20&layer=land:S2_L3A_WASP_FRC_P1M',
        name: 's2-ndvi',
        title: 'NDVI'
      },
      {
        default: false,
        legendURL: 'https://geoservice.dlr.de/eoc/imagery/wms?service=WMS&request=GetLegendGraphic&format=image/png&width=20&height=20&layer=land:S2_L3A_WASP_FRC_P1M',
        name: 's2-infrared',
        title: 'Infrared (8,4,3)'
      }
    ],
    popup: true
  });

  ukisWmtsLayer = new WmtsLayer({
    type: 'wmts',
    id: 'ID-ukis-wmts',
    url: 'https://tiles.geoservice.dlr.de/service/wmts?',
    name: 'TDM90_AMP',
    params: {
      layer: 'TDM90_AMP',
      version: '1.1.0',
      format: 'image/png',
      style: 'default',
      matrixSetOptions: {
        matrixSet: WebMercator,
        tileMatrixPrefix: WebMercator,
      }
    },
    tileSize: 512,
    styles: [
      {
        default: true,
        name: 'default',
        title: 'default'
      },
      {
        default: false,
        name: 'none',
        title: 'none'
      }
    ],
    popup: {
      event: 'click',
      popupFunction: (obj) => {
        return `<p>${JSON.stringify(obj)}</p>`;
      }
    }
  });

  ukisVectorLayerJson = new VectorLayer({
    id: 'ID-ukis-vector',
    name: 'GeoJSON Vector Layer',
    type: 'geojson',
    data: testFeatureCollection,
    visible: false
  });


  ukisVectorLayerWfs = new VectorLayer({
    id: 'ID-ukis-vector-wfs',
    name: 'WFS Vector Layer',
    type: 'wfs',
    url: "https://ahocevar.com/geoserver/wfs?service=WFS&request=GetFeature&outputFormat=application/json&version=1.1.0&srsname=EPSG:3857&typenames=usa:states&cql_filter=STATE_NAME='Pennsylvania'",
    bbox: [-83.1005859375, 38.37611542403604, -72.50976562499999, 43.03677585761058],
    visible: false
  });

  ukisGroupLayer = new LayerGroup({
    id: 'ID-ukis-group-layer',
    name: 'ukis group',
    layers: [ukisVectorLayerJson, ukisWmtsLayer, ukisWmsLayer, ukisRasterLayer, ukisCustomLayerVector]
  });

  ukisMergeLayer = new StackedLayer({
    id: 'ID-ukis-merge-layer',
    name: 'ukis merge layer',
    layers: [ukisWmsLayer, ukisWmtsLayer]
  });
};


describe('MapOlService Core', () => {
  beforeEach(beforeEachCreateMapFn);
  it('should be created', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    expect(service).toBeTruthy();
  });

  it('should have a default view and map', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    expect(service.view instanceof olView).toBeTruthy();
    expect(service.map instanceof olMap).toBeTruthy();
  });

  it('should have a default view, map and EPSG', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    expect(service.view instanceof olView).toBeTruthy();
    expect(service.map instanceof olMap).toBeTruthy();
    expect(service.EPSG).toBe(WebMercator);

    expect(service.projectionChange instanceof Subject).toBeTrue();

    expect(service.map.getControls().getLength()).toBe(0);
  });

  it('should create a map', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    expect(service.map.getLayers().getArray().length).toEqual(3);
    expect(service.map.getTargetElement()).toEqual(mapTarget.container);
  });

  it('should set a global hit Tolerance for mouse interaction', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    const value = 2;
    service.setHitTolerance(value);
    expect(service.getHitTolerance()).toEqual(value);
  });


  it('should add a bbox select interaction', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    const dragBox = service.addBboxSelection(platformModifierKeyOnly);
    expect(service.map.getInteractions().getArray().includes(dragBox)).toBeTrue();
  });

});

describe('MapOlService olLayers', () => {
  beforeEach(beforeEachFn);
  it('should have three layer groups on the map where all layers are added', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);

    expect(service.getLayerByKey({ key: 'id', value: 'ID_filtertype_baselayers' }) instanceof olLayerGroup).toBeTrue();
    expect(service.getLayerByKey({ key: 'id', value: 'ID_filtertype_layers' }) instanceof olLayerGroup).toBeTrue();
    expect(service.getLayerByKey({ key: 'id', value: 'ID_filtertype_overlays' }) instanceof olLayerGroup).toBeTrue();
  });

  it('should properly set the `crossOrigin` attribute, if given', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    ukisRasterLayer.crossOrigin = 'anonymous';
    const ukisLayers = [ukisRasterLayer];
    service.setUkisLayers(ukisLayers, 'Layers');

    const olLayerGroups = service.map.getLayers().getArray();
    const olRasterLayer = olLayerGroups[1].getLayersArray()[0];
    expect(olRasterLayer.getSource().crossOrigin).toEqual('anonymous');
  });

  it('should add/get layers to/from the map', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    service.addLayer(imageLayer, 'baselayers');
    service.addLayer(vectorLayer, 'layers');
    service.addLayer(groupLayer1, 'layers');

    expect(service.getLayers('baselayers').length).toEqual(1);
    expect(service.getLayerByKey({ key: 'id', value: imageLayer.get('id') }, 'baselayers')).toBeTruthy();

    // 2 layers - one olLayer and one olLayerGroup with another layer
    expect(service.getLayers('layers').length).toEqual(2);
    expect(service.getLayerByKey({ key: 'id', value: vectorLayer.get('id') }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: groupLayer1.get('id') }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: rasterLayer.get('id') }, 'layers')).toBeTruthy();
  });

  it('should not add a duplicate layer to the map', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    service.addLayer(vectorLayer, 'layers');
    service.addLayer(rasterLayer, 'layers');
    expect(service.getLayers('layers').length).toEqual(2);
    expect(service.getLayerByKey({ key: 'id', value: vectorLayer.get('id') }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: rasterLayer.get('id') }, 'layers')).toBeTruthy();

    service.addLayer(vectorLayer, 'layers');
    expect(service.getLayers('layers').length).toEqual(2);
    expect(service.getLayerByKey({ key: 'id', value: vectorLayer.get('id') }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: rasterLayer.get('id') }, 'layers')).toBeTruthy();

    // duplicate layers are added if the are in a olLayerGroup!!!!
    service.addLayer(groupLayer3, 'layers');
    expect(service.getLayers('layers').length).toEqual(3);
    expect(service.getLayers('layers').includes(vectorLayer)).toBeTrue();
    expect(service.getLayers('layers').includes(rasterLayer)).toBeTrue();
    expect(service.getLayers('layers').includes(groupLayer3)).toBeTrue();

    expect(groupLayer3.getLayersArray().length).toBe(2);
    expect(groupLayer3.getLayersArray()[0]).toBe(vectorLayer);
  });

  it('should add a array of layers to aType', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    service.addLayers([rasterLayer, imageLayer, vectorImageLayer, groupLayer3], 'layers');

    expect(service.getLayers('layers').length).toEqual(4);
    expect(service.getLayerByKey({ key: 'id', value: rasterLayer.get('id') }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: imageLayer.get('id') }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: vectorImageLayer.get('id') }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: vectorLayer.get('id') }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: groupLayer3.get('id') }, 'layers')).toBeTruthy();
  });

  it('should add a array of layers to aType when there are already layers', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    service.addLayer(vectorLayer, 'layers');
    service.addLayer(rasterLayer, 'layers');
    // it should not add the duplicate rasterLayer
    service.addLayers([rasterLayer, imageLayer, vectorImageLayer, groupLayer3], 'layers');

    expect(service.getLayers('layers').length).toEqual(5);
    expect(service.getLayerByKey({ key: 'id', value: vectorLayer.get('id') }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: rasterLayer.get('id') }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: imageLayer.get('id') }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: vectorImageLayer.get('id') }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: groupLayer3.get('id') }, 'layers')).toBeTruthy();
  });

  it('should set (reset) a array of layers to aType', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    service.addLayer(vectorLayer, 'layers');
    service.addLayer(rasterLayer, 'layers');
    service.setLayers([vectorImageLayer, imageLayer, groupLayer1], 'layers');

    expect(service.getLayers('layers').length).toEqual(3);
    expect(service.getLayerByKey({ key: 'id', value: vectorLayer.get('id') }, 'layers')).toBeFalsy();

    expect(service.getLayerByKey({ key: 'id', value: vectorImageLayer.get('id') }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: imageLayer.get('id') }, 'layers')).toBeTruthy();

    expect(service.getLayerByKey({ key: 'id', value: groupLayer1.get('id') }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: rasterLayer.get('id') }, 'layers')).toBeTruthy();
  });

  it('should get layers from a Type', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    service.addLayer(vectorLayer, 'layers');
    expect(service.getLayers('layers')[0]).toBe(vectorLayer);
  });

  it('should get layers by key from the map', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    service.addLayer(vectorLayer, 'layers');

    expect(service.getLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers')).toBe(vectorLayer);

    // add group with a group with a rasterLayer
    service.addLayer(groupLayer2, 'layers');

    expect(service.getLayerByKey({ key: 'id', value: 'ID-raster' }, 'layers')).toBe(rasterLayer);
    expect(service.getLayerByKey({ key: 'id', value: 'ID-group-layer1' }, 'layers')).toBe(groupLayer1);
  });

  it('should remove all layers from a Type', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    service.addLayer(vectorLayer, 'layers');
    service.removeAllLayers('layers');
    expect(service.getLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers')).toBeFalsy();
  });

  it('should remove a layer by key from a Type', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    // groupLayer2 -> groupLayer1 -> rasterLayer
    service.addLayer(groupLayer2, 'layers');
    service.addLayer(vectorLayer, 'layers');
    expect(service.getLayers('layers').length).toEqual(2);

    service.removeLayerByKey({ key: 'id', value: 'ID-raster' }, 'layers');
    expect(service.getLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: 'ID-group-layer2' }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: 'ID-group-layer1' }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: 'ID-raster' }, 'layers')).toBeFalsy();
    expect(service.getLayers('layers').length).toEqual(2);
  });

  it('should update a layer by key from a Type', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    service.addLayer(vectorLayer, 'layers');

    const visible = true, opacity = 0.5, minzoom = 2, maxzoom = 15;
    const extent = [-180.0, -90.0, 180.0, 90.0];
    vectorLayer = new olVectorLayer({
    });
    vectorLayer.set('id', 'ID-vector');
    const newLayer = vectorLayer;

    newLayer.setSource(vectorLayer.getSource());
    newLayer.setExtent(extent);
    newLayer.setVisible(visible);
    newLayer.setOpacity(opacity);
    newLayer.setMinZoom(minzoom);
    newLayer.setMaxZoom(maxzoom);

    service.updateLayerByKey({ key: 'id', value: 'ID-vector' }, newLayer, 'layers');

    const vectorLayerFromService = service.getLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers');
    expect(vectorLayerFromService.getVisible()).toBe(visible);
    expect(vectorLayerFromService.getOpacity()).toBe(opacity);
    expect(vectorLayerFromService.getMinZoom()).toBe(minzoom);
    expect(vectorLayerFromService.getMaxZoom()).toBe(maxzoom);
    expect(vectorLayerFromService.getExtent()).toBe(extent);
  });
});

describe('MapOlService ukisLayers', () => {
  beforeEach(beforeEachFn);
  /** Test if ukis-layers are added to the map ----------------------------------------------------------------------- */
  it('should reset/add ukisLayers from a Type', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    const layers = [ukisVectorLayerJson, ukisRasterLayer, ukisCustomLayerVector];
    layers.map(l => {
      service.setUkisLayer(l, 'Layers');
    });

    layers.map(l => {
      expect(service.getLayerByKey({ key: 'id', value: l.id }, 'layers')).toBeTruthy();
    });
  });

  it('should add ukisLayer Group from a Type', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    service.setUkisLayers(ukisGroupLayer.layers, 'layers');

    ukisGroupLayer.layers.map(l => {
      expect(service.getLayerByKey({ key: 'id', value: l.id }, 'layers')).toBeTruthy();
    });
  });

  it('should add merged/stacked Layer as a olLayerGroup', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    service.setUkisLayer(ukisMergeLayer, 'Layers');

    const getMergeLayer = service.getLayerByKey({ key: 'id', value: ukisMergeLayer.id }, 'layers');
    expect(getMergeLayer).toBeTruthy();
    expect(getMergeLayer instanceof olLayerGroup).toBeTrue();

    const groupLayers = (getMergeLayer as olLayerGroup).getLayersArray();
    groupLayers.forEach((l, i) => {
      expect(l.get('id')).toBe(ukisMergeLayer.layers[i].id);
    })
  });

  it('should reset/add one ukisLayer from a Type', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    const layers = [ukisVectorLayerJson];
    service.setUkisLayers(layers, 'Layers');

    const layerBeforUpdate = service.getLayerByKey({ key: 'id', value: 'ID-ukis-vector' }, 'layers');
    const olUid = getUid(layerBeforUpdate);
    expect(layerBeforUpdate.getVisible()).toBeFalsy();


    ukisVectorLayerJson.visible = true;
    service.setUkisLayer(ukisVectorLayerJson);
    const layerAfterUpdate = service.getLayerByKey({ key: 'id', value: 'ID-ukis-vector' }, 'layers');
    expect(layerAfterUpdate.getVisible()).toBeTruthy();
    expect(getUid(layerAfterUpdate) !== olUid).toBeTruthy();
  });

  it('should update one ukisLayer from a Type - not remove the olLayer', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    const layers = [ukisVectorLayerJson];
    service.setUkisLayers(layers, 'Layers');

    const layerBeforUpdate = service.getLayerByKey({ key: 'id', value: 'ID-ukis-vector' }, 'layers');
    const olUid = getUid(layerBeforUpdate);
    expect(layerBeforUpdate.getVisible()).toBeFalsy();


    ukisVectorLayerJson.visible = true;
    service.updateUkisLayer(ukisVectorLayerJson);
    const layerAfterUpdate = service.getLayerByKey({ key: 'id', value: 'ID-ukis-vector' }, 'layers');
    expect(layerAfterUpdate.getVisible()).toBeTruthy();
    expect(getUid(layerAfterUpdate)).toBe(olUid);
  });


  it('should remove all layers from a type if array has no layers (not for type Baselayers)', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    const layers = [ukisRasterLayer];
    service.setUkisLayers(layers, 'Layers');
    expect(service.getLayers('Layers').length).toBe(1);

    service.setUkisLayers([], 'Layers');
    expect(service.getLayers('Layers').length).toBe(0);
  });

  it('should set crossOrigin and className for UkisLayers with a Popup', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);

    const popupOb: popup = {
      event: 'click'
    }
    ukisCustomLayerRaster.popup = popupOb;
    ukisRasterLayer.popup = popupOb;
    ukisWmsLayer.popup = popupOb;
    ukisWmtsLayer.popup = popupOb;

    /* ukisVectorLayerJson.data = null;
    ukisVectorLayerJson.url = 'https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json'; */
    ukisVectorLayerJson.popup = popupOb;
    ukisVectorLayerWfs.popup = popupOb;
    const layers = [ukisCustomLayerRaster, ukisRasterLayer, ukisWmsLayer, ukisWmtsLayer, ukisVectorLayerJson, ukisVectorLayerWfs];
    service.setUkisLayers(layers, 'Layers')


    const mapLayers = service.getLayers('Layers');
    expect(mapLayers.length).toBe(layers.length);

    const olLayerCustom = mapLayers[0] as olTileLayer<olTileSource>;
    expect(olLayerCustom.get('id')).toBe(ukisCustomLayerRaster.id);
    expect(olLayerCustom instanceof olTileLayer).toBe(true);
    expect(olLayerCustom.getClassName()).toBe(ukisCustomLayerRaster.id);
    const olSourceCustom = olLayerCustom.getSource();
    expect(olSourceCustom instanceof olTileSource).toBe(true);
    expect(olSourceCustom['crossOrigin'] && olSourceCustom['crossOrigin_']).toBe('anonymous');


    const olLayerRaster = mapLayers[1] as olTileLayer<olXYZ>;
    expect(olLayerRaster.getClassName()).toBe(ukisRasterLayer.id);
    const olSourceRaster = olLayerRaster.getSource();
    expect(olSourceRaster['crossOrigin'] && olSourceRaster['crossOrigin_']).toBe('anonymous');

    const olLayerWms = mapLayers[2] as olTileLayer<olTileSource>;
    expect(olLayerWms.getClassName()).toBe(ukisWmsLayer.id);
    const olSourceWms = olLayerWms.getSource();
    expect(olSourceWms['crossOrigin'] && olSourceWms['crossOrigin_']).toBe('anonymous');


    const olLayerWmts = mapLayers[3] as olTileLayer<olTileSource>;
    expect(olLayerWmts.getClassName()).toBe(ukisWmtsLayer.id);
    const olSourceWmts = olLayerWmts.getSource();
    expect(olSourceWmts['crossOrigin'] && olSourceWmts['crossOrigin_']).toBe('anonymous');

    const olLayerJson = mapLayers[4] as olVectorLayer<olVectorSource<olGeometry>>;
    expect(olLayerJson.getClassName()).toBe(ukisVectorLayerJson.id);
    const olSourceJson = olLayerJson.getSource();
    expect(olSourceJson['crossOrigin'] && olSourceJson['crossOrigin_']).toBe(undefined); // this is only set if Layer.url -> olTileJSON()

    const olLayerWfs = mapLayers[5] as olVectorLayer<olVectorSource<olGeometry>>;
    expect(olLayerWfs.getClassName()).toBe(ukisVectorLayerWfs.id);
    const olSourceWfs = olLayerWfs.getSource();
    expect(olSourceWfs['crossOrigin'] && olSourceWfs['crossOrigin_']).toBe(undefined); // WFS does not need crossOrigin??
  })
});

describe('MapOlService TileGrid', () => {
  beforeEach(beforeEachFn);

  it('should create a default Tile Grid', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    const tileSize = [DEFAULT_TILE_SIZE, DEFAULT_TILE_SIZE];
    let tileGrid: olTileGrid = null;
    tileGrid = service.getTileGrid<olTileGrid>('default');
    expect(tileGrid.getTileSize(0)).toEqual(tileSize);
    /** default resolutions for tile size 256 and projection EPSG:3857 */
    expect(tileGrid.getExtent()).toEqual(service.getProjection().getExtent());
    expect(tileGrid.getResolutions().length).toBe(DEFAULT_MAX_ZOOM + 1);
  });

  it('should create a WMTS Tile Grid from resolutions and tile size', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    const tileSize = [ukisWmtsLayer.tileSize, ukisWmtsLayer.tileSize];
    let tileGrid: olWMTSTileGrid = null;
    const resolutions = [
      8789.0625,
      4394.53125,
      2197.265625,
      1098.6328125,
      549.31640625,
      274.658203125,
      137.3291015625,
      68.66455078125,
      34.332275390625,
      17.1661376953125,
      8.58306884765625,
      4.291534423828125,
      2.1457672119140625
    ];

    tileGrid = service.getTileGrid<olWMTSTileGrid>('wmts', null, tileSize[0], null, resolutions);
    expect(tileGrid.getResolutions()).toEqual(resolutions);
    expect(tileGrid.getTileSize(2)).toEqual(tileSize);
  });

  it('should create a WMTS Tile Grid from resolutionLevels', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    let tileGrid: olWMTSTileGrid = null;
    const resolutionLevels = 25;
    tileGrid = service.getTileGrid<olWMTSTileGrid>('wmts', resolutionLevels);
    expect(tileGrid.getResolutions().length).toEqual(resolutionLevels + 1);
  });

  it('should create a WMTS Tile Grid with a tileMatrixPrefix', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    let tileGrid: olWMTSTileGrid = null;
    const zoom = 1;

    if ('tileMatrixPrefix' in ukisWmtsLayer.params.matrixSetOptions) {
      const tileMatrixPrefix = ukisWmtsLayer.params.matrixSetOptions.tileMatrixPrefix;
      tileGrid = service.getTileGrid<olWMTSTileGrid>('wmts', null, null, tileMatrixPrefix);
      expect(tileGrid.getMatrixId(zoom)).toEqual(`${tileMatrixPrefix}:${zoom}`);
    }
  });

  it('should create a WMTS Tile Grid from matrixIds', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    let tileGrid: olWMTSTileGrid = null;
    const matrixIds = [
      'EU:3035:512:0',
      'EU:3035:512:1',
      'EU:3035:512:2',
      'EU:3035:512:3',
      'EU:3035:512:4',
      'EU:3035:512:5',
      'EU:3035:512:6',
      'EU:3035:512:7',
      'EU:3035:512:8',
      'EU:3035:512:9',
      'EU:3035:512:10',
      'EU:3035:512:11',
      'EU:3035:512:12'
    ];
    const zoom = 1;

    tileGrid = service.getTileGrid<olWMTSTileGrid>('wmts', null, null, null, null, matrixIds);
    expect(tileGrid.getMatrixIds()).toEqual(matrixIds);
    expect(tileGrid.getMatrixId(zoom)).toEqual(matrixIds[zoom]);
    // TODO: what exactly should be created here only as much resolutions like matrixIds???
    // expect(tileGrid.getMatrixId(14)).toEqual('');
    // expect(tileGrid.getResolutions().length).toEqual(matrixIds.length + 1);
  });
});

describe('MapOlService popup', () => {
  beforeEach(beforeEachFn);

  it('should add a basic popup to the map for vector Layers', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);

    const feature = vectorLayer.getSource().getFeatures()[0];
    const popupProperties = feature.getProperties();
    const args: IPopupArgs = {
      modelName: vectorLayer.get('id'),
      properties: popupProperties,
      layer: vectorLayer,
      feature,
      event: { type: 'click', coordinate: [1312192.0073726526, 5444712.8273727745] } as any
    };

    service.addPopup(args, popupProperties, null);
    expect(service.getPopups().length).toBe(1);
    const popupOnMap = service.getPopups()[0];
    expect(popupOnMap instanceof olOverlay).toBeTrue();
    /** OVERLAY_TYPE_KEY, OVERLAY_TYPE_VALUE */
    expect(popupOnMap.get('type')).toBe('popup');
    expect(popupOnMap.getId()).toBe(`ID-vector:${olGetUid(feature)}`);
    expect(popupOnMap.get('addEvent')).toBe(args.event.type);
  });

  it('should add multiple popups to the map for vector Layers', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);

    const features = vectorLayer.getSource().getFeatures();

    const addPopups = (feature) => {
      const popupProperties = feature.getProperties();
      const args: IPopupArgs = {
        modelName: vectorLayer.get('id'),
        properties: popupProperties,
        layer: vectorLayer,
        feature,
        event: { type: 'click' } as any
      };

      service.addPopup(args, popupProperties, null);
    };

    features.forEach(f => {
      addPopups(f);
    });

    expect(service.getPopups().length).toBe(features.length);
  });

  it('should remove all popups from the map', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);

    const features = vectorLayer.getSource().getFeatures();

    const addPopups = (feature) => {
      const popupProperties = feature.getProperties();
      const args: IPopupArgs = {
        modelName: vectorLayer.get('id'),
        properties: popupProperties,
        layer: vectorLayer,
        feature,
        event: { type: 'click' } as any
      };

      service.addPopup(args, popupProperties, null);
    };

    features.forEach(f => {
      addPopups(f);
    });

    expect(service.getPopups().length).toBe(features.length);

    service.removeAllPopups((i) => i.get('type') === 'popup');
    expect(service.getPopups().length).toBe(0);
  });

  it('should create html table from a Object', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);

    const testObj = testFeatureCollection.features[0].properties;

    const htmlString = service.createPopupHtml(testObj);
    expect(htmlString.includes(`<td style="vertical-align: top; padding-right: 7px;">`)).toBeTrue();
    Object.keys(testObj).map(k => {
      expect(htmlString.includes(`${k}:`)).toBeTrue();
    });

  });

  it('should not leak any angular-components when creating & removing dynamic-component-popups', () => {

    const service: MapOlService = TestBed.inject(MapOlService);
    const appRef = TestBed.inject(ApplicationRef) as ApplicationRef;
    service.createMap(mapTarget.container);

    expect(service.getPopups().length).toBe(0);
    expect(appRef.viewCount).toEqual(0);

    const feature = vectorLayer.getSource().getFeatures()[0];
    const popupProperties = feature.getProperties();
    const popupArgs: IPopupArgs = {
      modelName: vectorLayer.get('id'),
      properties: popupProperties,
      layer: vectorLayer,
      feature,
      event: { type: 'click', coordinate: [1312192.0073726526, 5444712.8273727745] } as any,
      dynamicPopup: {
        component: MockPopupComponent,
        getAttributes: (args: any) => {
          return { data: [1, 2, 3] };
        }
      }
    };
    service.addPopup(popupArgs, popupProperties, null);

    expect(service.getPopups().length).toBe(1);
    expect(appRef.viewCount).toEqual(1);

    service.removeAllPopups();

    expect(service.getPopups().length).toBe(0);
    expect(appRef.viewCount).toEqual(0);
  });
});

describe('MapOlService Events', () => {
  beforeEach(beforeEachFn);

  it('should only show a popup for the top visible layer with a popup property - layersOnMapEvent()', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);


    /** add popup prop to olLayer for hasPopup in layersOnMapEvent */
    const popupObj: popup = {
      event: 'click',
      options: { autoPan: false }
    };
    rasterLayer.set('popup', popupObj);
    vectorLayer.set('popup', popupObj);

    service.addLayer(rasterLayer, 'layers');
    /** add vector layer above the raster layer */
    service.addLayer(vectorLayer, 'layers');

    /** render map so map.frameState exists */
    service.map.renderSync();

    const testFeature = vectorLayer.getSource().getFeatures()[0];
    const coordinate = olGetCenter(service.getFeaturesExtent([testFeature]));
    const mapPixel = service.map.getPixelFromCoordinate(coordinate);

    const eo = {
      type: 'click',
      map: service.map,
      originalEvent: null,
      opt_dragging: false,
      opt_frameState: service.map['frameState_']
    }
    const browserEvent = new olMapBrowserEvent<PointerEvent>(eo.type, eo.map, eo.originalEvent, eo.opt_dragging, eo.opt_frameState);
    browserEvent.target = eo.map;
    browserEvent.coordinate = coordinate;
    browserEvent.pixel = mapPixel;

    service.layersOnMapEvent(browserEvent);

    const popups = service.getPopups();
    expect(popups.length).toBe(1);
    const popupOnMap = popups[0];
    expect(popupOnMap instanceof olOverlay).toBeTrue();
    expect(popupOnMap.getId()).toBe(`${vectorLayer.get('id')}:${olGetUid(testFeature)}`);
  });

  it('should distinguish between on click or move ', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);

    const popupObj: Layer['popup'] = [
      {
        event: 'click',
        popupFunction: () => `<p>test</p>`,
        options: { autoPan: false }
      },
      {
        event: 'move',
        options: { autoPan: false }
      }
    ];

    vectorLayer.set('popup', popupObj);
    service.addLayer(vectorLayer, 'layers');

    /** render map so map.frameState exists */
    service.map.renderSync();

    const testFeature = vectorLayer.getSource().getFeatures()[0];
    const coordinate = olGetCenter(service.getFeaturesExtent([testFeature]));
    const mapPixel = service.map.getPixelFromCoordinate(coordinate);

    const eo = {
      type: 'click',
      map: service.map,
      originalEvent: null,
      opt_dragging: false,
      opt_frameState: service.map['frameState_']
    }
    const browserEvent = new olMapBrowserEvent<PointerEvent>(eo.type, eo.map, eo.originalEvent, eo.opt_dragging, eo.opt_frameState);
    browserEvent.target = eo.map;
    browserEvent.coordinate = coordinate;
    browserEvent.pixel = mapPixel;

    const isEvent = service['topLayerCheckEvent'](browserEvent, popupObj);
    expect(isEvent).toBe(browserEvent.type);
  });


  it('should handle vector on click', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);

    /** add popup prop to olLayer for hasPopup in layers_on_click_move */
    const popupObj: popup = {
      event: 'click',
      options: { autoPan: false }
    };
    vectorLayer.set('popup', popupObj);
    service.addLayer(vectorLayer, 'layers');


    /** render map so map.frameState exists */
    service.map.renderSync();

    const testFeature = vectorLayer.getSource().getFeatures()[0];
    const coordinate = olGetCenter(service.getFeaturesExtent([testFeature]));
    const mapPixel = service.map.getPixelFromCoordinate(coordinate);

    const eo = {
      type: 'click',
      map: service.map,
      originalEvent: null,
      opt_dragging: false,
      opt_frameState: service.map['frameState_']
    }
    const browserEvent = new olMapBrowserEvent<PointerEvent>(eo.type, eo.map, eo.originalEvent, eo.opt_dragging, eo.opt_frameState);
    browserEvent.target = eo.map;
    browserEvent.coordinate = coordinate;
    browserEvent.pixel = mapPixel;

    service.vectorOnEvent(browserEvent);

    const popups = service.getPopups();
    expect(popups.length).toBe(1);

    const popupOnMap = popups[0];
    expect(popupOnMap instanceof olOverlay).toBeTrue();
    /** OVERLAY_TYPE_KEY, OVERLAY_TYPE_VALUE */
    expect(popupOnMap.get('type')).toBe('popup');
    expect(popupOnMap.getId()).toBe(`${vectorLayer.get('id')}:${olGetUid(testFeature)}`);
    expect(popupOnMap.get('addEvent')).toBe(popupObj.event);
  });

  /*
   * This test is complicated because async loading of the image is not working properly
  it('should handle raster on click', () => {
  });
  */

  it('should filter out layers for popup', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);

    const filterPopup: popup = {
      filterLayer: true
    };
    vectorLayer.set('popup', filterPopup);
    service.addLayer(vectorLayer, 'layers');


    service.map.renderSync();

    const testFeature = vectorLayer.getSource().getFeatures()[0];
    const coordinate = olGetCenter(service.getFeaturesExtent([testFeature]));
    const mapPixel = service.map.getPixelFromCoordinate(coordinate);

    const eo = {
      type: 'click',
      map: service.map,
      originalEvent: null,
      opt_dragging: false,
      opt_frameState: service.map['frameState_']
    }
    const browserEvent = new olMapBrowserEvent<PointerEvent>(eo.type, eo.map, eo.originalEvent, eo.opt_dragging, eo.opt_frameState);
    browserEvent.target = eo.map;
    browserEvent.coordinate = coordinate;
    browserEvent.pixel = mapPixel;

    service.vectorOnEvent(browserEvent);

    const popups = service.getPopups();
    expect(popups.length).toBe(0);
  })
});

describe('MapOlService State', () => {
  beforeEach(beforeEachFn);
  it('should set/get zoom, center', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    const center = [11, 48];
    service.setZoom(8);
    service.setCenter(center, true);

    expect(service.getZoom()).toBe(8);
    // Rounding errors 47.99999999999997 to equal 48
    expect(service.getCenter(true)[0]).toBeCloseTo(center[0], 1);
    expect(service.getCenter(true)[1]).toBeCloseTo(center[1], 1);
  });

  it('should have a default zoom of 0', (done) => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    // a zoom of 0 is not working because of the mapsize check https://openlayers.org/en/latest/examples/min-zoom.html
    service.map.getView().setZoom(5);

    const oldZoom = service.getZoom();
    expect(oldZoom).toBeCloseTo(5, 0);
    done();
  });


  it('should zoom in or out for one step', (done) => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    // a zoom of 0 is not working because of the mapsize check https://openlayers.org/en/latest/examples/min-zoom.html
    service.map.getView().setZoom(5);

    const oldZoom = service.getZoom();
    const duration = 250;
    service.zoomInOut('+');

    setTimeout(() => {
      const newZoom = service.getZoom();
      expect(newZoom).toBeCloseTo((oldZoom + 1), 0);
      done();
    }, duration);
  });

  it('should set/get extent', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    const oldExtent = service.getCurrentExtent(true);
    const extent = [-14, 33, 40, 57] as any;
    service.setExtent(extent, true);
    // map.getView().fit() tries to fit the specified extent on the map -> [-14.000000000000002, 24.562357322635023, 40, 61.890976149402576]
    // therefore only check if the extent has changed!!!
    expect(service.getCurrentExtent(true) !== oldExtent).toBeTrue();
  });

  it('should set/get projection string', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    let newProj = null;
    const projectionChange = service.projectionChange.subscribe(projLike => {
      newProj = projLike.getCode();
    });
    const projectionCode = WGS84;
    service.setProjection(projectionCode);
    expect(service.getProjection().getCode()).toBe(projectionCode);
    expect(newProj).toBe(projectionCode);
    projectionChange.unsubscribe();
  });

  it('should set/get projection obj', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    const projection = getProjection(WGS84);
    service.setProjection(projection);
    expect(service.getProjection()).toBe(projection);
  });

  it('should update vectors to the correct new projection', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    service.addLayer(vectorLayer, 'layers');

    expect(service.getProjection().getCode()).toEqual(WebMercator);
    const layerBefore = service.getLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers');

    const testFeatureBefore = (layerBefore as olVectorLayer<olVectorSource<olGeometry>>).getSource().getFeatures()[3];
    // coordinates after Read.Features of vectorLayer [1281696.090285835, 5848349.908155403];
    const pointCoordinates = transform(testFeatureCollection.features[3].geometry.coordinates as number[], WGS84, WebMercator);
    // Test for Point Feature
    expect((testFeatureBefore.getGeometry() as olPoint).getCoordinates()).toEqual(pointCoordinates);

    const projection = getProjection(WGS84);
    service.setProjection(projection);

    const reprojectedLayer = service.getLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers');
    const testFeature = (reprojectedLayer as olVectorLayer<olVectorSource<olGeometry>>).getSource().getFeatures()[3];
    // Test for Point Feature
    expect(testFeature.getGeometry().getType()).toBe('Point');
    expect((testFeature.getGeometry() as olPoint).getCoordinates()).toEqual(testFeatureCollection.features[3].geometry.coordinates as number[]);
  });

  it('should register a proj4 projection on Openlayers', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    const antarcticPolarStereographic = {
      code: `EPSG:3031`,
      proj4js: '+proj=stere +lat_0=-90 +lat_ts=-71 +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs'
    };
    const proj = getProjection(antarcticPolarStereographic.code);
    expect(proj).toBe(null);

    service.registerProjection(antarcticPolarStereographic);
    const projAfter = getProjection(antarcticPolarStereographic.code);
    expect(projAfter.getCode()).toBe(antarcticPolarStereographic.code);
  });

  it('should create a Openlayers projection', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    const antarcticPolarStereographic: olProjectionOptions = {
      code: `EPSG:3031`,
      extent: [-20048966.10, -20048966.10, 20048966.10, 20048966.10],
      worldExtent: [-180.0, -90.0, 180.0, -60.0],
      global: false,
      units: 'm'
    };

    const proj = service.getOlProjection(antarcticPolarStereographic);
    expect(proj.getCode()).toBe(antarcticPolarStereographic.code);
    expect(proj.getExtent()).toBe(antarcticPolarStereographic.extent);
    expect(proj.getWorldExtent()).toBe(antarcticPolarStereographic.worldExtent);
    expect(proj.isGlobal()).toBe(antarcticPolarStereographic.global);
    expect(proj.getUnits()).toBe(antarcticPolarStereographic.units);
  });
});


describe('MapOlService Data', () => {
  beforeEach(beforeEachCreateMapFn);

  it('should create a OpenLayers Feature from a GeoJson Feature', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);

    const feature = service.geoJsonToFeature(testFeatureCollection.features[0]);
    expect(feature.getGeometry().getType()).toBe('Polygon');
  });

  it('should create a Array of OpenLayers Features from a GeoJson FeatureCollection', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);

    const features = service.geoJsonToFeatures(testFeatureCollection);
    expect(features.length).toBe(4);
  });

  it('should get the extent of all features', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);
    const testFeatures = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [[[11, 51], [14, 51], [14, 53], [11, 53], [11, 51]]]
        }
      }]
    };
    const features = service.geoJsonToFeatures(testFeatures);
    const featuresExtent = [11, 51, 14, 53];
    expect(service.getFeaturesExtent(features, true)[0]).toBeCloseTo(featuresExtent[0]);
    expect(service.getFeaturesExtent(features, true)[1]).toBeCloseTo(featuresExtent[1]);
    expect(service.getFeaturesExtent(features, true)[2]).toBeCloseTo(featuresExtent[2]);
    expect(service.getFeaturesExtent(features, true)[3]).toBeCloseTo(featuresExtent[3]);
  });

  it('should reproject Features', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap(mapTarget.container);

    // converted to the map projection
    const features = service.geoJsonToFeatures(testFeatureCollection);
    const source = new olVectorSource({
      features
    });
    // Test for Point Feature
    expect(features[3].getGeometry().getType()).toBe('Point');
    // coordinates after to Features 'EPSG:3857' as default
    const pointCoordinates = [1281696.090285835, 5848349.908155403];
    expect((features[3].getGeometry() as olPoint).getCoordinates()).toEqual(pointCoordinates);


    service.reprojectFeatures(source, service.getProjection().getCode(), WGS84);
    const reprojectedFeatures = source.getFeatures();

    expect(reprojectedFeatures[3].getGeometry().getType()).toBe('Point');
    // Test if Pont Feature is reprojected from map projection to WGS84 like before in the geojson
    expect((reprojectedFeatures[3].getGeometry() as olPoint).getCoordinates()).toEqual(testFeatureCollection.features[3].geometry.coordinates as number[]);
  });
});
