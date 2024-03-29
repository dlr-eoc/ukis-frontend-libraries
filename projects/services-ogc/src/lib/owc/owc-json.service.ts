
import { Injectable } from '@angular/core';
import {
  IOwsContext, IOwsResource, IOwsOffering, IOwsOperation, IOwsContent, kmlOffering, wfsOffering, wmsOffering, wmtsOffering
} from './types/owc-json';
import { DescribeFeatureTypeOperationCode, GetCapabilitiesOperationCode, GetFeatureInfoOperationCode, GetFeatureOperationCode, GetMapOperationCode, GetTileOperationCode, isGeoJsonOffering, isIOwsContext, isIOwsRasterOperation, isKmlOffering, isTMSOffering, isWfsOffering, isWmsOffering, isWmtsOffering, isXyzOffering, RESTOperationCode } from './types/owc-json.utils';
import {
  IEocOwsContext, IEocOwsResource, IEocOwsOffering, IEocOwsWmtsMatrixSet,
  IEocOwsResourceDimension,
  IEocOwsTimeDimension,
  IEocOwsElevationDimension,
  GeoJsonOffering,
  xyzOffering,
  tmsOffering
} from './types/eoc-owc-json';
import {
  ILayerOptions, IRasterLayerOptions, VectorLayer, RasterLayer, IVectorLayerOptions,
  Layer, TLayertype, WmsLayertype, WmtsLayertype, WfsLayertype, GeojsonLayertype, XyzLayertype,
  TRasterLayertype, ILayerDimensions,
  ILayerIntervalAndPeriod,
  WmtsLayer,
  IWmtsOptions,
  WmsLayer,
  IWmsParams,
  IWmsOptions,
  IListMatrixSet,
  TFiltertypes,
  LayerGroup,
  ILayerTimeDimension,
  ILayerElevationDimension,
  Filtertypes,
  TmsLayertype,
  KmlLayertype,
  IWmtsParams,
  TVectorLayertype,
  StackedLayer,
  IStackedLayerOptions
} from '@dlr-eoc/services-layers';
import { TGeoExtent } from '@dlr-eoc/services-map-state';
import { WmtsClientService } from '../wmts/wmtsclient.service';
import { of, Observable, forkJoin, concat } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { DateTime, Interval } from 'luxon';
import { get as getProjection } from 'ol/proj';


export function shardsExpand(v: string) {
  if (!v) { return; }
  const o: string[] = [];
  const shardsSplit = v.split(',');
  for (const i in shardsSplit) {
    if (shardsSplit[i]) {
      const j = shardsSplit[i].split('-');
      if (j.length === 1) {
        o.push(shardsSplit[i]);
      } else if (j.length === 2) {
        const start = j[0].charCodeAt(0);
        const end = j[1].charCodeAt(0);
        if (start <= end) {
          for (let k = start; k <= end; k++) {
            o.push(String.fromCharCode(k).toLowerCase());
          }
        } else {
          for (let k = start; k >= end; k--) {
            o.push(String.fromCharCode(k).toLowerCase());
          }
        }
      }
    }
  }
  return o;
}

/**
 * OWS Context Service
 * OGC OWS Context Geo Encoding Standard Version: 1.0
 * http://docs.opengeospatial.org/is/14-055r2/14-055r2.html
 * http://www.owscontext.org/owc_user_guide/C0_userGuide.html
 *
 * This service allows you to read and write OWC-data.
 * We have added some custom fields to the OWC standard.
 *   - accepts the OWC-standard-data-types as function inputs (so as to be as general as possible)
 *   - returns our extended OWC-data-types as function outputs (so as to be as information-rich as possible)
 *
 * As a policy, this services does *not* make any HTTP requests to GetCapabilities (or similar) to gather
 * additional information (with very few exceptions) - we want to save on network traffic.
 * However there are scripts that auto-generate OWC files from Capabilities, those, of course,
 * *do* scrape as much information online as possible; But they are not intended to be used in
 * a live-application. Run them batch-wise and server-side instead.
 */

@Injectable({
  providedIn: 'root'
})
export class OwcJsonService {

  constructor(
    private wmtsClient: WmtsClientService,
    private http: HttpClient) {
    // http://www.owscontext.org/owc_user_guide/C0_userGuide.html#truegeojson-encoding-2
  }


  checkContext(context: IOwsContext) {
    return isIOwsContext(context);
  }

  getContextTitle(context: IOwsContext) {
    return context.properties.title;
  }

  getContextPublisher(context: IOwsContext) {
    return (context.properties.publisher) ? context.properties.publisher : null;
  }

  getContextExtent(context: IOwsContext) {
    return (context.bbox) ? context.bbox : null; // or [-180, -90, 180, 90];
  }

  getResources(context: IOwsContext): IOwsResource[] {
    return context.features;
  }

  /**
   * Get Resources whith Folder property but not including Layer-Filtertypes
   */
  getGroupResources(context: IOwsContext): IOwsResource[] {
    const resources = context.features;
    return resources.filter(r => {
      const groupName = this.getLayerGroupFromFolder(r);
      return groupName && !Object.keys(Filtertypes).includes(groupName);
    });
  }

  /**
   * Get Resources without Folder property or Folder is only Layer-Filtertypes
   */
  getSingleResources(context: IOwsContext): IOwsResource[] {
    const resources = context.features;
    return resources.filter(r => {
      const groupName = this.getLayerGroupFromFolder(r);
      return !groupName || Object.keys(Filtertypes).includes(groupName);
    });
  }

  /** Resource --------------------------------------------------- */
  getResourceTitle(resource: IOwsResource): string {
    return resource.properties.title;
  }

  /**
   * The Folder property of IOwsResource
   * @returns string | `${TFiltertypes}/string`
   */
  getResourceFolder(resource: IOwsResource): string {
    return resource.properties.folder;
  }

  /**
   * returns name from Resource Folder if it is not only a Filtertype `TFiltertypes`
   */
  private getLayerGroupFromFolder(resource: IOwsResource) {
    const folderName = this.getResourceFolder(resource);
    if (folderName) {
      const folderParts = folderName.split('/');
      if (folderParts.length === 1) {
        if (!Filtertypes[folderName]) {
          return folderName
        }
      } else if (folderParts.length === 2) {
        const filtertype = folderParts[0];
        if (!Filtertypes[filtertype]) {
          console.warn(`Folder (${folderName}) should be named like: ${Object.keys(Filtertypes).map(k => `${k}/<FolderName>`).join(' | ')}`);
        }
        return folderParts[1];
      } else {
        console.log(`only one Folder hierarchy is implemented`, folderParts);
      }
    }
  }

  /**
   * FilterType in IOwsResource Folder property
   */
  getFilterType(resource: IOwsResource): TFiltertypes {
    if (resource.properties.folder) {
      const pathParts = resource.properties.folder.split('/');
      const first = pathParts[0];
      if (Filtertypes[first]) {
        return first as TFiltertypes;
      }
    }
  }

  getResourceUpdated(resource: IOwsResource) {
    return resource.properties.updated;
  }

  getResourceDate(resource: IOwsResource) {
    return (resource.properties.date) ? resource.properties.date : null;
  }

  getResourceOfferings(resource: IOwsResource): IOwsOffering[] {
    return (resource.properties.offerings) ? resource.properties.offerings : null;
  }

  /**
   * retrieve layer status active / inactive based on IOwsResource
   * @param resource: IOwsResource
   */
  isActive(resource: IOwsResource) {
    let active = true;
    if (resource.properties.active === false || resource.properties?.active) {
      active = resource.properties.active;
    }
    return active;
  }

  getResourceDescription(resource: IOwsResource): string {
    let description = '';
    if (resource.properties.abstract) {
      description = resource.properties.abstract;
    }
    return description;
  }

  /** OWS Extenson IEocOwsResource */
  getResourceOpacity(resource: IEocOwsResource): number {
    let opacity = 1;
    if (resource.properties?.opacity) {
      opacity = resource.properties.opacity;
    }
    return opacity;
  }

  /** OWS Extenson IEocOwsResource */
  getResourceAttribution(resource: IEocOwsResource): string {
    let attribution = '';
    if (resource.properties?.attribution) {
      attribution = resource.properties.attribution;
    } else if (resource.properties.rights) {
      attribution = resource.properties.rights;
    }
    return attribution;
  }

  /** OWS Extenson IEocOwsResource */
  getResourceShards(resource: IEocOwsResource): string {
    if (resource.properties?.shards) {
      return resource.properties.shards;
    }
  }

  /** OWS Extenson IEocOwsResource */
  getResourceMinMaxZoom(resource: IEocOwsResource, targetProjection: string = 'EPSG:4326'): { minZoom: number; maxZoom: number; } {
    const zooms = { minZoom: null, maxZoom: null };
    if (resource.properties.minZoom) {
      zooms.minZoom = resource.properties.minZoom;
    } else if (resource.properties.maxscaledenominator) {  // *Max*ScaleDenom ~ *Min*Zoom
      zooms.minZoom = this.scaleDenominatorToZoom(resource.properties.maxscaledenominator, targetProjection) || null;
    }
    if (resource.properties.maxZoom) {
      zooms.maxZoom = resource.properties.maxZoom;
    } else if (resource.properties.minscaledenominator) {  // *Min*ScaleDenom ~ *Max*Zoom
      zooms.maxZoom = this.scaleDenominatorToZoom(resource.properties.minscaledenominator, targetProjection) || null;
    }
    return zooms;
  }


  /**
   * e.g.
   * (array)   value: '1984-01-01T00:00:00.000Z/1989-12-31T23:59:59.000Z/PT1S,1990-01-01T00:00:00.000Z/1994-12-31T23:59:59.000Z/PT1S,...'
   * (array)   value: '1984-01-01T00:00:00.000Z/P1D,P1D/2000-01-01T00:00:00.000Z,...'
   * (array)   value: '2000-01-01T00:00:00.000Z,2001-01-01T00:00:00.000Z,2002-01-01T00:00:00.000Z,...'
   * (single) value: '2016-01-01T00:00:00.000Z/2018-01-01T00:00:00.000Z/P1Y'
   */
  getTimeValueFromDimensions(values: IEocOwsTimeDimension['values'], period?: IEocOwsTimeDimension['display']['period']): ILayerIntervalAndPeriod | Array<string | ILayerIntervalAndPeriod> {
    if (values === null) {
      return;
    } else {
      const isList = /,/g.test(values);
      if (isList) {
        // values: `${string},${string}`
        const splitValues = values.split(',');
        if (splitValues.length > 0) {
          const parsed: Array<string | ILayerIntervalAndPeriod> = []; //
          for (const value of splitValues) {
            const parsedSingle = this.parseSingleTimeOrPeriod(value);
            if (typeof parsedSingle === 'object' && parsedSingle.interval) {
              if (!parsedSingle.periodicity && period) {
                parsedSingle.periodicity = period;
              } else if (!parsedSingle.periodicity && !period) {
                console.warn(`Interval without a period`, values, period);
              }
            }
            parsed.push(parsedSingle);
          }
          return parsed;
        }
      } else {
        // `${string}/${string}` | `${string}/${string}/P${string}`
        const parsedSingle = this.parseSingleTimeOrPeriod(values);
        if (typeof parsedSingle === 'object' && parsedSingle.interval) {
          if (!parsedSingle.periodicity && period) {
            parsedSingle.periodicity = period;
          } else if (!parsedSingle.periodicity && !period) {
            console.warn(`Interval without a period`, values, period);
          }
          return parsedSingle;
        } else if (typeof parsedSingle === 'string') {
          return [parsedSingle];
        }
      }
    }
  }

  /**
   * time could be:
   *
   * - date
   * - start/end/duration //Geoserver specific
   * - start/end
   * - start/duration, and duration/end
   */
  private parseSingleTimeOrPeriod(time: string): string | ILayerIntervalAndPeriod | null {
    const dateTime = DateTime.fromISO(time);
    if (dateTime.isValid) {
      return dateTime.toUTC().toISO();
    } else {
      // is Interval ----------------------------
      const interval = Interval.fromISO(time);
      if (interval.isValid) {
        const period = this.parseISO8601Period(time);
        const intervalObject: ILayerIntervalAndPeriod = {
          periodicity: period,
          interval: `${interval.start.toUTC().toISO()}/${interval.end.toUTC().toISO()}`
        };
        return intervalObject;
      } else {
        console.warn(`no Interval or not valid`, time);
        return null;
      }
    }
  }

  private parseISO8601Period(value: string): string {
    const periodMatches = value.match(/P\d*[YMWD](T\d\d[HMS])*/);
    if (periodMatches) {
      return periodMatches[0];
    }
  }

  getResourceDimensions(resource: IEocOwsResource) {
    if (!resource.properties.dimensions) {
      return undefined;
    }

    const dims: ILayerDimensions = {};
    for (const d of resource.properties.dimensions) {
      const name = d.name;
      if (name === 'time') {
        dims.time = this.getTimeDimensions(resource.properties.dimensions);
        /** if dimensions are defined but the values are null */
        if (dims.time.values === null) {
          console.log('check to get time dimensions value from OGC Service later!!', resource);
        }
      } else if (name === 'elevation') {
        dims.elevation = this.getElevationDimension(resource.properties.dimensions);
        /** if dimensions are defined but the values are null */
        if (dims.elevation.values === null) {
          console.log('check to get elevation dimensions value from OGC Service later!!', resource);
        }
      } else {
        dims[name] = d;
      }
    }

    return dims;
  }

  getTimeDimensions(dimensions: IEocOwsResourceDimension[]): ILayerTimeDimension {
    let dim: ILayerTimeDimension = { values: null, units: null };
    const value = dimensions.find(d => d.name === 'time') as IEocOwsTimeDimension;
    if (!value) {
      return;
    }

    const parsedValues = this.getTimeValueFromDimensions(value.values, value?.display?.period);
    dim = {
      values: null,
      units: value.units,
      display: {}
    };

    /** check if is array or single value */
    if (Array.isArray(parsedValues)) {
      dim.values = parsedValues as (string[] | ILayerIntervalAndPeriod[]);
      /** don't set dim.display.period if it is an array because there could be different periods */
      // dim.display.period = ...
    } else if (parsedValues && typeof parsedValues !== 'string' && parsedValues.interval && parsedValues.periodicity) {
      dim.values = parsedValues;
      /** set dim.display.period from the parsed values */
      if (parsedValues.periodicity) {
        dim.display.period = parsedValues.periodicity;
      }
    }

    if (value?.display?.format) {
      dim.display.format = value.display.format;
    }

    return dim;
  }

  getElevationDimension(dimensions: IEocOwsResourceDimension[]): ILayerElevationDimension {
    const dim: ILayerElevationDimension = { values: null, units: null };
    const value = dimensions.find(d => d.name === 'elevation') as IEocOwsElevationDimension;
    if (!value) {
      return;
    } else {
      dim.values = value.value;
      dim.units = value.units;

      if (value.display) {
        dim.display = value.display;
      }

      return dim;
    }
  }


  /** Offering --------------------------------------------------- */
  getLayertypeFromOfferingCode(offering: IOwsOffering): TLayertype {
    if (isWmsOffering(offering.code)) {
      return WmsLayertype;
    } else if (isWmtsOffering(offering.code)) {
      return WmtsLayertype;
    } else if (isWfsOffering(offering.code)) {
      return WfsLayertype;
    } else if (isKmlOffering(offering.code)) {
      return KmlLayertype;
    } else if (isGeoJsonOffering(offering.code)) {
      return GeojsonLayertype;
    } else if (isXyzOffering(offering.code)) {
      return XyzLayertype;
    } else if (isTMSOffering(offering.code)) {
      return TmsLayertype;
    } else {
      return offering.code; // an offering can also be any other string.
    }
  }

  checkIfServiceOffering(offering: IOwsOffering): boolean {
    return (!offering.contents && offering.operations) ? true : false;
  }

  checkIfDataOffering(offering: IOwsOffering): boolean {
    return (offering.contents && !offering.operations) ? true : false;
  }

  /**
   * Helper function to extract legendURL from project specific ows Context
   * @param offering layer offering
   */
  getLegendUrl(offering: IOwsOffering) {
    let legendUrl = '';

    if (offering.styles) {
      const defaultStyle = offering.styles.find(style => style.default);
      if (defaultStyle) {
        return defaultStyle.legendURL;
      }
    } else if (offering.legendUrl) {
      legendUrl = offering.legendUrl;
    }
    return legendUrl;
  }


  /**
   * Get all Layers from the IOwsContext.
   *
   * The order of the layers is reversed to get the context drawing order!
   */
  getLayers(owc: IOwsContext, targetProjection: string): Observable<(Layer | LayerGroup)[]> {
    const layers$: Observable<Layer | LayerGroup>[] = [];
    /** For the order of Layers see IOwsContext['features'] */

    /**
     * LayerGroups
     *
     * e.g. if groupName: Layers/test -> a group "test" in the slot Layers will be created with the layer in it
     * e.g. if groupName: Overlays/test -> a group "test" in the slot Overlays will be created with the layer in it
     * if groupName is only: Layers | Overlays | Baselayers use layerResources
     */

    const resources = this.getResources(owc);
    const groups = [];
    resources.forEach(r => {
      const lg = this.createLayerOrGroupFromResource(r, owc, targetProjection, groups);
      layers$.push(lg);
    });

    return forkJoin(layers$)
      // making sure no undefined/null layers are returned
      .pipe(map(layers => layers.filter(layer => layer)))
      // reverse so layer order is like in the context
      .pipe(map(layers => layers.reverse()));
  }

  /**
   * Creates Layers or LayerGroups from IOwsResource and IOwsContext
   * Add uniqueGroups array to track already created groups
   */
  private createLayerOrGroupFromResource(resource: IOwsResource, context: IOwsContext, targetProjection: string, uniqueGroups: string[]) {
    const layergroupResources = this.getGroupResources(context);
    const groupName = this.getLayerGroupFromFolder(resource);

    /** Layers with folder property */
    if (groupName) {
      /** unique layergroupResources */
      if (!uniqueGroups.includes(groupName)) {
        uniqueGroups.push(groupName);
        /** reverse so layer order is like in the context */
        const includedResources = layergroupResources.filter(r => this.getLayerGroupFromFolder(r) === groupName).reverse();
        const layerGroup$ = this.createLayerGroup(groupName, includedResources, context, targetProjection);
        return layerGroup$;
      } else {
        return of(null);
      }
    } else {
      /** Single Layers */
      const layer$ = this.createLayerFromDefaultOffering(resource, context, targetProjection);
      return layer$;
    }
  }



  /**
   *
   * @param groupName string | `${TFiltertypes}/string`
   */
  createLayerGroup(groupName: string, includedResources: IOwsResource[], owc: IOwsContext, targetProjection: string): Observable<LayerGroup | StackedLayer> {
    const layers$: Observable<Layer>[] = [];
    let filterType = null;
    for (const resource of includedResources) {
      filterType = this.getFilterType(resource);
      layers$.push(this.createLayerFromDefaultOffering(resource, owc, targetProjection));
    }

    const layerGroup$ = forkJoin(layers$)
      // making sure no undefined layers are returned
      .pipe(map((layers: Layer[]) => layers.filter(layer => layer)))
      // putting layers in a LayerGroup
      .pipe(map((layers: Layer[]) => {
        if (layers.length) {
          /** if filterType is Baselayers -> create a merged Layer */
          if (filterType === Filtertypes.Baselayers) {
            const descriptionLayers = layers.filter(l => l.description); // filter empty elements
            const mergedDescription = descriptionLayers.map(i => i.description);
            const legendImages = layers.map(i => i.legendImg).filter(d => d); // filter empty elements
            const layerOptions: IStackedLayerOptions = {
              id: `${groupName}_${layers.map(i => i.id).join(' ')}`.replace(/\s/g, '_'),
              name: groupName,
              layers: layers,
              filtertype: Filtertypes.Baselayers
            };
            if (mergedDescription.length) {
              layerOptions.description = mergedDescription.map((d, index) => this.generateAbstractFromLayerDescription(d, descriptionLayers[index].id)).join(';\r\n');
            }
            if (legendImages) {
              layerOptions.legendImg = legendImages[0];
            }

            const stackedLayer = new StackedLayer(layerOptions);
            return stackedLayer;
          } else {
            const layerGroup = new LayerGroup({
              id: `${groupName}_${layers.map(i => i.id).join(' ')}`.replace(/\s/g, '_'),
              name: groupName,
              layers,
              filtertype: layers[0].filtertype  // @TODO: can some layers have a different filter-type? -> All layers in a Group must be from the same filter type
            });
            return layerGroup;
          }
        }
      }))
      // making sure no undefined layers are returned
      .pipe(filter(lg => lg instanceof LayerGroup || lg instanceof Layer));

    return layerGroup$;
  }

  createLayerFromDefaultOffering(resource: IOwsResource, owc: IOwsContext, targetProjection: string): Observable<Layer> {
    const offerings = resource.properties?.offerings;
    if (offerings) {
      // TODO: allow Multiple offerings ???
      const offering = offerings.find(o => isWmsOffering(o.code))
        || offerings.find(o => isWmtsOffering(o.code))
        || offerings.find(o => isWfsOffering(o.code))
        || offerings.find(o => isTMSOffering(o.code))
        || offerings[0];
      return this.createLayerFromOffering(offering, resource, owc, targetProjection);
    } else {
      return of(null);
    }
  }

  createLayerFromOffering(offering: IOwsOffering, resource: IOwsResource, context: IOwsContext, targetProjection: string): Observable<Layer> {
    const layerType = this.getLayertypeFromOfferingCode(offering);
    if (this.isRasterLayerType(layerType) && this.isVectorLayerType(layerType)) {
      // Some layers (tms) can both be raster or vector so create both and filter out of(null)
      const raster = this.createRasterLayerFromOffering(offering, resource, context, targetProjection);
      const vector = this.createVectorLayerFromOffering(offering, resource, context, targetProjection);
      const layer = concat(raster, vector).pipe(filter(l => l instanceof Layer));
      return layer;
    } else if (this.isRasterLayerType(layerType)) {
      return this.createRasterLayerFromOffering(offering, resource, context, targetProjection);
    } else if (this.isVectorLayerType(layerType)) {
      return this.createVectorLayerFromOffering(offering, resource, context, targetProjection);
    } else {
      console.warn(`This type of service (${layerType}) has not been implemented yet.`, offering);
      return of(null);
    }
  }

  createVectorLayerFromOffering(offering: IOwsOffering, resource: IOwsResource, context?: IOwsContext, targetProjection?: string): Observable<VectorLayer> {
    const layerType = this.getLayertypeFromOfferingCode(offering);
    let vectorLayer$: Observable<VectorLayer> = of(null);

    switch (layerType) {
      case WfsLayertype:
        vectorLayer$ = this.createWfsLayerFromOffering(offering, resource, context);
        break;
      case TmsLayertype:
        vectorLayer$ = this.createVectorTileLayerFromOffering(offering, resource, context, targetProjection);
        break;
      case GeojsonLayertype:
        vectorLayer$ = this.createDataVectorLayerFromOffering(offering, resource, context);
        break;
      case KmlLayertype:
        vectorLayer$ = this.createDataVectorLayerFromOffering(offering, resource, context);
        break;
      default:
        console.warn(`This type of layer '${layerType}' / offering '${offering.code}' cannot be converted into a VectorLayer`, offering);
        break;
    }
    return vectorLayer$;
  }

  /**
   * TmsLayertype can be raster and vector
   */
  private isVectorLayerType(type: TLayertype) {
    return [WfsLayertype, KmlLayertype, GeojsonLayertype, TmsLayertype].includes(type);
  }

  private getVectorLayerOptions(offering: IOwsOffering, resource: IOwsResource, context: IOwsContext, targetProjection?: string): IVectorLayerOptions {
    const layerOptions: ILayerOptions = this.getLayerOptions(offering, resource, context);

    if (this.isVectorLayerType(layerOptions.type)) {

      const { minZoom, maxZoom } = this.getResourceMinMaxZoom(resource, targetProjection);
      const subdomains = shardsExpand(this.getResourceShards(resource));
      const vectorLayerOptions: IVectorLayerOptions = {
        ...layerOptions,
        type: layerOptions.type as TVectorLayertype,
        subdomains,
        maxZoom,
        minZoom
      };

      return vectorLayerOptions;
    } else {
      console.error(`The layer ${layerOptions.id} is not a VectorLayer`, layerOptions);
    }
  }

  /**
   * https://opengeospatial.github.io/e-learning/wfs/text/operations.html#getfeature
   */
  // offering, resource, context, targetProjection
  private getWfsOptions(offering: IOwsOffering) {
    const getFeatureOperation = offering.operations.find(o => o.code === GetFeatureOperationCode);
    let layerUrl: string = null;
    /** check for mandatory wfs params */
    if (getFeatureOperation) {
      const { url, searchParams } = this.checkWfsParams(offering);
      if (url && searchParams) {
        layerUrl = `${url}?${searchParams.toString()}`;
      }
    }
    return layerUrl;
  }

  private checkWfsParams(offering: IOwsOffering) {
    const { url, searchParams } = this.parseOperationUrl(offering, GetFeatureOperationCode);
    const params = {
      typeNames: searchParams.get('TYPENAME') || searchParams.get('TYPENAMES'),
      version: searchParams.get('VERSION'),
      service: searchParams.get('SERVICE'),
      request: searchParams.get('REQUEST')
    };
    if (!params.typeNames && !params.version || !params.service || !params.request) {
      console.warn(`URL does not contain the minimum required arguments for a WFS typeName: ${params.typeNames}, version: ${params.version}, service: ${params.service}, request: ${params.request}`, `${url}?${searchParams.toString()}`);
      return { url: null, searchParams: null };
    } else {
      return { url, searchParams };
    }
  }

  createRasterLayerFromOffering(
    offering: IOwsOffering, resource: IOwsResource, context: IOwsContext, targetProjection: string): Observable<RasterLayer> {
    const layerType = this.getLayertypeFromOfferingCode(offering);

    let rasterLayer$: Observable<RasterLayer> = of(null);
    switch (layerType) {
      case WmsLayertype:
        rasterLayer$ = this.createWmsLayerFromOffering(offering, resource, context, targetProjection);
        break;
      case WmtsLayertype:
        rasterLayer$ = this.createWmtsLayerFromOffering(offering, resource, context, targetProjection);
        break;
      case XyzLayertype:
        rasterLayer$ = this.createXyzLayerFromOffering(offering, resource, context, targetProjection);
        break;
      case TmsLayertype:
        rasterLayer$ = this.createTmsRasterLayerFromOffering(offering, resource, context, targetProjection);
        break;
      default:
        console.warn(`This type of offering '${offering.code}' cannot be converted into a RasterLayer.`, offering);
        break;
    }
    return rasterLayer$;
  }

  /**
   * TmsLayertype can be raster and vector
   */
  private isRasterLayerType(type: TLayertype) {
    return [WmsLayertype, WmtsLayertype, XyzLayertype, TmsLayertype].includes(type);
  }

  private createVectorTileLayerFromOffering(offering: IEocOwsOffering, resource: IEocOwsResource, context: IEocOwsContext, targetProjection: string): Observable<VectorLayer> {
    if (isTMSOffering(offering.code)) {
      const vectorTileOperation = offering.operations.find(o => o.type === 'application/vnd.mapbox-vector-tile');
      if (vectorTileOperation) {
        const layerOptions = this.getVectorLayerOptions(offering, resource, context);

        const tmsServerUrl = offering.operations.find(o => o.code === RESTOperationCode).href;
        layerOptions.url = tmsServerUrl;

        if (offering.styles && offering.styles[0]?.content.type === 'OpenMapStyle') {
          const content = offering.styles[0].content;

          // we need the sourceKey to apply t5he style later
          if (content?.styleSource) {
            if (!layerOptions.options) {
              layerOptions.options = {
                styleSource: content.styleSource,
                style: null
              };
            } else if (!layerOptions.options.style) {
              layerOptions.options.style = {};
              layerOptions.options.styleSource = content.styleSource;
            }

            let styleObj$: Observable<any>;
            if (content?.content) {
              if (typeof content.content === 'string') {
                styleObj$ = of(JSON.parse(content.content));
              } else {
                styleObj$ = of(content.content);
              }
            } else if (content?.href) {
              const url = content.href;
              styleObj$ = this.http.get(url);
            } else {
              console.warn(`Couldn't find style for Tms-Offering`, offering);
            }

            if (styleObj$) {
              return styleObj$.pipe(map((obj) => {
                layerOptions.options.style = obj;
                const newLayer = new VectorLayer(layerOptions);
                return newLayer;
              }));
            } else {
              const newLayer = new VectorLayer(layerOptions);
              return of(newLayer);
            }
          }
        } else {
          const newLayer = new VectorLayer(layerOptions);
          return of(newLayer);
        }
      } else {
        return of(null);
      }

    } else {
      return of(null);
    }
  }

  private createWfsLayerFromOffering(offering: IOwsOffering, resource: IOwsResource, context: IOwsContext): Observable<VectorLayer> {
    // Case 1: service-offering
    let layerUrl;
    if (offering.operations) {
      /** currently, Ukis only supports wfs as service vector offering */
      layerUrl = this.getWfsOptions(offering);

      const layerOptions = this.getVectorLayerOptions(offering, resource, context);
      layerOptions.url = layerUrl;

      const layer = new VectorLayer(layerOptions);

      if (resource.bbox) {
        layer.bbox = resource.bbox;
      } else if (context && context.bbox) {
        layer.bbox = context.bbox;
      }
      return of(layer);
    }

    if (layerUrl === null) {
      return of(null);
    }
  }

  private createDataVectorLayerFromOffering(offering: IOwsOffering, resource: IOwsResource, context: IOwsContext): Observable<VectorLayer> {
    // Case 2: data-offering
    if (offering.contents) {
      let data: any;
      let url: string;
      // currently, Ukis only supports geojson and kml as data-offering
      offering.contents.forEach(content => {
        if (content?.content) {
          if (content.type === 'application/geo+json') {
            if (typeof content.content === 'string') {
              data = JSON.parse(content.content);
            } else {
              data = content.content;
            }
          } else if (content.type === 'application/vnd.google-earth.kml+xml') {
            data = content.content;
          }
        } else if (content?.href) {
          url = content.href;
        }
      });

      const layerOptions = this.getVectorLayerOptions(offering, resource, context);

      if (data) {
        layerOptions.data = data;
      } else if (url) {
        layerOptions.url = url;
      }

      if (resource.bbox) {
        layerOptions.bbox = resource.bbox;
      } else if (context && context.bbox) {
        layerOptions.bbox = context.bbox;
      }

      const layer = new VectorLayer(layerOptions);
      return of(layer);
    } else {
      return of(null);
    }
  }

  private createTmsRasterLayerFromOffering(offering: IOwsOffering, resource: IOwsResource, context: IOwsContext, targetProjection: string): Observable<RasterLayer> {
    if (isTMSOffering(offering.code)) {
      // url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      // subdomains: ['a', 'b', 'c'], OR shards?: string; a-d
      const rasterOperation = offering.operations.find(o => o.type === 'image/png' || o.type === 'image/jpeg');
      if (rasterOperation) {
        const rasterOptions: IRasterLayerOptions = this.getRasterLayerOptions(offering, resource, context, targetProjection);
        // TODO: use new function on map-ol to create tms not xyz type
        rasterOptions.type = 'xyz';
        const layer = new RasterLayer(rasterOptions);
        return of(layer);
      } else {
        // no Raster TMS, maybe VectorTile
        return of(null);
      }
    } else {
      return of(null);
    }
  }

  private createWmtsLayerFromOffering(
    offering: IOwsOffering, resource: IOwsResource, context: IOwsContext, targetProjection: string) {
    if (isWmtsOffering(offering.code)) {
      return this.getWmtsOptions(offering, resource, context, targetProjection).pipe(map((options: IWmtsOptions) => {
        const layer = new WmtsLayer(options);
        return layer;
      }));
    } else {
      return of(null);
    }
  }

  private createWmsLayerFromOffering(offering: IOwsOffering, resource: IOwsResource, context: IOwsContext, targetProjection: string): Observable<WmsLayer> {
    if (isWmsOffering(offering.code)) {
      const options: IWmsOptions = this.getWmsOptions(offering, resource, context, targetProjection);
      const layer = new WmsLayer(options);
      return of(layer);
    } else {
      return of(null);
    }
  }

  private createXyzLayerFromOffering(offering: IOwsOffering, resource: IOwsResource, context: IOwsContext, targetProjection: string): Observable<RasterLayer> {
    if (isXyzOffering(offering.code)) {
      // url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      // subdomains: ['a', 'b', 'c'], OR shards?: string; a-d
      const rasterOptions: IRasterLayerOptions = this.getRasterLayerOptions(offering, resource, context, targetProjection);
      rasterOptions.type = 'xyz';
      const layer = new RasterLayer(rasterOptions);
      return of(layer);
    } else {
      return of(null);
    }

  }

  /**
   * https://docs.opengeospatial.org/is/13-082r2/13-082r2.html - OGC WMTS Simple Profile
   * http://schemas.opengis.net/wmts/1.0/wmtsGetTile_request.xsd
   * https://opengeospatial.github.io/e-learning/wmts/text/main.html#example-gettile-request
   */
  private getWmtsOptions(
    offering: IOwsOffering, resource: IOwsResource, context: IOwsContext, targetProjection: string): Observable<IWmtsOptions> {
    const rasterOptions: IRasterLayerOptions = this.getRasterLayerOptions(offering, resource, context, targetProjection);

    const { searchParams } = this.parseOperationUrl(offering, GetTileOperationCode);

    const params: IWmtsParams = {
      layer: searchParams.get('LAYER'),
      style: 'default', // (mandatory) -> 07-057r7_Web_Map_Tile_Service_Standard.pdf
      projection: targetProjection // TODO: alow this also from URL???
    };


    const defaultStyle = offering?.styles?.find(s => s.default);
    if (defaultStyle && defaultStyle.name) {
      params.style = defaultStyle.name;
    } else if (searchParams.has('STYLE')) {
      params.style = searchParams.get('STYLE');
    }

    if (searchParams.has('FORMAT')) {
      params.format = searchParams.get('FORMAT');
    }
    if (searchParams.has('VERSION')) {
      params.version = searchParams.get('VERSION');
    }

    return this.getMatrixSetForWMTS(offering, targetProjection)
      .pipe(map((matrixSet: IEocOwsWmtsMatrixSet | null) => {
        const wmtsOptions: IWmtsOptions = {
          ...rasterOptions,
          type: 'wmts',
          params
        };

        if (matrixSet) {
          const matrixSetOptions: IListMatrixSet = {
            matrixSet: matrixSet.matrixSet,
            matrixIds: matrixSet.matrixIds,
            resolutions: matrixSet.resolutions
          };
          wmtsOptions.params.matrixSetOptions = matrixSetOptions;
        }

        return wmtsOptions;
      }));
  }

  private parseOperationUrl(offering: IOwsOffering, opCode: string) {
    const up: { url: string, searchParams: URLSearchParams } = {
      url: null,
      searchParams: null
    };
    if (offering.operations) {
      const operation = offering.operations.find(op => op.code === opCode);
      if (operation) {
        const { url, searchParams } = this.getJsonFromUri(operation.href);
        up.url = url;
        up.searchParams = searchParams;
      } else {
        console.error(`There is no ${opCode} -operation in the offering ${offering.code}.`, offering);
      }
    } else {
      console.error(`The offering ${offering.code} has no operations.`, offering);
    }
    return up;
  }

  /* TODO: check correctness of this function and add it to utils-ogc

    getDefaultMatrixSet(projection: { extent: [number, number, number, number], srs: string }, matrixSet: string, resolutions?: Array<string | number>, matrixIds?: Array<string | number>,
    resolutionLevels: number = 42, tileSize: number = 256, matrixIdPrefix: string = '') {
    const resolutionsFromExtent = (extent, optMaxZoom: number, ts: number) => {
      const maxZoom = optMaxZoom;
      const height = extent[3] - extent[1]; // getHeight
      const width = extent[2] - extent[0]; // getWidth
      const maxResolution = Math.max(width / ts, height / ts);
      const length = maxZoom + 1;
      const res = new Array(length);
      for (let z = 0; z < length; ++z) {
        res[z] = maxResolution / Math.pow(2, z);
      }
      return res;
    };

    const matrixIdsFromResolutions = (resLev: number, maPre?: string) => {
      return Array.from(Array(resLev).keys()).map(l => {
        if (maPre) {
          return `${maPre}:${l} `;
        } else {
          return l;
        }
      });
    };

    const defaultResolutions = resolutionsFromExtent(projection.extent, resolutionLevels, tileSize);
    const defaultMatrixIds = matrixIdsFromResolutions(defaultResolutions.length, matrixIdPrefix);

    const defaultSet: IEocOwsWmtsMatrixSet = {
      srs: projection.srs,
      matrixSet,
      origin: {
        x: projection.extent[0],
        y: projection.extent[3]
      },
      resolutions: resolutions || defaultResolutions,
      tilesize: {
        height: tileSize,
        width: tileSize
      },
      matrixIds: matrixIds || defaultMatrixIds as any
    };
    defaultSet.matrixIds = defaultSet.matrixIds.map(i => i.toString());
    return defaultSet;
  } */

  private getMatrixSetForWMTS(offering: IEocOwsOffering, targetProjection: string): Observable<IEocOwsWmtsMatrixSet> {
    // Observable<IEocOwsWmtsMatrixSet | null> vs. Observable<IEocOwsWmtsMatrixSet> https://github.com/ReactiveX/rxjs/issues/3388
    if (offering?.matrixSets) {
      const matrixSet = offering.matrixSets.find(m => m.srs === targetProjection);
      return of(matrixSet);
    } else if (offering.matrixSets === null) {
      /**
       * If offering.matrixSets === null use a default set for EPSG:3857 and 256 tiles
       * Create this in the mapping library when the WMTS is created.
       */
      return of(null)
    } else {
      const url = this.parseOperationUrl(offering, 'GetCapabilities').url;
      return this.wmtsClient.getCapabilities(url).pipe(
        map((capabilities: any) => {
          const matrixSets = capabilities.value.contents.tileMatrixSet;
          let matrixSet = matrixSets.find(ms => ms.identifier.value === targetProjection);

          if (!matrixSet && targetProjection === 'EPSG:3857') {
            const altTargetProjection = 'EPSG:900913';
            matrixSet = matrixSets.find(ms => ms.identifier.value === altTargetProjection);
          }

          const owsMatrixSet: IEocOwsWmtsMatrixSet = {
            srs: targetProjection,
            matrixSet: matrixSet['identifier']['value'],
            matrixIds: matrixSet['tileMatrix'].map(tm => tm['identifier']['value']),
            resolutions: matrixSet['tileMatrix'].map(tm => tm['scaleDenominator']),
            origin: {
              x: matrixSet['tileMatrix'][0]['topLeftCorner'][1],
              y: matrixSet['tileMatrix'][0]['topLeftCorner'][0]
            },
            tilesize: matrixSet['tileMatrix'][0]['tileHeight']
          };
          return owsMatrixSet;
        })
      );
    }
  }

  /**
   * TODO: add more vendor params ??
   * https://docs.geoserver.org/latest/en/user/services/wms/reference.html#getmap
   */
  private getWmsOptions(
    offering: IOwsOffering, resource: IOwsResource, context: IOwsContext, targetProjection: string): IWmsOptions {

    const rasterOptions: IRasterLayerOptions = this.getRasterLayerOptions(offering, resource, context, targetProjection);
    if (rasterOptions?.type === WmsLayertype) {

      const { searchParams } = this.parseOperationUrl(offering, GetMapOperationCode);

      const params: IWmsParams = {
        LAYERS: searchParams.get('LAYERS'),
        TRANSPARENT: true
      };
      const defaultStyle = offering?.styles?.find(s => s.default);
      if (defaultStyle && defaultStyle.name) {
        params.STYLES = defaultStyle.name;
      } else if (searchParams.has('STYLES')) {
        params.STYLES = searchParams.get('STYLES');
      }
      if (searchParams.has('FORMAT')) {
        params.FORMAT = searchParams.get('FORMAT');
      }
      if (searchParams.has('TIME')) {
        params.TIME = searchParams.get('TIME');
      }
      if (searchParams.has('VERSION')) {
        params.VERSION = searchParams.get('VERSION');
      }
      if (searchParams.has('TILED')) {
        params.TILED = searchParams.get('TILED');
      }
      /** https://docs.geoserver.org/latest/en/user/tutorials/cql/cql_tutorial.html#cql-tutorial */
      if (searchParams.has('CQL_FILTER')) {
        params.CQL_FILTER = searchParams.get('CQL_FILTER');
      }
      /** https://docs.geoserver.org/latest/en/user/styling/sld/reference/filters.html */
      if (searchParams.has('FILTER')) {
        params.FILTER = searchParams.get('FILTER');
      }

      const wmsOptions: IWmsOptions = {
        ...rasterOptions,
        type: 'wms',
        params
      };
      return wmsOptions;
    } else {
      console.warn(`resource ${resource.id} cannot be converted into a WMS - Layer`, offering);
    }
  }

  private getRasterLayerOptions(offering: IOwsOffering, resource: IEocOwsResource, context: IOwsContext, targetProjection: string): IRasterLayerOptions {
    const layerOptions: ILayerOptions = this.getLayerOptions(offering, resource, context);
    if (this.isRasterLayerType(layerOptions.type)) {
      let time;
      let elevation;
      const dimensions = resource.properties?.dimensions;
      if (dimensions) {
        time = this.getTimeDimensions(dimensions);
        elevation = this.getElevationDimension(dimensions);
      }

      const { minZoom, maxZoom } = this.getResourceMinMaxZoom(resource, targetProjection);
      const subdomains = shardsExpand(this.getResourceShards(resource));
      const getRasterOperation = offering.operations.find(o => isIOwsRasterOperation(o));
      if (getRasterOperation) {
        const rasterLayerOptions: IRasterLayerOptions = {
          ...layerOptions,
          type: layerOptions.type as TRasterLayertype,
          url: this.getJsonFromUri(getRasterOperation.href).url
        };

        if (minZoom) {
          rasterLayerOptions.minZoom = minZoom;
        }
        if (maxZoom) {
          rasterLayerOptions.maxZoom = maxZoom;
        }

        if (subdomains?.length) {
          rasterLayerOptions.subdomains = subdomains;
        }

        if (time) {
          if (!rasterLayerOptions.dimensions) {
            rasterLayerOptions.dimensions = {};
          }
          rasterLayerOptions.dimensions.time = time;
        }
        if (elevation) {
          if (!rasterLayerOptions.dimensions) {
            rasterLayerOptions.dimensions = {};
          }
          rasterLayerOptions.dimensions.elevation = elevation;
        }
        return rasterLayerOptions;
      } else {
        console.warn(`There is no Raster operation for the offering`, offering);
      }
    } else {
      console.error(`The layer ${layerOptions.id} is not a RasterLayer`, layerOptions);
    }
  }

  private getLayerOptions(offering: IOwsOffering, resource: IOwsResource, context: IOwsContext): ILayerOptions {
    const layerOptions: ILayerOptions = {
      id: resource.id as string,
      type: this.getLayertypeFromOfferingCode(offering),
      name: this.getResourceTitle(resource),
      removable: true,
      continuousWorld: false,
      opacity: this.getResourceOpacity(resource),
      displayName: this.getResourceTitle(resource),
      visible: this.isActive(resource),
      attribution: this.getResourceAttribution(resource),
      dimensions: this.getResourceDimensions(resource),
      legendImg: this.getLegendUrl(offering),
      styles: offering.styles,
      description: this.getResourceDescription(resource)
    };

    if (resource.bbox) {
      layerOptions.bbox = resource.bbox;
    } else if (context && context.bbox) {
      layerOptions.bbox = context.bbox;
    }

    /** skip bbox for baselayers */
    if (resource.properties?.folder === Filtertypes.Baselayers && !resource.bbox) {
      layerOptions.bbox = null;
    }

    const filterType = this.getFilterType(resource);
    if (filterType) {
      layerOptions.filtertype = filterType;
    }

    return layerOptions;
  }

  /** Misc --------------------------------------------------- */

  /**
   * Based on the WMS Standard (https://portal.ogc.org/files/?artifact_id=14416),
   * to which the OWC Standard refers for the scale-denominator-field,
   * and the way that openlayers calculates zoom and resolution
   * (https://openlayers.org/en/latest/doc/tutorials/concepts.html)
   */
  private scaleDenominatorToZoom(scaleDenominator: number, targetProjectionCode: string): number {
    const projection = getProjection(targetProjectionCode);
    if (!projection) {
      console.error(`The projection '${targetProjectionCode}' is unknown.You'll have to manually register it with 'proj4.defs'.`);
      return null;
    }
    if (!projection.getWorldExtent()) {
      console.error(`No world extent given for projection '${targetProjectionCode}'.`);
      return null;
    }

    const unitsPerMeter = 1.0 / projection.getMetersPerUnit();
    const projectionExtent = projection.getWorldExtent();
    const projectionWidth = projectionExtent[2] - projectionExtent[0];
    const projectionHeight = projectionExtent[3] - projectionExtent[1];
    const projectionMaxExtent = Math.max(projectionWidth, projectionHeight);
    const pixelsOn1mScreen = 2571.42;  // using the default assumption of 0.28mm/pixel
    const resolution = scaleDenominator * unitsPerMeter / pixelsOn1mScreen;
    const zoom = Math.log2(projectionMaxExtent / (resolution * 256));

    return zoom;
  }

  /**
   * helper to pack query-parameters of a uri into a JSON
   * Makes all Params UpperCase
   *
   * @param uri any uri with query-parameters
   */
  private getJsonFromUri(uri: string) {
    let url = null;
    if (uri.indexOf('http://') === 0 || uri.indexOf('https://') === 0) {
      url = new URL(uri);
    } else {
      url = new URL(uri, window.location.origin);
    }
    const searchParams = new URLSearchParams();
    // Make all Params UpperCase
    url.searchParams.forEach((v, k) => {
      searchParams.set(k.toUpperCase(), v);
    });

    const queryIndex = (uri.indexOf('?') !== -1) ? uri.indexOf('?') : uri.length;
    return {
      url: uri.substring(0, queryIndex),
      searchParams: searchParams
    };
  }

  /** ------------ DATA TO FILE ----------------------------------------- */


  /**
   * The order of created features is Overlays, Layers, Baselayers from top to bottom
   * set on the folder property
   */
  generateOwsContextFrom(id: string, layers: (Layer | LayerGroup)[], extent?: TGeoExtent, properties?: IEocOwsContext['properties']): IEocOwsContext {

    /** sort layerGroups so the order is Overlays, Layers, Baselayers */
    const Overlays: (Layer | LayerGroup)[] = [];
    const Layers: (Layer | LayerGroup)[] = [];
    const Baselayers: (Layer | LayerGroup)[] = [];

    layers.forEach(l => {
      if (l.filtertype === Filtertypes.Overlays) {
        Overlays.push(l);
      } else if (l.filtertype === Filtertypes.Layers) {
        Layers.push(l);
      } else if (l.filtertype === Filtertypes.Baselayers) {
        Baselayers.push(l);
      }
    });
    /** Spread so layers Object is not mutated and reverse so order is like in OWC */
    const sortedLayers = [...Overlays.reverse(), ...Layers.reverse(), ...Baselayers.reverse()];

    let defaultProperties = {
      links: {
        profiles: [{
          href: 'http://www.opengis.net/spec/owc-geojson/1.0/req/core'
        }],
      },
      lang: 'en',
      title: 'This is an automatically created context',
      updated: new Date().toISOString(),
      subtitle: `Context created from ${sortedLayers.map(l => `Layer:${l.id}`).join(', ')}`
    }

    if (properties) {
      defaultProperties = Object.assign(defaultProperties, properties);
    }

    const owc: IEocOwsContext = {
      id,
      type: 'FeatureCollection',
      properties: defaultProperties,
      features: []
    };

    if (extent) {
      owc.bbox = extent;
    }

    sortedLayers.forEach(lg => {

      if (lg instanceof LayerGroup) {
        const folderName = lg.name;
        /** Spread so layers Object is not mutated in the reverse */
        const groupLayers = [...lg.layers];
        /** reverse so order is like in OWC */
        groupLayers.reverse().forEach(l => {
          const res = this.generateResourceFromLayer(l, folderName);
          owc.features.push(res);
        });
      } else {
        const res = this.generateResourceFromLayer(lg);
        owc.features.push(res);
      }
    });

    return owc;
  }

  private generateAbstractFromLayerDescription(description: Layer['description'], layerID?: Layer['id']) {
    if(!description){
      return '';
    }
    if (typeof description === 'string') {
      return description
    } else {
      if (description.inputs?.description) {
        return JSON.stringify(description);
      } else {
        return `Could not generate description from layer: ${layerID} - dynamic component`
      }
    }
  }

  generateResourceFromLayer(layer: Layer, folderName?: string): IEocOwsResource {
    const resource: IEocOwsResource = {
      id: layer.id,
      properties: {
        title: layer.displayName || layer.name,
        opacity: layer.opacity,
        active: layer.visible,
        abstract: this.generateAbstractFromLayerDescription(layer.description, layer.id),
        rights: layer.attribution,
        minZoom: layer.minZoom,
        maxZoom: layer.maxZoom,
        updated: new Date().toISOString(),
        offerings: [this.generateOfferingFromLayer(layer)]
      },
      bbox: layer.bbox,
      type: 'Feature',
      geometry: null
    };

    // TODO convert to scaledenominator??
    /* if (layer.minResolution) {
      resource.properties.minscaledenominator = layer.minResolution;
    }
    if (layer.maxResolution) {
      resource.properties.maxscaledenominator = layer.maxResolution;
    } */

    if (folderName) {
      resource.properties.folder = `${layer.filtertype}/${folderName}`;
    } else {
      resource.properties.folder = `${layer.filtertype}`;
    }

    if (layer instanceof RasterLayer && layer.subdomains) {
      resource.properties.shards = `${layer.subdomains[0]}-${layer.subdomains[layer.subdomains.length - 1]}`;
    } else if (layer instanceof VectorLayer && layer.subdomains) {
      resource.properties.shards = `${layer.subdomains[0]}-${layer.subdomains[layer.subdomains.length - 1]}`;
    }

    if (layer.dimensions) {
      resource.properties.dimensions = this.generateDimensionsFromLayer(layer);
    }
    return resource;
  }

  generateOfferingFromLayer(layer: Layer): IEocOwsOffering {
    const offering: IEocOwsOffering = {
      code: this.getOfferingCodeFromLayer(layer),
      title: layer.name,
      styles: []
    };

    if (layer.type === GeojsonLayertype || layer.type === KmlLayertype) {
      offering.contents = this.getContentsFromLayer(layer as VectorLayer);
    } else {
      offering.operations = this.getOperationsFromLayer(layer);
    }

    /**
     * Get Styles
     * - If only Legend images
     * - If params.style or params.STYLES
     * - If options?.style
     */
    if (layer instanceof RasterLayer) {
      if (layer?.params?.STYLES || layer?.params?.style || layer.legendImg) {
        offering.styles.push({
          name: layer?.params?.STYLES || layer?.params?.style || null,
          title: `${layer.name}-StyleTitle`,
          default: (layer?.params?.STYLES || layer?.params?.style || layer.legendImg) ? true : false,
          legendURL: (typeof layer.legendImg === 'string') ? layer.legendImg : null,
        });
      }
    } else if (layer instanceof VectorLayer && layer.type === 'tms') {
      if (layer?.options?.style && layer?.options?.styleSource) {
        offering.styles.push({
          name: null,
          title: `${layer.name}-StyleTitle`,
          default: true,
          legendURL: (typeof layer.legendImg === 'string') ? layer.legendImg : null,
          content: {
            type: 'OpenMapStyle',
            styleSource: layer.options.styleSource,
            content: layer.options.style
          }
        });
      }
    } else { // e.g. Layer.type=xyz only for getLegendUrl
      offering.styles.push({
        name: null,
        title: `${layer.name}-StyleTitle`,
        default: true,
        legendURL: (typeof layer.legendImg === 'string') ? layer.legendImg : null,
      });
    }

    if (!offering.styles.length) {
      delete offering.styles;
    }
    return offering;
  }

  getOfferingCodeFromLayer(layer: Layer): string {
    switch (layer.type) {
      case WmsLayertype:
        return wmsOffering;
      case WmtsLayertype:
        return wmtsOffering;
      case GeojsonLayertype:
        return GeoJsonOffering;
      case XyzLayertype:
        return xyzOffering;
      case WfsLayertype:
        return wfsOffering;
      case KmlLayertype:
        return kmlOffering;
      case TmsLayertype:
        return tmsOffering;
      default:
        console.warn(`This type of layer (${layer.type}) has not been implemented yet.`, layer);
        return null;
    }
  }

  getContentsFromLayer(layer: VectorLayer): IOwsContent[] {
    const contents = [];
    switch (layer.type) {
      case GeojsonLayertype:
        if (layer.data) {
          contents.push({
            type: 'application/geo+json',
            content: JSON.stringify(layer.data)
          });
        } else if (layer.url) {
          contents.push({
            type: 'application/geo+json',
            href: layer.url
          });
        }
        break;
      case KmlLayertype:
        if (layer.data) {
          contents.push({
            type: 'application/vnd.google-earth.kml+xml',
            content: layer.data
          });
        } else if (layer.url) {
          contents.push({
            type: 'application/vnd.google-earth.kml+xml',
            href: layer.url
          });
        }
        break;
      default:
        console.warn(`Cannot get contents for this type of VectorLayer: (${layer.type})`, layer);
    }
    return contents;
  }

  /**
   * For Service Offerings
   */
  getOperationsFromLayer(layer: Layer): IOwsOperation[] {
    if (layer instanceof RasterLayer) {
      switch (layer.type) {
        case WmsLayertype:
          return this.getWmsOperationsFromLayer(layer);
        case WmtsLayertype:
          return this.getWmtsOperationsFromLayer(layer);
        case XyzLayertype:
          return this.getXyzOperationsFromLayer(layer);
        case TmsLayertype:
          return this.getTMSRasterOperationsFromLayer(layer);
        default:
          console.warn(`Cannot get operations for this type of layer: (${layer.type})`, layer);
          return [];
      }
    } else if (layer instanceof VectorLayer) {
      switch (layer.type) {
        case WfsLayertype:
          return this.getWfsOperationsFromLayer(layer);
        case TmsLayertype:
          return this.getTMSVectorOperationsFromLayer(layer);
        default:
          console.warn(`Cannot get operations for this type of layer: (${layer.type})`, layer);
          return [];
      }
    }

  }


  getXyzOperationsFromLayer(layer: RasterLayer): IOwsOperation[] {
    const restCall: IOwsOperation = {
      code: RESTOperationCode,
      method: 'GET',
      type: 'image/png', // or other image types e.g. 'image/jpeg'
      href: `${layer.url}`
    };

    const operations: IOwsOperation[] = [
      restCall
    ];

    return operations;
  }

  private getTMSRasterOperationsFromLayer(layer: RasterLayer): IOwsOperation[] {
    const restCall: IOwsOperation = {
      code: RESTOperationCode,
      method: 'GET',
      type: 'image/png', // or other image types e.g. 'image/jpeg'
      href: `${layer.url}`
    };

    const operations: IOwsOperation[] = [
      restCall
    ];

    return operations;
  }

  getWfsOperationsFromLayer(layer: VectorLayer): IOwsOperation[] {
    const version = layer.options?.version ? layer.options.version : '1.1.0';
    const { url, searchParams } = this.getJsonFromUri(layer.url);
    const typeName = searchParams.get('TYPENAME') || searchParams.get('TYPENAMES');
    if (!typeName) {
      console.warn(`URL does not contain the minimum required arguments for a WFS typeName: ${typeName}`, url);
      return [];
    }

    const GetFeature: IOwsOperation = {
      code: GetFeatureOperationCode,
      method: 'GET',
      type: 'application/json',
      href: `${url}?${searchParams.toString()}`
    };

    const GetCapabilities: IOwsOperation = {
      code: GetCapabilitiesOperationCode,
      method: 'GET',
      type: 'application/xml',
      href: `${url}?service=WFS&request=GetCapabilities`
    };

    const DescribeFeatureType: IOwsOperation = {
      code: DescribeFeatureTypeOperationCode,
      method: 'GET',
      type: 'application/json',
      href: `${url}?service=WFS&request=DescribeFeatureType&version=${version}&typeNames=${typeName}&outputFormat=application/json`
    };

    // let GetPropertyValue: IOwsOperation = null;
    // let GetFeatureWithLock: IOwsOperation = null;
    // let LockFeature: IOwsOperation = null;
    // let Transaction: IOwsOperation = null;
    // let CreateStoredQuery: IOwsOperation = null;
    // let DropStoredQuery: IOwsOperation = null;
    // let ListStoredQueries: IOwsOperation = null;
    // let DescribeStoredQueries: IOwsOperation = null;

    const operations = [
      GetFeature,
      GetCapabilities,
      DescribeFeatureType,
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

  private getTMSVectorOperationsFromLayer(layer: VectorLayer): IOwsOperation[] {
    const restCall: IOwsOperation = {
      code: RESTOperationCode,
      method: 'GET',
      type: 'application/vnd.mapbox-vector-tile', // or other image types e.g. 'image/jpeg'
      href: `${layer.url}`
    };

    // TODO: Get Styles - Offering
    /* content: {
      type: 'OpenMapStyle',
      styleSource: string,
      content: content
    } */

    const operations: IOwsOperation[] = [
      restCall
    ];

    return operations;
  }

  getWmsOperationsFromLayer(layer: RasterLayer): IOwsOperation[] {
    let url = layer.url;

    if (url.endsWith('?')) {
      url = url.substr(0, url.length - 1);
    }

    const searchParams = new URLSearchParams();
    Object.keys(layer.params).forEach(k => {
      const v = layer.params[k];
      if (v) {
        searchParams.set(k, v);
      }
    });

    searchParams.set('REQUEST', 'GetMap');
    searchParams.set('SERVICE', 'WMS');

    // searchParams.set('LAYERS', layer.id);
    if (!searchParams.get('FORMAT')) {
      searchParams.set('FORMAT', 'image/png'); // 'image/jpeg'
    }

    const getMap: IOwsOperation = {
      code: GetMapOperationCode,
      method: 'GET',
      type: searchParams.get('FORMAT'),
      href: `${url}?${searchParams.toString()}`
    };

    const getCapabilities: IOwsOperation = {
      code: GetCapabilitiesOperationCode,
      method: 'GET',
      type: 'application/xml',
      href: `${url}?service=WMS&version=${searchParams.get('VERSION')}&request=GetCapabilities`
    };

    const getFeatureInfo: IOwsOperation = {
      code: GetFeatureInfoOperationCode,
      method: 'GET',
      type: 'application/json',
      href: `${url}?service=WMS&version=${searchParams.get('VERSION')}&request=GetFeatureInfo&TRANSPARENT=TRUE&LAYERS=${searchParams.get('LAYERS')}&INFO_FORMAT=application/json`
    };

    const operations: IOwsOperation[] = [
      getMap,
      getCapabilities,
      getFeatureInfo
    ];

    return operations;
  }

  getWmtsOperationsFromLayer(layer: RasterLayer): IOwsOperation[] {
    let url = layer.url;
    if (url.endsWith('?')) {
      url = url.substr(0, url.length - 1);
    }

    const searchParams = new URLSearchParams();
    Object.keys(layer.params).forEach(k => {
      const v = layer.params[k];
      if (v) {
        searchParams.set(k.toUpperCase(), v);
      }
    });
    searchParams.set('REQUEST', 'GetTile');
    searchParams.set('SERVICE', 'WMTS');

    if (!searchParams.get('FORMAT')) {
      searchParams.set('FORMAT', 'image/png'); // 'image/jpeg'
    }

    if (searchParams.has('MATRIXSETOPTIONS')) {
      searchParams.delete('MATRIXSETOPTIONS');
    }

    const getTile: IOwsOperation = {
      code: GetTileOperationCode,
      href: `${url}?${searchParams.toString()}`,
      method: 'GET',
      type: searchParams.get('FORMAT'),
    };

    const getCapabilities: IOwsOperation = {
      code: GetCapabilitiesOperationCode,
      href: `${url}?SERVICE=WMTS&REQUEST=GetCapabilities&VERSION=${searchParams.get('VERSION')}`,
      method: 'GET',
      type: 'application/xml'
    };

    // Note: we deliberately use the WMS protocol here instead of WMTS.
    // Reason: WMTS delivers RGB-values, wheras WMS delivers the actual value that was used to create a tile.
    const getFeatureInfo: IOwsOperation = {
      code: GetFeatureInfoOperationCode,
      href: `${url}?SERVICE=WMS&REQUEST=GetFeatureInfo&VERSION=${searchParams.get('VERSION')}`,
      method: 'GET',
      type: 'text/html'
    };

    const operations: IOwsOperation[] = [
      getTile,
      getCapabilities,
      getFeatureInfo
    ];

    return operations;
  }

  private generateDimensionsFromLayer(layer: Layer) {
    const dimensions: IEocOwsResourceDimension[] = [];

    if (layer?.dimensions?.time) {
      const td: IEocOwsTimeDimension = {
        name: 'time',
        values: null,
        units: 'ISO8601'
      };
      if (layer.dimensions.time.display) {
        td.display = layer.dimensions.time.display;
      }

      if (Array.isArray(layer.dimensions.time.values)) {
        if (typeof layer.dimensions.time.values[0] === 'string') {
          td.values = layer.dimensions.time.values.join(',') as IEocOwsTimeDimension['values'];
        } else {
          td.values = (layer.dimensions.time.values as ILayerIntervalAndPeriod[]).map(i => `${i.interval}/${i.periodicity}`).join(',') as IEocOwsTimeDimension['values'];
        }
      } else {
        td.values = `${layer.dimensions.time.values.interval}/${layer.dimensions.time.values.periodicity}`;
      }
      dimensions.push(td);
    }

    if (layer?.dimensions?.elevation) {
      const td: IEocOwsElevationDimension = {
        name: 'elevation',
        value: layer.dimensions.elevation.values,
        units: layer.dimensions.elevation.units
      };
      if (layer.dimensions.elevation.display) {
        td.display = layer.dimensions.elevation.display;
      }
      dimensions.push(td);
    }

    if (dimensions.length) {
      return dimensions;
    } else {
      return null;
    }
  }
}
