import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MapStateService, MapState } from '@dlr-eoc/services-map-state';
import { Subscription } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-extent-helper',
  templateUrl: './extent-helper.component.html',
  styleUrls: ['./extent-helper.component.scss'],
  imports: [JsonPipe]
})
export class ExtentHelperComponent implements OnInit, OnDestroy {

  @Input('mapStateSvc') mapStateSvc!: MapStateService;
  subs: Subscription[] = [];
  public currentMapState!: MapState;
  constructor() { }

  ngOnInit(): void {
    if (this.mapStateSvc) {
      const mapStateSub = this.mapStateSvc.getMapState().subscribe(state => {
        this.currentMapState = state;
      });
      this.subs.push(mapStateSub);
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

}
