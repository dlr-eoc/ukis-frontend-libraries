export type WpsVerion = '1.0.0' | '2.0.0';
export type WpsDataFormat = 'application/vnd.geo+json' | 'application/json' | 'application/WMS' |
                            'application/xml' | 'text/xml' | 'application/text' | 'image/geotiff' |
                            'text/plain';


export type ProcessId = string;
export type ProductId = string;

export interface WpsDataDescription {
    id: ProductId;
    type: 'literal' | 'complex' | 'bbox' | 'status' | 'error';
    reference: boolean;
    format?: WpsDataFormat;
    description?: string;
    defaultValue?: any;
}
export type WpsInputDescription = WpsDataDescription;
export type WpsOutputDescription = WpsDataDescription;


export interface WpsData {
    description: WpsDataDescription;
    value: any;
}
export type WpsInput = WpsData;
export type WpsResult = WpsData;

export interface WpsBboxDescription {
    id: ProductId;
    type: 'bbox';
    reference: boolean;
    format?: WpsDataFormat;
    description?: string;
    defaultValue?: any;
}

export interface WpsBboxValue {
    crs: string;
    lllon: number;
    lllat: number;
    urlon: number;
    urlat: number;
}

export const isBbox = (obj: object): obj is WpsBboxValue => {
    return (
        obj.hasOwnProperty('crs') &&
        obj.hasOwnProperty('lllon') &&
        obj.hasOwnProperty('lllat') &&
        obj.hasOwnProperty('urlon') &&
        obj.hasOwnProperty('urlat')
    );
}

export interface WpsBboxData {
    description: WpsBboxDescription;
    value: WpsBboxValue;
}

export interface WpsCapability {
    id: string;
}


export interface WpsMarshaller {

    getCapabilitiesUrl(baseurl: string): string;
    executeUrl(url: string, processId: string): string;

    unmarshalCapabilities(capabilitiesJson: any): WpsCapability[];
    unmarshalExecuteResponse(responseJson: any, url: string, processId: string): WpsResult[];

    marshalExecBody(processId: string, inputs: WpsInput[], outputs: WpsOutputDescription[], async: boolean): any;
}
