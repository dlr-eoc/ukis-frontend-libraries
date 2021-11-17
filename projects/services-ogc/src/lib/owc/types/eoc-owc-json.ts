import {
  IOwsContext, IOwsResource, IOwsOffering, WFS_Offering, WCS_Offering, WPS_Offering,
  CSW_Offering, WMTS_Offering, GML_Offering, KML_Offering, GeoTIFF_Offering, GMLJP2_Offering,
  GMLCOV_Offering, IOwsResourceProperties, WMS_Offering
} from './owc-json';


import * as GeoJSON from 'geojson';
export interface IEocOwsContext extends IOwsContext {
  features: IEocOwsResource[];
  /** @deprecated we do not use this currently */
  projections?: IEocOwsProjection[];
}

export interface IEocOwsResource extends IOwsResource {
  properties: IEocOwsResourceProperties;
}

export interface IEocOwsResourceProperties extends IOwsResourceProperties {
  opacity?: number;
  attribution?: string; /** maybe this should be in IOwsResourceProperties.rights */
  shards?: string;
  dimensions?: IEocOwsResourceDimension[];
  /** Alternative to IOwsResourceProperties.minscaledenominator; easier to calculate in browser-apps */
  minZoom?: number;
  /** Alternative to IOwsResourceProperties.maxscaledenominator; easier to calculate in browser-apps */
  maxZoom?: number;
}



type isoInterval = `${string}/${string}`;
type intervalPeriod = `${isoInterval}/P${string}`;

export interface IEocOwsTimeDimension {
  name: 'time';
  /**
   * For time:
   *  - '1984-01-01T00:00:00.000Z,1990-01-01T00:00:00.000Z,1995-01-01T00:00:00.000Z,...'
   *  - '2000-09-01T00:00:00.000Z/2017-08-31T00:00:00.000Z/P1D'
   *  - '2000-09-01T00:00:00.000Z/2010-08-31T00:00:00.000Z/P1D,2010-09-01T00:00:00.000Z/2020-08-31T00:00:00.000Z/P1D,...'
   *  - '1984-01-01T00:00:00.000Z/P1Y,1985-01-01T00:00:00.000Z/P1Y,1986-01-01T00:00:00.000Z,1987-01-01T00:00:00.000Z,...'
   *  also see https://moment.github.io/luxon/api-docs/index.html#intervalfromiso
   */
  values: `${string | isoInterval | intervalPeriod},${string | isoInterval | intervalPeriod}` | isoInterval | intervalPeriod;
  /**
   * For time: 'ISO8601'
   * ISO8601 has been chosen because this is how
   * geoserver's GetCapabilities response exposes
   * time information.
   */
  units: 'ISO8601' | string;
  display?: {
    /** format how to display the values e.g. YYYY-MM-DD */
    format?: string;
    /** in case the app should display data at a different period than what is available on the server */
    period?: string;
    /** The value which should be shown/used as default */
    default?: string;
  };
}

/** 12-111r1_Best_Practices_for_WMS_with_Time_or_Elevation_dependent_data.pdf - https://portal.ogc.org/files/?artifact_id=56394 */
export interface IEocOwsElevationDimension {
  name: 'elevation';
  /**
   *
   */
  value: string;
  /**
   * string or range
   * 100,200,300...
   * 100/1000
   */
  units: string;
  display?: {
    unitSymbol?: string;
    format?: string;
    /** in case the app should display data at a different elevation step */
    step?: string;
    /** The value which should be shown/used as default */
    default?: string;
  };
}

export type IEocOwsResourceDimension = IEocOwsTimeDimension | IEocOwsElevationDimension;

export interface IEocOwsOffering extends IOwsOffering {
  code: WMS_Offering | WFS_Offering | WCS_Offering | WPS_Offering | CSW_Offering |
  WMTS_Offering | GML_Offering | KML_Offering | GeoTIFF_Offering | GMLJP2_Offering |
  GMLCOV_Offering | GeoJson_Offering | TMS_Offering | string;
  /** @deprecated we do not use this currently */
  iconUrl?: string;
  /** @deprecated we do not use this currently */
  title?: string;
  /** only for WMTS_Offering */
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

/**
 * @deprecated we do not use this currently
 */
export interface IEocOwsProjection {
  bbox?: GeoJSON.BBox;
  code: string;
  default?: boolean;
  unit?: string | number;
}
/**
 * http://www.owscontext.org/owc_user_guide/C0_userGuide.html#trueextension-offerings
 */
export const GeoJsonOffering = 'http://www.opengis.net/spec/owc-geojson/1.0/req/geojson' as const;
export type GeoJson_Offering = typeof GeoJsonOffering;

export const xyzOffering = 'http://www.opengis.net/spec/owc-geojson/1.0/req/xyz' as const;
export type Xyz_Offering = typeof xyzOffering;

export const tmsOffering = 'http://www.opengis.net/spec/owc-geojson/1.0/req/tms' as const;
export type TMS_Offering = typeof tmsOffering;


/** list of context files */
export interface IEocOwsContextListItem {
  id: IEocOwsContext['id'];
  /** relative or absolute link/path to context file */
  url: string;
  /** default is true */
  enabled?: boolean;
}

export type EocOwsContextList = IEocOwsContextListItem[];
