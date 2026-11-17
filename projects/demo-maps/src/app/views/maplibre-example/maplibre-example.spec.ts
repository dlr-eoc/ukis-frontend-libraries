import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaplibreExample } from './maplibre-example';

describe('MaplibreExample', () => {
  let component: MaplibreExample;
  let fixture: ComponentFixture<MaplibreExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaplibreExample],
    }).compileComponents();

    fixture = TestBed.createComponent(MaplibreExample);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
