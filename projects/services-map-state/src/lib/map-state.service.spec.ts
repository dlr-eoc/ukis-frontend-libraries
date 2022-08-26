import { TestBed, waitForAsync } from '@angular/core/testing';
import { MapStateService } from './map-state.service';
import { MapState, TGeoExtent, IMapState } from './types/map-state';

describe('MapStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapStateService = TestBed.inject(MapStateService);
    expect(service).toBeTruthy();
  });


  it('should get the initial MapState', waitForAsync(() => {
    const service: MapStateService = TestBed.inject(MapStateService);
    service.getMapState().subscribe((state) => {
      expect(state.center.lat).toEqual(0);
      expect(state.center.lon).toEqual(0);
      expect(state.zoom).toEqual(0);
    });
  }));


  it('should set/get the MapState', waitForAsync(() => {
    const service: MapStateService = TestBed.inject(MapStateService);
    const stateTime = new Date().toISOString(); // this is passed on new MapState()
    const state = new MapState(4, { lat: 48, lon: 11 });


    service.setMapState(state);
    service.getMapState().subscribe((sta) => {
      expect(sta.center.lat).toEqual(48);
      expect(sta.center.lon).toEqual(11);
      expect(sta.zoom).toEqual(4);
      expect(sta.time).toEqual(stateTime);
    });
  }));


  it('should get the initial Extent', waitForAsync(() => {
    const service: MapStateService = TestBed.inject(MapStateService);
    service.getExtent().subscribe((ext) => {
      expect(ext[0]).toEqual(-180);
      expect(ext[1]).toEqual(-90);
      expect(ext[2]).toEqual(180);
      expect(ext[3]).toEqual(90);
    });
  }));

  it('should set/get the current Extent', waitForAsync(() => {
    const service: MapStateService = TestBed.inject(MapStateService);
    const extent: TGeoExtent = [-10, -10, 10, 10];

    service.setExtent(extent);
    service.getExtent().subscribe((ext) => {
      expect(ext[0]).toEqual(-10);
      expect(ext[1]).toEqual(-10);
      expect(ext[2]).toEqual(10);
      expect(ext[3]).toEqual(10);
    });
  }));


  it('should set/get the current time', waitForAsync(() => {
    const service: MapStateService = TestBed.inject(MapStateService);

    const time = new Date('2022-01-01').toISOString();
    service.setTime(time);
    service.getMapState().subscribe((sta) => {
      expect(sta.time).toEqual(time);
    });
  }));


  it('should compare state Extent and Center', waitForAsync(() => {
    const extent: TGeoExtent = [5.075658586129323, 36.56406504906195, 36.05016620655786, 56.96174826062932];
    const center: IMapState['center'] = { lat: 47.750279, lon: 20.562912 };
    const state = new MapState(5, center, { notifier: 'map' }, extent);

    const extent2: TGeoExtent = [31.672061198984096, 42.86439737465432, 47.15931500919837, 52.97431681666987];
    const center2: IMapState['center'] = { lat: 48.167712, lon: 39.415688 };
    const state2 = new MapState(6, center2, { notifier: 'user' }, extent2);

    expect(state.sameExtent(state.extent)).toBe(true);
    expect(state.sameCenter(state.center)).toBe(true);
    expect(state.sameZoom(state.zoom)).toBe(true);
    expect(state.sameNotifier(state.options.notifier)).toBe(true);


    expect(state.sameExtent(state2.extent)).toBe(false);
    expect(state.sameCenter(state2.center)).toBe(false);
    expect(state.sameZoom(state2.zoom)).toBe(false);
    expect(state.sameNotifier(state2.options.notifier)).toBe(false);
  }));



});

