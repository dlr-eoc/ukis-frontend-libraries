import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { MapStateService, MapState } from '@dlr-eoc/services-map-state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ukis-map-navigator',
  templateUrl: './map-navigator.component.html',
  styleUrls: ['./map-navigator.component.scss']
})
export class MapNavigatorComponent implements OnInit, OnDestroy {
  @Input('mapState') mapState?: MapStateService;
  mapstate: MapState;
  subscription: Subscription;
  public inputStep = 0.01;
  constructor() { }

  ngOnInit() {
    this.subscription = this.mapState.getMapState().subscribe(mapstate => { this.mapstate = mapstate; });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  zoomIn() {
    this.mapstate.zoom++;
    this.setNewState(this.mapstate);
  }
  zoomOut() {
    this.mapstate.zoom--;
    this.setNewState(this.mapstate);
  }

  setNewState(newstate: MapState) {
    newstate.options.notifier = 'user';
    this.mapState.setMapState(newstate);
  }

  stateChange(ev) {
    this.setNewState(this.mapstate);
  }

}
