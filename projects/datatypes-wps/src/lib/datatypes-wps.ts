export type TMimeType = "application/vnd.geo+json" |  "text/xml" | "application/WMS" | "image/tiff";


/****************************************************************************
 *              OWS
 ****************************************************************************/

export interface IOwsCode {
  TYPE_NAME: "OWS_1_1_0.CodeType"
  value: string
}

export interface IOwsLanguageString {
  TYPE_NAME: "OWS_1_1_0.LanguageStringType",
  value: string
}

export interface IOwsAllowedValues {
  TYPE_NAME: "OWS_1_1_0.AllowedValues",
  valueOrRange: IOwsValue[]
}

export interface IOwsValue {
  TYPE_NAME: "OWS_1_1_0.ValueType", 
  value: string
}

export interface IOwsAnyValue {
  TYPE_NAME: "OWS_1_1_0.AnyValue"
}

export interface IOwsDomainMetadata {
  TYPE_NAME: "OWS_1_1_0.DomainMetadataType",
  reference?: string,
  value: TWpsLiteralDataType
}

/****************************************************************************
 *              CAPABILITES
 ****************************************************************************/

export interface IWpsCapabilities {
    name: IWpsCapabilitiesName,
    value: IWpsCapabilitesValue
}

export interface IWpsCapabilitiesName {
  key: "{http://www.opengis.net/wps/1.0.0}Capabilities"
  localPart: "Capabilities",
  namespaceURI: "http://www.opengis.net/wps/1.0.0",
  prefix: "wps",
  string: "{http://www.opengis.net/wps/1.0.0}wps:Capabilities"
}


/**
 * TODO: 
 *  - languages
 *  - operations-Metadata
 *  - serviceIdentification
 *  - serviceProvider
 */
export interface IWpsCapabilitesValue {
  TYPE_NAME: "WPS_1_0_0.WPSCapabilitiesType",
  service: "WPS",
  serviceIdentification: Object,
  serviceProvider: Object,
  version: "1.0.0" | "2.0",
  processOfferings: IWpsProcesOfferings
}

export interface IWpsProcesOfferings {
  TYPE_NAME: "WPS_1_0_0.ProcessOfferings",
  process: IWpsProcessBrief[]
}

/**
 * TODO: 
 *  - metatdata
 *  - abstract
 *  - profile
 *  - WSDL
 */
export interface IWpsProcessBrief {
  TYPE_NAME: "WPS_1_0_0.ProcessBriefType",
  title: IOwsLanguageString[],
  identifier: IOwsCode,
  processVersion?: string,
  metadata?: Object,
  abstract?: Object,
  profile?: Object,
  WSDL?: Object
}



/****************************************************************************
 *              PROCESS DESCRIPTION
 ****************************************************************************/



export interface IWpsProcessDescriptions {
  name: IWpsProcessDescriptionsName,
  value: IWpsProcessDescriptionsValue
}

export interface IWpsProcessDescriptionsName {
  key: "{http://www.opengis.net/wps/1.0.0}ProcessDescriptions",
  localPart: "ProcessDescriptions",
  namespaceURI: "http://www.opengis.net/wps/1.0.0",
  prefix: "wps",
  string: "{http://www.opengis.net/wps/1.0.0}wps:ProcessDescriptions"
}

export interface IWpsProcessDescriptionsValue {
  TYPE_NAME: "WPS_1_0_0.ProcessDescriptions",
  service: "WPS",
  version: string,
  processDescription: IWpsProcessDescription[]
}

export interface IWpsProcessDescription {
  TYPE_NAME: "WPS_1_0_0.ProcessDescriptionType",
  processVersion: string,
  statusSupported: boolean,
  storeSupported: boolean,
  identifier: IOwsCode,
  dataInputs: IWpsProcessDescriptionDataInputs,
  processOutputs: IWpsProcessDescriptionProcessOutputs,
  title: IOwsLanguageString[]
}

export interface IWpsProcessDescriptionDataInputs {
  TYPE_NAME: "WPS_1_0_0.ProcessDescriptionType.DataInputs",
  input: IWpsInputDescription[]
}

/**
 * TODO: 
 *  - Bounding box
 */
export interface IWpsInputDescription {
    TYPE_NAME: "WPS_1_0_0.InputDescriptionType",
    identifier: IOwsCode,
    title: IOwsLanguageString,
    maxOccurs: number,
    minOccurs: number,
    complexData?: IWpsSupportedComplexDataInput,
    literalData?: IWpsLiteralInput,
    boundingBoxData?: any
}

export interface IWpsLiteralInputDescription extends IWpsInputDescription {
  literalData: IWpsLiteralInput
}

export interface IWpsComplexInputDescription extends IWpsInputDescription {
  complexData: IWpsSupportedComplexDataInput
}

/**
 * TODO: 
 *  - ValuesRefernce
 */
export interface IWpsLiteralInput {
  TYPE_NAME: "WPS_1_0_0.LiteralInputType",
  anyValue?: IOwsAnyValue,
  dataType?: IOwsDomainMetadata,
  defaultValue?: any,
  ValuesReference?: Object,
  allowedValues?: IOwsAllowedValues
}


export interface IWpsSupportedComplexDataInput {
    TYPE_NAME: "WPS_1_0_0.SupportedComplexDataInputType", 
    supported: IWpsComplexDataCombinations,
    _default: IWpsComplexDataCombination
}

export interface IWpsComplexDataCombinations {
    TYPE_NAME: "WPS_1_0_0.ComplexDataCombinationsType",
    format: IWpsComplexDataDescription[]
}

export interface IWpsComplexDataCombination {
    TYPE_NAME: "WPS_1_0_0.ComplexDataCombinationType",
    format: IWpsComplexDataDescription
}


export interface IWpsComplexDataDescription {
    TYPE_NAME: "WPS_1_0_0.ComplexDataDescriptionType"
    mimeType: TMimeType,
    encoding?: string,
    schema?: string
}

export interface IWpsProcessDescriptionProcessOutputs {
  TYPE_NAME: "WPS_1_0_0.ProcessDescriptionType.ProcessOutputs",
  output: IWpsOutputDescription[]
}

/**
 * TODO: 
 *  - literalOutput
 *  - boundingBoxOutput
 */
export interface IWpsOutputDescription {
    TYPE_NAME: "WPS_1_0_0.OutputDescriptionType",
    complexOutput?: IWpsSupportedComplexData,
    LiteralOutput?: Object,
    BoundingBoxOutput?: Object
    identifier: IOwsCode,
    title: IOwsLanguageString[]
}

export interface IWpsSupportedComplexData {
    TYPE_NAME: "WPS_1_0_0.SupportedComplexDataType",
    supported: IWpsComplexDataCombinations,
    _default: IWpsComplexDataCombination
}


/****************************************************************************
 *              EXECUTE
 ****************************************************************************/



export interface IWpsExecuteProcessBody {
    name: IWpsExecuteProcessBodyName,
    value: IWpsExecuteProcessBodyValue
}

export interface IWpsExecuteProcessBodyName {
  key: "{http://www.opengis.net/wps/1.0.0}Execute",
  localPart: "Execute",
  namespaceURI: "http://www.opengis.net/wps/1.0.0",
  prefix: "wps",
  string: "{http://www.opengis.net/wps/1.0.0}wps:Execute"
}

export interface IWpsExecuteProcessBodyValue {
  TYPE_NAME: "WPS_1_0_0.Execute",
  dataInputs: IWpsDataInputs,
  identifier: IOwsCode,
  responseForm: IWpsResponseForm,
  service: "WPS",
  version: "1.0.0"
}

export interface IWpsDataInputs {
  TYPE_NAME: "WPS_1_0_0.DataInputsType",
  input: IWpsInput[]
}

/**
 * TODO: 
 *  - wird die InputDataFormChoice noch verwendet?
 */
export interface IWpsInput {
  TYPE_NAME: "WPS_1_0_0.InputType",
  identifier: IOwsCode,
  title?: IOwsLanguageString,
  //InputDataFormChoice: IWpsData
  reference?: IWpsInputReference
  data?: IWpsData
}

export interface IWpsInputDataFormChoice {
  TYPE_NAME: "WPS_1_0_0.InputDataFormChoice",
  reference?: IWpsInputReference
  data?: IWpsData
}

/**
 * TODO: 
 *  - header
 *  - body
 */
export interface IWpsInputReference {
  TYPE_NAME: "WPS_1_0_0.InputReferenceType",
  href: string,
  method?: "GET" | "POST",
  header?: any,
  body?: any,
  mimeType?: TMimeType,
  encoding?: string,
  schema?: string,
}

/**
 * TODO: 
 *  - bounding box data
 */
export interface IWpsData {
    TYPE_NAME: "WPS_1_0_0.DataType",
    complexData?: IWpsComplexData,
    literalData?: IWpsLiteralData, 
    boundingBoxData? : any
}

export type TWpsLiteralDataType = "xs:double" | "xs:string";

export interface IWpsLiteralData {
  TYPE_NAME: "WPS_1_0_0.LiteralDataType",
  dataType: TWpsLiteralDataType,
  value: string,
  defaultValue?: any
}

export interface IWpsComplexData {
    TYPE_NAME: "WPS_1_0_0.ComplexDataType",
    content: any,
    mimeType: TMimeType,
    otherAttributes?: any
}

export interface IWpsResponseForm {
    TYPE_NAME: "WPS_1_0_0.ResponseFormType",
    rawDataOutput?: IWpsOutputDefinition,
    responseDocument?: IWpsResponseDocument
}

export interface IWpsResponseFormRaw extends IWpsResponseForm {
    TYPE_NAME: "WPS_1_0_0.ResponseFormType",
    rawDataOutput: IWpsOutputDefinition
}

export interface IWpsResponseFormDoc extends IWpsResponseForm {
    TYPE_NAME: "WPS_1_0_0.ResponseFormType",
    responseDocument: IWpsResponseDocument
}

export interface IWpsOutputDefinition {
    TYPE_NAME: "WPS_1_0_0.OutputDefinitionType",
    identifier: IOwsCode,
    mimeType: string
}

export interface IWpsResponseDocument {
  TYPE_NAME: "WPS_1_0_0.ResponseDocumentType",
  output: IWpsDocumentOutputDefinition[]
  lineage?: boolean,
  status?: boolean,
  storeExecuteResponse?: boolean,
}

export interface IWpsDocumentOutputDefinition {
  TYPE_NAME: "WPS_1_0_0.DocumentOutputDefinitionType",
  identifier: IOwsCode,
  asReference: boolean,
  mimeType?: string,
  encoding?: string,
  schema?: string,
  uom?: string
}

/****************************************************************************
 *              EXECUTE RESPONSE
 ****************************************************************************/


 export interface IWpsExecuteResponse {
   name: IWpsExecuteResponseName,
   value: IWpsExecuteResponseValue
 }

 export interface IWpsExecuteResponseName {
  key: "{http://www.opengis.net/wps/1.0.0}ExecuteResponse"
  localPart: "ExecuteResponse"
  namespaceURI: "http://www.opengis.net/wps/1.0.0"
  prefix: "wps"
  string: "{http://www.opengis.net/wps/1.0.0}wps:ExecuteResponse"
 }

 export interface IWpsExecuteResponseValue {
  TYPE_NAME: "WPS_1_0_0.ExecuteResponse",
  lang: string,
  service: "WPS",
  version: "1.0.0",
  process: IWpsProcessBrief,
  processOutputs: IWpsExecuteResponseProcessOutputs,
  serviceInstance: string,
  status: IWpsStatus,  
  statusLocation: string
 }

export interface IWpsExecuteResponseProcessOutputs {
  TYPE_NAME: "WPS_1_0_0.ExecuteResponse.ProcessOutputs",
  output: IWpsOutputData[]
}

export interface IWpsOutputData {
  TYPE_NAME: "WPS_1_0_0.OutputDataType",
  title: IOwsLanguageString[],
  identifier: IOwsCode,
  data: IWpsData
}

export interface IWpsStatus {
  TYPE_NAME: "WPS_1_0_0.StatusType",
  creationTime: IWpsTime,
  processAccepted?: string,
  processSucceeded?: string
}

export interface IWpsTime {
  fractionalSecond: number,
  second: number,
  minute: number,
  hour: number,
  day: number,
  month: number,
  year: number,
  timezone: number
}