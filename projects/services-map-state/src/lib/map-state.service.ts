import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { MapState, IMapStateOptions, IMapState } from './types/map-state';
import { TGeoExtent } from '@dlr-eoc/services-layers';

@Injectable({
  providedIn: 'root'
})
export class MapStateService {
  private mapState = new BehaviorSubject(new MapState(12, { lat: 0, lon: 0 }, null, [-180, -90, 180, 90], null));
  private extent = new BehaviorSubject<TGeoExtent>([-180, -90, 180, 90]);
  constructor() {
    // let extent = [-180, -90, 180, 90];
    // this.extent.next(extent);
    const state = new MapState(12, { lat: 0, lon: 0 });
    this.mapState.next(state);
  }


  // Observable<MapState> |
  public getMapState(): BehaviorSubject<MapState> {
    return this.mapState;
  }

  public setMapState(state: MapState | IMapState) {
    if (state instanceof MapState) {
      this.mapState.next(state);
    } else {
      const stateOptions: IMapStateOptions = { ...{ notifier: 'user' }, ...state.options };
      const newState = new MapState(state.zoom, state.center, stateOptions, state.extent, state.time);
      this.mapState.next(newState);
    }
  }


  // Observable<TGeoExtent>
  public getExtent(): Observable<TGeoExtent> {
    // return this.mapState.pipe(map((state) => { return state.extent }));
    return this.extent.asObservable();
  }

  public setExtent(extent: TGeoExtent) {
    // let state = this.mapState.getValue();
    // state.extent = extent;
    // this.mapState.next(state);
    this.extent.next(extent);
  }
}
