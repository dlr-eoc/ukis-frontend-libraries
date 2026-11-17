import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VtileLayerAction } from './vtile-layer-action';
import { LayersService, VectorLayer } from '@dlr-eoc/services-layers';

describe('VtileLayerAction', () => {
  let component: VtileLayerAction;
  let fixture: ComponentFixture<VtileLayerAction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VtileLayerAction],
    }).compileComponents();

    fixture = TestBed.createComponent(VtileLayerAction);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('layer', new VectorLayer({
      id: 'test',
      type: 'geojson',
      name: 'test',
      data: {}
    }));
    
    fixture.componentRef.setInput('layersSvc', new LayersService());
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
