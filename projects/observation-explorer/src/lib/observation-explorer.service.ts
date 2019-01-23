import { Injectable, Input } from '@angular/core';

import { Subscription } from 'rxjs';
import { LayerGroup, VectorLayer, RasterLayer, IRasterLayerOptions, IVectorLayerOptions, Layer } from '@ukis/datatypes-layers';
import { IOwsContext, IOwsResource, IOwsOffering } from '@ukis/datatypes-owc-json';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ObservationExplorerService {

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
    //this.owcJsonService.
  }

  getObservations(url: string): Observable<IOwsContext> {
    return this.http.get(url).pipe(map((response: IOwsContext) => response));
  }

  addObservation(resource: IOwsResource) {
    let offerings = resource.properties.offerings;
    let layerGroup = new LayerGroup({
      'filtertype': 'Overlays',
      'id': resource.id.toString(),
      'name': resource.properties.title,
      'removable': true,
      'layers': []
    });

    if (resource.properties.bbox) {
      layerGroup.bbox = resource.properties.bbox;
    }

    for (let offering of offerings) {
      let code = this.getOfferingCode(offering.code);

      switch (code) {
        case "wms": {
          this.createRasterLayerFromOffering(offering, resource, layerGroup);
          break;
        }
        case "wfs": {
          this.createVectorLayerFromOffering(offering, resource, layerGroup);
          break;
        }
      }
    }

    return layerGroup;
  }
  /*
  removeObservation(observation: IOwsResource) {
    this.layersSvc.removeLayerGroupByID(observation.properties.title);
  }
  */

  createVectorLayerFromOffering(offering: IOwsOffering, observation: IOwsResource, layerGroup: LayerGroup) {
    let legendUrl = "";
    let iconUrl = "", layerUrl, params, lName, layeroptins: IVectorLayerOptions, layer: VectorLayer;

    if (offering.customAttributes && offering.customAttributes.legendUrl) {
      legendUrl = offering.customAttributes.legendUrl;
    }

    if (offering.customAttributes && offering.customAttributes.iconUrl) {
      iconUrl = offering.customAttributes.iconUrl;
    }

    if (offering.operations) {
      //should be: offering.code == 'http://www.opengis.net/spec/owc-geojson/1.0/req/wfs'
      offering.operations.forEach((operation) => {
        if (operation.code == 'GetFeature') {
          layerUrl = operation.href;
          params = this.getJsonFromUrl(operation.href);
        }
      })

      //let layerUrl = observation.id + offering.operations[0].href;
      //let layerUrl = offering.operations[0].href;
      //let params = this.getJsonFromUrl(offering.operations[0].href);
      lName = params['typeName'];
      layeroptins = this.createVectorLayer(lName, offering, layerUrl, legendUrl, iconUrl)
      layer = new VectorLayer(layeroptins);

      //TODO the response is not an ows context???
      this.http.get(layerUrl).pipe(map((response: IOwsContext) => response)).subscribe(data => {
        layer.data = data;
        layerGroup.layers.push(layer);
        //this.layersSvc.updateLayerGroup(layerGroup, true);
      });

    } else if (offering.contents) {

    }
  }

  createVectorLayer(lName, offering: IOwsOffering, layerUrl?, legendUrl?, iconUrl?) {
    let layeroptions: IVectorLayerOptions = {
      name: lName,
      id: lName,
      visible: true,
      type: 'geojson',
      removable: true,
      attribution: '&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',
      continuousWorld: false,
      opacity: 1
    };

    if (offering.customAttributes && offering.customAttributes.title) {
      layeroptions.displayName = offering.customAttributes.title
    }

    if (layerUrl) {
      layeroptions.url = layerUrl;
    }
    if (legendUrl) {
      layeroptions.legendImg = legendUrl;
    }
    return layeroptions;
  }

  createRasterLayerFromOffering(offering: IOwsOffering, observation: IOwsResource, layerGroup: LayerGroup) {
    let legendUrl = "";
    let iconUrl = "";

    if (offering.customAttributes && offering.customAttributes.legendUrl) {
      //legendUrl = observation.id + offering.customAttributes.legendUrl;
      legendUrl = offering.customAttributes.legendUrl;
    }

    if (offering.customAttributes && offering.customAttributes.iconUrl) {
      iconUrl = offering.customAttributes.iconUrl;
    }

    //let layerUrl = observation.id + offering.operations[0].href.substr(0, offering.operations[0].href.lastIndexOf("?"));
    let layerUrl = offering.operations[0].href.substr(0, offering.operations[0].href.lastIndexOf("?"));
    let params = this.getJsonFromUrl(offering.operations[0].href);
    let lName = params['LAYERS'];
    let layeroptins = this.createRasterLayer(lName, offering, layerUrl, legendUrl);
    let layer = new RasterLayer(layeroptins);
    layerGroup.layers.push(layer);
    //TODO update layers !!!!!!
    //this.layersSvc.updateLayerGroup(layerGroup, true);
  }

  createRasterLayer(lName, offering: IOwsOffering, layerUrl, legendUrl?) {
    let rasterOptions: IRasterLayerOptions = {
      name: lName,
      id: lName,
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

    if (offering.customAttributes && offering.customAttributes.title) {
      rasterOptions.displayName = offering.customAttributes.title
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
