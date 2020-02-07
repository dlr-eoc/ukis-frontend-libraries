import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOlComponent } from './map-ol.component';
import { LayersService } from '@ukis/services-layers';
import { RasterLayer } from '@ukis/services-layers';
import { LayerGroup } from '@ukis/services-layers';
import { of } from 'rxjs';
import { MapStateService } from '@ukis/services-map-state';

/**
 * this service extends the LayersService to mimik its behaviour. The getLayerGroups function is overwritten to 
 * get test data for following tests.
 */
class MockLayersService extends LayersService {

  getLayerGroups() {
    let l = new RasterLayer(
        { url: 'blabl', 
          name: 'name', 
          id: '5',
          type: 'wms',
          filtertype: 'Baselayers'
        }
      );
    let group = new LayerGroup({
      id: 'g',
      name: 'Test',
      layers: [l],
      filtertype: 'Baselayers'
    });
    return of([ group ]);
  }
}


describe('MapOlComponent', () => {
  let component: MapOlComponent;
  let fixture: ComponentFixture<MapOlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOlComponent ],
      providers: [
        {provide: LayersService, useClass: MockLayersService},
        {provide: MapStateService, useClass: MapStateService}
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
});
