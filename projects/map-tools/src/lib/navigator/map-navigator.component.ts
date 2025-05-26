import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { MapStateService, MapState } from '@dlr-eoc/services-map-state';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ClrCommonFormsModule, ClrNumberInputModule } from '@clr/angular';

@Component({
    selector: 'ukis-map-navigator',
    templateUrl: './map-navigator.component.html',
    styleUrls: ['./map-navigator.component.scss'],
    imports: [FormsModule, ClrCommonFormsModule, ClrNumberInputModule]
})
export class MapNavigatorComponent implements OnInit, OnDestroy {
  @Input('mapState') mapState?: MapStateService;
  mapstate: MapState;
  subscription: Subscription;
  public inputStep = 0.01;
  public precision = 2;
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

  stateChange(evt) {
    this.setNewState(this.mapstate);
  }

  setInputStep(evt: number) {
    const value = Array.from(Array(evt), (_, x) => '0').join('');
    this.inputStep = 1 / Number(`1${value}`);
  }

  public toPrecision(input: number, value: number) {
    return input.toFixed(value);
  }

}
