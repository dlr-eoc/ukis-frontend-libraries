export type WpsVerion = "1.0.0" | "2.0.0";


export interface WpsInput {
    id: string;
    type: "literal" | "complex" | "bbox";
    reference: boolean;
    data: any;
    format?: string;
}

export interface WpsOutput {
    id: string;
    type: "literal" | "complex" | "bbox";
    reference: boolean; 
    format?: string;
}

export interface WpsResult {
    id: string;
    type: "literal" | "complex" | "bbox";
    reference: boolean;
    data: any;
    format?: string;
}

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
