import { TestBed } from '@angular/core/testing';

import { MapCesiumService } from './map-cesium.service';
import { Viewer } from '@cesium/widgets';
import { ICesiumControls } from './map-cesium.component';
import { ImageryLayer, Scene } from '@cesium/engine';
import { CustomLayer, ILayerOptions, IRasterLayerOptions, Layer, RasterLayer, VectorLayer, WmsLayer, WmtsLayer } from '@dlr-eoc/services-layers';

import testFeatureCollection from '@dlr-eoc/shared-assets/geojson/testFeatureCollection.json';

const WebMercator = 'EPSG:3857';
const WGS84 = 'EPSG:4326';

let mapTarget: { size: number[], container: HTMLDivElement };

/** ID-ukis-raster */
let ukisXYZLayer: RasterLayer;

/** ID-ukis-wms */
let ukisWmsLayer: WmsLayer;

/** ID-ukis-wmts */
let ukisWmtsLayer: WmtsLayer;

/** ID-ukis-raster-image */
let ukisCustomLayerRaster: CustomLayer;

/** ID-ukis-vector geoJSON*/
let ukisGeoJsonLayer: VectorLayer;

/** ID-ukis-vector KML*/
let ukisKmlLayer: VectorLayer;



const createMapTarget = (size: number[]) => {
  const container = document.createElement('div');
  container.style.border = 'solid 1px #000';
  container.style.width = `${size[0]}px`;
  container.style.height = `${size[1]}px`;
  document.body.appendChild(container);

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = '/assets/cesium/Widgets/widgets.css';
  document.body.appendChild(link);
  return {
    size,
    container
  };
};

function createTestLayer() {
  /** UKIS Layers ----------------------- */
  ukisXYZLayer = new RasterLayer({
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
    popup: true,
    visible: false
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

  ukisGeoJsonLayer = new VectorLayer({
    id: 'ID-ukis-vector',
    name: 'GeoJSON Vector Layer',
    type: 'geojson',
    data: testFeatureCollection,
    visible: false
  });

  ukisKmlLayer = new VectorLayer({
    id: 'ID-ukis-kml',
    name: 'KML Vector Layer',
    type: 'kml',
    // shared-assets/ -> assets/ see karma.conf.js
    data: '/assets/kml/TimeZones.kml',
    visible: false
  });
}

describe('MapCesiumService Core Functions', () => {
  let service: MapCesiumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    mapTarget = createMapTarget([1024, 768]);
    (window as Record<string, any>)['CESIUM_BASE_URL'] = 'assets/cesium/';
    service = TestBed.inject(MapCesiumService);

    const controls: ICesiumControls = {
      infoBox: true,
      selectionIndicator: true
    }
    service.setControls(controls);
  });

  afterEach(() => {
    if (service.viewer) { service.viewer.destroy(); }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a viewer and scene', () => {
    service.createMap(mapTarget.container);
    expect(service.viewer.container).toEqual(mapTarget.container);
    expect(service.viewer instanceof Viewer).toBeTruthy();
    expect(service.viewer.scene instanceof Scene).toBeTruthy();
  });
});

describe('MapCesiumService State', () => {
  let service: MapCesiumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    mapTarget = createMapTarget([1024, 768]);
    (window as Record<string, any>)['CESIUM_BASE_URL'] = 'assets/cesium/';
    service = TestBed.inject(MapCesiumService);

    const controls: ICesiumControls = {
      infoBox: true,
      selectionIndicator: true
    }
    service.setControls(controls);
  });

  afterEach(() => {
    if (service.viewer) { service.viewer.destroy(); }
  });

  it('should set/get zoom, center', () => {
    service.createMap(mapTarget.container);
    const center = { lat: 11, lon: 48 };
    service.setZoom(8);
    service.setCenter(center);
    // due to transformation of the zomm level to 3D height and back, there are some acceptable rounding errors
    expect(service.getZoom()).toBeCloseTo(8, 0);
    // Rounding errors 47.99999999999997 to equal 48
    expect(service.getCenter().lat).toBeCloseTo(center.lat, 1);
    expect(service.getCenter().lon).toBeCloseTo(center.lon, 1);
  });

  it('should have a default zoom of 0', () => {
    service.createMap(mapTarget.container);
    // due to transformation of the zomm level to 3D height and back, there are some acceptable rounding errors
    const oldZoom = service.getZoom();
    // The default zoom varies slightly depending on the size of the map and the state of the rendering process.
    // there are values from 0.5 to 3.024
    expect(0 <= oldZoom && oldZoom < 4).toBeTrue();
  });

  it('should set/get extent', () => {
    service.createMap(mapTarget.container);
    const oldExtent = service.getCurrentExtent(true);
    const extent = [-14, 33, 40, 57] as any;

    service.setExtent(extent);
    expect(service.getCurrentExtent(true) !== oldExtent).toBeTrue();
  });


  it('should set the view angle', () => {
    service.createMap(mapTarget.container);
    const oldAngle = service.viewer.camera.roll;
    const newAngle = 20;

    service.setViewAngle(newAngle);
    expect(service.viewer.camera.roll !== oldAngle).toBeTrue();
  });

  it('should set the nadir view angle', () => {
    service.createMap(mapTarget.container);

    service.setNadirViewAngle();
    expect(service.viewer.camera.roll === 0).toBeTrue();
  });

});

describe('MapCesiumService Layer Functions', () => {
  let service: MapCesiumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    mapTarget = createMapTarget([1024, 768]);
    (window as Record<string, any>)['CESIUM_BASE_URL'] = 'assets/cesium/';
    service = TestBed.inject(MapCesiumService);

    const controls: ICesiumControls = {
      infoBox: true,
      selectionIndicator: true
    }
    service.setControls(controls);
  });

  afterEach(() => {
    if (service.viewer) { service.viewer.destroy(); }
  });

  it('should getAll2DLayersSize', () => {
    service.createMap(mapTarget.container);
    expect(service.getAll2DLayersSize('baselayers')).toBeGreaterThanOrEqual(0);
    expect(service.getAll2DLayersSize('layers')).toBeGreaterThanOrEqual(0);
    expect(service.getAll2DLayersSize('overlays')).toBeGreaterThanOrEqual(0);
  });

  it('should get2DImageryLayersSize', () => {
    service.createMap(mapTarget.container);
    expect(service.get2DImageryLayersSize('baselayers')).toBeGreaterThanOrEqual(0);
    expect(service.get2DImageryLayersSize('layers')).toBeGreaterThanOrEqual(0);
    expect(service.get2DImageryLayersSize('overlays')).toBeGreaterThanOrEqual(0);
  });

  it('should getVisible2DLayersSize', () => {
    service.createMap(mapTarget.container);
    expect(service.getVisible2DLayersSize('baselayers')).toBeGreaterThanOrEqual(0);
    expect(service.getVisible2DLayersSize('layers')).toBeGreaterThanOrEqual(0);
    expect(service.getVisible2DLayersSize('overlays')).toBeGreaterThanOrEqual(0);
  });

  it('should get3DLayersSize', () => {
    service.createMap(mapTarget.container);
    expect(service.get3DLayersSize('baselayers')).toBeGreaterThanOrEqual(0);
    expect(service.get3DLayersSize('layers')).toBeGreaterThanOrEqual(0);
  });

  it('should getVisible3DLayersSize', () => {
    service.createMap(mapTarget.container);
    expect(service.getVisible3DLayersSize('baselayers')).toBeGreaterThanOrEqual(0);
    expect(service.getVisible3DLayersSize('layers')).toBeGreaterThanOrEqual(0);
  });

  it('should remove all 2D layers', () => {
    service.createMap(mapTarget.container);
    service.removeAll2DLayers();
    expect(service.getAll2DLayersSize('baselayers')).toBe(0);
    expect(service.getAll2DLayersSize('layers')).toBe(0);
    expect(service.getAll2DLayersSize('overlays')).toBe(0);
  });

  it('should remove 2D layers with defined group filter type', () => {
    service.createMap(mapTarget.container);
    service.remove2DLayers('baselayers');
    service.remove2DLayers('layers');
    service.remove2DLayers('overlays');
    expect(service.getAll2DLayersSize('baselayers')).toBe(0);
    expect(service.getAll2DLayersSize('layers')).toBe(0);
    expect(service.getAll2DLayersSize('overlays')).toBe(0);
  });

  it('should remove all 3D layers', () => {
    service.createMap(mapTarget.container);
    service.removeAll3DLayers();
    expect(service.get3DLayersSize('baselayers')).toBe(0);
    expect(service.get3DLayersSize('layers')).toBe(0);
  });

  it('should remove 3D layers with defined group filter type', () => {
    service.createMap(mapTarget.container);
    service.remove3DLayers('baselayers');
    service.remove3DLayers('layers');
    expect(service.get3DLayersSize('baselayers')).toBe(0);
    expect(service.get3DLayersSize('layers')).toBe(0);
  });
});

describe('MapCesiumService ukisLayers', () => {
  let service: MapCesiumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    mapTarget = createMapTarget([1024, 768]);
    (window as Record<string, any>)['CESIUM_BASE_URL'] = 'assets/cesium/';
    service = TestBed.inject(MapCesiumService);

    const controls: ICesiumControls = {
      infoBox: true,
      selectionIndicator: true
    }
    service.setControls(controls);
    createTestLayer();
  });

  afterEach(() => {
    if (service.viewer) { service.viewer.destroy(); }
  });

  /** Test if ukis-layers are added to the map ----------------------------------------------------------------------- */
  it('should reset/add ukisLayers from a Type', () => {
    service.createMap(mapTarget.container);
    const layers = [ukisWmsLayer, ukisXYZLayer];
    service.set2DUkisLayers(layers, 'Layers');

    layers.map(l => {
      // console.log(l.id);
      // console.log(service.getLayerById(l.id, 'layers'));
      expect(service.getLayerById(l.id, 'layers')).toBeTruthy();
    });
  });


  it('should update one ukisLayer from type Layer', () => {
    service.createMap(mapTarget.container);
    const layers = [ukisWmsLayer];
    service.set2DUkisLayers(layers, 'Layers');

    const layerBeforUpdate = service.getLayerById('ID-ukis-wms', 'layers');
    expect(layerBeforUpdate.show).toBeFalsy();

    ukisWmsLayer.visible = true;
    service.set2DUkisLayers(layers, 'Layers');
    const layerAfterUpdate = service.getLayerById('ID-ukis-wms', 'layers');
    expect(layerAfterUpdate.show).toBeTruthy();
  });

  it('should update one ukisLayer from type Overlay', () => {
    service.createMap(mapTarget.container);
    const layers = [ukisWmsLayer];
    service.set2DUkisLayers(layers, 'Overlays');

    const layerBeforUpdate = service.getLayerById('ID-ukis-wms', 'Overlays');
    expect(layerBeforUpdate.show).toBeFalsy();

    ukisWmsLayer.visible = true;
    service.set2DUkisLayers(layers, 'Overlays');
    const layerAfterUpdate = service.getLayerById('ID-ukis-wms', 'Overlays');
    expect(layerAfterUpdate.show).toBeTruthy();
  });

  it('should update one ukisLayer from type Baselayer', () => {
    service.createMap(mapTarget.container);
    const layers = [ukisWmsLayer];
    service.set2DUkisLayers(layers, 'Baselayers');

    const layerBeforUpdate = service.getLayerById('ID-ukis-wms', 'Baselayers');
    expect(layerBeforUpdate.show).toBeFalsy();

    ukisWmsLayer.visible = true;
    service.set2DUkisLayers(layers, 'Baselayers');
    const layerAfterUpdate = service.getLayerById('ID-ukis-wms', 'Baselayers');
    expect(layerAfterUpdate.show).toBeTruthy();
  });

  it('should remove all layers from a type if array has no layers (not for type Baselayers)', () => {
    service.createMap(mapTarget.container);
    const layers = [ukisXYZLayer];
    service.set2DUkisLayers(layers, 'Layers');
    expect(service.get2DImageryLayersSize('Layers')).toBe(1);

    service.set2DUkisLayers([], 'Layers');
    expect(service.get2DImageryLayersSize('Layers')).toBe(0);
  });

  it('should set ILayerOptions on the Cesium ImageryLayer', () => {
    service.createMap(mapTarget.container);

    const layerOptions: IRasterLayerOptions = {
      id: 'ID-ukis-base-layer',
      name: 'ukis base layer',
      filtertype: 'Layers',
      type: 'xyz',
      legendImg: 'link/to/legend.png',
      visible: true,
      opacity: 0.8,
      attribution: 'attribution for ukisBaseLayer',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      subdomains: ['a', 'b', 'c'],
      continuousWorld: true,
      // * - set source on layeroptions
      minResolution: 2000, // set resolution and zoom at the same time only here for the test, normally there should only be set one of them
      maxResolution: 20000,
      maxZoom: 10,
      minZoom: 5,
      bbox: [-180, -90, 180, 90]
    };
    const ukisBaseLayer = new Layer(layerOptions);
    const layers = [ukisBaseLayer];
    service.set2DUkisLayers(layers, 'Layers');


    const mapLayersLength = service.get2DImageryLayersSize('Layers');
    expect(mapLayersLength).toBe(layers.length);

    const imageryLayer = service.getLayerById(ukisBaseLayer.id, 'Layers') as ImageryLayer;
    expect(imageryLayer.show).toBe(ukisBaseLayer.visible);
    expect(imageryLayer.alpha).toBe(ukisBaseLayer.opacity);
  });
});

describe('MapCesiumService DataSources', () => {
  let service: MapCesiumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    mapTarget = createMapTarget([1024, 768]);
    (window as Record<string, any>)['CESIUM_BASE_URL'] = 'assets/cesium/';
    service = TestBed.inject(MapCesiumService);

    const controls: ICesiumControls = {
      infoBox: true,
      selectionIndicator: true
    }
    service.setControls(controls);
    createTestLayer();
  });

  afterEach(() => {
    if (service.viewer) { service.viewer.destroy(); }
  });

  /** Test if all DataSources are added to the map ----------------------------------------------------------------------- */
  it('should add XYZ DataSource', () => {
    service.createMap(mapTarget.container);
    service.set2DUkisLayers([ukisXYZLayer], 'Layers');

    expect(service.get2DImageryLayersSize('Layers')).toBe(1);
    expect(service.getLayerById(ukisXYZLayer.id, 'layers')).toBeTruthy();
  });

  it('should add WMS DataSource', () => {
    service.createMap(mapTarget.container);
    service.set2DUkisLayers([ukisWmsLayer], 'Layers');

    expect(service.get2DImageryLayersSize('Layers')).toBe(1);
    expect(service.getLayerById(ukisWmsLayer.id, 'layers')).toBeTruthy();
  });

  it('should add WMTS DataSource', () => {
    service.createMap(mapTarget.container);
    service.set2DUkisLayers([ukisWmtsLayer], 'Layers');

    expect(service.get2DImageryLayersSize('Layers')).toBe(1);
    expect(service.getLayerById(ukisWmtsLayer.id, 'layers')).toBeTruthy();
  });

  it('should add geoJSON DataSource', () => {
    service.createMap(mapTarget.container);
    service.set2DUkisLayers([ukisGeoJsonLayer], 'Layers');

    expect(service.getDataSourceLayersSize('Layers')).toBe(1);
    expect(service.getLayerById(ukisGeoJsonLayer.id, 'layers')).toBeTruthy();
  });

  it('should add KML DataSource', () => {
    service.createMap(mapTarget.container);
    service.set2DUkisLayers([ukisKmlLayer], 'Layers');

    expect(service.getDataSourceLayersSize('Layers')).toBe(1);
    expect(service.getLayerById(ukisKmlLayer.id, 'layers')).toBeTruthy();
  });

});

