import { Injectable, Input } from '@angular/core';

import { Subscription } from 'rxjs';
import { LayerGroup, VectorLayer, RasterLayer, IRasterLayerOptions, Layer } from '@ukis/datatypes-layers';
import { IOwsContext, IOwsResource, IOwsOffering } from '@ukis/datatypes-owc-json';
import { LayersService } from '@ukis/services-layers';
import { MapStateService } from '@ukis/services-map-state';

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
  observationProperties: Array<any>

  layergroups: Array<LayerGroup>
  layerGroupsSubscription: Subscription;

  constructor(public http: HttpClient) {
    /*
    this.layerGroupsSubscription = this.layersSvc.getLayerGroups().subscribe(layergroups => {
      this.layergroups = layergroups;
    });
    */
  }

  getObservations(url: string): Observable<IOwsContext> {
    return this.http.get(url).pipe(map((response: IOwsContext) => response));
  }

  /* 
  * this function name is misleading: it should be createLayer, as it creates a Vector or RasterLayer and returns it to the caller
  */
  addObservation(observation: IOwsResource) {
    let offerings = observation.properties.offerings;


    for (let offering of offerings) {
      let code = this.getOfferingCode(offering.code);

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
  /**
   * Helper function to extract legendURL from project specific ows Context
   * @param offering layer offering
   */
  getLegendUrl(offering: IOwsOffering) {
    let legendUrl = "";
    if(offering.hasOwnProperty("customAttributes")){
      if (offering.customAttributes.legendUrl) {        
        legendUrl = offering.customAttributes.legendUrl;
      }
    }
    return legendUrl;
  }

  getIconUrl(offering: IOwsOffering) {
    let iconUrl = "";
    if(offering.hasOwnProperty("customAttributes")){
      if (offering.customAttributes.iconUrl) {        
        iconUrl = offering.customAttributes.iconUrl;
      }
    }
    return iconUrl;
  }
  getDisplayName(offering: IOwsOffering, observation: IOwsResource) {
    let displayName = "";
    if(offering.hasOwnProperty("customAttributes")){
      if (offering.customAttributes.title) {        
        displayName = offering.customAttributes.title;
      } else { 
        displayName = observation.properties.title
      }
    }
    return displayName;
  }

  isActive(observation: IOwsResource) { 
    let active = true;
    if(observation.properties.active){
      console.log("active: ", observation.properties.active);
      active = observation.properties.active;
    }
    return true;
  }

  createVectorLayerFromOffering(offering: IOwsOffering, observation: IOwsResource) {
    let legendUrl = this.getLegendUrl(offering);
    let iconUrl = this.getIconUrl(offering);
   

    let layerUrl = offering.operations[0].href;
    let params = this.getJsonFromUrl(offering.operations[0].href);
    let lName = params['typeName'];
    let layeroptins = this.createVectorLayer(lName, offering, observation, layerUrl, legendUrl, iconUrl)
    let layer = new VectorLayer(layeroptins);
    if (observation.bbox) {
      layer.bbox = <[number, number, number, number]>observation.bbox;
    }
    this.http.get(layerUrl).pipe(map((response: IOwsContext) => response)).subscribe(data => {
      layer.data = data;

      //this.layersSvc.updateLayerGroup(layerGroup, true);
    });
    return layer;
  }

  createVectorLayer(lName, offering: IOwsOffering, observation, layerUrl?, legendUrl?, iconUrl?, isActive?) {
    let layeroptions = new VectorLayer({
      name: observation.properties.title,
      id: observation.id,
      displayName: this.getDisplayName(offering, observation),
      visible: this.isActive(observation),
      type: 'geojson',
      removable: true,
      attribution: '&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',
      continuousWorld: false,
      opacity: 1
    });

    if (layerUrl) {
      layeroptions.url = layerUrl;
    }
    if (legendUrl) {
      layeroptions.legendImg = legendUrl;
    }
   
    return layeroptions;
  }

  createRasterLayerFromOffering(offering: IOwsOffering, observation: IOwsResource) {
    let legendUrl = this.getLegendUrl(offering);
    let iconUrl = this.getIconUrl(offering);

    // check if customAttributes is set, and retrieve information (this is for project-coastalx)
    if(offering.hasOwnProperty("customAttributes")){
      
      if (!offering.customAttributes.title) {
        offering.customAttributes.title = observation.properties.title;
      }
    }

    //let layerUrl = observation.id + offering.operations[0].href.substr(0, offering.operations[0].href.lastIndexOf("?"));
    let layerUrl = offering.operations[0].href.substr(0, offering.operations[0].href.lastIndexOf("?"));
    let params = this.getJsonFromUrl(offering.operations[0].href);
    let lName = params['LAYERS'];
    

    let layeroptins = this.createRasterLayer(lName, offering, layerUrl, observation, legendUrl);
    let layer = new RasterLayer(layeroptins);
    if (observation.bbox) {
      layer.bbox = <[number, number, number, number]>observation.bbox;
    }
    return layer;

  }

  createRasterLayer(lName, offering: IOwsOffering, layerUrl, observation, legendUrl?) {
    let rasterOptions: IRasterLayerOptions = {
      name: observation.properties.title,
      id: observation.id,
      displayName: this.getDisplayName(offering, observation),
      visible: this.isActive(observation),
      type: 'wms',
      removable: true,
      params: {
        layers: lName,
        format: 'image/png',
        transparent: true,
        attribution: "",
      },
      url: layerUrl,
      attribution: '&copy, <a href="dlr.de/eoc">DLR</a>',
      continuousWorld: false,
      legendImg: legendUrl,
      opacity: 1
    }
   
    return rasterOptions;
  }

  getJsonFromUrl(url: string) {
    var query = url.substr(0);
    var result = {};
    query.split("&").forEach(function (part) {
      var item = part.split("=");
      result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
  }

  getOfferingCode(offeringCode: string): string {
    let code = offeringCode.substr(offeringCode.lastIndexOf("/") + 1);
    return code;
  }

}
