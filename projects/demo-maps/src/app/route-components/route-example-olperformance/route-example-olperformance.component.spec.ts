import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteExampleOlperformanceComponent } from './route-example-olperformance.component';

describe('RouteExampleOlperformanceComponent', () => {
  let component: RouteExampleOlperformanceComponent;
  let fixture: ComponentFixture<RouteExampleOlperformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteExampleOlperformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteExampleOlperformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
