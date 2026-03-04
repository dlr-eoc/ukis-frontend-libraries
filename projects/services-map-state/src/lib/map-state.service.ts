import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MapState, IMapStateOptions, IMapState, IProjOptions } from './types/map-state';
import { TGeoExtent } from '@dlr-eoc/services-layers';
import { map } from 'rxjs/operators';
import { IProjDef } from './types/projections';

const initialState = new MapState(0, { lat: 0, lon: 0 });
@Injectable({
  providedIn: 'root'
})
export class MapStateService {
  private mapState = new BehaviorSubject(initialState)
  private lastAction = new BehaviorSubject<'setExtent' | 'setNativeExtent' | 'setState' | 'setRotation' | 'setAngle' | 'setTime' | 'setProjection'>(null);
  constructor() {
  }

  public getMapState() {
    return this.mapState;
  }

  public setMapState(state: MapState | IMapState) {
    if (!state) {
      return;
    }
    this.lastAction.next('setState');
    if (state instanceof MapState) {
      const newState = new MapState(state.zoom, state.center, state.options, state.extent, state.nativeExtent, state.time, state.viewAngle, state.rotation, state.epsg);
      this.mapState.next(newState);
    } else {
      const stateOptions: IMapStateOptions = { ...{ notifier: 'user' }, ...state.options };
      const newState = new MapState(state.zoom, state.center, stateOptions, state.extent, state.nativeExtent, state.time, state.viewAngle, state.rotation, state.epsg);
      this.mapState.next(newState);
    }
  }

  public getExtent() {
    return this.mapState.pipe(map((state) => state.extent));
  }

  public setExtent(extent: TGeoExtent, notifier: IMapState['options']['notifier'] = 'user') {
    if (!Array.isArray(extent)) {
      return;
    }
    this.lastAction.next('setExtent');
    const state = this.getMapState().getValue();
    state.options.notifier = notifier;
    const newState = new MapState(state.zoom, state.center, state.options, extent, state.nativeExtent, state.time, state.viewAngle, state.rotation, state.epsg);
    this.mapState.next(newState);
  }

  public getNativeExtent() {
    return this.mapState.pipe(map((state) => state.nativeExtent));
  }

  public setNativeExtent(nativeExtent: TGeoExtent, notifier: IMapState['options']['notifier'] = 'user') {
    if (!Array.isArray(nativeExtent)) {
      return;
    }
    this.lastAction.next('setNativeExtent');
    const state = this.getMapState().getValue();
    state.options.notifier = notifier;
    const newState = new MapState(state.zoom, state.center, state.options, state.extent, nativeExtent, state.time, state.viewAngle, state.rotation, state.epsg);
    this.mapState.next(newState);
  }

  public setTime(time: Date | string, notifier: IMapState['options']['notifier'] = 'user') {
    this.lastAction.next('setTime');
    const state = this.getMapState().getValue();
    state.options.notifier = notifier;

    if (time instanceof Date) {
      state.time = time.toISOString();
    } else {
      state.time = time;
    }
    this.setMapState(state);
  }

  /**
   * @param angle
   * This is not available for OpenLayers (only rotation)
   * 
   * For Maplibre the default is from 0 to 60. Can be increasd with setMaxPitch (0-85). Values greater than 60 degrees are experimental and may result in rendering issues.
   * 
   * For Cesium values greater than 90, is like looking from the ground up to the sky. Values greater than 180 also rotate the globe.
   */
  public setViewAngle(angle: number, notifier: IMapState['options']['notifier'] = 'user') {
    if (isNaN(angle)) {
      return;
    }
    this.lastAction.next('setAngle');
    const state = this.getMapState().getValue();
    state.options.notifier = notifier;
    const newState = new MapState(state.zoom, state.center, state.options, state.extent, state.nativeExtent, state.time, angle, state.rotation, state.epsg);
    this.mapState.next(newState);
  }

  public setRotation(rotation: number, notifier: IMapState['options']['notifier'] = 'user') {
    if (isNaN(rotation)) {
      return;
    }
    this.lastAction.next('setRotation');
    const state = this.getMapState().getValue();
    state.options.notifier = notifier;
    const newState = new MapState(state.zoom, state.center, state.options, state.extent, state.nativeExtent, state.time, state.viewAngle, rotation, state.epsg);
    this.mapState.next(newState);
  }

  /**
   * set a projection epsg code
   * This then needs to be processed by the associated map component.
   * @param epsg - https://epsg.io/
   */
  public setProjection(epsg: IProjDef['code'], notifier: IMapState['options']['notifier'] = 'user', options?: IProjOptions) {
    const state = this.getMapState().getValue();
    const currentEPSG = state.epsg;
    if (epsg !== currentEPSG) {
      this.lastAction.next('setProjection');
      state.epsg = epsg;
      state.options.notifier = notifier;
      if (options?.fitToBbox) {
        state.extent = options.fitToBbox;
      }
      if (options?.fitToNativeBbox) {
        state.nativeExtent = options.fitToNativeBbox;
      }
      const newState = new MapState(state.zoom, state.center, state.options, state.extent, state.nativeExtent, state.time, state.viewAngle, state.rotation, state.epsg, options);
      this.mapState.next(newState);
    }
  }

  public getProjection() {
    return this.mapState.pipe(map((state) => state.epsg));
  }


  public getLastAction() {
    return this.lastAction;
  }
}
