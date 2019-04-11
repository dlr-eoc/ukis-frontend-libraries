import * as Primitive from '../../xml-primitives';
import * as gml from '../../www.opengis.net/gml/3.2';
import * as xlink from '../../www.w3.org/1999/xlink';

// Source files:
// http://schemas.opengis.net/iso/19139/20070417/gco/basicTypes.xsd
// http://schemas.opengis.net/iso/19139/20070417/gco/gco.xsd
// http://schemas.opengis.net/iso/19139/20070417/gco/gcoBase.xsd


interface BaseType {
	_exists: boolean;
	_namespace: string;
}
interface _AbstractGenericNameProxyType extends BaseType {
	LocalName?: gml.CodeType;
	ScopedName?: gml.CodeType;
}
interface AbstractGenericNameProxyType extends _AbstractGenericNameProxyType { constructor: { new(): AbstractGenericNameProxyType }; }

interface _AbstractObject_Type extends BaseType {
	id: string;
	uuid: string;
}
export interface AbstractObject_Type extends _AbstractObject_Type { constructor: { new(): AbstractObject_Type }; }
export var AbstractObject_Type: { new(): AbstractObject_Type };

interface _AbstractObjectProxyType extends BaseType {}
interface AbstractObjectProxyType extends _AbstractObjectProxyType { constructor: { new(): AbstractObjectProxyType }; }

interface _Angle_PropertyType extends BaseType {
	nilReason: string;
	Angle?: gml.AngleType;
}
export interface Angle_PropertyType extends _Angle_PropertyType { constructor: { new(): Angle_PropertyType }; }
export var Angle_PropertyType: { new(): Angle_PropertyType };

interface _Binary_PropertyType extends BaseType {
	nilReason: string;
	Binary?: Binary_Type;
}
export interface Binary_PropertyType extends _Binary_PropertyType { constructor: { new(): Binary_PropertyType }; }
export var Binary_PropertyType: { new(): Binary_PropertyType };

interface _Binary_Type extends Primitive._string {
	src: string;
}
export interface Binary_Type extends _Binary_Type { constructor: { new(): Binary_Type }; }
export var Binary_Type: { new(): Binary_Type };

interface _Boolean_PropertyType extends BaseType {
	nilReason: string;
	Boolean?: boolean;
}
export interface Boolean_PropertyType extends _Boolean_PropertyType { constructor: { new(): Boolean_PropertyType }; }
export var Boolean_PropertyType: { new(): Boolean_PropertyType };

interface _CharacterString_PropertyType extends _CharacterStringProxyType {
	nilReason: string;
}
export interface CharacterString_PropertyType extends _CharacterString_PropertyType { constructor: { new(): CharacterString_PropertyType }; }
export var CharacterString_PropertyType: { new(): CharacterString_PropertyType };

interface _CharacterStringProxyType extends BaseType {
	CharacterString?: string;
}
interface CharacterStringProxyType extends _CharacterStringProxyType { constructor: { new(): CharacterStringProxyType }; }

interface _CodeListValue_Type extends Primitive._string {
	codeList: string;
	codeListValue: string;
	codeSpace: string;
}
export interface CodeListValue_Type extends _CodeListValue_Type { constructor: { new(): CodeListValue_Type }; }
export var CodeListValue_Type: { new(): CodeListValue_Type };

interface _Date_PropertyType extends BaseType {
	nilReason: string;
	Date?: string;
	DateTime?: Date;
}
export interface Date_PropertyType extends _Date_PropertyType { constructor: { new(): Date_PropertyType }; }
export var Date_PropertyType: { new(): Date_PropertyType };

export type Date_Type = string;
type _Date_Type = Primitive._string;

interface _DateTime_PropertyType extends BaseType {
	nilReason: string;
	DateTime?: Date;
}
export interface DateTime_PropertyType extends _DateTime_PropertyType { constructor: { new(): DateTime_PropertyType }; }
export var DateTime_PropertyType: { new(): DateTime_PropertyType };

interface _Decimal_PropertyType extends BaseType {
	nilReason: string;
	Decimal?: number;
}
export interface Decimal_PropertyType extends _Decimal_PropertyType { constructor: { new(): Decimal_PropertyType }; }
export var Decimal_PropertyType: { new(): Decimal_PropertyType };

interface _Distance_PropertyType extends BaseType {
	nilReason: string;
	Distance?: gml.LengthType;
}
export interface Distance_PropertyType extends _Distance_PropertyType { constructor: { new(): Distance_PropertyType }; }
export var Distance_PropertyType: { new(): Distance_PropertyType };

interface _GenericName_PropertyType extends _AbstractGenericNameProxyType {
	nilReason: string;
}
export interface GenericName_PropertyType extends _GenericName_PropertyType { constructor: { new(): GenericName_PropertyType }; }
export var GenericName_PropertyType: { new(): GenericName_PropertyType };

interface _Integer_PropertyType extends BaseType {
	nilReason: string;
	Integer?: number;
}
export interface Integer_PropertyType extends _Integer_PropertyType { constructor: { new(): Integer_PropertyType }; }
export var Integer_PropertyType: { new(): Integer_PropertyType };

interface _Length_PropertyType extends _LengthProxyType {
	nilReason: string;
}
export interface Length_PropertyType extends _Length_PropertyType { constructor: { new(): Length_PropertyType }; }
export var Length_PropertyType: { new(): Length_PropertyType };

interface _LengthProxyType extends BaseType {
	Length?: gml.LengthType;
	Distance?: gml.LengthType;
}
interface LengthProxyType extends _LengthProxyType { constructor: { new(): LengthProxyType }; }

interface _LocalName_PropertyType extends BaseType {
	nilReason: string;
	LocalName?: gml.CodeType;
}
export interface LocalName_PropertyType extends _LocalName_PropertyType { constructor: { new(): LocalName_PropertyType }; }
export var LocalName_PropertyType: { new(): LocalName_PropertyType };

interface _Measure_PropertyType extends _MeasureProxyType {
	nilReason: string;
}
export interface Measure_PropertyType extends _Measure_PropertyType { constructor: { new(): Measure_PropertyType }; }
export var Measure_PropertyType: { new(): Measure_PropertyType };

interface _MeasureProxyType extends _LengthProxyType {
	Measure?: gml.MeasureType;
	Angle?: gml.AngleType;
	Scale?: gml.ScaleType;
}
interface MeasureProxyType extends _MeasureProxyType { constructor: { new(): MeasureProxyType }; }

interface _MemberName_PropertyType extends BaseType {
	nilReason: string;
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	MemberName?: MemberName_Type;
}
export interface MemberName_PropertyType extends _MemberName_PropertyType { constructor: { new(): MemberName_PropertyType }; }
export var MemberName_PropertyType: { new(): MemberName_PropertyType };

/** A MemberName is a LocalName that references either an attribute slot in a record or  recordType or an attribute, operation, or association role in an object instance or  type description in some form of schema. The stored value "aName" is the returned value for the "aName()" operation. */
interface _MemberName_Type extends _AbstractObject_Type {
	aName: CharacterString_PropertyType;
	attributeType: TypeName_PropertyType;
}
export interface MemberName_Type extends _MemberName_Type { constructor: { new(): MemberName_Type }; }
export var MemberName_Type: { new(): MemberName_Type };

interface _Multiplicity_PropertyType extends BaseType {
	nilReason: string;
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	Multiplicity?: Multiplicity_Type;
}
export interface Multiplicity_PropertyType extends _Multiplicity_PropertyType { constructor: { new(): Multiplicity_PropertyType }; }
export var Multiplicity_PropertyType: { new(): Multiplicity_PropertyType };

/** Use to represent the possible cardinality of a relation. Represented by a set of simple multiplicity ranges. */
interface _Multiplicity_Type extends _AbstractObject_Type {
	range: MultiplicityRange_PropertyType[];
}
export interface Multiplicity_Type extends _Multiplicity_Type { constructor: { new(): Multiplicity_Type }; }
export var Multiplicity_Type: { new(): Multiplicity_Type };

interface _MultiplicityRange_PropertyType extends BaseType {
	nilReason: string;
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	MultiplicityRange?: MultiplicityRange_Type;
}
export interface MultiplicityRange_PropertyType extends _MultiplicityRange_PropertyType { constructor: { new(): MultiplicityRange_PropertyType }; }
export var MultiplicityRange_PropertyType: { new(): MultiplicityRange_PropertyType };

/** A component of a multiplicity, consisting of an non-negative lower bound, and a potentially infinite upper bound. */
interface _MultiplicityRange_Type extends _AbstractObject_Type {
	lower: Integer_PropertyType;
	upper: UnlimitedInteger_PropertyType;
}
export interface MultiplicityRange_Type extends _MultiplicityRange_Type { constructor: { new(): MultiplicityRange_Type }; }
export var MultiplicityRange_Type: { new(): MultiplicityRange_Type };

interface _Number_PropertyType extends BaseType {
	nilReason: string;
	Decimal?: number;
	Integer?: number;
	Real?: number;
}
export interface Number_PropertyType extends _Number_PropertyType { constructor: { new(): Number_PropertyType }; }
export var Number_PropertyType: { new(): Number_PropertyType };

interface _ObjectReference_PropertyType extends BaseType {
	nilReason: string;
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface ObjectReference_PropertyType extends _ObjectReference_PropertyType { constructor: { new(): ObjectReference_PropertyType }; }
export var ObjectReference_PropertyType: { new(): ObjectReference_PropertyType };

interface _Real_PropertyType extends BaseType {
	nilReason: string;
	Real?: number;
}
export interface Real_PropertyType extends _Real_PropertyType { constructor: { new(): Real_PropertyType }; }
export var Real_PropertyType: { new(): Real_PropertyType };

interface _Record_PropertyType extends BaseType {
	nilReason: string;
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface Record_PropertyType extends _Record_PropertyType { constructor: { new(): Record_PropertyType }; }
export var Record_PropertyType: { new(): Record_PropertyType };

interface _RecordType_PropertyType extends BaseType {
	nilReason: string;
	RecordType?: RecordType_Type;
}
export interface RecordType_PropertyType extends _RecordType_PropertyType { constructor: { new(): RecordType_PropertyType }; }
export var RecordType_PropertyType: { new(): RecordType_PropertyType };

interface _RecordType_Type extends Primitive._string {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface RecordType_Type extends _RecordType_Type { constructor: { new(): RecordType_Type }; }
export var RecordType_Type: { new(): RecordType_Type };

interface _Scale_PropertyType extends BaseType {
	nilReason: string;
	Scale?: gml.ScaleType;
}
export interface Scale_PropertyType extends _Scale_PropertyType { constructor: { new(): Scale_PropertyType }; }
export var Scale_PropertyType: { new(): Scale_PropertyType };

interface _ScopedName_PropertyType extends BaseType {
	nilReason: string;
	ScopedName?: gml.CodeType;
}
export interface ScopedName_PropertyType extends _ScopedName_PropertyType { constructor: { new(): ScopedName_PropertyType }; }
export var ScopedName_PropertyType: { new(): ScopedName_PropertyType };

interface _TypeName_PropertyType extends BaseType {
	nilReason: string;
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	TypeName?: TypeName_Type;
}
export interface TypeName_PropertyType extends _TypeName_PropertyType { constructor: { new(): TypeName_PropertyType }; }
export var TypeName_PropertyType: { new(): TypeName_PropertyType };

/** A TypeName is a LocalName that references either a recordType or object type in some form of schema. The stored value "aName" is the returned value for the "aName()" operation. This is the types name.  - For parsing from types (or objects) the parsible name normally uses a "." navigation separator, so that it is of the form  [class].[member].[memberOfMember]. ...) */
interface _TypeName_Type extends _AbstractObject_Type {
	aName: CharacterString_PropertyType;
}
export interface TypeName_Type extends _TypeName_Type { constructor: { new(): TypeName_Type }; }
export var TypeName_Type: { new(): TypeName_Type };

interface _UnitOfMeasure_PropertyType extends gml._UnitDefinitionProxyType {
	nilReason: string;
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface UnitOfMeasure_PropertyType extends _UnitOfMeasure_PropertyType { constructor: { new(): UnitOfMeasure_PropertyType }; }
export var UnitOfMeasure_PropertyType: { new(): UnitOfMeasure_PropertyType };

interface _UnlimitedInteger_PropertyType extends BaseType {
	nilReason: string;
	UnlimitedInteger?: UnlimitedInteger_Type;
}
export interface UnlimitedInteger_PropertyType extends _UnlimitedInteger_PropertyType { constructor: { new(): UnlimitedInteger_PropertyType }; }
export var UnlimitedInteger_PropertyType: { new(): UnlimitedInteger_PropertyType };

interface _UnlimitedInteger_Type extends Primitive._number {
	isInfinite: boolean;
}
export interface UnlimitedInteger_Type extends _UnlimitedInteger_Type { constructor: { new(): UnlimitedInteger_Type }; }
export var UnlimitedInteger_Type: { new(): UnlimitedInteger_Type };

interface _UomAngle_PropertyType extends gml._UnitDefinitionProxyType {
	nilReason: string;
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface UomAngle_PropertyType extends _UomAngle_PropertyType { constructor: { new(): UomAngle_PropertyType }; }
export var UomAngle_PropertyType: { new(): UomAngle_PropertyType };

interface _UomArea_PropertyType extends gml._UnitDefinitionProxyType {
	nilReason: string;
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface UomArea_PropertyType extends _UomArea_PropertyType { constructor: { new(): UomArea_PropertyType }; }
export var UomArea_PropertyType: { new(): UomArea_PropertyType };

interface _UomLength_PropertyType extends gml._UnitDefinitionProxyType {
	nilReason: string;
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface UomLength_PropertyType extends _UomLength_PropertyType { constructor: { new(): UomLength_PropertyType }; }
export var UomLength_PropertyType: { new(): UomLength_PropertyType };

interface _UomScale_PropertyType extends gml._UnitDefinitionProxyType {
	nilReason: string;
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface UomScale_PropertyType extends _UomScale_PropertyType { constructor: { new(): UomScale_PropertyType }; }
export var UomScale_PropertyType: { new(): UomScale_PropertyType };

interface _UomTime_PropertyType extends gml._UnitDefinitionProxyType {
	nilReason: string;
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface UomTime_PropertyType extends _UomTime_PropertyType { constructor: { new(): UomTime_PropertyType }; }
export var UomTime_PropertyType: { new(): UomTime_PropertyType };

interface _UomVelocity_PropertyType extends gml._UnitDefinitionProxyType {
	nilReason: string;
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface UomVelocity_PropertyType extends _UomVelocity_PropertyType { constructor: { new(): UomVelocity_PropertyType }; }
export var UomVelocity_PropertyType: { new(): UomVelocity_PropertyType };

interface _UomVolume_PropertyType extends gml._UnitDefinitionProxyType {
	nilReason: string;
	uuidref: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface UomVolume_PropertyType extends _UomVolume_PropertyType { constructor: { new(): UomVolume_PropertyType }; }
export var UomVolume_PropertyType: { new(): UomVolume_PropertyType };

export interface document extends BaseType {
	Angle: gml.AngleType;
	Binary: Binary_Type;
	Boolean: boolean;
	Date: string;
	DateTime: Date;
	Decimal: number;
	Distance: gml.LengthType;
	Integer: number;
	LocalName: gml.CodeType;
	MemberName: MemberName_Type;
	Multiplicity: Multiplicity_Type;
	MultiplicityRange: MultiplicityRange_Type;
	Real: number;
	RecordType: RecordType_Type;
	Scale: gml.ScaleType;
	ScopedName: gml.CodeType;
	TypeName: TypeName_Type;
	UnlimitedInteger: UnlimitedInteger_Type;
}
export var document: document;
