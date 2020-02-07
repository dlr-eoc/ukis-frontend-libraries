import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapNavigatorComponent } from './map-navigator.component';

describe('MapNavigatorComponent', () => {
  let component: MapNavigatorComponent;
  let fixture: ComponentFixture<MapNavigatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapNavigatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
