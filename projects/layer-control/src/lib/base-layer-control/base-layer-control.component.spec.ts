import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseLayerControlComponent } from './base-layer-control.component';
import { ReversePipe } from '../utils/array-reverse.pipe';
import { LayersService } from '@dlr-eoc/services-layers';


import { MapStateService } from '@dlr-eoc/services-map-state';
import { Component, Input } from '@angular/core';
import { of } from 'rxjs';
import { RasterLayer } from '@dlr-eoc/services-layers';
import { LayerGroup } from '@dlr-eoc/services-layers';

/**
 * this service extends the LayersService to mimik its behaviour. The getLayerGroups function is overwritten to
 * get test data for following tests.
 */
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



describe('BaseLayerControlComponent', () => {
  let component: BaseLayerControlComponent;
  let fixture: ComponentFixture<BaseLayerControlComponent>;
  let layersSvc: LayersService;
  let mapStateSvc: MapStateService;

  beforeEach(async(() => {


    TestBed.configureTestingModule({
      declarations: [BaseLayerControlComponent, ReversePipe, MockLayerentryGroupComponent, MockLayerentryComponent],
      providers: [
        { provide: LayersService, useClass: MockLayersService },
        MapStateService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseLayerControlComponent);
    component = fixture.componentInstance;
    layersSvc = new MockLayersService(); // TestBed.get(MockLayersService);
    mapStateSvc = TestBed.get(MapStateService);

    // as we use directive @Input and do not inject the service, we need to instantiate a service here.
    component.layersSvc = layersSvc;
    component.mapStateSvc = mapStateSvc;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have input layersSvc', () => {
    expect(component.layersSvc instanceof LayersService).toBeTruthy();
  });

  it('should have input mapStateSvc', () => {
    expect(component.mapStateSvc instanceof MapStateService).toBeTruthy();
  });

  it('should have 1 children of ukis-layerentry-group', () => {
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement.querySelectorAll('ukis-layerentry-group');
    expect(element.length).toEqual(1);

  });

  it('should have 0 children of ukis-layerentry', () => {
    fixture.detectChanges();

    const element = fixture.debugElement.nativeElement.querySelectorAll('ukis-layerentry');
    expect(element.length).toEqual(0);

  });
});

/**
 * to make testing easier, and only test base-layer-control use a Mock of LayerentryComponent
 * and give its selector
 */
@Component({
  selector: 'ukis-layerentry',
  template: ''
})
class MockLayerentryComponent {
  @Input('layersSvc') layersSvc: LayersService;
  @Input('mapState') mapState?: MapStateService;
  @Input('layer') layer;

  @Input('group') group?;
  @Input('layerGroups') layerGroups?;
  @Input('expanded') openProperties = false;
  @Input('expandable') expandable = true;
}


/**
 * to make testing easier, and only test base-layer-control use a Mock of LayerentryGroupComponent
 * and give its selector
 */
@Component({
  selector: 'ukis-layerentry-group',
  template: ''
})
class MockLayerentryGroupComponent {

  @Input('layersSvc') layersSvc: LayersService;
  @Input('mapState') mapState?: MapStateService;
  @Input('group') group;
  @Input('layerGroups') layerGroups;
}
