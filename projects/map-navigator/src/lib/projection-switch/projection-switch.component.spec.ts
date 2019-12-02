import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionSwitchComponent } from './projection-switch.component';

describe('ProjectionSwitchComponent', () => {
  let component: ProjectionSwitchComponent;
  let fixture: ComponentFixture<ProjectionSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectionSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
