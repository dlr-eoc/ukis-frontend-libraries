import { Component, effect, input, signal } from '@angular/core';
import { LayerGroup } from '@dlr-eoc/services-layers';

@Component({
  imports: [],
  selector: 'app-example-group-legend',
  styleUrl: './example-group-legend.scss',
  templateUrl: './example-group-legend.html',
})
export class ExampleGroupLegend {
  legendImages = signal<{ url: string }[]>([]);

  group = input.required<LayerGroup>();
  groupChange = effect(() => {
    const group = this.group();
    const layers = group.layers;
    const legendImages = layers.filter(l => l.legendImg && typeof l.legendImg === 'string').map(i => { return { url: i.legendImg } }).filter(i => i).reverse() as never as { url: string }[];
    this.legendImages.set(legendImages);
  });

  constructor() { }
}
