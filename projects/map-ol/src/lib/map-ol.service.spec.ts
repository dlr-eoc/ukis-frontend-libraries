import { TestBed } from '@angular/core/testing';
import { MapOlService } from './map-ol.service';
import { RasterLayer, VectorLayer, CustomLayer } from '@dlr-eoc/services-layers';

import olTileLayer from 'ol/layer/Tile';
import olXYZ from 'ol/source/XYZ';

import olVectorLayer from 'ol/layer/Vector';
import olVectorImageLayer from 'ol/layer/VectorImage';
import olVectorSource from 'ol/source/Vector';
import olGeoJSON from 'ol/format/GeoJSON';
import olImageLayer from 'ol/layer/Image';
import olImageStaticSource from 'ol/source/ImageStatic';
import olProjection from 'ol/proj/Projection';

import { getUid } from 'ol/util';

/** ol/layer/Tile - ID-raster */
let rasterLayer: olTileLayer;

/** ol/layer/Vector -ID-vector */
let vectorLayer: olVectorLayer, vetorData;

/** ol/layer/Image - ID-image */
let imageLayer: olImageLayer;

/** ol/layer/VectorImage - ID-vector-image */
let vectorImageLayer: olVectorImageLayer, vectorImageData;

/** ID-raster */
let ukisRasterLayer: RasterLayer;

/** ID-vector */
let ukisvectorLayer: VectorLayer;

/** ID-vector-image */
let ukisCustomLayer: CustomLayer;


describe('MapOlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});

    rasterLayer = new olTileLayer({
      id: 'ID-raster',
      name: 'OpenStreetMap',
      source: new olXYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attributions: ['&copy, <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors'],
        wrapX: false
      })
    });

    vetorData = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [
              [
                2.63671875,
                44.32384807250689
              ],
              [
                3.504638671875,
                44.95702412512118
              ],
              [
                4.449462890625,
                44.75453548416007
              ]
            ]
          }
        },
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
        },
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [
                  4.28466796875,
                  45.46783598133375
                ],
                [
                  4.976806640625,
                  45.1742925240767
                ],
                [
                  5.4931640625,
                  45.56021795715051
                ],
                [
                  5.4052734375,
                  46.027481852486645
                ],
                [
                  4.46044921875,
                  45.84410779560204
                ],
                [
                  4.28466796875,
                  45.46783598133375
                ]
              ]
            ]
          }
        }
      ]
    };

    vectorLayer = new olVectorLayer({
      id: 'ID-vector',
      name: 'GeoJSON Vector Layer',
      source: new olVectorSource({
        features: (new olGeoJSON()).readFeatures(vetorData)
      })
    });

    imageLayer = new olImageLayer({
      id: 'ID-image',
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
      id: 'ID-vector-image',
      imageRatio: 2,
      source: new olVectorSource({
        features: (new olGeoJSON()).readFeatures(vectorImageData)
      })
    });

    ukisCustomLayer = new CustomLayer({
      id: 'ID-vector-image',
      name: 'Custom Layer KML',
      type: 'custom',
      custom_layer: vectorImageLayer,
      visible: false
    });

    ukisRasterLayer = new RasterLayer({
      id: 'ID-raster',
      name: 'OpenStreetMap',
      displayName: 'OpenStreetMap',
      visible: false,
      type: 'xyz',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      subdomains: ['a', 'b', 'c'],
      attribution: '&copy, <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors',
      continuousWorld: false
    });

    ukisvectorLayer = new VectorLayer({
      id: 'ID-vector',
      name: 'GeoJSON Vector Layer',
      type: 'geojson',
      data: vetorData,
      visible: false
    });

  });

  it('should be created', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    expect(service).toBeTruthy();
  });

  it('should create a map', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap();
    expect(service.map.getLayers().getArray().length).toEqual(3);
  });

  it('should add/get layers to/from the map', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap();
    service.addLayer(rasterLayer, 'baselayers');
    service.addLayer(vectorLayer, 'layers');

    expect(service.getLayers('baselayers').length).toEqual(1);
    expect(service.getLayerByKey({ key: 'id', value: 'ID-raster' }, 'baselayers')).toBeTruthy();

    expect(service.getLayers('layers').length).toEqual(1);
    expect(service.getLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers')).toBeTruthy();
  });

  it('should not add a duplicate layer the map', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap();
    service.addLayer(vectorLayer, 'layers');
    service.addLayer(rasterLayer, 'layers');
    expect(service.getLayers('layers').length).toEqual(2);
    expect(service.getLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: 'ID-raster' }, 'layers')).toBeTruthy();

    service.addLayer(vectorLayer, 'layers');
    expect(service.getLayers('layers').length).toEqual(2);
    expect(service.getLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: 'ID-raster' }, 'layers')).toBeTruthy();
  });

  it('should add a array of layers to aType', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap();
    service.addLayer(vectorLayer, 'layers');
    service.addLayer(rasterLayer, 'layers');
    service.addLayers([rasterLayer, imageLayer, vectorImageLayer], 'layers');

    expect(service.getLayers('layers').length).toEqual(4);
    expect(service.getLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: 'ID-raster' }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: 'ID-image' }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: 'ID-vector-image' }, 'layers')).toBeTruthy();
  });


  it('should set (reset) a array of layers to aType', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap();
    service.addLayer(vectorLayer, 'layers');
    service.setLayers([rasterLayer, imageLayer, vectorImageLayer], 'layers');

    expect(service.getLayers('layers').length).toEqual(3);
    expect(service.getLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers')).toBeFalsy();

    expect(service.getLayerByKey({ key: 'id', value: 'ID-raster' }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: 'ID-image' }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: 'ID-vector-image' }, 'layers')).toBeTruthy();
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
    service.addLayer(rasterLayer, 'layers');
    service.addLayer(vectorLayer, 'layers');
    service.removeLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers');
    expect(service.getLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers')).toBeFalsy();
  });

  it('should update a layer by key from a Type', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap();
    service.addLayer(vectorLayer, 'layers');

    const visible = true, opacity = 0.5, minzoom = 2, maxzoom = 15;
    const newLayer = vectorLayer = new olVectorLayer({
      id: 'ID-vector'
    });
    newLayer.setSource(vectorLayer.getSource());
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
  });

  /** Test if ukis-layers are added to the map ----------------------------------------------------------------------- */
  it('should reset/add ukisLayers from a Type', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap();
    const layers = [ukisvectorLayer, ukisRasterLayer, ukisCustomLayer];
    service.setUkisLayers(layers, 'Layers');
    expect(service.getLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: 'ID-raster' }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: 'ID-vector-image' }, 'layers')).toBeTruthy();
  });

  it('should reset/add one ukisLayer from a Type', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap();
    const layers = [ukisvectorLayer];
    service.setUkisLayers(layers, 'Layers');

    const layerBeforUpdate = service.getLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers');
    const olUid = getUid(layerBeforUpdate);
    expect(layerBeforUpdate.getVisible()).toBeFalsy();


    ukisvectorLayer.visible = true;
    service.setUkisLayer(ukisvectorLayer);
    const layerAfterUpdate = service.getLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers');
    expect(layerAfterUpdate.getVisible()).toBeTruthy();
    expect(getUid(layerAfterUpdate) !== olUid).toBeTruthy();
  });

  it('should update one ukisLayer from a Type - not remove the olLayer', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap();
    const layers = [ukisvectorLayer];
    service.setUkisLayers(layers, 'Layers');

    const layerBeforUpdate = service.getLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers');
    const olUid = getUid(layerBeforUpdate);
    expect(layerBeforUpdate.getVisible()).toBeFalsy();


    ukisvectorLayer.visible = true;
    service.updateUkisLayer(ukisvectorLayer);
    const layerAfterUpdate = service.getLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers');
    expect(layerAfterUpdate.getVisible()).toBeTruthy();
    expect(getUid(layerAfterUpdate)).toBe(olUid);
  });

});
