import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteMap3Component } from './route-map3.component';

describe('RouteMap3Component', () => {
  let component: RouteMap3Component;
  let fixture: ComponentFixture<RouteMap3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteMap3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteMap3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
