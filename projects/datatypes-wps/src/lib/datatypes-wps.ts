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

export interface IWpsCapabilitesValue {
  service: "WPS",
  serviceIdentification: Object,
  serviceProvider: Object,
  version: "1.0.0" | "2.0",
  processOfferings: IWpsProcesOfferings
}

export interface IWpsProcesOfferings {
  TYPE_NAME: "wps.ProcessOfferings",
  process: IWpsProcessBrief[]
}

export interface IWpsProcessBrief {
  TYPE_NAME: "wps.ProcessBriefType",
  processVersion: string,
  title: IWpsLanguageString[]
}

export interface IWpsLanguageString {
  TYPE_NAME: "wps.LanguageStringType",
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
  TYPE_NAME: "wps.ProcessDescriptions",
  service: "WPS",
  version: string,
  processDescription: IWpsProcessDescription[]
}

export interface IWpsProcessDescription {
  TYPE_NAME: "wps.ProcessDescriptionType",
  processVersion: string,
  statusSupported: boolean,
  storeSupported: boolean,
  identifier: IWpsCode,
  dataInputs: IWpsProcessDescriptionDataInputs,
  processOutputs: IWpsProcessDescriptionProcessOutputs,
  title: IWpsLanguageString[]
}

export interface IWpsProcessDescriptionDataInputs {
  TYPE_NAME: "wps.ProcessDescriptionType.DataInputs",
  input: IWpsInputDescription[]
}

export interface IWpsInputDescription {
    TYPE_NAME: "wps.InputDescriptionType",
    complexData: IWpsSupportedComplexDataInput
    maxOccurs: number,
    minOccurs: 0,
    title: IWpsLanguageString[]
}

export interface IWpsSupportedComplexDataInput {
    TYPE_NAME: "wps.SupportedComplexDataInputType", 
    supported: IWpsComplexDataCombinations,
    _default: IWpsComplexDataCombination
}

export interface IWpsComplexDataCombinations {
    TYPE_NAME: "wps.ComplexDataCombinationsType",
    format: IWpsomplexDataDescription[]
}

export interface IWpsComplexDataCombination {
    TYPE_NAME: "wps.ComplexDataCombinationType",
    format: IWpsomplexDataDescription
}


export interface IWpsomplexDataDescription {
    TYPE_NAME: "wps.ComplexDataDescriptionType"
    encoding: string
    mimeType: string
    schema: string
}

export interface IWpsProcessDescriptionProcessOutputs {
  TYPE_NAME: "wps.ProcessDescriptionType.ProcessOutputs",
  output: IWpsOutputDescription[],
  processVersion: string
  statusSupported: boolean
  storeSupported: boolean
  title: IWpsLanguageString[]
}

export interface IWpsOutputDescription {
    TYPE_NAME: "wps.OutputDescriptionType",
    complexOutput: IWpsSupportedComplexData,
    title: IWpsLanguageString[]
}

export interface IWpsSupportedComplexData {
    TYPE_NAME: "wps.SupportedComplexDataType",
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
  TYPE_NAME: "wps.Execute",
  dataInputs: IWpsDataInputs,
  identifier: IWpsCode,
  responseForm: IWpsResponseForm,
  service: "WPS",
  version: "1.0.0"
}

export interface IWpsDataInputs {
  TYPE_NAME: "wps.DataInputsType",
  input: IWpsInput[]
}

export interface IWpsInput {
  TYPE_NAME: "wps.InputType",
  title?: IWpsLanguageString,
  data?: IWpsData,
  identifier: IWpsCode
}

export interface IWpsData {
    TYPE_NAME: "wps.DataType"
    complexData: IWpsComplexData
}


export interface IWpsComplexData {
    TYPE_NAME: "wps.ComplexDataType"
    content: any
    mimeType: string
    otherAttributes: Object
}

export interface IWpsCode {
    TYPE_NAME: "wps.CodeType"
    value: string
}

export interface IWpsResponseForm {
    TYPE_NAME: "wps.ResponseFormType",
    rawDataOutput?: IWpsOutputDefinition,
    responseDocument?: IWpsResponseDocument
}

export interface IWpsResponseFormRaw extends IWpsResponseForm {
    TYPE_NAME: "wps.ResponseFormType",
    rawDataOutput: IWpsOutputDefinition
}

export interface IWpsResponseFormDoc extends IWpsResponseForm {
    TYPE_NAME: "wps.ResponseFormType",
    responseDocument: IWpsResponseDocument
}

export interface IWpsOutputDefinition {
    TYPE_NAME: "wps.OutputDefinitionType",
    identifier: IWpsCode,
    mimeType: string
}

export interface IWpsResponseDocument {
  TYPE_NAME: "wps.ResponseDocumentType",
  lineage: boolean,
  status: boolean,
  storeExecuteResponse: boolean,
  output: IWpsDocumentOutputDefinition[]
}

export interface IWpsDocumentOutputDefinition {
  TYPE_NAME: "wps.DocumentOutputDefinitionType",
  asReference: boolean,
  identifier: IWpsCode,
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
  TYPE_NAME: "wps.ExecuteResponse",
  lang: string,
  service: "WPS",
  version: "1.0.0",
  process: IWpsProcessBrief,
  serviceInstance: string
  status: IWpsStatus,  
  statusLocation: string
 }

export interface IWpsStatus {
  TYPE_NAME: "wps.StatusType",
  creationTime: IWpsTime,
  processAccepted?: string
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