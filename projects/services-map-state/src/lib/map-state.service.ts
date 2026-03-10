import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MapState, IMapStateOptions, IMapState, IProjFitOptions, IMapStateProjection } from './types/map-state';
import { TGeoExtent } from '@dlr-eoc/services-layers';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { IProjDef } from './types/projections';

const initialState = new MapState(0, { lat: 0, lon: 0 });
@Injectable({
  providedIn: 'root'
})
export class MapStateService {
  // TODO: more refactoring to signals
  private mapState = new BehaviorSubject(initialState)
  private lastAction = new BehaviorSubject<'setExtent' | 'setNativeExtent' | 'setState' | 'setRotation' | 'setAngle' | 'setTime' | 'setProjection'>(null);

  private _registeredProjections = signal<IProjDef[]>([]);
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
      const newState = new MapState(state.zoom, state.center, state.options, state.extent, state.nativeExtent, state.time, state.viewAngle, state.rotation, state.proj?.epsg);
      this.mapState.next(newState);
    } else {
      const stateOptions: IMapStateOptions = { ...{ notifier: 'user' }, ...state.options };
      const newState = new MapState(state.zoom, state.center, stateOptions, state.extent, state.nativeExtent, state.time, state.viewAngle, state.rotation, state.proj?.epsg);
      this.mapState.next(newState);
    }
  }

  // TODO: maybe we should also check for changes her before emit? like getProjection
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
    const newState = new MapState(state.zoom, state.center, state.options, extent, state.nativeExtent, state.time, state.viewAngle, state.rotation, state.proj?.epsg);
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
    const newState = new MapState(state.zoom, state.center, state.options, state.extent, nativeExtent, state.time, state.viewAngle, state.rotation, state.proj?.epsg);
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
    const newState = new MapState(state.zoom, state.center, state.options, state.extent, state.nativeExtent, state.time, angle, state.rotation, state.proj?.epsg);
    this.mapState.next(newState);
  }

  public setRotation(rotation: number, notifier: IMapState['options']['notifier'] = 'user') {
    if (isNaN(rotation)) {
      return;
    }
    this.lastAction.next('setRotation');
    const state = this.getMapState().getValue();
    state.options.notifier = notifier;
    const newState = new MapState(state.zoom, state.center, state.options, state.extent, state.nativeExtent, state.time, state.viewAngle, rotation, state.proj?.epsg);
    this.mapState.next(newState);
  }

  /**
   * Set a projection in the MapState so that map components like map-ol can listen to it.
   * 
   * If you use setProjection only with epsg code sting - registerProjection have to be called first!
   * See https://epsg.io/
   */
  public setProjection(projection: IProjDef | IProjDef['code'], notifier: IMapState['options']['notifier'] = 'user', fitOptions?: IProjFitOptions) {
    let projIsReg = this._registeredProjections().find(p => (typeof projection === 'string') ? p.code === projection : p.code === projection.code);

    // IProjDef is used and it is not registered, register it and use it.
    if (typeof projection !== 'string' && !projIsReg) {
      this.registerProjection(projection);
      projIsReg = this._registeredProjections().find(p => p.code === projection.code)
    }

    if (projIsReg) {
      const state = this.getMapState().getValue();
      this.lastAction.next('setProjection');
      if (!state.proj) {
        state.proj = {};
      }
      state.proj.epsg = projIsReg.code;
      if (fitOptions) {
        state.proj.fitOptions = fitOptions;
      }
      state.options.notifier = notifier;
      if (fitOptions?.fitToBbox) {
        state.extent = fitOptions.fitToBbox;
      }
      if (fitOptions?.fitToNativeBbox) {
        state.nativeExtent = fitOptions.fitToNativeBbox;
      }
      const newState = new MapState(state.zoom, state.center, state.options, state.extent, state.nativeExtent, state.time, state.viewAngle, state.rotation, state.proj?.epsg, fitOptions);
      this.mapState.next(newState);
    } else {
      console.info(`projection ${projection} is not registered!`);
    }
  }

  public getProjection() {
    return this.mapState.pipe(distinctUntilChanged((prev, curr) => prev?.proj?.epsg === curr?.proj?.epsg),map((state) => {
      const hasDef = this._registeredProjections().find(p => p.code === state.proj.epsg);
      const item: IMapStateProjection = { epsg: state.proj.epsg, fitOptions: state.proj.fitOptions };
      if (hasDef) {
        item.IProjDef = hasDef;
      }
      return item;
    }));
  }

  public registerProjection(proj: IProjDef) {
    const currentProjections = this._registeredProjections();
    const itemIndex = currentProjections.findIndex(p => p.code === proj.code);
    let next: IProjDef[];
    if (itemIndex === -1) {
      next = [...currentProjections, proj];
    } else {
      next = currentProjections.map((p, i) =>
        i === itemIndex ? proj : p
      );
    }
    this._registeredProjections.set(next);
  }

  public get registeredProjections() {
    return this._registeredProjections.asReadonly();
  }

  public getLastAction() {
    return this.lastAction;
  }
}
