import * as Primitive from '../../xml-primitives';
import * as ows from '../ows/1.1';

// Source files:
// http://schemas.opengis.net/filter/2.0/expr.xsd
// http://schemas.opengis.net/filter/2.0/filter.xsd
// http://schemas.opengis.net/filter/2.0/filterAll.xsd
// http://schemas.opengis.net/filter/2.0/filterCapabilities.xsd
// http://schemas.opengis.net/filter/2.0/query.xsd
// http://schemas.opengis.net/filter/2.0/sort.xsd


interface BaseType {
	_exists: boolean;
	_namespace: string;
}
interface _AbstractAdhocQueryExpressionProxyType extends BaseType {}
interface AbstractAdhocQueryExpressionProxyType extends _AbstractAdhocQueryExpressionProxyType { constructor: { new(): AbstractAdhocQueryExpressionProxyType }; }

interface _AbstractAdhocQueryExpressionType extends _AbstractQueryExpressionType, _AbstractSelectionClauseProxyType, _AbstractSortingClauseProxyType {
	aliases: AliasesType;
	typeNames: TypeNamesListType;
	AbstractProjectionClause?: AbstractProjectionClauseProxyType[];
}
export interface AbstractAdhocQueryExpressionType extends _AbstractAdhocQueryExpressionType { constructor: { new(): AbstractAdhocQueryExpressionType }; }
export var AbstractAdhocQueryExpressionType: { new(): AbstractAdhocQueryExpressionType };

interface _AbstractIdType extends BaseType {}
export interface AbstractIdType extends _AbstractIdType { constructor: { new(): AbstractIdType }; }
export var AbstractIdType: { new(): AbstractIdType };

interface _AbstractProjectionClauseProxyType extends BaseType {}
interface AbstractProjectionClauseProxyType extends _AbstractProjectionClauseProxyType { constructor: { new(): AbstractProjectionClauseProxyType }; }

interface _AbstractProjectionClauseType extends BaseType {}
export interface AbstractProjectionClauseType extends _AbstractProjectionClauseType { constructor: { new(): AbstractProjectionClauseType }; }
export var AbstractProjectionClauseType: { new(): AbstractProjectionClauseType };

interface _AbstractQueryExpressionProxyType extends _AbstractAdhocQueryExpressionProxyType {}
interface AbstractQueryExpressionProxyType extends _AbstractQueryExpressionProxyType { constructor: { new(): AbstractQueryExpressionProxyType }; }

interface _AbstractQueryExpressionType extends BaseType {
	handle: string;
}
export interface AbstractQueryExpressionType extends _AbstractQueryExpressionType { constructor: { new(): AbstractQueryExpressionType }; }
export var AbstractQueryExpressionType: { new(): AbstractQueryExpressionType };

interface _AbstractSelectionClauseProxyType extends BaseType {
	Filter?: FilterType;
}
interface AbstractSelectionClauseProxyType extends _AbstractSelectionClauseProxyType { constructor: { new(): AbstractSelectionClauseProxyType }; }

interface _AbstractSelectionClauseType extends BaseType {}
export interface AbstractSelectionClauseType extends _AbstractSelectionClauseType { constructor: { new(): AbstractSelectionClauseType }; }
export var AbstractSelectionClauseType: { new(): AbstractSelectionClauseType };

interface _AbstractSortingClauseProxyType extends BaseType {
	SortBy?: SortByType;
}
interface AbstractSortingClauseProxyType extends _AbstractSortingClauseProxyType { constructor: { new(): AbstractSortingClauseProxyType }; }

interface _AbstractSortingClauseType extends BaseType {}
export interface AbstractSortingClauseType extends _AbstractSortingClauseType { constructor: { new(): AbstractSortingClauseType }; }
export var AbstractSortingClauseType: { new(): AbstractSortingClauseType };

interface _AdditionalOperatorsType extends BaseType {
	Operator?: ExtensionOperatorType[];
}
export interface AdditionalOperatorsType extends _AdditionalOperatorsType { constructor: { new(): AdditionalOperatorsType }; }
export var AdditionalOperatorsType: { new(): AdditionalOperatorsType };

export type AliasesType = string[];

interface _ArgumentsType extends BaseType {
	Argument: ArgumentType[];
}
export interface ArgumentsType extends _ArgumentsType { constructor: { new(): ArgumentsType }; }
export var ArgumentsType: { new(): ArgumentsType };

interface _ArgumentType extends BaseType {
	name: string;
	Metadata?: ows.MetadataType;
	Type: string;
}
export interface ArgumentType extends _ArgumentType { constructor: { new(): ArgumentType }; }
export var ArgumentType: { new(): ArgumentType };

interface _AvailableFunctionsType extends BaseType {
	Function: AvailableFunctionType[];
}
export interface AvailableFunctionsType extends _AvailableFunctionsType { constructor: { new(): AvailableFunctionsType }; }
export var AvailableFunctionsType: { new(): AvailableFunctionsType };

interface _AvailableFunctionType extends BaseType {
	name: string;
	Arguments?: ArgumentsType;
	Metadata?: ows.MetadataType;
	Returns: string;
}
export interface AvailableFunctionType extends _AvailableFunctionType { constructor: { new(): AvailableFunctionType }; }
export var AvailableFunctionType: { new(): AvailableFunctionType };

interface _BBOXType extends _SpatialOpsType {
	expression: ExpressionProxyType[];
}
export interface BBOXType extends _BBOXType { constructor: { new(): BBOXType }; }
export var BBOXType: { new(): BBOXType };

interface _BinaryComparisonOpType extends _ComparisonOpsType {
	matchAction?: MatchActionType;
	matchCase?: boolean;
	expression: ExpressionProxyType[];
}
export interface BinaryComparisonOpType extends _BinaryComparisonOpType { constructor: { new(): BinaryComparisonOpType }; }
export var BinaryComparisonOpType: { new(): BinaryComparisonOpType };

interface _BinaryLogicOpType extends _LogicOpsType {
	Id: IdProxyType[];
	comparisonOps: ComparisonOpsProxyType[];
	extensionOps: ExtensionOpsProxyType[];
	Function: FunctionType[];
	logicOps: LogicOpsProxyType[];
	spatialOps: SpatialOpsProxyType[];
	temporalOps: TemporalOpsProxyType[];
}
export interface BinaryLogicOpType extends _BinaryLogicOpType { constructor: { new(): BinaryLogicOpType }; }
export var BinaryLogicOpType: { new(): BinaryLogicOpType };

interface _BinarySpatialOpType extends _SpatialOpsType {
	expression: ExpressionProxyType[];
}
export interface BinarySpatialOpType extends _BinarySpatialOpType { constructor: { new(): BinarySpatialOpType }; }
export var BinarySpatialOpType: { new(): BinarySpatialOpType };

interface _BinaryTemporalOpType extends _TemporalOpsType {
	expression: ExpressionProxyType[];
}
export interface BinaryTemporalOpType extends _BinaryTemporalOpType { constructor: { new(): BinaryTemporalOpType }; }
export var BinaryTemporalOpType: { new(): BinaryTemporalOpType };

export type ComparisonOperatorNameType = string;
type _ComparisonOperatorNameType = Primitive._string;

interface _ComparisonOperatorsType extends BaseType {
	ComparisonOperator: ComparisonOperatorType[];
}
export interface ComparisonOperatorsType extends _ComparisonOperatorsType { constructor: { new(): ComparisonOperatorsType }; }
export var ComparisonOperatorsType: { new(): ComparisonOperatorsType };

interface _ComparisonOperatorType extends BaseType {
	name: string;
}
export interface ComparisonOperatorType extends _ComparisonOperatorType { constructor: { new(): ComparisonOperatorType }; }
export var ComparisonOperatorType: { new(): ComparisonOperatorType };

interface _ComparisonOpsProxyType extends BaseType {
	PropertyIsBetween?: PropertyIsBetweenType;
	PropertyIsEqualTo?: BinaryComparisonOpType;
	PropertyIsGreaterThan?: BinaryComparisonOpType;
	PropertyIsGreaterThanOrEqualTo?: BinaryComparisonOpType;
	PropertyIsLessThan?: BinaryComparisonOpType;
	PropertyIsLessThanOrEqualTo?: BinaryComparisonOpType;
	PropertyIsLike?: PropertyIsLikeType;
	PropertyIsNil?: PropertyIsNilType;
	PropertyIsNotEqualTo?: BinaryComparisonOpType;
	PropertyIsNull?: PropertyIsNullType;
}
interface ComparisonOpsProxyType extends _ComparisonOpsProxyType { constructor: { new(): ComparisonOpsProxyType }; }

interface _ComparisonOpsType extends BaseType {}
export interface ComparisonOpsType extends _ComparisonOpsType { constructor: { new(): ComparisonOpsType }; }
export var ComparisonOpsType: { new(): ComparisonOpsType };

interface _ConformanceType extends BaseType {
	Constraint: ows.DomainType[];
}
export interface ConformanceType extends _ConformanceType { constructor: { new(): ConformanceType }; }
export var ConformanceType: { new(): ConformanceType };

interface _DistanceBufferType extends _SpatialOpsType {
	Distance: MeasureType;
	expression: ExpressionProxyType[];
}
export interface DistanceBufferType extends _DistanceBufferType { constructor: { new(): DistanceBufferType }; }
export var DistanceBufferType: { new(): DistanceBufferType };

interface _ExpressionProxyType extends BaseType {
	Function?: FunctionType;
	ValueReference?: string;
	Literal?: LiteralType;
}
interface ExpressionProxyType extends _ExpressionProxyType { constructor: { new(): ExpressionProxyType }; }

interface _Extended_CapabilitiesType extends BaseType {
	AdditionalOperators?: AdditionalOperatorsType;
}
export interface Extended_CapabilitiesType extends _Extended_CapabilitiesType { constructor: { new(): Extended_CapabilitiesType }; }
export var Extended_CapabilitiesType: { new(): Extended_CapabilitiesType };

interface _ExtensionOperatorType extends BaseType {
	name: string;
}
export interface ExtensionOperatorType extends _ExtensionOperatorType { constructor: { new(): ExtensionOperatorType }; }
export var ExtensionOperatorType: { new(): ExtensionOperatorType };

interface _ExtensionOpsProxyType extends BaseType {}
interface ExtensionOpsProxyType extends _ExtensionOpsProxyType { constructor: { new(): ExtensionOpsProxyType }; }

interface _ExtensionOpsType extends BaseType {}
export interface ExtensionOpsType extends _ExtensionOpsType { constructor: { new(): ExtensionOpsType }; }
export var ExtensionOpsType: { new(): ExtensionOpsType };

interface _Filter_CapabilitiesType extends BaseType {
	Conformance: ConformanceType;
	Extended_Capabilities?: Extended_CapabilitiesType;
	Functions?: AvailableFunctionsType;
	Id_Capabilities?: Id_CapabilitiesType;
	Scalar_Capabilities?: Scalar_CapabilitiesType;
	Spatial_Capabilities?: Spatial_CapabilitiesType;
	Temporal_Capabilities?: Temporal_CapabilitiesType;
}
export interface Filter_CapabilitiesType extends _Filter_CapabilitiesType { constructor: { new(): Filter_CapabilitiesType }; }
export var Filter_CapabilitiesType: { new(): Filter_CapabilitiesType };

interface _FilterType extends _AbstractSelectionClauseType, _ComparisonOpsProxyType, _ExtensionOpsProxyType, _LogicOpsProxyType, _SpatialOpsProxyType, _TemporalOpsProxyType {
	Id: IdProxyType[];
	Function: FunctionType;
}
export interface FilterType extends _FilterType { constructor: { new(): FilterType }; }
export var FilterType: { new(): FilterType };

interface _FunctionType extends BaseType {
	name: string;
	expression?: ExpressionProxyType[];
}
export interface FunctionType extends _FunctionType { constructor: { new(): FunctionType }; }
export var FunctionType: { new(): FunctionType };

interface _GeometryOperandsType extends BaseType {
	GeometryOperand: GeometryOperandsTypeGeometryOperandType[];
}
export interface GeometryOperandsType extends _GeometryOperandsType { constructor: { new(): GeometryOperandsType }; }
export var GeometryOperandsType: { new(): GeometryOperandsType };

interface _GeometryOperandsTypeGeometryOperandType extends BaseType {
	name: string;
}
interface GeometryOperandsTypeGeometryOperandType extends _GeometryOperandsTypeGeometryOperandType { constructor: { new(): GeometryOperandsTypeGeometryOperandType }; }

interface _Id_CapabilitiesType extends BaseType {
	ResourceIdentifier: ResourceIdentifierType[];
}
export interface Id_CapabilitiesType extends _Id_CapabilitiesType { constructor: { new(): Id_CapabilitiesType }; }
export var Id_CapabilitiesType: { new(): Id_CapabilitiesType };

interface _IdProxyType extends BaseType {
	ResourceId?: ResourceIdType;
}
interface IdProxyType extends _IdProxyType { constructor: { new(): IdProxyType }; }

interface _LiteralType extends BaseType {
	type: string;
}
export interface LiteralType extends _LiteralType { constructor: { new(): LiteralType }; }
export var LiteralType: { new(): LiteralType };

interface _LogicalOperatorsType extends BaseType {}
interface LogicalOperatorsType extends _LogicalOperatorsType { constructor: { new(): LogicalOperatorsType }; }

interface _LogicOpsProxyType extends BaseType {
	And?: BinaryLogicOpType;
	Not?: UnaryLogicOpType;
	Or?: BinaryLogicOpType;
}
interface LogicOpsProxyType extends _LogicOpsProxyType { constructor: { new(): LogicOpsProxyType }; }

interface _LogicOpsType extends BaseType {}
export interface LogicOpsType extends _LogicOpsType { constructor: { new(): LogicOpsType }; }
export var LogicOpsType: { new(): LogicOpsType };

interface _LowerBoundaryType extends _ExpressionProxyType {}
export interface LowerBoundaryType extends _LowerBoundaryType { constructor: { new(): LowerBoundaryType }; }
export var LowerBoundaryType: { new(): LowerBoundaryType };

export type MatchActionType = ("All" | "Any" | "One");
interface _MatchActionType extends Primitive._string { content: MatchActionType; }

interface _MeasureType extends Primitive._number {
	uom: string;
}
export interface MeasureType extends _MeasureType { constructor: { new(): MeasureType }; }
export var MeasureType: { new(): MeasureType };

interface _PropertyIsBetweenType extends _ComparisonOpsType, _ExpressionProxyType {
	LowerBoundary: LowerBoundaryType;
	UpperBoundary: UpperBoundaryType;
}
export interface PropertyIsBetweenType extends _PropertyIsBetweenType { constructor: { new(): PropertyIsBetweenType }; }
export var PropertyIsBetweenType: { new(): PropertyIsBetweenType };

interface _PropertyIsLikeType extends _ComparisonOpsType {
	escapeChar: string;
	matchCase?: boolean;
	singleChar: string;
	wildCard: string;
	expression: ExpressionProxyType[];
}
export interface PropertyIsLikeType extends _PropertyIsLikeType { constructor: { new(): PropertyIsLikeType }; }
export var PropertyIsLikeType: { new(): PropertyIsLikeType };

interface _PropertyIsNilType extends _ComparisonOpsType, _ExpressionProxyType {
	nilReason: string;
}
export interface PropertyIsNilType extends _PropertyIsNilType { constructor: { new(): PropertyIsNilType }; }
export var PropertyIsNilType: { new(): PropertyIsNilType };

interface _PropertyIsNullType extends _ComparisonOpsType, _ExpressionProxyType {}
export interface PropertyIsNullType extends _PropertyIsNullType { constructor: { new(): PropertyIsNullType }; }
export var PropertyIsNullType: { new(): PropertyIsNullType };

interface _ResourceIdentifierType extends BaseType {
	name: string;
	Metadata?: ows.MetadataType;
}
export interface ResourceIdentifierType extends _ResourceIdentifierType { constructor: { new(): ResourceIdentifierType }; }
export var ResourceIdentifierType: { new(): ResourceIdentifierType };

interface _ResourceIdType extends _AbstractIdType {
	endDate: Date;
	previousRid: string;
	rid: string;
	startDate: Date;
	version: string;
}
export interface ResourceIdType extends _ResourceIdType { constructor: { new(): ResourceIdType }; }
export var ResourceIdType: { new(): ResourceIdType };

interface _Scalar_CapabilitiesType extends BaseType {
	ComparisonOperators?: ComparisonOperatorsType;
	LogicalOperators?: LogicalOperatorsType;
}
export interface Scalar_CapabilitiesType extends _Scalar_CapabilitiesType { constructor: { new(): Scalar_CapabilitiesType }; }
export var Scalar_CapabilitiesType: { new(): Scalar_CapabilitiesType };

export type SchemaElement = string;
type _SchemaElement = Primitive._string;

interface _SortByType extends BaseType {
	SortProperty: SortPropertyType[];
}
export interface SortByType extends _SortByType { constructor: { new(): SortByType }; }
export var SortByType: { new(): SortByType };

export type SortOrderType = ("DESC" | "ASC");
interface _SortOrderType extends Primitive._string { content: SortOrderType; }

interface _SortPropertyType extends BaseType {
	SortOrder?: SortOrderType;
	ValueReference: string;
}
export interface SortPropertyType extends _SortPropertyType { constructor: { new(): SortPropertyType }; }
export var SortPropertyType: { new(): SortPropertyType };

interface _Spatial_CapabilitiesType extends BaseType {
	GeometryOperands: GeometryOperandsType;
	SpatialOperators: SpatialOperatorsType;
}
export interface Spatial_CapabilitiesType extends _Spatial_CapabilitiesType { constructor: { new(): Spatial_CapabilitiesType }; }
export var Spatial_CapabilitiesType: { new(): Spatial_CapabilitiesType };

export type SpatialOperatorNameType = string;
type _SpatialOperatorNameType = Primitive._string;

interface _SpatialOperatorsType extends BaseType {
	SpatialOperator: SpatialOperatorType[];
}
export interface SpatialOperatorsType extends _SpatialOperatorsType { constructor: { new(): SpatialOperatorsType }; }
export var SpatialOperatorsType: { new(): SpatialOperatorsType };

interface _SpatialOperatorType extends BaseType {
	name: string;
	GeometryOperands?: GeometryOperandsType;
}
export interface SpatialOperatorType extends _SpatialOperatorType { constructor: { new(): SpatialOperatorType }; }
export var SpatialOperatorType: { new(): SpatialOperatorType };

interface _SpatialOpsProxyType extends BaseType {
	BBOX?: BBOXType;
	Beyond?: DistanceBufferType;
	Contains?: BinarySpatialOpType;
	Crosses?: BinarySpatialOpType;
	Disjoint?: BinarySpatialOpType;
	DWithin?: DistanceBufferType;
	Equals?: BinarySpatialOpType;
	Intersects?: BinarySpatialOpType;
	Overlaps?: BinarySpatialOpType;
	Touches?: BinarySpatialOpType;
	Within?: BinarySpatialOpType;
}
interface SpatialOpsProxyType extends _SpatialOpsProxyType { constructor: { new(): SpatialOpsProxyType }; }

interface _SpatialOpsType extends BaseType {}
export interface SpatialOpsType extends _SpatialOpsType { constructor: { new(): SpatialOpsType }; }
export var SpatialOpsType: { new(): SpatialOpsType };

interface _Temporal_CapabilitiesType extends BaseType {
	TemporalOperands: TemporalOperandsType;
	TemporalOperators: TemporalOperatorsType;
}
export interface Temporal_CapabilitiesType extends _Temporal_CapabilitiesType { constructor: { new(): Temporal_CapabilitiesType }; }
export var Temporal_CapabilitiesType: { new(): Temporal_CapabilitiesType };

interface _TemporalOperandsType extends BaseType {
	TemporalOperand: TemporalOperandsTypeTemporalOperandType[];
}
export interface TemporalOperandsType extends _TemporalOperandsType { constructor: { new(): TemporalOperandsType }; }
export var TemporalOperandsType: { new(): TemporalOperandsType };

interface _TemporalOperandsTypeTemporalOperandType extends BaseType {
	name: string;
}
interface TemporalOperandsTypeTemporalOperandType extends _TemporalOperandsTypeTemporalOperandType { constructor: { new(): TemporalOperandsTypeTemporalOperandType }; }

export type TemporalOperatorNameType = string;
type _TemporalOperatorNameType = Primitive._string;

interface _TemporalOperatorsType extends BaseType {
	TemporalOperator: TemporalOperatorType[];
}
export interface TemporalOperatorsType extends _TemporalOperatorsType { constructor: { new(): TemporalOperatorsType }; }
export var TemporalOperatorsType: { new(): TemporalOperatorsType };

interface _TemporalOperatorType extends BaseType {
	name: string;
	TemporalOperands?: TemporalOperandsType;
}
export interface TemporalOperatorType extends _TemporalOperatorType { constructor: { new(): TemporalOperatorType }; }
export var TemporalOperatorType: { new(): TemporalOperatorType };

interface _TemporalOpsProxyType extends BaseType {
	After?: BinaryTemporalOpType;
	AnyInteracts?: BinaryTemporalOpType;
	Before?: BinaryTemporalOpType;
	Begins?: BinaryTemporalOpType;
	BegunBy?: BinaryTemporalOpType;
	During?: BinaryTemporalOpType;
	EndedBy?: BinaryTemporalOpType;
	Ends?: BinaryTemporalOpType;
	Meets?: BinaryTemporalOpType;
	MetBy?: BinaryTemporalOpType;
	OverlappedBy?: BinaryTemporalOpType;
	TContains?: BinaryTemporalOpType;
	TEquals?: BinaryTemporalOpType;
	TOverlaps?: BinaryTemporalOpType;
}
interface TemporalOpsProxyType extends _TemporalOpsProxyType { constructor: { new(): TemporalOpsProxyType }; }

interface _TemporalOpsType extends BaseType {}
export interface TemporalOpsType extends _TemporalOpsType { constructor: { new(): TemporalOpsType }; }
export var TemporalOpsType: { new(): TemporalOpsType };

export type TypeNamesListType = string[];

export type TypeNamesType = string;
type _TypeNamesType = Primitive._string;

interface _UnaryLogicOpType extends _LogicOpsType, _ComparisonOpsProxyType, _ExtensionOpsProxyType, _LogicOpsProxyType, _SpatialOpsProxyType, _TemporalOpsProxyType {
	Id: IdProxyType[];
	Function: FunctionType;
}
export interface UnaryLogicOpType extends _UnaryLogicOpType { constructor: { new(): UnaryLogicOpType }; }
export var UnaryLogicOpType: { new(): UnaryLogicOpType };

export type UomIdentifier = string;
type _UomIdentifier = Primitive._string;

export type UomSymbol = string;
type _UomSymbol = Primitive._string;

export type UomURI = string;
type _UomURI = Primitive._string;

interface _UpperBoundaryType extends _ExpressionProxyType {}
export interface UpperBoundaryType extends _UpperBoundaryType { constructor: { new(): UpperBoundaryType }; }
export var UpperBoundaryType: { new(): UpperBoundaryType };

export type VersionActionTokens = ("FIRST" | "LAST" | "PREVIOUS" | "NEXT" | "ALL");
interface _VersionActionTokens extends Primitive._string { content: VersionActionTokens; }

export type VersionType = string;
type _VersionType = Primitive._string;

export interface document extends BaseType {
	After: BinaryTemporalOpType;
	And: BinaryLogicOpType;
	AnyInteracts: BinaryTemporalOpType;
	BBOX: BBOXType;
	Before: BinaryTemporalOpType;
	Begins: BinaryTemporalOpType;
	BegunBy: BinaryTemporalOpType;
	Beyond: DistanceBufferType;
	Contains: BinarySpatialOpType;
	Crosses: BinarySpatialOpType;
	Disjoint: BinarySpatialOpType;
	During: BinaryTemporalOpType;
	DWithin: DistanceBufferType;
	EndedBy: BinaryTemporalOpType;
	Ends: BinaryTemporalOpType;
	Equals: BinarySpatialOpType;
	Filter: FilterType;
	Filter_Capabilities: Filter_CapabilitiesType;
	Function: FunctionType;
	Intersects: BinarySpatialOpType;
	Literal: LiteralType;
	LogicalOperators: LogicalOperatorsType;
	Meets: BinaryTemporalOpType;
	MetBy: BinaryTemporalOpType;
	Not: UnaryLogicOpType;
	Or: BinaryLogicOpType;
	OverlappedBy: BinaryTemporalOpType;
	Overlaps: BinarySpatialOpType;
	PropertyIsBetween: PropertyIsBetweenType;
	PropertyIsEqualTo: BinaryComparisonOpType;
	PropertyIsGreaterThan: BinaryComparisonOpType;
	PropertyIsGreaterThanOrEqualTo: BinaryComparisonOpType;
	PropertyIsLessThan: BinaryComparisonOpType;
	PropertyIsLessThanOrEqualTo: BinaryComparisonOpType;
	PropertyIsLike: PropertyIsLikeType;
	PropertyIsNil: PropertyIsNilType;
	PropertyIsNotEqualTo: BinaryComparisonOpType;
	PropertyIsNull: PropertyIsNullType;
	ResourceId: ResourceIdType;
	SortBy: SortByType;
	TContains: BinaryTemporalOpType;
	TEquals: BinaryTemporalOpType;
	Touches: BinarySpatialOpType;
	TOverlaps: BinaryTemporalOpType;
	ValueReference: string;
	Within: BinarySpatialOpType;
}
export var document: document;
