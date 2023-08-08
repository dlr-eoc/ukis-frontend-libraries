import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MapOlService } from '@dlr-eoc/map-ol';

import { MapStateService } from '@dlr-eoc/services-map-state';



@Component({
  selector: 'ukis-projection-switch',
  templateUrl: './projection-switch.component.html',
  styles: [],
})
export class ProjectionSwitchComponent implements OnInit {
  @Input('mapSvc') mapSvc: MapOlService;
  @Input('mapStateSvc') mapStateSvc: MapStateService;
  @Input('projectionList') projList: IProjDef[];
  @Input('fitViewToNewExtent') fitViewToNewExtent? = false;
  subscription: Subscription;
  selectedProj: IProjDef;
  constructor() { }

  ngOnInit() {
    if (this.projList[0]) {
      this.setNewProjection(this.projList[0]);
    }
  }

  setNewProjection(projection: IProjDef) {
    this.mapSvc.registerProjection(projection);
    const newProj = this.mapSvc.getOlProjection(projection);
    this.mapSvc.setProjection(newProj);
    if (this.fitViewToNewExtent) {
      this.mapStateSvc.setExtent(projection.worldExtent);
    }
    this.selectedProj = projection;
  }
}

export interface IProjDef {
  code: string; // e.g.: "EPSG:3857"
  proj4js: string; // ' proj4 string, e.g.: "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs"
  title: string; // projection title shown on switch, e.g.: "Spherical Mercator",
  extent: [number, number, number, number]; // projection extent in projected coordinates, e.g.: [-20026376.39, -20048966.10, 20026376.39, 20048966.10],
  worldExtent: [number, number, number, number]; // projection extent in geographical coordinates, e.g.:[-180.0, -85.06, 180.0, 85.06],
  global: true | false; // whether is global or local projection
  units: 'm';
}

