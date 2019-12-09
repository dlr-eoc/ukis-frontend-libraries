import { WpsMarshaller, WpsInput, WpsOutputDescription, WpsResult, WpsCapability, WpsDataDescription, WpsData, WpsState } from '../wps_datatypes';
import { WPSCapabilitiesType, ExecuteRequestType, DataInputType, OutputDefinitionType, IWpsExecuteProcessBody, IWpsExecuteResponse, DataOutputType, IGetStatusRequest, Data, IGetResultRequest, IDismissRequest, IDismissResponse } from './wps_2.0';
import { isDataOutputType, isStatusInfo, isResult } from './helpers';


export class WpsMarshaller200 implements WpsMarshaller {

    constructor() {}

    getCapabilitiesUrl(baseurl: string): string {
        return `${baseurl}?service=WPS&request=GetCapabilities&version=2.0.0`;
    }

    executeUrl(baseurl: string, processId: string): string {
        return `${baseurl}?service=WPS&request=Execute&version=2.0.0&identifier=${processId}`;
    }

    unmarshalCapabilities(capabilities: WPSCapabilitiesType): WpsCapability[] {
        const out: WpsCapability[] = [];
        capabilities.contents.processSummary.forEach(summary => {
            out.push({
                id: summary.identifier.value
            });
        });
        return out;
    }

    unmarshalExecuteResponse(responseJson: IWpsExecuteResponse, url: string, processId: string,
        inputs: WpsInput[], outputDescriptions: WpsOutputDescription[]): WpsResult[] {
        const out: WpsResult[] = [];

        if (isResult(responseJson.value)) {
            for (const output of responseJson.value.output) {
                const outputDescription = outputDescriptions.find(od => od.id === output.id);

                const isReference = outputDescription.reference;
                const datatype = outputDescription.type;
                const format = outputDescription.format;
                let data;
                if (isReference) {
                    data = output.reference.href || null;
                } else {
                    data = this.unmarshalOutputData(output.data, outputDescription);
                }

                out.push({
                    description: {
                        id: output.id,
                        format: format,
                        reference: isReference,
                        type: datatype
                    },
                    value: data,
                });
            }
        } else if (isStatusInfo(responseJson.value)) {
            const state: WpsState = {
                status: responseJson.value.status,
                jobID: responseJson.value.jobID,
                percentCompleted: responseJson.value.percentCompleted
            };

            out.push({
                description: {
                    id: processId,
                    reference: true,
                    type: 'status'
                },
                value: state
            });
        }

        return out;
    }

    protected unmarshalOutputData(data: Data, description: WpsOutputDescription): any {
        if (description.type === 'complex') {
            switch (data.mimeType) {
                case 'application/vnd.geo+json':
                case 'application/json':
                    return data.content.map(cont => JSON.parse(cont));
                case 'application/WMS':
                    return data.content;
                case 'text/xml':
                    return new XMLSerializer().serializeToString(data.content[0]); // @TODO: better: handle actual xml-data
                default:
                    throw new Error(`Cannot unmarshal complex data of format ${data.mimeType}`);
            }
        } else if (description.type === 'literal') {
            return data.content;
        }

        throw new Error(`Not yet implemented: ${data}`);
    }

    unmarshalGetStateResponse(responseJson: any, serverUrl: string, processId: string,
        inputs: WpsData[], outputDescriptions: WpsDataDescription[]): WpsState {
        if (isStatusInfo(responseJson.value)) {
            const state: WpsState = {
                status: responseJson.value.status,
                jobID: responseJson.value.jobID,
                percentCompleted: responseJson.value.percentCompleted
            };
            return state;
        } else {
            throw new Error(`Not a status-info: ${responseJson}`);
        }
    }

    marshalExecBody(processId: string, inputs: WpsInput[], outputs: WpsOutputDescription[], async: boolean) {
        const inputsMarshalled = this.marshalInputs(inputs);
        const outputsMarshalled = this.marshalOutputs(outputs);

        const bodyValue: ExecuteRequestType = {
            TYPE_NAME: 'WPS_2_0.ExecuteRequestType',
            service: 'WPS',
            version: '2.0.0',
            identifier: { value: processId },
            input: inputsMarshalled,
            output: outputsMarshalled,
            mode: async ? 'async' : 'sync',
            response: 'document'
        };

        const body: IWpsExecuteProcessBody = {
            name: {
                key: '{http://www.opengis.net/wps/2.0}Execute',
                localPart: 'Execute',
                namespaceURI: 'http://www.opengis.net/wps/2.0',
                prefix: 'wps',
                string: '{http://www.opengis.net/wps/2.0}wps:Execute'
            },
            value: bodyValue
        };

        return body;
    }

    private marshalInputs(inputs: WpsData[]): DataInputType[] {
        return inputs.map(i => {
            if (i.description.reference) {
                return {
                    id: i.description.id,
                    reference: {
                        href: i.value,
                        mimeType: i.description.format,
                    }
                };
            } else {
                return {
                    id: i.description.id,
                    data: {
                        content: [JSON.stringify(i.value)],
                        mimeType: i.description.format
                    }
                };
            }
        });
    }

    private marshalOutputs(outputs: WpsDataDescription[]): OutputDefinitionType[] {
        return outputs.map(o => {
            return {
                id: o.id,
                mimeType: o.format,
                transmission: o.reference ? 'reference' : 'value'  // @TODO: maybe just comment out this line?
            };
        });
    }

    marshallGetStatusBody(serverUrl: string, processId: string, statusId: string) {
        const request: IGetStatusRequest = {
            name: {
                key: '{http://www.opengis.net/wps/2.0}GetStatus',
                localPart: 'GetStatus',
                namespaceURI: 'http://www.opengis.net/wps/2.0',
                prefix: 'wps',
                string: '{http://www.opengis.net/wps/2.0}wps:GetStatus'
             },
             value: {
                 jobID: statusId,
                 service: 'WPS',
                 version: '2.0.0'
             }
        };
        return request;
    }

    marshallGetResultBody(serverUrl: string, processId: string, jobID: string) {
        const request: IGetResultRequest = {
            name: {
                key: '{http://www.opengis.net/wps/2.0}GetResult',
                localPart: 'GetResult',
                namespaceURI: 'http://www.opengis.net/wps/2.0',
                prefix: 'wps',
                string: '{http://www.opengis.net/wps/2.0}wps:GetResult'
            },
            value: {
                service: 'WPS',
                version: '2.0.0',
                jobID: jobID
            }
        };
        return request;
    }

    dismissUrl(serverUrl: string, processId: string, jobId: string): string {
        return serverUrl;
    }

    marshalDismissBody(jobId: string) {
        const body: IDismissRequest = {
            name: {
                key: '{http://www.opengis.net/wps/2.0}Dismiss',
                localPart: 'Dismiss',
                namespaceURI: 'http://www.opengis.net/wps/2.0',
                prefix: 'wps',
                string: '{http://www.opengis.net/wps/2.0}wps:Dismiss'
             },
             value: {
                 jobID: jobId,
                 service: 'WPS',
                 version: '2.0.0'
             }
        };
        return body;
    }

    unmarshalDismissResponse(jsonResponse: IDismissResponse, serverUrl: string, processId: string): WpsState {
        const state: WpsState = {
            status: jsonResponse.value.status,
            jobID: jsonResponse.value.jobID
        };
        return state;
    }
}
