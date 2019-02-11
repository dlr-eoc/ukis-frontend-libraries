import { Injectable, Input } from '@angular/core';

import { Subscription } from 'rxjs';
import { LayerGroup, VectorLayer, RasterLayer, IRasterLayerOptions, Layer } from '@ukis/datatypes-layers';
import { IOwsContext, IOwsResource, IOwsOffering } from '@ukis/datatypes-owc-json';


import { OwcJsonService } from '@ukis/services-owc-json';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatasetExplorerService {

  // @Input('layers') layers: LayersService;
  //@Input('mapState') mapState: MapStateService;
  observations: Array<any>;
  observationProperties: Array<any>;

  layergroups: Array<LayerGroup>;
  layerGroupsSubscription: Subscription;

  constructor(
    private http: HttpClient,
    private owcSvc: OwcJsonService) {
    /*
    this.layerGroupsSubscription = this.layersSvc.getLayerGroups().subscribe(layergroups => {
      this.layergroups = layergroups;
    });
    */
  }

  getObservations(url: string): Observable<IOwsContext> {
    return this.owcSvc.getContextFromServer(url);
  }

  /* 
  * this function name is misleading: it should be createLayer, as it creates a Vector or RasterLayer and returns it to the caller
  */
  addObservation(observation: IOwsResource) {
    let offerings = observation.properties.offerings;


    for (let offering of offerings) {
      let code = this.owcSvc.getOfferingCode(offering);

      switch (code) {
        case "wms": {
          return this.createRasterLayerFromOffering(offering, observation);

        }
        case "wfs": {
          return this.createVectorLayerFromOffering(offering, observation);

        }
      }
    }

  }

  private createVectorLayerFromOffering(offering: IOwsOffering, observation: IOwsResource) {
    let layer = this.owcSvc.createVectorLayerFromOffering(offering, observation);
    if(layer.url) {
      this.http.get(layer.url).pipe(map((response: IOwsContext) => response)).subscribe(data => {
        layer.data = data;
        //this.layersSvc.updateLayerGroup(layerGroup, true);
      });
    }
    return layer;
  }

  private createRasterLayerFromOffering(offering: IOwsOffering, observation: IOwsResource) {
    return this.owcSvc.createRasterLayerFromOffering(offering, observation);
  } 

  
}
