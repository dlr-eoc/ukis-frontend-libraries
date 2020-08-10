import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerentryGroupComponent } from './layerentry-group.component';
import { LayerentryComponent } from '../layerentry/layerentry.component';

import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { Layer, LayerGroup, LayersService } from '@dlr-eoc/services-layers';

import { ReversePipe } from '../utils/array-reverse.pipe';
import { MapStateService } from '@dlr-eoc/services-map-state';

describe('LayerentryGroupComponent', () => {
  let component: LayerentryGroupComponent;
  let fixture: ComponentFixture<LayerentryGroupComponent>;
  let layersSvc: LayersService;
  let mapStateSvc: MapStateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule],
      declarations: [LayerentryGroupComponent, LayerentryComponent, ReversePipe],
      providers: [LayersService, MapStateService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerentryGroupComponent);
    component = fixture.componentInstance;
    layersSvc = TestBed.inject(LayersService);
    mapStateSvc = TestBed.inject(MapStateService);

    const layer = new Layer({
      type: 'wms',
      name: 'test layer',
      id: 'test_layer',
      expanded: true
    });

    component.group = new LayerGroup({
      filtertype: 'Overlays',
      id: 'Overlays_group',
      name: 'Overlays',
      layers: [layer]

    });
    component.layersSvc = layersSvc;
    component.mapState = mapStateSvc;
    component.layerGroups = [component.group];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have input layersSvc', () => {
    expect(component.layersSvc instanceof LayersService).toBeTruthy();
  });

  it('should have input mapState', () => {
    expect(component.mapState instanceof MapStateService).toBeTruthy();
  });

  it('should have input group', () => {
    expect(component.group instanceof LayerGroup).toBeTruthy();
  });

  it('should get openAllLayersProperties from the expanded Layers', () => {
    /** test_layer is expanded */
    expect(component.openAllLayersProperties).toBeTrue();
  });
});
