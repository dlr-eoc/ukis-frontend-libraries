import * as Primitive from '../xml-primitives';
import * as gml from './gml';

// Source files:
// http://schemas.opengis.net/filter/1.1.0/expr.xsd
// http://schemas.opengis.net/filter/1.1.0/filter.xsd
// http://schemas.opengis.net/filter/1.1.0/filterAll.xsd
// http://schemas.opengis.net/filter/1.1.0/filterCapabilities.xsd
// http://schemas.opengis.net/filter/1.1.0/sort.xsd


interface BaseType {
	_exists: boolean;
	_namespace: string;
}
interface _AbstractIdType extends BaseType {}
export interface AbstractIdType extends _AbstractIdType { constructor: { new(): AbstractIdType }; }
export var AbstractIdType: { new(): AbstractIdType };

interface _ArithmeticOperatorsType extends BaseType {
	Functions: FunctionsType[];
	SimpleArithmetic: SimpleArithmeticType[];
}
export interface ArithmeticOperatorsType extends _ArithmeticOperatorsType { constructor: { new(): ArithmeticOperatorsType }; }
export var ArithmeticOperatorsType: { new(): ArithmeticOperatorsType };

interface _BBOXType extends _SpatialOpsType, gml.EnvelopeProxyType {
	PropertyName?: PropertyNameType;
}
export interface BBOXType extends _BBOXType { constructor: { new(): BBOXType }; }
export var BBOXType: { new(): BBOXType };

interface _BinaryComparisonOpType extends _ComparisonOpsType {
	matchCase?: boolean;
	expression: ExpressionProxyType[];
}
export interface BinaryComparisonOpType extends _BinaryComparisonOpType { constructor: { new(): BinaryComparisonOpType }; }
export var BinaryComparisonOpType: { new(): BinaryComparisonOpType };

interface _BinaryLogicOpType extends _LogicOpsType {
	comparisonOps: ComparisonOpsProxyType[];
	Function: FunctionType[];
	logicOps: LogicOpsProxyType[];
	spatialOps: SpatialOpsProxyType[];
}
export interface BinaryLogicOpType extends _BinaryLogicOpType { constructor: { new(): BinaryLogicOpType }; }
export var BinaryLogicOpType: { new(): BinaryLogicOpType };

interface _BinaryOperatorType extends _ExpressionType {
	expression: ExpressionProxyType[];
}
export interface BinaryOperatorType extends _BinaryOperatorType { constructor: { new(): BinaryOperatorType }; }
export var BinaryOperatorType: { new(): BinaryOperatorType };

interface _BinarySpatialOpType extends _SpatialOpsType, gml._GeometryProxyType, gml._EnvelopeProxyType {
	PropertyName: PropertyNameType[];
}
export interface BinarySpatialOpType extends _BinarySpatialOpType { constructor: { new(): BinarySpatialOpType }; }
export var BinarySpatialOpType: { new(): BinarySpatialOpType };

interface _ComparisonOperatorsType extends BaseType {
	ComparisonOperator: ComparisonOperatorType[];
}
export interface ComparisonOperatorsType extends _ComparisonOperatorsType { constructor: { new(): ComparisonOperatorsType }; }
export var ComparisonOperatorsType: { new(): ComparisonOperatorsType };

export type ComparisonOperatorType = ("LessThan" | "GreaterThan" | "LessThanEqualTo" | "GreaterThanEqualTo" | "EqualTo" | "NotEqualTo" | "Like" | "Between" | "NullCheck");
interface _ComparisonOperatorType extends Primitive._string { content: ComparisonOperatorType; }

interface _ComparisonOpsProxyType extends BaseType {
	PropertyIsBetween?: PropertyIsBetweenType;
	PropertyIsEqualTo?: BinaryComparisonOpType;
	PropertyIsGreaterThan?: BinaryComparisonOpType;
	PropertyIsGreaterThanOrEqualTo?: BinaryComparisonOpType;
	PropertyIsLessThan?: BinaryComparisonOpType;
	PropertyIsLessThanOrEqualTo?: BinaryComparisonOpType;
	PropertyIsLike?: PropertyIsLikeType;
	PropertyIsNotEqualTo?: BinaryComparisonOpType;
	PropertyIsNull?: PropertyIsNullType;
}
interface ComparisonOpsProxyType extends _ComparisonOpsProxyType { constructor: { new(): ComparisonOpsProxyType }; }

interface _ComparisonOpsType extends BaseType {}
export interface ComparisonOpsType extends _ComparisonOpsType { constructor: { new(): ComparisonOpsType }; }
export var ComparisonOpsType: { new(): ComparisonOpsType };

interface _DistanceBufferType extends _SpatialOpsType, gml.GeometryProxyType {
	Distance: DistanceType;
	PropertyName: PropertyNameType;
}
export interface DistanceBufferType extends _DistanceBufferType { constructor: { new(): DistanceBufferType }; }
export var DistanceBufferType: { new(): DistanceBufferType };

interface _DistanceType extends Primitive._number {
	units: string;
}
export interface DistanceType extends _DistanceType { constructor: { new(): DistanceType }; }
export var DistanceType: { new(): DistanceType };

interface _EIDType extends BaseType {}
interface EIDType extends _EIDType { constructor: { new(): EIDType }; }

interface _ExpressionProxyType extends BaseType {
	Literal?: LiteralType;
	PropertyName?: PropertyNameType;
	Function?: FunctionType;
	Add?: BinaryOperatorType;
	Div?: BinaryOperatorType;
	Mul?: BinaryOperatorType;
	Sub?: BinaryOperatorType;
}
interface ExpressionProxyType extends _ExpressionProxyType { constructor: { new(): ExpressionProxyType }; }

interface _ExpressionType extends BaseType {}
export interface ExpressionType extends _ExpressionType { constructor: { new(): ExpressionType }; }
export var ExpressionType: { new(): ExpressionType };

interface _FeatureIdType extends _AbstractIdType {
	fid: string;
}
export interface FeatureIdType extends _FeatureIdType { constructor: { new(): FeatureIdType }; }
export var FeatureIdType: { new(): FeatureIdType };

interface _FIDType extends BaseType {}
interface FIDType extends _FIDType { constructor: { new(): FIDType }; }

interface _Filter_CapabilitiesType extends BaseType {
	Id_Capabilities: Id_CapabilitiesType;
	Scalar_Capabilities: Scalar_CapabilitiesType;
	Spatial_Capabilities: Spatial_CapabilitiesType;
}
export interface Filter_CapabilitiesType extends _Filter_CapabilitiesType { constructor: { new(): Filter_CapabilitiesType }; }
export var Filter_CapabilitiesType: { new(): Filter_CapabilitiesType };

interface _FilterType extends _ComparisonOpsProxyType, _LogicOpsProxyType, _SpatialOpsProxyType {
	Id: IdProxyType[];
}
export interface FilterType extends _FilterType { constructor: { new(): FilterType }; }
export var FilterType: { new(): FilterType };

interface _FunctionNamesType extends BaseType {
	FunctionName: FunctionNameType[];
}
export interface FunctionNamesType extends _FunctionNamesType { constructor: { new(): FunctionNamesType }; }
export var FunctionNamesType: { new(): FunctionNamesType };

interface _FunctionNameType extends Primitive._string {
	nArgs: string;
}
export interface FunctionNameType extends _FunctionNameType { constructor: { new(): FunctionNameType }; }
export var FunctionNameType: { new(): FunctionNameType };

interface _FunctionsType extends BaseType {
	FunctionNames: FunctionNamesType;
}
export interface FunctionsType extends _FunctionsType { constructor: { new(): FunctionsType }; }
export var FunctionsType: { new(): FunctionsType };

interface _FunctionType extends _ExpressionType {
	name: string;
	expression?: ExpressionProxyType[];
}
export interface FunctionType extends _FunctionType { constructor: { new(): FunctionType }; }
export var FunctionType: { new(): FunctionType };

interface _GeometryOperandsType extends BaseType {
	GeometryOperand: GeometryOperandType[];
}
export interface GeometryOperandsType extends _GeometryOperandsType { constructor: { new(): GeometryOperandsType }; }
export var GeometryOperandsType: { new(): GeometryOperandsType };

export type GeometryOperandType = ("gml:Envelope" | "gml:Point" | "gml:LineString" | "gml:Polygon" | "gml:ArcByCenterPoint" | "gml:CircleByCenterPoint" | "gml:Arc" | "gml:Circle" | "gml:ArcByBulge" | "gml:Bezier" | "gml:Clothoid" | "gml:CubicSpline" | "gml:Geodesic" | "gml:OffsetCurve" | "gml:Triangle" | "gml:PolyhedralSurface" | "gml:TriangulatedSurface" | "gml:Tin" | "gml:Solid");
interface _GeometryOperandType extends Primitive._string { content: GeometryOperandType; }

interface _GmlObjectIdType extends _AbstractIdType {
	/** Database handle for the object.  It is of XML type ID, so is constrained to be unique in the XML document within which it occurs.  An external identifier for the object in the form of a URI may be constructed using standard XML and XPointer methods.  This is done by concatenating the URI for the document, a fragment separator, and the value of the id attribute. */
	id: string;
}
export interface GmlObjectIdType extends _GmlObjectIdType { constructor: { new(): GmlObjectIdType }; }
export var GmlObjectIdType: { new(): GmlObjectIdType };

interface _Id_CapabilitiesType extends BaseType {
	EID: EIDType[];
	FID: FIDType[];
}
export interface Id_CapabilitiesType extends _Id_CapabilitiesType { constructor: { new(): Id_CapabilitiesType }; }
export var Id_CapabilitiesType: { new(): Id_CapabilitiesType };

interface _IdProxyType extends BaseType {
	FeatureId?: FeatureIdType;
	GmlObjectId?: GmlObjectIdType;
}
interface IdProxyType extends _IdProxyType { constructor: { new(): IdProxyType }; }

interface _LiteralType extends _ExpressionType {}
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
	Literal: LiteralType;
	PropertyName: PropertyNameType;
}
export interface PropertyIsLikeType extends _PropertyIsLikeType { constructor: { new(): PropertyIsLikeType }; }
export var PropertyIsLikeType: { new(): PropertyIsLikeType };

interface _PropertyIsNullType extends _ComparisonOpsType {
	PropertyName: PropertyNameType;
}
export interface PropertyIsNullType extends _PropertyIsNullType { constructor: { new(): PropertyIsNullType }; }
export var PropertyIsNullType: { new(): PropertyIsNullType };

interface _PropertyNameType extends _ExpressionType {}
export interface PropertyNameType extends _PropertyNameType { constructor: { new(): PropertyNameType }; }
export var PropertyNameType: { new(): PropertyNameType };

interface _Scalar_CapabilitiesType extends BaseType {
	ArithmeticOperators?: ArithmeticOperatorsType;
	ComparisonOperators?: ComparisonOperatorsType;
	LogicalOperators?: LogicalOperatorsType;
}
export interface Scalar_CapabilitiesType extends _Scalar_CapabilitiesType { constructor: { new(): Scalar_CapabilitiesType }; }
export var Scalar_CapabilitiesType: { new(): Scalar_CapabilitiesType };

interface _SimpleArithmeticType extends BaseType {}
interface SimpleArithmeticType extends _SimpleArithmeticType { constructor: { new(): SimpleArithmeticType }; }

interface _SortByType extends BaseType {
	SortProperty: SortPropertyType[];
}
export interface SortByType extends _SortByType { constructor: { new(): SortByType }; }
export var SortByType: { new(): SortByType };

export type SortOrderType = ("DESC" | "ASC");
interface _SortOrderType extends Primitive._string { content: SortOrderType; }

interface _SortPropertyType extends BaseType {
	PropertyName: PropertyNameType;
	SortOrder?: SortOrderType;
}
export interface SortPropertyType extends _SortPropertyType { constructor: { new(): SortPropertyType }; }
export var SortPropertyType: { new(): SortPropertyType };

interface _Spatial_CapabilitiesType extends BaseType {
	GeometryOperands: GeometryOperandsType;
	SpatialOperators: SpatialOperatorsType;
}
export interface Spatial_CapabilitiesType extends _Spatial_CapabilitiesType { constructor: { new(): Spatial_CapabilitiesType }; }
export var Spatial_CapabilitiesType: { new(): Spatial_CapabilitiesType };

export type SpatialOperatorNameType = ("BBOX" | "Equals" | "Disjoint" | "Intersects" | "Touches" | "Crosses" | "Within" | "Contains" | "Overlaps" | "Beyond" | "DWithin");
interface _SpatialOperatorNameType extends Primitive._string { content: SpatialOperatorNameType; }

interface _SpatialOperatorsType extends BaseType {
	SpatialOperator: SpatialOperatorType[];
}
export interface SpatialOperatorsType extends _SpatialOperatorsType { constructor: { new(): SpatialOperatorsType }; }
export var SpatialOperatorsType: { new(): SpatialOperatorsType };

interface _SpatialOperatorType extends BaseType {
	name: SpatialOperatorNameType;
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

interface _UnaryLogicOpType extends _LogicOpsType, _ComparisonOpsProxyType, _LogicOpsProxyType, _SpatialOpsProxyType {
	Function: FunctionType;
}
export interface UnaryLogicOpType extends _UnaryLogicOpType { constructor: { new(): UnaryLogicOpType }; }
export var UnaryLogicOpType: { new(): UnaryLogicOpType };

interface _UpperBoundaryType extends _ExpressionProxyType {}
export interface UpperBoundaryType extends _UpperBoundaryType { constructor: { new(): UpperBoundaryType }; }
export var UpperBoundaryType: { new(): UpperBoundaryType };

export interface document extends BaseType {
	Add: BinaryOperatorType;
	And: BinaryLogicOpType;
	BBOX: BBOXType;
	Beyond: DistanceBufferType;
	Contains: BinarySpatialOpType;
	Crosses: BinarySpatialOpType;
	Disjoint: BinarySpatialOpType;
	Div: BinaryOperatorType;
	DWithin: DistanceBufferType;
	EID: EIDType;
	Equals: BinarySpatialOpType;
	FeatureId: FeatureIdType;
	FID: FIDType;
	Filter: FilterType;
	Filter_Capabilities: Filter_CapabilitiesType;
	Function: FunctionType;
	GmlObjectId: GmlObjectIdType;
	Intersects: BinarySpatialOpType;
	Literal: LiteralType;
	LogicalOperators: LogicalOperatorsType;
	Mul: BinaryOperatorType;
	Not: UnaryLogicOpType;
	Or: BinaryLogicOpType;
	Overlaps: BinarySpatialOpType;
	PropertyIsBetween: PropertyIsBetweenType;
	PropertyIsEqualTo: BinaryComparisonOpType;
	PropertyIsGreaterThan: BinaryComparisonOpType;
	PropertyIsGreaterThanOrEqualTo: BinaryComparisonOpType;
	PropertyIsLessThan: BinaryComparisonOpType;
	PropertyIsLessThanOrEqualTo: BinaryComparisonOpType;
	PropertyIsLike: PropertyIsLikeType;
	PropertyIsNotEqualTo: BinaryComparisonOpType;
	PropertyIsNull: PropertyIsNullType;
	PropertyName: PropertyNameType;
	SimpleArithmetic: SimpleArithmeticType;
	SortBy: SortByType;
	Sub: BinaryOperatorType;
	Touches: BinarySpatialOpType;
	Within: BinarySpatialOpType;
}
export var document: document;
