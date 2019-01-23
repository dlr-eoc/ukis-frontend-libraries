import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOlComponent } from './map-ol.component';

describe('MapOlComponent', () => {
  let component: MapOlComponent;
  let fixture: ComponentFixture<MapOlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
