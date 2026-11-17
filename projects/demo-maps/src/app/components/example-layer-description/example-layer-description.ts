import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-example-layer-description',
  styleUrl: './example-layer-description.scss',
  templateUrl: './example-layer-description.html',
})
export class ExampleLayerDescription {
  description = input.required<string>();
}
