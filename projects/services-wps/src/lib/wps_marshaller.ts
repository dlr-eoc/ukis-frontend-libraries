export type WpsVerion = "1.0.0" | "2.0.0";


/**
 * Type "status": returned from WPS on asynchronous execute-request. Data will then be a Url to the result-document. 
 */
export interface WpsData {
    id: string;
    type: "literal" | "complex" | "bbox" | "status";
    reference: boolean;
    data: any;
    format?: string;
}

export type WpsInput = WpsData;

export interface WpsOutput {
    id: string;
    type: "literal" | "complex" | "bbox";
    reference: boolean; 
    format?: string;
}

export type WpsResult = WpsData;

export interface WpsCapability {
    id: string,
}


export interface WpsMarshaller {

    getCapabilitiesUrl(baseurl: string): string;
    executeUrl(url: string, processId: string): string;

    unmarshalCapabilities(capabilitiesJson: any): WpsCapability[];
    unmarshalExecuteResponse(responseJson: any): WpsResult[];

    marshalExecBody(processId: string, inputs: WpsInput[], output: WpsOutput, async: boolean): any;
}
