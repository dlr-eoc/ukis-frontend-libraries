export type WpsVerion = "1.0.0" | "2.0.0";

export interface WpsInput {
    type: "literal" | "complex" | "bbox";
    id: string;
    data?: any;
    reference?: string
}

export interface WpsLiteralInput extends WpsInput {
    type: "literal", 
    datatype: string;
}

export interface WpsOutputDescription {
    type: "literal" | "complex",
    id: string
}

export interface WpsComplexOutputDescription extends WpsOutputDescription {
    type: "complex", 
    outputFormat: string
}


export interface WpsMarshaller {
    unmarshalCapabilities(capabilitiesJson: any): any;
    unmarshalExecuteResponse(responseJson: any): any;
    marshalExecBody(processId: string, inputs: WpsInput[], output: WpsOutputDescription): any;
    getCapabilitiesUrl(baseurl: string): string;
    executeUrl(url: string, processId: string): string;
}