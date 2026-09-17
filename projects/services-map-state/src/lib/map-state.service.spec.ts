import { TestBed } from '@angular/core/testing';
import { MapStateService } from './map-state.service';
import { MapState, IMapState } from './types/map-state';
import { EPSG_4326_Def, WebMercator } from './types/projections';
import { TGeoExtent } from '@dlr-eoc/services-layers';
import { firstValueFrom } from 'rxjs';

describe('MapStateService', () => {
  let service: MapStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({});
    service = TestBed.inject(MapStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the initial MapState', async () => {
    const state = await firstValueFrom(service.getMapState())
    expect(state.center.lat).toEqual(0);
    expect(state.center.lon).toEqual(0);
    expect(state.zoom).toEqual(0);
  });

  it('should set/get the MapState', async () => {
    const stateTime = new Date().toISOString(); // this is passed on new MapState()
    const state = new MapState(4, { lat: 48, lon: 11 });
    state.time = stateTime;
    state.rotation = 20;

    service.setMapState(state);
    const state1 = await firstValueFrom(service.getMapState());

    expect(state1.center.lat).toEqual(48);
    expect(state1.center.lon).toEqual(11);
    expect(state1.zoom).toEqual(4);
    expect(state1.time).toEqual(stateTime);
    expect(state1.rotation).toEqual(20);
    expect(state1.viewAngle).toEqual(0);
  });

  it('should get the initial Extent', async () => {
    const ext = await firstValueFrom(service.getExtent());

    expect(ext[0]).toEqual(-180);
    expect(ext[1]).toEqual(-90);
    expect(ext[2]).toEqual(180);
    expect(ext[3]).toEqual(90);
  });


  it('should set/get the current Extent', async () => {
    const extent: TGeoExtent = [-10, -10, 10, 10];

    service.setExtent(extent);

    const ext = await firstValueFrom(service.getExtent());
    expect(ext[0]).toEqual(-10);
    expect(ext[1]).toEqual(-10);
    expect(ext[2]).toEqual(10);
    expect(ext[3]).toEqual(10);
  });


  it('should set/get the current nativeExtent', async () => {
    const extent: TGeoExtent = [-10, -10, 10, 10];

    service.setNativeExtent(extent);
    const nativeExtent = await firstValueFrom(service.getNativeExtent());
    expect(nativeExtent[0]).toEqual(-10);
    expect(nativeExtent[1]).toEqual(-10);
    expect(nativeExtent[2]).toEqual(10);
    expect(nativeExtent[3]).toEqual(10);
  });

  it('should set/get the current time', async () => {
    const time = new Date('2022-01-01').toISOString();
    service.setTime(time);
    const sta = await firstValueFrom(service.getMapState());
    expect(sta.time).toEqual(time);
  });

  it('should compare state Extent and Center', () => {
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
  });


  it('should have a initial MapState epsg for WebMercator', async () => {
    const service = TestBed.inject(MapStateService);
    const state = await firstValueFrom(service.getMapState());
    expect(state.proj.epsg).toEqual(WebMercator);
  });

  it('should set/get the current Projection (epsg)', async () => {
    const service = TestBed.inject(MapStateService);
    service.setProjection(EPSG_4326_Def);
    const proj = await firstValueFrom(service.getProjection());
    expect(proj.epsg).toEqual(EPSG_4326_Def.code);
  });

});

