import { Component, OnInit, Input } from '@angular/core';
import { LayerGroup, LayersService, ILayerGroupOptions } from '@dlr-eoc/services-layers';

@Component({
  selector: 'app-example-group-action',
  templateUrl: './example-group-action.component.html',
  styleUrls: ['./example-group-action.component.scss']
})
export class ExampleGroupActionComponent implements OnInit {
  @Input() group: LayerGroup;
  constructor(public layersSvc: LayersService) { }
  groupkeys: (keyof ILayerGroupOptions)[];
  ngOnInit(): void {
    this.groupkeys = ['bbox', 'cssClass', 'displayName', 'filtertype', 'id', 'name', 'removable'];
  }
}
