import { Component, Input, OnInit } from '@angular/core';
import { LayersService } from '@dlr-eoc/services-layers';

@Component({
  selector: 'app-vtile-layer-action',
  templateUrl: './vtile-layer-action.component.html',
  styleUrls: ['./vtile-layer-action.component.scss']
})
export class VtileLayerActionComponent implements OnInit {
  @Input() layer;

  @Input() layersSvc: LayersService;

  public fillColor = 'rgba(196, 203, 205, 1)';
  public fillChanged = false;
  public tempLayer;
  constructor() { }

  ngOnInit(): void {
    const tempLayer = this.layer;
    if (tempLayer) {

      const style = tempLayer.options.style;
      let index = style.layers.findIndex(l => l.id === "water");
      this.fillChanged = (style.layers[index].paint["fill-color"] === this.fillColor) ? false : true;
    }

  }

  switchWater(event: any) {
    const tempLayer = this.layer;
    const style = tempLayer.options.style;
    let index = style.layers.findIndex(l => l.id === "water")
    if (!this.fillChanged) {
      style.layers[index].paint["fill-color"] = "rgba(0, 0, 0, 1)";
      this.fillChanged = true;
    } else {
      style.layers[index].paint["fill-color"] = this.fillColor;
      this.fillChanged = false;
    }

    this.layersSvc.updateLayer(tempLayer);
  }

}
