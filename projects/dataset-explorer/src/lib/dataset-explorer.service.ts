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

  addObservation(observation: IOwsResource) {
    let offerings = observation.properties.offerings;



    /*
    this.layersSvc.addLayerGroup(layerGroup);

    //zoomTo added observation
    if (this.mapState && layerGroup.bbox && layerGroup.bbox.length >= 4) {
      this.mapState.setExtent(layerGroup.bbox);
    }
    */

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
  /*
  removeObservation(observation: IOwsResource) {
    this.layersSvc.removeLayerGroupByID(observation.properties.title);
  }
  */

  createVectorLayerFromOffering(offering: IOwsOffering, observation: IOwsResource) {
    let legendUrl = "";
    let iconUrl = "";

    if (offering.customAttributes.legendUrl) {
      legendUrl = offering.customAttributes.legendUrl;
    }

    if (offering.customAttributes.iconUrl) {
      iconUrl = offering.customAttributes.iconUrl;
    }

    //let layerUrl = observation.id + offering.operations[0].href;
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

  createVectorLayer(lName, offering: IOwsOffering, observation, layerUrl?, legendUrl?, iconUrl?) {
    let layeroptions = new VectorLayer({
      name: observation.properties.title,
      id: observation.id,
      displayName: offering.customAttributes.title,
      visible: true,
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
    let legendUrl = "";
    let iconUrl = "";

    if (offering.customAttributes.legendUrl) {
      //legendUrl = observation.id + offering.customAttributes.legendUrl;
      legendUrl = offering.customAttributes.legendUrl;
    }

    if (offering.customAttributes.iconUrl) {
      iconUrl = offering.customAttributes.iconUrl;
    }

    //let layerUrl = observation.id + offering.operations[0].href.substr(0, offering.operations[0].href.lastIndexOf("?"));
    let layerUrl = offering.operations[0].href.substr(0, offering.operations[0].href.lastIndexOf("?"));
    let params = this.getJsonFromUrl(offering.operations[0].href);
    let lName = params['LAYERS'];
    if (!offering.customAttributes.title) {
      offering.customAttributes.title = observation.properties.title;
    }

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
      displayName: offering.customAttributes.title,
      visible: true,
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
