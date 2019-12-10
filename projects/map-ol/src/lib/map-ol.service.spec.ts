import { TestBed } from '@angular/core/testing';
import { MapOlService } from './map-ol.service';

import olTileLayer from 'ol/layer/Tile';
import olOSM from 'ol/source/OSM';

import olVectorLayer from 'ol/layer/Vector';
import olVectorImageLayer from 'ol/layer/VectorImage';
import olVectorSource from 'ol/source/Vector';
import olGeoJSON from 'ol/format/GeoJSON';
import olImageLayer from 'ol/layer/Image';
import olImageStaticSource from 'ol/source/ImageStatic';
import olProjection from 'ol/proj/Projection';

/** ol/layer/Tile */
let rasterLayer: olTileLayer;

/** ol/layer/Vector */
let vectorLayer: olVectorLayer;

/** ol/layer/Image */
let imageLayer: olImageLayer;

/** ol/layer/VectorImage */
let vectorImageLayer: olVectorImageLayer


describe('MapOlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});

    rasterLayer = new olTileLayer({
      id: 'ID-raster',
      source: new olOSM()
    });

    vectorLayer = new olVectorLayer({
      id: 'ID-vector',
      source: new olVectorSource({
        features: (new olGeoJSON()).readFeatures({
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'Feature',
              'properties': {},
              'geometry': {
                'type': 'LineString',
                'coordinates': [
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
              'type': 'Feature',
              'properties': {},
              'geometry': {
                'type': 'Point',
                'coordinates': [
                  4.74609375,
                  44.32384807250689
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': {},
              'geometry': {
                'type': 'Polygon',
                'coordinates': [
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
        })
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

    vectorImageLayer = new olVectorImageLayer({
      id: 'ID-vector-image',
      imageRatio: 2,
      source: new olVectorSource({
        features: (new olGeoJSON()).readFeatures({
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'Feature',
              'properties': {},
              'geometry': {
                'type': 'Point',
                'coordinates': [
                  4.74609375,
                  44.32384807250689
                ]
              }
            }
          ]
        })
      })
    });

  });

  it('should be created', () => {
    const service: MapOlService = TestBed.get(MapOlService);
    expect(service).toBeTruthy();
  });

  it('should add/get layers to/from the map', () => {
    const service: MapOlService = TestBed.get(MapOlService);
    service.createMap();
    service.addLayer(rasterLayer, 'baselayers');
    service.addLayer(vectorLayer, 'layers');

    expect(service.map.getLayers().getArray().length).toEqual(3);
    expect(service.getLayerByKey({ key: 'id', value: 'ID-raster' }, 'baselayers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers')).toBeTruthy();
  });

  it('should add a array of layers to aType', () => {
    const service: MapOlService = TestBed.get(MapOlService);
    service.createMap();
    service.addLayer(vectorLayer, 'layers');
    service.addLayers([rasterLayer, imageLayer, vectorImageLayer], 'layers');

    expect(service.map.getLayers().getArray().length).toEqual(3);
    expect(service.getLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: 'ID-raster' }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: 'ID-image' }, 'layers')).toBeTruthy();
    expect(service.getLayerByKey({ key: 'id', value: 'ID-vector-image' }, 'layers')).toBeTruthy();
  });

  it('should get layers from a Type', () => {
    const service: MapOlService = TestBed.get(MapOlService);
    service.createMap();
    service.addLayer(vectorLayer, 'layers');
    expect(service.getLayers('layers')[0]).toBe(vectorLayer);
  });

  it('should get layers by key from the map', () => {
    const service: MapOlService = TestBed.get(MapOlService);
    service.createMap();
    service.addLayer(vectorLayer, 'layers');
    expect(service.getLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers')).toBe(vectorLayer);
  });

  it('should remove all layers from a Type', () => {
    const service: MapOlService = TestBed.get(MapOlService);
    service.createMap();
    service.addLayer(vectorLayer, 'layers');
    service.removeAllLayers('layers');
    expect(service.getLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers')).toBeFalsy();
  });

  it('should remove a layer by key from a Type', () => {
    const service: MapOlService = TestBed.get(MapOlService);
    service.createMap();
    service.addLayer(rasterLayer, 'layers');
    service.addLayer(vectorLayer, 'layers');
    service.removeLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers');
    expect(service.getLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers')).toBeFalsy();
  });

  it('should update a layer by key from a Type', () => {
    const service: MapOlService = TestBed.get(MapOlService);
    service.createMap();
    service.addLayer(vectorLayer, 'layers');

    let visible = true, opacity = 0.5, minzoom = 2, maxzoom = 15;
    const newLayer = vectorLayer = new olVectorLayer({
      id: 'ID-vector'
    });
    newLayer.setSource(vectorLayer.getSource());
    newLayer.setVisible(visible);
    newLayer.setOpacity(opacity);
    newLayer.setMinZoom(minzoom);
    newLayer.setMaxZoom(maxzoom);

    service.updateLayerByKey({ key: 'id', value: 'ID-vector' }, newLayer, 'layers');

    const _vectorLayer = service.getLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers');
    expect(_vectorLayer.getVisible()).toBe(visible);
    expect(_vectorLayer.getOpacity()).toBe(opacity);
    expect(_vectorLayer.getMinZoom()).toBe(minzoom);
    expect(_vectorLayer.getMaxZoom()).toBe(maxzoom);
  });


  /* it('should remove layers from the map', () => {
    const service: MapOlService = TestBed.get(MapOlService);
    const olObj = service.createMap();
    // service.addLayer(rasterLayer, 'baselayers');
    service.addLayer(vectorLayer, 'layers');

    //service.removeLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers');
    //olObj.map.removeLayer(vectorLayer);

    //service.setLayers([], 'layers');
    service.removeAllLayers('layers');

    //expect(service.getLayerByKey({ key: 'id', value: 'ID-raster' }, 'baselayers')).toBeTruthy();
    // expect(service.getLayers('layers')[0]).toBe(vectorLayer);
    expect(service.getLayerByKey({ key: 'id', value: 'ID-vector' }, 'layers')).toBeTruthy();
    // const mapLayers = olObj.map.getLayers().getArray();
    // console.log(mapLayers[1].getLayers().getArray());
  }); */
});