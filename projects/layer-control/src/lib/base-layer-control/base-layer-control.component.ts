import { Component, OnInit, Input } from '@angular/core';

import { LayersService } from '@ukis/services-layers';
import { MapStateService } from '@ukis/services-map-state';
import { LayerGroup, Layer } from '@ukis/datatypes-layers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ukis-base-layer-control',
  templateUrl: './base-layer-control.component.html',
  styleUrls: ['./base-layer-control.component.scss']
})
export class BaseLayerControlComponent implements OnInit {
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
      this.layergroups = layergroups.filter((group) => group.filtertype === 'Baselayers' || group.filtertype === 'Baselayers');
      console.log(this.layergroups)
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
