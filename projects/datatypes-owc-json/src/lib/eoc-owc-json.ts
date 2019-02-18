import { IOwsContext, IOwsResource } from "./owc-json";



export interface IEocOwsContext extends IOwsContext {
    features: IEocOwsResource[],
}

export interface IEocOwsResource extends IOwsResource {
    
}
