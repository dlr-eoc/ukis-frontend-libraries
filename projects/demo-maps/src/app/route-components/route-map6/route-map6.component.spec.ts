import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteMap6Component } from './route-map6.component';

describe('RouteMap6Component', () => {
  let component: RouteMap6Component;
  let fixture: ComponentFixture<RouteMap6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteMap6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteMap6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
