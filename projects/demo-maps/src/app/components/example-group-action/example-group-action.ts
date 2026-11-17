import { Component, inject, input } from '@angular/core';
import { LayerGroup, LayersService, ILayerGroupOptions } from '@dlr-eoc/services-layers';

@Component({
  imports: [],
  selector: 'app-example-group-action',
  styleUrl: './example-group-action.scss',
  templateUrl: './example-group-action.html',
})
export class ExampleGroupAction {
  group = input<LayerGroup>();
  public layersSvc = inject(LayersService);
  constructor() {
    this.groupkeys = ['bbox', 'cssClass', 'displayName', 'filtertype', 'id', 'name', 'removable'];
  }
  groupkeys: (keyof ILayerGroupOptions)[];
}
