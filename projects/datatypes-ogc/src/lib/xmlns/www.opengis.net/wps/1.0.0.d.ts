import * as Primitive from '../../xml-primitives';
import * as ows from '../ows/1.1';
import * as xlink from '../../www.w3.org/1999/xlink';
import * as xml from '../../www.w3.org/XML/1998/namespace';

// Source files:
// http://schemas.opengis.net/wps/1.0.0/common/WPS_100_DescriptionType.xsd
// http://schemas.opengis.net/wps/1.0.0/common/WPS_100_ProcessBriefType.xsd
// http://schemas.opengis.net/wps/1.0.0/common/ProcessVersion.xsd
// http://schemas.opengis.net/wps/1.0.0/common/WPS_100_RequestBaseType.xsd
// http://schemas.opengis.net/wps/1.0.0/common/WPS_100_ResponseBaseType.xsd
// http://schemas.opengis.net/wps/1.0.0/common/WSDL.xsd
// http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd
// http://schemas.opengis.net/wps/1.0.0/wpsDescribeProcess_request.xsd
// http://schemas.opengis.net/wps/1.0.0/wpsDescribeProcess_response.xsd
// http://schemas.opengis.net/wps/1.0.0/wpsExecute_request.xsd
// http://schemas.opengis.net/wps/1.0.0/wpsExecute_response.xsd
// http://schemas.opengis.net/wps/1.0.0/wpsGetCapabilities_request.xsd
// http://schemas.opengis.net/wps/1.0.0/wpsGetCapabilities_response.xsd


interface WPS_100_BaseType {
	// _exists: boolean;
	// _namespace: string;
}
/** Identifies valid combinations of Format, Encoding, and Schema supported for this input or output. The process shall expect input in or produce output in this combination of Format/Encoding/Schema unless the Execute request specifies otherwise.. */
interface WPS_100__ComplexDataCombinationsType extends WPS_100_BaseType {
	/** A valid combination of WPS_100_MimeType/Encoding/Schema supported for this Input/Output. */
	Format: WPS_100_ComplexDataDescriptionType[];
}
export interface WPS_100_ComplexDataCombinationsType extends WPS_100__ComplexDataCombinationsType { constructor: { new(): WPS_100_ComplexDataCombinationsType }; }
export var WPS_100_ComplexDataCombinationsType: { new(): WPS_100_ComplexDataCombinationsType };

/** Identifies the default Format, Encoding, and Schema supported for this input or output. The process shall expect input in or produce output in this combination of Format/Encoding/Schema unless the Execute request specifies otherwise.. */
interface WPS_100__ComplexDataCombinationType extends WPS_100_BaseType {
	/** The default combination of WPS_100_MimeType/Encoding/Schema supported for this Input/Output. */
	Format: WPS_100_ComplexDataDescriptionType;
}
export interface WPS_100_ComplexDataCombinationType extends WPS_100__ComplexDataCombinationType { constructor: { new(): WPS_100_ComplexDataCombinationType }; }
export var WPS_100_ComplexDataCombinationType: { new(): WPS_100_ComplexDataCombinationType };

/** A combination of format, encoding, and/or schema supported by a process input or output. */
interface WPS_100__ComplexDataDescriptionType extends WPS_100_BaseType {
	/** Reference to an encoding supported for this input or output (e.g., UTF-8).  This element shall be omitted if Encoding does not apply to this Input/Output. */
	Encoding?: string;
	/** Mime WPS_100_type supported for this input or output (e.g., text/xml). */
	WPS_100_MimeType: string;
	/** Reference to a definition of XML elements or types supported for this Input/Output (e.g., GML 2.1 Application Schema). Each of these XML elements or types shall be defined in a separate XML Schema Document. This parameter shall be included when this input/output is XML encoded using an XML schema. When included, the input/output shall validate against the referenced XML Schema. This element shall be omitted if Schema does not apply to this Input/Output. Note: If the Input/Output uses a profile of a larger schema, the server administrator should provide that schema profile for validation purposes. */
	Schema?: string;
}
export interface WPS_100_ComplexDataDescriptionType extends WPS_100__ComplexDataDescriptionType { constructor: { new(): WPS_100_ComplexDataDescriptionType }; }
export var WPS_100_ComplexDataDescriptionType: { new(): WPS_100_ComplexDataDescriptionType };

/** Complex data (such as an image), including a definition of the complex value data structure (i.e., schema, format, and encoding).  May be an ows:Manifest data structure. */
interface WPS_100__ComplexDataType extends Primitive._any {
	/** The encoding of this input or requested for this output (e.g., UTF-8). This "encoding" shall be included whenever the encoding required is not the default encoding indicated in the Process full description. When included, this encoding shall be one published for this output or input in the Process full description. */
	encoding?: string;
	/** The Format of this input or requested for this output (e.g., text/xml). This element shall be omitted when the Format is indicated in the http header of the output. When included, this format shall be one published for this output or input in the Process full description. */
	WPS_100_mimeType?: string;
	/** Web-accessible XML Schema Document that defines the content model of this complex resource (e.g., encoded using GML 2.2 Application Schema).  This reference should be included for XML encoded complex resources to facilitate validation. PS I changed the name of this attribute to be consistent with the ProcessDescription.  The original was giving me validation troubles in XMLSpy. */
	schema?: string;
}
export interface WPS_100_ComplexDataType extends WPS_100__ComplexDataType { constructor: { new(): WPS_100_ComplexDataType }; }
export var WPS_100_ComplexDataType: { new(): WPS_100_ComplexDataType };

/** Identifies a Coordinate Reference System (CRS) supported for this input or output. */
interface WPS_100__CRSsType extends WPS_100_BaseType {
	/** Reference to a CRS supported for this Input/Output. */
	CRS: string[];
}
export interface WPS_100_CRSsType extends WPS_100__CRSsType { constructor: { new(): WPS_100_CRSsType }; }
export var WPS_100_CRSsType: { new(): WPS_100_CRSsType };

/** List of the Inputs provided as part of the Execute Request. */
interface WPS_100__DataInputsType extends WPS_100_BaseType {
	/** Unordered list of one or more inputs to be used by the process, including each of the Inputs needed to execute the process. */
	Input: WPS_100_InputType[];
}
export interface WPS_100_DataInputsType extends WPS_100__DataInputsType { constructor: { new(): WPS_100_DataInputsType }; }
export var WPS_100_DataInputsType: { new(): WPS_100_DataInputsType };

/** Identifies the form of this input or output value, and provides supporting information. */
interface WPS_100__DataType extends WPS_100_BaseType {
	/** Identifies this input or output data as an ows:BoundingBox data structure, and provides that ows:BoundingBox data. */
	BoundingBoxData: ows.BoundingBoxType;
	/** Identifies this input or output value as a complex data structure encoded in XML (e.g., using GML), and provides that complex data structure. For an input, this element may be used by a client for any process input coded as ComplexData in the ProcessDescription. For an output, this element shall be used by a server when "store" in the Execute request is "false". */
	ComplexData: WPS_100_ComplexDataType;
	/** Identifies this input or output data as literal data of a simple quantity (e.g., one number), and provides that data. */
	LiteralData: WPS_100_LiteralDataType;
}
export interface WPS_100_DataType extends WPS_100__DataType { constructor: { new(): WPS_100_DataType }; }
export var WPS_100_DataType: { new(): WPS_100_DataType };

interface WPS_100__DescribeProcessType extends WPS_100__RequestBaseType {
	/** Unique identifier or name of this dataset. */
	Identifier: ows._CodeType[];
}
interface WPS_100_DescribeProcessType extends WPS_100__DescribeProcessType { constructor: { new(): WPS_100_DescribeProcessType }; }

/** Description of a WPS process or output object. */
interface WPS_100__DescriptionType extends WPS_100_BaseType {
	/** Brief narrative description of this resource, normally used for display to a human. */
	Abstract?: ows._LanguageStringType;
	/** Unique identifier or name of this dataset. */
	Identifier: ows._CodeType;
	Metadata?: ows._MetadataType[];
	/** Title of this resource, normally used for display to a human. */
	Title: ows._LanguageStringType;
}
export interface WPS_100_DescriptionType extends WPS_100__DescriptionType { constructor: { new(): WPS_100_DescriptionType }; }
export var WPS_100_DescriptionType: { new(): WPS_100_DescriptionType };

/** Definition of a format, encoding,  schema, and unit-of-measure for an output to be returned from a process. */
interface WPS_100__DocumentOutputDefinitionType extends WPS_100__OutputDefinitionType {
	/** Specifies if this output should be stored by the process as a web-accessible resource. If asReference is "true", the server shall store this output so that the client can retrieve it as required. If store is "false", all the output shall be encoded in the Execute operation response document. This parameter only applies to ComplexData outputs.  This parameter shall not be included unless the corresponding "storeSupported" parameter is included and is "true" in the ProcessDescription for this process. */
	asReference?: boolean;
	/** Brief narrative description of this resource, normally used for display to a human. */
	Abstract?: ows._LanguageStringType;
	/** Title of this resource, normally used for display to a human. */
	Title?: ows._LanguageStringType;
}
export interface WPS_100_DocumentOutputDefinitionType extends WPS_100__DocumentOutputDefinitionType { constructor: { new(): WPS_100_DocumentOutputDefinitionType }; }
export var WPS_100_DocumentOutputDefinitionType: { new(): WPS_100_DocumentOutputDefinitionType };

interface WPS_100__ExecuteResponseType extends WPS_100__ResponseBaseType {
	/** This attribute shall contain the GetCapabilities URL of the WPS service which was invoked */
	serviceInstance: string;
	/** The URL referencing the location from which the ExecuteResponse can be retrieved. If "status" is "true" in the Execute request, the ExecuteResponse should also be found here as soon as the process returns the initial response to the client. It should persist at this location as long as the outputs are accessible from the server. The outputs may be stored for as long as the implementer of the server decides. If the process takes a long time, this URL can be repopulated on an ongoing basis in order to keep the client updated on progress. Before the process has succeeded, the ExecuteResponse contains information about the status of the process, including whether or not processing has started, and the percentage completed. It may also optionally contain the inputs and any WPS_100_ProcessStartedType interim results. When the process has succeeded, the ExecuteResponse found at this URL shall contain the output values or references to them. */
	statusLocation?: string;
	/** Inputs that were provided as part of the execute request. This element shall be omitted unless the lineage attribute of the execute request is set to "true". */
	DataInputs?: WPS_100_DataInputsType;
	/** Complete list of Output data types that were requested as part of the Execute request. This element shall be omitted unless the lineage attribute of the execute request is set to "true". */
	OutputDefinitions?: WPS_100_OutputDefinitionsType;
	/** Process description from the ProcessOfferings section of the GetCapabilities response. */
	Process: WPS_100_ProcessBriefType;
	/** List of values of the Process output parameters. Normally there would be at least one output when the process has completed successfully. If the process has not finished executing, the implementer can choose to include whatever final results are ready at the time the Execute response is provided. If the reference locations of outputs are known in advance, these URLs may be provided before they are populated. */
	ProcessOutputs?: WPS_100_ExecuteResponseTypeProcessOutputsType;
	/** Execution status of this process. */
	Status: WPS_100_StatusType;
}
interface WPS_100_ExecuteResponseType extends WPS_100__ExecuteResponseType { constructor: { new(): WPS_100_ExecuteResponseType }; }

interface WPS_100__ExecuteResponseTypeProcessOutputsType extends WPS_100_BaseType {
	/** Unordered list of values of all the outputs produced by this process. It is not necessary to include an output until the Status is ProcessSucceeded. */
	Output: WPS_100_OutputDataType[];
}
interface WPS_100_ExecuteResponseTypeProcessOutputsType extends WPS_100__ExecuteResponseTypeProcessOutputsType { constructor: { new(): WPS_100_ExecuteResponseTypeProcessOutputsType }; }

interface WPS_100__ExecuteType extends WPS_100__RequestBaseType {
	/** List of input (or parameter) values provided to the process, including each of the Inputs needed to execute the process. It is possible to have no inputs provided only when all the inputs are predetermined fixed resources. In all other cases, at least one input is required. */
	DataInputs?: WPS_100_DataInputsType;
	/** Unique identifier or name of this dataset. */
	Identifier: ows._CodeType;
	/** Defines the response WPS_100_type of the WPS, either raw data or XML document.  If absent, the response shall be a response document which includes all outputs encoded in the response. */
	ResponseForm?: WPS_100_ResponseFormType;
}
interface WPS_100_ExecuteType extends WPS_100__ExecuteType { constructor: { new(): WPS_100_ExecuteType }; }

interface WPS_100__GetCapabilitiesType extends WPS_100_BaseType {
	/** RFC 4646 language code of the human-readable text (e.g. "en-CA"). */
	language: string;
	/** OGC service WPS_100_type identifier (WPS). */
	service: string;
	/** When omitted, server shall return latest supported version. */
	AcceptVersions?: ows._AcceptVersionsType;
}
interface WPS_100_GetCapabilitiesType extends WPS_100__GetCapabilitiesType { constructor: { new(): WPS_100_GetCapabilitiesType }; }

/** Description of an input to a process. */
interface WPS_100__InputDescriptionType extends WPS_100__DescriptionType {
	/** The maximum number of times that values for this parameter are permitted in an Execute request. If "1" then this parameter may appear only once in an Execute request.  If greater than "1", then this input parameter may appear that many times in an Execute request. */
	maxOccurs: number;
	/** The minimum number of times that values for this parameter are required in an Execute request.  If "0", this data input is optional. If greater than "0" then this process input is required. */
	minOccurs: number;
	/** Indicates that this Input shall be a BoundingBox data structure that is embedded in the execute request, and provides a list of the Coordinate Reference System support for this Bounding Box. */
	BoundingBoxData: WPS_100_SupportedCRSsType;
	/** Indicates that this Input shall be a complex data structure (such as a GML document), and provides a list of Formats, Encodings, and Schemas supported for this Input. The value of this ComplexData structure can be input either embedded in the Execute request or remotely accessible to the server.  The client can select from among the identified combinations of Formats, Encodings, and Schemas to specify the form of the Input. This allows for complete specification of particular versions of GML, or image formats. */
	ComplexData: WPS_100_SupportedComplexDataInputType;
	/** Indicates that this Input shall be a simple numeric value or character string that is embedded in the execute request, and describes the possible values. */
	LiteralData: WPS_100_LiteralInputType;
}
export interface WPS_100_InputDescriptionType extends WPS_100__InputDescriptionType { constructor: { new(): WPS_100_InputDescriptionType }; }
export var WPS_100_InputDescriptionType: { new(): WPS_100_InputDescriptionType };

/** Reference to an input or output value that is a web accessible resource. */
interface WPS_100__InputReferenceType extends WPS_100_BaseType {
	/** The encoding of this input or requested for this output (e.g., UTF-8). This "encoding" shall be included whenever the encoding required is not the default encoding indicated in the Process full description. When included, this encoding shall be one published for this output or input in the Process full description. */
	encoding?: string;
	href: string;
	/** Identifies the HTTP method.  Allows a choice of GET or POST.  Default is GET. */
	method?: WPS_100_InputReferenceTypeMethodType;
	/** The Format of this input or requested for this output (e.g., text/xml). This element shall be omitted when the Format is indicated in the http header of the output. When included, this format shall be one published for this output or input in the Process full description. */
	WPS_100_mimeType?: string;
	/** Web-accessible XML Schema Document that defines the content model of this complex resource (e.g., encoded using GML 2.2 Application Schema).  This reference should be included for XML encoded complex resources to facilitate validation. PS I changed the name of this attribute to be consistent with the ProcessDescription.  The original was giving me validation troubles in XMLSpy. */
	schema?: string;
	/** The contents of this element to be used as the body of the HTTP request message to be sent to the service identified in ../Reference/@href.  For example, it could be an XML encoded WFS request using HTTP POST */
	Body?: any;
	/** Reference to a remote document to be used as the body of the an HTTP POST request message to the service identified in ../Reference/@href. */
	BodyReference?: WPS_100_InputReferenceTypeBodyReferenceType;
	/** Extra HTTP request headers needed by the service identified in ../Reference/@href.  For example, an HTTP SOAP request requires a SOAPAction header.  This permits the creation of a complete and valid POST request. */
	Header?: WPS_100_InputReferenceTypeHeaderType[];
}
export interface WPS_100_InputReferenceType extends WPS_100__InputReferenceType { constructor: { new(): WPS_100_InputReferenceType }; }
export var WPS_100_InputReferenceType: { new(): WPS_100_InputReferenceType };

interface WPS_100__InputReferenceTypeBodyReferenceType extends WPS_100_BaseType {
	href: string;
}
interface WPS_100_InputReferenceTypeBodyReferenceType extends WPS_100__InputReferenceTypeBodyReferenceType { constructor: { new(): WPS_100_InputReferenceTypeBodyReferenceType }; }

interface WPS_100__InputReferenceTypeHeaderType extends WPS_100_BaseType {
	/** Key portion of the Key-Value pair in the HTTP request header. */
	key: string;
	/** Value portion of the Key-Value pair in the HTTP request header. */
	value: string;
}
interface WPS_100_InputReferenceTypeHeaderType extends WPS_100__InputReferenceTypeHeaderType { constructor: { new(): WPS_100_InputReferenceTypeHeaderType }; }

type WPS_100_InputReferenceTypeMethodType = ("GET" | "POST");
interface WPS_100__InputReferenceTypeMethodType extends Primitive._string { content: WPS_100_InputReferenceTypeMethodType; }

/** Value of one input to a process. */
interface WPS_100__InputType extends WPS_100_BaseType {
	/** Brief narrative description of this resource, normally used for display to a human. */
	Abstract?: ows._LanguageStringType;
	/** Identifies this input value as a data embedded in this request, and includes that data. */
	Data: WPS_100_DataType;
	/** Unique identifier or name of this dataset. */
	Identifier: ows._CodeType;
	/** Identifies this input value as a web accessible resource, and references that resource. */
	Reference: WPS_100_InputReferenceType;
	/** Title of this resource, normally used for display to a human. */
	Title?: ows._LanguageStringType;
}
export interface WPS_100_InputType extends WPS_100__InputType { constructor: { new(): WPS_100_InputType }; }
export var WPS_100_InputType: { new(): WPS_100_InputType };

/** Identifies a list of languages supported by this service. */
interface WPS_100__LanguagesType extends WPS_100_BaseType {
	/** Identifier of a language used by the data(set) contents. This language identifier shall be as specified in IETF RFC 4646. When this element is omitted, the language used is not identified. */
	Language: string[];
}
export interface WPS_100_LanguagesType extends WPS_100__LanguagesType { constructor: { new(): WPS_100_LanguagesType }; }
export var WPS_100_LanguagesType: { new(): WPS_100_LanguagesType };

interface _LanguagesType_2 extends WPS_100_BaseType {
	/** Identifies the default language that will be used unless the operation request specifies another supported language. */
	Default: WPS_100_LanguagesTypeDefaultType;
	/** Unordered list of references to all of the languages supported by this service. The default language shall be included in this list. */
	Supported: WPS_100_LanguagesType;
}
interface LanguagesType_2 extends _LanguagesType_2 { constructor: { new(): LanguagesType_2 }; }

interface WPS_100__LanguagesTypeDefaultType extends WPS_100_BaseType {
	/** Identifier of a language used by the data(set) contents. This language identifier shall be as specified in IETF RFC 4646. When this element is omitted, the language used is not identified. */
	Language: string;
}
interface WPS_100_LanguagesTypeDefaultType extends WPS_100__LanguagesTypeDefaultType { constructor: { new(): WPS_100_LanguagesTypeDefaultType }; }

/** One simple literal value (such as an integer or real number) that is embedded in the Execute operation request or response. */
interface WPS_100__LiteralDataType extends Primitive._string {
	/** Identifies the data WPS_100_type of this literal input or output. This WPS_100_dataType should be included for each quantity whose value is not a simple string. */
	WPS_100_dataType?: string;
	/** Identifies the unit of measure of this literal input or output. This unit of measure should be referenced for any numerical value that has units (e.g., "meters", but not a more complete reference system). Shall be a UOM identified in the Process description for this input or output. */
	uom?: string;
}
export interface WPS_100_LiteralDataType extends WPS_100__LiteralDataType { constructor: { new(): WPS_100_LiteralDataType }; }
export var WPS_100_LiteralDataType: { new(): WPS_100_LiteralDataType };

/** Description of a process input that consists of a simple literal value (e.g., "2.1"). (Informative: This WPS_100_type is a subset of the ows:WPS_100_UnNamedDomainType defined in WPS_100_owsDomaintype.xsd.) */
interface WPS_100__LiteralInputType extends WPS_100__LiteralOutputType {
	/** List of all the valid values and/or ranges of values for this quantity. For numeric quantities, signed values should be ordered from negative infinity to positive infinity. */
	AllowedValues: ows._AllowedValuesType;
	/** Specifies that any value is allowed for this parameter. */
	AnyValue: ows._AnyValueType;
	/** Optional default value for this quantity, which should be included when this quantity has a default value.  The DefaultValue shall be understood to be consistent with the unit of measure selected in the Execute request. */
	DefaultValue?: string;
	/** Indicates that there are a finite set of values and ranges allowed for this input, which are specified in the referenced list. */
	ValuesReference: WPS_100_ValuesReferenceType;
}
export interface WPS_100_LiteralInputType extends WPS_100__LiteralInputType { constructor: { new(): WPS_100_LiteralInputType }; }
export var WPS_100_LiteralInputType: { new(): WPS_100_LiteralInputType };

/** Description of a literal output (or input). */
interface WPS_100__LiteralOutputType extends WPS_100_BaseType {
	/** Definition of the data WPS_100_type of this set of values. In this case, the xlink:href attribute can reference a URN for a well-known data WPS_100_type. For example, such a URN could be a data WPS_100_type identification URN defined in the "ogc" URN namespace. */
	DataType?: ows._DomainMetadataType;
	/** List of supported units of measure for this input or output. This element should be included when this literal has a unit of measure (e.g., "meters", without a more complete reference system). Not necessary for a count, which has no units. */
	UOMs?: WPS_100_SupportedUOMsType;
}
export interface WPS_100_LiteralOutputType extends WPS_100__LiteralOutputType { constructor: { new(): WPS_100_LiteralOutputType }; }
export var WPS_100_LiteralOutputType: { new(): WPS_100_LiteralOutputType };

/** Value of one output from a process. */
interface WPS_100__OutputDataType extends WPS_100__DescriptionType {
	/** Identifies this output value as a data embedded in this response, and includes that data. This element shall be used by a server when "store" in the Execute request is "false". */
	Data: WPS_100_DataType;
	/** Identifies this output as a web accessible resource, and references that resource.  This element shall only be used for complex data. This element shall be used by a server when "store" in the Execute request is "true". */
	Reference: WPS_100_OutputReferenceType;
}
export interface WPS_100_OutputDataType extends WPS_100__OutputDataType { constructor: { new(): WPS_100_OutputDataType }; }
export var WPS_100_OutputDataType: { new(): WPS_100_OutputDataType };

/** Definition of a format, encoding,  schema, and unit-of-measure for an output to be returned from a process. */
interface WPS_100__OutputDefinitionsType extends WPS_100_BaseType {
	/** Output definition as provided in the execute request */
	Output: WPS_100_DocumentOutputDefinitionType[];
}
export interface WPS_100_OutputDefinitionsType extends WPS_100__OutputDefinitionsType { constructor: { new(): WPS_100_OutputDefinitionsType }; }
export var WPS_100_OutputDefinitionsType: { new(): WPS_100_OutputDefinitionsType };

/** Definition of a format, encoding,  schema, and unit-of-measure for an output to be returned from a process. */
interface WPS_100__OutputDefinitionType extends WPS_100_BaseType {
	/** The encoding of this input or requested for this output (e.g., UTF-8). This "encoding" shall be included whenever the encoding required is not the default encoding indicated in the Process full description. When included, this encoding shall be one published for this output or input in the Process full description. */
	encoding?: string;
	/** The Format of this input or requested for this output (e.g., text/xml). This element shall be omitted when the Format is indicated in the http header of the output. When included, this format shall be one published for this output or input in the Process full description. */
	WPS_100_mimeType?: string;
	/** Web-accessible XML Schema Document that defines the content model of this complex resource (e.g., encoded using GML 2.2 Application Schema).  This reference should be included for XML encoded complex resources to facilitate validation. PS I changed the name of this attribute to be consistent with the ProcessDescription.  The original was giving me validation troubles in XMLSpy. */
	schema?: string;
	/** Reference to the unit of measure (if any) requested for this output. A uom can be referenced when a client wants to specify one of the units of measure supported for this output. This uom shall be a unit of measure referenced for this output of this process in the Process full description. */
	uom?: string;
	/** Unique identifier or name of this dataset. */
	Identifier: ows._CodeType;
}
export interface WPS_100_OutputDefinitionType extends WPS_100__OutputDefinitionType { constructor: { new(): WPS_100_OutputDefinitionType }; }
export var WPS_100_OutputDefinitionType: { new(): WPS_100_OutputDefinitionType };

/** Description of a process Output. */
interface WPS_100__OutputDescriptionType extends WPS_100__DescriptionType {
	/** Indicates that this output shall be a BoundingBox data structure, and provides a list of the CRSs supported in these Bounding Boxes. This element shall be included when this process output is an ows:BoundingBox element. */
	BoundingBoxOutput: WPS_100_SupportedCRSsType;
	/** Indicates that this Output shall be a complex data structure (such as a GML fragment) that is returned by the execute operation response. The value of this complex data structure can be output either embedded in the execute operation response or remotely accessible to the client. When this output form is indicated, the process produces only a single output, and "store" is "false, the output shall be returned directly, without being embedded in the XML document that is otherwise provided by execute operation response.
	  * This element also provides a list of format, encoding, and schema combinations supported for this output. The client can select from among the identified combinations of formats, encodings, and schemas to specify the form of the output. This allows for complete specification of particular versions of GML, or image formats. */
	ComplexOutput: WPS_100_SupportedComplexDataType;
	/** Indicates that this output shall be a simple literal value (such as an integer) that is embedded in the execute response, and describes that output. */
	LiteralOutput: WPS_100_LiteralOutputType;
}
export interface WPS_100_OutputDescriptionType extends WPS_100__OutputDescriptionType { constructor: { new(): WPS_100_OutputDescriptionType }; }
export var WPS_100_OutputDescriptionType: { new(): WPS_100_OutputDescriptionType };

/** Reference to an output value that is a web accessible resource. */
interface WPS_100__OutputReferenceType extends WPS_100_BaseType {
	/** The encoding of this input or requested for this output (e.g., UTF-8). This "encoding" shall be included whenever the encoding required is not the default encoding indicated in the Process full description. When included, this encoding shall be one published for this output or input in the Process full description. */
	encoding?: string;
	/** Reference to a web-accessible resource that is provided by the process as output. This attribute shall contain a URL from which this output can be electronically retrieved. */
	href: string;
	/** The Format of this input or requested for this output (e.g., text/xml). This element shall be omitted when the Format is indicated in the http header of the output. When included, this format shall be one published for this output or input in the Process full description. */
	WPS_100_mimeType?: string;
	/** Web-accessible XML Schema Document that defines the content model of this complex resource (e.g., encoded using GML 2.2 Application Schema).  This reference should be included for XML encoded complex resources to facilitate validation. PS I changed the name of this attribute to be consistent with the ProcessDescription.  The original was giving me validation troubles in XMLSpy. */
	schema?: string;
}
export interface WPS_100_OutputReferenceType extends WPS_100__OutputReferenceType { constructor: { new(): WPS_100_OutputReferenceType }; }
export var WPS_100_OutputReferenceType: { new(): WPS_100_OutputReferenceType };

interface WPS_100__ProcessBriefType extends WPS_100__DescriptionType {
	/** Release version of this Process, included when a process version needs to be included for clarification about the process to be used. It is possible that a WPS supports a process with different versions due to reasons such as modifications of process algorithms.  Notice that this is the version identifier for the process, not the version of the WPS interface. The processVersion is informative only.  Version negotiation for processVersion is not available.  Requests to Execute a process do not include a processVersion identifier. */
	processVersion: string;
	/** Optional unordered list of application profiles to which this process complies. */
	Profile?: string[];
	/** Location of a WSDL document. */
	WSDL?: WPS_100_WSDLType;
}
export interface WPS_100_ProcessBriefType extends WPS_100__ProcessBriefType { constructor: { new(): WPS_100_ProcessBriefType }; }
export var WPS_100_ProcessBriefType: { new(): WPS_100_ProcessBriefType };

interface WPS_100__ProcessDescriptionsType extends WPS_100__ResponseBaseType {
	/** Ordered list of one or more full Process descriptions, listed in the order in which they were requested in the DescribeProcess operation request. */
	ProcessDescription: WPS_100_ProcessDescriptionType[];
}
interface WPS_100_ProcessDescriptionsType extends WPS_100__ProcessDescriptionsType { constructor: { new(): WPS_100_ProcessDescriptionsType }; }

/** Full description of a process. */
interface WPS_100__ProcessDescriptionType extends WPS_100__ProcessBriefType {
	/** Indicates if ongoing status information can be provided for this process.  If "true", the Status element of the stored Execute response document shall be kept up to date.  If "false" then the Status element shall not be updated until processing is complete. By default, status information is not provided for this process. */
	statusSupported?: boolean;
	/** Indicates if ComplexData outputs from this process can be stored by the WPS server as web-accessible resources. If "storeSupported" is "true", the Execute operation request may include "asReference" equals "true" for any complex output, directing that the output of the process be stored so that the client can retrieve it as required. By default for this process, storage is not supported and all outputs are returned encoded in the Execute response. */
	storeSupported?: boolean;
	/** List of the inputs to this process. In almost all cases, at least one process input is required. However, no process inputs may be identified when all the inputs are predetermined fixed resources.  In this case, those resources shall be identified in the ows:Abstract element that describes the process. */
	DataInputs?: WPS_100_ProcessDescriptionTypeDataInputsType;
	/** List of outputs which will or can result from executing the process. */
	ProcessOutputs: WPS_100_ProcessDescriptionTypeProcessOutputsType;
}
export interface WPS_100_ProcessDescriptionType extends WPS_100__ProcessDescriptionType { constructor: { new(): WPS_100_ProcessDescriptionType }; }
export var WPS_100_ProcessDescriptionType: { new(): WPS_100_ProcessDescriptionType };

interface WPS_100__ProcessDescriptionTypeDataInputsType extends WPS_100_BaseType {
	/** Unordered list of one or more descriptions of the inputs that can be accepted by this process, including all required and optional inputs.  Where an input is optional because a default value exists, that default value must be identified in the "ows:Abstract" element for that input, except in the case of LiteralData, where the default must be indicated in the corresponding ows:DefaultValue element. Where an input is optional because it depends on the value(s) of other inputs, this must be indicated in the ows:Abstract element for that input. */
	Input: WPS_100_InputDescriptionType[];
}
interface WPS_100_ProcessDescriptionTypeDataInputsType extends WPS_100__ProcessDescriptionTypeDataInputsType { constructor: { new(): WPS_100_ProcessDescriptionTypeDataInputsType }; }

interface WPS_100__ProcessDescriptionTypeProcessOutputsType extends WPS_100_BaseType {
	/** Unordered list of one or more descriptions of all the outputs that can result from executing this process. At least one output is required from each process. */
	Output: WPS_100_OutputDescriptionType[];
}
interface WPS_100_ProcessDescriptionTypeProcessOutputsType extends WPS_100__ProcessDescriptionTypeProcessOutputsType { constructor: { new(): WPS_100_ProcessDescriptionTypeProcessOutputsType }; }

/** Indicator that the process has failed to execute successfully. The reason for failure is given in the exception report. */
interface WPS_100__ProcessFailedType extends WPS_100_BaseType {
	/** Report message returned to the client that requested any OWS operation when the server detects an error while processing that operation request. */
	ExceptionReport: ows._ExceptionReportType;
}
export interface WPS_100_ProcessFailedType extends WPS_100__ProcessFailedType { constructor: { new(): WPS_100_ProcessFailedType }; }
export var WPS_100_ProcessFailedType: { new(): WPS_100_ProcessFailedType };

interface WPS_100__ProcessOfferingsType extends WPS_100_BaseType {
	/** Unordered list of one or more brief descriptions of all the processes offered by this WPS server. */
	Process: WPS_100_ProcessBriefType[];
}
interface WPS_100_ProcessOfferingsType extends WPS_100__ProcessOfferingsType { constructor: { new(): WPS_100_ProcessOfferingsType }; }

/** Indicates that this process has been has been accepted by the server, and processing has begun. */
interface WPS_100__ProcessStartedType extends Primitive._string {
	/** Percentage of process that has been completed, where 0 means the process has just started, and 99 means the process is almost complete.  This value is expected to be accurate to within ten percent. */
	percentCompleted?: number;
}
export interface WPS_100_ProcessStartedType extends WPS_100__ProcessStartedType { constructor: { new(): WPS_100_ProcessStartedType }; }
export var WPS_100_ProcessStartedType: { new(): WPS_100_ProcessStartedType };

type WPS_100_ProcessStartedTypePercentCompletedType = number;
type WPS_100__ProcessStartedTypePercentCompletedType = Primitive._number;

/** WPS operation request base, for all WPS operations except GetCapabilities. In this XML encoding, no "request" parameter is included, since the element name specifies the specific operation. */
interface WPS_100__RequestBaseType extends WPS_100_BaseType {
	/** RFC 4646 language code of the human-readable text (e.g. "en-CA"). */
	language: string;
	/** Service WPS_100_type identifier (WPS) */
	service: string;
	/** Version of the WPS interface specification implemented by the server (1.0.0) */
	version: string;
}
export interface WPS_100_RequestBaseType extends WPS_100__RequestBaseType { constructor: { new(): WPS_100_RequestBaseType }; }
export var WPS_100_RequestBaseType: { new(): WPS_100_RequestBaseType };

/** WPS operation response base, for all WPS operations except GetCapabilities. */
interface WPS_100__ResponseBaseType extends WPS_100_BaseType {
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
	/** Service type identifier (WPS) */
	service: string;
	/** Version of the WPS interface specification implemented by the server (1.0.0) */
	version: string;
}
export interface WPS_100_ResponseBaseType extends WPS_100__ResponseBaseType { constructor: { new(): WPS_100_ResponseBaseType }; }
export var WPS_100_ResponseBaseType: { new(): WPS_100_ResponseBaseType };

interface WPS_100__ResponseDocumentType extends WPS_100_BaseType {
	/** Indicates if the Execute operation response shall include the DataInputs and OutputDefinitions elements.  If lineage is "true" the server shall include in the execute response a complete copy of the DataInputs and OutputDefinition elements as received in the execute request.  If lineage is "false" then these elements shall be omitted from the response. */
	lineage?: boolean;
	/** Indicates if the stored execute response document shall be updated to provide ongoing reports on the status of execution.  If status is "true" and storeExecuteResponse is "true" (and the server has indicated that both storeSupported and statusSupported are "true")  then the Status element of the execute response document stored at executeResponseLocation is kept up to date by the process.  While the execute response contains ProcessAccepted, ProcessStarted, or ProcessPaused, updates shall be made to the executeResponse document until either the process completes successfully (in which case ProcessSucceeded is populated), or the process fails (in which case ProcessFailed is populated).  If status is "false" then the Status element shall not be updated until the process either completes successfully or fails.  If status="true" and storeExecuteResponse is "false" then the service shall raise an exception. */
	status: boolean;
	/** Indicates if the execute response document shall be stored.  If "true" then the executeResponseLocation attribute in the execute response becomes mandatory, which will point to the location where the executeResponseDocument is stored.  The service shall respond immediately to the request and return an executeResponseDocument containing the executeResponseLocation and the status element which has five possible subelements (choice):ProcessAccepted, ProcessStarted, ProcessPaused, ProcessFailed and ProcessSucceeded, which are chosen and populated as follows:   1) If the process is completed when the initial executeResponseDocument is returned, the element ProcessSucceeded is populated with the process results.  2) If the process already failed when the initial executeResponseDocument is returned, the element ProcessFailed is populated with the Exception.  3) If the process has been paused when the initial executeResponseDocument is returned, the element ProcessPaused is populated.  4) If the process has been accepted when the initial executeResponseDocument is returned, the element ProcessAccepted is populated, including percentage information. 5) If the process execution is ongoing when the initial executeResponseDocument is returned, the element ProcessStarted is populated.  In case 3, 4, and 5, if status updating is requested, updates are made to the executeResponseDocument at the executeResponseLocation until either the process completes successfully or fails.  Regardless, once the process completes successfully, the ProcessSucceeded element is populated, and if it fails, the ProcessFailed element is populated.Specifies if the Execute operation response shall be returned quickly with status information, or not returned until process execution is complete. This parameter shall not be included unless the corresponding "statusSupported" parameter is included and is "true" in the ProcessDescription for this process. */
	storeExecuteResponse?: boolean;
	/** Unordered list of definitions of the outputs (or parameters) requested from the process. These outputs are not normally identified, unless the client is specifically requesting a limited subset of outputs, and/or is requesting output formats and/or schemas and/or encodings different from the defaults and selected from the alternatives identified in the process description, or wishes to customize the descriptive information about the output. */
	Output: WPS_100_DocumentOutputDefinitionType[];
}
export interface WPS_100_ResponseDocumentType extends WPS_100__ResponseDocumentType { constructor: { new(): WPS_100_ResponseDocumentType }; }
export var WPS_100_ResponseDocumentType: { new(): WPS_100_ResponseDocumentType };

/** Defines the response WPS_100_type of the WPS, either raw data or XML document */
interface WPS_100__ResponseFormType extends WPS_100_BaseType {
	/** Indicates that the output shall be returned directly as raw data, without a WPS response document. */
	RawDataOutput: WPS_100_OutputDefinitionType;
	/** Indicates that the outputs shall be returned as part of a WPS response document. */
	ResponseDocument: WPS_100_ResponseDocumentType;
}
export interface WPS_100_ResponseFormType extends WPS_100__ResponseFormType { constructor: { new(): WPS_100_ResponseFormType }; }
export var WPS_100_ResponseFormType: { new(): WPS_100_ResponseFormType };

/** Description of the status of process execution. */
interface WPS_100__StatusType extends WPS_100_BaseType {
	/** The time (UTC) that the process finished.  If the process is still executing or awaiting execution, this element shall contain the creation time of this document. */
	creationTime: Date;
	/** Indicates that this process has been accepted by the server, but is in a queue and has not yet started to execute. The contents of this human-readable text string is left open to definition by each server implementation, but is expected to include any messages the server may wish to let the clients know. Such information could include how long the queue is, or any warning conditions that may have been encountered. The client may display this text to a human user. */
	ProcessAccepted: string;
	/** Indicates that execution of this process has failed, and includes error information. */
	ProcessFailed: WPS_100_ProcessFailedType;
	/** Indicates that this process has been  accepted by the server, and processing has started but subsequently been paused by the server. */
	ProcessPaused: WPS_100_ProcessStartedType;
	/** Indicates that this process has been accepted by the server, and processing has begun. */
	ProcessStarted: WPS_100_ProcessStartedType;
	/** Indicates that this process has successfully completed execution. The contents of this human-readable text string is left open to definition by each server, but is expected to include any messages the server may wish to let the clients know, such as how long the process took to execute, or any warning conditions that may have been encountered. The client may display this text string to a human user. The client should make use of the presence of this element to trigger automated or manual access to the results of the process. If manual access is intended, the client should use the presence of this element to present the results as downloadable links to the user. */
	ProcessSucceeded: string;
}
export interface WPS_100_StatusType extends WPS_100__StatusType { constructor: { new(): WPS_100_StatusType }; }
export var WPS_100_StatusType: { new(): WPS_100_StatusType };

interface WPS_100__SupportedComplexDataInputType extends WPS_100__SupportedComplexDataType {
	/** The maximum file size, in megabytes, of this input.  If the input exceeds this size, the server will return an error instead of processing the inputs. */
	maximumMegabytes?: number;
}
export interface WPS_100_SupportedComplexDataInputType extends WPS_100__SupportedComplexDataInputType { constructor: { new(): WPS_100_SupportedComplexDataInputType }; }
export var WPS_100_SupportedComplexDataInputType: { new(): WPS_100_SupportedComplexDataInputType };

/** Formats, encodings, and schemas supported by a process input or output. */
interface WPS_100__SupportedComplexDataType extends WPS_100_BaseType {
	/** Identifies the default combination of Format, Encoding, and Schema supported for this Input/Output. The process shall expect input in or produce output in this combination of WPS_100_MimeType/Encoding/Schema unless the Execute request specifies otherwise. */
	Default: WPS_100_ComplexDataCombinationType;
	/** Unordered list of combinations of format, encoding, and schema supported for this Input/Output. This element shall be repeated for each combination of WPS_100_MimeType/Encoding/Schema that is supported for this Input/Output. This list shall include the default WPS_100_MimeType/Encoding/Schema. */
	Supported: WPS_100_ComplexDataCombinationsType;
}
export interface WPS_100_SupportedComplexDataType extends WPS_100__SupportedComplexDataType { constructor: { new(): WPS_100_SupportedComplexDataType }; }
export var WPS_100_SupportedComplexDataType: { new(): WPS_100_SupportedComplexDataType };

/** Listing of the Coordinate Reference System (CRS) support for this process input or output. */
interface WPS_100__SupportedCRSsType extends WPS_100_BaseType {
	/** Identifies the default CRS that will be used unless the Execute operation request specifies another supported CRS. */
	Default: WPS_100_SupportedCRSsTypeDefaultType;
	/** Unordered list of references to all of the CRSs supported for this Input/Output. The default CRS shall be included in this list. */
	Supported: WPS_100_CRSsType;
}
export interface WPS_100_SupportedCRSsType extends WPS_100__SupportedCRSsType { constructor: { new(): WPS_100_SupportedCRSsType }; }
export var WPS_100_SupportedCRSsType: { new(): WPS_100_SupportedCRSsType };

interface WPS_100__SupportedCRSsTypeDefaultType extends WPS_100_BaseType {
	/** Reference to the default CRS supported for this Input/Output */
	CRS: string;
}
interface WPS_100_SupportedCRSsTypeDefaultType extends WPS_100__SupportedCRSsTypeDefaultType { constructor: { new(): WPS_100_SupportedCRSsTypeDefaultType }; }

/** Listing of the Unit of Measure (U0M) support for this process input or output. */
interface WPS_100__SupportedUOMsType extends WPS_100_BaseType {
	/** Reference to the default UOM supported for this input or output, if UoM is applicable. The process shall expect input in or produce output in this UOM unless the Execute request specifies another supported UOM. */
	Default: WPS_100_SupportedUOMsTypeDefaultType;
	/** Unordered list of references to all of the UOMs supported for this input or output, if UOM is applicable. The default UOM shall be included in this list. */
	Supported: WPS_100_UOMsType;
}
export interface WPS_100_SupportedUOMsType extends WPS_100__SupportedUOMsType { constructor: { new(): WPS_100_SupportedUOMsType }; }
export var WPS_100_SupportedUOMsType: { new(): WPS_100_SupportedUOMsType };

interface WPS_100__SupportedUOMsTypeDefaultType extends WPS_100_BaseType {
	/** Definition of the unit of measure of this set of values. In this case, the xlink:href attribute can reference a URN for a well-known unit of measure (uom). For example, such a URN could be a UOM identification URN defined in the "ogc" URN namespace. */
	UOM: ows._DomainMetadataType;
}
interface WPS_100_SupportedUOMsTypeDefaultType extends WPS_100__SupportedUOMsTypeDefaultType { constructor: { new(): WPS_100_SupportedUOMsTypeDefaultType }; }

/** Identifies a UOM supported for this input or output. */
interface WPS_100__UOMsType extends WPS_100_BaseType {
	/** Definition of the unit of measure of this set of values. In this case, the xlink:href attribute can reference a URN for a well-known unit of measure (uom). For example, such a URN could be a UOM identification URN defined in the "ogc" URN namespace. */
	UOM: ows._DomainMetadataType[];
}
export interface WPS_100_UOMsType extends WPS_100__UOMsType { constructor: { new(): WPS_100_UOMsType }; }
export var WPS_100_UOMsType: { new(): WPS_100_UOMsType };

/** References an externally defined finite set of values and ranges for this input. */
interface WPS_100__ValuesReferenceType extends WPS_100_BaseType {
	/** Reference to data or metadata recorded elsewhere, either external to this XML document or within it. Whenever practical, this attribute should be a URL from which this metadata can be electronically retrieved. Alternately, this attribute can reference a URN for well-known metadata. For example, such a URN could be a URN defined in the "ogc" URN namespace. */
	reference: string;
	/** Reference to a description of the WPS_100_mimetype, encoding, and schema used for this set of values and ranges. */
	valuesForm: string;
}
export interface WPS_100_ValuesReferenceType extends WPS_100__ValuesReferenceType { constructor: { new(): WPS_100_ValuesReferenceType }; }
export var WPS_100_ValuesReferenceType: { new(): WPS_100_ValuesReferenceType };

interface WPS_100__WPSCapabilitiesType extends ows._CapabilitiesBaseType {
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
	/** Listing of the default and other languages supported by this service. */
	Languages: LanguagesType_2;
	/** List of brief descriptions of the processes offered by this WPS server. */
	ProcessOfferings: WPS_100_ProcessOfferingsType;
	/** Location of a WSDL document. */
	WSDL?: WPS_100_WSDLType;
}
export interface WPS_100_WPSCapabilitiesType extends WPS_100__WPSCapabilitiesType { constructor: { new(): WPS_100_WPSCapabilitiesType }; }
export var WPS_100_WPSCapabilitiesType: { new(): WPS_100_WPSCapabilitiesType };

interface WPS_100__WSDLType extends WPS_100_BaseType {
	href: string;
}
interface WPS_100_WSDLType extends WPS_100__WSDLType { constructor: { new(): WPS_100_WSDLType }; }

export interface WPS_100_document extends WPS_100_BaseType {
	/** WPS GetCapabilities operation response. This document provides clients with service metadata about a specific service instance, including metadata about the processes that can be executed. Since the server does not implement the updateSequence and Sections parameters, the server shall always return the complete Capabilities document, without the updateSequence parameter. */
	Capabilities: WPS_100_WPSCapabilitiesType;
	/** WPS DescribeProcess operation request. */
	DescribeProcess: WPS_100_DescribeProcessType;
	/** WPS Execute operation request, to execute one identified Process. If a process is to be run multiple times, each run shall be submitted as a separate Execute request. */
	Execute: WPS_100_ExecuteType;
	/** WPS Execute operation response. By default, this XML document is delivered to the client in response to an Execute request. If "status" is "false" in the Execute operation request, this document is normally returned when process execution has been completed.
	  * If "status" in the Execute request is "true", this response shall be returned as soon as the Execute request has been accepted for processing. In this case, the same XML document is also made available as a web-accessible resource from the URL identified in the statusLocation, and the WPS server shall repopulate it once the process has completed. It may repopulate it on an ongoing basis while the process is executing.
	  * However, the response to an Execute request will not include this element in the special case where the output is a single complex value result and the Execute request indicates that "store" is "false". Instead, the server shall return the complex result (e.g., GIF image or GML) directly, without encoding it in the ExecuteResponse. If processing fails in this special case, the normal ExecuteResponse shall be sent, with the error condition indicated. This option is provided to simplify the programming required for simple clients and for service chaining. */
	ExecuteResponse: WPS_100_ExecuteResponseType;
	GetCapabilities: WPS_100_GetCapabilitiesType;
	/** Listing of the default and other languages supported by this service. */
	Languages: LanguagesType_2;
	/** WPS DescribeProcess operation response. */
	ProcessDescriptions: WPS_100_ProcessDescriptionsType;
	/** List of brief descriptions of the processes offered by this WPS server. */
	ProcessOfferings: WPS_100_ProcessOfferingsType;
	/** Location of a WSDL document. */
	WSDL: WPS_100_WSDLType;
}
//export var document: WPS_100_document;
