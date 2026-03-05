import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MapOlService } from '@dlr-eoc/map-ol';

import { IProjDef, MapStateService } from '@dlr-eoc/services-map-state';

import { ClarityIcons, eyeIcon, eyeHideIcon } from '@cds/core/icon';

import { ClrIconModule } from '@clr/angular';
ClarityIcons.addIcons(...[eyeIcon, eyeHideIcon]);

@Component({
  selector: 'ukis-projection-switch',
  templateUrl: './projection-switch.component.html',
  styles: [],
  imports: [
    ClrIconModule
  ]
})
export class ProjectionSwitchComponent implements OnInit {
  @Input('mapSvc') mapSvc: MapOlService;
  @Input('mapState') mapState: MapStateService;
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

  /** if you setProjection is used only with epsg code sting - register Projection have to be called first! */
  setNewProjection(projection: IProjDef) {
    const currentEpsg = this.mapSvc.getProjection().getCode();
    if (currentEpsg !== projection.code) {
      this.mapState.setProjection(projection, 'user', { fitToProjectionExtent: this.fitViewToNewExtent });
    }
    this.selectedProj = projection;
  }
}

