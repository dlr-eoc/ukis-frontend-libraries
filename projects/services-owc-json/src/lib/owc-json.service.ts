/**
 * OWS Context Service 
 * OGC OWS Context Geo Encoding Standard Version: 1.0
 * http://docs.opengeospatial.org/is/14-055r2/14-055r2.html
 * http://www.owscontext.org/owc_user_guide/C0_userGuide.html
 */

import { Injectable } from '@angular/core';
import { IOwsContext, IOwsResource, IOwsOffering } from '@ukis/datatypes-owc-json';
import { ILayerGroupOptions, ILayerOptions, IRasterLayerOptions, VectorLayer, RasterLayer } from '@ukis/datatypes-layers';


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

  /**
   * retrieve layer status active / inactove based on IOwsResource
   * @param resource 
   */
  isActive(resource: IOwsResource) { 
    let active = true;
    if(resource.properties.hasOwnProperty("active")){      
      active = resource.properties.active;
    }
    return active;
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

    /**
     * Helper function to extract legendURL from project specific ows Context
     * @param offering layer offering
     */
  getLegendUrl(offering: IOwsOffering) {
    let legendUrl = "";
    
    if (offering.hasOwnProperty("styles")) {
      let defaultStyle = offering.styles.filter(style => style.default);
      if(defaultStyle.length > 0){
        console.log(defaultStyle[0].legendURL);
        return defaultStyle[0].legendURL;
      } 
    } else if(offering.hasOwnProperty("customAttributes")){
      if (offering.customAttributes.legendUrl) {        
        legendUrl = offering.customAttributes.legendUrl;
      }
    }
    return legendUrl;
  }

   /**
    * retrieve iconUrl based on IOwsOffering
    * @param offering 
    */
  getIconUrl(offering: IOwsOffering) {
    let iconUrl = "";
    if(offering.hasOwnProperty("customAttributes")){
      if (offering.customAttributes.iconUrl) {        
        iconUrl = offering.customAttributes.iconUrl;
      }
    }
    return iconUrl;
  }

  createVectorLayerFromOffering(offering: IOwsOffering, observation: IOwsResource) {
    let legendUrl = this.owcSvc.getLegendUrl(offering);
    let iconUrl = this.owcSvc.getIconUrl(offering);
   

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



  createRasterLayerFromOffering(offering: IOwsOffering, observation: IOwsResource) {
    let legendUrl = this.getLegendUrl(offering);
    let iconUrl = this.getIconUrl(offering);

    //let layerUrl = observation.id + offering.operations[0].href.substr(0, offering.operations[0].href.lastIndexOf("?"));
    let layerUrl = offering.operations[0].href.substr(0, offering.operations[0].href.lastIndexOf("?"));
    let urlParams = this.getJsonFromUrl(offering.operations[0].href);
   
    

    let layeroptions = this.createRasterLayer(urlParams, offering, layerUrl, observation, legendUrl);
    let layer = new RasterLayer(layeroptions);
    if (observation.bbox) {
      layer.bbox = <[number, number, number, number]>observation.bbox;
    }
    return layer;

  }

  private createVectorLayer(lName, offering: IOwsOffering, observation, layerUrl?, legendUrl?, iconUrl?, isActive?) {
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


  private createRasterLayer(urlParams, offering: IOwsOffering, layerUrl, observation, legendUrl?) {
    let rasterOptions: IRasterLayerOptions = {
      name: observation.properties.title,
      id: observation.id,
      displayName: this.getDisplayName(offering, observation),
      visible: this.isActive(observation),
      type: 'wms',
      removable: true,
      params: {
        layers: urlParams['LAYERS'],
        format: urlParams['FORMAT'],
        time: urlParams['TIME'],
        version: urlParams['VERSION'],
        tiled: urlParams['TILED'],
        transparent: true
        
      },
      url: layerUrl,
      attribution: '&copy, <a href="dlr.de/eoc">DLR</a>',
      continuousWorld: false,
      legendImg: legendUrl,
      opacity: 1
    }
   
    return rasterOptions;
  }



  /** Misc --------------------------------------------------- */
  /**
   * helper to pack parameter of a url into a JSON
   * @param url any url with parameter
   */
  getJsonFromUrl(url: string) {
    var query = url.substr(url.lastIndexOf("?") + 1);
    var result = {};
    query.split("&").forEach(function (part) {
      var item = part.split("=");
      result[item[0].toUpperCase()] = decodeURIComponent(item[1]);
    });
    return result;
  }

}