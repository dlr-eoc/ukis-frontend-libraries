import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from "rxjs";
//import { filter, map } from 'rxjs/operators';
import { MapState, TGeoExtent } from '@ukis/datatypes-map-state';

@Injectable({
  providedIn: 'root'
})
export class MapStateService {
  private mapState = new BehaviorSubject(new MapState(12, { lat: 0, lon: 0 }));
  private extent = new BehaviorSubject<TGeoExtent>([-180, -90, 180, 90]);

  constructor() {
    //let extent = [-180, -90, 180, 90];
    //this.extent.next(extent);
    let state = new MapState(12, { lat: 0, lon: 0 });
    this.mapState.next(state);
  }

  public getMapState(): Observable<MapState> {
    return this.mapState.asObservable();
  }

  public setMapState(state: MapState) {
    this.mapState.next(state);
  }

  public getExtent(): Observable<TGeoExtent> {
    return this.extent.asObservable();
  }

  public setExtent(extent: TGeoExtent) {
    this.extent.next(extent);
  }
}
