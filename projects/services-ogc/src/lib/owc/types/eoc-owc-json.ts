import { IOwsContext, IOwsResource, IOwsOffering, WMS_Offering, WFS_Offering, WCS_Offering, WPS_Offering,
    CSW_Offering, WMTS_Offering, GML_Offering, KML_Offering, GeoTIFF_Offering, GMLJP2_Offering,
    GMLCOV_Offering, IOwsResourceProperties } from './owc-json';



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
    dimensions?: IEocOwsResourceDimensions;
}

export interface IEocOwsResourceDimensions {
  time?: IEocOwsResourceDimension;
  elevation?: IEocOwsResourceDimension;
  [k: string]: any;
}

export interface IEocOwsResourceDimension {
  /** Default step display of time slider */
  display?: string;
  units: string;
  value?: string;
}

export interface IEocOwsOffering extends IOwsOffering {
    code: WMS_Offering | WFS_Offering | WCS_Offering | WPS_Offering | CSW_Offering |
        WMTS_Offering | GML_Offering | KML_Offering | GeoTIFF_Offering | GMLJP2_Offering |
        GMLCOV_Offering | GeoJson_Offering | string;
    legendUrl?: string;
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
    bbox: GeoJSON.BBox;
    code: string;
    default?: boolean;
    unit?: string | number;
}
/**
* http://www.owscontext.org/owc_user_guide/C0_userGuide.html#trueextension-offerings
*/
export type GeoJson_Offering = 'http://www.opengis.net/spec/owc-geojson/1.0/req/geojson';
export type Xyz_Offering = 'http://www.opengis.net/spec/owc-geojson/1.0/req/xyz';
