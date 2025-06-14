import { Component, OnInit, Input, HostBinding } from '@angular/core';


// imports only for typings...
import { LayerGroup, Layer } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { LayersService } from '@dlr-eoc/services-layers';
import { CdkDragDrop, moveItemInArray, CdkDropList, CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { IDynamicComponent, DynamicComponentComponent } from '@dlr-eoc/core-ui';

import { ClarityIcons, folderIcon, folderOpenIcon, arrowIcon, eyeIcon, eyeHideIcon, cogIcon, imageIcon, infoStandardIcon, detailsIcon, zoomInIcon, trashIcon } from '@cds/core/icon';
import { ClrIconModule, ClrCommonFormsModule } from '@clr/angular';
import { NgClass } from '@angular/common';
import { LayerentryComponent } from '../layerentry/layerentry.component';
import { ItemsFilterPipe } from '../utils/obj-type.pipe';
import { ReversePipe } from '../utils/array-reverse.pipe';
ClarityIcons.addIcons(...[folderIcon, folderOpenIcon, arrowIcon, eyeIcon, eyeHideIcon, cogIcon, imageIcon, infoStandardIcon, detailsIcon, zoomInIcon, trashIcon]);


enum EactiveTabs {
  settings = 'settings',
  legend = 'legend',
  description = 'description'
}
type TactiveTabs = keyof typeof EactiveTabs;

@Component({
    selector: 'ukis-layerentry-group',
    templateUrl: './layerentry-group.component.html',
    styleUrls: ['./layerentry-group.component.scss'],
    imports: [ClrIconModule, NgClass, ClrCommonFormsModule, CdkDropList, CdkDrag, LayerentryComponent, CdkDragHandle, ItemsFilterPipe, ReversePipe, DynamicComponentComponent]
})
export class LayerentryGroupComponent implements OnInit {
  @HostBinding('class.group-visible') get visible() { return this.group.visible; }
  @HostBinding('class') get cssClass() { return this.group.cssClass; }

  @Input('layersSvc') layersSvc: LayersService;
  @Input('mapState') mapState?: MapStateService;
  @Input('group') group: LayerGroup;
  @Input('layerGroups') layerGroups: Array<Layer | LayerGroup>;
  @Input('groupSort') groupSort?: boolean = true;
  @Input('groupLayersSort') groupLayersSort?: boolean = true;

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

  public activeTabs = {
    settings: false,
    legend: true,
    description: false
  };

  public dynamicComponents: {
    legendImg: IDynamicComponent
    action: IDynamicComponent
    description: IDynamicComponent;
  } = { legendImg: null, action: null, description: null };

  constructor() { }

  ngOnInit() {
    if (this.group.bbox && this.group.bbox.length >= 4) {
      this.canZoomToGroup = true;
    }

    if (typeof this.group?.expanded === 'object') {
      if (Object.keys(EactiveTabs).includes(this.group.expanded.tab)) {
        this.switchTab(this.group.expanded.tab as TactiveTabs);
        /** let the user reset the default open tab */
        if(this.group.expanded.expanded === false){
          this.activeTabs[this.group.expanded.tab] = false;
        }
      } else {
        this.setDefaultActiveTabs();
      }

    } else {
      this.setDefaultActiveTabs();
    }

  }

  private setDefaultActiveTabs() {
    if (!this.group?.action) {
      this.activeTabs.settings = false;
    }
  }

  /**
   * obj: {any| IDynamicComponent}
   */
  checkIsComponentItem(group: LayerGroup, compProp: string): group is Omit<LayerGroup, 'legendImg' | 'action' | 'description'> & { legendImg: IDynamicComponent, action: IDynamicComponent, description: IDynamicComponent } {
    /**
     * TODO: This function is executed quite often!!! even if a user moves on tha map. Try to minimize work here or prevent calling it so often.
     *
     * creating new objects is needed to pass and change Inputs from the groups DynamicComponent to the dynamically created component bound on the layer.
     * There is a new object created to hold the component, inputs and outputs so the group can be passed to the inputs without adding it recursively to itself.
     **/

    // https://stackoverflow.com/a/65347533/10850021
    const obj: IDynamicComponent = group[compProp];
    let isComp = false;
    if (obj && typeof obj === 'object') {
      if ('component' in obj) {
        const component = obj.component;

        if (!obj.inputs) {
          this.dynamicComponents[compProp] = {
            component: component,
            inputs: { group: group }
          }

        } else if (obj.inputs && !obj.inputs.group) {
          this.dynamicComponents[compProp] = {
            component: obj.component,
            // create a shallow copy of inputs so they are not changed on the original group
            // keep in mind changing some deeper properties will reflect to the original group!
            // https://2ality.com/2014/01/object-assign.html#2.3
            inputs: Object.assign({}, obj.inputs, { group: group })
          };

        } else if (obj.inputs && obj.inputs.group) {
          this.dynamicComponents[compProp] = {
            component: obj.component,
            // create a shallow copy of inputs so they are not changed on the original group
            // keep in mind changing some deeper properties will reflect to the original group!
            // https://2ality.com/2014/01/object-assign.html#2.3
            inputs: Object.assign({}, obj.inputs)
          };
        }

        if (obj.outputs) {
          // create a shallow copy of outputs so they are not changed on the original group
          // keep in mind changing some deeper properties will reflect to the original group!
          // https://2ality.com/2014/01/object-assign.html#2.3
          this.dynamicComponents[compProp].outputs = Object.assign({}, obj.outputs);
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

  switchTab(tabName: TactiveTabs, toggle = true) {
    for (const key of Object.keys(this.activeTabs)) {
      const isTabName = tabName === key;
      if (this.activeTabs[key] && toggle) {
        this.activeTabs[key] = false;
      } else {
        this.activeTabs[key] = isTabName;
      }
    }
  }

  showHideAllDetails() {
    if (this.openAllLayersProperties) {
      this.openAllLayersProperties = false;
      for (const key of Object.keys(this.activeTabs)) {
        this.activeTabs[key] = false;
      }

    } else {
      this.openAllLayersProperties = true;

      if (this.group.legendImg) {
        this.switchTab('legend', false);
      } else if (this.group.description) {
        this.switchTab('description', false);
      } else if (this.group.action) {
        this.switchTab('settings', false);
      }
    }
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
