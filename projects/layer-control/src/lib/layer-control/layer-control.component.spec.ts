import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerControlComponent } from '../layer-control/layer-control.component';

import { LayerentryGroupComponent } from '../layerentry-group/layerentry-group.component';
import { LayerentryComponent } from '../layerentry/layerentry.component';

import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
// import { Layer, LayerGroup } from '@dlr-eoc/services-layers';
import { ObjTypePipe, ItemsFilterPipe } from '../utils/obj-type.pipe';
import { LayersService } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { ReversePipe } from '../utils/array-reverse.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';

describe('LayerControlComponent', () => {
  let component: LayerControlComponent;
  let fixture: ComponentFixture<LayerControlComponent>;
  let layersSvc: LayersService;
  let mapStateSvc: MapStateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule, DragDropModule],
      declarations: [LayerControlComponent, LayerentryGroupComponent, LayerentryComponent, ObjTypePipe, ReversePipe, ItemsFilterPipe],
      providers: [LayersService, MapStateService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerControlComponent);
    component = fixture.componentInstance;
    layersSvc = TestBed.inject(LayersService);
    mapStateSvc = TestBed.inject(MapStateService);

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

  it('should have input layerfilter', () => {
    component.layerfilter = 'Layers';
    expect(component.layerfilter).toBe('Layers');
  });

});
