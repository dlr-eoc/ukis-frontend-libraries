import {Component, Input, OnInit} from '@angular/core';
import { google_earth, google_hybrid, google_maps, osm, eoc_litemap } from '@ukis/baseLayers/rasterBaseLayers';
@Component({
  selector: 'ukis-observationlist',
  templateUrl: './observationlist.component.html',
  styleUrls: ['./observationlist.component.scss']
})
export class ObservationlistComponent implements OnInit {

  @Input('layerSvc') layerSvc: any;

  layers = [
   // google_earth,
    google_hybrid,
   // google_maps,
    osm,
    eoc_litemap
  ];


  constructor() { }

  ngOnInit() {
  }

  addOverlay(layer){
    this.layerSvc.addOverlay(layer);
    console.log(layer);
  }

}
