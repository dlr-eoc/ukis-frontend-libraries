import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapOlLayersExample } from './map-ol-layers-example';

describe('MapOlLayersExample', () => {
  let component: MapOlLayersExample;
  let fixture: ComponentFixture<MapOlLayersExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapOlLayersExample],
    }).compileComponents();

    fixture = TestBed.createComponent(MapOlLayersExample);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
