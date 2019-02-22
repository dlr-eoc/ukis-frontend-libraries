import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from "rxjs";
import { filter, map } from 'rxjs/operators';
import { MapState, TGeoExtent, IMapStateOptions, IMapState } from '@ukis/datatypes-map-state';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class MapStateService {
  private mapState = new BehaviorSubject(new MapState(12, { lat: 0, lon: 0 }, null, [-180, -90, 180, 90], null));
  private extent = new BehaviorSubject<TGeoExtent>([-180, -90, 180, 90]);
  constructor() {
    //let extent = [-180, -90, 180, 90];
    //this.extent.next(extent);
    let state = new MapState(12, { lat: 0, lon: 0 });
    this.mapState.next(state);
  }


  //Observable<MapState> | 
  public getMapState(): BehaviorSubject<MapState> {
    return this.mapState;
  }

  /*
  public setMapState(options: IMapState) {
    let state = new MapState(options.zoom, options.center, options.options, options.extent, options.time);
    this.mapState.next(state);
  }
  */

  public setMapState(state: MapState) {
    this.mapState.next(state);
  }


  //Observable<TGeoExtent>
  public getExtent(): Observable<TGeoExtent> {
    //return this.mapState.pipe(map((state) => { return state.extent }));
    return this.extent.asObservable();
  }

  public setExtent(extent: TGeoExtent) {
    //let state = this.mapState.getValue();
    //state.extent = extent;
    //this.mapState.next(state);
    this.extent.next(extent)
  }
}
