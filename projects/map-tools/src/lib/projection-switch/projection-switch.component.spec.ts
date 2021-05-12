import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProjectionSwitchComponent } from './projection-switch.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { MapOlService } from '@dlr-eoc/map-ol';

describe('ProjectionSwitchComponent', () => {
  let component: ProjectionSwitchComponent;
  let fixture: ComponentFixture<ProjectionSwitchComponent>;
  let mapSvc: MapOlService;
  const projList: any[] = [];


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule],
      declarations: [ProjectionSwitchComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionSwitchComponent);
    component = fixture.componentInstance;
    mapSvc = TestBed.inject(MapOlService);
    component.mapSvc = mapSvc;
    component.projList = projList;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
