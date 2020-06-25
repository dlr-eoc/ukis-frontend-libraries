import * as Primitive from '../xml-primitives';
import * as smil20 from '../www.w3.org/2001/SMIL20';
import * as smil20lang from '../www.w3.org/2001/SMIL20/Language';
import * as xlink from '../www.w3.org/1999/xlink';

// Source files:
// http://schemas.opengis.net/gml/3.1.1/base/basicTypes.xsd
// http://schemas.opengis.net/gml/3.1.1/base/coordinateOperations.xsd
// http://schemas.opengis.net/gml/3.1.1/base/coordinateReferenceSystems.xsd
// http://schemas.opengis.net/gml/3.1.1/base/coordinateSystems.xsd
// http://schemas.opengis.net/gml/3.1.1/base/coverage.xsd
// http://schemas.opengis.net/gml/3.1.1/base/dataQuality.xsd
// http://schemas.opengis.net/gml/3.1.1/base/datums.xsd
// http://schemas.opengis.net/gml/3.1.1/base/defaultStyle.xsd
// http://schemas.opengis.net/gml/3.1.1/base/dictionary.xsd
// http://schemas.opengis.net/gml/3.1.1/base/direction.xsd
// http://schemas.opengis.net/gml/3.1.1/base/dynamicFeature.xsd
// http://schemas.opengis.net/gml/3.1.1/base/feature.xsd
// http://schemas.opengis.net/gml/3.1.1/base/geometryAggregates.xsd
// http://schemas.opengis.net/gml/3.1.1/base/geometryBasic0d1d.xsd
// http://schemas.opengis.net/gml/3.1.1/base/geometryBasic2d.xsd
// http://schemas.opengis.net/gml/3.1.1/base/geometryComplexes.xsd
// http://schemas.opengis.net/gml/3.1.1/base/geometryPrimitives.xsd
// http://schemas.opengis.net/gml/3.1.1/base/gml.xsd
// http://schemas.opengis.net/gml/3.1.1/base/gmlBase.xsd
// http://schemas.opengis.net/gml/3.1.1/base/grids.xsd
// http://schemas.opengis.net/gml/3.1.1/base/measures.xsd
// http://schemas.opengis.net/gml/3.1.1/base/observation.xsd
// http://schemas.opengis.net/gml/3.1.1/base/referenceSystems.xsd
// http://schemas.opengis.net/gml/3.1.1/base/temporal.xsd
// http://schemas.opengis.net/gml/3.1.1/base/temporalReferenceSystems.xsd
// http://schemas.opengis.net/gml/3.1.1/base/temporalTopology.xsd
// http://schemas.opengis.net/gml/3.1.1/base/topology.xsd
// http://schemas.opengis.net/gml/3.1.1/base/units.xsd
// http://schemas.opengis.net/gml/3.1.1/base/valueObjects.xsd


interface BaseType {
	_exists: boolean;
	_namespace: string;
}
/** Closeness of reported coordinate values to values accepted as or being true. */
interface _AbsoluteExternalPositionalAccuracyType extends _AbstractPositionalAccuracyType {
	/** A quantitative result defined by the evaluation procedure used, and identified by the measureDescription. */
	result: MeasureType;
}
export interface AbsoluteExternalPositionalAccuracyType extends _AbsoluteExternalPositionalAccuracyType { constructor: { new(): AbsoluteExternalPositionalAccuracyType }; }
export var AbsoluteExternalPositionalAccuracyType: { new(): AbsoluteExternalPositionalAccuracyType };

/** A continuous coverage as defined in ISO 19123 is a coverage that can return different values for the same feature attribute at different direct positions within a single spatiotemporal object in its spatiotemporal domain */
interface _AbstractContinuousCoverageType extends _AbstractCoverageType {
	coverageFunction?: CoverageFunctionType;
}
export interface AbstractContinuousCoverageType extends _AbstractContinuousCoverageType { constructor: { new(): AbstractContinuousCoverageType }; }
export var AbstractContinuousCoverageType: { new(): AbstractContinuousCoverageType };

/** Basic encoding for coordinate operation objects, simplifying and restricting the DefinitionType as needed. */
interface _AbstractCoordinateOperationBaseType extends _DefinitionType {
	/** Database handle for the object.  It is of XML type ID, so is constrained to be unique in the XML document within which it occurs.  An external identifier for the object in the form of a URI may be constructed using standard XML and XPointer methods.  This is done by concatenating the URI for the document, a fragment separator, and the value of the id attribute. */
	id: string;
	/** The name by which this coordinate operation is identified. */
	coordinateOperationName: CodeType;
	/** Contains or refers to a metadata package that contains metadata properties. */
	metaDataProperty?: MetaDataPropertyType[];
}
export interface AbstractCoordinateOperationBaseType extends _AbstractCoordinateOperationBaseType { constructor: { new(): AbstractCoordinateOperationBaseType }; }
export var AbstractCoordinateOperationBaseType: { new(): AbstractCoordinateOperationBaseType };

/** A mathematical operation on coordinates that transforms or converts coordinates to another coordinate reference system. Many but not all coordinate operations (from CRS A to CRS B) also uniquely define the inverse operation (from CRS B to CRS A). In some cases, the operation method algorithm for the inverse operation is the same as for the forward algorithm, but the signs of some operation parameter values must be reversed. In other cases, different algorithms are required for the forward and inverse operations, but the same operation parameter values are used. If (some) entirely different parameter values are needed, a different coordinate operation shall be defined. */
interface _AbstractCoordinateOperationType extends _AbstractCoordinateOperationBaseType {
	positionalAccuracy?: PositionalAccuracyProxyType[];
	/** An identification of a coordinate operation. */
	coordinateOperationID?: IdentifierType[];
	/** Version of the coordinate transformation (i.e., instantiation due to the stochastic nature of the parameters). Mandatory when describing a transformation, and should not be supplied for a conversion. */
	operationVersion?: string;
	/** Information about this object or code. Contains text or refers to external text. */
	remarks?: StringOrRefType;
	/** Description of domain of usage, or limitations of usage, for which this CRS object is valid. */
	scope?: string;
	/** Association to the source CRS (coordinate reference system) of this coordinate operation. */
	sourceCRS?: CRSRefType;
	/** Association to the target CRS (coordinate reference system) of this coordinate operation. For constraints on multiplicity of "sourceCRS" and "targetCRS", see UML model of Coordinate Operation package in OGC Abstract Specification topic 2. */
	targetCRS?: CRSRefType;
	/** Area or region in which this CRS object is valid. */
	validArea?: ExtentType;
}
export interface AbstractCoordinateOperationType extends _AbstractCoordinateOperationType { constructor: { new(): AbstractCoordinateOperationType }; }
export var AbstractCoordinateOperationType: { new(): AbstractCoordinateOperationType };

/** Basic encoding for coordinate system objects, simplifying and restricting the DefinitionType as needed. */
interface _AbstractCoordinateSystemBaseType extends _DefinitionType {
	/** Database handle for the object.  It is of XML type ID, so is constrained to be unique in the XML document within which it occurs.  An external identifier for the object in the form of a URI may be constructed using standard XML and XPointer methods.  This is done by concatenating the URI for the document, a fragment separator, and the value of the id attribute. */
	id: string;
	/** The name by which this coordinate system is identified. */
	csName: CodeType;
	/** Contains or refers to a metadata package that contains metadata properties. */
	metaDataProperty?: MetaDataPropertyType[];
}
export interface AbstractCoordinateSystemBaseType extends _AbstractCoordinateSystemBaseType { constructor: { new(): AbstractCoordinateSystemBaseType }; }
export var AbstractCoordinateSystemBaseType: { new(): AbstractCoordinateSystemBaseType };

/** A coordinate system (CS) is the set of coordinate system axes that spans a given coordinate space. A CS is derived from a set of (mathematical) rules for specifying how coordinates in a given space are to be assigned to points. The coordinate values in a coordinate tuple shall be recorded in the order in which the coordinate system axes associations are recorded, whenever those coordinates use a coordinate reference system that uses this coordinate system. This abstract complexType shall not be used, extended, or restricted, in an Application Schema, to define a concrete subtype with a meaning equivalent to a concrete subtype specified in this document. */
interface _AbstractCoordinateSystemType extends _AbstractCoordinateSystemBaseType {
	/** An identification of a coordinate system. */
	csID?: IdentifierType[];
	/** Information about this object or code. Contains text or refers to external text. */
	remarks?: StringOrRefType;
	/** Association to a coordinate system axis. */
	usesAxis: CoordinateSystemAxisRefType[];
}
export interface AbstractCoordinateSystemType extends _AbstractCoordinateSystemType { constructor: { new(): AbstractCoordinateSystemType }; }
export var AbstractCoordinateSystemType: { new(): AbstractCoordinateSystemType };

/** Abstract element which acts as the head of a substitution group for coverages. Note that a coverage is a GML feature. */
interface _AbstractCoverageType extends _AbstractFeatureType, _DomainSetProxyType {
	dimension?: number;
	rangeSet: RangeSetType;
}
export interface AbstractCoverageType extends _AbstractCoverageType { constructor: { new(): AbstractCoverageType }; }
export var AbstractCoverageType: { new(): AbstractCoverageType };

/** Curve segment defines a homogeneous segment of a curve. */
interface _AbstractCurveSegmentType extends BaseType {
	/** The attribute "numDerivativesInterior" specifies the type of continuity that is guaranteed interior to the curve. The default value of "0" means simple continuity, which is a mandatory minimum level of continuity. This level is referred to as "C 0 " in mathematical texts. A value of 1 means that the function and its first derivative are continuous at the appropriate end point: "C 1 " continuity. A value of "n" for any integer means the function and its first n derivatives are continuous: "C n " continuity.
	  * NOTE: Use of these values is only appropriate when the basic curve definition is an underdetermined system. For example, line string segments cannot support continuity above C 0 , since there is no spare control parameter to adjust the incoming angle at the end points of the segment. Spline functions on the other hand often have extra degrees of freedom on end segments that allow them to adjust the values of the derivatives to support C 1 or higher continuity. */
	numDerivativeInterior?: number;
	/** The attribute "numDerivativesAtEnd" specifies the type of continuity between this curve segment and its successor. If this is the last curve segment in the curve, one of these values, as appropriate, is ignored. The default value of "0" means simple continuity, which is a mandatory minimum level of continuity. This level is referred to as "C 0 " in mathematical texts. A value of 1 means that the function and its first derivative are continuous at the appropriate end point: "C 1 " continuity. A value of "n" for any integer means the function and its first n derivatives are continuous: "C n " continuity.
	  * NOTE: Use of these values is only appropriate when the basic curve definition is an underdetermined system. For example, line string segments cannot support continuity above C 0 , since there is no spare control parameter to adjust the incoming angle at the end points of the segment. Spline functions on the other hand often have extra degrees of freedom on end segments that allow them to adjust the values of the derivatives to support C 1 or higher continuity. */
	numDerivativesAtEnd?: number;
	/** The attribute "numDerivativesAtStart" specifies the type of continuity between this curve segment and its predecessor. If this is the first curve segment in the curve, one of these values, as appropriate, is ignored. The default value of "0" means simple continuity, which is a mandatory minimum level of continuity. This level is referred to as "C 0 " in mathematical texts. A value of 1 means that the function and its first derivative are continuous at the appropriate end point: "C 1 " continuity. A value of "n" for any integer means the function and its first n derivatives are continuous: "C n " continuity.
	  * NOTE: Use of these values is only appropriate when the basic curve definition is an underdetermined system. For example, line string segments cannot support continuity above C 0 , since there is no spare control parameter to adjust the incoming angle at the end points of the segment. Spline functions on the other hand often have extra degrees of freedom on end segments that allow them to adjust the values of the derivatives to support C 1 or higher continuity. */
	numDerivativesAtStart?: number;
}
export interface AbstractCurveSegmentType extends _AbstractCurveSegmentType { constructor: { new(): AbstractCurveSegmentType }; }
export var AbstractCurveSegmentType: { new(): AbstractCurveSegmentType };

/** An abstraction of a curve to support the different levels of complexity. The curve can always be viewed as a geometric
  * primitive, i.e. is continuous. */
interface _AbstractCurveType extends _AbstractGeometricPrimitiveType {}
export interface AbstractCurveType extends _AbstractCurveType { constructor: { new(): AbstractCurveType }; }
export var AbstractCurveType: { new(): AbstractCurveType };

/** Basic encoding for datum objects, simplifying and restricting the DefinitionType as needed. */
interface _AbstractDatumBaseType extends _DefinitionType {
	/** Database handle for the object.  It is of XML type ID, so is constrained to be unique in the XML document within which it occurs.  An external identifier for the object in the form of a URI may be constructed using standard XML and XPointer methods.  This is done by concatenating the URI for the document, a fragment separator, and the value of the id attribute. */
	id: string;
	/** The name by which this datum is identified. */
	datumName: CodeType;
	/** Contains or refers to a metadata package that contains metadata properties. */
	metaDataProperty?: MetaDataPropertyType[];
}
export interface AbstractDatumBaseType extends _AbstractDatumBaseType { constructor: { new(): AbstractDatumBaseType }; }
export var AbstractDatumBaseType: { new(): AbstractDatumBaseType };

/** A datum specifies the relationship of a coordinate system to the earth, thus creating a coordinate reference system. A datum uses a parameter or set of parameters that determine the location of the origin of the coordinate reference system. Each datum subtype can be associated with only specific types of coordinate systems. This abstract complexType shall not be used, extended, or restricted, in an Application Schema, to define a concrete subtype with a meaning equivalent to a concrete subtype specified in this document. */
interface _AbstractDatumType extends _AbstractDatumBaseType {
	/** Description, possibly including coordinates, of the point or points used to anchor the datum to the Earth. Also known as the "origin", especially for engineering and image datums. The codeSpace attribute can be used to reference a source of more detailed on this point or surface, or on a set of such descriptions.
	  * - For a geodetic datum, this point is also known as the fundamental point, which is traditionally the point where the relationship between geoid and ellipsoid is defined. In some cases, the "fundamental point" may consist of a number of points. In those cases, the parameters defining the geoid/ellipsoid relationship have been averaged for these points, and the averages adopted as the datum definition.
	  * - For an engineering datum, the anchor point may be a physical point, or it may be a point with defined coordinates in another CRS. When appropriate, the coordinates of this anchor point can be referenced in another document, such as referencing a GML feature that references or includes a point position.
	  * - For an image datum, the anchor point is usually either the centre of the image or the corner of the image.
	  * - For a temporal datum, this attribute is not defined. Instead of the anchor point, a temporal datum carries a separate time origin of type DateTime. */
	anchorPoint?: CodeType;
	/** An identification of a datum. */
	datumID?: IdentifierType[];
	/** The time after which this datum definition is valid. This time may be precise (e.g. 1997.0 for IRTF97) or merely a year (e.g. 1983 for NAD83). In the latter case, the epoch usually refers to the year in which a major recalculation of the geodetic control network, underlying the datum, was executed or initiated. An old datum can remain valid after a new datum is defined. Alternatively, a datum may be superseded by a later datum, in which case the realization epoch for the new datum defines the upper limit for the validity of the superseded datum. */
	realizationEpoch?: Date;
	/** Information about this object or code. Contains text or refers to external text. */
	remarks?: StringOrRefType;
	/** Description of domain of usage, or limitations of usage, for which this CRS object is valid. */
	scope?: string;
	/** Area or region in which this CRS object is valid. */
	validArea?: ExtentType;
}
export interface AbstractDatumType extends _AbstractDatumType { constructor: { new(): AbstractDatumType }; }
export var AbstractDatumType: { new(): AbstractDatumType };

/** A discrete coverage consists of a domain set, range set and optionally a coverage function. The domain set consists of either geometry or temporal objects, finite in number. The range set is comprised of a finite number of attribute values each of which is associated to every direct position within any single spatiotemporal object in the domain. In other words, the range values are constant on each spatiotemporal object in the domain. This coverage function maps each element from the coverage domain to an element in its range. This definition conforms to ISO 19123. */
interface _AbstractDiscreteCoverageType extends _AbstractCoverageType {
	coverageFunction?: CoverageFunctionType;
}
export interface AbstractDiscreteCoverageType extends _AbstractDiscreteCoverageType { constructor: { new(): AbstractDiscreteCoverageType }; }
export var AbstractDiscreteCoverageType: { new(): AbstractDiscreteCoverageType };

/** A feature collection contains zero or more features. */
interface _AbstractFeatureCollectionType extends _AbstractFeatureType {
	featureMember?: FeaturePropertyType[];
	featureMembers?: FeatureArrayPropertyType;
}
export interface AbstractFeatureCollectionType extends _AbstractFeatureCollectionType { constructor: { new(): AbstractFeatureCollectionType }; }
export var AbstractFeatureCollectionType: { new(): AbstractFeatureCollectionType };

/** An abstract feature provides a set of common properties, including id, metaDataProperty, name and description inherited from AbstractGMLType, plus boundedBy.    A concrete feature type must derive from this type and specify additional  properties in an application schema. A feature must possess an identifying attribute ('id' - 'fid' has been deprecated). */
interface _AbstractFeatureType extends _AbstractGMLType, _LocationProxyType {
	boundedBy?: BoundingShapeType;
}
export interface AbstractFeatureType extends _AbstractFeatureType { constructor: { new(): AbstractFeatureType }; }
export var AbstractFeatureType: { new(): AbstractFeatureType };

/** An abstract operation on coordinates that does not include any change of datum. The best-known example of a coordinate conversion is a map projection. The parameters describing coordinate conversions are defined rather than empirically derived. Note that some conversions have no parameters.
  *
  * This abstract complexType is expected to be extended for well-known operation methods with many Conversion instances, in Application Schemas that define operation-method-specialized element names and contents. This conversion uses an operation method, usually with associated parameter values. However, operation methods and parameter values are directly associated with concrete subtypes, not with this abstract type. All concrete types derived from this type shall extend this type to include a "usesMethod" element that references the "OperationMethod" element. Similarly, all concrete types derived from this type shall extend this type to include zero or more elements each named "uses...Value" that each use the type of an element substitutable for the "_generalParameterValue" element. */
interface _AbstractGeneralConversionType extends _AbstractCoordinateOperationType {
	/** Database handle for the object.  It is of XML type ID, so is constrained to be unique in the XML document within which it occurs.  An external identifier for the object in the form of a URI may be constructed using standard XML and XPointer methods.  This is done by concatenating the URI for the document, a fragment separator, and the value of the id attribute. */
	id: string;
	positionalAccuracy?: PositionalAccuracyProxyType[];
	/** An identification of a coordinate operation. */
	coordinateOperationID?: IdentifierType[];
	/** The name by which this coordinate operation is identified. */
	coordinateOperationName: CodeType;
	/** Contains or refers to a metadata package that contains metadata properties. */
	metaDataProperty?: MetaDataPropertyType[];
	/** Information about this object or code. Contains text or refers to external text. */
	remarks?: StringOrRefType;
	/** Description of domain of usage, or limitations of usage, for which this CRS object is valid. */
	scope?: string;
	/** Area or region in which this CRS object is valid. */
	validArea?: ExtentType;
}
export interface AbstractGeneralConversionType extends _AbstractGeneralConversionType { constructor: { new(): AbstractGeneralConversionType }; }
export var AbstractGeneralConversionType: { new(): AbstractGeneralConversionType };

/** A coordinate reference system that is defined by its coordinate conversion from another coordinate reference system (not by a datum). This abstract complexType shall not be used, extended, or restricted, in an Application Schema, to define a concrete subtype with a meaning equivalent to a concrete subtype specified in this document. */
interface _AbstractGeneralDerivedCRSType extends _AbstractReferenceSystemType {
	/** Association to the coordinate reference system used by this derived CRS. */
	baseCRS: CoordinateReferenceSystemRefType;
	/** Association to the coordinate conversion used to define this derived CRS. */
	definedByConversion: GeneralConversionRefType;
}
export interface AbstractGeneralDerivedCRSType extends _AbstractGeneralDerivedCRSType { constructor: { new(): AbstractGeneralDerivedCRSType }; }
export var AbstractGeneralDerivedCRSType: { new(): AbstractGeneralDerivedCRSType };

/** Association to an operation parameter or group, either referencing or containing the definition of that parameter or group. */
interface _AbstractGeneralOperationParameterRefType extends _GeneralOperationParameterProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface AbstractGeneralOperationParameterRefType extends _AbstractGeneralOperationParameterRefType { constructor: { new(): AbstractGeneralOperationParameterRefType }; }
export var AbstractGeneralOperationParameterRefType: { new(): AbstractGeneralOperationParameterRefType };

/** Abstract definition of a parameter or group of parameters used by an operation method. */
interface _AbstractGeneralOperationParameterType extends _DefinitionType {
	/** The minimum number of times that values for this parameter group or parameter are required. If this attribute is omitted, the minimum number is one. */
	minimumOccurs?: number;
}
export interface AbstractGeneralOperationParameterType extends _AbstractGeneralOperationParameterType { constructor: { new(): AbstractGeneralOperationParameterType }; }
export var AbstractGeneralOperationParameterType: { new(): AbstractGeneralOperationParameterType };

/** Abstract parameter value or group of parameter values.
  *
  * This abstract complexType is expected to be extended and restricted for well-known operation methods with many instances, in Application Schemas that define operation-method-specialized element names and contents. Specific parameter value elements are directly contained in concrete subtypes, not in this abstract type. All concrete types derived from this type shall extend this type to include one "...Value" element with an appropriate type, which should be one of the element types allowed in the ParameterValueType. In addition, all derived concrete types shall extend this type to include a "valueOfParameter" element that references one element substitutable for the "OperationParameter" element. */
interface _AbstractGeneralParameterValueType extends BaseType {}
export interface AbstractGeneralParameterValueType extends _AbstractGeneralParameterValueType { constructor: { new(): AbstractGeneralParameterValueType }; }
export var AbstractGeneralParameterValueType: { new(): AbstractGeneralParameterValueType };

/** An abstract operation on coordinates that usually includes a change of Datum. The parameters of a coordinate transformation are empirically derived from data containing the coordinates of a series of points in both coordinate reference systems. This computational process is usually "over-determined", allowing derivation of error (or accuracy) estimates for the transformation. Also, the stochastic nature of the parameters may result in multiple (different) versions of the same coordinate transformation.
  *
  * This abstract complexType is expected to be extended for well-known operation methods with many Transformation instances, in Application Schemas that define operation-method-specialized value element names and contents. This transformation uses an operation method with associated parameter values. However, operation methods and parameter values are directly associated with concrete subtypes, not with this abstract type. All concrete types derived from this type shall extend this type to include a "usesMethod" element that references one "OperationMethod" element. Similarly, all concrete types derived from this type shall extend this type to include one or more elements each named "uses...Value" that each use the type of an element substitutable for the "_generalParameterValue" element. */
interface _AbstractGeneralTransformationType extends _AbstractCoordinateOperationType {
	/** Database handle for the object.  It is of XML type ID, so is constrained to be unique in the XML document within which it occurs.  An external identifier for the object in the form of a URI may be constructed using standard XML and XPointer methods.  This is done by concatenating the URI for the document, a fragment separator, and the value of the id attribute. */
	id: string;
	positionalAccuracy?: PositionalAccuracyProxyType[];
	/** An identification of a coordinate operation. */
	coordinateOperationID?: IdentifierType[];
	/** The name by which this coordinate operation is identified. */
	coordinateOperationName: CodeType;
	/** Contains or refers to a metadata package that contains metadata properties. */
	metaDataProperty?: MetaDataPropertyType[];
	/** Version of the coordinate transformation (i.e., instantiation due to the stochastic nature of the parameters). Mandatory when describing a transformation, and should not be supplied for a conversion. */
	operationVersion: string;
	/** Information about this object or code. Contains text or refers to external text. */
	remarks?: StringOrRefType;
	/** Description of domain of usage, or limitations of usage, for which this CRS object is valid. */
	scope?: string;
	/** Association to the source CRS (coordinate reference system) of this coordinate operation. */
	sourceCRS: CRSRefType;
	/** Association to the target CRS (coordinate reference system) of this coordinate operation. For constraints on multiplicity of "sourceCRS" and "targetCRS", see UML model of Coordinate Operation package in OGC Abstract Specification topic 2. */
	targetCRS: CRSRefType;
	/** Area or region in which this CRS object is valid. */
	validArea?: ExtentType;
}
export interface AbstractGeneralTransformationType extends _AbstractGeneralTransformationType { constructor: { new(): AbstractGeneralTransformationType }; }
export var AbstractGeneralTransformationType: { new(): AbstractGeneralTransformationType };

/** This is the abstract root type of the geometric aggregates. */
interface _AbstractGeometricAggregateType extends _AbstractGeometryType {}
export interface AbstractGeometricAggregateType extends _AbstractGeometricAggregateType { constructor: { new(): AbstractGeometricAggregateType }; }
export var AbstractGeometricAggregateType: { new(): AbstractGeometricAggregateType };

/** This is the abstract root type of the geometric primitives. A geometric primitive is a geometric object that is not
  * decomposed further into other primitives in the system. All primitives are oriented in the direction implied by the sequence of their
  * coordinate tuples. */
interface _AbstractGeometricPrimitiveType extends _AbstractGeometryType {}
export interface AbstractGeometricPrimitiveType extends _AbstractGeometricPrimitiveType { constructor: { new(): AbstractGeometricPrimitiveType }; }
export var AbstractGeometricPrimitiveType: { new(): AbstractGeometricPrimitiveType };

/** All geometry elements are derived directly or indirectly from this abstract supertype. A geometry element may
  * have an identifying attribute ("gml:id"), a name (attribute "name") and a description (attribute "description"). It may be associated
  * with a spatial reference system (attribute "srsName"). The following rules shall be adhered: - Every geometry type shall derive
  * from this abstract type. - Every geometry element (i.e. an element of a geometry type) shall be directly or indirectly in the
  * substitution group of _Geometry. */
interface _AbstractGeometryType extends _AbstractGMLType {
	/** Ordered list of labels for all the axes of this CRS. The gml:axisAbbrev value should be used for these axis
	  * labels, after spaces and forbiddden characters are removed. When the srsName attribute is included, this attribute is optional.
	  * When the srsName attribute is omitted, this attribute shall also be omitted. */
	axisLabels?: NCNameList;
	/** This attribute is included for backward compatibility with GML 2 and is deprecated with GML 3.
	  * This identifer is superceded by "gml:id" inherited from AbstractGMLType. The attribute "gid" should not be used
	  * anymore and may be deleted in future versions of GML without further notice. */
	gid?: string;
	/** The "srsDimension" is the length of coordinate sequence (the number of entries in the list). This dimension is
	  * specified by the coordinate reference system. When the srsName attribute is omitted, this attribute shall be omitted. */
	srsDimension?: number;
	/** In general this reference points to a CRS instance of gml:CoordinateReferenceSystemType
	  * (see coordinateReferenceSystems.xsd). For well known references it is not required that the CRS description exists at the
	  * location the URI points to. If no srsName attribute is given, the CRS must be specified as part of the larger context this
	  * geometry element is part of, e.g. a geometric element like point, curve, etc. It is expected that this attribute will be specified
	  * at the direct position level only in rare cases. */
	srsName?: string;
	/** Ordered list of unit of measure (uom) labels for all the axes of this CRS. The value of the string in the
	  * gml:catalogSymbol should be used for this uom labels, after spaces and forbiddden characters are removed. When the
	  * axisLabels attribute is included, this attribute shall also be included. When the axisLabels attribute is omitted, this attribute
	  * shall also be omitted. */
	uomLabels?: NCNameList;
}
export interface AbstractGeometryType extends _AbstractGeometryType { constructor: { new(): AbstractGeometryType }; }
export var AbstractGeometryType: { new(): AbstractGeometryType };

/** All complexContent GML elements are directly or indirectly derived from this abstract supertype
  * to establish a hierarchy of GML types that may be distinguished from other XML types by their ancestry.
  * Elements in this hierarchy may have an ID and are thus referenceable. */
interface _AbstractGMLType extends BaseType {
	/** Database handle for the object.  It is of XML type ID, so is constrained to be unique in the XML document within which it occurs.  An external identifier for the object in the form of a URI may be constructed using standard XML and XPointer methods.  This is done by concatenating the URI for the document, a fragment separator, and the value of the id attribute. */
	id?: string;
	/** Contains a simple text description of the object, or refers to an external description. */
	description?: StringOrRefType;
	/** Contains or refers to a metadata package that contains metadata properties. */
	metaDataProperty?: MetaDataPropertyType[];
	/** Label for the object, normally a descriptive name. An object may have several names, typically assigned by different authorities.  The authority for a name is indicated by the value of its (optional) codeSpace attribute.  The name may or may not be unique, as determined by the rules of the organization responsible for the codeSpace. */
	name?: NameProxyType[];
}
export interface AbstractGMLType extends _AbstractGMLType { constructor: { new(): AbstractGMLType }; }
export var AbstractGMLType: { new(): AbstractGMLType };

/** A gridded surface is a parametric curve
  * surface derived from a rectangular grid in the parameter
  * space. The rows from this grid are control points for
  * horizontal surface curves; the columns are control points
  * for vertical surface curves. The working assumption is that
  * for a pair of parametric co-ordinates (s, t) that the
  * horizontal curves for each integer offset are calculated
  * and evaluated at "s". The defines a sequence of control
  * points:
  *
  * cn(s) : s  1 .....columns
  *
  * From this sequence a vertical curve is calculated for "s",
  * and evaluated at "t". In most cases, the order of
  * calculation (horizontal-vertical vs. vertical-horizontal)
  * does not make a difference. Where it does, the horizontal-
  * vertical order shall be the one used.
  *
  * Logically, any pair of curve interpolation types can lead
  * to a subtype of GriddedSurface. The following clauses
  * define some most commonly encountered surfaces that can
  * be represented in this manner. */
interface _AbstractGriddedSurfaceType extends _AbstractParametricCurveSurfaceType {
	/** The attribute columns gives the number
	  * of columns in the parameter grid. */
	columns?: number;
	row: RowType[];
	/** The attribute rows gives the number
	  * of rows in the parameter grid. */
	rows?: number;
}
export interface AbstractGriddedSurfaceType extends _AbstractGriddedSurfaceType { constructor: { new(): AbstractGriddedSurfaceType }; }
export var AbstractGriddedSurfaceType: { new(): AbstractGriddedSurfaceType };

/** An abstract base type for complex metadata types. */
interface _AbstractMetaDataType extends BaseType {
	/** Database handle for the object.  It is of XML type ID, so is constrained to be unique in the XML document within which it occurs.  An external identifier for the object in the form of a URI may be constructed using standard XML and XPointer methods.  This is done by concatenating the URI for the document, a fragment separator, and the value of the id attribute. */
	id?: string;
}
export interface AbstractMetaDataType extends _AbstractMetaDataType { constructor: { new(): AbstractMetaDataType }; }
export var AbstractMetaDataType: { new(): AbstractMetaDataType };


interface _AbstractParametricCurveSurfaceType extends _AbstractSurfacePatchType {}
export interface AbstractParametricCurveSurfaceType extends _AbstractParametricCurveSurfaceType { constructor: { new(): AbstractParametricCurveSurfaceType }; }
export var AbstractParametricCurveSurfaceType: { new(): AbstractParametricCurveSurfaceType };

/** Position error estimate (or accuracy) data. */
interface _AbstractPositionalAccuracyType extends BaseType {
	/** A description of the position accuracy parameter(s) provided. */
	measureDescription?: CodeType;
}
export interface AbstractPositionalAccuracyType extends _AbstractPositionalAccuracyType { constructor: { new(): AbstractPositionalAccuracyType }; }
export var AbstractPositionalAccuracyType: { new(): AbstractPositionalAccuracyType };

/** Basic encoding for reference system objects, simplifying and restricting the DefinitionType as needed. */
interface _AbstractReferenceSystemBaseType extends _DefinitionType {
	/** Database handle for the object.  It is of XML type ID, so is constrained to be unique in the XML document within which it occurs.  An external identifier for the object in the form of a URI may be constructed using standard XML and XPointer methods.  This is done by concatenating the URI for the document, a fragment separator, and the value of the id attribute. */
	id: string;
	/** Contains or refers to a metadata package that contains metadata properties. */
	metaDataProperty?: MetaDataPropertyType[];
	/** The name by which this reference system is identified. */
	srsName: CodeType;
}
export interface AbstractReferenceSystemBaseType extends _AbstractReferenceSystemBaseType { constructor: { new(): AbstractReferenceSystemBaseType }; }
export var AbstractReferenceSystemBaseType: { new(): AbstractReferenceSystemBaseType };

/** Description of a spatial and/or temporal reference system used by a dataset. */
interface _AbstractReferenceSystemType extends _AbstractReferenceSystemBaseType {
	/** Information about this object or code. Contains text or refers to external text. */
	remarks?: StringOrRefType;
	/** Description of domain of usage, or limitations of usage, for which this CRS object is valid. */
	scope?: string;
	/** An identification of a reference system. */
	srsID?: IdentifierType[];
	/** Area or region in which this CRS object is valid. */
	validArea?: ExtentType;
}
export interface AbstractReferenceSystemType extends _AbstractReferenceSystemType { constructor: { new(): AbstractReferenceSystemType }; }
export var AbstractReferenceSystemType: { new(): AbstractReferenceSystemType };

/** Encapsulates a ring to represent the surface boundary property of a surface. */
interface _AbstractRingPropertyType extends _RingProxyType {}
export interface AbstractRingPropertyType extends _AbstractRingPropertyType { constructor: { new(): AbstractRingPropertyType }; }
export var AbstractRingPropertyType: { new(): AbstractRingPropertyType };

/** An abstraction of a ring to support surface boundaries of different complexity. */
interface _AbstractRingType extends _AbstractGeometryType {}
export interface AbstractRingType extends _AbstractRingType { constructor: { new(): AbstractRingType }; }
export var AbstractRingType: { new(): AbstractRingType };

/** An abstraction of a solid to support the different levels of complexity. A solid is always contiguous. */
interface _AbstractSolidType extends _AbstractGeometricPrimitiveType {}
export interface AbstractSolidType extends _AbstractSolidType { constructor: { new(): AbstractSolidType }; }
export var AbstractSolidType: { new(): AbstractSolidType };

/** [complexType of] The value of the top-level property. It is an abstract element. Used as the head element of the substitution group for extensibility purposes. */
interface _AbstractStyleType extends _AbstractGMLType {}
export interface AbstractStyleType extends _AbstractStyleType { constructor: { new(): AbstractStyleType }; }
export var AbstractStyleType: { new(): AbstractStyleType };

/** A surface patch defines a homogenuous portion of a surface. */
interface _AbstractSurfacePatchType extends BaseType {}
export interface AbstractSurfacePatchType extends _AbstractSurfacePatchType { constructor: { new(): AbstractSurfacePatchType }; }
export var AbstractSurfacePatchType: { new(): AbstractSurfacePatchType };

/** An abstraction of a surface to support the different levels of complexity. A surface is always a continuous region of a plane. */
interface _AbstractSurfaceType extends _AbstractGeometricPrimitiveType {}
export interface AbstractSurfaceType extends _AbstractSurfaceType { constructor: { new(): AbstractSurfaceType }; }
export var AbstractSurfaceType: { new(): AbstractSurfaceType };

/** The abstract supertype for temporal complexes. */
interface _AbstractTimeComplexType extends _AbstractTimeObjectType {}
export interface AbstractTimeComplexType extends _AbstractTimeComplexType { constructor: { new(): AbstractTimeComplexType }; }
export var AbstractTimeComplexType: { new(): AbstractTimeComplexType };

/** The abstract supertype for temporal geometric primitives.
  * A temporal geometry must be associated with a temporal reference system via URI.
  * The Gregorian calendar with UTC is the default reference system, following ISO
  * 8601. Other reference systems in common use include the GPS calendar and the
  * Julian calendar. */
interface _AbstractTimeGeometricPrimitiveType extends _AbstractTimePrimitiveType {
	frame?: string;
}
export interface AbstractTimeGeometricPrimitiveType extends _AbstractTimeGeometricPrimitiveType { constructor: { new(): AbstractTimeGeometricPrimitiveType }; }
export var AbstractTimeGeometricPrimitiveType: { new(): AbstractTimeGeometricPrimitiveType };

/** The abstract supertype for temporal objects. */
interface _AbstractTimeObjectType extends _AbstractGMLType {}
export interface AbstractTimeObjectType extends _AbstractTimeObjectType { constructor: { new(): AbstractTimeObjectType }; }
export var AbstractTimeObjectType: { new(): AbstractTimeObjectType };

/** The abstract supertype for temporal primitives. */
interface _AbstractTimePrimitiveType extends _AbstractTimeObjectType {
	relatedTime?: RelatedTimeType[];
}
export interface AbstractTimePrimitiveType extends _AbstractTimePrimitiveType { constructor: { new(): AbstractTimePrimitiveType }; }
export var AbstractTimePrimitiveType: { new(): AbstractTimePrimitiveType };

/** A value in the time domain is measured relative to a temporal reference system. Common
  * types of reference systems include calendars, ordinal temporal reference systems, and
  * temporal coordinate systems (time elapsed since some epoch, e.g. UNIX time). */
interface _AbstractTimeReferenceSystemType extends _DefinitionType {
	domainOfValidity?: string;
}
export interface AbstractTimeReferenceSystemType extends _AbstractTimeReferenceSystemType { constructor: { new(): AbstractTimeReferenceSystemType }; }
export var AbstractTimeReferenceSystemType: { new(): AbstractTimeReferenceSystemType };

/** A timeslice encapsulates the time-varying properties of a dynamic feature--it
  * must be extended to represent a timestamped projection of a feature. The dataSource
  * property describes how the temporal data was acquired. */
interface _AbstractTimeSliceType extends _AbstractGMLType {
	dataSource?: StringOrRefType;
	validTime: TimePrimitivePropertyType;
}
export interface AbstractTimeSliceType extends _AbstractTimeSliceType { constructor: { new(): AbstractTimeSliceType }; }
export var AbstractTimeSliceType: { new(): AbstractTimeSliceType };

/** The element "complex" carries a reference to the complex containing this primitive. */
interface _AbstractTimeTopologyPrimitiveType extends _AbstractTimePrimitiveType {
	complex?: ReferenceType;
}
export interface AbstractTimeTopologyPrimitiveType extends _AbstractTimeTopologyPrimitiveType { constructor: { new(): AbstractTimeTopologyPrimitiveType }; }
export var AbstractTimeTopologyPrimitiveType: { new(): AbstractTimeTopologyPrimitiveType };

interface _AbstractTopologyType extends _AbstractGMLType {}
export interface AbstractTopologyType extends _AbstractTopologyType { constructor: { new(): AbstractTopologyType }; }
export var AbstractTopologyType: { new(): AbstractTopologyType };

interface _AbstractTopoPrimitiveType extends _AbstractTopologyType {
	container?: ContainerPropertyType;
	isolated?: IsolatedPropertyType[];
}
export interface AbstractTopoPrimitiveType extends _AbstractTopoPrimitiveType { constructor: { new(): AbstractTopoPrimitiveType }; }
export var AbstractTopoPrimitiveType: { new(): AbstractTopoPrimitiveType };

/** Graph-specific styling property. */
export type AesheticCriteriaType = ("MIN_CROSSINGS" | "MIN_AREA" | "MIN_BENDS" | "MAX_BENDS" | "UNIFORM_BENDS" | "MIN_SLOPES" | "MIN_EDGE_LENGTH" | "MAX_EDGE_LENGTH" | "UNIFORM_EDGE_LENGTH" | "MAX_ANGULAR_RESOLUTION" | "MIN_ASPECT_RATIO" | "MAX_SYMMETRIES");
interface _AesheticCriteriaType extends Primitive._string { content: AesheticCriteriaType; }

/** A placement takes a standard geometric
  * construction and places it in geographic space. It defines a
  * transformation from a constructive parameter space to the
  * co-ordinate space of the co-ordinate reference system being used.
  * Parameter spaces in formulae in this International Standard are
  * given as (u, v) in 2D and(u, v, w) in 3D. Co-ordinate reference
  * systems positions are given in formulae, in this International
  * Standard, by either (x, y) in 2D, or (x, y, z) in 3D.
  *
  * Affine placements are defined by linear transformations from
  * parameter space to the target co-ordiante space. 2-dimensional
  * Cartesian parameter space,(u,v) transforms into 3-dimensional co-
  * ordinate reference systems,(x,y,z) by using an affine
  * transformation,(u,v)->(x,y,z) which is defined :
  *
  * x	ux vx  	x0
  * u
  * y =	uy vy   + y0
  * v
  * x	uz vz	z0
  *
  * Then, given this equation, the location element of the
  * AffinePlacement is the direct position (x0, y0, z0), which is the
  * target position of the origin in (u, v). The two reference
  * directions (ux, uy, uz) and (vx, vy, vz) are the target
  * directions of the unit vectors at the origin in (u, v). */
interface _AffinePlacementType extends BaseType {
	/** Dimension of the constructive parameter
	  * space. */
	inDimension: number;
	/** The location property gives
	  * the target of the parameter space origin. This is the vector
	  * (x0, y0, z0) in the formulae above. */
	location: DirectPositionType;
	/** Dimension of the co-ordinate space. */
	outDimension: number;
	/** The attribute refDirection gives the
	  * target directions for the co-ordinate basis vectors of the
	  * parameter space. These are the columns of the matrix in the
	  * formulae given above. The number of directions given shall be
	  * inDimension. The dimension of the directions shall be
	  * outDimension. */
	refDirection: VectorType[];
}
export interface AffinePlacementType extends _AffinePlacementType { constructor: { new(): AffinePlacementType }; }
export var AffinePlacementType: { new(): AffinePlacementType };

/** Value of an angle quantity provided in either degree-minute-second format or single value format. */
interface _AngleChoiceType extends BaseType {
	angle: MeasureType;
	dmsAngle: DMSAngleType;
}
export interface AngleChoiceType extends _AngleChoiceType { constructor: { new(): AngleChoiceType }; }
export var AngleChoiceType: { new(): AngleChoiceType };

/** Value of an angle quantity recorded as a single number, with its units. Uses the MeasureType with the restriction that the unit of measure referenced by uom must be suitable for an angle, such as degrees or radians. */
interface _AngleType extends _MeasureType {}
export interface AngleType extends _AngleType { constructor: { new(): AngleType }; }
export var AngleType: { new(): AngleType };

/** An ArcByBulge is an arc string with only one arc unit, i.e. two control points and one bulge. */
interface _ArcByBulgeType extends _ArcStringByBulgeType {
	/** An arc is an arc string consiting of a single arc, the attribute is fixed to "1". */
	numArc?: number;
	/** The bulge controls the offset of each arc's midpoint. The "bulge" is the real number multiplier for the normal that determines the offset direction of the midpoint of each arc. The length of the bulge sequence is exactly 1 less than the length of the control point array, since a bulge is needed for each pair of adjacent points in the control point array. The bulge is not given by a distance, since it is simply a multiplier for the normal.
	  * The midpoint of the resulting arc is given by: midPoint = ((startPoint + endPoint)/2.0) + bulge*normal */
	bulge: number[];
	/** Deprecated with GML version 3.1.0. */
	coordinates: CoordinatesType;
	/** The attribute "normal" is a vector normal (perpendicular) to the chord of the arc, the line joining the first and last
	  * point of the arc. In a 2D coordinate system, there are only two possible directions for the normal, and it is often given as a signed real, indicating its length, with a positive sign indicating a left turn angle from the chord line, and a negative sign indicating a right turn from the chord. In 3D, the normal determines the plane of the arc, along with the start and endPoint of the arc.
	  * The normal is usually a unit vector, but this is not absolutely necessary. If the normal is a zero vector, the geometric object becomes equivalent to the straight line between the two end points. The length of the normal sequence is exactly the same as for the bulge sequence, 1 less than the control point sequence length. */
	normal: VectorType[];
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty
	  * is the predefined property which can be used by GML Application Schemas whenever a GML Feature has a property with a value that
	  * is substitutable for Point. */
	pointProperty: PointPropertyType[];
	/** Deprecated with GML version 3.1.0. Use "pointProperty" instead. Included for backwards compatibility with GML 3.0.0. */
	pointRep: PointPropertyType[];
	pos: DirectPositionType[];
	posList: DirectPositionListType;
}
export interface ArcByBulgeType extends _ArcByBulgeType { constructor: { new(): ArcByBulgeType }; }
export var ArcByBulgeType: { new(): ArcByBulgeType };

interface _ArcByCenterPointProxyType extends BaseType {
	ArcByCenterPoint?: ArcByCenterPointType;
	CircleByCenterPoint?: CircleByCenterPointType;
}
interface ArcByCenterPointProxyType extends _ArcByCenterPointProxyType { constructor: { new(): ArcByCenterPointProxyType }; }

/** This variant of the arc requires that the points on the arc have to be computed instead of storing the coordinates directly. The control point is the center point of the arc plus the radius and the bearing at start and end. This represenation can be used only in 2D. */
interface _ArcByCenterPointType extends _AbstractCurveSegmentType {
	/** The attribute "interpolation" specifies the curve interpolation mechanism used for this segment. This mechanism
	  * uses the control points and control parameters to determine the position of this curve segment. For an ArcByCenterPoint the interpolation is fixed as "circularArcCenterPointWithRadius". */
	interpolation: CurveInterpolationType;
	/** Since this type describes always a single arc, the attribute is fixed to "1". */
	numArc: number;
	/** Deprecated with GML version 3.1.0. */
	coordinates: CoordinatesType;
	/** The bearing of the arc at the end. */
	endAngle?: AngleType;
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty
	  * is the predefined property which can be used by GML Application Schemas whenever a GML Feature has a property with a value that
	  * is substitutable for Point. */
	pointProperty: PointPropertyType;
	/** Deprecated with GML version 3.1.0. Use "pointProperty" instead. Included for backwards compatibility with GML 3.0.0. */
	pointRep: PointPropertyType;
	pos: DirectPositionType;
	posList: DirectPositionListType;
	/** The radius of the arc. */
	radius: LengthType;
	/** The bearing of the arc at the start. */
	startAngle?: AngleType;
}
export interface ArcByCenterPointType extends _ArcByCenterPointType { constructor: { new(): ArcByCenterPointType }; }
export var ArcByCenterPointType: { new(): ArcByCenterPointType };

/** Integer number of arc-minutes in a degree-minute-second angular value. */
export type ArcMinutesType = number;
type _ArcMinutesType = Primitive._number;

interface _ArcProxyType extends BaseType {
	Arc?: ArcType;
	Circle?: CircleType;
}
interface ArcProxyType extends _ArcProxyType { constructor: { new(): ArcProxyType }; }

/** Number of arc-seconds in a degree-minute-second angular value. */
export type ArcSecondsType = number;
type _ArcSecondsType = Primitive._number;

interface _ArcStringByBulgeProxyType extends BaseType {
	ArcStringByBulge?: ArcStringByBulgeType;
	ArcByBulge?: ArcByBulgeType;
}
interface ArcStringByBulgeProxyType extends _ArcStringByBulgeProxyType { constructor: { new(): ArcStringByBulgeProxyType }; }

/** This variant of the arc computes the mid points of the arcs instead of storing the coordinates directly. The control point sequence consists of the start and end points of each arc plus the bulge. */
interface _ArcStringByBulgeType extends _AbstractCurveSegmentType {
	/** The attribute "interpolation" specifies the curve interpolation mechanism used for this segment. This mechanism
	  * uses the control points and control parameters to determine the position of this curve segment. For an ArcStringByBulge the interpolation is fixed as "circularArc2PointWithBulge". */
	interpolation: CurveInterpolationType;
	/** The number of arcs in the arc string can be explicitly stated in this attribute. The number of control points in the arc string must be numArc + 1. */
	numArc?: number;
	/** The bulge controls the offset of each arc's midpoint. The "bulge" is the real number multiplier for the normal that determines the offset direction of the midpoint of each arc. The length of the bulge sequence is exactly 1 less than the length of the control point array, since a bulge is needed for each pair of adjacent points in the control point array. The bulge is not given by a distance, since it is simply a multiplier for the normal.
	  * The midpoint of the resulting arc is given by: midPoint = ((startPoint + endPoint)/2.0) + bulge*normal */
	bulge: number[];
	/** Deprecated with GML version 3.1.0. */
	coordinates: CoordinatesType;
	/** The attribute "normal" is a vector normal (perpendicular) to the chord of the arc, the line joining the first and last
	  * point of the arc. In a 2D coordinate system, there are only two possible directions for the normal, and it is often given as a signed real, indicating its length, with a positive sign indicating a left turn angle from the chord line, and a negative sign indicating a right turn from the chord. In 3D, the normal determines the plane of the arc, along with the start and endPoint of the arc.
	  * The normal is usually a unit vector, but this is not absolutely necessary. If the normal is a zero vector, the geometric object becomes equivalent to the straight line between the two end points. The length of the normal sequence is exactly the same as for the bulge sequence, 1 less than the control point sequence length. */
	normal: VectorType[];
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty
	  * is the predefined property which can be used by GML Application Schemas whenever a GML Feature has a property with a value that
	  * is substitutable for Point. */
	pointProperty: PointPropertyType[];
	/** Deprecated with GML version 3.1.0. Use "pointProperty" instead. Included for backwards compatibility with GML 3.0.0. */
	pointRep: PointPropertyType[];
	pos: DirectPositionType[];
	posList: DirectPositionListType;
}
export interface ArcStringByBulgeType extends _ArcStringByBulgeType { constructor: { new(): ArcStringByBulgeType }; }
export var ArcStringByBulgeType: { new(): ArcStringByBulgeType };

interface _ArcStringProxyType extends _ArcProxyType {
	ArcString?: ArcStringType;
}
interface ArcStringProxyType extends _ArcStringProxyType { constructor: { new(): ArcStringProxyType }; }

/** An ArcString is a curve segment that uses three-point circular arc interpolation. */
interface _ArcStringType extends _AbstractCurveSegmentType {
	/** The attribute "interpolation" specifies the curve interpolation mechanism used for this segment. This mechanism
	  * uses the control points and control parameters to determine the position of this curve segment. For an ArcString the interpolation is fixed as "circularArc3Points". */
	interpolation: CurveInterpolationType;
	/** The number of arcs in the arc string can be explicitly stated in this attribute. The number of control points in the arc string must be 2 * numArc + 1. */
	numArc?: number;
	/** Deprecated with GML version 3.1.0. */
	coordinates: CoordinatesType;
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty
	  * is the predefined property which can be used by GML Application Schemas whenever a GML Feature has a property with a value that
	  * is substitutable for Point. */
	pointProperty: PointPropertyType[];
	/** Deprecated with GML version 3.1.0. Use "pointProperty" instead. Included for backwards compatibility with GML 3.0.0. */
	pointRep: PointPropertyType[];
	pos: DirectPositionType[];
	posList: DirectPositionListType;
}
export interface ArcStringType extends _ArcStringType { constructor: { new(): ArcStringType }; }
export var ArcStringType: { new(): ArcStringType };

/** An Arc is an arc string with only one arc unit, i.e. three control points. */
interface _ArcType extends _ArcStringType {
	/** An arc is an arc string consiting of a single arc, the attribute is fixed to "1". */
	numArc?: number;
	/** Deprecated with GML version 3.1.0. */
	coordinates: CoordinatesType;
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty
	  * is the predefined property which can be used by GML Application Schemas whenever a GML Feature has a property with a value that
	  * is substitutable for Point. */
	pointProperty: PointPropertyType[];
	/** Deprecated with GML version 3.1.0. Use "pointProperty" instead. Included for backwards compatibility with GML 3.0.0. */
	pointRep: PointPropertyType[];
	pos: DirectPositionType[];
	posList: DirectPositionListType;
}
export interface ArcType extends _ArcType { constructor: { new(): ArcType }; }
export var ArcType: { new(): ArcType };

/** Value of a spatial area quantity, with its units. Uses the MeasureType with the restriction that the unit of measure referenced by uom must be suitable for an area, such as square metres or square miles. */
interface _AreaType extends _MeasureType {}
export interface AreaType extends _AreaType { constructor: { new(): AreaType }; }
export var AreaType: { new(): AreaType };

/** A base for derived types used to specify complex types containing an array of objects, by unspecified UML association - either composition or aggregation.  An instance of this type contains elements representing Objects.
  *
  * Ideally this type would be derived by extension of AssociationType.
  * However, this leads to a non-deterministic content model, since both the base and the extension have minOccurs="0", and is thus prohibited in XML Schema. */
interface _ArrayAssociationType extends BaseType {
	/** This abstract element is the head of a substitutionGroup hierararchy which may contain either simpleContent or complexContent elements.  It is used to assert the model position of "class" elements declared in other GML schemas. */
	Object?: ObjectProxyType[];
}
export interface ArrayAssociationType extends _ArrayAssociationType { constructor: { new(): ArrayAssociationType }; }
export var ArrayAssociationType: { new(): ArrayAssociationType };

/** A non-abstract generic collection type that can be used as a document element for a homogeneous collection of any GML types - Geometries, Topologies, Features ... */
interface _ArrayType extends _AbstractGMLType {
	members?: ArrayAssociationType;
}
export interface ArrayType extends _ArrayType { constructor: { new(): ArrayType }; }
export var ArrayType: { new(): ArrayType };

interface _AssociationProxyType extends BaseType {}
interface AssociationProxyType extends _AssociationProxyType { constructor: { new(): AssociationProxyType }; }

/** A pattern or base for derived types used to specify complex types corresponding to an  unspecified UML association - either composition or aggregation.  Restricts the cardinality of Objects contained in the association to a maximum of one.  An instance of this type can contain an element representing an Object, or serve as a pointer to a remote Object.
  *
  * Descendents of this type can be restricted in an application schema to
  * * allow only specified classes as valid participants in the aggregation
  * * allow only association by reference (i.e. empty the content model) or by value (i.e. remove the xlinks).
  *
  * When used for association by reference, the value of the gml:remoteSchema attribute can be used to locate a schema fragment that constrains the target instance.
  *
  * In many cases it is desirable to impose the constraint prohibiting the occurence of both reference and value in the same instance, as that would be ambiguous.  This is accomplished by adding a directive in the annotation element of the element declaration.  This directive can be in the form of normative prose, or can use a Schematron pattern to automatically constrain co-occurrence - see the declaration for _strictAssociation below.
  *
  * If co-occurence is not prohibited, then both a link and content may be present.  If this occurs in an instance, then the rule for interpretation is that the instance found by traversing the href provides the normative value of the property, and should be used when possible.  The value(s) included as content may be used if the remote instance cannot be resolved.  This may be considered to be a "cached" version of the value(s). */
interface _AssociationType extends _ObjectProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface AssociationType extends _AssociationType { constructor: { new(): AssociationType }; }
export var AssociationType: { new(): AssociationType };

/** A non-abstract generic collection type that can be used as a document element for a collection of any GML types - Geometries, Topologies, Features ...
  *
  * FeatureCollections may only contain Features.  GeometryCollections may only contain Geometrys.  Bags are less constrained  they must contain objects that are substitutable for gml:_Object.  This may mix several levels, including Features, Definitions, Dictionaries, Geometries etc.
  *
  * The content model would ideally be
  * member 0..*
  * members 0..1
  * member 0..*
  * for maximum flexibility in building a collection from both homogeneous and distinct components:
  * included "member" elements each contain a single Object
  * an included "members" element contains a set of Objects
  *
  * However, this is non-deterministic, thus prohibited by XSD. */
interface _BagType extends _AbstractGMLType {
	member?: AssociationType[];
	members?: ArrayAssociationType;
}
export interface BagType extends _BagType { constructor: { new(): BagType }; }
export var BagType: { new(): BagType };

/** Base complex type for geometry, topology, label and graph styles. */
interface _BaseStyleDescriptorType extends _AbstractGMLType {
	animate?: smil20lang.animateType[];
	animateColor?: smil20lang.animateColorType[];
	animateMotion?: smil20lang.animateMotionType[];
	set?: smil20lang.setType[];
	spatialResolution?: ScaleType;
	styleVariation?: StyleVariationType[];
}
export interface BaseStyleDescriptorType extends _BaseStyleDescriptorType { constructor: { new(): BaseStyleDescriptorType }; }
export var BaseStyleDescriptorType: { new(): BaseStyleDescriptorType };

/** Definition of a unit of measure which is a base unit from the system of units.  A base unit cannot be derived by combination of other base units within this system.  Sometimes known as "fundamental unit". */
interface _BaseUnitType extends _UnitDefinitionType {
	unitsSystem: ReferenceType;
}
export interface BaseUnitType extends _BaseUnitType { constructor: { new(): BaseUnitType }; }
export var BaseUnitType: { new(): BaseUnitType };

/** Bezier curves are polynomial splines that use Bezier or Bernstein polynomials for interpolation purposes. It is a special case of the B-Spline curve with two knots. */
interface _BezierType extends _BSplineType {
	/** The attribute "interpolation" specifies the curve interpolation mechanism used for this segment. This mechanism
	  * uses the control points and control parameters to determine the position of this curve segment. For a Bezier the interpolation is fixed as "polynomialSpline". */
	interpolation: CurveInterpolationType;
	/** The attribute isPolynomial is set to true as this is a polynomial spline. */
	isPolynomial: boolean;
	/** The property "knotType" is not relevant for Bezier curve segments. */
	knotType: KnotTypesType;
	/** Deprecated with GML version 3.1.0. */
	coordinates: CoordinatesType;
	/** The attribute "degree" shall be the degree of the polynomial used for interpolation in this spline. */
	degree: number;
	/** The property "knot" shall be the sequence of distinct knots used to define the spline basis functions. */
	knot: KnotPropertyType[];
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty
	  * is the predefined property which can be used by GML Application Schemas whenever a GML Feature has a property with a value that
	  * is substitutable for Point. */
	pointProperty?: PointPropertyType[];
	/** Deprecated with GML version 3.1.0. Use "pointProperty" instead. Included for backwards compatibility with GML 3.0.0. */
	pointRep?: PointPropertyType[];
	pos?: DirectPositionType[];
	posList: DirectPositionListType;
}
export interface BezierType extends _BezierType { constructor: { new(): BezierType }; }
export var BezierType: { new(): BezierType };

/** XML List based on XML Schema boolean type.  An element of this type contains a space-separated list of boolean values {0,1,true,false} */
export type booleanList = boolean[];

/** Union of the XML Schema boolean type and the GML Nulltype.  An element which uses this type may have content which is either a boolean {0,1,true,false} or a value from Nulltype */
export type booleanOrNull = string;
type _booleanOrNull = Primitive._string;

/** XML List based on the union type defined above.  An element declared with this type contains a space-separated list of boolean values {0,1,true,false} with null values interspersed as needed */
export type booleanOrNullList = string[];

/** Property whose content is a Boolean value. */
interface _BooleanPropertyType extends _ValuePropertyType {
	/** A value from two-valued logic, using the XML Schema boolean type.  An instance may take the values {true, false, 1, 0}. */
	Boolean?: boolean;
}
export interface BooleanPropertyType extends _BooleanPropertyType { constructor: { new(): BooleanPropertyType }; }
export var BooleanPropertyType: { new(): BooleanPropertyType };

/** Makes boundedBy mandatory */
interface _BoundedFeatureType extends _AbstractFeatureType, _LocationProxyType {
	boundedBy: BoundingShapeType;
	/** Contains a simple text description of the object, or refers to an external description. */
	description?: StringOrRefType;
	/** Contains or refers to a metadata package that contains metadata properties. */
	metaDataProperty?: MetaDataPropertyType[];
	/** Label for the object, normally a descriptive name. An object may have several names, typically assigned by different authorities.  The authority for a name is indicated by the value of its (optional) codeSpace attribute.  The name may or may not be unique, as determined by the rules of the organization responsible for the codeSpace. */
	name?: NameProxyType[];
}
export interface BoundedFeatureType extends _BoundedFeatureType { constructor: { new(): BoundedFeatureType }; }
export var BoundedFeatureType: { new(): BoundedFeatureType };

/** Bounding shape. */
interface _BoundingShapeType extends _EnvelopeProxyType {
	Null: string;
}
export interface BoundingShapeType extends _BoundingShapeType { constructor: { new(): BoundingShapeType }; }
export var BoundingShapeType: { new(): BoundingShapeType };

interface _BSplineProxyType extends BaseType {
	BSpline?: BSplineType;
	Bezier?: BezierType;
}
interface BSplineProxyType extends _BSplineProxyType { constructor: { new(): BSplineProxyType }; }

/** A B-Spline is a piecewise parametric polynomial or rational curve described in terms of control points and basis functions. Knots are breakpoints on the curve that connect its pieces. They are given as a non-decreasing sequence of real numbers. If the weights in the knots are equal then it is a polynomial spline. The degree is the algebraic degree of the basis functions. */
interface _BSplineType extends _AbstractCurveSegmentType {
	/** The attribute "interpolation" specifies the curve interpolation mechanism used for this segment. This mechanism
	  * uses the control points and control parameters to determine the position of this curve segment. For a BSpline the interpolation can be either "polynomialSpline" or "rationalSpline", default is "polynomialSpline". */
	interpolation: CurveInterpolationType;
	/** The attribute isPolynomial is set to true if this is a polynomial spline. */
	isPolynomial?: boolean;
	/** The attribute "knotType" gives the type of knot distribution used in defining this spline. This is for information only
	  * and is set according to the different construction-functions. */
	knotType?: KnotTypesType;
	/** Deprecated with GML version 3.1.0. */
	coordinates: CoordinatesType;
	/** The attribute "degree" shall be the degree of the polynomial used for interpolation in this spline. */
	degree: number;
	/** The property "knot" shall be the sequence of distinct knots used to define the spline basis functions. */
	knot: KnotPropertyType[];
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty
	  * is the predefined property which can be used by GML Application Schemas whenever a GML Feature has a property with a value that
	  * is substitutable for Point. */
	pointProperty?: PointPropertyType[];
	/** Deprecated with GML version 3.1.0. Use "pointProperty" instead. Included for backwards compatibility with GML 3.0.0. */
	pointRep?: PointPropertyType[];
	pos?: DirectPositionType[];
	posList: DirectPositionListType;
}
export interface BSplineType extends _BSplineType { constructor: { new(): BSplineType }; }
export var BSplineType: { new(): BSplineType };

/** Calendar dates may be indicated with varying degrees of precision,
  * using year, year-month, date.
  * When used with non-Gregorian calendars based on years, months, days,
  * the same lexical representation should still be used, with leading zeros added if the
  * year value would otherwise have fewer than four digits.
  * time is used for a position that recurs daily (see clause 5.4.4.2 of ISO 19108:2002). */
export type CalDate = string;
type _CalDate = Primitive._string;

/** Association to a Cartesian coordinate system, either referencing or containing the definition of that coordinate system. */
interface _CartesianCSRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	CartesianCS?: CartesianCSType;
}
export interface CartesianCSRefType extends _CartesianCSRefType { constructor: { new(): CartesianCSRefType }; }
export var CartesianCSRefType: { new(): CartesianCSRefType };

/** A 1-, 2-, or 3-dimensional coordinate system. Gives the position of points relative to orthogonal straight axes in the 2- and 3-dimensional cases. In the 1-dimensional case, it contains a single straight coordinate axis. In the multi-dimensional case, all axes shall have the same length unit of measure. A CartesianCS shall have one, two, or three usesAxis associations. */
interface _CartesianCSType extends _AbstractCoordinateSystemType {}
export interface CartesianCSType extends _CartesianCSType { constructor: { new(): CartesianCSType }; }
export var CartesianCSType: { new(): CartesianCSType };

/** Restriction of list type to store a 2-point range of ordinal values. If one member is a null, then this is a single ended interval. */
export type CategoryExtentType = string[];

/** Property whose content is a Category. */
interface _CategoryPropertyType extends _ValuePropertyType {
	/** A term representing a classification.  It has an optional XML attribute codeSpace, whose value is a URI which identifies a dictionary, codelist or authority for the term. */
	Category?: CodeType;
}
export interface CategoryPropertyType extends _CategoryPropertyType { constructor: { new(): CategoryPropertyType }; }
export var CategoryPropertyType: { new(): CategoryPropertyType };

/** A CircleByCenterPoint is an ArcByCenterPoint with identical start and end angle to form a full circle. Again, this represenation can be used only in 2D. */
interface _CircleByCenterPointType extends _ArcByCenterPointType {}
export interface CircleByCenterPointType extends _CircleByCenterPointType { constructor: { new(): CircleByCenterPointType }; }
export var CircleByCenterPointType: { new(): CircleByCenterPointType };

/** A Circle is an arc whose ends coincide to form a simple closed loop. The "start" and "end" bearing are equal and shall be the bearing for the first controlPoint listed. The three control points must be distinct non-co-linear points for the Circle to be unambiguously defined. The arc is simply extended past the third control point until the first control point is encountered. */
interface _CircleType extends _ArcType {}
export interface CircleType extends _CircleType { constructor: { new(): CircleType }; }
export var CircleType: { new(): CircleType };

/** A clothoid, or Cornu's spiral, is plane
  * curve whose curvature is a fixed function of its length.
  * In suitably chosen co-ordinates it is given by Fresnel's
  * integrals.
  *
  * x(t) = 0-integral-t cos(AT*T/2)dT
  *
  * y(t) = 0-integral-t sin(AT*T/2)dT
  *
  * This geometry is mainly used as a transition curve between
  * curves of type straight line to circular arc or circular arc
  * to circular arc. With this curve type it is possible to
  * achieve a C2-continous transition between the above mentioned
  * curve types. One formula for the Clothoid is A*A = R*t where
  * A is constant, R is the varying radius of curvature along the
  * the curve and t is the length along and given in the Fresnel
  * integrals. */
interface _ClothoidType extends _AbstractCurveSegmentType {
	/** The endParameter is the arc length
	  * distance from the inflection point that will be the end
	  * point for this curve segment. This shall be upper limit
	  * used in the Fresnel integral and is the value of the
	  * constructive parameter of this curve segment at its
	  * start point. The startParameter can either be positive
	  * or negative. */
	endParameter: number;
	refLocation: ClothoidTypeRefLocationType;
	/** The element gives the value for the
	  * constant in the Fresnel's integrals. */
	scaleFactor: number;
	/** The startParameter is the arc length
	  * distance from the inflection point that will be the start
	  * point for this curve segment. This shall be lower limit
	  * used in the Fresnel integral and is the value of the
	  * constructive parameter of this curve segment at its start
	  * point. The startParameter can either be positive or
	  * negative.
	  * NOTE! If 0.0 (zero), lies between the startParameter and
	  * the endParameter of the clothoid, then the curve goes
	  * through the clothoid's inflection point, and the direction
	  * of its radius of curvature, given by the second
	  * derivative vector, changes sides with respect to the
	  * tangent vector. The term length distance for the */
	startParameter: number;
}
export interface ClothoidType extends _ClothoidType { constructor: { new(): ClothoidType }; }
export var ClothoidType: { new(): ClothoidType };

interface _ClothoidTypeRefLocationType extends BaseType {
	AffinePlacement: AffinePlacementType;
}
interface ClothoidTypeRefLocationType extends _ClothoidTypeRefLocationType { constructor: { new(): ClothoidTypeRefLocationType }; }

/** List of values on a uniform nominal scale.  List of text tokens.
  * In a list context a token should not include any spaces, so xsd:Name is used instead of xsd:string.
  * If a codeSpace attribute is present, then its value is a reference to
  * a Reference System for the value, a dictionary or code list. */
export type CodeListType = string[];

/** List of values on a uniform nominal scale.  List of text tokens.
  * In a list context a token should not include any spaces, so xsd:Name is used instead of xsd:string.
  * A member of the list may be a typed null.
  * If a codeSpace attribute is present, then its value is a reference to
  * a Reference System for the value, a dictionary or code list. */
export type CodeOrNullListType = string[];

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

export type CompassPointEnumeration = ("N" | "NNE" | "NE" | "ENE" | "E" | "ESE" | "SE" | "SSE" | "S" | "SSW" | "SW" | "WSW" | "W" | "WNW" | "NW" | "NNW");
interface _CompassPointEnumeration extends Primitive._string { content: CompassPointEnumeration; }

interface _CompositeCurvePropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	CompositeCurve?: CompositeCurveType;
}
export interface CompositeCurvePropertyType extends _CompositeCurvePropertyType { constructor: { new(): CompositeCurvePropertyType }; }
export var CompositeCurvePropertyType: { new(): CompositeCurvePropertyType };

/** A CompositeCurve is defined by a sequence of (orientable) curves such that the each curve in the sequence terminates at the start point of the subsequent curve in the list. */
interface _CompositeCurveType extends _AbstractCurveType {
	/** This property element either references a curve via the XLink-attributes or contains the curve element. A curve element is any element which is substitutable for "_Curve". */
	curveMember: CurvePropertyType[];
}
export interface CompositeCurveType extends _CompositeCurveType { constructor: { new(): CompositeCurveType }; }
export var CompositeCurveType: { new(): CompositeCurveType };

interface _CompositeSolidPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	CompositeSolid?: CompositeSolidType;
}
export interface CompositeSolidPropertyType extends _CompositeSolidPropertyType { constructor: { new(): CompositeSolidPropertyType }; }
export var CompositeSolidPropertyType: { new(): CompositeSolidPropertyType };

/** A composite solid is a geometry type with all the geometric properties of a (primitive) solid.
  * Essentially, a composite solid is a collection of solids that join in pairs on common boundary surfaces and which, when considered as a whole, form a single solid. */
interface _CompositeSolidType extends _AbstractSolidType {
	/** This property element either references a solid via the XLink-attributes or contains the solid element. A solid element is any element which is substitutable for "_Solid". */
	solidMember: SolidPropertyType[];
}
export interface CompositeSolidType extends _CompositeSolidType { constructor: { new(): CompositeSolidType }; }
export var CompositeSolidType: { new(): CompositeSolidType };

interface _CompositeSurfacePropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	CompositeSurface?: CompositeSurfaceType;
}
export interface CompositeSurfacePropertyType extends _CompositeSurfacePropertyType { constructor: { new(): CompositeSurfacePropertyType }; }
export var CompositeSurfacePropertyType: { new(): CompositeSurfacePropertyType };

/** A CompositeSurface is defined by a set of orientable surfaces. A composite surface is geometry type with all the geometric properties of a (primitive) surface. Essentially, a composite surface is a collection of surfaces that join in pairs on common boundary curves and which, when considered as a whole, form a single surface. */
interface _CompositeSurfaceType extends _AbstractSurfaceType {
	/** This property element either references a surface via the XLink-attributes or contains the surface element. A surface element is any element which is substitutable for "_Surface". */
	surfaceMember: SurfacePropertyType[];
}
export interface CompositeSurfaceType extends _CompositeSurfaceType { constructor: { new(): CompositeSurfaceType }; }
export var CompositeSurfaceType: { new(): CompositeSurfaceType };

interface _CompositeValueProxyType extends BaseType {
	/** Aggregate value built using the Composite pattern. */
	CompositeValue?: CompositeValueType;
	/** A Value Array is used for homogeneous arrays of primitive and aggregate values.   _ScalarValueList is preferred for arrays of Scalar Values since this is more efficient.  Since "choice" is not available for attribute groups, an external constraint (e.g. Schematron) would be required to enforce the selection of only one of these through schema validation */
	ValueArray?: ValueArrayType;
}
interface CompositeValueProxyType extends _CompositeValueProxyType { constructor: { new(): CompositeValueProxyType }; }

/** Aggregate value built from other Values using the Composite pattern. It contains zero or an arbitrary number of valueComponent elements, and zero or one valueComponents elements.  It may be used for strongly coupled aggregates (vectors, tensors) or for arbitrary collections of values. */
interface _CompositeValueType extends _AbstractGMLType {
	/** Element which refers to, or contains, a Value.  This version is used in CompositeValues. */
	valueComponent?: ValuePropertyType[];
	/** Element which refers to, or contains, a set of homogeneously typed Values. */
	valueComponents?: ValueArrayPropertyType;
}
export interface CompositeValueType extends _CompositeValueType { constructor: { new(): CompositeValueType }; }
export var CompositeValueType: { new(): CompositeValueType };

/** Association to a compound coordinate reference system, either referencing or containing the definition of that reference system. */
interface _CompoundCRSRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	CompoundCRS?: CompoundCRSType;
}
export interface CompoundCRSRefType extends _CompoundCRSRefType { constructor: { new(): CompoundCRSRefType }; }
export var CompoundCRSRefType: { new(): CompoundCRSRefType };

/** A coordinate reference system describing the position of points through two or more independent coordinate reference systems. */
interface _CompoundCRSType extends _AbstractReferenceSystemType {
	/** An association to a component coordinate reference system included in this compound coordinate reference system. */
	includesCRS: CoordinateReferenceSystemRefType[];
}
export interface CompoundCRSType extends _CompoundCRSType { constructor: { new(): CompoundCRSType }; }
export var CompoundCRSType: { new(): CompoundCRSType };

/** Association to a concatenated operation, either referencing or containing the definition of that concatenated operation. */
interface _ConcatenatedOperationRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	ConcatenatedOperation?: ConcatenatedOperationType;
}
export interface ConcatenatedOperationRefType extends _ConcatenatedOperationRefType { constructor: { new(): ConcatenatedOperationRefType }; }
export var ConcatenatedOperationRefType: { new(): ConcatenatedOperationRefType };

/** An ordered sequence of two or more single coordinate operations. The sequence of operations is constrained by the requirement that the source coordinate reference system of step (n+1) must be the same as the target coordinate reference system of step (n). The source coordinate reference system of the first step and the target coordinate reference system of the last step are the source and target coordinate reference system associated with the concatenated operation. Instead of a forward operation, an inverse operation may be used for one or more of the operation steps mentioned above, if the inverse operation is uniquely defined by the forward operation. */
interface _ConcatenatedOperationType extends _AbstractCoordinateOperationType {
	/** Association to a single operation. */
	usesSingleOperation: SingleOperationRefType[];
}
export interface ConcatenatedOperationType extends _ConcatenatedOperationType { constructor: { new(): ConcatenatedOperationType }; }
export var ConcatenatedOperationType: { new(): ConcatenatedOperationType };

/** A cone is a gridded surface given as a
  * family of conic sections whose control points vary linearly.
  * NOTE! A 5-point ellipse with all defining positions identical
  * is a point. Thus, a truncated elliptical cone can be given as a
  * 2x5 set of control points
  * ((P1, P1, P1, P1, P1), (P2, P3, P4, P5, P6)). P1 is the apex
  * of the cone. P2, P3,P4, P5 and P6 are any five distinct points
  * around the base ellipse of the cone. If the horizontal curves
  * are circles as opposed to ellipses, the a circular cone can
  * be constructed using ((P1, P1, P1),(P2, P3, P4)). The apex most
  * not coinside with the other plane. */
interface _ConeType extends _AbstractGriddedSurfaceType {
	horizontalCurveType: CurveInterpolationType;
	verticalCurveType: CurveInterpolationType;
}
export interface ConeType extends _ConeType { constructor: { new(): ConeType }; }
export var ConeType: { new(): ConeType };

interface _ContainerPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	Face?: FaceType;
	TopoSolid?: TopoSolidType;
}
export interface ContainerPropertyType extends _ContainerPropertyType { constructor: { new(): ContainerPropertyType }; }
export var ContainerPropertyType: { new(): ContainerPropertyType };

interface _ContinuousCoverageProxyType extends BaseType {}
interface ContinuousCoverageProxyType extends _ContinuousCoverageProxyType { constructor: { new(): ContinuousCoverageProxyType }; }

/** Definition of a unit of measure which is related to a preferred unit for this quantity type through a conversion formula.  A method for deriving this unit by algebraic combination of more primitive units, may also be provided. */
interface _ConventionalUnitType extends _UnitDefinitionType {
	/** This element is included when this unit has an accurate conversion to the preferred unit for this quantity type. */
	conversionToPreferredUnit: ConversionToPreferredUnitType;
	derivationUnitTerm?: DerivationUnitTermType[];
	/** This element is included when the correct definition of this unit is unknown, but this unit has a rough or inaccurate conversion to the preferred unit for this quantity type. */
	roughConversionToPreferredUnit: ConversionToPreferredUnitType;
}
export interface ConventionalUnitType extends _ConventionalUnitType { constructor: { new(): ConventionalUnitType }; }
export var ConventionalUnitType: { new(): ConventionalUnitType };

/** Association to a concrete general-purpose conversion, either referencing or containing the definition of that conversion. */
interface _ConversionRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	Conversion?: ConversionType;
}
export interface ConversionRefType extends _ConversionRefType { constructor: { new(): ConversionRefType }; }
export var ConversionRefType: { new(): ConversionRefType };

/** Relation of a unit to the preferred unit for this quantity type, specified by an arithmetic conversion (scaling and/or offset). A preferred unit is either a base unit or a derived unit selected for all units of one quantity type. The mandatory attribute "uom" shall reference the preferred unit that this conversion applies to. The conversion is specified by one of two alternative elements: "factor" or "formula". */
interface _ConversionToPreferredUnitType extends _UnitOfMeasureType {
	/** Specification of the scale factor by which a value using this unit of measure can be multiplied to obtain the corresponding value using the preferred unit of measure. */
	factor: number;
	/** Specification of the formula by which a value using this unit of measure can be converted to obtain the corresponding value using the preferred unit of measure. */
	formula: FormulaType;
}
export interface ConversionToPreferredUnitType extends _ConversionToPreferredUnitType { constructor: { new(): ConversionToPreferredUnitType }; }
export var ConversionToPreferredUnitType: { new(): ConversionToPreferredUnitType };

/** A concrete operation on coordinates that does not include any change of Datum. The best-known example of a coordinate conversion is a map projection. The parameters describing coordinate conversions are defined rather than empirically derived. Note that some conversions have no parameters.
  *
  * This concrete complexType can be used with all operation methods, without using an Application Schema that defines operation-method-specialized element names and contents, especially for methods with only one Conversion instance. */
interface _ConversionType extends _AbstractGeneralConversionType {
	/** Association to the operation method used by this coordinate operation. */
	usesMethod: OperationMethodRefType;
	/** Composition association to a parameter value used by this coordinate operation. */
	usesValue?: ParameterValueType[];
}
export interface ConversionType extends _ConversionType { constructor: { new(): ConversionType }; }
export var ConversionType: { new(): ConversionType };

interface _CoordinateOperationProxyType extends _SingleOperationProxyType {
	ConcatenatedOperation?: ConcatenatedOperationType;
}
interface CoordinateOperationProxyType extends _CoordinateOperationProxyType { constructor: { new(): CoordinateOperationProxyType }; }

/** Association to a coordinate operation, either referencing or containing the definition of that coordinate operation. */
interface _CoordinateOperationRefType extends _CoordinateOperationProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface CoordinateOperationRefType extends _CoordinateOperationRefType { constructor: { new(): CoordinateOperationRefType }; }
export var CoordinateOperationRefType: { new(): CoordinateOperationRefType };

interface _CoordinateReferenceSystemProxyType extends _GeneralDerivedCRSProxyType {
	GeographicCRS?: GeographicCRSType;
	VerticalCRS?: VerticalCRSType;
	GeocentricCRS?: GeocentricCRSType;
	EngineeringCRS?: EngineeringCRSType;
	ImageCRS?: ImageCRSType;
	TemporalCRS?: TemporalCRSType;
}
interface CoordinateReferenceSystemProxyType extends _CoordinateReferenceSystemProxyType { constructor: { new(): CoordinateReferenceSystemProxyType }; }

/** Association to a coordinate reference system, either referencing or containing the definition of that reference system. */
interface _CoordinateReferenceSystemRefType extends _CoordinateReferenceSystemProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface CoordinateReferenceSystemRefType extends _CoordinateReferenceSystemRefType { constructor: { new(): CoordinateReferenceSystemRefType }; }
export var CoordinateReferenceSystemRefType: { new(): CoordinateReferenceSystemRefType };

/** Tables or arrays of tuples.
  * May be used for text-encoding of values from a table.
  * Actually just a string, but allows the user to indicate which characters are used as separators.
  * The value of the 'cs' attribute is the separator for coordinate values,
  * and the value of the 'ts' attribute gives the tuple separator (a single space by default);
  * the default values may be changed to reflect local usage.
  * Defaults to CSV within a tuple, space between tuples.
  * However, any string content will be schema-valid. */
interface _CoordinatesType extends Primitive._string {
	cs: string;
	decimal: string;
	ts: string;
}
export interface CoordinatesType extends _CoordinatesType { constructor: { new(): CoordinatesType }; }
export var CoordinatesType: { new(): CoordinatesType };

/** Basic encoding for coordinate system axis objects, simplifying and restricting the DefinitionType as needed. */
interface _CoordinateSystemAxisBaseType extends _DefinitionType {
	/** Database handle for the object.  It is of XML type ID, so is constrained to be unique in the XML document within which it occurs.  An external identifier for the object in the form of a URI may be constructed using standard XML and XPointer methods.  This is done by concatenating the URI for the document, a fragment separator, and the value of the id attribute. */
	id: string;
	/** Contains or refers to a metadata package that contains metadata properties. */
	metaDataProperty?: MetaDataPropertyType[];
	/** Label for the object, normally a descriptive name. An object may have several names, typically assigned by different authorities.  The authority for a name is indicated by the value of its (optional) codeSpace attribute.  The name may or may not be unique, as determined by the rules of the organization responsible for the codeSpace. */
	name: NameProxyType[];
}
export interface CoordinateSystemAxisBaseType extends _CoordinateSystemAxisBaseType { constructor: { new(): CoordinateSystemAxisBaseType }; }
export var CoordinateSystemAxisBaseType: { new(): CoordinateSystemAxisBaseType };

/** Association to a coordinate system axis, either referencing or containing the definition of that axis. */
interface _CoordinateSystemAxisRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	CoordinateSystemAxis?: CoordinateSystemAxisType;
}
export interface CoordinateSystemAxisRefType extends _CoordinateSystemAxisRefType { constructor: { new(): CoordinateSystemAxisRefType }; }
export var CoordinateSystemAxisRefType: { new(): CoordinateSystemAxisRefType };

/** Definition of a coordinate system axis. */
interface _CoordinateSystemAxisType extends _CoordinateSystemAxisBaseType {
	/** Identifier of the unit of measure used for this coordinate system axis. The value of this coordinate in a coordinate tuple shall be recorded using this unit of measure, whenever those coordinates use a coordinate reference system that uses a coordinate system that uses this axis. */
	uom: string;
	/** The abbreviation used for this coordinate system axis. This abbreviation can be used to identify the ordinates in a coordinate tuple. Examples are X and Y. The codeSpace attribute can reference a source of more information on a set of standardized abbreviations, or on this abbreviation. */
	axisAbbrev: CodeType;
	/** Direction of this coordinate system axis (or in the case of Cartesian projected coordinates, the direction of this coordinate system axis at the origin). Examples: north or south, east or west, up or down. Within any set of coordinate system axes, only one of each pair of terms can be used. For earth-fixed CRSs, this direction is often approximate and intended to provide a human interpretable meaning to the axis. When a geodetic datum is used, the precise directions of the axes may therefore vary slightly from this approximate direction. Note that an EngineeringCRS can include specific descriptions of the directions of its coordinate system axes. For example, the path of a linear CRS axis can be referenced in another document, such as referencing a GML feature that references or includes a curve geometry. The codeSpace attribute can reference a source of more information on a set of standardized directions, or on this direction. */
	axisDirection: CodeType;
	/** An identification of a coordinate system axis. */
	axisID?: IdentifierType[];
	/** Information about this object or code. Contains text or refers to external text. */
	remarks?: StringOrRefType;
}
export interface CoordinateSystemAxisType extends _CoordinateSystemAxisType { constructor: { new(): CoordinateSystemAxisType }; }
export var CoordinateSystemAxisType: { new(): CoordinateSystemAxisType };

interface _CoordinateSystemProxyType extends BaseType {
	EllipsoidalCS?: EllipsoidalCSType;
	CartesianCS?: CartesianCSType;
	VerticalCS?: VerticalCSType;
	TemporalCS?: TemporalCSType;
	LinearCS?: LinearCSType;
	UserDefinedCS?: UserDefinedCSType;
	SphericalCS?: SphericalCSType;
	PolarCS?: PolarCSType;
	CylindricalCS?: CylindricalCSType;
	ObliqueCartesianCS?: ObliqueCartesianCSType;
}
interface CoordinateSystemProxyType extends _CoordinateSystemProxyType { constructor: { new(): CoordinateSystemProxyType }; }

/** Association to a coordinate system, either referencing or containing the definition of that coordinate system. */
interface _CoordinateSystemRefType extends _CoordinateSystemProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface CoordinateSystemRefType extends _CoordinateSystemRefType { constructor: { new(): CoordinateSystemRefType }; }
export var CoordinateSystemRefType: { new(): CoordinateSystemRefType };

/** Represents a coordinate tuple in one, two, or three dimensions. Deprecated with GML 3.0 and replaced by
  * DirectPositionType. */
interface _CoordType extends BaseType {
	X: number;
	Y?: number;
	Z?: number;
}
export interface CoordType extends _CoordType { constructor: { new(): CoordType }; }
export var CoordType: { new(): CoordType };

/** Restriction of list type to store a 2-point range of frequency values. If one member is a null, then this is a single ended interval. */
export type CountExtentType = string[];

/** Property whose content is a Count. */
interface _CountPropertyType extends _ValuePropertyType {
	/** An integer representing a frequency of occurrence. */
	Count?: number;
}
export interface CountPropertyType extends _CountPropertyType { constructor: { new(): CountPropertyType }; }
export var CountPropertyType: { new(): CountPropertyType };

/** An element of a covariance matrix. */
interface _CovarianceElementType extends BaseType {
	/** Column number of this covariance element value. */
	columnIndex: number;
	/** Value of covariance matrix element. */
	covariance: number;
	/** Row number of this covariance element value. */
	rowIndex: number;
}
export interface CovarianceElementType extends _CovarianceElementType { constructor: { new(): CovarianceElementType }; }
export var CovarianceElementType: { new(): CovarianceElementType };

/** Error estimate covariance matrix. */
interface _CovarianceMatrixType extends _AbstractPositionalAccuracyType {
	includesElement: CovarianceElementType[];
	unitOfMeasure: UnitOfMeasureType[];
}
export interface CovarianceMatrixType extends _CovarianceMatrixType { constructor: { new(): CovarianceMatrixType }; }
export var CovarianceMatrixType: { new(): CovarianceMatrixType };

/** The function or rule which defines the map from members of the domainSet to the range.
  * More functions will be added to this list */
interface _CoverageFunctionType extends _GridFunctionProxyType {
	/** Description of a rule for associating members from the domainSet with members of the rangeSet. */
	MappingRule: StringOrRefType;
}
export interface CoverageFunctionType extends _CoverageFunctionType { constructor: { new(): CoverageFunctionType }; }
export var CoverageFunctionType: { new(): CoverageFunctionType };

interface _CoverageProxyType extends _ContinuousCoverageProxyType, _DiscreteCoverageProxyType {}
interface CoverageProxyType extends _CoverageProxyType { constructor: { new(): CoverageProxyType }; }

interface _CRSProxyType extends _CoordinateReferenceSystemProxyType {
	CompoundCRS?: CompoundCRSType;
}
interface CRSProxyType extends _CRSProxyType { constructor: { new(): CRSProxyType }; }

/** Association to a CRS abstract coordinate reference system, either referencing or containing the definition of that CRS. */
interface _CRSRefType extends _CRSProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface CRSRefType extends _CRSRefType { constructor: { new(): CRSRefType }; }
export var CRSRefType: { new(): CRSRefType };

/** Cubic splines are similar to line strings in that they are a sequence of segments each with its own defining function. A cubic spline uses the control points and a set of derivative parameters to define a piecewise 3rd degree polynomial interpolation. Unlike line-strings, the parameterization by arc length is not necessarily still a polynomial.
  * The function describing the curve must be C2, that is, have a continuous 1st and 2nd derivative at all points, and pass through the controlPoints in the order given. Between the control points, the curve segment is defined by a cubic polynomial. At each control point, the polynomial changes in such a manner that the 1st and 2nd derivative vectors are the same from either side. The control parameters record must contain vectorAtStart, and vectorAtEnd which are the unit tangent vectors at controlPoint[1] and controlPoint[n] where n = controlPoint.count.
  * Note: only the direction of the vectors is relevant, not their length. */
interface _CubicSplineType extends _AbstractCurveSegmentType {
	/** The degree for a cubic spline is "3". */
	degree: number;
	/** The attribute "interpolation" specifies the curve interpolation mechanism used for this segment. This mechanism
	  * uses the control points and control parameters to determine the position of this curve segment. For a CubicSpline the interpolation is fixed as "cubicSpline". */
	interpolation: CurveInterpolationType;
	/** Deprecated with GML version 3.1.0. */
	coordinates: CoordinatesType;
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty
	  * is the predefined property which can be used by GML Application Schemas whenever a GML Feature has a property with a value that
	  * is substitutable for Point. */
	pointProperty: PointPropertyType[];
	/** Deprecated with GML version 3.1.0. Use "pointProperty" instead. Included for backwards compatibility with GML 3.0.0. */
	pointRep: PointPropertyType[];
	pos: DirectPositionType[];
	posList: DirectPositionListType;
	/** "vectorAtEnd" is the unit tangent vector at the end point of the spline. */
	vectorAtEnd: VectorType;
	/** "vectorAtStart" is the unit tangent vector at the start point of the spline. */
	vectorAtStart: VectorType;
}
export interface CubicSplineType extends _CubicSplineType { constructor: { new(): CubicSplineType }; }
export var CubicSplineType: { new(): CubicSplineType };

/** A container for an array of curves. The elements are always contained in the array property, referencing geometry elements
  * or arrays of geometry elements is not supported. */
interface _CurveArrayPropertyType extends BaseType {
	/** The "_Curve" element is the abstract head of the substituition group for all (continuous) curve elements. */
	Curve?: CurveProxyType[];
}
export interface CurveArrayPropertyType extends _CurveArrayPropertyType { constructor: { new(): CurveArrayPropertyType }; }
export var CurveArrayPropertyType: { new(): CurveArrayPropertyType };

/** CurveInterpolationType is a list of codes that may be used to identify the interpolation mechanisms specified by an
  * application schema. */
export type CurveInterpolationType = ("linear" | "geodesic" | "circularArc3Points" | "circularArc2PointWithBulge" | "circularArcCenterPointWithRadius" | "elliptical" | "clothoid" | "conic" | "polynomialSpline" | "cubicSpline" | "rationalSpline");
interface _CurveInterpolationType extends Primitive._string { content: CurveInterpolationType; }

/** A property that has a curve as its value domain can either be an appropriate geometry element encapsulated in an
  * element of this type or an XLink reference to a remote geometry element (where remote includes geometry elements located elsewhere
  * in the same document). Either the reference or the contained element must be given, but neither both nor none. */
interface _CurvePropertyType extends _CurveProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface CurvePropertyType extends _CurvePropertyType { constructor: { new(): CurvePropertyType }; }
export var CurvePropertyType: { new(): CurvePropertyType };

interface _CurveProxyType extends BaseType {
	CompositeCurve?: CompositeCurveType;
	LineString?: LineStringType;
	Curve?: CurveType;
	OrientableCurve?: OrientableCurveType;
}
interface CurveProxyType extends _CurveProxyType { constructor: { new(): CurveProxyType }; }

/** A container for an array of curve segments. */
interface _CurveSegmentArrayPropertyType extends BaseType {
	/** The "_CurveSegment" element is the abstract head of the substituition group for all curve segment elements, i.e. continuous segments of the same interpolation mechanism. */
	CurveSegment?: CurveSegmentProxyType[];
}
export interface CurveSegmentArrayPropertyType extends _CurveSegmentArrayPropertyType { constructor: { new(): CurveSegmentArrayPropertyType }; }
export var CurveSegmentArrayPropertyType: { new(): CurveSegmentArrayPropertyType };

interface _CurveSegmentProxyType extends _ArcByCenterPointProxyType, _ArcStringProxyType, _ArcStringByBulgeProxyType, _BSplineProxyType, _GeodesicStringProxyType {
	LineStringSegment?: LineStringSegmentType;
	Clothoid?: ClothoidType;
	CubicSpline?: CubicSplineType;
	OffsetCurve?: OffsetCurveType;
}
interface CurveSegmentProxyType extends _CurveSegmentProxyType { constructor: { new(): CurveSegmentProxyType }; }

/** Curve is a 1-dimensional primitive. Curves are continuous, connected, and have a measurable length in terms of the coordinate system.
  * A curve is composed of one or more curve segments. Each curve segment within a curve may be defined using a different interpolation method. The curve segments are connected to one another, with the end point of each segment except the last being the start point of the next segment in the segment list.
  * The orientation of the curve is positive. */
interface _CurveType extends _AbstractCurveType {
	/** This property element contains a list of curve segments. The order of the elements is significant and shall be preserved when processing the array. */
	segments: CurveSegmentArrayPropertyType;
}
export interface CurveType extends _CurveType { constructor: { new(): CurveType }; }
export var CurveType: { new(): CurveType };

/** A cylinder is a gridded surface given as a
  * family of circles whose positions vary along a set of parallel
  * lines, keeping the cross sectional horizontal curves of a
  * constant shape.
  * NOTE! Given the same working assumptions as in the previous
  * note, a Cylinder can be given by two circles, giving us the
  * control points of the form ((P1, P2, P3),(P4, P5, P6)). */
interface _CylinderType extends _AbstractGriddedSurfaceType {
	horizontalCurveType: CurveInterpolationType;
	verticalCurveType: CurveInterpolationType;
}
export interface CylinderType extends _CylinderType { constructor: { new(): CylinderType }; }
export var CylinderType: { new(): CylinderType };

/** Association to a cylindrical coordinate system, either referencing or containing the definition of that coordinate system. */
interface _CylindricalCSRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	CylindricalCS?: CylindricalCSType;
}
export interface CylindricalCSRefType extends _CylindricalCSRefType { constructor: { new(): CylindricalCSRefType }; }
export var CylindricalCSRefType: { new(): CylindricalCSRefType };

/** A three-dimensional coordinate system consisting of a polar coordinate system extended by a straight coordinate axis perpendicular to the plane spanned by the polar coordinate system. A CylindricalCS shall have three usesAxis associations. */
interface _CylindricalCSType extends _AbstractCoordinateSystemType {}
export interface CylindricalCSType extends _CylindricalCSType { constructor: { new(): CylindricalCSType }; }
export var CylindricalCSType: { new(): CylindricalCSType };

interface _DataBlockType extends BaseType {
	doubleOrNullTupleList: doubleOrNullList;
	rangeParameters: RangeParametersType;
	tupleList: CoordinatesType;
}
export interface DataBlockType extends _DataBlockType { constructor: { new(): DataBlockType }; }
export var DataBlockType: { new(): DataBlockType };

interface _DatumProxyType extends BaseType {
	EngineeringDatum?: EngineeringDatumType;
	ImageDatum?: ImageDatumType;
	VerticalDatum?: VerticalDatumType;
	TemporalDatum?: TemporalDatumType;
	GeodeticDatum?: GeodeticDatumType;
}
interface DatumProxyType extends _DatumProxyType { constructor: { new(): DatumProxyType }; }

/** Association to a datum, either referencing or containing the definition of that datum. */
interface _DatumRefType extends _DatumProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface DatumRefType extends _DatumRefType { constructor: { new(): DatumRefType }; }
export var DatumRefType: { new(): DatumRefType };

/** Decimal number of arc-minutes in a degree-minute angular value. */
export type DecimalMinutesType = number;
type _DecimalMinutesType = Primitive._number;

/** [complexType of] Top-level property. Used in application schemas to "attach" the styling information to GML data. The link between the data and the style should be established through this property only. */
interface _DefaultStylePropertyType extends _StyleProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	about?: string;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface DefaultStylePropertyType extends _DefaultStylePropertyType { constructor: { new(): DefaultStylePropertyType }; }
export var DefaultStylePropertyType: { new(): DefaultStylePropertyType };

/** A proxy entry in a dictionary of definitions. An element of this type contains a reference to a remote definition object. This entry is expected to be convenient in allowing multiple elements in one XML document to contain short (abbreviated XPointer) references, which are resolved to an external definition provided in a Dictionary element in the same XML document. */
interface _DefinitionProxyType extends _DefinitionType {
	definitionRef: ReferenceType;
}
export interface DefinitionProxyType extends _DefinitionProxyType { constructor: { new(): DefinitionProxyType }; }
export var DefinitionProxyType: { new(): DefinitionProxyType };

interface _DefinitionProxyType_2 extends _CoordinateSystemProxyType, _DatumProxyType, _ReferenceSystemProxyType, _CoordinateOperationProxyType, _GeneralOperationParameterProxyType, _TimeReferenceSystemProxyType, _UnitDefinitionProxyType {
	Definition?: DefinitionType;
	TimeCalendarEra?: TimeCalendarEraType;
	CoordinateSystemAxis?: CoordinateSystemAxisType;
	PrimeMeridian?: PrimeMeridianType;
	Ellipsoid?: EllipsoidType;
	DefinitionProxy?: DefinitionProxyType;
	OperationMethod?: OperationMethodType;
	DefinitionCollection?: DictionaryType;
	Dictionary?: DictionaryType;
}
interface DefinitionProxyType_2 extends _DefinitionProxyType_2 { constructor: { new(): DefinitionProxyType_2 }; }

/** A definition, which can be included in or referenced by a dictionary. In this extended type, the inherited "description" optional element can hold the definition whenever only text is needed. The inherited "name" elements can provide one or more brief terms for which this is the definition. The inherited "metaDataProperty" elements can be used to reference or include more information about this definition.
  * The gml:id attribute is required - it must be possible to reference this definition using this handle. */
interface _DefinitionType extends _AbstractGMLType {
	/** Database handle for the object.  It is of XML type ID, so is constrained to be unique in the XML document within which it occurs.  An external identifier for the object in the form of a URI may be constructed using standard XML and XPointer methods.  This is done by concatenating the URI for the document, a fragment separator, and the value of the id attribute. */
	id: string;
	/** Contains a simple text description of the object, or refers to an external description. */
	description?: StringOrRefType;
	/** Contains or refers to a metadata package that contains metadata properties. */
	metaDataProperty?: MetaDataPropertyType[];
	/** Label for the object, normally a descriptive name. An object may have several names, typically assigned by different authorities.  The authority for a name is indicated by the value of its (optional) codeSpace attribute.  The name may or may not be unique, as determined by the rules of the organization responsible for the codeSpace. */
	name: NameProxyType[];
}
export interface DefinitionType extends _DefinitionType { constructor: { new(): DefinitionType }; }
export var DefinitionType: { new(): DefinitionType };

/** Integer number of degrees, plus the angle direction. This element can be used for geographic Latitude and Longitude. For Latitude, the XML attribute direction can take the values "N" or "S", meaning North or South of the equator. For Longitude, direction can take the values "E" or "W", meaning East or West of the prime meridian. This element can also be used for other angles. In that case, the direction can take the values "+" or "-" (of SignType), in the specified rotational direction from a specified reference direction. */
interface _DegreesType extends _DegreeValueType {
	direction: string;
}
export interface DegreesType extends _DegreesType { constructor: { new(): DegreesType }; }
export var DegreesType: { new(): DegreesType };

type DegreesTypeDirectionType = string;
type _DegreesTypeDirectionType = Primitive._string;

/** Integer number of degrees in a degree-minute-second or degree-minute angular value, without indication of direction. */
export type DegreeValueType = number;
type _DegreeValueType = Primitive._number;

/** Definition of one unit term for a derived unit of measure. This unit term references another unit of measure (uom) and provides an integer exponent applied to that unit in defining the compound unit. The exponent can be positive or negative, but not zero. */
interface _DerivationUnitTermType extends _UnitOfMeasureType {
	exponent: number;
}
export interface DerivationUnitTermType extends _DerivationUnitTermType { constructor: { new(): DerivationUnitTermType }; }
export var DerivationUnitTermType: { new(): DerivationUnitTermType };

/** Association to a non-projected derived coordinate reference system, either referencing or containing the definition of that reference system. */
interface _DerivedCRSRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	DerivedCRS?: DerivedCRSType;
}
export interface DerivedCRSRefType extends _DerivedCRSRefType { constructor: { new(): DerivedCRSRefType }; }
export var DerivedCRSRefType: { new(): DerivedCRSRefType };

/** A coordinate reference system that is defined by its coordinate conversion from another coordinate reference system but is not a projected coordinate reference system. This category includes coordinate reference systems derived from a projected coordinate reference system. */
interface _DerivedCRSType extends _AbstractGeneralDerivedCRSType {
	derivedCRSType: DerivedCRSTypeType;
	/** Association to the coordinate system used by this CRS. */
	usesCS: CoordinateSystemRefType;
}
export interface DerivedCRSType extends _DerivedCRSType { constructor: { new(): DerivedCRSType }; }
export var DerivedCRSType: { new(): DerivedCRSType };

/** Type of a derived coordinate reference system. */
interface _DerivedCRSTypeType extends _CodeType {
	/** Reference to a source of information specifying the values and meanings of all the allowed string values for this DerivedCRSTypeType. */
	codeSpace: string;
}
export interface DerivedCRSTypeType extends _DerivedCRSTypeType { constructor: { new(): DerivedCRSTypeType }; }
export var DerivedCRSTypeType: { new(): DerivedCRSTypeType };

/** Definition of a unit of measure which is defined through algebraic combination of more primitive units, which are usually base units from a particular system of units. Derived units based directly on base units are usually preferred for quantities other than the base units or fundamental quantities within a system.  If a derived unit is not the preferred unit, the ConventionalUnit element should be used instead. */
interface _DerivedUnitType extends _UnitDefinitionType {
	derivationUnitTerm: DerivationUnitTermType[];
}
export interface DerivedUnitType extends _DerivedUnitType { constructor: { new(): DerivedUnitType }; }
export var DerivedUnitType: { new(): DerivedUnitType };

interface _DictionaryEntryProxyType extends BaseType {
	dictionaryEntry?: DictionaryEntryType;
	definitionMember?: DictionaryEntryType;
}
interface DictionaryEntryProxyType extends _DictionaryEntryProxyType { constructor: { new(): DictionaryEntryProxyType }; }

/** An entry in a dictionary of definitions. An instance of this type contains or refers to a definition object.
  *
  * The number of definitions contained in this dictionaryEntry is restricted to one, but a DefinitionCollection or Dictionary that contains multiple definitions can be substituted if needed. Specialized descendents of this dictionaryEntry might be restricted in an application schema to allow only including specified types of definitions as valid entries in a dictionary. */
interface _DictionaryEntryType extends _DefinitionProxyType_2 {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface DictionaryEntryType extends _DictionaryEntryType { constructor: { new(): DictionaryEntryType }; }
export var DictionaryEntryType: { new(): DictionaryEntryType };

/** A non-abstract bag that is specialized for use as a dictionary which contains a set of definitions. These definitions are referenced from other places, in the same and different XML documents. In this restricted type, the inherited optional "description" element can be used for a description of this dictionary. The inherited optional "name" element can be used for the name(s) of this dictionary. The inherited "metaDataProperty" elements can be used to reference or contain more information about this dictionary. The inherited required gml:id attribute allows the dictionary to be referenced using this handle. */
interface _DictionaryType extends _DefinitionType {
	dictionaryEntry?: DictionaryEntryProxyType[];
	indirectEntry?: IndirectEntryType[];
}
export interface DictionaryType extends _DictionaryType { constructor: { new(): DictionaryType }; }
export var DictionaryType: { new(): DictionaryType };

interface _DirectedEdgePropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	orientation: SignType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	Edge?: EdgeType;
}
export interface DirectedEdgePropertyType extends _DirectedEdgePropertyType { constructor: { new(): DirectedEdgePropertyType }; }
export var DirectedEdgePropertyType: { new(): DirectedEdgePropertyType };

interface _DirectedFacePropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	orientation: SignType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	Face?: FaceType;
}
export interface DirectedFacePropertyType extends _DirectedFacePropertyType { constructor: { new(): DirectedFacePropertyType }; }
export var DirectedFacePropertyType: { new(): DirectedFacePropertyType };

interface _DirectedNodePropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	orientation: SignType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	Node?: NodeType;
}
export interface DirectedNodePropertyType extends _DirectedNodePropertyType { constructor: { new(): DirectedNodePropertyType }; }
export var DirectedNodePropertyType: { new(): DirectedNodePropertyType };

interface _DirectedObservationAtDistanceType extends _DirectedObservationType {
	distance: MeasureType;
}
export interface DirectedObservationAtDistanceType extends _DirectedObservationAtDistanceType { constructor: { new(): DirectedObservationAtDistanceType }; }
export var DirectedObservationAtDistanceType: { new(): DirectedObservationAtDistanceType };

interface _DirectedObservationProxyType extends BaseType {
	DirectedObservation?: DirectedObservationType;
	DirectedObservationAtDistance?: DirectedObservationAtDistanceType;
}
interface DirectedObservationProxyType extends _DirectedObservationProxyType { constructor: { new(): DirectedObservationProxyType }; }

interface _DirectedObservationType extends _ObservationType {
	direction: DirectionPropertyType;
}
export interface DirectedObservationType extends _DirectedObservationType { constructor: { new(): DirectedObservationType }; }
export var DirectedObservationType: { new(): DirectedObservationType };

interface _DirectedTopoSolidPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	orientation: SignType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	TopoSolid?: TopoSolidType;
}
export interface DirectedTopoSolidPropertyType extends _DirectedTopoSolidPropertyType { constructor: { new(): DirectedTopoSolidPropertyType }; }
export var DirectedTopoSolidPropertyType: { new(): DirectedTopoSolidPropertyType };

interface _DirectionPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	CompassPoint: CompassPointEnumeration;
	DirectionKeyword: CodeType;
	DirectionString: StringOrRefType;
	DirectionVector: DirectionVectorType;
}
export interface DirectionPropertyType extends _DirectionPropertyType { constructor: { new(): DirectionPropertyType }; }
export var DirectionPropertyType: { new(): DirectionPropertyType };

/** Direction expressed as a vector, either using components, or using angles. */
interface _DirectionVectorType extends BaseType {
	horizontalAngle: AngleType;
	vector: VectorType;
	verticalAngle: AngleType;
}
export interface DirectionVectorType extends _DirectionVectorType { constructor: { new(): DirectionVectorType }; }
export var DirectionVectorType: { new(): DirectionVectorType };

/** DirectPositionList instances hold the coordinates for a sequence of direct positions within the same coordinate
  * reference system (CRS). */
export type DirectPositionListType = number[];

/** DirectPosition instances hold the coordinates for a position within some coordinate reference system (CRS). Since
  * DirectPositions, as data types, will often be included in larger objects (such as geometry elements) that have references to CRS, the
  * "srsName" attribute will in general be missing, if this particular DirectPosition is included in a larger element with such a reference to a
  * CRS. In this case, the CRS is implicitly assumed to take on the value of the containing object's CRS. */
export type DirectPositionType = number[];

interface _DiscreteCoverageProxyType extends BaseType {
	GridCoverage?: GridCoverageType;
	MultiCurveCoverage?: MultiCurveCoverageType;
	MultiPointCoverage?: MultiPointCoverageType;
	MultiSolidCoverage?: MultiSolidCoverageType;
	MultiSurfaceCoverage?: MultiSurfaceCoverageType;
	RectifiedGridCoverage?: RectifiedGridCoverageType;
}
interface DiscreteCoverageProxyType extends _DiscreteCoverageProxyType { constructor: { new(): DiscreteCoverageProxyType }; }

/** Angle value provided in degree-minute-second or degree-minute format. */
interface _DMSAngleType extends BaseType {
	decimalMinutes?: number;
	degrees: DegreesType;
	minutes?: number;
	seconds?: number;
}
export interface DMSAngleType extends _DMSAngleType { constructor: { new(): DMSAngleType }; }
export var DMSAngleType: { new(): DMSAngleType };

interface _DomainSetProxyType extends BaseType {
	domainSet?: DomainSetType;
	multiPointDomain?: MultiPointDomainType;
	multiCurveDomain?: MultiCurveDomainType;
	multiSurfaceDomain?: MultiSurfaceDomainType;
	multiSolidDomain?: MultiSolidDomainType;
	gridDomain?: GridDomainType;
	rectifiedGridDomain?: RectifiedGridDomainType;
}
interface DomainSetProxyType extends _DomainSetProxyType { constructor: { new(): DomainSetProxyType }; }

/** The spatiotemporal domain of a coverage.
  * Typically
  * * a geometry collection,
  * * an implicit geometry (e.g. a grid),
  * * an explicit or implicit collection of time instances or periods, or
  *
  * N.B. Temporal geometric complexes and temporal grids are not yet implemented in GML. */
interface _DomainSetType extends _GeometryProxyType, _TimeObjectProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface DomainSetType extends _DomainSetType { constructor: { new(): DomainSetType }; }
export var DomainSetType: { new(): DomainSetType };

/** XML List based on XML Schema double type.  An element of this type contains a space-separated list of double values */
export type doubleList = number[];

/** Union of the XML Schema double type and the GML Nulltype.  An element which uses this type may have content which is either a double or a value from Nulltype */
export type doubleOrNull = string;
type _doubleOrNull = Primitive._string;

/** XML List based on the union type defined above.  An element declared with this type contains a space-separated list of double values with null values interspersed as needed */
export type doubleOrNullList = string[];

/** Graph-specific styling property. */
export type DrawingTypeType = ("POLYLINE" | "ORTHOGONAL");
interface _DrawingTypeType extends Primitive._string { content: DrawingTypeType; }

/** A dynamic feature collection may possess a history and/or a timestamp. */
interface _DynamicFeatureCollectionType extends _FeatureCollectionType, _HistoryProxyType {
	dataSource?: StringOrRefType;
	validTime?: TimePrimitivePropertyType;
}
export interface DynamicFeatureCollectionType extends _DynamicFeatureCollectionType { constructor: { new(): DynamicFeatureCollectionType }; }
export var DynamicFeatureCollectionType: { new(): DynamicFeatureCollectionType };

/** A dynamic feature may possess a history and/or a timestamp. */
interface _DynamicFeatureType extends _AbstractFeatureType, _HistoryProxyType {
	dataSource?: StringOrRefType;
	validTime?: TimePrimitivePropertyType;
}
export interface DynamicFeatureType extends _DynamicFeatureType { constructor: { new(): DynamicFeatureType }; }
export var DynamicFeatureType: { new(): DynamicFeatureType };

/** There is precisely one positively directed and one negatively directed node in the boundary of every edge. The negatively and positively directed nodes correspond to the start and end nodes respectively. The optional coboundary of an edge is a circular sequence of directed faces which are incident on this edge in document order. Faces which use a particular boundary edge in its positive orientation appear with positive orientation on the coboundary of the same edge. In the 2D case, the orientation of the face on the left of the edge is "+"; the orientation of the face on the right on its right is "-". An edge may optionally be realised by a 1-dimensional (curve) geometric primitive. */
interface _EdgeType extends _AbstractTopoPrimitiveType {
	/** This property element either references a curve via the XLink-attributes or contains the curve element. curveProperty is the
	  * predefined property which can be used by GML Application Schemas whenever a GML Feature has a property with a value that is
	  * substitutable for _Curve. */
	curveProperty?: CurvePropertyType;
	directedFace?: DirectedFacePropertyType[];
	directedNode: DirectedNodePropertyType[];
}
export interface EdgeType extends _EdgeType { constructor: { new(): EdgeType }; }
export var EdgeType: { new(): EdgeType };

/** Association to an ellipsoidal coordinate system, either referencing or containing the definition of that coordinate system. */
interface _EllipsoidalCSRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	EllipsoidalCS?: EllipsoidalCSType;
}
export interface EllipsoidalCSRefType extends _EllipsoidalCSRefType { constructor: { new(): EllipsoidalCSRefType }; }
export var EllipsoidalCSRefType: { new(): EllipsoidalCSRefType };

/** A two- or three-dimensional coordinate system in which position is specified by geodetic latitude, geodetic longitude, and (in the three-dimensional case) ellipsoidal height. An EllipsoidalCS shall have two or three usesAxis associations. */
interface _EllipsoidalCSType extends _AbstractCoordinateSystemType {}
export interface EllipsoidalCSType extends _EllipsoidalCSType { constructor: { new(): EllipsoidalCSType }; }
export var EllipsoidalCSType: { new(): EllipsoidalCSType };

/** Basic encoding for ellipsoid objects, simplifying and restricting the DefinitionType as needed. */
interface _EllipsoidBaseType extends _DefinitionType {
	/** Database handle for the object.  It is of XML type ID, so is constrained to be unique in the XML document within which it occurs.  An external identifier for the object in the form of a URI may be constructed using standard XML and XPointer methods.  This is done by concatenating the URI for the document, a fragment separator, and the value of the id attribute. */
	id: string;
	/** The name by which this ellipsoid is identified. */
	ellipsoidName: CodeType;
	/** Contains or refers to a metadata package that contains metadata properties. */
	metaDataProperty?: MetaDataPropertyType[];
}
export interface EllipsoidBaseType extends _EllipsoidBaseType { constructor: { new(): EllipsoidBaseType }; }
export var EllipsoidBaseType: { new(): EllipsoidBaseType };

/** Association to an ellipsoid, either referencing or containing the definition of that ellipsoid. */
interface _EllipsoidRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	Ellipsoid?: EllipsoidType;
}
export interface EllipsoidRefType extends _EllipsoidRefType { constructor: { new(): EllipsoidRefType }; }
export var EllipsoidRefType: { new(): EllipsoidRefType };

/** An ellipsoid is a geometric figure that can be used to describe the approximate shape of the earth. In mathematical terms, it is a surface formed by the rotation of an ellipse about its minor axis. */
interface _EllipsoidType extends _EllipsoidBaseType {
	/** An identification of an ellipsoid. */
	ellipsoidID?: IdentifierType[];
	/** Information about this object or code. Contains text or refers to external text. */
	remarks?: StringOrRefType;
	secondDefiningParameter: SecondDefiningParameterType;
	/** Length of the semi-major axis of the ellipsoid, with its units. Uses the MeasureType with the restriction that the unit of measure referenced by uom must be suitable for a length, such as metres or feet. */
	semiMajorAxis: MeasureType;
}
export interface EllipsoidType extends _EllipsoidType { constructor: { new(): EllipsoidType }; }
export var EllipsoidType: { new(): EllipsoidType };

/** Association to an engineering coordinate reference system, either referencing or containing the definition of that reference system. */
interface _EngineeringCRSRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	EngineeringCRS?: EngineeringCRSType;
}
export interface EngineeringCRSRefType extends _EngineeringCRSRefType { constructor: { new(): EngineeringCRSRefType }; }
export var EngineeringCRSRefType: { new(): EngineeringCRSRefType };

/** A contextually local coordinate reference system; which can be divided into two broad categories:
  * - earth-fixed systems applied to engineering activities on or near the surface of the earth;
  * - CRSs on moving platforms such as road vehicles, vessels, aircraft, or spacecraft.
  * For further information, see OGC Abstract Specification Topic 2. */
interface _EngineeringCRSType extends _AbstractReferenceSystemType {
	/** Association to the coordinate system used by this CRS. */
	usesCS: CoordinateSystemRefType;
	/** Association to the engineering datum used by this CRS. */
	usesEngineeringDatum: EngineeringDatumRefType;
}
export interface EngineeringCRSType extends _EngineeringCRSType { constructor: { new(): EngineeringCRSType }; }
export var EngineeringCRSType: { new(): EngineeringCRSType };

/** Association to an engineering datum, either referencing or containing the definition of that datum. */
interface _EngineeringDatumRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	EngineeringDatum?: EngineeringDatumType;
}
export interface EngineeringDatumRefType extends _EngineeringDatumRefType { constructor: { new(): EngineeringDatumRefType }; }
export var EngineeringDatumRefType: { new(): EngineeringDatumRefType };

/** An engineering datum defines the origin of an engineering coordinate reference system, and is used in a region around that origin. This origin can be fixed with respect to the earth (such as a defined point at a construction site), or be a defined point on a moving vehicle (such as on a ship or satellite). */
interface _EngineeringDatumType extends _AbstractDatumType {}
export interface EngineeringDatumType extends _EngineeringDatumType { constructor: { new(): EngineeringDatumType }; }
export var EngineeringDatumType: { new(): EngineeringDatumType };

interface _EnvelopeProxyType extends BaseType {
	Envelope?: EnvelopeType;
	EnvelopeWithTimePeriod?: EnvelopeWithTimePeriodType;
}
interface EnvelopeProxyType extends _EnvelopeProxyType { constructor: { new(): EnvelopeProxyType }; }

/** Envelope defines an extent using a pair of positions defining opposite corners in arbitrary dimensions. The first direct
  * position is the "lower corner" (a coordinate position consisting of all the minimal ordinates for each dimension for all points within the envelope),
  * the second one the "upper corner" (a coordinate position consisting of all the maximal ordinates for each dimension for all points within the
  * envelope). */
interface _EnvelopeType extends BaseType {
	/** Ordered list of labels for all the axes of this CRS. The gml:axisAbbrev value should be used for these axis
	  * labels, after spaces and forbiddden characters are removed. When the srsName attribute is included, this attribute is optional.
	  * When the srsName attribute is omitted, this attribute shall also be omitted. */
	axisLabels?: NCNameList;
	/** The "srsDimension" is the length of coordinate sequence (the number of entries in the list). This dimension is
	  * specified by the coordinate reference system. When the srsName attribute is omitted, this attribute shall be omitted. */
	srsDimension?: number;
	/** In general this reference points to a CRS instance of gml:CoordinateReferenceSystemType
	  * (see coordinateReferenceSystems.xsd). For well known references it is not required that the CRS description exists at the
	  * location the URI points to. If no srsName attribute is given, the CRS must be specified as part of the larger context this
	  * geometry element is part of, e.g. a geometric element like point, curve, etc. It is expected that this attribute will be specified
	  * at the direct position level only in rare cases. */
	srsName?: string;
	/** Ordered list of unit of measure (uom) labels for all the axes of this CRS. The value of the string in the
	  * gml:catalogSymbol should be used for this uom labels, after spaces and forbiddden characters are removed. When the
	  * axisLabels attribute is included, this attribute shall also be included. When the axisLabels attribute is omitted, this attribute
	  * shall also be omitted. */
	uomLabels?: NCNameList;
	/** Deprecated with GML 3.0 and included for backwards compatibility with GML 2. Use the "pos" element instead. */
	coord: CoordType[];
	/** Deprecated with GML version 3.1.0. */
	coordinates: CoordinatesType;
	lowerCorner: DirectPositionType;
	pos: DirectPositionType[];
	upperCorner: DirectPositionType;
}
export interface EnvelopeType extends _EnvelopeType { constructor: { new(): EnvelopeType }; }
export var EnvelopeType: { new(): EnvelopeType };

/** Envelope that includes also a temporal extent. */
interface _EnvelopeWithTimePeriodType extends _EnvelopeType {
	frame?: string;
	/** Direct representation of a temporal position */
	timePosition: TimePositionType[];
}
export interface EnvelopeWithTimePeriodType extends _EnvelopeWithTimePeriodType { constructor: { new(): EnvelopeWithTimePeriodType }; }
export var EnvelopeWithTimePeriodType: { new(): EnvelopeWithTimePeriodType };

/** Information about the spatial, vertical, and/or temporal extent of a reference system object. Constraints: At least one of the elements "description", "boundingBox", "boundingPolygon", "verticalExtent", and temporalExtent" must be included, but more that one can be included when appropriate. Furthermore, more than one "boundingBox", "boundingPolygon", "verticalExtent", and/or temporalExtent" element can be included, with more than one meaning the union of the individual domains. */
interface _ExtentType extends BaseType {
	/** A bounding box (or envelope) defining the spatial domain of this object. */
	boundingBox?: EnvelopeType[];
	/** A bounding polygon defining the horizontal spatial domain of this object. */
	boundingPolygon?: PolygonType[];
	/** Contains a simple text description of the object, or refers to an external description. */
	description?: StringOrRefType;
	/** A time period defining the temporal domain of this object. */
	temporalExtent?: TimePeriodType[];
	/** An interval defining the vertical spatial domain of this object. */
	verticalExtent?: EnvelopeType[];
}
export interface ExtentType extends _ExtentType { constructor: { new(): ExtentType }; }
export var ExtentType: { new(): ExtentType };

interface _ExteriorProxyType extends BaseType {
	/** A boundary of a surface consists of a number of rings. In the normal 2D case, one of these rings is distinguished as being the exterior boundary. In a general manifold this is not always possible, in which case all boundaries shall be listed as interior boundaries, and the exterior will be empty. */
	exterior?: AbstractRingPropertyType;
	/** Deprecated with GML 3.0, included only for backwards compatibility with GML 2. Use "exterior" instead. */
	outerBoundaryIs?: AbstractRingPropertyType;
}
interface ExteriorProxyType extends _ExteriorProxyType { constructor: { new(): ExteriorProxyType }; }

/** . The topological boundary of a face consists of a set of directed edges. Note that all edges associated with a Face, including dangling and interior edges, appear in the boundary.  Dangling and interior edges are each referenced by pairs of directedEdges with opposing orientations.  The optional coboundary of a face is a pair of directed solids which are bounded by this face. If present, there is precisely one positively directed and one negatively directed solid in the coboundary of every face. The positively directed solid corresponds to the solid which lies in the direction of the positively directed normal to the face in any geometric realisation.  A face may optionally be realised by a 2-dimensional (surface) geometric primitive. */
interface _FaceType extends _AbstractTopoPrimitiveType {
	directedEdge: DirectedEdgePropertyType[];
	directedTopoSolid?: DirectedTopoSolidPropertyType[];
	/** This property element either references a surface via the XLink-attributes or contains the surface element. surfaceProperty is the predefined property which can be used by GML Application Schemas whenever a GML Feature has a property with a value that is substitutable for _Surface. */
	surfaceProperty?: SurfacePropertyType;
}
export interface FaceType extends _FaceType { constructor: { new(): FaceType }; }
export var FaceType: { new(): FaceType };

/** Container for features - follow gml:ArrayAssociationType pattern. */
interface _FeatureArrayPropertyType extends BaseType {
	Feature?: FeatureProxyType[];
}
export interface FeatureArrayPropertyType extends _FeatureArrayPropertyType { constructor: { new(): FeatureArrayPropertyType }; }
export var FeatureArrayPropertyType: { new(): FeatureArrayPropertyType };

interface _FeatureCollectionProxyType extends BaseType {}
interface FeatureCollectionProxyType extends _FeatureCollectionProxyType { constructor: { new(): FeatureCollectionProxyType }; }

/** Concrete generic feature collection. */
interface _FeatureCollectionType extends _AbstractFeatureCollectionType {}
export interface FeatureCollectionType extends _FeatureCollectionType { constructor: { new(): FeatureCollectionType }; }
export var FeatureCollectionType: { new(): FeatureCollectionType };

/** Container for a feature - follow gml:AssociationType pattern. */
interface _FeaturePropertyType extends _FeatureProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface FeaturePropertyType extends _FeaturePropertyType { constructor: { new(): FeaturePropertyType }; }
export var FeaturePropertyType: { new(): FeaturePropertyType };

interface _FeatureProxyType extends _CoverageProxyType, _FeatureCollectionProxyType, _ObservationProxyType {
	FeatureCollection?: FeatureCollectionType;
}
interface FeatureProxyType extends _FeatureProxyType { constructor: { new(): FeatureProxyType }; }

interface _FeatureStylePropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	about?: string;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	/** The style descriptor for features. */
	FeatureStyle?: FeatureStyleType;
}
export interface FeatureStylePropertyType extends _FeatureStylePropertyType { constructor: { new(): FeatureStylePropertyType }; }
export var FeatureStylePropertyType: { new(): FeatureStylePropertyType };

/** [complexType of] The style descriptor for features. */
interface _FeatureStyleType extends _AbstractGMLType {
	baseType?: string;
	featureType?: string;
	queryGrammar: QueryGrammarEnumeration;
	featureConstraint?: string;
	/** The style descriptor for geometries of a feature. */
	GeometryStyle?: GeometryStyleType[];
	/** The style descriptor for labels of a feature, geometry or topology. */
	LabelStyle?: LabelStyleType;
	/** The style descriptor for topologies of a feature. Describes individual topology elements styles. */
	TopologyStyle?: TopologyStyleType[];
}
export interface FeatureStyleType extends _FeatureStyleType { constructor: { new(): FeatureStyleType }; }
export var FeatureStyleType: { new(): FeatureStyleType };

interface _FileType extends BaseType {
	compression?: string;
	fileName: string;
	fileStructure: FileValueModelType;
	mimeType?: string;
	rangeParameters: RangeParametersType;
}
export interface FileType extends _FileType { constructor: { new(): FileType }; }
export var FileType: { new(): FileType };

/** List of codes that identifies the file structure model for records stored in files. */
export type FileValueModelType = "Record Interleaved";
interface _FileValueModelType extends Primitive._string { content: FileValueModelType; }

/** Paremeters of a simple formula by which a value using this unit of measure can be converted to the corresponding value using the preferred unit of measure. The formula element contains elements a, b, c and d, whose values use the XML Schema type "double". These values are used in the formula y = (a + bx) / (c + dx), where x is a value using this unit, and y is the corresponding value using the preferred unit. The elements a and d are optional, and if values are not provided, those parameters are considered to be zero. If values are not provided for both a and d, the formula is equivalent to a fraction with numerator and denominator parameters. */
interface _FormulaType extends BaseType {
	a?: number;
	b: number;
	c: number;
	d?: number;
}
export interface FormulaType extends _FormulaType { constructor: { new(): FormulaType }; }
export var FormulaType: { new(): FormulaType };

interface _GeneralConversionProxyType extends BaseType {
	Conversion?: ConversionType;
}
interface GeneralConversionProxyType extends _GeneralConversionProxyType { constructor: { new(): GeneralConversionProxyType }; }

/** Association to a general conversion, either referencing or containing the definition of that conversion. */
interface _GeneralConversionRefType extends _GeneralConversionProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface GeneralConversionRefType extends _GeneralConversionRefType { constructor: { new(): GeneralConversionRefType }; }
export var GeneralConversionRefType: { new(): GeneralConversionRefType };

interface _GeneralDerivedCRSProxyType extends BaseType {
	ProjectedCRS?: ProjectedCRSType;
	DerivedCRS?: DerivedCRSType;
}
interface GeneralDerivedCRSProxyType extends _GeneralDerivedCRSProxyType { constructor: { new(): GeneralDerivedCRSProxyType }; }

interface _GeneralOperationParameterProxyType extends BaseType {
	OperationParameter?: OperationParameterType;
	OperationParameterGroup?: OperationParameterGroupType;
}
interface GeneralOperationParameterProxyType extends _GeneralOperationParameterProxyType { constructor: { new(): GeneralOperationParameterProxyType }; }

interface _GeneralParameterValueProxyType extends BaseType {
	/** A composition association to a parameter value or group of values included in this group. */
	includesValue?: AbstractGeneralParameterValueType;
	parameterValue?: ParameterValueType;
	parameterValueGroup?: ParameterValueGroupType;
}
interface GeneralParameterValueProxyType extends _GeneralParameterValueProxyType { constructor: { new(): GeneralParameterValueProxyType }; }

interface _GeneralTransformationProxyType extends BaseType {
	Transformation?: TransformationType;
}
interface GeneralTransformationProxyType extends _GeneralTransformationProxyType { constructor: { new(): GeneralTransformationProxyType }; }

/** Association to a general transformation, either referencing or containing the definition of that transformation. */
interface _GeneralTransformationRefType extends _GeneralTransformationProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface GeneralTransformationRefType extends _GeneralTransformationRefType { constructor: { new(): GeneralTransformationRefType }; }
export var GeneralTransformationRefType: { new(): GeneralTransformationRefType };

/** Deprecated with GML version 3.1.0. */
interface _GenericMetaDataType extends _AbstractMetaDataType {}
export interface GenericMetaDataType extends _GenericMetaDataType { constructor: { new(): GenericMetaDataType }; }
export var GenericMetaDataType: { new(): GenericMetaDataType };

/** Association to a geocentric coordinate reference system, either referencing or containing the definition of that reference system. */
interface _GeocentricCRSRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	GeocentricCRS?: GeocentricCRSType;
}
export interface GeocentricCRSRefType extends _GeocentricCRSRefType { constructor: { new(): GeocentricCRSRefType }; }
export var GeocentricCRSRefType: { new(): GeocentricCRSRefType };

/** A 3D coordinate reference system with the origin at the approximate centre of mass of the earth. A geocentric CRS deals with the earth's curvature by taking a 3D spatial view, which obviates the need to model the earth's curvature. */
interface _GeocentricCRSType extends _AbstractReferenceSystemType {
	/** Association to the Cartesian coordinate system used by this CRS. */
	usesCartesianCS: CartesianCSRefType;
	/** Association to the geodetic datum used by this CRS. */
	usesGeodeticDatum: GeodeticDatumRefType;
	/** Association to the spherical coordinate system used by this CRS. */
	usesSphericalCS: SphericalCSRefType;
}
export interface GeocentricCRSType extends _GeocentricCRSType { constructor: { new(): GeocentricCRSType }; }
export var GeocentricCRSType: { new(): GeocentricCRSType };

interface _GeodesicStringProxyType extends BaseType {
	GeodesicString?: GeodesicStringType;
	Geodesic?: GeodesicType;
}
interface GeodesicStringProxyType extends _GeodesicStringProxyType { constructor: { new(): GeodesicStringProxyType }; }

/** A GeodesicString consists of sequence of
  * geodesic segments. The type essentially combines a sequence of
  * Geodesic into a single object.
  * The GeodesicString is computed from two or more positions and an
  * interpolation using geodesics defined from the geoid (or
  * ellipsoid) of the co-ordinate reference system being used. */
interface _GeodesicStringType extends _AbstractCurveSegmentType {
	/** The attribute "interpolation" specifies the
	  * curve interpolation mechanism used for this segment. This
	  * mechanism uses the control points and control parameters to
	  * determine the position of this curve segment. For an
	  * GeodesicString the interpolation is fixed as "geodesic". */
	interpolation: CurveInterpolationType;
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty
	  * is the predefined property which can be used by GML Application Schemas whenever a GML Feature has a property with a value that
	  * is substitutable for Point. */
	pointProperty: PointPropertyType[];
	pos: DirectPositionType[];
	posList: DirectPositionListType;
}
export interface GeodesicStringType extends _GeodesicStringType { constructor: { new(): GeodesicStringType }; }
export var GeodesicStringType: { new(): GeodesicStringType };

/** A Geodesic consists of two distinct
  * positions joined by a geodesic curve. The control points of
  * a Geodesic shall lie on the geodesic between its start
  * point and end points. Between these two points, a geodesic
  * curve defined from ellipsoid or geoid model used by the
  * co-ordinate reference systems may be used to interpolate
  * other positions. Any other point in the controlPoint array
  * must fall on this geodesic. */
interface _GeodesicType extends _GeodesicStringType {}
export interface GeodesicType extends _GeodesicType { constructor: { new(): GeodesicType }; }
export var GeodesicType: { new(): GeodesicType };

/** Association to a geodetic datum, either referencing or containing the definition of that datum. */
interface _GeodeticDatumRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	GeodeticDatum?: GeodeticDatumType;
}
export interface GeodeticDatumRefType extends _GeodeticDatumRefType { constructor: { new(): GeodeticDatumRefType }; }
export var GeodeticDatumRefType: { new(): GeodeticDatumRefType };

/** A geodetic datum defines the precise location and orientation in 3-dimensional space of a defined ellipsoid (or sphere) that approximates the shape of the earth, or of a Cartesian coordinate system centered in this ellipsoid (or sphere). */
interface _GeodeticDatumType extends _AbstractDatumType {
	/** Association to the ellipsoid used by this geodetic datum. */
	usesEllipsoid: EllipsoidRefType;
	/** Association to the prime meridian used by this geodetic datum. */
	usesPrimeMeridian: PrimeMeridianRefType;
}
export interface GeodeticDatumType extends _GeodeticDatumType { constructor: { new(): GeodeticDatumType }; }
export var GeodeticDatumType: { new(): GeodeticDatumType };

/** Association to a geographic coordinate reference system, either referencing or containing the definition of that reference system. */
interface _GeographicCRSRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	GeographicCRS?: GeographicCRSType;
}
export interface GeographicCRSRefType extends _GeographicCRSRefType { constructor: { new(): GeographicCRSRefType }; }
export var GeographicCRSRefType: { new(): GeographicCRSRefType };

/** A coordinate reference system based on an ellipsoidal approximation of the geoid; this provides an accurate representation of the geometry of geographic features for a large portion of the earth's surface. */
interface _GeographicCRSType extends _AbstractReferenceSystemType {
	/** Association to the ellipsoidal coordinate system used by this CRS. */
	usesEllipsoidalCS: EllipsoidalCSRefType;
	/** Association to the geodetic datum used by this CRS. */
	usesGeodeticDatum: GeodeticDatumRefType;
}
export interface GeographicCRSType extends _GeographicCRSType { constructor: { new(): GeographicCRSType }; }
export var GeographicCRSType: { new(): GeographicCRSType };

interface _GeometricAggregateProxyType extends BaseType {
	MultiPoint?: MultiPointType;
	MultiCurve?: MultiCurveType;
	MultiSurface?: MultiSurfaceType;
	MultiSolid?: MultiSolidType;
	/** Deprecated with GML 3.0 and included for backwards compatibility with GML 2. Use the "MultiCurve" element instead. */
	MultiLineString?: MultiLineStringType;
	/** Deprecated with GML 3.0 and included for backwards compatibility with GML 2. Use the "MultiSurface" element instead. */
	MultiPolygon?: MultiPolygonType;
	MultiGeometry?: MultiGeometryType;
}
interface GeometricAggregateProxyType extends _GeometricAggregateProxyType { constructor: { new(): GeometricAggregateProxyType }; }

/** A property that has a geometric complex as its value domain can either be an appropriate geometry element encapsulated in an element of this type or an XLink reference to a remote geometry element (where remote includes geometry elements located elsewhere in the same document). Either the reference or the contained element must be given, but neither both nor none.
  * NOTE: The allowed geometry elements contained in such a property (or referenced by it) have to be modelled by an XML Schema choice element since the composites inherit both from geometric complex *and* geometric primitive and are already part of the _GeometricPrimitive substitution group. */
interface _GeometricComplexPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	CompositeCurve?: CompositeCurveType;
	CompositeSolid?: CompositeSolidType;
	CompositeSurface?: CompositeSurfaceType;
	GeometricComplex?: GeometricComplexType;
}
export interface GeometricComplexPropertyType extends _GeometricComplexPropertyType { constructor: { new(): GeometricComplexPropertyType }; }
export var GeometricComplexPropertyType: { new(): GeometricComplexPropertyType };

/** A geometric complex. */
interface _GeometricComplexType extends _AbstractGeometryType {
	element: GeometricPrimitivePropertyType[];
}
export interface GeometricComplexType extends _GeometricComplexType { constructor: { new(): GeometricComplexType }; }
export var GeometricComplexType: { new(): GeometricComplexType };

/** A property that has a geometric primitive as its value domain can either be an appropriate geometry element
  * encapsulated in an element of this type or an XLink reference to a remote geometry element (where remote includes geometry
  * elements located elsewhere in the same document). Either the reference or the contained element must be given, but neither
  * both nor none. */
interface _GeometricPrimitivePropertyType extends _GeometricPrimitiveProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface GeometricPrimitivePropertyType extends _GeometricPrimitivePropertyType { constructor: { new(): GeometricPrimitivePropertyType }; }
export var GeometricPrimitivePropertyType: { new(): GeometricPrimitivePropertyType };

interface _GeometricPrimitiveProxyType extends _SolidProxyType, _SurfaceProxyType, _CurveProxyType {
	Point?: PointType;
}
interface GeometricPrimitiveProxyType extends _GeometricPrimitiveProxyType { constructor: { new(): GeometricPrimitiveProxyType }; }

/** A container for an array of geometry elements. The elements are always contained in the array property,
  * referencing geometry elements or arrays of geometry elements is not supported. */
interface _GeometryArrayPropertyType extends BaseType {
	/** The "_Geometry" element is the abstract head of the substituition group for all geometry elements of GML 3. This
	  * includes pre-defined and user-defined geometry elements. Any geometry element must be a direct or indirect extension/restriction
	  * of AbstractGeometryType and must be directly or indirectly in the substitution group of "_Geometry". */
	Geometry?: GeometryProxyType[];
}
export interface GeometryArrayPropertyType extends _GeometryArrayPropertyType { constructor: { new(): GeometryArrayPropertyType }; }
export var GeometryArrayPropertyType: { new(): GeometryArrayPropertyType };

/** A geometric property can either be any geometry element encapsulated in an element of this type or an XLink reference
  * to a remote geometry element (where remote includes geometry elements located elsewhere in the same document). Note that either
  * the reference or the contained element must be given, but not both or none. */
interface _GeometryPropertyType extends _GeometryProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface GeometryPropertyType extends _GeometryPropertyType { constructor: { new(): GeometryPropertyType }; }
export var GeometryPropertyType: { new(): GeometryPropertyType };

interface _GeometryProxyType extends _GeometricAggregateProxyType, _RingProxyType, _GeometricPrimitiveProxyType, _ImplicitGeometryProxyType {
	GeometricComplex?: GeometricComplexType;
}
interface GeometryProxyType extends _GeometryProxyType { constructor: { new(): GeometryProxyType }; }

interface _GeometryStylePropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	about?: string;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	/** The style descriptor for geometries of a feature. */
	GeometryStyle?: GeometryStyleType;
}
export interface GeometryStylePropertyType extends _GeometryStylePropertyType { constructor: { new(): GeometryStylePropertyType }; }
export var GeometryStylePropertyType: { new(): GeometryStylePropertyType };

/** [complexType of] The style descriptor for geometries of a feature. */
interface _GeometryStyleType extends _BaseStyleDescriptorType {
	geometryProperty: string;
	geometryType: string;
	/** The style descriptor for labels of a feature, geometry or topology. */
	LabelStyle?: LabelStyleType;
	/** Deprecated in GML version 3.1.0. Use symbol with inline content instead. */
	style: string;
	/** The symbol property. Extends the gml:AssociationType to allow for remote referencing of symbols. */
	symbol: SymbolType;
}
export interface GeometryStyleType extends _GeometryStyleType { constructor: { new(): GeometryStyleType }; }
export var GeometryStyleType: { new(): GeometryStyleType };

interface _GMLProxyType extends _GeometryProxyType, _TimeSliceProxyType, _TimeObjectProxyType, _FeatureProxyType, _StyleProxyType, _DefinitionProxyType_2, _TopologyProxyType {
	/** The style descriptor for features. */
	FeatureStyle?: FeatureStyleType;
	/** The style descriptor for a graph consisting of a number of features. Describes graph-specific style attributes. */
	GraphStyle?: GraphStyleType;
	/** The style descriptor for geometries of a feature. */
	GeometryStyle?: GeometryStyleType;
	/** The style descriptor for labels of a feature, geometry or topology. */
	LabelStyle?: LabelStyleType;
	/** The style descriptor for topologies of a feature. Describes individual topology elements styles. */
	TopologyStyle?: TopologyStyleType;
	/** Generic GML element to contain a homogeneous array of GML _Objects */
	Array?: ArrayType;
	/** Generic GML element to contain a heterogeneous collection of GML _Objects */
	Bag?: BagType;
}
interface GMLProxyType extends _GMLProxyType { constructor: { new(): GMLProxyType }; }

interface _GraphStylePropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	about?: string;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	/** The style descriptor for a graph consisting of a number of features. Describes graph-specific style attributes. */
	GraphStyle?: GraphStyleType;
}
export interface GraphStylePropertyType extends _GraphStylePropertyType { constructor: { new(): GraphStylePropertyType }; }
export var GraphStylePropertyType: { new(): GraphStylePropertyType };

/** [complexType of] The style descriptor for a graph consisting of a number of features. Describes graph-specific style attributes. */
interface _GraphStyleType extends _BaseStyleDescriptorType {
	aestheticCriteria?: AesheticCriteriaType[];
	directed?: boolean;
	drawingType?: DrawingTypeType;
	graphType?: GraphTypeType;
	grid?: boolean;
	lineType?: LineTypeType;
	minAngle?: number;
	minDistance?: number;
	planar?: boolean;
}
export interface GraphStyleType extends _GraphStyleType { constructor: { new(): GraphStyleType }; }
export var GraphStyleType: { new(): GraphStyleType };

/** Graph-specific styling property. */
export type GraphTypeType = ("TREE" | "BICONNECTED");
interface _GraphTypeType extends Primitive._string { content: GraphTypeType; }

interface _GridCoverageType extends _AbstractDiscreteCoverageType {
	boundedBy?: BoundingShapeType;
	coverageFunction?: CoverageFunctionType;
	/** Contains a simple text description of the object, or refers to an external description. */
	description?: StringOrRefType;
	gridDomain: GridDomainType;
	/** Contains or refers to a metadata package that contains metadata properties. */
	metaDataProperty?: MetaDataPropertyType[];
	/** Label for the object, normally a descriptive name. An object may have several names, typically assigned by different authorities.  The authority for a name is indicated by the value of its (optional) codeSpace attribute.  The name may or may not be unique, as determined by the rules of the organization responsible for the codeSpace. */
	name?: NameProxyType[];
	rangeSet: RangeSetType;
}
export interface GridCoverageType extends _GridCoverageType { constructor: { new(): GridCoverageType }; }
export var GridCoverageType: { new(): GridCoverageType };

interface _GriddedSurfaceProxyType extends BaseType {
	Cone?: ConeType;
	Cylinder?: CylinderType;
	Sphere?: SphereType;
}
interface GriddedSurfaceProxyType extends _GriddedSurfaceProxyType { constructor: { new(): GriddedSurfaceProxyType }; }

interface _GridDomainType extends _DomainSetType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	Grid?: GridType;
}
export interface GridDomainType extends _GridDomainType { constructor: { new(): GridDomainType }; }
export var GridDomainType: { new(): GridDomainType };

/** Provides grid coordinate values for the diametrically opposed corners of an envelope that bounds a section of grid. The value of a single coordinate is the number of offsets from the origin of the grid in the direction of a specific axis. */
interface _GridEnvelopeType extends BaseType {
	high: integerList;
	low: integerList;
}
export interface GridEnvelopeType extends _GridEnvelopeType { constructor: { new(): GridEnvelopeType }; }
export var GridEnvelopeType: { new(): GridEnvelopeType };

interface _GridFunctionProxyType extends BaseType {
	GridFunction?: GridFunctionType;
	IndexMap?: IndexMapType;
}
interface GridFunctionProxyType extends _GridFunctionProxyType { constructor: { new(): GridFunctionProxyType }; }

/** Defines how values in the domain are mapped to the range set. The start point and the sequencing rule are specified here. */
interface _GridFunctionType extends BaseType {
	/** If absent, the implied value is "Linear". */
	sequenceRule?: SequenceRuleType;
	/** Index position of the first grid post, which must lie somwhere in the GridEnvelope.  If absent, the startPoint is equal to the value of gridEnvelope::low from the grid definition. */
	startPoint?: integerList;
}
export interface GridFunctionType extends _GridFunctionType { constructor: { new(): GridFunctionType }; }
export var GridFunctionType: { new(): GridFunctionType };

/** Value of a length (or distance) quantity in a grid, where the grid spacing does not have any associated physical units, or does not have a constant physical spacing. This grid length will often be used in a digital image grid, where the base units are likely to be pixel spacings. Uses the MeasureType with the restriction that the unit of measure referenced by uom must be suitable for length along the axes of a grid, such as pixel spacings or grid spacings. */
interface _GridLengthType extends _MeasureType {}
export interface GridLengthType extends _GridLengthType { constructor: { new(): GridLengthType }; }
export var GridLengthType: { new(): GridLengthType };

interface _GridLimitsType extends BaseType {
	GridEnvelope: GridEnvelopeType;
}
export interface GridLimitsType extends _GridLimitsType { constructor: { new(): GridLimitsType }; }
export var GridLimitsType: { new(): GridLimitsType };

/** An unrectified grid, which is a network composed of two or more sets of equally spaced parallel lines in which the members of each set intersect the members of the other sets at right angles. */
interface _GridType extends _AbstractGeometryType {
	dimension: number;
	axisName: string[];
	limits: GridLimitsType;
}
export interface GridType extends _GridType { constructor: { new(): GridType }; }
export var GridType: { new(): GridType };

/** The history relationship associates a feature with a sequence of TimeSlice instances. */
interface _HistoryPropertyType extends BaseType {
	TimeSlice: TimeSliceProxyType[];
}
export interface HistoryPropertyType extends _HistoryPropertyType { constructor: { new(): HistoryPropertyType }; }
export var HistoryPropertyType: { new(): HistoryPropertyType };

interface _HistoryProxyType extends BaseType {
	history?: HistoryPropertyType;
	track?: TrackType;
}
interface HistoryProxyType extends _HistoryProxyType { constructor: { new(): HistoryProxyType }; }

/** An identification of a CRS object. The first use of the IdentifierType for an object, if any, is normally the primary identification code, and any others are aliases. */
interface _IdentifierType extends _NameProxyType {
	/** Information about this object or code. Contains text or refers to external text. */
	remarks?: StringOrRefType;
	/** Identifier of the version of the associated codeSpace or code, as specified by the codeSpace or code authority. This version is included only when the "code" or "codeSpace" uses versions. When appropriate, the version is identified by the effective date, coded using ISO 8601 date format. */
	version?: string;
}
export interface IdentifierType extends _IdentifierType { constructor: { new(): IdentifierType }; }
export var IdentifierType: { new(): IdentifierType };

/** Association to an image coordinate reference system, either referencing or containing the definition of that reference system. */
interface _ImageCRSRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	ImageCRS?: ImageCRSType;
}
export interface ImageCRSRefType extends _ImageCRSRefType { constructor: { new(): ImageCRSRefType }; }
export var ImageCRSRefType: { new(): ImageCRSRefType };

/** An engineering coordinate reference system applied to locations in images. Image coordinate reference systems are treated as a separate sub-type because a separate user community exists for images with its own terms of reference. */
interface _ImageCRSType extends _AbstractReferenceSystemType {
	/** Association to the Cartesian coordinate system used by this CRS. */
	usesCartesianCS: CartesianCSRefType;
	/** Association to the image datum used by this CRS. */
	usesImageDatum: ImageDatumRefType;
	/** Association to the oblique Cartesian coordinate system used by this CRS. */
	usesObliqueCartesianCS: ObliqueCartesianCSRefType;
}
export interface ImageCRSType extends _ImageCRSType { constructor: { new(): ImageCRSType }; }
export var ImageCRSType: { new(): ImageCRSType };

/** Association to an image datum, either referencing or containing the definition of that datum. */
interface _ImageDatumRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	ImageDatum?: ImageDatumType;
}
export interface ImageDatumRefType extends _ImageDatumRefType { constructor: { new(): ImageDatumRefType }; }
export var ImageDatumRefType: { new(): ImageDatumRefType };

/** An image datum defines the origin of an image coordinate reference system, and is used in a local context only. For more information, see OGC Abstract Specification Topic 2. */
interface _ImageDatumType extends _AbstractDatumType {
	pixelInCell: PixelInCellType;
}
export interface ImageDatumType extends _ImageDatumType { constructor: { new(): ImageDatumType }; }
export var ImageDatumType: { new(): ImageDatumType };

interface _ImplicitGeometryProxyType extends BaseType {
	Grid?: GridType;
	/** Should be substitutionGroup="gml:Grid" but changed in order to accomplish Xerces-J schema validation */
	RectifiedGrid?: RectifiedGridType;
}
interface ImplicitGeometryProxyType extends _ImplicitGeometryProxyType { constructor: { new(): ImplicitGeometryProxyType }; }

/** The enumeration value here indicates the incrementation order  to be used on the first 2 axes, i.e. "+x-y" means that the points on the first axis are to be traversed from lowest to highest and  the points on the second axis are to be traversed from highest to lowest. The points on all other axes (if any) beyond the first 2 are assumed to increment from lowest to highest. */
export type IncrementOrder = ("+x+y" | "+y+x" | "+x-y" | "-x-y");
interface _IncrementOrder extends Primitive._string { content: IncrementOrder; }

/** Exends GridFunctionType with a lookUpTable.  This contains a list of indexes of members within the rangeSet corresponding with the members of the domainSet.  The domainSet is traversed in list order if it is enumerated explicitly, or in the order specified by a SequenceRule if the domain is an implicit set.    The length of the lookUpTable corresponds with the length of the subset of the domainSet for which the coverage is defined. */
interface _IndexMapType extends _GridFunctionType {
	lookUpTable: integerList;
}
export interface IndexMapType extends _IndexMapType { constructor: { new(): IndexMapType }; }
export var IndexMapType: { new(): IndexMapType };

/** An entry in a dictionary of definitions that contains a GML object which references a remote definition object. This entry is expected to be convenient in allowing multiple elements in one XML document to contain short (abbreviated XPointer) references, which are resolved to an external definition provided in a Dictionary element in the same XML document. Specialized descendents of this dictionaryEntry might be restricted in an application schema to allow only including specified types of definitions as valid entries in a dictionary. */
interface _IndirectEntryType extends BaseType {
	DefinitionProxy: DefinitionProxyType;
}
export interface IndirectEntryType extends _IndirectEntryType { constructor: { new(): IndirectEntryType }; }
export var IndirectEntryType: { new(): IndirectEntryType };

/** XML List based on XML Schema integer type.  An element of this type contains a space-separated list of integer values */
export type integerList = number[];

/** Union of the XML Schema integer type and the GML Nulltype.  An element which uses this type may have content which is either an integer or a value from Nulltype */
export type integerOrNull = string;
type _integerOrNull = Primitive._string;

/** XML List based on the union type defined above.  An element declared with this type contains a space-separated list of integer values with null values interspersed as needed */
export type integerOrNullList = string[];

interface _InteriorProxyType extends BaseType {
	/** A boundary of a surface consists of a number of rings. The "interior" rings seperate the surface / surface patch from the area enclosed by the rings. */
	interior?: AbstractRingPropertyType;
	/** Deprecated with GML 3.0, included only for backwards compatibility with GML 2. Use "interior" instead. */
	innerBoundaryIs?: AbstractRingPropertyType;
}
interface InteriorProxyType extends _InteriorProxyType { constructor: { new(): InteriorProxyType }; }

interface _IsolatedPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	Edge?: EdgeType;
	Node?: NodeType;
}
export interface IsolatedPropertyType extends _IsolatedPropertyType { constructor: { new(): IsolatedPropertyType }; }
export var IsolatedPropertyType: { new(): IsolatedPropertyType };

type IsSphereType = "sphere";
interface _IsSphereType extends Primitive._string { content: IsSphereType; }

/** Encapsulates a knot to use it in a geometric type. */
interface _KnotPropertyType extends BaseType {
	Knot: KnotType;
}
export interface KnotPropertyType extends _KnotPropertyType { constructor: { new(): KnotPropertyType }; }
export var KnotPropertyType: { new(): KnotPropertyType };

/** A knot is a breakpoint on a piecewise spline curve. */
interface _KnotType extends BaseType {
	/** The property "multiplicity" is the multiplicity of this knot used in the definition of the spline (with the same weight). */
	multiplicity: number;
	/** The property "value" is the value of the parameter at the knot of the spline. The sequence of knots shall be a non-decreasing sequence. That is, each knot's value in the sequence shall be equal to or greater than the previous knot's value. The use of equal consecutive knots is normally handled using the multiplicity. */
	value: number;
	/** The property "weight" is the value of the averaging weight used for this knot of the spline. */
	weight: number;
}
export interface KnotType extends _KnotType { constructor: { new(): KnotType }; }
export var KnotType: { new(): KnotType };

/** Defines allowed values for the knots` type. Uniform knots implies that all knots are of multiplicity 1 and they differ by a positive constant from the preceding knot. Knots are quasi-uniform iff they are of multiplicity (degree + 1) at the ends, of multiplicity 1 elsewhere, and they differ by a positive constant from the preceding knot. */
export type KnotTypesType = ("uniform" | "quasiUniform" | "piecewiseBezier");
interface _KnotTypesType extends Primitive._string { content: KnotTypesType; }

interface _LabelStylePropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	about?: string;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	/** The style descriptor for labels of a feature, geometry or topology. */
	LabelStyle?: LabelStyleType;
}
export interface LabelStylePropertyType extends _LabelStylePropertyType { constructor: { new(): LabelStylePropertyType }; }
export var LabelStylePropertyType: { new(): LabelStylePropertyType };

/** [complexType of] The style descriptor for labels of a feature, geometry or topology. */
interface _LabelStyleType extends _BaseStyleDescriptorType {
	label: LabelType;
	style: string;
}
export interface LabelStyleType extends _LabelStyleType { constructor: { new(): LabelStyleType }; }
export var LabelStyleType: { new(): LabelStyleType };

/** Label is mixed -- composed of text and XPath expressions used to extract the useful information from the feature. */
interface _LabelType extends BaseType {
	/** Defines the geometric transformation of entities. There is no particular grammar defined for this value. */
	transform?: string;
	LabelExpression?: string[];
}
export interface LabelType extends _LabelType { constructor: { new(): LabelType }; }
export var LabelType: { new(): LabelType };

/** Value of a length (or distance) quantity, with its units. Uses the MeasureType with the restriction that the unit of measure referenced by uom must be suitable for a length, such as metres or feet. */
interface _LengthType extends _MeasureType {}
export interface LengthType extends _LengthType { constructor: { new(): LengthType }; }
export var LengthType: { new(): LengthType };

/** Association to a linear coordinate system, either referencing or containing the definition of that coordinate system. */
interface _LinearCSRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	LinearCS?: LinearCSType;
}
export interface LinearCSRefType extends _LinearCSRefType { constructor: { new(): LinearCSRefType }; }
export var LinearCSRefType: { new(): LinearCSRefType };

/** A one-dimensional coordinate system that consists of the points that lie on the single axis described. The associated ordinate is the distance from the specified origin to the point along the axis. Example: usage of the line feature representing a road to describe points on or along that road. A LinearCS shall have one usesAxis association. */
interface _LinearCSType extends _AbstractCoordinateSystemType {}
export interface LinearCSType extends _LinearCSType { constructor: { new(): LinearCSType }; }
export var LinearCSType: { new(): LinearCSType };

/** Encapsulates a ring to represent properties in features or geometry collections. */
interface _LinearRingPropertyType extends BaseType {
	LinearRing: LinearRingType;
}
export interface LinearRingPropertyType extends _LinearRingPropertyType { constructor: { new(): LinearRingPropertyType }; }
export var LinearRingPropertyType: { new(): LinearRingPropertyType };

/** A LinearRing is defined by four or more coordinate tuples, with linear interpolation between them; the first and last coordinates must be coincident. */
interface _LinearRingType extends _AbstractRingType {
	/** Deprecated with GML 3.0 and included for backwards compatibility with GML 2. Use the "pos" element instead. */
	coord: CoordType[];
	/** Deprecated with GML version 3.1.0. */
	coordinates: CoordinatesType;
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty
	  * is the predefined property which can be used by GML Application Schemas whenever a GML Feature has a property with a value that
	  * is substitutable for Point. */
	pointProperty: PointPropertyType[];
	/** Deprecated with GML version 3.1.0. Use "pointProperty" instead. Included for backwards compatibility with GML 3.0.0. */
	pointRep: PointPropertyType[];
	pos: DirectPositionType[];
	posList: DirectPositionListType;
}
export interface LinearRingType extends _LinearRingType { constructor: { new(): LinearRingType }; }
export var LinearRingType: { new(): LinearRingType };

/** This type is deprecated with GML 3 and shall not be used. It is included for backwards compatibility with GML 2. Use
  * CurvePropertyType instead. A property that has a line string as its value domain can either be an appropriate geometry element encapsulated
  * in an element of this type or an XLink reference to a remote geometry element (where remote includes geometry elements located elsewhere
  * in the same document). Either the reference or the contained element must be given, but neither both nor none. */
interface _LineStringPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	LineString?: LineStringType;
}
export interface LineStringPropertyType extends _LineStringPropertyType { constructor: { new(): LineStringPropertyType }; }
export var LineStringPropertyType: { new(): LineStringPropertyType };

interface _LineStringSegmentArrayPropertyType extends BaseType {
	LineStringSegment?: LineStringSegmentType[];
}
export interface LineStringSegmentArrayPropertyType extends _LineStringSegmentArrayPropertyType { constructor: { new(): LineStringSegmentArrayPropertyType }; }
export var LineStringSegmentArrayPropertyType: { new(): LineStringSegmentArrayPropertyType };

/** A LineStringSegment is a curve segment that is defined by two or more coordinate tuples, with linear interpolation between them.
  * Note: LineStringSegment implements GM_LineString of ISO 19107. */
interface _LineStringSegmentType extends _AbstractCurveSegmentType {
	/** The attribute "interpolation" specifies the curve interpolation mechanism used for this segment. This mechanism
	  * uses the control points and control parameters to determine the position of this curve segment. For a LineStringSegment the interpolation is fixed as "linear". */
	interpolation: CurveInterpolationType;
	/** Deprecated with GML version 3.1.0. */
	coordinates: CoordinatesType;
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty
	  * is the predefined property which can be used by GML Application Schemas whenever a GML Feature has a property with a value that
	  * is substitutable for Point. */
	pointProperty: PointPropertyType[];
	/** Deprecated with GML version 3.1.0. Use "pointProperty" instead. Included for backwards compatibility with GML 3.0.0. */
	pointRep: PointPropertyType[];
	pos: DirectPositionType[];
	posList: DirectPositionListType;
}
export interface LineStringSegmentType extends _LineStringSegmentType { constructor: { new(): LineStringSegmentType }; }
export var LineStringSegmentType: { new(): LineStringSegmentType };

/** A LineString is a special curve that consists of a single segment with linear interpolation. It is defined by two or more coordinate
  * tuples, with linear interpolation between them. It is backwards compatible with the LineString of GML 2, GM_LineString of ISO 19107 is
  * implemented by LineStringSegment. */
interface _LineStringType extends _AbstractCurveType {
	/** Deprecated with GML 3.0 and included for backwards compatibility with GML 2. Use the "pos" element instead. */
	coord: CoordType[];
	/** Deprecated with GML version 3.1.0. */
	coordinates: CoordinatesType;
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty
	  * is the predefined property which can be used by GML Application Schemas whenever a GML Feature has a property with a value that
	  * is substitutable for Point. */
	pointProperty: PointPropertyType[];
	/** Deprecated with GML version 3.1.0. Use "pointProperty" instead. Included for backwards compatibility with GML 3.0.0. */
	pointRep: PointPropertyType[];
	pos: DirectPositionType[];
	posList: DirectPositionListType;
}
export interface LineStringType extends _LineStringType { constructor: { new(): LineStringType }; }
export var LineStringType: { new(): LineStringType };

/** Graph-specific styling property. */
export type LineTypeType = ("STRAIGHT" | "BENT");
interface _LineTypeType extends Primitive._string { content: LineTypeType; }

/** Convenience property for generalised location.
  * A representative location for plotting or analysis.
  * Often augmented by one or more additional geometry properties with more specific semantics.Deprecated in GML 3.1.0 */
interface _LocationPropertyType extends _GeometryProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	LocationKeyWord?: CodeType;
	LocationString?: StringOrRefType;
	Null?: string;
}
export interface LocationPropertyType extends _LocationPropertyType { constructor: { new(): LocationPropertyType }; }
export var LocationPropertyType: { new(): LocationPropertyType };

interface _LocationProxyType extends BaseType {
	/** Deprecated in GML 3.1.0 */
	location?: LocationPropertyType;
	/** Deprecated in GML 3.1.0 */
	priorityLocation?: PriorityLocationPropertyType;
}
interface LocationProxyType extends _LocationProxyType { constructor: { new(): LocationProxyType }; }

/** List of numbers with a uniform scale.
  * The value of uom (Units Of Measure) attribute is a reference to
  * a Reference System for the amount, either a ratio or position scale. */
export type MeasureListType = number[];

/** List of numbers with a uniform scale.
  * A member of the list may be a typed null.
  * The value of uom (Units Of Measure) attribute is a reference to
  * a Reference System for the amount, either a ratio or position scale. */
export type MeasureOrNullListType = string[];

/** Number with a scale.
  * The value of uom (Units Of Measure) attribute is a reference to a Reference System for the amount, either a ratio or position scale. */
interface _MeasureType extends Primitive._number {
	uom: string;
}
export interface MeasureType extends _MeasureType { constructor: { new(): MeasureType }; }
export var MeasureType: { new(): MeasureType };

/** Base type for complex metadata property types. */
interface _MetaDataPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	about?: string;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface MetaDataPropertyType extends _MetaDataPropertyType { constructor: { new(): MetaDataPropertyType }; }
export var MetaDataPropertyType: { new(): MetaDataPropertyType };

interface _MetaDataProxyType extends BaseType {
	/** Concrete element in the _MetaData substitution group, which permits any well-formed XML content.  Intended to act as a container for metadata defined in external schemas, for which it is not possible to add the concrete components to the GML _MetaData substitution group directly. Deprecated with GML version 3.1.0. */
	GenericMetaData?: GenericMetaDataType;
}
interface MetaDataProxyType extends _MetaDataProxyType { constructor: { new(): MetaDataProxyType }; }

/** This type encapsulates various dynamic properties of moving objects
  * (points, lines, regions). It is useful for dealing with features whose
  * geometry or topology changes over time. */
interface _MovingObjectStatusType extends _AbstractTimeSliceType, _LocationProxyType {
	acceleration?: MeasureType;
	bearing?: DirectionPropertyType;
	elevation?: MeasureType;
	speed?: MeasureType;
	status?: StringOrRefType;
}
export interface MovingObjectStatusType extends _MovingObjectStatusType { constructor: { new(): MovingObjectStatusType }; }
export var MovingObjectStatusType: { new(): MovingObjectStatusType };

/** A discrete coverage type whose domain is defined by a collection of curves. */
interface _MultiCurveCoverageType extends _AbstractDiscreteCoverageType {
	boundedBy?: BoundingShapeType;
	coverageFunction?: CoverageFunctionType;
	/** Contains a simple text description of the object, or refers to an external description. */
	description?: StringOrRefType;
	/** Contains or refers to a metadata package that contains metadata properties. */
	metaDataProperty?: MetaDataPropertyType[];
	multiCurveDomain: MultiCurveDomainType;
	/** Label for the object, normally a descriptive name. An object may have several names, typically assigned by different authorities.  The authority for a name is indicated by the value of its (optional) codeSpace attribute.  The name may or may not be unique, as determined by the rules of the organization responsible for the codeSpace. */
	name?: NameProxyType[];
	rangeSet: RangeSetType;
}
export interface MultiCurveCoverageType extends _MultiCurveCoverageType { constructor: { new(): MultiCurveCoverageType }; }
export var MultiCurveCoverageType: { new(): MultiCurveCoverageType };

interface _MultiCurveDomainType extends _DomainSetType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	MultiCurve?: MultiCurveType;
}
export interface MultiCurveDomainType extends _MultiCurveDomainType { constructor: { new(): MultiCurveDomainType }; }
export var MultiCurveDomainType: { new(): MultiCurveDomainType };

/** A property that has a collection of curves as its value domain can either be an appropriate geometry element encapsulated in an element of this type or an XLink reference to a remote geometry element (where remote includes geometry elements located elsewhere in the same document). Either the reference or the contained element must be given, but neither both nor none. */
interface _MultiCurvePropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	MultiCurve?: MultiCurveType;
}
export interface MultiCurvePropertyType extends _MultiCurvePropertyType { constructor: { new(): MultiCurvePropertyType }; }
export var MultiCurvePropertyType: { new(): MultiCurvePropertyType };

/** A MultiCurve is defined by one or more Curves, referenced through curveMember elements. */
interface _MultiCurveType extends _AbstractGeometricAggregateType {
	/** This property element either references a curve via the XLink-attributes or contains the curve element. A curve element is any element which is substitutable for "_Curve". */
	curveMember?: CurvePropertyType[];
	/** This property element contains a list of curves. The order of the elements is significant and shall be preserved when processing the array. */
	curveMembers?: CurveArrayPropertyType;
}
export interface MultiCurveType extends _MultiCurveType { constructor: { new(): MultiCurveType }; }
export var MultiCurveType: { new(): MultiCurveType };

/** A property that has a geometric aggregate as its value domain can either be an appropriate geometry element encapsulated in an element of this type or an XLink reference to a remote geometry element (where remote includes geometry elements located elsewhere in the same document). Either the reference or the contained element must be given, but neither both nor none. */
interface _MultiGeometryPropertyType extends _GeometricAggregateProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface MultiGeometryPropertyType extends _MultiGeometryPropertyType { constructor: { new(): MultiGeometryPropertyType }; }
export var MultiGeometryPropertyType: { new(): MultiGeometryPropertyType };

/** A geometry collection must include one or more geometries, referenced through geometryMember elements. */
interface _MultiGeometryType extends _AbstractGeometricAggregateType {
	/** This property element either references a geometry element via the XLink-attributes or contains the geometry element. */
	geometryMember?: GeometryPropertyType[];
	/** This property element contains a list of geometry elements. The order of the elements is significant and shall be preserved when processing the array. */
	geometryMembers?: GeometryArrayPropertyType;
}
export interface MultiGeometryType extends _MultiGeometryType { constructor: { new(): MultiGeometryType }; }
export var MultiGeometryType: { new(): MultiGeometryType };

/** This type is deprecated with GML 3 and shall not be used. It is included for backwards compatibility with GML 2. Use MultiCurvePropertyType instead.
  * A property that has a collection of line strings as its value domain can either be an appropriate geometry element encapsulated in an element of this type or an XLink reference to a remote geometry element (where remote includes geometry elements located elsewhere in the same document). Either the reference or the contained element must be given, but neither both nor none. */
interface _MultiLineStringPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	/** Deprecated with GML 3.0 and included for backwards compatibility with GML 2. Use the "MultiCurve" element instead. */
	MultiLineString?: MultiLineStringType;
}
export interface MultiLineStringPropertyType extends _MultiLineStringPropertyType { constructor: { new(): MultiLineStringPropertyType }; }
export var MultiLineStringPropertyType: { new(): MultiLineStringPropertyType };

/** A MultiLineString is defined by one or more LineStrings, referenced through lineStringMember elements. Deprecated with GML version 3.0. Use MultiCurveType instead. */
interface _MultiLineStringType extends _AbstractGeometricAggregateType {
	/** Deprecated with GML 3.0 and included only for backwards compatibility with GML 2.0. Use "curveMember" instead.
	  * This property element either references a line string via the XLink-attributes or contains the line string element. */
	lineStringMember?: LineStringPropertyType[];
}
export interface MultiLineStringType extends _MultiLineStringType { constructor: { new(): MultiLineStringType }; }
export var MultiLineStringType: { new(): MultiLineStringType };

/** A discrete coverage type whose domain is defined by a collection of point */
interface _MultiPointCoverageType extends _AbstractDiscreteCoverageType {
	boundedBy?: BoundingShapeType;
	coverageFunction?: CoverageFunctionType;
	/** Contains a simple text description of the object, or refers to an external description. */
	description?: StringOrRefType;
	/** Contains or refers to a metadata package that contains metadata properties. */
	metaDataProperty?: MetaDataPropertyType[];
	multiPointDomain: MultiPointDomainType;
	/** Label for the object, normally a descriptive name. An object may have several names, typically assigned by different authorities.  The authority for a name is indicated by the value of its (optional) codeSpace attribute.  The name may or may not be unique, as determined by the rules of the organization responsible for the codeSpace. */
	name?: NameProxyType[];
	rangeSet: RangeSetType;
}
export interface MultiPointCoverageType extends _MultiPointCoverageType { constructor: { new(): MultiPointCoverageType }; }
export var MultiPointCoverageType: { new(): MultiPointCoverageType };

interface _MultiPointDomainType extends _DomainSetType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	MultiPoint?: MultiPointType;
}
export interface MultiPointDomainType extends _MultiPointDomainType { constructor: { new(): MultiPointDomainType }; }
export var MultiPointDomainType: { new(): MultiPointDomainType };

/** A property that has a collection of points as its value domain can either be an appropriate geometry element encapsulated in an element of this type or an XLink reference to a remote geometry element (where remote includes geometry elements located elsewhere in the same document). Either the reference or the contained element must be given, but neither both nor none. */
interface _MultiPointPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	MultiPoint?: MultiPointType;
}
export interface MultiPointPropertyType extends _MultiPointPropertyType { constructor: { new(): MultiPointPropertyType }; }
export var MultiPointPropertyType: { new(): MultiPointPropertyType };

/** A MultiPoint is defined by one or more Points, referenced through pointMember elements. */
interface _MultiPointType extends _AbstractGeometricAggregateType {
	/** This property element either references a Point via the XLink-attributes or contains the Point element. */
	pointMember?: PointPropertyType[];
	/** This property element contains a list of points. The order of the elements is significant and shall be preserved when processing the array. */
	pointMembers?: PointArrayPropertyType;
}
export interface MultiPointType extends _MultiPointType { constructor: { new(): MultiPointType }; }
export var MultiPointType: { new(): MultiPointType };

/** This type is deprecated with GML 3 and shall not be used. It is included for backwards compatibility with GML 2. Use MultiSurfacePropertyType instead.
  *
  * A property that has a collection of polygons as its value domain can either be an appropriate geometry element encapsulated in an element of this type or an XLink reference to a remote geometry element (where remote includes geometry elements located elsewhere in the same document). Either the reference or the contained element must be given, but neither both nor none. */
interface _MultiPolygonPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	/** Deprecated with GML 3.0 and included for backwards compatibility with GML 2. Use the "MultiSurface" element instead. */
	MultiPolygon?: MultiPolygonType;
}
export interface MultiPolygonPropertyType extends _MultiPolygonPropertyType { constructor: { new(): MultiPolygonPropertyType }; }
export var MultiPolygonPropertyType: { new(): MultiPolygonPropertyType };

/** A MultiPolygon is defined by one or more Polygons, referenced through polygonMember elements. Deprecated with GML version 3.0. Use MultiSurfaceType instead. */
interface _MultiPolygonType extends _AbstractGeometricAggregateType {
	/** Deprecated with GML 3.0 and included only for backwards compatibility with GML 2.0. Use "surfaceMember" instead.
	  * This property element either references a polygon via the XLink-attributes or contains the polygon element. */
	polygonMember?: PolygonPropertyType[];
}
export interface MultiPolygonType extends _MultiPolygonType { constructor: { new(): MultiPolygonType }; }
export var MultiPolygonType: { new(): MultiPolygonType };

/** A discrete coverage type whose domain is defined by a collection of Solids. */
interface _MultiSolidCoverageType extends _AbstractDiscreteCoverageType {
	boundedBy?: BoundingShapeType;
	coverageFunction?: CoverageFunctionType;
	/** Contains a simple text description of the object, or refers to an external description. */
	description?: StringOrRefType;
	/** Contains or refers to a metadata package that contains metadata properties. */
	metaDataProperty?: MetaDataPropertyType[];
	multiSolidDomain: MultiSolidDomainType;
	/** Label for the object, normally a descriptive name. An object may have several names, typically assigned by different authorities.  The authority for a name is indicated by the value of its (optional) codeSpace attribute.  The name may or may not be unique, as determined by the rules of the organization responsible for the codeSpace. */
	name?: NameProxyType[];
	rangeSet: RangeSetType;
}
export interface MultiSolidCoverageType extends _MultiSolidCoverageType { constructor: { new(): MultiSolidCoverageType }; }
export var MultiSolidCoverageType: { new(): MultiSolidCoverageType };

interface _MultiSolidDomainType extends _DomainSetType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	MultiSolid?: MultiSolidType;
}
export interface MultiSolidDomainType extends _MultiSolidDomainType { constructor: { new(): MultiSolidDomainType }; }
export var MultiSolidDomainType: { new(): MultiSolidDomainType };

/** A property that has a collection of solids as its value domain can either be an appropriate geometry element encapsulated in an element of this type or an XLink reference to a remote geometry element (where remote includes geometry elements located elsewhere in the same document). Either the reference or the contained element must be given, but neither both nor none. */
interface _MultiSolidPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	MultiSolid?: MultiSolidType;
}
export interface MultiSolidPropertyType extends _MultiSolidPropertyType { constructor: { new(): MultiSolidPropertyType }; }
export var MultiSolidPropertyType: { new(): MultiSolidPropertyType };

/** A MultiSolid is defined by one or more Solids, referenced through solidMember elements. */
interface _MultiSolidType extends _AbstractGeometricAggregateType {
	/** This property element either references a solid via the XLink-attributes or contains the solid element. A solid element is any element which is substitutable for "_Solid". */
	solidMember?: SolidPropertyType[];
	/** This property element contains a list of solids. The order of the elements is significant and shall be preserved when processing the array. */
	solidMembers?: SolidArrayPropertyType;
}
export interface MultiSolidType extends _MultiSolidType { constructor: { new(): MultiSolidType }; }
export var MultiSolidType: { new(): MultiSolidType };

/** A discrete coverage type whose domain is defined by a collection of surface patches (includes polygons, triangles, rectangles, etc). */
interface _MultiSurfaceCoverageType extends _AbstractDiscreteCoverageType {
	boundedBy?: BoundingShapeType;
	coverageFunction?: CoverageFunctionType;
	/** Contains a simple text description of the object, or refers to an external description. */
	description?: StringOrRefType;
	/** Contains or refers to a metadata package that contains metadata properties. */
	metaDataProperty?: MetaDataPropertyType[];
	multiSurfaceDomain: MultiSurfaceDomainType;
	/** Label for the object, normally a descriptive name. An object may have several names, typically assigned by different authorities.  The authority for a name is indicated by the value of its (optional) codeSpace attribute.  The name may or may not be unique, as determined by the rules of the organization responsible for the codeSpace. */
	name?: NameProxyType[];
	rangeSet: RangeSetType;
}
export interface MultiSurfaceCoverageType extends _MultiSurfaceCoverageType { constructor: { new(): MultiSurfaceCoverageType }; }
export var MultiSurfaceCoverageType: { new(): MultiSurfaceCoverageType };

interface _MultiSurfaceDomainType extends _DomainSetType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	MultiSurface?: MultiSurfaceType;
}
export interface MultiSurfaceDomainType extends _MultiSurfaceDomainType { constructor: { new(): MultiSurfaceDomainType }; }
export var MultiSurfaceDomainType: { new(): MultiSurfaceDomainType };

/** A property that has a collection of surfaces as its value domain can either be an appropriate geometry element encapsulated in an element of this type or an XLink reference to a remote geometry element (where remote includes geometry elements located elsewhere in the same document). Either the reference or the contained element must be given, but neither both nor none. */
interface _MultiSurfacePropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	MultiSurface?: MultiSurfaceType;
}
export interface MultiSurfacePropertyType extends _MultiSurfacePropertyType { constructor: { new(): MultiSurfacePropertyType }; }
export var MultiSurfacePropertyType: { new(): MultiSurfacePropertyType };

/** A MultiSurface is defined by one or more Surfaces, referenced through surfaceMember elements. */
interface _MultiSurfaceType extends _AbstractGeometricAggregateType {
	/** This property element either references a surface via the XLink-attributes or contains the surface element. A surface element is any element which is substitutable for "_Surface". */
	surfaceMember?: SurfacePropertyType[];
	/** This property element contains a list of surfaces. The order of the elements is significant and shall be preserved when processing the array. */
	surfaceMembers?: SurfaceArrayPropertyType;
}
export interface MultiSurfaceType extends _MultiSurfaceType { constructor: { new(): MultiSurfaceType }; }
export var MultiSurfaceType: { new(): MultiSurfaceType };

/** XML List based on XML Schema Name type.  An element of this type contains a space-separated list of Name values */
export type NameList = string[];

/** Union of the XML Schema Name type and the GML Nulltype.  An element which uses this type may have content which is either a Name or a value from Nulltype.  Note that a "Name" may not contain whitespace. */
export type NameOrNull = string;
type _NameOrNull = Primitive._string;

/** XML List based on the union type defined above.  An element declared with this type contains a space-separated list of Name values with null values interspersed as needed */
export type NameOrNullList = string[];

interface _NameProxyType extends BaseType {
	/** Label for the object, normally a descriptive name. An object may have several names, typically assigned by different authorities.  The authority for a name is indicated by the value of its (optional) codeSpace attribute.  The name may or may not be unique, as determined by the rules of the organization responsible for the codeSpace. */
	name?: CodeType;
	/** The name by which this coordinate system is identified. */
	csName?: CodeType;
	/** The name by which this datum is identified. */
	datumName?: CodeType;
	/** The name by which this prime meridian is identified. The meridianName most common value is Greenwich, and that value shall be used when the greenwichLongitude value is zero. */
	meridianName?: CodeType;
	/** The name by which this ellipsoid is identified. */
	ellipsoidName?: CodeType;
	/** The name by which this reference system is identified. */
	srsName?: CodeType;
	/** The name by which this coordinate operation is identified. */
	coordinateOperationName?: CodeType;
	/** The name by which this operation method is identified. */
	methodName?: CodeType;
	/** The name by which this operation parameter is identified. */
	parameterName?: CodeType;
	/** The name by which this operation parameter group is identified. */
	groupName?: CodeType;
}
interface NameProxyType extends _NameProxyType { constructor: { new(): NameProxyType }; }

/** A set of values, representing a list of token with the lexical value space of NCName. The tokens are seperated by whitespace. */
export type NCNameList = string[];

/** Its optional co-boundary is a set of connected directedEdges.  The orientation of one of these dirEdges is "+" if the Node is the "to" node of the Edge, and "-" if it is the "from" node. */
interface _NodeType extends _AbstractTopoPrimitiveType {
	directedEdge?: DirectedEdgePropertyType[];
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty
	  * is the predefined property which can be used by GML Application Schemas whenever a GML Feature has a property with a value that
	  * is substitutable for Point. */
	pointProperty?: PointPropertyType;
}
export interface NodeType extends _NodeType { constructor: { new(): NodeType }; }
export var NodeType: { new(): NodeType };

/** Some common reasons for a null value:
  *
  * innapplicable - the object does not have a value
  * missing - The correct value is not readily available to the sender of this data.
  * Furthermore, a correct value may not exist.
  * template - the value will be available later
  * unknown - The correct value is not known to, and not computable by, the sender of this data.
  * However, a correct value probably exists.
  * withheld - the value is not divulged
  *
  * other:reason - as indicated by "reason" string
  *
  * Specific communities may agree to assign more strict semantics when these terms are used in a particular context. */
export type NullEnumeration = string;
type _NullEnumeration = Primitive._string;

/** Utility type for null elements.  The value may be selected from one of the enumerated tokens, or may be a URI in which case this should identify a resource which describes the reason for the null. */
export type NullType = string;
type _NullType = Primitive._string;

interface _ObjectProxyType extends _GMLProxyType, _MetaDataProxyType {}
interface ObjectProxyType extends _ObjectProxyType { constructor: { new(): ObjectProxyType }; }

/** Association to an oblique-Cartesian coordinate system, either referencing or containing the definition of that coordinate system. */
interface _ObliqueCartesianCSRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	ObliqueCartesianCS?: ObliqueCartesianCSType;
}
export interface ObliqueCartesianCSRefType extends _ObliqueCartesianCSRefType { constructor: { new(): ObliqueCartesianCSRefType }; }
export var ObliqueCartesianCSRefType: { new(): ObliqueCartesianCSRefType };

/** A two- or three-dimensional coordinate system with straight axes that are not necessarily orthogonal. An ObliqueCartesianCS shall have two or three usesAxis associations. */
interface _ObliqueCartesianCSType extends _AbstractCoordinateSystemType {}
export interface ObliqueCartesianCSType extends _ObliqueCartesianCSType { constructor: { new(): ObliqueCartesianCSType }; }
export var ObliqueCartesianCSType: { new(): ObliqueCartesianCSType };

interface _ObservationProxyType extends _DirectedObservationProxyType {
	Observation?: ObservationType;
}
interface ObservationProxyType extends _ObservationProxyType { constructor: { new(): ObservationProxyType }; }

interface _ObservationType extends _AbstractFeatureType, _TargetProxyType {
	/** The result of the observation: an image, external object, etc */
	resultOf: AssociationType;
	/** This element contains or points to a description of a sensor, instrument or procedure used for the observation */
	using?: FeaturePropertyType;
	validTime: TimePrimitivePropertyType;
}
export interface ObservationType extends _ObservationType { constructor: { new(): ObservationType }; }
export var ObservationType: { new(): ObservationType };

/** An offset curve is a curve at a constant
  * distance from the basis curve. They can be useful as a cheap
  * and simple alternative to constructing curves that are offsets
  * by definition. */
interface _OffsetCurveType extends _AbstractCurveSegmentType {
	/** distance is the distance at which the
	  * offset curve is generated from the basis curve. In 2D systems, positive distances
	  * are to be to the left of the basis curve, and the negative distances are to be to the
	  * right of the basis curve. */
	distance: LengthType;
	/** offsetBase is a reference to thecurve from which this
	  * curve is define	as an offset. */
	offsetBase: CurvePropertyType;
	/** refDistance is used to define the vector
	  * direction of the offset curve from the basis curve. It can
	  * be omitted in the 2D case, where the distance can be
	  * positive or negative. In that case, distance defines left
	  * side (positive distance) or right side (negative distance)
	  * with respect to the tangent to the basis curve.
	  *
	  * In 3D the basis curve shall have a well defined tangent
	  * direction for every point. The offset curve at any point
	  * in 3D, the basis curve shall have a well-defined tangent
	  * direction for every point. The offset curve at any point
	  * (parameter) on the basis curve c is in the direction
	  * -   -   -         -
	  * s = v x t  where  v = c.refDirection()
	  * and
	  * -
	  * t = c.tangent()
	  * -
	  * For the offset direction to be well-defined, v shall not
	  * on any point of the curve be in the same, or opposite,
	  * direction as
	  * -
	  * t.
	  *
	  * The default value of the refDirection shall be the local
	  * co-ordinate axis vector for elevation, which indicates up for
	  * the curve in a geographic sense.
	  *
	  * NOTE! If the refDirection is the positive tangent to the
	  * local elevation axis ("points upward"), then the offset
	  * vector points to the left of the curve when viewed from
	  * above. */
	refDirection?: VectorType;
}
export interface OffsetCurveType extends _OffsetCurveType { constructor: { new(): OffsetCurveType }; }
export var OffsetCurveType: { new(): OffsetCurveType };

/** Basic encoding for operation method objects, simplifying and restricting the DefinitionType as needed. */
interface _OperationMethodBaseType extends _DefinitionType {
	/** Database handle for the object.  It is of XML type ID, so is constrained to be unique in the XML document within which it occurs.  An external identifier for the object in the form of a URI may be constructed using standard XML and XPointer methods.  This is done by concatenating the URI for the document, a fragment separator, and the value of the id attribute. */
	id: string;
	/** Contains or refers to a metadata package that contains metadata properties. */
	metaDataProperty?: MetaDataPropertyType[];
	/** The name by which this operation method is identified. */
	methodName: CodeType;
}
export interface OperationMethodBaseType extends _OperationMethodBaseType { constructor: { new(): OperationMethodBaseType }; }
export var OperationMethodBaseType: { new(): OperationMethodBaseType };

/** Association to a concrete general-purpose operation method, either referencing or containing the definition of that method. */
interface _OperationMethodRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	OperationMethod?: OperationMethodType;
}
export interface OperationMethodRefType extends _OperationMethodRefType { constructor: { new(): OperationMethodRefType }; }
export var OperationMethodRefType: { new(): OperationMethodRefType };

/** Definition of an algorithm used to perform a coordinate operation. Most operation methods use a number of operation parameters, although some coordinate conversions use none. Each coordinate operation using the method assigns values to these parameters. */
interface _OperationMethodType extends _OperationMethodBaseType {
	/** Formula(s) used by this operation method. The value may be a reference to a publication. Note that the operation method may not be analytic, in which case this element references or contains the procedure, not an analytic formula. */
	methodFormula: CodeType;
	/** An identification of an operation method. */
	methodID?: IdentifierType[];
	/** Information about this object or code. Contains text or refers to external text. */
	remarks?: StringOrRefType;
	/** Number of dimensions in the source CRS of this operation method. */
	sourceDimensions: number;
	/** Number of dimensions in the target CRS of this operation method. */
	targetDimensions: number;
	/** Association to an operation parameter or parameter group used by this operation method. */
	usesParameter?: AbstractGeneralOperationParameterRefType[];
}
export interface OperationMethodType extends _OperationMethodType { constructor: { new(): OperationMethodType }; }
export var OperationMethodType: { new(): OperationMethodType };

/** Basic encoding for operation parameter objects, simplifying and restricting the DefinitionType as needed. */
interface _OperationParameterBaseType extends _AbstractGeneralOperationParameterType {
	/** Database handle for the object.  It is of XML type ID, so is constrained to be unique in the XML document within which it occurs.  An external identifier for the object in the form of a URI may be constructed using standard XML and XPointer methods.  This is done by concatenating the URI for the document, a fragment separator, and the value of the id attribute. */
	id: string;
	/** Contains or refers to a metadata package that contains metadata properties. */
	metaDataProperty?: MetaDataPropertyType[];
	/** The minimum number of times that values for this parameter group or parameter are required. If this attribute is omitted, the minimum number is one. */
	minimumOccurs?: number;
	/** The name by which this operation parameter is identified. */
	parameterName: CodeType;
}
export interface OperationParameterBaseType extends _OperationParameterBaseType { constructor: { new(): OperationParameterBaseType }; }
export var OperationParameterBaseType: { new(): OperationParameterBaseType };

/** Basic encoding for operation parameter group objects, simplifying and restricting the DefinitionType as needed. */
interface _OperationParameterGroupBaseType extends _AbstractGeneralOperationParameterType {
	/** Database handle for the object.  It is of XML type ID, so is constrained to be unique in the XML document within which it occurs.  An external identifier for the object in the form of a URI may be constructed using standard XML and XPointer methods.  This is done by concatenating the URI for the document, a fragment separator, and the value of the id attribute. */
	id: string;
	/** The name by which this operation parameter group is identified. */
	groupName: CodeType;
	/** Contains or refers to a metadata package that contains metadata properties. */
	metaDataProperty?: MetaDataPropertyType[];
	/** The minimum number of times that values for this parameter group or parameter are required. If this attribute is omitted, the minimum number is one. */
	minimumOccurs?: number;
}
export interface OperationParameterGroupBaseType extends _OperationParameterGroupBaseType { constructor: { new(): OperationParameterGroupBaseType }; }
export var OperationParameterGroupBaseType: { new(): OperationParameterGroupBaseType };

/** Association to an operation parameter, either referencing or containing the definition of that parameter. */
interface _OperationParameterGroupRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	OperationParameterGroup?: OperationParameterGroupType;
}
export interface OperationParameterGroupRefType extends _OperationParameterGroupRefType { constructor: { new(): OperationParameterGroupRefType }; }
export var OperationParameterGroupRefType: { new(): OperationParameterGroupRefType };

/** The definition of a group of parameters used by an operation method. This complexType is expected to be used or extended for all applicable operation methods, without defining operation-method-specialized element names. */
interface _OperationParameterGroupType extends _OperationParameterGroupBaseType {
	/** An identification of an operation parameter group. */
	groupID?: IdentifierType[];
	/** Association to an operation parameter that is a member of a group. */
	includesParameter: AbstractGeneralOperationParameterRefType[];
	/** The maximum number of times that values for this parameter group can be included. If this attribute is omitted, the maximum number is one. */
	maximumOccurs?: number;
	/** Information about this object or code. Contains text or refers to external text. */
	remarks?: StringOrRefType;
}
export interface OperationParameterGroupType extends _OperationParameterGroupType { constructor: { new(): OperationParameterGroupType }; }
export var OperationParameterGroupType: { new(): OperationParameterGroupType };

/** Association to an operation parameter, either referencing or containing the definition of that parameter. */
interface _OperationParameterRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	OperationParameter?: OperationParameterType;
}
export interface OperationParameterRefType extends _OperationParameterRefType { constructor: { new(): OperationParameterRefType }; }
export var OperationParameterRefType: { new(): OperationParameterRefType };

/** The definition of a parameter used by an operation method. Most parameter values are numeric, but other types of parameter values are possible. This complexType is expected to be used or extended for all operation methods, without defining operation-method-specialized element names. */
interface _OperationParameterType extends _OperationParameterBaseType {
	/** An identification of an operation parameter. */
	parameterID?: IdentifierType[];
	/** Information about this object or code. Contains text or refers to external text. */
	remarks?: StringOrRefType;
}
export interface OperationParameterType extends _OperationParameterType { constructor: { new(): OperationParameterType }; }
export var OperationParameterType: { new(): OperationParameterType };

interface _OperationProxyType extends _GeneralConversionProxyType, _GeneralTransformationProxyType {}
interface OperationProxyType extends _OperationProxyType { constructor: { new(): OperationProxyType }; }

/** Association to an abstract operation, either referencing or containing the definition of that operation. */
interface _OperationRefType extends _OperationProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface OperationRefType extends _OperationRefType { constructor: { new(): OperationRefType }; }
export var OperationRefType: { new(): OperationRefType };

/** OrientableCurve consists of a curve and an orientation. If the orientation is "+", then the OrientableCurve is identical to the baseCurve. If the orientation is "-", then the OrientableCurve is related to another _Curve with a parameterization that reverses the sense of the curve traversal. */
interface _OrientableCurveType extends _AbstractCurveType {
	/** If the orientation is "+", then the OrientableCurve is identical to the baseCurve. If the orientation is "-", then the OrientableCurve is related to another _Curve with a parameterization that reverses the sense of the curve traversal. "+" is the default value. */
	orientation: SignType;
	/** This property element either references a curve via the XLink-attributes or contains the curve element. A curve element is any element which is substitutable for "_Curve". */
	baseCurve: CurvePropertyType;
}
export interface OrientableCurveType extends _OrientableCurveType { constructor: { new(): OrientableCurveType }; }
export var OrientableCurveType: { new(): OrientableCurveType };

/** OrientableSurface consists of a surface and an orientation. If the orientation is "+", then the OrientableSurface is identical to the baseSurface. If the orientation is "-", then the OrientableSurface is a reference to a Surface with an up-normal that reverses the direction for this OrientableSurface, the sense of "the top of the surface". */
interface _OrientableSurfaceType extends _AbstractSurfaceType {
	/** If the orientation is "+", then the OrientableSurface is identical to the baseSurface. If the orientation is "-", then the OrientableSurface is a reference to a Surface with an up-normal that reverses the direction for this OrientableSurface, the sense of "the top of the surface". "+" is the default value. */
	orientation: SignType;
	/** This property element either references a surface via the XLink-attributes or contains the surface element. A surface element is any element which is substitutable for "_Surface". */
	baseSurface: SurfacePropertyType;
}
export interface OrientableSurfaceType extends _OrientableSurfaceType { constructor: { new(): OrientableSurfaceType }; }
export var OrientableSurfaceType: { new(): OrientableSurfaceType };

/** A group of related parameter values. The same group can be repeated more than once in a Conversion, Transformation, or higher level parameterValueGroup, if those instances contain different values of one or more parameterValues which suitably distinquish among those groups. This concrete complexType can be used for operation methods without using an Application Schema that defines operation-method-specialized element names and contents, especially for methods with only one instance. This complexType can be used, extended, or restricted for well-known operation methods, especially for methods with many instances. */
interface _ParameterValueGroupType extends _AbstractGeneralParameterValueType {
	/** A composition association to a parameter value or group of values included in this group. */
	includesValue: AbstractGeneralParameterValueType[];
	/** Association to the operation parameter group for which this element provides parameter values. */
	valuesOfGroup: OperationParameterGroupRefType;
}
export interface ParameterValueGroupType extends _ParameterValueGroupType { constructor: { new(): ParameterValueGroupType }; }
export var ParameterValueGroupType: { new(): ParameterValueGroupType };

/** A parameter value, ordered sequence of values, or reference to a file of parameter values. This concrete complexType can be used for operation methods without using an Application Schema that defines operation-method-specialized element names and contents, especially for methods with only one instance. This complexType can be used, extended, or restricted for well-known operation methods, especially for methods with many instances. */
interface _ParameterValueType extends _AbstractGeneralParameterValueType {
	/** Boolean value of an operation parameter. A Boolean value does not have an associated unit of measure. */
	booleanValue: boolean;
	/** Value of an angle operation parameter, in either degree-minute-second format or single value format. */
	dmsAngleValue: DMSAngleType;
	/** Positive integer value of an operation parameter, usually used for a count. An integer value does not have an associated unit of measure. */
	integerValue: number;
	/** Ordered sequence of two or more integer values of an operation parameter list, usually used for counts. These integer values do not have an associated unit of measure. An element of this type contains a space-separated sequence of integer values. */
	integerValueList: integerList;
	/** String value of an operation parameter. A string value does not have an associated unit of measure. */
	stringValue: string;
	/** Numeric value of an operation parameter, with its associated unit of measure. */
	value: MeasureType;
	/** Reference to a file or a part of a file containing one or more parameter values, each numeric value with its associated unit of measure. When referencing a part of a file, that file must contain multiple identified parts, such as an XML encoded document. Furthermore, the referenced file or part of a file can reference another part of the same or different files, as allowed in XML documents. */
	valueFile: string;
	/** Ordered sequence of two or more numeric values of an operation parameter list, where each value has the same associated unit of measure. An element of this type contains a space-separated sequence of double values. */
	valueList: MeasureListType;
	/** Association to the operation parameter that this is a value of. */
	valueOfParameter: OperationParameterRefType;
}
export interface ParameterValueType extends _ParameterValueType { constructor: { new(): ParameterValueType }; }
export var ParameterValueType: { new(): ParameterValueType };

interface _ParametricCurveSurfaceProxyType extends _GriddedSurfaceProxyType {}
interface ParametricCurveSurfaceProxyType extends _ParametricCurveSurfaceProxyType { constructor: { new(): ParametricCurveSurfaceProxyType }; }

/** Association to a pass through operation, either referencing or containing the definition of that pass through operation. */
interface _PassThroughOperationRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	PassThroughOperation?: PassThroughOperationType;
}
export interface PassThroughOperationRefType extends _PassThroughOperationRefType { constructor: { new(): PassThroughOperationRefType }; }
export var PassThroughOperationRefType: { new(): PassThroughOperationRefType };

/** A pass-through operation specifies that a subset of a coordinate tuple is subject to a specific coordinate operation. */
interface _PassThroughOperationType extends _AbstractCoordinateOperationType {
	/** A positive integer defining a position in a coordinate tuple. */
	modifiedCoordinate: number[];
	/** Association to the operation applied to the specified ordinates. */
	usesOperation: OperationRefType;
}
export interface PassThroughOperationType extends _PassThroughOperationType { constructor: { new(): PassThroughOperationType }; }
export var PassThroughOperationType: { new(): PassThroughOperationType };

interface _PatchesProxyType extends BaseType {
	/** This property element contains a list of surface patches. The order of the elements is significant and shall be preserved when processing the array. */
	patches?: SurfacePatchArrayPropertyType;
	/** This property element contains a list of
	  * polygon patches. The order of the patches is significant and
	  * shall be preserved when processing the list. */
	polygonPatches?: PolygonPatchArrayPropertyType;
	/** This property element contains a list of
	  * triangle patches. The order of the patches is significant and
	  * shall be preserved when processing the list. */
	trianglePatches?: TrianglePatchArrayPropertyType;
}
interface PatchesProxyType extends _PatchesProxyType { constructor: { new(): PatchesProxyType }; }

/** Specification of the way an image grid is associated with the image data attributes. */
interface _PixelInCellType extends _CodeType {
	/** Reference to a source of information specifying the values and meanings of all the allowed string values for this PixelInCellType. */
	codeSpace: string;
}
export interface PixelInCellType extends _PixelInCellType { constructor: { new(): PixelInCellType }; }
export var PixelInCellType: { new(): PixelInCellType };

/** A container for an array of points. The elements are always contained in the array property, referencing geometry
  * elements or arrays of geometry elements is not supported. */
interface _PointArrayPropertyType extends BaseType {
	Point?: PointType[];
}
export interface PointArrayPropertyType extends _PointArrayPropertyType { constructor: { new(): PointArrayPropertyType }; }
export var PointArrayPropertyType: { new(): PointArrayPropertyType };

/** A property that has a point as its value domain can either be an appropriate geometry element encapsulated in an
  * element of this type or an XLink reference to a remote geometry element (where remote includes geometry elements located
  * elsewhere in the same document). Either the reference or the contained element must be given, but neither both nor none. */
interface _PointPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	Point?: PointType;
}
export interface PointPropertyType extends _PointPropertyType { constructor: { new(): PointPropertyType }; }
export var PointPropertyType: { new(): PointPropertyType };

/** A Point is defined by a single coordinate tuple. */
interface _PointType extends _AbstractGeometricPrimitiveType {
	/** Deprecated with GML 3.0 and included for backwards compatibility with GML 2. Use the "pos" element instead. */
	coord: CoordType;
	/** Deprecated with GML version 3.1.0. */
	coordinates: CoordinatesType;
	pos: DirectPositionType;
}
export interface PointType extends _PointType { constructor: { new(): PointType }; }
export var PointType: { new(): PointType };

/** Association to a polar coordinate system, either referencing or containing the definition of that coordinate system. */
interface _PolarCSRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	PolarCS?: PolarCSType;
}
export interface PolarCSRefType extends _PolarCSRefType { constructor: { new(): PolarCSRefType }; }
export var PolarCSRefType: { new(): PolarCSRefType };

/** A two-dimensional coordinate system in which position is specified by the distance from the origin and the angle between the line from the origin to a point and a reference direction. A PolarCS shall have two usesAxis associations. */
interface _PolarCSType extends _AbstractCoordinateSystemType {}
export interface PolarCSType extends _PolarCSType { constructor: { new(): PolarCSType }; }
export var PolarCSType: { new(): PolarCSType };

/** This type defines a container for an array of
  * polygon patches. */
interface _PolygonPatchArrayPropertyType extends _SurfacePatchArrayPropertyType {
	PolygonPatch?: PolygonPatchType[];
}
export interface PolygonPatchArrayPropertyType extends _PolygonPatchArrayPropertyType { constructor: { new(): PolygonPatchArrayPropertyType }; }
export var PolygonPatchArrayPropertyType: { new(): PolygonPatchArrayPropertyType };

/** A PolygonPatch is a surface patch that is defined by a set of boundary curves and an underlying surface to which these curves adhere. The curves are coplanar and the polygon uses planar interpolation in its interior. Implements GM_Polygon of ISO 19107. */
interface _PolygonPatchType extends _AbstractSurfacePatchType, _ExteriorProxyType {
	/** The attribute "interpolation" specifies the interpolation mechanism used for this surface patch. Currently only planar surface patches are defined in GML 3, the attribute is fixed to "planar", i.e. the interpolation method shall return points on a single plane. The boundary of the patch shall be contained within that plane. */
	interpolation: SurfaceInterpolationType;
	/** A boundary of a surface consists of a number of rings. The "interior" rings seperate the surface / surface patch from the area enclosed by the rings. */
	interior?: InteriorProxyType[];
}
export interface PolygonPatchType extends _PolygonPatchType { constructor: { new(): PolygonPatchType }; }
export var PolygonPatchType: { new(): PolygonPatchType };

/** This type is deprecated with GML 3 and shall not be used. It is included for backwards compatibility with GML 2. Use SurfacePropertyType instead.
  * A property that has a polygon as its value domain can either be an appropriate geometry element encapsulated in an element of this type or an XLink reference to a remote geometry element (where remote includes geometry elements located elsewhere in the same document). Either the reference or the contained element must be given, but neither both nor none. */
interface _PolygonPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	Polygon?: PolygonType;
}
export interface PolygonPropertyType extends _PolygonPropertyType { constructor: { new(): PolygonPropertyType }; }
export var PolygonPropertyType: { new(): PolygonPropertyType };

/** A Polygon is a special surface that is defined by a single surface patch. The boundary of this patch is coplanar and the polygon uses planar interpolation in its interior. It is backwards compatible with the Polygon of GML 2, GM_Polygon of ISO 19107 is implemented by PolygonPatch. */
interface _PolygonType extends _AbstractSurfaceType, _ExteriorProxyType {
	/** A boundary of a surface consists of a number of rings. The "interior" rings seperate the surface / surface patch from the area enclosed by the rings. */
	interior?: InteriorProxyType[];
}
export interface PolygonType extends _PolygonType { constructor: { new(): PolygonType }; }
export var PolygonType: { new(): PolygonType };

/** A polyhedral surface is a surface composed
  * of polygon surfaces connected along their common boundary
  * curves. This differs from the surface type only in the
  * restriction on the types of surface patches acceptable. */
interface _PolyhedralSurfaceType extends _SurfaceType {
	/** Contains a simple text description of the object, or refers to an external description. */
	description?: StringOrRefType;
	/** Contains or refers to a metadata package that contains metadata properties. */
	metaDataProperty?: MetaDataPropertyType[];
	/** Label for the object, normally a descriptive name. An object may have several names, typically assigned by different authorities.  The authority for a name is indicated by the value of its (optional) codeSpace attribute.  The name may or may not be unique, as determined by the rules of the organization responsible for the codeSpace. */
	name?: NameProxyType[];
	/** This property element contains a list of
	  * polygon patches. The order of the patches is significant and
	  * shall be preserved when processing the list. */
	polygonPatches: PolygonPatchArrayPropertyType;
}
export interface PolyhedralSurfaceType extends _PolyhedralSurfaceType { constructor: { new(): PolyhedralSurfaceType }; }
export var PolyhedralSurfaceType: { new(): PolyhedralSurfaceType };

interface _PositionalAccuracyProxyType extends BaseType {
	absoluteExternalPositionalAccuracy?: AbsoluteExternalPositionalAccuracyType;
	covarianceMatrix?: CovarianceMatrixType;
	relativeInternalPositionalAccuracy?: RelativeInternalPositionalAccuracyType;
}
interface PositionalAccuracyProxyType extends _PositionalAccuracyProxyType { constructor: { new(): PositionalAccuracyProxyType }; }

/** Basic encoding for prime meridian objects, simplifying and restricting the DefinitionType as needed. */
interface _PrimeMeridianBaseType extends _DefinitionType {
	/** Database handle for the object.  It is of XML type ID, so is constrained to be unique in the XML document within which it occurs.  An external identifier for the object in the form of a URI may be constructed using standard XML and XPointer methods.  This is done by concatenating the URI for the document, a fragment separator, and the value of the id attribute. */
	id: string;
	/** The name by which this prime meridian is identified. The meridianName most common value is Greenwich, and that value shall be used when the greenwichLongitude value is zero. */
	meridianName: CodeType;
	/** Contains or refers to a metadata package that contains metadata properties. */
	metaDataProperty?: MetaDataPropertyType[];
}
export interface PrimeMeridianBaseType extends _PrimeMeridianBaseType { constructor: { new(): PrimeMeridianBaseType }; }
export var PrimeMeridianBaseType: { new(): PrimeMeridianBaseType };

/** Association to a prime meridian, either referencing or containing the definition of that meridian. */
interface _PrimeMeridianRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	PrimeMeridian?: PrimeMeridianType;
}
export interface PrimeMeridianRefType extends _PrimeMeridianRefType { constructor: { new(): PrimeMeridianRefType }; }
export var PrimeMeridianRefType: { new(): PrimeMeridianRefType };

/** A prime meridian defines the origin from which longitude values are determined. */
interface _PrimeMeridianType extends _PrimeMeridianBaseType {
	/** Longitude of the prime meridian measured from the Greenwich meridian, positive eastward. The greenwichLongitude most common value is zero, and that value shall be used when the meridianName value is Greenwich. */
	greenwichLongitude: AngleChoiceType;
	/** An identification of a prime meridian. */
	meridianID?: IdentifierType[];
	/** Information about this object or code. Contains text or refers to external text. */
	remarks?: StringOrRefType;
}
export interface PrimeMeridianType extends _PrimeMeridianType { constructor: { new(): PrimeMeridianType }; }
export var PrimeMeridianType: { new(): PrimeMeridianType };

/** G-XML componentDeprecated in GML 3.1.0 */
interface _PriorityLocationPropertyType extends _LocationPropertyType {
	priority?: string;
}
export interface PriorityLocationPropertyType extends _PriorityLocationPropertyType { constructor: { new(): PriorityLocationPropertyType }; }
export var PriorityLocationPropertyType: { new(): PriorityLocationPropertyType };

/** Association to a projected coordinate reference system, either referencing or containing the definition of that reference system. */
interface _ProjectedCRSRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	ProjectedCRS?: ProjectedCRSType;
}
export interface ProjectedCRSRefType extends _ProjectedCRSRefType { constructor: { new(): ProjectedCRSRefType }; }
export var ProjectedCRSRefType: { new(): ProjectedCRSRefType };

/** A 2D coordinate reference system used to approximate the shape of the earth on a planar surface, but in such a way that the distortion that is inherent to the approximation is carefully controlled and known. Distortion correction is commonly applied to calculated bearings and distances to produce values that are a close match to actual field values. */
interface _ProjectedCRSType extends _AbstractGeneralDerivedCRSType {
	/** Association to the Cartesian coordinate system used by this CRS. */
	usesCartesianCS: CartesianCSRefType;
}
export interface ProjectedCRSType extends _ProjectedCRSType { constructor: { new(): ProjectedCRSType }; }
export var ProjectedCRSType: { new(): ProjectedCRSType };

/** A set of values, representing a list of token with the lexical value space of QName. The tokens are seperated by whitespace. */
export type QNameList = string[];

/** Restriction of list type to store a 2-point range of numeric values. If one member is a null, then this is a single ended interval. */
export type QuantityExtentType = string[];

/** Property whose content is a Quantity. */
interface _QuantityPropertyType extends _ValuePropertyType {
	/** A numeric value with a scale.  The content of the element is an amount using the XML Schema type double which permits decimal or scientific notation.  An XML attribute uom (unit of measure) is required, whose value is a URI which identifies the definition of the scale or units by which the numeric value must be multiplied. */
	Quantity?: MeasureType;
}
export interface QuantityPropertyType extends _QuantityPropertyType { constructor: { new(): QuantityPropertyType }; }
export var QuantityPropertyType: { new(): QuantityPropertyType };

/** Used to specify the grammar of the feature query mechanism. */
export type QueryGrammarEnumeration = ("xpath" | "xquery" | "other");
interface _QueryGrammarEnumeration extends Primitive._string { content: QueryGrammarEnumeration; }

/** Metadata about the rangeSet.  Definition of record structure.
  * This is required if the rangeSet is encoded in a DataBlock.
  * We use a gml:_Value with empty values as a map of the composite value structure. */
interface _RangeParametersType extends _CompositeValueProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	/** A value from two-valued logic, using the XML Schema boolean type.  An instance may take the values {true, false, 1, 0}. */
	Boolean?: boolean;
	/** XML List based on XML Schema boolean type.  An element of this type contains a space-separated list of boolean values {0,1,true,false} */
	BooleanList?: booleanOrNullList;
	/** A term representing a classification.  It has an optional XML attribute codeSpace, whose value is a URI which identifies a dictionary, codelist or authority for the term. */
	Category?: CodeType;
	/** Utility element to store a 2-point range of ordinal values. If one member is a null, then this is a single ended interval. */
	CategoryExtent?: CategoryExtentType;
	/** A space-separated list of terms or nulls.  A single XML attribute codeSpace may be provided, which authorises all the terms in the list. */
	CategoryList?: CodeOrNullListType;
	/** An integer representing a frequency of occurrence. */
	Count?: number;
	/** Utility element to store a 2-point range of frequency values. If one member is a null, then this is a single ended interval. */
	CountExtent?: CountExtentType;
	/** A space-separated list of integers or nulls. */
	CountList?: integerOrNullList;
	/** A numeric value with a scale.  The content of the element is an amount using the XML Schema type double which permits decimal or scientific notation.  An XML attribute uom (unit of measure) is required, whose value is a URI which identifies the definition of the scale or units by which the numeric value must be multiplied. */
	Quantity?: MeasureType;
	/** Utility element to store a 2-point range of numeric values. If one member is a null, then this is a single ended interval. */
	QuantityExtent?: QuantityExtentType;
	/** A space separated list of amounts or nulls.  The amounts use the XML Schema type double.  A single XML attribute uom (unit of measure) is required, whose value is a URI which identifies the definition of the scale or units by which all the amounts in the list must be multiplied. */
	QuantityList?: MeasureOrNullListType;
}
export interface RangeParametersType extends _RangeParametersType { constructor: { new(): RangeParametersType }; }
export var RangeParametersType: { new(): RangeParametersType };

interface _RangeSetType extends BaseType {
	/** XML List based on XML Schema boolean type.  An element of this type contains a space-separated list of boolean values {0,1,true,false} */
	BooleanList: booleanOrNullList[];
	/** A space-separated list of terms or nulls.  A single XML attribute codeSpace may be provided, which authorises all the terms in the list. */
	CategoryList: CodeOrNullListType[];
	/** A space-separated list of integers or nulls. */
	CountList: integerOrNullList[];
	DataBlock: DataBlockType;
	File: FileType;
	/** A space separated list of amounts or nulls.  The amounts use the XML Schema type double.  A single XML attribute uom (unit of measure) is required, whose value is a URI which identifies the definition of the scale or units by which all the amounts in the list must be multiplied. */
	QuantityList: MeasureOrNullListType[];
	/** A Value Array is used for homogeneous arrays of primitive and aggregate values.   _ScalarValueList is preferred for arrays of Scalar Values since this is more efficient.  Since "choice" is not available for attribute groups, an external constraint (e.g. Schematron) would be required to enforce the selection of only one of these through schema validation */
	ValueArray: ValueArrayType[];
}
export interface RangeSetType extends _RangeSetType { constructor: { new(): RangeSetType }; }
export var RangeSetType: { new(): RangeSetType };

/** Represents a rectangle as a surface with an outer boundary consisting of a linear ring. Note that this is a polygon (subtype) with no inner boundaries. The number of points in the linear ring must be five. */
interface _RectangleType extends _AbstractSurfacePatchType, _ExteriorProxyType {
	/** The attribute "interpolation" specifies the interpolation mechanism used for this surface patch. Currently only planar surface patches are defined in GML 3, the attribute is fixed to "planar", i.e. the interpolation method shall return points on a single plane. The boundary of the patch shall be contained within that plane. */
	interpolation: SurfaceInterpolationType;
}
export interface RectangleType extends _RectangleType { constructor: { new(): RectangleType }; }
export var RectangleType: { new(): RectangleType };

interface _RectifiedGridCoverageType extends _AbstractDiscreteCoverageType {
	boundedBy?: BoundingShapeType;
	coverageFunction?: CoverageFunctionType;
	/** Contains a simple text description of the object, or refers to an external description. */
	description?: StringOrRefType;
	/** Contains or refers to a metadata package that contains metadata properties. */
	metaDataProperty?: MetaDataPropertyType[];
	/** Label for the object, normally a descriptive name. An object may have several names, typically assigned by different authorities.  The authority for a name is indicated by the value of its (optional) codeSpace attribute.  The name may or may not be unique, as determined by the rules of the organization responsible for the codeSpace. */
	name?: NameProxyType[];
	rangeSet: RangeSetType;
	rectifiedGridDomain: RectifiedGridDomainType;
}
export interface RectifiedGridCoverageType extends _RectifiedGridCoverageType { constructor: { new(): RectifiedGridCoverageType }; }
export var RectifiedGridCoverageType: { new(): RectifiedGridCoverageType };

interface _RectifiedGridDomainType extends _DomainSetType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	/** Should be substitutionGroup="gml:Grid" but changed in order to accomplish Xerces-J schema validation */
	RectifiedGrid?: RectifiedGridType;
}
export interface RectifiedGridDomainType extends _RectifiedGridDomainType { constructor: { new(): RectifiedGridDomainType }; }
export var RectifiedGridDomainType: { new(): RectifiedGridDomainType };

/** A rectified grid has an origin and vectors that define its post locations. */
interface _RectifiedGridType extends _GridType {
	offsetVector: VectorType[];
	origin: PointPropertyType;
}
export interface RectifiedGridType extends _RectifiedGridType { constructor: { new(): RectifiedGridType }; }
export var RectifiedGridType: { new(): RectifiedGridType };

interface _ReferenceProxyType extends BaseType {}
interface ReferenceProxyType extends _ReferenceProxyType { constructor: { new(): ReferenceProxyType }; }

interface _ReferenceSystemProxyType extends _CRSProxyType {}
interface ReferenceSystemProxyType extends _ReferenceSystemProxyType { constructor: { new(): ReferenceSystemProxyType }; }

/** Association to a reference system, either referencing or containing the definition of that reference system. */
interface _ReferenceSystemRefType extends _ReferenceSystemProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface ReferenceSystemRefType extends _ReferenceSystemRefType { constructor: { new(): ReferenceSystemRefType }; }
export var ReferenceSystemRefType: { new(): ReferenceSystemRefType };

/** A pattern or base for derived types used to specify complex types corresponding to a UML aggregation association.  An instance of this type serves as a pointer to a remote Object. */
interface _ReferenceType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface ReferenceType extends _ReferenceType { constructor: { new(): ReferenceType }; }
export var ReferenceType: { new(): ReferenceType };

interface _RelatedTimeType extends _TimePrimitivePropertyType {
	relativePosition: RelatedTimeTypeRelativePositionType;
}
export interface RelatedTimeType extends _RelatedTimeType { constructor: { new(): RelatedTimeType }; }
export var RelatedTimeType: { new(): RelatedTimeType };

type RelatedTimeTypeRelativePositionType = ("Before" | "After" | "Begins" | "Ends" | "During" | "Equals" | "Contains" | "Overlaps" | "Meets" | "OverlappedBy" | "MetBy" | "BegunBy" | "EndedBy");
interface _RelatedTimeTypeRelativePositionType extends Primitive._string { content: RelatedTimeTypeRelativePositionType; }

/** Closeness of the relative positions of two or more positions to their respective relative positions accepted as or being true. */
interface _RelativeInternalPositionalAccuracyType extends _AbstractPositionalAccuracyType {
	/** A quantitative result defined by the evaluation procedure used, and identified by the measureDescription. */
	result: MeasureType;
}
export interface RelativeInternalPositionalAccuracyType extends _RelativeInternalPositionalAccuracyType { constructor: { new(): RelativeInternalPositionalAccuracyType }; }
export var RelativeInternalPositionalAccuracyType: { new(): RelativeInternalPositionalAccuracyType };

/** Encapsulates a ring to represent properties in features or geometry collections. */
interface _RingPropertyType extends BaseType {
	Ring: RingType;
}
export interface RingPropertyType extends _RingPropertyType { constructor: { new(): RingPropertyType }; }
export var RingPropertyType: { new(): RingPropertyType };

interface _RingProxyType extends BaseType {
	Ring?: RingType;
	LinearRing?: LinearRingType;
}
interface RingProxyType extends _RingProxyType { constructor: { new(): RingProxyType }; }

/** A Ring is used to represent a single connected component of a surface boundary. It consists of a sequence of curves connected in a cycle (an object whose boundary is empty).
  * A Ring is structurally similar to a composite curve in that the endPoint of each curve in the sequence is the startPoint of the next curve in the Sequence. Since the sequence is circular, there is no exception to this rule. Each ring, like all boundaries, is a cycle and each ring is simple.
  * NOTE: Even though each Ring is simple, the boundary need not be simple. The easiest case of this is where one of the interior rings of a surface is tangent to its exterior ring. */
interface _RingType extends _AbstractRingType {
	/** This property element either references a curve via the XLink-attributes or contains the curve element. A curve element is any element which is substitutable for "_Curve". */
	curveMember: CurvePropertyType[];
}
export interface RingType extends _RingType { constructor: { new(): RingType }; }
export var RingType: { new(): RingType };

interface _RowType extends BaseType {
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty
	  * is the predefined property which can be used by GML Application Schemas whenever a GML Feature has a property with a value that
	  * is substitutable for Point. */
	pointProperty: PointPropertyType[];
	pos: DirectPositionType[];
	posList: DirectPositionListType;
}
interface RowType extends _RowType { constructor: { new(): RowType }; }

/** Property whose content is a scalar value. */
interface _ScalarValuePropertyType extends _ValuePropertyType {
	/** A value from two-valued logic, using the XML Schema boolean type.  An instance may take the values {true, false, 1, 0}. */
	Boolean?: boolean;
	/** A term representing a classification.  It has an optional XML attribute codeSpace, whose value is a URI which identifies a dictionary, codelist or authority for the term. */
	Category?: CodeType;
	/** An integer representing a frequency of occurrence. */
	Count?: number;
	/** A numeric value with a scale.  The content of the element is an amount using the XML Schema type double which permits decimal or scientific notation.  An XML attribute uom (unit of measure) is required, whose value is a URI which identifies the definition of the scale or units by which the numeric value must be multiplied. */
	Quantity?: MeasureType;
}
export interface ScalarValuePropertyType extends _ScalarValuePropertyType { constructor: { new(): ScalarValuePropertyType }; }
export var ScalarValuePropertyType: { new(): ScalarValuePropertyType };

/** Value of a scale factor (or ratio) that has no physical unit. Uses the MeasureType with the restriction that the unit of measure referenced by uom must be suitable for a scale factor, such as percent, permil, or parts-per-million. */
interface _ScaleType extends _MeasureType {}
export interface ScaleType extends _ScaleType { constructor: { new(): ScaleType }; }
export var ScaleType: { new(): ScaleType };

/** Definition of the second parameter that defines the shape of an ellipsoid. An ellipsoid requires two defining parameters: semi-major axis and inverse flattening or semi-major axis and semi-minor axis. When the reference body is a sphere rather than an ellipsoid, only a single defining parameter is required, namely the radius of the sphere; in that case, the semi-major axis "degenerates" into the radius of the sphere. */
interface _SecondDefiningParameterType extends BaseType {
	/** Inverse flattening value of the ellipsoid. Value is a scale factor (or ratio) that has no physical unit. Uses the MeasureType with the restriction that the unit of measure referenced by uom must be suitable for a scale factor, such as percent, permil, or parts-per-million. */
	inverseFlattening: MeasureType;
	/** The ellipsoid is degenerate and is actually a sphere. The sphere is completely defined by the semi-major axis, which is the radius of the sphere. */
	isSphere: IsSphereType;
	/** Length of the semi-minor axis of the ellipsoid. Uses the MeasureType with the restriction that the unit of measure referenced by uom must be suitable for a length, such as metres or feet. */
	semiMinorAxis: MeasureType;
}
export interface SecondDefiningParameterType extends _SecondDefiningParameterType { constructor: { new(): SecondDefiningParameterType }; }
export var SecondDefiningParameterType: { new(): SecondDefiningParameterType };

/** List of codes (adopted from ISO 19123 Annex C) that identifies the rule for traversing a grid to correspond with the sequence of members of the rangeSet. */
export type SequenceRuleNames = ("Linear" | "Boustrophedonic" | "Cantor-diagonal" | "Spiral" | "Morton" | "Hilbert");
interface _SequenceRuleNames extends Primitive._string { content: SequenceRuleNames; }

interface _SequenceRuleType extends _SequenceRuleNames {
	order?: IncrementOrder;
}
export interface SequenceRuleType extends _SequenceRuleType { constructor: { new(): SequenceRuleType }; }
export var SequenceRuleType: { new(): SequenceRuleType };

/** Utility type used in various places
  * - e.g. to indicate the direction of topological objects;
  * "+" for forwards, or "-" for backwards. */
export type SignType = ("-" | "+");
interface _SignType extends Primitive._string { content: SignType; }

interface _SingleOperationProxyType extends _OperationProxyType {
	PassThroughOperation?: PassThroughOperationType;
}
interface SingleOperationProxyType extends _SingleOperationProxyType { constructor: { new(): SingleOperationProxyType }; }

/** Association to a single operation, either referencing or containing the definition of that single operation. */
interface _SingleOperationRefType extends _SingleOperationProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface SingleOperationRefType extends _SingleOperationRefType { constructor: { new(): SingleOperationRefType }; }
export var SingleOperationRefType: { new(): SingleOperationRefType };

/** A container for an array of solids. The elements are always contained in the array property, referencing geometry elements or arrays of geometry elements is not supported. */
interface _SolidArrayPropertyType extends BaseType {
	/** The "_Solid" element is the abstract head of the substituition group for all (continuous) solid elements. */
	Solid?: SolidProxyType[];
}
export interface SolidArrayPropertyType extends _SolidArrayPropertyType { constructor: { new(): SolidArrayPropertyType }; }
export var SolidArrayPropertyType: { new(): SolidArrayPropertyType };

/** A property that has a solid as its value domain can either be an appropriate geometry element encapsulated in an element of this type or an XLink reference to a remote geometry element (where remote includes geometry elements located elsewhere in the same document). Either the reference or the contained element must be given, but neither both nor none. */
interface _SolidPropertyType extends _SolidProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface SolidPropertyType extends _SolidPropertyType { constructor: { new(): SolidPropertyType }; }
export var SolidPropertyType: { new(): SolidPropertyType };

interface _SolidProxyType extends BaseType {
	CompositeSolid?: CompositeSolidType;
	Solid?: SolidType;
}
interface SolidProxyType extends _SolidProxyType { constructor: { new(): SolidProxyType }; }

/** A solid is the basis for 3-dimensional geometry. The extent of a solid is defined by the boundary surfaces (shells). A shell is represented by a composite surface, where every  shell is used to represent a single connected component of the boundary of a solid. It consists of a composite surface (a list of orientable surfaces) connected in a topological cycle (an object whose boundary is empty). Unlike a Ring, a Shell's elements have no natural sort order. Like Rings, Shells are simple. */
interface _SolidType extends _AbstractSolidType {
	/** Boundaries of solids are similar to surface boundaries. In normal 3-dimensional Euclidean space, one (composite) surface is distinguished as the exterior. In the more general case, this is not always possible. */
	exterior?: SurfacePropertyType;
	/** Boundaries of solids are similar to surface boundaries. */
	interior?: SurfacePropertyType[];
}
export interface SolidType extends _SolidType { constructor: { new(): SolidType }; }
export var SolidType: { new(): SolidType };

/** Value of a speed, with its units. Uses the MeasureType with the restriction that the unit of measure referenced by uom must be suitable for a velocity, such as metres per second or miles per hour. */
interface _SpeedType extends _MeasureType {}
export interface SpeedType extends _SpeedType { constructor: { new(): SpeedType }; }
export var SpeedType: { new(): SpeedType };

/** A sphere is a gridded surface given as a
  * family of circles whose positions vary linearly along the
  * axis of the sphere, and whise radius varies in proportions to
  * the cosine function of the central angle. The horizontal
  * circles resemble lines of constant latitude, and the vertical
  * arcs resemble lines of constant longitude.
  * NOTE! If the control points are sorted in terms of increasing
  * longitude, and increasing latitude, the upNormal of a sphere
  * is the outward normal.
  * EXAMPLE If we take a gridded set of latitudes and longitudes
  * in degrees,(u,v) such as
  *
  * (-90,-180)  (-90,-90)  (-90,0)  (-90,  90) (-90, 180)
  * (-45,-180)  (-45,-90)  (-45,0)  (-45,  90) (-45, 180)
  * (  0,-180)  (  0,-90)  (  0,0)  (  0,  90) (  0, 180)
  * ( 45,-180)  ( 45,-90)  ( 45,0)  ( 45, -90) ( 45, 180)
  * ( 90,-180)  ( 90,-90)  ( 90,0)  ( 90, -90) ( 90, 180)
  *
  * And map these points to 3D using the usual equations (where R
  * is the radius of the required sphere).
  *
  * z = R sin u
  * x = (R cos u)(sin v)
  * y = (R cos u)(cos v)
  *
  * We have a sphere of Radius R, centred at (0,0), as a gridded
  * surface. Notice that the entire first row and the entire last
  * row of the control points map to a single point in each 3D
  * Euclidean space, North and South poles respectively, and that
  * each horizontal curve closes back on itself forming a
  * geometric cycle. This gives us a metrically bounded (of finite
  * size), topologically unbounded (not having a boundary, a
  * cycle) surface. */
interface _SphereType extends _AbstractGriddedSurfaceType {
	horizontalCurveType: CurveInterpolationType;
	verticalCurveType: CurveInterpolationType;
}
export interface SphereType extends _SphereType { constructor: { new(): SphereType }; }
export var SphereType: { new(): SphereType };

/** Association to a spherical coordinate system, either referencing or containing the definition of that coordinate system. */
interface _SphericalCSRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	SphericalCS?: SphericalCSType;
}
export interface SphericalCSRefType extends _SphericalCSRefType { constructor: { new(): SphericalCSRefType }; }
export var SphericalCSRefType: { new(): SphericalCSRefType };

/** A three-dimensional coordinate system with one distance measured from the origin and two angular coordinates. Not to be confused with an ellipsoidal coordinate system based on an ellipsoid "degenerated" into a sphere. A SphericalCS shall have three usesAxis associations. */
interface _SphericalCSType extends _AbstractCoordinateSystemType {}
export interface SphericalCSType extends _SphericalCSType { constructor: { new(): SphericalCSType }; }
export var SphericalCSType: { new(): SphericalCSType };

interface _StrictAssociationProxyType extends BaseType {}
interface StrictAssociationProxyType extends _StrictAssociationProxyType { constructor: { new(): StrictAssociationProxyType }; }

/** Union of the XML Schema string type and the GML Nulltype.  An element which uses this type may have content which is either a string or a value from Nulltype.  Note that a "string" may contain whitespace. */
export type stringOrNull = string;
type _stringOrNull = Primitive._string;

/** This type is available wherever there is a need for a "text" type property. It is of string type, so the text can be included inline, but the value can also be referenced remotely via xlinks from the AssociationAttributeGroup. If the remote reference is present, then the value obtained by traversing the link should be used, and the string content of the element can be used for an annotation. */
interface _StringOrRefType extends Primitive._string {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface StringOrRefType extends _StringOrRefType { constructor: { new(): StringOrRefType }; }
export var StringOrRefType: { new(): StringOrRefType };

interface _StyleProxyType extends BaseType {
	/** Predefined concrete value of the top-level property. Encapsulates all other styling information. */
	Style?: StyleType;
}
interface StyleProxyType extends _StyleProxyType { constructor: { new(): StyleProxyType }; }

/** [complexType of] Predefined concrete value of the top-level property. Encapsulates all other styling information. */
interface _StyleType extends _AbstractStyleType {
	/** The style descriptor for features. */
	FeatureStyle: FeatureStyleType[];
	/** The style descriptor for a graph consisting of a number of features. Describes graph-specific style attributes. */
	GraphStyle?: GraphStyleType;
}
export interface StyleType extends _StyleType { constructor: { new(): StyleType }; }
export var StyleType: { new(): StyleType };

/** Used to vary individual graphic parameters and attributes of the style, symbol or text. */
interface _StyleVariationType extends Primitive._string {
	featurePropertyRange?: string;
	styleProperty: string;
}
export interface StyleVariationType extends _StyleVariationType { constructor: { new(): StyleVariationType }; }
export var StyleVariationType: { new(): StyleVariationType };

/** Feature succession is a semantic relationship derived from evaluation of observer, and
  * Feature Substitution, Feature Division and Feature Fusion are defined as associations between
  * previous features and next features in the temporal context.
  * Successions shall be represented in either following two ways.
  * * define a temporal topological complex element as a feature element
  * * define an association same as temporal topological complex between features. */
export type SuccessionType = ("substitution" | "division" | "fusion" | "initiation");
interface _SuccessionType extends Primitive._string { content: SuccessionType; }

/** A container for an array of surfaces. The elements are always contained in the array property, referencing geometry elements or arrays of geometry elements is not supported. */
interface _SurfaceArrayPropertyType extends BaseType {
	/** The "_Surface" element is the abstract head of the substituition group for all (continuous) surface elements. */
	Surface?: SurfaceProxyType[];
}
export interface SurfaceArrayPropertyType extends _SurfaceArrayPropertyType { constructor: { new(): SurfaceArrayPropertyType }; }
export var SurfaceArrayPropertyType: { new(): SurfaceArrayPropertyType };

/** SurfaceInterpolationType is a list of codes that may be used to identify the interpolation mechanisms specified by an
  * application schema. */
export type SurfaceInterpolationType = ("none" | "planar" | "spherical" | "elliptical" | "conic" | "tin" | "parametricCurve" | "polynomialSpline" | "rationalSpline" | "triangulatedSpline");
interface _SurfaceInterpolationType extends Primitive._string { content: SurfaceInterpolationType; }

/** A container for an array of surface patches. */
interface _SurfacePatchArrayPropertyType extends BaseType {
	/** The "_SurfacePatch" element is the abstract head of the substituition group for all surface pach elements describing a continuous portion of a surface. */
	SurfacePatch?: SurfacePatchProxyType[];
}
export interface SurfacePatchArrayPropertyType extends _SurfacePatchArrayPropertyType { constructor: { new(): SurfacePatchArrayPropertyType }; }
export var SurfacePatchArrayPropertyType: { new(): SurfacePatchArrayPropertyType };

interface _SurfacePatchProxyType extends _ParametricCurveSurfaceProxyType {
	PolygonPatch?: PolygonPatchType;
	Triangle?: TriangleType;
	Rectangle?: RectangleType;
}
interface SurfacePatchProxyType extends _SurfacePatchProxyType { constructor: { new(): SurfacePatchProxyType }; }

/** A property that has a surface as its value domain can either be an appropriate geometry element encapsulated in an element of this type or an XLink reference to a remote geometry element (where remote includes geometry elements located elsewhere in the same document). Either the reference or the contained element must be given, but neither both nor none. */
interface _SurfacePropertyType extends _SurfaceProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface SurfacePropertyType extends _SurfacePropertyType { constructor: { new(): SurfacePropertyType }; }
export var SurfacePropertyType: { new(): SurfacePropertyType };

interface _SurfaceProxyType extends _SurfaceProxyType_2 {
	Polygon?: PolygonType;
	CompositeSurface?: CompositeSurfaceType;
	OrientableSurface?: OrientableSurfaceType;
}
interface SurfaceProxyType extends _SurfaceProxyType { constructor: { new(): SurfaceProxyType }; }

interface _SurfaceProxyType_2 extends _TriangulatedSurfaceProxyType {
	Surface?: SurfaceType;
	PolyhedralSurface?: PolyhedralSurfaceType;
}
interface SurfaceProxyType_2 extends _SurfaceProxyType_2 { constructor: { new(): SurfaceProxyType_2 }; }

/** A Surface is a 2-dimensional primitive and is composed of one or more surface patches. The surface patches are connected to one another.
  * The orientation of the surface is positive ("up"). The orientation of a surface chooses an "up" direction through the choice of the upward normal, which, if the surface is not a cycle, is the side of the surface from which the exterior boundary appears counterclockwise. Reversal of the surface orientation reverses the curve orientation of each boundary component, and interchanges the conceptual "up" and "down" direction of the surface. If the surface is the boundary of a solid, the "up" direction is usually outward. For closed surfaces, which have no boundary, the up direction is that of the surface patches, which must be consistent with one another. Its included surface patches describe the interior structure of the Surface. */
interface _SurfaceType extends _AbstractSurfaceType, _PatchesProxyType {}
export interface SurfaceType extends _SurfaceType { constructor: { new(): SurfaceType }; }
export var SurfaceType: { new(): SurfaceType };

/** [complexType of] The symbol property. Allows for remote referencing of symbols. */
interface _SymbolType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	about?: string;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	symbolType: SymbolTypeEnumeration;
	/** Defines the geometric transformation of entities. There is no particular grammar defined for this value. */
	transform?: string;
}
export interface SymbolType extends _SymbolType { constructor: { new(): SymbolType }; }
export var SymbolType: { new(): SymbolType };

/** Used to specify the type of the symbol used. */
export type SymbolTypeEnumeration = ("svg" | "xpath" | "other");
interface _SymbolTypeEnumeration extends Primitive._string { content: SymbolTypeEnumeration; }

/** Container for an object representing the target or subject of an observation. */
interface _TargetPropertyType extends _FeatureProxyType, _GeometryProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface TargetPropertyType extends _TargetPropertyType { constructor: { new(): TargetPropertyType }; }
export var TargetPropertyType: { new(): TargetPropertyType };

interface _TargetProxyType extends BaseType {
	/** This element contains or points to the specimen, region or station which is the object of the observation */
	target?: TargetPropertyType;
	/** Synonym for target - common word used for photographs */
	subject?: TargetPropertyType;
}
interface TargetProxyType extends _TargetProxyType { constructor: { new(): TargetProxyType }; }

/** Association to a temporal coordinate reference system, either referencing or containing the definition of that reference system. */
interface _TemporalCRSRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	TemporalCRS?: TemporalCRSType;
}
export interface TemporalCRSRefType extends _TemporalCRSRefType { constructor: { new(): TemporalCRSRefType }; }
export var TemporalCRSRefType: { new(): TemporalCRSRefType };

/** A 1D coordinate reference system used for the recording of time. */
interface _TemporalCRSType extends _AbstractReferenceSystemType {
	/** Association to the temporal coordinate system used by this CRS. */
	usesTemporalCS: TemporalCSRefType;
	/** Association to the temporal datum used by this CRS. */
	usesTemporalDatum: TemporalDatumRefType;
}
export interface TemporalCRSType extends _TemporalCRSType { constructor: { new(): TemporalCRSType }; }
export var TemporalCRSType: { new(): TemporalCRSType };

/** Association to a temporal coordinate system, either referencing or containing the definition of that coordinate system. */
interface _TemporalCSRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	TemporalCS?: TemporalCSType;
}
export interface TemporalCSRefType extends _TemporalCSRefType { constructor: { new(): TemporalCSRefType }; }
export var TemporalCSRefType: { new(): TemporalCSRefType };

/** A one-dimensional coordinate system containing a single time axis, used to describe the temporal position of a point in the specified time units from a specified time origin. A TemporalCS shall have one usesAxis association. */
interface _TemporalCSType extends _AbstractCoordinateSystemType {}
export interface TemporalCSType extends _TemporalCSType { constructor: { new(): TemporalCSType }; }
export var TemporalCSType: { new(): TemporalCSType };

/** Partially defines the origin of a temporal coordinate reference system. This type restricts the AbstractDatumType to remove the "anchorPoint" and "realizationEpoch" elements. */
interface _TemporalDatumBaseType extends _AbstractDatumType {
	/** Database handle for the object.  It is of XML type ID, so is constrained to be unique in the XML document within which it occurs.  An external identifier for the object in the form of a URI may be constructed using standard XML and XPointer methods.  This is done by concatenating the URI for the document, a fragment separator, and the value of the id attribute. */
	id: string;
	/** An identification of a datum. */
	datumID?: IdentifierType[];
	/** The name by which this datum is identified. */
	datumName: CodeType;
	/** Contains or refers to a metadata package that contains metadata properties. */
	metaDataProperty?: MetaDataPropertyType[];
	/** Description of domain of usage, or limitations of usage, for which this CRS object is valid. */
	scope?: string;
	/** Area or region in which this CRS object is valid. */
	validArea?: ExtentType;
}
export interface TemporalDatumBaseType extends _TemporalDatumBaseType { constructor: { new(): TemporalDatumBaseType }; }
export var TemporalDatumBaseType: { new(): TemporalDatumBaseType };

/** Association to a temporal datum, either referencing or containing the definition of that datum. */
interface _TemporalDatumRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	TemporalDatum?: TemporalDatumType;
}
export interface TemporalDatumRefType extends _TemporalDatumRefType { constructor: { new(): TemporalDatumRefType }; }
export var TemporalDatumRefType: { new(): TemporalDatumRefType };

/** Defines the origin of a temporal coordinate reference system. This type extends the TemporalDatumRestrictionType to add the "origin" element with the dateTime type. */
interface _TemporalDatumType extends _TemporalDatumBaseType {
	/** The date and time origin of this temporal datum. */
	origin: Date;
}
export interface TemporalDatumType extends _TemporalDatumType { constructor: { new(): TemporalDatumType }; }
export var TemporalDatumType: { new(): TemporalDatumType };

interface _TimeCalendarEraPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	TimeCalendarEra?: TimeCalendarEraType;
}
export interface TimeCalendarEraPropertyType extends _TimeCalendarEraPropertyType { constructor: { new(): TimeCalendarEraPropertyType }; }
export var TimeCalendarEraPropertyType: { new(): TimeCalendarEraPropertyType };

/** In every calendar, years are numbered relative to the date of a
  * reference event that defines a calendar era.
  * In this implementation, we omit the back-pointer "datingSystem". */
interface _TimeCalendarEraType extends _DefinitionType {
	/** Period for which the calendar era was used as a basis for dating. */
	epochOfUse: TimePeriodPropertyType;
	/** Julian date that corresponds to the reference date.
	  * The Julian day numbering system is a temporal coordinate system that has an
	  * origin earlier than any known calendar,
	  * at noon on 1 January 4713 BC in the Julian proleptic calendar.
	  * The Julian day number is an integer value;
	  * the Julian date is a decimal value that allows greater resolution.
	  * Transforming calendar dates to and from Julian dates provides a
	  * relatively simple basis for transforming dates from one calendar to another. */
	julianReference: number;
	/** Date of the referenceEvent expressed as a date in the given calendar.
	  * In most calendars, this date is the origin (i.e., the first day) of the scale, but this is not always true. */
	referenceDate?: Date;
	/** Name or description of a mythical or historic event which fixes the position of the base scale of the calendar era. */
	referenceEvent: StringOrRefType;
}
export interface TimeCalendarEraType extends _TimeCalendarEraType { constructor: { new(): TimeCalendarEraType }; }
export var TimeCalendarEraType: { new(): TimeCalendarEraType };

interface _TimeCalendarPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	TimeCalendar?: TimeCalendarType;
}
export interface TimeCalendarPropertyType extends _TimeCalendarPropertyType { constructor: { new(): TimeCalendarPropertyType }; }
export var TimeCalendarPropertyType: { new(): TimeCalendarPropertyType };

/** A calendar is a discrete temporal reference system
  * that provides a basis for defining temporal position to a resolution of one day.
  * A single calendar may reference more than one calendar era. */
interface _TimeCalendarType extends _AbstractTimeReferenceSystemType {
	/** Link to the CalendarEras that it uses as a reference for dating. */
	referenceFrame: TimeCalendarEraPropertyType[];
}
export interface TimeCalendarType extends _TimeCalendarType { constructor: { new(): TimeCalendarType }; }
export var TimeCalendarType: { new(): TimeCalendarType };

interface _TimeClockPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	TimeClock?: TimeClockType;
}
export interface TimeClockPropertyType extends _TimeClockPropertyType { constructor: { new(): TimeClockPropertyType }; }
export var TimeClockPropertyType: { new(): TimeClockPropertyType };

/** A clock provides a basis for defining temporal position within a day.
  * A clock must be used with a calendar in order to provide a complete description of a temporal position
  * within a specific day. */
interface _TimeClockType extends _AbstractTimeReferenceSystemType {
	dateBasis?: TimeCalendarPropertyType[];
	/** Name or description of an event, such as solar noon or sunrise,
	  * which fixes the position of the base scale of the clock. */
	referenceEvent: StringOrRefType;
	/** time of day associated with the reference event expressed as
	  * a time of day in the given clock. The reference time is usually the origin of the clock scale. */
	referenceTime: string;
	/** 24 hour local or UTC time that corresponds to the reference time. */
	utcReference: string;
}
export interface TimeClockType extends _TimeClockType { constructor: { new(): TimeClockType }; }
export var TimeClockType: { new(): TimeClockType };

interface _TimeComplexProxyType extends BaseType {
	/** This element represents temporal topology complex. It shall be the connected acyclic directed graph composed of time nodes and time edges. */
	TimeTopologyComplex?: TimeTopologyComplexType;
}
interface TimeComplexProxyType extends _TimeComplexProxyType { constructor: { new(): TimeComplexProxyType }; }

/** A temporal coordinate system is based on a continuous interval scale defined in terms of a single time interval. */
interface _TimeCoordinateSystemType extends _AbstractTimeReferenceSystemType {
	interval: TimeIntervalLengthType;
	origin: TimeInstantPropertyType;
	originPosition: TimePositionType;
}
export interface TimeCoordinateSystemType extends _TimeCoordinateSystemType { constructor: { new(): TimeCoordinateSystemType }; }
export var TimeCoordinateSystemType: { new(): TimeCoordinateSystemType };

/** A time edge property can either be any time edge element encapsulated in an element of this type
  * or an XLink reference to a remote time edge element (where remote includes elements located elsewhere in the same document).
  * Note that either the reference or the contained element must be given, but not both or none. */
interface _TimeEdgePropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	/** TimeEdge is one dimensional temporal topology primitive,
	  * expresses a state in topological time. It has an orientation from its start toward the end,
	  * and its boundaries shall associate with two different time nodes. */
	TimeEdge?: TimeEdgeType;
}
export interface TimeEdgePropertyType extends _TimeEdgePropertyType { constructor: { new(): TimeEdgePropertyType }; }
export var TimeEdgePropertyType: { new(): TimeEdgePropertyType };

/** Type declaration of the element "TimeEdge". */
interface _TimeEdgeType extends _AbstractTimeTopologyPrimitiveType {
	end: TimeNodePropertyType;
	extent?: TimePeriodPropertyType;
	start: TimeNodePropertyType;
}
export interface TimeEdgeType extends _TimeEdgeType { constructor: { new(): TimeEdgeType }; }
export var TimeEdgeType: { new(): TimeEdgeType };

interface _TimeGeometricPrimitivePropertyType extends _TimeGeometricPrimitiveProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface TimeGeometricPrimitivePropertyType extends _TimeGeometricPrimitivePropertyType { constructor: { new(): TimeGeometricPrimitivePropertyType }; }
export var TimeGeometricPrimitivePropertyType: { new(): TimeGeometricPrimitivePropertyType };

interface _TimeGeometricPrimitiveProxyType extends BaseType {
	TimeInstant?: TimeInstantType;
	TimePeriod?: TimePeriodType;
}
interface TimeGeometricPrimitiveProxyType extends _TimeGeometricPrimitiveProxyType { constructor: { new(): TimeGeometricPrimitiveProxyType }; }

/** This enumerated data type specifies values for indeterminate positions. */
export type TimeIndeterminateValueType = ("after" | "before" | "now" | "unknown");
interface _TimeIndeterminateValueType extends Primitive._string { content: TimeIndeterminateValueType; }

interface _TimeInstantPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	TimeInstant?: TimeInstantType;
}
export interface TimeInstantPropertyType extends _TimeInstantPropertyType { constructor: { new(): TimeInstantPropertyType }; }
export var TimeInstantPropertyType: { new(): TimeInstantPropertyType };

/** Omit back-pointers begunBy, endedBy. */
interface _TimeInstantType extends _AbstractTimeGeometricPrimitiveType {
	/** Direct representation of a temporal position */
	timePosition: TimePositionType;
}
export interface TimeInstantType extends _TimeInstantType { constructor: { new(): TimeInstantType }; }
export var TimeInstantType: { new(): TimeInstantType };

/** This type extends the built-in xsd:decimal simple type to allow floating-point
  * values for temporal length. According to  the ISO 11404 model you have to use
  * positiveInteger together with appropriate values for radix and factor. The
  * resolution of the time interval is to one radix ^(-factor) of the specified
  * time unit (e.g. unit="second", radix="10", factor="3" specifies a resolution
  * of milliseconds). It is a subtype of TimeDurationType. */
interface _TimeIntervalLengthType extends Primitive._number {
	factor?: number;
	radix?: number;
	unit: string;
}
export interface TimeIntervalLengthType extends _TimeIntervalLengthType { constructor: { new(): TimeIntervalLengthType }; }
export var TimeIntervalLengthType: { new(): TimeIntervalLengthType };

/** A time node property can either be any time node element encapsulated in an element of this type
  * or an XLink reference to a remote time node element (where remote includes elements located elsewhere in the same document).
  * Note that either the reference or the contained element must be given, but not both or none. */
interface _TimeNodePropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	/** "TimeNode" is a zero dimensional temporal topology primitive,
	  * expresses a position in topological time, and is a start and an end of time edge, which represents states of time.
	  * Time node may be isolated. However, it cannot describe the ordering relationships with other primitives.
	  * An isolated node may not be an element of any temporal topology complex. */
	TimeNode?: TimeNodeType;
}
export interface TimeNodePropertyType extends _TimeNodePropertyType { constructor: { new(): TimeNodePropertyType }; }
export var TimeNodePropertyType: { new(): TimeNodePropertyType };

/** Type declaration of the element "TimeNode". */
interface _TimeNodeType extends _AbstractTimeTopologyPrimitiveType {
	nextEdge?: TimeEdgePropertyType[];
	position?: TimeInstantPropertyType;
	previousEdge?: TimeEdgePropertyType[];
}
export interface TimeNodeType extends _TimeNodeType { constructor: { new(): TimeNodeType }; }
export var TimeNodeType: { new(): TimeNodeType };

interface _TimeObjectProxyType extends _TimePrimitiveProxyType, _TimeComplexProxyType {}
interface TimeObjectProxyType extends _TimeObjectProxyType { constructor: { new(): TimeObjectProxyType }; }

interface _TimeOrdinalEraPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	TimeOrdinalEra?: TimeOrdinalEraType;
}
export interface TimeOrdinalEraPropertyType extends _TimeOrdinalEraPropertyType { constructor: { new(): TimeOrdinalEraPropertyType }; }
export var TimeOrdinalEraPropertyType: { new(): TimeOrdinalEraPropertyType };

/** Ordinal temporal reference systems are often hierarchically structured
  * such that an ordinal era at a given level of the hierarchy includes a
  * sequence of shorter, coterminous ordinal eras. This captured using the member/group properties.
  *
  * Note that in this schema, TIme Ordinal Era is patterned on TimeEdge, which is a variation from ISO 19108.
  * This is in order to fulfill the requirements of ordinal reference systems based on eras delimited by
  * named points or nodes, which are common in geology, archeology, etc.
  *
  * This change is subject of a change proposal to ISO */
interface _TimeOrdinalEraType extends _DefinitionType {
	end: TimeNodePropertyType;
	extent?: TimePeriodPropertyType;
	/** In a particular Time System, an Era may be a member of a group.  The "group" element implements the back-pointer to the Era at the next level up in the hierarchy.
	  *
	  * If the hierarchy is represented by describing the nested components fully in the their nested position inside "member" elements, then the parent can be easily inferred, so the group property is unnecessary.
	  *
	  * However, if the hierarchy is represented by links carried on the "member" property elements, pointing to Eras described fully elsewhere, then it may be useful for a child (member) era to carry an explicit pointer back to its parent (group) Era. */
	group?: ReferenceType;
	/** An Era may be composed of several member Eras. The "member" element implements the association to the Era at the next level down the hierarchy.  "member" follows the standard GML property pattern whereby its (complex) value may be either described fully inline, or may be the target of a link carried on the member element and described fully elsewhere, either in the same document or from another service. */
	member?: TimeOrdinalEraPropertyType[];
	relatedTime?: RelatedTimeType[];
	start: TimeNodePropertyType;
}
export interface TimeOrdinalEraType extends _TimeOrdinalEraType { constructor: { new(): TimeOrdinalEraType }; }
export var TimeOrdinalEraType: { new(): TimeOrdinalEraType };

/** In an ordinal reference system the order of events in time can be well
  * established, but the magnitude of the intervals between them can not be
  * accurately determined (e.g. a stratigraphic sequence). */
interface _TimeOrdinalReferenceSystemType extends _AbstractTimeReferenceSystemType {
	component: TimeOrdinalEraPropertyType[];
}
export interface TimeOrdinalReferenceSystemType extends _TimeOrdinalReferenceSystemType { constructor: { new(): TimeOrdinalReferenceSystemType }; }
export var TimeOrdinalReferenceSystemType: { new(): TimeOrdinalReferenceSystemType };

interface _TimePeriodPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	TimePeriod?: TimePeriodType;
}
export interface TimePeriodPropertyType extends _TimePeriodPropertyType { constructor: { new(): TimePeriodPropertyType }; }
export var TimePeriodPropertyType: { new(): TimePeriodPropertyType };

interface _TimePeriodType extends _AbstractTimeGeometricPrimitiveType {
	begin: TimeInstantPropertyType;
	beginPosition: TimePositionType;
	/** This element is an instance of the primitive xsd:duration simple type to
	  * enable use of the ISO 8601 syntax for temporal length (e.g. P5DT4H30M).
	  * It is a valid subtype of TimeDurationType according to section 3.14.6,
	  * rule 2.2.4 in XML Schema, Part 1. */
	duration?: string;
	end: TimeInstantPropertyType;
	endPosition: TimePositionType;
	/** This element is a valid subtype of TimeDurationType
	  * according to section 3.14.6, rule 2.2.4 in XML Schema, Part 1. */
	timeInterval?: TimeIntervalLengthType;
}
export interface TimePeriodType extends _TimePeriodType { constructor: { new(): TimePeriodType }; }
export var TimePeriodType: { new(): TimePeriodType };

/** Direct representation of a temporal position.
  * Indeterminate time values are also allowed, as described in ISO 19108. The indeterminatePosition
  * attribute can be used alone or it can qualify a specific value for temporal position (e.g. before
  * 2002-12, after 1019624400).
  * For time values that identify position within a calendar, the calendarEraName attribute provides
  * the name of the calendar era to which the date is referenced (e.g. the Meiji era of the Japanese calendar). */
interface _TimePositionType extends _TimePositionUnion {
	calendarEraName?: string;
	frame?: string;
	indeterminatePosition?: TimeIndeterminateValueType;
}
export interface TimePositionType extends _TimePositionType { constructor: { new(): TimePositionType }; }
export var TimePositionType: { new(): TimePositionType };

/** The ISO 19108:2002 hierarchy of subtypes for temporal position are collapsed
  * by defining a union of XML Schema simple types for indicating temporal position relative
  * to a specific reference system.
  *
  * Dates and dateTime may be indicated with varying degrees of precision.
  * dateTime by itself does not allow right-truncation, except for fractions of seconds.
  * When used with non-Gregorian calendars based on years, months, days,
  * the same lexical representation should still be used, with leading zeros added if the
  * year value would otherwise have fewer than four digits.
  *
  * An ordinal position may be referenced via URI identifying the definition of an ordinal era.
  *
  * A time coordinate value is indicated as a decimal (e.g. UNIX time, GPS calendar). */
export type TimePositionUnion = string;
type _TimePositionUnion = Primitive._string;

interface _TimePrimitivePropertyType extends _TimePrimitiveProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface TimePrimitivePropertyType extends _TimePrimitivePropertyType { constructor: { new(): TimePrimitivePropertyType }; }
export var TimePrimitivePropertyType: { new(): TimePrimitivePropertyType };

interface _TimePrimitiveProxyType extends _TimeTopologyPrimitiveProxyType, _TimeGeometricPrimitiveProxyType {}
interface TimePrimitiveProxyType extends _TimePrimitiveProxyType { constructor: { new(): TimePrimitiveProxyType }; }

interface _TimeReferenceSystemProxyType extends BaseType {
	TimeCalendar?: TimeCalendarType;
	TimeClock?: TimeClockType;
	TimeCoordinateSystem?: TimeCoordinateSystemType;
	TimeOrdinalReferenceSystem?: TimeOrdinalReferenceSystemType;
}
interface TimeReferenceSystemProxyType extends _TimeReferenceSystemProxyType { constructor: { new(): TimeReferenceSystemProxyType }; }

interface _TimeSliceProxyType extends BaseType {
	MovingObjectStatus?: MovingObjectStatusType;
}
interface TimeSliceProxyType extends _TimeSliceProxyType { constructor: { new(): TimeSliceProxyType }; }

/** A time topology complex property can either be any time topology complex element
  * encapsulated in an element of this type or an XLink reference to a remote time topology complex element
  * (where remote includes elements located elsewhere in the same document).
  * Note that either the reference or the contained element must be given, but not both or none. */
interface _TimeTopologyComplexPropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	/** This element represents temporal topology complex. It shall be the connected acyclic directed graph composed of time nodes and time edges. */
	TimeTopologyComplex?: TimeTopologyComplexType;
}
export interface TimeTopologyComplexPropertyType extends _TimeTopologyComplexPropertyType { constructor: { new(): TimeTopologyComplexPropertyType }; }
export var TimeTopologyComplexPropertyType: { new(): TimeTopologyComplexPropertyType };

/** A temporal topology complex. */
interface _TimeTopologyComplexType extends _AbstractTimeComplexType {
	primitive: TimeTopologyPrimitivePropertyType[];
}
export interface TimeTopologyComplexType extends _TimeTopologyComplexType { constructor: { new(): TimeTopologyComplexType }; }
export var TimeTopologyComplexType: { new(): TimeTopologyComplexType };

/** A time topology primitive property can either hold any time topology complex element
  * eor carry an XLink reference to a remote time topology complex element
  * (where remote includes elements located elsewhere in the same document).
  * Note that either the reference or the contained element must be given, but not both or none. */
interface _TimeTopologyPrimitivePropertyType extends _TimeTopologyPrimitiveProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface TimeTopologyPrimitivePropertyType extends _TimeTopologyPrimitivePropertyType { constructor: { new(): TimeTopologyPrimitivePropertyType }; }
export var TimeTopologyPrimitivePropertyType: { new(): TimeTopologyPrimitivePropertyType };

interface _TimeTopologyPrimitiveProxyType extends BaseType {
	/** "TimeNode" is a zero dimensional temporal topology primitive,
	  * expresses a position in topological time, and is a start and an end of time edge, which represents states of time.
	  * Time node may be isolated. However, it cannot describe the ordering relationships with other primitives.
	  * An isolated node may not be an element of any temporal topology complex. */
	TimeNode?: TimeNodeType;
	/** TimeEdge is one dimensional temporal topology primitive,
	  * expresses a state in topological time. It has an orientation from its start toward the end,
	  * and its boundaries shall associate with two different time nodes. */
	TimeEdge?: TimeEdgeType;
}
interface TimeTopologyPrimitiveProxyType extends _TimeTopologyPrimitiveProxyType { constructor: { new(): TimeTopologyPrimitiveProxyType }; }

/** Value of a time or temporal quantity, with its units. Uses the MeasureType with the restriction that the unit of measure referenced by uom must be suitable for a time value, such as seconds or weeks. */
interface _TimeType extends _MeasureType {}
export interface TimeType extends _TimeType { constructor: { new(): TimeType }; }
export var TimeType: { new(): TimeType };

/** Standard units for measuring time intervals (see ISO 31-1). */
export type TimeUnitType = string;
type _TimeUnitType = Primitive._string;

/** A tin is a triangulated surface that uses
  * the Delauny algorithm or a similar algorithm complemented with
  * consideration of breaklines, stoplines, and maximum length of
  * triangle sides. These networks satisfy the Delauny's criterion
  * away from the modifications: Fore each triangle in the
  * network, the circle passing through its vertices does not
  * contain, in its interior, the vertex of any other triangle. */
interface _TinType extends _TriangulatedSurfaceType {
	/** Breaklines are lines of a critical
	  * nature to the shape of the surface, representing local
	  * ridges, or depressions (such as drainage lines) in the
	  * surface. As such their constituent segments must be
	  * included in the tin eve if doing so
	  * violates the Delauny criterion. Break lines contains these
	  * critical segments as a set of line strings. */
	breakLines?: LineStringSegmentArrayPropertyType[];
	/** The corners of the triangles in the TIN
	  * are often referred to as pots. ControlPoint shall contain a
	  * set of the GM_Position used as posts for this TIN. Since each
	  * TIN contains triangles, there must be at least 3 posts. The
	  * order in which these points are given does not affect the
	  * surface that is represented. Application schemas may add
	  * information based on ordering of control points to facilitate
	  * the reconstruction of the TIN from the control points. */
	controlPoint: TinTypeControlPointType;
	/** Areas of the surface where data is not
	  * sufficiently dense to assure reasonable calculation shall be
	  * removed by adding a retention criterion for triangles based
	  * on the length of their sides. For many triangle sides
	  * exceeding maximum length, the adjacent triangles to that
	  * triangle side shall be removed from the surface. */
	maxLength: LengthType;
	/** Stoplines are lines where the local
	  * continuity or regularity of the surface is questionable.
	  * In the area of these pathologies, triangles intersecting
	  * a stopline shall be removed from the tin surface, leaving
	  * holes in the surface. If coincidence occurs on surface
	  * boundary triangles, the result shall be a change of the
	  * surface boundary. Stoplines contains all these
	  * pathological segments as a set of line strings. */
	stopLines?: LineStringSegmentArrayPropertyType[];
}
export interface TinType extends _TinType { constructor: { new(): TinType }; }
export var TinType: { new(): TinType };

interface _TinTypeControlPointType extends BaseType {
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty
	  * is the predefined property which can be used by GML Application Schemas whenever a GML Feature has a property with a value that
	  * is substitutable for Point. */
	pointProperty: PointPropertyType[];
	pos: DirectPositionType[];
	posList: DirectPositionListType;
}
interface TinTypeControlPointType extends _TinTypeControlPointType { constructor: { new(): TinTypeControlPointType }; }

/** This Property can be used to embed a TopoComplex in a feature collection. */
interface _TopoComplexMemberType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	TopoComplex?: TopoComplexType;
}
export interface TopoComplexMemberType extends _TopoComplexMemberType { constructor: { new(): TopoComplexMemberType }; }
export var TopoComplexMemberType: { new(): TopoComplexMemberType };

/** This type represents a TP_Complex capable of holding topological primitives. */
interface _TopoComplexType extends _AbstractTopologyType {
	isMaximal: boolean;
	/** Need schamatron test here that isMaximal attribute value is true */
	maximalComplex: TopoComplexMemberType;
	subComplex?: TopoComplexMemberType[];
	superComplex?: TopoComplexMemberType[];
	topoPrimitiveMember?: TopoPrimitiveMemberType[];
	topoPrimitiveMembers?: TopoPrimitiveArrayAssociationType;
}
export interface TopoComplexType extends _TopoComplexType { constructor: { new(): TopoComplexType }; }
export var TopoComplexType: { new(): TopoComplexType };

interface _TopoCurvePropertyType extends BaseType {
	TopoCurve: TopoCurveType;
}
export interface TopoCurvePropertyType extends _TopoCurvePropertyType { constructor: { new(): TopoCurvePropertyType }; }
export var TopoCurvePropertyType: { new(): TopoCurvePropertyType };

/** The end Node of each directedEdge of a TopoCurveType
  * is the start Node of the next directedEdge of the TopoCurveType in document order.  The TopoCurve type and element represent a homogeneous topological expression, a list of directed edges, which if realised are isomorphic to a geometric curve primitive. The intended use of TopoCurve is to appear within a line feature instance to express the structural and geometric relationships of this line to other features via the shared edge definitions. */
interface _TopoCurveType extends _AbstractTopologyType {
	directedEdge: DirectedEdgePropertyType[];
}
export interface TopoCurveType extends _TopoCurveType { constructor: { new(): TopoCurveType }; }
export var TopoCurveType: { new(): TopoCurveType };

interface _TopologyProxyType extends _TopoPrimitiveProxyType {
	TopoComplex?: TopoComplexType;
}
interface TopologyProxyType extends _TopologyProxyType { constructor: { new(): TopologyProxyType }; }

interface _TopologyStylePropertyType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	about?: string;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	/** The style descriptor for topologies of a feature. Describes individual topology elements styles. */
	TopologyStyle?: TopologyStyleType;
}
export interface TopologyStylePropertyType extends _TopologyStylePropertyType { constructor: { new(): TopologyStylePropertyType }; }
export var TopologyStylePropertyType: { new(): TopologyStylePropertyType };

/** [complexType of] The style descriptor for topologies of a feature. Describes individual topology elements styles. */
interface _TopologyStyleType extends _BaseStyleDescriptorType {
	topologyProperty: string;
	topologyType: string;
	/** The style descriptor for labels of a feature, geometry or topology. */
	LabelStyle?: LabelStyleType;
	/** Deprecated in GML version 3.1.0. Use symbol with inline content instead. */
	style: string;
	/** The symbol property. Extends the gml:AssociationType to allow for remote referencing of symbols. */
	symbol: SymbolType;
}
export interface TopologyStyleType extends _TopologyStyleType { constructor: { new(): TopologyStyleType }; }
export var TopologyStyleType: { new(): TopologyStyleType };

interface _TopoPointPropertyType extends BaseType {
	TopoPoint: TopoPointType;
}
export interface TopoPointPropertyType extends _TopoPointPropertyType { constructor: { new(): TopoPointPropertyType }; }
export var TopoPointPropertyType: { new(): TopoPointPropertyType };

/** The intended use of TopoPoint is to appear within a point feature to express the structural and possibly geometric relationships of this point to other features via shared node definitions. Note the orientation assigned to the directedNode has no meaning in this context. It is preserved for symmetry with the types and elements which follow. */
interface _TopoPointType extends _AbstractTopologyType {
	directedNode: DirectedNodePropertyType;
}
export interface TopoPointType extends _TopoPointType { constructor: { new(): TopoPointType }; }
export var TopoPointType: { new(): TopoPointType };

/** This type supports embedding an array of topological primitives in a TopoComplex */
interface _TopoPrimitiveArrayAssociationType extends BaseType {
	/** Substitution group branch for Topo Primitives, used by TopoPrimitiveArrayAssociationType */
	TopoPrimitive?: TopoPrimitiveProxyType[];
}
export interface TopoPrimitiveArrayAssociationType extends _TopoPrimitiveArrayAssociationType { constructor: { new(): TopoPrimitiveArrayAssociationType }; }
export var TopoPrimitiveArrayAssociationType: { new(): TopoPrimitiveArrayAssociationType };

/** This type supports embedding topological primitives in a TopoComplex. */
interface _TopoPrimitiveMemberType extends _TopoPrimitiveProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
}
export interface TopoPrimitiveMemberType extends _TopoPrimitiveMemberType { constructor: { new(): TopoPrimitiveMemberType }; }
export var TopoPrimitiveMemberType: { new(): TopoPrimitiveMemberType };

interface _TopoPrimitiveProxyType extends BaseType {
	Edge?: EdgeType;
	Node?: NodeType;
	Face?: FaceType;
	TopoSolid?: TopoSolidType;
}
interface TopoPrimitiveProxyType extends _TopoPrimitiveProxyType { constructor: { new(): TopoPrimitiveProxyType }; }

/** The topological boundary of a TopoSolid consists of a set of directed faces. Note that all faces associated with the TopoSolid, including dangling faces, appear in the boundary. The coboundary of a TopoSolid is empty and hence requires no representation. */
interface _TopoSolidType extends _AbstractTopoPrimitiveType {
	directedFace: DirectedFacePropertyType[];
}
export interface TopoSolidType extends _TopoSolidType { constructor: { new(): TopoSolidType }; }
export var TopoSolidType: { new(): TopoSolidType };

interface _TopoSurfacePropertyType extends BaseType {
	TopoSurface: TopoSurfaceType;
}
export interface TopoSurfacePropertyType extends _TopoSurfacePropertyType { constructor: { new(): TopoSurfacePropertyType }; }
export var TopoSurfacePropertyType: { new(): TopoSurfacePropertyType };

/** The TopoSurface type and element represent a homogeneous topological expression, a set of directed faces, which if realised are isomorphic to a geometric surface primitive. The intended use of TopoSurface is to appear within a surface feature instance to express the structural and possibly geometric relationships of this surface to other features via the shared face definitions. */
interface _TopoSurfaceType extends _AbstractTopologyType {
	directedFace: DirectedFacePropertyType[];
}
export interface TopoSurfaceType extends _TopoSurfaceType { constructor: { new(): TopoSurfaceType }; }
export var TopoSurfaceType: { new(): TopoSurfaceType };

interface _TopoVolumePropertyType extends BaseType {
	TopoVolume: TopoVolumeType;
}
export interface TopoVolumePropertyType extends _TopoVolumePropertyType { constructor: { new(): TopoVolumePropertyType }; }
export var TopoVolumePropertyType: { new(): TopoVolumePropertyType };

/** The TopoVolume type and element represent a homogeneous topological expression, a set of directed TopoSolids, which if realised are isomorphic to a geometric solid primitive. The intended use of TopoVolume is to appear within a 3D solid feature instance to express the structural and geometric relationships of this solid to other features via the shared TopoSolid definitions.  . Note the orientation assigned to the directedSolid has no meaning in three dimensions. It is preserved for symmetry with the preceding types and elements. */
interface _TopoVolumeType extends _AbstractTopologyType {
	directedTopoSolid: DirectedTopoSolidPropertyType[];
}
export interface TopoVolumeType extends _TopoVolumeType { constructor: { new(): TopoVolumeType }; }
export var TopoVolumeType: { new(): TopoVolumeType };

/** The track of a moving object is a sequence of specialized timeslices        that indicate the status of the object. */
interface _TrackType extends _HistoryPropertyType {
	MovingObjectStatus: MovingObjectStatusType[];
}
export interface TrackType extends _TrackType { constructor: { new(): TrackType }; }
export var TrackType: { new(): TrackType };

/** Association to a transformation, either referencing or containing the definition of that transformation. */
interface _TransformationRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	Transformation?: TransformationType;
}
export interface TransformationRefType extends _TransformationRefType { constructor: { new(): TransformationRefType }; }
export var TransformationRefType: { new(): TransformationRefType };

/** A concrete operation on coordinates that usually includes a change of datum. The parameters of a coordinate transformation are empirically derived from data containing the coordinates of a series of points in both coordinate reference systems. This computational process is usually "over-determined", allowing derivation of error (or accuracy) estimates for the transformation. Also, the stochastic nature of the parameters may result in multiple (different) versions of the same coordinate transformation.
  *
  * This concrete complexType can be used for all operation methods, without using an Application Schema that defines operation-method-specialized element names and contents, especially for methods with only one Transformation instance. */
interface _TransformationType extends _AbstractGeneralTransformationType {
	/** Association to the operation method used by this coordinate operation. */
	usesMethod: OperationMethodRefType;
	/** Composition association to a parameter value used by this coordinate operation. */
	usesValue?: ParameterValueType[];
}
export interface TransformationType extends _TransformationType { constructor: { new(): TransformationType }; }
export var TransformationType: { new(): TransformationType };

/** This type defines a container for an array of
  * triangle patches. */
interface _TrianglePatchArrayPropertyType extends _SurfacePatchArrayPropertyType {
	Triangle?: TriangleType[];
}
export interface TrianglePatchArrayPropertyType extends _TrianglePatchArrayPropertyType { constructor: { new(): TrianglePatchArrayPropertyType }; }
export var TrianglePatchArrayPropertyType: { new(): TrianglePatchArrayPropertyType };

/** Represents a triangle as a surface with an outer boundary consisting of a linear ring. Note that this is a polygon (subtype) with no inner boundaries. The number of points in the linear ring must be four. */
interface _TriangleType extends _AbstractSurfacePatchType, _ExteriorProxyType {
	/** The attribute "interpolation" specifies the interpolation mechanism used for this surface patch. Currently only planar surface patches are defined in GML 3, the attribute is fixed to "planar", i.e. the interpolation method shall return points on a single plane. The boundary of the patch shall be contained within that plane. */
	interpolation: SurfaceInterpolationType;
}
export interface TriangleType extends _TriangleType { constructor: { new(): TriangleType }; }
export var TriangleType: { new(): TriangleType };

interface _TriangulatedSurfaceProxyType extends BaseType {
	TriangulatedSurface?: TriangulatedSurfaceType;
	Tin?: TinType;
}
interface TriangulatedSurfaceProxyType extends _TriangulatedSurfaceProxyType { constructor: { new(): TriangulatedSurfaceProxyType }; }

/** A triangulated surface is a polyhedral
  * surface that is composed only of triangles. There is no
  * restriction on how the triangulation is derived. */
interface _TriangulatedSurfaceType extends _SurfaceType {
	/** Contains a simple text description of the object, or refers to an external description. */
	description?: StringOrRefType;
	/** Contains or refers to a metadata package that contains metadata properties. */
	metaDataProperty?: MetaDataPropertyType[];
	/** Label for the object, normally a descriptive name. An object may have several names, typically assigned by different authorities.  The authority for a name is indicated by the value of its (optional) codeSpace attribute.  The name may or may not be unique, as determined by the rules of the organization responsible for the codeSpace. */
	name?: NameProxyType[];
	/** This property element contains a list of
	  * triangle patches. The order of the patches is significant and
	  * shall be preserved when processing the list. */
	trianglePatches: TrianglePatchArrayPropertyType;
}
export interface TriangulatedSurfaceType extends _TriangulatedSurfaceType { constructor: { new(): TriangulatedSurfaceType }; }
export var TriangulatedSurfaceType: { new(): TriangulatedSurfaceType };

interface _UnitDefinitionProxyType extends BaseType {
	UnitDefinition?: UnitDefinitionType;
	BaseUnit?: BaseUnitType;
	ConventionalUnit?: ConventionalUnitType;
	DerivedUnit?: DerivedUnitType;
}
interface UnitDefinitionProxyType extends _UnitDefinitionProxyType { constructor: { new(): UnitDefinitionProxyType }; }

/** Definition of a unit of measure (or uom). The definition includes a quantityType property, which indicates the phenomenon to which the units apply, and a catalogSymbol, which gives the short symbol used for this unit. This element is used when the relationship of this unit to other units or units systems is unknown. */
interface _UnitDefinitionType extends _DefinitionType {
	/** For global understanding of a unit of measure, it is often possible to reference an item in a catalog of units, using a symbol in that catalog. The "codeSpace" attribute in "CodeType" identifies a namespace for the catalog symbol value, and might reference the catalog. The "string" value in "CodeType" contains the value of a symbol that is unique within this catalog namespace. This symbol often appears explicitly in the catalog, but it could be a combination of symbols using a specified algebra of units. For example, the symbol "cm" might indicate that it is the "m" symbol combined with the "c" prefix. */
	catalogSymbol?: CodeType;
	/** Informal description of the phenomenon or type of quantity that is measured or observed. For example, "length", "angle", "time", "pressure", or "temperature". When the quantity is the result of an observation or measurement, this term is known as Observable Type or Measurand. */
	quantityType: StringOrRefType;
}
export interface UnitDefinitionType extends _UnitDefinitionType { constructor: { new(): UnitDefinitionType }; }
export var UnitDefinitionType: { new(): UnitDefinitionType };

/** Reference to a unit of measure definition that applies to all the numerical values described by the element containing this element. Notice that a complexType which needs to include the uom attribute can do so by extending this complexType. Alternately, this complexType can be used as a pattern for a new complexType. */
interface _UnitOfMeasureType extends BaseType {
	/** Reference to a unit of measure definition, usually within the same XML document but possibly outside the XML document which contains this reference. For a reference within the same XML document, the "#" symbol should be used, followed by a text abbreviation of the unit name. However, the "#" symbol may be optional, and still may be interpreted as a reference. */
	uom: string;
}
export interface UnitOfMeasureType extends _UnitOfMeasureType { constructor: { new(): UnitOfMeasureType }; }
export var UnitOfMeasureType: { new(): UnitOfMeasureType };

/** Association to a user-defined coordinate system, either referencing or containing the definition of that coordinate system. */
interface _UserDefinedCSRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	UserDefinedCS?: UserDefinedCSType;
}
export interface UserDefinedCSRefType extends _UserDefinedCSRefType { constructor: { new(): UserDefinedCSRefType }; }
export var UserDefinedCSRefType: { new(): UserDefinedCSRefType };

/** A two- or three-dimensional coordinate system that consists of any combination of coordinate axes not covered by any other coordinate system type. An example is a multilinear coordinate system which contains one coordinate axis that may have any 1-D shape which has no intersections with itself. This non-straight axis is supplemented by one or two straight axes to complete a 2 or 3 dimensional coordinate system. The non-straight axis is typically incrementally straight or curved. A UserDefinedCS shall have two or three usesAxis associations. */
interface _UserDefinedCSType extends _AbstractCoordinateSystemType {}
export interface UserDefinedCSType extends _UserDefinedCSType { constructor: { new(): UserDefinedCSType }; }
export var UserDefinedCSType: { new(): UserDefinedCSType };

/** GML property which refers to, or contains, a set of homogeneously typed Values. */
interface _ValueArrayPropertyType extends BaseType {
	/** This abstract element is the head of a substitutionGroup hierararchy which may contain either simpleContent or complexContent elements.  It is used to assert the model position of "class" elements declared in other GML schemas. */
	Object: ObjectProxyType[];
	/** A value from two-valued logic, using the XML Schema boolean type.  An instance may take the values {true, false, 1, 0}. */
	Boolean: boolean[];
	/** XML List based on XML Schema boolean type.  An element of this type contains a space-separated list of boolean values {0,1,true,false} */
	BooleanList: booleanOrNullList[];
	/** A term representing a classification.  It has an optional XML attribute codeSpace, whose value is a URI which identifies a dictionary, codelist or authority for the term. */
	Category: CodeType[];
	/** Utility element to store a 2-point range of ordinal values. If one member is a null, then this is a single ended interval. */
	CategoryExtent: CategoryExtentType[];
	/** A space-separated list of terms or nulls.  A single XML attribute codeSpace may be provided, which authorises all the terms in the list. */
	CategoryList: CodeOrNullListType[];
	/** Aggregate value built using the Composite pattern. */
	CompositeValue: CompositeValueProxyType[];
	/** An integer representing a frequency of occurrence. */
	Count: number[];
	/** Utility element to store a 2-point range of frequency values. If one member is a null, then this is a single ended interval. */
	CountExtent: CountExtentType[];
	/** A space-separated list of integers or nulls. */
	CountList: integerOrNullList[];
	Null: string[];
	/** A numeric value with a scale.  The content of the element is an amount using the XML Schema type double which permits decimal or scientific notation.  An XML attribute uom (unit of measure) is required, whose value is a URI which identifies the definition of the scale or units by which the numeric value must be multiplied. */
	Quantity: MeasureType[];
	/** Utility element to store a 2-point range of numeric values. If one member is a null, then this is a single ended interval. */
	QuantityExtent: QuantityExtentType[];
	/** A space separated list of amounts or nulls.  The amounts use the XML Schema type double.  A single XML attribute uom (unit of measure) is required, whose value is a URI which identifies the definition of the scale or units by which all the amounts in the list must be multiplied. */
	QuantityList: MeasureOrNullListType[];
}
export interface ValueArrayPropertyType extends _ValueArrayPropertyType { constructor: { new(): ValueArrayPropertyType }; }
export var ValueArrayPropertyType: { new(): ValueArrayPropertyType };

/** A Value Array is used for homogeneous arrays of primitive and aggregate values.  The member values may be scalars, composites, arrays or lists.  ValueArray has the same content model as CompositeValue, but the member values must be homogeneous.  The element declaration contains a Schematron constraint which expresses this restriction precisely.            Since the members are homogeneous, the referenceSystem (uom, codeSpace) may be specified on the ValueArray itself and implicitly inherited by all the members if desired.    Note that a_ScalarValueList is preferred for arrays of Scalar Values since this is a more efficient encoding. */
interface _ValueArrayType extends _CompositeValueType {
	codeSpace?: string;
	uom?: string;
}
export interface ValueArrayType extends _ValueArrayType { constructor: { new(): ValueArrayType }; }
export var ValueArrayType: { new(): ValueArrayType };

/** GML property which refers to, or contains, a Value */
interface _ValuePropertyType extends _ObjectProxyType, _CompositeValueProxyType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	/** A value from two-valued logic, using the XML Schema boolean type.  An instance may take the values {true, false, 1, 0}. */
	Boolean?: boolean;
	/** XML List based on XML Schema boolean type.  An element of this type contains a space-separated list of boolean values {0,1,true,false} */
	BooleanList?: booleanOrNullList;
	/** A term representing a classification.  It has an optional XML attribute codeSpace, whose value is a URI which identifies a dictionary, codelist or authority for the term. */
	Category?: CodeType;
	/** Utility element to store a 2-point range of ordinal values. If one member is a null, then this is a single ended interval. */
	CategoryExtent?: CategoryExtentType;
	/** A space-separated list of terms or nulls.  A single XML attribute codeSpace may be provided, which authorises all the terms in the list. */
	CategoryList?: CodeOrNullListType;
	/** An integer representing a frequency of occurrence. */
	Count?: number;
	/** Utility element to store a 2-point range of frequency values. If one member is a null, then this is a single ended interval. */
	CountExtent?: CountExtentType;
	/** A space-separated list of integers or nulls. */
	CountList?: integerOrNullList;
	Null?: string;
	/** A numeric value with a scale.  The content of the element is an amount using the XML Schema type double which permits decimal or scientific notation.  An XML attribute uom (unit of measure) is required, whose value is a URI which identifies the definition of the scale or units by which the numeric value must be multiplied. */
	Quantity?: MeasureType;
	/** Utility element to store a 2-point range of numeric values. If one member is a null, then this is a single ended interval. */
	QuantityExtent?: QuantityExtentType;
	/** A space separated list of amounts or nulls.  The amounts use the XML Schema type double.  A single XML attribute uom (unit of measure) is required, whose value is a URI which identifies the definition of the scale or units by which all the amounts in the list must be multiplied. */
	QuantityList?: MeasureOrNullListType;
}
export interface ValuePropertyType extends _ValuePropertyType { constructor: { new(): ValuePropertyType }; }
export var ValuePropertyType: { new(): ValuePropertyType };

/** Vector instances hold the compoents for a (usually spatial) vector within some coordinate reference system (CRS).
  * Since Vectors will often be included in larger objects that have references to CRS, the "srsName" attribute may be missing.
  * In this case, the CRS is implicitly assumed to take on the value of the containing object's CRS.
  *
  * Note that this content model is the same as DirectPositionType, but is defined separately to reflect the distinct semantics, and to avoid validation problems. SJDC 2004-12-02 */
export type VectorType = number[];

/** Association to a vertical coordinate reference system, either referencing or containing the definition of that reference system. */
interface _VerticalCRSRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	VerticalCRS?: VerticalCRSType;
}
export interface VerticalCRSRefType extends _VerticalCRSRefType { constructor: { new(): VerticalCRSRefType }; }
export var VerticalCRSRefType: { new(): VerticalCRSRefType };

/** A 1D coordinate reference system used for recording heights or depths. Vertical CRSs make use of the direction of gravity to define the concept of height or depth, but the relationship with gravity may not be straightforward. By implication, ellipsoidal heights (h) cannot be captured in a vertical coordinate reference system. Ellipsoidal heights cannot exist independently, but only as an inseparable part of a 3D coordinate tuple defined in a geographic 3D coordinate reference system. */
interface _VerticalCRSType extends _AbstractReferenceSystemType {
	/** Association to the vertical coordinate system used by this CRS. */
	usesVerticalCS: VerticalCSRefType;
	/** Association to the vertical datum used by this CRS. */
	usesVerticalDatum: VerticalDatumRefType;
}
export interface VerticalCRSType extends _VerticalCRSType { constructor: { new(): VerticalCRSType }; }
export var VerticalCRSType: { new(): VerticalCRSType };

/** Association to a vertical coordinate system, either referencing or containing the definition of that coordinate system. */
interface _VerticalCSRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	VerticalCS?: VerticalCSType;
}
export interface VerticalCSRefType extends _VerticalCSRefType { constructor: { new(): VerticalCSRefType }; }
export var VerticalCSRefType: { new(): VerticalCSRefType };

/** A one-dimensional coordinate system used to record the heights (or depths) of points. Such a coordinate system is usually dependent on the Earth's gravity field, perhaps loosely as when atmospheric pressure is the basis for the vertical coordinate system axis. A VerticalCS shall have one usesAxis association. */
interface _VerticalCSType extends _AbstractCoordinateSystemType {}
export interface VerticalCSType extends _VerticalCSType { constructor: { new(): VerticalCSType }; }
export var VerticalCSType: { new(): VerticalCSType };

/** Association to a vertical datum, either referencing or containing the definition of that datum. */
interface _VerticalDatumRefType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	VerticalDatum?: VerticalDatumType;
}
export interface VerticalDatumRefType extends _VerticalDatumRefType { constructor: { new(): VerticalDatumRefType }; }
export var VerticalDatumRefType: { new(): VerticalDatumRefType };

/** A textual description and/or a set of parameters identifying a particular reference level surface used as a zero-height surface, including its position with respect to the Earth for any of the height types recognized by this standard. There are several types of Vertical Datums, and each may place constraints on the Coordinate Axis with which it is combined to create a Vertical CRS. */
interface _VerticalDatumType extends _AbstractDatumType {
	verticalDatumType?: VerticalDatumTypeType;
}
export interface VerticalDatumType extends _VerticalDatumType { constructor: { new(): VerticalDatumType }; }
export var VerticalDatumType: { new(): VerticalDatumType };

/** Type of a vertical datum. */
interface _VerticalDatumTypeType extends _CodeType {
	/** Reference to a source of information specifying the values and meanings of all the allowed string values for this VerticalDatumTypeType. */
	codeSpace: string;
}
export interface VerticalDatumTypeType extends _VerticalDatumTypeType { constructor: { new(): VerticalDatumTypeType }; }
export var VerticalDatumTypeType: { new(): VerticalDatumTypeType };

/** Value of a spatial volume quantity, with its units. Uses the MeasureType with the restriction that the unit of measure referenced by uom must be suitable for a volume, such as cubic metres or cubic feet. */
interface _VolumeType extends _MeasureType {}
export interface VolumeType extends _VolumeType { constructor: { new(): VolumeType }; }
export var VolumeType: { new(): VolumeType };

export interface document extends BaseType {
	absoluteExternalPositionalAccuracy: AbsoluteExternalPositionalAccuracyType;
	abstractGeneralOperationParameterRef: AbstractGeneralOperationParameterRefType;
	AffinePlacement: AffinePlacementType;
	/** Description, possibly including coordinates, of the point or points used to anchor the datum to the Earth. Also known as the "origin", especially for engineering and image datums. The codeSpace attribute can be used to reference a source of more detailed on this point or surface, or on a set of such descriptions.
	  * - For a geodetic datum, this point is also known as the fundamental point, which is traditionally the point where the relationship between geoid and ellipsoid is defined. In some cases, the "fundamental point" may consist of a number of points. In those cases, the parameters defining the geoid/ellipsoid relationship have been averaged for these points, and the averages adopted as the datum definition.
	  * - For an engineering datum, the anchor point may be a physical point, or it may be a point with defined coordinates in another CRS. When appropriate, the coordinates of this anchor point can be referenced in another document, such as referencing a GML feature that references or includes a point position.
	  * - For an image datum, the anchor point is usually either the centre of the image or the corner of the image.
	  * - For a temporal datum, this attribute is not defined. Instead of the anchor point, a temporal datum carries a separate time origin of type DateTime. */
	anchorPoint: CodeType;
	angle: MeasureType;
	ArcByBulge: ArcByBulgeType;
	/** Generic GML element to contain a homogeneous array of GML _Objects */
	Array: ArrayType;
	/** The abbreviation used for this coordinate system axis. This abbreviation can be used to identify the ordinates in a coordinate tuple. Examples are X and Y. The codeSpace attribute can reference a source of more information on a set of standardized abbreviations, or on this abbreviation. */
	axisAbbrev: CodeType;
	/** Direction of this coordinate system axis (or in the case of Cartesian projected coordinates, the direction of this coordinate system axis at the origin). Examples: north or south, east or west, up or down. Within any set of coordinate system axes, only one of each pair of terms can be used. For earth-fixed CRSs, this direction is often approximate and intended to provide a human interpretable meaning to the axis. When a geodetic datum is used, the precise directions of the axes may therefore vary slightly from this approximate direction. Note that an EngineeringCRS can include specific descriptions of the directions of its coordinate system axes. For example, the path of a linear CRS axis can be referenced in another document, such as referencing a GML feature that references or includes a curve geometry. The codeSpace attribute can reference a source of more information on a set of standardized directions, or on this direction. */
	axisDirection: CodeType;
	/** An identification of a coordinate system axis. */
	axisID: IdentifierType;
	/** Generic GML element to contain a heterogeneous collection of GML _Objects */
	Bag: BagType;
	/** Association to the coordinate reference system used by this derived CRS. */
	baseCRS: CoordinateReferenceSystemRefType;
	/** This property element either references a curve via the XLink-attributes or contains the curve element. A curve element is any element which is substitutable for "_Curve". */
	baseCurve: CurvePropertyType;
	/** This property element either references a surface via the XLink-attributes or contains the surface element. A surface element is any element which is substitutable for "_Surface". */
	baseSurface: SurfacePropertyType;
	BaseUnit: BaseUnitType;
	Bezier: BezierType;
	/** A value from two-valued logic, using the XML Schema boolean type.  An instance may take the values {true, false, 1, 0}. */
	Boolean: boolean;
	/** XML List based on XML Schema boolean type.  An element of this type contains a space-separated list of boolean values {0,1,true,false} */
	BooleanList: booleanOrNullList;
	/** Boolean value of an operation parameter. A Boolean value does not have an associated unit of measure. */
	booleanValue: boolean;
	boundedBy: BoundingShapeType;
	/** A bounding box (or envelope) defining the spatial domain of this object. */
	boundingBox: EnvelopeType;
	/** A bounding polygon defining the horizontal spatial domain of this object. */
	boundingPolygon: PolygonType;
	CartesianCS: CartesianCSType;
	cartesianCSRef: CartesianCSRefType;
	/** For global understanding of a unit of measure, it is often possible to reference an item in a catalog of units, using a symbol in that catalog. The "codeSpace" attribute in "CodeType" identifies a namespace for the catalog symbol value, and might reference the catalog. The "string" value in "CodeType" contains the value of a symbol that is unique within this catalog namespace. This symbol often appears explicitly in the catalog, but it could be a combination of symbols using a specified algebra of units. For example, the symbol "cm" might indicate that it is the "m" symbol combined with the "c" prefix. */
	catalogSymbol: CodeType;
	/** A term representing a classification.  It has an optional XML attribute codeSpace, whose value is a URI which identifies a dictionary, codelist or authority for the term. */
	Category: CodeType;
	/** Utility element to store a 2-point range of ordinal values. If one member is a null, then this is a single ended interval. */
	CategoryExtent: CategoryExtentType;
	/** A space-separated list of terms or nulls.  A single XML attribute codeSpace may be provided, which authorises all the terms in the list. */
	CategoryList: CodeOrNullListType;
	centerLineOf: CurvePropertyType;
	centerOf: PointPropertyType;
	Circle: CircleType;
	CircleByCenterPoint: CircleByCenterPointType;
	Clothoid: ClothoidType;
	/** Column number of this covariance element value. */
	columnIndex: number;
	CompassPoint: CompassPointEnumeration;
	CompositeCurve: CompositeCurveType;
	CompositeSolid: CompositeSolidType;
	CompositeSurface: CompositeSurfaceType;
	CompoundCRS: CompoundCRSType;
	compoundCRSRef: CompoundCRSRefType;
	ConcatenatedOperation: ConcatenatedOperationType;
	concatenatedOperationRef: ConcatenatedOperationRefType;
	Cone: ConeType;
	container: ContainerPropertyType;
	ConventionalUnit: ConventionalUnitType;
	Conversion: ConversionType;
	conversionRef: ConversionRefType;
	/** This element is included when this unit has an accurate conversion to the preferred unit for this quantity type. */
	conversionToPreferredUnit: ConversionToPreferredUnitType;
	/** Deprecated with GML 3.0 and included for backwards compatibility with GML 2. Use the "pos" element instead. */
	coord: CoordType;
	/** An identification of a coordinate operation. */
	coordinateOperationID: IdentifierType;
	/** The name by which this coordinate operation is identified. */
	coordinateOperationName: CodeType;
	coordinateOperationRef: CoordinateOperationRefType;
	coordinateReferenceSystemRef: CoordinateReferenceSystemRefType;
	/** Deprecated with GML version 3.1.0. */
	coordinates: CoordinatesType;
	CoordinateSystemAxis: CoordinateSystemAxisType;
	coordinateSystemAxisRef: CoordinateSystemAxisRefType;
	coordinateSystemRef: CoordinateSystemRefType;
	/** An integer representing a frequency of occurrence. */
	Count: number;
	/** Utility element to store a 2-point range of frequency values. If one member is a null, then this is a single ended interval. */
	CountExtent: CountExtentType;
	/** A space-separated list of integers or nulls. */
	CountList: integerOrNullList;
	/** Value of covariance matrix element. */
	covariance: number;
	covarianceMatrix: CovarianceMatrixType;
	coverageFunction: CoverageFunctionType;
	crsRef: CRSRefType;
	/** An identification of a coordinate system. */
	csID: IdentifierType;
	/** The name by which this coordinate system is identified. */
	csName: CodeType;
	CubicSpline: CubicSplineType;
	Curve: CurveType;
	curveArrayProperty: CurveArrayPropertyType;
	/** This property element either references a curve via the XLink-attributes or contains the curve element. A curve element is any element which is substitutable for "_Curve". */
	curveMember: CurvePropertyType;
	/** This property element contains a list of curves. The order of the elements is significant and shall be preserved when processing the array. */
	curveMembers: CurveArrayPropertyType;
	/** This property element either references a curve via the XLink-attributes or contains the curve element. curveProperty is the
	  * predefined property which can be used by GML Application Schemas whenever a GML Feature has a property with a value that is
	  * substitutable for _Curve. */
	curveProperty: CurvePropertyType;
	Cylinder: CylinderType;
	CylindricalCS: CylindricalCSType;
	cylindricalCSRef: CylindricalCSRefType;
	DataBlock: DataBlockType;
	dataSource: StringOrRefType;
	/** An identification of a datum. */
	datumID: IdentifierType;
	/** The name by which this datum is identified. */
	datumName: CodeType;
	datumRef: DatumRefType;
	decimalMinutes: number;
	/** Top-level property. Used in application schemas to "attach" the styling information to GML data. The link between the data and the style should be established through this property only. */
	defaultStyle: DefaultStylePropertyType;
	/** Association to the coordinate conversion used to define this derived CRS. */
	definedByConversion: GeneralConversionRefType;
	DefinitionCollection: DictionaryType;
	definitionMember: DictionaryEntryType;
	DefinitionProxy: DefinitionProxyType;
	definitionRef: ReferenceType;
	degrees: DegreesType;
	derivationUnitTerm: DerivationUnitTermType;
	DerivedCRS: DerivedCRSType;
	derivedCRSRef: DerivedCRSRefType;
	derivedCRSType: DerivedCRSTypeType;
	DerivedUnit: DerivedUnitType;
	/** Contains a simple text description of the object, or refers to an external description. */
	description: StringOrRefType;
	Dictionary: DictionaryType;
	directedEdge: DirectedEdgePropertyType;
	directedFace: DirectedFacePropertyType;
	directedNode: DirectedNodePropertyType;
	DirectedObservationAtDistance: DirectedObservationAtDistanceType;
	directedTopoSolid: DirectedTopoSolidPropertyType;
	direction: DirectionPropertyType;
	DirectionVector: DirectionVectorType;
	dmsAngle: DMSAngleType;
	/** Value of an angle operation parameter, in either degree-minute-second format or single value format. */
	dmsAngleValue: DMSAngleType;
	doubleOrNullTupleList: doubleOrNullList;
	/** This element is an instance of the primitive xsd:duration simple type to
	  * enable use of the ISO 8601 syntax for temporal length (e.g. P5DT4H30M).
	  * It is a valid subtype of TimeDurationType according to section 3.14.6,
	  * rule 2.2.4 in XML Schema, Part 1. */
	duration: string;
	Edge: EdgeType;
	edgeOf: CurvePropertyType;
	Ellipsoid: EllipsoidType;
	EllipsoidalCS: EllipsoidalCSType;
	ellipsoidalCSRef: EllipsoidalCSRefType;
	/** An identification of an ellipsoid. */
	ellipsoidID: IdentifierType;
	/** The name by which this ellipsoid is identified. */
	ellipsoidName: CodeType;
	ellipsoidRef: EllipsoidRefType;
	EngineeringCRS: EngineeringCRSType;
	engineeringCRSRef: EngineeringCRSRefType;
	EngineeringDatum: EngineeringDatumType;
	engineeringDatumRef: EngineeringDatumRefType;
	EnvelopeWithTimePeriod: EnvelopeWithTimePeriodType;
	extentOf: SurfacePropertyType;
	Face: FaceType;
	FeatureCollection: FeatureCollectionType;
	featureMember: FeaturePropertyType;
	featureMembers: FeatureArrayPropertyType;
	featureProperty: FeaturePropertyType;
	featureStyle: FeatureStylePropertyType[];
	File: FileType;
	generalConversionRef: GeneralConversionRefType;
	generalTransformationRef: GeneralTransformationRefType;
	/** Concrete element in the _MetaData substitution group, which permits any well-formed XML content.  Intended to act as a container for metadata defined in external schemas, for which it is not possible to add the concrete components to the GML _MetaData substitution group directly. Deprecated with GML version 3.1.0. */
	GenericMetaData: GenericMetaDataType;
	GeocentricCRS: GeocentricCRSType;
	geocentricCRSRef: GeocentricCRSRefType;
	Geodesic: GeodesicType;
	GeodeticDatum: GeodeticDatumType;
	geodeticDatumRef: GeodeticDatumRefType;
	GeographicCRS: GeographicCRSType;
	geographicCRSRef: GeographicCRSRefType;
	GeometricComplex: GeometricComplexType;
	/** This property element either references a geometry element via the XLink-attributes or contains the geometry element. */
	geometryMember: GeometryPropertyType;
	/** This property element contains a list of geometry elements. The order of the elements is significant and shall be preserved when processing the array. */
	geometryMembers: GeometryArrayPropertyType;
	geometryStyle: GeometryStylePropertyType[];
	graphStyle: GraphStylePropertyType[];
	/** Longitude of the prime meridian measured from the Greenwich meridian, positive eastward. The greenwichLongitude most common value is zero, and that value shall be used when the meridianName value is Greenwich. */
	greenwichLongitude: AngleChoiceType;
	Grid: GridType;
	GridCoverage: GridCoverageType;
	gridDomain: GridDomainType;
	/** An identification of an operation parameter group. */
	groupID: IdentifierType;
	/** The name by which this operation parameter group is identified. */
	groupName: CodeType;
	ImageCRS: ImageCRSType;
	imageCRSRef: ImageCRSRefType;
	ImageDatum: ImageDatumType;
	imageDatumRef: ImageDatumRefType;
	/** An association to a component coordinate reference system included in this compound coordinate reference system. */
	includesCRS: CoordinateReferenceSystemRefType;
	includesElement: CovarianceElementType;
	/** Association to an operation parameter that is a member of a group. */
	includesParameter: AbstractGeneralOperationParameterRefType;
	/** A composition association to a parameter value or group of values included in this group. */
	includesValue: AbstractGeneralParameterValueType;
	IndexMap: IndexMapType;
	indirectEntry: IndirectEntryType;
	/** Deprecated with GML 3.0, included only for backwards compatibility with GML 2. Use "interior" instead. */
	innerBoundaryIs: AbstractRingPropertyType;
	/** Positive integer value of an operation parameter, usually used for a count. An integer value does not have an associated unit of measure. */
	integerValue: number;
	/** Ordered sequence of two or more integer values of an operation parameter list, usually used for counts. These integer values do not have an associated unit of measure. An element of this type contains a space-separated sequence of integer values. */
	integerValueList: integerList;
	/** Inverse flattening value of the ellipsoid. Value is a scale factor (or ratio) that has no physical unit. Uses the MeasureType with the restriction that the unit of measure referenced by uom must be suitable for a scale factor, such as percent, permil, or parts-per-million. */
	inverseFlattening: MeasureType;
	isolated: IsolatedPropertyType;
	/** The ellipsoid is degenerate and is actually a sphere. The sphere is completely defined by the semi-major axis, which is the radius of the sphere. */
	isSphere: IsSphereType;
	labelStyle: LabelStylePropertyType[];
	LinearCS: LinearCSType;
	linearCSRef: LinearCSRefType;
	LinearRing: LinearRingType;
	LineString: LineStringType;
	/** Deprecated with GML 3.0 and included only for backwards compatibility with GML 2.0. Use "curveMember" instead.
	  * This property element either references a line string via the XLink-attributes or contains the line string element. */
	lineStringMember: LineStringPropertyType;
	/** Deprecated with GML 3.0 and included only for backwards compatibility with GML 2.0. Use "curveProperty" instead. This
	  * property element either references a line string via the XLink-attributes or contains the line string element. */
	lineStringProperty: LineStringPropertyType;
	LineStringSegment: LineStringSegmentType;
	LocationKeyWord: CodeType;
	LocationString: StringOrRefType;
	/** Description of a rule for associating members from the domainSet with members of the rangeSet. */
	MappingRule: StringOrRefType;
	/** Need schamatron test here that isMaximal attribute value is true */
	maximalComplex: TopoComplexMemberType;
	/** The maximum number of times that values for this parameter group can be included. If this attribute is omitted, the maximum number is one. */
	maximumOccurs: number;
	measure: MeasureType;
	/** A description of the position accuracy parameter(s) provided. */
	measureDescription: CodeType;
	member: AssociationType;
	members: ArrayAssociationType;
	/** An identification of a prime meridian. */
	meridianID: IdentifierType;
	/** The name by which this prime meridian is identified. The meridianName most common value is Greenwich, and that value shall be used when the greenwichLongitude value is zero. */
	meridianName: CodeType;
	/** Contains or refers to a metadata package that contains metadata properties. */
	metaDataProperty: MetaDataPropertyType;
	/** Formula(s) used by this operation method. The value may be a reference to a publication. Note that the operation method may not be analytic, in which case this element references or contains the procedure, not an analytic formula. */
	methodFormula: CodeType;
	/** An identification of an operation method. */
	methodID: IdentifierType;
	/** The name by which this operation method is identified. */
	methodName: CodeType;
	/** The minimum number of times that values for this parameter group or parameter are required. If this attribute is omitted, the minimum number is one. */
	minimumOccurs: number;
	minutes: number;
	/** A positive integer defining a position in a coordinate tuple. */
	modifiedCoordinate: number;
	MovingObjectStatus: MovingObjectStatusType;
	multiCenterLineOf: MultiCurvePropertyType;
	multiCenterOf: MultiPointPropertyType;
	multiCoverage: MultiSurfacePropertyType;
	MultiCurve: MultiCurveType;
	MultiCurveCoverage: MultiCurveCoverageType;
	multiCurveDomain: MultiCurveDomainType;
	/** This property element either references a curve aggregate via the XLink-attributes or contains the "multi curve" element. multiCurveProperty is the predefined property which can be used by GML Application Schemas whenever a GML Feature has a property with a value that is substitutable for MultiCurve. */
	multiCurveProperty: MultiCurvePropertyType;
	multiEdgeOf: MultiCurvePropertyType;
	multiExtentOf: MultiSurfacePropertyType;
	MultiGeometry: MultiGeometryType;
	/** This property element either references a geometric aggregate via the XLink-attributes or contains the "multi geometry" element. multiGeometryProperty is the predefined property which can be used by GML Application Schemas whenever a GML Feature has a property with a value that is substitutable for _GeometricAggregate. */
	multiGeometryProperty: MultiGeometryPropertyType;
	/** Deprecated with GML 3.0 and included for backwards compatibility with GML 2. Use the "MultiCurve" element instead. */
	MultiLineString: MultiLineStringType;
	/** Deprecated with GML 3.0 and included only for backwards compatibility with GML 2.0. Use "curveMember" instead.
	  * This property element either references a line string via the XLink-attributes or contains the line string element. */
	multiLocation: MultiPointPropertyType;
	MultiPoint: MultiPointType;
	MultiPointCoverage: MultiPointCoverageType;
	multiPointDomain: MultiPointDomainType;
	/** This property element either references a point aggregate via the XLink-attributes or contains the "multi point" element. multiPointProperty is the predefined property which can be used by GML Application Schemas whenever a GML Feature has a property with a value that is substitutable for MultiPoint. */
	multiPointProperty: MultiPointPropertyType;
	/** Deprecated with GML 3.0 and included for backwards compatibility with GML 2. Use the "MultiSurface" element instead. */
	MultiPolygon: MultiPolygonType;
	multiPosition: MultiPointPropertyType;
	MultiSolid: MultiSolidType;
	MultiSolidCoverage: MultiSolidCoverageType;
	multiSolidDomain: MultiSolidDomainType;
	/** This property element either references a solid aggregate via the XLink-attributes or contains the "multi solid" element. multiSolidProperty is the predefined property which can be used by GML Application Schemas whenever a GML Feature has a property with a value that is substitutable for MultiSolid. */
	multiSolidProperty: MultiSolidPropertyType;
	MultiSurface: MultiSurfaceType;
	MultiSurfaceCoverage: MultiSurfaceCoverageType;
	multiSurfaceDomain: MultiSurfaceDomainType;
	/** This property element either references a surface aggregate via the XLink-attributes or contains the "multi surface" element. multiSurfaceProperty is the predefined property which can be used by GML Application Schemas whenever a GML Feature has a property with a value that is substitutable for MultiSurface. */
	multiSurfaceProperty: MultiSurfacePropertyType;
	Node: NodeType;
	Null: string;
	ObliqueCartesianCS: ObliqueCartesianCSType;
	obliqueCartesianCSRef: ObliqueCartesianCSRefType;
	OffsetCurve: OffsetCurveType;
	OperationMethod: OperationMethodType;
	operationMethodRef: OperationMethodRefType;
	OperationParameter: OperationParameterType;
	OperationParameterGroup: OperationParameterGroupType;
	operationParameterGroupRef: OperationParameterRefType;
	operationParameterRef: OperationParameterRefType;
	operationRef: OperationRefType;
	/** Version of the coordinate transformation (i.e., instantiation due to the stochastic nature of the parameters). Mandatory when describing a transformation, and should not be supplied for a conversion. */
	operationVersion: string;
	OrientableCurve: OrientableCurveType;
	OrientableSurface: OrientableSurfaceType;
	/** The date and time origin of this temporal datum. */
	origin: Date;
	/** Deprecated with GML 3.0, included only for backwards compatibility with GML 2. Use "exterior" instead. */
	outerBoundaryIs: AbstractRingPropertyType;
	/** An identification of an operation parameter. */
	parameterID: IdentifierType;
	/** The name by which this operation parameter is identified. */
	parameterName: CodeType;
	parameterValue: ParameterValueType;
	parameterValueGroup: ParameterValueGroupType;
	PassThroughOperation: PassThroughOperationType;
	passThroughOperationRef: PassThroughOperationRefType;
	pixelInCell: PixelInCellType;
	Point: PointType;
	pointArrayProperty: PointArrayPropertyType;
	/** This property element either references a Point via the XLink-attributes or contains the Point element. */
	pointMember: PointPropertyType;
	/** This property element contains a list of points. The order of the elements is significant and shall be preserved when processing the array. */
	pointMembers: PointArrayPropertyType;
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty
	  * is the predefined property which can be used by GML Application Schemas whenever a GML Feature has a property with a value that
	  * is substitutable for Point. */
	pointProperty: PointPropertyType;
	/** Deprecated with GML version 3.1.0. Use "pointProperty" instead. Included for backwards compatibility with GML 3.0.0. */
	pointRep: PointPropertyType;
	PolarCS: PolarCSType;
	polarCSRef: PolarCSRefType;
	Polygon: PolygonType;
	/** Deprecated with GML 3.0 and included only for backwards compatibility with GML 2.0. Use "surfaceMember" instead.
	  * This property element either references a polygon via the XLink-attributes or contains the polygon element. */
	polygonMember: PolygonPropertyType;
	PolygonPatch: PolygonPatchType;
	/** This property element contains a list of
	  * polygon patches. The order of the patches is significant and
	  * shall be preserved when processing the list. */
	polygonPatches: PolygonPatchArrayPropertyType;
	/** Deprecated with GML 3.0 and included only for backwards compatibility with GML 2.0. Use "surfaceProperty" instead.
	  * This property element either references a polygon via the XLink-attributes or contains the polygon element. */
	polygonProperty: PolygonPropertyType;
	PolyhedralSurface: PolyhedralSurfaceType;
	pos: DirectPositionType;
	position: PointPropertyType;
	posList: DirectPositionListType;
	PrimeMeridian: PrimeMeridianType;
	primeMeridianRef: PrimeMeridianRefType;
	/** Deprecated in GML 3.1.0 */
	priorityLocation: PriorityLocationPropertyType;
	ProjectedCRS: ProjectedCRSType;
	projectedCRSRef: ProjectedCRSRefType;
	/** A numeric value with a scale.  The content of the element is an amount using the XML Schema type double which permits decimal or scientific notation.  An XML attribute uom (unit of measure) is required, whose value is a URI which identifies the definition of the scale or units by which the numeric value must be multiplied. */
	Quantity: MeasureType;
	/** Utility element to store a 2-point range of numeric values. If one member is a null, then this is a single ended interval. */
	QuantityExtent: QuantityExtentType;
	/** A space separated list of amounts or nulls.  The amounts use the XML Schema type double.  A single XML attribute uom (unit of measure) is required, whose value is a URI which identifies the definition of the scale or units by which all the amounts in the list must be multiplied. */
	QuantityList: MeasureOrNullListType;
	/** Informal description of the phenomenon or type of quantity that is measured or observed. For example, "length", "angle", "time", "pressure", or "temperature". When the quantity is the result of an observation or measurement, this term is known as Observable Type or Measurand. */
	quantityType: StringOrRefType;
	rangeParameters: RangeParametersType;
	rangeSet: RangeSetType;
	/** The time after which this datum definition is valid. This time may be precise (e.g. 1997.0 for IRTF97) or merely a year (e.g. 1983 for NAD83). In the latter case, the epoch usually refers to the year in which a major recalculation of the geodetic control network, underlying the datum, was executed or initiated. An old datum can remain valid after a new datum is defined. Alternatively, a datum may be superseded by a later datum, in which case the realization epoch for the new datum defines the upper limit for the validity of the superseded datum. */
	realizationEpoch: Date;
	Rectangle: RectangleType;
	/** Should be substitutionGroup="gml:Grid" but changed in order to accomplish Xerces-J schema validation */
	RectifiedGrid: RectifiedGridType;
	RectifiedGridCoverage: RectifiedGridCoverageType;
	rectifiedGridDomain: RectifiedGridDomainType;
	referenceSystemRef: ReferenceSystemRefType;
	relativeInternalPositionalAccuracy: RelativeInternalPositionalAccuracyType;
	/** Information about this object or code. Contains text or refers to external text. */
	remarks: StringOrRefType;
	/** A quantitative result defined by the evaluation procedure used, and identified by the measureDescription. */
	result: MeasureType;
	/** The result of the observation: an image, external object, etc */
	resultOf: AssociationType;
	Ring: RingType;
	/** This element is included when the correct definition of this unit is unknown, but this unit has a rough or inaccurate conversion to the preferred unit for this quantity type. */
	roughConversionToPreferredUnit: ConversionToPreferredUnitType;
	/** Row number of this covariance element value. */
	rowIndex: number;
	/** Description of domain of usage, or limitations of usage, for which this CRS object is valid. */
	scope: string;
	secondDefiningParameter: SecondDefiningParameterType;
	seconds: number;
	/** This property element contains a list of curve segments. The order of the elements is significant and shall be preserved when processing the array. */
	segments: CurveSegmentArrayPropertyType;
	/** Length of the semi-major axis of the ellipsoid, with its units. Uses the MeasureType with the restriction that the unit of measure referenced by uom must be suitable for a length, such as metres or feet. */
	semiMajorAxis: MeasureType;
	/** Length of the semi-minor axis of the ellipsoid. Uses the MeasureType with the restriction that the unit of measure referenced by uom must be suitable for a length, such as metres or feet. */
	semiMinorAxis: MeasureType;
	singleOperationRef: SingleOperationRefType;
	Solid: SolidType;
	solidArrayProperty: SolidArrayPropertyType;
	/** This property element either references a solid via the XLink-attributes or contains the solid element. A solid element is any element which is substitutable for "_Solid". */
	solidMember: SolidPropertyType;
	/** This property element contains a list of solids. The order of the elements is significant and shall be preserved when processing the array. */
	solidMembers: SolidArrayPropertyType;
	/** This property element either references a solid via the XLink-attributes or contains the solid element. solidProperty is the predefined property which can be used by GML Application Schemas whenever a GML Feature has a property with a value that is substitutable for _Solid. */
	solidProperty: SolidPropertyType;
	/** Association to the source CRS (coordinate reference system) of this coordinate operation. */
	sourceCRS: CRSRefType;
	/** Number of dimensions in the source CRS of this operation method. */
	sourceDimensions: number;
	Sphere: SphereType;
	SphericalCS: SphericalCSType;
	sphericalCSRef: SphericalCSRefType;
	/** An identification of a reference system. */
	srsID: IdentifierType;
	/** The name by which this reference system is identified. */
	srsName: CodeType;
	status: StringOrRefType;
	/** String value of an operation parameter. A string value does not have an associated unit of measure. */
	stringValue: string;
	/** Predefined concrete value of the top-level property. Encapsulates all other styling information. */
	Style: StyleType;
	subComplex: TopoComplexMemberType;
	/** Synonym for target - common word used for photographs */
	subject: TargetPropertyType;
	superComplex: TopoComplexMemberType;
	surfaceArrayProperty: SurfaceArrayPropertyType;
	/** This property element either references a surface via the XLink-attributes or contains the surface element. A surface element is any element which is substitutable for "_Surface". */
	surfaceMember: SurfacePropertyType;
	/** This property element contains a list of surfaces. The order of the elements is significant and shall be preserved when processing the array. */
	surfaceMembers: SurfaceArrayPropertyType;
	/** This property element either references a surface via the XLink-attributes or contains the surface element. surfaceProperty is the predefined property which can be used by GML Application Schemas whenever a GML Feature has a property with a value that is substitutable for _Surface. */
	surfaceProperty: SurfacePropertyType;
	/** The symbol property. Extends the gml:AssociationType to allow for remote referencing of symbols. */
	symbol: SymbolType;
	/** Association to the target CRS (coordinate reference system) of this coordinate operation. For constraints on multiplicity of "sourceCRS" and "targetCRS", see UML model of Coordinate Operation package in OGC Abstract Specification topic 2. */
	targetCRS: CRSRefType;
	/** Number of dimensions in the target CRS of this operation method. */
	targetDimensions: number;
	TemporalCRS: TemporalCRSType;
	temporalCRSRef: TemporalCRSRefType;
	TemporalCS: TemporalCSType;
	temporalCSRef: TemporalCSRefType;
	TemporalDatum: TemporalDatumType;
	temporalDatumRef: TemporalDatumRefType;
	/** A time period defining the temporal domain of this object. */
	temporalExtent: TimePeriodType;
	TimeCalendar: TimeCalendarType;
	TimeCalendarEra: TimeCalendarEraType;
	TimeClock: TimeClockType;
	TimeCoordinateSystem: TimeCoordinateSystemType;
	/** TimeEdge is one dimensional temporal topology primitive,
	  * expresses a state in topological time. It has an orientation from its start toward the end,
	  * and its boundaries shall associate with two different time nodes. */
	TimeEdge: TimeEdgeType;
	TimeInstant: TimeInstantType;
	/** This element is a valid subtype of TimeDurationType
	  * according to section 3.14.6, rule 2.2.4 in XML Schema, Part 1. */
	timeInterval: TimeIntervalLengthType;
	/** "TimeNode" is a zero dimensional temporal topology primitive,
	  * expresses a position in topological time, and is a start and an end of time edge, which represents states of time.
	  * Time node may be isolated. However, it cannot describe the ordering relationships with other primitives.
	  * An isolated node may not be an element of any temporal topology complex. */
	TimeNode: TimeNodeType;
	TimeOrdinalEra: TimeOrdinalEraType;
	TimeOrdinalReferenceSystem: TimeOrdinalReferenceSystemType;
	TimePeriod: TimePeriodType;
	/** Direct representation of a temporal position */
	timePosition: TimePositionType;
	/** This element represents temporal topology complex. It shall be the connected acyclic directed graph composed of time nodes and time edges. */
	TimeTopologyComplex: TimeTopologyComplexType;
	Tin: TinType;
	TopoComplex: TopoComplexType;
	topoComplexProperty: TopoComplexMemberType;
	TopoCurve: TopoCurveType;
	topoCurveProperty: TopoCurvePropertyType;
	topologyStyle: TopologyStylePropertyType[];
	TopoPoint: TopoPointType;
	topoPointProperty: TopoPointPropertyType;
	topoPrimitiveMember: TopoPrimitiveMemberType;
	topoPrimitiveMembers: TopoPrimitiveArrayAssociationType;
	TopoSolid: TopoSolidType;
	TopoSurface: TopoSurfaceType;
	topoSurfaceProperty: TopoSurfacePropertyType;
	TopoVolume: TopoVolumeType;
	topoVolumeProperty: TopoVolumePropertyType;
	track: TrackType;
	Transformation: TransformationType;
	transformationRef: TransformationRefType;
	Triangle: TriangleType;
	/** This property element contains a list of
	  * triangle patches. The order of the patches is significant and
	  * shall be preserved when processing the list. */
	trianglePatches: TrianglePatchArrayPropertyType;
	tupleList: CoordinatesType;
	unitOfMeasure: UnitOfMeasureType;
	UserDefinedCS: UserDefinedCSType;
	userDefinedCSRef: UserDefinedCSRefType;
	/** Association to a coordinate system axis. */
	usesAxis: CoordinateSystemAxisRefType;
	/** Association to the Cartesian coordinate system used by this CRS. */
	usesCartesianCS: CartesianCSRefType;
	/** Association to the coordinate system used by this CRS. */
	usesCS: CoordinateSystemRefType;
	/** Association to the ellipsoid used by this geodetic datum. */
	usesEllipsoid: EllipsoidRefType;
	/** Association to the ellipsoidal coordinate system used by this CRS. */
	usesEllipsoidalCS: EllipsoidalCSRefType;
	/** Association to the engineering datum used by this CRS. */
	usesEngineeringDatum: EngineeringDatumRefType;
	/** Association to the geodetic datum used by this CRS. */
	usesGeodeticDatum: GeodeticDatumRefType;
	/** Association to the image datum used by this CRS. */
	usesImageDatum: ImageDatumRefType;
	/** Association to the operation method used by this coordinate operation. */
	usesMethod: OperationMethodRefType;
	/** Association to the oblique Cartesian coordinate system used by this CRS. */
	usesObliqueCartesianCS: ObliqueCartesianCSRefType;
	/** Association to the operation applied to the specified ordinates. */
	usesOperation: OperationRefType;
	/** Association to an operation parameter or parameter group used by this operation method. */
	usesParameter: AbstractGeneralOperationParameterRefType;
	/** Association to the prime meridian used by this geodetic datum. */
	usesPrimeMeridian: PrimeMeridianRefType;
	/** Association to a single operation. */
	usesSingleOperation: SingleOperationRefType;
	/** Association to the spherical coordinate system used by this CRS. */
	usesSphericalCS: SphericalCSRefType;
	/** Association to the temporal coordinate system used by this CRS. */
	usesTemporalCS: TemporalCSRefType;
	/** Association to the temporal datum used by this CRS. */
	usesTemporalDatum: TemporalDatumRefType;
	/** Composition association to a parameter value used by this coordinate operation. */
	usesValue: ParameterValueType;
	/** Association to the vertical coordinate system used by this CRS. */
	usesVerticalCS: VerticalCSRefType;
	/** Association to the vertical datum used by this CRS. */
	usesVerticalDatum: VerticalDatumRefType;
	/** This element contains or points to a description of a sensor, instrument or procedure used for the observation */
	using: FeaturePropertyType;
	/** Area or region in which this CRS object is valid. */
	validArea: ExtentType;
	validTime: TimePrimitivePropertyType;
	/** Numeric value of an operation parameter, with its associated unit of measure. */
	value: MeasureType;
	/** A Value Array is used for homogeneous arrays of primitive and aggregate values.   _ScalarValueList is preferred for arrays of Scalar Values since this is more efficient.  Since "choice" is not available for attribute groups, an external constraint (e.g. Schematron) would be required to enforce the selection of only one of these through schema validation */
	ValueArray: ValueArrayType;
	/** Element which refers to, or contains, a Value.  This version is used in CompositeValues. */
	valueComponent: ValuePropertyType;
	/** Element which refers to, or contains, a set of homogeneously typed Values. */
	valueComponents: ValueArrayPropertyType;
	/** Reference to a file or a part of a file containing one or more parameter values, each numeric value with its associated unit of measure. When referencing a part of a file, that file must contain multiple identified parts, such as an XML encoded document. Furthermore, the referenced file or part of a file can reference another part of the same or different files, as allowed in XML documents. */
	valueFile: string;
	/** Ordered sequence of two or more numeric values of an operation parameter list, where each value has the same associated unit of measure. An element of this type contains a space-separated sequence of double values. */
	valueList: MeasureListType;
	/** Association to the operation parameter that this is a value of. */
	valueOfParameter: OperationParameterRefType;
	/** Element which refers to, or contains, a Value */
	valueProperty: ValuePropertyType;
	/** Association to the operation parameter group for which this element provides parameter values. */
	valuesOfGroup: OperationParameterGroupRefType;
	vector: VectorType;
	/** Identifier of the version of the associated codeSpace or code, as specified by the codeSpace or code authority. This version is included only when the "code" or "codeSpace" uses versions. When appropriate, the version is identified by the effective date, coded using ISO 8601 date format. */
	version: string;
	VerticalCRS: VerticalCRSType;
	verticalCRSRef: VerticalCRSRefType;
	VerticalCS: VerticalCSType;
	verticalCSRef: VerticalCSRefType;
	VerticalDatum: VerticalDatumType;
	verticalDatumRef: VerticalDatumRefType;
	verticalDatumType: VerticalDatumTypeType;
	/** An interval defining the vertical spatial domain of this object. */
	verticalExtent: EnvelopeType;
}
export var document: document;
