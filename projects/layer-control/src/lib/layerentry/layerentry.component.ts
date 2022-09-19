import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { IDynamicComponent } from '@dlr-eoc/core-ui';

// imports only for typings...
import {
  LayerGroup, Layer, RasterLayer, LayersService, WmsLayer, WmtsLayer
} from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';

@Component({
  selector: 'ukis-layerentry',
  templateUrl: './layerentry.component.html',
  styleUrls: ['./layerentry.component.scss']
})
export class LayerentryComponent implements OnInit {
  @HostBinding('class.layer-visible') get visible() { return this.layer.visible; }
  @HostBinding('class') get cssClass() { return this.layer.cssClass; }

  @Input('layersSvc') layersSvc: LayersService;
  @Input('mapState') mapState?: MapStateService;
  @Input('layer') layer: Layer;

  @Input('group') group?: LayerGroup;
  @Input('layerGroups') layerGroups?: Array<Layer | LayerGroup>;;
  @Input('expanded') set expanded(value: boolean) {
    if (this.layer) {
      this.layer.expanded = value;
    }
  }
  get expanded() {
    if (this.layer) {
      return this.layer.expanded;
    } else {
      return false;
    }
  }
  @Input('expandable') expandable = true;


  @Output() update = new EventEmitter<{ layer: Layer }>();

  public canZoomToLayer = false;

  public activeTabs = {
    settings: false,
    legend: true,
    description: false
  };

  public hasTabsbody = true;

  public dynamicComponents: {
    legendImg: IDynamicComponent
    action: IDynamicComponent
    description: IDynamicComponent;
  } = { legendImg: null, action: null, description: null };

  constructor() {

  }

  /**
   * obj: {any| IDynamicComponent}
   *
   * Check if the compProp on the layer is a dynamic Component, if yes pass it to `<ukis-dynamic-component>` so the component from the layer can be inserted here.
   */
  checkIsComponentItem(layer: Layer, compProp: string): layer is Omit<Layer, 'legendImg' | 'action' | 'description'> & { legendImg: IDynamicComponent, action: IDynamicComponent, description: IDynamicComponent } {
    /**
     * TODO: This function is executed quite often!!! even if a user moves on tha map. Try to minimize work here or prevent calling it so often.
     *
     * creating new objects is needed to pass and change Inputs from the layers DynamicComponent to the dynamically created component bound on the layer.
     * There is a new object created to hold the component, inputs and outputs so the layer can be passed to the inputs without adding it recursively to itself.
     **/

    // https://stackoverflow.com/a/65347533/10850021
    const obj: IDynamicComponent = layer[compProp];
    let isComp = false;
    if (obj && typeof obj === 'object') {
      if ('component' in obj) {
        const component = obj.component;

        if (!obj.inputs) {
          this.dynamicComponents[compProp] = {
            component: component,
            inputs: { layer: layer }
          }

        } else if (obj.inputs && !obj.inputs.layer) {
          this.dynamicComponents[compProp] = {
            component: obj.component,
            // create a shallow copy of inputs so they are not changed on the original layer
            // keep in mind changing some deeper properties will reflect to the original layer!
            // https://2ality.com/2014/01/object-assign.html#2.3
            inputs: Object.assign({}, obj.inputs, { layer: layer })
          };

        } else if (obj.inputs && obj.inputs.layer) {
          this.dynamicComponents[compProp] = {
            component: obj.component,
            // create a shallow copy of inputs so they are not changed on the original layer
            // keep in mind changing some deeper properties will reflect to the original layer!
            // https://2ality.com/2014/01/object-assign.html#2.3
            inputs: Object.assign({}, obj.inputs)
          };
        }

        if (obj.outputs) {
          // create a shallow copy of outputs so they are not changed on the original layer
          // keep in mind changing some deeper properties will reflect to the original layer!
          // https://2ality.com/2014/01/object-assign.html#2.3
          this.dynamicComponents[compProp].outputs = Object.assign({}, obj.outputs);
        }
        isComp = true;
      }
    }
    return isComp;
  }

  getLayerName(layer: Layer) {
    if (layer.displayName) {
      return layer.displayName;
    } else {
      return layer.name;
    }
  }

  ngOnInit() {
    if (!this.layersSvc) {
      console.error('you need to provide a layersService!');
    }
    // console.log(this.layer)
    if (!this.layer.legendImg) {
      this.activeTabs.description = true;
      this.activeTabs.legend = false;
      this.activeTabs.settings = false;
    }

    if (!this.layer.legendImg && !this.layer.description) {
      this.activeTabs.description = false;
      this.activeTabs.legend = false;
      this.activeTabs.settings = true;
    }

    if (this.layer.bbox && this.layer.bbox.length >= 4) {
      this.canZoomToLayer = true;
    }

    if (this.layer.filtertype === 'Baselayers' && !this.layer.legendImg && !this.layer.description && !this.layer.action && !this.layer.actions && !this.layer.styles && !(this.layer.styles?.length > 1)) {
      this.hasTabsbody = false;
    }
  }

  /**
   * show or hide the layer
   */
  setLayerVisibility(selectedLayer: Layer, group?: LayerGroup) {
    if (!group) {
      if (selectedLayer.filtertype === 'Baselayers') {
        selectedLayer.visible = !selectedLayer.visible;
        const filterdlayers = this.layerGroups.filter((l) => l.filtertype === 'Baselayers');
        // console.log(filterdlayers);
        for (const layer of filterdlayers) {
          if (layer instanceof Layer && layer.id !== selectedLayer.id) {
            layer.visible = !selectedLayer.visible;
            this.layersSvc.updateLayer(layer, layer.filtertype || 'Baselayers');
          }
        }
      } else {
        selectedLayer.visible = !selectedLayer.visible;
        this.layersSvc.updateLayer(selectedLayer, selectedLayer.filtertype || 'Layers'); // TODO check for baselayers!!!!!!
      }
    } else {
      if (group.layers.length > 0) {
        /** "radio" for Baselayers */
        if (group.filtertype === 'Baselayers') {
          for (const layer of group.layers) {
            layer.visible = layer === selectedLayer;
          }
          this.update.emit({
            layer: this.layer
          });
          /** "checkbox" for all other layers */
        } else {
          const tempGroupVisible = group.visible;
          /** change visibility of the selected layer */
          selectedLayer.visible = !selectedLayer.visible;

          /** check if group visibility has changed */
          if (tempGroupVisible !== group.visible) {
            this.update.emit({
              layer: this.layer
            });
          } else {
            /** If the visibility of the group don't changes update only the layer  */
            this.layersSvc.updateLayer(selectedLayer, selectedLayer.filtertype || 'Layers');
          }
        }
      }
    }
  }
  /**
   * setLayerIndex
   */
  setLayerIndex(layer: Layer, dir, group?: LayerGroup) {
    // console.log('is First', this.isFirst(layer));
    // console.log('is Last', this.isLast(layer));
    // console.log(layer, group);
    if (group) {
      this.layersSvc.setLayerIndexInGroup(layer, dir, group);
    } else {
      this.layersSvc.setGroupLayerIndex(layer, dir);
    }
  }

  /**
   * remove the Layer if possible
   */
  removeLayer(group: LayerGroup, selectedLayer: Layer) {
    // console.log("delete ", group, selectedLayer)
    if (group) {
      // console.log("delete layer from group")
      this.layersSvc.removeLayerFromGroup(selectedLayer, group);
    } else {
      // console.log('delete single layer');
      this.layersSvc.removeLayer(selectedLayer, selectedLayer.filtertype);
    }
  }

  zoomTo(layer: Layer) {
    if (this.mapState && layer.bbox && layer.bbox.length >= 4) {
      this.mapState.setExtent(layer.bbox as [number, number, number, number]);
    }
  }

  setLayerOpacity(layer) {
    if (!this.group) {
      this.layersSvc.updateLayer(layer, layer.filtertype || 'Layers'); // TODO check for baselayers!!!!!!
    } else {
      this.update.emit({
        layer
      });
    }
  }

  checkBaselayer(layer: Layer, group?: LayerGroup) {
    if (layer.filtertype === 'Baselayers' || group && group.filtertype === 'Baselayers') {
      return true;
    } else {
      return false;
    }
  }

  /**
   * is expandable if layer has legend, description or opacity can be changed
   */
  is_expandable() {
    if (this.group) {
      return !this.layer.legendImg && this.group.filtertype === 'Baselayers';
    } else {
      return !this.hasTabsbody;
    }
  }

  showProperties() {
    if (!this.is_expandable()) {
      this.expanded = !this.expanded;
    }
  }

  switchTab(tabName: string) {
    for (const key of Object.keys(this.activeTabs)) {
      this.activeTabs[key] = tabName === key;
    }
  }

  isSelectedStyle(styleName: string): boolean {
    if (this.layer instanceof WmsLayer) {
      return this.layer.params.STYLES === styleName;
    } else if (this.layer instanceof WmtsLayer) {
      return this.layer.params.style === styleName;
    } else {
      // TODO: how to compare styles for vector layers and custom layers?
      return false;
    }
  }

  executeChangeStyle(evt: Event) {
    const newStyleName = (evt.target as HTMLInputElement).value;
    if (this.layer.styles) {
      const newStyle = (this.layer as RasterLayer).styles.find(s => s.name === newStyleName);
      if (newStyle) {
        this.layer.legendImg = newStyle.legendURL;
        if (this.layer instanceof WmsLayer) {
          this.layer.params.STYLES = newStyle.name;
        } else if (this.layer instanceof WmtsLayer) {
          this.layer.params.style = newStyle.name;
        }
        this.layersSvc.updateLayer(this.layer, this.layer.filtertype);
      }
    }
  }

  isFirst(layer) {
    if (this.group) {
      return this.layersSvc.isGroupFirst(layer, this.group.layers);
    } else {
      return this.layersSvc.isGroupFirst(layer, null, layer.filtertype);
    }
  }

  isLast(layer) {
    if (this.group) {
      return this.layersSvc.isGroupLast(layer, this.group.layers);
    } else {
      return this.layersSvc.isGroupLast(layer, null, layer.filtertype);
    }
  }

  getExpandShape() {
    // return this.openProperties ? 'down' : 'right';
    return this.expanded ? { transform: 'rotate(180deg)' } : { transform: 'rotate(90deg)' };
  }

}
