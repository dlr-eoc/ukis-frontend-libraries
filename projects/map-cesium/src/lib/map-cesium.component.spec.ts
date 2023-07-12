import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCesiumComponent } from './map-cesium.component';

describe('MapCesiumComponent', () => {
  let component: MapCesiumComponent;
  let fixture: ComponentFixture<MapCesiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapCesiumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapCesiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
