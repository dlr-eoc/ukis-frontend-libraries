import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapMaplibreComponent } from './map-maplibre.component';

describe('MapMaplibreComponent', () => {
  let component: MapMaplibreComponent;
  let fixture: ComponentFixture<MapMaplibreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapMaplibreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapMaplibreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
