import * as Primitive from '../../xml-primitives';
import * as ows from '../ows/2.0';
import * as xlink from '../../www.w3.org/1999/xlink';
import * as xml from '../../www.w3.org/XML/1998/namespace';

// Source files:
// http://schemas.opengis.net/wps/2.0/dataTypes.xsd
// http://schemas.opengis.net/wps/2.0/processDescription.xsd
// http://schemas.opengis.net/wps/2.0/processProfile.xsd
// http://schemas.opengis.net/wps/2.0/wps.xsd
// http://schemas.opengis.net/wps/2.0/wpsCommon.xsd
// http://schemas.opengis.net/wps/2.0/wpsDescribeProcess.xsd
// http://schemas.opengis.net/wps/2.0/wpsDismiss.xsd
// http://schemas.opengis.net/wps/2.0/wpsExecute.xsd
// http://schemas.opengis.net/wps/2.0/wpsGetCapabilities.xsd
// http://schemas.opengis.net/wps/2.0/wpsGetResult.xsd
// http://schemas.opengis.net/wps/2.0/wpsGetStatus.xsd


interface WPS_20_BaseType {
	_exists: boolean;
	_namespace: string;
}
interface WPS_20__BoundingBoxDataType extends WPS_20__DataDescriptionType {
	/** Supported CRS supported for this Input/Output. "default" shall be used
	  * on only one element. This default element identifies the default CRS. */
	SupportedCRS: WPS_20_SupportedCRSType[];
}
interface WPS_20_BoundingBoxDataType extends WPS_20__BoundingBoxDataType { constructor: { new(): WPS_20_BoundingBoxDataType }; }

interface WPS_20__ComplexDataType extends WPS_20__DataDescriptionType {}
export interface WPS_20_ComplexDataType extends WPS_20__ComplexDataType { constructor: { new(): WPS_20_ComplexDataType }; }
export var WPS_20_ComplexDataType: { new(): WPS_20_ComplexDataType };

interface WPS_20__ContentsType extends WPS_20_BaseType {
	/** Unordered list of one or more brief descriptions of all the processes offered by this WPS server. */
	ProcessSummary: WPS_20_ProcessSummaryType[];
}
interface WPS_20_ContentsType extends WPS_20__ContentsType { constructor: { new(): WPS_20_ContentsType }; }

interface WPS_20__DataDescriptionProxyType extends WPS_20_BaseType {
	/** Indicates that this Input shall be a BoundingBox data
	  * structure that is embedded in the execute request, and provides a
	  * list of the Coordinate Reference System support for this Bounding
	  * Box. */
	BoundingBoxData?: WPS_20_BoundingBoxDataType;
	/** Indicates that this input/output shall be a complex data structure
	  * (such as a GML document or a GeoTiff image that comply with a particular format definition). */
	ComplexData?: WPS_20_ComplexDataType;
	LiteralData?: WPS_20_LiteralDataType;
}
interface WPS_20_DataDescriptionProxyType extends WPS_20__DataDescriptionProxyType { constructor: { new(): WPS_20_DataDescriptionProxyType }; }

/** Description type for process or input/output data items. */
interface WPS_20__DataDescriptionType extends WPS_20_BaseType {
	Format: WPS_20_FormatType[];
}
export interface WPS_20_DataDescriptionType extends WPS_20__DataDescriptionType { constructor: { new(): WPS_20_DataDescriptionType }; }
export var WPS_20_DataDescriptionType: { new(): WPS_20_DataDescriptionType };

/** This structure contains information elements to supply input data for process execution. */
interface WPS_20__DataInputType extends WPS_20_BaseType {
	/** Identifier of this input. */
	id: string;
	Data: WPS_20_DataType;
	Input: WPS_20_DataInputType[];
	/** This element is used for web accessible references to a data set or value. */
	Reference: WPS_20_ReferenceType;
}
export interface WPS_20_DataInputType extends WPS_20__DataInputType { constructor: { new(): WPS_20_DataInputType }; }
export var WPS_20_DataInputType: { new(): WPS_20_DataInputType };

/** This type describes a process output in the execute response. */
interface WPS_20__DataOutputType extends WPS_20_BaseType {
	/** Identifier of this output. */
	id: string;
	Data: WPS_20_DataType;
	Output: WPS_20_DataOutputType;
	/** This element is used for web accessible references to a data set or value. */
	Reference: WPS_20_ReferenceType;
}
export interface WPS_20_DataOutputType extends WPS_20__DataOutputType { constructor: { new(): WPS_20_DataOutputType }; }
export var WPS_20_DataOutputType: { new(): WPS_20_DataOutputType };

/** This attribute type is used to specify data transmission modes for process outputs. */
export type WPS_20_DataTransmissionModeType = ("value" | "reference");
interface WPS_20__DataTransmissionModeType extends Primitive._string { content: WPS_20_DataTransmissionModeType; }

/** This element is used to embed the data in a WPS request or response.
  * The content can be XML data, plain character data, or specially encoded binary data (i.e. base64). */
interface WPS_20__DataType extends Primitive._any {
	/** Encoding procedure or character set used (e.g. raw, base64, or UTF-8). */
	encoding?: string;
	/** Media type of the data. */
	WPS_20_mimeType?: string;
	/** Identification of the data schema. */
	schema?: string;
}
interface WPS_20_DataType extends WPS_20__DataType { constructor: { new(): WPS_20_DataType }; }

interface WPS_20__DescribeProcessType extends WPS_20__RequestBaseType {
	/** lang (as an attribute name)
	  *
	  * denotes an attribute whose value
	  * is a language code for the natural language of the content of
	  * any element; its value is inherited.  This name is reserved
	  * by virtue of its definition in the XML specification.
	  *
	  * Notes
	  *
	  * Attempting to install the relevant ISO 2- and 3-letter
	  * codes as the enumerated possible values is probably never
	  * going to be a realistic possibility.
	  *
	  * See BCP 47 at
	  * http://www.rfc-editor.org/rfc/bcp/bcp47.txt
	  * and the IANA language subtag registry at
	  *
	  * http://www.iana.org/assignments/language-subtag-registry
	  * for further information.
	  *
	  * The union allows for the 'un-declaration' of xml:lang with
	  * the empty string. */
	lang?: string;
	/** Unique identifier or name of this
	  * dataset. */
	Identifier: ows.CodeType[];
}
interface WPS_20_DescribeProcessType extends WPS_20__DescribeProcessType { constructor: { new(): WPS_20_DescribeProcessType }; }

/** Description type for process or input/output data items. */
interface WPS_20__DescriptionType extends ows._BasicIdentificationType {
	/** Brief narrative description of this resource, normally
	  * used for display to humans. */
	Abstract?: ows.LanguageStringType[];
	/** Unique identifier or name of this
	  * dataset. */
	Identifier: ows.CodeType;
	Keywords?: ows.KeywordsType[];
	Metadata?: ows.MetadataProxyType[];
	/** Title of this resource, normally used for display to
	  * humans. */
	Title: ows.LanguageStringType[];
}
export interface WPS_20_DescriptionType extends WPS_20__DescriptionType { constructor: { new(): WPS_20_DescriptionType }; }
export var WPS_20_DescriptionType: { new(): WPS_20_DescriptionType };

interface WPS_20__DismissType extends WPS_20__RequestBaseType {
	/** A JobID is a unique identifier for a process execution, i.e. a process instance.
	  * Particularly suitable JobIDs are UUIDs or monotonic identifiers such as unique timestamps.
	  * If the privacy of a Processing Job is imperative, the JobID should be non-guessable. */
	JobID: string;
}
interface WPS_20_DismissType extends WPS_20__DismissType { constructor: { new(): WPS_20_DismissType }; }

/** Schema for a WPS Execute operation request, to execute
  * one identified process with the given data and provide the requested
  * output data. */
interface WPS_20__ExecuteRequestType extends WPS_20__RequestBaseType {
	/** Desired execution mode. */
	mode: WPS_20_ExecuteRequestTypeModeType;
	response: WPS_20_ExecuteRequestTypeResponseType;
	/** Unique identifier or name of this
	  * dataset. */
	Identifier: ows.CodeType;
	/** One or more input items to be used for process execution, including referenced or inline data. */
	Input?: WPS_20_DataInputType[];
	/** Defines one or more output items to be delivered by the process execution. */
	Output: WPS_20_OutputDefinitionType[];
}
export interface WPS_20_ExecuteRequestType extends WPS_20__ExecuteRequestType { constructor: { new(): WPS_20_ExecuteRequestType }; }
export var WPS_20_ExecuteRequestType: { new(): WPS_20_ExecuteRequestType };

type WPS_20_ExecuteRequestTypeModeType = ("sync" | "async" | "auto");
interface WPS_20__ExecuteRequestTypeModeType extends Primitive._string { content: WPS_20_ExecuteRequestTypeModeType; }

type WPS_20_ExecuteRequestTypeResponseType = ("raw" | "document");
interface WPS_20__ExecuteRequestTypeResponseType extends Primitive._string { content: WPS_20_ExecuteRequestTypeResponseType; }

/** References the XML schema, format, and encoding of a complex value. */
interface WPS_20__FormatType extends WPS_20_BaseType {
	default?: boolean;
	/** Encoding procedure or character set of the data (e.g. raw or base64). */
	encoding?: string;
	/** The maximum size of the input data, in megabytes.
	  * If the input exceeds this size, the server may return an error
	  * instead of processing the inputs. */
	maximumMegabytes?: number;
	/** Media type of the data. */
	WPS_20_mimeType?: string;
	/** Identification of the data schema. */
	schema?: string;
}
interface WPS_20_FormatType extends WPS_20__FormatType { constructor: { new(): WPS_20_FormatType }; }

/** Description of an input to a process. */
interface WPS_20__GenericInputType extends WPS_20__DescriptionType {
	Input?: WPS_20_GenericInputType[];
}
export interface WPS_20_GenericInputType extends WPS_20__GenericInputType { constructor: { new(): WPS_20_GenericInputType }; }
export var WPS_20_GenericInputType: { new(): WPS_20_GenericInputType };

/** Description of a process Output. */
interface WPS_20__GenericOutputType extends WPS_20__DescriptionType {
	Output?: WPS_20_GenericOutputType[];
}
export interface WPS_20_GenericOutputType extends WPS_20__GenericOutputType { constructor: { new(): WPS_20_GenericOutputType }; }
export var WPS_20_GenericOutputType: { new(): WPS_20_GenericOutputType };

interface WPS_20__GenericProcessType extends WPS_20__DescriptionType {
	/** A process can have zero or more inputs. */
	Input?: WPS_20_GenericInputType[];
	/** A process can have one or more outputs. */
	Output: WPS_20_GenericOutputType[];
}
export interface WPS_20_GenericProcessType extends WPS_20__GenericProcessType { constructor: { new(): WPS_20_GenericProcessType }; }
export var WPS_20_GenericProcessType: { new(): WPS_20_GenericProcessType };

interface WPS_20__GetCapabilitiesType extends ows._GetCapabilitiesType {
	/** service type identifier */
	service: string;
}
export interface WPS_20_GetCapabilitiesType extends WPS_20__GetCapabilitiesType { constructor: { new(): WPS_20_GetCapabilitiesType }; }
export var WPS_20_GetCapabilitiesType: { new(): WPS_20_GetCapabilitiesType };

interface WPS_20__GetResultType extends WPS_20__RequestBaseType {
	/** A JobID is a unique identifier for a process execution, i.e. a process instance.
	  * Particularly suitable JobIDs are UUIDs or monotonic identifiers such as unique timestamps.
	  * If the privacy of a Processing Job is imperative, the JobID should be non-guessable. */
	JobID: string;
}
interface WPS_20_GetResultType extends WPS_20__GetResultType { constructor: { new(): WPS_20_GetResultType }; }

interface WPS_20__GetStatusType extends WPS_20__RequestBaseType {
	/** A JobID is a unique identifier for a process execution, i.e. a process instance.
	  * Particularly suitable JobIDs are UUIDs or monotonic identifiers such as unique timestamps.
	  * If the privacy of a Processing Job is imperative, the JobID should be non-guessable. */
	JobID: string;
}
interface WPS_20_GetStatusType extends WPS_20__GetStatusType { constructor: { new(): WPS_20_GetStatusType }; }

/** Description of an input to a process. */
interface WPS_20__InputDescriptionType extends WPS_20__DescriptionType, WPS_20__DataDescriptionProxyType {
	Input: WPS_20_InputDescriptionType[];
}
export interface WPS_20_InputDescriptionType extends WPS_20__InputDescriptionType { constructor: { new(): WPS_20_InputDescriptionType }; }
export var WPS_20_InputDescriptionType: { new(): WPS_20_InputDescriptionType };

/** This attribute type is used to specify process control options.
  * The WPS specification only defines "execute-sync" and "execute-async",
  * each with an associated execution protocol.
  * Extensions may specify additional control options, such as "dimiss" which is
  * defined in the WPS dismiss extension. */
export type WPS_20_JobControlOptionsType = string;
type WPS_20__JobControlOptionsType = Primitive._string;

type JobControlOptionsType_2 = string[];

/** A literal data domain consists of a value type and range,
  * and optionally a unit of measurement and a default value. */
interface WPS_20__LiteralDataDomainType extends WPS_20_BaseType {
	/** List of all the valid values and/or ranges of values for
	  * this quantity. For numeric quantities, signed values should be ordered
	  * from negative infinity to positive infinity. */
	AllowedValues: ows.AllowedValuesType;
	/** Specifies that any value is allowed for this
	  * parameter. */
	AnyValue: ows.AnyValueType;
	/** Definition of the data type of this set of values. In
	  * this case, the xlink:href attribute can reference a URN for a well-known
	  * data type. For example, such a URN could be a data type identification
	  * URN defined in the "ogc" URN namespace. */
	WPS_20_DataType?: ows.DomainMetadataType;
	/** The default value for a quantity for which multiple
	  * values are allowed. */
	DefaultValue?: string;
	/** Definition of the unit of measure of this set of values.
	  * In this case, the xlink:href attribute can reference a URN for a
	  * well-known unit of measure (uom). For example, such a URN could be a UOM
	  * identification URN defined in the "ogc" URN namespace. */
	UOM?: ows.DomainMetadataType;
	/** Reference to externally specified list of all the valid
	  * values and/or ranges of values for this quantity. (Informative: This
	  * element was simplified from the metaDataProperty element in GML
	  * 3.0.) */
	ValuesReference: ows.ValuesReferenceType;
}
export interface WPS_20_LiteralDataDomainType extends WPS_20__LiteralDataDomainType { constructor: { new(): WPS_20_LiteralDataDomainType }; }
export var WPS_20_LiteralDataDomainType: { new(): WPS_20_LiteralDataDomainType };

interface WPS_20__LiteralDataType extends WPS_20__DataDescriptionType {
	/** Literal Data inputs and outputs may be specified for several domains, e.g. distance units in meters,
	  * kilometers and feet. One of these must be the default domain. */
	LiteralDataDomain: WPS_20_LiteralDataTypeLiteralDataDomainType[];
}
export interface WPS_20_LiteralDataType extends WPS_20__LiteralDataType { constructor: { new(): WPS_20_LiteralDataType }; }
export var WPS_20_LiteralDataType: { new(): WPS_20_LiteralDataType };

interface WPS_20__LiteralDataTypeLiteralDataDomainType extends WPS_20__LiteralDataDomainType {
	/** Indicates that this LiteralDataDomain is the default domain. */
	default?: boolean;
}
interface WPS_20_LiteralDataTypeLiteralDataDomainType extends WPS_20__LiteralDataTypeLiteralDataDomainType { constructor: { new(): WPS_20_LiteralDataTypeLiteralDataDomainType }; }

/** Representation of a simple literal value (such as an integer, a real number, or a string). */
interface WPS_20__LiteralValueType extends ows._ValueType {
	/** The data type of the value. */
	WPS_20_dataType?: string;
	/** The unit of measurement of the value. */
	uom?: string;
}
interface WPS_20_LiteralValueType extends WPS_20__LiteralValueType { constructor: { new(): WPS_20_LiteralValueType }; }

/** This structure contains information elements that describe the format and transmission mode
  * of the output data that is delivered by a process execution */
interface WPS_20__OutputDefinitionType extends WPS_20_BaseType {
	/** Encoding procedure or character set used (e.g. raw, base64, or UTF-8). */
	encoding?: string;
	/** Identifier of this output. */
	id: string;
	/** Media type of the data. */
	WPS_20_mimeType?: string;
	/** Identification of the data schema. */
	schema?: string;
	/** The desired transmission mode for this output */
	transmission: WPS_20_DataTransmissionModeType;
	Output?: WPS_20_OutputDefinitionType;
}
export interface WPS_20_OutputDefinitionType extends WPS_20__OutputDefinitionType { constructor: { new(): WPS_20_OutputDefinitionType }; }
export var WPS_20_OutputDefinitionType: { new(): WPS_20_OutputDefinitionType };

/** Description of a process Output. */
interface WPS_20__OutputDescriptionType extends WPS_20__DescriptionType, WPS_20__DataDescriptionProxyType {
	Output: WPS_20_OutputDescriptionType[];
}
export interface WPS_20_OutputDescriptionType extends WPS_20__OutputDescriptionType { constructor: { new(): WPS_20_OutputDescriptionType }; }
export var WPS_20_OutputDescriptionType: { new(): WPS_20_OutputDescriptionType };

type WPS_20_OutputTransmissionType = WPS_20_DataTransmissionModeType[];

/** Full description of a process. */
interface WPS_20__ProcessDescriptionType extends WPS_20__DescriptionType {
	/** lang (as an attribute name)
	  *
	  * denotes an attribute whose value
	  * is a language code for the natural language of the content of
	  * any element; its value is inherited.  This name is reserved
	  * by virtue of its definition in the XML specification.
	  *
	  * Notes
	  *
	  * Attempting to install the relevant ISO 2- and 3-letter
	  * codes as the enumerated possible values is probably never
	  * going to be a realistic possibility.
	  *
	  * See BCP 47 at
	  * http://www.rfc-editor.org/rfc/bcp/bcp47.txt
	  * and the IANA language subtag registry at
	  *
	  * http://www.iana.org/assignments/language-subtag-registry
	  * for further information.
	  *
	  * The union allows for the 'un-declaration' of xml:lang with
	  * the empty string. */
	lang: string;
	/** A process can have zero or more inputs. */
	Input?: WPS_20_InputDescriptionType[];
	/** A process can have one or more outputs. */
	Output: WPS_20_OutputDescriptionType[];
}
export interface WPS_20_ProcessDescriptionType extends WPS_20__ProcessDescriptionType { constructor: { new(): WPS_20_ProcessDescriptionType }; }
export var WPS_20_ProcessDescriptionType: { new(): WPS_20_ProcessDescriptionType };

interface WPS_20__ProcessOfferingsType extends WPS_20_BaseType {
	/** A process offering is a process description. It has additional attributes that provide additional
	  * information on how this process can be executed on a particular service instance (execution modes,
	  * data transmission modes, informative process version.) */
	ProcessOffering: WPS_20_ProcessOfferingType[];
}
interface WPS_20_ProcessOfferingsType extends WPS_20__ProcessOfferingsType { constructor: { new(): WPS_20_ProcessOfferingsType }; }

interface WPS_20__ProcessOfferingType extends WPS_20_BaseType {
	/** Defines the valid execution modes for a particular process offering. */
	jobControlOptions: JobControlOptionsType_2;
	/** Indicates whether data outputs from this process can be stored by the WPS server as web-accessible resources. */
	outputTransmission: WPS_20_OutputTransmissionType;
	/** WPS_20_Type of the process model. Include when using a different process model than the native process model. This is an
	  * extension hook to support processes that have been specified in other OGC Standards, such as SensorML. For those
	  * process models, compliance with the abstract process model has to be ensured compatibility with the WPS protocol. */
	processModel?: string;
	/** The process version is an informative element in a process offering. It is not intended for version negotiation
	  * but can rather be used to communicate updated or changed process implementations on a particular service instance. */
	processVersion?: string;
	/** The description of a single process, including the input and output items. */
	Process: WPS_20_ProcessDescriptionType;
}
interface WPS_20_ProcessOfferingType extends WPS_20__ProcessOfferingType { constructor: { new(): WPS_20_ProcessOfferingType }; }

/** The process summary consists of descriptive elements at the process level,
  * the process profiles and the service-specific properties.
  * The process summary is not specific about process inputs and outputs. */
interface WPS_20__ProcessSummaryType extends WPS_20__DescriptionType {
	/** Defines the valid execution modes for a particular process offering. */
	jobControlOptions: JobControlOptionsType_2;
	/** Indicates whether data outputs from this process can be stored by the WPS server as web-accessible resources. */
	outputTransmission: WPS_20_OutputTransmissionType;
	/** WPS_20_Type of the process model. Include when using a different process model than the native process model. This is an
	  * extension hook to support processes that have been specified in other OGC Standards, such as SensorML. For those
	  * process models, compliance with the abstract process model has to be ensured compatibility with the WPS protocol. */
	processModel?: string;
	/** The process version is an informative element in a process offering. It is not intended for version negotiation
	  * but can rather be used to communicate updated or changed process implementations on a particular service instance. */
	processVersion?: string;
}
export interface WPS_20_ProcessSummaryType extends WPS_20__ProcessSummaryType { constructor: { new(): WPS_20_ProcessSummaryType }; }
export var WPS_20_ProcessSummaryType: { new(): WPS_20_ProcessSummaryType };

/** Reference to an input (output) value that is a web accessible resource. */
interface WPS_20__ReferenceType extends WPS_20_BaseType {
	/** Encoding procedure or character set used (e.g. raw, base64, or UTF-8). */
	encoding?: string;
	href: xlink.hrefType;
	/** Media type of the data. */
	WPS_20_mimeType?: string;
	/** Identification of the data schema. */
	schema?: string;
	/** The contents of this element to be used as the body of the HTTP request
	  * message to be sent to the service identified in ../Reference/@href.
	  * For example, it could be an XML encoded WFS request using HTTP/POST. */
	Body?: any;
	/** Reference to a remote document to be used as the body of the an HTTP/POST request message
	  * to the service identified in the href element in the Reference structure. */
	BodyReference?: WPS_20_ReferenceTypeBodyReferenceType;
}
export interface WPS_20_ReferenceType extends WPS_20__ReferenceType { constructor: { new(): WPS_20_ReferenceType }; }
export var WPS_20_ReferenceType: { new(): WPS_20_ReferenceType };

interface WPS_20__ReferenceTypeBodyReferenceType extends WPS_20_BaseType {
	href: xlink.hrefType;
}
interface WPS_20_ReferenceTypeBodyReferenceType extends WPS_20__ReferenceTypeBodyReferenceType { constructor: { new(): WPS_20_ReferenceTypeBodyReferenceType }; }

/** WPS operation request base, for all WPS operations, except GetCapabilities.
  * In this XML encoding, no "request" parameter is included, since the element
  * name specifies the specific operation.
  * An 'Extension' element provides a placeholder for extra request parameters
  * that might be defined by WPS extension standards. */
interface WPS_20__RequestBaseType extends WPS_20_BaseType {
	/** Service type identifier (WPS) */
	service: string;
	/** Version of the WPS interface specification implemented by the server (2.0.0) */
	version: string;
	/** Any ancillary information to be sent from client to server.
	  * Placeholder for further request parameters defined by WPS extension standards. */
	Extension?: any[];
}
export interface WPS_20_RequestBaseType extends WPS_20__RequestBaseType { constructor: { new(): WPS_20_RequestBaseType }; }
export var WPS_20_RequestBaseType: { new(): WPS_20_RequestBaseType };

interface WPS_20__ResultType extends WPS_20_BaseType {
	/** Date and time by which the job and its results will be removed from the server. Use if appropriate.
	  * In some situations the expiration date may not be known from the start. In this case, it is recommended
	  * to specify a timestamp for NextPoll.
	  * A typical example is a long running process for which the results are stored 48 hours after completion. While the
	  * process is running, clients are provided with updated timestamps for NextPoll. As soon as the process has completed
	  * the ExpirationDate is determined. */
	ExpirationDate?: Date;
	/** A JobID is a unique identifier for a process execution, i.e. a process instance.
	  * Particularly suitable JobIDs are UUIDs or monotonic identifiers such as unique timestamps.
	  * If the privacy of a Processing Job is imperative, the JobID should be non-guessable. */
	JobID?: string;
	Output: WPS_20_DataOutputType[];
}
interface WPS_20_ResultType extends WPS_20__ResultType { constructor: { new(): WPS_20_ResultType }; }

interface WPS_20__StatusInfoType extends WPS_20_BaseType {
	/** Estimated date and time by which the job will be completed. Use if available.
	  * The time of estimated completion lies significantly before the expiration date of this job. */
	EstimatedCompletion?: Date;
	/** Date and time by which the job and its results will be removed from the server. Use if appropriate.
	  * In some situations the expiration date may not be known from the start. In this case, it is recommended
	  * to specify a timestamp for NextPoll.
	  * A typical example is a long running process for which the results are stored 48 hours after completion. While the
	  * process is running, clients are provided with updated timestamps for NextPoll. As soon as the process has completed
	  * the ExpirationDate is determined. */
	ExpirationDate?: Date;
	/** A JobID is a unique identifier for a process execution, i.e. a process instance.
	  * Particularly suitable JobIDs are UUIDs or monotonic identifiers such as unique timestamps.
	  * If the privacy of a Processing Job is imperative, the JobID should be non-guessable. */
	JobID: string;
	/** Suggested date and time for the next status poll (GetStatus) for this job. Use if appropriate.
	  * The time of the next poll shall lie significantly before the expiration date of this job.
	  * If this element is provided but an expiration date for the job is not given, clients are expected to check
	  * the job status on time to eventually receive an update on the expiration date and avoid missing the results. */
	NextPoll?: Date;
	/** Use as a progress indicator if appropriate. Like most progress bars the value is an estimate without accuracy guarantees. */
	PercentCompleted?: number;
	/** This element is used to communicate basic status information about executed processes. */
	Status: string;
}
interface WPS_20_StatusInfoType extends WPS_20__StatusInfoType { constructor: { new(): WPS_20_StatusInfoType }; }

type WPS_20_StatusInfoTypePercentCompletedType = number;
type WPS_20__StatusInfoTypePercentCompletedType = Primitive._number;

/** Basic status set to communicate the status of a server-side job to the client.
  * Extensions of this specification may introduce additional states for fine-grained
  * monitoring or domain-specific purposes. */
type WPS_20_StatusInfoTypeStatusType = string;
type WPS_20__StatusInfoTypeStatusType = Primitive._string;

interface WPS_20__SupportedCRSType extends Primitive._string {
	default?: boolean;
}
interface WPS_20_SupportedCRSType extends WPS_20__SupportedCRSType { constructor: { new(): WPS_20_SupportedCRSType }; }

interface WPS_20__WPSCapabilitiesType extends ows._CapabilitiesBaseType {
	/** List of brief descriptions of the processes offered by this WPS server. */
	Contents: WPS_20_ContentsType;
	/** container for elements defined by extension specifications */
	Extension?: WPS_20_WPSCapabilitiesTypeExtensionType;
}
export interface WPS_20_WPSCapabilitiesType extends WPS_20__WPSCapabilitiesType { constructor: { new(): WPS_20_WPSCapabilitiesType }; }
export var WPS_20_WPSCapabilitiesType: { new(): WPS_20_WPSCapabilitiesType };

interface WPS_20__WPSCapabilitiesTypeExtensionType extends WPS_20_BaseType {}
interface WPS_20_WPSCapabilitiesTypeExtensionType extends WPS_20__WPSCapabilitiesTypeExtensionType { constructor: { new(): WPS_20_WPSCapabilitiesTypeExtensionType }; }

export interface WPS_20_document extends WPS_20_BaseType {
	/** Indicates that this Input shall be a BoundingBox data
	  * structure that is embedded in the execute request, and provides a
	  * list of the Coordinate Reference System support for this Bounding
	  * Box. */
	BoundingBoxData: WPS_20_BoundingBoxDataType;
	/** WPS GetCapabilities operation response. This document provides clients with service metadata about a specific service instance, including metadata about the processes that can be executed. Since the server does not implement the updateSequence and Sections parameters, the server shall always return the complete Capabilities document, without the updateSequence parameter. */
	Capabilities: WPS_20_WPSCapabilitiesType;
	/** Indicates that this input/output shall be a complex data structure
	  * (such as a GML document or a GeoTiff image that comply with a particular format definition). */
	ComplexData: WPS_20_ComplexDataType;
	/** List of brief descriptions of the processes offered by this WPS server. */
	Contents: WPS_20_ContentsType;
	Data: WPS_20_DataType;
	/** WPS DescribeProcess operation request. */
	DescribeProcess: WPS_20_DescribeProcessType;
	/** WPS GetStatus operation request. This operation is used to query status information of executed processes.
	  * The response to a GetStatus operation is a StatusInfo document or an exception.
	  * Depending on the implementation, a WPS may "forget" old process executions sooner or later.
	  * In this case, there is no status information available and an exception shall be returned instead of a StatusInfo response. */
	Dismiss: WPS_20_DismissType;
	Execute: WPS_20_ExecuteRequestType;
	/** Date and time by which the job and its results will be removed from the server. Use if appropriate.
	  * In some situations the expiration date may not be known from the start. In this case, it is recommended
	  * to specify a timestamp for NextPoll.
	  * A typical example is a long running process for which the results are stored 48 hours after completion. While the
	  * process is running, clients are provided with updated timestamps for NextPoll. As soon as the process has completed
	  * the ExpirationDate is determined. */
	ExpirationDate: Date;
	Format: WPS_20_FormatType;
	GenericProcess: WPS_20_GenericProcessType;
	/** Request to a WPS server to perform the GetCapabilities operation. This operation allows a client to retrieve a Capabilities XML document providing metadata for the specific WPS server. */
	GetCapabilities: WPS_20_GetCapabilitiesType;
	/** WPS GetResult operation request. This operation is used to query the results of asynchrously
	  * executed processes. The response to a GetResult operation is a wps:ProcessingResult, a raw data response, or an exception.
	  * Depending on the implementation, a WPS may "forget" old process executions sooner or later.
	  * In this case, there is no result information available and an exception shall be returned. */
	GetResult: WPS_20_GetResultType;
	/** WPS GetStatus operation request. This operation is used to query status information of executed processes.
	  * The response to a GetStatus operation is a StatusInfo document or an exception.
	  * Depending on the implementation, a WPS may "forget" old process executions sooner or later.
	  * In this case, there is no status information available and an exception shall be returned instead of a StatusInfo response. */
	GetStatus: WPS_20_GetStatusType;
	/** A JobID is a unique identifier for a process execution, i.e. a process instance.
	  * Particularly suitable JobIDs are UUIDs or monotonic identifiers such as unique timestamps.
	  * If the privacy of a Processing Job is imperative, the JobID should be non-guessable. */
	JobID: string;
	LiteralData: WPS_20_LiteralDataType;
	LiteralValue: WPS_20_LiteralValueType;
	/** The description of a single process, including the input and output items. */
	Process: WPS_20_ProcessDescriptionType;
	/** A process offering is a process description. It has additional attributes that provide additional
	  * information on how this process can be executed on a particular service instance (execution modes,
	  * data transmission modes, informative process version.) */
	ProcessOffering: WPS_20_ProcessOfferingType;
	/** List structure that is returned by the WPS DescribeProcess operation.
	  * Contains XML descriptions for the queried process identifiers. */
	ProcessOfferings: WPS_20_ProcessOfferingsType;
	/** This element is used for web accessible references to a data set or value. */
	Reference: WPS_20_ReferenceType;
	/** A Result document is a structure that contains the results of a process execution.
	  * It is a shared element between the Execute and GetResult operations. */
	Result: WPS_20_ResultType;
	/** StatusInfo document containing information about executed processes. */
	StatusInfo: WPS_20_StatusInfoType;
	/** Supported CRS supported for this Input/Output. "default" shall be used
	  * on only one element. This default element identifies the default CRS. */
	SupportedCRS: WPS_20_SupportedCRSType;
}
//export var document: WPS_20_document;
