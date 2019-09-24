import { WpsMarshaller, WpsInput, WpsOutputDescription, WpsResult, WpsCapability } from '../wps_datatypes';
import { WPSCapabilitiesType, IWpsExecuteProcessBody, Execute, DataInputsType,
         InputType, ResponseFormType, DataType, IWpsExecuteResponse, DocumentOutputDefinitionType,
         ResponseDocumentType } from './wps_1.0.0';



export class WpsMarshaller100 implements WpsMarshaller {
    
    constructor() { }
    
    getCapabilitiesUrl(baseurl: string): string {
        return `${baseurl}?service=WPS&request=GetCapabilities&version=1.0.0`;
    }

    executeUrl(baseurl: string, processId: string): string {
        return `${baseurl}?service=WPS&request=Execute&version=1.0.0&identifier=${processId}`;
    }

    unmarshalCapabilities(capabilities: WPSCapabilitiesType): WpsCapability[] {
        const out: WpsCapability[] = [];
        capabilities.processOfferings.process.forEach(process => {
            out.push({
                id: process.identifier.value
            });
        });
        return out;
    }

    unmarshalExecuteResponse(responseJson: IWpsExecuteResponse): WpsResult[] {
        const out: WpsResult[] = [];

        if (responseJson.value.status.processFailed) { // Failure?
            out.push({
                description: {
                    id: responseJson.value.process.identifier.value,
                    reference: true,
                    type: 'error'
                },
                value: responseJson.value.statusLocation
            });
        } else if (responseJson.value.processOutputs) { // synchronous request?
            for (const output of responseJson.value.processOutputs.output) {
                const isReference = output.reference ? true : false;

                let datatype;
                let data;
                let format;
                if (isReference) {
                    datatype = 'complex';
                    // @ts-ignore
                    data = output.reference.href || null;
                    // @ts-ignore
                    format = output.reference.mimeType;
                } else {
                    if (output.data && output.data.literalData) {
                        datatype = 'literal';
                        format = output.data.literalData.dataType;
                    }
                    // @ts-ignore
                    else if (output.data.complexData) {
                        datatype = 'complex';
                        // @ts-ignore
                        format = output.data.complexData.mimeType;
                    }
                    else datatype = 'bbox';
                    // @ts-ignore
                    data = this.unmarshalOutputData(output.data);
                }

                out.push({
                    description: {
                        id: output.identifier.value,
                        format: format,
                        reference: isReference,
                        type: datatype
                    },
                    value: data,
                });
            }
        } else if (responseJson.value.statusLocation) { // asynchronous request?
            out.push({
                description: {
                    id: responseJson.value.process.identifier.value,
                    reference: true,
                    type: 'status'
                },
                value: responseJson.value.statusLocation,
            });
        }

        return out;
    }

    protected unmarshalOutputData(data: DataType): any {
        if (data.complexData) {
            switch (data.complexData.mimeType) {
                case 'application/vnd.geo+json':
                case 'application/json':
                    // @ts-ignore
                    return data.complexData.content.map(cont => JSON.parse(cont));
                case 'application/WMS':
                    return data.complexData.content;
                default:
                    throw new Error(`Cannot unmarshal data of format ${data.complexData.mimeType}`);
            }
        } else if (data.literalData) {
            switch (data.literalData.dataType) {
                case 'string':
                default:
                    return data.literalData.value;
            }
        }

        throw new Error(`Not yet implemented: ${data}`);
    }

    marshalExecBody(processId: string, inputs: WpsInput[], outputs: WpsOutputDescription[], async: boolean): IWpsExecuteProcessBody {

        const wps1Inputs = this.marshalInputs(inputs);
        const wps1ResponseForm = this.marshalResponseForm(outputs, async);

        const bodyValue: Execute = {
            dataInputs: wps1Inputs,
            identifier: processId,
            responseForm: wps1ResponseForm,
            service: 'WPS',
            version: '1.0.0'
        };

        const body: IWpsExecuteProcessBody = {
            name: {
                key: '{http://www.opengis.net/wps/1.0.0}Execute',
                localPart: 'Execute',
                namespaceURI: 'http://www.opengis.net/wps/1.0.0',
                prefix: 'wps',
                string: '{http://www.opengis.net/wps/1.0.0}wps:Execute'
            },
            value: bodyValue
        };

        return body;

    }


    protected marshalResponseForm(outputs: WpsOutputDescription[], async = false): ResponseFormType {

        const outputDefinitions: DocumentOutputDefinitionType[] = [];
        for (const output of outputs) {
            let defType: DocumentOutputDefinitionType;
            switch (output.type) {
                case 'literal':
                    defType = {
                        identifier: { value: output.id },
                        asReference: output.reference,
                        mimeType: output.format
                    };
                    break;
                case 'complex':
                    defType = {
                        identifier: { value: output.id },
                        asReference: output.reference,
                        mimeType: output.format
                    };
                    break;
                default:
                    throw new Error(`This Wps-outputtype has not been implemented yet! ${output} `);
            }
            outputDefinitions.push(defType);
        }

        const responseDocument: ResponseDocumentType = {
            output: outputDefinitions,
            status: async ? true : false,
            storeExecuteResponse: async ? true : false
        };

        const form: ResponseFormType = {
            responseDocument
        };
        return form;
    }


    protected marshalInputs(inputArr: WpsInput[]) {

        const theInputs: InputType[] = [];

        for (const inp of inputArr) {

            if (inp.value === null || inp.value === undefined) {
                throw new Error(`Value for input ${inp.description.id} is not set`);
            }

            let data: DataType;
            switch (inp.description.type) {
                case 'literal':
                    data = {
                        literalData: { value: String(inp.value) }
                    };
                    break;
                case 'bbox':
                    data = {
                        boundingBoxData: {
                            lowerCorner: [inp.value[1], inp.value[0]],
                            upperCorner: [inp.value[3], inp.value[2]]
                        }
                    };
                    break;
                case 'complex':
                    data = {
                        complexData: {
                            content: [JSON.stringify(inp.value)],
                            mimeType: inp.description.format
                        }
                    };
                    break;
            }

            theInputs.push({
                identifier: { value: inp.description.id },
                title: { value: inp.description.id },
                _abstract: { value: '' },
                // @ts-ignore
                data: data,
            });
        }
        const inputs: DataInputsType = {
            input: theInputs
        };
        return inputs;
    }
}
