import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapOlOwcLayersExample } from './map-ol-owc-layers-example';

describe('MapOlOwcLayersExample', () => {
  let component: MapOlOwcLayersExample;
  let fixture: ComponentFixture<MapOlOwcLayersExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapOlOwcLayersExample],
    }).compileComponents();

    fixture = TestBed.createComponent(MapOlOwcLayersExample);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
