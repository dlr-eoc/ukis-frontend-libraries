import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ukis-layerproperty',
  templateUrl: './layerproperty.component.html',
  styleUrls: ['./layerproperty.component.scss']
})
export class LayerpropertyComponent implements OnInit {

  @Input('layerSvc') layerSvc: any;
  @Input('layer') layer: any;

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

 switchTab(tabName: string) {
   for (let key of Object.keys(this.activeTabs)) {
     this.activeTabs[key]= tabName === key;
   }
 }
}
