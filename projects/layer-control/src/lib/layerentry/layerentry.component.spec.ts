import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerentryComponent } from './layerentry.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { Layer, LayerGroup } from '@ukis/services-layers';
import { LayersService } from '@ukis/services-layers';

describe('LayerentryComponent', () => {
  let component: LayerentryComponent;
  let fixture: ComponentFixture<LayerentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule],
      declarations: [LayerentryComponent],
      providers: [LayersService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerentryComponent);
    component = fixture.componentInstance;
    component.layersSvc = new LayersService();
    component.layer = new Layer({
      type: 'wms',
      name: 'test layer',
      id: 'test_layer'
    })

    component.group = new LayerGroup({
      filtertype: 'Overlays',
      id: 'Overlays_group',
      name: 'Overlays',
      layers: [component.layer]

    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
