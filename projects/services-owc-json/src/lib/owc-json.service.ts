
import { Injectable } from '@angular/core';
import { IOwsContext, IOwsResource, IOwsOffering, IOwsOperation, IOwsContent, IEocOwsContext, IEocOwsResource, IEocOwsOffering, WMS_Offering, WFS_Offering, WCS_Offering, CSW_Offering, WMTS_Offering, GML_Offering, KML_Offering, GeoTIFF_Offering, GMLJP2_Offering, GMLCOV_Offering, GeoJson_Offering, Xyz_Offering } from '@ukis/datatypes-owc-json';
import { ILayerGroupOptions, ILayerOptions, IRasterLayerOptions, VectorLayer, RasterLayer, IVectorLayerOptions, Layer, TLayertype, WmsLayertype, WmtsLayertype, WfsLayertype, GeojsonLayertype, CustomLayer, CustomLayertype, XyzLayertype, TRasterLayertype, isRasterLayertype, isVectorLayertype, TVectorLayertype } from '@ukis/datatypes-layers';
import { TGeoExtent } from '@ukis/datatypes-map-state';
import { ReplaceSource } from 'webpack-sources';




export function isWmsOffering(str: string): str is WMS_Offering {
  return str == 'http://www.opengis.net/spec/owc-geojson/1.0/req/wms' || str == 'http://schemas.opengis.net/wms/1.1.1' || str == 'http://schemas.opengis.net/wms/1.1.0';
}
export function isWfsOffering(str: string): str is WFS_Offering {
  return str == 'http://www.opengis.net/spec/owc-geojson/1.0/req/wfs';
}
export function isWpsOffering(str: string): str is WCS_Offering {
  return str == 'http://www.opengis.net/spec/owc-geojson/1.0/req/wcs';
}
export function isCswOffering(str: string): str is CSW_Offering {
  return str == 'http://www.opengis.net/spec/owc-geojson/1.0/req/csw';
}
export function isWmtsOffering(str: string): str is WMTS_Offering {
  return str == 'http://www.opengis.net/spec/owc-geojson/1.0/req/wmts';
}
export function isGmlOffering(str: string): str is GML_Offering {
  return str == 'http://www.opengis.net/spec/owc-geojson/1.0/req/gml';
}
export function isKmlOffering(str:string): str is KML_Offering { 
  return str == 'http://www.opengis.net/spec/owc-geojson/1.0/req/kml';
}
export function isGeoTIFFOffering(str:string): str is GeoTIFF_Offering { 
  return str == 'http://www.opengis.net/spec/owc-geojson/1.0/req/geotiff';
}
export function isGMLJP2Offering(str:string): str is GMLJP2_Offering { 
  return str == 'http://www.opengis.net/spec/owc-geojson/1.0/req/gmljp2';
}
export function isGMLCOVOffering(str:string): str is GMLCOV_Offering { 
  return str == 'http://www.opengis.net/spec/owc-geojson/1.0/req/gmlcov';
}
export function isXyzOffering(str: string): str is Xyz_Offering {
  return str == 'http://www.opengis.net/spec/owc-geojson/1.0/req/xyz';
}
export function isGeoJsonOffering (str: string): str is GeoJson_Offering {
  return str == 'http://www.opengis.net/spec/owc-geojson/1.0/req/geojson';
}

/**
 * OWS Context Service 
 * OGC OWS Context Geo Encoding Standard Version: 1.0
 * http://docs.opengeospatial.org/is/14-055r2/14-055r2.html
 * http://www.owscontext.org/owc_user_guide/C0_userGuide.html
 * 
 * This service allows you to read and write OWC-data. 
 * We have added some custom fields to the OWC standard. 
 *   - accepts the OWC-standard-datatypes as function inputs (so as to be as general as possible)
 *   - returns our extended OWC-datatypes as function outputs (so as to be as information-rich as possible)
 *   
 */

@Injectable({
  providedIn: 'root'
})
export class OwcJsonService {

  constructor() {
    //http://www.owscontext.org/owc_user_guide/C0_userGuide.html#truegeojson-encoding-2
  }


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
    if (resource.properties.hasOwnProperty("active")) {
      active = resource.properties.active;
    }
    return active;
  }

  getResourceOpacity(resource: IOwsResource): number {
    let opacity = 1;
    if (resource.properties.hasOwnProperty("opacity")) {
      opacity = resource.properties.opacity;
    }
    return opacity;
  }

  getResourceAttribution(resource: IOwsResource): string {
    let attribution = '';
    if (resource.properties.hasOwnProperty("attribution")) {
      attribution = resource.properties.attribution;
    }
    return attribution;
  }

  getResourceShards(resource: IOwsResource): string {
    if (resource.properties.hasOwnProperty("shards")) {
      return resource.properties.shards;
    }
  }


  /** Offering --------------------------------------------------- */
  getLayertypeFromOfferingCode(offering: IOwsOffering): TLayertype {
    if(isWmsOffering(offering.code)) return WmsLayertype;
    if(isWmtsOffering(offering.code)) return WmtsLayertype;
    if(isWfsOffering(offering.code)) return WfsLayertype;
    if(isGeoJsonOffering(offering.code)) return GeojsonLayertype;
    if(isXyzOffering(offering.code)) return XyzLayertype;
    else return offering.code; // an offering can also be any other string. 
  }

  checkIfServiceOffering(offering: IOwsOffering) {
    return (!offering.contents && offering.operations) ? true : false;
  }

  checkIfDataOffering(offering: IOwsOffering) {
    return (offering.contents && !offering.operations) ? true : false;
  }

  getOfferingContents(offering: IOwsOffering): IOwsOperation[] | IOwsContent[] {
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
      if (defaultStyle.length > 0) {
        return defaultStyle[0].legendURL;
      }
    } else if (offering.hasOwnProperty("legendUrl")) {
      legendUrl = offering.legendUrl;
    }
    return legendUrl;
  }

  /**
   * retrieve iconUrl based on IOwsOffering
   * @param offering 
   */
  getIconUrl(offering: IOwsOffering) {
    let iconUrl = "";
    if (offering.hasOwnProperty("iconUrl")) {
      iconUrl = offering.iconUrl;
    }
    return iconUrl;
  }


  createVectorLayerFromOffering(offering: IOwsOffering, resource: IOwsResource, context?: IOwsContext): VectorLayer {
    let layerType = this.getLayertypeFromOfferingCode(offering);
    
    if(!isVectorLayertype(layerType)){
      console.error(`This type of layer '${layerType}' / offering '${offering.code}' cannot be converted into a Vectorlayer`); 
      return null; 
    }

    let iconUrl = this.getIconUrl(offering);
    
    let layerUrl, params;
    // if we have a operations-offering (vs. a data-offering):
    if(offering.operations) layerUrl = this.getUrlFromUri(offering.operations[0].href);
    if(offering.operations) params = this.getJsonFromUri(offering.operations[0].href);
    
    let data;
    // if we have a data-offering: 
    if(offering.contents) {
      data = offering.contents[0].content;
    }

    let legendUrl = this.getLegendUrl(offering);

    let layerOptions: IVectorLayerOptions = {
      id: resource.id as string,
      name: this.getResourceTitle(resource),
      displayName: this.getDisplayName(offering, resource),
      visible: this.isActive(resource),
      type: layerType,
      removable: true,
      attribution: this.getResourceAttribution(resource),
      continuousWorld: false,
      opacity: this.getResourceOpacity(resource),
      url: layerUrl ? layerUrl : null,
      legendImg: legendUrl ? legendUrl : null,
      data: data
    };


    let layer = new VectorLayer(layerOptions);

    if (resource.bbox) {
      layer.bbox = resource.bbox;
    } else if (context && context.bbox) {
      layer.bbox = context.bbox;
    }

    return layer;
  }




  createRasterLayerFromOffering(offering: IOwsOffering, resource: IOwsResource, context?: IOwsContext): RasterLayer {
    let layerType = this.getLayertypeFromOfferingCode(offering);
    
    if(!isRasterLayertype(layerType)) {
      console.error(`This type of offering '${offering.code}' cannot be converted into a rasterlayer.`);
      return null;
    }

    let customParams;
    switch (layerType) {
      case WmsLayertype:
      case CustomLayertype:
        customParams = this.getWmsSpecificParamsFromOffering(offering, resource);
        break;
      case WmtsLayertype:
        customParams = this.getWmtsSpecifiParamsFromOffering(offering, resource);
        break;
      case XyzLayertype:
        // xyz and wts are simple, pure rest services with no "operations" . 
        break;
    }

    let layerOptions: IRasterLayerOptions = {
      id: resource.id as string,
      type: layerType,
      removable: true,
      continuousWorld: false,
      opacity: this.getResourceOpacity(resource),
      name: this.getResourceTitle(resource),
      displayName: this.getDisplayName(offering, resource),
      visible: this.isActive(resource),
      url: this.getUrlFromUri(offering.operations[0].href),
      attribution: this.getResourceAttribution(resource),
      legendImg: this.getLegendUrl(offering),
      params: customParams,
    }

    let layer: RasterLayer = new RasterLayer(layerOptions);

    if (resource.bbox) {
      layer.bbox = resource.bbox;
    } else if (context && context.bbox) {
      layer.bbox = context.bbox;
    }

    return layer;
  }

  private getWmtsSpecifiParamsFromOffering(offering: IOwsOffering, resource: IOwsResource) {

    let urlParams = this.getJsonFromUri(offering.operations[0].href);

    let params = {
      layers: urlParams['LAYERS'],
      format: urlParams['FORMAT'],
      time: urlParams['TIME'],
      version: urlParams['VERSION'],
      tiled: urlParams['TILED'],
      transparent: true,
      "operations": offering.operations,
      "styles": offering.styles
    };

    return params;

  }


  private getWmsSpecificParamsFromOffering(offering: IOwsOffering, resource: IOwsResource) {

    let urlParams = this.getJsonFromUri(offering.operations[0].href);

    let params = {
      LAYERS: urlParams['LAYERS'],
      FORMAT: urlParams['FORMAT'],
      TIME: urlParams['TIME'],
      VERSION: urlParams['VERSION'],
      TILED: urlParams['TILED'],
      TRANSPARENT: true
    }

    return params;
  }

  /**
   * @TODO: at the moment this function returns a layer for the first offering of every feature. Should it maybe chose  one of the offerings by type?
   */
  public getLayers(owc: IOwsContext): Layer[] {
    let features = owc.features;
    let layers = []

    /** layer priority first wms then wms then wfs if multiple in the offerings */
    for (let feature of features) {
      let offerings = feature.properties.offerings;
      let indx = 0;
      for (let offering of offerings) {
        if (indx > 0) break;
        indx += 1;
        let layerType = this.getLayertypeFromOfferingCode(offering);
        if(isRasterLayertype(layerType)) {
          layers.push(this.createRasterLayerFromOffering(offering, feature, owc));
        } else if(isVectorLayertype(layerType)) {
          layers.push(this.createVectorLayerFromOffering(offering, feature, owc));
        } else {
          console.error(`This type of service (${layerType}) has not been implemented yet.`);
        }
      }
    }
    return layers;
  }

  /** Misc --------------------------------------------------- */

  private getUrlFromUri(uri: string) {
    return uri.substring(0, uri.indexOf("?"));
  }

  /**
   * helper to pack query-parameters of a uri into a JSON
   * @param uri any uri with query-parameters
   */
  private getJsonFromUri(uri: string) {
    var query = uri.substr(uri.lastIndexOf("?") + 1);
    var result = {};
    query.split("&").forEach(function (part) {
      var item = part.split("=");
      result[item[0].toUpperCase()] = decodeURIComponent(item[1]);
    });
    return result;
  }


  /**
   * retrieve display name of layer, based on IOwsResource and IOwsOffering
   * @param offering 
   * @param resource 
   */
  private getDisplayName(offering: IOwsOffering, resource: IOwsResource) {
    let displayName = "";
    if (offering.hasOwnProperty("title")) {
      if (offering.title) {
        displayName = offering.title;
      } else {
        displayName = this.getResourceTitle(resource);
      }
    }
    return displayName;
  }


  /**------------ DATA TO FILE -----------------------------------------*/


  /**
   * @TODO:
   *   - properties
   */
  generateOwsContextFrom(id: string, baselayers: Layer[], overlays: Layer[], extent?: TGeoExtent, properties?): IEocOwsContext {

    if(!properties) {
      properties = {
        lang: "",
        links: [], 
        title: "", 
        updated: ""
      };
    }

    let owc: IEocOwsContext = {
      "id": id,
      "type": "FeatureCollection",
      "properties": properties,
      "features": []
    };

    if (extent) {
      owc["bbox"] = extent;
    }

    for (let baselayer of baselayers) {
      let resource: IEocOwsResource = this.generateResourceFromLayer(baselayer);
      owc.features.push(resource);
    }

    for (let overlay of overlays) {
      let resource: IEocOwsResource = this.generateResourceFromLayer(overlay);
      owc.features.push(resource);
    }

    return owc;
  }

  generateResourceFromLayer(layer: Layer): IEocOwsResource {
    let resource: IEocOwsResource = {
      "id": layer.id,
      "properties": {
        title: layer.name,
        updated: null,
        offerings: [this.generateOfferingFromLayer(layer)],
        opacity: layer.opacity,
        attribution: layer.attribution,
      },
      "type": "Feature",
      "geometry": null
    }
    return resource;
  }

  generateOfferingFromLayer(layer: Layer, legendUrl?: string, iconUrl?: string): IEocOwsOffering {
    let offering: IEocOwsOffering = {
      "code": this.getOfferingCodeFromLayer(layer),
      "title": layer.name
    };

    if(layer.type == GeojsonLayertype) {
      offering.contents = this.getContentsFromLayer(layer as VectorLayer);
    } else {
      offering.operations = this.getOperationsFromLayer(layer);
    }

    if(legendUrl) offering.legendUrl = legendUrl;
    if(iconUrl) offering.iconUrl = iconUrl;
    
    return offering;
  }

  getOfferingCodeFromLayer(layer: Layer): string {
    switch (layer.type) {
      case WmsLayertype:
        return 'http://www.opengis.net/spec/owc-geojson/1.0/req/wms';
      case WmtsLayertype:
        return 'http://www.opengis.net/spec/owc-geojson/1.0/req/wmts';
      case GeojsonLayertype:
        return 'http://www.opengis.net/spec/owc-geojson/1.0/req/geojson';
      case XyzLayertype:
        return 'http://www.opengis.net/spec/owc-geojson/1.0/req/xyz';
      default:
        console.error(`This type of layer (${layer.type}) has not been implemented yet.`);
        return null;
    }
  }

  getContentsFromLayer(layer: VectorLayer): IOwsContent[] {
    let contents = [];
    switch(layer.type) {
      case GeojsonLayertype:
        let content = {
          type: "FeatureCollection",
          content: JSON.stringify(layer.data)
        };
        contents.push(content);
      break;
      default: 
        console.error(`Cannot get contents for this type of vectorlayer: (${layer.type})`);
    }
    return contents;
  }

  getOperationsFromLayer(layer: Layer): IOwsOperation[] {
    if (layer instanceof RasterLayer) {
      switch (layer.type) {
        case WmsLayertype:
          return this.getWmsOperationsFromLayer(layer);
        case WmtsLayertype:
          return this.getWmtsOperationsFromLayer(layer);
        case XyzLayertype:
          return this.getXyzOperationsFromLayer(layer);
        default:
          console.error(`Cannot get operations for this type of layer: (${layer.type})`);
          return [];
      }
    }

    else if (layer instanceof VectorLayer) {
      switch (layer.type) {
        // case "wfs": <--- this type of layer has not been implemented yet in datatypes-layers/Layers.ts 
        //   return this.getWfsOperationsFromLayer(layer);
        default:
          console.error(`This type of service (${layer.type}) has not been implemented yet.`);
          return [];
      }
    }

  }


  getXyzOperationsFromLayer(layer: RasterLayer): IOwsOperation[] {
    let restCall: IOwsOperation = {
      "code": "REST",
      "method": "GET",
      "type": "text/html",
      "href": `${layer.url}`
    }

    let operations: IOwsOperation[] = [
      restCall
    ];

    return operations;
  }

  getTmsOperationsFromLayer(layer: RasterLayer): IOwsOperation[] {
    // @TODO: what operations are defined on TMS? https://wiki.osgeo.org/wiki/Tile_Map_Service_Specification
    return [];
  }


  getWfsOperationsFromLayer(layer: VectorLayer): IOwsOperation[] {

    let url = layer.url;
    let layerName = layer.name;
    let version = layer.options.version ? layer.options.version : "1.1.0";


    let GetFeature: IOwsOperation = {
      "code": "GetFeature",
      "method": "GET",
      "type": "application/json",
      "href": `${url}?service=WFS&version=${version}&request=GetFeature`
    };

    // let DescribeFeatureType: IOwsOperation = null;
    // let GetCapabilities: IOwsOperation = null;
    // let GetPropertyValue: IOwsOperation = null;
    // let GetFeatureWithLock: IOwsOperation = null;
    // let LockFeature: IOwsOperation = null;
    // let Transaction: IOwsOperation = null;
    // let CreateStoredQuery: IOwsOperation = null;
    // let DropStoredQuery: IOwsOperation = null;
    // let ListStoredQueries: IOwsOperation = null;
    // let DescribeStoredQueries: IOwsOperation = null;

    let operations = [
      GetFeature,
      // GetCapabilities,
      // DescribeFeatureType,
      // GetPropertyValue,
      // GetFeatureWithLock,
      // LockFeature,
      // Transaction,
      // CreateStoredQuery,
      // DropStoredQuery,
      // ListStoredQueries,
      // DescribeStoredQueries
    ];

    return operations;
  }


  getWmsOperationsFromLayer(layer: RasterLayer): IOwsOperation[] {

    let url = layer.url;
    let wmsVersion = layer.params.VERSION;
    let layerName = layer.name;
    let layerId = layer.id;
    let format = "image/vnd.jpeg-png";
    if (layer.params && layer.params.FORMAT) format = layer.params.FORMAT;

    let getMap: IOwsOperation = {
      "code": "GetMap",
      "method": "GET",
      "type": format,
      "href": `${url}?service=WMS&version=${wmsVersion}&request=GetMap&TRANSPARENT=TRUE&LAYERS=${layerId}&FORMAT=${format}&TILED=true`
    };

    let getCapabilities: IOwsOperation = {
      "code": "GetCapabilities",
      "method": "GET",
      "type": "application/xml",
      "href": `${url}?service=WMS&version=${wmsVersion}&request=GetCapabilities`
    }

    let getFeatureInfo: IOwsOperation = {
      "code": "GetFeatureInfo",
      "method": "GET",
      "type": "text/html",
      "href": `${url}?service=WMS&version=${wmsVersion}&request=GetFeatureInfo&TRANSPARENT=TRUE&LAYERS=${layerId}&FORMAT=${format}`
    }

    let operations: IOwsOperation[] = [
      getMap,
      getCapabilities,
      getFeatureInfo
    ];

    return operations;
  }

  getWmtsOperationsFromLayer(layer: RasterLayer): IOwsOperation[] {

    let url = layer.url;
    let wmtsVersion = layer.params.version;
    let layerName = layer.name;
    let layerId = layer.id;
    let format = "image/vnd.jpeg-png";
    if (layer.params && layer.params.FORMAT) format = layer.params.FORMAT;

    let getTile: IOwsOperation = {
      "code": "GetTile",
      "href": `${url}?SERVICE=WMTS&REQUEST=GetTile&FORMAT=${format}&LAYER=${layerId}&VERSION=${wmtsVersion}`,
      "method": "GET",
      "type": format
    };

    let getCapabilities: IOwsOperation = {
      "code": "GetCapabilities",
      "href": `${url}?SERVICE=WMTS&REQUEST=GetCapabilities&VERSION=${wmtsVersion}`,
      "method": "GET",
      "type": "application/xml"
    }

    // Note: we deliberately use the WMS protocol here instead of WMTS.
    // Reason: WMTS delivers RGB-values, wheras WMS delivers the actual value that was used to create a tile.
    let getFeatureInfo: IOwsOperation = {
      "code": "GetFeatureInfo",
      "href": `${url}?SERVICE=WMS&REQUEST=GetFeatureInfo&VERSION=${wmtsVersion}`,
      "method": "GET",
      "type": "text/html"
    }

    let operations: IOwsOperation[] = [
      getTile,
      getCapabilities,
      getFeatureInfo
    ];

    return operations;
  }
}