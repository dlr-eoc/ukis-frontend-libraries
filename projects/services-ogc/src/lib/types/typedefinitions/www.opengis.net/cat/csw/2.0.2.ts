import * as Primitive from '../../../xml-primitives';
import * as dc from '../../../purl.org/dc/elements/1.1';
import * as dct from '../../../purl.org/dc/terms';
import * as ogc from '../../ogc';
import * as ows from '../../ows';

// Source files:
// http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd
// http://schemas.opengis.net/csw/2.0.2/CSW-publication.xsd
// http://schemas.opengis.net/csw/2.0.2/csw.xsd
// http://schemas.opengis.net/csw/2.0.2/record.xsd


interface BaseType {
	_exists: boolean;
	_namespace: string;
}
interface _AbstractQueryProxyType extends BaseType {
	Query?: QueryType;
}
interface AbstractQueryProxyType extends _AbstractQueryProxyType { constructor: { new(): AbstractQueryProxyType }; }

interface _AbstractQueryType extends BaseType {}
export interface AbstractQueryType extends _AbstractQueryType { constructor: { new(): AbstractQueryType }; }
export var AbstractQueryType: { new(): AbstractQueryType };

interface _AbstractRecordProxyType extends BaseType {
	BriefRecord?: BriefRecordType;
	DCMIRecord?: DCMIRecordType;
	Record?: RecordType;
	SummaryRecord?: SummaryRecordType;
}
interface AbstractRecordProxyType extends _AbstractRecordProxyType { constructor: { new(): AbstractRecordProxyType }; }

interface _AbstractRecordType extends BaseType {}
export interface AbstractRecordType extends _AbstractRecordType { constructor: { new(): AbstractRecordType }; }
export var AbstractRecordType: { new(): AbstractRecordType };

/** This is a general acknowledgement response message for all requests
  * that may be processed in an asynchronous manner.
  * EchoedRequest - Echoes the submitted request message
  * RequestId     - identifier for polling purposes (if no response
  * handler is available, or the URL scheme is
  * unsupported) */
interface _AcknowledgementType extends BaseType {
	timeStamp: Date;
	EchoedRequest: EchoedRequestType;
	RequestId?: string;
}
export interface AcknowledgementType extends _AcknowledgementType { constructor: { new(): AcknowledgementType }; }
export var AcknowledgementType: { new(): AcknowledgementType };

/** This type defines a brief representation of the common record
  * format.  It extends AbstractRecordType to include only the
  * dc:identifier and dc:type properties. */
interface _BriefRecordType extends _AbstractRecordType {
	BoundingBox?: ows.BoundingBoxProxyType[];
	/** An unambiguous reference to the resource within a given context.
	  * Recommended best practice is to identify the resource by means of a
	  * string or number conforming to a formal identification system. Formal
	  * identification systems include but are not limited to the Uniform
	  * Resource Identifier (URI) (including the Uniform Resource Locator
	  * (URL)), the Digital Object Identifier (DOI), and the International
	  * Standard Book Number (ISBN). */
	identifier: dc.IdentifierProxyType[];
	/** A name given to the resource. Typically, Title will be a name by
	  * which the resource is formally known. */
	title: dc.TitleProxyType[];
	/** The nature or genre of the content of the resource. Type includes
	  * terms describing general categories, functions, genres, or aggregation
	  * levels for content. Recommended best practice is to select a value
	  * from a controlled vocabulary (for example, the DCMI Type Vocabulary).
	  * To describe the physical or digital manifestation of the resource,
	  * use the Format element. */
	type?: dc.SimpleLiteral;
}
export interface BriefRecordType extends _BriefRecordType { constructor: { new(): BriefRecordType }; }
export var BriefRecordType: { new(): BriefRecordType };

/** This type extends ows:CapabilitiesBaseType defined in OGC-05-008
  * to include information about supported OGC filter components. A
  * profile may extend this type to describe additional capabilities. */
interface _CapabilitiesType extends ows.CapabilitiesBaseType {
	Filter_Capabilities: ogc.Filter_CapabilitiesType;
}
export interface CapabilitiesType extends _CapabilitiesType { constructor: { new(): CapabilitiesType }; }
export var CapabilitiesType: { new(): CapabilitiesType };

interface _ConceptualSchemeType extends BaseType {
	Authority: string;
	Document: string;
	Name: string;
}
export interface ConceptualSchemeType extends _ConceptualSchemeType { constructor: { new(): ConceptualSchemeType }; }
export var ConceptualSchemeType: { new(): ConceptualSchemeType };

/** This type encapsulates all of the standard DCMI metadata terms,
  * including the Dublin Core refinements; these terms may be mapped
  * to the profile-specific information model. */
interface _DCMIRecordType extends _AbstractRecordType {
	DCElement?: dc.DCElementProxyType[];
}
export interface DCMIRecordType extends _DCMIRecordType { constructor: { new(): DCMIRecordType }; }
export var DCMIRecordType: { new(): DCMIRecordType };

/** Deletes one or more catalogue items that satisfy some set of
  * conditions. */
interface _DeleteType extends BaseType {
	handle?: string;
	typeName?: string;
	Constraint: QueryConstraintType;
}
export interface DeleteType extends _DeleteType { constructor: { new(): DeleteType }; }
export var DeleteType: { new(): DeleteType };

/** The response contains a list of matching schema components
  * in the requested schema language. */
interface _DescribeRecordResponseType extends BaseType {
	SchemaComponent?: SchemaComponentType[];
}
export interface DescribeRecordResponseType extends _DescribeRecordResponseType { constructor: { new(): DescribeRecordResponseType }; }
export var DescribeRecordResponseType: { new(): DescribeRecordResponseType };

/** This request allows a user to discover elements of the
  * information model supported by the catalogue. If no TypeName
  * elements are included, then all of the schemas for the
  * information model must be returned.
  *
  * schemaLanguage - preferred schema language
  * (W3C XML Schema by default)
  * outputFormat - preferred output format (application/xml by default) */
interface _DescribeRecordType extends _RequestBaseType {
	outputFormat?: string;
	schemaLanguage?: string;
	TypeName?: string[];
}
export interface DescribeRecordType extends _DescribeRecordType { constructor: { new(): DescribeRecordType }; }
export var DescribeRecordType: { new(): DescribeRecordType };

/** Governs the behaviour of a distributed search.
  * hopCount     - the maximum number of message hops before
  * the search is terminated. Each catalogue node
  * decrements this value when the request is received,
  * and must not forward the request if hopCount=0. */
interface _DistributedSearchType extends BaseType {
	hopCount?: number;
}
export interface DistributedSearchType extends _DistributedSearchType { constructor: { new(): DistributedSearchType }; }
export var DistributedSearchType: { new(): DistributedSearchType };

interface _DomainValuesType extends BaseType {
	type: string;
	uom?: string;
	ConceptualScheme?: ConceptualSchemeType;
	ListOfValues?: ListOfValuesType;
	ParameterName: string;
	PropertyName: string;
	RangeOfValues?: RangeOfValuesType;
}
export interface DomainValuesType extends _DomainValuesType { constructor: { new(): DomainValuesType }; }
export var DomainValuesType: { new(): DomainValuesType };

/** Includes a copy of the request message body. */
interface _EchoedRequestType extends BaseType {}
export interface EchoedRequestType extends _EchoedRequestType { constructor: { new(): EchoedRequestType }; }
export var EchoedRequestType: { new(): EchoedRequestType };

interface _ElementSetNameType extends _ElementSetType {
	typeNames?: TypeNameListType;
}
export interface ElementSetNameType extends _ElementSetNameType { constructor: { new(): ElementSetNameType }; }
export var ElementSetNameType: { new(): ElementSetNameType };

/** Named subsets of catalogue object properties; these
  * views are mapped to a specific information model and
  * are defined in an application profile. */
export type ElementSetType = ("brief" | "summary" | "full");
interface _ElementSetType extends Primitive._string { content: ElementSetType; }

interface _EmptyType extends BaseType {}
export interface EmptyType extends _EmptyType { constructor: { new(): EmptyType }; }
export var EmptyType: { new(): EmptyType };

/** Request for a description of service capabilities. See OGC 05-008
  * for more information. */
interface _GetCapabilitiesType extends ows.GetCapabilitiesType {
	service?: string;
}
export interface GetCapabilitiesType extends _GetCapabilitiesType { constructor: { new(): GetCapabilitiesType }; }
export var GetCapabilitiesType: { new(): GetCapabilitiesType };

/** Returns the actual values for some property. In general this is a
  * subset of the value domain (that is, set of permissible values),
  * although in some cases these may be the same. */
interface _GetDomainResponseType extends BaseType {
	DomainValues: DomainValuesType[];
}
export interface GetDomainResponseType extends _GetDomainResponseType { constructor: { new(): GetDomainResponseType }; }
export var GetDomainResponseType: { new(): GetDomainResponseType };

/** Requests the actual values of some specified request parameter
  * or other data element. */
interface _GetDomainType extends _RequestBaseType {
	ParameterName: string;
	PropertyName: string;
}
export interface GetDomainType extends _GetDomainType { constructor: new() => GetDomainType; }
export var GetDomainType: new() => GetDomainType;

/** Returns a representation of the matching entry. If there is no
  * matching record, the response message must be empty. */
interface _GetRecordByIdResponseType extends BaseType {
	AbstractRecord?: AbstractRecordProxyType[];
}
export interface GetRecordByIdResponseType extends _GetRecordByIdResponseType { constructor: { new(): GetRecordByIdResponseType }; }
export var GetRecordByIdResponseType: { new(): GetRecordByIdResponseType };

/** Convenience operation to retrieve default record representations
  * by identifier.
  * Id - object identifier (a URI) that provides a reference to a
  * catalogue item (or a result set if the catalogue supports
  * persistent result sets).
  * ElementSetName - one of "brief, "summary", or "full" */
interface _GetRecordByIdType extends _RequestBaseType {
	outputFormat?: string;
	outputSchema?: string;
	ElementSetName?: ElementSetNameType;
	Id: string[];
}
export interface GetRecordByIdType extends _GetRecordByIdType { constructor: { new(): GetRecordByIdType }; }
export var GetRecordByIdType: { new(): GetRecordByIdType };

/** The response message for a GetRecords request. Some or all of the
  * matching records may be included as children of the SearchResults
  * element. The RequestId is only included if the client specified it. */
interface _GetRecordsResponseType extends BaseType {
	version?: string;
	RequestId?: string;
	SearchResults: SearchResultsType;
	SearchStatus: RequestStatusType;
}
export interface GetRecordsResponseType extends _GetRecordsResponseType { constructor: { new(): GetRecordsResponseType }; }
export var GetRecordsResponseType: { new(): GetRecordsResponseType };

/** The principal means of searching the catalogue. The matching
  * catalogue entries may be included with the response. The client
  * may assign a requestId (absolute URI). A distributed search is
  * performed if the DistributedSearch element is present and the
  * catalogue is a member of a federation. Profiles may allow
  * alternative query expressions. */
interface _GetRecordsType extends _RequestBaseType, _AbstractQueryProxyType {
	maxRecords?: number;
	outputFormat?: string;
	outputSchema?: string;
	requestId?: string;
	resultType?: ResultType;
	startPosition?: number;
	DistributedSearch?: DistributedSearchType;
	ResponseHandler?: string[];
}
export interface GetRecordsType extends _GetRecordsType { constructor: { new(): GetRecordsType }; }
export var GetRecordsType: { new(): GetRecordsType };

interface _HarvestResponseType extends BaseType {
	Acknowledgement: AcknowledgementType;
	TransactionResponse: TransactionResponseType;
}
export interface HarvestResponseType extends _HarvestResponseType { constructor: { new(): HarvestResponseType }; }
export var HarvestResponseType: { new(): HarvestResponseType };

/** Requests that the catalogue attempt to harvest a resource from some
  * network location identified by the source URL.
  *
  * Source          - a URL from which the resource is retrieved
  * ResourceType    - normally a URI that specifies the type of the resource
  * (DCMES v1.1) being harvested if it is known.
  * ResourceFormat  - a media type indicating the format of the
  * resource being harvested.  The default is
  * "application/xml".
  * ResponseHandler - a reference to some endpoint to which the
  * response shall be forwarded when the
  * harvest operation has been completed
  * HarvestInterval - an interval expressed using the ISO 8601 syntax;
  * it specifies the interval between harvest
  * attempts (e.g., P6M indicates an interval of
  * six months). */
interface _HarvestType extends _RequestBaseType {
	HarvestInterval?: string;
	ResourceFormat?: string;
	ResourceType: string;
	ResponseHandler?: string[];
	Source: string;
}
export interface HarvestType extends _HarvestType { constructor: { new(): HarvestType }; }
export var HarvestType: { new(): HarvestType };

/** Returns a "brief" view of any newly created catalogue records.
  * The handle attribute may reference a particular statement in
  * the corresponding transaction request. */
interface _InsertResultType extends BaseType {
	handleRef?: string;
	BriefRecord: BriefRecordType[];
}
export interface InsertResultType extends _InsertResultType { constructor: { new(): InsertResultType }; }
export var InsertResultType: { new(): InsertResultType };

/** Submits one or more records to the catalogue. The representation
  * is defined by the application profile. The handle attribute
  * may be included to specify a local identifier for the action
  * (it must be unique within the context of the transaction). */
interface _InsertType extends BaseType {
	handle?: string;
	typeName?: string;
}
export interface InsertType extends _InsertType { constructor: { new(): InsertType }; }
export var InsertType: { new(): InsertType };

interface _ListOfValuesType extends BaseType {
	Value: any[];
}
export interface ListOfValuesType extends _ListOfValuesType { constructor: { new(): ListOfValuesType }; }
export var ListOfValuesType: { new(): ListOfValuesType };

/** A search constraint that adheres to one of the following syntaxes:
  * Filter   - OGC filter expression
  * CqlText  - OGC CQL predicate */
interface _QueryConstraintType extends BaseType {
	/** Query language version */
	version: string;
	CqlText: string;
	Filter: ogc.FilterType;
}
export interface QueryConstraintType extends _QueryConstraintType { constructor: { new(): QueryConstraintType }; }
export var QueryConstraintType: { new(): QueryConstraintType };

/** Specifies a query to execute against instances of one or
  * more object types. A set of ElementName elements may be included
  * to specify an adhoc view of the csw:Record instances in the result
  * set. Otherwise, use ElementSetName to specify a predefined view.
  * The Constraint element contains a query filter expressed in a
  * supported query language. A sorting criterion that specifies a
  * property to sort by may be included.
  *
  * typeNames - a list of object types to query. */
interface _QueryType extends _AbstractQueryType {
	typeNames: TypeNameListType;
	Constraint?: QueryConstraintType;
	ElementName: string[];
	ElementSetName: ElementSetNameType;
	SortBy?: ogc.SortByType;
}
export interface QueryType extends _QueryType { constructor: { new(): QueryType }; }
export var QueryType: { new(): QueryType };

interface _RangeOfValuesType extends BaseType {
	MaxValue: any;
	MinValue: any;
}
export interface RangeOfValuesType extends _RangeOfValuesType { constructor: { new(): RangeOfValuesType }; }
export var RangeOfValuesType: { new(): RangeOfValuesType };

interface _RecordPropertyType extends BaseType {
	/** The Name element contains the name of a property
	  * to be updated.  The name may be a path expression. */
	Name: string;
	/** The Value element contains the replacement value for the
	  * named property. */
	Value?: any;
}
export interface RecordPropertyType extends _RecordPropertyType { constructor: { new(): RecordPropertyType }; }
export var RecordPropertyType: { new(): RecordPropertyType };

/** This type extends DCMIRecordType to add ows:BoundingBox;
  * it may be used to specify a spatial envelope for the
  * catalogued resource. */
interface _RecordType extends _DCMIRecordType {
	AnyText?: EmptyType[];
	BoundingBox?: ows.BoundingBoxProxyType[];
}
export interface RecordType extends _RecordType { constructor: { new(): RecordType }; }
export var RecordType: { new(): RecordType };

/** Base type for all request messages except GetCapabilities. The
  * attributes identify the relevant service type and version. */
interface _RequestBaseType extends BaseType {
	service: string;
	version: string;
}
export interface RequestBaseType extends _RequestBaseType { constructor: { new(): RequestBaseType }; }
export var RequestBaseType: { new(): RequestBaseType };

/** This element provides information about the status of the
  * search request.
  *
  * status    - status of the search
  * timestamp - the date and time when the result set was modified
  * (ISO 8601 format: YYYY-MM-DDThh:mm:ss[+|-]hh:mm). */
interface _RequestStatusType extends BaseType {
	timestamp?: Date;
}
export interface RequestStatusType extends _RequestStatusType { constructor: { new(): RequestStatusType }; }
export var RequestStatusType: { new(): RequestStatusType };

export type ResultType = ("results" | "hits" | "validate");
interface _ResultType extends Primitive._string { content: ResultType; }

/** A schema component includes a schema fragment (type
  * definition) or an entire schema from some target namespace;
  * the schema language is identified by URI. If the component
  * is a schema fragment its parent MUST be referenced (parentSchema). */
interface _SchemaComponentType extends BaseType {
	parentSchema?: string;
	schemaLanguage: string;
	targetNamespace: string;
}
export interface SchemaComponentType extends _SchemaComponentType { constructor: { new(): SchemaComponentType }; }
export var SchemaComponentType: { new(): SchemaComponentType };

/** Includes representations of result set members if maxRecords > 0.
  * The items must conform to one of the csw:Record views or a
  * profile-specific representation.
  *
  * resultSetId  - id of the result set (a URI).
  * elementSet  - The element set that has been returned
  * (i.e., "brief", "summary", "full")
  * recordSchema  - schema reference for included records(URI)
  * numberOfRecordsMatched  - number of records matched by the query
  * numberOfRecordsReturned - number of records returned to client
  * nextRecord - position of next record in the result set
  * (0 if no records remain).
  * expires - the time instant when the result set expires and
  * is discarded (ISO 8601 format) */
interface _SearchResultsType extends BaseType {
	elementSet?: ElementSetType;
	expires?: Date;
	nextRecord?: number;
	numberOfRecordsMatched: number;
	numberOfRecordsReturned: number;
	recordSchema?: string;
	resultSetId?: string;
	AbstractRecord?: AbstractRecordProxyType[];
}
export interface SearchResultsType extends _SearchResultsType { constructor: { new(): SearchResultsType }; }
export var SearchResultsType: { new(): SearchResultsType };

/** This type defines a summary representation of the common record
  * format.  It extends AbstractRecordType to include the core
  * properties. */
interface _SummaryRecordType extends _AbstractRecordType {
	abstract?: dc.SimpleLiteral[];
	BoundingBox?: ows.BoundingBoxProxyType[];
	/** The physical or digital manifestation of the resource. Typically,
	  * Format will include the media-type or dimensions of the resource.
	  * Format may be used to identify the software, hardware, or other
	  * equipment needed to display or operate the resource. Examples of
	  * dimensions include size and duration. Recommended best practice is to
	  * select a value from a controlled vocabulary (for example, the list
	  * of Internet Media Types defining computer media formats). */
	format?: dc.FormatProxyType[];
	/** An unambiguous reference to the resource within a given context.
	  * Recommended best practice is to identify the resource by means of a
	  * string or number conforming to a formal identification system. Formal
	  * identification systems include but are not limited to the Uniform
	  * Resource Identifier (URI) (including the Uniform Resource Locator
	  * (URL)), the Digital Object Identifier (DOI), and the International
	  * Standard Book Number (ISBN). */
	identifier: dc.IdentifierProxyType[];
	modified?: dc.SimpleLiteral[];
	/** A reference to a related resource. Recommended best practice is to
	  * identify the referenced resource by means of a string or number
	  * conforming to a formal identification system. */
	relation?: dc.RelationProxyType[];
	spatial?: dc.SimpleLiteral[];
	/** A topic of the content of the resource. Typically, Subject will be
	  * expressed as keywords, key phrases, or classification codes that
	  * describe a topic of the resource. Recommended best practice is to
	  * select a value from a controlled vocabulary or formal classification
	  * scheme. */
	subject?: dc.SimpleLiteral[];
	/** A name given to the resource. Typically, Title will be a name by
	  * which the resource is formally known. */
	title: dc.TitleProxyType[];
	/** The nature or genre of the content of the resource. Type includes
	  * terms describing general categories, functions, genres, or aggregation
	  * levels for content. Recommended best practice is to select a value
	  * from a controlled vocabulary (for example, the DCMI Type Vocabulary).
	  * To describe the physical or digital manifestation of the resource,
	  * use the Format element. */
	type?: dc.SimpleLiteral;
}
export interface SummaryRecordType extends _SummaryRecordType { constructor: { new(): SummaryRecordType }; }
export var SummaryRecordType: { new(): SummaryRecordType };

/** The response for a transaction request that was successfully
  * completed. If the transaction failed for any reason, a service
  * exception report indicating a TransactionFailure is returned
  * instead. */
interface _TransactionResponseType extends BaseType {
	version?: string;
	InsertResult?: InsertResultType[];
	TransactionSummary: TransactionSummaryType;
}
export interface TransactionResponseType extends _TransactionResponseType { constructor: { new(): TransactionResponseType }; }
export var TransactionResponseType: { new(): TransactionResponseType };

/** Reports the total number of catalogue items modified by a transaction
  * request (i.e, inserted, updated, deleted). If the client did not
  * specify a requestId, the server may assign one (a URI value). */
interface _TransactionSummaryType extends BaseType {
	requestId?: string;
	totalDeleted?: number;
	totalInserted?: number;
	totalUpdated?: number;
}
export interface TransactionSummaryType extends _TransactionSummaryType { constructor: { new(): TransactionSummaryType }; }
export var TransactionSummaryType: { new(): TransactionSummaryType };

/** Users may insert, update, or delete catalogue entries. If the
  * verboseResponse attribute has the value "true", then one or more
  * csw:InsertResult elements must be included in the response. */
interface _TransactionType extends _RequestBaseType {
	requestId?: string;
	verboseResponse?: boolean;
	Delete: DeleteType[];
	Insert: InsertType[];
	Update: UpdateType[];
}
export interface TransactionType extends _TransactionType { constructor: { new(): TransactionType }; }
export var TransactionType: { new(): TransactionType };

/** The exact syntax is defined in an application profile. If querying
  * against the common record properties, only a single type may be
  * specified (Record). */
export type TypeNameListType = string[];

/** Update statements may replace an entire record or only update part
  * of a record:
  * 1) To replace an existing record, include a new instance of the
  * record;
  * 2) To update selected properties of an existing record, include
  * a set of RecordProperty elements. The scope of the update
  * statement  is determined by the Constraint element.
  * The 'handle' is a local identifier for the action. */
interface _UpdateType extends BaseType {
	handle?: string;
	Constraint: QueryConstraintType;
	/** The RecordProperty element is used to specify the new
	  * value of a record property in an update statement. */
	RecordProperty: RecordPropertyType[];
}
export interface UpdateType extends _UpdateType { constructor: { new(): UpdateType }; }
export var UpdateType: { new(): UpdateType };

export interface document extends BaseType {
	Acknowledgement: AcknowledgementType;
	BriefRecord: BriefRecordType;
	Capabilities: CapabilitiesType;
	Constraint: QueryConstraintType;
	DCMIRecord: DCMIRecordType;
	DescribeRecord: DescribeRecordType;
	DescribeRecordResponse: DescribeRecordResponseType;
	ElementSetName: ElementSetNameType;
	GetCapabilities: GetCapabilitiesType;
	GetDomain: GetDomainType;
	GetDomainResponse: GetDomainResponseType;
	GetRecordById: GetRecordByIdType;
	GetRecordByIdResponse: GetRecordByIdResponseType;
	GetRecords: GetRecordsType;
	GetRecordsResponse: GetRecordsResponseType;
	Harvest: HarvestType;
	/** The content of the response varies depending on the presence of the
	  * ResponseHandler element. If present, then the catalogue should
	  * verify the request and respond immediately with an csw:Acknowledgement
	  * element in the response. The catalogue must then attempt to harvest
	  * the resource at some later time and send the response message to the
	  * location specified by the value of the ResponseHandler element using
	  * the indicated protocol (e.g. ftp, mailto, http).
	  *
	  * If the ResponseHandler element is absent, then the catalogue
	  * must attempt to harvest the resource immediately and include a
	  * TransactionResponse element in the response.
	  *
	  * In any case, if the harvest attempt is successful the response
	  * shall include summary representations of the newly created
	  * catalogue item(s). */
	HarvestResponse: HarvestResponseType;
	Query: QueryType;
	Record: RecordType;
	/** The RecordProperty element is used to specify the new
	  * value of a record property in an update statement. */
	RecordProperty: RecordPropertyType;
	SummaryRecord: SummaryRecordType;
	Transaction: TransactionType;
	TransactionResponse: TransactionResponseType;
}
export var document: document;
