import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOlComponent } from './map-ol.component';
import { LayersService, VectorLayer } from '@dlr-eoc/services-layers';
import { RasterLayer } from '@dlr-eoc/services-layers';
import { LayerGroup } from '@dlr-eoc/services-layers';
import { of } from 'rxjs';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { Injectable } from '@angular/core';
import testFeatureData from '../assets/testFeatureCollection.json';
import olVectorLayer from 'ol/layer/Vector';

/**
 * this service extends the LayersService to mimik its behaviour. The getLayerGroups function is overwritten to
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapOlComponent],
      providers: [
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
});
