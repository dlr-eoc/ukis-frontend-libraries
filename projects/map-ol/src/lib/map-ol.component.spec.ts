import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MapOlComponent } from './map-ol.component';
import { LayersService, VectorLayer, WmtsLayer } from '@dlr-eoc/services-layers';
import { RasterLayer } from '@dlr-eoc/services-layers';
import { LayerGroup, CustomLayer } from '@dlr-eoc/services-layers';
import { EocBasemapTile, OsmTileLayer } from '@dlr-eoc/base-layers-raster';
import { of } from 'rxjs';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { Component, Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import testFeatureData from '@dlr-eoc/shared-assets/geojson/testFeatureCollection.json';
import olVectorLayer from 'ol/layer/Vector';
import olTileLayer from 'ol/layer/Tile';
import olLayerGroup from 'ol/layer/Group';
import olVectorSource from 'ol/source/Vector';
import olTileSource from 'ol/source/Tile';
import olGeoJSON from 'ol/format/GeoJSON';
import olMap from 'ol/Map';
import olMapBrowserEvent from 'ol/MapBrowserEvent';
import { MapOlService } from './map-ol.service';
import { CommonModule } from '@angular/common';
import VectorSource from 'ol/source/Vector';

/**
 * this service extends the LayersService to mimic its behavior. The getLayerGroups function is overwritten to
 * get test data for following tests.
 */
@Injectable()
class MockLayersService extends LayersService {

  getLayerGroups() {
    const l = new RasterLayer(
      {
        url: 'blabl',
        name: 'name',
        id: '5',
        type: 'wms',
        filtertype: 'Baselayers'
      }
    );
    const group = new LayerGroup({
      id: 'g',
      name: 'Test',
      layers: [l],
      filtertype: 'Baselayers'
    });
    return of([group]);
  }
}


let instrumentedMockupCompId = 0;
@Component({
    selector: 'app-mock-popup',
    template: `<div>{{ data | json }}</div>`,
    imports: [CommonModule]
})
class InstrumentedMockPopupComponent implements OnInit, OnDestroy {
  @Input() initCallback: (id: number) => void;
  @Input() destroyCallback: (id: number) => void;
  private id: number;

  constructor() {
    this.id = instrumentedMockupCompId;
    instrumentedMockupCompId++;
  }

  ngOnInit(): void {
    this.initCallback(this.id);
  }

  ngOnDestroy(): void {
    this.destroyCallback(this.id);
  }
}

function addSomeLayers(component: MapOlComponent, mapSvc: MapOlService) {
  const osmLayer = new OsmTileLayer();
  const EocBasemap = new EocBasemapTile();
  const baseLayers = [osmLayer, EocBasemap];
  baseLayers.forEach(l => {
    component.layersSvc.addLayer(l, 'Baselayers');
  });

  //-----------------------------------------------

  const testVector = new VectorLayer({
    id: 'vectorLayer',
    name: 'vectorLayer',
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [11.71142578125, 46.5739667965278]
        }
      }]
    }
  });


  const layer1 = new olVectorLayer({
    source: new olVectorSource({
      features: new olGeoJSON({
        dataProjection: 'EPSG:4326',
        featureProjection: mapSvc.EPSG
      }).readFeatures({
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                10.37109375,
                50.064191736659104
              ]
            }
          },
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                11.997070312499998,
                50.064191736659104
              ]
            }
          }
        ]
      })
    })
  });
  const layer2 = new olVectorLayer({
    source: new olVectorSource({
      features: new olGeoJSON({
        dataProjection: 'EPSG:4326',
        featureProjection: mapSvc.EPSG
      }).readFeatures({
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": [
                [
                  8.67919921875,
                  49.167338606291075
                ],
                [
                  10.458984375,
                  48.4146186174932
                ],
                [
                  11.997070312499998,
                  48.4146186174932
                ],
                [
                  13.24951171875,
                  48.821332549646634
                ],
                [
                  13.7109375,
                  49.396675075193976
                ]
              ]
            }
          }
        ]
      })
    })
  });

  const layerGroup = new olLayerGroup({
    layers: [layer1, layer2]
  });

  const ukisOlLayerGroup = new CustomLayer({
    custom_layer: layerGroup,
    id: 'olGroupLayer',
    name: 'Ol-Group Layer',
    filtertype: 'Layers',
    visible: true
  });


  const layer1_2 = new olVectorLayer({
    source: new olVectorSource({
      features: new olGeoJSON({
        dataProjection: 'EPSG:4326',
        featureProjection: mapSvc.EPSG
      }).readFeatures({
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                10.37109375,
                50.064191736659104
              ]
            }
          },
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                11.997070312499998,
                50.064191736659104
              ]
            }
          }
        ]
      })
    })
  });
  const layer2_2 = new olVectorLayer({
    source: new olVectorSource({
      features: new olGeoJSON({
        dataProjection: 'EPSG:4326',
        featureProjection: mapSvc.EPSG
      }).readFeatures({
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": [
                [
                  8.67919921875,
                  49.167338606291075
                ],
                [
                  10.458984375,
                  48.4146186174932
                ],
                [
                  11.997070312499998,
                  48.4146186174932
                ],
                [
                  13.24951171875,
                  48.821332549646634
                ],
                [
                  13.7109375,
                  49.396675075193976
                ]
              ]
            }
          }
        ]
      })
    })
  });
  const layerGroup2 = new olLayerGroup({
    layers: [layer1_2, layer2_2]
  });
  const ukisOlLayerGroup2 = new CustomLayer({
    custom_layer: layerGroup2,
    id: 'olGroupLayer2',
    name: 'Ol-Group Layer 2',
    filtertype: 'Layers',
    visible: true
  });
  let layers = [testVector, ukisOlLayerGroup, ukisOlLayerGroup2];
  layers.forEach(l => {
    component.layersSvc.addLayer(l, 'Layers');
  });

  return {
    osmLayer,
    EocBasemap,
    testVector,
    ukisOlLayerGroup,
    ukisOlLayerGroup2
  };
}


describe('MapOlComponent', () => {
  let component: MapOlComponent;
  let fixture: ComponentFixture<MapOlComponent>;
  let mapSvc: MapOlService;
  const mapSize = [600, 600];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [MapOlComponent, InstrumentedMockPopupComponent],
    providers: [
        MapOlService,
        { provide: LayersService, useClass: MockLayersService },
        { provide: MapStateService, useClass: MapStateService }
    ]
})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOlComponent);
    component = fixture.componentInstance;
    component.layersSvc = new MockLayersService();
    component.mapStateSvc = new MapStateService();
    mapSvc = TestBed.inject(MapOlService);
    fixture.detectChanges();
    component.map.setSize(mapSize);
    component.map.renderSync();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a map and the map should be the same as from the mapSvc', () => {
    expect(component.map instanceof olMap).toBeTruthy();
    expect(component.map === mapSvc.map).toBeTruthy();
  });

  it('should have a map Size', () => {
    expect(component.map.getSize()).toEqual(mapSize);
  });

  it('should set mapstate rotation', () => {
    //set rotation to 90°
    component.mapStateSvc.setRotation(90);
    expect(mapSvc.getRotation()).toEqual(90);
  });

  it('should have a three olLayerGroups', () => {
    expect(component.map.getLayers().getLength()).toEqual(3);
    expect(mapSvc.getLayerGroups().length).toEqual(3);
  });

  it('should add layers', () => {
    let { osmLayer, EocBasemap, testVector, ukisOlLayerGroup, ukisOlLayerGroup2 } = addSomeLayers(component, mapSvc);
    const baseLayers = [osmLayer, EocBasemap];
    const layers = [testVector, ukisOlLayerGroup, ukisOlLayerGroup2]

    expect(component.map.getAllLayers().length).toEqual(7);
    expect(mapSvc.getLayers('Baselayers').length).toEqual(baseLayers.length);


    expect(mapSvc.getLayers('Layers').length).toEqual(layers.length);

    // group with two layers
    const groupFromMap1 = mapSvc.getLayers('Layers')[1] as olLayerGroup;
    expect(groupFromMap1.getLayers().getLength()).toEqual(2);
    const groupFromMap2 = mapSvc.getLayers('Layers')[2] as olLayerGroup;
    expect(groupFromMap2.getLayers().getLength()).toEqual(2);
  });

  it('should update a vector-layer', () => {
    const vectorLayer = new VectorLayer({
      id: 'vectorLayer',
      name: 'vectorLayer',
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [11.71142578125, 46.5739667965278]
          }
        }]
      }
    });
    component.layersSvc.addLayer(vectorLayer, 'Layers');

    // layer has been added successfully
    const layerFromService = component.layersSvc.getLayerById(vectorLayer.id) as VectorLayer;
    expect(layerFromService).toBeTruthy();
    // layer has but one feature
    expect(layerFromService.data.features.length).toEqual(1);

    // layer is present on map
    const layerFromMap = mapSvc.getLayerByKey({ key: 'id', value: vectorLayer.id }) as olVectorLayer<VectorSource>;
    expect(layerFromMap).toBeTruthy();
    expect(layerFromMap.getProperties()['id']).toEqual(vectorLayer.id);
    expect(layerFromMap.getSource().getFeatures().length).toEqual(1);

    // updating data
    vectorLayer.data = testFeatureData;
    // the layers new data has *not yet* been passed through to the ol-layer.
    // this ensures that there is no spooky-action-at-a-distance.
    expect(layerFromMap.getSource().getFeatures().length).toEqual(1);

    component.layersSvc.updateLayer(vectorLayer);
    // now, after calling `updateLayer`, the data is present on the ol-layer
    expect((component.map.getLayers().getArray()[1].getLayersArray()[0] as olVectorLayer<VectorSource>).getSource().getFeatures().length).toEqual(4);
  });

  it('should use the correct z-index for Ukis-custom-layers even if they contain an olLayerGroup', () => {
    let { osmLayer, EocBasemap, testVector, ukisOlLayerGroup, ukisOlLayerGroup2 } = addSomeLayers(component, mapSvc);

    const osmFromMap = mapSvc.getLayerByKey({ key: 'id', value: osmLayer.id });
    const eocFromMap = mapSvc.getLayerByKey({ key: 'id', value: EocBasemap.id });
    const testVectorFromMap = mapSvc.getLayerByKey({ key: 'id', value: testVector.id });
    const group1FromMap = mapSvc.getLayerByKey({ key: 'id', value: ukisOlLayerGroup.id }) as olLayerGroup;
    const group2FromMap = mapSvc.getLayerByKey({ key: 'id', value: ukisOlLayerGroup2.id }) as olLayerGroup;

    expect(osmFromMap.getZIndex()).toBe(0);
    expect(eocFromMap.getZIndex()).toBe(1);
    expect(testVectorFromMap.getZIndex()).toBe(2);
    expect(group1FromMap.getZIndex()).toBe(3);

    // the ZIndex of olLayerGroup layers is set to the same as the group
    // This is also done in olLayerGroup [getLayerStatesArray](https://github.com/openlayers/openlayers/blob/v7.1.0/src/ol/layer/Group.js#L288-L289) if not set
    group1FromMap.getLayers().forEach(l => {
      expect(l.getZIndex()).toBe(3);
    });

    expect(group2FromMap.getZIndex()).toBe(4);
    group2FromMap.getLayers().forEach(l => {
      expect(l.getZIndex()).toBe(4);
    })
  });

  it('should resort layers - set z-index and layer position', () => {
    let { osmLayer, EocBasemap, testVector, ukisOlLayerGroup, ukisOlLayerGroup2 } = addSomeLayers(component, mapSvc);

    const layers = [ukisOlLayerGroup, testVector, ukisOlLayerGroup2];

    // trigger update of layers
    component['addUpdateLayers'](layers, 'layers', ['baselayers']);

    const osmFromMap = mapSvc.getLayerByKey({ key: 'id', value: osmLayer.id });
    const eocFromMap = mapSvc.getLayerByKey({ key: 'id', value: EocBasemap.id });
    const testVectorFromMap = mapSvc.getLayerByKey({ key: 'id', value: testVector.id });
    const group1FromMap = mapSvc.getLayerByKey({ key: 'id', value: ukisOlLayerGroup.id }) as olLayerGroup;
    const group2FromMap = mapSvc.getLayerByKey({ key: 'id', value: ukisOlLayerGroup2.id }) as olLayerGroup;

    const updatedLaersFromMap = mapSvc.map.getAllLayers();


    expect(osmFromMap.getZIndex()).toBe(0);
    expect(updatedLaersFromMap[0].get('id')).toBe(osmLayer.id);


    expect(eocFromMap.getZIndex()).toBe(1);
    expect(updatedLaersFromMap[1].get('id')).toBe(EocBasemap.id);


    expect(group1FromMap.getZIndex()).toBe(2);
    expect(updatedLaersFromMap[2].get('id')).toBe(group1FromMap.getLayers().getArray()[0].get('id'));
    expect(updatedLaersFromMap[3].get('id')).toBe(group1FromMap.getLayers().getArray()[1].get('id'));


    expect(testVectorFromMap.getZIndex()).toBe(3);
    expect(updatedLaersFromMap[4].get('id')).toBe(testVector.id);


    expect(group2FromMap.getZIndex()).toBe(4);
    expect(updatedLaersFromMap[5].get('id')).toBe(group2FromMap.getLayers().getArray()[0].get('id'));
    expect(updatedLaersFromMap[6].get('id')).toBe(group2FromMap.getLayers().getArray()[1].get('id'));
  });

  /**
   * This test is executed in map-ol.component instead of map-ol.service
   * because here we're guaranteed that the map-div does exist
   * and is part of a change-detected angular-component-tree.
   */
  it('should rebuild dynamic popups with each click', () => {
    const service: MapOlService = TestBed.inject(MapOlService);

    // adding a layer with a dynamic popup
    const ukisWmtsLayer = new WmtsLayer({
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
          matrixSet: 'EPSG:3857',
          tileMatrixPrefix: 'EPSG:3857',
        }
      },
      popup: {
        dynamicPopup: {
          component: InstrumentedMockPopupComponent,
          getAttributes: (args: any) => ({
            initCallback: (id: number) => counters[id].created += 1,
            destroyCallback: (id: number) => counters[id].destroyed += 1,
          })
        }
      }
    });
    service.setUkisLayer(ukisWmtsLayer, 'Layers');
    const olWmtsLayer = service.getLayerByKey({ key: 'id', value: 'ID-ukis-wmts' }) as olTileLayer<olTileSource>;

    // this data-structure keeps track of the state of the dynamic components
    // that are being created inside popups
    const counters = [{
      created: 0,
      destroyed: 0
    }, {
      created: 0,
      destroyed: 0
    }];

    // click 0
    service.layerOnEvent({
      coordinate: [991316.4996485114, 6165355.908612549],
      originalEvent: null,
      dragging: false,
      frameState: {
        animate: false,
        size: [1568, 897],
      },
      map: service.map,
      target: service.map,
      type: 'click',
      pixel: [825.7376098632812, 231.36881256103516]
    } as olMapBrowserEvent<PointerEvent>, olWmtsLayer);

    // detect changes for dynamic components in the popup
    fixture.detectChanges();

    // click 1
    service.layerOnEvent({
      coordinate: [1312192.0073726526, 5444712.8273727745],
      dragging: false,
      frameState: {
        animate: false,
        size: [1568, 897],
      },
      map: service.map,
      target: service.map,
      type: 'click',
      pixel: [825.7376098632812, 231.36881256103516]
    } as olMapBrowserEvent<PointerEvent>, olWmtsLayer);
    // detect changes for dynamic components in the popup
    fixture.detectChanges();

    expect(counters[0].created).toEqual(1);
    expect(counters[0].destroyed).toEqual(1);
    expect(counters[1].created).toEqual(1);
    expect(counters[1].destroyed).toEqual(0);
  });
});
