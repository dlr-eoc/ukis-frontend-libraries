import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MapOlComponent } from './map-ol.component';
import { LayersService, VectorLayer, WmtsLayer } from '@dlr-eoc/services-layers';
import { RasterLayer } from '@dlr-eoc/services-layers';
import { LayerGroup, CustomLayer } from '@dlr-eoc/services-layers';
import { OsmTileLayer } from '@dlr-eoc/base-layers-raster';
import { of } from 'rxjs';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { ApplicationRef, Component, Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import testFeatureData from '../assets/testFeatureCollection.json';
import olVectorLayer from 'ol/layer/Vector';
import olTileLayer from 'ol/layer/Tile';
import olLayerGroup from 'ol/layer/Group';
import olVectorSource from 'ol/source/Vector';
import olTileSource from 'ol/source/Tile';
import olGeometry from 'ol/geom/Geometry';
import olGeoJSON from 'ol/format/GeoJSON';
import { MapOlService } from './map-ol.service';

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
  template: `<div>{{ data | json }}</div>`
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


describe('MapOlComponent', () => {
  let component: MapOlComponent;
  let fixture: ComponentFixture<MapOlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MapOlComponent, InstrumentedMockPopupComponent],
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
    expect(component.layersSvc.getLayerById(vectorLayer.id)).toBeTruthy();
    // layer has but one feature
    expect((component.layersSvc.getLayerById(vectorLayer.id) as VectorLayer).data.features.length).toEqual(1);

    // layer is present on map
    const layer = component.map.getLayers().getArray()[1].getLayersArray()[0] as olVectorLayer<olVectorSource<olGeometry>>;
    expect(layer).toBeTruthy();
    expect(layer.getProperties()['id']).toEqual(vectorLayer.id);
    expect(layer.getSource().getFeatures().length).toEqual(1);

    // updating data
    vectorLayer.data = testFeatureData;
    // the layers new data has *not yet* been passed through to the ol-layer.
    // this ensures that there is no spooky-action-at-a-distance.
    expect(layer.getSource().getFeatures().length).toEqual(1);

    component.layersSvc.updateLayer(vectorLayer);
    // now, after calling `updateLayer`, the data is present on the ol-layer
    expect((component.map.getLayers().getArray()[1].getLayersArray()[0] as olVectorLayer<olVectorSource<olGeometry>>).getSource().getFeatures().length).toEqual(4);
  });

  it('should use the correct z-index for Ukis-custom-layers even if they contain an olLayerGroup', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    service.createMap();


    const osmLayer = new OsmTileLayer();
    component.layersSvc.addLayer(osmLayer, 'Baselayers');
    const baseLayer = new VectorLayer({
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
    component.layersSvc.addLayer(baseLayer, 'Layers');

    const layer1 = new olVectorLayer({
      source: new olVectorSource({
        features: new olGeoJSON({
          dataProjection: 'EPSG:4326',
          featureProjection: service.EPSG
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
          featureProjection: service.EPSG
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

    const ukisLayer = new CustomLayer({
      custom_layer: layerGroup,
      id: 'olGroupLayer',
      name: 'Ol-Group Layer',
      filtertype: 'Layers',
      visible: true
    });

    component.layersSvc.addLayer(ukisLayer, 'Layers');

    const lowLayer = service.getLayerByKey({ key: 'id', value: baseLayer.id });
    const higherLayer = service.getLayerByKey({ key: 'id', value: 'olGroupLayer' });
    const higherLayersChild = higherLayer.getLayersArray()[0];

    expect(lowLayer.getZIndex()).toBeDefined();
    expect(higherLayer.getZIndex()).toBeDefined();
    expect(higherLayersChild.getZIndex()).toBeDefined();
    expect(lowLayer.getZIndex() <= higherLayer.getZIndex()).toBeTrue();
    expect(lowLayer.getZIndex() <= higherLayersChild.getZIndex()).toBeTrue();
    expect(higherLayer.getZIndex() <= higherLayersChild.getZIndex()).toBeTrue();
  });

  /**
   * This test is executed in map-ol.component instead of map-ol.service
   * because here we're guaranteed that the map-div does exist
   * and is part of a change-detected angular-component-tree.
   */
  it('should rebuild dynamic popups with each click', () => {
    const service: MapOlService = TestBed.inject(MapOlService);
    const appRef = TestBed.inject(ApplicationRef) as ApplicationRef;
    service.createMap();


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
    service.layer_on_click({
      coordinate: [991316.4996485114, 6165355.908612549],
      dragging: false,
      frameState: {
        animate: false,
        size: [1568, 897],
      },
      map: service.map,
      target: service.map,
      type: 'click',
      pixel: [825.7376098632812, 231.36881256103516]
    } as any, olWmtsLayer);

    // components are only created on angular.tick
    appRef.tick();

    // click 1
    service.layer_on_click({
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
    } as any, olWmtsLayer);

    // components are only created on angular.tick
    appRef.tick();

    expect(counters[0].created).toEqual(1);
    expect(counters[0].destroyed).toEqual(1);
    expect(counters[1].created).toEqual(1);
    expect(counters[1].destroyed).toEqual(0);
  });
});
