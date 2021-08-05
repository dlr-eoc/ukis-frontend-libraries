import {
  IOwsContext, IOwsResource, IOwsOffering, WMS_Offering, WFS_Offering, WCS_Offering, WPS_Offering,
  CSW_Offering, WMTS_Offering, GML_Offering, KML_Offering, GeoTIFF_Offering, GMLJP2_Offering,
  GMLCOV_Offering, IOwsResourceProperties, TMS_Offering
} from './owc-json';
import {ILayerTimeDimension, ILayerElevationDimension } from '@dlr-eoc/services-layers';


import * as GeoJSON from 'geojson';
export interface IEocOwsContext extends IOwsContext {
  features: IEocOwsResource[];
  projections?: IEocOwsProjection[];
}

export interface IEocOwsResource extends IOwsResource {
  properties: IEocOwsResourceProperties;
}

export interface IEocOwsResourceProperties extends IOwsResourceProperties {
  opacity?: number;
  attribution?: string;
  shards?: string;
  dimensions?: IEocOwsResourceDimension[];
  previewUrl?: string;
}

export interface IEocOwsResourceDimension {
  name: 'time' | 'elevation';
  /**
   * For time:
   *  - '1984-01-01T00:00:00.000Z,1990-01-01T00:00:00.000Z,1995-01-01T00:00:00.000Z'
   *  - '2000-09-01T00:00:00.000Z/2017-08-31T00:00:00.000Z/P1D'
   */
  values: string;
  /**
   * For time: 'ISO8601'
   * ISO8601 has been chosen because this is how
   * geoserver's GetCapabilities response exposes
   * time information.
   */
  units: 'ISO8601' | string;
  display?: {
    format?: string;
    /** in case the app should display data at a different period than what is available on the server */
    period?: string;
    default?: boolean;
  };
}

export interface IEocOwsOffering extends IOwsOffering {
  code: WMS_Offering | WFS_Offering | WCS_Offering | WPS_Offering | CSW_Offering |
  WMTS_Offering | GML_Offering | KML_Offering | GeoTIFF_Offering | GMLJP2_Offering |
  GMLCOV_Offering | GeoJson_Offering | TMS_Offering | string;
  iconUrl?: string;
  title?: string;
}

export interface IEocWmsOffering extends IEocOwsOffering {
  code: WMS_Offering;
}

export interface IEocOwsWmtsOffering extends IEocOwsOffering {
  code: WMTS_Offering;
  matrixSets?: IEocOwsWmtsMatrixSet[];
}

export interface IEocOwsWmtsMatrixSet {
  /** EPSG-Code */
  srs: string;
  matrixSet: string;
  matrixIds: string[];
  origin: {
    x: number,
    y: number
  };
  resolutions: number[];
  tilesize: {
    height: number,
    width: number
  };
}

export interface IEocOwsProjection {
  bbox?: GeoJSON.BBox;
  code: string;
  default?: boolean;
  unit?: string | number;
}
/**
 * http://www.owscontext.org/owc_user_guide/C0_userGuide.html#trueextension-offerings
 */
export type GeoJson_Offering = 'http://www.opengis.net/spec/owc-geojson/1.0/req/geojson';
export type Xyz_Offering = 'http://www.opengis.net/spec/owc-geojson/1.0/req/xyz';
