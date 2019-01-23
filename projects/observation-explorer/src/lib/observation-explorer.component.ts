import { Component, Input, Inject, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { IOwsContext, IOwsResource } from '@ukis/datatypes-owc-json';

import { ObservationExplorerService } from "./observation-explorer.service";
import { LayersService } from '@ukis/services-layers';
import { MapStateService } from '@ukis/services-map-state';

import { Subscription } from 'rxjs';

@Component({
  selector: 'ukis-observation-explorer',
  templateUrl: './observation-explorer.component.html',
  styles: []
})
export class ObservationExplorerComponent implements OnInit, OnChanges, OnDestroy {
  @Input('layers-svc') layersSvc: LayersService;
  @Input('map-state-svc') mapStateSvc: MapStateService;
  @Input('ows-context') owsContext: IOwsContext;

  @Input('bbox-filter') bboxfilter?: (value: IOwsResource, index: number, array: IOwsResource[]) => any;
  @Input('table-props') tableProps?: string[];

  layerGroupsSubscription: Subscription;


  observations: IOwsResource[];
  filterOnBbox: boolean = false;
  filteredobservations: IOwsResource[] = [];
  observationProperties: string[] = [];
  observationSelected: IOwsResource[] = [];
  observationSelectedIDs: string[] = [];

  constructor(@Inject(ObservationExplorerService) private obsSvc: ObservationExplorerService) {

  }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.owsContext) {
      this.observations = this.owsContext.features;
      this.filteredobservations = this.observations;
      this.getObservationProperties()
    }
  }

  getObservationProperties() {
    if (this.tableProps) {
      this.observationProperties = this.tableProps;
    } else if (this.observations) {
      if (this.observations[0]) {
        this.observationProperties = Object.keys(this.observations[0].properties.customAttributes);
      }
    }
  }

  isObservationOnMap(resource: IOwsResource): boolean {
    let value: boolean = false;
    //this.layersSvc.isInLayergroups()
    return value;
  }

  addObservation(resource: IOwsResource) {
    let layerGroup = this.obsSvc.addObservation(resource);

    this.layersSvc.addLayerGroup(layerGroup);

    //zoomTo added observation
    if (this.mapStateSvc && layerGroup.bbox && layerGroup.bbox.length >= 4) {
      this.mapStateSvc.setExtent(layerGroup.bbox);
    }
  }
  removeObservationById(id: string) {
    this.layersSvc.removeLayerOrGroupById(id);
  }

  customFilter(active: boolean) {
    if (this.bboxfilter) {
      if (active) {
        this.filteredobservations = this.observations.filter(this.bboxfilter)
      } else {
        this.filteredobservations = this.observations;
      }
    }
  }

  ngOnDestroy() {
    this.layerGroupsSubscription.unsubscribe();
  }

  selectionChanged(sel: IOwsResource[]) {
    console.log("change", sel)
    let oldIds = [], newIds = [];

    // add new layers  
    sel.forEach(observation => {
      if (this.observationSelectedIDs.indexOf(observation.id.toString()) != -1) {
        oldIds.push(observation.id)
      } else {
        this.addObservation(observation)
        newIds.push(observation.id);
      }
    })

    // remove old layers
    oldIds = this.observationSelectedIDs.filter(id => {
      if (oldIds.indexOf(id) != -1)
        return true;
      this.removeObservationById(id)
    })

    // update teh id array for the next run
    this.observationSelectedIDs = [...oldIds, ...newIds];
  }

}
