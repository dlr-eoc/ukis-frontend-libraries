import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { LayersService } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { LayerGroup, Layer } from '@dlr-eoc/services-layers';
import { Subscription } from 'rxjs';

import { CdkDragDrop, CdkDropList, CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';

import { LayerentryGroupComponent } from '../layerentry-group/layerentry-group.component';
import { LayerentryComponent } from '../layerentry/layerentry.component';
import { ItemsFilterPipe } from '../utils/obj-type.pipe';
import { ReversePipe } from '../utils/array-reverse.pipe';

@Component({
    selector: 'ukis-layer-control',
    templateUrl: './layer-control.component.html',
    styleUrls: ['./layer-control.component.scss'],
    standalone: true,
    imports: [CdkDropList, CdkDrag, LayerentryGroupComponent, CdkDragHandle, LayerentryComponent, ItemsFilterPipe, ReversePipe]
})
export class LayerControlComponent implements OnInit, OnDestroy {
  @Input('layersSvc') layersSvc: LayersService;
  @Input('mapStateSvc') mapStateSvc?: MapStateService;
  @Input('layerfilter') layerfilter: Layer['filtertype'] = 'Layers';
  @Input('layersSort') layersSort?: boolean = true;
  @Input('groupLayersSort') groupLayersSort?: boolean = true;

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
      // this.layergroups = layergroups.filter((group) => group.filtertype === this.layerfilter || group.filtertype === this.layerfilter);
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


  // CDKDRagAndDrop -------------------------------------------------------------
  // https://material.angular.io/cdk/drag-drop/api
  drop(event: CdkDragDrop<(Layer | LayerGroup)[]>) {
    const groupLayers = this.layergroups;
    const groupLeng = groupLayers.length;
    const fiteredLayers = event.container.data; // filtered by [cdkDropListData]
    const groupFiteredLeng = fiteredLayers.length;
    let previousIFinal, newIFinal;

    /**
     * calc index with pipe reverse order
     */
    if (groupLeng === groupFiteredLeng) {
      const previousIndex = groupLeng - event.previousIndex - 1;
      const newIndex = groupLeng - event.currentIndex - 1;
      previousIFinal = previousIndex;
      newIFinal = newIndex;
    } else {
      /**
       * If array is filtered get previousIndex by item.data and try to calculate ne index
       * get layers for cdk indexes - 'connect' 'event.container.data' and the original not filtered data
       */
      const newLayer = fiteredLayers[event.currentIndex];
      const previousIndex = groupLayers.findIndex(l => l.id === event.item.data.id);
      let newIndex = groupLayers.findIndex(l => l.id === newLayer.id);

      // Item is not moved
      if (event.previousIndex === event.currentIndex) {
        newIndex = previousIndex;
      }

      previousIFinal = previousIndex;
      newIFinal = newIndex;
    }

    this.layersSvc.arrayMove(this.layergroups, previousIFinal, newIFinal);
    this.layersSvc.setLayerGroups(this.layergroups);
  }

  checkBaselayer(layer: Layer, group?: LayerGroup) {
    if (layer.filtertype === 'Baselayers' || group && group.filtertype === 'Baselayers') {
      return true;
    } else {
      return false;
    }
  }

  checkClassHide(layerOrGroup: Layer | LayerGroup) {
    const hasHide = layerOrGroup?.cssClass?.includes('hide') || false;
    return !hasHide;
  }
}
