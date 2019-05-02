import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DatasetExplorerModule } from './dataset-explorer.module';
import { DatasetExplorerComponent } from './dataset-explorer.component';
import { IOwsResource } from '@ukis/services-owc-json';
import { Layer, LayerGroup } from '@ukis/services-layers';

describe('DatasetExplorerComponent', () => {
  let component: DatasetExplorerComponent;
  let fixture: ComponentFixture<DatasetExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DatasetExplorerModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetExplorerComponent);
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

 
});
