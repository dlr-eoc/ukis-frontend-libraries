export type WpsVerion = "1.0.0" | "2.0.0";


export interface WpsData {
    id: string;
    type: "literal" | "complex" | "bbox";
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

    marshalExecBody(processId: string, inputs: WpsInput[], output: WpsOutput): any;
}
