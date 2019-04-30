import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteMapComponent } from './route-map.component';

describe('RouteMapComponent', () => {
  let component: RouteMapComponent;
  let fixture: ComponentFixture<RouteMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
