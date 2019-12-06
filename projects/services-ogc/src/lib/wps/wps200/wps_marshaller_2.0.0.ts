import { WpsMarshaller, WpsInput, WpsOutputDescription, WpsResult, WpsCapability, WpsDataDescription, WpsData } from '../wps_datatypes';
import { WPSCapabilitiesType, ExecuteRequestType, DataInputType, OutputDefinitionType, IWpsExecuteProcessBody, IWpsExecuteResponse, DataOutputType } from './wps_2.0';
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

    unmarshalExecuteResponse(responseJson: IWpsExecuteResponse, url: string, processId: string): WpsResult[] {
        const out: WpsResult[] = [];

        if (isResult(responseJson.value)) {
            for (const output of responseJson.value.output) {
                const isReference = output.reference ? true : false;

                let datatype;
                let data;
                let format;
                if (isReference) {
                    datatype = 'complex';
                    data = output.reference.href || null;
                    format = output.reference.mimeType;
                }
                // else {
                //     if (output.data && output.data.literalData) {
                //         datatype = 'literal';
                //         format = output.data.literalData.dataType;
                //     } else if (output.data.complexData) {
                //         datatype = 'complex';
                //         format = output.data.complexData.mimeType;
                //     } else {
                //         datatype = 'bbox';
                //     }
                //     data = this.unmarshalOutputData(output.data);
                // }

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
            out.push({
                description: {
                    id: processId,
                    reference: true,
                    type: 'status'
                },
                value: this.getStatusUrl(responseJson, url),
            });
        }

        return out;
    }

    protected unmarshalOutputData(data): any {
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
                transmission: o.reference ? 'reference' : 'value'  // @TODO: maybe just comment out this line?,
            };
        });
    }
}
