import * as Primitive from '../xml-primitives';
import * as gml from './gml';
import * as xlink from '../www.w3.org/1999/xlink';

// Source files:
// http://schemas.opengis.net/wcs/1.0.0/describeCoverage.xsd
// http://schemas.opengis.net/wcs/1.0.0/getCoverage.xsd
// http://schemas.opengis.net/wcs/1.0.0/owsBase.xsd
// http://schemas.opengis.net/wcs/1.0.0/values.xsd
// http://schemas.opengis.net/wcs/1.0.0/wcsAll.xsd
// http://schemas.opengis.net/wcs/1.0.0/wcsCapabilities.xsd


declare module './gml' {
export interface _GMLProxyType {
	RangeSet?: RangeSetType;
	AxisDescription?: AxisDescriptionType;
	CoverageOfferingBrief?: CoverageOfferingBriefType;
	Service?: ServiceType;
	CoverageOffering?: CoverageOfferingType;
	Envelope?: gml.EnvelopeType;
	EnvelopeWithTimePeriod?: gml.EnvelopeWithTimePeriodType;
	Grid?: gml.GridType;
	RectifiedGrid?: gml.RectifiedGridType;
	Polygon?: gml.PolygonType;
	LinearRing?: gml.LinearRingType;
}
export interface _MetaDataPropertyProxyType {
	metadataLink?: MetadataLinkType;
}
}
interface BaseType {
	_exists: boolean;
	_namespace: string;
}
/** Description of a WCS object. */
interface _AbstractDescriptionBaseType extends gml._AbstractGMLType {
	metadataLink?: MetadataLinkType[];
}
export interface AbstractDescriptionBaseType extends _AbstractDescriptionBaseType { constructor: { new(): AbstractDescriptionBaseType }; }
export var AbstractDescriptionBaseType: { new(): AbstractDescriptionBaseType };

/** Human-readable descriptive information for the object it is included
  * within. */
interface _AbstractDescriptionType extends _AbstractDescriptionBaseType {
	/** Database handle for the object.  It is of XML type “ID”, so is constrained to be unique in the XML document within which it occurs.  An external identifier for the object in the form of a URI may be constructed using standard XML and XPointer methods.  This is done by concatenating the URI for the document, a fragment separator “#”, and the value of the id attribute. */
	id: string;
	/** Contains a simple text description of the object. For WCS use, removed optional AssociationAttributeGroup from gml:description. */
	description?: string;
	/** Short human-readable label for this object, for human
	  * interface display. */
	label: string;
	/** Identifier for the object, normally a descriptive name. For WCS use, removed optional CodeSpace attribute from gml:name. */
	name: string[];
}
export interface AbstractDescriptionType extends _AbstractDescriptionType { constructor: { new(): AbstractDescriptionType }; }
export var AbstractDescriptionType: { new(): AbstractDescriptionType };

/** Location of the responsible individual or organization. */
interface _AddressType extends BaseType {
	/** State ot province of the location. */
	administrativeArea?: string;
	/** City of the location. */
	city?: string;
	/** Country of the physical address. */
	country?: string;
	/** Address line for the location (as described in ISO 11180,
	  * Annex A). */
	deliveryPoint?: string[];
	/** Address of the electronic mailbox of the responsible
	  * organization or individual. */
	electronicMailAddress?: string[];
	/** ZIP or other postal code. */
	postalCode?: string;
}
export interface AddressType extends _AddressType { constructor: { new(): AddressType }; }
export var AddressType: { new(): AddressType };

/** Description of a measured or observed quantity, and list of the “valid” quantity values (values for which measurements are available or “by which” aggregate values are available). The semantic is the URI of the quantity (for example observable or mathematical variable). The refSys attribute is a URI to a reference system, and the refSysLabel is the label used by client to refer the reference system. */
interface _AxisDescriptionType extends _AbstractDescriptionType {
	/** Pointer to the reference system in which values are expressed. This attribute shall be included either here or in RangeSetType. */
	refSys?: string;
	/** Short human-readable label denoting the reference system, for human interface display. This attribute shall be included either here or in RangeSetType. */
	refSysLabel?: string;
	/** Definition of the semantics or meaning of the values in the XML element it belongs to. The value of this "semantic" attribute can be a RDF Property or Class of a taxonomy or ontology. */
	semantic?: string;
	/** The type and value constraints for the values of this axis. */
	values: AxisDescriptionTypeValuesType;
}
export interface AxisDescriptionType extends _AxisDescriptionType { constructor: { new(): AxisDescriptionType }; }
export var AxisDescriptionType: { new(): AxisDescriptionType };

interface _AxisDescriptionType_2 extends BaseType {
	AxisDescription: AxisDescriptionType;
}
interface AxisDescriptionType_2 extends _AxisDescriptionType_2 { constructor: { new(): AxisDescriptionType_2 }; }

interface _AxisDescriptionTypeValuesType extends _valueEnumType {
	/** Ordered sequence of the parameter value(s) that the server will use for GetCoverage requests which omit a constraint on this parameter axis. (GetCoverage requests against a coverage offering whose AxisDescription has no default must specify a valid constraint for this parameter.) */
	default?: TypedLiteralType;
}
interface AxisDescriptionTypeValuesType extends _AxisDescriptionTypeValuesType { constructor: { new(): AxisDescriptionTypeValuesType }; }

/** Identification of desired part of full Capabilities XML document to be
  * returned. */
export type CapabilitiesSectionType = ("/" | "/WCS_Capabilities/Service" | "/WCS_Capabilities/Capability" | "/WCS_Capabilities/ContentMetadata");
interface _CapabilitiesSectionType extends Primitive._string { content: CapabilitiesSectionType; }

type ClosureType = ("closed" | "open" | "open-closed" | "closed-open");
interface _ClosureType extends Primitive._string { content: ClosureType; }

/** Information required to enable contact with the responsible person
  * and/or organization. */
interface _ContactType extends BaseType {
	/** Physical and email address at which the organization or
	  * individualmay be contacted. */
	address?: AddressType;
	/** On-line information that can be used to contact the individual
	  * ororganization. */
	onlineResource?: OnlineResourceType;
	/** Telephone numbers at which the organization or individual may
	  * becontacted. */
	phone?: TelephoneType;
}
export interface ContactType extends _ContactType { constructor: { new(): ContactType }; }
export var ContactType: { new(): ContactType };

interface _ContentMetadataType extends BaseType {
	/** Service metadata document version, having values that are
	  * "increased" whenever any change is made in service metadata document. Values
	  * are selected by each server, and are always opaque to clients. When not
	  * supported by server, server shall not return this attribute. */
	updateSequence?: string;
	version?: string;
	/** Reference to an XML Schema fragment that specifies the content model of the property’s value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	CoverageOfferingBrief?: CoverageOfferingBriefType[];
}
interface ContentMetadataType extends _ContentMetadataType { constructor: { new(): ContentMetadataType }; }

interface _CoverageDescriptionType extends BaseType {
	/** Service metadata (Capabilities) document version, having values that are "increased" whenever any change is made in service metadata document. Values are selected by each server, and are always opaque to clients. */
	updateSequence?: string;
	version: string;
	CoverageOffering: CoverageOfferingType[];
}
interface CoverageDescriptionType extends _CoverageDescriptionType { constructor: { new(): CoverageDescriptionType }; }

/** Brief description of one coverage avaialble from a WCS. */
interface _CoverageOfferingBriefType extends _AbstractDescriptionType {
	/** Unordered list of one or more commonly used or formalised word(s) or phrase(s) used to describe the subject. When needed, the optional "type" can name the type of the associated list of keywords that shall all have the same type. Also when needed, the codeSpace attribute of that "type" can also reference the type name authority and/or thesaurus. (Largely based on MD_Keywords class in ISO 19115.) */
	keywords?: KeywordsType[];
	lonLatEnvelope: LonLatEnvelopeType;
}
export interface CoverageOfferingBriefType extends _CoverageOfferingBriefType { constructor: { new(): CoverageOfferingBriefType }; }
export var CoverageOfferingBriefType: { new(): CoverageOfferingBriefType };

/** Full description of one coverage available from a WCS instance. */
interface _CoverageOfferingType extends _CoverageOfferingBriefType {
	domainSet: DomainSetType;
	RangeSet: RangeSetType;
	supportedCRSs: SupportedCRSsType;
	supportedFormats: SupportedFormatsType;
	supportedInterpolations?: SupportedInterpolationsType;
}
export interface CoverageOfferingType extends _CoverageOfferingType { constructor: { new(): CoverageOfferingType }; }
export var CoverageOfferingType: { new(): CoverageOfferingType };

/** Connect point URLs for the HTTP Distributed Computing Platform (DCP).
  * Normally, only one Get and/or one Post is included in this element. More than one
  * Get and/or Post is allowed to support including alternative URLs for uses such as
  * load balancing or backup. */
interface _DCPTypeType extends BaseType {
	HTTP: DCPTypeTypeHTTPType;
}
export interface DCPTypeType extends _DCPTypeType { constructor: { new(): DCPTypeType }; }
export var DCPTypeType: { new(): DCPTypeType };

interface _DCPTypeTypeHTTPType extends BaseType {
	Get: DCPTypeTypeHTTPTypeGetType[];
	Post: DCPTypeTypeHTTPTypePostType[];
}
interface DCPTypeTypeHTTPType extends _DCPTypeTypeHTTPType { constructor: { new(): DCPTypeTypeHTTPType }; }

interface _DCPTypeTypeHTTPTypeGetType extends BaseType {
	OnlineResource: OnlineResourceType;
}
interface DCPTypeTypeHTTPTypeGetType extends _DCPTypeTypeHTTPTypeGetType { constructor: { new(): DCPTypeTypeHTTPTypeGetType }; }

interface _DCPTypeTypeHTTPTypePostType extends BaseType {
	OnlineResource: OnlineResourceType;
}
interface DCPTypeTypeHTTPTypePostType extends _DCPTypeTypeHTTPTypePostType { constructor: { new(): DCPTypeTypeHTTPTypePostType }; }

interface _DescribeCoverageType extends BaseType {
	service: string;
	version: string;
	/** Name or identifier of this coverage. The same name value shall not be used for any other coverages available from the same server. A client can obtain this name by a prior GetCapabilities request, or possibly from a third-party source. If this element is omitted, the server may return descriptions of every coverage offering available, or return a service exception. */
	Coverage?: string[];
}
interface DescribeCoverageType extends _DescribeCoverageType { constructor: { new(): DescribeCoverageType }; }

/** Defines the spatial-temporal domain set of a coverage offering. The domainSet shall include a SpatialDomain (describing the spatial locations for which coverages can be requested), a TemporalDomain (describing the time instants or inter-vals for which coverages can be requested), or both. */
interface _DomainSetType extends BaseType {
	spatialDomain: SpatialDomainType;
	/** Defines the temporal domain of a coverage offering, that is, the times for which valid data are available. The times shall to be ordered from the oldest to the newest. */
	temporalDomain: TimeSequenceType[];
}
export interface DomainSetType extends _DomainSetType { constructor: { new(): DomainSetType }; }
export var DomainSetType: { new(): DomainSetType };

/** Defines the desired subset of the domain set of the coverage. Is a GML property containing either or both spatialSubset and temporalSubset GML objects. */
interface _DomainSubsetType extends BaseType {
	spatialSubset: SpatialSubsetType;
	temporalSubset: TimeSequenceType[];
}
export interface DomainSubsetType extends _DomainSubsetType { constructor: { new(): DomainSubsetType }; }
export var DomainSubsetType: { new(): DomainSubsetType };

interface _GetCapabilitiesType extends BaseType {
	service: string;
	/** Service metadata (Capabilities) document version, having
	  * values that are "increased" whenever any change is made in service metadata
	  * document. Values are selected by each server, and are always opaque to
	  * clients. When omitted or not supported by server, server shall return latest
	  * complete service metadata document. */
	updateSequence?: string;
	version?: string;
	section?: CapabilitiesSectionType;
}
interface GetCapabilitiesType extends _GetCapabilitiesType { constructor: { new(): GetCapabilitiesType }; }

interface _GetCoverageType extends BaseType {
	service: string;
	version: string;
	domainSubset: DomainSubsetType;
	interpolationMethod?: InterpolationMethodType;
	output: OutputType;
	rangeSubset?: RangeSubsetType;
	/** The coverage offering (identified by its "name") that this request will draw from. */
	sourceCoverage: string;
}
interface GetCoverageType extends _GetCoverageType { constructor: { new(): GetCoverageType }; }

/** Codes that identify interpolation methods. The meanings of these codes are defined in Annex B of ISO 19123: Geographic information — Schema for coverage geometry and functions. */
export type InterpolationMethodType = ("nearest neighbor" | "bilinear" | "bicubic" | "lost area" | "barycentric" | "none");
interface _InterpolationMethodType extends Primitive._string { content: InterpolationMethodType; }

/** An interval of values of a numeric quantity. This interval can be continuous or discrete, defined by a fixed spacing between adjacent valid values. Note that the "type" and "semantic" attributes for min/max and "res" may be different (timeInstant and duration). */
interface _intervalType extends _valueRangeType {
	/** The regular distance or spacing between the allowed values in this interval. Shall be included when the allowed values are NOT continuous in this interval. Shall not be included when the allowed values are continuous in this interval. */
	res?: TypedLiteralType;
}
export interface intervalType extends _intervalType { constructor: { new(): intervalType }; }
export var intervalType: { new(): intervalType };

interface _KeywordsType extends BaseType {
	keyword: string[];
	type?: gml.CodeType;
}
interface KeywordsType extends _KeywordsType { constructor: { new(): KeywordsType }; }

/** For WCS use, LonLatEnvelopeBaseType restricts gml:Envelope to the WGS84 geographic CRS with Longitude preceding Latitude and both using decimal degrees only. If included, height values are third and use metre units. Envelope defines an extent using a pair of positions defining opposite corners in arbitrary dimensions. */
interface _LonLatEnvelopeBaseType extends gml._EnvelopeType {
	srsName?: string;
	pos: gml.DirectPositionType[];
}
export interface LonLatEnvelopeBaseType extends _LonLatEnvelopeBaseType { constructor: { new(): LonLatEnvelopeBaseType }; }
export var LonLatEnvelopeBaseType: { new(): LonLatEnvelopeBaseType };

/** Defines spatial extent by extending LonLatEnvelope with an optional time position pair. */
interface _LonLatEnvelopeType extends _LonLatEnvelopeBaseType {
	/** Direct representation of a temporal position. */
	timePosition?: gml.TimePositionType[];
}
export interface LonLatEnvelopeType extends _LonLatEnvelopeType { constructor: { new(): LonLatEnvelopeType }; }
export var LonLatEnvelopeType: { new(): LonLatEnvelopeType };

/** Refers to a metadata package that contains metadata properties for an object. */
interface _MetadataAssociationType extends gml._MetaDataPropertyType {
	about?: string;
	/** Reference to an XML Schema fragment that specifies the content model of the property’s value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface MetadataAssociationType extends _MetadataAssociationType { constructor: { new(): MetadataAssociationType }; }
export var MetadataAssociationType: { new(): MetadataAssociationType };

/** Refers to a metadata package that contains metadata properties for an object. The metadataType attribute indicates the type of metadata referred to. */
interface _MetadataLinkType extends _MetadataAssociationType {
	metadataType: MetadataLinkTypeMetadataTypeType;
}
export interface MetadataLinkType extends _MetadataLinkType { constructor: { new(): MetadataLinkType }; }
export var MetadataLinkType: { new(): MetadataLinkType };

type MetadataLinkTypeMetadataTypeType = ("TC211" | "FGDC" | "other");
interface _MetadataLinkTypeMetadataTypeType extends Primitive._string { content: MetadataLinkTypeMetadataTypeType; }

/** Reference to on-line resource from which data can be obtained. */
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

/** Asks for the GetCoverage response to be expressed in a particular Coordinate Reference System (crs) and encoded in a particular format. */
interface _OutputType extends BaseType {
	/** Identifier of the Coordinate Reference System (crs) in which GetCoverage response shall be expressed. Identifier shall be among those listed under supportedCRSs in the DescribeCoverage XML response. */
	crs?: gml.CodeType;
	/** Identifier of the format in which GetCoverage response shall be encoded. Identifier shall be among those listed under supportedFormats in the DescribeCoverage XML response. */
	format: gml.CodeType;
}
export interface OutputType extends _OutputType { constructor: { new(): OutputType }; }
export var OutputType: { new(): OutputType };

/** Defines the properties (categories, measures, or values) assigned to each location in the domain. Any such property may be a scalar (numeric or text) value, such as population density, or a compound (vector or tensor) value, such as incomes by race, or radiances by wavelength. The semantic of the range set is typically an observable and is referenced by a URI. A rangeSet also has a reference system that is reffered by the URI in the refSys attribute. The refSys is either qualitative (classification) or quantitative (uom). The three attributes can be included either here and in each axisDescription. If included in both places, the values in the axisDescription over-ride those included in the RangeSet. */
interface _RangeSetType extends _AbstractDescriptionType {
	/** Pointer to the reference system in which values are expressed. This attribute shall be included either here or in each AxisDescriptionType. */
	refSys?: string;
	/** Short human-readable label denoting the reference system, for human interface display. This attribute shall be included either here or in each AxisDescriptionType. */
	refSysLabel?: string;
	/** Definition of the semantics or meaning of the values in the XML element it belongs to. The value of this "semantic" attribute can be a RDF Property or Class of a taxonomy or ontology. */
	semantic?: string;
	AxisDescription?: AxisDescriptionType[];
	/** Values used when valid values are not available. (The coverage encoding may specify a fixed value for null (e.g. “–99999” or “N/A”), but often the choice is up to the provider and must be communicated to the client outside of the coverage itself.) */
	nullValues?: valueEnumType;
}
export interface RangeSetType extends _RangeSetType { constructor: { new(): RangeSetType }; }
export var RangeSetType: { new(): RangeSetType };

interface _RangeSetType_2 extends BaseType {
	RangeSet: RangeSetType;
}
interface RangeSetType_2 extends _RangeSetType_2 { constructor: { new(): RangeSetType_2 }; }

/** Definition of a subset of the named coverage range(s). Currently, only a value enumeration definition of a range subset. */
interface _RangeSubsetType extends BaseType {
	/** Ordered sequence of points and/or intervals along one axis of a compound range set. */
	axisSubset: RangeSubsetTypeAxisSubsetType[];
}
export interface RangeSubsetType extends _RangeSubsetType { constructor: { new(): RangeSubsetType }; }
export var RangeSubsetType: { new(): RangeSubsetType };

interface _RangeSubsetTypeAxisSubsetType extends _valueEnumBaseType {
	/** Name or identifier of one axis in this coverage. This name shall match that of an AxisDescription element in the DescribeCoverage XML response. */
	name: string;
}
interface RangeSubsetTypeAxisSubsetType extends _RangeSubsetTypeAxisSubsetType { constructor: { new(): RangeSubsetTypeAxisSubsetType }; }

/** Identification of, and means of communication with, person(s) and
  * organizations associated with the server. */
interface _ResponsiblePartyType extends BaseType {
	/** Address of the responsible party. */
	contactInfo?: ContactType;
	/** Name of the responsible person-surname, given name,
	  * title separated by a delimiter. */
	individualName: string;
	/** Name of the responsible organizationt. */
	organisationName: string[];
	/** Role or position of the responsible person. */
	positionName?: string;
}
export interface ResponsiblePartyType extends _ResponsiblePartyType { constructor: { new(): ResponsiblePartyType }; }
export var ResponsiblePartyType: { new(): ResponsiblePartyType };

/** A minimal, human readable rescription of the service. */
interface _ServiceType extends _AbstractDescriptionType {
	/** Service metadata (Capabilities) document version, having
	  * values that are "increased" whenever any change is made in service
	  * metadata document. Values are selected by each server, and are always
	  * opaque to clients. When supported by server, server shall return this
	  * attribute. */
	updateSequence?: string;
	version?: string;
	/** A text string identifying any access constraints
	  * imposed by the service provider. The keyword NONE shall be used to
	  * mean no access constraints are imposed. */
	accessConstraints: gml.CodeListType[];
	/** A text string identifying any fees imposed by the
	  * service provider. The keyword NONE shall be used to mean no fees. */
	fees: gml.CodeListType;
	/** Unordered list of one or more commonly used or formalised word(s) or phrase(s) used to describe the subject. When needed, the optional "type" can name the type of the associated list of keywords that shall all have the same type. Also when needed, the codeSpace attribute of that "type" can also reference the type name authority and/or thesaurus. (Largely based on MD_Keywords class in ISO 19115.) */
	keywords?: KeywordsType[];
	responsibleParty?: ResponsiblePartyType;
}
export interface ServiceType extends _ServiceType { constructor: { new(): ServiceType }; }
export var ServiceType: { new(): ServiceType };

/** Defines the spatial domain of a coverage offering. A server shall describe the spatial domain by its edges, using one or more gml:Envelope elements. The gml:EnvelopeWithTimePeriod element may be used in place of gml:Envelope, to add the time bounds of the coverage offering. Each of these elements describes a bounding box defined by two points in space (or two positions in space and two in time). This bounding box could simply duplicate the information in the lonLatEnvelope of CoverageOfferingBrief; but the intent is to describe the locations in more detail (e.g., in several different CRSs, or several rectangular areas instead of one overall bounding box).
  *
  * In addition, a server can describe the internal grid structure of a coverage offering, using a gml:Grid (or gml:RectifiedGrid) in addition to a gml:Envelope. This element can help clients assess the fitness of the gridded data for their use (e.g. its native resolution, inferred from the offsetVector of a gml:RectifiedGrid), and to formulate grid coverage requests expressed in the internal grid coordinate reference system.
  *
  * Finally, a server can describe the spatial domain by means of a (repeatable) gml:Polygon, representing the polygon(s) covered by the coverage spatial domain. This is particularly useful for areas that are poorly approximated by a gml:Envelope (such as satellite image swaths, island groups, other non-convex areas). */
interface _SpatialDomainType extends BaseType {
	Envelope: gml.EnvelopeProxyType[];
	Grid?: gml.GridProxyType[];
	Polygon?: gml.PolygonType[];
}
export interface SpatialDomainType extends _SpatialDomainType { constructor: { new(): SpatialDomainType }; }
export var SpatialDomainType: { new(): SpatialDomainType };

/** Definition of a subset of a coverage spatial domain. Currently, only a grid subset of a coverage domain. */
interface _SpatialSubsetType extends _SpatialDomainType {
	Envelope: gml.EnvelopeProxyType[];
	Grid: gml.GridProxyType[];
}
export interface SpatialSubsetType extends _SpatialSubsetType { constructor: { new(): SpatialSubsetType }; }
export var SpatialSubsetType: { new(): SpatialSubsetType };

/** Unordered list(s) of identifiers of Coordinate Reference Systems (CRSs) supported in server operation requests and responses. */
interface _SupportedCRSsType extends BaseType {
	/** Unordered list of identifiers of the CRSs in which the server stores this data, that is, the CRS(s) in which data can be obtained without any distortion or degradation. */
	nativeCRSs?: gml.CodeListType[];
	/** Unordered list of identifiers of the CRSs in which the server can accept requests for this data. These CRSs should include the native CRSs defined below. */
	requestCRSs: gml.CodeListType[];
	/** Unordered list of identifiers of the CRSs in which the server can both accept requests and deliver responses for this data. These CRSs should include the native CRSs defined below. */
	requestResponseCRSs: gml.CodeListType[];
	/** Unordered list of identifiers of the CRSs in which the server can deliver responses for this data. These CRSs should include the native CRSs defined below. */
	responseCRSs: gml.CodeListType[];
}
export interface SupportedCRSsType extends _SupportedCRSsType { constructor: { new(): SupportedCRSsType }; }
export var SupportedCRSsType: { new(): SupportedCRSsType };

/** Unordered list of data transfer formats supported. */
interface _SupportedFormatsType extends BaseType {
	/** Identifiers of one format in which the data is stored. */
	nativeFormat?: string;
	/** Identifiers of one or more formats in which coverage content can be retrieved. The codeSpace optional attribute can reference the semantic of the format identifiers. */
	formats: gml.CodeListType[];
}
export interface SupportedFormatsType extends _SupportedFormatsType { constructor: { new(): SupportedFormatsType }; }
export var SupportedFormatsType: { new(): SupportedFormatsType };

/** Unordered list of interpolation methods supported. */
interface _SupportedInterpolationsType extends BaseType {
	default?: InterpolationMethodType;
	interpolationMethod: InterpolationMethodType[];
}
export interface SupportedInterpolationsType extends _SupportedInterpolationsType { constructor: { new(): SupportedInterpolationsType }; }
export var SupportedInterpolationsType: { new(): SupportedInterpolationsType };

/** Telephone numbers for contacting the responsible individual or
  * organization. */
interface _TelephoneType extends BaseType {
	/** Telephone number of a facsimile machine for the
	  * responsibleorganization or individual. */
	facsimile?: string[];
	/** Telephone number by which individuals can speak to the
	  * responsible organization or individual. */
	voice?: string[];
}
export interface TelephoneType extends _TelephoneType { constructor: { new(): TelephoneType }; }
export var TelephoneType: { new(): TelephoneType };

/** This is a variation of the GML TimePeriod, which allows the beginning and end of a time-period to be expressed in short-form inline using the begin/endPosition element, which allows an identifiable TimeInstant to be defined simultaneously with using it, or by reference, using xlinks on the begin/end elements. */
interface _TimePeriodType extends BaseType {
	frame?: string;
	beginPosition: gml.TimePositionType;
	endPosition: gml.TimePositionType;
	timeResolution?: string;
}
export interface TimePeriodType extends _TimePeriodType { constructor: { new(): TimePeriodType }; }
export var TimePeriodType: { new(): TimePeriodType };

/** An ordered sequence of time positions or intervals. The time positions and periods shall be ordered from the oldest to the newest. */
interface _TimeSequenceType extends BaseType {
	timePeriod: TimePeriodType[];
	/** Direct representation of a temporal position. */
	timePosition: gml.TimePositionType[];
}
export interface TimeSequenceType extends _TimeSequenceType { constructor: { new(): TimeSequenceType }; }
export var TimeSequenceType: { new(): TimeSequenceType };

/** A single value for a variable, encoded as a string. This type can be used for one value, for a spacing between allowed values, or for the default value of a parameter. The "type" attribute indicates the datatype of this value (default is a string). The value for a typed literal is found by applying the datatype mapping associated with the datatype URI to the lexical form string. */
interface _TypedLiteralType extends Primitive._string {
	/** Datatype of a typed literal value. This URI typically references XSD simple types. It has the same semantic as rdf:datatype. */
	type?: string;
}
export interface TypedLiteralType extends _TypedLiteralType { constructor: { new(): TypedLiteralType }; }
export var TypedLiteralType: { new(): TypedLiteralType };

/** List of all the valid values and/or ranges of values for this variable. For numeric variables, signed values shall be ordered from negative infinity to positive infinity. For intervals, the "type" and "semantic" attributes are inherited by children elements, but can be superceded by them. */
interface _valueEnumBaseType extends BaseType {
	interval: intervalType[];
	/** A single value for a quantity. */
	singleValue: TypedLiteralType[];
}
export interface valueEnumBaseType extends _valueEnumBaseType { constructor: { new(): valueEnumBaseType }; }
export var valueEnumBaseType: { new(): valueEnumBaseType };

/** List of all the valid values and/or intervals of values for this variable. For numeric variables, signed values shall be ordered from negative infinity to positive infinity. For intervals, the type and semantic attributes are inherited by children elements, but can be superceded here. */
interface _valueEnumType extends _valueEnumBaseType {
	/** Definition of the semantics or meaning of the values in the XML element it belongs to. The value of this "semantic" attribute can be a RDF Property or Class of a taxonomy or ontology. */
	semantic?: string;
	/** Datatype of a typed literal value. This URI typically references XSD simple types. It has the same semantic as rdf:datatype. */
	type?: string;
}
export interface valueEnumType extends _valueEnumType { constructor: { new(): valueEnumType }; }
export var valueEnumType: { new(): valueEnumType };

/** The range of an interval. If the "min" or "max" element is not included, there is no value limit in that direction. Inclusion of the specified minimum and maximum values in the range shall be defined by the "closure". (The interval can be bounded or semi-bounded with different closures.) The data type and the semantic of the values are inherited by children and may be superceded by them. This range may be qualitative, i.e., nominal (age range) or qualitative (percentage) meaning that a value between min/max can be queried. */
interface _valueRangeType extends BaseType {
	/** What does this attribute mean? Is it useful and not redundant? When should this attribute be included or omitted? TBD. */
	atomic?: boolean;
	/** Specifies which of the minimum and maximum values are included in the range. Note that plus and minus infinity are considered closed bounds. */
	closure?: ClosureType;
	/** Definition of the semantics or meaning of the values in the XML element it belongs to. The value of this "semantic" attribute can be a RDF Property or Class of a taxonomy or ontology. */
	semantic?: string;
	/** Datatype of a typed literal value. This URI typically references XSD simple types. It has the same semantic as rdf:datatype. */
	type?: string;
	/** Maximum value of this numeric parameter. */
	max?: TypedLiteralType;
	/** Minimum value of this numeric parameter. */
	min?: TypedLiteralType;
}
export interface valueRangeType extends _valueRangeType { constructor: { new(): valueRangeType }; }
export var valueRangeType: { new(): valueRangeType };

/** Metadata for a WCS server, also known as Capabilities document. Reply
  * from a WCS that performed the GetCapabilities operation. */
interface _WCS_CapabilitiesType extends BaseType {
	/** Service metadata (Capabilities) document version, having values
	  * that are "increased" whenever any change is made in service metadata document.
	  * Values are selected by each server, and are always opaque to clients. When
	  * supported by server, server shall return this attribute. */
	updateSequence?: string;
	version: string;
	Capability: WCSCapabilityType;
	/** Unordered list of brief descriptions of all coverages avaialble from
	  * this WCS, or a reference to another service from which this information is
	  * available. */
	ContentMetadata: ContentMetadataType;
	Service: ServiceType;
}
export interface WCS_CapabilitiesType extends _WCS_CapabilitiesType { constructor: { new(): WCS_CapabilitiesType }; }
export var WCS_CapabilitiesType: { new(): WCS_CapabilitiesType };

/** XML encoded WCS GetCapabilities operation response. The Capabilities
  * document provides clients with service metadata about a specific service instance,
  * including metadata about the coverages served. */
interface _WCSCapabilityType extends BaseType {
	/** Service metadata document version, having values that are
	  * "increased" whenever any change is made in service metadata document. Values are
	  * selected by each server, and are always opaque to clients. When not supported by
	  * server, server shall not return this attribute. */
	updateSequence?: string;
	version?: string;
	Exception: WCSCapabilityTypeExceptionType;
	Request: WCSCapabilityTypeRequestType;
	VendorSpecificCapabilities?: WCSCapabilityTypeVendorSpecificCapabilitiesType;
}
export interface WCSCapabilityType extends _WCSCapabilityType { constructor: { new(): WCSCapabilityType }; }
export var WCSCapabilityType: { new(): WCSCapabilityType };

interface _WCSCapabilityTypeExceptionType extends BaseType {
	Format: string[];
}
interface WCSCapabilityTypeExceptionType extends _WCSCapabilityTypeExceptionType { constructor: { new(): WCSCapabilityTypeExceptionType }; }

interface _WCSCapabilityTypeRequestType extends BaseType {
	DescribeCoverage: WCSCapabilityTypeRequestTypeDescribeCoverageType;
	GetCapabilities: WCSCapabilityTypeRequestTypeGetCapabilitiesType;
	GetCoverage: WCSCapabilityTypeRequestTypeGetCoverageType;
}
interface WCSCapabilityTypeRequestType extends _WCSCapabilityTypeRequestType { constructor: { new(): WCSCapabilityTypeRequestType }; }

interface _WCSCapabilityTypeRequestTypeDescribeCoverageType extends BaseType {
	DCPType: DCPTypeType[];
}
interface WCSCapabilityTypeRequestTypeDescribeCoverageType extends _WCSCapabilityTypeRequestTypeDescribeCoverageType { constructor: { new(): WCSCapabilityTypeRequestTypeDescribeCoverageType }; }

interface _WCSCapabilityTypeRequestTypeGetCapabilitiesType extends BaseType {
	DCPType: DCPTypeType[];
}
interface WCSCapabilityTypeRequestTypeGetCapabilitiesType extends _WCSCapabilityTypeRequestTypeGetCapabilitiesType { constructor: { new(): WCSCapabilityTypeRequestTypeGetCapabilitiesType }; }

interface _WCSCapabilityTypeRequestTypeGetCoverageType extends BaseType {
	DCPType: DCPTypeType[];
}
interface WCSCapabilityTypeRequestTypeGetCoverageType extends _WCSCapabilityTypeRequestTypeGetCoverageType { constructor: { new(): WCSCapabilityTypeRequestTypeGetCoverageType }; }

interface _WCSCapabilityTypeVendorSpecificCapabilitiesType extends BaseType {}
interface WCSCapabilityTypeVendorSpecificCapabilitiesType extends _WCSCapabilityTypeVendorSpecificCapabilitiesType { constructor: { new(): WCSCapabilityTypeVendorSpecificCapabilitiesType }; }

export interface document extends BaseType {
	/** GML property containing one AxisDescription GML object. */
	axisDescription: AxisDescriptionType_2[];
	Capability: WCSCapabilityType;
	/** Unordered list of brief descriptions of all coverages avaialble from
	  * this WCS, or a reference to another service from which this information is
	  * available. */
	ContentMetadata: ContentMetadataType;
	/** Reply from a WCS that performed the DescribeCoverage operation, containing one or more full coverage offering descriptions. */
	CoverageDescription: CoverageDescriptionType;
	CoverageOffering: CoverageOfferingType;
	CoverageOfferingBrief: CoverageOfferingBriefType;
	/** Request to a WCS to perform the DescribeCoverage operation. In this XML encoding, no "request" parameter is included, since the element name specifies the specific operation. */
	DescribeCoverage: DescribeCoverageType;
	/** Contains a simple text description of the object. For WCS use, removed optional AssociationAttributeGroup from gml:description. */
	description: string;
	domainSet: DomainSetType;
	/** Identifiers of one or more formats in which coverage content can be retrieved. The codeSpace optional attribute can reference the semantic of the format identifiers. */
	formats: gml.CodeListType;
	/** Request to a WCS to perform the GetCapabilities operation. In this XML
	  * encoding, no "request" parameter is included, since the element name specifies the
	  * specific operation. */
	GetCapabilities: GetCapabilitiesType;
	/** Request to a WCS to perform the GetCoverage operation. In this XML encoding, no "request" parameter is included, since the element name specifies the specific operation. */
	GetCoverage: GetCoverageType;
	interpolationMethod: InterpolationMethodType;
	interval: intervalType;
	/** Unordered list of one or more commonly used or formalised word(s) or phrase(s) used to describe the subject. When needed, the optional "type" can name the type of the associated list of keywords that shall all have the same type. Also when needed, the codeSpace attribute of that "type" can also reference the type name authority and/or thesaurus. (Largely based on MD_Keywords class in ISO 19115.) */
	keywords: KeywordsType;
	lonLatEnvelope: LonLatEnvelopeType;
	metadataLink: MetadataLinkType;
	/** Identifier for the object, normally a descriptive name. For WCS use, removed optional CodeSpace attribute from gml:name. */
	name: string;
	/** GML property containing one RangeSet GML object. */
	rangeSet: RangeSetType_2[];
	Service: ServiceType;
	/** A single value for a quantity. */
	singleValue: TypedLiteralType;
	spatialDomain: SpatialDomainType;
	spatialSubset: SpatialSubsetType;
	supportedCRSs: SupportedCRSsType;
	supportedFormats: SupportedFormatsType;
	supportedInterpolations: SupportedInterpolationsType;
	/** Defines the temporal domain of a coverage offering, that is, the times for which valid data are available. The times shall to be ordered from the oldest to the newest. */
	temporalDomain: TimeSequenceType;
	temporalSubset: TimeSequenceType;
	timePeriod: TimePeriodType;
	TimeSequence: TimeSequenceType;
	WCS_Capabilities: WCS_CapabilitiesType;
}
export var document: document;
