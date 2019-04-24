export type WpsVerion = "1.0.0" | "2.0.0";

interface WpsBasicInput {
    id: string;
    data?: any;
    reference?: string;
}

export interface WpsLiteralInput extends WpsBasicInput {
    inputtype: "literal", 
    datatype: string;
}

export interface WpsComplexInput extends WpsBasicInput {
    inputtype: "complex",
}

export interface WpsBboxInput extends WpsBasicInput {
    inputtype: "bbox"
}

export type WpsInput = WpsLiteralInput | WpsBboxInput | WpsComplexInput;


interface WpsBasicOutput {
    id: string;
}

export interface WpsReferenceOutput extends WpsBasicOutput {
    type: "reference",
    outputFormat: string
}

export interface WpsValueOutput extends WpsBasicOutput {
    type: "value", 
    outputFormat: string
}

export type WpsOutput = WpsReferenceOutput | WpsValueOutput;


export interface WpsResult {
    id: string, 
    value: any
}


export interface WpsMarshaller {
    unmarshalCapabilities(capabilitiesJson: any): any;
    unmarshalExecuteResponse(responseJson: any): WpsResult[];
    marshalExecBody(processId: string, inputs: WpsInput[], output: WpsOutput): any;
    getCapabilitiesUrl(baseurl: string): string;
    executeUrl(url: string, processId: string): string;
}
