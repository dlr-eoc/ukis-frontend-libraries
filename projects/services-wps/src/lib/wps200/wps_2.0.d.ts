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
   data: Data;
   reference: ReferenceType;
   output: DataOutputType;
   id: string;
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
   data: Data;
   reference: ReferenceType;
   input: any;
   id: string;
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
   status: string;
   expirationDate?: string;
   estimatedCompletion?: string;
   nextPoll?: string;
   percentCompleted?: number;
}

export interface OutputDefinitionType {
   id: string;
   output?: OutputDefinitionType;
   transmission?: DataTransmissionModeType;
   mimeType?: string;
   encoding?: string;
   schema?: string;
}

export interface LiteralValue {
   dataType?: any;
   uom?: any;
}

export interface RequestBaseType {
   service: string;
   version: string;
   extension?: any;
}

export interface LiteralDataType_LiteralDataDomain {
   _default?: any;
}

export interface DescribeProcess {
   identifier: any;
   lang?: any;
}

export interface Result {
   output: any;
   jobID?: string;
   expirationDate?: string;
}

export interface GenericInputType {
   input?: any;
   minOccurs?: any;
   maxOccurs?: any;
}

export interface Data {
   otherAttributes?: any;
   content?: any;
   mimeType?: string;
   encoding?: string;
   schema?: string;
}

export interface Format {
   mimeType?: string;
   encoding?: string;
   schema?: string;
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

export type OutputTransmissionType = "value" | "reference";

export interface ProcessSummaryType {
   processVersion?: string;
   jobControlOptions: any[];
   outputTransmission?: OutputTransmissionType[];
   title: LanguageStringType[];
   identifier: CodeType;
   processModel?: any;
}

export interface ReferenceType_BodyReference {
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

export interface ReferenceType {
   body: any;
   bodyReference: ReferenceType_BodyReference;
   href: string;
   mimeType?: string;
   encoding?: string;
   schema?: string;
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

export interface ExecuteRequestType {
   identifier: any;
   output: any;
   mode: any;
   response: any;
   input?: any;
}

export interface WPSCapabilitiesType {
   contents: Contents;
   service: 'WPS',
   version: '2.0.0',
   extension?: any;
}

export interface DataTransmissionModeType {
}

