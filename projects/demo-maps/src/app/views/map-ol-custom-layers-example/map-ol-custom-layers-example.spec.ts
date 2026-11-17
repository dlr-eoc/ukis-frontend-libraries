import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapOlCustomLayersExample } from './map-ol-custom-layers-example';

describe('MapOlCustomLayersExample', () => {
  let component: MapOlCustomLayersExample;
  let fixture: ComponentFixture<MapOlCustomLayersExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapOlCustomLayersExample],
    }).compileComponents();

    fixture = TestBed.createComponent(MapOlCustomLayersExample);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
