import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteMap2Component } from './route-map2.component';

describe('RouteMap2Component', () => {
  let component: RouteMap2Component;
  let fixture: ComponentFixture<RouteMap2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteMap2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteMap2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
