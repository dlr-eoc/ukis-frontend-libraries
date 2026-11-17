import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapOlPerformanceExample } from './map-ol-performance-example';

describe('MapOlPerformanceExample', () => {
  let component: MapOlPerformanceExample;
  let fixture: ComponentFixture<MapOlPerformanceExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapOlPerformanceExample],
    }).compileComponents();

    fixture = TestBed.createComponent(MapOlPerformanceExample);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
