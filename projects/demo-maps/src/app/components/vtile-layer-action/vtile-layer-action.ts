import { Component, effect, input, signal } from '@angular/core';
import { LayersService, VectorLayer } from '@dlr-eoc/services-layers';
import { ClrCheckboxModule, ClrCommonFormsModule } from '@clr/angular';

@Component({
  imports: [ClrCheckboxModule, ClrCommonFormsModule],
  selector: 'app-vtile-layer-action',
  styleUrl: './vtile-layer-action.scss',
  templateUrl: './vtile-layer-action.html',
})
export class VtileLayerAction {

  layer = input.required<VectorLayer>()
  layersSvc = input.required<LayersService>();

  public fillColor = 'rgba(196, 203, 205, 1)';
  public fillChanged = signal(false);
  public tempLayer!: VectorLayer;
  constructor() {
    effect(() => {

      const tempLayer = this.layer();
      if (tempLayer && tempLayer.options) {

        const style = tempLayer.options.style;
        let index = style.layers.findIndex((l: any) => l.id === "water");
        this.fillChanged.set((style.layers[index].paint["fill-color"] === this.fillColor) ? false : true);
      }
    })

  }

  switchWater() {
    const tempLayer = this.layer();
    if (tempLayer && tempLayer.options) {
      const style = tempLayer.options.style;
      let index = style.layers.findIndex((l: any) => l.id === "water")
      if (!this.fillChanged()) {
        style.layers[index].paint["fill-color"] = "rgba(0, 0, 0, 1)";
        this.fillChanged.set(true);
      } else {
        style.layers[index].paint["fill-color"] = this.fillColor;
        this.fillChanged.set(false);
      }

      this.layersSvc().updateLayer(tempLayer);
    }
  }
}
