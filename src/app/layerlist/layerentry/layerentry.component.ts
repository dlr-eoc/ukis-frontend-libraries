import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ukis-layerentry',
  templateUrl: './layerentry.component.html',
  styleUrls: ['./layerentry.component.scss']
})
export class LayerentryComponent implements OnInit {

  @Input('layerSvc') layerSvc: any;
  @Input('layer') layer: any;
  @Input('group') group: any;

  openProperties = false;

  @Output() update = new EventEmitter<any>();


  activeTabs = {
    'settings': true,
    'description': false
  };

  constructor() {

  }

  ngOnInit() {
  }


  changeOpacity = (group, selectedLayer) => {
    if (group.inputtype=="checkbox") {
      this.layerSvc.setOverlays(group.layers);
    }
    if (group.inputtype=="radio") {
      this.layerSvc.setBaseLayers(group.layers);
    }

    this.update.emit({
      layer: this.layer
    });
    //console.log(selectedLayer);
  };

  showHideLayerSwitch = (group, selectedLayer) => {
    if (group.inputtype=="checkbox") {
      selectedLayer.visible = !selectedLayer.visible;
    }
    if (group.inputtype=="radio") {
      for (let layer of group.layers) {
        layer.visible = layer === selectedLayer;
      }
    }
    this.update.emit({
      layer: this.layer
    });
  };

  showProperties = () => {
    this.openProperties = !this.openProperties;
  };

  removeLayer = (group, selectedLayer) => {
    //console.log("delete "+selectedLayer.name)
    this.layerSvc.removeLayer(selectedLayer, group.name);
  };

  switchTab = (tabName: string) => {
    for (let key of Object.keys(this.activeTabs)) {
      this.activeTabs[key]= tabName === key;
    }
  }
}
