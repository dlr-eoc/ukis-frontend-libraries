import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import {MapOlService} from '@ukis/map-ol';
import olProjection from 'ol/proj/Projection';
import { register as olRegister } from 'ol/proj/proj4';
import proj4 from 'proj4';
import {get as getProjection} from 'ol/proj';


@Component({
  selector: 'ukis-projection-switch',
  templateUrl: './projection-switch.component.html',
  styles: []
})
export class ProjectionSwitchComponent implements OnInit {
  @Input('mapSvc') mapSvc?: MapOlService;
  @Input('projectionList') projList: any[];
  subscription: Subscription;
  selectedProj: any;
  constructor() { }

  ngOnInit() {
    if (this.projList[0]) {
      this.setNewProjection(this.projList[0]);
    }
  }

  setNewProjection(projection) {
    proj4.defs(projection.code, projection.proj4js);
    olRegister(proj4);
    let newProj = new getProjection(projection.code);
    this.mapSvc.setProjection(newProj);
    this.selectedProj = projection;
  }

}
