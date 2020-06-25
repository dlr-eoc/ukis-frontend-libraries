import * as Primitive from '../../xml-primitives';
import * as xlink from '../../www.w3.org/1999/xlink';
import * as xml from '../../www.w3.org/XML/1998/namespace';

// Source files:
// http://schemas.opengis.net/ows/2.0/ows19115subset.xsd
// http://schemas.opengis.net/ows/2.0/owsAdditionalParameters.xsd
// http://schemas.opengis.net/ows/2.0/owsAll.xsd
// http://schemas.opengis.net/ows/2.0/owsCommon.xsd
// http://schemas.opengis.net/ows/2.0/owsContents.xsd
// http://schemas.opengis.net/ows/2.0/owsDataIdentification.xsd
// http://schemas.opengis.net/ows/2.0/owsDomainType.xsd
// http://schemas.opengis.net/ows/2.0/owsExceptionReport.xsd
// http://schemas.opengis.net/ows/2.0/owsGetCapabilities.xsd
// http://schemas.opengis.net/ows/2.0/owsGetResourceByID.xsd
// http://schemas.opengis.net/ows/2.0/owsInputOutputData.xsd
// http://schemas.opengis.net/ows/2.0/owsManifest.xsd
// http://schemas.opengis.net/ows/2.0/owsOperationsMetadata.xsd
// http://schemas.opengis.net/ows/2.0/owsServiceIdentification.xsd
// http://schemas.opengis.net/ows/2.0/owsServiceProvider.xsd


interface BaseType {
	_exists: boolean;
	_namespace: string;
}
interface _AbstractMetaDataProxyType extends BaseType {
	/** One additional metadata parameter. */
	AdditionalParameter?: AdditionalParameterType;
}
interface AbstractMetaDataProxyType extends _AbstractMetaDataProxyType { constructor: { new(): AbstractMetaDataProxyType }; }

interface _AbstractReferenceBaseProxyType extends _ReferenceProxyType {}
interface AbstractReferenceBaseProxyType extends _AbstractReferenceBaseProxyType { constructor: { new(): AbstractReferenceBaseProxyType }; }

/** Base for a reference to a remote or local
  * resource.This type contains only a restricted and annotated set of
  * the attributes from the xlink:simpleAttrs attributeGroup. */
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

/** Prioritized sequence of zero or more GetCapabilities
  * operation response formats desired by client, with preferred formats
  * listed first. Each response format shall be identified by its MIME type.
  * See AcceptFormats parameter use subclause for more
  * information. */
interface _AcceptFormatsType extends BaseType {
	OutputFormat?: string[];
}
export interface AcceptFormatsType extends _AcceptFormatsType { constructor: { new(): AcceptFormatsType }; }
export var AcceptFormatsType: { new(): AcceptFormatsType };

/** Prioritized sequence of one or more specification
  * versions accepted by client, with preferred versions listed first. See
  * Version negotiation subclause for more information. */
interface _AcceptVersionsType extends BaseType {
	Version: string[];
}
export interface AcceptVersionsType extends _AcceptVersionsType { constructor: { new(): AcceptVersionsType }; }
export var AcceptVersionsType: { new(): AcceptVersionsType };

interface _AdditionalParametersBaseType extends _MetadataType {
	/** One additional metadata parameter. */
	AdditionalParameter: AdditionalParameterType;
}
export interface AdditionalParametersBaseType extends _AdditionalParametersBaseType { constructor: { new(): AdditionalParametersBaseType }; }
export var AdditionalParametersBaseType: { new(): AdditionalParametersBaseType };

interface _AdditionalParametersType extends _AdditionalParametersBaseType {
	/** One additional metadata parameter. */
	AdditionalParameter: AdditionalParameterType; // Manually changed from `AdditionalParameter?: AdditionalParameterType[];`
}
export interface AdditionalParametersType extends _AdditionalParametersType { constructor: { new(): AdditionalParametersType }; }
export var AdditionalParametersType: { new(): AdditionalParametersType };

interface _AdditionalParameterType extends BaseType {
	/** Name or identifier of this AdditionalParameter,
	  * unique for this OGC Web Service. */
	Name: CodeType;
	/** Unordered list of one or more values of this
	  * AdditionalParameter. */
	Value: any[];
}
interface AdditionalParameterType extends _AdditionalParameterType { constructor: { new(): AdditionalParameterType }; }

/** Location of the responsible individual or
  * organization. */
interface _AddressType extends BaseType {
	/** State or province of the location. */
	AdministrativeArea?: string;
	/** City of the location. */
	City?: string;
	/** Country of the physical address. */
	Country?: string;
	/** Address line for the location. */
	DeliveryPoint?: string[];
	/** Address of the electronic mailbox of the responsible
	  * organization or individual. */
	ElectronicMailAddress?: string[];
	/** ZIP or other postal code. */
	PostalCode?: string;
}
export interface AddressType extends _AddressType { constructor: { new(): AddressType }; }
export var AddressType: { new(): AddressType };

interface _AllowedValuesType extends BaseType {
	Range: RangeType[];
	Value: string[];
}
interface AllowedValuesType extends _AllowedValuesType { constructor: { new(): AllowedValuesType }; }

interface _AnyValueType extends BaseType {}
interface AnyValueType extends _AnyValueType { constructor: { new(): AnyValueType }; }

interface _AvailableCRSProxyType extends BaseType {
	AvailableCRS?: string;
	/** Coordinate reference system in which data from this
	  * data(set) or resource is available or supported. More specific parameter
	  * names should be used by specific OWS specifications wherever applicable.
	  * More than one such parameter can be included for different
	  * purposes. */
	SupportedCRS?: string;
}
interface AvailableCRSProxyType extends _AvailableCRSProxyType { constructor: { new(): AvailableCRSProxyType }; }

/** Basic metadata identifying and describing a set of
  * data. */
interface _BasicIdentificationType extends _DescriptionType {
	/** Unique identifier or name of this
	  * dataset. */
	Identifier?: CodeType;
	Metadata?: MetadataProxyType[];
}
export interface BasicIdentificationType extends _BasicIdentificationType { constructor: { new(): BasicIdentificationType }; }
export var BasicIdentificationType: { new(): BasicIdentificationType };

interface _BoundingBoxProxyType extends BaseType {
	BoundingBox?: BoundingBoxType;
	WGS84BoundingBox?: WGS84BoundingBoxType;
}
interface BoundingBoxProxyType extends _BoundingBoxProxyType { constructor: { new(): BoundingBoxProxyType }; }

/** XML encoded minimum rectangular bounding box (or region)
  * parameter, surrounding all the associated data.This type is adapted from the EnvelopeType of GML 3.1,
  * with modified contents and documentation for encoding a MINIMUM size box
  * SURROUNDING all associated data. */
interface _BoundingBoxType extends BaseType {
	/** Usually references the definition of a CRS, as
	  * specified in [OGC Topic 2]. Such a CRS definition can be XML encoded
	  * using the gml:CoordinateReferenceSystemType in [GML 3.1]. For well
	  * known references, it is not required that a CRS definition exist at
	  * the location the URI points to. If no anyURI value is included, the
	  * applicable CRS must be either: a) Specified outside the bounding box,
	  * but inside a data structure that includes this bounding box, as
	  * specified for a specific OWS use of this bounding box type. b) Fixed
	  * and specified in the Implementation Specification for a specific OWS
	  * use of the bounding box type. */
	crs?: string;
	/** The number of dimensions in this CRS (the length of a
	  * coordinate sequence in this use of the PositionType). This number is
	  * specified by the CRS definition, but can also be specified
	  * here. */
	dimensions?: number;
	/** Position of the bounding box corner at which the
	  * value of each coordinate normally is the algebraic minimum within
	  * this bounding box. In some cases, this position is normally
	  * displayed at the top, such as the top left for some image
	  * coordinates. For more information, see Subclauses 10.2.5 and
	  * C.13. */
	LowerCorner: PositionType;
	/** Position of the bounding box corner at which the
	  * value of each coordinate normally is the algebraic maximum within
	  * this bounding box. In some cases, this position is normally
	  * displayed at the bottom, such as the bottom right for some image
	  * coordinates. For more information, see Subclauses 10.2.5 and
	  * C.13. */
	UpperCorner: PositionType;
}
export interface BoundingBoxType extends _BoundingBoxType { constructor: { new(): BoundingBoxType }; }
export var BoundingBoxType: { new(): BoundingBoxType };

/** XML encoded GetCapabilities operation response. This
  * document provides clients with service metadata about a specific service
  * instance, usually including metadata about the tightly-coupled data
  * served. If the server does not implement the updateSequence parameter,
  * the server shall always return the complete Capabilities document,
  * without the updateSequence parameter. When the server implements the
  * updateSequence parameter and the GetCapabilities operation request
  * included the updateSequence parameter with the current value, the server
  * shall return this element with only the "version" and "updateSequence"
  * attributes. Otherwise, all optional elements shall be included or not
  * depending on the actual value of the Contents parameter in the
  * GetCapabilities operation request. This base type shall be extended by
  * each specific OWS to include the additional contents
  * needed. */
interface _CapabilitiesBaseType extends BaseType {
	/** Service metadata document version, having values that
	  * are "increased" whenever any change is made in service metadata
	  * document. Values are selected by each server, and are always opaque to
	  * clients. When not supported by server, server shall not return this
	  * attribute. */
	updateSequence?: string;
	version: string;
	/** The list of languages that this service is able to
	  * fully support. That is, if one of the listed languages is requested
	  * using the AcceptLanguages parameter in future requests to the
	  * server, all text strings contained in the response are guaranteed to
	  * be in that language. This list does not necessarily constitute a
	  * complete list of all languages that may be (at least partially)
	  * supported by the server. It only states the languages that are fully
	  * supported. If a server cannot guarantee full support of any
	  * particular language, it shall omit it from the list of supported
	  * languages in the capabilities document. */
	Languages?: CapabilitiesBaseTypeLanguagesType;
	/** Metadata about the operations and related abilities
	  * specified by this service and implemented by this server, including the
	  * URLs for operation requests. The basic contents of this section shall be
	  * the same for all OWS types, but individual services can add elements
	  * and/or change the optionality of optional elements. */
	OperationsMetadata?: OperationsMetadataType;
	/** General metadata for this specific server. This XML
	  * Schema of this section shall be the same for all OWS. */
	ServiceIdentification?: ServiceIdentificationType;
	/** Metadata about the organization that provides this
	  * specific service instance or server. */
	ServiceProvider?: ServiceProviderType;
}
export interface CapabilitiesBaseType extends _CapabilitiesBaseType { constructor: { new(): CapabilitiesBaseType }; }
export var CapabilitiesBaseType: { new(): CapabilitiesBaseType };

interface _CapabilitiesBaseTypeLanguagesType extends BaseType {
	/** Identifier of a language used by the data(set) contents.
	  * This language identifier shall be as specified in IETF RFC 4646. The
	  * language tags shall be either complete 5 character codes (e.g. "en-CA"),
	  * or abbreviated 2 character codes (e.g. "en"). In addition to the RFC
	  * 4646 codes, the server shall support the single special value "*" which
	  * is used to indicate "any language". */
	Language: string[];
}
interface CapabilitiesBaseTypeLanguagesType extends _CapabilitiesBaseTypeLanguagesType { constructor: { new(): CapabilitiesBaseTypeLanguagesType }; }

/** Name or code with an (optional) authority. If the
  * codeSpace attribute is present, its value shall reference a dictionary,
  * thesaurus, or authority for the name or code, such as the organisation
  * who assigned the value, or the dictionary from which it is
  * taken.Type copied from basicTypes.xsd of GML 3 with
  * documentation edited, for possible use outside the ServiceIdentification
  * section of a service metadata document. */
interface _CodeType extends Primitive._string {
	codeSpace?: string;
}
export interface CodeType extends _CodeType { constructor: { new(): CodeType }; }
export var CodeType: { new(): CodeType };

/** Information required to enable contact with the
  * responsible person and/or organization.For OWS use in the service metadata document, the
  * optional hoursOfService and contactInstructions elements were retained,
  * as possibly being useful in the ServiceProvider section. */
interface _ContactType extends BaseType {
	/** Physical and email address at which the organization
	  * or individual may be contacted. */
	Address?: AddressType;
	/** Supplemental instructions on how or when to contact
	  * the individual or organization. */
	ContactInstructions?: string;
	/** Time period (including time zone) when individuals
	  * can contact the organization or individual. */
	HoursOfService?: string;
	/** On-line information that can be used to contact the
	  * individual or organization. OWS specifics: The xlink:href attribute
	  * in the xlink:simpleAttrs attribute group shall be used to reference
	  * this resource. Whenever practical, the xlink:href attribute with
	  * type anyURI should be a URL from which more contact information can
	  * be electronically retrieved. The xlink:title attribute with type
	  * "string" can be used to name this set of information. The other
	  * attributes in the xlink:simpleAttrs attribute group should not be
	  * used. */
	OnlineResource?: OnlineResourceType;
	/** Telephone numbers at which the organization or
	  * individual may be contacted. */
	Phone?: TelephoneType;
}
export interface ContactType extends _ContactType { constructor: { new(): ContactType }; }
export var ContactType: { new(): ContactType };

/** Contents of typical Contents section of an OWS service
  * metadata (Capabilities) document. This type shall be extended and/or
  * restricted if needed for specific OWS use to include the specific
  * metadata needed. */
interface _ContentsBaseType extends BaseType {
	DatasetDescriptionSummary?: DatasetDescriptionSummaryBaseType[];
	/** Reference to a source of metadata describing coverage
	  * offerings available from this server. This parameter can reference a
	  * catalogue server from which dataset metadata is available. This ability
	  * is expected to be used by servers with thousands or millions of
	  * datasets, for which searching a catalogue is more feasible than fetching
	  * a long Capabilities XML document. When no DatasetDescriptionSummaries
	  * are included, and one or more catalogue servers are referenced, this set
	  * of catalogues shall contain current metadata summaries for all the
	  * datasets currently available from this OWS server, with the metadata for
	  * each such dataset referencing this OWS server. */
	OtherSource?: MetadataType[];
}
export interface ContentsBaseType extends _ContentsBaseType { constructor: { new(): ContentsBaseType }; }
export var ContentsBaseType: { new(): ContentsBaseType };

/** Typical dataset metadata in typical Contents section of
  * an OWS service metadata (Capabilities) document. This type shall be
  * extended and/or restricted if needed for specific OWS use, to include
  * the specific Dataset description metadata needed. */
interface _DatasetDescriptionSummaryBaseType extends _DescriptionType {
	BoundingBox?: BoundingBoxProxyType[];
	DatasetDescriptionSummary?: DatasetDescriptionSummaryBaseType[];
	/** Unambiguous identifier or name of this coverage,
	  * unique for this server. */
	Identifier: CodeType;
	Metadata?: MetadataProxyType[];
	WGS84BoundingBox?: WGS84BoundingBoxType[];
}
export interface DatasetDescriptionSummaryBaseType extends _DatasetDescriptionSummaryBaseType { constructor: { new(): DatasetDescriptionSummaryBaseType }; }
export var DatasetDescriptionSummaryBaseType: { new(): DatasetDescriptionSummaryBaseType };

interface _DCPType extends BaseType {
	/** Connect point URLs for the HTTP Distributed Computing
	  * Platform (DCP). Normally, only one Get and/or one Post is included in
	  * this element. More than one Get and/or Post is allowed to support
	  * including alternative URLs for uses such as load balancing or
	  * backup. */
	HTTP: HTTPType;
}
interface DCPType extends _DCPType { constructor: { new(): DCPType }; }

/** Human-readable descriptive information for the object it
  * is included within. This type shall be extended if needed for specific
  * OWS use to include additional metadata for each type of information.
  * This type shall not be restricted for a specific OWS to change the
  * multiplicity (or optionality) of some elements. If the xml:lang
  * attribute is not included in a Title, Abstract or Keyword element, then
  * no language is specified for that element unless specified by another
  * means. All Title, Abstract and Keyword elements in the same Description
  * that share the same xml:lang attribute value represent the description
  * of the parent object in that language. Multiple Title or Abstract
  * elements shall not exist in the same Description with the same xml:lang
  * attribute value unless otherwise specified. */
interface _DescriptionType extends BaseType {
	/** Brief narrative description of this resource, normally
	  * used for display to humans. */
	Abstract?: LanguageStringType[];
	Keywords?: KeywordsType[];
	/** Title of this resource, normally used for display to
	  * humans. */
	Title?: LanguageStringType[];
}
export interface DescriptionType extends _DescriptionType { constructor: { new(): DescriptionType }; }
export var DescriptionType: { new(): DescriptionType };

/** References metadata about a quantity, and provides a name
  * for this metadata. (Informative: This element was simplified from the
  * metaDataProperty element in GML 3.0.) */
interface _DomainMetadataType extends Primitive._string {
	/** Reference to data or metadata recorded elsewhere, either
	  * external to this XML document or within it. Whenever practical, this
	  * attribute should be a URL from which this metadata can be electronically
	  * retrieved. Alternately, this attribute can reference a URN for
	  * well-known metadata. For example, such a URN could be a URN defined in
	  * the "ogc" URN namespace. */
	reference?: string;
}
export interface DomainMetadataType extends _DomainMetadataType { constructor: { new(): DomainMetadataType }; }
export var DomainMetadataType: { new(): DomainMetadataType };

/** Valid domain (or allowed set of values) of one quantity,
  * with its name or identifier. */
interface _DomainType extends _UnNamedDomainType {
	/** Name or identifier of this
	  * quantity. */
	name: string;
}
export interface DomainType extends _DomainType { constructor: { new(): DomainType }; }
export var DomainType: { new(): DomainType };

interface _ExceptionReportType extends BaseType {
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
	/** Specification version for OWS operation. The string
	  * value shall contain one x.y.z "version" value (e.g., "2.1.3"). A
	  * version number shall contain three non-negative integers separated
	  * by decimal points, in the form "x.y.z". The integers y and z shall
	  * not exceed 99. Each version shall be for the Implementation
	  * Specification (document) and the associated XML Schemas to which
	  * requested operations will conform. An Implementation Specification
	  * version normally specifies XML Schemas against which an XML encoded
	  * operation response must conform and should be validated. See Version
	  * negotiation subclause for more information. */
	version: string;
	Exception: ExceptionType[];
}
interface ExceptionReportType extends _ExceptionReportType { constructor: { new(): ExceptionReportType }; }

type ExceptionReportTypeVersionType = string;
type _ExceptionReportTypeVersionType = Primitive._string;

/** An Exception element describes one detected error that a
  * server chooses to convey to the client. */
interface _ExceptionType extends BaseType {
	/** A code representing the type of this exception, which
	  * shall be selected from a set of exceptionCode values specified for the
	  * specific service operation and server. */
	exceptionCode: string;
	/** When included, this locator shall indicate to the
	  * client where an exception was encountered in servicing the client's
	  * operation request. This locator should be included whenever meaningful
	  * information can be provided by the server. The contents of this
	  * locator will depend on the specific exceptionCode and OWS service, and
	  * shall be specified in the OWS Implementation
	  * Specification. */
	locator?: string;
	/** Ordered sequence of text strings that describe this
	  * specific exception or error. The contents of these strings are left
	  * open to definition by each server implementation. A server is
	  * strongly encouraged to include at least one ExceptionText value, to
	  * provide more information about the detected error than provided by
	  * the exceptionCode. When included, multiple ExceptionText values
	  * shall provide hierarchical information about one detected error,
	  * with the most significant information listed first. */
	ExceptionText?: string[];
}
export interface ExceptionType extends _ExceptionType { constructor: { new(): ExceptionType }; }
export var ExceptionType: { new(): ExceptionType };

/** XML encoded GetCapabilities operation request. This
  * operation allows clients to retrieve service metadata about a specific
  * service instance. In this XML encoding, no "request" parameter is
  * included, since the element name specifies the specific operation. This
  * base type shall be extended by each specific OWS to include the
  * additional required "service" attribute, with the correct value for that
  * OWS. */
interface _GetCapabilitiesType extends BaseType {
	/** When omitted or not supported by server, server shall
	  * return latest complete service metadata document. */
	updateSequence?: string;
	/** When omitted or not supported by server, server shall
	  * return service metadata document using the MIME type
	  * "text/xml". */
	AcceptFormats?: AcceptFormatsType;
	/** Ordered list of languages desired by the client for
	  * all human readable text in the response, in order of preference. For
	  * every element, the first matching language available from the server
	  * shall be present in the response. */
	AcceptLanguages?: GetCapabilitiesTypeAcceptLanguagesType;
	/** When omitted, server shall return latest supported
	  * version. */
	AcceptVersions?: AcceptVersionsType;
	/** When omitted or not supported by server, server shall
	  * return complete service metadata (Capabilities)
	  * document. */
	Sections?: SectionsType;
}
export interface GetCapabilitiesType extends _GetCapabilitiesType { constructor: { new(): GetCapabilitiesType }; }
export var GetCapabilitiesType: { new(): GetCapabilitiesType };

interface _GetCapabilitiesTypeAcceptLanguagesType extends BaseType {
	/** Identifier of a language used by the data(set) contents.
	  * This language identifier shall be as specified in IETF RFC 4646. The
	  * language tags shall be either complete 5 character codes (e.g. "en-CA"),
	  * or abbreviated 2 character codes (e.g. "en"). In addition to the RFC
	  * 4646 codes, the server shall support the single special value "*" which
	  * is used to indicate "any language". */
	Language: string[];
}
interface GetCapabilitiesTypeAcceptLanguagesType extends _GetCapabilitiesTypeAcceptLanguagesType { constructor: { new(): GetCapabilitiesTypeAcceptLanguagesType }; }

/** Request to a service to perform the GetResourceByID
  * operation. This operation allows a client to retrieve one or more
  * identified resources, including datasets and resources that describe
  * datasets or parameters. In this XML encoding, no "request" parameter is
  * included, since the element name specifies the specific
  * operation. */
interface _GetResourceByIdType extends BaseType {
	service: string;
	version: string;
	/** Reference to a format in which this data can be encoded
	  * and transferred. More specific parameter names should be used by
	  * specific OWS specifications wherever applicable. More than one such
	  * parameter can be included for different purposes. */
	OutputFormat?: string;
	/** Unordered list of zero or more resource identifiers.
	  * These identifiers can be listed in the Contents section of the
	  * service metadata (Capabilities) document. For more information on
	  * this parameter, see Subclause 9.4.2.1 of the OWS Common
	  * specification. */
	ResourceID?: string[];
}
export interface GetResourceByIdType extends _GetResourceByIdType { constructor: { new(): GetResourceByIdType }; }
export var GetResourceByIdType: { new(): GetResourceByIdType };

interface _HTTPType extends BaseType {
	/** Connect point URL prefix and any constraints for
	  * the HTTP "Get" request method for this operation
	  * request. */
	Get: RequestMethodType[];
	/** Connect point URL and any constraints for the HTTP
	  * "Post" request method for this operation request. */
	Post: RequestMethodType[];
}
interface HTTPType extends _HTTPType { constructor: { new(): HTTPType }; }

/** Extended metadata identifying and describing a set of
  * data. This type shall be extended if needed for each specific OWS to
  * include additional metadata for each type of dataset. If needed, this
  * type should first be restricted for each specific OWS to change the
  * multiplicity (or optionality) of some elements. */
interface _IdentificationType extends _BasicIdentificationType {
	AvailableCRS?: AvailableCRSProxyType[];
	BoundingBox?: BoundingBoxProxyType[];
	/** Reference to a format in which this data can be encoded
	  * and transferred. More specific parameter names should be used by
	  * specific OWS specifications wherever applicable. More than one such
	  * parameter can be included for different purposes. */
	OutputFormat?: string[];
}
export interface IdentificationType extends _IdentificationType { constructor: { new(): IdentificationType }; }
export var IdentificationType: { new(): IdentificationType };

/** Unordered list of one or more commonly used or formalised
  * word(s) or phrase(s) used to describe the subject. When needed, the
  * optional "type" can name the type of the associated list of keywords
  * that shall all have the same type. Also when needed, the codeSpace
  * attribute of that "type" can reference the type name authority and/or
  * thesaurus. If the xml:lang attribute is not included in a Keyword
  * element, then no language is specified for that element unless specified
  * by another means. All Keyword elements in the same Keywords element that
  * share the same xml:lang attribute value represent different keywords in
  * that language.For OWS use, the optional thesaurusName element was
  * omitted as being complex information that could be referenced by the
  * codeSpace attribute of the Type element. */
interface _KeywordsType extends BaseType {
	Keyword: LanguageStringType[];
	Type?: CodeType;
}
export interface KeywordsType extends _KeywordsType { constructor: { new(): KeywordsType }; }
export var KeywordsType: { new(): KeywordsType };

/** Text string with the language of the string identified as
  * recommended in the XML 1.0 W3C Recommendation, section
  * 2.12. */
interface _LanguageStringType extends Primitive._string {
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
}
export interface LanguageStringType extends _LanguageStringType { constructor: { new(): LanguageStringType }; }
export var LanguageStringType: { new(): LanguageStringType };

/** Unordered list of one or more groups of references to
  * remote and/or local resources. */
interface _ManifestType extends _BasicIdentificationType {
	ReferenceGroup: ReferenceGroupType[];
}
export interface ManifestType extends _ManifestType { constructor: { new(): ManifestType }; }
export var ManifestType: { new(): ManifestType };

interface _MetadataProxyType extends BaseType {
	Metadata?: MetadataType;
	/** Unordered list of one or more
	  * AdditionalParameters. */
	AdditionalParameters?: AdditionalParametersType;
}
interface MetadataProxyType extends _MetadataProxyType { constructor: { new(): MetadataProxyType }; }

/** This element either references or contains more metadata
  * about the element that includes this element. To reference metadata
  * stored remotely, at least the xlinks:href attribute in xlink:simpleAttrs
  * shall be included. Either at least one of the attributes in
  * xlink:simpleAttrs or a substitute for the AbstractMetaData element shall
  * be included, but not both. An Implementation Specification can restrict
  * the contents of this element to always be a reference or always contain
  * metadata. (Informative: This element was adapted from the
  * metaDataProperty element in GML 3.0.) */
interface _MetadataType extends _AbstractMetaDataProxyType {
	/** Optional reference to the aspect of the element which
	  * includes this "metadata" element that this metadata provides more
	  * information about. */
	about?: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface MetadataType extends _MetadataType { constructor: { new(): MetadataType }; }
export var MetadataType: { new(): MetadataType };

/** XML encoded identifier of a standard MIME type, possibly
  * a parameterized MIME type. */
export type MimeType = string;
type _MimeType = Primitive._string;

/** The value used (e.g. -255) to represent a nil value with
  * optional nilReason and codeSpace attributes. */
interface _NilValueType extends _CodeType {
	/** An anyURI value which refers to a resource that
	  * describes the reason for the nil value */
	nilReason?: string;
}
export interface NilValueType extends _NilValueType { constructor: { new(): NilValueType }; }
export var NilValueType: { new(): NilValueType };

interface _NoValuesType extends BaseType {}
interface NoValuesType extends _NoValuesType { constructor: { new(): NoValuesType }; }

/** Reference to on-line resource from which data can be
  * obtained.For OWS use in the service metadata document, the
  * CI_OnlineResource class was XML encoded as the attributeGroup
  * "xlink:simpleAttrs", as used in GML. */
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
	/** Optional unordered list of valid domain constraints
	  * on non-parameter quantities that each apply to this server. The
	  * list of required and optional constraints shall be specified in
	  * the Implementation Specification for this service. */
	Constraint?: DomainType[];
	/** Individual software vendors and servers can use this
	  * element to provide metadata about any additional server
	  * abilities. */
	ExtendedCapabilities?: any;
	/** Metadata for one operation that this server
	  * implements. */
	Operation: OperationType[];
	/** Optional unordered list of parameter valid domains
	  * that each apply to one or more operations which this server
	  * interface implements. The list of required and optional parameter
	  * domain limitations shall be specified in the Implementation
	  * Specification for this service. */
	Parameter?: DomainType[];
}
interface OperationsMetadataType extends _OperationsMetadataType { constructor: { new(): OperationsMetadataType }; }

interface _OperationType extends BaseType {
	/** Name or identifier of this operation (request) (for
	  * example, GetCapabilities). The list of required and optional
	  * operations implemented shall be specified in the Implementation
	  * Specification for this service. */
	name: string;
	/** Optional unordered list of valid domain constraints
	  * on non-parameter quantities that each apply to this operation. If
	  * one of these Constraint elements has the same "name" attribute as
	  * a Constraint element in the OperationsMetadata element, this
	  * Constraint element shall override the other one for this
	  * operation. The list of required and optional constraints for this
	  * operation shall be specified in the Implementation Specification
	  * for this service. */
	Constraint?: DomainType[];
	/** Information for one distributed Computing Platform (DCP)
	  * supported for this operation. At present, only the HTTP DCP is defined,
	  * so this element only includes the HTTP element. */
	DCP: DCPType[];
	Metadata?: MetadataProxyType[];
	/** Optional unordered list of parameter domains that
	  * each apply to this operation which this server implements. If one
	  * of these Parameter elements has the same "name" attribute as a
	  * Parameter element in the OperationsMetadata element, this
	  * Parameter element shall override the other one for this operation.
	  * The list of required and optional parameter domain limitations for
	  * this operation shall be specified in the Implementation
	  * Specification for this service. */
	Parameter?: DomainType[];
}
interface OperationType extends _OperationType { constructor: { new(): OperationType }; }

/** Position instances hold the coordinates of a position in
  * a coordinate reference system (CRS) referenced by the related "crs"
  * attribute or elsewhere. For an angular coordinate axis that is
  * physically continuous for multiple revolutions, but whose recorded
  * values can be discontinuous, special conditions apply when the bounding
  * box is continuous across the value discontinuity: a) If the bounding box
  * is continuous clear around this angular axis, then ordinate values of
  * minus and plus infinity shall be used. b) If the bounding box is
  * continuous across the value discontinuity but is not continuous clear
  * around this angular axis, then some non-normal value can be used if
  * specified for a specific OWS use of the BoundingBoxType. For more
  * information, see Subclauses 10.2.5 and C.13.This type is adapted from DirectPositionType and
  * doubleList of GML 3.1. The adaptations include omission of all the
  * attributes, since the needed information is included in the
  * BoundingBoxType. */
export type PositionType = number[];

/** Two-dimensional position instances hold the longitude and
  * latitude coordinates of a position in the 2D WGS 84 coordinate reference
  * system. The longitude value shall be listed first, followed by the
  * latitude value, both in decimal degrees. Latitude values shall range
  * from -90 to +90 degrees, and longitude values shall normally range from
  * -180 to +180 degrees. For the longitude axis, special conditions apply
  * when the bounding box is continuous across the +/- 180 degrees meridian
  * longitude value discontinuity: a) If the bounding box is continuous
  * clear around the Earth, then longitude values of minus and plus infinity
  * shall be used. b) If the bounding box is continuous across the value
  * discontinuity but is not continuous clear around the Earth, then some
  * non-normal value can be used if specified for a specific OWS use of the
  * WGS84BoundingBoxType. For more information, see Subclauses 10.4.5 and
  * C.13. */
export type PositionType2D = number[];

type RangeClosureType = ("closed" | "open" | "open-closed" | "closed-open");
interface _RangeClosureType extends Primitive._string { content: RangeClosureType; }

/** A range of values of a numeric parameter. This range can
  * be continuous or discrete, defined by a fixed spacing between adjacent
  * valid values. If the MinimumValue or MaximumValue is not included, there
  * is no value limit in that direction. Inclusion of the specified minimum
  * and maximum values in the range shall be defined by the
  * rangeClosure. */
interface _RangeType extends BaseType {
	/** Specifies which of the minimum and maximum values are
	  * included in the range. Note that plus and minus infinity are considered
	  * closed bounds. */
	rangeClosure?: RangeClosureType;
	/** Maximum value of this numeric parameter. */
	MaximumValue?: string;
	/** Minimum value of this numeric parameter. */
	MinimumValue?: string;
	/** The regular distance or spacing between the allowed
	  * values in a range. */
	Spacing?: string;
}
export interface RangeType extends _RangeType { constructor: { new(): RangeType }; }
export var RangeType: { new(): RangeType };

/** Logical group of one or more references to remote and/or
  * local resources, allowing including metadata about that group. A Group
  * can be used instead of a Manifest that can only contain one
  * group. */
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

/** Complete reference to a remote or local resource,
  * allowing including metadata about that resource. */
interface _ReferenceType extends _AbstractReferenceBaseType {
	/** Brief narrative description of this resource, normally
	  * used for display to humans. */
	Abstract?: LanguageStringType[];
	/** The format of the referenced resource. This
	  * element is omitted when the mime type is indicated in the http
	  * header of the reference. */
	Format?: string;
	/** Unique identifier or name of this
	  * dataset. */
	Identifier?: CodeType;
	Metadata?: MetadataProxyType[];
}
export interface ReferenceType extends _ReferenceType { constructor: { new(): ReferenceType }; }
export var ReferenceType: { new(): ReferenceType };

/** Connect point URL and any constraints for this HTTP
  * request method for this operation request. In the OnlineResourceType,
  * the xlink:href attribute in the xlink:simpleAttrs attribute group shall
  * be used to contain this URL. The other attributes in the
  * xlink:simpleAttrs attribute group should not be used. */
interface _RequestMethodType extends _OnlineResourceType {
	/** Optional unordered list of valid domain
	  * constraints on non-parameter quantities that each apply to this
	  * request method for this operation. If one of these Constraint
	  * elements has the same "name" attribute as a Constraint element
	  * in the OperationsMetadata or Operation element, this Constraint
	  * element shall override the other one for this operation. The
	  * list of required and optional constraints for this request
	  * method for this operation shall be specified in the
	  * Implementation Specification for this service. */
	Constraint?: DomainType[];
}
export interface RequestMethodType extends _RequestMethodType { constructor: { new(): RequestMethodType }; }
export var RequestMethodType: { new(): RequestMethodType };

/** Identification of, and means of communication with,
  * person responsible for the server.For OWS use in the ServiceProvider section of a service
  * metadata document, the optional organizationName element was removed,
  * since this type is always used with the ProviderName element which
  * provides that information. The mandatory "role" element was changed to
  * optional, since no clear use of this information is known in the
  * ServiceProvider section. */
interface _ResponsiblePartySubsetType extends BaseType {
	/** Address of the responsible party. */
	ContactInfo?: ContactType;
	/** Name of the responsible person: surname, given name,
	  * title separated by a delimiter. */
	IndividualName?: string;
	/** Role or position of the responsible
	  * person. */
	PositionName?: string;
	/** Function performed by the responsible party. Possible
	  * values of this Role shall include the values and the meanings listed in
	  * Subclause B.5.5 of ISO 19115:2003. */
	Role?: CodeType;
}
export interface ResponsiblePartySubsetType extends _ResponsiblePartySubsetType { constructor: { new(): ResponsiblePartySubsetType }; }
export var ResponsiblePartySubsetType: { new(): ResponsiblePartySubsetType };

/** Identification of, and means of communication with,
  * person responsible for the server. At least one of IndividualName,
  * OrganisationName, or PositionName shall be included. */
interface _ResponsiblePartyType extends BaseType {
	/** Address of the responsible party. */
	ContactInfo?: ContactType;
	/** Name of the responsible person: surname, given name,
	  * title separated by a delimiter. */
	IndividualName?: string;
	/** Name of the responsible organization. */
	OrganisationName?: string;
	/** Role or position of the responsible
	  * person. */
	PositionName?: string;
	/** Function performed by the responsible party. Possible
	  * values of this Role shall include the values and the meanings listed in
	  * Subclause B.5.5 of ISO 19115:2003. */
	Role: CodeType;
}
export interface ResponsiblePartyType extends _ResponsiblePartyType { constructor: { new(): ResponsiblePartyType }; }
export var ResponsiblePartyType: { new(): ResponsiblePartyType };

/** Unordered list of zero or more names of requested
  * sections in complete service metadata document. Each Section value shall
  * contain an allowed section name as specified by each OWS specification.
  * See Sections parameter subclause for more information. */
interface _SectionsType extends BaseType {
	Section?: string[];
}
export interface SectionsType extends _SectionsType { constructor: { new(): SectionsType }; }
export var SectionsType: { new(): SectionsType };

interface _ServiceIdentificationType extends _DescriptionType {
	/** Access constraint applied to assure the protection of
	  * privacy or intellectual property, or any other restrictions on
	  * retrieving or using data from or otherwise using this server. The
	  * reserved value NONE (case insensitive) shall be used to mean no access
	  * constraints are imposed. */
	AccessConstraints?: string[];
	/** Fees and terms for retrieving data from or otherwise
	  * using this server, including the monetary units as specified in ISO
	  * 4217. The reserved value NONE (case insensitive) shall be used to mean
	  * no fees or terms. */
	Fees?: string;
	/** Unordered list of identifiers of Application
	  * Profiles that are implemented by this server. This element
	  * should be included for each specified application profile
	  * implemented by this server. The identifier value should be
	  * specified by each Application Profile. If this element is
	  * omitted, no meaning is implied. */
	Profile?: string[];
	/** A service type name from a registry of
	  * services. For example, the values of the codeSpace URI and
	  * name and code string may be "OGC" and "catalogue." This type
	  * name is normally used for machine-to-machine
	  * communication. */
	ServiceType: CodeType;
	/** Unordered list of one or more versions of this
	  * service type implemented by this server. This information is
	  * not adequate for version negotiation, and shall not be used
	  * for that purpose. */
	ServiceTypeVersion: string[];
}
interface ServiceIdentificationType extends _ServiceIdentificationType { constructor: { new(): ServiceIdentificationType }; }

interface _ServiceProviderType extends BaseType {
	/** A unique identifier for the service provider
	  * organization. */
	ProviderName: string;
	/** Reference to the most relevant web site of the
	  * service provider. */
	ProviderSite?: OnlineResourceType;
	/** Information for contacting the service provider.
	  * The OnlineResource element within this ServiceContact element
	  * should not be used to reference a web site of the service
	  * provider. */
	ServiceContact: ResponsiblePartySubsetType;
}
interface ServiceProviderType extends _ServiceProviderType { constructor: { new(): ServiceProviderType }; }

/** Complete reference to a remote resource that needs to be
  * retrieved from an OWS using an XML-encoded operation request. This
  * element shall be used, within an InputData or Manifest element that is
  * used for input data, when that input data needs to be retrieved from
  * another web service using a XML-encoded OWS operation request. This
  * element shall not be used for local payload input data or for requesting
  * the resource from a web server using HTTP Get. */
interface _ServiceReferenceType extends _ReferenceType {
	/** The XML-encoded operation request message to be
	  * sent to request this input data from another web server using
	  * HTTP Post. */
	RequestMessage: any;
	/** Reference to the XML-encoded operation request
	  * message to be sent to request this input data from another web
	  * server using HTTP Post. The referenced message shall be attached
	  * to the same message (using the cid scheme), or be accessible
	  * using a URL. */
	RequestMessageReference: string;
}
export interface ServiceReferenceType extends _ServiceReferenceType { constructor: { new(): ServiceReferenceType }; }
export var ServiceReferenceType: { new(): ServiceReferenceType };

/** Service type identifier, where the string value is the
  * OWS type abbreviation, such as "WMS" or "WFS". */
export type ServiceType = string;
type _ServiceType = Primitive._string;

/** Telephone numbers for contacting the responsible
  * individual or organization. */
interface _TelephoneType extends BaseType {
	/** Telephone number of a facsimile machine for the
	  * responsible organization or individual. */
	Facsimile?: string[];
	/** Telephone number by which individuals can speak to
	  * the responsible organization or individual. */
	Voice?: string[];
}
export interface TelephoneType extends _TelephoneType { constructor: { new(): TelephoneType }; }
export var TelephoneType: { new(): TelephoneType };

/** Valid domain (or allowed set of values) of one quantity,
  * with needed metadata but without a quantity name or
  * identifier. */
interface _UnNamedDomainType extends BaseType {
	/** List of all the valid values and/or ranges of values for
	  * this quantity. For numeric quantities, signed values should be ordered
	  * from negative infinity to positive infinity. */
	AllowedValues: AllowedValuesType;
	/** Specifies that any value is allowed for this
	  * parameter. */
	AnyValue: AnyValueType;
	/** Definition of the data type of this set of values. In
	  * this case, the xlink:href attribute can reference a URN for a well-known
	  * data type. For example, such a URN could be a data type identification
	  * URN defined in the "ogc" URN namespace. */
	DataType?: DomainMetadataType;
	/** The default value for a quantity for which multiple
	  * values are allowed. */
	DefaultValue?: string;
	/** Definition of the meaning or semantics of this set of
	  * values. This Meaning can provide more specific, complete, precise,
	  * machine accessible, and machine understandable semantics about this
	  * quantity, relative to other available semantic information. For example,
	  * other semantic information is often provided in "documentation" elements
	  * in XML Schemas or "description" elements in GML objects. */
	Meaning?: DomainMetadataType;
	Metadata?: MetadataProxyType[];
	/** Specifies that no values are allowed for this parameter
	  * or quantity. */
	NoValues: NoValuesType;
	/** Definition of the reference system used by this set of
	  * values, including the unit of measure whenever applicable (as is
	  * normal). In this case, the xlink:href attribute can reference a URN for
	  * a well-known reference system, such as for a coordinate reference system
	  * (CRS). For example, such a URN could be a CRS identification URN defined
	  * in the "ogc" URN namespace. */
	ReferenceSystem?: DomainMetadataType;
	/** Definition of the unit of measure of this set of values.
	  * In this case, the xlink:href attribute can reference a URN for a
	  * well-known unit of measure (uom). For example, such a URN could be a UOM
	  * identification URN defined in the "ogc" URN namespace. */
	UOM?: DomainMetadataType;
	/** Reference to externally specified list of all the valid
	  * values and/or ranges of values for this quantity. (Informative: This
	  * element was simplified from the metaDataProperty element in GML
	  * 3.0.) */
	ValuesReference: ValuesReferenceType;
}
export interface UnNamedDomainType extends _UnNamedDomainType { constructor: { new(): UnNamedDomainType }; }
export var UnNamedDomainType: { new(): UnNamedDomainType };

/** Service metadata document version, having values that are
  * "increased" whenever any change is made in service metadata document.
  * Values are selected by each server, and are always opaque to clients.
  * See updateSequence parameter use subclause for more
  * information. */
export type UpdateSequenceType = string;
type _UpdateSequenceType = Primitive._string;

interface _ValuesReferenceType extends Primitive._string {
	/** Reference to data or metadata recorded elsewhere, either
	  * external to this XML document or within it. Whenever practical, this
	  * attribute should be a URL from which this metadata can be electronically
	  * retrieved. Alternately, this attribute can reference a URN for
	  * well-known metadata. For example, such a URN could be a URN defined in
	  * the "ogc" URN namespace. */
	reference: string;
}
interface ValuesReferenceType extends _ValuesReferenceType { constructor: { new(): ValuesReferenceType }; }

/** A single value, encoded as a string. This type can be
  * used for one value, for a spacing between allowed values, or for the
  * default value of a parameter. */
export type ValueType = string;
type _ValueType = Primitive._string;

/** Specification version for OWS operation. The string value
  * shall contain one x.y.z "version" value (e.g., "2.1.3"). A version
  * number shall contain three non-negative integers separated by decimal
  * points, in the form "x.y.z". The integers y and z shall not exceed 99.
  * Each version shall be for the Implementation Specification (document)
  * and the associated XML Schemas to which requested operations will
  * conform. An Implementation Specification version normally specifies XML
  * Schemas against which an XML encoded operation response must conform and
  * should be validated. See Version negotiation subclause for more
  * information. */
export type VersionType = string;
type _VersionType = Primitive._string;

/** XML encoded minimum rectangular bounding box (or region)
  * parameter, surrounding all the associated data. This box is specialized
  * for use with the 2D WGS 84 coordinate reference system with decimal
  * values of longitude and latitude.This type is adapted from the general BoundingBoxType,
  * with modified contents and documentation for use with the 2D WGS 84
  * coordinate reference system. */
interface _WGS84BoundingBoxType extends _BoundingBoxType {
	/** This attribute can be included when considered
	  * useful. When included, this attribute shall reference the 2D WGS
	  * 84 coordinate reference system with longitude before latitude and
	  * decimal values of longitude and latitude. */
	crs?: string;
	/** The number of dimensions in this CRS (the length of
	  * a coordinate sequence in this use of the PositionType). This
	  * number is specified by the CRS definition, but can also be
	  * specified here. */
	dimensions?: number;
	/** Position of the bounding box corner at which the
	  * values of longitude and latitude normally are the algebraic
	  * minimums within this bounding box. For more information, see
	  * Subclauses 10.4.5 and C.13. */
	LowerCorner: PositionType2D;
	/** Position of the bounding box corner at which the
	  * values of longitude and latitude normally are the algebraic
	  * minimums within this bounding box. For more information, see
	  * Subclauses 10.4.5 and C.13. */
	UpperCorner: PositionType2D;
}
export interface WGS84BoundingBoxType extends _WGS84BoundingBoxType { constructor: { new(): WGS84BoundingBoxType }; }
export var WGS84BoundingBoxType: { new(): WGS84BoundingBoxType };

export interface document extends BaseType {
	/** Brief narrative description of this resource, normally
	  * used for display to humans. */
	Abstract: LanguageStringType;
	/** Access constraint applied to assure the protection of
	  * privacy or intellectual property, or any other restrictions on
	  * retrieving or using data from or otherwise using this server. The
	  * reserved value NONE (case insensitive) shall be used to mean no access
	  * constraints are imposed. */
	AccessConstraints: string;
	/** One additional metadata parameter. */
	AdditionalParameter: AdditionalParameterType;
	/** Unordered list of one or more
	  * AdditionalParameters. */
	AdditionalParameters: AdditionalParametersType;
	/** List of all the valid values and/or ranges of values for
	  * this quantity. For numeric quantities, signed values should be ordered
	  * from negative infinity to positive infinity. */
	AllowedValues: AllowedValuesType;
	/** Specifies that any value is allowed for this
	  * parameter. */
	AnyValue: AnyValueType;
	/** Address of the responsible party. */
	ContactInfo: ContactType;
	DatasetDescriptionSummary: DatasetDescriptionSummaryBaseType;
	/** Definition of the data type of this set of values. In
	  * this case, the xlink:href attribute can reference a URN for a well-known
	  * data type. For example, such a URN could be a data type identification
	  * URN defined in the "ogc" URN namespace. */
	DataType: DomainMetadataType;
	/** Information for one distributed Computing Platform (DCP)
	  * supported for this operation. At present, only the HTTP DCP is defined,
	  * so this element only includes the HTTP element. */
	DCP: DCPType;
	/** The default value for a quantity for which multiple
	  * values are allowed. */
	DefaultValue: string;
	Exception: ExceptionType;
	/** Report message returned to the client that requested any
	  * OWS operation when the server detects an error while processing that
	  * operation request. */
	ExceptionReport: ExceptionReportType;
	/** Individual software vendors and servers can use this
	  * element to provide metadata about any additional server
	  * abilities. */
	ExtendedCapabilities: any;
	/** Fees and terms for retrieving data from or otherwise
	  * using this server, including the monetary units as specified in ISO
	  * 4217. The reserved value NONE (case insensitive) shall be used to mean
	  * no fees or terms. */
	Fees: string;
	GetCapabilities: GetCapabilitiesType;
	GetResourceByID: GetResourceByIdType;
	/** Connect point URLs for the HTTP Distributed Computing
	  * Platform (DCP). Normally, only one Get and/or one Post is included in
	  * this element. More than one Get and/or Post is allowed to support
	  * including alternative URLs for uses such as load balancing or
	  * backup. */
	HTTP: HTTPType;
	/** Unique identifier or name of this
	  * dataset. */
	Identifier: CodeType;
	/** Name of the responsible person: surname, given name,
	  * title separated by a delimiter. */
	IndividualName: string;
	/** Input data in a XML-encoded OWS operation request,
	  * allowing including multiple data items with each data item either
	  * included or referenced. This InputData element, or an element using the
	  * ManifestType with a more-specific element name (TBR), shall be used
	  * whenever applicable within XML-encoded OWS operation
	  * requests. */
	InputData: ManifestType;
	Keywords: KeywordsType;
	/** Identifier of a language used by the data(set) contents.
	  * This language identifier shall be as specified in IETF RFC 4646. The
	  * language tags shall be either complete 5 character codes (e.g. "en-CA"),
	  * or abbreviated 2 character codes (e.g. "en"). In addition to the RFC
	  * 4646 codes, the server shall support the single special value "*" which
	  * is used to indicate "any language". */
	Language: string;
	Manifest: ManifestType;
	/** Maximum value of this numeric parameter. */
	MaximumValue: string;
	/** Definition of the meaning or semantics of this set of
	  * values. This Meaning can provide more specific, complete, precise,
	  * machine accessible, and machine understandable semantics about this
	  * quantity, relative to other available semantic information. For example,
	  * other semantic information is often provided in "documentation" elements
	  * in XML Schemas or "description" elements in GML objects. */
	Meaning: DomainMetadataType;
	/** Minimum value of this numeric parameter. */
	MinimumValue: string;
	nilValue: NilValueType;
	/** Specifies that no values are allowed for this parameter
	  * or quantity. */
	NoValues: NoValuesType;
	/** Metadata for one operation that this server
	  * implements. */
	Operation: OperationType;
	/** Response from an OWS operation, allowing including
	  * multiple output data items with each item either included or referenced.
	  * This OperationResponse element, or an element using the ManifestType
	  * with a more specific element name, shall be used whenever applicable for
	  * responses from OWS operations.This element is specified for use where the ManifestType
	  * contents are needed for an operation response, but the Manifest element
	  * name is not fully applicable. This element or the ManifestType shall be
	  * used instead of using the ows:ReferenceType proposed in OGC
	  * 04-105. */
	OperationResponse: ManifestType;
	/** Metadata about the operations and related abilities
	  * specified by this service and implemented by this server, including the
	  * URLs for operation requests. The basic contents of this section shall be
	  * the same for all OWS types, but individual services can add elements
	  * and/or change the optionality of optional elements. */
	OperationsMetadata: OperationsMetadataType;
	/** Name of the responsible organization. */
	OrganisationName: string;
	/** Reference to a source of metadata describing coverage
	  * offerings available from this server. This parameter can reference a
	  * catalogue server from which dataset metadata is available. This ability
	  * is expected to be used by servers with thousands or millions of
	  * datasets, for which searching a catalogue is more feasible than fetching
	  * a long Capabilities XML document. When no DatasetDescriptionSummaries
	  * are included, and one or more catalogue servers are referenced, this set
	  * of catalogues shall contain current metadata summaries for all the
	  * datasets currently available from this OWS server, with the metadata for
	  * each such dataset referencing this OWS server. */
	OtherSource: MetadataType;
	/** Reference to a format in which this data can be encoded
	  * and transferred. More specific parameter names should be used by
	  * specific OWS specifications wherever applicable. More than one such
	  * parameter can be included for different purposes. */
	OutputFormat: string;
	/** Identification of, and means of communication with,
	  * person(s) responsible for the resource(s).For OWS use in the ServiceProvider section of a service
	  * metadata document, the optional organizationName element was removed,
	  * since this type is always used with the ProviderName element which
	  * provides that information. The optional individualName element was made
	  * mandatory, since either the organizationName or individualName element
	  * is mandatory. The mandatory "role" element was changed to optional,
	  * since no clear use of this information is known in the ServiceProvider
	  * section. */
	PointOfContact: ResponsiblePartyType;
	/** Role or position of the responsible
	  * person. */
	PositionName: string;
	Range: RangeType;
	ReferenceGroup: ReferenceGroupType;
	/** Definition of the reference system used by this set of
	  * values, including the unit of measure whenever applicable (as is
	  * normal). In this case, the xlink:href attribute can reference a URN for
	  * a well-known reference system, such as for a coordinate reference system
	  * (CRS). For example, such a URN could be a CRS identification URN defined
	  * in the "ogc" URN namespace. */
	ReferenceSystem: DomainMetadataType;
	/** Function performed by the responsible party. Possible
	  * values of this Role shall include the values and the meanings listed in
	  * Subclause B.5.5 of ISO 19115:2003. */
	Role: CodeType;
	/** General metadata for this specific server. This XML
	  * Schema of this section shall be the same for all OWS. */
	ServiceIdentification: ServiceIdentificationType;
	/** Metadata about the organization that provides this
	  * specific service instance or server. */
	ServiceProvider: ServiceProviderType;
	ServiceReference: ServiceReferenceType;
	/** The regular distance or spacing between the allowed
	  * values in a range. */
	Spacing: string;
	/** Coordinate reference system in which data from this
	  * data(set) or resource is available or supported. More specific parameter
	  * names should be used by specific OWS specifications wherever applicable.
	  * More than one such parameter can be included for different
	  * purposes. */
	SupportedCRS: string;
	/** Title of this resource, normally used for display to
	  * humans. */
	Title: LanguageStringType;
	/** Definition of the unit of measure of this set of values.
	  * In this case, the xlink:href attribute can reference a URN for a
	  * well-known unit of measure (uom). For example, such a URN could be a UOM
	  * identification URN defined in the "ogc" URN namespace. */
	UOM: DomainMetadataType;
	Value: string;
	/** Reference to externally specified list of all the valid
	  * values and/or ranges of values for this quantity. (Informative: This
	  * element was simplified from the metaDataProperty element in GML
	  * 3.0.) */
	ValuesReference: ValuesReferenceType;
	WGS84BoundingBox: WGS84BoundingBoxType;
}
export var document: document;
