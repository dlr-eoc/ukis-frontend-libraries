import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LayerGroup } from '@dlr-eoc/services-layers';

@Component({
    selector: 'app-example-group-legend',
    templateUrl: './example-group-legend.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./example-group-legend.component.scss']
})
export class ExampleGroupLegendComponent implements OnInit {
  @Input() group: LayerGroup;
  legendImages = [];
  constructor() { }

  ngOnInit(): void {
    this.legendImages = this.group.layers.filter(l => l.legendImg && typeof l.legendImg === 'string').map(i => { return { url: i.legendImg } }).reverse();
  }

}
