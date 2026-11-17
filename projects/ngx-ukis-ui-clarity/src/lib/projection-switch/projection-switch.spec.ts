import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionSwitchComponent } from './projection-switch';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { MapOlService } from '@dlr-eoc/map-ol';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { vi } from 'vitest';
import { MockResizeObserver } from '@dlr-eoc/shared-assets/testing';

vi.stubGlobal('ResizeObserver', MockResizeObserver);

describe('ProjectionSwitchComponent', () => {
  let component: ProjectionSwitchComponent;
  let fixture: ComponentFixture<ProjectionSwitchComponent>;
  let mapSvc: MapOlService;
  let mapStateSvc: MapStateService;
  const projList: any[] = [];


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule, ProjectionSwitchComponent]
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ProjectionSwitchComponent);
    component = fixture.componentInstance;
    mapSvc = TestBed.inject(MapOlService);
    mapStateSvc = TestBed.inject(MapStateService);
    component.mapState = mapStateSvc;
    component.mapSvc = mapSvc;
    component.projList = projList;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
