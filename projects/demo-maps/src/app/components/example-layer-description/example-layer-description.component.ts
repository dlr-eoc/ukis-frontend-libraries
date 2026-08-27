import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-example-layer-description',
    templateUrl: './example-layer-description.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./example-layer-description.component.scss']
})
export class ExampleLayerDescriptionComponent implements OnInit {
  @Input() layer;
  @Input() description;
  constructor() { }

  ngOnInit(): void {
  }

}
