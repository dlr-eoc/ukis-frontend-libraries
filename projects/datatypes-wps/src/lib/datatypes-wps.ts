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
  process: IWpsProcess[]
}

export interface IWpsProcess {
  TYPE_NAME: "wps.ProcessBriefType",
  processVersion: string,
  title: IWpsLanguageString[]
}

export interface IWpsLanguageString {
  TYPE_NAME: "wps.LanguageStringType",
  value: string
}

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
  version: "1.0.0" | "2.0",
  processDescription: IWpsProcessDescription[]
}

export interface IWpsProcessDescription {
  TYPE_NAME: "wps.ProcessDescriptionType",
  processVersion: string,
  dataInputs: IWpsProcessDescriptionDataInputs,
  processOutputs: IWpsProcessDescriptionProcessOutputs,
  title: IWpsLanguageString[]
}

export interface IWpsProcessDescriptionDataInputs {
  TYPE_NAME: "wps.ProcessDescriptionType.DataInputs",
  input: IWpsInputDescription[]
}


export interface IWpsProcessDescriptionProcessOutputs {
  TYPE_NAME: "wps.ProcessDescriptionType.ProcessOutputs",
  output: IWpsOutputDescription[]
}

export interface IWpsInputDescription {}

export interface IWpsOutputDescription {}