import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-example-layer-action',
  templateUrl: './example-layer-action.component.html',
  styleUrls: ['./example-layer-action.component.scss']
})
export class ExampleLayerActionComponent implements OnInit {
  @Input() layer;

  @Input() value = 1;
  constructor() { }

  changeValue(event) {
    this.value = parseInt(event.target.value, 10);
    if (this.layer.custom_layer) {
      this.layer.custom_layer.setRadius(this.value);
    }
  }
  ngOnInit(): void {
    if (this.layer.custom_layer) {
      this.layer.custom_layer.setRadius(this.value);
    }
  }

}
