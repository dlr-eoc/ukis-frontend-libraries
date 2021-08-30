export type WpsVersion = '1.0.0' | '2.0.0';
export type WpsDataFormat = 'application/vnd.geo+json' | 'application/json' | 'application/WMS' |
  'application/xml' | 'text/xml' | 'application/text' | 'image/geotiff' |
  'text/plain';


export type ProcessId = string;
export type ProductId = string;

export interface WpsDataDescription {
  id: ProductId;
  title: string;
  type: 'literal' | 'complex' | 'bbox' | 'status' | 'error';
  reference: boolean;
  /** http://earthquake.usgs.gov/eqcenter/shakemap , ... */
  schema?: string;
  /** UTF-8, ... */
  encoding?: string;
  format?: WpsDataFormat;
  description?: string;
  defaultValue?: any;
  options?: any[];
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
};


export interface WpsState {
  status: 'Succeeded' | 'Failed' | 'Accepted' | 'Running' | 'Dismissed';
  percentCompleted?: number;
  /** WPS 2.0 only */
  jobID?: string;
  /** WPS 1.0 only */
  statusLocation?: string;
  /** WPS 1.0 only: a success-state already contains the results */
  results?: any;
}

export function isWpsState(obj: object): obj is WpsState {
  return obj && obj.hasOwnProperty('status') && (obj.hasOwnProperty('jobID') || obj.hasOwnProperty('statusLocation'));
}


export interface WpsBboxData {
  description: WpsBboxDescription;
  value: WpsBboxValue;
}

export interface WpsCapability {
  id: string;
}


export interface WpsProcessDescription {
  id: string;
  processVersion: string;
  title?: string;
  description?: string;
  inputs: WpsInput[];
  outputs: WpsResult[];
}

export interface WpsServerDescription {
  serverUrl: string;
  serverVersion: WpsVersion;
}


export interface WpsMarshaller {

  executeUrl(url: string, processId: string): string;
  dismissUrl(serverUrl: string, processId: string, jobId: string): string;
  getCapabilitiesUrl(baseurl: string): string;
  getDescribeProcessUrl(baseurl: string, processId: string): string;

  marshalExecBody(processId: string, inputs: WpsInput[], outputs: WpsOutputDescription[], async: boolean): any;
  marshallGetStatusBody(serverUrl: string, processId: string, statusId: string): any;
  marshallGetResultBody(serverUrl: string, processId: string, jobID: string): any;
  marshalDismissBody(jobId: string): any;

  unmarshalCapabilities(capabilitiesJson: any): WpsCapability[];
  unmarshalProcessDescription(processDescriptionJson: any): WpsProcessDescription;
  unmarshalSyncExecuteResponse(responseJson: any, url: string, processId: string, inputs: WpsInput[], outputDescriptions: WpsOutputDescription[]): WpsResult[];
  unmarshalAsyncExecuteResponse(responseJson: any, url: string, processId: string, inputs: WpsInput[], outputDescriptions: WpsOutputDescription[]): WpsState;
  unmarshalGetStateResponse(jsonResponse: any, serverUrl: string, processId: string, inputs: WpsInput[], outputDescriptions: WpsOutputDescription[]): WpsState;
  unmarshalDismissResponse(jsonResponse: any, serverUrl: string, processId: string): WpsState;
}
