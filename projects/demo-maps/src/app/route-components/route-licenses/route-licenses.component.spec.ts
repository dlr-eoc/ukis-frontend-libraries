import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RouteLicensesComponent } from './route-licenses.component';

describe('RouteLicensesComponent', () => {
  let component: RouteLicensesComponent;
  let fixture: ComponentFixture<RouteLicensesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteLicensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
