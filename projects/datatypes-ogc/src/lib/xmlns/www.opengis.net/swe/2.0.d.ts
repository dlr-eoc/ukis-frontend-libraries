import * as Primitive from '../../xml-primitives';
import * as xlink from '../../www.w3.org/1999/xlink';

// Source files:
// http://schemas.opengis.net/sweCommon/2.0/advanced_encodings.xsd
// http://schemas.opengis.net/sweCommon/2.0/basic_types.xsd
// http://schemas.opengis.net/sweCommon/2.0/block_components.xsd
// http://schemas.opengis.net/sweCommon/2.0/choice_components.xsd
// http://schemas.opengis.net/sweCommon/2.0/record_components.xsd
// http://schemas.opengis.net/sweCommon/2.0/simple_components.xsd
// http://schemas.opengis.net/sweCommon/2.0/simple_encodings.xsd
// http://schemas.opengis.net/sweCommon/2.0/swe.xsd


interface BaseType {
	_exists: boolean;
	_namespace: string;
}
interface _AbstractDataComponentPropertyType extends _AbstractDataComponentProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface AbstractDataComponentPropertyType extends _AbstractDataComponentPropertyType { constructor: { new(): AbstractDataComponentPropertyType }; }
export var AbstractDataComponentPropertyType: { new(): AbstractDataComponentPropertyType };

interface _AbstractDataComponentProxyType extends _DataArrayProxyType, _AbstractSimpleComponentProxyType {
	/** Implementation of ISO-11404 Record datatype. This allows grouping (sequence) of data components which can themselves be simple types, records, arrays or choices */
	DataRecord?: DataRecordType;
	/** Implementation of a mathematical vector composed of a list of scalar coordinates expressed in the mandatory reference frame. */
	Vector?: VectorType;
	/** Implementation of a choice of two or more Data Components (also called disjoint union) */
	DataChoice?: DataChoiceType;
}
interface AbstractDataComponentProxyType extends _AbstractDataComponentProxyType { constructor: { new(): AbstractDataComponentProxyType }; }

interface _AbstractDataComponentType extends _AbstractSWEIdentifiableType {
	/** Reference to semantic information defining the precise nature of the component */
	definition?: string;
	/** Specifies that data for this component can be omitted in the datastream */
	optional?: boolean;
	/** Specifies if the value of a data component can be updated externally (i.e. is variable) */
	updatable?: boolean;
}
export interface AbstractDataComponentType extends _AbstractDataComponentType { constructor: { new(): AbstractDataComponentType }; }
export var AbstractDataComponentType: { new(): AbstractDataComponentType };

interface _AbstractEncodingPropertyByValueType extends _AbstractEncodingProxyType {}
export interface AbstractEncodingPropertyByValueType extends _AbstractEncodingPropertyByValueType { constructor: { new(): AbstractEncodingPropertyByValueType }; }
export var AbstractEncodingPropertyByValueType: { new(): AbstractEncodingPropertyByValueType };

interface _AbstractEncodingPropertyType extends _AbstractEncodingProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface AbstractEncodingPropertyType extends _AbstractEncodingPropertyType { constructor: { new(): AbstractEncodingPropertyType }; }
export var AbstractEncodingPropertyType: { new(): AbstractEncodingPropertyType };

interface _AbstractEncodingProxyType extends BaseType {
	/** Parameters of the binary encoding method */
	BinaryEncoding?: BinaryEncodingType;
	/** Parameters of the XML encoding method */
	XMLEncoding?: XMLEncodingType;
	/** Parameters of the text encoding method */
	TextEncoding?: TextEncodingType;
}
interface AbstractEncodingProxyType extends _AbstractEncodingProxyType { constructor: { new(): AbstractEncodingProxyType }; }

interface _AbstractEncodingType extends _AbstractSWEType {}
export interface AbstractEncodingType extends _AbstractEncodingType { constructor: { new(): AbstractEncodingType }; }
export var AbstractEncodingType: { new(): AbstractEncodingType };

interface _AbstractSimpleComponentPropertyType extends _AbstractSimpleComponentProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface AbstractSimpleComponentPropertyType extends _AbstractSimpleComponentPropertyType { constructor: { new(): AbstractSimpleComponentPropertyType }; }
export var AbstractSimpleComponentPropertyType: { new(): AbstractSimpleComponentPropertyType };

interface _AbstractSimpleComponentProxyType extends BaseType {
	/** Scalar component with integer representation used for a discrete counting value */
	Count?: CountType;
	/** Scalar component used to represent a categorical value as a simple token identifying a term in a code space */
	Category?: CategoryType;
	/** Pair of categorical values used to specify a range in an ordinal reference system (specified by the code space) */
	CategoryRange?: CategoryRangeType;
	/** Decimal pair for specifying a quantity range with a unit of measure */
	QuantityRange?: QuantityRangeType;
	/** Scalar component used to represent a time quantity either as ISO 8601 (e.g. 2004-04-18T12:03:04.6Z) or as a duration relative to a time of reference */
	Time?: TimeType;
	/** Time value pair for specifying a time range (can be a decimal or ISO 8601) */
	TimeRange?: TimeRangeType;
	/** Scalar component used to express truth: True or False, 0 or 1 */
	Boolean?: BooleanType;
	/** Free text component used to store comments or any other type of textual statement */
	Text?: TextType;
	/** Scalar component with decimal representation and a unit of measure used to store value of a continuous quantity */
	Quantity?: QuantityType;
	/** Integer pair used for specifying a count range */
	CountRange?: CountRangeType;
}
interface AbstractSimpleComponentProxyType extends _AbstractSimpleComponentProxyType { constructor: { new(): AbstractSimpleComponentProxyType }; }

interface _AbstractSimpleComponentType extends _AbstractDataComponentType {
	/** Specifies the reference axis (refer to gml:axisID). The reference frame URI should also be specified unless it is inherited from parent Vector */
	axisID?: string;
	/** Frame of reference (usually temporal or spatial) with respect to which the value of the component is expressed. A reference frame anchors a value to a real world datum. */
	referenceFrame?: string;
	nilValues?: NilValuesPropertyType;
	quality?: QualityPropertyType[];
}
export interface AbstractSimpleComponentType extends _AbstractSimpleComponentType { constructor: { new(): AbstractSimpleComponentType }; }
export var AbstractSimpleComponentType: { new(): AbstractSimpleComponentType };

interface _AbstractSWEIdentifiableProxyType extends _AbstractDataComponentProxyType {
	/** Defines the structure of the element that will be repeated in the stream */
	DataStream?: DataStreamType;
}
interface AbstractSWEIdentifiableProxyType extends _AbstractSWEIdentifiableProxyType { constructor: { new(): AbstractSWEIdentifiableProxyType }; }

interface _AbstractSWEIdentifiableType extends _AbstractSWEType {
	/** Textual description (i.e. human readable) of the data component usually used to clarify its nature */
	description?: string;
	/** Unique identifier of the data component. It can be used to globally identify a particular component of the dataset, a process input/output or a universal constant */
	identifier?: string;
	/** Textual label for the data component . This is often used for displaying a human readable name for a dataset field or a process input/output */
	label?: string;
}
export interface AbstractSWEIdentifiableType extends _AbstractSWEIdentifiableType { constructor: { new(): AbstractSWEIdentifiableType }; }
export var AbstractSWEIdentifiableType: { new(): AbstractSWEIdentifiableType };

interface _AbstractSWEProxyType extends _AbstractEncodingProxyType, _AbstractSWEIdentifiableProxyType {
	/** Binary encoding parameters used to encode a block of values at once. This is used for encrypting or compressing a complete array of values for instance */
	Block?: BlockType;
	/** Binary encoding parameters used for encoding a single data component */
	Component?: ComponentType;
	NilValues?: NilValuesType;
	/** Defines permitted values for the component, as an enumerated list of tokens or a regular expression pattern */
	AllowedTokens?: AllowedTokensType;
	/** Defines the permitted values for the component as an enumerated list and/or a list of inclusive ranges */
	AllowedValues?: AllowedValuesType;
	/** Defines the permitted values for the component, as a time range or an enumerated list of time values */
	AllowedTimes?: AllowedTimesType;
}
interface AbstractSWEProxyType extends _AbstractSWEProxyType { constructor: { new(): AbstractSWEProxyType }; }

interface _AbstractSWEType extends BaseType {
	id?: string;
	/** Extension slot for future extensions to this standard. */
	extension?: any[];
}
export interface AbstractSWEType extends _AbstractSWEType { constructor: { new(): AbstractSWEType }; }
export var AbstractSWEType: { new(): AbstractSWEType };

interface _AllowedTimesPropertyByValueType extends BaseType {
	/** Defines the permitted values for the component, as a time range or an enumerated list of time values */
	AllowedTimes: AllowedTimesType;
}
export interface AllowedTimesPropertyByValueType extends _AllowedTimesPropertyByValueType { constructor: { new(): AllowedTimesPropertyByValueType }; }
export var AllowedTimesPropertyByValueType: { new(): AllowedTimesPropertyByValueType };

interface _AllowedTimesPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Defines the permitted values for the component, as a time range or an enumerated list of time values */
	AllowedTimes?: AllowedTimesType;
}
export interface AllowedTimesPropertyType extends _AllowedTimesPropertyType { constructor: { new(): AllowedTimesPropertyType }; }
export var AllowedTimesPropertyType: { new(): AllowedTimesPropertyType };

interface _AllowedTimesType extends _AbstractSWEType {
	interval?: TimePair[];
	significantFigures?: number;
	value?: string[];
}
export interface AllowedTimesType extends _AllowedTimesType { constructor: { new(): AllowedTimesType }; }
export var AllowedTimesType: { new(): AllowedTimesType };

interface _AllowedTokensPropertyByValueType extends BaseType {
	/** Defines permitted values for the component, as an enumerated list of tokens or a regular expression pattern */
	AllowedTokens: AllowedTokensType;
}
export interface AllowedTokensPropertyByValueType extends _AllowedTokensPropertyByValueType { constructor: { new(): AllowedTokensPropertyByValueType }; }
export var AllowedTokensPropertyByValueType: { new(): AllowedTokensPropertyByValueType };

interface _AllowedTokensPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Defines permitted values for the component, as an enumerated list of tokens or a regular expression pattern */
	AllowedTokens?: AllowedTokensType;
}
export interface AllowedTokensPropertyType extends _AllowedTokensPropertyType { constructor: { new(): AllowedTokensPropertyType }; }
export var AllowedTokensPropertyType: { new(): AllowedTokensPropertyType };

interface _AllowedTokensType extends _AbstractSWEType {
	pattern?: string;
	value?: string[];
}
export interface AllowedTokensType extends _AllowedTokensType { constructor: { new(): AllowedTokensType }; }
export var AllowedTokensType: { new(): AllowedTokensType };

interface _AllowedValuesPropertyByValueType extends BaseType {
	/** Defines the permitted values for the component as an enumerated list and/or a list of inclusive ranges */
	AllowedValues: AllowedValuesType;
}
export interface AllowedValuesPropertyByValueType extends _AllowedValuesPropertyByValueType { constructor: { new(): AllowedValuesPropertyByValueType }; }
export var AllowedValuesPropertyByValueType: { new(): AllowedValuesPropertyByValueType };

interface _AllowedValuesPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Defines the permitted values for the component as an enumerated list and/or a list of inclusive ranges */
	AllowedValues?: AllowedValuesType;
}
export interface AllowedValuesPropertyType extends _AllowedValuesPropertyType { constructor: { new(): AllowedValuesPropertyType }; }
export var AllowedValuesPropertyType: { new(): AllowedValuesPropertyType };

interface _AllowedValuesType extends _AbstractSWEType {
	interval?: RealPair[];
	significantFigures?: number;
	value?: number[];
}
export interface AllowedValuesType extends _AllowedValuesType { constructor: { new(): AllowedValuesType }; }
export var AllowedValuesType: { new(): AllowedValuesType };

interface _AnyNumericalPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Scalar component with integer representation used for a discrete counting value */
	Count?: CountType;
	/** Scalar component with decimal representation and a unit of measure used to store value of a continuous quantity */
	Quantity?: QuantityType;
	/** Scalar component used to represent a time quantity either as ISO 8601 (e.g. 2004-04-18T12:03:04.6Z) or as a duration relative to a time of reference */
	Time?: TimeType;
}
export interface AnyNumericalPropertyType extends _AnyNumericalPropertyType { constructor: { new(): AnyNumericalPropertyType }; }
export var AnyNumericalPropertyType: { new(): AnyNumericalPropertyType };

interface _AnyRangePropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Pair of categorical values used to specify a range in an ordinal reference system (specified by the code space) */
	CategoryRange?: CategoryRangeType;
	/** Integer pair used for specifying a count range */
	CountRange?: CountRangeType;
	/** Decimal pair for specifying a quantity range with a unit of measure */
	QuantityRange?: QuantityRangeType;
	/** Time value pair for specifying a time range (can be a decimal or ISO 8601) */
	TimeRange?: TimeRangeType;
}
export interface AnyRangePropertyType extends _AnyRangePropertyType { constructor: { new(): AnyRangePropertyType }; }
export var AnyRangePropertyType: { new(): AnyRangePropertyType };

interface _AnyScalarPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Scalar component used to express truth: True or False, 0 or 1 */
	Boolean?: BooleanType;
	/** Scalar component used to represent a categorical value as a simple token identifying a term in a code space */
	Category?: CategoryType;
	/** Scalar component with integer representation used for a discrete counting value */
	Count?: CountType;
	/** Scalar component with decimal representation and a unit of measure used to store value of a continuous quantity */
	Quantity?: QuantityType;
	/** Free text component used to store comments or any other type of textual statement */
	Text?: TextType;
	/** Scalar component used to represent a time quantity either as ISO 8601 (e.g. 2004-04-18T12:03:04.6Z) or as a duration relative to a time of reference */
	Time?: TimeType;
}
export interface AnyScalarPropertyType extends _AnyScalarPropertyType { constructor: { new(): AnyScalarPropertyType }; }
export var AnyScalarPropertyType: { new(): AnyScalarPropertyType };

interface _BinaryEncodingPropertyByValueType extends BaseType {
	/** Parameters of the binary encoding method */
	BinaryEncoding: BinaryEncodingType;
}
export interface BinaryEncodingPropertyByValueType extends _BinaryEncodingPropertyByValueType { constructor: { new(): BinaryEncodingPropertyByValueType }; }
export var BinaryEncodingPropertyByValueType: { new(): BinaryEncodingPropertyByValueType };

interface _BinaryEncodingPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Parameters of the binary encoding method */
	BinaryEncoding?: BinaryEncodingType;
}
export interface BinaryEncodingPropertyType extends _BinaryEncodingPropertyType { constructor: { new(): BinaryEncodingPropertyType }; }
export var BinaryEncodingPropertyType: { new(): BinaryEncodingPropertyType };

interface _BinaryEncodingType extends _AbstractEncodingType {
	/** Byte encoding method used to encode the binary data (raw or base 64) */
	byteEncoding: ByteEncodingType;
	/** Total length in bytes of the binary stream (if known in advance) */
	byteLength?: number;
	/** Byte order convention used to encode this binary data (big endian = most significant byte first, MSB or little endian = least significant byte first, LSB) */
	byteOrder: ByteOrderType;
	/** Each member contains detailed parameters for encoding a scalar value or a block of values */
	member: BinaryEncodingTypeMemberType[];
}
export interface BinaryEncodingType extends _BinaryEncodingType { constructor: { new(): BinaryEncodingType }; }
export var BinaryEncodingType: { new(): BinaryEncodingType };

interface _BinaryEncodingTypeMemberType extends BaseType {
	/** Binary encoding parameters used to encode a block of values at once. This is used for encrypting or compressing a complete array of values for instance */
	Block: BlockType;
	/** Binary encoding parameters used for encoding a single data component */
	Component: ComponentType;
}
interface BinaryEncodingTypeMemberType extends _BinaryEncodingTypeMemberType { constructor: { new(): BinaryEncodingTypeMemberType }; }

interface _BlockPropertyByValueType extends BaseType {
	/** Binary encoding parameters used to encode a block of values at once. This is used for encrypting or compressing a complete array of values for instance */
	Block: BlockType;
}
export interface BlockPropertyByValueType extends _BlockPropertyByValueType { constructor: { new(): BlockPropertyByValueType }; }
export var BlockPropertyByValueType: { new(): BlockPropertyByValueType };

interface _BlockPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Binary encoding parameters used to encode a block of values at once. This is used for encrypting or compressing a complete array of values for instance */
	Block?: BlockType;
}
export interface BlockPropertyType extends _BlockPropertyType { constructor: { new(): BlockPropertyType }; }
export var BlockPropertyType: { new(): BlockPropertyType };

interface _BlockType extends _AbstractSWEType {
	/** Length in byte of this binary block (if known in advance) */
	byteLength?: number;
	/** Name of the compression method used to encrypt the block of values described by the referenced data component */
	compression?: string;
	/** Name of the encryption method used to encrypt the block of values described by the referenced data component */
	encryption?: string;
	/** Number of padding bytes present in the stream after this binary block */
	paddingBytesAfter?: number;
	/** Number of padding bytes present in the stream before this binary block */
	paddingBytesBefore?: number;
	/** Reference to the aggregate data component that this binary block encoding settings apply to */
	ref: string;
}
export interface BlockType extends _BlockType { constructor: { new(): BlockType }; }
export var BlockType: { new(): BlockType };

interface _BooleanPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Scalar component used to express truth: True or False, 0 or 1 */
	Boolean?: BooleanType;
}
export interface BooleanPropertyType extends _BooleanPropertyType { constructor: { new(): BooleanPropertyType }; }
export var BooleanPropertyType: { new(): BooleanPropertyType };

interface _BooleanType extends _AbstractSimpleComponentType {
	/** Value is optional, to enable structure to act as a schema for values provided using other encodings */
	value?: boolean;
}
export interface BooleanType extends _BooleanType { constructor: { new(): BooleanType }; }
export var BooleanType: { new(): BooleanType };

export type ByteEncodingType = ("base64" | "raw");
interface _ByteEncodingType extends Primitive._string { content: ByteEncodingType; }

export type ByteOrderType = ("bigEndian" | "littleEndian");
interface _ByteOrderType extends Primitive._string { content: ByteOrderType; }

interface _CategoryPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Scalar component used to represent a categorical value as a simple token identifying a term in a code space */
	Category?: CategoryType;
}
export interface CategoryPropertyType extends _CategoryPropertyType { constructor: { new(): CategoryPropertyType }; }
export var CategoryPropertyType: { new(): CategoryPropertyType };

interface _CategoryRangePropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Pair of categorical values used to specify a range in an ordinal reference system (specified by the code space) */
	CategoryRange?: CategoryRangeType;
}
export interface CategoryRangePropertyType extends _CategoryRangePropertyType { constructor: { new(): CategoryRangePropertyType }; }
export var CategoryRangePropertyType: { new(): CategoryRangePropertyType };

interface _CategoryRangeType extends _AbstractSimpleComponentType {
	/** Name of the dictionary defining an ordered set of values with respect to which the range is expressed (ordinal reference system) */
	codeSpace?: Reference;
	constraint?: AllowedTokensPropertyType;
	/** Value is a pair of tokens separated by a space (if tokens contain spaces, they must be espaced by using XML entities). It is optional, to enable structure to act as a schema for values provided using other encodings */
	value?: TokenPair;
}
export interface CategoryRangeType extends _CategoryRangeType { constructor: { new(): CategoryRangeType }; }
export var CategoryRangeType: { new(): CategoryRangeType };

interface _CategoryType extends _AbstractSimpleComponentType {
	/** Name of the dictionary where the possible values for this component are listed and defined */
	codeSpace?: Reference;
	constraint?: AllowedTokensPropertyType;
	/** Value is optional, to enable structure to act as a schema for values provided using other encodings */
	value?: string;
}
export interface CategoryType extends _CategoryType { constructor: { new(): CategoryType }; }
export var CategoryType: { new(): CategoryType };

interface _ComponentOrBlockPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Binary encoding parameters used to encode a block of values at once. This is used for encrypting or compressing a complete array of values for instance */
	Block?: BlockType;
	/** Binary encoding parameters used for encoding a single data component */
	Component?: ComponentType;
}
export interface ComponentOrBlockPropertyType extends _ComponentOrBlockPropertyType { constructor: { new(): ComponentOrBlockPropertyType }; }
export var ComponentOrBlockPropertyType: { new(): ComponentOrBlockPropertyType };

interface _ComponentPropertyByValueType extends BaseType {
	/** Binary encoding parameters used for encoding a single data component */
	Component: ComponentType;
}
export interface ComponentPropertyByValueType extends _ComponentPropertyByValueType { constructor: { new(): ComponentPropertyByValueType }; }
export var ComponentPropertyByValueType: { new(): ComponentPropertyByValueType };

interface _ComponentPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Binary encoding parameters used for encoding a single data component */
	Component?: ComponentType;
}
export interface ComponentPropertyType extends _ComponentPropertyType { constructor: { new(): ComponentPropertyType }; }
export var ComponentPropertyType: { new(): ComponentPropertyType };

interface _ComponentType extends _AbstractSWEType {
	bitLength?: number;
	/** Byte length of this field when a custom data type is used */
	byteLength?: number;
	/** Binary data type used to encode the value(s) of the referenced data component */
	dataType: string;
	/** Name of the encryption method used to encrypt the value of this field */
	encryption?: string;
	/** Reference to the data component that these binary encoding settings apply to */
	ref: string;
	/** Number of significant bits actually used for a binary encoded numerical value (all remaining bits shall be set to 0) */
	significantBits?: number;
}
export interface ComponentType extends _ComponentType { constructor: { new(): ComponentType }; }
export var ComponentType: { new(): ComponentType };

interface _CountPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Scalar component with integer representation used for a discrete counting value */
	Count?: CountType;
}
export interface CountPropertyType extends _CountPropertyType { constructor: { new(): CountPropertyType }; }
export var CountPropertyType: { new(): CountPropertyType };

interface _CountRangePropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Integer pair used for specifying a count range */
	CountRange?: CountRangeType;
}
export interface CountRangePropertyType extends _CountRangePropertyType { constructor: { new(): CountRangePropertyType }; }
export var CountRangePropertyType: { new(): CountRangePropertyType };

interface _CountRangeType extends _AbstractSimpleComponentType {
	constraint?: AllowedValuesPropertyType;
	/** Value is a pair of integer numbers separated by a space. It is optional, to enable structure to act as a schema for values provided using other encodings */
	value?: IntegerPair;
}
export interface CountRangeType extends _CountRangeType { constructor: { new(): CountRangeType }; }
export var CountRangeType: { new(): CountRangeType };

interface _CountType extends _AbstractSimpleComponentType {
	constraint?: AllowedValuesPropertyType;
	/** Value is optional, to enable structure to act as a schema for values provided using other encodings */
	value?: number;
}
export interface CountType extends _CountType { constructor: { new(): CountType }; }
export var CountType: { new(): CountType };

interface _DataArrayPropertyByValueType extends _DataArrayProxyType {}
export interface DataArrayPropertyByValueType extends _DataArrayPropertyByValueType { constructor: { new(): DataArrayPropertyByValueType }; }
export var DataArrayPropertyByValueType: { new(): DataArrayPropertyByValueType };

interface _DataArrayPropertyType extends _DataArrayProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface DataArrayPropertyType extends _DataArrayPropertyType { constructor: { new(): DataArrayPropertyType }; }
export var DataArrayPropertyType: { new(): DataArrayPropertyType };

interface _DataArrayProxyType extends BaseType {
	/** Implementation of ISO-11404 Array datatype. This defines an array of identical data components with a elementCount. Values are given as a block and can be encoded in different ways */
	DataArray?: DataArrayType;
	/** Implementation of ISO-11404 Array datatype. This defines an array of identical data components with a elementCount. Values are given as a block and can be encoded in different ways */
	Matrix?: MatrixType;
}
interface DataArrayProxyType extends _DataArrayProxyType { constructor: { new(): DataArrayProxyType }; }

interface _DataArrayType extends _AbstractDataComponentType {
	/** Specifies the size of the array (i.e. the number of elements of the defined type it contains) */
	elementCount: CountPropertyType;
	/** Defines the structure of the element that will be repeated in the array */
	elementType: DataArrayTypeElementTypeType;
	/** Specifies the type of method used to encode the array values */
	encoding?: DataArrayTypeEncodingType;
	/** If present, contains an encoded block of the values contained in the array. Values are optional so that the array definition can be used a as a schema for values provided externally */
	values?: EncodedValuesPropertyType;
}
export interface DataArrayType extends _DataArrayType { constructor: { new(): DataArrayType }; }
export var DataArrayType: { new(): DataArrayType };

interface _DataArrayTypeElementTypeType extends _AbstractDataComponentPropertyType {
	name: string;
}
interface DataArrayTypeElementTypeType extends _DataArrayTypeElementTypeType { constructor: { new(): DataArrayTypeElementTypeType }; }

interface _DataArrayTypeEncodingType extends _AbstractEncodingProxyType {}
interface DataArrayTypeEncodingType extends _DataArrayTypeEncodingType { constructor: { new(): DataArrayTypeEncodingType }; }

interface _DataChoicePropertyByValueType extends BaseType {
	/** Implementation of a choice of two or more Data Components (also called disjoint union) */
	DataChoice: DataChoiceType;
}
export interface DataChoicePropertyByValueType extends _DataChoicePropertyByValueType { constructor: { new(): DataChoicePropertyByValueType }; }
export var DataChoicePropertyByValueType: { new(): DataChoicePropertyByValueType };

interface _DataChoicePropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Implementation of a choice of two or more Data Components (also called disjoint union) */
	DataChoice?: DataChoiceType;
}
export interface DataChoicePropertyType extends _DataChoicePropertyType { constructor: { new(): DataChoicePropertyType }; }
export var DataChoicePropertyType: { new(): DataChoicePropertyType };

interface _DataChoiceType extends _AbstractDataComponentType {
	/** This category component marks the data stream element that will indicate the actual choice made. Possible choices are listed in the Category constraint section as an enumeration and should map to item names. */
	choiceValue?: DataChoiceTypeChoiceValueType;
	item: DataChoiceTypeItemType[];
}
export interface DataChoiceType extends _DataChoiceType { constructor: { new(): DataChoiceType }; }
export var DataChoiceType: { new(): DataChoiceType };

interface _DataChoiceTypeChoiceValueType extends BaseType {
	/** Scalar component used to represent a categorical value as a simple token identifying a term in a code space */
	Category: CategoryType;
}
interface DataChoiceTypeChoiceValueType extends _DataChoiceTypeChoiceValueType { constructor: { new(): DataChoiceTypeChoiceValueType }; }

interface _DataChoiceTypeItemType extends _AbstractDataComponentPropertyType {
	name: string;
}
interface DataChoiceTypeItemType extends _DataChoiceTypeItemType { constructor: { new(): DataChoiceTypeItemType }; }

interface _DataRecordPropertyByValueType extends BaseType {
	/** Implementation of ISO-11404 Record datatype. This allows grouping (sequence) of data components which can themselves be simple types, records, arrays or choices */
	DataRecord: DataRecordType;
}
export interface DataRecordPropertyByValueType extends _DataRecordPropertyByValueType { constructor: { new(): DataRecordPropertyByValueType }; }
export var DataRecordPropertyByValueType: { new(): DataRecordPropertyByValueType };

interface _DataRecordPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Implementation of ISO-11404 Record datatype. This allows grouping (sequence) of data components which can themselves be simple types, records, arrays or choices */
	DataRecord?: DataRecordType;
}
export interface DataRecordPropertyType extends _DataRecordPropertyType { constructor: { new(): DataRecordPropertyType }; }
export var DataRecordPropertyType: { new(): DataRecordPropertyType };

interface _DataRecordType extends _AbstractDataComponentType {
	/** Definition of the field provided as a nested data component. The field can be scalar or can itself be an aggregate such as a record, choice or array */
	field: DataRecordTypeFieldType[];
}
export interface DataRecordType extends _DataRecordType { constructor: { new(): DataRecordType }; }
export var DataRecordType: { new(): DataRecordType };

interface _DataRecordTypeFieldType extends _AbstractDataComponentPropertyType {
	name: string;
}
interface DataRecordTypeFieldType extends _DataRecordTypeFieldType { constructor: { new(): DataRecordTypeFieldType }; }

interface _DataStreamPropertyByValueType extends BaseType {
	/** Defines the structure of the element that will be repeated in the stream */
	DataStream: DataStreamType;
}
export interface DataStreamPropertyByValueType extends _DataStreamPropertyByValueType { constructor: { new(): DataStreamPropertyByValueType }; }
export var DataStreamPropertyByValueType: { new(): DataStreamPropertyByValueType };

interface _DataStreamPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Defines the structure of the element that will be repeated in the stream */
	DataStream?: DataStreamType;
}
export interface DataStreamPropertyType extends _DataStreamPropertyType { constructor: { new(): DataStreamPropertyType }; }
export var DataStreamPropertyType: { new(): DataStreamPropertyType };

interface _DataStreamType extends _AbstractSWEIdentifiableType {
	/** Number of elements of the defined type that the stream contains */
	elementCount?: DataStreamTypeElementCountType;
	/** Definition and structure of one stream element */
	elementType: DataStreamTypeElementTypeType;
	/** Method used to encode the stream values */
	encoding: DataStreamTypeEncodingType;
	/** Encoded values for the stream (can be out of band) */
	values: EncodedValuesPropertyType;
}
export interface DataStreamType extends _DataStreamType { constructor: { new(): DataStreamType }; }
export var DataStreamType: { new(): DataStreamType };

interface _DataStreamTypeElementCountType extends BaseType {
	/** Scalar component with integer representation used for a discrete counting value */
	Count: CountType;
}
interface DataStreamTypeElementCountType extends _DataStreamTypeElementCountType { constructor: { new(): DataStreamTypeElementCountType }; }

interface _DataStreamTypeElementTypeType extends _AbstractDataComponentPropertyType {
	name: string;
}
interface DataStreamTypeElementTypeType extends _DataStreamTypeElementTypeType { constructor: { new(): DataStreamTypeElementTypeType }; }

interface _DataStreamTypeEncodingType extends _AbstractEncodingProxyType {}
interface DataStreamTypeEncodingType extends _DataStreamTypeEncodingType { constructor: { new(): DataStreamTypeEncodingType }; }

interface _EncodedValuesPropertyType extends Primitive._any {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface EncodedValuesPropertyType extends _EncodedValuesPropertyType { constructor: { new(): EncodedValuesPropertyType }; }
export var EncodedValuesPropertyType: { new(): EncodedValuesPropertyType };

interface _IntegerPair extends BaseType {}
export interface IntegerPair extends _IntegerPair { constructor: { new(): IntegerPair }; }
export var IntegerPair: { new(): IntegerPair };

interface _MatrixPropertyByValueType extends BaseType {
	/** Implementation of ISO-11404 Array datatype. This defines an array of identical data components with a elementCount. Values are given as a block and can be encoded in different ways */
	Matrix: MatrixType;
}
export interface MatrixPropertyByValueType extends _MatrixPropertyByValueType { constructor: { new(): MatrixPropertyByValueType }; }
export var MatrixPropertyByValueType: { new(): MatrixPropertyByValueType };

interface _MatrixPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Implementation of ISO-11404 Array datatype. This defines an array of identical data components with a elementCount. Values are given as a block and can be encoded in different ways */
	Matrix?: MatrixType;
}
export interface MatrixPropertyType extends _MatrixPropertyType { constructor: { new(): MatrixPropertyType }; }
export var MatrixPropertyType: { new(): MatrixPropertyType };

interface _MatrixType extends _DataArrayType {
	/** Frame of reference whose origin is located by the transformation defined by this matrix */
	localFrame?: string;
	/** Frame of reference (usually spatial) with respect to which the coordinates of this matrix are expressed */
	referenceFrame?: string;
}
export interface MatrixType extends _MatrixType { constructor: { new(): MatrixType }; }
export var MatrixType: { new(): MatrixType };

interface _NilValue extends Primitive._string {
	reason: string;
}
export interface NilValue extends _NilValue { constructor: { new(): NilValue }; }
export var NilValue: { new(): NilValue };

interface _NilValuesPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	NilValues?: NilValuesType;
}
export interface NilValuesPropertyType extends _NilValuesPropertyType { constructor: { new(): NilValuesPropertyType }; }
export var NilValuesPropertyType: { new(): NilValuesPropertyType };

interface _NilValuesType extends _AbstractSWEType {
	nilValue: NilValue[];
}
export interface NilValuesType extends _NilValuesType { constructor: { new(): NilValuesType }; }
export var NilValuesType: { new(): NilValuesType };

interface _QualityPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Scalar component used to represent a categorical value as a simple token identifying a term in a code space */
	Category?: CategoryType;
	/** Scalar component with decimal representation and a unit of measure used to store value of a continuous quantity */
	Quantity?: QuantityType;
	/** Decimal pair for specifying a quantity range with a unit of measure */
	QuantityRange?: QuantityRangeType;
	/** Free text component used to store comments or any other type of textual statement */
	Text?: TextType;
}
export interface QualityPropertyType extends _QualityPropertyType { constructor: { new(): QualityPropertyType }; }
export var QualityPropertyType: { new(): QualityPropertyType };

interface _QuantityPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Scalar component with decimal representation and a unit of measure used to store value of a continuous quantity */
	Quantity?: QuantityType;
}
export interface QuantityPropertyType extends _QuantityPropertyType { constructor: { new(): QuantityPropertyType }; }
export var QuantityPropertyType: { new(): QuantityPropertyType };

interface _QuantityRangePropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Decimal pair for specifying a quantity range with a unit of measure */
	QuantityRange?: QuantityRangeType;
}
export interface QuantityRangePropertyType extends _QuantityRangePropertyType { constructor: { new(): QuantityRangePropertyType }; }
export var QuantityRangePropertyType: { new(): QuantityRangePropertyType };

interface _QuantityRangeType extends _AbstractSimpleComponentType {
	constraint?: AllowedValuesPropertyType;
	/** Unit of measure used to express the value of this data component */
	uom: UnitReference;
	/** Value is a pair of double numbers separated by a space. It is optional, to enable structure to act as a schema for values provided using other encodings */
	value?: RealPair;
}
export interface QuantityRangeType extends _QuantityRangeType { constructor: { new(): QuantityRangeType }; }
export var QuantityRangeType: { new(): QuantityRangeType };

interface _QuantityType extends _AbstractSimpleComponentType {
	constraint?: AllowedValuesPropertyType;
	/** Unit of measure used to express the value of this data component */
	uom: UnitReference;
	/** Value is optional, to enable structure to act as a schema for values provided using other encodings */
	value?: number;
}
export interface QuantityType extends _QuantityType { constructor: { new(): QuantityType }; }
export var QuantityType: { new(): QuantityType };

interface _RealPair extends BaseType {}
export interface RealPair extends _RealPair { constructor: { new(): RealPair }; }
export var RealPair: { new(): RealPair };

interface _Reference extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface Reference extends _Reference { constructor: { new(): Reference }; }
export var Reference: { new(): Reference };

interface _TextEncodingPropertyByValueType extends BaseType {
	/** Parameters of the text encoding method */
	TextEncoding: TextEncodingType;
}
export interface TextEncodingPropertyByValueType extends _TextEncodingPropertyByValueType { constructor: { new(): TextEncodingPropertyByValueType }; }
export var TextEncodingPropertyByValueType: { new(): TextEncodingPropertyByValueType };

interface _TextEncodingPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Parameters of the text encoding method */
	TextEncoding?: TextEncodingType;
}
export interface TextEncodingPropertyType extends _TextEncodingPropertyType { constructor: { new(): TextEncodingPropertyType }; }
export var TextEncodingPropertyType: { new(): TextEncodingPropertyType };

interface _TextEncodingType extends _AbstractEncodingType {
	/** Character sequence used as the block separator (i.e. between two successive blocks in the data set. The end of a block is reached once all values from the data tree have been encoded once) */
	blockSeparator: string;
	/** Indicates whether white spaces (i.e. space, tab, CR, LF) should be collapsed with separators when parsing the data stream */
	collapseWhiteSpaces?: boolean;
	/** Character used as the decimal separator */
	decimalSeparator?: string;
	/** Character sequence used as the token separator (i.e. between two successive values) */
	tokenSeparator: string;
}
export interface TextEncodingType extends _TextEncodingType { constructor: { new(): TextEncodingType }; }
export var TextEncodingType: { new(): TextEncodingType };

interface _TextPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Free text component used to store comments or any other type of textual statement */
	Text?: TextType;
}
export interface TextPropertyType extends _TextPropertyType { constructor: { new(): TextPropertyType }; }
export var TextPropertyType: { new(): TextPropertyType };

interface _TextType extends _AbstractSimpleComponentType {
	constraint?: AllowedTokensPropertyType;
	/** Value is optional, to enable structure to act as a schema for values provided using other encodings */
	value?: string;
}
export interface TextType extends _TextType { constructor: { new(): TextType }; }
export var TextType: { new(): TextType };

/** "now" indicates that the specified value shall be replaced with the current temporal position whenever the value is accessed. */
export type TimeIndeterminateValue = "now";
interface _TimeIndeterminateValue extends Primitive._string { content: TimeIndeterminateValue; }

export type TimeIso8601 = string;
type _TimeIso8601 = Primitive._string;

interface _TimePair extends BaseType {}
export interface TimePair extends _TimePair { constructor: { new(): TimePair }; }
export var TimePair: { new(): TimePair };

export type TimePosition = string;
type _TimePosition = Primitive._string;

interface _TimePropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Scalar component used to represent a time quantity either as ISO 8601 (e.g. 2004-04-18T12:03:04.6Z) or as a duration relative to a time of reference */
	Time?: TimeType;
}
export interface TimePropertyType extends _TimePropertyType { constructor: { new(): TimePropertyType }; }
export var TimePropertyType: { new(): TimePropertyType };

interface _TimeRangePropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Time value pair for specifying a time range (can be a decimal or ISO 8601) */
	TimeRange?: TimeRangeType;
}
export interface TimeRangePropertyType extends _TimeRangePropertyType { constructor: { new(): TimeRangePropertyType }; }
export var TimeRangePropertyType: { new(): TimeRangePropertyType };

interface _TimeRangeType extends _AbstractSimpleComponentType {
	/** Temporal frame of reference whose origin is located by the value of this component */
	localFrame?: string;
	/** Specifies the origin of the temporal reference frame as an ISO8601 date (used to specify time after an epoch that is to say in a custom frame) */
	referenceTime?: Date;
	constraint?: AllowedTimesPropertyType;
	/** Temporal unit of measure used to express the value of this data component */
	uom: UnitReference;
	/** Value is a pair of time values expressed in ISO-8601 or as decimal numbers separated by a space. It is optional, to enable structure to act as a schema for values provided using other encodings */
	value?: TimePair;
}
export interface TimeRangeType extends _TimeRangeType { constructor: { new(): TimeRangeType }; }
export var TimeRangeType: { new(): TimeRangeType };

interface _TimeType extends _AbstractSimpleComponentType {
	/** Temporal frame of reference whose origin is located by the value of this component */
	localFrame?: string;
	/** Specifies the origin of the temporal reference frame as an ISO8601 date (used to specify time after an epoch that is to say in a custom frame) */
	referenceTime?: Date;
	constraint?: AllowedTimesPropertyType;
	/** Temporal unit of measure used to express the value of this data component */
	uom: UnitReference;
	/** Value is optional, to enable structure to act as a schema for values provided using other encodings */
	value?: string;
}
export interface TimeType extends _TimeType { constructor: { new(): TimeType }; }
export var TimeType: { new(): TimeType };

interface _TokenPair extends BaseType {}
export interface TokenPair extends _TokenPair { constructor: { new(): TokenPair }; }
export var TokenPair: { new(): TokenPair };

interface _UnitReference extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	code?: string;
}
export interface UnitReference extends _UnitReference { constructor: { new(): UnitReference }; }
export var UnitReference: { new(): UnitReference };

/** This type specifies a character string of length at least one, and restricted such that it must not contain any of the following characters: ":" (colon), " " (space), (newline), (carriage return), (tab). This allows values corresponding to familiar abbreviations, such as "kg", "m/s", etc.
  * It is also required that the symbol be an identifier for a unit of measure as specified in the "Unified Code of Units of Measure" (UCUM) (http://aurora.regenstrief.org/UCUM). This provides a set of symbols and a grammar for constructing identifiers for units of measure that are unique, and may be easily entered with a keyboard supporting the limited character set known as 7-bit ASCII. ISO 2955 formerly provided a specification with this scope, but was withdrawn in 2001. UCUM largely follows ISO 2955 with modifications to remove ambiguities and other problems. */
export type UomSymbol = string;
type _UomSymbol = Primitive._string;

interface _VectorPropertyByValueType extends BaseType {
	/** Implementation of a mathematical vector composed of a list of scalar coordinates expressed in the mandatory reference frame. */
	Vector: VectorType;
}
export interface VectorPropertyByValueType extends _VectorPropertyByValueType { constructor: { new(): VectorPropertyByValueType }; }
export var VectorPropertyByValueType: { new(): VectorPropertyByValueType };

interface _VectorPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Implementation of a mathematical vector composed of a list of scalar coordinates expressed in the mandatory reference frame. */
	Vector?: VectorType;
}
export interface VectorPropertyType extends _VectorPropertyType { constructor: { new(): VectorPropertyType }; }
export var VectorPropertyType: { new(): VectorPropertyType };

interface _VectorType extends _AbstractDataComponentType {
	/** Frame of reference whose origin is located by the coordinates of this vector */
	localFrame?: string;
	/** Frame of reference (usually spatial) with respect to which the coordinates of this vector are expressed. A reference frame anchors a vector value to a real world datum. */
	referenceFrame: string;
	/** Definition of the coordinate provided as a data component with a numerical representation */
	coordinate: VectorTypeCoordinateType[];
}
export interface VectorType extends _VectorType { constructor: { new(): VectorType }; }
export var VectorType: { new(): VectorType };

interface _VectorTypeCoordinateType extends _AnyNumericalPropertyType {
	name: string;
}
interface VectorTypeCoordinateType extends _VectorTypeCoordinateType { constructor: { new(): VectorTypeCoordinateType }; }

interface _XMLEncodingPropertyByValueType extends BaseType {
	/** Parameters of the XML encoding method */
	XMLEncoding: XMLEncodingType;
}
export interface XMLEncodingPropertyByValueType extends _XMLEncodingPropertyByValueType { constructor: { new(): XMLEncodingPropertyByValueType }; }
export var XMLEncodingPropertyByValueType: { new(): XMLEncodingPropertyByValueType };

interface _XMLEncodingPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Parameters of the XML encoding method */
	XMLEncoding?: XMLEncodingType;
}
export interface XMLEncodingPropertyType extends _XMLEncodingPropertyType { constructor: { new(): XMLEncodingPropertyType }; }
export var XMLEncodingPropertyType: { new(): XMLEncodingPropertyType };

interface _XMLEncodingType extends _AbstractEncodingType {}
export interface XMLEncodingType extends _XMLEncodingType { constructor: { new(): XMLEncodingType }; }
export var XMLEncodingType: { new(): XMLEncodingType };

export interface document extends BaseType {
	/** Defines the permitted values for the component, as a time range or an enumerated list of time values */
	AllowedTimes: AllowedTimesType;
	/** Defines permitted values for the component, as an enumerated list of tokens or a regular expression pattern */
	AllowedTokens: AllowedTokensType;
	/** Defines the permitted values for the component as an enumerated list and/or a list of inclusive ranges */
	AllowedValues: AllowedValuesType;
	/** Parameters of the binary encoding method */
	BinaryEncoding: BinaryEncodingType;
	/** Binary encoding parameters used to encode a block of values at once. This is used for encrypting or compressing a complete array of values for instance */
	Block: BlockType;
	/** Scalar component used to express truth: True or False, 0 or 1 */
	Boolean: BooleanType;
	/** Scalar component used to represent a categorical value as a simple token identifying a term in a code space */
	Category: CategoryType;
	/** Pair of categorical values used to specify a range in an ordinal reference system (specified by the code space) */
	CategoryRange: CategoryRangeType;
	/** Binary encoding parameters used for encoding a single data component */
	Component: ComponentType;
	/** Scalar component with integer representation used for a discrete counting value */
	Count: CountType;
	/** Integer pair used for specifying a count range */
	CountRange: CountRangeType;
	/** Implementation of a choice of two or more Data Components (also called disjoint union) */
	DataChoice: DataChoiceType;
	/** Implementation of ISO-11404 Record datatype. This allows grouping (sequence) of data components which can themselves be simple types, records, arrays or choices */
	DataRecord: DataRecordType;
	/** Defines the structure of the element that will be repeated in the stream */
	DataStream: DataStreamType;
	/** Implementation of ISO-11404 Array datatype. This defines an array of identical data components with a elementCount. Values are given as a block and can be encoded in different ways */
	Matrix: MatrixType;
	NilValues: NilValuesType;
	/** Scalar component with decimal representation and a unit of measure used to store value of a continuous quantity */
	Quantity: QuantityType;
	/** Decimal pair for specifying a quantity range with a unit of measure */
	QuantityRange: QuantityRangeType;
	/** Free text component used to store comments or any other type of textual statement */
	Text: TextType;
	/** Parameters of the text encoding method */
	TextEncoding: TextEncodingType;
	/** Scalar component used to represent a time quantity either as ISO 8601 (e.g. 2004-04-18T12:03:04.6Z) or as a duration relative to a time of reference */
	Time: TimeType;
	/** Time value pair for specifying a time range (can be a decimal or ISO 8601) */
	TimeRange: TimeRangeType;
	/** Implementation of a mathematical vector composed of a list of scalar coordinates expressed in the mandatory reference frame. */
	Vector: VectorType;
	/** Parameters of the XML encoding method */
	XMLEncoding: XMLEncodingType;
}
export var document: document;
