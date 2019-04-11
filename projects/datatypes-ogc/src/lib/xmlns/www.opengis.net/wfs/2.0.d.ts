import * as Primitive from '../../xml-primitives';
import * as fes from '../fes/2.0';
import * as ows from '../ows/1.1';
import * as xlink from '../../www.w3.org/1999/xlink';
import * as xml from '../../www.w3.org/XML/1998/namespace';

// Source files:
// http://schemas.opengis.net/wfs/2.0/wfs.xsd


declare module '../fes/2.0' {
export interface _AbstractQueryExpressionProxyType {
	StoredQuery?: StoredQueryType;
}
export interface _AbstractAdhocQueryExpressionProxyType {
	Query?: QueryType;
}
export interface _AbstractProjectionClauseProxyType {
	PropertyName?: PropertyNameType;
}
}
interface BaseType {
	_exists: boolean;
	_namespace: string;
}
interface _AbstractTransactionActionProxyType extends BaseType {
	Delete?: DeleteType;
	Insert?: InsertType;
	Native?: NativeType;
	Replace?: ReplaceType;
	Update?: UpdateType;
}
interface AbstractTransactionActionProxyType extends _AbstractTransactionActionProxyType { constructor: { new(): AbstractTransactionActionProxyType }; }

interface _AbstractTransactionActionType extends BaseType {
	handle: string;
}
export interface AbstractTransactionActionType extends _AbstractTransactionActionType { constructor: { new(): AbstractTransactionActionType }; }
export var AbstractTransactionActionType: { new(): AbstractTransactionActionType };

interface _AbstractType extends Primitive._string {
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
}
interface AbstractType extends _AbstractType { constructor: { new(): AbstractType }; }

interface _ActionResultsType extends BaseType {
	Feature: CreatedOrModifiedFeatureType[];
}
export interface ActionResultsType extends _ActionResultsType { constructor: { new(): ActionResultsType }; }
export var ActionResultsType: { new(): ActionResultsType };

interface _AdditionalObjectsType extends _SimpleFeatureCollectionProxyType {
	ValueCollection: ValueCollectionType;
}
interface AdditionalObjectsType extends _AdditionalObjectsType { constructor: { new(): AdditionalObjectsType }; }

interface _AdditionalValuesType extends _SimpleFeatureCollectionProxyType {
	ValueCollection: ValueCollectionType;
}
interface AdditionalValuesType extends _AdditionalValuesType { constructor: { new(): AdditionalValuesType }; }

export type AllSomeType = ("ALL" | "SOME");
interface _AllSomeType extends Primitive._string { content: AllSomeType; }

interface _BaseRequestType extends BaseType {
	handle: string;
	service: string;
	version: string;
}
export interface BaseRequestType extends _BaseRequestType { constructor: { new(): BaseRequestType }; }
export var BaseRequestType: { new(): BaseRequestType };

interface _CreatedOrModifiedFeatureType extends BaseType {
	handle: string;
	ResourceId: fes.ResourceIdType[];
}
export interface CreatedOrModifiedFeatureType extends _CreatedOrModifiedFeatureType { constructor: { new(): CreatedOrModifiedFeatureType }; }
export var CreatedOrModifiedFeatureType: { new(): CreatedOrModifiedFeatureType };

interface _CreateStoredQueryResponseType extends _ExecutionStatusType {}
export interface CreateStoredQueryResponseType extends _CreateStoredQueryResponseType { constructor: { new(): CreateStoredQueryResponseType }; }
export var CreateStoredQueryResponseType: { new(): CreateStoredQueryResponseType };

interface _CreateStoredQueryType extends _BaseRequestType {
	StoredQueryDefinition?: StoredQueryDescriptionType[];
}
export interface CreateStoredQueryType extends _CreateStoredQueryType { constructor: { new(): CreateStoredQueryType }; }
export var CreateStoredQueryType: { new(): CreateStoredQueryType };

interface _DeleteType extends _AbstractTransactionActionType {
	typeName: string;
	Filter: fes.FilterType;
}
export interface DeleteType extends _DeleteType { constructor: { new(): DeleteType }; }
export var DeleteType: { new(): DeleteType };

interface _DescribeFeatureTypeType extends _BaseRequestType {
	outputFormat: string;
	TypeName?: string[];
}
export interface DescribeFeatureTypeType extends _DescribeFeatureTypeType { constructor: { new(): DescribeFeatureTypeType }; }
export var DescribeFeatureTypeType: { new(): DescribeFeatureTypeType };

interface _DescribeStoredQueriesResponseType extends BaseType {
	StoredQueryDescription?: StoredQueryDescriptionType[];
}
export interface DescribeStoredQueriesResponseType extends _DescribeStoredQueriesResponseType { constructor: { new(): DescribeStoredQueriesResponseType }; }
export var DescribeStoredQueriesResponseType: { new(): DescribeStoredQueriesResponseType };

interface _DescribeStoredQueriesType extends _BaseRequestType {
	StoredQueryId?: string[];
}
export interface DescribeStoredQueriesType extends _DescribeStoredQueriesType { constructor: { new(): DescribeStoredQueriesType }; }
export var DescribeStoredQueriesType: { new(): DescribeStoredQueriesType };

interface _DropStoredQueryType extends _BaseRequestType {
	id: string;
}
interface DropStoredQueryType extends _DropStoredQueryType { constructor: { new(): DropStoredQueryType }; }

interface _ElementType extends BaseType {
	name: string;
	type: string;
	Metadata: ows.MetadataType;
	ValueList: ValueListType;
}
export interface ElementType extends _ElementType { constructor: { new(): ElementType }; }
export var ElementType: { new(): ElementType };

interface _EmptyType extends BaseType {}
export interface EmptyType extends _EmptyType { constructor: { new(): EmptyType }; }
export var EmptyType: { new(): EmptyType };

interface _EnvelopePropertyType extends BaseType {}
export interface EnvelopePropertyType extends _EnvelopePropertyType { constructor: { new(): EnvelopePropertyType }; }
export var EnvelopePropertyType: { new(): EnvelopePropertyType };

interface _ExecutionStatusType extends BaseType {
	status: string;
}
export interface ExecutionStatusType extends _ExecutionStatusType { constructor: { new(): ExecutionStatusType }; }
export var ExecutionStatusType: { new(): ExecutionStatusType };

interface _ExtendedDescriptionType extends BaseType {
	Element: ElementType[];
}
export interface ExtendedDescriptionType extends _ExtendedDescriptionType { constructor: { new(): ExtendedDescriptionType }; }
export var ExtendedDescriptionType: { new(): ExtendedDescriptionType };

interface _FeatureCollectionType extends _SimpleFeatureCollectionType {
	lockId: string;
	next: string;
	numberMatched: string;
	numberReturned: number;
	previous: string;
	timeStamp: Date;
	additionalObjects?: AdditionalObjectsType;
	truncatedResponse?: TruncatedResponseType;
}
export interface FeatureCollectionType extends _FeatureCollectionType { constructor: { new(): FeatureCollectionType }; }
export var FeatureCollectionType: { new(): FeatureCollectionType };

interface _FeaturesLockedType extends BaseType {
	ResourceId: fes.ResourceIdType[];
}
export interface FeaturesLockedType extends _FeaturesLockedType { constructor: { new(): FeaturesLockedType }; }
export var FeaturesLockedType: { new(): FeaturesLockedType };

interface _FeaturesNotLockedType extends BaseType {
	ResourceId: fes.ResourceIdType[];
}
export interface FeaturesNotLockedType extends _FeaturesNotLockedType { constructor: { new(): FeaturesNotLockedType }; }
export var FeaturesNotLockedType: { new(): FeaturesNotLockedType };

interface _FeatureTypeListType extends BaseType {
	FeatureType: FeatureTypeType[];
}
export interface FeatureTypeListType extends _FeatureTypeListType { constructor: { new(): FeatureTypeListType }; }
export var FeatureTypeListType: { new(): FeatureTypeListType };

interface _FeatureTypeType extends BaseType {
	Abstract?: AbstractType[];
	DefaultCRS: string;
	ExtendedDescription?: ExtendedDescriptionType;
	Keywords?: ows.KeywordsType[];
	MetadataURL?: MetadataURLType[];
	Name: string;
	NoCRS: FeatureTypeTypeNoCRSType;
	OtherCRS?: string[];
	OutputFormats?: OutputFormatListType;
	Title?: TitleType[];
	WGS84BoundingBox?: ows.WGS84BoundingBoxType[];
}
export interface FeatureTypeType extends _FeatureTypeType { constructor: { new(): FeatureTypeType }; }
export var FeatureTypeType: { new(): FeatureTypeType };

interface _FeatureTypeTypeNoCRSType extends BaseType {}
interface FeatureTypeTypeNoCRSType extends _FeatureTypeTypeNoCRSType { constructor: { new(): FeatureTypeTypeNoCRSType }; }

interface _GetCapabilitiesType extends ows._GetCapabilitiesType {
	service: string;
}
export interface GetCapabilitiesType extends _GetCapabilitiesType { constructor: { new(): GetCapabilitiesType }; }
export var GetCapabilitiesType: { new(): GetCapabilitiesType };

interface _GetFeatureType extends _BaseRequestType {
	count: number;
	outputFormat: string;
	resolve: ResolveValueType;
	resolveDepth: string;
	resolveTimeout: number;
	resultType: ResultTypeType;
	startIndex: number;
	AbstractQueryExpression: fes.AbstractQueryExpressionProxyType[];
}
export interface GetFeatureType extends _GetFeatureType { constructor: { new(): GetFeatureType }; }
export var GetFeatureType: { new(): GetFeatureType };

interface _GetFeatureWithLockType extends _GetFeatureType {
	expiry: number;
	lockAction: AllSomeType;
}
export interface GetFeatureWithLockType extends _GetFeatureWithLockType { constructor: { new(): GetFeatureWithLockType }; }
export var GetFeatureWithLockType: { new(): GetFeatureWithLockType };

interface _GetPropertyValueType extends _BaseRequestType, fes._AbstractQueryExpressionProxyType {
	count: number;
	outputFormat: string;
	resolve: ResolveValueType;
	resolveDepth: string;
	resolvePath: string;
	resolveTimeout: number;
	resultType: ResultTypeType;
	startIndex: number;
	valueReference: string;
}
export interface GetPropertyValueType extends _GetPropertyValueType { constructor: { new(): GetPropertyValueType }; }
export var GetPropertyValueType: { new(): GetPropertyValueType };

interface _InsertType extends _AbstractTransactionActionType {
	inputFormat: string;
	srsName: string;
}
export interface InsertType extends _InsertType { constructor: { new(): InsertType }; }
export var InsertType: { new(): InsertType };

interface _ListStoredQueriesResponseType extends BaseType {
	StoredQuery?: StoredQueryListItemType[];
}
export interface ListStoredQueriesResponseType extends _ListStoredQueriesResponseType { constructor: { new(): ListStoredQueriesResponseType }; }
export var ListStoredQueriesResponseType: { new(): ListStoredQueriesResponseType };

interface _ListStoredQueriesType extends _BaseRequestType {}
export interface ListStoredQueriesType extends _ListStoredQueriesType { constructor: { new(): ListStoredQueriesType }; }
export var ListStoredQueriesType: { new(): ListStoredQueriesType };

interface _LockFeatureResponseType extends BaseType {
	lockId: string;
	FeaturesLocked?: FeaturesLockedType;
	FeaturesNotLocked?: FeaturesNotLockedType;
}
export interface LockFeatureResponseType extends _LockFeatureResponseType { constructor: { new(): LockFeatureResponseType }; }
export var LockFeatureResponseType: { new(): LockFeatureResponseType };

interface _LockFeatureType extends _BaseRequestType {
	expiry: number;
	lockAction: AllSomeType;
	lockId: string;
	AbstractQueryExpression?: fes.AbstractQueryExpressionProxyType[];
}
export interface LockFeatureType extends _LockFeatureType { constructor: { new(): LockFeatureType }; }
export var LockFeatureType: { new(): LockFeatureType };

interface _MemberPropertyType extends _SimpleFeatureCollectionProxyType {
	state: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	Tuple?: TupleType;
}
export interface MemberPropertyType extends _MemberPropertyType { constructor: { new(): MemberPropertyType }; }
export var MemberPropertyType: { new(): MemberPropertyType };

interface _MetadataURLType extends BaseType {
	about: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface MetadataURLType extends _MetadataURLType { constructor: { new(): MetadataURLType }; }
export var MetadataURLType: { new(): MetadataURLType };

interface _NativeType extends _AbstractTransactionActionType {
	safeToIgnore: boolean;
	vendorId: string;
}
export interface NativeType extends _NativeType { constructor: { new(): NativeType }; }
export var NativeType: { new(): NativeType };

export type nonNegativeIntegerOrUnknown = string;
type _nonNegativeIntegerOrUnknown = Primitive._string;

interface _OutputFormatListType extends BaseType {
	Format: string[];
}
export interface OutputFormatListType extends _OutputFormatListType { constructor: { new(): OutputFormatListType }; }
export var OutputFormatListType: { new(): OutputFormatListType };

interface _ParameterExpressionType extends BaseType {
	name: string;
	type: string;
	Abstract?: AbstractType[];
	Metadata?: ows.MetadataType[];
	Title?: TitleType[];
}
export interface ParameterExpressionType extends _ParameterExpressionType { constructor: { new(): ParameterExpressionType }; }
export var ParameterExpressionType: { new(): ParameterExpressionType };

interface _ParameterType extends BaseType {
	name: string;
}
export interface ParameterType extends _ParameterType { constructor: { new(): ParameterType }; }
export var ParameterType: { new(): ParameterType };

export type positiveIntegerWithStar = string;
type _positiveIntegerWithStar = Primitive._string;

interface _PropertyNameType extends Primitive._string {
	resolve: ResolveValueType;
	resolveDepth: string;
	resolvePath: string;
	resolveTimeout: number;
}
interface PropertyNameType extends _PropertyNameType { constructor: { new(): PropertyNameType }; }

interface _PropertyType extends BaseType {
	ValueReference: PropertyTypeValueReferenceType;
}
export interface PropertyType extends _PropertyType { constructor: { new(): PropertyType }; }
export var PropertyType: { new(): PropertyType };

interface _PropertyTypeValueReferenceType extends Primitive._string {
	action: UpdateActionType;
}
interface PropertyTypeValueReferenceType extends _PropertyTypeValueReferenceType { constructor: { new(): PropertyTypeValueReferenceType }; }

interface _QueryExpressionTextType extends BaseType {
	isPrivate: boolean;
	language: string;
	returnFeatureTypes: ReturnFeatureTypesListType;
}
export interface QueryExpressionTextType extends _QueryExpressionTextType { constructor: { new(): QueryExpressionTextType }; }
export var QueryExpressionTextType: { new(): QueryExpressionTextType };

interface _QueryType extends fes._AbstractAdhocQueryExpressionType {
	featureVersion: string;
	srsName: string;
}
export interface QueryType extends _QueryType { constructor: { new(): QueryType }; }
export var QueryType: { new(): QueryType };

interface _ReplaceType extends _AbstractTransactionActionType {
	inputFormat: string;
	srsName: string;
	Filter: fes.FilterType;
}
export interface ReplaceType extends _ReplaceType { constructor: { new(): ReplaceType }; }
export var ReplaceType: { new(): ReplaceType };

export type ResolveValueType = ("local" | "remote" | "all" | "none");
interface _ResolveValueType extends Primitive._string { content: ResolveValueType; }

export type ResultTypeType = ("results" | "hits");
interface _ResultTypeType extends Primitive._string { content: ResultTypeType; }

export type ReturnFeatureTypesListType = string[];

interface _SimpleFeatureCollectionProxyType extends BaseType {
	SimpleFeatureCollection?: SimpleFeatureCollectionType;
	FeatureCollection?: FeatureCollectionType;
}
interface SimpleFeatureCollectionProxyType extends _SimpleFeatureCollectionProxyType { constructor: { new(): SimpleFeatureCollectionProxyType }; }

interface _SimpleFeatureCollectionType extends BaseType {
	boundedBy?: EnvelopePropertyType;
	member?: MemberPropertyType[];
}
export interface SimpleFeatureCollectionType extends _SimpleFeatureCollectionType { constructor: { new(): SimpleFeatureCollectionType }; }
export var SimpleFeatureCollectionType: { new(): SimpleFeatureCollectionType };

export type StarStringType = "*";
interface _StarStringType extends Primitive._string { content: StarStringType; }

export type StateValueType = string;
type _StateValueType = Primitive._string;

interface _StoredQueryDescriptionType extends BaseType {
	id: string;
	Abstract?: AbstractType[];
	Metadata?: ows.MetadataType[];
	Parameter?: ParameterExpressionType[];
	QueryExpressionText: QueryExpressionTextType[];
	Title?: TitleType[];
}
export interface StoredQueryDescriptionType extends _StoredQueryDescriptionType { constructor: { new(): StoredQueryDescriptionType }; }
export var StoredQueryDescriptionType: { new(): StoredQueryDescriptionType };

interface _StoredQueryListItemType extends BaseType {
	id: string;
	ReturnFeatureType?: string[];
	Title?: TitleType[];
}
export interface StoredQueryListItemType extends _StoredQueryListItemType { constructor: { new(): StoredQueryListItemType }; }
export var StoredQueryListItemType: { new(): StoredQueryListItemType };

interface _StoredQueryType extends fes._AbstractQueryExpressionType {
	id: string;
	Parameter?: ParameterType[];
}
export interface StoredQueryType extends _StoredQueryType { constructor: { new(): StoredQueryType }; }
export var StoredQueryType: { new(): StoredQueryType };

interface _TitleType extends Primitive._string {
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
}
interface TitleType extends _TitleType { constructor: { new(): TitleType }; }

interface _TransactionResponseType extends BaseType {
	version: string;
	InsertResults?: ActionResultsType;
	ReplaceResults?: ActionResultsType;
	TransactionSummary: TransactionSummaryType;
	UpdateResults?: ActionResultsType;
}
export interface TransactionResponseType extends _TransactionResponseType { constructor: { new(): TransactionResponseType }; }
export var TransactionResponseType: { new(): TransactionResponseType };

interface _TransactionSummaryType extends BaseType {
	totalDeleted?: number;
	totalInserted?: number;
	totalReplaced?: number;
	totalUpdated?: number;
}
export interface TransactionSummaryType extends _TransactionSummaryType { constructor: { new(): TransactionSummaryType }; }
export var TransactionSummaryType: { new(): TransactionSummaryType };

interface _TransactionType extends _BaseRequestType {
	lockId: string;
	releaseAction: AllSomeType;
	srsName: string;
	AbstractTransactionAction?: AbstractTransactionActionProxyType[];
}
export interface TransactionType extends _TransactionType { constructor: { new(): TransactionType }; }
export var TransactionType: { new(): TransactionType };

interface _TruncatedResponseType extends BaseType {
	/** Report message returned to the client that requested any OWS operation when the server detects an error while processing that operation request. */
	ExceptionReport: ows.ExceptionReportType;
}
interface TruncatedResponseType extends _TruncatedResponseType { constructor: { new(): TruncatedResponseType }; }

interface _TupleType extends BaseType {
	member: MemberPropertyType[];
}
export interface TupleType extends _TupleType { constructor: { new(): TupleType }; }
export var TupleType: { new(): TupleType };

export type UpdateActionType = ("replace" | "insertBefore" | "insertAfter" | "remove");
interface _UpdateActionType extends Primitive._string { content: UpdateActionType; }

interface _UpdateType extends _AbstractTransactionActionType {
	inputFormat: string;
	srsName: string;
	typeName: string;
	Filter?: fes.FilterType;
	Property: PropertyType[];
}
export interface UpdateType extends _UpdateType { constructor: { new(): UpdateType }; }
export var UpdateType: { new(): UpdateType };

interface _ValueCollectionType extends BaseType {
	next: string;
	numberMatched: string;
	numberReturned: number;
	previous: string;
	timeStamp: Date;
	additionalValues?: AdditionalValuesType;
	member?: MemberPropertyType[];
	truncatedResponse?: TruncatedResponseType;
}
export interface ValueCollectionType extends _ValueCollectionType { constructor: { new(): ValueCollectionType }; }
export var ValueCollectionType: { new(): ValueCollectionType };

interface _ValueListType extends BaseType {
	Value: any[];
}
export interface ValueListType extends _ValueListType { constructor: { new(): ValueListType }; }
export var ValueListType: { new(): ValueListType };

export type VersionStringType = string;
type _VersionStringType = Primitive._string;

interface _WFS_CapabilitiesType extends ows._CapabilitiesBaseType {
	FeatureTypeList?: FeatureTypeListType;
	Filter_Capabilities?: fes.Filter_CapabilitiesType;
	WSDL?: WFS_CapabilitiesTypeWSDLType;
}
export interface WFS_CapabilitiesType extends _WFS_CapabilitiesType { constructor: { new(): WFS_CapabilitiesType }; }
export var WFS_CapabilitiesType: { new(): WFS_CapabilitiesType };

interface _WFS_CapabilitiesTypeWSDLType extends Primitive._any {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
interface WFS_CapabilitiesTypeWSDLType extends _WFS_CapabilitiesTypeWSDLType { constructor: { new(): WFS_CapabilitiesTypeWSDLType }; }

export interface document extends BaseType {
	Abstract: AbstractType;
	additionalObjects: AdditionalObjectsType;
	additionalValues: AdditionalValuesType;
	boundedBy: EnvelopePropertyType;
	CreateStoredQuery: CreateStoredQueryType;
	CreateStoredQueryResponse: CreateStoredQueryResponseType;
	Delete: DeleteType;
	DescribeFeatureType: DescribeFeatureTypeType;
	DescribeStoredQueries: DescribeStoredQueriesType;
	DescribeStoredQueriesResponse: DescribeStoredQueriesResponseType;
	DropStoredQuery: DropStoredQueryType;
	DropStoredQueryResponse: ExecutionStatusType;
	Element: ElementType;
	FeatureCollection: FeatureCollectionType;
	FeatureTypeList: FeatureTypeListType;
	GetCapabilities: GetCapabilitiesType;
	GetFeature: GetFeatureType;
	GetFeatureWithLock: GetFeatureWithLockType;
	GetPropertyValue: GetPropertyValueType;
	Insert: InsertType;
	ListStoredQueries: ListStoredQueriesType;
	ListStoredQueriesResponse: ListStoredQueriesResponseType;
	LockFeature: LockFeatureType;
	LockFeatureResponse: LockFeatureResponseType;
	member: MemberPropertyType;
	Native: NativeType;
	Property: PropertyType;
	PropertyName: PropertyNameType;
	Query: QueryType;
	Replace: ReplaceType;
	StoredQuery: StoredQueryType;
	Title: TitleType;
	Transaction: TransactionType;
	TransactionResponse: TransactionResponseType;
	truncatedResponse: TruncatedResponseType;
	Tuple: TupleType;
	Update: UpdateType;
	Value: any;
	ValueCollection: ValueCollectionType;
	ValueList: ValueListType;
	WFS_Capabilities: WFS_CapabilitiesType;
}
export var document: document;
