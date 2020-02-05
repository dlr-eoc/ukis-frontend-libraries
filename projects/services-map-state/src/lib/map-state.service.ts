import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { MapState, TGeoExtent, IMapStateOptions, IMapState } from './types/map-state';

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
      const _stateOptions: IMapStateOptions = { ...{ notifier: 'user' }, ...state.options };
      const _state = new MapState(state.zoom, state.center, _stateOptions, state.extent, state.time);
      this.mapState.next(_state);
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
