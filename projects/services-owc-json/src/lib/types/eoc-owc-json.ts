import { IOwsContext, IOwsResource, IOwsOffering, WMS_Offering, WFS_Offering, WCS_Offering, WPS_Offering, CSW_Offering, WMTS_Offering, GML_Offering, KML_Offering, GeoTIFF_Offering, GMLJP2_Offering, GMLCOV_Offering, IOwsResourceProperties } from "./owc-json";



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
}

export interface IEocOwsOffering extends IOwsOffering {
    code: WMS_Offering | WFS_Offering | WCS_Offering | WPS_Offering | CSW_Offering | WMTS_Offering | GML_Offering | KML_Offering | GeoTIFF_Offering | GMLJP2_Offering | GMLCOV_Offering | GeoJson_Offering | string;
    legendUrl?: string;
    iconUrl?: string;
    title?: string;
}

export interface IEocOwsWmtsOffering extends IEocOwsOffering {
    matrixSets: IEocOwsWmtsMatrixSet[]
}

export interface IEocOwsWmtsMatrixSet {
    // TODO
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
