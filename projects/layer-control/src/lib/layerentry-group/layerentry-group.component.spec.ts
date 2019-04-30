import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerentryGroupComponent } from './layerentry-group.component';
import { LayerentryComponent } from '../layerentry/layerentry.component';

import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { Layer, LayerGroup } from '@ukis/services-layers';

import { ReversePipe } from '../array-reverse.pipe';

describe('LayerentryGroupComponent', () => {
  let component: LayerentryGroupComponent;
  let fixture: ComponentFixture<LayerentryGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule],
      declarations: [LayerentryGroupComponent, LayerentryComponent, ReversePipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerentryGroupComponent);
    component = fixture.componentInstance;

    let layer = new Layer({
      type: 'wms',
      name: 'test layer',
      id: 'test_layer'
    })

    component.group = new LayerGroup({
      filtertype: 'Overlays',
      id: 'Overlays_group',
      name: 'Overlays',
      layers: [layer]

    })

    component.layerGroups = [component.group];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
