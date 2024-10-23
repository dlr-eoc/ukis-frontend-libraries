import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { LayersService } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { LayerGroup, Layer } from '@dlr-eoc/services-layers';
import { Subscription } from 'rxjs';

import { LayerentryGroupComponent } from '../layerentry-group/layerentry-group.component';
import { LayerentryComponent } from '../layerentry/layerentry.component';
import { ReversePipe } from '../utils/array-reverse.pipe';

@Component({
    selector: 'ukis-base-layer-control',
    templateUrl: './base-layer-control.component.html',
    styleUrls: ['./base-layer-control.component.scss'],
    standalone: true,
    imports: [LayerentryGroupComponent, LayerentryComponent, ReversePipe]
})
export class BaseLayerControlComponent implements OnInit, OnDestroy {
  @Input('layersSvc') layersSvc: LayersService;
  @Input('mapStateSvc') mapStateSvc?: MapStateService;

  layerGroupsSubscription: Subscription;
  layersSubscription: Subscription;
  layergroups: Array<Layer | LayerGroup>;


  constructor() {
    this.layergroups = [];
  }

  ngOnInit() {
    this.layerGroupsSubscription = this.layersSvc.getLayerGroups().subscribe(layergroups => {
      this.layergroups = layergroups.filter((group) => group.filtertype === 'Baselayers');
      // console.log(this.layergroups)
    });
  }

  isLayerGroup(group: Layer | LayerGroup) {
    if (group instanceof LayerGroup) {
      return true;
    } else {
      return false;
    }
  }

  ngOnDestroy() {
    this.layerGroupsSubscription.unsubscribe();
  }

}
