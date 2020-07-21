import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';

@Component({
  selector: 'app-example-layer-action',
  templateUrl: './example-layer-action.component.html',
  styleUrls: ['./example-layer-action.component.scss']
})
export class ExampleLayerActionComponent {
  @Input() layer;

  private privValue = 1;
  @Input() set value(value: number) {
    this.privValue = value;
    if (this.layer.custom_layer) {
      this.layer.custom_layer.setRadius(value);
    }
  }
  get value() {
    return this.privValue;
  }
  @Output() valueChange = new EventEmitter<number>();

  constructor() { }

  changeValue(event) {
    const value = parseInt(event.target.value, 10);
    this.value = value;
    this.valueChange.emit(value);
    if (this.layer.custom_layer) {
      this.layer.custom_layer.setRadius(value);
    }
  }

}
