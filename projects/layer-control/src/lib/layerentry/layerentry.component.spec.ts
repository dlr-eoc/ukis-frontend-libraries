import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerentryComponent } from './layerentry.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { Layer, LayerGroup } from '@dlr-eoc/services-layers';
import { LayersService } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';

describe('LayerentryComponent', () => {
  let component: LayerentryComponent;
  let fixture: ComponentFixture<LayerentryComponent>;
  let layersSvc: LayersService;
  let mapStateSvc: MapStateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule],
      declarations: [LayerentryComponent],
      providers: [LayersService, MapStateService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerentryComponent);
    component = fixture.componentInstance;
    layersSvc = TestBed.inject(LayersService);
    mapStateSvc = TestBed.inject(MapStateService);

    component.layer = new Layer({
      type: 'wms',
      name: 'test layer',
      id: 'test_layer'
    });

    component.group = new LayerGroup({
      filtertype: 'Overlays',
      id: 'Overlays_group',
      name: 'Overlays',
      layers: [component.layer]

    });

    component.layerGroups = [component.group];
    component.layersSvc = layersSvc;
    component.mapState = mapStateSvc;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have input layersSvc', () => {
    fixture.detectChanges();
    expect(component.layersSvc instanceof LayersService).toBeTruthy();
  });

  it('should have input mapState', () => {
    fixture.detectChanges();
    expect(component.mapState instanceof MapStateService).toBeTruthy();
  });

  it('should have input layer', () => {
    expect(component.layer instanceof Layer).toBeTruthy();
  });

  it('should have input group', () => {
    expect(component.group instanceof LayerGroup).toBeTruthy();
  });

  it('should have input layerGroups', () => {
    expect(component.layerGroups[0] instanceof LayerGroup).toBeTruthy();
  });

  it('should have input expanded', () => {
    component.expanded = true;
    fixture.detectChanges();
    expect(component.expanded).toBe(true);
  });

  it('should have input expandable', () => {
    component.expandable = true;
    fixture.detectChanges();
    expect(component.expandable).toBe(true);
  });
});
