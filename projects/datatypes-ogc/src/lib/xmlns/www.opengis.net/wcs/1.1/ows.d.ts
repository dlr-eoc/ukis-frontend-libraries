import * as Primitive from '../../../xml-primitives';
import * as ows from '../../ows';
import * as xlink from '../../../www.w3.org/1999/xlink';

// Source files:
// http://schemas.opengis.net/wcs/1.1.0/owcsAll.xsd
// http://schemas.opengis.net/wcs/1.1.0/owsCoverages.xsd
// http://schemas.opengis.net/wcs/1.1.0/owsDataIdentification.xsd
// http://schemas.opengis.net/wcs/1.1.0/owsDomainType.xsd
// http://schemas.opengis.net/wcs/1.1.0/owsGetCapabilities.xsd
// http://schemas.opengis.net/wcs/1.1.0/owsInterpolationMethod.xsd
// http://schemas.opengis.net/wcs/1.1.0/owsManifest.xsd
// http://schemas.opengis.net/wcs/1.1.0/owsOperationsMetadata.xsd
// http://schemas.opengis.net/wcs/1.1.0/owsServiceIdentification.xsd


interface BaseType {
	_exists: boolean;
	_namespace: string;
}
interface _AbstractReferenceBaseProxyType extends _ReferenceProxyType {}
interface AbstractReferenceBaseProxyType extends _AbstractReferenceBaseProxyType { constructor: { new(): AbstractReferenceBaseProxyType }; }

/** Base for a reference to a remote or local resource. This type contains only a restricted and annotated set of the attributes from the xlink:simpleAttrs attributeGroup. */
interface _AbstractReferenceBaseType extends BaseType {
	actuate?: xlink.actuateType;
	arcrole?: string;
	href: string;
	role?: string;
	show?: xlink.showType;
	title?: string;
	type: string;
}
export interface AbstractReferenceBaseType extends _AbstractReferenceBaseType { constructor: { new(): AbstractReferenceBaseType }; }
export var AbstractReferenceBaseType: { new(): AbstractReferenceBaseType };

/** Prioritized sequence of zero or more GetCapabilities operation response formats desired by client, with preferred formats listed first. Each response format shall be identified by its MIME type. See AcceptFormats parameter use subclause for more information. */
interface _AcceptFormatsType extends BaseType {
	OutputFormat?: string[];
}
export interface AcceptFormatsType extends _AcceptFormatsType { constructor: { new(): AcceptFormatsType }; }
export var AcceptFormatsType: { new(): AcceptFormatsType };

/** Prioritized sequence of one or more specification versions accepted by client, with preferred versions listed first. See Version negotiation subclause for more information. */
interface _AcceptVersionsType extends BaseType {
	Version: string[];
}
export interface AcceptVersionsType extends _AcceptVersionsType { constructor: { new(): AcceptVersionsType }; }
export var AcceptVersionsType: { new(): AcceptVersionsType };

interface _AllowedValuesType extends BaseType {
	Range: RangeType[];
	Value: string[];
}
interface AllowedValuesType extends _AllowedValuesType { constructor: { new(): AllowedValuesType }; }

interface _AnyValueType extends BaseType {}
interface AnyValueType extends _AnyValueType { constructor: { new(): AnyValueType }; }

interface _AvailableCRSProxyType extends BaseType {
	AvailableCRS?: string;
	/** Coordinate reference system in which data from this data(set) or resource is available or supported. More specific parameter names should be used by specific OWS specifications wherever applicable. More than one such parameter can be included for different purposes. */
	SupportedCRS?: string;
}
interface AvailableCRSProxyType extends _AvailableCRSProxyType { constructor: { new(): AvailableCRSProxyType }; }

/** Basic metadata identifying and describing a set of data. */
interface _BasicIdentificationType extends _DescriptionType {
	/** Unique identifier or name of this dataset. */
	Identifier?: ows.CodeType;
	Metadata?: ows.MetadataType[];
}
export interface BasicIdentificationType extends _BasicIdentificationType { constructor: { new(): BasicIdentificationType }; }
export var BasicIdentificationType: { new(): BasicIdentificationType };

/** XML encoded GetCapabilities operation response. This document provides clients with service metadata about a specific service instance, usually including metadata about the tightly-coupled data served. If the server does not implement the updateSequence parameter, the server shall always return the Capabilities document, without the updateSequence parameter. When the server implements the updateSequence parameter and the GetCapabilities operation request included the updateSequence parameter with the current value, the server shall return this element with only the "version" and "updateSequence" attributes. Otherwise, all optional sections shall be included or not depending on the actual value of the Contents parameter in the GetCapabilities operation request. This base type shall be extended by each specific OWS to include the additional contents needed. */
interface _CapabilitiesBaseType extends BaseType {
	updateSequence?: string;
	version: string;
	/** Metadata about the operations and related abilities specified by this service and implemented by this server, including the URLs for operation requests. The basic contents of this section shall be the same for all OWS types, but individual services can add elements and/or change the optionality of optional elements. */
	OperationsMetadata?: OperationsMetadataType;
	/** General metadata for this specific server. This XML Schema of this section shall be the same for all OWS. */
	ServiceIdentification?: ServiceIdentificationType;
	/** Metadata about the organization that provides this specific service instance or server. */
	ServiceProvider?: ows.ServiceProviderType;
}
export interface CapabilitiesBaseType extends _CapabilitiesBaseType { constructor: { new(): CapabilitiesBaseType }; }
export var CapabilitiesBaseType: { new(): CapabilitiesBaseType };

/** Group of coverages that can be used as the response from the WCS GetCoverage operation, allowing each coverage to include or reference multiple files. This CoverageGroup element may also be used for outputs from, or inputs to, other OWS operations. This element is specified for use where the ManifestType contents are needed for an operation response or request that contains a group of one or more coverages, and the Manifest element name and contents are not considered to be specific enough. */
interface _CoveragesType extends _ManifestType {
	/** Complete data for one coverage, referencing each coverage file either remotely or locallly in the same message. */
	Coverage: ReferenceGroupType[];
}
export interface CoveragesType extends _CoveragesType { constructor: { new(): CoveragesType }; }
export var CoveragesType: { new(): CoveragesType };

interface _DCPType extends BaseType {
	/** Connect point URLs for the HTTP Distributed Computing Platform (DCP). Normally, only one Get and/or one Post is included in this element. More than one Get and/or Post is allowed to support including alternative URLs for uses such as load balancing or backup. */
	HTTP: HTTPType;
}
interface DCPType extends _DCPType { constructor: { new(): DCPType }; }

/** Human-readable descriptive information for the object it is included within.
  * This type shall be extended if needed for specific OWS use to include additional metadata for each type of information. This type shall not be restricted for a specific OWS to change the multiplicity (or optionality) of some elements. */
interface _DescriptionType extends BaseType {
	/** Brief narrative description of this resource, normally used for display to a human. */
	Abstract?: string;
	Keywords?: ows.KeywordsType[];
	/** Title of this resource, normally used for display to a human. */
	Title?: string;
}
export interface DescriptionType extends _DescriptionType { constructor: { new(): DescriptionType }; }
export var DescriptionType: { new(): DescriptionType };

/** References metadata about a quantity, and provides a name for this metadata. (Informative: This element was simplified from the metaDataProperty element in GML 3.0.) */
interface _DomainMetadataType extends Primitive._string {
	/** Reference to data or metadata recorded elsewhere, either external to this XML document or within it. Whenever practical, this attribute should be a URL from which this metadata can be electronically retrieved. Alternately, this attribute can reference a URN for well-known metadata. For example, such a URN could be a URN defined in the "ogc" URN namespace. */
	reference?: string;
}
export interface DomainMetadataType extends _DomainMetadataType { constructor: { new(): DomainMetadataType }; }
export var DomainMetadataType: { new(): DomainMetadataType };

/** Valid domain (or allowed set of values) of one quantity, with its name or identifier. */
interface _DomainType extends _UnNamedDomainType {
	/** Name or identifier of this quantity. */
	name: string;
}
export interface DomainType extends _DomainType { constructor: { new(): DomainType }; }
export var DomainType: { new(): DomainType };

/** XML encoded GetCapabilities operation request. This operation allows clients to retrieve service metadata about a specific service instance. In this XML encoding, no "request" parameter is included, since the element name specifies the specific operation. This base type shall be extended by each specific OWS to include the additional required "service" attribute, with the correct value for that OWS. */
interface _GetCapabilitiesType extends BaseType {
	/** When omitted or not supported by server, server shall return latest complete service metadata document. */
	updateSequence?: string;
	/** When omitted or not supported by server, server shall return service metadata document using the MIME type "text/xml". */
	AcceptFormats?: AcceptFormatsType;
	/** When omitted, server shall return latest supported version. */
	AcceptVersions?: AcceptVersionsType;
	/** When omitted or not supported by server, server shall return complete service metadata (Capabilities) document. */
	Sections?: SectionsType;
}
export interface GetCapabilitiesType extends _GetCapabilitiesType { constructor: { new(): GetCapabilitiesType }; }
export var GetCapabilitiesType: { new(): GetCapabilitiesType };

interface _HTTPType extends BaseType {
	/** Connect point URL prefix and any constraints for the HTTP "Get" request method for this operation request. */
	Get: RequestMethodType[];
	/** Connect point URL and any constraints for the HTTP "Post" request method for this operation request. */
	Post: RequestMethodType[];
}
interface HTTPType extends _HTTPType { constructor: { new(): HTTPType }; }

/** Extended metadata identifying and describing a set of data. This type shall be extended if needed for each specific OWS to include additional metadata for each type of dataset. If needed, this type should first be restricted for each specific OWS to change the multiplicity (or optionality) of some elements. */
interface _IdentificationType extends _BasicIdentificationType {
	AvailableCRS?: AvailableCRSProxyType[];
	BoundingBox?: ows.BoundingBoxProxyType[];
	/** Reference to a format in which this data can be encoded and transferred. More specific parameter names should be used by specific OWS specifications wherever applicable. More than one such parameter can be included for different purposes. */
	OutputFormat?: string[];
}
export interface IdentificationType extends _IdentificationType { constructor: { new(): IdentificationType }; }
export var IdentificationType: { new(): IdentificationType };

/** Identifier of an interpolation method applicable to continuous grid coverages. The string in this type shall be one interpolation type identifier string, selected from the referenced dictionary. Adapts gml:CodeWithAuthorityType from GML 3.2 for this WCS purpose, allowing the codeSpace to be omitted but providing a default value for the standard interpolation methods defined in Annex C of ISO 19123: Geographic information - Schema for coverage geometry and functions. */
interface _InterpolationMethodBaseType extends ows._CodeType {
	/** Reference to a dictionary that specifies allowed values for interpolation method identifier strings and nullResistance identifier strings. This reference defaults to the standard interpolation methods dictionary specified in WCS 1.1.0. */
	codeSpace?: string;
}
export interface InterpolationMethodBaseType extends _InterpolationMethodBaseType { constructor: { new(): InterpolationMethodBaseType }; }
export var InterpolationMethodBaseType: { new(): InterpolationMethodBaseType };

interface _InterpolationMethodsType extends BaseType {
	/** Spatial interpolation method used when client doesn’t specify one. This default interpolation method should be the recommended or normal method for this coverage range field. */
	DefaultMethod: InterpolationMethodType;
	/** Unordered list of identifiers of other spatial interpolation methods that server can apply to this range field. When the default interpolation method is “none”, no other methods should be listed. */
	OtherMethod?: InterpolationMethodType[];
}
export interface InterpolationMethodsType extends _InterpolationMethodsType { constructor: { new(): InterpolationMethodsType }; }
export var InterpolationMethodsType: { new(): InterpolationMethodsType };

/** Identifier of a spatial interpolation method applicable to continuous grid coverages, plus the optional "null Resistance" parameter. */
interface _InterpolationMethodType extends _InterpolationMethodBaseType {
	/** Identifier of how the server handles null values when spatially interpolating values in this field using this interpolation method. This identifier shall be selected from the referenced dictionary. This parameter shall be omitted when the rule for handling nulls is unknown. */
	nullResistance?: string;
}
export interface InterpolationMethodType extends _InterpolationMethodType { constructor: { new(): InterpolationMethodType }; }
export var InterpolationMethodType: { new(): InterpolationMethodType };

interface _ManifestProxyType extends BaseType {
	Manifest?: ManifestType;
	Coverages?: CoveragesType;
}
interface ManifestProxyType extends _ManifestProxyType { constructor: { new(): ManifestProxyType }; }

/** Unordered list of one or more groups of references to remote and/or local resources. */
interface _ManifestType extends _BasicIdentificationType {
	ReferenceGroup: ReferenceGroupProxyType[];
}
export interface ManifestType extends _ManifestType { constructor: { new(): ManifestType }; }
export var ManifestType: { new(): ManifestType };

interface _NoValuesType extends BaseType {}
interface NoValuesType extends _NoValuesType { constructor: { new(): NoValuesType }; }

interface _OperationsMetadataType extends BaseType {
	/** Optional unordered list of valid domain constraints on non-parameter quantities that each apply to this server. The list of required and optional constraints shall be specified in the Implementation Specification for this service. */
	Constraint?: DomainType[];
	/** Individual software vendors and servers can use this element to provide metadata about any additional server abilities. */
	ExtendedCapabilities?: any;
	/** Metadata for one operation that this server implements. */
	Operation: OperationType[];
	/** Optional unordered list of parameter valid domains that each apply to one or more operations which this server interface implements. The list of required and optional parameter domain limitations shall be specified in the Implementation Specification for this service. */
	Parameter?: DomainType[];
}
interface OperationsMetadataType extends _OperationsMetadataType { constructor: { new(): OperationsMetadataType }; }

interface _OperationType extends BaseType {
	/** Name or identifier of this operation (request) (for example, GetCapabilities). The list of required and optional operations implemented shall be specified in the Implementation Specification for this service. */
	name: string;
	/** Optional unordered list of valid domain constraints on non-parameter quantities that each apply to this operation. If one of these Constraint elements has the same "name" attribute as a Constraint element in the OperationsMetadata element, this Constraint element shall override the other one for this operation. The list of required and optional constraints for this operation shall be specified in the Implementation Specification for this service. */
	Constraint?: DomainType[];
	/** Information for one distributed Computing Platform (DCP) supported for this operation. At present, only the HTTP DCP is defined, so this element only includes the HTTP element. */
	DCP: DCPType[];
	Metadata?: ows.MetadataType[];
	/** Optional unordered list of parameter domains that each apply to this operation which this server implements. If one of these Parameter elements has the same "name" attribute as a Parameter element in the OperationsMetadata element, this Parameter element shall override the other one for this operation. The list of required and optional parameter domain limitations for this operation shall be specified in the Implementation Specification for this service. */
	Parameter?: DomainType[];
}
interface OperationType extends _OperationType { constructor: { new(): OperationType }; }

type RangeClosureType = ("closed" | "open" | "open-closed" | "closed-open");
interface _RangeClosureType extends Primitive._string { content: RangeClosureType; }

/** A range of values of a numeric quantity. This range can be continuous or discrete, defined by a fixed spacing between adjacent valid values. If the MinimumValue or MaximumValue is not included, there is no value limit in that direction. Inclusion of the specified minimum and maximum values in the range shall be defined by the rangeClosure. */
interface _RangeType extends BaseType {
	/** Specifies which of the minimum and maximum values are included in the range. Note that plus and minus infinity are considered closed bounds. */
	rangeClosure?: RangeClosureType;
	/** Maximum value of this numeric quantity. */
	MaximumValue?: string;
	/** Minimum value of this numeric quantity. */
	MinimumValue?: string;
	/** The regular distance or spacing between the allowed values in a range. */
	Spacing?: string;
}
export interface RangeType extends _RangeType { constructor: { new(): RangeType }; }
export var RangeType: { new(): RangeType };

interface _ReferenceGroupProxyType extends BaseType {
	ReferenceGroup?: ReferenceGroupType;
	/** Complete data for one coverage, referencing each coverage file either remotely or locallly in the same message. */
	Coverage?: ReferenceGroupType;
}
interface ReferenceGroupProxyType extends _ReferenceGroupProxyType { constructor: { new(): ReferenceGroupProxyType }; }

/** Logical group of one or more references to remote and/or local resources, allowing including metadata about that group. A Group can be used instead of a Manifest that can only contain one group. */
interface _ReferenceGroupType extends _BasicIdentificationType {
	AbstractReferenceBase: AbstractReferenceBaseProxyType[];
}
export interface ReferenceGroupType extends _ReferenceGroupType { constructor: { new(): ReferenceGroupType }; }
export var ReferenceGroupType: { new(): ReferenceGroupType };

interface _ReferenceProxyType extends BaseType {
	Reference?: ReferenceType;
	ServiceReference?: ServiceReferenceType;
}
interface ReferenceProxyType extends _ReferenceProxyType { constructor: { new(): ReferenceProxyType }; }

/** Complete reference to a remote or local resource, allowing including metadata about that resource. */
interface _ReferenceType extends _AbstractReferenceBaseType {
	/** Brief narrative description of this resource, normally used for display to a human. */
	Abstract?: string;
	/** The format of the referenced resource. This element is omitted when the mime type is indicated in the http header of the reference. */
	Format?: string;
	/** Unique identifier or name of this dataset. */
	Identifier?: ows.CodeType;
	Metadata?: ows.MetadataType[];
}
export interface ReferenceType extends _ReferenceType { constructor: { new(): ReferenceType }; }
export var ReferenceType: { new(): ReferenceType };

/** Connect point URL and any constraints for this HTTP request method for this operation request. In the OnlineResourceType, the xlink:href attribute in the xlink:simpleAttrs attribute group shall be used to contain this URL. The other attributes in the xlink:simpleAttrs attribute group should not be used. */
interface _RequestMethodType extends ows._OnlineResourceType {
	/** Optional unordered list of valid domain constraints on non-parameter quantities that each apply to this request method for this operation. If one of these Constraint elements has the same "name" attribute as a Constraint element in the OperationsMetadata or Operation element, this Constraint element shall override the other one for this operation. The list of required and optional constraints for this request method for this operation shall be specified in the Implementation Specification for this service. */
	Constraint?: DomainType[];
}
export interface RequestMethodType extends _RequestMethodType { constructor: { new(): RequestMethodType }; }
export var RequestMethodType: { new(): RequestMethodType };

/** Unordered list of zero or more names of requested sections in complete service metadata document. Each Section value shall contain an allowed section name as specified by each OWS specification. See Sections parameter subclause for more information. */
interface _SectionsType extends BaseType {
	Section?: string[];
}
export interface SectionsType extends _SectionsType { constructor: { new(): SectionsType }; }
export var SectionsType: { new(): SectionsType };

interface _ServiceIdentificationType extends _DescriptionType {
	/** Access constraint applied to assure the protection of privacy or intellectual property, or any other restrictions on retrieving or using data from or otherwise using this server. The reserved value NONE (case insensitive) shall be used to mean no access constraints are imposed. */
	AccessConstraints?: string[];
	/** Fees and terms for retrieving data from or otherwise using this server, including the monetary units as specified in ISO 4217. The reserved value NONE (case insensitive) shall be used to mean no fees or terms. */
	Fees?: string;
	/** Unordered list of identifiers of Application Profiles that are implemented by this server. This element should be included for each specified application profile implemented by this server. The identifier value should be specified by each Application Profile. If this element is omitted, no meaning is implied. */
	Profile?: string[];
	/** A service type name from a registry of services. For example, the values of the codeSpace URI and name and code string may be "OGC" and "catalogue." This type name is normally used for machine-to-machine communication. */
	ServiceType: ows.CodeType;
	/** Unordered list of one or more versions of this service type implemented by this server. This information is not adequate for version negotiation, and shall not be used for that purpose. */
	ServiceTypeVersion: string[];
}
interface ServiceIdentificationType extends _ServiceIdentificationType { constructor: { new(): ServiceIdentificationType }; }

/** Complete reference to a remote resource that needs to be retrieved from an OWS using an XML-encoded operation request. This element shall be used, within an Coverage element that is used for input data, when that input data needs to be retrieved from another web service using a XML-encoded OWS operation request. This element shall not be used for local payload input data or for requesting the resource from a web server using HTTP Get. */
interface _ServiceReferenceType extends _ReferenceType {
	/** The XML-encoded operation request message to be sent to request this input data from another web server using HTTP Post. */
	RequestMessage: any;
	/** Reference to the XML-encoded operation request message to be sent to request this input data from another web server using HTTP Post. The referenced message shall be attached to the same message (using the cid scheme), or be accessible using a URL. */
	RequestMessageReference: string;
}
export interface ServiceReferenceType extends _ServiceReferenceType { constructor: { new(): ServiceReferenceType }; }
export var ServiceReferenceType: { new(): ServiceReferenceType };

/** Service type identifier, where the string value is the OWS type abbreviation, such as "WMS" or "WFS". */
export type ServiceType = string;
type _ServiceType = Primitive._string;

/** Valid domain (or allowed set of values) of one quantity, with needed metadata but without a quantity name or identifier. */
interface _UnNamedDomainType extends BaseType {
	/** List of all the valid values and/or ranges of values for this quantity. For numeric quantities, signed values shall be ordered from negative infinity to positive infinity. */
	AllowedValues: AllowedValuesType;
	/** Specifies that any value is allowed for this quantity. */
	AnyValue: AnyValueType;
	/** Reference to the data type of this value or set of values. In this case, the '"reference" attribute can reference a URN for a well-known data type. For example, such a URN could be a data type identification URN defined in the "ogc" URN namespace. */
	DataType?: DomainMetadataType;
	/** The default value for a quantity for which multiple values are allowed. */
	DefaultValue?: string;
	/** Reference to the meaning or semantics of this value or set of values. */
	Meaning?: DomainMetadataType;
	Metadata?: ows.MetadataType[];
	/** Specifies that no values are allowed for this quantity. */
	NoValues: NoValuesType;
	/** Reference to the reference system used by this set of values, including the unit of measure whenever applicable (as is normal). In this case, the '"reference" attribute can reference a URN for a well-known reference system, such as for a coordinate reference system (CRS). For example, such a URN could be a CRS identification URN defined in the "ogc" URN namespace. */
	ReferenceSystem?: DomainMetadataType;
	/** Reference to the unit of measure of this value or set of values. In this case, the '"reference" attribute can reference a URN for a well-known unit of measure (uom). For example, such a URN could be a UOM identification URN defined in the "ogc" URN namespace. */
	UOM?: DomainMetadataType;
	/** Reference to externally specified list of all the valid values and/or ranges of values for this quantity. (Informative: This element was simplified from the metaDataProperty element in GML 3.0.) */
	ValuesReference: ValuesReferenceType;
}
export interface UnNamedDomainType extends _UnNamedDomainType { constructor: { new(): UnNamedDomainType }; }
export var UnNamedDomainType: { new(): UnNamedDomainType };

/** Service metadata document version, having values that are "increased" whenever any change is made in service metadata document. Values are selected by each server, and are always opaque to clients. See updateSequence parameter use subclause for more information. */
export type UpdateSequenceType = string;
type _UpdateSequenceType = Primitive._string;

interface _ValuesReferenceType extends Primitive._string {
	/** Reference to data or metadata recorded elsewhere, either external to this XML document or within it. Whenever practical, this attribute should be a URL from which this metadata can be electronically retrieved. Alternately, this attribute can reference a URN for well-known metadata. For example, such a URN could be a URN defined in the "ogc" URN namespace. */
	reference: string;
}
interface ValuesReferenceType extends _ValuesReferenceType { constructor: { new(): ValuesReferenceType }; }

/** A single value, encoded as a string. This type can be used for one value, for a spacing between allowed values, or for the default value of a quantity. */
export type ValueType = string;
type _ValueType = Primitive._string;

export interface document extends BaseType {
	/** Access constraint applied to assure the protection of privacy or intellectual property, or any other restrictions on retrieving or using data from or otherwise using this server. The reserved value NONE (case insensitive) shall be used to mean no access constraints are imposed. */
	AccessConstraints: string;
	/** List of all the valid values and/or ranges of values for this quantity. For numeric quantities, signed values shall be ordered from negative infinity to positive infinity. */
	AllowedValues: AllowedValuesType;
	/** Specifies that any value is allowed for this quantity. */
	AnyValue: AnyValueType;
	/** Complete data for one coverage, referencing each coverage file either remotely or locallly in the same message. */
	Coverage: ReferenceGroupType;
	Coverages: CoveragesType;
	/** Reference to the data type of this value or set of values. In this case, the '"reference" attribute can reference a URN for a well-known data type. For example, such a URN could be a data type identification URN defined in the "ogc" URN namespace. */
	DataType: DomainMetadataType;
	/** Information for one distributed Computing Platform (DCP) supported for this operation. At present, only the HTTP DCP is defined, so this element only includes the HTTP element. */
	DCP: DCPType;
	/** The default value for a quantity for which multiple values are allowed. */
	DefaultValue: string;
	/** Individual software vendors and servers can use this element to provide metadata about any additional server abilities. */
	ExtendedCapabilities: any;
	/** Fees and terms for retrieving data from or otherwise using this server, including the monetary units as specified in ISO 4217. The reserved value NONE (case insensitive) shall be used to mean no fees or terms. */
	Fees: string;
	GetCapabilities: GetCapabilitiesType;
	/** Connect point URLs for the HTTP Distributed Computing Platform (DCP). Normally, only one Get and/or one Post is included in this element. More than one Get and/or Post is allowed to support including alternative URLs for uses such as load balancing or backup. */
	HTTP: HTTPType;
	/** Unique identifier or name of this dataset. */
	Identifier: ows.CodeType;
	/** Interpolation method(s) that can be used when continuous grid coverage resampling is needed. */
	InterpolationMethods: InterpolationMethodsType;
	/** Identifier of a language used by the data(set) contents. This language identifier shall be as specified in IETF RFC 1766. When this element is omitted, the language used is not identified. */
	Language: string;
	/** Maximum value of this numeric quantity. */
	MaximumValue: string;
	/** Reference to the meaning or semantics of this value or set of values. */
	Meaning: DomainMetadataType;
	/** Minimum value of this numeric quantity. */
	MinimumValue: string;
	/** Specifies that no values are allowed for this quantity. */
	NoValues: NoValuesType;
	/** Metadata for one operation that this server implements. */
	Operation: OperationType;
	/** Metadata about the operations and related abilities specified by this service and implemented by this server, including the URLs for operation requests. The basic contents of this section shall be the same for all OWS types, but individual services can add elements and/or change the optionality of optional elements. */
	OperationsMetadata: OperationsMetadataType;
	/** Reference to a format in which this data can be encoded and transferred. More specific parameter names should be used by specific OWS specifications wherever applicable. More than one such parameter can be included for different purposes. */
	OutputFormat: string;
	Range: RangeType;
	/** Reference to the reference system used by this set of values, including the unit of measure whenever applicable (as is normal). In this case, the '"reference" attribute can reference a URN for a well-known reference system, such as for a coordinate reference system (CRS). For example, such a URN could be a CRS identification URN defined in the "ogc" URN namespace. */
	ReferenceSystem: DomainMetadataType;
	/** General metadata for this specific server. This XML Schema of this section shall be the same for all OWS. */
	ServiceIdentification: ServiceIdentificationType;
	ServiceReference: ServiceReferenceType;
	/** The regular distance or spacing between the allowed values in a range. */
	Spacing: string;
	/** Coordinate reference system in which data from this data(set) or resource is available or supported. More specific parameter names should be used by specific OWS specifications wherever applicable. More than one such parameter can be included for different purposes. */
	SupportedCRS: string;
	/** Reference to the unit of measure of this value or set of values. In this case, the '"reference" attribute can reference a URN for a well-known unit of measure (uom). For example, such a URN could be a UOM identification URN defined in the "ogc" URN namespace. */
	UOM: DomainMetadataType;
	Value: string;
	/** Reference to externally specified list of all the valid values and/or ranges of values for this quantity. (Informative: This element was simplified from the metaDataProperty element in GML 3.0.) */
	ValuesReference: ValuesReferenceType;
}
export var document: document;
