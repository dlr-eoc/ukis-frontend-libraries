import { WpsMarshaller, WpsInput, WpsOutputDescription, WpsResult, WpsCapability, WpsBboxValue, WpsData, WpsDataDescription, WpsState } from '../wps_datatypes';
import {
    WPSCapabilitiesType, IWpsExecuteProcessBody, Execute, DataInputsType,
    InputType, ResponseFormType, DataType, IWpsExecuteResponse, DocumentOutputDefinitionType,
    ResponseDocumentType, InputReferenceType, LiteralDataType, ExecuteResponse
} from './wps_1.0.0';



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

    unmarshalExecuteResponse(responseJson: IWpsExecuteResponse, url: string, processId: string,
        inputs: WpsInput[], outputDescriptions: WpsOutputDescription[]): WpsResult[] {

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
                value: this.unmarshalGetStateResponse(responseJson, url, processId, inputs, outputDescriptions)
            });
        }

        return out;
    }

    protected unmarshalOutputData(data: DataType): any {
        if (data.complexData) {
            switch (data.complexData.mimeType) {
                case 'application/vnd.geo+json':
                case 'application/json':
                    return data.complexData.content.map(cont => JSON.parse(cont));
                case 'application/WMS':
                    return data.complexData.content;
                case 'text/xml':
                    return new XMLSerializer().serializeToString(data.complexData.content[0]); // @TODO: better: handle actual xml-data
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

    unmarshalGetStateResponse(responseJson: any, serverUrl: string, processId: string,
        inputs: WpsData[], outputDescriptions: WpsDataDescription[]): WpsData[] | WpsState {

        const response: ExecuteResponse = responseJson.value;

        if (response.processOutputs && response.processOutputs.output) {
            return this.unmarshalExecuteResponse(responseJson, serverUrl, processId, inputs, outputDescriptions);
        }

        const status = response.status.processSucceeded ? 'Succeeded' :
                        response.status.processAccepted ? 'Accepted' :
                        response.status.processStarted ? 'Running' :
                        response.status.processFailed ? 'Failed' :
                        'Failed';

        const state: WpsState = {
            status: status,
            statusLocation: response.statusLocation
        };

        return state;
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


    protected marshalInputs(inputArr: WpsInput[]): DataInputsType {
        const theInputs: InputType[] = [];
        for (const inp of inputArr) {
            if (inp.value === null || inp.value === undefined) {
                throw new Error(`Value for input ${inp.description.id} is not set`);
            }
            const marshalledInput = this.marshalInput(inp);
            theInputs.push(marshalledInput);
        }
        const inputs: DataInputsType = {
            input: theInputs
        };
        return inputs;
    }

    protected marshalInput(input: WpsInput): InputType {
        const id = input.description.id;
        const title = input.description.id;
        const abstract = '';

        const inputType: InputType = {
            identifier: { value: id },
            title: { value: title },
            _abstract: { value: abstract }
        };

        if (input.description.reference) {
            inputType.reference = this.marshalReferenceInput(input);
        } else {
            inputType.data = this.marshalDataInput(input);
        }

        return inputType;
    }

    protected marshalDataInput(input: WpsInput): DataType {
        let data: DataType;
        switch (input.description.type) {
            case 'literal':
                data = {
                    literalData: { value: String(input.value) }
                };
                break;
            case 'bbox':
                const values: WpsBboxValue = input.value;
                data = {
                    boundingBoxData: {
                        lowerCorner: [values.lllat, values.lllon],
                        upperCorner: [values.urlat, values.urlon]
                    }
                };
                break;
            case 'complex':
                switch (input.description.format) {
                    case 'text/xml':
                        data = {
                            complexData: {
                                content: [input.value],  // @TODO: we assume here that text/xml-data is already stringified
                                mimeType: input.description.format
                            }
                        };
                        break;
                    default:
                        data = {
                            complexData: {
                                content: [JSON.stringify(input.value)],
                                mimeType: input.description.format
                            }
                        };
                }
                break;
        }
        return data;
    }

    protected marshalReferenceInput(input: WpsInput): InputReferenceType {
        const ref: InputReferenceType = {
            href: input.value,
            method: 'GET',
            mimeType: input.description.format
        };
        return ref;
    }

    marshallGetStatusBody(serverUrl: string, processId: string, statusId: string) {
        // WPS-1.0 does not send a body with a GetStatus request.
        return {};
    }

    marshallGetResultBody(serverUrl: string, processId: string, jobID: string) {
        // WPS-1.0 does not send a body with a GetStatus request.
        return {};
    }

    dismissUrl(serverUrl: string, processId: string, jobId: string): string {
        /** this does only work in geoserver:
        return `${serverUrl}?service=WPS&version=1.0.0&request=Dismiss&executionId=${jobId}`; */
        throw new Error('Wps 1.0 does not support Dismiss-operations.');
    }

    marshalDismissBody(processId: string) {
        throw new Error('Wps 1.0 does not support Dismiss-operations.');
    }

    unmarshalDismissResponse(jsonResponse: any, serverUrl: string, processId: string): WpsState {
        throw new Error('Wps 1.0 does not support Dismiss-operations.');
    }
}
