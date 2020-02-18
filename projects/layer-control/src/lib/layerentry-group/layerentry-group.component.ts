import { Component, OnInit, Input, HostBinding } from '@angular/core';


// imports only for typings...
import { LayerGroup, Layer } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { LayersService } from '@dlr-eoc/services-layers';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'ukis-layerentry-group',
  templateUrl: './layerentry-group.component.html',
  styleUrls: ['./layerentry-group.component.scss']
})
export class LayerentryGroupComponent implements OnInit {
  @HostBinding('class.group-visible') get visible() { return this.group.visible; }

  @Input('layersSvc') layersSvc: LayersService;
  @Input('mapState') mapState?: MapStateService;
  @Input('group') group: LayerGroup;
  @Input('layerGroups') layerGroups: LayerGroup[];

  public openProperties = false;
  public openAllLayersProperties = false;
  // public visible: boolean = true;
  public canZoomToGroup = false;

  public showInfo = false;

  constructor() { }

  ngOnInit() {
    if (this.group.bbox && this.group.bbox.length >= 4) {
      this.canZoomToGroup = true;
    }
  }

  checkBaselayer(group: LayerGroup) {
    if (group && group.filtertype === 'Baselayers') {
      return true;
    } else {
      return false;
    }
  }

  getLayerName(group: LayerGroup) {
    if (group.displayName) {
      return group.displayName;
    } else {
      return group.name;
    }
  }

  setLayerGroupIndex(group: LayerGroup, dir) {
    this.layersSvc.setGroupLayerIndex(group, dir);
  }

  setGroupLayersVisibility() {
    this.group.visible = !this.group.visible;
    this.layersSvc.updateLayerGroup(this.group);
  }

  removeLayerGroup(group: LayerGroup) {
    this.layersSvc.removeLayerGroup(group);
  }


  zoomTo(group: LayerGroup) {
    if (this.mapState && group.bbox && group.bbox.length >= 4) {
      this.mapState.setExtent(<[number, number, number, number]>group.bbox);
    }
  }

  layerUpdate(event, group: LayerGroup) {
    const layer = event.layer;
    this.layersSvc.updateLayer(layer, group.filtertype);
    // this.checkGroupLayersVisibility();
  }


  showProperties() {
    this.openProperties = !this.openProperties;
  }

  showHideAllDetails() {
    this.openAllLayersProperties = !this.openAllLayersProperties;
  }

  isFirst(group) {
    return this.layersSvc.isGroupFirst(group, this.layerGroups, group.filtertype);
  }

  isLast(group) {
    return this.layersSvc.isGroupLast(group, this.layerGroups, group.filtertype);
  }


  // CDKDRagAndDrop -------------------------------------------------------------
  // https://material.angular.io/cdk/drag-drop/api
  drop(event: CdkDragDrop<string[]>) {
    const previousI = this.group.layers.length - event.previousIndex - 1,
      currentI = this.group.layers.length - event.currentIndex - 1;
    moveItemInArray(this.group.layers, previousI, currentI);
    this.layersSvc.updateLayerGroup(this.group);
  }
}
