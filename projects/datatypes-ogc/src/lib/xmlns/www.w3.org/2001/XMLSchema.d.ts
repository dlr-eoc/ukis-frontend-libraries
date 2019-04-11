import * as xml from '../XML/1998/namespace';

// Source files:
// http://www.w3.org/2001/XMLSchema.xsd


interface BaseType {
	_exists: boolean;
	_namespace: string;
}
/** Only elements allowed inside */
interface _all extends _explicitGroup {
	maxOccurs?: allMaxOccursType;
	minOccurs?: allMinOccursType;
	annotation?: AnnotationType;
	element?: narrowMaxMin[];
}
export interface all extends _all { constructor: { new(): all }; }
export var all: { new(): all };

interface _allMaxOccursType extends _allNNI {}
interface allMaxOccursType extends _allMaxOccursType { constructor: { new(): allMaxOccursType }; }

interface _allMinOccursType extends _nonNegativeInteger {}
interface allMinOccursType extends _allMinOccursType { constructor: { new(): allMinOccursType }; }

/** for maxOccurs */
interface _allNNI extends _string {}
export interface allNNI extends _allNNI { constructor: { new(): allNNI }; }
export var allNNI: { new(): allNNI };

/** This type is extended by all types which allow annotation
  * other than <schema> itself */
interface _annotated extends _openAttrs {
	id: ID;
	annotation?: AnnotationType;
}
export interface annotated extends _annotated { constructor: { new(): annotated }; }
export var annotated: { new(): annotated };

interface _AnnotationType extends _openAttrs {
	id: ID;
	appinfo?: AppinfoType[];
	documentation?: DocumentationType[];
}
interface AnnotationType extends _AnnotationType { constructor: { new(): AnnotationType }; }

/** Not the real urType, but as close an approximation as we can
  * get in the XML representation */
interface _anyType extends BaseType {}
export interface anyType extends _anyType { constructor: { new(): anyType }; }
export var anyType: { new(): anyType };

interface _AnyType extends _wildcard {
	maxOccurs?: allNNI;
	minOccurs?: nonNegativeInteger;
}
interface AnyType extends _AnyType { constructor: { new(): AnyType }; }

interface _anyURI extends BaseType {}
export interface anyURI extends _anyURI { constructor: { new(): anyURI }; }
export var anyURI: { new(): anyURI };

interface _AppinfoType extends BaseType {
	source: anyURI;
}
interface AppinfoType extends _AppinfoType { constructor: { new(): AppinfoType }; }

interface _attribute extends _annotated {
	default: string;
	fixed: string;
	form: formChoice;
	name: NCName;
	ref: QName;
	type: QName;
	use?: attributeUseType;
	simpleType?: localSimpleType;
}
export interface attribute extends _attribute { constructor: { new(): attribute }; }
export var attribute: { new(): attribute };

interface _attributeGroup extends _annotated {
	name: NCName;
	ref: QName;
	anyAttribute?: wildcard;
	attribute?: attribute[];
	attributeGroup?: attributeGroupRef[];
}
export interface attributeGroup extends _attributeGroup { constructor: { new(): attributeGroup }; }
export var attributeGroup: { new(): attributeGroup };

interface _attributeGroupRef extends _attributeGroup {
	ref: QName;
	annotation?: AnnotationType;
}
export interface attributeGroupRef extends _attributeGroupRef { constructor: { new(): attributeGroupRef }; }
export var attributeGroupRef: { new(): attributeGroupRef };

interface _attributeUseType extends _NMTOKEN {}
interface attributeUseType extends _attributeUseType { constructor: { new(): attributeUseType }; }

interface _base64Binary extends BaseType {}
export interface base64Binary extends _base64Binary { constructor: { new(): base64Binary }; }
export var base64Binary: { new(): base64Binary };

/** A utility type, not for public use
  * #all or (possibly empty) subset of {substitution, extension,
  * restriction} */
interface _blockSet extends _string {}
export interface blockSet extends _blockSet { constructor: { new(): blockSet }; }
export var blockSet: { new(): blockSet };

interface _boolean extends BaseType {}
export interface boolean extends _boolean { constructor: { new(): boolean }; }
export var boolean: { new(): boolean };

interface _byte extends _short {}
export interface byte extends _byte { constructor: { new(): byte }; }
export var byte: { new(): byte };

interface _ComplexContentType extends _annotated {
	/** Overrides any setting on complexType parent. */
	mixed: boolean;
	extension: extensionType;
	restriction: complexRestrictionType;
}
interface ComplexContentType extends _ComplexContentType { constructor: { new(): ComplexContentType }; }

interface _complexRestrictionType extends _restrictionType {
	all?: all;
	annotation?: AnnotationType;
	anyAttribute?: wildcard;
	attribute?: attribute[];
	attributeGroup?: attributeGroupRef[];
	choice?: explicitGroup;
	group?: groupRef;
	sequence?: explicitGroup;
}
export interface complexRestrictionType extends _complexRestrictionType { constructor: { new(): complexRestrictionType }; }
export var complexRestrictionType: { new(): complexRestrictionType };

interface _complexType extends _annotated {
	abstract?: boolean;
	block: derivationSet;
	final: derivationSet;
	/** Not allowed if simpleContent child is chosen.
	  * May be overriden by setting on complexContent child. */
	mixed?: boolean;
	/** Will be restricted to required or forbidden */
	name: NCName;
	all?: all;
	anyAttribute?: wildcard;
	attribute?: attribute[];
	attributeGroup?: attributeGroupRef[];
	choice?: explicitGroup;
	complexContent: ComplexContentType;
	group?: groupRef;
	sequence?: explicitGroup;
	simpleContent: SimpleContentType;
}
export interface complexType extends _complexType { constructor: { new(): complexType }; }
export var complexType: { new(): complexType };

interface _date extends BaseType {}
export interface date extends _date { constructor: { new(): date }; }
export var date: { new(): date };

interface _dateTime extends BaseType {}
export interface dateTime extends _dateTime { constructor: { new(): dateTime }; }
export var dateTime: { new(): dateTime };

interface _decimal extends BaseType {}
export interface decimal extends _decimal { constructor: { new(): decimal }; }
export var decimal: { new(): decimal };

/** A utility type, not for public use */
interface _derivationControl extends _NMTOKEN {}
export interface derivationControl extends _derivationControl { constructor: { new(): derivationControl }; }
export var derivationControl: { new(): derivationControl };

/** A utility type, not for public use
  * #all or (possibly empty) subset of {extension, restriction} */
interface _derivationSet extends _string {}
export interface derivationSet extends _derivationSet { constructor: { new(): derivationSet }; }
export var derivationSet: { new(): derivationSet };

interface _DocumentationType extends BaseType {
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
	source: anyURI;
}
interface DocumentationType extends _DocumentationType { constructor: { new(): DocumentationType }; }

interface _double extends BaseType {}
export interface double extends _double { constructor: { new(): double }; }
export var double: { new(): double };

interface _duration extends BaseType {}
export interface duration extends _duration { constructor: { new(): duration }; }
export var duration: { new(): duration };

/** The element element can be used either
  * at the top level to define an element-type binding globally,
  * or within a content model to either reference a globally-defined
  * element or type or declare an element-type binding locally.
  * The ref form is not allowed at the top level. */
interface _element extends _annotated {
	abstract?: boolean;
	block: blockSet;
	default: string;
	final: derivationSet;
	fixed: string;
	form: formChoice;
	maxOccurs?: allNNI;
	minOccurs?: nonNegativeInteger;
	name: NCName;
	nillable?: boolean;
	ref: QName;
	substitutionGroup: QName;
	type: QName;
	complexType?: localComplexType;
	key?: keybase[];
	keyref?: KeyrefType[];
	simpleType?: localSimpleType;
	unique?: keybase[];
}
export interface element extends _element { constructor: { new(): element }; }
export var element: { new(): element };

interface _ENTITIES extends BaseType {}
export interface ENTITIES extends _ENTITIES { constructor: { new(): ENTITIES }; }
export var ENTITIES: { new(): ENTITIES };

interface _ENTITY extends _NCName {}
export interface ENTITY extends _ENTITY { constructor: { new(): ENTITY }; }
export var ENTITY: { new(): ENTITY };

/** group type for the three kinds of group */
interface _explicitGroup extends _group {
	name: NCName;
	ref: QName;
	annotation?: AnnotationType;
	any?: AnyType[];
	choice?: explicitGroup[];
	element?: localElement[];
	group?: groupRef[];
	sequence?: explicitGroup[];
}
export interface explicitGroup extends _explicitGroup { constructor: { new(): explicitGroup }; }
export var explicitGroup: { new(): explicitGroup };

interface _extensionType extends _annotated {
	base: QName;
	all?: all;
	anyAttribute?: wildcard;
	attribute?: attribute[];
	attributeGroup?: attributeGroupRef[];
	choice?: explicitGroup;
	group?: groupRef;
	sequence?: explicitGroup;
}
export interface extensionType extends _extensionType { constructor: { new(): extensionType }; }
export var extensionType: { new(): extensionType };

interface _facet extends _annotated {
	fixed?: boolean;
}
export interface facet extends _facet { constructor: { new(): facet }; }
export var facet: { new(): facet };

interface _FieldType extends _annotated {
	xpath: FieldTypeXpathType;
}
interface FieldType extends _FieldType { constructor: { new(): FieldType }; }

/** A subset of XPath expressions for use
  * in fieldsA utility type, not for public
  * use */
interface _FieldTypeXpathType extends _token {}
interface FieldTypeXpathType extends _FieldTypeXpathType { constructor: { new(): FieldTypeXpathType }; }

interface _float extends BaseType {}
export interface float extends _float { constructor: { new(): float }; }
export var float: { new(): float };

/** A utility type, not for public use */
interface _formChoice extends _NMTOKEN {}
export interface formChoice extends _formChoice { constructor: { new(): formChoice }; }
export var formChoice: { new(): formChoice };

/** A utility type, not for public use
  * #all or (possibly empty) subset of {extension, restriction, list, union} */
interface _fullDerivationSet extends _string {}
export interface fullDerivationSet extends _fullDerivationSet { constructor: { new(): fullDerivationSet }; }
export var fullDerivationSet: { new(): fullDerivationSet };

interface _gDay extends BaseType {}
export interface gDay extends _gDay { constructor: { new(): gDay }; }
export var gDay: { new(): gDay };

interface _gMonth extends BaseType {}
export interface gMonth extends _gMonth { constructor: { new(): gMonth }; }
export var gMonth: { new(): gMonth };

interface _gMonthDay extends BaseType {}
export interface gMonthDay extends _gMonthDay { constructor: { new(): gMonthDay }; }
export var gMonthDay: { new(): gMonthDay };

/** group type for explicit groups, named top-level groups and
  * group references */
interface _group extends _annotated {
	maxOccurs?: allNNI;
	minOccurs?: nonNegativeInteger;
	name: NCName;
	ref: QName;
	all?: all[];
	any?: AnyType[];
	choice?: explicitGroup[];
	element?: localElement[];
	group?: groupRef[];
	sequence?: explicitGroup[];
}
export interface group extends _group { constructor: { new(): group }; }
export var group: { new(): group };

interface _groupRef extends _realGroup {
	ref: QName;
	annotation?: AnnotationType;
}
export interface groupRef extends _groupRef { constructor: { new(): groupRef }; }
export var groupRef: { new(): groupRef };

interface _gYear extends BaseType {}
export interface gYear extends _gYear { constructor: { new(): gYear }; }
export var gYear: { new(): gYear };

interface _gYearMonth extends BaseType {}
export interface gYearMonth extends _gYearMonth { constructor: { new(): gYearMonth }; }
export var gYearMonth: { new(): gYearMonth };

interface _hexBinary extends BaseType {}
export interface hexBinary extends _hexBinary { constructor: { new(): hexBinary }; }
export var hexBinary: { new(): hexBinary };

interface _ID extends _NCName {}
export interface ID extends _ID { constructor: { new(): ID }; }
export var ID: { new(): ID };

interface _IDREF extends _NCName {}
export interface IDREF extends _IDREF { constructor: { new(): IDREF }; }
export var IDREF: { new(): IDREF };

interface _IDREFS extends BaseType {}
export interface IDREFS extends _IDREFS { constructor: { new(): IDREFS }; }
export var IDREFS: { new(): IDREFS };

interface _ImportType extends _annotated {
	namespace: anyURI;
	schemaLocation: anyURI;
}
interface ImportType extends _ImportType { constructor: { new(): ImportType }; }

interface _IncludeType extends _annotated {
	schemaLocation: anyURI;
}
interface IncludeType extends _IncludeType { constructor: { new(): IncludeType }; }

interface _int extends _long {}
export interface int extends _int { constructor: { new(): int }; }
export var int: { new(): int };

interface _integer extends _decimal {}
export interface integer extends _integer { constructor: { new(): integer }; }
export var integer: { new(): integer };

interface _keybase extends _annotated {
	name: NCName;
	field: FieldType[];
	selector: SelectorType;
}
export interface keybase extends _keybase { constructor: { new(): keybase }; }
export var keybase: { new(): keybase };

interface _KeyrefType extends _keybase {
	refer: QName;
}
interface KeyrefType extends _KeyrefType { constructor: { new(): KeyrefType }; }

interface _language extends _token {}
export interface language extends _language { constructor: { new(): language }; }
export var language: { new(): language };

/** itemType attribute and simpleType child are mutually
  * exclusive, but one or other is required */
interface _ListType extends _annotated {
	itemType?: QName;
	simpleType?: localSimpleType;
}
interface ListType extends _ListType { constructor: { new(): ListType }; }

interface _localComplexType extends _complexType {
	all?: all;
	annotation?: AnnotationType;
	anyAttribute?: wildcard;
	attribute?: attribute[];
	attributeGroup?: attributeGroupRef[];
	choice?: explicitGroup;
	complexContent: ComplexContentType;
	group?: groupRef;
	sequence?: explicitGroup;
	simpleContent: SimpleContentType;
}
export interface localComplexType extends _localComplexType { constructor: { new(): localComplexType }; }
export var localComplexType: { new(): localComplexType };

interface _localElement extends _element {
	annotation?: AnnotationType;
	complexType?: localComplexType;
	key?: keybase[];
	keyref?: KeyrefType[];
	simpleType?: localSimpleType;
	unique?: keybase[];
}
export interface localElement extends _localElement { constructor: { new(): localElement }; }
export var localElement: { new(): localElement };

interface _localSimpleType extends _simpleType {
	annotation?: AnnotationType;
	list: ListType;
	restriction: RestrictionType;
	union: UnionType;
}
export interface localSimpleType extends _localSimpleType { constructor: { new(): localSimpleType }; }
export var localSimpleType: { new(): localSimpleType };

interface _long extends _integer {}
export interface long extends _long { constructor: { new(): long }; }
export var long: { new(): long };

interface _Name extends _token {}
export interface Name extends _Name { constructor: { new(): Name }; }
export var Name: { new(): Name };

interface _namedAttributeGroup extends _attributeGroup {
	name: NCName;
	annotation?: AnnotationType;
	anyAttribute?: wildcard;
	attribute?: attribute[];
	attributeGroup?: attributeGroupRef[];
}
export interface namedAttributeGroup extends _namedAttributeGroup { constructor: { new(): namedAttributeGroup }; }
export var namedAttributeGroup: { new(): namedAttributeGroup };

interface _namedGroup extends _realGroup {
	name: NCName;
	all: namedGroupAllType[];
	annotation?: AnnotationType;
	choice: simpleExplicitGroup[];
	sequence: simpleExplicitGroup[];
}
export interface namedGroup extends _namedGroup { constructor: { new(): namedGroup }; }
export var namedGroup: { new(): namedGroup };

interface _namedGroupAllType extends _all {
	annotation?: AnnotationType;
	element?: narrowMaxMin[];
}
interface namedGroupAllType extends _namedGroupAllType { constructor: { new(): namedGroupAllType }; }

/** A utility type, not for public use */
interface _namespaceList extends _string {}
export interface namespaceList extends _namespaceList { constructor: { new(): namespaceList }; }
export var namespaceList: { new(): namespaceList };

/** restricted max/min */
interface _narrowMaxMin extends _localElement {
	maxOccurs?: narrowMaxMinMaxOccursType;
	minOccurs?: narrowMaxMinMinOccursType;
	annotation?: AnnotationType;
	complexType?: localComplexType;
	key?: keybase[];
	keyref?: KeyrefType[];
	simpleType?: localSimpleType;
	unique?: keybase[];
}
export interface narrowMaxMin extends _narrowMaxMin { constructor: { new(): narrowMaxMin }; }
export var narrowMaxMin: { new(): narrowMaxMin };

interface _narrowMaxMinMaxOccursType extends _allNNI {}
interface narrowMaxMinMaxOccursType extends _narrowMaxMinMaxOccursType { constructor: { new(): narrowMaxMinMaxOccursType }; }

interface _narrowMaxMinMinOccursType extends _nonNegativeInteger {}
interface narrowMaxMinMinOccursType extends _narrowMaxMinMinOccursType { constructor: { new(): narrowMaxMinMinOccursType }; }

interface _NCName extends _Name {}
export interface NCName extends _NCName { constructor: { new(): NCName }; }
export var NCName: { new(): NCName };

interface _negativeInteger extends _nonPositiveInteger {}
export interface negativeInteger extends _negativeInteger { constructor: { new(): negativeInteger }; }
export var negativeInteger: { new(): negativeInteger };

interface _NMTOKEN extends _token {}
export interface NMTOKEN extends _NMTOKEN { constructor: { new(): NMTOKEN }; }
export var NMTOKEN: { new(): NMTOKEN };

interface _NMTOKENS extends BaseType {}
export interface NMTOKENS extends _NMTOKENS { constructor: { new(): NMTOKENS }; }
export var NMTOKENS: { new(): NMTOKENS };

interface _noFixedFacet extends _facet {
	annotation?: AnnotationType;
}
export interface noFixedFacet extends _noFixedFacet { constructor: { new(): noFixedFacet }; }
export var noFixedFacet: { new(): noFixedFacet };

interface _nonNegativeInteger extends _integer {}
export interface nonNegativeInteger extends _nonNegativeInteger { constructor: { new(): nonNegativeInteger }; }
export var nonNegativeInteger: { new(): nonNegativeInteger };

interface _nonPositiveInteger extends _integer {}
export interface nonPositiveInteger extends _nonPositiveInteger { constructor: { new(): nonPositiveInteger }; }
export var nonPositiveInteger: { new(): nonPositiveInteger };

interface _normalizedString extends _string {}
export interface normalizedString extends _normalizedString { constructor: { new(): normalizedString }; }
export var normalizedString: { new(): normalizedString };

/** NOTATION cannot be used directly in a schema; rather a type
  * must be derived from it by specifying at least one enumeration
  * facet whose value is the name of a NOTATION declared in the
  * schema. */
interface _NOTATION extends BaseType {}
export interface NOTATION extends _NOTATION { constructor: { new(): NOTATION }; }
export var NOTATION: { new(): NOTATION };

interface _NotationType extends _annotated {
	name: NCName;
	public: public;
	system: anyURI;
}
interface NotationType extends _NotationType { constructor: { new(): NotationType }; }

interface _numFacet extends _facet {
	value: nonNegativeInteger;
	annotation?: AnnotationType;
}
export interface numFacet extends _numFacet { constructor: { new(): numFacet }; }
export var numFacet: { new(): numFacet };

/** This type is extended by almost all schema types
  * to allow attributes from other namespaces to be
  * added to user schemas. */
interface _openAttrs extends _anyType {}
export interface openAttrs extends _openAttrs { constructor: { new(): openAttrs }; }
export var openAttrs: { new(): openAttrs };

interface _PatternType extends _noFixedFacet {
	value: string;
	annotation?: AnnotationType;
}
interface PatternType extends _PatternType { constructor: { new(): PatternType }; }

interface _positiveInteger extends _nonNegativeInteger {}
export interface positiveInteger extends _positiveInteger { constructor: { new(): positiveInteger }; }
export var positiveInteger: { new(): positiveInteger };

/** A utility type, not for public use
  * A public identifier, per ISO 8879 */
interface _public extends _token {}
export interface public extends _public { constructor: { new(): public }; }
export var public: { new(): public };

interface _QName extends BaseType {}
export interface QName extends _QName { constructor: { new(): QName }; }
export var QName: { new(): QName };

interface _realGroup extends _group {
	all?: all[];
	annotation?: AnnotationType;
	choice?: explicitGroup[];
	sequence?: explicitGroup[];
}
export interface realGroup extends _realGroup { constructor: { new(): realGroup }; }
export var realGroup: { new(): realGroup };

interface _RedefineType extends _openAttrs {
	id: ID;
	schemaLocation: anyURI;
	annotation?: AnnotationType[];
	attributeGroup?: namedAttributeGroup[];
	complexType?: topLevelComplexType[];
	group?: namedGroup[];
	simpleType?: topLevelSimpleType[];
}
interface RedefineType extends _RedefineType { constructor: { new(): RedefineType }; }

/** A utility type, not for public use */
interface _reducedDerivationControl extends _derivationControl {}
export interface reducedDerivationControl extends _reducedDerivationControl { constructor: { new(): reducedDerivationControl }; }
export var reducedDerivationControl: { new(): reducedDerivationControl };

interface _restrictionType extends _annotated {
	base: QName;
	all?: all;
	anyAttribute?: wildcard;
	attribute?: attribute[];
	attributeGroup?: attributeGroupRef[];
	choice?: explicitGroup;
	enumeration?: noFixedFacet[];
	fractionDigits?: numFacet[];
	group?: groupRef;
	length?: numFacet[];
	maxExclusive?: facet[];
	maxInclusive?: facet[];
	maxLength?: numFacet[];
	minExclusive?: facet[];
	minInclusive?: facet[];
	minLength?: numFacet[];
	pattern?: PatternType[];
	sequence?: explicitGroup;
	simpleType?: localSimpleType;
	totalDigits?: TotalDigitsType[];
	whiteSpace?: WhiteSpaceType[];
}
export interface restrictionType extends _restrictionType { constructor: { new(): restrictionType }; }
export var restrictionType: { new(): restrictionType };

/** base attribute and simpleType child are mutually
  * exclusive, but one or other is required */
interface _RestrictionType extends _annotated {
	base?: QName;
	enumeration?: noFixedFacet[];
	fractionDigits?: numFacet[];
	length?: numFacet[];
	maxExclusive?: facet[];
	maxInclusive?: facet[];
	maxLength?: numFacet[];
	minExclusive?: facet[];
	minInclusive?: facet[];
	minLength?: numFacet[];
	pattern?: PatternType[];
	simpleType?: localSimpleType;
	totalDigits?: TotalDigitsType[];
	whiteSpace?: WhiteSpaceType[];
}
interface RestrictionType extends _RestrictionType { constructor: { new(): RestrictionType }; }

interface _SchemaType extends _openAttrs {
	attributeFormDefault?: formChoice;
	blockDefault?: blockSet;
	elementFormDefault?: formChoice;
	finalDefault?: fullDerivationSet;
	id: ID;
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
	targetNamespace: anyURI;
	version: token;
	annotation?: AnnotationType[];
	attribute?: topLevelAttribute[];
	attributeGroup?: namedAttributeGroup[];
	complexType?: topLevelComplexType[];
	element?: topLevelElement[];
	group?: namedGroup[];
	import?: ImportType[];
	include?: IncludeType[];
	notation?: NotationType[];
	redefine?: RedefineType[];
	simpleType?: topLevelSimpleType[];
}
interface SchemaType extends _SchemaType { constructor: { new(): SchemaType }; }

interface _SelectorType extends _annotated {
	xpath: SelectorTypeXpathType;
}
interface SelectorType extends _SelectorType { constructor: { new(): SelectorType }; }

/** A subset of XPath expressions for use
  * in selectorsA utility type, not for public
  * use */
interface _SelectorTypeXpathType extends _token {}
interface SelectorTypeXpathType extends _SelectorTypeXpathType { constructor: { new(): SelectorTypeXpathType }; }

interface _short extends _int {}
export interface short extends _short { constructor: { new(): short }; }
export var short: { new(): short };

interface _SimpleContentType extends _annotated {
	extension: simpleExtensionType;
	restriction: simpleRestrictionType;
}
interface SimpleContentType extends _SimpleContentType { constructor: { new(): SimpleContentType }; }

/** #all or (possibly empty) subset of {restriction, union, list}
  *
  * A utility type, not for public use */
interface _simpleDerivationSet extends _string {}
export interface simpleDerivationSet extends _simpleDerivationSet { constructor: { new(): simpleDerivationSet }; }
export var simpleDerivationSet: { new(): simpleDerivationSet };

interface _simpleExplicitGroup extends _explicitGroup {
	annotation?: AnnotationType;
	any?: AnyType[];
	choice?: explicitGroup[];
	element?: localElement[];
	group?: groupRef[];
	sequence?: explicitGroup[];
}
export interface simpleExplicitGroup extends _simpleExplicitGroup { constructor: { new(): simpleExplicitGroup }; }
export var simpleExplicitGroup: { new(): simpleExplicitGroup };

interface _simpleExtensionType extends _extensionType {
	annotation?: AnnotationType;
	anyAttribute?: wildcard;
	attribute?: attribute[];
	attributeGroup?: attributeGroupRef[];
}
export interface simpleExtensionType extends _simpleExtensionType { constructor: { new(): simpleExtensionType }; }
export var simpleExtensionType: { new(): simpleExtensionType };

interface _simpleRestrictionType extends _restrictionType {
	annotation?: AnnotationType;
	anyAttribute?: wildcard;
	attribute?: attribute[];
	attributeGroup?: attributeGroupRef[];
	enumeration?: noFixedFacet[];
	fractionDigits?: numFacet[];
	length?: numFacet[];
	maxExclusive?: facet[];
	maxInclusive?: facet[];
	maxLength?: numFacet[];
	minExclusive?: facet[];
	minInclusive?: facet[];
	minLength?: numFacet[];
	pattern?: PatternType[];
	simpleType?: localSimpleType;
	totalDigits?: TotalDigitsType[];
	whiteSpace?: WhiteSpaceType[];
}
export interface simpleRestrictionType extends _simpleRestrictionType { constructor: { new(): simpleRestrictionType }; }
export var simpleRestrictionType: { new(): simpleRestrictionType };

interface _simpleType extends _annotated {
	final: simpleDerivationSet;
	/** Can be restricted to required or forbidden */
	name: NCName;
	list: ListType;
	restriction: RestrictionType;
	union: UnionType;
}
export interface simpleType extends _simpleType { constructor: { new(): simpleType }; }
export var simpleType: { new(): simpleType };

interface _string extends BaseType {}
export interface string extends _string { constructor: { new(): string }; }
export var string: { new(): string };

interface _time extends BaseType {}
export interface time extends _time { constructor: { new(): time }; }
export var time: { new(): time };

interface _token extends _normalizedString {}
export interface token extends _token { constructor: { new(): token }; }
export var token: { new(): token };

interface _topLevelAttribute extends _attribute {
	name: NCName;
	annotation?: AnnotationType;
	simpleType?: localSimpleType;
}
export interface topLevelAttribute extends _topLevelAttribute { constructor: { new(): topLevelAttribute }; }
export var topLevelAttribute: { new(): topLevelAttribute };

interface _topLevelComplexType extends _complexType {
	name: NCName;
	all?: all;
	annotation?: AnnotationType;
	anyAttribute?: wildcard;
	attribute?: attribute[];
	attributeGroup?: attributeGroupRef[];
	choice?: explicitGroup;
	complexContent: ComplexContentType;
	group?: groupRef;
	sequence?: explicitGroup;
	simpleContent: SimpleContentType;
}
export interface topLevelComplexType extends _topLevelComplexType { constructor: { new(): topLevelComplexType }; }
export var topLevelComplexType: { new(): topLevelComplexType };

interface _topLevelElement extends _element {
	name: NCName;
	annotation?: AnnotationType;
	complexType?: localComplexType;
	key?: keybase[];
	keyref?: KeyrefType[];
	simpleType?: localSimpleType;
	unique?: keybase[];
}
export interface topLevelElement extends _topLevelElement { constructor: { new(): topLevelElement }; }
export var topLevelElement: { new(): topLevelElement };

interface _topLevelSimpleType extends _simpleType {
	/** Required at the top level */
	name: NCName;
	annotation?: AnnotationType;
	list: ListType;
	restriction: RestrictionType;
	union: UnionType;
}
export interface topLevelSimpleType extends _topLevelSimpleType { constructor: { new(): topLevelSimpleType }; }
export var topLevelSimpleType: { new(): topLevelSimpleType };

interface _TotalDigitsType extends _numFacet {
	value: positiveInteger;
	annotation?: AnnotationType;
}
interface TotalDigitsType extends _TotalDigitsType { constructor: { new(): TotalDigitsType }; }

/** A utility type, not for public use */
interface _typeDerivationControl extends _derivationControl {}
export interface typeDerivationControl extends _typeDerivationControl { constructor: { new(): typeDerivationControl }; }
export var typeDerivationControl: { new(): typeDerivationControl };

/** memberTypes attribute must be non-empty or there must be
  * at least one simpleType child */
interface _UnionType extends _annotated {
	memberTypes?: UnionTypeMemberTypesType;
	simpleType?: localSimpleType[];
}
interface UnionType extends _UnionType { constructor: { new(): UnionType }; }

type UnionTypeMemberTypesType = QName[];

interface _unsignedByte extends _unsignedShort {}
export interface unsignedByte extends _unsignedByte { constructor: { new(): unsignedByte }; }
export var unsignedByte: { new(): unsignedByte };

interface _unsignedInt extends _unsignedLong {}
export interface unsignedInt extends _unsignedInt { constructor: { new(): unsignedInt }; }
export var unsignedInt: { new(): unsignedInt };

interface _unsignedLong extends _nonNegativeInteger {}
export interface unsignedLong extends _unsignedLong { constructor: { new(): unsignedLong }; }
export var unsignedLong: { new(): unsignedLong };

interface _unsignedShort extends _unsignedInt {}
export interface unsignedShort extends _unsignedShort { constructor: { new(): unsignedShort }; }
export var unsignedShort: { new(): unsignedShort };

interface _WhiteSpaceType extends _facet {
	value: WhiteSpaceTypeValueType;
	annotation?: AnnotationType;
}
interface WhiteSpaceType extends _WhiteSpaceType { constructor: { new(): WhiteSpaceType }; }

interface _WhiteSpaceTypeValueType extends _NMTOKEN {}
interface WhiteSpaceTypeValueType extends _WhiteSpaceTypeValueType { constructor: { new(): WhiteSpaceTypeValueType }; }

interface _wildcard extends _annotated {
	namespace?: namespaceList;
	processContents?: wildcardProcessContentsType;
}
export interface wildcard extends _wildcard { constructor: { new(): wildcard }; }
export var wildcard: { new(): wildcard };

interface _wildcardProcessContentsType extends _NMTOKEN {}
interface wildcardProcessContentsType extends _wildcardProcessContentsType { constructor: { new(): wildcardProcessContentsType }; }

export interface document extends BaseType {
	all: all;
	annotation: AnnotationType;
	any: AnyType;
	anyAttribute: wildcard;
	appinfo: AppinfoType;
	attribute: topLevelAttribute;
	attributeGroup: namedAttributeGroup;
	choice: explicitGroup;
	complexContent: ComplexContentType;
	complexType: topLevelComplexType;
	documentation: DocumentationType;
	element: topLevelElement;
	enumeration: noFixedFacet;
	field: FieldType;
	fractionDigits: numFacet;
	group: namedGroup;
	import: ImportType;
	include: IncludeType;
	key: keybase;
	keyref: KeyrefType;
	length: numFacet;
	list: ListType;
	maxExclusive: facet;
	maxInclusive: facet;
	maxLength: numFacet;
	minExclusive: facet;
	minInclusive: facet;
	minLength: numFacet;
	notation: NotationType;
	pattern: PatternType;
	redefine: RedefineType;
	restriction: RestrictionType;
	schema: SchemaType;
	selector: SelectorType;
	sequence: explicitGroup;
	simpleContent: SimpleContentType;
	simpleType: topLevelSimpleType;
	totalDigits: TotalDigitsType;
	union: UnionType;
	unique: keybase;
	whiteSpace: WhiteSpaceType;
}
export var document: document;
