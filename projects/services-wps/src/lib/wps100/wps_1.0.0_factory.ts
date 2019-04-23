import { WpsMarshaller, WpsInput, WpsOutputDescription, WpsResult } from "../wps_marshaller";
import { WPSCapabilitiesType, IWpsExecuteProcessBody, Execute, DataInputsType, InputType, ResponseFormType, DataType, IWpsExecuteResponse } from "./wps_1.0.0";
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
                id: "",
                value: output.data 
            });
        }
        return out;
    }

    marshalExecBody(processId: string, inputs: WpsInput[], output: WpsOutputDescription): IWpsExecuteProcessBody {

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


    marshalResponseForm(output: WpsOutputDescription): ResponseFormType {
        let form: ResponseFormType = {
            responseDocument: {
                output: [{
                    identifier: {value: output.id}
                }]
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
                    literalData: {
                        value: String(inp.data)
                    }
                };
                break;
            }

            theInputs.push({
                identifier: {
                    value: inp.id
                },
                title: {
                    value: inp.id
                }, 
                _abstract: {
                    value: ""
                }, 
                data: data, 
            })
        }
        let inputs: DataInputsType = {
            input: theInputs
        };
        return inputs;
    }
}
