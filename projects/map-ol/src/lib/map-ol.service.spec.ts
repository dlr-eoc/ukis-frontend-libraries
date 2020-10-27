import { TestBed } from '@angular/core/testing';
import { IPopupArgs, MapOlService } from './map-ol.service';
import { RasterLayer, VectorLayer, CustomLayer, WmtsLayer, LayerGroup } from '@dlr-eoc/services-layers';

import olTileLayer from 'ol/layer/Tile';
import olXYZ from 'ol/source/XYZ';

import olVectorLayer from 'ol/layer/Vector';
import olVectorImageLayer from 'ol/layer/VectorImage';
import olVectorSource from 'ol/source/Vector';
import olVectorTileLayer from 'ol/layer/VectorTile';
import olVectorTileSource from 'ol/source/VectorTile';
import olMVT from 'ol/format/MVT';
import olGeoJSON from 'ol/format/GeoJSON';
import olImageLayer from 'ol/layer/Image';
import olImageStaticSource from 'ol/source/ImageStatic';
import olProjection from 'ol/proj/Projection';
import olLayerGroup from 'ol/layer/Group';

import { getUid } from 'ol/util';

import { platformModifierKeyOnly } from 'ol/events/condition';
import olWMTSTileGrid from 'ol/tilegrid/WMTS';
import olTileGrid from 'ol/tilegrid/TileGrid';
import { DEFAULT_MAX_ZOOM, DEFAULT_TILE_SIZE } from 'ol/tilegrid/common';

import testFeatureCollection from '../../../demo-maps/src/assets/data/geojson/testFeatureCollection.json';
import olOverlay from 'ol/Overlay';
import { getUid as olGetUid } from 'ol/util';
import { get as getProjection } from 'ol/proj';


/** ol/layer/Tile - ID-raster */
let rasterLayer: olTileLayer;

/** ol/layer/Vector -ID-vector */
let vectorLayer: olVectorLayer, vetorData;

/** ol/layer/Image - ID-image */
let imageLayer: olImageLayer;

/** ol/layer/VectorImage - ID-vector-image */
let vectorImageLayer: olVectorImageLayer, vectorImageData;

/** ol/layer/VectorImage - ID-vector-tile */
let vectorTileLayer: olVectorTileLayer;

/** ID-ukis-raster */
let ukisRasterLayer: RasterLayer;

/** ID-ukis-wmts */
let ukisWmtsLayer: WmtsLayer;

/** ID-ukis-vector */
let ukisvectorLayer: VectorLayer;

/** ID-ukis-vector-image */
let ukisCustomLayer: CustomLayer;

/** ID-ukis-group-layer */
let ukisGroupLayer: LayerGroup;

/** ID-group-layer1 */
let groupLayer1: olLayerGroup;
/** ID-group-layer2 */
let groupLayer2: olLayerGroup;
/** ID-group-layer3 */
let groupLayer3: olLayerGroup;

const beforeEachFn = () => {
  TestBed.configureTestingModule({});

  rasterLayer = new olTileLayer({
    source: new olXYZ({
      url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attributions: ['&copy, <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors'],
      wrapX: false
    })
  });
  rasterLayer.set('id', 'ID-raster');
  rasterLayer.set('name', 'OpenStreetMap');

  vetorData = testFeatureCollection;

  vectorLayer = new olVectorLayer({
    source: new olVectorSource({
      features: (new olGeoJSON()).readFeatures(vetorData)
    })
  });
  vectorLayer.set('id', 'ID-vector');
  vectorLayer.set('name', 'GeoJSON Vector Layer');

  imageLayer = new olImageLayer({
    source: new olImageStaticSource({
      attributions: '© <a href="http://xkcd.com/license.html">xkcd</a>',
      url: 'https://imgs.xkcd.com/comics/online_communities.png',
      imageExtent: [0, 0, 1024, 968],
      projection: new olProjection({
        code: 'xkcd-image',
        units: 'pixels',
        extent: [0, 0, 1024, 968]
      })
    })
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
      features: (new olGeoJSON()).readFeatures(vectorImageData)
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
  ukisCustomLayer = new CustomLayer({
    id: 'ID-ukis-custom',
    name: 'Custom Layer KML',
    type: 'custom',
    custom_layer: vectorImageLayer,
    visible: false
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
    continuousWorld: false,
    crossOrigin: 'anonymous'
  });

  ukisWmtsLayer = new WmtsLayer({
    type: 'wmts',
    id: 'ID-ukis-wmts',
    url: 'https://tiles.geoservice.dlr.de/service/wmts?',
    name: 'TDM90_AMP',
    filtertype: 'Layers',
    params: {
      layer: 'TDM90_AMP',
      version: '1.1.0',
      format: 'image/png',
      style: 'default',
      matrixSetOptions: {
        matrixSet: 'EPSG:3857',
        tileMatrixPrefix: 'EPSG:3857',
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
    ]
  });

  ukisvectorLayer = new VectorLayer({
    id: 'ID-ukis-vector',
    name: 'GeoJSON Vector Layer',
    type: 'geojson',
    data: vetorData,
    visible: false
  });

  ukisGroupLayer = new LayerGroup({
    id: 'ID-ukis-group-layer',
    name: 'ukis group',
    layers: [ukisvectorLayer, ukisWmtsLayer, ukisRasterLayer, ukisCustomLayer]
  });
};


describe('MapOlService Core', () => {
  it('should be created', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    expect(service).toBeTruthy();
  });

  it('should create a map', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap();
    expect(service.map.getLayers().getArray().length).toEqual(3);
  });

  it('should set a global hit Tolerance for mouse interaction', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    const value = 2;
    service.setHitTolerance(value);
    expect(service.getHitTolerance()).toEqual(value);
  });


  it('should add a bbox select interaction', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap();
    const dragBox = service.addBboxSelection(platformModifierKeyOnly);
    expect(service.map.getInteractions().getArray().includes(dragBox)).toBeTrue();
  });

});

describe('MapOlService olLayers', () => {
  beforeEach(beforeEachFn);
  it('should have three layer groups on the map where all layers are added', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap();

    expect(service.getLayerByKey({ key: 'id', value: 'ID_filtertype_baselayers' }) instanceof olLayerGroup).toBeTrue();
    expect(service.getLayerByKey({ key: 'id', value: 'ID_filtertype_layers' }) instanceof olLayerGroup).toBeTrue();
    expect(service.getLayerByKey({ key: 'id', value: 'ID_filtertype_overlays' }) instanceof olLayerGroup).toBeTrue();
  });

  it('should properly set the `crossOrigin` attribute, if given', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap();
    const ukisLayers = [ukisRasterLayer];
    service.setUkisLayers(ukisLayers, 'Layers');

    const olLayerGroups = service.map.getLayers().getArray();
    const olRasterLayer = olLayerGroups[1].getLayersArray()[0];
    expect(olRasterLayer.getSource().crossOrigin).toEqual('anonymous');
  });

  it('should add/get layers to/from the map', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap();
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
    service.createMap();
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
    service.createMap();
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
    service.createMap();
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
    service.createMap();
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
    service.createMap();
    service.addLayer(vectorLayer, 'layers');
    expect(service.getLayers('layers')[0]).toBe(vectorLayer);
  });

  it('should get layers by key from the map', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap();
    service.addLayer(vectorLayer, 'layers');

    expect(service.getLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers')).toBe(vectorLayer);

    // add group with a group with a rasterLayer
    service.addLayer(groupLayer2, 'layers');

    expect(service.getLayerByKey({ key: 'id', value: 'ID-raster' }, 'layers')).toBe(rasterLayer);
    expect(service.getLayerByKey({ key: 'id', value: 'ID-group-layer1' }, 'layers')).toBe(groupLayer1);
  });

  it('should remove all layers from a Type', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap();
    service.addLayer(vectorLayer, 'layers');
    service.removeAllLayers('layers');
    expect(service.getLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers')).toBeFalsy();
  });

  it('should remove a layer by key from a Type', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap();
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
    service.createMap();
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
    service.createMap();
    const layers = [ukisvectorLayer, ukisRasterLayer, ukisCustomLayer];
    service.setUkisLayers(layers, 'Layers');
    expect(service.getLayerByKey({ key: 'id', value: 'ID-ukis-vector' }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: 'ID-ukis-raster' }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: 'ID-ukis-custom' }, 'layers')).toBeTruthy();
  });

  it('should reset/add one ukisLayer from a Type', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap();
    const layers = [ukisvectorLayer];
    service.setUkisLayers(layers, 'Layers');

    const layerBeforUpdate = service.getLayerByKey({ key: 'id', value: 'ID-ukis-vector' }, 'layers');
    const olUid = getUid(layerBeforUpdate);
    expect(layerBeforUpdate.getVisible()).toBeFalsy();


    ukisvectorLayer.visible = true;
    service.setUkisLayer(ukisvectorLayer);
    const layerAfterUpdate = service.getLayerByKey({ key: 'id', value: 'ID-ukis-vector' }, 'layers');
    expect(layerAfterUpdate.getVisible()).toBeTruthy();
    expect(getUid(layerAfterUpdate) !== olUid).toBeTruthy();
  });

  it('should update one ukisLayer from a Type - not remove the olLayer', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap();
    const layers = [ukisvectorLayer];
    service.setUkisLayers(layers, 'Layers');

    const layerBeforUpdate = service.getLayerByKey({ key: 'id', value: 'ID-ukis-vector' }, 'layers');
    const olUid = getUid(layerBeforUpdate);
    expect(layerBeforUpdate.getVisible()).toBeFalsy();


    ukisvectorLayer.visible = true;
    service.updateUkisLayer(ukisvectorLayer);
    const layerAfterUpdate = service.getLayerByKey({ key: 'id', value: 'ID-ukis-vector' }, 'layers');
    expect(layerAfterUpdate.getVisible()).toBeTruthy();
    expect(getUid(layerAfterUpdate)).toBe(olUid);
  });


  it('should remove all layers from a type if array has no layers (not for type Baselayers)', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap();
    const layers = [ukisRasterLayer];
    service.setUkisLayers(layers, 'Layers');
    expect(service.getLayers('Layers').length).toBe(1);

    service.setUkisLayers([], 'Layers');
    expect(service.getLayers('Layers').length).toBe(0);
  });
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
    service.createMap();

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
    expect(popupOnMap.getId()).toBe(olGetUid(feature));
    expect(popupOnMap.get('addEvent')).toBe(args.event.type);
  });

  it('should add multiple popups to the map for vector Layers', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap();

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
    service.createMap();

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
});


describe('MapOlService State', () => {
  // beforeEach(beforeEachFn);
  it('should set/get zoom, center', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap();
    const center = [11, 48];
    service.setZoom(8);
    service.setCenter(center, true);

    expect(service.getZoom()).toBe(8);
    // Rounding errors 47.99999999999997 to equal 48
    expect(service.getCenter(true)[0]).toBeCloseTo(center[0], 1);
    expect(service.getCenter(true)[1]).toBeCloseTo(center[1], 1);
  });

  it('should set/get extent', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap();
    const oldExtent = service.getCurrentExtent(true);
    const extent = [-14, 33, 40, 57] as any;
    service.setExtent(extent, true);
    // map.getView().fit() tries to fit the specified extent on the map -> [-14.000000000000002, 24.562357322635023, 40, 61.890976149402576]
    // therefore only check if the extent has changed!!!
    expect(service.getCurrentExtent(true) !== oldExtent).toBeTrue();
  });

  it('should set/get projection string', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap();
    const projectionCode = 'EPSG:4326';
    service.setProjection(projectionCode);
    expect(service.getProjection().getCode()).toBe(projectionCode);
  });

  it('should set/get projection obj', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap();
    const projection = getProjection('EPSG:4326');
    service.setProjection(projection);
    expect(service.getProjection()).toBe(projection);
  });
});
