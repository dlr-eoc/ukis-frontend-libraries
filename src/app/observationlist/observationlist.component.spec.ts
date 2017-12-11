import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationlistComponent } from './observationlist.component';

describe('ObservationlistComponent', () => {
  let component: ObservationlistComponent;
  let fixture: ComponentFixture<ObservationlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
