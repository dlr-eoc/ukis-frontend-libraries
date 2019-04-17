import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseLayerControlComponent } from './base-layer-control.component';
import { ReversePipe } from '../array-reverse.pipe';
import { LayersService } from '@ukis/services-layers';


import { MapStateService } from '@ukis/services-map-state';
import { Component, Input } from '@angular/core';
import { of } from 'rxjs';
import { RasterLayer } from '@ukis/datatypes-layers/src/lib/Layers';
import { LayerentryGroupComponent } from '@ukis/layer-control/src/lib/layerentry-group/layerentry-group.component';
import { LayerGroup } from '@ukis/datatypes-layers';

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
/**
 * stub for MapStateService
 */
const mapStateSvcStub = {}



describe('BaseLayerControlComponent', () => {
  let component: BaseLayerControlComponent;
  let fixture: ComponentFixture<BaseLayerControlComponent>;

  beforeEach(async(() => {

    
    TestBed.configureTestingModule({
      declarations: [ BaseLayerControlComponent, ReversePipe, MockLayerentryGroupComponent, MockLayerentryComponent ],
      providers: [
        {provide: LayersService, useClass: MockLayersService},
        {provide: MapStateService, useValue: mapStateSvcStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseLayerControlComponent);
    component = fixture.componentInstance;
    // as we use directive @Input and do not inject the service, we need to instantiate a service here.
    component.layersSvc = new MockLayersService();
    //component.mapStateSvc = mapStateSvcStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 1 children of ukis-layerentry-group', () =>{
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement.querySelectorAll('ukis-layerentry-group');
    expect(element.length).toEqual(1);
    
  });

  it('should have 0 children of ukis-layerentry', () =>{
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
class MockLayerentryComponent{
  @Input('layersSvc') layersSvc: LayersService;
  @Input('mapState') mapState?: MapStateService;
  @Input('layer') layer;

  @Input('group') group?;
  @Input('layerGroups') layerGroups?;
  @Input('expanded') openProperties?: boolean = false;
  @Input('expandable') expandable?: boolean = true;
}


/**
 * to make testing easier, and only test base-layer-control use a Mock of LayerentryGroupComponent
 * and give its selector
 */
@Component({
  selector: 'ukis-layerentry-group', 
  template: ''
})
class MockLayerentryGroupComponent{

  @Input('layersSvc') layersSvc: LayersService;
  @Input('mapState') mapState?: MapStateService;
  @Input('group') group;
  @Input('layerGroups') layerGroups;
}