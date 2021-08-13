
import { Injectable } from '@angular/core';
import {
  IOwsContext, IOwsResource, IOwsOffering, IOwsOperation, IOwsContent
} from './types/owc-json';
import { isGeoJsonOffering, isIOwsContext, isTMSOffering, isWfsOffering, isWmsOffering, isWmtsOffering, isXyzOffering } from './types/owc-json.utils';
import {
  IEocOwsContext, IEocOwsResource, IEocOwsOffering, IEocOwsWmtsMatrixSet,
  IEocOwsResourceDimension
} from './types/eoc-owc-json';
import {
  ILayerOptions, IRasterLayerOptions, VectorLayer, RasterLayer, IVectorLayerOptions,
  Layer, TLayertype, WmsLayertype, WmtsLayertype, WfsLayertype, GeojsonLayertype, CustomLayertype, XyzLayertype,
  TRasterLayertype, isRasterLayertype, isVectorLayertype, ILayerDimensions,
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
  CustomLayer,
  Filtertypes
} from '@dlr-eoc/services-layers';
import { TGeoExtent } from '@dlr-eoc/services-map-state';
import { WmtsClientService } from '../wmts/wmtsclient.service';
import { of, Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import olVectorTileLayer from 'ol/layer/VectorTile';
import olVectorTileSource from 'ol/source/VectorTile';
import { applyStyle } from 'ol-mapbox-style';
import { createXYZ } from 'ol/tilegrid';
import olMVT from 'ol/format/MVT';
import { HttpClient } from '@angular/common/http';
import { get as getProjection } from 'ol/proj';
import { DateTime, Interval } from 'luxon';


// @TODO: once we have a dedicated ukis-TMSLayer, integrate this type into services-layers
export const TmsLayertype = 'tms';
export type Layertype = 'tms' | TLayertype;

export function shardsExpand(v: string) {
  if (!v) { return; }
  const o = [];
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

  /** Resource --------------------------------------------------- */
  getResourceTitle(resource: IOwsResource): string {
    return resource.properties.title;
  }

  getLayerGroup(resource: IOwsResource): string {
    return resource.properties.folder;
  }

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
    if (resource.properties.hasOwnProperty('active')) {
      active = resource.properties.active;
    }
    return active;
  }

  getResourceOpacity(resource: IOwsResource): number {
    let opacity = 1;
    if (resource.properties.hasOwnProperty('opacity')) {
      opacity = resource.properties.opacity;
    }
    return opacity;
  }

  getResourceAttribution(resource: IOwsResource): string {
    let attribution = '';
    if (resource.properties.hasOwnProperty('attribution')) {
      attribution = resource.properties.attribution;
    } else if (resource.properties.rights) {
      attribution = resource.properties.rights;
    }
    return attribution;
  }

  getResourceShards(resource: IOwsResource): string {
    if (resource.properties.hasOwnProperty('shards')) {
      return resource.properties.shards;
    }
  }

  /**
   * e.g.
   * (array)   value: '1984-01-01T00:00:00.000Z/1989-12-31T23:59:59.000Z/PT1S,1990-01-01T00:00:00.000Z/1994-12-31T23:59:59.000Z/PT1S,...'
   * (array)   value: '2000-01-01T00:00:00.000Z,2001-01-01T00:00:00.000Z,2002-01-01T00:00:00.000Z,...'
   * (single) value: '2016-01-01T00:00:00.000Z/2018-01-01T00:00:00.000Z/P1Y'
   *
   * what is for different values (array  and single combined), are the possible??
   */
  convertOwcTimeToIsoTimeAndPeriodicity<P extends string | ILayerIntervalAndPeriod>(owctime: string) {
    /**
     * Convert from
     */
    const arr = owctime.split('/');
    /** e.g. 1984-01-01T00:00:00.000Z/1989-12-31T23:59:59.000Z */
    const timeinterval = (arr.length === 3) ? arr[0] + '/' + arr[1] : owctime;
    /** e.g. P1Y */
    const periodicity = (arr.length === 3) ? arr[2] : null;
    if (periodicity) {
      const intervalPeriod = { interval: timeinterval, periodicity: periodicity };
      return intervalPeriod as any as P;
    } else {
      return timeinterval as any as P;
    }
  }

  /**
   * e.g.
   * (array)   value: '1984-01-01T00:00:00.000Z/1989-12-31T23:59:59.000Z/PT1S,1990-01-01T00:00:00.000Z/1994-12-31T23:59:59.000Z/PT1S,...'
   * (array)   value: '2000-01-01T00:00:00.000Z,2001-01-01T00:00:00.000Z,2002-01-01T00:00:00.000Z,...'
   * (single) value: '2016-01-01T00:00:00.000Z/2018-01-01T00:00:00.000Z/P1Y'
   */
  getTimeValueFromDimensions(input: string | null): string | string[] | ILayerIntervalAndPeriod | ILayerIntervalAndPeriod[] {
    if (!input) {
      return null;
    }

    const splitValues = input.split(',');
    if (splitValues.length > 0) {
      const outputs = [];
      for (const value of splitValues) {
        const parsed = this.parseSingleTimeOrPeriod(value);
        outputs.push(parsed);
      }
      return outputs;
    }

    const parsed = this.parseSingleTimeOrPeriod(input);
    return parsed;

  }

  private parseSingleTime(timeString: string): DateTime {
    return DateTime.fromISO(timeString);
  }

  private parsePeriod(periodString: string): Interval {
    return Interval.fromISO(periodString);
  }

  private parseSingleTimeOrPeriod(time: string): string | ILayerIntervalAndPeriod | null {
    const dateTime = this.parseSingleTime(time);
    if (dateTime.isValid) {
      return dateTime.toISO();
    }

    const interval = this.parsePeriod(time);
    if (interval.isValid) {
      const period = this.parseISO8601Period(time);
      const intervalObject: ILayerIntervalAndPeriod = {
        periodicity: period,
        interval: `${interval.start.toISO()}/${interval.end.toISO()}`
      };
      return intervalObject;
    }

    return null;
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
      } else if (name === 'elevation') {
        console.error('Not yet implemented: `getElevationDimension`');
      } else {
        dims[name] = d;
      }
    }

    return dims;
  }

  getTimeDimensions(dimensions: IEocOwsResource['properties']['dimensions']): ILayerDimensions['time'] {
    let dim: ILayerDimensions['time'] = { values: null, units: null };
    const value = dimensions.find(d => d.name === 'time');

    if (!value) {
      console.log('check to get dimensions value from OGC Service later!!', dimensions);
    }

    const values = this.getTimeValueFromDimensions(value.values);
    const period = this.parseISO8601Period(value.values);
    dim = {
      values: null,
      units: value.units,
      display: {
        format: 'YYYMMDD',
        period: period,
        default: 'end'
      }
    };

    /** check if is array or single value */
    if (Array.isArray(values)) {
      dim.values = values;
    } else if (values && typeof values !== 'string' && values.interval && values.periodicity) {
      dim.values = values;
    }

    return dim;
  }


  /** Offering --------------------------------------------------- */
  getLayertypeFromOfferingCode(offering: IOwsOffering): Layertype {
    if (isWmsOffering(offering.code)) {
      return WmsLayertype;
    } else if (isWmtsOffering(offering.code)) {
      return WmtsLayertype;
    } else if (isWfsOffering(offering.code)) {
      return WfsLayertype;
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
    let legendUrl = '';

    if (offering.hasOwnProperty('styles')) {
      const defaultStyle = offering.styles.find(style => style.default);
      if (defaultStyle) {
        return defaultStyle.legendURL;
      }
    } else if (offering.hasOwnProperty('legendUrl')) {
      legendUrl = offering.legendUrl;
    }
    return legendUrl;
  }

  /**
   * retrieve iconUrl based on IOwsOffering
   */
  getIconUrl(offering: IOwsOffering) {
    let iconUrl = '';
    if (offering.hasOwnProperty('iconUrl')) {
      iconUrl = offering.iconUrl;
    }
    return iconUrl;
  }

  /**
   * layer priority: first wms, then wmts, then wfs, then others.
   */
  getLayers(owc: IOwsContext, targetProjection: string): Observable<(Layer | LayerGroup)[]> {
    const resources = owc.features;
    const layers$: Observable<Layer | LayerGroup>[] = [];

    resources.sort((r1, r2) => r1.properties.folder > r2.properties.folder ? 1 : -1);

    for (let i = 0; i < resources.length; i++) {
      const resource = resources[i];

      const groupName = this.getLayerGroup(resource);
      if (groupName && !['Baselayers', 'Layers', 'Overlays'].includes(groupName)) {
        const includedResources = resources.filter(r => r.properties.folder === resource.properties.folder);
        const layerGroup$ = this.createLayerGroup(groupName, includedResources, owc, targetProjection);
        layers$.push(layerGroup$);
        i += includedResources.length - 1;
      }
      else {
        const layer$ = this.createLayerFromDefaultOffering(resource, owc, targetProjection);
        layers$.push(layer$);
      }
    }

    return forkJoin(layers$);
  }

  createLayerGroup(
    groupName: string, includedResources: IOwsResource[], owc: IOwsContext, targetProjection: string): Observable<LayerGroup> {

    const layers$: Observable<Layer>[] = [];
    for (const resource of includedResources) {
      layers$.push(this.createLayerFromDefaultOffering(resource, owc, targetProjection));
    }

    const layerGroup$ = forkJoin(layers$).pipe(map((layers: Layer[]) => {
      const parts = groupName.split('/');
      const groupNameLast = parts[parts.length - 1];
      const layerGroup = new LayerGroup({
        id: groupName,
        name: groupNameLast,
        layers,
        visible: !!Math.max(...layers.map(l => +l.visible)),
        filtertype: layers[0].filtertype  // @TODO: can some layers have a different filter-type?
      });

      return layerGroup;
    }));

    return layerGroup$;
  }

  createLayerFromDefaultOffering(resource: IOwsResource, owc: IOwsContext, targetProjection: string): Observable<Layer> {
    const offerings = resource.properties.offerings;
    const offering = offerings.find(o => isWmsOffering(o.code))
      || offerings.find(o => isWmtsOffering(o.code))
      || offerings.find(o => isWfsOffering(o.code))
      || offerings.find(o => isTMSOffering(o.code))
      || offerings[0];
    return this.createLayerFromOffering(offering, resource, owc, targetProjection);
  }

  createLayerFromOffering(offering: IOwsOffering, resource: IOwsResource, context: IOwsContext, targetProjection: string): Observable<Layer> {
    const layerType = this.getLayertypeFromOfferingCode(offering);
    if (isRasterLayertype(layerType)) {
      return this.createRasterLayerFromOffering(offering, resource, context, targetProjection);
    } else if (isVectorLayertype(layerType)) {
      return this.createVectorLayerFromOffering(offering, resource, context);
    } else if (layerType === TmsLayertype) {
      return this.createTmsLayerFromOffering(offering, resource, context, targetProjection);
    } else {
      console.error(`This type of service (${layerType}) has not been implemented yet.`);
    }
  }

  createVectorLayerFromOffering(offering: IOwsOffering, resource: IOwsResource, context?: IOwsContext): Observable<VectorLayer> {
    const layerType = this.getLayertypeFromOfferingCode(offering);

    if (!isVectorLayertype(layerType)) {
      console.error(`This type of layer '${layerType}' / offering '${offering.code}' cannot be converted into a Vectorlayer`);
      return null;
    }

    const iconUrl = this.getIconUrl(offering);

    let layerUrl, params;
    // if we have a operations-offering (vs. a data-offering):
    if (offering.operations) { layerUrl = this.getUrlFromUri(offering.operations[0].href); }
    if (offering.operations) { params = this.getJsonFromUri(offering.operations[0].href); }

    let data;
    // if we have a data-offering:
    if (offering.contents) {
      data = offering.contents[0].content;
    }

    const legendUrl = this.getLegendUrl(offering);

    const layerOptions: IVectorLayerOptions = {
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
      data
    };


    const layer = new VectorLayer(layerOptions);

    if (resource.bbox) {
      layer.bbox = resource.bbox;
    } else if (context && context.bbox) {
      layer.bbox = context.bbox;
    }

    return of(layer);
  }

  createRasterLayerFromOffering(
    offering: IOwsOffering, resource: IOwsResource, context: IOwsContext, targetProjection: string): Observable<RasterLayer> {
    const layerType = this.getLayertypeFromOfferingCode(offering);

    if (!isRasterLayertype(layerType)) {
      console.error(`This type of offering '${offering.code}' cannot be converted into a raster-layer.`);
      return null;
    }

    let rasterLayer$: Observable<RasterLayer>;
    switch (layerType) {
      case WmsLayertype:
        rasterLayer$ = this.createWmsLayerFromOffering(offering, resource, context, targetProjection);
        break;
      case WmtsLayertype:
        rasterLayer$ = this.createWmtsLayerFromOffering(offering, resource, context, targetProjection);
        break;
      case XyzLayertype:
        // @TODO
        break;
      case CustomLayertype:
        // custom layers are meant to be user-defined and not easily encoded in a OWC.
        break;
    }

    return rasterLayer$;
  }

  createTmsLayerFromOffering(offering: IOwsOffering, resource: IOwsResource, context: IOwsContext, targetProjection: string): Observable<CustomLayer> {
    const layerOptions = this.getLayerOptions(offering, resource, context);
    const tmsServerUrl = offering.operations.find(o => o.code === 'GetTiles').href;
    const { minZoom, maxZoom } = this.getMinMaxZoom(resource, targetProjection);
    const layer = new CustomLayer({
      ...layerOptions,
      type: 'custom',
      custom_layer: new olVectorTileLayer({
        declutter: true,
        source: new olVectorTileSource({
          attributions: this.getResourceAttribution(resource),
          format: new olMVT(),
          tileGrid: createXYZ({ minZoom, maxZoom }),
          url: tmsServerUrl,
        }),
        renderMode: 'hybrid'
      }),
    });

    if (offering.styles && offering.styles[0]?.content.type === 'mapbox-style') {
      const content = offering.styles[0].content;

      let styleObj$: Observable<any>;
      if (content.content) {
        styleObj$ = of(JSON.parse(content.content));
      } else if (content.href) {
        const url = content.href;
        styleObj$ = this.http.get(url);
      } else {
        console.error('Couldn\'t find style for Tms-Offering ', offering);
      }

      return styleObj$.pipe(map((styleObj) => {
        applyStyle(layer.custom_layer, styleObj, content['mapbox-source-key']);
        return layer;
      }));

    } else {
      return of(layer);
    }
  }

  private createWmtsLayerFromOffering(
    offering: IOwsOffering, resource: IOwsResource, context: IOwsContext, targetProjection: string): Observable<WmtsLayer> {
    return this.getWmtsOptions(offering, resource, context, targetProjection).pipe(map((options: IWmtsOptions) => {
      const layer = new WmtsLayer(options);
      return layer;
    }));
  }

  private createWmsLayerFromOffering(offering: IOwsOffering, resource: IOwsResource, context: IOwsContext, targetProjection: string): Observable<WmsLayer> {

    const options: IWmsOptions = this.getWmsOptions(offering, resource, context, targetProjection);
    const layer = new WmsLayer(options);
    return of(layer);
  }

  private getWmtsOptions(
    offering: IOwsOffering, resource: IOwsResource, context: IOwsContext, targetProjection: string): Observable<IWmtsOptions> {
    const rasterOptions: IRasterLayerOptions = this.getRasterLayerOptions(offering, resource, context, targetProjection);

    const layer = this.getLayerForWMTS(offering, resource);

    let style: string;
    if (offering.styles && offering.styles.length > 0) {
      const styleInfo = offering.styles.find(s => s.default);
      if (styleInfo) {
        style = styleInfo.name;
      }
    }

    return this.getMatrixSetForWMTS(offering, resource, targetProjection).pipe(map(((matrixSet: IEocOwsWmtsMatrixSet) => {
      const matrixSetOptions: IListMatrixSet = {
        matrixSet: matrixSet.matrixSet,
        matrixIds: matrixSet.matrixIds,
        resolutions: matrixSet.resolutions
      };
      const wmtsOptions: IWmtsOptions = {
        ...rasterOptions,
        type: 'wmts',
        params: {
          layer,
          matrixSetOptions,
          projection: targetProjection,
          style,
          format: 'image/png'
        }
      };
      return wmtsOptions;
    })));
  }

  private getLayerForWMTS(offering: IOwsOffering, resource: IOwsResource): string {
    const [url, urlParams] = this.parseOperationUrl(offering, 'GetTile');
    if (urlParams['LAYER']) {
      return urlParams['LAYER'];
    } else {
      console.error(`There is no layer-parameter in the offering ${offering.code} for resource ${resource.id}.
      Cannot infer layer.`, offering);
    }
  }

  private parseOperationUrl(offering: IOwsOffering, opCode: string): [string, object] {
    if (offering.operations) {
      const operation = offering.operations.find(op => op.code === opCode);
      if (operation) {
        const url = this.getUrlFromUri(operation.href);
        const urlParams = this.getJsonFromUri(operation.href);
        return [url, urlParams];
      } else {
        console.error(`There is no ${opCode}-operation in the offering ${offering.code}.`, offering);
      }
    } else {
      console.error(`The offering ${offering.code} has no operations.`, offering);
    }
  }

  private getMatrixSetForWMTS(offering: IOwsOffering, resource: IOwsResource, targetProjection: string): Observable<IEocOwsWmtsMatrixSet> {
    if (offering.matrixSets) {
      const matrixSet = offering.matrixSets.find(m => m.srs === targetProjection);
      return of(matrixSet);
    } else {
      const [url, urlParams] = this.parseOperationUrl(offering, 'GetCapabilities');
      return this.wmtsClient.getCapabilities(url).pipe(
        map((capabilities: object) => {
          const matrixSets = capabilities['value']['contents']['tileMatrixSet'];
          let matrixSet = matrixSets.find(ms => ms['identifier']['value'] === targetProjection);

          if (!matrixSet && targetProjection === 'EPSG:3857') {
            const altTargetProjection = 'EPSG:900913';
            matrixSet = matrixSets.find(ms => ms['identifier']['value'] === altTargetProjection);
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

  private getWmsOptions(
    offering: IOwsOffering, resource: IOwsResource, context: IOwsContext, targetProjection: string): IWmsOptions {

    const rasterOptions: IRasterLayerOptions = this.getRasterLayerOptions(offering, resource, context, targetProjection);
    if (rasterOptions.type === WmsLayertype) {

      const urlParams = this.getJsonFromUri(offering.operations[0].href);
      let defaultStyle;
      if (offering.styles && offering.styles.length > 0) {
        defaultStyle = offering.styles.find(s => s.default).name;
      } else if (urlParams['STYLES']) {
        defaultStyle = urlParams['STYLES'];
      }

      const params: IWmsParams = {
        LAYERS: urlParams['LAYERS'],
        FORMAT: urlParams['FORMAT'],
        TIME: urlParams['TIME'],
        VERSION: urlParams['VERSION'],
        TILED: urlParams['TILED'],
        TRANSPARENT: true,
        STYLES: defaultStyle
      };

      const wmsOptions: IWmsOptions = {
        ...rasterOptions,
        type: 'wms',
        params
      };
      return wmsOptions;
    } else {
      console.error(`resource ${resource.id} cannot be converted into a WMS-Layer`, offering);
    }
  }

  private getRasterLayerOptions(offering: IOwsOffering, resource: IOwsResource, context: IOwsContext, targetProjection: string): IRasterLayerOptions {
    const layerOptions: ILayerOptions = this.getLayerOptions(offering, resource, context);
    if (isRasterLayertype(layerOptions.type)) {
      let time, elevation;
      const dimensions = resource.properties.dimensions;
      if (dimensions) {
        const timeDimension = dimensions.find(d => d.name === 'time');
        if (timeDimension) {
          time = this.getLayerTimeDimension(timeDimension);
        }

        const elevationDimension = dimensions.find(d => d.name === 'elevation');
        if (elevationDimension) {
          elevation = this.getLayerElevationDimension(elevationDimension);
        }
      }

      const { minZoom, maxZoom } = this.getMinMaxZoom(resource, targetProjection);

      const rasterLayerOptions: IRasterLayerOptions = {
        ...layerOptions,
        type: layerOptions.type as TRasterLayertype,
        url: this.getUrlFromUri(offering.operations[0].href),
        subdomains: shardsExpand(this.getResourceShards(resource)),
        dimensions: { time, elevation },
        minZoom, maxZoom
      };
      return rasterLayerOptions;
    } else {
      console.error(`The layer ${layerOptions.id} is not a rasterlayer`, layerOptions);
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
      displayName: this.getDisplayName(offering, resource),
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

    const filterType = this.getFilterType(resource);
    if (filterType) {
      layerOptions.filtertype = filterType;
    }

    return layerOptions;
  }

  /** Misc --------------------------------------------------- */

  private getMinMaxZoom(resource: IOwsResource, targetProjection: string = 'EPSG:4326'): { minZoom: number; maxZoom: number; } {
    const zooms = { minZoom: 0, maxZoom: 12 };
    if (resource.properties.minZoom) {
      zooms.minZoom = resource.properties.minZoom;
    } else if (resource.properties.maxscaledenominator) {  // *Max*ScaleDenom ~ *Min*Zoom
      zooms.minZoom = this.scaleDenominatorToZoom(resource.properties.maxscaledenominator, targetProjection) || 0;
    }
    if (resource.properties.maxZoom) {
      zooms.maxZoom = resource.properties.maxZoom;
    } else if (resource.properties.minscaledenominator) {  // *Min*ScaleDenom ~ *Max*Zoom
      zooms.maxZoom = this.scaleDenominatorToZoom(resource.properties.minscaledenominator, targetProjection) || 12;
    }
    return zooms;
  }

  /**
   * Based on the WMS Standard (https://portal.ogc.org/files/?artifact_id=14416),
   * to which the OWC Standard refers for the scale-denominator-field,
   * and the way that openlayers calculates zoom and resolution
   * (https://openlayers.org/en/latest/doc/tutorials/concepts.html)
   */
  private scaleDenominatorToZoom(scaleDenominator: number, targetProjectionCode: string): number {
    const projection = getProjection(targetProjectionCode);
    if (!projection) {
      console.error(`The projection '${targetProjectionCode}' is unknown. You'll have to manually register it with 'proj4.defs'.`);
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

  private getUrlFromUri(uri: string) {
    return uri.substring(0, uri.indexOf('?'));
  }

  /**
   * helper to pack query-parameters of a uri into a JSON
   * @param uri any uri with query-parameters
   */
  private getJsonFromUri(uri: string): object {
    const query = uri.substr(uri.lastIndexOf('?') + 1);
    const result = {};
    query.split('&').forEach((part) => {
      const item = part.split('=');
      result[item[0].toUpperCase()] = decodeURIComponent(item[1]);
    });
    return result;
  }


  /**
   * retrieve display name of layer, based on IOwsResource and IOwsOffering
   */
  private getDisplayName(offering: IOwsOffering, resource: IOwsResource) {
    let displayName = '';
    if (offering.hasOwnProperty('title')) {
      if (offering.title) {
        displayName = offering.title;
      } else {
        displayName = this.getResourceTitle(resource);
      }
    }
    return displayName;
  }

  getResourceDescription(resource: IOwsResource): string {
    let description = '';
    if (resource.properties.abstract) {
      description = resource.properties.abstract;
    }
    return description;
  }

  getLayerElevationDimension(elevationDimension: IEocOwsResourceDimension): ILayerElevationDimension {
    throw new Error('Method not implemented.');
  }

  getLayerTimeDimension(time: IEocOwsResourceDimension): ILayerTimeDimension {
    if (time.name !== 'time') {
      console.error('Not a time-dimension: ', time);
      return;
    }

    const out: ILayerTimeDimension = {
      units: time.units,
      values: null
    };

    if (time.values.includes(',')) {
      const values = time.values.split(',');
      out.values = values;

    } else if (time.values.includes('/')) { // period
      const matches = time.values.match(/\d\d\d\d-\d\d-\d\d(T\d\d:\d\d:\d\d.\d\d\dZ)*/gm);
      const startDate = matches[0];
      const endDate = matches[1];
      const period = time.values.match(/P(\d*[YMDW])*(T\d*[HMS])*/)[0];

      out.values = {
        interval: `${startDate}/${endDate}`,
        periodicity: period
      };
    } else { // single entry
      out.values = [time.values];
    }

    return out;
  }

  /** ------------ DATA TO FILE ----------------------------------------- */


  /**
   * @TODO:
   *   - properties
   */
  generateOwsContextFrom(id: string, layers: Layer[], extent?: TGeoExtent, properties?): IEocOwsContext {

    if (!properties) {
      properties = {
        lang: '',
        links: [],
        title: '',
        updated: ''
      };
    }

    const owc: IEocOwsContext = {
      id,
      type: 'FeatureCollection',
      properties,
      features: []
    };

    if (extent) {
      owc['bbox'] = extent;
    }

    for (const layer of layers) {
      const resource: IEocOwsResource = this.generateResourceFromLayer(layer);
      // TODO check for layer types
      owc.features.push(resource);
    }

    return owc;
  }

  generateResourceFromLayer(layer: Layer): IEocOwsResource {
    const resource: IEocOwsResource = {
      id: layer.id,
      properties: {
        title: layer.name,
        updated: null,
        offerings: [this.generateOfferingFromLayer(layer)],
        opacity: layer.opacity,
        attribution: layer.attribution,
      },
      type: 'Feature',
      geometry: null
    };
    return resource;
  }

  generateOfferingFromLayer(layer: Layer, legendUrl?: string, iconUrl?: string): IEocOwsOffering {
    const offering: IEocOwsOffering = {
      code: this.getOfferingCodeFromLayer(layer),
      title: layer.name
    };

    if (layer.type === GeojsonLayertype) {
      offering.contents = this.getContentsFromLayer(layer as VectorLayer);
    } else {
      offering.operations = this.getOperationsFromLayer(layer);
    }

    if (legendUrl) { offering.legendUrl = legendUrl; }
    if (iconUrl) { offering.iconUrl = iconUrl; }

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
    const contents = [];
    switch (layer.type) {
      case GeojsonLayertype:
        const content = {
          type: 'FeatureCollection',
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
    } else if (layer instanceof VectorLayer) {
      switch (layer.type) {
        // case 'wfs': <--- this type of layer has not been implemented yet in datatypes-layers/Layers.ts
        //   return this.getWfsOperationsFromLayer(layer);
        default:
          console.error(`This type of service (${layer.type}) has not been implemented yet.`);
          return [];
      }
    }

  }


  getXyzOperationsFromLayer(layer: RasterLayer): IOwsOperation[] {
    const restCall: IOwsOperation = {
      code: 'REST',
      method: 'GET',
      type: 'text/html',
      href: `${layer.url}`
    };

    const operations: IOwsOperation[] = [
      restCall
    ];

    return operations;
  }

  getTmsOperationsFromLayer(layer: RasterLayer): IOwsOperation[] {
    // @TODO: what operations are defined on TMS? http://www.opengis.net/spec/owc-geojson/1.0/req/tms
    return [];
  }


  getWfsOperationsFromLayer(layer: VectorLayer): IOwsOperation[] {

    const url = layer.url;
    const layerName = layer.name;
    const version = layer.options.version ? layer.options.version : '1.1.0';


    const GetFeature: IOwsOperation = {
      code: 'GetFeature',
      method: 'GET',
      type: 'application/json',
      href: `${url}?service=WFS&version=${version}&request=GetFeature`
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

    const operations = [
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

    const url = layer.url;
    const wmsVersion = layer.params.VERSION;
    const layerName = layer.name;
    const layerId = layer.id;
    let format = 'image/vnd.jpeg-png';
    if (layer.params && layer.params.FORMAT) { format = layer.params.FORMAT; }

    const getMap: IOwsOperation = {
      code: 'GetMap',
      method: 'GET',
      type: format,
      href: `${url}?service=WMS&version=${wmsVersion}&request=GetMap&TRANSPARENT=TRUE&LAYERS=${layerId}&FORMAT=${format}&TILED=true`
    };

    const getCapabilities: IOwsOperation = {
      code: 'GetCapabilities',
      method: 'GET',
      type: 'application/xml',
      href: `${url}?service=WMS&version=${wmsVersion}&request=GetCapabilities`
    };

    const getFeatureInfo: IOwsOperation = {
      code: 'GetFeatureInfo',
      method: 'GET',
      type: 'text/html',
      href: `${url}?service=WMS&version=${wmsVersion}&request=GetFeatureInfo&TRANSPARENT=TRUE&LAYERS=${layerId}&FORMAT=${format}`
    };

    const operations: IOwsOperation[] = [
      getMap,
      getCapabilities,
      getFeatureInfo
    ];

    return operations;
  }

  getWmtsOperationsFromLayer(layer: RasterLayer): IOwsOperation[] {

    const url = layer.url;
    const wmtsVersion = layer.params.version;
    const layerName = layer.name;
    const layerId = layer.id;
    let format = 'image/vnd.jpeg-png';
    if (layer.params && layer.params.FORMAT) { format = layer.params.FORMAT; }

    const getTile: IOwsOperation = {
      code: 'GetTile',
      href: `${url}?SERVICE=WMTS&REQUEST=GetTile&FORMAT=${format}&LAYER=${layerId}&VERSION=${wmtsVersion}`,
      method: 'GET',
      type: format
    };

    const getCapabilities: IOwsOperation = {
      code: 'GetCapabilities',
      href: `${url}?SERVICE=WMTS&REQUEST=GetCapabilities&VERSION=${wmtsVersion}`,
      method: 'GET',
      type: 'application/xml'
    };

    // Note: we deliberately use the WMS protocol here instead of WMTS.
    // Reason: WMTS delivers RGB-values, wheras WMS delivers the actual value that was used to create a tile.
    const getFeatureInfo: IOwsOperation = {
      code: 'GetFeatureInfo',
      href: `${url}?SERVICE=WMS&REQUEST=GetFeatureInfo&VERSION=${wmtsVersion}`,
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
}
