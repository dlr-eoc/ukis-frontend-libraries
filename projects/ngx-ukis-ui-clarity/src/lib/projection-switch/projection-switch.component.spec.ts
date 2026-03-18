import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProjectionSwitchComponent } from './projection-switch.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { MapOlService } from '@dlr-eoc/map-ol';
import { MapStateService } from '@dlr-eoc/services-map-state';

describe('ProjectionSwitchComponent', () => {
  let component: ProjectionSwitchComponent;
  let fixture: ComponentFixture<ProjectionSwitchComponent>;
  let mapSvc: MapOlService;
  let mapStateSvc: MapStateService;
  const projList: any[] = [];


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule, ProjectionSwitchComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionSwitchComponent);
    component = fixture.componentInstance;
    mapSvc = TestBed.inject(MapOlService);
    mapStateSvc = TestBed.inject(MapStateService);
    component.mapState = mapStateSvc;
    component.mapSvc = mapSvc;
    component.projList = projList;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
