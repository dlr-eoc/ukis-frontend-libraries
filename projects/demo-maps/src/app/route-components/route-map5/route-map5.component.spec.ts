import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteMap5Component } from './route-map5.component';

describe('RouteMap5Component', () => {
  let component: RouteMap5Component;
  let fixture: ComponentFixture<RouteMap5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteMap5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteMap5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
