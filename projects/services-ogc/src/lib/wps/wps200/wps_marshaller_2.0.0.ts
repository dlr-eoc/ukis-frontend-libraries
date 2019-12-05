import { WpsMarshaller, WpsInput, WpsOutputDescription, WpsResult, WpsCapability, WpsDataDescription, WpsData } from '../wps_datatypes';
import { WPSCapabilitiesType, ExecuteRequestType, DataInputType, OutputDefinitionType, IWpsExecuteProcessBody } from './wps_2.0';


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

    unmarshalExecuteResponse(responseJson): WpsResult[] {
        throw new Error('Method not implemented.');
        return [];
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
                MimeType: o.format,
                transmission: o.reference ? 'reference' : 'value'  // @TODO: maybe just comment out this line?,
            };
        });
    }
}
