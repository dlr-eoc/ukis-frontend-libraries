import { WpsMarshaller, WpsInput, WpsOutput, WpsResult, WpsCapability } from "../wps_marshaller";
import { WPSCapabilitiesType, IWpsExecuteProcessBody, Execute, DataInputsType, InputType, ResponseFormType, DataType, IWpsExecuteResponse, DocumentOutputDefinitionType, ResponseDocumentType } from "./wps_1.0.0";



export class WpsFactory100 implements WpsMarshaller {
    
    constructor() { }
    
    getCapabilitiesUrl(baseurl: string): string {
        return `${baseurl}?service=WPS&request=GetCapabilities&version=1.0.0`;
    }

    executeUrl(baseurl: string, processId: string): string {
        return `${baseurl}?service=WPS&request=Execute&version=1.0.0&identifier=${processId}`;
    }

    unmarshalCapabilities(capabilities: WPSCapabilitiesType): WpsCapability[] {
        let out: WpsCapability[] = [];
        capabilities.processOfferings.process.forEach(process => {
            out.push({
                id: process.identifier.value
            })
        })
        return out;
    }

    unmarshalExecuteResponse(responseJson: IWpsExecuteResponse): WpsResult[] {
        let out: WpsResult[] = [];

        if(responseJson.value.processOutputs) { // synchronous request?
            for(let output of responseJson.value.processOutputs.output) {
                let isReference = output.reference ? true : false;
                
                let datatype;
                let data;
                let format; 
                if(isReference) {
                    datatype = "complex";
                    data = output.reference.href || null;
                    format = output.reference.mimeType;
                } else {
                    if(output.data && output.data.literalData) {
                        datatype = "literal"; 
                        format = output.data.literalData.dataType;
                    }
                    else if(output.data.complexData) {
                        datatype = "complex";
                        format = output.data.complexData.mimeType;
                    }
                    else datatype = "bbox";
                    data = this.unmarshalOutputData(output.data);
                }
    
                out.push({
                    id: output.identifier.value,
                    data: data,
                    format: format,
                    reference: isReference,
                    type: datatype
                });
            }
        } else if(responseJson.value.statusLocation) { // asynchronous request?
            out.push({
                id: responseJson.value.process.identifier.value,
                data: responseJson.value.statusLocation, 
                reference: true, 
                type: "status"
            });
        }

        return out;
    }

    protected unmarshalOutputData(data: DataType): any {
        if(data.complexData) {
            switch(data.complexData.mimeType){
                case "application/vnd.geo+json": 
                    return data.complexData.content.map(cont => JSON.parse(cont));
                case "application/WMS":
                    return data.complexData.content;
                default: 
                    throw new Error(`Cannot unmarshal data of format ${data.complexData.mimeType}`);
            }
        }
        throw new Error(`Not yet implemented: ${data}`);
    }

    marshalExecBody(processId: string, inputs: WpsInput[], output: WpsOutput, async: boolean): IWpsExecuteProcessBody {

        let wps1Inputs = this.marshalInputs(inputs);
        let wps1ResponseForm = this.marshalResponseForm(output, async);

        let bodyValue: Execute = {
            dataInputs: wps1Inputs,
            identifier: processId,
            responseForm: wps1ResponseForm,
            service: "WPS",
            version: "1.0.0"
        };

        let body: IWpsExecuteProcessBody = {
            name: {
                key: "{http://www.opengis.net/wps/1.0.0}Execute",
                localPart: "Execute",
                namespaceURI: "http://www.opengis.net/wps/1.0.0",
                prefix: "wps",
                string: "{http://www.opengis.net/wps/1.0.0}wps:Execute"
            },
            value: bodyValue
        };

        return body;

    }


    protected marshalResponseForm(output: WpsOutput, async=false): ResponseFormType {

        let defType: DocumentOutputDefinitionType;
        switch(output.type) {
            case "literal":
                defType = {
                    identifier: { value: output.id },
                    asReference: output.reference,
                    mimeType: output.format
                };
                break;
            case "complex":
                defType = {
                    identifier: { value: output.id },
                    asReference: output.reference,
                    mimeType: output.format
                };
                break;
            default: 
                throw new Error(`This Wps-outputtype has not been implemented yet! ${output} `);
        }

        let responseDocument: ResponseDocumentType = {
            output: [defType],
            status: async ? true : false,
            storeExecuteResponse: async ? true : false
        }

        let form: ResponseFormType = {
            responseDocument: responseDocument
        };
        return form;
    }


    protected marshalInputs(inputArr: WpsInput[]) {
        
        let theInputs: InputType[] = [];
        
        for(let inp of inputArr) {
    
            let data: DataType;
            switch(inp.type) {
                case "literal":
                    data = {
                        literalData: { value: String(inp.data) }
                    };
                    break;
                case "bbox": 
                    data = {
                        boundingBoxData: {
                            lowerCorner: [inp.data[1], inp.data[0]],
                            upperCorner: [inp.data[3], inp.data[2]]
                        }
                    };
                    break;
                case "complex":
                    data = {
                        complexData: {
                            content: inp.data,
                            mimeType: inp.format
                        }
                    };
                    break;
            }

            theInputs.push({
                identifier: { value: inp.id },
                title: { value: inp.id }, 
                _abstract: { value: "" }, 
                data: data, 
            })
        }
        let inputs: DataInputsType = {
            input: theInputs
        };
        return inputs;
    }
}
