import * as Primitive from '../xml-primitives';
import * as xlink from '../www.w3.org/1999/xlink';

// Source files:
// http://schemas.opengis.net/ows/1.0.0/ows19115subset.xsd
// http://schemas.opengis.net/ows/1.0.0/owsAll.xsd
// http://schemas.opengis.net/ows/1.0.0/owsCommon.xsd
// http://schemas.opengis.net/ows/1.0.0/owsDataIdentification.xsd
// http://schemas.opengis.net/ows/1.0.0/owsExceptionReport.xsd
// http://schemas.opengis.net/ows/1.0.0/owsGetCapabilities.xsd
// http://schemas.opengis.net/ows/1.0.0/owsOperationsMetadata.xsd
// http://schemas.opengis.net/ows/1.0.0/owsServiceIdentification.xsd
// http://schemas.opengis.net/ows/1.0.0/owsServiceProvider.xsd


interface BaseType {
	_exists: boolean;
	_namespace: string;
}
interface _AbstractMetaDataProxyType extends BaseType {}
interface AbstractMetaDataProxyType extends _AbstractMetaDataProxyType { constructor: { new(): AbstractMetaDataProxyType }; }

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

/** Location of the responsible individual or organization. */
interface _AddressType extends BaseType {
	/** State or province of the location. */
	AdministrativeArea?: string;
	/** City of the location. */
	City?: string;
	/** Country of the physical address. */
	Country?: string;
	/** Address line for the location. */
	DeliveryPoint?: string[];
	/** Address of the electronic mailbox of the responsible organization or individual. */
	ElectronicMailAddress?: string[];
	/** ZIP or other postal code. */
	PostalCode?: string;
}
export interface AddressType extends _AddressType { constructor: { new(): AddressType }; }
export var AddressType: { new(): AddressType };

interface _AvailableCRSProxyType extends BaseType {
	AvailableCRS?: string;
	/** Coordinate reference system in which data from this data(set) or resource is available or supported. More specific parameter names should be used by specific OWS specifications wherever applicable. More than one such parameter can be included for different purposes. */
	SupportedCRS?: string;
}
interface AvailableCRSProxyType extends _AvailableCRSProxyType { constructor: { new(): AvailableCRSProxyType }; }

interface _BoundingBoxProxyType extends BaseType {
	BoundingBox?: BoundingBoxType;
	WGS84BoundingBox?: WGS84BoundingBoxType;
}
interface BoundingBoxProxyType extends _BoundingBoxProxyType { constructor: { new(): BoundingBoxProxyType }; }

/** XML encoded minimum rectangular bounding box (or region) parameter, surrounding all the associated data. This type is adapted from the EnvelopeType of GML 3.1, with modified contents and documentation for encoding a MINIMUM size box SURROUNDING all associated data. */
interface _BoundingBoxType extends BaseType {
	/** Usually references the definition of a CRS, as specified in [OGC Topic 2]. Such a CRS definition can be XML encoded using the gml:CoordinateReferenceSystemType in [GML 3.1]. For well known references, it is not required that a CRS definition exist at the location the URI points to. If no anyURI value is included, the applicable CRS must be either:
	  * a)	Specified outside the bounding box, but inside a data structure that includes this bounding box, as specified for a specific OWS use of this bounding box type.
	  * b)	Fixed and specified in the Implementation Specification for a specific OWS use of the bounding box type. */
	crs?: string;
	/** The number of dimensions in this CRS (the length of a coordinate sequence in this use of the PositionType). This number is specified by the CRS definition, but can also be specified here. */
	dimensions?: number;
	/** Position of the bounding box corner at which the value of each coordinate normally is the algebraic minimum within this bounding box. In some cases, this position is normally displayed at the top, such as the top left for some image coordinates. For more information, see Subclauses 10.2.5 and C.13. */
	LowerCorner: PositionType;
	/** Position of the bounding box corner at which the value of each coordinate normally is the algebraic maximum within this bounding box. In some cases, this position is normally displayed at the bottom, such as the bottom right for some image coordinates. For more information, see Subclauses 10.2.5 and C.13. */
	UpperCorner: PositionType;
}
export interface BoundingBoxType extends _BoundingBoxType { constructor: { new(): BoundingBoxType }; }
export var BoundingBoxType: { new(): BoundingBoxType };

/** XML encoded GetCapabilities operation response. This document provides clients with service metadata about a specific service instance, usually including metadata about the tightly-coupled data served. If the server does not implement the updateSequence parameter, the server shall always return the complete Capabilities document, without the updateSequence parameter. When the server implements the updateSequence parameter and the GetCapabilities operation request included the updateSequence parameter with the current value, the server shall return this element with only the "version" and "updateSequence" attributes. Otherwise, all optional elements shall be included or not depending on the actual value of the Contents parameter in the GetCapabilities operation request. This base type shall be extended by each specific OWS to include the additional contents needed. */
interface _CapabilitiesBaseType extends BaseType {
	updateSequence?: string;
	version: string;
	/** Metadata about the operations and related abilities specified by this service and implemented by this server, including the URLs for operation requests. The basic contents of this section shall be the same for all OWS types, but individual services can add elements and/or change the optionality of optional elements. */
	OperationsMetadata?: OperationsMetadataType;
	/** General metadata for this specific server. This XML Schema of this section shall be the same for all OWS. */
	ServiceIdentification?: ServiceIdentificationType;
	/** Metadata about the organization that provides this specific service instance or server. */
	ServiceProvider?: ServiceProviderType;
}
export interface CapabilitiesBaseType extends _CapabilitiesBaseType { constructor: { new(): CapabilitiesBaseType }; }
export var CapabilitiesBaseType: { new(): CapabilitiesBaseType };

/** Name or code with an (optional) authority. If the codeSpace attribute is present, its value should reference a dictionary, thesaurus, or authority for the name or code, such as the organisation who assigned the value, or the dictionary from which it is taken. Type copied from basicTypes.xsd of GML 3 with documentation edited, for possible use outside the ServiceIdentification section of a service metadata document. */
interface _CodeType extends Primitive._string {
	codeSpace?: string;
}
export interface CodeType extends _CodeType { constructor: { new(): CodeType }; }
export var CodeType: { new(): CodeType };

/** Information required to enable contact with the responsible person and/or organization. For OWS use in the service metadata document, the optional hoursOfService and contactInstructions elements were retained, as possibly being useful in the ServiceProvider section. */
interface _ContactType extends BaseType {
	/** Physical and email address at which the organization or individual may be contacted. */
	Address?: AddressType;
	/** Supplemental instructions on how or when to contact the individual or organization. */
	ContactInstructions?: string;
	/** Time period (including time zone) when individuals can contact the organization or individual. */
	HoursOfService?: string;
	/** On-line information that can be used to contact the individual or organization. OWS specifics: The xlink:href attribute in the xlink:simpleAttrs attribute group shall be used to reference this resource. Whenever practical, the xlink:href attribute with type anyURI should be a URL from which more contact information can be electronically retrieved. The xlink:title attribute with type "string" can be used to name this set of information. The other attributes in the xlink:simpleAttrs attribute group should not be used. */
	OnlineResource?: OnlineResourceType;
	/** Telephone numbers at which the organization or individual may be contacted. */
	Phone?: TelephoneType;
}
export interface ContactType extends _ContactType { constructor: { new(): ContactType }; }
export var ContactType: { new(): ContactType };

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
	Keywords?: KeywordsType[];
	/** Title of this resource, normally used for display to a human. */
	Title?: string;
}
export interface DescriptionType extends _DescriptionType { constructor: { new(): DescriptionType }; }
export var DescriptionType: { new(): DescriptionType };

/** Valid domain (or set of values) of one parameter or other quantity used by this server. A non-parameter quantity may not be explicitly represented in the server software. (Informative: An example is the outputFormat parameter of a WFS. Each WFS server should provide a Parameter element for the outputFormat parameter that lists the supported output formats, such as GML2, GML3, etc. as the allowed "Value" elements.) */
interface _DomainType extends BaseType {
	/** Name or identifier of this parameter or other quantity. */
	name: string;
	Metadata?: MetadataType[];
	/** Unordered list of all the valid values for this parameter or other quantity. For those parameters that contain a list or sequence of values, these values shall be for individual values in the list. The allowed set of values and the allowed server restrictions on that set of values shall be specified in the Implementation Specification for this service. */
	Value: string[];
}
export interface DomainType extends _DomainType { constructor: { new(): DomainType }; }
export var DomainType: { new(): DomainType };

interface _ExceptionReportType extends BaseType {
	/** Identifier of the language used by all included exception text values. These language identifiers shall be as specified in IETF RFC 1766. When this attribute is omitted, the language used is not identified. */
	language?: string;
	/** Specification version for OWS operation. The string value shall contain one x.y.z "version" value (e.g., "2.1.3"). A version number shall contain three non-negative integers separated by decimal points, in the form "x.y.z". The integers y and z shall not exceed 99. Each version shall be for the Implementation Specification (document) and the associated XML Schemas to which requested operations will conform. An Implementation Specification version normally specifies XML Schemas against which an XML encoded operation response must conform and should be validated. See Version negotiation subclause for more information. */
	version: string;
	Exception: ExceptionType[];
}
interface ExceptionReportType extends _ExceptionReportType { constructor: { new(): ExceptionReportType }; }

/** An Exception element describes one detected error that a server chooses to convey to the client. */
interface _ExceptionType extends BaseType {
	/** A code representing the type of this exception, which shall be selected from a set of exceptionCode values specified for the specific service operation and server. */
	exceptionCode: string;
	/** When included, this locator shall indicate to the client where an exception was encountered in servicing the client's operation request. This locator should be included whenever meaningful information can be provided by the server. The contents of this locator will depend on the specific exceptionCode and OWS service, and shall be specified in the OWS Implementation Specification. */
	locator?: string;
	/** Ordered sequence of text strings that describe this specific exception or error. The contents of these strings are left open to definition by each server implementation. A server is strongly encouraged to include at least one ExceptionText value, to provide more information about the detected error than provided by the exceptionCode. When included, multiple ExceptionText values shall provide hierarchical information about one detected error, with the most significant information listed first. */
	ExceptionText?: string[];
}
export interface ExceptionType extends _ExceptionType { constructor: { new(): ExceptionType }; }
export var ExceptionType: { new(): ExceptionType };

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

/** General metadata identifying and describing a set of data. This type shall be extended if needed for each specific OWS to include additional metadata for each type of dataset. If needed, this type should first be restricted for each specific OWS to change the multiplicity (or optionality) of some elements. */
interface _IdentificationType extends _DescriptionType {
	AvailableCRS?: AvailableCRSProxyType[];
	BoundingBox?: BoundingBoxProxyType[];
	/** Unique identifier or name of this dataset. */
	Identifier?: CodeType;
	Metadata?: MetadataType[];
	/** Reference to a format in which this data can be encoded and transferred. More specific parameter names should be used by specific OWS specifications wherever applicable. More than one such parameter can be included for different purposes. */
	OutputFormat?: string[];
}
export interface IdentificationType extends _IdentificationType { constructor: { new(): IdentificationType }; }
export var IdentificationType: { new(): IdentificationType };

/** Unordered list of one or more commonly used or formalised word(s) or phrase(s) used to describe the subject. When needed, the optional "type" can name the type of the associated list of keywords that shall all have the same type. Also when needed, the codeSpace attribute of that "type" can reference the type name authority and/or thesaurus. For OWS use, the optional thesaurusName element was omitted as being complex information that could be referenced by the codeSpace attribute of the Type element. */
interface _KeywordsType extends BaseType {
	Keyword: string[];
	Type?: CodeType;
}
export interface KeywordsType extends _KeywordsType { constructor: { new(): KeywordsType }; }
export var KeywordsType: { new(): KeywordsType };

/** This element either references or contains more metadata about the element that includes this element. To reference metadata stored remotely, at least the xlinks:href attribute in xlink:simpleAttrs shall be included. Either at least one of the attributes in xlink:simpleAttrs or a substitute for the AbstractMetaData element shall be included, but not both. An Implementation Specification can restrict the contents of this element to always be a reference or always contain metadata. (Informative: This element was adapted from the metaDataProperty element in GML 3.0.) */
interface _MetadataType extends _AbstractMetaDataProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Optional reference to the aspect of the element which includes this "metadata" element that this metadata provides more information about. */
	about?: string;
}
export interface MetadataType extends _MetadataType { constructor: { new(): MetadataType }; }
export var MetadataType: { new(): MetadataType };

/** XML encoded identifier of a standard MIME type, possibly a parameterized MIME type. */
export type MimeType = string;
type _MimeType = Primitive._string;

/** Reference to on-line resource from which data can be obtained. For OWS use in the service metadata document, the CI_OnlineResource class was XML encoded as the attributeGroup "xlink:simpleAttrs", as used in GML. */
interface _OnlineResourceType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface OnlineResourceType extends _OnlineResourceType { constructor: { new(): OnlineResourceType }; }
export var OnlineResourceType: { new(): OnlineResourceType };

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
	Metadata?: MetadataType[];
	/** Optional unordered list of parameter domains that each apply to this operation which this server implements. If one of these Parameter elements has the same "name" attribute as a Parameter element in the OperationsMetadata element, this Parameter element shall override the other one for this operation. The list of required and optional parameter domain limitations for this operation shall be specified in the Implementation Specification for this service. */
	Parameter?: DomainType[];
}
interface OperationType extends _OperationType { constructor: { new(): OperationType }; }

/** Position instances hold the coordinates of a position in a coordinate reference system (CRS) referenced by the related "crs" attribute or elsewhere. For an angular coordinate axis that is physically continuous for multiple revolutions, but whose recorded values can be discontinuous, special conditions apply when the bounding box is continuous across the value discontinuity:
  * a)  If the bounding box is continuous clear around this angular axis, then ordinate values of minus and plus infinity shall be used.
  * b)  If the bounding box is continuous across the value discontinuity but is not continuous clear around this angular axis, then some non-normal value can be used if specified for a specific OWS use of the BoundingBoxType. For more information, see Subclauses 10.2.5 and C.13. This type is adapted from DirectPositionType and doubleList of GML 3.1. The adaptations include omission of all the attributes, since the needed information is included in the BoundingBoxType. */
export type PositionType = number[];

/** Two-dimensional position instances hold the longitude and latitude coordinates of a position in the 2D WGS 84 coordinate reference system. The longitude value shall be listed first, followed by the latitude value, both in decimal degrees. Latitude values shall range from -90 to +90 degrees, and longitude values shall normally range from -180 to +180 degrees. For the longitude axis, special conditions apply when the bounding box is continuous across the +/- 180 degrees meridian longitude value discontinuity:
  * a)  If the bounding box is continuous clear around the Earth, then longitude values of minus and plus infinity shall be used.
  * b)  If the bounding box is continuous across the value discontinuity but is not continuous clear around the Earth, then some non-normal value can be used if specified for a specific OWS use of the WGS84BoundingBoxType. For more information, see Subclauses 10.4.5 and C.13. */
export type PositionType2D = number[];

/** Connect point URL and any constraints for this HTTP request method for this operation request. In the OnlineResourceType, the xlink:href attribute in the xlink:simpleAttrs attribute group shall be used to contain this URL. The other attributes in the xlink:simpleAttrs attribute group should not be used. */
interface _RequestMethodType extends _OnlineResourceType {
	/** Optional unordered list of valid domain constraints on non-parameter quantities that each apply to this request method for this operation. If one of these Constraint elements has the same "name" attribute as a Constraint element in the OperationsMetadata or Operation element, this Constraint element shall override the other one for this operation. The list of required and optional constraints for this request method for this operation shall be specified in the Implementation Specification for this service. */
	Constraint?: DomainType[];
}
export interface RequestMethodType extends _RequestMethodType { constructor: { new(): RequestMethodType }; }
export var RequestMethodType: { new(): RequestMethodType };

/** Identification of, and means of communication with, person responsible for the server. For OWS use in the ServiceProvider section of a service metadata document, the optional organizationName element was removed, since this type is always used with the ProviderName element which provides that information. The mandatory "role" element was changed to optional, since no clear use of this information is known in the ServiceProvider section. */
interface _ResponsiblePartySubsetType extends BaseType {
	/** Address of the responsible party. */
	ContactInfo?: ContactType;
	/** Name of the responsible person: surname, given name, title separated by a delimiter. */
	IndividualName?: string;
	/** Role or position of the responsible person. */
	PositionName?: string;
	/** Function performed by the responsible party. Possible values of this Role shall include the values and the meanings listed in Subclause B.5.5 of ISO 19115:2003. */
	Role?: CodeType;
}
export interface ResponsiblePartySubsetType extends _ResponsiblePartySubsetType { constructor: { new(): ResponsiblePartySubsetType }; }
export var ResponsiblePartySubsetType: { new(): ResponsiblePartySubsetType };

/** Identification of, and means of communication with, person responsible for the server. At least one of IndividualName, OrganisationName, or PositionName shall be included. */
interface _ResponsiblePartyType extends BaseType {
	/** Address of the responsible party. */
	ContactInfo?: ContactType;
	/** Name of the responsible person: surname, given name, title separated by a delimiter. */
	IndividualName?: string;
	/** Name of the responsible organization. */
	OrganisationName?: string;
	/** Role or position of the responsible person. */
	PositionName?: string;
	/** Function performed by the responsible party. Possible values of this Role shall include the values and the meanings listed in Subclause B.5.5 of ISO 19115:2003. */
	Role: CodeType;
}
export interface ResponsiblePartyType extends _ResponsiblePartyType { constructor: { new(): ResponsiblePartyType }; }
export var ResponsiblePartyType: { new(): ResponsiblePartyType };

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
	/** A service type name from a registry of services. For example, the values of the codeSpace URI and name and code string may be "OGC" and "catalogue." This type name is normally used for machine-to-machine communication. */
	ServiceType: CodeType;
	/** Unordered list of one or more versions of this service type implemented by this server. This information is not adequate for version negotiation, and shall not be used for that purpose. */
	ServiceTypeVersion: string[];
}
interface ServiceIdentificationType extends _ServiceIdentificationType { constructor: { new(): ServiceIdentificationType }; }

interface _ServiceProviderType extends BaseType {
	/** A unique identifier for the service provider organization. */
	ProviderName: string;
	/** Reference to the most relevant web site of the service provider. */
	ProviderSite?: OnlineResourceType;
	/** Information for contacting the service provider. The OnlineResource element within this ServiceContact element should not be used to reference a web site of the service provider. */
	ServiceContact: ResponsiblePartySubsetType;
}
interface ServiceProviderType extends _ServiceProviderType { constructor: { new(): ServiceProviderType }; }

/** Service type identifier, where the string value is the OWS type abbreviation, such as "WMS" or "WFS". */
export type ServiceType = string;
type _ServiceType = Primitive._string;

/** Telephone numbers for contacting the responsible individual or organization. */
interface _TelephoneType extends BaseType {
	/** Telephone number of a facsimile machine for the responsible
	  * organization or individual. */
	Facsimile?: string[];
	/** Telephone number by which individuals can speak to the responsible organization or individual. */
	Voice?: string[];
}
export interface TelephoneType extends _TelephoneType { constructor: { new(): TelephoneType }; }
export var TelephoneType: { new(): TelephoneType };

/** Service metadata document version, having values that are "increased" whenever any change is made in service metadata document. Values are selected by each server, and are always opaque to clients. See updateSequence parameter use subclause for more information. */
export type UpdateSequenceType = string;
type _UpdateSequenceType = Primitive._string;

/** Specification version for OWS operation. The string value shall contain one x.y.z "version" value (e.g., "2.1.3"). A version number shall contain three non-negative integers separated by decimal points, in the form "x.y.z". The integers y and z shall not exceed 99. Each version shall be for the Implementation Specification (document) and the associated XML Schemas to which requested operations will conform. An Implementation Specification version normally specifies XML Schemas against which an XML encoded operation response must conform and should be validated. See Version negotiation subclause for more information. */
export type VersionType = string;
type _VersionType = Primitive._string;

/** XML encoded minimum rectangular bounding box (or region) parameter, surrounding all the associated data. This box is specialized for use with the 2D WGS 84 coordinate reference system with decimal values of longitude and latitude. This type is adapted from the general BoundingBoxType, with modified contents and documentation for use with the 2D WGS 84 coordinate reference system. */
interface _WGS84BoundingBoxType extends _BoundingBoxType {
	/** This attribute can be included when considered useful. When included, this attribute shall reference the 2D WGS 84 coordinate reference system with longitude before latitude and decimal values of longitude and latitude. */
	crs?: string;
	/** The number of dimensions in this CRS (the length of a coordinate sequence in this use of the PositionType). This number is specified by the CRS definition, but can also be specified here. */
	dimensions?: number;
	/** Position of the bounding box corner at which the values of longitude and latitude normally are the algebraic minimums within this bounding box. For more information, see Subclauses 10.4.5 and C.13. */
	LowerCorner: PositionType2D;
	/** Position of the bounding box corner at which the values of longitude and latitude normally are the algebraic minimums within this bounding box. For more information, see Subclauses 10.4.5 and C.13. */
	UpperCorner: PositionType2D;
}
export interface WGS84BoundingBoxType extends _WGS84BoundingBoxType { constructor: { new(): WGS84BoundingBoxType }; }
export var WGS84BoundingBoxType: { new(): WGS84BoundingBoxType };

export interface document extends BaseType {
	/** Brief narrative description of this resource, normally used for display to a human. */
	Abstract: string;
	/** Access constraint applied to assure the protection of privacy or intellectual property, or any other restrictions on retrieving or using data from or otherwise using this server. The reserved value NONE (case insensitive) shall be used to mean no access constraints are imposed. */
	AccessConstraints: string;
	/** Address of the responsible party. */
	ContactInfo: ContactType;
	/** Information for one distributed Computing Platform (DCP) supported for this operation. At present, only the HTTP DCP is defined, so this element only includes the HTTP element. */
	DCP: DCPType;
	Exception: ExceptionType;
	/** Report message returned to the client that requested any OWS operation when the server detects an error while processing that operation request. */
	ExceptionReport: ExceptionReportType;
	/** Individual software vendors and servers can use this element to provide metadata about any additional server abilities. */
	ExtendedCapabilities: any;
	/** Fees and terms for retrieving data from or otherwise using this server, including the monetary units as specified in ISO 4217. The reserved value NONE (case insensitive) shall be used to mean no fees or terms. */
	Fees: string;
	GetCapabilities: GetCapabilitiesType;
	/** Connect point URLs for the HTTP Distributed Computing Platform (DCP). Normally, only one Get and/or one Post is included in this element. More than one Get and/or Post is allowed to support including alternative URLs for uses such as load balancing or backup. */
	HTTP: HTTPType;
	/** Unique identifier or name of this dataset. */
	Identifier: CodeType;
	/** Name of the responsible person: surname, given name, title separated by a delimiter. */
	IndividualName: string;
	Keywords: KeywordsType;
	/** Identifier of a language used by the data(set) contents. This language identifier shall be as specified in IETF RFC 1766. When this element is omitted, the language used is not identified. */
	Language: string;
	Metadata: MetadataType;
	/** Metadata for one operation that this server implements. */
	Operation: OperationType;
	/** Metadata about the operations and related abilities specified by this service and implemented by this server, including the URLs for operation requests. The basic contents of this section shall be the same for all OWS types, but individual services can add elements and/or change the optionality of optional elements. */
	OperationsMetadata: OperationsMetadataType;
	/** Name of the responsible organization. */
	OrganisationName: string;
	/** Reference to a format in which this data can be encoded and transferred. More specific parameter names should be used by specific OWS specifications wherever applicable. More than one such parameter can be included for different purposes. */
	OutputFormat: string;
	/** Identification of, and means of communication with, person(s) responsible for the resource(s). For OWS use in the ServiceProvider section of a service metadata document, the optional organizationName element was removed, since this type is always used with the ProviderName element which provides that information. The optional individualName element was made mandatory, since either the organizationName or individualName element is mandatory. The mandatory "role" element was changed to optional, since no clear use of this information is known in the ServiceProvider section. */
	PointOfContact: ResponsiblePartyType;
	/** Role or position of the responsible person. */
	PositionName: string;
	/** Function performed by the responsible party. Possible values of this Role shall include the values and the meanings listed in Subclause B.5.5 of ISO 19115:2003. */
	Role: CodeType;
	/** General metadata for this specific server. This XML Schema of this section shall be the same for all OWS. */
	ServiceIdentification: ServiceIdentificationType;
	/** Metadata about the organization that provides this specific service instance or server. */
	ServiceProvider: ServiceProviderType;
	/** Coordinate reference system in which data from this data(set) or resource is available or supported. More specific parameter names should be used by specific OWS specifications wherever applicable. More than one such parameter can be included for different purposes. */
	SupportedCRS: string;
	/** Title of this resource, normally used for display to a human. */
	Title: string;
	WGS84BoundingBox: WGS84BoundingBoxType;
}
export var document: document;
