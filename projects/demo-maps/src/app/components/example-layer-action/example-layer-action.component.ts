import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ClrRangeModule, ClrCommonFormsModule } from '@clr/angular';

@Component({
    selector: 'app-example-layer-action',
    templateUrl: './example-layer-action.component.html',
    styleUrls: ['./example-layer-action.component.scss'],
    standalone: true,
    imports: [ClrRangeModule, ClrCommonFormsModule]
})
export class ExampleLayerActionComponent implements OnInit {
  @Input() layer;

  private privValue = 1;
  @Input() set value(value: number) {
    if (this.privValue !== value) {
      this.privValue = value;

      if (this.layer?.custom_layer) {
        this.layer.custom_layer.setRadius(value);
      }
    }
  }
  get value() {
    return this.privValue;
  }

  @Output() valueChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    this.layer.custom_layer.setRadius(this.value);
  }

  changeValue(event) {
    const value = parseInt(event.target.value, 10);
    this.value = value;
    this.valueChange.emit(value);
    if (this.layer.custom_layer) {
      this.layer.custom_layer.setRadius(value);
    }
  }

}
