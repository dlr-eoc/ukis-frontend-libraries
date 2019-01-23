/**
 * OWS Context Service 
 * OGC OWS Context Geo Encoding Standard Version: 1.0
 * http://docs.opengeospatial.org/is/14-055r2/14-055r2.html
 * http://www.owscontext.org/owc_user_guide/C0_userGuide.html
 */

import { Injectable } from '@angular/core';
import { IOwsContext, IOwsResource, IOwsOffering } from '@ukis/datatypes-owc-json';
import { ILayerGroupOptions, ILayerOptions } from '@ukis/datatypes-layers';


@Injectable({
  providedIn: 'root'
})
export class OwcJsonService {

  constructor() {
    //http://www.owscontext.org/owc_user_guide/C0_userGuide.html#truegeojson-encoding-2
  }

  /** Context --------------------------------------------------- */
  checkContext(context: IOwsContext) {
    var isContect_1_0;
    if (!Array.isArray(context.properties.links)) {
      isContect_1_0 = context.properties.links.profiles.find(item => item == "http://www.opengis.net/spec/owc-geojson/1.0/req/core")
    } else {
      isContect_1_0 = context.properties.links.find(item => item.href == "http://www.opengis.net/spec/owc-geojson/1.0/req/core")
    }

    if (!isContect_1_0) {
      console.error('this is not a valid OWS Context v1.0!');

    }
    return isContect_1_0;
  }

  getContextTitle(context: IOwsContext) {
    return context.properties.title;
  }

  getContextPublisher(context: IOwsContext) {
    return (context.properties.publisher) ? context.properties.publisher : null;
  }

  getContextExtent(context: IOwsContext) {
    return (context.bbox) ? context.bbox : null; //or [-180, -90, 180, 90];
  }


  getResources(context: IOwsContext) {
    return context.features;
  }

  /** Resource --------------------------------------------------- */
  getResourceTitle(resource: IOwsResource) {
    return resource.properties.title;
  }

  getResourceUpdated(resource: IOwsResource) {
    return resource.properties.updated;
  }

  getResourceDate(resource: IOwsResource) {
    return (resource.properties.date) ? resource.properties.date : null;
  }

  getResourceOfferings(resource: IOwsResource) {
    return (resource.properties.offerings) ? resource.properties.offerings : null;
  }

  /** Offering --------------------------------------------------- */
  getOfferingCode(offering: IOwsOffering) {
    return offering.code.split('/').pop().toLowerCase();
  }

  checkIfServiceOffering(offering: IOwsOffering) {
    return (!offering.contents && offering.operations) ? true : false;
  }

  checkIfDataOffering(offering: IOwsOffering) {
    return (offering.contents && !offering.operations) ? true : false;
  }

  getOfferingContents(offering: IOwsOffering) {
    if (this.checkIfServiceOffering(offering)) {
      return offering.operations;
    } else if (this.checkIfDataOffering(offering)) {
      return offering.contents;
    }
  }


  //https://github.com/Terradue/ows-context-demo/blob/master/src/main/demo/index.html#L245:2

  //create ukis layers ----------------------------------------------------------------------
  layerGroupFromResource(resource: IOwsResource): ILayerGroupOptions {
    let layerGroupOptions: ILayerGroupOptions = {
      filtertype: 'Overlays',
      id: resource.id.toString(),
      name: resource.properties.title,
      removable: true,
      layerRemovable: false,
      layers: []
    };

    if (resource.properties.bbox) {
      layerGroupOptions.bbox = resource.properties.bbox;
    }

    return layerGroupOptions;
  }

  getlayersFromResource(resource: IOwsResource): ILayerOptions {
    let layers: ILayerOptions[] = [];
    let offerings = this.getResourceOfferings(resource);

    let layerOptions: ILayerOptions = {
      name: resource.properties.title,
      id: resource.id.toString(),
      visible: true,
      type: 'custom',
      removable: true,
      attribution: '',
      continuousWorld: false,
      opacity: 1
    }

    return layerOptions;
  }
}
