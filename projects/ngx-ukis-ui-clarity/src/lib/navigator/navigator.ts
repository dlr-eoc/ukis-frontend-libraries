import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { MapStateService, MapState } from '@dlr-eoc/services-map-state';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ClrCommonFormsModule, ClrNumberInputModule } from '@clr/angular';

@Component({
  selector: 'ngx-ukis-map-navigator',
  styleUrl: './navigator.scss',
  templateUrl: './navigator.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormsModule, ClrCommonFormsModule, ClrNumberInputModule]
})
export class MapNavigatorComponent implements OnInit, OnDestroy {
  @Input('mapStateSvc') mapStateSvc!: MapStateService;
  mapstate!: MapState;
  subscription!: Subscription;
  public inputStep = 0.01;
  public precision = 2;
  constructor() { }

  ngOnInit() {
    this.subscription = this.mapStateSvc.getMapState().subscribe(mapstate => { this.mapstate = mapstate; });
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
    if (this) {
      newstate.options.notifier = 'user';
      this.mapStateSvc.setMapState(newstate);
    }
  }

  stateChange() {
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

