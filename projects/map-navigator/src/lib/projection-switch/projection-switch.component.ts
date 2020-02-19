import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MapOlService } from '@dlr-eoc/map-ol';


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
    this.mapSvc.registerProjection(projection);

    let newProj = this.mapSvc.getOlProjection(projection);

    this.mapSvc.setProjection(newProj);
    this.selectedProj = projection;
  }

}
