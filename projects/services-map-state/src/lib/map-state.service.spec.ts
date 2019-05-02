import { TestBed, async } from '@angular/core/testing';
import { MapStateService } from './map-state.service';
import { MapState, TGeoExtent } from './types/map-state';

describe('MapStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapStateService = TestBed.get(MapStateService);
    expect(service).toBeTruthy();
  });


  it('should get the MapState', async(() => {
    const service: MapStateService = TestBed.get(MapStateService);
    service.getMapState().subscribe((state) => {
      expect(state.center.lat).toEqual(0)
      expect(state.center.lon).toEqual(0)
      expect(state.zoom).toEqual(12)
    })
  }));


  it('should set the MapState', async(() => {
    const service: MapStateService = TestBed.get(MapStateService);
    const state = new MapState(4, { lat: 48, lon: 11 });

    service.setMapState(state)
    service.getMapState().subscribe((state) => {
      expect(state.center.lat).toEqual(48)
      expect(state.center.lon).toEqual(11)
      expect(state.zoom).toEqual(4)
    })
  }));


  it('should get the current Extent', async(() => {
    const service: MapStateService = TestBed.get(MapStateService);

    service.getExtent().subscribe((extent) => {
      expect(extent[0]).toEqual(-180)
      expect(extent[1]).toEqual(-90)
      expect(extent[2]).toEqual(180)
      expect(extent[3]).toEqual(90)
    })
  }));

  it('should set the current Extent', async(() => {
    const service: MapStateService = TestBed.get(MapStateService);
    const extent: TGeoExtent = [-10, -10, 10, 10];

    service.setExtent(extent);
    service.getExtent().subscribe((extent) => {
      expect(extent[0]).toEqual(-10)
      expect(extent[1]).toEqual(-10)
      expect(extent[2]).toEqual(10)
      expect(extent[3]).toEqual(10)
    })
  }));
});

