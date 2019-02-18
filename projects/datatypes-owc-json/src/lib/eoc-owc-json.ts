import { IOwsContext, IOwsResource } from "./owc-json";



export interface IEocOwsContext extends IOwsContext {
    features: IEocOwsResource[],
}

export interface IEocOwsResource extends IOwsResource {
    
}

export type GeoJson_Offering = 'http://www.opengis.net/spec/owc-geojson/1.0/req/geojson';