import * as Primitive from '../xml-primitives';
import * as gml from './gml';

// Source files:
// http://schemas.opengis.net/filter/1.0.0/expr.xsd
// http://schemas.opengis.net/filter/1.0.0/filter.xsd


interface BaseType {
	_exists: boolean;
	_namespace: string;
}
interface _BBOXType extends _SpatialOpsType {
	Box: gml.BoxType;
	PropertyName: PropertyNameType;
}
export interface BBOXType extends _BBOXType { constructor: { new(): BBOXType }; }
export var BBOXType: { new(): BBOXType };

interface _BinaryComparisonOpType extends _ComparisonOpsType {
	expression: ExpressionProxyType[];
}
export interface BinaryComparisonOpType extends _BinaryComparisonOpType { constructor: { new(): BinaryComparisonOpType }; }
export var BinaryComparisonOpType: { new(): BinaryComparisonOpType };

interface _BinaryLogicOpType extends _LogicOpsType {
	comparisonOps: ComparisonOpsProxyType[];
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

interface _BinarySpatialOpType extends _SpatialOpsType, gml._GeometryProxyType {
	Box: gml.BoxType;
	PropertyName: PropertyNameType;
}
export interface BinarySpatialOpType extends _BinarySpatialOpType { constructor: { new(): BinarySpatialOpType }; }
export var BinarySpatialOpType: { new(): BinarySpatialOpType };

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

interface _DistanceBufferType extends _SpatialOpsType, gml._GeometryProxyType {
	Distance: DistanceType;
	PropertyName: PropertyNameType;
}
export interface DistanceBufferType extends _DistanceBufferType { constructor: { new(): DistanceBufferType }; }
export var DistanceBufferType: { new(): DistanceBufferType };

interface _DistanceType extends BaseType {
	units: string;
}
export interface DistanceType extends _DistanceType { constructor: { new(): DistanceType }; }
export var DistanceType: { new(): DistanceType };

interface _ExpressionProxyType extends BaseType {
	PropertyName?: PropertyNameType;
	Literal?: LiteralType;
	Add?: BinaryOperatorType;
	Div?: BinaryOperatorType;
	Function?: FunctionType;
	Mul?: BinaryOperatorType;
	Sub?: BinaryOperatorType;
}
interface ExpressionProxyType extends _ExpressionProxyType { constructor: { new(): ExpressionProxyType }; }

interface _ExpressionType extends BaseType {}
export interface ExpressionType extends _ExpressionType { constructor: { new(): ExpressionType }; }
export var ExpressionType: { new(): ExpressionType };

interface _FeatureIdType extends BaseType {
	fid: string;
}
export interface FeatureIdType extends _FeatureIdType { constructor: { new(): FeatureIdType }; }
export var FeatureIdType: { new(): FeatureIdType };

interface _FilterType extends _ComparisonOpsProxyType, _LogicOpsProxyType, _SpatialOpsProxyType {
	FeatureId: FeatureIdType[];
}
export interface FilterType extends _FilterType { constructor: { new(): FilterType }; }
export var FilterType: { new(): FilterType };

interface _FunctionType extends _ExpressionType {
	name: string;
	expression?: ExpressionProxyType[];
}
export interface FunctionType extends _FunctionType { constructor: { new(): FunctionType }; }
export var FunctionType: { new(): FunctionType };

interface _LiteralType extends _ExpressionType {}
export interface LiteralType extends _LiteralType { constructor: { new(): LiteralType }; }
export var LiteralType: { new(): LiteralType };

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
	escape: string;
	singleChar: string;
	wildCard: string;
	Literal: LiteralType;
	PropertyName: PropertyNameType;
}
export interface PropertyIsLikeType extends _PropertyIsLikeType { constructor: { new(): PropertyIsLikeType }; }
export var PropertyIsLikeType: { new(): PropertyIsLikeType };

interface _PropertyIsNullType extends _ComparisonOpsType {
	Literal: LiteralType;
	PropertyName: PropertyNameType;
}
export interface PropertyIsNullType extends _PropertyIsNullType { constructor: { new(): PropertyIsNullType }; }
export var PropertyIsNullType: { new(): PropertyIsNullType };

interface _PropertyNameType extends _ExpressionType {}
export interface PropertyNameType extends _PropertyNameType { constructor: { new(): PropertyNameType }; }
export var PropertyNameType: { new(): PropertyNameType };

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

interface _UnaryLogicOpType extends _LogicOpsType, _ComparisonOpsProxyType, _LogicOpsProxyType, _SpatialOpsProxyType {}
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
	Equals: BinarySpatialOpType;
	FeatureId: FeatureIdType;
	Filter: FilterType;
	Function: FunctionType;
	Intersects: BinarySpatialOpType;
	Literal: LiteralType;
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
	Sub: BinaryOperatorType;
	Touches: BinarySpatialOpType;
	Within: BinarySpatialOpType;
}
export var document: document;
