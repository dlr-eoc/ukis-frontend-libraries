import { Component, OnInit, Input } from '@angular/core';


//imports only for typings...
import { LayerGroup, Layer } from "@ukis/datatypes-layers";
import { MapStateService } from '@ukis/services-map-state';
import { LayersService } from '@ukis/services-layers';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
//import { LayersService } from 'tmp/project-services/projects/layers';

@Component({
  selector: 'ukis-layerentry-group',
  templateUrl: './layerentry-group.component.html',
  styleUrls: ['./layerentry-group.component.scss']
})
export class LayerentryGroupComponent implements OnInit {
  @Input('layersSvc') layersSvc: LayersService;
  @Input('mapState') mapState?: MapStateService;
  @Input('group') group: LayerGroup;
  @Input('layerGroups') layerGroups: LayerGroup[];

  public openProperties: boolean = false;
  public openAllLayersProperties: boolean = false;
  public visible: boolean = true;
  public canZoomToGroup: boolean = false;

  constructor() { }

  ngOnInit() {
    if (this.group.bbox && this.group.bbox.length >= 4) {
      this.canZoomToGroup = true;
    }
    this.checkGroupLayersVisibility();
  }

  checkBaselayer(group: LayerGroup) {
    if (group && group.filtertype == 'Baselayers') {
      return true;
    } else {
      return false;
    }
  }

  checkGroupLayersVisibility() {
    let visibleLayerNum = 0;
    for (let l of this.group.layers) {
      if (l.visible) {
        visibleLayerNum++
      }
    }
    this.visible = visibleLayerNum > 0;
  }

  setLayerGroupIndex(group: LayerGroup, dir) {
    this.layersSvc.setGroupLayerIndex(group, dir);
  };

  setGroupLayersVisibility() {
    this.visible = !this.visible;
    for (let l of this.group.layers) {
      l.visible = this.visible;
      this.layersSvc.updateLayer(l, this.group.filtertype);
    }
  };

  removeLayerGroup(group: LayerGroup) {
    this.layersSvc.removeLayerGroup(group);
  };


  zoomTo(group: LayerGroup) {
    if (this.mapState && group.bbox && group.bbox.length >= 4) {
      this.mapState.setExtent(<[number, number, number, number]>group.bbox);
    }
  }

  layerUpdate(event, group: LayerGroup) {
    let layer = event.layer;
    this.layersSvc.updateLayer(layer, group.filtertype);
    this.checkGroupLayersVisibility();
  };


  showProperties() {
    this.openProperties = !this.openProperties;
  };

  showHideAllDetails() {
    this.openAllLayersProperties = !this.openAllLayersProperties;
  };

  isFirst(group) {
    return this.layersSvc.isGroupFirst(group, this.layerGroups, group.filtertype);
  }

  isLast(group) {
    return this.layersSvc.isGroupLast(group, this.layerGroups, group.filtertype);
  }


  //CDKDRagAndDrop -------------------------------------------------------------
  //https://material.angular.io/cdk/drag-drop/api
  drop(event: CdkDragDrop<string[]>) {
    //console.log(event)
    let previousI = this.group.layers.length - event.previousIndex - 1,
      currentI = this.group.layers.length - event.currentIndex - 1;
    //console.log('Drop--------------------------', previousI, currentI)
    moveItemInArray(this.group.layers, previousI, currentI);
    //this.layersSvc.setLayerGroups(this.layerGroups);
    this.layersSvc.updateLayerGroup(this.group);
    //console.log(this.group.layers)
  }

  sort(event) {
    //console.log(event)
    //console.log('Sort--------------------------') //event.previousIndex, event.currentIndex
    let previousI = this.group.layers.length - event.previousIndex - 1,
      currentI = this.group.layers.length - event.currentIndex - 1;
    //console.log('previous', event.previousIndex, previousI)
    //console.log('current', event.currentIndex, currentI)
    //console.log(this.group.layers)
  }


}
