import { WpsMarshaller, WpsInput, WpsOutput, WpsResult } from "../wps_marshaller";
import { WPSCapabilitiesType, IWpsExecuteProcessBody, Execute, DataInputsType, InputType, ResponseFormType, DataType, IWpsExecuteResponse, DocumentOutputDefinitionType } from "./wps_1.0.0";



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
            let isReference = output.reference ? true : false;
            
            let datatype;
            let data;
            let format; 
            if(isReference) {
                datatype = "literal";
                data = output.reference.href;
                format = output.reference.mimeType;
            } else {
                if(output.data.literalData) datatype = "literal";
                else if(output.data.complexData) datatype = "complex";
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
        return out;
    }

    protected unmarshalOutputData(data: DataType): any {
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


    protected marshalResponseForm(output: WpsOutput): ResponseFormType {

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

        let form: ResponseFormType = {
            responseDocument: {
                output: [defType]
            }
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
