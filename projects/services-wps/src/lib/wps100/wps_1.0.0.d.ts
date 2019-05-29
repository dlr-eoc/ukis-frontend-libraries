export type ExceptionReport = any;


export interface BoundingBoxType {
   lowerCorner: number[],
   upperCorner: number[],
   crs?: string,
   dimensions?: number,
}

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

export interface DomainMetadataType {
   reference?: string,
   value: LiteralInputType
}

export interface LiteralInputType {
   allowedValues: any;
   anyValue: any;
   valuesReference: any;
   defaultValue?: any;
}

export interface OutputReferenceType {
   href: string;
   mimeType?: string;
   encoding?: string;
   schema?: string;
}

export interface ResponseFormType {
   responseDocument?: ResponseDocumentType;
   rawDataOutput?: OutputDefinitionType;
}

export interface DataType {
   complexData?: ComplexDataType;
   literalData?: LiteralDataType;
   boundingBoxData?: BoundingBoxType;
}

export interface ComplexDataCombinationsType {
   format: any;
}

export interface ResponseDocumentType {
   output: DocumentOutputDefinitionType[];
   storeExecuteResponse?: boolean;
   lineage?: boolean;
   status?: boolean;
}

export interface ProcessDescriptionType_ProcessOutputs {
   output: any;
}

export interface InputReferenceType_Header {
   key: string;
   value: string;
}

export interface ProcessOfferings {
   process: any;
}

export interface SupportedComplexDataInputType {
   maximumMegabytes?: any;
}

export interface SupportedComplexDataType {
   _default: ComplexDataCombinationType;
   supported: ComplexDataCombinationsType;
}

export interface ValuesReferenceType {
   reference?: string;
   valuesForm?: string;
}

export interface ComplexDataType {
   otherAttributes?: any;
   content?: any;
   mimeType?: string;
   encoding?: string;
   schema?: string;
}

export interface ProcessBriefType {
   identifier: CodeType;
   processVersion: any;
   profile?: any;
   wsdl?: any;
}

export interface Languages {
   _default: Languages_Default;
   supported: LanguagesType;
}

export interface ExecuteResponse_ProcessOutputs {
   output: OutputDataType[];
}

export interface DescriptionType {
   identifier: CodeType;
   title: LanguageStringType;
   _abstract?: LanguageStringType;
   metadata?: any;
}

export interface WpsProcessBriefType {
   title: LanguageStringType[],
   identifier: CodeType,
   processVersion?: string,
   metadata?: Object,
   abstract?: Object,
   profile?: Object,
   WSDL?: Object
}

export interface ProcesOfferings {
   process: WpsProcessBriefType[]
}

export interface WPSCapabilitiesType {
   processOfferings: ProcesOfferings;
   languages: any;
   service: any;
   lang: any;
   wsdl?: any;
}

export interface ProcessStartedType {
   value?: string;
   percentCompleted?: number;
}

export interface DescribeProcess {
   identifier: any;
}

export interface OutputDescriptionType {
   complexOutput: any;
   literalOutput: any;
   boundingBoxOutput: any;
}

export interface ProcessDescriptions {
   processDescription: any;
}

export interface InputDescriptionType {
   complexData: any;
   literalData: any;
   boundingBoxData: any;
   minOccurs: any;
   maxOccurs: any;
}

export interface RequestBaseType {
   service: string;
   version: string;
   language?: string;
}

export interface InputReferenceType {
   body: any;
   bodyReference: InputReferenceType_BodyReference;
   href: string;
   header?: any;
   method?: string;
   mimeType?: string;
   encoding?: string;
   schema?: string;
}

export interface LiteralOutputType {
   dataType?: DomainMetadataType;
   uoMs?: SupportedUOMsType;
}

export interface ProcessDescriptionType {
   processOutputs: any;
   dataInputs?: any;
   storeSupported?: any;
   statusSupported?: any;
}

export interface StatusType {
   processAccepted: string;
   processStarted: ProcessStartedType;
   processPaused: ProcessStartedType;
   processSucceeded: string;
   processFailed: ProcessFailedType;
   creationTime: string;
}

export interface UOMsType {
   uom: any;
}

export interface ComplexDataCombinationType {
   format: ComplexDataDescriptionType;
}

export interface CRSsType {
   crs: any;
}

export interface LiteralDataType {
   value?: string;
   dataType?: string;
   uom?: string;
}

export interface Execute {
   identifier: any;
   dataInputs?: DataInputsType;
   responseForm?: any;
   service: "WPS";
   version: "1.0.0";
}

export interface ComplexDataDescriptionType {
   mimeType: string;
   encoding?: string;
   schema?: string;
}

export interface SupportedCRSsType_Default {
   crs: string;
}

export interface ExecuteResponse {
   process: ProcessBriefType;
   status: StatusType;
   serviceInstance: any;
   dataInputs?: any;
   outputDefinitions?: any;
   processOutputs?: ExecuteResponse_ProcessOutputs;
   statusLocation?: any;
}

export interface SupportedUOMsType_Default {
   uom: DomainMetadataType;
}

export interface ProcessFailedType {
   exceptionReport: ExceptionReport;
}

export interface LanguagesType {
   language: any;
}

export interface OutputDefinitionsType {
   output: any;
}

export interface WSDL {
   href: string;
}

export interface SupportedUOMsType {
   _default: SupportedUOMsType_Default;
   supported: UOMsType;
}

export interface InputReferenceType_BodyReference {
   href: string;
}

export interface DataInputsType {
   input: InputType[];
}

export interface SupportedCRSsType {
   _default: SupportedCRSsType_Default;
   supported: CRSsType;
}

export interface Languages_Default {
   language: any;
}

export interface DocumentOutputDefinitionType {
   title?: any;
   _abstract?: any;
   asReference?: boolean;
   identifier: CodeType,
   mimeType?: string,
   encoding?: string,
   schema?: string,
   uom?: string
}

export interface ProcessDescriptionType_DataInputs {
   input: any;
}

export interface OutputDefinitionType {
   identifier: CodeType;
   uom?: string;
   mimeType?: string;
   encoding?: string;
   schema?: string;
}

export interface OutputDataType {
   identifier: CodeType;
   reference?: OutputReferenceType;
   data?: DataType;
}

export interface InputType {
   identifier: CodeType;
   reference?: InputReferenceType;
   data?: DataType;
   title?: LanguageStringType;
   _abstract?: LanguageStringType;
}

export interface ResponseBaseType {
   service: string;
   version: string;
   lang: string;
}

export interface GetCapabilities {
   service: string;
   acceptVersions?: any;
   language?: string;
}


export interface IWpsExecuteProcessBody {
   name: {
      key: "{http://www.opengis.net/wps/1.0.0}Execute",
      localPart: "Execute",
      namespaceURI: "http://www.opengis.net/wps/1.0.0",
      prefix: "wps",
      string: "{http://www.opengis.net/wps/1.0.0}wps:Execute"
   };
   value: Execute
}

export interface IWpsExecuteResponse {
   name: { 
      namespaceURI: 'http://www.opengis.net/wps/1.0.0',
      localPart: 'ExecuteResponse',
      prefix: 'wps',
      key: '{http://www.opengis.net/wps/1.0.0}ExecuteResponse',
      string: '{http://www.opengis.net/wps/1.0.0}wps:ExecuteResponse' 
   },
   value: ExecuteResponse
}


