import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteMap4Component } from './route-map4.component';

describe('RouteMap4Component', () => {
  let component: RouteMap4Component;
  let fixture: ComponentFixture<RouteMap4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteMap4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteMap4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
