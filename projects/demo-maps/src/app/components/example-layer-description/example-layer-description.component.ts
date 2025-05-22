import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-example-layer-description',
    templateUrl: './example-layer-description.component.html',
    styleUrls: ['./example-layer-description.component.scss']
})
export class ExampleLayerDescriptionComponent implements OnInit {
  @Input() layer;
  @Input() description;
  constructor() { }

  ngOnInit(): void {
  }

}
