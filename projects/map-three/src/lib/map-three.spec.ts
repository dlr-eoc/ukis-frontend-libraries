import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapThreeComponent } from './map-three';
import { MapOlService } from '@dlr-eoc/map-ol';

describe('MapThree', () => {
  let component: MapThreeComponent;
  let fixture: ComponentFixture<MapThreeComponent>;
  let mapOlSvc: MapOlService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapThreeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MapThreeComponent);
    mapOlSvc = TestBed.inject(MapOlService);
    component = fixture.componentInstance;

    component.mapOlSvc = mapOlSvc;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});