import { Component, effect, input, model } from '@angular/core';
import { ClrCommonFormsModule, ClrRangeModule } from '@clr/angular';
import { CustomLayer } from '@dlr-eoc/services-layers';

@Component({
  imports: [ClrRangeModule, ClrCommonFormsModule],
  selector: 'app-example-layer-action',
  styleUrl: './example-layer-action.scss',
  templateUrl: './example-layer-action.html',
})
export class ExampleLayerAction {
  layer = input<CustomLayer>()
  layerChange = effect(() => {
    this.setRadius();
  });


  // TODO: set value not working with 
  value = model<number>()
  valueChange = effect(() => {
    this.setRadius()
  });


  constructor() { }

  setRadius = () => {
    const value = this.value();
    const layer = this.layer()
    if (layer && layer.custom_layer) {
      layer.custom_layer.setRadius(value);
    }
  }

  changeValue(event: Event) {
    const target = (event?.target as HTMLInputElement);
    const value = parseInt(target.value, 10);
    this.value.set(value);
  }
}
