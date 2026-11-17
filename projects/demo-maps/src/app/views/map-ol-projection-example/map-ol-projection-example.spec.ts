import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapOlProjectionExample } from './map-ol-projection-example';

describe('MapOlProjectionExample', () => {
  let component: MapOlProjectionExample;
  let fixture: ComponentFixture<MapOlProjectionExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapOlProjectionExample],
    }).compileComponents();

    fixture = TestBed.createComponent(MapOlProjectionExample);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
