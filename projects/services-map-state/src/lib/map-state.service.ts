import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MapState, IMapStateOptions, IMapState } from './types/map-state';
import { TGeoExtent } from '@dlr-eoc/services-layers';
import { map } from 'rxjs/operators';

const initialState = new MapState(0, { lat: 0, lon: 0 });
@Injectable({
  providedIn: 'root'
})
export class MapStateService {
  private mapState = new BehaviorSubject(initialState)
  private lastAction = new BehaviorSubject<'setExtent' | 'setState'>(null);
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
      const newState = new MapState(state.zoom, state.center, state.options, state.extent, state.time);
      this.mapState.next(newState);
    } else {
      const stateOptions: IMapStateOptions = { ...{ notifier: 'user' }, ...state.options };
      const newState = new MapState(state.zoom, state.center, stateOptions, state.extent, state.time);
      this.mapState.next(newState);
    }
  }

  public getExtent() {
    return this.mapState.pipe(map((state) => state.extent));
  }

  public setExtent(extent: TGeoExtent, notifier: IMapState['options']['notifier'] = 'user') {
    if (!extent) {
      return;
    }
    this.lastAction.next('setExtent');
    const state = this.getMapState().getValue();
    state.options.notifier = notifier;
    const newState = new MapState(state.zoom, state.center, state.options, extent, state.time);
    this.mapState.next(newState);
  }

  public setTime(time: Date | string) {
    const state = this.getMapState().getValue();

    if (time instanceof Date) {
      state.time = time.toISOString();
    } else {
      state.time = time;
    }
    this.setMapState(state);
  }


  public getLastAction() {
    return this.lastAction;
  }
}
