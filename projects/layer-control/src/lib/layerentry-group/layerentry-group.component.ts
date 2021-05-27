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
  @HostBinding('class') get cssClass() { return this.group.cssClass; }

  @Input('layersSvc') layersSvc: LayersService;
  @Input('mapState') mapState?: MapStateService;
  @Input('group') group: LayerGroup;
  @Input('layerGroups') layerGroups: LayerGroup[];

  public set openAllLayersProperties(value: boolean) {
    if (this.group && this.group.layers.length) {
      this.group.layers.forEach(l => l.expanded = value);
    }
  }
  public get openAllLayersProperties() {
    if (this.group && this.group.layers.length) {
      return this.group.layers.filter(l => l.expanded === true).length === this.group.layers.length;
    } else {
      return false;
    }
  }
  // public visible: boolean = true;
  public canZoomToGroup = false;

  public showInfo = false;
  public showAction = true;

  constructor() { }

  ngOnInit() {
    if (this.group.bbox && this.group.bbox.length >= 4) {
      this.canZoomToGroup = true;
    }

    if (!this.group?.action) {
      this.showAction = false;
    }
  }

  /**
   * obj: {any| IDynamicComponent}
   */
  checkIsComponentItem(group: LayerGroup, compProp: string) {
    const obj = group[compProp];
    let isComp = false;
    if (obj && typeof obj === 'object') {
      if ('component' in obj) {
        if (!obj.inputs) {
          // https://2ality.com/2014/01/object-assign.html#2.3
          const groupClone = Object.assign({ __proto__: this.group['__proto__'] }, group);
          if (groupClone && groupClone[compProp]) {
            delete groupClone[compProp];
          }
          obj.inputs = { group: groupClone };
        } else if (obj.inputs && !obj.inputs.group) {
          // https://2ality.com/2014/01/object-assign.html#2.3
          const groupClone = Object.assign({ __proto__: this.group['__proto__'] }, group);
          if (groupClone && groupClone[compProp]) {
            delete groupClone[compProp];
          }
          obj.inputs = Object.assign({ group: groupClone }, obj.inputs);
        }
        isComp = true;
      }
    }
    return isComp;
  }

  checkBaselayer(group: LayerGroup) {
    if (group && group.filtertype === 'Baselayers') {
      return true;
    } else {
      return false;
    }
  }

  checkClassHide(layer: Layer) {
    const hasHide = layer?.cssClass?.includes('hide') || false;
    return !hasHide;
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
      this.mapState.setExtent(group.bbox);
    }
  }

  layerUpdate(event, group: LayerGroup) {
    const layer = event.layer as Layer;
    /** update event layer in the group... this is done by object reference!! */
    /* const updateLayerIndex = group.layers.findIndex(l => l.id === layer.id);
    if (updateLayerIndex !== -1) {
      group.layers[updateLayerIndex] = layer;
    } */
    this.layersSvc.updateLayerGroup(group);
  }


  showProperties() {
    this.group.expanded = !this.group.expanded;
  }

  showHideAllDetails() {
    this.openAllLayersProperties = !this.openAllLayersProperties;
    this.showAction = this.openAllLayersProperties;
    this.showInfo = this.openAllLayersProperties;
  }

  isFirst(group) {
    return this.layersSvc.isGroupFirst(group, this.layerGroups, group.filtertype);
  }

  isLast(group) {
    return this.layersSvc.isGroupLast(group, this.layerGroups, group.filtertype);
  }


  // CDKDRagAndDrop -------------------------------------------------------------
  // https://material.angular.io/cdk/drag-drop/api
  drop(event: CdkDragDrop<Layer[]>) {
    const groupLayers = this.group.layers;
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

    moveItemInArray(this.group.layers, previousIFinal, newIFinal);
    this.layersSvc.updateLayerGroup(this.group);
  }
}
