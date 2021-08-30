import { WpsMarshaller, WpsInput, WpsOutputDescription, WpsResult, WpsCapability, WpsDataDescription,
  WpsData, WpsState, WpsProcessDescription, WpsDataFormat } from '../wps_datatypes';
import { WPSCapabilitiesType, ExecuteRequestType, DataInputType, OutputDefinitionType, IWpsExecuteProcessBody,
  IWpsExecuteResponse, IGetStatusRequest, Data, IGetResultRequest, IDismissRequest, IDismissResponse, ProcessOfferings,
  InputDescriptionType, OutputDescriptionType, LiteralDataType } from './wps_2.0';
import { isStatusInfo, isResult } from './helpers';
import * as xmlserializer from 'xmlserializer';


export class WpsMarshaller200 implements WpsMarshaller {

  constructor() { }

  getCapabilitiesUrl(baseurl: string): string {
    return `${baseurl}?service=WPS&request=GetCapabilities&version=2.0.0`;
  }

  getDescribeProcessUrl(baseurl: string, processId: string): string {
    return `${baseurl}?service=WPS&request=DescribeProcess&version=2.0.0&Identifier=${processId}`;
  }

  unmarshalProcessDescription(processDescriptionJson: ProcessOfferings): WpsProcessDescription {
    const description = processDescriptionJson.processOffering[0];

    const inputs: WpsInput[] = [];
    for (const dataInput of description.process.input) {
      inputs.push({
        description: this.unmarshalInputDescription(dataInput),
        value: null
      });
    }

    const outputs: WpsResult[] = [];
    for (const processOutput of description.process.output) {
      outputs.push({
        description: this.unmarshalOutputDescription(processOutput),
        value: null
      });
    }

    return {
      id: description.process.identifier.value,
      processVersion: description.processVersion || '',
      description: description.process._abstract?.value,
      title: description.process.title?.value || '',
      inputs: inputs,
      outputs: outputs,
    };
  }

  protected unmarshalInputDescription(dataInput: InputDescriptionType): WpsDataDescription {
    if (dataInput.dataDescription.name.localPart === 'BoundingBoxData') {
      return {
        id: dataInput.identifier.value,
        title: dataInput.title.value,
        reference: false,
        type: 'bbox',
        description: dataInput.abstract?.value
      };
    } else if (dataInput.dataDescription.name.localPart === 'LiteralData') {
      return {
        id: dataInput.identifier.value,
        title: dataInput.title.value,
        reference: false,
        type: 'literal',
        defaultValue: (dataInput.dataDescription.value as LiteralDataType).literalDataDomain?.defaultValue?.value,
        options: (dataInput.dataDescription.value as LiteralDataType).literalDataDomain?.allowedValues.valueOrRange.map(v => v.value),
        description: dataInput.abstract?.value
      };
    } else if (dataInput.dataDescription.name.localPart === 'ComplexData') {
      return {
        id: dataInput.identifier.value,
        title: dataInput.title.value,
        reference: true,
        type: 'complex',
        format: dataInput.dataDescription.value.format[0].mimeType as WpsDataFormat,
        description: dataInput.abstract?.value
      };
    } else {
      throw new Error(`Cannot unmarshal input-description ${dataInput.identifier.value}`);
    }
  }

  protected unmarshalOutputDescription(processOutput: OutputDescriptionType): WpsDataDescription {
    if (processOutput.dataDescription.name.localPart === 'BoundingBoxData') {
      return {
        id: processOutput.identifier.value,
        title: processOutput.title.value,
        reference: false,
        type: 'bbox',
        description: processOutput.abstract?.value
      };
    } else if (processOutput.dataDescription.name.localPart === 'LiteralData') {
      return {
        id: processOutput.identifier.value,
        title: processOutput.title.value,
        reference: false,
        type: 'literal',
        description: processOutput.abstract?.value
      };
    } else if (processOutput.dataDescription.name.localPart === 'ComplexData') {
      return {
        id: processOutput.identifier.value,
        title: processOutput.title.value,
        reference: true,
        type: 'complex',
        format: processOutput.dataDescription.value.format[0].mimeType as WpsDataFormat,
        description: processOutput.abstract?.value
      };
    } else {
      throw new Error(`Cannot unmarshal input-description ${processOutput.identifier.value}`);
    }
  }

  executeUrl(baseurl: string, processId: string): string {
    // return `${baseurl}?service=WPS&request=Execute&version=2.0.0&identifier=${processId}`;
    return baseurl;
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

  unmarshalSyncExecuteResponse(responseJson: IWpsExecuteResponse, url: string, processId: string,
                               inputs: WpsInput[], outputDescriptions: WpsOutputDescription[]): WpsResult[] {
    const out: WpsResult[] = [];

    if (isResult(responseJson.value)) {
      for (const output of responseJson.value.output) {
        const outputDescription = outputDescriptions.find(od => od.id === output.id);
        if (!outputDescription) {
          throw new Error(`Could not find an output-description for the parameter ${output.id}.`);
        }

        const isReference = outputDescription.reference;
        const datatype = outputDescription.type;
        const format = outputDescription.format;
        let data;
        if (output.reference) {
          data = output.reference.href || null;
        } else if (output.data) {
          data = this.unmarshalOutputData(output.data, outputDescription);
        } else {
          throw new Error(`Output has neither reference nor data field.`);
        }

        out.push({
          description: {
            id: output.id,
            title: outputDescription.title,
            format,
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
          title: '',
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

      if (data.encoding === 'base64') {
        if (typeof module !== 'undefined' && module.exports) { // node
          data.content.map(c => Buffer.from(c, 'base64').toString('ascii'));
        } else { // browser
          data.content.map((c: any) => atob(c));
        }
      }

      switch (data.mimeType) {
        case 'application/vnd.geo+json':
        case 'application/json':
          return data.content.map((cont: any) => JSON.parse(cont));
        case 'application/WMS':
          return data.content;
        case 'text/xml':
        case 'application/xml':
          return xmlserializer.serializeToString(data.content[0]); // @TODO: better: handle actual xml-data
        default:
          throw new Error(`Cannot unmarshal complex data of format ${data.mimeType}`);
      }
    } else if (description.type === 'literal') {
      return data.content;
    }

    throw new Error(`Not yet implemented: ${data}`);
  }

  unmarshalAsyncExecuteResponse(responseJson: any, url: string, processId: string, inputs: WpsData[], outputDescriptions: WpsDataDescription[]): WpsState {
    return this.unmarshalGetStateResponse(responseJson, url, processId, inputs, outputDescriptions);
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
            schema: i.description.schema,
            encoding: i.description.encoding || "UTF-8"
          }
        };
      } else {
        return {
          id: i.description.id,
          data: {
            content: this.marshalInput(i),
            mimeType: i.description.format,
            // schema: i.description.schema,
            // encoding: i.description.encoding || "UTF-8"
          }
        };
      }
    });
  }

  private marshalInput(i: WpsData): any {
    if (i.description.type === 'literal') {
      return [i.value];
    } else {
      return [JSON.stringify(i.value)];
    }
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
        jobID
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
