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
  title: IWpsLanguageString[],
  identifier: IOwsCode,
  processVersion?: string,
  metadata?: Object,
  abstract?: Object,
  profile?: Object,
  WSDL?: Object
}

export interface IWpsLanguageString {
  TYPE_NAME: "WPS_1_0_0.LanguageStringType",
  value: string
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
  title: IWpsLanguageString[]
}

export interface IWpsProcessDescriptionDataInputs {
  TYPE_NAME: "WPS_1_0_0.ProcessDescriptionType.DataInputs",
  input: IWpsInputDescription[]
}

export interface IWpsInputDescription {
    TYPE_NAME: "WPS_1_0_0.InputDescriptionType",
    complexData: IWpsSupportedComplexDataInput
    maxOccurs: number,
    minOccurs: 0,
    title: IWpsLanguageString[]
}

export interface IWpsSupportedComplexDataInput {
    TYPE_NAME: "WPS_1_0_0.SupportedComplexDataInputType", 
    supported: IWpsComplexDataCombinations,
    _default: IWpsComplexDataCombination
}

export interface IWpsComplexDataCombinations {
    TYPE_NAME: "WPS_1_0_0.ComplexDataCombinationsType",
    format: IWpsomplexDataDescription[]
}

export interface IWpsComplexDataCombination {
    TYPE_NAME: "WPS_1_0_0.ComplexDataCombinationType",
    format: IWpsomplexDataDescription
}


export interface IWpsomplexDataDescription {
    TYPE_NAME: "WPS_1_0_0.ComplexDataDescriptionType"
    encoding: string
    mimeType: string
    schema: string
}

export interface IWpsProcessDescriptionProcessOutputs {
  TYPE_NAME: "WPS_1_0_0.ProcessDescriptionType.ProcessOutputs",
  output: IWpsOutputDescription[],
  processVersion: string
  statusSupported: boolean
  storeSupported: boolean
  title: IWpsLanguageString[]
}

export interface IWpsOutputDescription {
    TYPE_NAME: "WPS_1_0_0.OutputDescriptionType",
    complexOutput: IWpsSupportedComplexData,
    title: IWpsLanguageString[]
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

export interface IWpsInput {
  TYPE_NAME: "WPS_1_0_0.InputType",
  title?: IWpsLanguageString,
  data?: IWpsData,
  identifier: IOwsCode
}

export interface IWpsData {
    TYPE_NAME: "WPS_1_0_0.DataType",
    complexData?: IWpsComplexData,
    literalData?: IWpsLiteralData
}

export type TWpsLiteralDataType = "double" | "string";

export interface IWpsLiteralData {
  TYPE_NAME: "WPS_1_0_0.LiteralDataType",
  dataType: TWpsLiteralDataType,
  defaultValue?: any
}

export interface IWpsComplexData {
    TYPE_NAME: "WPS_1_0_0.ComplexDataType",
    content: any,
    mimeType: string,
    otherAttributes: Object
}

export interface IOwsCode {
    TYPE_NAME: "OWS_1_1_0.CodeType"
    value: string
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
  lineage: boolean,
  status: boolean,
  storeExecuteResponse: boolean,
  output: IWpsDocumentOutputDefinition[]
}

export interface IWpsDocumentOutputDefinition {
  TYPE_NAME: "WPS_1_0_0.DocumentOutputDefinitionType",
  asReference: boolean,
  identifier: IOwsCode,
  mimeType: string
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
  data: IWpsData,
  title: IWpsLanguageString[]
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