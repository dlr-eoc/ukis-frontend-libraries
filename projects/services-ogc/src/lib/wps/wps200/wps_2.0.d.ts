export type BoundingBoxType = any;
export type ExceptionReport = any;


export interface CodeType {
   value: string
}

export interface LanguageStringType {
   value: string
}

export interface AllowedValuesType {
   valueOrRange: ValueType[]
}

export interface ValueType {
   value: string
}


export interface OutputDescriptionType {
   dataDescription: any;
   output: any;
}

export interface DataOutputType {
   id: string;
   data?: Data;
   reference?: ReferenceType;
   output?: DataOutputType;
}

export interface WPSCapabilitiesType_Extension {
   any?: any;
}

export interface Dismiss {
   jobID: any;
}

export interface LiteralDataType {
   literalDataDomain: any;
}

export interface GetCapabilitiesType {
   service: any;
}

export interface Contents {
   processSummary: ProcessSummaryType[];
}

export interface DataInputType {
   id: string;
   /** Raw data. Only use one of the following: data, reference, input. */
   data?: Data;
   /** Data per reference. Only use one of the following: data, reference, input. */
   reference?: ReferenceType;
   /** Nested data. Only use one of the following: data, reference, input. */
   input?: DataInputType;
}

export interface GetResult {
   jobID: any;
}

export interface SupportedCRS {
   value?: string;
   _default?: boolean;
}

export interface LiteralDataDomainType {
   allowedValues: AllowedValuesType;
   anyValue: any;
   valuesReference: any;
   dataType?: any;
   uom?: any;
   defaultValue?: ValueType;
}

export interface DataDescriptionType {
   format: any;
}

export interface StatusInfo {
   jobID: string;
   status: 'Succeeded' | 'Failed' | 'Accepted' | 'Running';
   expirationDate?: string;
   estimatedCompletion?: string;
   nextPoll?: string;
   percentCompleted?: number;
}

export interface DataEncodingAttributes {
   mimeType?: string;
   encoding?: string;
   schema?: string;
}

export interface OutputDefinitionType extends DataEncodingAttributes {
   transmission?: string;
   id: string;
   /** Include only for nested outputs. */
   output?: OutputDefinitionType;
}

export interface LiteralValue {
   dataType?: any;
   uom?: any;
}

export interface RequestBaseType {
   service: string;
   version: string;
   Extension?: any;
}

export interface LiteralDataType_LiteralDataDomain {
   _default?: any;
}

export interface DescribeProcess {
   identifier: any;
   lang?: any;
}

export interface Result {
   output: DataOutputType[];
   jobID?: string;
   expirationDate?: string;
}

export interface GenericInputType {
   input?: any;
   minOccurs?: any;
   maxOccurs?: any;
}

export interface Data extends DataEncodingAttributes {
   otherAttributes?: any;
   content?: any;
}

export interface Format extends DataEncodingAttributes {
   maximumMegabytes?: number;
   _default?: boolean;
}

export interface BoundingBoxData {
   supportedCRS: any;
}

export interface ProcessDescriptionType {
   output: any;
   input?: any;
   lang?: any;
}

export interface InputDescriptionType {
   dataDescription: any;
   input: any;
   minOccurs?: any;
   maxOccurs?: any;
}

export type OutputTransmissionType = 'value' | 'reference';

export interface ProcessSummaryType {
   processVersion?: string;
   jobControlOptions: any[];
   outputTransmission?: OutputTransmissionType[];
   title: LanguageStringType[];
   identifier: CodeType;
   processModel?: any;
}

export interface BodyReferenceType {
   href: string;
}

export interface ProcessOfferings {
   processOffering: any;
}

export interface GenericOutputType {
   output?: any;
}

export interface ComplexDataType {
   any?: any;
}

export interface GenericProcessType {
   output: any;
   input?: any;
}

export interface RequestBodyType {
   body?: any;
   bodyReference?: BodyReferenceType;
}

export interface ReferenceType extends DataEncodingAttributes {
   requestBody?: RequestBodyType;
   href: string;
}

export interface GetStatus {
   jobID: any;
}

export interface ProcessOffering {
   process: ProcessDescriptionType;
   any: any;
   jobControlOptions: any;
   outputTransmission?: any;
   processVersion?: string;
   processModel?: string;
}

export interface DescriptionType {
}

export interface ExecuteRequestType extends RequestBaseType {
   TYPE_NAME: 'WPS_2_0.ExecuteRequestType',
   identifier: CodeType;
   mode: 'sync' | 'async' | 'auto';
   response: 'raw' | 'document';
   input?: DataInputType[];
   output?: OutputDefinitionType[];
}

export interface WPSCapabilitiesType extends RequestBaseType {
   contents: Contents;
   service: 'WPS',
   version: '2.0.0',
   extension?: any;
}

export interface IWpsExecuteProcessBody {
   name: {
      key: '{http://www.opengis.net/wps/2.0}Execute',
      localPart: 'Execute',
      namespaceURI: 'http://www.opengis.net/wps/2.0',
      prefix: 'wps',
      string: '{http://www.opengis.net/wps/2.0}wps:Execute'
   };
   value: ExecuteRequestType
}

export interface IWpsExecuteResponse {
   name: {
      key: '{http://www.opengis.net/wps/2.0}Result',
      localPart: 'Result',
      namespaceURI: 'http://www.opengis.net/wps/2.0',
      prefix: 'wps',
      string: '{http://www.opengis.net/wps/2.0}wps:Result'
   }, 
   value: Result | StatusInfo
}
