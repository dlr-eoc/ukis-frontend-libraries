import { WpsMarshaller, WpsInput, WpsOutput, WpsResult } from "../wps_marshaller";
import { WPSCapabilitiesType, IWpsExecuteProcessBody, Execute, DataInputsType, InputType, ResponseFormType, DataType, IWpsExecuteResponse, DocumentOutputDefinitionType } from "./wps_1.0.0";
import { Product } from "@ukis/process-control/src/public_api";


export class WpsFactory100 implements WpsMarshaller {
    
    constructor() { }
    
    getCapabilitiesUrl(baseurl: string): string {
        return `${baseurl}?service=WPS&request=GetCapabilities&version=1.0.0`;
    }

    executeUrl(baseurl: string, processId: string): string {
        return `${baseurl}?service=WPS&request=Execute&version=1.0.0&identifier=${processId}`;
    }

    unmarshalCapabilities(capabilities: WPSCapabilitiesType) {
        let out = [];
        capabilities.processOfferings.process.forEach(process => {
            out.push({
                id: process.identifier.value,
                title: process.title[0] ? process.title[0].value : ""
            })
        })
        return out;
    }

    unmarshalExecuteResponse(responseJson: IWpsExecuteResponse): WpsResult[] {
        let out: WpsResult[] = [];
        for(let output of responseJson.value.processOutputs.output) {
            out.push({
                id: output.identifier.value,
                value: this.unmarshalOutputData(output.data)
            });
        }
        return out;
    }

    unmarshalOutputData(data: DataType): any {
        if(data.complexData) {
            return data.complexData.content.map(cont => JSON.parse(cont));
            // @TODO: handle case where format is not json
        }
        throw new Error(`Not yet implemented: ${data}`);
    }

    marshalExecBody(processId: string, inputs: WpsInput[], output: WpsOutput): IWpsExecuteProcessBody {

        let wps1Inputs = this.marshalInputs(inputs);
        let wps1ResponseForm = this.marshalResponseForm(output);

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


    marshalResponseForm(output: WpsOutput): ResponseFormType {

        let defType: DocumentOutputDefinitionType;
        switch(output.type) {
            case "reference":
                defType = {
                    identifier: { value: output.id },
                    asReference: true // @TODO
                };
                break;
            case "value":
                defType = {
                    identifier: { value: output.id },
                    mimeType: output.outputFormat
                };
                break;
            default: 
                throw new Error(`This Wps-outputtype has not been implemented yet! ${output} `);
        }

        let form: ResponseFormType = {
            responseDocument: {
                output: [defType]
            }
        };
        return form;
    }


    marshalInputs(inputArr: WpsInput[]) {
        
        let theInputs: InputType[] = [];
        
        for(let inp of inputArr) {
    
            let data: DataType;
            switch(inp.inputtype) {
                case "literal":
                    data = {
                        literalData: { value: String(inp.data) }
                    };
                    break;
                case "bbox": 
                    data = {
                        boundingBoxData: {
                            lowerCorner: [inp.data[0], inp.data[1]],
                            upperCorner: [inp.data[2], inp.data[3]]
                        }
                    };
                    break;
                case "select":
                    data = {
                        complexData: {
                            content: inp.data
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
