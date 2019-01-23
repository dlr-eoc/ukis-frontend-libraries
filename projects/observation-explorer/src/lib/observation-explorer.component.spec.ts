import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservationExplorerModule } from './observation-explorer.module';
import { ObservationExplorerComponent } from './observation-explorer.component';
import { IOwsResource } from '@ukis/datatypes-owc-json';
import { Layer, LayerGroup } from '@ukis/datatypes-layers';

describe('ObservationExplorerComponent', () => {
  let component: ObservationExplorerComponent;
  let fixture: ComponentFixture<ObservationExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ObservationExplorerModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationExplorerComponent);
    component = fixture.componentInstance;

    let layer = new Layer({
      type: 'wms',
      name: 'test layer',
      id: 'test_layer'
    })

    let group = new LayerGroup({
      filtertype: 'Overlays',
      id: 'Overlays_group',
      name: 'Overlays',
      layers: [layer]

    })
    //component.layergroups = [group]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
