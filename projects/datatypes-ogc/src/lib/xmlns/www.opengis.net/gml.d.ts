import * as Primitive from '../xml-primitives';
import * as xlink from '../www.w3.org/1999/xlink';

// Source files:
// http://schemas.opengis.net/wcs/1.0.0/gml4wcs.xsd


interface BaseType {
	_exists: boolean;
	_namespace: string;
}
/** This is the abstract root type of the geometric primitives. A geometric primitive is a geometric object that is not decomposed further into other primitives in the system. All primitives are oriented in the direction implied by the sequence of their coordinate tuples. */
interface _AbstractGeometricPrimitiveType extends _AbstractGeometryType {}
export interface AbstractGeometricPrimitiveType extends _AbstractGeometricPrimitiveType { constructor: { new(): AbstractGeometricPrimitiveType }; }
export var AbstractGeometricPrimitiveType: { new(): AbstractGeometricPrimitiveType };

/** Removes gml:name, gml:description, and gml:metadataLink from AbstractGMLType. */
interface _AbstractGeometryBaseType extends _AbstractGMLType {}
export interface AbstractGeometryBaseType extends _AbstractGeometryBaseType { constructor: { new(): AbstractGeometryBaseType }; }
export var AbstractGeometryBaseType: { new(): AbstractGeometryBaseType };

/** All geometry elements are derived directly or indirectly from this abstract supertype. A geometry element may have an identifying attribute ("gml:id"), a name (attribute "name") and a description (attribute "description"). It may be associated with a spatial reference system (attribute "srsName"). The following rules shall be adhered: - Every geometry type shall derive from this abstract type. - Every geometry element (i.e. an element of a geometry type) shall be directly or indirectly in the substitution group of _Geometry. */
interface _AbstractGeometryType extends _AbstractGeometryBaseType {
	/** No gid attribute added.In general srsName points to a CRS instance of gml:CoordinateReferenceSystemType (see coordinateReferenceSystems.xsd). For well known references it is not required that the CRS description exists at the location the URI points to (Note: These "WKCRS"-ids still have to be specified).  If no srsName attribute is given, the CRS must be specified as part of the larger context this geometry element is part of, e.g. a geometric aggregate. */
	srsName?: string;
}
export interface AbstractGeometryType extends _AbstractGeometryType { constructor: { new(): AbstractGeometryType }; }
export var AbstractGeometryType: { new(): AbstractGeometryType };

/** The optional attribute "gml:id" is omitted from this profile. All complexContent GML elements are directly or indirectly derived from this abstract supertype to establish a hierarchy of GML types that may be distinguished from other XML types by their ancestry. */
interface _AbstractGMLType extends BaseType {
	/** Contains a simple text description of the object, or refers to an external description. */
	description?: StringOrRefType;
	/** Contains or refers to a metadata package that contains metadata properties. */
	metaDataProperty?: MetaDataPropertyProxyType[];
	/** Identifier for the object, normally a descriptive name. An object may have several names, typically assigned by different authorities.  The authority for a name is indicated by the value of its (optional) codeSpace attribute.  The name may or may not be unique, as determined by the rules of the organization responsible for the codeSpace. */
	name?: CodeType[];
}
export interface AbstractGMLType extends _AbstractGMLType { constructor: { new(): AbstractGMLType }; }
export var AbstractGMLType: { new(): AbstractGMLType };

/** An abstract base type for complex metadata types. */
interface _AbstractMetaDataType extends BaseType {
	/** Database handle for the object.  It is of XML type “ID”, so is constrained to be unique in the XML document within which it occurs.  An external identifier for the object in the form of a URI may be constructed using standard XML and XPointer methods.  This is done by concatenating the URI for the document, a fragment separator “#”, and the value of the id attribute. */
	id?: string;
}
export interface AbstractMetaDataType extends _AbstractMetaDataType { constructor: { new(): AbstractMetaDataType }; }
export var AbstractMetaDataType: { new(): AbstractMetaDataType };

/** Encapsulates a ring to represent the surface boundary property of a surface. */
interface _AbstractRingPropertyType extends BaseType {
	LinearRing: LinearRingType;
}
export interface AbstractRingPropertyType extends _AbstractRingPropertyType { constructor: { new(): AbstractRingPropertyType }; }
export var AbstractRingPropertyType: { new(): AbstractRingPropertyType };

/** An abstraction of a ring to support surface boundaries of different complexity. */
interface _AbstractRingType extends _AbstractGeometryType {}
export interface AbstractRingType extends _AbstractRingType { constructor: { new(): AbstractRingType }; }
export var AbstractRingType: { new(): AbstractRingType };

/** An abstraction of a surface to support the different levels of complexity. A surface is always a continuous region of a plane. */
interface _AbstractSurfaceType extends _AbstractGeometricPrimitiveType {}
export interface AbstractSurfaceType extends _AbstractSurfaceType { constructor: { new(): AbstractSurfaceType }; }
export var AbstractSurfaceType: { new(): AbstractSurfaceType };

/** Bounding shape. */
interface _BoundingShapeType extends _EnvelopeProxyType {}
export interface BoundingShapeType extends _BoundingShapeType { constructor: { new(): BoundingShapeType }; }
export var BoundingShapeType: { new(): BoundingShapeType };

/** List of values on a uniform nominal scale.  List of text tokens.
  * In a list context a token should not include any spaces, so xsd:Name is used instead of xsd:string.
  * If a codeSpace attribute is present, then its value is a reference to
  * a Reference System for the value, a dictionary or code list. */
export type CodeListType = string[];

/** Name or code with an (optional) authority.  Text token.
  * If the codeSpace attribute is present, then its value should identify a dictionary, thesaurus
  * or authority for the term, such as the organisation who assigned the value,
  * or the dictionary from which it is taken.
  * A text string with an optional codeSpace attribute. */
interface _CodeType extends Primitive._string {
	codeSpace?: string;
}
export interface CodeType extends _CodeType { constructor: { new(): CodeType }; }
export var CodeType: { new(): CodeType };

/** DirectPosition instances hold the coordinates for a position within some coordinate reference system (CRS). Since DirectPositions, as data types, will often be included in larger objects (such as geometry elements) that have references to CRS, the "srsName" attribute will in general be missing, if this particular DirectPosition is included in a larger element with such a reference to a CRS. In this case, the CRS is implicitly assumed to take on the value of the containing object's CRS. */
export type DirectPositionType = number[];

/** XML List based on XML Schema double type.  An element of this type contains a space-separated list of double values */
export type doubleList = number[];

interface _EnvelopeProxyType extends BaseType {
	Envelope?: EnvelopeType;
	EnvelopeWithTimePeriod?: EnvelopeWithTimePeriodType;
}
interface EnvelopeProxyType extends _EnvelopeProxyType { constructor: { new(): EnvelopeProxyType }; }

/** Envelope defines an extent using a pair of positions defining opposite corners in arbitrary dimensions. */
interface _EnvelopeType extends _AbstractGeometryType {
	pos: DirectPositionType[];
}
export interface EnvelopeType extends _EnvelopeType { constructor: { new(): EnvelopeType }; }
export var EnvelopeType: { new(): EnvelopeType };

/** Envelope that includes also a temporal extent. */
interface _EnvelopeWithTimePeriodType extends _EnvelopeType {
	frame?: string;
	/** Direct representation of a temporal position. */
	timePosition: TimePositionType[];
}
export interface EnvelopeWithTimePeriodType extends _EnvelopeWithTimePeriodType { constructor: { new(): EnvelopeWithTimePeriodType }; }
export var EnvelopeWithTimePeriodType: { new(): EnvelopeWithTimePeriodType };

interface _GeometricPrimitiveProxyType extends _SurfaceProxyType {}
interface GeometricPrimitiveProxyType extends _GeometricPrimitiveProxyType { constructor: { new(): GeometricPrimitiveProxyType }; }

interface _GeometryProxyType extends _EnvelopeProxyType, _GridProxyType, _GeometricPrimitiveProxyType, _RingProxyType {}
interface GeometryProxyType extends _GeometryProxyType { constructor: { new(): GeometryProxyType }; }

interface _GMLProxyType extends _GeometryProxyType {}
interface GMLProxyType extends _GMLProxyType { constructor: { new(): GMLProxyType }; }

/** Provides grid coordinate values for the diametrically opposed corners of an envelope that bounds a section of grid. The value of a single coordinate is the number of offsets from the origin of the grid in the direction of a specific axis. */
interface _GridEnvelopeType extends BaseType {
	high: integerList;
	low: integerList;
}
export interface GridEnvelopeType extends _GridEnvelopeType { constructor: { new(): GridEnvelopeType }; }
export var GridEnvelopeType: { new(): GridEnvelopeType };

interface _GridLimitsType extends BaseType {
	GridEnvelope: GridEnvelopeType;
}
export interface GridLimitsType extends _GridLimitsType { constructor: { new(): GridLimitsType }; }
export var GridLimitsType: { new(): GridLimitsType };

interface _GridProxyType extends BaseType {
	Grid?: GridType;
	RectifiedGrid?: RectifiedGridType;
}
interface GridProxyType extends _GridProxyType { constructor: { new(): GridProxyType }; }

/** Implicitly defines an unrectified grid, which is a network composed of two or more sets of equally spaced parallel lines in which the members of each set intersect the members of the other sets at right angles. This profile does not extend AbstractGeometryType, so it defines the srsName attribute. */
interface _GridType extends _AbstractGeometryType {
	dimension: number;
	axisName: string[];
	limits: GridLimitsType;
}
export interface GridType extends _GridType { constructor: { new(): GridType }; }
export var GridType: { new(): GridType };

/** XML List based on XML Schema integer type.  An element of this type contains a space-separated list of integer values */
export type integerList = number[];

/** A LinearRing is defined by four or more coordinate tuples, with linear interpolation between them; the first and last coordinates must be coincident. */
interface _LinearRingType extends _AbstractRingType {
	pos: DirectPositionType[];
}
export interface LinearRingType extends _LinearRingType { constructor: { new(): LinearRingType }; }
export var LinearRingType: { new(): LinearRingType };

interface _MetaDataPropertyProxyType extends BaseType {
	/** Contains or refers to a metadata package that contains metadata properties. */
	metaDataProperty?: MetaDataPropertyType;
}
interface MetaDataPropertyProxyType extends _MetaDataPropertyProxyType { constructor: { new(): MetaDataPropertyProxyType }; }

/** Base type for complex metadata property types. */
interface _MetaDataPropertyType extends _MetaDataProxyType {
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
export interface MetaDataPropertyType extends _MetaDataPropertyType { constructor: { new(): MetaDataPropertyType }; }
export var MetaDataPropertyType: { new(): MetaDataPropertyType };

interface _MetaDataProxyType extends BaseType {}
interface MetaDataProxyType extends _MetaDataProxyType { constructor: { new(): MetaDataProxyType }; }

/** XML List based on XML Schema Name type.  An element of this type contains a space-separated list of Name values */
export type NameList = string[];

interface _ObjectProxyType extends _MetaDataProxyType, _GMLProxyType {}
interface ObjectProxyType extends _ObjectProxyType { constructor: { new(): ObjectProxyType }; }

/** A Point is defined by a single coordinate tuple. */
interface _PointType extends _AbstractGeometryType {
	pos: DirectPositionType;
}
export interface PointType extends _PointType { constructor: { new(): PointType }; }
export var PointType: { new(): PointType };

/** A Polygon is a special surface that is defined by a single surface patch. The boundary of this patch is coplanar and the polygon uses planar interpolation in its interior. It is backwards compatible with the Polygon of GML 2, GM_Polygon of ISO 19107 is implemented by PolygonPatch. */
interface _PolygonType extends _AbstractSurfaceType {
	/** A boundary of a surface consists of a number of rings. In the normal 2D case, one of these rings is distinguished as being the exterior boundary. In a general manifold this is not always possible, in which case all boundaries shall be listed as interior boundaries, and the exterior will be empty. */
	exterior?: AbstractRingPropertyType;
	/** A boundary of a surface consists of a number of rings. The "interior" rings seperate the surface / surface patch from the area enclosed by the rings. */
	interior?: AbstractRingPropertyType[];
}
export interface PolygonType extends _PolygonType { constructor: { new(): PolygonType }; }
export var PolygonType: { new(): PolygonType };

/** A rectified grid has an origin and vectors that define its post locations. */
interface _RectifiedGridType extends _GridType {
	offsetVector: VectorType[];
	origin: PointType;
}
export interface RectifiedGridType extends _RectifiedGridType { constructor: { new(): RectifiedGridType }; }
export var RectifiedGridType: { new(): RectifiedGridType };

/** A pattern or base for derived types used to specify complex types corresponding to a UML aggregation association.  An instance of this type serves as a pointer to a remote Object. */
interface _ReferenceType extends BaseType {
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
export interface ReferenceType extends _ReferenceType { constructor: { new(): ReferenceType }; }
export var ReferenceType: { new(): ReferenceType };

interface _RingProxyType extends BaseType {
	LinearRing?: LinearRingType;
}
interface RingProxyType extends _RingProxyType { constructor: { new(): RingProxyType }; }

/** This type is available wherever there is a need for a "text" type property. It is of string type, so the text can be included inline, but the value can also be referenced remotely via xlinks from the AssociationAttributeGroup. If the remote reference is present, then the value obtained by traversing the link should be used, and the string content of the element can be used for an annotation. */
interface _StringOrRefType extends Primitive._string {
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
export interface StringOrRefType extends _StringOrRefType { constructor: { new(): StringOrRefType }; }
export var StringOrRefType: { new(): StringOrRefType };

interface _SurfaceProxyType extends BaseType {
	Polygon?: PolygonType;
}
interface SurfaceProxyType extends _SurfaceProxyType { constructor: { new(): SurfaceProxyType }; }

/** Here we have collapsed the hierarchy of subtypes for temporal position in 19108
  * by defining a union of simple types for indicating temporal position relative to a
  * specific reference system.
  * Date and time may be indicated with varying degrees of precision:
  * year, year-month, date, or dateTime (all ISO 8601 format). Note
  * that the dateTime type does not allow right-truncation (i.e. omitting
  * seconds). An ordinal era may be referenced via URI, and a decimal value
  * can be used to indicate the distance from the scale origin (e.g. UNIX time,
  * GPS calendar). */
export type TemporalPositionType = string;
type _TemporalPositionType = Primitive._string;

/** Base type for describing temporal length or distance. The value space is further
  * constrained by subtypes that conform to the ISO 8601 or ISO 11404 standards. */
export type TimeDurationType = string;
type _TimeDurationType = Primitive._string;

/** This enumerated data type specifies values for indeterminate positions. */
export type TimeIndeterminateValueType = ("after" | "before" | "now" | "unknown");
interface _TimeIndeterminateValueType extends Primitive._string { content: TimeIndeterminateValueType; }

/** Indeterminate time values are also allowed, as described in ISO 19108. The indeterminatePosition
  * attribute can be used alone or it can qualify a specific value for temporal position (e.g. before
  * 2002-12, after 1019624400). For time values that identify position within a calendar, the
  * calendarEraName attribute provides the name of the calendar era to which the date is
  * referenced (e.g. the Meiji era of the Japanese calendar). */
interface _TimePositionType extends _TemporalPositionType {
	calendarEraName?: string;
	frame?: string;
	indeterminatePosition?: TimeIndeterminateValueType;
}
export interface TimePositionType extends _TimePositionType { constructor: { new(): TimePositionType }; }
export var TimePositionType: { new(): TimePositionType };

/** A Vector is an ordered set of numbers called coordinates that represent a position in a coordinate reference system (CRS). For some application the components of the position may be adjusted to yield a unit vector. */
export type VectorType = number[];

export interface document extends BaseType {
	boundedBy: BoundingShapeType;
	/** Contains a simple text description of the object, or refers to an external description. */
	description: StringOrRefType;
	EnvelopeWithTimePeriod: EnvelopeWithTimePeriodType;
	/** A boundary of a surface consists of a number of rings. In the normal 2D case, one of these rings is distinguished as being the exterior boundary. In a general manifold this is not always possible, in which case all boundaries shall be listed as interior boundaries, and the exterior will be empty. */
	exterior: AbstractRingPropertyType;
	/** A boundary of a surface consists of a number of rings. The "interior" rings seperate the surface / surface patch from the area enclosed by the rings. */
	interior: AbstractRingPropertyType;
	LinearRing: LinearRingType;
	/** Identifier for the object, normally a descriptive name. An object may have several names, typically assigned by different authorities.  The authority for a name is indicated by the value of its (optional) codeSpace attribute.  The name may or may not be unique, as determined by the rules of the organization responsible for the codeSpace. */
	name: CodeType;
	Polygon: PolygonType;
	pos: DirectPositionType;
	RectifiedGrid: RectifiedGridType;
	/** Direct representation of a temporal position. */
	timePosition: TimePositionType;
}
export var document: document;
