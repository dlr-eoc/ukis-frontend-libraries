import { Component, OnInit, Input } from '@angular/core';

import { LayersService } from '@ukis/services-layers';
import { MapStateService } from '@ukis/services-map-state';
import { LayerGroup, Layer } from '@ukis/services-layers';
import { Subscription } from 'rxjs';

import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'ukis-layer-control',
  templateUrl: './layer-control.component.html',
  styleUrls: ['./layer-control.component.scss']
})
export class LayerControlComponent implements OnInit {
  @Input('layersSvc') layersSvc: LayersService;
  @Input('mapStateSvc') mapStateSvc?: MapStateService;
  @Input('layerfilter') layerfilter?: string = 'Layers';

  layerGroupsSubscription: Subscription;
  layersSubscription: Subscription;
  layergroups: Array<Layer | LayerGroup>;


  constructor() {
    this.layergroups = [];
  }

  ngOnInit() {
    this.layerGroupsSubscription = this.layersSvc.getLayerGroups().subscribe(layergroups => {
      this.layergroups = layergroups;
      /**
       * filter only in template so reordering of layers with set layergroups is working
       */
      //this.layergroups = layergroups.filter((group) => group.filtertype === this.layerfilter || group.filtertype === this.layerfilter);
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


  //CDKDRagAndDrop -------------------------------------------------------------
  //https://material.angular.io/cdk/drag-drop/api
  drop(event: CdkDragDrop<string[]>) {
    //console.log(event)
    let previousI = this.layergroups.length - event.previousIndex - 1,
      currentI = this.layergroups.length - event.currentIndex - 1;
    // console.log('Drop--------------------------', previousI, currentI)
    this.layersSvc.arrayMove(this.layergroups, previousI, currentI)
    this.layersSvc.setLayerGroups(this.layergroups);
    //console.log(this.layergroups)
  }

  checkBaselayer(layer: Layer, group?: LayerGroup) {
    if (layer.filtertype === 'Baselayers' || group && group.filtertype === 'Baselayers') {
      return true;
    } else {
      return false;
    }
  }
}
