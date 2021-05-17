import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MapOlComponent } from './map-ol.component';
import { LayersService, VectorLayer } from '@dlr-eoc/services-layers';
import { RasterLayer } from '@dlr-eoc/services-layers';
import { LayerGroup, CustomLayer } from '@dlr-eoc/services-layers';
import { OsmTileLayer } from '@dlr-eoc/base-layers-raster';
import { of } from 'rxjs';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { Injectable } from '@angular/core';
import testFeatureData from '../assets/testFeatureCollection.json';
import olVectorLayer from 'ol/layer/Vector';
import olLayerGroup from 'ol/layer/Group';
import olVectorSource from 'ol/source/Vector';
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


describe('MapOlComponent', () => {
  let component: MapOlComponent;
  let fixture: ComponentFixture<MapOlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MapOlComponent],
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
    const layer = component.map.getLayers().getArray()[1].getLayersArray()[0] as olVectorLayer;
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
    expect((component.map.getLayers().getArray()[1].getLayersArray()[0] as olVectorLayer).getSource().getFeatures().length).toEqual(4);
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

    const lowLayer = service.getLayerByKey({key: 'id', value: baseLayer.id});
    const higherLayer = service.getLayerByKey({key: 'id', value: 'olGroupLayer'});
    const higherLayersChild = higherLayer.getLayersArray()[0];

    expect(lowLayer.getZIndex()).toBeDefined();
    expect(higherLayer.getZIndex()).toBeDefined();
    expect(higherLayersChild.getZIndex()).toBeDefined();
    expect(lowLayer.getZIndex() <= higherLayer.getZIndex()).toBeTrue();
    expect(lowLayer.getZIndex() <= higherLayersChild.getZIndex()).toBeTrue();
    expect(higherLayer.getZIndex() <= higherLayersChild.getZIndex()).toBeTrue();
  });
});
