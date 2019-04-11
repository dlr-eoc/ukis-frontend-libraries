import * as Primitive from '../../xml-primitives';
import * as gmd from '../../www.isotc211.org/2005/gmd';
import * as xlink from '../../www.w3.org/1999/xlink';

// Source files:
// http://schemas.opengis.net/gml/3.2.1/basicTypes.xsd
// http://schemas.opengis.net/gml/3.2.1/coordinateOperations.xsd
// http://schemas.opengis.net/gml/3.2.1/coordinateReferenceSystems.xsd
// http://schemas.opengis.net/gml/3.2.1/coordinateSystems.xsd
// http://schemas.opengis.net/gml/3.2.1/coverage.xsd
// http://schemas.opengis.net/gml/3.2.1/datums.xsd
// http://schemas.opengis.net/gml/3.2.1/deprecatedTypes.xsd
// http://schemas.opengis.net/gml/3.2.1/dictionary.xsd
// http://schemas.opengis.net/gml/3.2.1/direction.xsd
// http://schemas.opengis.net/gml/3.2.1/dynamicFeature.xsd
// http://schemas.opengis.net/gml/3.2.1/feature.xsd
// http://schemas.opengis.net/gml/3.2.1/geometryAggregates.xsd
// http://schemas.opengis.net/gml/3.2.1/geometryBasic0d1d.xsd
// http://schemas.opengis.net/gml/3.2.1/geometryBasic2d.xsd
// http://schemas.opengis.net/gml/3.2.1/geometryComplexes.xsd
// http://schemas.opengis.net/gml/3.2.1/geometryPrimitives.xsd
// http://schemas.opengis.net/gml/3.2.1/gml.xsd
// http://schemas.opengis.net/gml/3.2.1/gmlBase.xsd
// http://schemas.opengis.net/gml/3.2.1/grids.xsd
// http://schemas.opengis.net/gml/3.2.1/measures.xsd
// http://schemas.opengis.net/gml/3.2.1/observation.xsd
// http://schemas.opengis.net/gml/3.2.1/referenceSystems.xsd
// http://schemas.opengis.net/gml/3.2.1/temporal.xsd
// http://schemas.opengis.net/gml/3.2.1/temporalReferenceSystems.xsd
// http://schemas.opengis.net/gml/3.2.1/temporalTopology.xsd
// http://schemas.opengis.net/gml/3.2.1/topology.xsd
// http://schemas.opengis.net/gml/3.2.1/units.xsd
// http://schemas.opengis.net/gml/3.2.1/valueObjects.xsd


interface BaseType {
	_exists: boolean;
	_namespace: string;
}
interface _AbstractAssociationRoleProxyType extends BaseType {}
interface AbstractAssociationRoleProxyType extends _AbstractAssociationRoleProxyType { constructor: { new(): AbstractAssociationRoleProxyType }; }

interface _AbstractContinuousCoverageProxyType extends BaseType {}
interface AbstractContinuousCoverageProxyType extends _AbstractContinuousCoverageProxyType { constructor: { new(): AbstractContinuousCoverageProxyType }; }

interface _AbstractContinuousCoverageType extends _AbstractCoverageType {
	/** The gml:coverageFunction property describes the mapping function from the domain to the range of the coverage.
	  * The value of the CoverageFunction is one of gml:CoverageMappingRule and gml:GridFunction.
	  * If the gml:coverageFunction property is omitted for a gridded coverage (including rectified gridded coverages) the gml:startPoint is assumed to be the value of the gml:low property in the gml:Grid geometry, and the gml:sequenceRule is assumed to be linear and the gml:axisOrder property is assumed to be "+1 +2". */
	coverageFunction?: CoverageFunctionType;
}
export interface AbstractContinuousCoverageType extends _AbstractContinuousCoverageType { constructor: { new(): AbstractContinuousCoverageType }; }
export var AbstractContinuousCoverageType: { new(): AbstractContinuousCoverageType };

interface _AbstractCoordinateOperationProxyType extends _AbstractSingleOperationProxyType {
	ConcatenatedOperation?: ConcatenatedOperationType;
}
interface AbstractCoordinateOperationProxyType extends _AbstractCoordinateOperationProxyType { constructor: { new(): AbstractCoordinateOperationProxyType }; }

interface _AbstractCoordinateOperationType extends _IdentifiedObjectType {
	/** gml:coordinateOperationAccuracy is an association role to a DQ_PositionalAccuracy object as encoded in ISO/TS 19139, either referencing or containing the definition of that positional accuracy. That object contains an estimate of the impact of this coordinate operation on point accuracy. That is, it gives position error estimates for the target coordinates of this coordinate operation, assuming no errors in the source coordinates. */
	coordinateOperationAccuracy?: CoordinateOperationAccuracyType[];
	/** The gml:domainOfValidity property implements an association role to an EX_Extent object as encoded in ISO/TS 19139, either referencing or containing the definition of that extent. */
	domainOfValidity?: DomainOfValidityType;
	/** gml:operationVersion is the version of the coordinate transformation (i.e., instantiation due to the stochastic nature of the parameters). Mandatory when describing a transformation, and should not be supplied for a conversion. */
	operationVersion?: string;
	/** The gml:scope property provides a description of the usage, or limitations of usage, for which this CRS-related object is valid. If unknown, enter "not known". */
	scope: string[];
	/** gml:sourceCRS is an association role to the source CRS (coordinate reference system) of this coordinate operation. */
	sourceCRS?: CRSPropertyType;
	/** gml:targetCRS is an association role to the target CRS (coordinate reference system) of this coordinate operation. */
	targetCRS?: CRSPropertyType;
}
export interface AbstractCoordinateOperationType extends _AbstractCoordinateOperationType { constructor: { new(): AbstractCoordinateOperationType }; }
export var AbstractCoordinateOperationType: { new(): AbstractCoordinateOperationType };

interface _AbstractCoordinateSystemProxyType extends _CartesianCSProxyType, _EllipsoidalCSProxyType, _SphericalCSProxyType, _VerticalCSProxyType, _AffineCSProxyType, _TimeCSProxyType {
	/** gml:CylindricalCS is a three-dimensional coordinate system consisting of a polar coordinate system extended by a straight coordinate axis perpendicular to the plane spanned by the polar coordinate system. A CylindricalCS shall have three gml:axis property elements. */
	CylindricalCS?: CylindricalCSType;
	/** gml:LinearCS is a one-dimensional coordinate system that consists of the points that lie on the single axis described. The associated coordinate is the distance – with or without offset – from the specified datum to the point along the axis. A LinearCS shall have one gml:axis property element. */
	LinearCS?: LinearCSType;
	/** gml:PolarCS ia s two-dimensional coordinate system in which position is specified by the distance from the origin and the angle between the line from the origin to a point and a reference direction. A PolarCS shall have two gml:axis property elements. */
	PolarCS?: PolarCSType;
	/** gml:UserDefinedCS is a two- or three-dimensional coordinate system that consists of any combination of coordinate axes not covered by any other coordinate system type. A UserDefinedCS shall have two or three gml:axis property elements; the number of property elements shall equal the dimension of the CS. */
	UserDefinedCS?: UserDefinedCSType;
	TemporalCS?: TemporalCSType;
	ObliqueCartesianCS?: ObliqueCartesianCSType;
}
interface AbstractCoordinateSystemProxyType extends _AbstractCoordinateSystemProxyType { constructor: { new(): AbstractCoordinateSystemProxyType }; }

interface _AbstractCoordinateSystemType extends _IdentifiedObjectType {
	aggregationType: AggregationType;
	/** The gml:axis property is an association role (ordered sequence) to the coordinate system axes included in this coordinate system. The coordinate values in a coordinate tuple shall be recorded in the order in which the coordinate system axes associations are recorded, whenever those coordinates use a coordinate reference system that uses this coordinate system. The gml:AggregationAttributeGroup should be used to specify that the axis objects are ordered. */
	axis: AxisProxyType[];
}
export interface AbstractCoordinateSystemType extends _AbstractCoordinateSystemType { constructor: { new(): AbstractCoordinateSystemType }; }
export var AbstractCoordinateSystemType: { new(): AbstractCoordinateSystemType };

interface _AbstractCoverageProxyType extends _AbstractDiscreteCoverageProxyType {}
interface AbstractCoverageProxyType extends _AbstractCoverageProxyType { constructor: { new(): AbstractCoverageProxyType }; }

/** The base type for coverages is gml:AbstractCoverageType. The basic elements of a coverage can be seen in this content model: the coverage contains gml:domainSet and gml:rangeSet properties. The gml:domainSet property describes the domain of the coverage and the gml:rangeSet property describes the range of the coverage. */
interface _AbstractCoverageType extends _AbstractFeatureType, _DomainSetProxyType {
	/** The gml:rangeSet property element contains the values of the coverage (sometimes called the attribute values).  Its content model is given by gml:RangeSetType.
	  * This content model supports a structural description of the range.  The semantic information describing the range set is embedded using a uniform method, as part of the explicit values, or as a template value accompanying the representation using gml:DataBlock and gml:File.
	  * The values from each component (or "band") in the range may be encoded within a gml:ValueArray element or a concrete member of the gml:AbstractScalarValueList substitution group . Use of these elements satisfies the value-type homogeneity requirement. */
	rangeSet: RangeSetType;
}
export interface AbstractCoverageType extends _AbstractCoverageType { constructor: { new(): AbstractCoverageType }; }
export var AbstractCoverageType: { new(): AbstractCoverageType };

interface _AbstractCRSProxyType extends _AbstractSingleCRSProxyType {
	/** gml:CompundCRS is a coordinate reference system describing the position of points through two or more independent coordinate reference systems. It is associated with a non-repeating sequence of two or more instances of SingleCRS. */
	CompoundCRS?: CompoundCRSType;
}
interface AbstractCRSProxyType extends _AbstractCRSProxyType { constructor: { new(): AbstractCRSProxyType }; }

interface _AbstractCRSType extends _IdentifiedObjectType {
	/** The gml:domainOfValidity property implements an association role to an EX_Extent object as encoded in ISO/TS 19139, either referencing or containing the definition of that extent. */
	domainOfValidity?: DomainOfValidityType[];
	/** The gml:scope property provides a description of the usage, or limitations of usage, for which this CRS-related object is valid. If unknown, enter "not known". */
	scope: string[];
}
export interface AbstractCRSType extends _AbstractCRSType { constructor: { new(): AbstractCRSType }; }
export var AbstractCRSType: { new(): AbstractCRSType };

interface _AbstractCurveProxyType extends _AbstractRingProxyType {
	/** A gml:CompositeCurve is represented by a sequence of (orientable) curves such that each curve in the sequence terminates at the start point of the subsequent curve in the list.
	  * curveMember references or contains inline one curve in the composite curve.
	  * The curves are contiguous, the collection of curves is ordered. Therefore, if provided, the aggregationType attribute shall have the value "sequence". */
	CompositeCurve?: CompositeCurveType;
	/** A curve is a 1-dimensional primitive. Curves are continuous, connected, and have a measurable length in terms of the coordinate system.
	  * A curve is composed of one or more curve segments. Each curve segment within a curve may be defined using a different interpolation method. The curve segments are connected to one another, with the end point of each segment except the last being the start point of the next segment in the segment list.
	  * The orientation of the curve is positive.
	  * The element segments encapsulates the segments of the curve. */
	Curve?: CurveType;
	/** A LineString is a special curve that consists of a single segment with linear interpolation. It is defined by two or more coordinate tuples, with linear interpolation between them. The number of direct positions in the list shall be at least two. */
	LineString?: LineStringType;
	/** OrientableCurve consists of a curve and an orientation. If the orientation is "+", then the OrientableCurve is identical to the baseCurve. If the orientation is "-", then the OrientableCurve is related to another AbstractCurve with a parameterization that reverses the sense of the curve traversal. */
	OrientableCurve?: OrientableCurveType;
}
interface AbstractCurveProxyType extends _AbstractCurveProxyType { constructor: { new(): AbstractCurveProxyType }; }

interface _AbstractCurveSegmentProxyType extends _ArcByCenterPointProxyType, _ArcStringProxyType, _ArcStringByBulgeProxyType, _BSplineProxyType, _GeodesicStringProxyType {
	/** A LineStringSegment is a curve segment that is defined by two or more control points including the start and end point, with linear interpolation between them.
	  * The content model follows the general pattern for the encoding of curve segments. */
	LineStringSegment?: LineStringSegmentType;
	/** A clothoid, or Cornu's spiral, is plane curve whose curvature is a fixed function of its length.
	  * refLocation, startParameter, endParameter and scaleFactor have the same meaning as specified in ISO 19107:2003, 6.4.22.
	  * interpolation is fixed as "clothoid".
	  * The content model follows the general pattern for the encoding of curve segments. */
	Clothoid?: ClothoidType;
	/** The number of control points shall be at least three.
	  * vectorAtStart is the unit tangent vector at the start point of the spline. vectorAtEnd is the unit tangent vector at the end point of the spline. Only the direction of the vectors shall be used to determine the shape of the cubic spline, not their length.
	  * interpolation is fixed as "cubicSpline".
	  * degree shall be the degree of the polynomial used for the interpolation in this spline. Therefore the degree for a cubic spline is fixed to "3".
	  * The content model follows the general pattern for the encoding of curve segments. */
	CubicSpline?: CubicSplineType;
	/** An offset curve is a curve at a constant distance from the basis curve. offsetBase is the base curve from which this curve is defined as an offset. distance and refDirection have the same meaning as specified in ISO 19107:2003, 6.4.23.
	  * The content model follows the general pattern for the encoding of curve segments. */
	OffsetCurve?: OffsetCurveType;
}
interface AbstractCurveSegmentProxyType extends _AbstractCurveSegmentProxyType { constructor: { new(): AbstractCurveSegmentProxyType }; }

interface _AbstractCurveSegmentType extends BaseType {
	numDerivativeInterior: number;
	numDerivativesAtEnd: number;
	numDerivativesAtStart: number;
}
export interface AbstractCurveSegmentType extends _AbstractCurveSegmentType { constructor: { new(): AbstractCurveSegmentType }; }
export var AbstractCurveSegmentType: { new(): AbstractCurveSegmentType };

/** gml:AbstractCurveType is an abstraction of a curve to support the different levels of complexity. The curve may always be viewed as a geometric primitive, i.e. is continuous. */
interface _AbstractCurveType extends _AbstractGeometricPrimitiveType {}
export interface AbstractCurveType extends _AbstractCurveType { constructor: { new(): AbstractCurveType }; }
export var AbstractCurveType: { new(): AbstractCurveType };

interface _AbstractDatumProxyType extends _GeodeticDatumProxyType, _VerticalDatumProxyType, _EngineeringDatumProxyType, _ImageDatumProxyType, _TemporalDatumProxyType {}
interface AbstractDatumProxyType extends _AbstractDatumProxyType { constructor: { new(): AbstractDatumProxyType }; }

interface _AbstractDatumType extends _IdentifiedObjectType, _AnchorDefinitionProxyType {
	/** The gml:domainOfValidity property implements an association role to an EX_Extent object as encoded in ISO/TS 19139, either referencing or containing the definition of that extent. */
	domainOfValidity?: DomainOfValidityType;
	/** gml:realizationEpoch is the time after which this datum definition is valid. See ISO 19111 Table 32 for details. */
	realizationEpoch?: Date;
	/** The gml:scope property provides a description of the usage, or limitations of usage, for which this CRS-related object is valid. If unknown, enter "not known". */
	scope: string[];
}
export interface AbstractDatumType extends _AbstractDatumType { constructor: { new(): AbstractDatumType }; }
export var AbstractDatumType: { new(): AbstractDatumType };

interface _AbstractDiscreteCoverageProxyType extends BaseType {
	/** A gml:GriddedCoverage is a discrete point coverage in which the domain set is a geometric grid of points.
	  * Note that this is the same as the gml:MultiPointCoverage except that we have a gml:Grid to describe the domain.
	  * The simple gridded coverage is not geometrically referenced and hence no geometric positions are assignable to the points in the grid. Such geometric positioning is introduced in the gml:RectifiedGridCoverage. */
	GridCoverage?: DiscreteCoverageType;
	/** In a gml:MultiCurveCoverage the domain is partioned into a collection of curves comprising a gml:MultiCurve.  The coverage function then maps each curve in the collection to a value in the range set.
	  * The content model is identical with gml:DiscreteCoverageType, but that gml:domainSet shall have values gml:MultiCurve.
	  * In a gml:MultiCurveCoverage the mapping from the domain to the range is straightforward.
	  * -	For gml:DataBlock encodings the curves of the gml:MultiCurve are mapped in document order to the tuples of the data block.
	  * -	For gml:CompositeValue encodings the curves of the gml:MultiCurve are mapped to the members of the composite value in document order.
	  * -	For gml:File encodings the curves of the gml:MultiCurve are mapped to the records of the file in sequential order. */
	MultiCurveCoverage?: DiscreteCoverageType;
	/** In a gml:MultiPointCoverage the domain set is a gml:MultiPoint, that is a collection of arbitrarily distributed geometric points.
	  * The content model is identical with gml:DiscreteCoverageType, but that gml:domainSet shall have values gml:MultiPoint.
	  * In a gml:MultiPointCoverage the mapping from the domain to the range is straightforward.
	  * -	For gml:DataBlock encodings the points of the gml:MultiPoint are mapped in document order to the tuples of the data block.
	  * -	For gml:CompositeValue encodings the points of the gml:MultiPoint are mapped to the members of the composite value in document order.
	  * -	For gml:File encodings the points of the gml:MultiPoint are mapped to the records of the file in sequential order. */
	MultiPointCoverage?: DiscreteCoverageType;
	/** In a gml:MultiSolidCoverage the domain is partioned into a collection of solids comprising a gml:MultiSolid.  The coverage function than maps each solid in the collection to a value in the range set.
	  * The content model is identical with gml:DiscreteCoverageType, but that gml:domainSet shall have values gml:MultiSolid.
	  * In a gml:MultiSolidCoverage the mapping from the domain to the range is straightforward.
	  * -	For gml:DataBlock encodings the solids of the gml:MultiSolid are mapped in document order to the tuples of the data block.
	  * -	For gml:CompositeValue encodings the solids of the gml:MultiSolid are mapped to the members of the composite value in document order.
	  * -	For gml:File encodings the solids of the gml:MultiSolid are mapped to the records of the file in sequential order. */
	MultiSolidCoverage?: DiscreteCoverageType;
	/** In a gml:MultiSurfaceCoverage the domain is partioned into a collection of surfaces comprising a gml:MultiSurface.  The coverage function than maps each surface in the collection to a value in the range set.
	  * The content model is identical with gml:DiscreteCoverageType, but that gml:domainSet shall have values gml:MultiSurface.
	  * In a gml:MultiSurfaceCoverage the mapping from the domain to the range is straightforward.
	  * -	For gml:DataBlock encodings the surfaces of the gml:MultiSurface are mapped in document order to the tuples of the data block.
	  * -	For gml:CompositeValue encodings the surfaces of the gml:MultiSurface are mapped to the members of the composite value in document order.
	  * -	For gml:File encodings the surfaces of the gml:MultiSurface are mapped to the records of the file in sequential order. */
	MultiSurfaceCoverage?: DiscreteCoverageType;
	/** The gml:RectifiedGridCoverage is a discrete point coverage based on a rectified grid. It is similar to the grid coverage except that the points of the grid are geometrically referenced. The rectified grid coverage has a domain that is a gml:RectifiedGrid geometry. */
	RectifiedGridCoverage?: DiscreteCoverageType;
}
interface AbstractDiscreteCoverageProxyType extends _AbstractDiscreteCoverageProxyType { constructor: { new(): AbstractDiscreteCoverageProxyType }; }

interface _AbstractFeatureCollectionProxyType extends BaseType {}
interface AbstractFeatureCollectionProxyType extends _AbstractFeatureCollectionProxyType { constructor: { new(): AbstractFeatureCollectionProxyType }; }

interface _AbstractFeatureCollectionType extends _AbstractFeatureType {
	featureMember?: FeaturePropertyType[];
	featureMembers?: FeatureArrayPropertyType;
}
export interface AbstractFeatureCollectionType extends _AbstractFeatureCollectionType { constructor: { new(): AbstractFeatureCollectionType }; }
export var AbstractFeatureCollectionType: { new(): AbstractFeatureCollectionType };

/** To create a collection of GML features, a property type shall be derived by extension from gml:AbstractFeatureMemberType.
  * By default, this abstract property type does not imply any ownership of the features in the collection. The owns attribute of gml:OwnershipAttributeGroup may be used on a property element instance to assert ownership of a feature in the collection. A collection shall not own a feature already owned by another object. */
interface _AbstractFeatureMemberType extends BaseType {
	owns: boolean;
}
export interface AbstractFeatureMemberType extends _AbstractFeatureMemberType { constructor: { new(): AbstractFeatureMemberType }; }
export var AbstractFeatureMemberType: { new(): AbstractFeatureMemberType };

interface _AbstractFeatureProxyType extends _DynamicFeatureProxyType, _AbstractContinuousCoverageProxyType, _AbstractCoverageProxyType, _AbstractFeatureCollectionProxyType, _ObservationProxyType {
	FeatureCollection?: FeatureCollectionType;
}
interface AbstractFeatureProxyType extends _AbstractFeatureProxyType { constructor: { new(): AbstractFeatureProxyType }; }

/** The basic feature model is given by the gml:AbstractFeatureType.
  * The content model for gml:AbstractFeatureType adds two specific properties suitable for geographic features to the content model defined in gml:AbstractGMLType.
  * The value of the gml:boundedBy property describes an envelope that encloses the entire feature instance, and is primarily useful for supporting rapid searching for features that occur in a particular location.
  * The value of the gml:location property describes the extent, position or relative location of the feature. */
interface _AbstractFeatureType extends _AbstractGMLType, _LocationProxyType {
	/** This property describes the minimum bounding box or rectangle that encloses the entire feature. */
	boundedBy?: BoundingShapeType;
}
export interface AbstractFeatureType extends _AbstractFeatureType { constructor: { new(): AbstractFeatureType }; }
export var AbstractFeatureType: { new(): AbstractFeatureType };

interface _AbstractGeneralConversionProxyType extends _ConversionProxyType {}
interface AbstractGeneralConversionProxyType extends _AbstractGeneralConversionProxyType { constructor: { new(): AbstractGeneralConversionProxyType }; }

interface _AbstractGeneralConversionType extends _AbstractCoordinateOperationType {
	/** The attribute gml:id supports provision of a handle for the XML element representing a GML Object. Its use is mandatory for all GML objects. It is of XML type ID, so is constrained to be unique in the XML document within which it occurs. */
	id: string;
	/** gml:coordinateOperationAccuracy is an association role to a DQ_PositionalAccuracy object as encoded in ISO/TS 19139, either referencing or containing the definition of that positional accuracy. That object contains an estimate of the impact of this coordinate operation on point accuracy. That is, it gives position error estimates for the target coordinates of this coordinate operation, assuming no errors in the source coordinates. */
	coordinateOperationAccuracy?: CoordinateOperationAccuracyType[];
	/** The value of this property is a text description of the object. gml:description uses gml:StringOrRefType as its content model, so it may contain a simple text string content, or carry a reference to an external description. The use of gml:description to reference an external description has been deprecated and replaced by the gml:descriptionReference property. */
	description?: StringOrRefType;
	/** The value of this property is a remote text description of the object. The xlink:href attribute of the gml:descriptionReference property references the external description. */
	descriptionReference?: ReferenceType;
	/** The gml:domainOfValidity property implements an association role to an EX_Extent object as encoded in ISO/TS 19139, either referencing or containing the definition of that extent. */
	domainOfValidity?: DomainOfValidityType;
	/** Often, a special identifier is assigned to an object by the maintaining authority with the intention that it is used in references to the object For such cases, the codeSpace shall be provided. That identifier is usually unique either globally or within an application domain. gml:identifier is a pre-defined property for such identifiers. */
	identifier: CodeWithAuthorityType;
	metaDataProperty?: MetaDataPropertyType[];
	/** The gml:name property provides a label or identifier for the object, commonly a descriptive name. An object may have several names, typically assigned by different authorities. gml:name uses the gml:CodeType content model.  The authority for a name is indicated by the value of its (optional) codeSpace attribute.  The name may or may not be unique, as determined by the rules of the organization responsible for the codeSpace.  In common usage there will be one name per authority, so a processing application may select the name from its preferred codeSpace. */
	name?: CodeType[];
	remarks?: string;
	/** The gml:scope property provides a description of the usage, or limitations of usage, for which this CRS-related object is valid. If unknown, enter "not known". */
	scope: string[];
}
export interface AbstractGeneralConversionType extends _AbstractGeneralConversionType { constructor: { new(): AbstractGeneralConversionType }; }
export var AbstractGeneralConversionType: { new(): AbstractGeneralConversionType };

interface _AbstractGeneralDerivedCRSProxyType extends BaseType {
	/** gml:ProjectedCRS is a 2D coordinate reference system used to approximate the shape of the earth on a planar surface, but in such a way that the distortion that is inherent to the approximation is carefully controlled and known. Distortion correction is commonly applied to calculated bearings and distances to produce values that are a close match to actual field values. */
	ProjectedCRS?: ProjectedCRSType;
	/** gml:DerivedCRS is a single coordinate reference system that is defined by its coordinate conversion from another single coordinate reference system known as the base CRS. The base CRS can be a projected coordinate reference system, if this DerivedCRS is used for a georectified grid coverage as described in ISO 19123, Clause 8. */
	DerivedCRS?: DerivedCRSType;
}
interface AbstractGeneralDerivedCRSProxyType extends _AbstractGeneralDerivedCRSProxyType { constructor: { new(): AbstractGeneralDerivedCRSProxyType }; }

interface _AbstractGeneralDerivedCRSType extends _AbstractCRSType, _ConversionProxyType {}
export interface AbstractGeneralDerivedCRSType extends _AbstractGeneralDerivedCRSType { constructor: { new(): AbstractGeneralDerivedCRSType }; }
export var AbstractGeneralDerivedCRSType: { new(): AbstractGeneralDerivedCRSType };

/** gml:AbstractGeneralOperationParameterPropertyType is a property type for association roles to an operation parameter or group, either referencing or containing the definition of that parameter or group. */
interface _AbstractGeneralOperationParameterPropertyType extends _AbstractGeneralOperationParameterProxyType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface AbstractGeneralOperationParameterPropertyType extends _AbstractGeneralOperationParameterPropertyType { constructor: { new(): AbstractGeneralOperationParameterPropertyType }; }
export var AbstractGeneralOperationParameterPropertyType: { new(): AbstractGeneralOperationParameterPropertyType };

interface _AbstractGeneralOperationParameterProxyType extends _OperationParameterProxyType {
	/** gml:OperationParameterGroup is the definition of a group of parameters used by an operation method. This complex type is expected to be used or extended for all applicable operation methods, without defining operation-method-specialized element names.
	  * The generalOperationParameter elements are an unordered list of associations to the set of operation parameters that are members of this group. */
	OperationParameterGroup?: OperationParameterGroupType;
}
interface AbstractGeneralOperationParameterProxyType extends _AbstractGeneralOperationParameterProxyType { constructor: { new(): AbstractGeneralOperationParameterProxyType }; }

interface _AbstractGeneralOperationParameterType extends _IdentifiedObjectType {
	/** gml:minimumOccurs is the minimum number of times that values for this parameter group or parameter are required. If this attribute is omitted, the minimum number shall be one. */
	minimumOccurs?: number;
}
export interface AbstractGeneralOperationParameterType extends _AbstractGeneralOperationParameterType { constructor: { new(): AbstractGeneralOperationParameterType }; }
export var AbstractGeneralOperationParameterType: { new(): AbstractGeneralOperationParameterType };

/** gml:AbstractGeneralParameterValuePropertyType is a  property type for inline association roles to a parameter value or group of parameter values, always containing the values. */
interface _AbstractGeneralParameterValuePropertyType extends _AbstractGeneralParameterValueProxyType {}
export interface AbstractGeneralParameterValuePropertyType extends _AbstractGeneralParameterValuePropertyType { constructor: { new(): AbstractGeneralParameterValuePropertyType }; }
export var AbstractGeneralParameterValuePropertyType: { new(): AbstractGeneralParameterValuePropertyType };

interface _AbstractGeneralParameterValueProxyType extends _ParameterValueProxyType {
	/** gml:ParameterValueGroup is a group of related parameter values. The same group can be repeated more than once in a Conversion, Transformation, or higher level ParameterValueGroup, if those instances contain different values of one or more parameterValues which suitably distinquish among those groups. This concrete complex type can be used for operation methods without using an Application Schema that defines operation-method-specialized element names and contents. This complex type may be used, extended, or restricted for well-known operation methods, especially for methods with only one instance.
	  * The parameterValue elements are an unordered set of composition association roles to the parameter values and groups of values included in this group. */
	ParameterValueGroup?: ParameterValueGroupType;
}
interface AbstractGeneralParameterValueProxyType extends _AbstractGeneralParameterValueProxyType { constructor: { new(): AbstractGeneralParameterValueProxyType }; }

interface _AbstractGeneralParameterValueType extends BaseType {}
export interface AbstractGeneralParameterValueType extends _AbstractGeneralParameterValueType { constructor: { new(): AbstractGeneralParameterValueType }; }
export var AbstractGeneralParameterValueType: { new(): AbstractGeneralParameterValueType };

interface _AbstractGeneralTransformationProxyType extends BaseType {
	/** gml:Transformation is a concrete object element derived from gml:GeneralTransformation (13.6.2.13).
	  * This concrete object can be used for all operation methods, without using a GML Application Schema that defines operation-method-specialized element names and contents, especially for methods with only one Transformation instance.
	  * The parameterValue elements are an unordered list of composition associations to the set of parameter values used by this conversion operation. */
	Transformation?: TransformationType;
}
interface AbstractGeneralTransformationProxyType extends _AbstractGeneralTransformationProxyType { constructor: { new(): AbstractGeneralTransformationProxyType }; }

interface _AbstractGeneralTransformationType extends _AbstractCoordinateOperationType {
	/** The attribute gml:id supports provision of a handle for the XML element representing a GML Object. Its use is mandatory for all GML objects. It is of XML type ID, so is constrained to be unique in the XML document within which it occurs. */
	id: string;
	/** gml:coordinateOperationAccuracy is an association role to a DQ_PositionalAccuracy object as encoded in ISO/TS 19139, either referencing or containing the definition of that positional accuracy. That object contains an estimate of the impact of this coordinate operation on point accuracy. That is, it gives position error estimates for the target coordinates of this coordinate operation, assuming no errors in the source coordinates. */
	coordinateOperationAccuracy?: CoordinateOperationAccuracyType[];
	/** The value of this property is a text description of the object. gml:description uses gml:StringOrRefType as its content model, so it may contain a simple text string content, or carry a reference to an external description. The use of gml:description to reference an external description has been deprecated and replaced by the gml:descriptionReference property. */
	description?: StringOrRefType;
	/** The value of this property is a remote text description of the object. The xlink:href attribute of the gml:descriptionReference property references the external description. */
	descriptionReference?: ReferenceType;
	/** The gml:domainOfValidity property implements an association role to an EX_Extent object as encoded in ISO/TS 19139, either referencing or containing the definition of that extent. */
	domainOfValidity?: DomainOfValidityType;
	/** Often, a special identifier is assigned to an object by the maintaining authority with the intention that it is used in references to the object For such cases, the codeSpace shall be provided. That identifier is usually unique either globally or within an application domain. gml:identifier is a pre-defined property for such identifiers. */
	identifier: CodeWithAuthorityType;
	metaDataProperty?: MetaDataPropertyType[];
	/** The gml:name property provides a label or identifier for the object, commonly a descriptive name. An object may have several names, typically assigned by different authorities. gml:name uses the gml:CodeType content model.  The authority for a name is indicated by the value of its (optional) codeSpace attribute.  The name may or may not be unique, as determined by the rules of the organization responsible for the codeSpace.  In common usage there will be one name per authority, so a processing application may select the name from its preferred codeSpace. */
	name?: CodeType[];
	/** gml:operationVersion is the version of the coordinate transformation (i.e., instantiation due to the stochastic nature of the parameters). Mandatory when describing a transformation, and should not be supplied for a conversion. */
	operationVersion: string;
	remarks?: string;
	/** The gml:scope property provides a description of the usage, or limitations of usage, for which this CRS-related object is valid. If unknown, enter "not known". */
	scope: string[];
	/** gml:sourceCRS is an association role to the source CRS (coordinate reference system) of this coordinate operation. */
	sourceCRS: CRSPropertyType;
	/** gml:targetCRS is an association role to the target CRS (coordinate reference system) of this coordinate operation. */
	targetCRS: CRSPropertyType;
}
export interface AbstractGeneralTransformationType extends _AbstractGeneralTransformationType { constructor: { new(): AbstractGeneralTransformationType }; }
export var AbstractGeneralTransformationType: { new(): AbstractGeneralTransformationType };

interface _AbstractGeometricAggregateProxyType extends BaseType {
	/** A gml:MultiPoint consists of one or more gml:Points.
	  * The members of the geometric aggregate may be specified either using the "standard" property (gml:pointMember) or the array property (gml:pointMembers). It is also valid to use both the "standard" and the array properties in the same collection. */
	MultiPoint?: MultiPointType;
	/** A gml:MultiCurve is defined by one or more gml:AbstractCurves.
	  * The members of the geometric aggregate may be specified either using the "standard" property (gml:curveMember) or the array property (gml:curveMembers). It is also valid to use both the "standard" and the array properties in the same collection. */
	MultiCurve?: MultiCurveType;
	/** A gml:MultiSurface is defined by one or more gml:AbstractSurfaces.
	  * The members of the geometric aggregate may be specified either using the "standard" property (gml:surfaceMember) or the array property (gml:surfaceMembers). It is also valid to use both the "standard" and the array properties in the same collection. */
	MultiSurface?: MultiSurfaceType;
	/** A gml:MultiSolid is defined by one or more gml:AbstractSolids.
	  * The members of the geometric aggregate may be specified either using the "standard" property (gml:solidMember) or the array property (gml:solidMembers). It is also valid to use both the "standard" and the array properties in the same collection. */
	MultiSolid?: MultiSolidType;
	/** gml:MultiGeometry is a collection of one or more GML geometry objects of arbitrary type.
	  * The members of the geometric aggregate may be specified either using the "standard" property (gml:geometryMember) or the array property (gml:geometryMembers). It is also valid to use both the "standard" and the array properties in the same collection. */
	MultiGeometry?: MultiGeometryType;
}
interface AbstractGeometricAggregateProxyType extends _AbstractGeometricAggregateProxyType { constructor: { new(): AbstractGeometricAggregateProxyType }; }

interface _AbstractGeometricAggregateType extends _AbstractGeometryType {
	aggregationType: AggregationType;
}
export interface AbstractGeometricAggregateType extends _AbstractGeometricAggregateType { constructor: { new(): AbstractGeometricAggregateType }; }
export var AbstractGeometricAggregateType: { new(): AbstractGeometricAggregateType };

interface _AbstractGeometricPrimitiveProxyType extends _AbstractCurveProxyType, _AbstractSolidProxyType, _AbstractSurfaceProxyType {
	/** A Point is defined by a single coordinate tuple. The direct position of a point is specified by the pos element which is of type DirectPositionType. */
	Point?: PointType;
}
interface AbstractGeometricPrimitiveProxyType extends _AbstractGeometricPrimitiveProxyType { constructor: { new(): AbstractGeometricPrimitiveProxyType }; }

/** gml:AbstractGeometricPrimitiveType is the abstract root type of the geometric primitives. A geometric primitive is a geometric object that is not decomposed further into other primitives in the system. All primitives are oriented in the direction implied by the sequence of their coordinate tuples. */
interface _AbstractGeometricPrimitiveType extends _AbstractGeometryType {}
export interface AbstractGeometricPrimitiveType extends _AbstractGeometricPrimitiveType { constructor: { new(): AbstractGeometricPrimitiveType }; }
export var AbstractGeometricPrimitiveType: { new(): AbstractGeometricPrimitiveType };

interface _AbstractGeometryProxyType extends _AbstractGeometricAggregateProxyType, _AbstractGeometricPrimitiveProxyType, _AbstractImplicitGeometryProxyType {
	GeometricComplex?: GeometricComplexType;
}
interface AbstractGeometryProxyType extends _AbstractGeometryProxyType { constructor: { new(): AbstractGeometryProxyType }; }

/** All geometry elements are derived directly or indirectly from this abstract supertype. A geometry element may have an identifying attribute (gml:id), one or more names (elements identifier and name) and a description (elements description and descriptionReference) . It may be associated with a spatial reference system (attribute group gml:SRSReferenceGroup).
  * The following rules shall be adhered to:
  * -	Every geometry type shall derive from this abstract type.
  * -	Every geometry element (i.e. an element of a geometry type) shall be directly or indirectly in the substitution group of AbstractGeometry. */
interface _AbstractGeometryType extends _AbstractGMLType {
	$axisLabels: NCNameList;
	srsDimension: number;
	srsName: string;
	uomLabels: NCNameList;
}
export interface AbstractGeometryType extends _AbstractGeometryType { constructor: { new(): AbstractGeometryType }; }
export var AbstractGeometryType: { new(): AbstractGeometryType };

interface _AbstractGMLProxyType extends _AbstractTimeSliceProxyType, _AbstractGeometryProxyType, _AbstractTimeObjectProxyType, _AbstractFeatureProxyType, _DefinitionProxyType_2, _AbstractTopologyProxyType {
	Array?: ArrayType;
	Bag?: BagType;
}
interface AbstractGMLProxyType extends _AbstractGMLProxyType { constructor: { new(): AbstractGMLProxyType }; }

interface _AbstractGMLType extends BaseType {
	/** The attribute gml:id supports provision of a handle for the XML element representing a GML Object. Its use is mandatory for all GML objects. It is of XML type ID, so is constrained to be unique in the XML document within which it occurs. */
	id: string;
	/** The value of this property is a text description of the object. gml:description uses gml:StringOrRefType as its content model, so it may contain a simple text string content, or carry a reference to an external description. The use of gml:description to reference an external description has been deprecated and replaced by the gml:descriptionReference property. */
	description?: StringOrRefType;
	/** The value of this property is a remote text description of the object. The xlink:href attribute of the gml:descriptionReference property references the external description. */
	descriptionReference?: ReferenceType;
	/** Often, a special identifier is assigned to an object by the maintaining authority with the intention that it is used in references to the object For such cases, the codeSpace shall be provided. That identifier is usually unique either globally or within an application domain. gml:identifier is a pre-defined property for such identifiers. */
	identifier?: CodeWithAuthorityType;
	metaDataProperty?: MetaDataPropertyType[];
	/** The gml:name property provides a label or identifier for the object, commonly a descriptive name. An object may have several names, typically assigned by different authorities. gml:name uses the gml:CodeType content model.  The authority for a name is indicated by the value of its (optional) codeSpace attribute.  The name may or may not be unique, as determined by the rules of the organization responsible for the codeSpace.  In common usage there will be one name per authority, so a processing application may select the name from its preferred codeSpace. */
	name?: CodeType[];
}
export interface AbstractGMLType extends _AbstractGMLType { constructor: { new(): AbstractGMLType }; }
export var AbstractGMLType: { new(): AbstractGMLType };

interface _AbstractGriddedSurfaceProxyType extends BaseType {
	Cone?: ConeType;
	Cylinder?: CylinderType;
	Sphere?: SphereType;
}
interface AbstractGriddedSurfaceProxyType extends _AbstractGriddedSurfaceProxyType { constructor: { new(): AbstractGriddedSurfaceProxyType }; }

interface _AbstractGriddedSurfaceType extends _AbstractParametricCurveSurfaceType {
	columns: number;
	$rows: number;
	rows: RowsType;
}
export interface AbstractGriddedSurfaceType extends _AbstractGriddedSurfaceType { constructor: { new(): AbstractGriddedSurfaceType }; }
export var AbstractGriddedSurfaceType: { new(): AbstractGriddedSurfaceType };

interface _AbstractImplicitGeometryProxyType extends _GridProxyType {}
interface AbstractImplicitGeometryProxyType extends _AbstractImplicitGeometryProxyType { constructor: { new(): AbstractImplicitGeometryProxyType }; }

interface _AbstractInlinePropertyProxyType extends BaseType {}
interface AbstractInlinePropertyProxyType extends _AbstractInlinePropertyProxyType { constructor: { new(): AbstractInlinePropertyProxyType }; }

/** To create a collection of GML Objects that are not all features, a property type shall be derived by extension from gml:AbstractMemberType.
  * This abstract property type is intended to be used only in object types where software shall be able to identify that an instance of such an object type is to be interpreted as a collection of objects.
  * By default, this abstract property type does not imply any ownership of the objects in the collection. The owns attribute of gml:OwnershipAttributeGroup may be used on a property element instance to assert ownership of an object in the collection. A collection shall not own an object already owned by another object. */
interface _AbstractMemberType extends BaseType {
	owns: boolean;
}
export interface AbstractMemberType extends _AbstractMemberType { constructor: { new(): AbstractMemberType }; }
export var AbstractMemberType: { new(): AbstractMemberType };

/** To associate metadata described by any XML Schema with a GML object, a property element shall be defined whose content model is derived by extension from gml:AbstractMetadataPropertyType.
  * The value of such a property shall be metadata. The content model of such a property type, i.e. the metadata application schema shall be specified by the GML Application Schema.
  * By default, this abstract property type does not imply any ownership of the metadata. The owns attribute of gml:OwnershipAttributeGroup may be used on a metadata property element instance to assert ownership of the metadata.
  * If metadata following the conceptual model of ISO 19115 is to be encoded in a GML document, the corresponding Implementation Specification specified in ISO/TS 19139 shall be used to encode the metadata information. */
interface _AbstractMetadataPropertyType extends BaseType {
	owns: boolean;
}
export interface AbstractMetadataPropertyType extends _AbstractMetadataPropertyType { constructor: { new(): AbstractMetadataPropertyType }; }
export var AbstractMetadataPropertyType: { new(): AbstractMetadataPropertyType };

interface _AbstractMetaDataProxyType extends BaseType {
	GenericMetaData?: GenericMetaDataType;
}
interface AbstractMetaDataProxyType extends _AbstractMetaDataProxyType { constructor: { new(): AbstractMetaDataProxyType }; }

interface _AbstractMetaDataType extends BaseType {
	/** The attribute gml:id supports provision of a handle for the XML element representing a GML Object. Its use is mandatory for all GML objects. It is of XML type ID, so is constrained to be unique in the XML document within which it occurs. */
	id: string;
}
export interface AbstractMetaDataType extends _AbstractMetaDataType { constructor: { new(): AbstractMetaDataType }; }
export var AbstractMetaDataType: { new(): AbstractMetaDataType };

interface _AbstractObjectProxyType extends _AbstractMetaDataProxyType, _EnvelopeProxyType, _AbstractValueProxyType, _AbstractGeneralParameterValueProxyType, _AbstractCurveSegmentProxyType, _AbstractGMLProxyType {
	/** The gml:coverageFunction property describes the mapping function from the domain to the range of the coverage.
	  * The value of the CoverageFunction is one of gml:CoverageMappingRule and gml:GridFunction.
	  * If the gml:coverageFunction property is omitted for a gridded coverage (including rectified gridded coverages) the gml:startPoint is assumed to be the value of the gml:low property in the gml:Grid geometry, and the gml:sequenceRule is assumed to be linear and the gml:axisOrder property is assumed to be "+1 +2". */
	coverageFunction?: CoverageFunctionType;
	/** gml:DataBlock describes the Range as a block of text encoded values similar to a Common Separated Value (CSV) representation.
	  * The range set parameterization is described by the property gml:rangeParameters. */
	DataBlock?: DataBlockType;
	/** for efficiency reasons, GML also provides a means of encoding the range set in an arbitrary external encoding, such as a binary file.  This encoding may be "well-known" but this is not required. This mode uses the gml:File element.
	  * The values of the coverage (attribute values in the range set) are transmitted in a external file that is referenced from the XML structure described by gml:FileType.  The external file is referenced by the gml:fileReference property that is an anyURI (the gml:fileName property has been deprecated).  This means that the external file may be located remotely from the referencing GML instance.
	  * The gml:compression property points to a definition of a compression algorithm through an anyURI.  This may be a retrievable, computable definition or simply a reference to an unambiguous name for the compression method.
	  * The gml:mimeType property points to a definition of the file mime type.
	  * The gml:fileStructure property is defined by a codelist. Note further that all values shall be enclosed in a single file. Multi-file structures for values are not supported in GML.
	  * The semantics of the range set is described as above using the gml:rangeParameters property.
	  * Note that if any compression algorithm is applied, the structure above applies only to the pre-compression or post-decompression structure of the file.
	  * Note that the fields within a record match the gml:valueComponents of the gml:CompositeValue in document order. */
	File?: FileType;
	/** gml:CoverageMappingRule provides a formal or informal description of the coverage function.
	  * The mapping rule may be defined as an in-line string (gml:ruleDefinition) or via a remote reference through xlink:href (gml:ruleReference).
	  * If no rule name is specified, the default is 'Linear' with respect to members of the domain in document order. */
	CoverageMappingRule?: MappingRuleType;
	/** gml:GridFunction provides an explicit mapping rule for grid geometries, i.e. the domain shall be a geometry of type grid.  It describes the mapping of grid posts (discrete point grid coverage) or grid cells (discrete surface coverage) to the values in the range set.
	  * The gml:startPoint is the index position of a point in the grid that is mapped to the first point in the range set (this is also the index position of the first grid post).  If the gml:startPoint property is omitted the gml:startPoint is assumed to be equal to the value of gml:low in the gml:Grid geometry. Subsequent points in the mapping are determined by the value of the gml:sequenceRule. */
	GridFunction?: GridFunctionType;
	/** location, refDirection, inDimension and outDimension have the same meaning as specified in ISO 19107:2003, 6.4.21. */
	AffinePlacement?: AffinePlacementType;
}
interface AbstractObjectProxyType extends _AbstractObjectProxyType { constructor: { new(): AbstractObjectProxyType }; }

interface _AbstractOperationProxyType extends _AbstractGeneralConversionProxyType, _AbstractGeneralTransformationProxyType {}
interface AbstractOperationProxyType extends _AbstractOperationProxyType { constructor: { new(): AbstractOperationProxyType }; }

interface _AbstractParametricCurveSurfaceProxyType extends _AbstractGriddedSurfaceProxyType {}
interface AbstractParametricCurveSurfaceProxyType extends _AbstractParametricCurveSurfaceProxyType { constructor: { new(): AbstractParametricCurveSurfaceProxyType }; }

interface _AbstractParametricCurveSurfaceType extends _AbstractSurfacePatchType {
	aggregationType: AggregationType;
}
export interface AbstractParametricCurveSurfaceType extends _AbstractParametricCurveSurfaceType { constructor: { new(): AbstractParametricCurveSurfaceType }; }
export var AbstractParametricCurveSurfaceType: { new(): AbstractParametricCurveSurfaceType };

interface _AbstractReferenceProxyType extends BaseType {}
interface AbstractReferenceProxyType extends _AbstractReferenceProxyType { constructor: { new(): AbstractReferenceProxyType }; }

/** A property with the content model of gml:AbstractRingPropertyType encapsulates a ring to represent the surface boundary property of a surface. */
interface _AbstractRingPropertyType extends _AbstractRingProxyType {}
export interface AbstractRingPropertyType extends _AbstractRingPropertyType { constructor: { new(): AbstractRingPropertyType }; }
export var AbstractRingPropertyType: { new(): AbstractRingPropertyType };

interface _AbstractRingProxyType extends BaseType {
	/** A ring is used to represent a single connected component of a surface boundary as specified in ISO 19107:2003, 6.3.6.
	  * Every gml:curveMember references or contains one curve, i.e. any element which is substitutable for gml:AbstractCurve. In the context of a ring, the curves describe the boundary of the surface. The sequence of curves shall be contiguous and connected in a cycle.
	  * If provided, the aggregationType attribute shall have the value "sequence". */
	Ring?: RingType;
	/** A LinearRing is defined by four or more coordinate tuples, with linear interpolation between them; the first and last coordinates shall be coincident. The number of direct positions in the list shall be at least four. */
	LinearRing?: LinearRingType;
}
interface AbstractRingProxyType extends _AbstractRingProxyType { constructor: { new(): AbstractRingProxyType }; }

interface _AbstractRingType extends _AbstractCurveType {}
export interface AbstractRingType extends _AbstractRingType { constructor: { new(): AbstractRingType }; }
export var AbstractRingType: { new(): AbstractRingType };

interface _AbstractScalarValueListProxyType extends BaseType {
	BooleanList?: booleanOrNilReasonList;
	CategoryList?: CodeOrNilReasonListType;
	CountList?: integerOrNilReasonList;
	QuantityList?: MeasureOrNilReasonListType;
}
interface AbstractScalarValueListProxyType extends _AbstractScalarValueListProxyType { constructor: { new(): AbstractScalarValueListProxyType }; }

interface _AbstractScalarValueProxyType extends BaseType {
	Boolean?: BooleanType;
	/** A gml:Category has an optional XML attribute codeSpace, whose value is a URI which identifies a dictionary, codelist or authority for the term. */
	Category?: CategoryType;
	/** An XML attribute uom ("unit of measure") is required, whose value is a URI which identifies the definition of a ratio scale or units by which the numeric value shall be multiplied, or an interval or position scale on which the value occurs. */
	Quantity?: QuantityType;
	Count?: CountType;
}
interface AbstractScalarValueProxyType extends _AbstractScalarValueProxyType { constructor: { new(): AbstractScalarValueProxyType }; }

interface _AbstractSingleCRSProxyType extends _AbstractGeneralDerivedCRSProxyType {
	GeodeticCRS?: GeodeticCRSType;
	/** gml:VerticalCRS is a 1D coordinate reference system used for recording heights or depths. Vertical CRSs make use of the direction of gravity to define the concept of height or depth, but the relationship with gravity may not be straightforward. By implication, ellipsoidal heights (h) cannot be captured in a vertical coordinate reference system. Ellipsoidal heights cannot exist independently, but only as an inseparable part of a 3D coordinate tuple defined in a geographic 3D coordinate reference system. */
	VerticalCRS?: VerticalCRSType;
	/** gml:EngineeringCRS is a contextually local coordinate reference system which can be divided into two broad categories:
	  * -	earth-fixed systems applied to engineering activities on or near the surface of the earth;
	  * -	CRSs on moving platforms such as road vehicles, vessels, aircraft, or spacecraft, see ISO 19111 8.3. */
	EngineeringCRS?: EngineeringCRSType;
	/** gml:ImageCRS is an engineering coordinate reference system applied to locations in images. Image coordinate reference systems are treated as a separate sub-type because the definition of the associated image datum contains two attributes not relevant to other engineering datums. */
	ImageCRS?: ImageCRSType;
	/** gml:TemporalCRS is a 1D coordinate reference system used for the recording of time. */
	TemporalCRS?: TemporalCRSType;
	GeographicCRS?: GeographicCRSType;
	GeocentricCRS?: GeocentricCRSType;
}
interface AbstractSingleCRSProxyType extends _AbstractSingleCRSProxyType { constructor: { new(): AbstractSingleCRSProxyType }; }

interface _AbstractSingleOperationProxyType extends _AbstractOperationProxyType {
	/** gml:PassThroughOperation is a pass-through operation specifies that a subset of a coordinate tuple is subject to a specific coordinate operation.
	  * The modifiedCoordinate property elements are an ordered sequence of positive integers defining the positions in a coordinate tuple of the coordinates affected by this pass-through operation. The AggregationAttributeGroup should be used to specify that the modifiedCoordinate elements are ordered. */
	PassThroughOperation?: PassThroughOperationType;
}
interface AbstractSingleOperationProxyType extends _AbstractSingleOperationProxyType { constructor: { new(): AbstractSingleOperationProxyType }; }

interface _AbstractSolidProxyType extends BaseType {
	/** gml:CompositeSolid implements ISO 19107 GM_CompositeSolid (see ISO 19107:2003, 6.6.7) as specified in D.2.3.6.
	  * A gml:CompositeSolid is represented by a set of orientable surfaces. It is a geometry type with all the geometric properties of a (primitive) solid. Essentially, a composite solid is a collection of solids that join in pairs on common boundary surfaces and which, when considered as a whole, form a single solid.
	  * solidMember references or contains one solid in the composite solid. The solids are contiguous. */
	CompositeSolid?: CompositeSolidType;
	/** A solid is the basis for 3-dimensional geometry. The extent of a solid is defined by the boundary surfaces as specified in ISO 19107:2003, 6.3.18. exterior specifies the outer boundary, interior the inner boundary of the solid. */
	Solid?: SolidType;
}
interface AbstractSolidProxyType extends _AbstractSolidProxyType { constructor: { new(): AbstractSolidProxyType }; }

/** gml:AbstractSolidType is an abstraction of a solid to support the different levels of complexity. The solid may always be viewed as a geometric primitive, i.e. is contiguous. */
interface _AbstractSolidType extends _AbstractGeometricPrimitiveType {}
export interface AbstractSolidType extends _AbstractSolidType { constructor: { new(): AbstractSolidType }; }
export var AbstractSolidType: { new(): AbstractSolidType };

interface _AbstractStrictAssociationRoleProxyType extends BaseType {}
interface AbstractStrictAssociationRoleProxyType extends _AbstractStrictAssociationRoleProxyType { constructor: { new(): AbstractStrictAssociationRoleProxyType }; }

interface _AbstractSurfacePatchProxyType extends _AbstractParametricCurveSurfaceProxyType {
	/** A gml:PolygonPatch is a surface patch that is defined by a set of boundary curves and an underlying surface to which these curves adhere. The curves shall be coplanar and the polygon uses planar interpolation in its interior.
	  * interpolation is fixed to "planar", i.e. an interpolation shall return points on a single plane. The boundary of the patch shall be contained within that plane. */
	PolygonPatch?: PolygonPatchType;
	/** gml:Rectangle represents a rectangle as a surface patch with an outer boundary consisting of a linear ring. Note that this is a polygon (subtype) with no inner boundaries. The number of points in the linear ring shall be five.
	  * The ring (element exterior) shall be a gml:LinearRing and shall form a rectangle; the first and the last position shall be coincident.
	  * interpolation is fixed to "planar", i.e. an interpolation shall return points on a single plane. The boundary of the patch shall be contained within that plane. */
	Rectangle?: RectangleType;
	/** gml:Triangle represents a triangle as a surface patch with an outer boundary consisting of a linear ring. Note that this is a polygon (subtype) with no inner boundaries. The number of points in the linear ring shall be four.
	  * The ring (element exterior) shall be a gml:LinearRing and shall form a triangle, the first and the last position shall be coincident.
	  * interpolation is fixed to "planar", i.e. an interpolation shall return points on a single plane. The boundary of the patch shall be contained within that plane. */
	Triangle?: TriangleType;
}
interface AbstractSurfacePatchProxyType extends _AbstractSurfacePatchProxyType { constructor: { new(): AbstractSurfacePatchProxyType }; }

interface _AbstractSurfacePatchType extends BaseType {}
export interface AbstractSurfacePatchType extends _AbstractSurfacePatchType { constructor: { new(): AbstractSurfacePatchType }; }
export var AbstractSurfacePatchType: { new(): AbstractSurfacePatchType };

interface _AbstractSurfaceProxyType extends _SurfaceProxyType {
	/** A gml:CompositeSurface is represented by a set of orientable surfaces. It is geometry type with all the geometric properties of a (primitive) surface. Essentially, a composite surface is a collection of surfaces that join in pairs on common boundary curves and which, when considered as a whole, form a single surface.
	  * surfaceMember references or contains inline one surface in the composite surface.
	  * The surfaces are contiguous. */
	CompositeSurface?: CompositeSurfaceType;
	/** A shell is used to represent a single connected component of a solid boundary as specified in ISO 19107:2003, 6.3.8.
	  * Every gml:surfaceMember references or contains one surface, i.e. any element which is substitutable for gml:AbstractSurface. In the context of a shell, the surfaces describe the boundary of the solid.
	  * If provided, the aggregationType attribute shall have the value "set". */
	Shell?: ShellType;
	/** OrientableSurface consists of a surface and an orientation. If the orientation is "+", then the OrientableSurface is identical to the baseSurface. If the orientation is "-", then the OrientableSurface is a reference to a gml:AbstractSurface with an up-normal that reverses the direction for this OrientableSurface, the sense of "the top of the surface". */
	OrientableSurface?: OrientableSurfaceType;
	/** A Polygon is a special surface that is defined by a single surface patch (see D.3.6). The boundary of this patch is coplanar and the polygon uses planar interpolation in its interior.
	  * The elements exterior and interior describe the surface boundary of the polygon. */
	Polygon?: PolygonType;
}
interface AbstractSurfaceProxyType extends _AbstractSurfaceProxyType { constructor: { new(): AbstractSurfaceProxyType }; }

/** gml:AbstractSurfaceType is an abstraction of a surface to support the different levels of complexity. A surface is always a continuous region of a plane. */
interface _AbstractSurfaceType extends _AbstractGeometricPrimitiveType {}
export interface AbstractSurfaceType extends _AbstractSurfaceType { constructor: { new(): AbstractSurfaceType }; }
export var AbstractSurfaceType: { new(): AbstractSurfaceType };

interface _AbstractTimeComplexProxyType extends BaseType {
	/** A temporal topology complex shall be the connected acyclic directed graph composed of temporal topological primitives, i.e. time nodes and time edges. Because a time edge may not exist without two time nodes on its boundaries, static features have time edges from a temporal topology complex as the values of their temporal properties, regardless of explicit declarations.
	  * A temporal topology complex expresses a linear or a non-linear graph. A temporal linear graph, composed of a sequence of time edges, provides a lineage described only by "substitution" of feature instances or feature element values. A time node as the start or the end of the graph connects with at least one time edge. A time node other than the start and the end shall connect to at least two time edges: one of starting from the node, and another ending at the node.
	  * A temporal topological complex is a set of connected temporal topological primitives. The member primtives are indicated, either by reference or by value, using the primitive property. */
	TimeTopologyComplex?: TimeTopologyComplexType;
}
interface AbstractTimeComplexProxyType extends _AbstractTimeComplexProxyType { constructor: { new(): AbstractTimeComplexProxyType }; }

interface _AbstractTimeComplexType extends _AbstractTimeObjectType {}
export interface AbstractTimeComplexType extends _AbstractTimeComplexType { constructor: { new(): AbstractTimeComplexType }; }
export var AbstractTimeComplexType: { new(): AbstractTimeComplexType };

interface _AbstractTimeGeometricPrimitiveProxyType extends BaseType {
	/** gml:TimeInstant acts as a zero-dimensional geometric primitive that represents an identifiable position in time. */
	TimeInstant?: TimeInstantType;
	/** gml:TimePeriod acts as a one-dimensional geometric primitive that represents an identifiable extent in time.
	  * The location in of a gml:TimePeriod is described by the temporal positions of the instants at which it begins and ends. The length of the period is equal to the temporal distance between the two bounding temporal positions.
	  * Both beginning and end may be described in terms of their direct position using gml:TimePositionType which is an XML Schema simple content type, or by reference to an indentifiable time instant using gml:TimeInstantPropertyType.
	  * Alternatively a limit of a gml:TimePeriod may use the conventional GML property model to make a reference to a time instant described elsewhere, or a limit may be indicated as a direct position. */
	TimePeriod?: TimePeriodType;
}
interface AbstractTimeGeometricPrimitiveProxyType extends _AbstractTimeGeometricPrimitiveProxyType { constructor: { new(): AbstractTimeGeometricPrimitiveProxyType }; }

interface _AbstractTimeGeometricPrimitiveType extends _AbstractTimePrimitiveType {
	frame: string;
}
export interface AbstractTimeGeometricPrimitiveType extends _AbstractTimeGeometricPrimitiveType { constructor: { new(): AbstractTimeGeometricPrimitiveType }; }
export var AbstractTimeGeometricPrimitiveType: { new(): AbstractTimeGeometricPrimitiveType };

interface _AbstractTimeObjectProxyType extends _AbstractTimePrimitiveProxyType, _AbstractTimeComplexProxyType {}
interface AbstractTimeObjectProxyType extends _AbstractTimeObjectProxyType { constructor: { new(): AbstractTimeObjectProxyType }; }

interface _AbstractTimeObjectType extends _AbstractGMLType {}
export interface AbstractTimeObjectType extends _AbstractTimeObjectType { constructor: { new(): AbstractTimeObjectType }; }
export var AbstractTimeObjectType: { new(): AbstractTimeObjectType };

interface _AbstractTimePrimitiveProxyType extends _AbstractTimeTopologyPrimitiveProxyType, _AbstractTimeGeometricPrimitiveProxyType {}
interface AbstractTimePrimitiveProxyType extends _AbstractTimePrimitiveProxyType { constructor: { new(): AbstractTimePrimitiveProxyType }; }

interface _AbstractTimePrimitiveType extends _AbstractTimeObjectType {
	relatedTime?: RelatedTimeType[];
}
export interface AbstractTimePrimitiveType extends _AbstractTimePrimitiveType { constructor: { new(): AbstractTimePrimitiveType }; }
export var AbstractTimePrimitiveType: { new(): AbstractTimePrimitiveType };

interface _AbstractTimeSliceProxyType extends BaseType {
	MovingObjectStatus?: MovingObjectStatusType;
}
interface AbstractTimeSliceProxyType extends _AbstractTimeSliceProxyType { constructor: { new(): AbstractTimeSliceProxyType }; }

interface _AbstractTimeSliceType extends _AbstractGMLType {
	/** Evidence is represented by a simple gml:dataSource or gml:dataSourceReference property that indicates the source of the temporal data. The remote link attributes of the gml:dataSource element have been deprecated along with its current type. */
	dataSource?: StringOrRefType;
	/** gml:validTime is a convenience property element. */
	validTime: TimePrimitivePropertyType;
}
export interface AbstractTimeSliceType extends _AbstractTimeSliceType { constructor: { new(): AbstractTimeSliceType }; }
export var AbstractTimeSliceType: { new(): AbstractTimeSliceType };

interface _AbstractTimeTopologyPrimitiveProxyType extends BaseType {
	/** A time node is a zero-dimensional topological primitive that represents an identifiable node in time (it is equivalent to a point in space). A node may act as the termination or initiation of any number of time edges. A time node may be realised as a geometry, its position, whose value is a time instant. */
	TimeNode?: TimeNodeType;
	/** A time edge is a one-dimensional topological primitive. It is an open interval that starts and ends at a node. The edge may be realised as a geometry whose value is a time period. */
	TimeEdge?: TimeEdgeType;
}
interface AbstractTimeTopologyPrimitiveProxyType extends _AbstractTimeTopologyPrimitiveProxyType { constructor: { new(): AbstractTimeTopologyPrimitiveProxyType }; }

interface _AbstractTimeTopologyPrimitiveType extends _AbstractTimePrimitiveType {
	complex?: ReferenceType;
}
export interface AbstractTimeTopologyPrimitiveType extends _AbstractTimeTopologyPrimitiveType { constructor: { new(): AbstractTimeTopologyPrimitiveType }; }
export var AbstractTimeTopologyPrimitiveType: { new(): AbstractTimeTopologyPrimitiveType };

interface _AbstractTopologyProxyType extends _AbstractTopoPrimitiveProxyType {
	/** gml:TopoComplex is a collection of topological primitives.
	  * Each complex holds a reference to its maximal complex (gml:maximalComplex) and optionally to sub- or super-complexes (gml:subComplex, gml:superComplex).
	  * A topology complex contains its primitive and sub-complex members. */
	TopoComplex?: TopoComplexType;
}
interface AbstractTopologyProxyType extends _AbstractTopologyProxyType { constructor: { new(): AbstractTopologyProxyType }; }

/** This abstract type supplies the root or base type for all topological elements including primitives and complexes. It inherits AbstractGMLType and hence can be identified using the gml:id attribute. */
interface _AbstractTopologyType extends _AbstractGMLType {}
export interface AbstractTopologyType extends _AbstractTopologyType { constructor: { new(): AbstractTopologyType }; }
export var AbstractTopologyType: { new(): AbstractTopologyType };

interface _AbstractTopoPrimitiveProxyType extends BaseType {
	/** gml:Edge represents the 1-dimensional primitive.
	  * The topological boundary of an Edge (gml:directedNode) consists of a negatively directed start Node and a positively directed end Node.
	  * The optional coboundary of an edge (gml:directedFace) is a circular sequence of directed faces which are incident on this edge in document order. In the 2D case, the orientation of the face on the left of the edge is "+"; the orientation of the face on the right on its right is "-".
	  * If provided, the aggregationType attribute shall have the value "sequence".
	  * An edge may optionally be realised by a 1-dimensional geometric primitive (gml:curveProperty). */
	Edge?: EdgeType;
	/** gml:Node represents the 0-dimensional primitive.
	  * The optional coboundary of a node (gml:directedEdge) is a sequence of directed edges which are incident on this node. Edges emanating from this node appear in the node coboundary with a negative orientation.
	  * If provided, the aggregationType attribute shall have the value "sequence".
	  * A node may optionally be realised by a 0-dimensional geometric primitive (gml:pointProperty). */
	Node?: NodeType;
	/** gml:Face represents the 2-dimensional topology primitive.
	  * The topological boundary of a face (gml:directedEdge) consists of a sequence of directed edges. If provided, the aggregationType attribute shall have the value "sequence".
	  * The optional coboundary of a face (gml:directedTopoSolid) is a pair of directed solids which are bounded by this face. A positively directed solid corresponds to a solid which lies in the direction of the negatively directed normal to the face in any geometric realisation.
	  * A face may optionally be realised by a 2-dimensional geometric primitive (gml:surfaceProperty). */
	Face?: FaceType;
	/** gml:TopoSolid represents the 3-dimensional topology primitive.
	  * The topological boundary of a solid (gml:directedFace) consists of a set of directed faces.
	  * A solid may optionally be realised by a 3-dimensional geometric primitive (gml:solidProperty). */
	TopoSolid?: TopoSolidType;
}
interface AbstractTopoPrimitiveProxyType extends _AbstractTopoPrimitiveProxyType { constructor: { new(): AbstractTopoPrimitiveProxyType }; }

interface _AbstractTopoPrimitiveType extends _AbstractTopologyType {}
export interface AbstractTopoPrimitiveType extends _AbstractTopoPrimitiveType { constructor: { new(): AbstractTopoPrimitiveType }; }
export var AbstractTopoPrimitiveType: { new(): AbstractTopoPrimitiveType };

interface _AbstractValueProxyType extends _AbstractScalarValueListProxyType, _AbstractScalarValueProxyType, _CompositeValueProxyType {
	CategoryExtent?: CategoryExtentType;
	CountExtent?: CountExtentType;
	QuantityExtent?: QuantityExtentType;
}
interface AbstractValueProxyType extends _AbstractValueProxyType { constructor: { new(): AbstractValueProxyType }; }

/** gml:AffineCSPropertyType is a property type for association roles to an affine coordinate system, either referencing or containing the definition of that coordinate system. */
interface _AffineCSPropertyType extends _AffineCSProxyType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface AffineCSPropertyType extends _AffineCSPropertyType { constructor: { new(): AffineCSPropertyType }; }
export var AffineCSPropertyType: { new(): AffineCSPropertyType };

interface _AffineCSProxyType extends BaseType {
	/** gml:AffineCS is a two- or three-dimensional coordinate system with straight axes that are not necessarily orthogonal. An AffineCS shall have two or three gml:axis property elements; the number of property elements shall equal the dimension of the CS. */
	AffineCS?: AffineCSType;
	usesAffineCS?: AffineCSPropertyType;
}
interface AffineCSProxyType extends _AffineCSProxyType { constructor: { new(): AffineCSProxyType }; }

interface _AffineCSType extends _AbstractCoordinateSystemType {}
export interface AffineCSType extends _AffineCSType { constructor: { new(): AffineCSType }; }
export var AffineCSType: { new(): AffineCSType };

interface _AffinePlacementType extends BaseType {
	inDimension: number;
	location: DirectPositionType;
	outDimension: number;
	refDirection: VectorType[];
}
export interface AffinePlacementType extends _AffinePlacementType { constructor: { new(): AffinePlacementType }; }
export var AffinePlacementType: { new(): AffinePlacementType };

export type AggregationType = ("set" | "bag" | "sequence" | "array" | "record" | "table");
interface _AggregationType extends Primitive._string { content: AggregationType; }

interface _AnchorDefinitionProxyType extends BaseType {
	/** gml:anchorDefinition is a description, possibly including coordinates, of the definition used to anchor the datum to the Earth. Also known as the "origin", especially for engineering and image datums. The codeSpace attribute may be used to reference a source of more detailed on this point or surface, or on a set of such descriptions.
	  * -	For a geodetic datum, this point is also known as the fundamental point, which is traditionally the point where the relationship between geoid and ellipsoid is defined. In some cases, the "fundamental point" may consist of a number of points. In those cases, the parameters defining the geoid/ellipsoid relationship have been averaged for these points, and the averages adopted as the datum definition.
	  * -	For an engineering datum, the anchor definition may be a physical point, or it may be a point with defined coordinates in another CRS.may
	  * -	For an image datum, the anchor definition is usually either the centre of the image or the corner of the image.
	  * -	For a temporal datum, this attribute is not defined. Instead of the anchor definition, a temporal datum carries a separate time origin of type DateTime. */
	anchorDefinition?: CodeType;
	anchorPoint?: CodeType;
}
interface AnchorDefinitionProxyType extends _AnchorDefinitionProxyType { constructor: { new(): AnchorDefinitionProxyType }; }

interface _AngleChoiceType extends BaseType {
	/** The gml:angle property element is used to record the value of an angle quantity as a single number, with its units. */
	angle: AngleType;
	dmsAngle: DMSAngleType;
}
export interface AngleChoiceType extends _AngleChoiceType { constructor: { new(): AngleChoiceType }; }
export var AngleChoiceType: { new(): AngleChoiceType };

interface _AngleType extends _MeasureType {}
export interface AngleType extends _AngleType { constructor: { new(): AngleType }; }
export var AngleType: { new(): AngleType };

interface _ArcByBulgeType extends _ArcStringByBulgeType {
	numArc: number;
	bulge: number[];
	coordinates: CoordinatesType;
	normal: VectorType[];
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty is the predefined property which may be used by GML Application Schemas whenever a GML feature has a property with a value that is substitutable for Point. */
	pointProperty: PointPropertyType[];
	pointRep: PointPropertyType[];
	pos: DirectPositionType[];
	posList: DirectPositionListType;
}
export interface ArcByBulgeType extends _ArcByBulgeType { constructor: { new(): ArcByBulgeType }; }
export var ArcByBulgeType: { new(): ArcByBulgeType };

interface _ArcByCenterPointProxyType extends BaseType {
	/** This variant of the arc requires that the points on the arc shall be computed instead of storing the coordinates directly. The single control point is the center point of the arc plus the radius and the bearing at start and end. This representation can be used only in 2D.
	  * The element radius specifies the radius of the arc.
	  * The element startAngle specifies the bearing of the arc at the start.
	  * The element endAngle specifies the bearing of the arc at the end.
	  * The interpolation is fixed as "circularArcCenterPointWithRadius".
	  * Since this type describes always a single arc, the attribute "numArc" is fixed to "1".
	  * The content model follows the general pattern for the encoding of curve segments. */
	ArcByCenterPoint?: ArcByCenterPointType;
	/** A gml:CircleByCenterPoint is an gml:ArcByCenterPoint with identical start and end angle to form a full circle. Again, this representation can be used only in 2D. */
	CircleByCenterPoint?: CircleByCenterPointType;
}
interface ArcByCenterPointProxyType extends _ArcByCenterPointProxyType { constructor: { new(): ArcByCenterPointProxyType }; }

interface _ArcByCenterPointType extends _AbstractCurveSegmentType {
	interpolation: CurveInterpolationType;
	numArc: number;
	coordinates: CoordinatesType;
	endAngle?: AngleType;
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty is the predefined property which may be used by GML Application Schemas whenever a GML feature has a property with a value that is substitutable for Point. */
	pointProperty: PointPropertyType;
	pointRep: PointPropertyType;
	pos: DirectPositionType;
	posList: DirectPositionListType;
	radius: LengthType;
	startAngle?: AngleType;
}
export interface ArcByCenterPointType extends _ArcByCenterPointType { constructor: { new(): ArcByCenterPointType }; }
export var ArcByCenterPointType: { new(): ArcByCenterPointType };

export type ArcMinutesType = number;
type _ArcMinutesType = Primitive._number;

interface _ArcProxyType extends BaseType {
	/** An Arc is an arc string with only one arc unit, i.e. three control points including the start and end point. As arc is an arc string consisting of a single arc, the attribute "numArc" is fixed to "1". */
	Arc?: ArcType;
	/** A Circle is an arc whose ends coincide to form a simple closed loop. The three control points shall be distinct non-co-linear points for the circle to be unambiguously defined. The arc is simply extended past the third control point until the first control point is encountered. */
	Circle?: CircleType;
}
interface ArcProxyType extends _ArcProxyType { constructor: { new(): ArcProxyType }; }

export type ArcSecondsType = number;
type _ArcSecondsType = Primitive._number;

interface _ArcStringByBulgeProxyType extends BaseType {
	/** This variant of the arc computes the mid points of the arcs instead of storing the coordinates directly. The control point sequence consists of the start and end points of each arc plus the bulge (see ISO 19107:2003, 6.4.17.2). The normal is a vector normal (perpendicular) to the chord of the arc (see ISO 19107:2003, 6.4.17.4).
	  * The interpolation is fixed as "circularArc2PointWithBulge".
	  * The number of arcs in the arc string may be explicitly stated in the attribute numArc. The number of control points in the arc string shall be numArc + 1.
	  * The content model follows the general pattern for the encoding of curve segments. */
	ArcStringByBulge?: ArcStringByBulgeType;
	/** An ArcByBulge is an arc string with only one arc unit, i.e. two control points, one bulge and one normal vector.
	  * As arc is an arc string consisting of a single arc, the attribute "numArc" is fixed to "1". */
	ArcByBulge?: ArcByBulgeType;
}
interface ArcStringByBulgeProxyType extends _ArcStringByBulgeProxyType { constructor: { new(): ArcStringByBulgeProxyType }; }

interface _ArcStringByBulgeType extends _AbstractCurveSegmentType {
	interpolation: CurveInterpolationType;
	numArc: number;
	bulge: number[];
	coordinates: CoordinatesType;
	normal: VectorType[];
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty is the predefined property which may be used by GML Application Schemas whenever a GML feature has a property with a value that is substitutable for Point. */
	pointProperty: PointPropertyType[];
	pointRep: PointPropertyType[];
	pos: DirectPositionType[];
	posList: DirectPositionListType;
}
export interface ArcStringByBulgeType extends _ArcStringByBulgeType { constructor: { new(): ArcStringByBulgeType }; }
export var ArcStringByBulgeType: { new(): ArcStringByBulgeType };

interface _ArcStringProxyType extends _ArcProxyType {
	/** An ArcString is a curve segment that uses three-point circular arc interpolation ("circularArc3Points"). The number of arcs in the arc string may be explicitly stated in the attribute numArc. The number of control points in the arc string shall be 2 * numArc + 1.
	  * The content model follows the general pattern for the encoding of curve segments. */
	ArcString?: ArcStringType;
}
interface ArcStringProxyType extends _ArcStringProxyType { constructor: { new(): ArcStringProxyType }; }

interface _ArcStringType extends _AbstractCurveSegmentType {
	interpolation: CurveInterpolationType;
	numArc: number;
	coordinates: CoordinatesType;
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty is the predefined property which may be used by GML Application Schemas whenever a GML feature has a property with a value that is substitutable for Point. */
	pointProperty: PointPropertyType[];
	pointRep: PointPropertyType[];
	pos: DirectPositionType[];
	posList: DirectPositionListType;
}
export interface ArcStringType extends _ArcStringType { constructor: { new(): ArcStringType }; }
export var ArcStringType: { new(): ArcStringType };

interface _ArcType extends _ArcStringType {
	numArc: number;
	coordinates: CoordinatesType;
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty is the predefined property which may be used by GML Application Schemas whenever a GML feature has a property with a value that is substitutable for Point. */
	pointProperty: PointPropertyType[];
	pointRep: PointPropertyType[];
	pos: DirectPositionType[];
	posList: DirectPositionListType;
}
export interface ArcType extends _ArcType { constructor: { new(): ArcType }; }
export var ArcType: { new(): ArcType };

interface _AreaType extends _MeasureType {}
export interface AreaType extends _AreaType { constructor: { new(): AreaType }; }
export var AreaType: { new(): AreaType };

interface _ArrayAssociationType extends BaseType {
	owns: boolean;
	/** This element has no type defined, and is therefore implicitly (according to the rules of W3C XML Schema) an XML Schema anyType. It is used as the head of an XML Schema substitution group which unifies complex content and certain simple content elements used for datatypes in GML, including the gml:AbstractGML substitution group. */
	AbstractObject?: AbstractObjectProxyType[];
}
export interface ArrayAssociationType extends _ArrayAssociationType { constructor: { new(): ArrayAssociationType }; }
export var ArrayAssociationType: { new(): ArrayAssociationType };

interface _ArrayType extends _AbstractGMLType {
	members?: ArrayAssociationType;
}
export interface ArrayType extends _ArrayType { constructor: { new(): ArrayType }; }
export var ArrayType: { new(): ArrayType };

interface _AssociationRoleType extends BaseType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface AssociationRoleType extends _AssociationRoleType { constructor: { new(): AssociationRoleType }; }
export var AssociationRoleType: { new(): AssociationRoleType };

/** The value of a gml:AxisDirection indicates the incrementation order to be used on an axis of the grid. */
export type AxisDirection = string;
type _AxisDirection = Primitive._string;

/** The different values in a gml:AxisDirectionList indicate the incrementation order to be used on all axes of the grid. Each axis shall be mentioned once and only once. */
export type AxisDirectionList = string[];

interface _AxisProxyType extends BaseType {
	/** The gml:axis property is an association role (ordered sequence) to the coordinate system axes included in this coordinate system. The coordinate values in a coordinate tuple shall be recorded in the order in which the coordinate system axes associations are recorded, whenever those coordinates use a coordinate reference system that uses this coordinate system. The gml:AggregationAttributeGroup should be used to specify that the axis objects are ordered. */
	axis?: CoordinateSystemAxisPropertyType;
	usesAxis?: CoordinateSystemAxisPropertyType;
}
interface AxisProxyType extends _AxisProxyType { constructor: { new(): AxisProxyType }; }

interface _BagType extends _AbstractGMLType {
	member?: AssociationRoleType[];
	members?: ArrayAssociationType;
}
export interface BagType extends _BagType { constructor: { new(): BagType }; }
export var BagType: { new(): BagType };

interface _BaseUnitType extends _UnitDefinitionType {
	unitsSystem: ReferenceType;
}
export interface BaseUnitType extends _BaseUnitType { constructor: { new(): BaseUnitType }; }
export var BaseUnitType: { new(): BaseUnitType };

interface _BezierType extends _BSplineType {
	interpolation: CurveInterpolationType;
	isPolynomial: boolean;
	knotType: KnotTypesType;
	coordinates: CoordinatesType;
	degree: number;
	knot: KnotPropertyType[];
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty is the predefined property which may be used by GML Application Schemas whenever a GML feature has a property with a value that is substitutable for Point. */
	pointProperty?: PointPropertyType[];
	pointRep?: PointPropertyType[];
	pos?: DirectPositionType[];
	posList: DirectPositionListType;
}
export interface BezierType extends _BezierType { constructor: { new(): BezierType }; }
export var BezierType: { new(): BezierType };

/** A type for a list of values of the respective simple type. */
export type booleanList = boolean[];

/** Extension to the respective XML Schema built-in simple type to allow a choice of either a value of the built-in simple type or a reason for a nil value. */
export type booleanOrNilReason = string;
type _booleanOrNilReason = Primitive._string;

/** A type for a list of values of the respective simple type. */
export type booleanOrNilReasonList = string[];

interface _BooleanPropertyType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	Boolean?: BooleanType;
}
export interface BooleanPropertyType extends _BooleanPropertyType { constructor: { new(): BooleanPropertyType }; }
export var BooleanPropertyType: { new(): BooleanPropertyType };

interface _BooleanType extends Primitive._boolean {
	nilReason: string;
}
interface BooleanType extends _BooleanType { constructor: { new(): BooleanType }; }

interface _BoundedFeatureType extends _AbstractFeatureType, _LocationProxyType {
	/** This property describes the minimum bounding box or rectangle that encloses the entire feature. */
	boundedBy: BoundingShapeType;
	/** The value of this property is a text description of the object. gml:description uses gml:StringOrRefType as its content model, so it may contain a simple text string content, or carry a reference to an external description. The use of gml:description to reference an external description has been deprecated and replaced by the gml:descriptionReference property. */
	description?: StringOrRefType;
	/** The value of this property is a remote text description of the object. The xlink:href attribute of the gml:descriptionReference property references the external description. */
	descriptionReference?: ReferenceType;
	/** Often, a special identifier is assigned to an object by the maintaining authority with the intention that it is used in references to the object For such cases, the codeSpace shall be provided. That identifier is usually unique either globally or within an application domain. gml:identifier is a pre-defined property for such identifiers. */
	identifier?: CodeWithAuthorityType;
	metaDataProperty?: MetaDataPropertyType[];
	/** The gml:name property provides a label or identifier for the object, commonly a descriptive name. An object may have several names, typically assigned by different authorities. gml:name uses the gml:CodeType content model.  The authority for a name is indicated by the value of its (optional) codeSpace attribute.  The name may or may not be unique, as determined by the rules of the organization responsible for the codeSpace.  In common usage there will be one name per authority, so a processing application may select the name from its preferred codeSpace. */
	name?: CodeType[];
}
export interface BoundedFeatureType extends _BoundedFeatureType { constructor: { new(): BoundedFeatureType }; }
export var BoundedFeatureType: { new(): BoundedFeatureType };

interface _BoundingShapeType extends _EnvelopeProxyType {
	nilReason: string;
	Null: string;
}
export interface BoundingShapeType extends _BoundingShapeType { constructor: { new(): BoundingShapeType }; }
export var BoundingShapeType: { new(): BoundingShapeType };

interface _BSplineProxyType extends BaseType {
	/** A B-Spline is a piecewise parametric polynomial or rational curve described in terms of control points and basis functions as specified in ISO 19107:2003, 6.4.30. Therefore, interpolation may be either "polynomialSpline" or "rationalSpline" depending on the interpolation type; default is "polynomialSpline".
	  * degree shall be the degree of the polynomial used for interpolation in this spline.
	  * knot shall be the sequence of distinct knots used to define the spline basis functions (see ISO 19107:2003, 6.4.26.2).
	  * The attribute isPolynomial shall be set to "true" if this is a polynomial spline (see ISO 19107:2003, 6.4.30.5).
	  * The attribute knotType shall provide the type of knot distribution used in defining this spline (see ISO 19107:2003, 6.4.30.4).
	  * The content model follows the general pattern for the encoding of curve segments. */
	BSpline?: BSplineType;
	/** Bezier curves are polynomial splines that use Bezier or Bernstein polynomials for interpolation purposes. It is a special case of the B-Spline curve with two knots.
	  * degree shall be the degree of the polynomial used for interpolation in this spline.
	  * knot shall be the sequence of distinct knots used to define the spline basis functions.
	  * interpolation is fixed as "polynomialSpline".
	  * isPolynomial is fixed as "true".
	  * knotType is not relevant for Bezier curve segments. */
	Bezier?: BezierType;
}
interface BSplineProxyType extends _BSplineProxyType { constructor: { new(): BSplineProxyType }; }

interface _BSplineType extends _AbstractCurveSegmentType {
	interpolation: CurveInterpolationType;
	isPolynomial: boolean;
	knotType: KnotTypesType;
	coordinates: CoordinatesType;
	degree: number;
	knot: KnotPropertyType[];
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty is the predefined property which may be used by GML Application Schemas whenever a GML feature has a property with a value that is substitutable for Point. */
	pointProperty?: PointPropertyType[];
	pointRep?: PointPropertyType[];
	pos?: DirectPositionType[];
	posList: DirectPositionListType;
}
export interface BSplineType extends _BSplineType { constructor: { new(): BSplineType }; }
export var BSplineType: { new(): BSplineType };

export type CalDate = string;
type _CalDate = Primitive._string;

/** gml:CartesianCSPropertyType is a property type for association roles to a Cartesian coordinate system, either referencing or containing the definition of that coordinate system. */
interface _CartesianCSPropertyType extends _CartesianCSProxyType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface CartesianCSPropertyType extends _CartesianCSPropertyType { constructor: { new(): CartesianCSPropertyType }; }
export var CartesianCSPropertyType: { new(): CartesianCSPropertyType };

interface _CartesianCSProxyType extends BaseType {
	/** gml:CartesianCS is a 1-, 2-, or 3-dimensional coordinate system. In the 1-dimensional case, it contains a single straight coordinate axis. In the 2- and 3-dimensional cases gives the position of points relative to orthogonal straight axes. In the multi-dimensional case, all axes shall have the same length unit of measure. A CartesianCS shall have one, two, or three gml:axis property elements. */
	CartesianCS?: CartesianCSType;
	usesCartesianCS?: CartesianCSPropertyType;
}
interface CartesianCSProxyType extends _CartesianCSProxyType { constructor: { new(): CartesianCSProxyType }; }

interface _CartesianCSType extends _AbstractCoordinateSystemType {}
export interface CartesianCSType extends _CartesianCSType { constructor: { new(): CartesianCSType }; }
export var CartesianCSType: { new(): CartesianCSType };

export type CategoryExtentType = string[];

interface _CategoryPropertyType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** A gml:Category has an optional XML attribute codeSpace, whose value is a URI which identifies a dictionary, codelist or authority for the term. */
	Category?: CategoryType;
}
export interface CategoryPropertyType extends _CategoryPropertyType { constructor: { new(): CategoryPropertyType }; }
export var CategoryPropertyType: { new(): CategoryPropertyType };

interface _CategoryType extends _CodeType {
	nilReason: string;
}
interface CategoryType extends _CategoryType { constructor: { new(): CategoryType }; }

interface _CircleByCenterPointType extends _ArcByCenterPointType {
	coordinates: CoordinatesType;
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty is the predefined property which may be used by GML Application Schemas whenever a GML feature has a property with a value that is substitutable for Point. */
	pointProperty: PointPropertyType;
	pointRep: PointPropertyType;
	pos: DirectPositionType;
	posList: DirectPositionListType;
	radius: LengthType;
}
export interface CircleByCenterPointType extends _CircleByCenterPointType { constructor: { new(): CircleByCenterPointType }; }
export var CircleByCenterPointType: { new(): CircleByCenterPointType };

interface _CircleType extends _ArcType {}
export interface CircleType extends _CircleType { constructor: { new(): CircleType }; }
export var CircleType: { new(): CircleType };

interface _ClothoidType extends _AbstractCurveSegmentType {
	interpolation: CurveInterpolationType;
	endParameter: number;
	refLocation: ClothoidTypeRefLocationType;
	scaleFactor: number;
	startParameter: number;
}
export interface ClothoidType extends _ClothoidType { constructor: { new(): ClothoidType }; }
export var ClothoidType: { new(): ClothoidType };

interface _ClothoidTypeRefLocationType extends BaseType {
	/** location, refDirection, inDimension and outDimension have the same meaning as specified in ISO 19107:2003, 6.4.21. */
	AffinePlacement: AffinePlacementType;
}
interface ClothoidTypeRefLocationType extends _ClothoidTypeRefLocationType { constructor: { new(): ClothoidTypeRefLocationType }; }

/** gml:CodeListType provides for lists of terms. The values in an instance element shall all be valid according to the rules of the dictionary, classification scheme, or authority identified by the value of its codeSpace attribute. */
export type CodeListType = string[];

/** gml:CodeOrNilReasonListType provides for lists of terms. The values in an instance element shall all be valid according to the rules of the dictionary, classification scheme, or authority identified by the value of its codeSpace attribute. An instance element may also include embedded values from NilReasonType. It is intended to be used in situations where a term or classification is expected, but the value may be absent for some reason. */
export type CodeOrNilReasonListType = string[];

/** gml:CodeType is a generalized type to be used for a term, keyword or name.
  * It adds a XML attribute codeSpace to a term, where the value of the codeSpace attribute (if present) shall indicate a dictionary, thesaurus, classification scheme, authority, or pattern for the term. */
interface _CodeType extends Primitive._string {
	codeSpace: string;
}
export interface CodeType extends _CodeType { constructor: { new(): CodeType }; }
export var CodeType: { new(): CodeType };

/** gml:CodeWithAuthorityType requires that the codeSpace attribute is provided in an instance. */
interface _CodeWithAuthorityType extends _CodeType {
	codeSpace: string;
}
export interface CodeWithAuthorityType extends _CodeWithAuthorityType { constructor: { new(): CodeWithAuthorityType }; }
export var CodeWithAuthorityType: { new(): CodeWithAuthorityType };

/** These directions are necessarily approximate, giving direction with a precision of 22.5°. It is thus generally unnecessary to specify the reference frame, though this may be detailed in the definition of a GML application language. */
export type CompassPointEnumeration = ("N" | "NNE" | "NE" | "ENE" | "E" | "ESE" | "SE" | "SSE" | "S" | "SSW" | "SW" | "WSW" | "W" | "WNW" | "NW" | "NNW");
interface _CompassPointEnumeration extends Primitive._string { content: CompassPointEnumeration; }

interface _ComponentReferenceSystemProxyType extends BaseType {
	/** The gml:componentReferenceSystem elements are an ordered sequence of associations to all the component coordinate reference systems included in this compound coordinate reference system. The gml:AggregationAttributeGroup should be used to specify that the gml:componentReferenceSystem properties are ordered. */
	componentReferenceSystem?: SingleCRSPropertyType;
	includesSingleCRS?: SingleCRSPropertyType;
}
interface ComponentReferenceSystemProxyType extends _ComponentReferenceSystemProxyType { constructor: { new(): ComponentReferenceSystemProxyType }; }

interface _CompositeCurveType extends _AbstractCurveType {
	aggregationType: AggregationType;
	curveMember: CurvePropertyType[];
}
export interface CompositeCurveType extends _CompositeCurveType { constructor: { new(): CompositeCurveType }; }
export var CompositeCurveType: { new(): CompositeCurveType };

interface _CompositeSolidType extends _AbstractSolidType {
	aggregationType: AggregationType;
	/** This property element either references a solid via the XLink-attributes or contains the solid element. A solid element is any element, which is substitutable for gml:AbstractSolid. */
	solidMember: SolidPropertyType[];
}
export interface CompositeSolidType extends _CompositeSolidType { constructor: { new(): CompositeSolidType }; }
export var CompositeSolidType: { new(): CompositeSolidType };

interface _CompositeSurfaceType extends _AbstractSurfaceType {
	aggregationType: AggregationType;
	/** This property element either references a surface via the XLink-attributes or contains the surface element. A surface element is any element, which is substitutable for gml:AbstractSurface. */
	surfaceMember: SurfacePropertyType[];
}
export interface CompositeSurfaceType extends _CompositeSurfaceType { constructor: { new(): CompositeSurfaceType }; }
export var CompositeSurfaceType: { new(): CompositeSurfaceType };

interface _CompositeValueProxyType extends BaseType {
	/** gml:CompositeValue is an aggregate value built from other values . It contains zero or an arbitrary number of gml:valueComponent elements, and zero or one gml:valueComponents property elements.  It may be used for strongly coupled aggregates (vectors, tensors) or for arbitrary collections of values. */
	CompositeValue?: CompositeValueType;
	/** A Value Array is used for homogeneous arrays of primitive and aggregate values.
	  * The member values may be scalars, composites, arrays or lists.
	  * ValueArray has the same content model as CompositeValue, but the member values shall be homogeneous.  The element declaration contains a Schematron constraint which expresses this restriction precisely.  Since the members are homogeneous, the gml:referenceSystem (uom, codeSpace) may be specified on the gml:ValueArray itself and inherited by all the members if desired. */
	ValueArray?: ValueArrayType;
}
interface CompositeValueProxyType extends _CompositeValueProxyType { constructor: { new(): CompositeValueProxyType }; }

interface _CompositeValueType extends _AbstractGMLType {
	aggregationType: AggregationType;
	/** Property that refers to, or contains, a Value. */
	valueComponent?: ValuePropertyType[];
	/** Property that contains Values. */
	valueComponents?: ValueArrayPropertyType;
}
export interface CompositeValueType extends _CompositeValueType { constructor: { new(): CompositeValueType }; }
export var CompositeValueType: { new(): CompositeValueType };

/** gml:CompoundCRSPropertyType is a property type for association roles to a compound coordinate reference system, either referencing or containing the definition of that reference system. */
interface _CompoundCRSPropertyType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** gml:CompundCRS is a coordinate reference system describing the position of points through two or more independent coordinate reference systems. It is associated with a non-repeating sequence of two or more instances of SingleCRS. */
	CompoundCRS?: CompoundCRSType;
}
export interface CompoundCRSPropertyType extends _CompoundCRSPropertyType { constructor: { new(): CompoundCRSPropertyType }; }
export var CompoundCRSPropertyType: { new(): CompoundCRSPropertyType };

interface _CompoundCRSType extends _AbstractCRSType {
	aggregationType: AggregationType;
	/** The gml:componentReferenceSystem elements are an ordered sequence of associations to all the component coordinate reference systems included in this compound coordinate reference system. The gml:AggregationAttributeGroup should be used to specify that the gml:componentReferenceSystem properties are ordered. */
	componentReferenceSystem: ComponentReferenceSystemProxyType[];
}
export interface CompoundCRSType extends _CompoundCRSType { constructor: { new(): CompoundCRSType }; }
export var CompoundCRSType: { new(): CompoundCRSType };

/** gml:ConcatenatedOperationPropertyType is a property type for association roles to a concatenated operation, either referencing or containing the definition of that concatenated operation. */
interface _ConcatenatedOperationPropertyType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	ConcatenatedOperation?: ConcatenatedOperationType;
}
export interface ConcatenatedOperationPropertyType extends _ConcatenatedOperationPropertyType { constructor: { new(): ConcatenatedOperationPropertyType }; }
export var ConcatenatedOperationPropertyType: { new(): ConcatenatedOperationPropertyType };

/** gml:ConcatenatedOperation is an ordered sequence of two or more coordinate operations. This sequence of operations is constrained by the requirement that the source coordinate reference system of step (n+1) must be the same as the target coordinate reference system of step (n). The source coordinate reference system of the first step and the target coordinate reference system of the last step are the source and target coordinate reference system associated with the concatenated operation. Instead of a forward operation, an inverse operation may be used for one or more of the operation steps mentioned above, if the inverse operation is uniquely defined by the forward operation.
  * The gml:coordOperation property elements are an ordered sequence of associations to the two or more operations used by this concatenated operation. The AggregationAttributeGroup should be used to specify that the coordOperation associations are ordered. */
interface _ConcatenatedOperationType extends _AbstractCoordinateOperationType {
	aggregationType: AggregationType;
	/** gml:coordOperation is an association role to a coordinate operation. */
	coordOperation: CoordOperationProxyType[];
}
export interface ConcatenatedOperationType extends _ConcatenatedOperationType { constructor: { new(): ConcatenatedOperationType }; }
export var ConcatenatedOperationType: { new(): ConcatenatedOperationType };

interface _ConeType extends _AbstractGriddedSurfaceType {
	horizontalCurveType: CurveInterpolationType;
	verticalCurveType: CurveInterpolationType;
}
export interface ConeType extends _ConeType { constructor: { new(): ConeType }; }
export var ConeType: { new(): ConeType };

interface _ConventionalUnitType extends _UnitDefinitionType {
	/** The elements gml:conversionToPreferredUnit and gml:roughConversionToPreferredUnit represent parameters used to convert conventional units to preferred units for this physical quantity type.  A preferred unit is either a Base Unit or a Derived Unit that is selected for all values of one physical quantity type. */
	conversionToPreferredUnit: ConversionToPreferredUnitType;
	/** A set of gml:derivationUnitTerm elements describes a derived unit of measure.  Each element carries an integer exponent.  The terms are combined by raising each referenced unit to the power of its exponent and forming the product.
	  * This unit term references another unit of measure (uom) and provides an integer exponent applied to that unit in defining the compound unit. The exponent may be positive or negative, but not zero. */
	derivationUnitTerm?: DerivationUnitTermType[];
	/** The elements gml:conversionToPreferredUnit and gml:roughConversionToPreferredUnit represent parameters used to convert conventional units to preferred units for this physical quantity type.  A preferred unit is either a Base Unit or a Derived Unit that is selected for all values of one physical quantity type. */
	roughConversionToPreferredUnit: ConversionToPreferredUnitType;
}
export interface ConventionalUnitType extends _ConventionalUnitType { constructor: { new(): ConventionalUnitType }; }
export var ConventionalUnitType: { new(): ConventionalUnitType };

/** gml:ConversionPropertyType is a property type for association roles to a concrete general-purpose conversion, either referencing or containing the definition of that conversion. */
interface _ConversionPropertyType extends _ConversionProxyType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface ConversionPropertyType extends _ConversionPropertyType { constructor: { new(): ConversionPropertyType }; }
export var ConversionPropertyType: { new(): ConversionPropertyType };

interface _ConversionProxyType extends BaseType {
	/** gml:Conversion is a concrete operation on coordinates that does not include any change of Datum. The best-known example of a coordinate conversion is a map projection. The parameters describing coordinate conversions are defined rather than empirically derived. Note that some conversions have no parameters.
	  * This concrete complex type can be used without using a GML Application Schema that defines operation-method-specialized element names and contents, especially for methods with only one Conversion instance.
	  * The usesValue property elements are an unordered list of composition associations to the set of parameter values used by this conversion operation. */
	Conversion?: ConversionType;
	definedByConversion?: GeneralConversionPropertyType;
}
interface ConversionProxyType extends _ConversionProxyType { constructor: { new(): ConversionProxyType }; }

/** The inherited attribute uom references the preferred unit that this conversion applies to. The conversion of a unit to the preferred unit for this physical quantity type is specified by an arithmetic conversion (scaling and/or offset). The content model extends gml:UnitOfMeasureType, which has a mandatory attribute uom which identifies the preferred unit for the physical quantity type that this conversion applies to. The conversion is specified by a choice of
  * -	gml:factor, which defines the scale factor, or
  * -	gml:formula, which defines a formula
  * by which a value using the conventional unit of measure can be converted to obtain the corresponding value using the preferred unit of measure.
  * The formula defines the parameters of a simple formula by which a value using the conventional unit of measure can be converted to the corresponding value using the preferred unit of measure. The formula element contains elements a, b, c and d, whose values use the XML Schema type double. These values are used in the formula y = (a + bx) / (c + dx), where x is a value using this unit, and y is the corresponding value using the base unit. The elements a and d are optional, and if values are not provided, those parameters are considered to be zero. If values are not provided for both a and d, the formula is equivalent to a fraction with numerator and denominator parameters. */
interface _ConversionToPreferredUnitType extends _UnitOfMeasureType {
	factor: number;
	formula: FormulaType;
}
export interface ConversionToPreferredUnitType extends _ConversionToPreferredUnitType { constructor: { new(): ConversionToPreferredUnitType }; }
export var ConversionToPreferredUnitType: { new(): ConversionToPreferredUnitType };

interface _ConversionType extends _AbstractGeneralConversionType, _MethodProxyType {
	/** gml:ParameterValue is a parameter value, an ordered sequence of values, or a reference to a file of parameter values. This concrete complex type may be used for operation methods without using an Application Schema that defines operation-method-specialized element names and contents, especially for methods with only one instance. This complex type may be used, extended, or restricted for well-known operation methods, especially for methods with many instances. */
	ParameterValue?: ParameterValueProxyType[];
}
export interface ConversionType extends _ConversionType { constructor: { new(): ConversionType }; }
export var ConversionType: { new(): ConversionType };

interface _CoordinateOperationAccuracyType extends gmd._AbstractDQ_PositionalAccuracyProxyType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
interface CoordinateOperationAccuracyType extends _CoordinateOperationAccuracyType { constructor: { new(): CoordinateOperationAccuracyType }; }

/** gml:CoordinateOperationPropertyType is a property type for association roles to a coordinate operation, either referencing or containing the definition of that coordinate operation. */
interface _CoordinateOperationPropertyType extends _AbstractCoordinateOperationProxyType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface CoordinateOperationPropertyType extends _CoordinateOperationPropertyType { constructor: { new(): CoordinateOperationPropertyType }; }
export var CoordinateOperationPropertyType: { new(): CoordinateOperationPropertyType };

/** This type is deprecated for tuples with ordinate values that are numbers.
  * CoordinatesType is a text string, intended to be used to record an array of tuples or coordinates.
  * While it is not possible to enforce the internal structure of the string through schema validation, some optional attributes have been provided in previous versions of GML to support a description of the internal structure. These attributes are deprecated. The attributes were intended to be used as follows:
  * Decimal	symbol used for a decimal point (default="." a stop or period)
  * cs        	symbol used to separate components within a tuple or coordinate string (default="," a comma)
  * ts        	symbol used to separate tuples or coordinate strings (default=" " a space)
  * Since it is based on the XML Schema string type, CoordinatesType may be used in the construction of tables of tuples or arrays of tuples, including ones that contain mixed text and numeric values. */
interface _CoordinatesType extends Primitive._string {
	cs: string;
	decimal: string;
	ts: string;
}
export interface CoordinatesType extends _CoordinatesType { constructor: { new(): CoordinatesType }; }
export var CoordinatesType: { new(): CoordinatesType };

/** gml:CoordinateSystemAxisPropertyType is a property type for association roles to a coordinate system axis, either referencing or containing the definition of that axis. */
interface _CoordinateSystemAxisPropertyType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** gml:CoordinateSystemAxis is a definition of a coordinate system axis. */
	CoordinateSystemAxis?: CoordinateSystemAxisType;
}
export interface CoordinateSystemAxisPropertyType extends _CoordinateSystemAxisPropertyType { constructor: { new(): CoordinateSystemAxisPropertyType }; }
export var CoordinateSystemAxisPropertyType: { new(): CoordinateSystemAxisPropertyType };

interface _CoordinateSystemAxisType extends _IdentifiedObjectType {
	/** The uom attribute provides an identifier of the unit of measure used for this coordinate system axis. The value of this coordinate in a coordinate tuple shall be recorded using this unit of measure, whenever those coordinates use a coordinate reference system that uses a coordinate system that uses this axis. */
	uom: string;
	/** gml:axisAbbrev is the abbreviation used for this coordinate system axis; this abbreviation is also used to identify the coordinates in the coordinate tuple. The codeSpace attribute may reference a source of more information on a set of standardized abbreviations, or on this abbreviation. */
	axisAbbrev: CodeType;
	/** gml:axisDirection is the direction of this coordinate system axis (or in the case of Cartesian projected coordinates, the direction of this coordinate system axis at the origin).
	  * Within any set of coordinate system axes, only one of each pair of terms may be used. For earth-fixed CRSs, this direction is often approximate and intended to provide a human interpretable meaning to the axis. When a geodetic datum is used, the precise directions of the axes may therefore vary slightly from this approximate direction.
	  * The codeSpace attribute shall reference a source of information specifying the values and meanings of all the allowed string values for this property. */
	axisDirection: CodeWithAuthorityType;
	/** The gml:minimumValue and gml:maximumValue properties allow the specification of minimum and maximum value normally allowed for this axis, in the unit of measure for the axis. For a continuous angular axis such as longitude, the values wrap-around at this value. Also, values beyond this minimum/maximum can be used for specified purposes, such as in a bounding box. A value of minus infinity shall be allowed for the gml:minimumValue element, a value of plus infiniy for the gml:maximumValue element. If these elements are omitted, the value is unspecified. */
	maximumValue?: number;
	/** The gml:minimumValue and gml:maximumValue properties allow the specification of minimum and maximum value normally allowed for this axis, in the unit of measure for the axis. For a continuous angular axis such as longitude, the values wrap-around at this value. Also, values beyond this minimum/maximum can be used for specified purposes, such as in a bounding box. A value of minus infinity shall be allowed for the gml:minimumValue element, a value of plus infiniy for the gml:maximumValue element. If these elements are omitted, the value is unspecified. */
	minimumValue?: number;
	/** gml:rangeMeaning describes the meaning of axis value range specified by gml:minimumValue and gml:maximumValue. This element shall be omitted when both gml:minimumValue and gml:maximumValue are omitted. This element should be included when gml:minimumValue and/or gml:maximumValue are included. If this element is omitted when the gml:minimumValue and/or gml:maximumValue are included, the meaning is unspecified. The codeSpace attribute shall reference a source of information specifying the values and meanings of all the allowed string values for this property. */
	rangeMeaning?: CodeWithAuthorityType;
}
export interface CoordinateSystemAxisType extends _CoordinateSystemAxisType { constructor: { new(): CoordinateSystemAxisType }; }
export var CoordinateSystemAxisType: { new(): CoordinateSystemAxisType };

/** gml:CoordinateSystemPropertyType is a property type for association roles to a coordinate system, either referencing or containing the definition of that coordinate system. */
interface _CoordinateSystemPropertyType extends _AbstractCoordinateSystemProxyType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface CoordinateSystemPropertyType extends _CoordinateSystemPropertyType { constructor: { new(): CoordinateSystemPropertyType }; }
export var CoordinateSystemPropertyType: { new(): CoordinateSystemPropertyType };

interface _CoordinateSystemProxyType extends BaseType {
	/** An association role to the coordinate system used by this CRS. */
	coordinateSystem?: CoordinateSystemPropertyType;
	usesCS?: CoordinateSystemPropertyType;
}
interface CoordinateSystemProxyType extends _CoordinateSystemProxyType { constructor: { new(): CoordinateSystemProxyType }; }

interface _CoordOperationProxyType extends BaseType {
	/** gml:coordOperation is an association role to a coordinate operation. */
	coordOperation?: CoordinateOperationPropertyType;
	usesOperation?: CoordinateOperationPropertyType;
	usesSingleOperation?: CoordinateOperationPropertyType;
}
interface CoordOperationProxyType extends _CoordOperationProxyType { constructor: { new(): CoordOperationProxyType }; }

export type CountExtentType = string[];

interface _CountPropertyType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	Count?: CountType;
}
export interface CountPropertyType extends _CountPropertyType { constructor: { new(): CountPropertyType }; }
export var CountPropertyType: { new(): CountPropertyType };

interface _CountType extends Primitive._number {
	nilReason: string;
}
interface CountType extends _CountType { constructor: { new(): CountType }; }

interface _CoverageFunctionType extends BaseType {
	/** gml:CoverageMappingRule provides a formal or informal description of the coverage function.
	  * The mapping rule may be defined as an in-line string (gml:ruleDefinition) or via a remote reference through xlink:href (gml:ruleReference).
	  * If no rule name is specified, the default is 'Linear' with respect to members of the domain in document order. */
	CoverageMappingRule: MappingRuleType;
	/** gml:GridFunction provides an explicit mapping rule for grid geometries, i.e. the domain shall be a geometry of type grid.  It describes the mapping of grid posts (discrete point grid coverage) or grid cells (discrete surface coverage) to the values in the range set.
	  * The gml:startPoint is the index position of a point in the grid that is mapped to the first point in the range set (this is also the index position of the first grid post).  If the gml:startPoint property is omitted the gml:startPoint is assumed to be equal to the value of gml:low in the gml:Grid geometry. Subsequent points in the mapping are determined by the value of the gml:sequenceRule. */
	GridFunction: GridFunctionType;
	MappingRule: StringOrRefType;
}
export interface CoverageFunctionType extends _CoverageFunctionType { constructor: { new(): CoverageFunctionType }; }
export var CoverageFunctionType: { new(): CoverageFunctionType };

/** gml:CRSPropertyType is a property type for association roles to a CRS abstract coordinate reference system, either referencing or containing the definition of that CRS. */
interface _CRSPropertyType extends _AbstractCRSProxyType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface CRSPropertyType extends _CRSPropertyType { constructor: { new(): CRSPropertyType }; }
export var CRSPropertyType: { new(): CRSPropertyType };

interface _CubicSplineType extends _AbstractCurveSegmentType {
	degree: number;
	interpolation: CurveInterpolationType;
	coordinates: CoordinatesType;
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty is the predefined property which may be used by GML Application Schemas whenever a GML feature has a property with a value that is substitutable for Point. */
	pointProperty: PointPropertyType[];
	pointRep: PointPropertyType[];
	pos: DirectPositionType[];
	posList: DirectPositionListType;
	vectorAtEnd: VectorType;
	vectorAtStart: VectorType;
}
export interface CubicSplineType extends _CubicSplineType { constructor: { new(): CubicSplineType }; }
export var CubicSplineType: { new(): CubicSplineType };

/** A container for an array of curves. The elements are always contained in the array property, referencing geometry elements or arrays of geometry elements via XLinks is not supported. */
interface _CurveArrayPropertyType extends BaseType {
	owns: boolean;
	/** The AbstractCurve element is the abstract head of the substitution group for all (continuous) curve elements. */
	AbstractCurve?: AbstractCurveProxyType[];
}
export interface CurveArrayPropertyType extends _CurveArrayPropertyType { constructor: { new(): CurveArrayPropertyType }; }
export var CurveArrayPropertyType: { new(): CurveArrayPropertyType };

/** gml:CurveInterpolationType is a list of codes that may be used to identify the interpolation mechanisms specified by an application schema. */
export type CurveInterpolationType = ("linear" | "geodesic" | "circularArc3Points" | "circularArc2PointWithBulge" | "circularArcCenterPointWithRadius" | "elliptical" | "clothoid" | "conic" | "polynomialSpline" | "cubicSpline" | "rationalSpline");
interface _CurveInterpolationType extends Primitive._string { content: CurveInterpolationType; }

/** A property that has a curve as its value domain may either be an appropriate geometry element encapsulated in an element of this type or an XLink reference to a remote geometry element (where remote includes geometry elements located elsewhere in the same document). Either the reference or the contained element shall be given, but neither both nor none. */
interface _CurvePropertyType extends _AbstractCurveProxyType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface CurvePropertyType extends _CurvePropertyType { constructor: { new(): CurvePropertyType }; }
export var CurvePropertyType: { new(): CurvePropertyType };

/** gml:CurveSegmentArrayPropertyType is a container for an array of curve segments. */
interface _CurveSegmentArrayPropertyType extends BaseType {
	/** A curve segment defines a homogeneous segment of a curve.
	  * The attributes numDerivativesAtStart, numDerivativesAtEnd and numDerivativesInterior specify the type of continuity as specified in ISO 19107:2003, 6.4.9.3.
	  * The AbstractCurveSegment element is the abstract head of the substituition group for all curve segment elements, i.e. continuous segments of the same interpolation mechanism.
	  * All curve segments shall have an attribute interpolation with type gml:CurveInterpolationType specifying the curve interpolation mechanism used for this segment. This mechanism uses the control points and control parameters to determine the position of this curve segment. */
	AbstractCurveSegment?: AbstractCurveSegmentProxyType[];
}
export interface CurveSegmentArrayPropertyType extends _CurveSegmentArrayPropertyType { constructor: { new(): CurveSegmentArrayPropertyType }; }
export var CurveSegmentArrayPropertyType: { new(): CurveSegmentArrayPropertyType };

interface _CurveType extends _AbstractCurveType {
	/** This property element contains a list of curve segments. The order of the elements is significant and shall be preserved when processing the array. */
	segments: CurveSegmentArrayPropertyType;
}
export interface CurveType extends _CurveType { constructor: { new(): CurveType }; }
export var CurveType: { new(): CurveType };

interface _CylinderType extends _AbstractGriddedSurfaceType {
	horizontalCurveType: CurveInterpolationType;
	verticalCurveType: CurveInterpolationType;
}
export interface CylinderType extends _CylinderType { constructor: { new(): CylinderType }; }
export var CylinderType: { new(): CylinderType };

/** gml:CylindricalCSPropertyType is a property type for association roles to a cylindrical coordinate system, either referencing or containing the definition of that coordinate system. */
interface _CylindricalCSPropertyType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** gml:CylindricalCS is a three-dimensional coordinate system consisting of a polar coordinate system extended by a straight coordinate axis perpendicular to the plane spanned by the polar coordinate system. A CylindricalCS shall have three gml:axis property elements. */
	CylindricalCS?: CylindricalCSType;
}
export interface CylindricalCSPropertyType extends _CylindricalCSPropertyType { constructor: { new(): CylindricalCSPropertyType }; }
export var CylindricalCSPropertyType: { new(): CylindricalCSPropertyType };

interface _CylindricalCSType extends _AbstractCoordinateSystemType {}
export interface CylindricalCSType extends _CylindricalCSType { constructor: { new(): CylindricalCSType }; }
export var CylindricalCSType: { new(): CylindricalCSType };

interface _DataBlockType extends BaseType {
	/** gml:doubleOrNilReasonList consists of a list of gml:doubleOrNilReason values, each separated by a whitespace. The gml:doubleOrNilReason values are grouped into tuples where the dimension of each tuple in the list is equal to the number of range parameters. */
	doubleOrNilReasonTupleList: doubleOrNilReasonList;
	rangeParameters: AssociationRoleType;
	/** gml:CoordinatesType consists of a list of coordinate tuples, with each coordinate tuple separated by the ts or tuple separator (whitespace), and each coordinate in the tuple by the cs or coordinate separator (comma).
	  * The gml:tupleList encoding is effectively "band-interleaved". */
	tupleList: CoordinatesType;
}
export interface DataBlockType extends _DataBlockType { constructor: { new(): DataBlockType }; }
export var DataBlockType: { new(): DataBlockType };

/** gml:DatumPropertyType is a property type for association roles to a datum, either referencing or containing the definition of that datum. */
interface _DatumPropertyType extends _AbstractDatumProxyType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface DatumPropertyType extends _DatumPropertyType { constructor: { new(): DatumPropertyType }; }
export var DatumPropertyType: { new(): DatumPropertyType };

export type DecimalMinutesType = number;
type _DecimalMinutesType = Primitive._number;

interface _DefinitionBaseType extends _AbstractGMLType {
	/** The attribute gml:id supports provision of a handle for the XML element representing a GML Object. Its use is mandatory for all GML objects. It is of XML type ID, so is constrained to be unique in the XML document within which it occurs. */
	id: string;
	/** The value of this property is a text description of the object. gml:description uses gml:StringOrRefType as its content model, so it may contain a simple text string content, or carry a reference to an external description. The use of gml:description to reference an external description has been deprecated and replaced by the gml:descriptionReference property. */
	description?: StringOrRefType;
	/** The value of this property is a remote text description of the object. The xlink:href attribute of the gml:descriptionReference property references the external description. */
	descriptionReference?: ReferenceType;
	/** Often, a special identifier is assigned to an object by the maintaining authority with the intention that it is used in references to the object For such cases, the codeSpace shall be provided. That identifier is usually unique either globally or within an application domain. gml:identifier is a pre-defined property for such identifiers. */
	identifier: CodeWithAuthorityType;
	metaDataProperty?: MetaDataPropertyType[];
	/** The gml:name property provides a label or identifier for the object, commonly a descriptive name. An object may have several names, typically assigned by different authorities. gml:name uses the gml:CodeType content model.  The authority for a name is indicated by the value of its (optional) codeSpace attribute.  The name may or may not be unique, as determined by the rules of the organization responsible for the codeSpace.  In common usage there will be one name per authority, so a processing application may select the name from its preferred codeSpace. */
	name?: CodeType[];
}
export interface DefinitionBaseType extends _DefinitionBaseType { constructor: { new(): DefinitionBaseType }; }
export var DefinitionBaseType: { new(): DefinitionBaseType };

interface _DefinitionProxyType extends _DefinitionType {
	definitionRef: ReferenceType;
}
export interface DefinitionProxyType extends _DefinitionProxyType { constructor: { new(): DefinitionProxyType }; }
export var DefinitionProxyType: { new(): DefinitionProxyType };

interface _DefinitionProxyType_2 extends _AbstractCoordinateSystemProxyType, _AbstractDatumProxyType, _EllipsoidProxyType, _PrimeMeridianProxyType, _AbstractCoordinateOperationProxyType, _AbstractGeneralOperationParameterProxyType, _AbstractCRSProxyType, _TimeReferenceSystemProxyType, _UnitDefinitionProxyType {
	/** The basic gml:Definition element specifies a definition, which can be included in or referenced by a dictionary.
	  * The content model for a generic definition is a derivation from gml:AbstractGMLType.
	  * The gml:description property element shall hold the definition if this can be captured in a simple text string, or the gml:descriptionReference property element may carry a link to a description elsewhere.
	  * The gml:identifier element shall provide one identifier identifying this definition. The identifier shall be unique within the dictionaries using this definition.
	  * The gml:name elements shall provide zero or more terms and synonyms for which this is the definition.
	  * The gml:remarks element shall be used to hold additional textual information that is not conceptually part of the definition but is useful in understanding the definition. */
	Definition?: DefinitionType;
	DefinitionProxy?: DefinitionProxyType;
	/** gml:CoordinateSystemAxis is a definition of a coordinate system axis. */
	CoordinateSystemAxis?: CoordinateSystemAxisType;
	/** gml:OperationMethod is a method (algorithm or procedure) used to perform a coordinate operation. Most operation methods use a number of operation parameters, although some coordinate conversions use none. Each coordinate operation using the method assigns values to these parameters.
	  * The parameter elements are an unordered list of associations to the set of operation parameters and parameter groups used by this operation method. */
	OperationMethod?: OperationMethodType;
	DefinitionCollection?: DictionaryType;
	/** Sets of definitions may be collected into dictionaries or collections.
	  * A gml:Dictionary is a non-abstract collection of definitions.
	  * The gml:Dictionary content model adds a list of gml:dictionaryEntry properties that contain or reference gml:Definition objects.  A database handle (gml:id attribute) is required, in order that this collection may be referred to. The standard gml:identifier, gml:description, gml:descriptionReference and gml:name properties are available to reference or contain more information about this dictionary. The gml:description and gml:descriptionReference property elements may be used for a description of this dictionary. The derived gml:name element may be used for the name(s) of this dictionary. for remote definiton references gml:dictionaryEntry shall be used. If a Definition object contained within a Dictionary uses the descriptionReference property to refer to a remote definition, then this enables the inclusion of a remote definition in a local dictionary, giving a handle and identifier in the context of the local dictionary. */
	Dictionary?: DictionaryType;
}
interface DefinitionProxyType_2 extends _DefinitionProxyType_2 { constructor: { new(): DefinitionProxyType_2 }; }

interface _DefinitionType extends _DefinitionBaseType {
	remarks?: string;
}
export interface DefinitionType extends _DefinitionType { constructor: { new(): DefinitionType }; }
export var DefinitionType: { new(): DefinitionType };

interface _DegreesType extends _DegreeValueType {
	direction: DegreesTypeDirectionType;
}
export interface DegreesType extends _DegreesType { constructor: { new(): DegreesType }; }
export var DegreesType: { new(): DegreesType };

type DegreesTypeDirectionType = ("N" | "E" | "S" | "W" | "+" | "-");
interface _DegreesTypeDirectionType extends Primitive._string { content: DegreesTypeDirectionType; }

export type DegreeValueType = number;
type _DegreeValueType = Primitive._number;

interface _DerivationUnitTermType extends _UnitOfMeasureType {
	exponent: number;
}
export interface DerivationUnitTermType extends _DerivationUnitTermType { constructor: { new(): DerivationUnitTermType }; }
export var DerivationUnitTermType: { new(): DerivationUnitTermType };

/** gml:DerivedCRSPropertyType is a property type for association roles to a non-projected derived coordinate reference system, either referencing or containing the definition of that reference system. */
interface _DerivedCRSPropertyType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** gml:DerivedCRS is a single coordinate reference system that is defined by its coordinate conversion from another single coordinate reference system known as the base CRS. The base CRS can be a projected coordinate reference system, if this DerivedCRS is used for a georectified grid coverage as described in ISO 19123, Clause 8. */
	DerivedCRS?: DerivedCRSType;
}
export interface DerivedCRSPropertyType extends _DerivedCRSPropertyType { constructor: { new(): DerivedCRSPropertyType }; }
export var DerivedCRSPropertyType: { new(): DerivedCRSPropertyType };

interface _DerivedCRSType extends _AbstractGeneralDerivedCRSType, _CoordinateSystemProxyType {
	/** gml:baseCRS is an association role to the coordinate reference system used by this derived CRS. */
	baseCRS: SingleCRSPropertyType;
	/** The gml:derivedCRSType property describes the type of a derived coordinate reference system. The required codeSpace attribute shall reference a source of information specifying the values and meanings of all the allowed string values for this property. */
	derivedCRSType: CodeWithAuthorityType;
}
export interface DerivedCRSType extends _DerivedCRSType { constructor: { new(): DerivedCRSType }; }
export var DerivedCRSType: { new(): DerivedCRSType };

interface _DerivedUnitType extends _UnitDefinitionType {
	/** A set of gml:derivationUnitTerm elements describes a derived unit of measure.  Each element carries an integer exponent.  The terms are combined by raising each referenced unit to the power of its exponent and forming the product.
	  * This unit term references another unit of measure (uom) and provides an integer exponent applied to that unit in defining the compound unit. The exponent may be positive or negative, but not zero. */
	derivationUnitTerm: DerivationUnitTermType[];
}
export interface DerivedUnitType extends _DerivedUnitType { constructor: { new(): DerivedUnitType }; }
export var DerivedUnitType: { new(): DerivedUnitType };

interface _DictionaryEntryProxyType extends BaseType {
	/** This property element contains or refers to the definitions which are members of a dictionary.
	  * The content model follows the standard GML property pattern, so a gml:dictionaryEntry may either contain or refer to a single gml:Definition. Since gml:Dictionary is substitutable for gml:Definition, the content of an entry may itself be a lower level dictionary.
	  * Note that if the value is provided by reference, this definition does not carry a handle (gml:id) in this context, so does not allow external references to this specific definition in this context.  When used in this way the referenced definition will usually be in a dictionary in the same XML document. */
	dictionaryEntry?: DictionaryEntryType;
	definitionMember?: DictionaryEntryType;
}
interface DictionaryEntryProxyType extends _DictionaryEntryProxyType { constructor: { new(): DictionaryEntryProxyType }; }

interface _DictionaryEntryType extends _AbstractMemberType, _DefinitionProxyType_2 {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface DictionaryEntryType extends _DictionaryEntryType { constructor: { new(): DictionaryEntryType }; }
export var DictionaryEntryType: { new(): DictionaryEntryType };

interface _DictionaryType extends _DefinitionType {
	aggregationType: AggregationType;
	/** This property element contains or refers to the definitions which are members of a dictionary.
	  * The content model follows the standard GML property pattern, so a gml:dictionaryEntry may either contain or refer to a single gml:Definition. Since gml:Dictionary is substitutable for gml:Definition, the content of an entry may itself be a lower level dictionary.
	  * Note that if the value is provided by reference, this definition does not carry a handle (gml:id) in this context, so does not allow external references to this specific definition in this context.  When used in this way the referenced definition will usually be in a dictionary in the same XML document. */
	dictionaryEntry?: DictionaryEntryProxyType[];
	indirectEntry?: IndirectEntryType[];
}
export interface DictionaryType extends _DictionaryType { constructor: { new(): DictionaryType }; }
export var DictionaryType: { new(): DictionaryType };

interface _DirectedEdgePropertyType extends BaseType {
	nilReason: string;
	orientation: SignType;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** gml:Edge represents the 1-dimensional primitive.
	  * The topological boundary of an Edge (gml:directedNode) consists of a negatively directed start Node and a positively directed end Node.
	  * The optional coboundary of an edge (gml:directedFace) is a circular sequence of directed faces which are incident on this edge in document order. In the 2D case, the orientation of the face on the left of the edge is "+"; the orientation of the face on the right on its right is "-".
	  * If provided, the aggregationType attribute shall have the value "sequence".
	  * An edge may optionally be realised by a 1-dimensional geometric primitive (gml:curveProperty). */
	Edge?: EdgeType;
}
export interface DirectedEdgePropertyType extends _DirectedEdgePropertyType { constructor: { new(): DirectedEdgePropertyType }; }
export var DirectedEdgePropertyType: { new(): DirectedEdgePropertyType };

interface _DirectedFacePropertyType extends BaseType {
	nilReason: string;
	orientation: SignType;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** gml:Face represents the 2-dimensional topology primitive.
	  * The topological boundary of a face (gml:directedEdge) consists of a sequence of directed edges. If provided, the aggregationType attribute shall have the value "sequence".
	  * The optional coboundary of a face (gml:directedTopoSolid) is a pair of directed solids which are bounded by this face. A positively directed solid corresponds to a solid which lies in the direction of the negatively directed normal to the face in any geometric realisation.
	  * A face may optionally be realised by a 2-dimensional geometric primitive (gml:surfaceProperty). */
	Face?: FaceType;
}
export interface DirectedFacePropertyType extends _DirectedFacePropertyType { constructor: { new(): DirectedFacePropertyType }; }
export var DirectedFacePropertyType: { new(): DirectedFacePropertyType };

interface _DirectedNodePropertyType extends BaseType {
	nilReason: string;
	orientation: SignType;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** gml:Node represents the 0-dimensional primitive.
	  * The optional coboundary of a node (gml:directedEdge) is a sequence of directed edges which are incident on this node. Edges emanating from this node appear in the node coboundary with a negative orientation.
	  * If provided, the aggregationType attribute shall have the value "sequence".
	  * A node may optionally be realised by a 0-dimensional geometric primitive (gml:pointProperty). */
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
	/** A gml:DirectedObservation is the same as an observation except that it adds an additional gml:direction property. This is the direction in which the observation was acquired. Clearly this applies only to certain types of observations such as visual observations by people, or observations obtained from terrestrial cameras. */
	DirectedObservation?: DirectedObservationType;
	/** gml:DirectedObservationAtDistance adds an additional distance property. This is the distance from the observer to the subject of the observation. Clearly this applies only to certain types of observations such as visual observations by people, or observations obtained from terrestrial cameras. */
	DirectedObservationAtDistance?: DirectedObservationAtDistanceType;
}
interface DirectedObservationProxyType extends _DirectedObservationProxyType { constructor: { new(): DirectedObservationProxyType }; }

interface _DirectedObservationType extends _ObservationType {
	/** The property gml:direction is intended as a pre-defined property expressing a direction to be assigned to features defined in a GML application schema. */
	direction: DirectionPropertyType;
}
export interface DirectedObservationType extends _DirectedObservationType { constructor: { new(): DirectedObservationType }; }
export var DirectedObservationType: { new(): DirectedObservationType };

interface _DirectedTopoSolidPropertyType extends BaseType {
	nilReason: string;
	orientation: SignType;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** gml:TopoSolid represents the 3-dimensional topology primitive.
	  * The topological boundary of a solid (gml:directedFace) consists of a set of directed faces.
	  * A solid may optionally be realised by a 3-dimensional geometric primitive (gml:solidProperty). */
	TopoSolid?: TopoSolidType;
}
export interface DirectedTopoSolidPropertyType extends _DirectedTopoSolidPropertyType { constructor: { new(): DirectedTopoSolidPropertyType }; }
export var DirectedTopoSolidPropertyType: { new(): DirectedTopoSolidPropertyType };

/** direction descriptions are specified by a compass point code, a keyword, a textual description or a reference to a description.
  * A gml:compassPoint is specified by a simple enumeration.
  * In addition, thre elements to contain text-based descriptions of direction are provided.
  * If the direction is specified using a term from a list, gml:keyword should be used, and the list indicated using the value of the codeSpace attribute.
  * if the direction is decribed in prose, gml:direction or gml:reference should be used, allowing the value to be included inline or by reference. */
interface _DirectionDescriptionType extends BaseType {
	compassPoint: CompassPointEnumeration;
	description: string;
	keyword: CodeType;
	reference: ReferenceType;
}
export interface DirectionDescriptionType extends _DirectionDescriptionType { constructor: { new(): DirectionDescriptionType }; }
export var DirectionDescriptionType: { new(): DirectionDescriptionType };

interface _DirectionPropertyType extends BaseType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	CompassPoint?: CompassPointEnumeration;
	DirectionDescription?: DirectionDescriptionType;
	DirectionKeyword?: CodeType;
	DirectionString?: StringOrRefType;
	DirectionVector?: DirectionVectorType;
}
export interface DirectionPropertyType extends _DirectionPropertyType { constructor: { new(): DirectionPropertyType }; }
export var DirectionPropertyType: { new(): DirectionPropertyType };

/** Direction vectors are specified by providing components of a vector. */
interface _DirectionVectorType extends BaseType {
	horizontalAngle: AngleType;
	vector: VectorType;
	verticalAngle: AngleType;
}
export interface DirectionVectorType extends _DirectionVectorType { constructor: { new(): DirectionVectorType }; }
export var DirectionVectorType: { new(): DirectionVectorType };

/** posList instances (and other instances with the content model specified by DirectPositionListType) hold the coordinates for a sequence of direct positions within the same coordinate reference system (CRS).
  * if no srsName attribute is given, the CRS shall be specified as part of the larger context this geometry element is part of, typically a geometric object like a point, curve, etc.
  * The optional attribute count specifies the number of direct positions in the list. If the attribute count is present then the attribute srsDimension shall be present, too.
  * The number of entries in the list is equal to the product of the dimensionality of the coordinate reference system (i.e. it is a derived value of the coordinate reference system definition) and the number of direct positions. */
export type DirectPositionListType = number[];

/** Direct position instances hold the coordinates for a position within some coordinate reference system (CRS). Since direct positions, as data types, will often be included in larger objects (such as geometry elements) that have references to CRS, the srsName attribute will in general be missing, if this particular direct position is included in a larger element with such a reference to a CRS. In this case, the CRS is implicitly assumed to take on the value of the containing object's CRS.
  * if no srsName attribute is given, the CRS shall be specified as part of the larger context this geometry element is part of, typically a geometric object like a point, curve, etc. */
export type DirectPositionType = number[];

interface _DiscreteCoverageType extends _AbstractCoverageType {
	/** The gml:coverageFunction property describes the mapping function from the domain to the range of the coverage.
	  * The value of the CoverageFunction is one of gml:CoverageMappingRule and gml:GridFunction.
	  * If the gml:coverageFunction property is omitted for a gridded coverage (including rectified gridded coverages) the gml:startPoint is assumed to be the value of the gml:low property in the gml:Grid geometry, and the gml:sequenceRule is assumed to be linear and the gml:axisOrder property is assumed to be "+1 +2". */
	coverageFunction?: CoverageFunctionType;
}
export interface DiscreteCoverageType extends _DiscreteCoverageType { constructor: { new(): DiscreteCoverageType }; }
export var DiscreteCoverageType: { new(): DiscreteCoverageType };

interface _DMSAngleType extends BaseType {
	decimalMinutes?: number;
	degrees: DegreesType;
	minutes?: number;
	seconds?: number;
}
export interface DMSAngleType extends _DMSAngleType { constructor: { new(): DMSAngleType }; }
export var DMSAngleType: { new(): DMSAngleType };

interface _DomainOfValidityType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	EX_Extent?: gmd.EX_Extent_Type;
}
interface DomainOfValidityType extends _DomainOfValidityType { constructor: { new(): DomainOfValidityType }; }

interface _DomainSetProxyType extends BaseType {
	/** The gml:domainSet property element describes the spatio-temporal region of interest, within which the coverage is defined. Its content model is given by gml:DomainSetType.
	  * The value of the domain is thus a choice between a gml:AbstractGeometry and a gml:AbstractTimeObject.  In the instance these abstract elements will normally be substituted by a geometry complex or temporal complex, to represent spatial coverages and time-series, respectively.
	  * The presence of the gml:AssociationAttributeGroup means that domainSet follows the usual GML property model and may use the xlink:href attribute to point to the domain, as an alternative to describing the domain inline. Ownership semantics may be provided using the gml:OwnershipAttributeGroup. */
	domainSet?: DomainSetType;
	gridDomain?: DomainSetType;
	multiCurveDomain?: DomainSetType;
	multiPointDomain?: DomainSetType;
	multiSolidDomain?: DomainSetType;
	multiSurfaceDomain?: DomainSetType;
	rectifiedGridDomain?: DomainSetType;
}
interface DomainSetProxyType extends _DomainSetProxyType { constructor: { new(): DomainSetProxyType }; }

interface _DomainSetType extends _AbstractGeometryProxyType, _AbstractTimeObjectProxyType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface DomainSetType extends _DomainSetType { constructor: { new(): DomainSetType }; }
export var DomainSetType: { new(): DomainSetType };

/** A type for a list of values of the respective simple type. */
export type doubleList = number[];

/** Extension to the respective XML Schema built-in simple type to allow a choice of either a value of the built-in simple type or a reason for a nil value. */
export type doubleOrNilReason = string;
type _doubleOrNilReason = Primitive._string;

/** A type for a list of values of the respective simple type. */
export type doubleOrNilReasonList = string[];

interface _DynamicFeatureCollectionType extends _DynamicFeatureType {
	dynamicMembers: DynamicFeatureMemberType;
}
export interface DynamicFeatureCollectionType extends _DynamicFeatureCollectionType { constructor: { new(): DynamicFeatureCollectionType }; }
export var DynamicFeatureCollectionType: { new(): DynamicFeatureCollectionType };

interface _DynamicFeatureMemberType extends _AbstractFeatureMemberType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** States are captured by time-stamped instances of a feature. The content model extends the standard gml:AbstractFeatureType with the gml:dynamicProperties model group.
	  * Each time-stamped instance represents a 'snapshot' of a feature. The dynamic feature classes will normally be extended to suit particular applications.  A dynamic feature bears either a time stamp or a history. */
	DynamicFeature?: DynamicFeatureProxyType[];
}
export interface DynamicFeatureMemberType extends _DynamicFeatureMemberType { constructor: { new(): DynamicFeatureMemberType }; }
export var DynamicFeatureMemberType: { new(): DynamicFeatureMemberType };

interface _DynamicFeatureProxyType extends BaseType {
	/** States are captured by time-stamped instances of a feature. The content model extends the standard gml:AbstractFeatureType with the gml:dynamicProperties model group.
	  * Each time-stamped instance represents a 'snapshot' of a feature. The dynamic feature classes will normally be extended to suit particular applications.  A dynamic feature bears either a time stamp or a history. */
	DynamicFeature?: DynamicFeatureType;
	/** A gml:DynamicFeatureCollection is a feature collection that has a gml:validTime property (i.e. is a snapshot of the feature collection) or which has a gml:history property that contains one or more gml:AbstractTimeSlices each of which contain values of the time varying properties of the feature collection.  Note that the gml:DynamicFeatureCollection may be one of the following:
	  * 1.	A feature collection which consists of static feature members (members do not change in time) but which has properties of the collection object as a whole that do change in time .
	  * 2.	A feature collection which consists of dynamic feature members (the members are gml:DynamicFeatures) but which also has properties of the collection as a whole that vary in time. */
	DynamicFeatureCollection?: DynamicFeatureCollectionType;
}
interface DynamicFeatureProxyType extends _DynamicFeatureProxyType { constructor: { new(): DynamicFeatureProxyType }; }

interface _DynamicFeatureType extends _AbstractFeatureType, _HistoryProxyType {
	/** Evidence is represented by a simple gml:dataSource or gml:dataSourceReference property that indicates the source of the temporal data. The remote link attributes of the gml:dataSource element have been deprecated along with its current type. */
	dataSource?: StringOrRefType;
	/** Evidence is represented by a simple gml:dataSource or gml:dataSourceReference property that indicates the source of the temporal data. */
	dataSourceReference?: ReferenceType;
	/** gml:validTime is a convenience property element. */
	validTime?: TimePrimitivePropertyType;
}
export interface DynamicFeatureType extends _DynamicFeatureType { constructor: { new(): DynamicFeatureType }; }
export var DynamicFeatureType: { new(): DynamicFeatureType };

interface _EdgeType extends _AbstractTopoPrimitiveType {
	aggregationType: AggregationType;
	container?: TopoSolidPropertyType;
	/** This property element either references a curve via the XLink-attributes or contains the curve element. curveProperty is the predefined property which may be used by GML Application Schemas whenever a GML feature has a property with a value that is substitutable for AbstractCurve. */
	curveProperty?: CurvePropertyType;
	/** The gml:directedFace property element describes the boundary of topology solids, in the coBoundary of topology edges and is used in the support of surface features via the gml:TopoSurface expression, see below. The orientation attribute of type gml:SignType expresses the sense in which the included face is used i.e. inward or outward with respect to the surface normal in any geometric realisation. */
	directedFace?: DirectedFacePropertyType[];
	/** A gml:directedNode property element describes the boundary of topology edges and is used in the support of topological point features via the gml:TopoPoint expression, see below. The orientation attribute of type gml:SignType expresses the sense in which the included node is used: start ("-") or end ("+") node. */
	directedNode: DirectedNodePropertyType[];
}
export interface EdgeType extends _EdgeType { constructor: { new(): EdgeType }; }
export var EdgeType: { new(): EdgeType };

/** gml:EllipsoidalCSPropertyType is a property type for association roles to an ellipsoidal coordinate system, either referencing or containing the definition of that coordinate system. */
interface _EllipsoidalCSPropertyType extends _EllipsoidalCSProxyType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface EllipsoidalCSPropertyType extends _EllipsoidalCSPropertyType { constructor: { new(): EllipsoidalCSPropertyType }; }
export var EllipsoidalCSPropertyType: { new(): EllipsoidalCSPropertyType };

interface _EllipsoidalCSProxyType extends BaseType {
	/** gml:EllipsoidalCS is a two- or three-dimensional coordinate system in which position is specified by geodetic latitude, geodetic longitude, and (in the three-dimensional case) ellipsoidal height. An EllipsoidalCS shall have two or three gml:axis property elements; the number of associations shall equal the dimension of the CS. */
	EllipsoidalCS?: EllipsoidalCSType;
	usesEllipsoidalCS?: EllipsoidalCSPropertyType;
}
interface EllipsoidalCSProxyType extends _EllipsoidalCSProxyType { constructor: { new(): EllipsoidalCSProxyType }; }

interface _EllipsoidalCSType extends _AbstractCoordinateSystemType {}
export interface EllipsoidalCSType extends _EllipsoidalCSType { constructor: { new(): EllipsoidalCSType }; }
export var EllipsoidalCSType: { new(): EllipsoidalCSType };

/** gml:EllipsoidPropertyType is a property type for association roles to an ellipsoid, either referencing or containing the definition of that ellipsoid. */
interface _EllipsoidPropertyType extends _EllipsoidProxyType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface EllipsoidPropertyType extends _EllipsoidPropertyType { constructor: { new(): EllipsoidPropertyType }; }
export var EllipsoidPropertyType: { new(): EllipsoidPropertyType };

interface _EllipsoidProxyType extends BaseType {
	/** A gml:Ellipsoid is a geometric figure that may be used to describe the approximate shape of the earth. In mathematical terms, it is a surface formed by the rotation of an ellipse about its minor axis. */
	Ellipsoid?: EllipsoidType;
	usesEllipsoid?: EllipsoidPropertyType;
}
interface EllipsoidProxyType extends _EllipsoidProxyType { constructor: { new(): EllipsoidProxyType }; }

interface _EllipsoidType extends _IdentifiedObjectType {
	SecondDefiningParameter: SecondDefiningParameterType;
	/** gml:semiMajorAxis specifies the length of the semi-major axis of the ellipsoid, with its units. Uses the MeasureType with the restriction that the unit of measure referenced by uom must be suitable for a length, such as metres or feet. */
	semiMajorAxis: MeasureType;
}
export interface EllipsoidType extends _EllipsoidType { constructor: { new(): EllipsoidType }; }
export var EllipsoidType: { new(): EllipsoidType };

/** gml:EngineeringCRSPropertyType is a property type for association roles to an engineering coordinate reference system, either referencing or containing the definition of that reference system. */
interface _EngineeringCRSPropertyType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** gml:EngineeringCRS is a contextually local coordinate reference system which can be divided into two broad categories:
	  * -	earth-fixed systems applied to engineering activities on or near the surface of the earth;
	  * -	CRSs on moving platforms such as road vehicles, vessels, aircraft, or spacecraft, see ISO 19111 8.3. */
	EngineeringCRS?: EngineeringCRSType;
}
export interface EngineeringCRSPropertyType extends _EngineeringCRSPropertyType { constructor: { new(): EngineeringCRSPropertyType }; }
export var EngineeringCRSPropertyType: { new(): EngineeringCRSPropertyType };

interface _EngineeringCRSType extends _AbstractCRSType, _AffineCSProxyType, _CartesianCSProxyType, _CoordinateSystemProxyType, _EngineeringDatumProxyType, _SphericalCSProxyType {
	/** gml:CylindricalCS is a three-dimensional coordinate system consisting of a polar coordinate system extended by a straight coordinate axis perpendicular to the plane spanned by the polar coordinate system. A CylindricalCS shall have three gml:axis property elements. */
	CylindricalCS: CylindricalCSType;
	/** gml:LinearCS is a one-dimensional coordinate system that consists of the points that lie on the single axis described. The associated coordinate is the distance – with or without offset – from the specified datum to the point along the axis. A LinearCS shall have one gml:axis property element. */
	LinearCS: LinearCSType;
	/** gml:PolarCS ia s two-dimensional coordinate system in which position is specified by the distance from the origin and the angle between the line from the origin to a point and a reference direction. A PolarCS shall have two gml:axis property elements. */
	PolarCS: PolarCSType;
	/** gml:UserDefinedCS is a two- or three-dimensional coordinate system that consists of any combination of coordinate axes not covered by any other coordinate system type. A UserDefinedCS shall have two or three gml:axis property elements; the number of property elements shall equal the dimension of the CS. */
	UserDefinedCS: UserDefinedCSType;
}
export interface EngineeringCRSType extends _EngineeringCRSType { constructor: { new(): EngineeringCRSType }; }
export var EngineeringCRSType: { new(): EngineeringCRSType };

/** gml:EngineeringDatumPropertyType is a property type for association roles to an engineering datum, either referencing or containing the definition of that datum. */
interface _EngineeringDatumPropertyType extends _EngineeringDatumProxyType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface EngineeringDatumPropertyType extends _EngineeringDatumPropertyType { constructor: { new(): EngineeringDatumPropertyType }; }
export var EngineeringDatumPropertyType: { new(): EngineeringDatumPropertyType };

interface _EngineeringDatumProxyType extends BaseType {
	/** gml:EngineeringDatum defines the origin of an engineering coordinate reference system, and is used in a region around that origin. This origin may be fixed with respect to the earth (such as a defined point at a construction site), or be a defined point on a moving vehicle (such as on a ship or satellite). */
	EngineeringDatum?: EngineeringDatumType;
	usesEngineeringDatum?: EngineeringDatumPropertyType;
}
interface EngineeringDatumProxyType extends _EngineeringDatumProxyType { constructor: { new(): EngineeringDatumProxyType }; }

interface _EngineeringDatumType extends _AbstractDatumType {}
export interface EngineeringDatumType extends _EngineeringDatumType { constructor: { new(): EngineeringDatumType }; }
export var EngineeringDatumType: { new(): EngineeringDatumType };

interface _EnvelopeProxyType extends BaseType {
	/** Envelope defines an extent using a pair of positions defining opposite corners in arbitrary dimensions. The first direct position is the "lower corner" (a coordinate position consisting of all the minimal ordinates for each dimension for all points within the envelope), the second one the "upper corner" (a coordinate position consisting of all the maximal ordinates for each dimension for all points within the envelope).
	  * The use of the properties "coordinates" and "pos" has been deprecated. The explicitly named properties "lowerCorner" and "upperCorner" shall be used instead. */
	Envelope?: EnvelopeType;
	/** gml:EnvelopeWithTimePeriod is provided for envelopes that include a temporal extent. It adds two time position properties, gml:beginPosition and gml:endPosition, which describe the extent of a time-envelope.
	  * Since gml:EnvelopeWithTimePeriod is assigned to the substitution group headed by gml:Envelope, it may be used whenever gml:Envelope is valid. */
	EnvelopeWithTimePeriod?: EnvelopeWithTimePeriodType;
}
interface EnvelopeProxyType extends _EnvelopeProxyType { constructor: { new(): EnvelopeProxyType }; }

interface _EnvelopeType extends BaseType {
	axisLabels: NCNameList;
	srsDimension: number;
	srsName: string;
	uomLabels: NCNameList;
	coordinates: CoordinatesType;
	lowerCorner: DirectPositionType;
	pos: DirectPositionType[];
	upperCorner: DirectPositionType;
}
export interface EnvelopeType extends _EnvelopeType { constructor: { new(): EnvelopeType }; }
export var EnvelopeType: { new(): EnvelopeType };

interface _EnvelopeWithTimePeriodType extends _EnvelopeType {
	frame: string;
	beginPosition: TimePositionType;
	endPosition: TimePositionType;
}
export interface EnvelopeWithTimePeriodType extends _EnvelopeWithTimePeriodType { constructor: { new(): EnvelopeWithTimePeriodType }; }
export var EnvelopeWithTimePeriodType: { new(): EnvelopeWithTimePeriodType };

interface _FaceOrTopoSolidPropertyType extends BaseType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** gml:Face represents the 2-dimensional topology primitive.
	  * The topological boundary of a face (gml:directedEdge) consists of a sequence of directed edges. If provided, the aggregationType attribute shall have the value "sequence".
	  * The optional coboundary of a face (gml:directedTopoSolid) is a pair of directed solids which are bounded by this face. A positively directed solid corresponds to a solid which lies in the direction of the negatively directed normal to the face in any geometric realisation.
	  * A face may optionally be realised by a 2-dimensional geometric primitive (gml:surfaceProperty). */
	Face?: FaceType;
	/** gml:TopoSolid represents the 3-dimensional topology primitive.
	  * The topological boundary of a solid (gml:directedFace) consists of a set of directed faces.
	  * A solid may optionally be realised by a 3-dimensional geometric primitive (gml:solidProperty). */
	TopoSolid?: TopoSolidType;
}
export interface FaceOrTopoSolidPropertyType extends _FaceOrTopoSolidPropertyType { constructor: { new(): FaceOrTopoSolidPropertyType }; }
export var FaceOrTopoSolidPropertyType: { new(): FaceOrTopoSolidPropertyType };

interface _FaceType extends _AbstractTopoPrimitiveType {
	aggregationType: AggregationType;
	/** If the topological representation exists an unbounded manifold (e.g. Euclidean plane), a gml:Face must indicate whether it is a universal face or not, to ensure a lossless topology representation as defined by Kuijpers, et. al. (see OGC 05-102 Topology IPR). The optional universal attribute of type boolean is used to indicate this. NOTE The universal face is normally not part of any feature, and is used to represent the unbounded portion of the data set. Its interior boundary (it has no exterior boundary) would normally be considered the exterior boundary of the map represented by the data set. */
	universal?: boolean;
	/** A gml:directedEdge property element describes the boundary of topology faces, the coBoundary of topology nodes and is used in the support of topological line features via the gml:TopoCurve expression, see below. The orientation attribute of type gml:SignType expresses the sense in which the included edge is used, i.e. forward or reverse. */
	directedEdge: DirectedEdgePropertyType[];
	/** The gml:directedSolid property element describes the coBoundary of topology faces and is used in the support of volume features via the gml:TopoVolume expression, see below. The orientation attribute of type gml:SignType expresses the sense in which the included solid appears in the face coboundary. In the context of a gml:TopoVolume the orientation attribute has no meaning. */
	directedTopoSolid?: DirectedTopoSolidPropertyType[];
	isolated?: NodePropertyType[];
	/** This property element either references a surface via the XLink-attributes or contains the surface element. surfaceProperty is the predefined property which may be used by GML Application Schemas whenever a GML feature has a property with a value that is substitutable for AbstractSurface. */
	surfaceProperty?: SurfacePropertyType;
}
export interface FaceType extends _FaceType { constructor: { new(): FaceType }; }
export var FaceType: { new(): FaceType };

interface _FeatureArrayPropertyType extends BaseType {
	/** This abstract element serves as the head of a substitution group which may contain any elements whose content model is derived from gml:AbstractFeatureType.  This may be used as a variable in the construction of content models.
	  * gml:AbstractFeature may be thought of as "anything that is a GML feature" and may be used to define variables or templates in which the value of a GML property is "any feature". This occurs in particular in a GML feature collection where the feature member properties contain one or multiple copies of gml:AbstractFeature respectively. */
	AbstractFeature?: AbstractFeatureProxyType[];
}
export interface FeatureArrayPropertyType extends _FeatureArrayPropertyType { constructor: { new(): FeatureArrayPropertyType }; }
export var FeatureArrayPropertyType: { new(): FeatureArrayPropertyType };

interface _FeatureCollectionType extends _AbstractFeatureCollectionType {}
export interface FeatureCollectionType extends _FeatureCollectionType { constructor: { new(): FeatureCollectionType }; }
export var FeatureCollectionType: { new(): FeatureCollectionType };

interface _FeaturePropertyType extends _AbstractFeatureProxyType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface FeaturePropertyType extends _FeaturePropertyType { constructor: { new(): FeaturePropertyType }; }
export var FeaturePropertyType: { new(): FeaturePropertyType };

interface _FileType extends BaseType {
	compression?: string;
	fileName: string;
	fileReference: string;
	fileStructure: CodeType;
	mimeType?: string;
	rangeParameters: AssociationRoleType;
}
export interface FileType extends _FileType { constructor: { new(): FileType }; }
export var FileType: { new(): FileType };

interface _FormulaCitationType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	CI_Citation?: gmd.CI_Citation_Type;
}
interface FormulaCitationType extends _FormulaCitationType { constructor: { new(): FormulaCitationType }; }

interface _FormulaProxyType extends BaseType {
	/** gml:formula Formula(s) or procedure used by an operation method. The use of the codespace attribite has been deprecated. The property value shall be a character string. */
	formula?: CodeType;
	methodFormula?: CodeType;
}
interface FormulaProxyType extends _FormulaProxyType { constructor: { new(): FormulaProxyType }; }

interface _FormulaType extends BaseType {
	a?: number;
	b: number;
	c: number;
	d?: number;
}
export interface FormulaType extends _FormulaType { constructor: { new(): FormulaType }; }
export var FormulaType: { new(): FormulaType };

/** gml:GeneralConversionPropertyType is a property type for association roles to a general conversion, either referencing or containing the definition of that conversion. */
interface _GeneralConversionPropertyType extends _AbstractGeneralConversionProxyType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface GeneralConversionPropertyType extends _GeneralConversionPropertyType { constructor: { new(): GeneralConversionPropertyType }; }
export var GeneralConversionPropertyType: { new(): GeneralConversionPropertyType };

interface _GeneralOperationParameterProxyType extends BaseType {
	generalOperationParameter?: AbstractGeneralOperationParameterPropertyType;
	usesParameter?: AbstractGeneralOperationParameterPropertyType;
}
interface GeneralOperationParameterProxyType extends _GeneralOperationParameterProxyType { constructor: { new(): GeneralOperationParameterProxyType }; }

/** gml:GeneralTransformationPropertyType is a property type for association roles to a general transformation, either referencing or containing the definition of that transformation. */
interface _GeneralTransformationPropertyType extends _AbstractGeneralTransformationProxyType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface GeneralTransformationPropertyType extends _GeneralTransformationPropertyType { constructor: { new(): GeneralTransformationPropertyType }; }
export var GeneralTransformationPropertyType: { new(): GeneralTransformationPropertyType };

interface _GenericMetaDataType extends _AbstractMetaDataType {}
export interface GenericMetaDataType extends _GenericMetaDataType { constructor: { new(): GenericMetaDataType }; }
export var GenericMetaDataType: { new(): GenericMetaDataType };

interface _GeocentricCRSPropertyType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	GeocentricCRS?: GeocentricCRSType;
}
export interface GeocentricCRSPropertyType extends _GeocentricCRSPropertyType { constructor: { new(): GeocentricCRSPropertyType }; }
export var GeocentricCRSPropertyType: { new(): GeocentricCRSPropertyType };

interface _GeocentricCRSType extends _AbstractCRSType {
	usesCartesianCS: CartesianCSPropertyType;
	usesGeodeticDatum: GeodeticDatumPropertyType;
	usesSphericalCS: SphericalCSPropertyType;
}
export interface GeocentricCRSType extends _GeocentricCRSType { constructor: { new(): GeocentricCRSType }; }
export var GeocentricCRSType: { new(): GeocentricCRSType };

interface _GeodesicStringProxyType extends BaseType {
	/** A sequence of geodesic segments.
	  * The number of control points shall be at least two.
	  * interpolation is fixed as "geodesic".
	  * The content model follows the general pattern for the encoding of curve segments. */
	GeodesicString?: GeodesicStringType;
	Geodesic?: GeodesicType;
}
interface GeodesicStringProxyType extends _GeodesicStringProxyType { constructor: { new(): GeodesicStringProxyType }; }

interface _GeodesicStringType extends _AbstractCurveSegmentType {
	interpolation: CurveInterpolationType;
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty is the predefined property which may be used by GML Application Schemas whenever a GML feature has a property with a value that is substitutable for Point. */
	pointProperty: PointPropertyType[];
	pos: DirectPositionType[];
	posList: DirectPositionListType;
}
export interface GeodesicStringType extends _GeodesicStringType { constructor: { new(): GeodesicStringType }; }
export var GeodesicStringType: { new(): GeodesicStringType };

interface _GeodesicType extends _GeodesicStringType {}
export interface GeodesicType extends _GeodesicType { constructor: { new(): GeodesicType }; }
export var GeodesicType: { new(): GeodesicType };

/** gml:GeodeticCRSPropertyType is a property type for association roles to a geodetic coordinate reference system, either referencing or containing the definition of that reference system. */
interface _GeodeticCRSPropertyType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	GeodeticCRS?: GeodeticCRSType;
}
export interface GeodeticCRSPropertyType extends _GeodeticCRSPropertyType { constructor: { new(): GeodeticCRSPropertyType }; }
export var GeodeticCRSPropertyType: { new(): GeodeticCRSPropertyType };

/** gml:GeodeticCRS is a coordinate reference system based on a geodetic datum. */
interface _GeodeticCRSType extends _AbstractCRSType, _CartesianCSProxyType, _EllipsoidalCSProxyType, _GeodeticDatumProxyType, _SphericalCSProxyType {}
export interface GeodeticCRSType extends _GeodeticCRSType { constructor: { new(): GeodeticCRSType }; }
export var GeodeticCRSType: { new(): GeodeticCRSType };

/** gml:GeodeticDatumPropertyType is a property type for association roles to a geodetic datum, either referencing or containing the definition of that datum. */
interface _GeodeticDatumPropertyType extends _GeodeticDatumProxyType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface GeodeticDatumPropertyType extends _GeodeticDatumPropertyType { constructor: { new(): GeodeticDatumPropertyType }; }
export var GeodeticDatumPropertyType: { new(): GeodeticDatumPropertyType };

interface _GeodeticDatumProxyType extends BaseType {
	/** gml:GeodeticDatum is a geodetic datum defines the precise location and orientation in 3-dimensional space of a defined ellipsoid (or sphere), or of a Cartesian coordinate system centered in this ellipsoid (or sphere). */
	GeodeticDatum?: GeodeticDatumType;
	usesGeodeticDatum?: GeodeticDatumPropertyType;
}
interface GeodeticDatumProxyType extends _GeodeticDatumProxyType { constructor: { new(): GeodeticDatumProxyType }; }

interface _GeodeticDatumType extends _AbstractDatumType, _EllipsoidProxyType, _PrimeMeridianProxyType {}
export interface GeodeticDatumType extends _GeodeticDatumType { constructor: { new(): GeodeticDatumType }; }
export var GeodeticDatumType: { new(): GeodeticDatumType };

interface _GeographicCRSPropertyType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	GeographicCRS?: GeographicCRSType;
}
export interface GeographicCRSPropertyType extends _GeographicCRSPropertyType { constructor: { new(): GeographicCRSPropertyType }; }
export var GeographicCRSPropertyType: { new(): GeographicCRSPropertyType };

interface _GeographicCRSType extends _AbstractCRSType {
	usesEllipsoidalCS: EllipsoidalCSPropertyType;
	usesGeodeticDatum: GeodeticDatumPropertyType;
}
export interface GeographicCRSType extends _GeographicCRSType { constructor: { new(): GeographicCRSType }; }
export var GeographicCRSType: { new(): GeographicCRSType };

/** A property that has a geometric complex as its value domain may either be an appropriate geometry element encapsulated in an element of this type or an XLink reference to a remote geometry element (where remote includes geometry elements located elsewhere in the same document). Either the reference or the contained element shall be given, but neither both nor none. */
interface _GeometricComplexPropertyType extends BaseType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** A gml:CompositeCurve is represented by a sequence of (orientable) curves such that each curve in the sequence terminates at the start point of the subsequent curve in the list.
	  * curveMember references or contains inline one curve in the composite curve.
	  * The curves are contiguous, the collection of curves is ordered. Therefore, if provided, the aggregationType attribute shall have the value "sequence". */
	CompositeCurve?: CompositeCurveType;
	/** gml:CompositeSolid implements ISO 19107 GM_CompositeSolid (see ISO 19107:2003, 6.6.7) as specified in D.2.3.6.
	  * A gml:CompositeSolid is represented by a set of orientable surfaces. It is a geometry type with all the geometric properties of a (primitive) solid. Essentially, a composite solid is a collection of solids that join in pairs on common boundary surfaces and which, when considered as a whole, form a single solid.
	  * solidMember references or contains one solid in the composite solid. The solids are contiguous. */
	CompositeSolid?: CompositeSolidType;
	/** A gml:CompositeSurface is represented by a set of orientable surfaces. It is geometry type with all the geometric properties of a (primitive) surface. Essentially, a composite surface is a collection of surfaces that join in pairs on common boundary curves and which, when considered as a whole, form a single surface.
	  * surfaceMember references or contains inline one surface in the composite surface.
	  * The surfaces are contiguous. */
	CompositeSurface?: CompositeSurfaceType;
	GeometricComplex?: GeometricComplexType;
}
export interface GeometricComplexPropertyType extends _GeometricComplexPropertyType { constructor: { new(): GeometricComplexPropertyType }; }
export var GeometricComplexPropertyType: { new(): GeometricComplexPropertyType };

interface _GeometricComplexType extends _AbstractGeometryType {
	aggregationType: AggregationType;
	element: GeometricPrimitivePropertyType[];
}
export interface GeometricComplexType extends _GeometricComplexType { constructor: { new(): GeometricComplexType }; }
export var GeometricComplexType: { new(): GeometricComplexType };

/** A property that has a geometric primitive as its value domain may either be an appropriate geometry element encapsulated in an element of this type or an XLink reference to a remote geometry element (where remote includes geometry elements located elsewhere in the same document). Either the reference or the contained element shall be given, but neither both nor none. */
interface _GeometricPrimitivePropertyType extends _AbstractGeometricPrimitiveProxyType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface GeometricPrimitivePropertyType extends _GeometricPrimitivePropertyType { constructor: { new(): GeometricPrimitivePropertyType }; }
export var GeometricPrimitivePropertyType: { new(): GeometricPrimitivePropertyType };

/** If a feature has a property which takes an array of geometry elements as its value, this is called a geometry array property. A generic type for such a geometry property is GeometryArrayPropertyType.
  * The elements are always contained inline in the array property, referencing geometry elements or arrays of geometry elements via XLinks is not supported. */
interface _GeometryArrayPropertyType extends BaseType {
	owns: boolean;
	/** The AbstractGeometry element is the abstract head of the substitution group for all geometry elements of GML. This includes pre-defined and user-defined geometry elements. Any geometry element shall be a direct or indirect extension/restriction of AbstractGeometryType and shall be directly or indirectly in the substitution group of AbstractGeometry. */
	AbstractGeometry?: AbstractGeometryProxyType[];
}
export interface GeometryArrayPropertyType extends _GeometryArrayPropertyType { constructor: { new(): GeometryArrayPropertyType }; }
export var GeometryArrayPropertyType: { new(): GeometryArrayPropertyType };

/** A geometric property may either be any geometry element encapsulated in an element of this type or an XLink reference to a remote geometry element (where remote includes geometry elements located elsewhere in the same or another document). Note that either the reference or the contained element shall be given, but not both or none.
  * If a feature has a property that takes a geometry element as its value, this is called a geometry property. A generic type for such a geometry property is GeometryPropertyType. */
interface _GeometryPropertyType extends _AbstractGeometryProxyType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface GeometryPropertyType extends _GeometryPropertyType { constructor: { new(): GeometryPropertyType }; }
export var GeometryPropertyType: { new(): GeometryPropertyType };

interface _GridEnvelopeType extends BaseType {
	high: integerList;
	low: integerList;
}
export interface GridEnvelopeType extends _GridEnvelopeType { constructor: { new(): GridEnvelopeType }; }
export var GridEnvelopeType: { new(): GridEnvelopeType };

interface _GridFunctionType extends BaseType {
	sequenceRule?: SequenceRuleType;
	startPoint?: integerList;
}
export interface GridFunctionType extends _GridFunctionType { constructor: { new(): GridFunctionType }; }
export var GridFunctionType: { new(): GridFunctionType };

interface _GridLengthType extends _MeasureType {}
export interface GridLengthType extends _GridLengthType { constructor: { new(): GridLengthType }; }
export var GridLengthType: { new(): GridLengthType };

interface _GridLimitsType extends BaseType {
	GridEnvelope: GridEnvelopeType;
}
export interface GridLimitsType extends _GridLimitsType { constructor: { new(): GridLimitsType }; }
export var GridLimitsType: { new(): GridLimitsType };

interface _GridProxyType extends BaseType {
	/** The gml:Grid implicitly defines an unrectified grid, which is a network composed of two or more sets of curves in which the members of each set intersect the members of the other sets in an algorithmic way.  The region of interest within the grid is given in terms of its gml:limits, being the grid coordinates of  diagonally opposed corners of a rectangular region.  gml:axisLabels is provided with a list of labels of the axes of the grid (gml:axisName has been deprecated). gml:dimension specifies the dimension of the grid.
	  * The gml:limits element contains a single gml:GridEnvelope. The gml:low and gml:high property elements of the envelope are each integerLists, which are coordinate tuples, the coordinates being measured as offsets from the origin of the grid along each axis, of the diagonally opposing corners of a "rectangular" region of interest. */
	Grid?: GridType;
	/** A rectified grid is a grid for which there is an affine transformation between the grid coordinates and the coordinates of an external coordinate reference system. It is defined by specifying the position (in some geometric space) of the grid "origin" and of the vectors that specify the post locations.
	  * Note that the grid limits (post indexes) and axis name properties are inherited from gml:GridType and that gml:RectifiedGrid adds a gml:origin property (contains or references a gml:Point) and a set of gml:offsetVector properties. */
	RectifiedGrid?: RectifiedGridType;
}
interface GridProxyType extends _GridProxyType { constructor: { new(): GridProxyType }; }

interface _GridType extends _AbstractGeometryType {
	dimension: number;
	axisLabels: NCNameList;
	axisName: string[];
	limits: GridLimitsType;
}
export interface GridType extends _GridType { constructor: { new(): GridType }; }
export var GridType: { new(): GridType };

interface _GroupProxyType extends BaseType {
	/** gml:group is an association role to the operation parameter group for which this element provides parameter values. */
	group?: OperationParameterGroupPropertyType;
	valuesOfGroup?: OperationParameterGroupPropertyType;
}
interface GroupProxyType extends _GroupProxyType { constructor: { new(): GroupProxyType }; }

interface _HistoryPropertyType extends BaseType {
	owns: boolean;
	/** To describe an event — an action that occurs at an instant or over an interval of time — GML provides the gml:AbtractTimeSlice element. A timeslice encapsulates the time-varying properties of a dynamic feature -- it shall be extended to represent a time stamped projection of a specific feature. The gml:dataSource property describes how the temporal data was acquired.
	  * A gml:AbstractTimeSlice instance is a GML object that encapsulates updates of the dynamic—or volatile—properties that reflect some change event; it thus includes only those feature properties that have actually changed due to some process.
	  * gml:AbstractTimeSlice basically provides a facility for attribute-level time stamping, in contrast to the object-level time stamping of dynamic feature instances.
	  * The time slice can thus be viewed as event or process-oriented, whereas a snapshot is more state or structure-oriented. A timeslice has richer causality, whereas a snapshot merely portrays the status of the whole. */
	AbstractTimeSlice: AbstractTimeSliceProxyType[];
}
export interface HistoryPropertyType extends _HistoryPropertyType { constructor: { new(): HistoryPropertyType }; }
export var HistoryPropertyType: { new(): HistoryPropertyType };

interface _HistoryProxyType extends BaseType {
	/** A generic sequence of events constitute a gml:history of an object.
	  * The gml:history element contains a set of elements in the substitution group headed by the abstract element gml:AbstractTimeSlice, representing the time-varying properties of interest. The history property of a dynamic feature associates a feature instance with a sequence of time slices (i.e. change events) that encapsulate the evolution of the feature. */
	history?: HistoryPropertyType;
	track?: HistoryPropertyType;
}
interface HistoryProxyType extends _HistoryProxyType { constructor: { new(): HistoryProxyType }; }

/** gml:IdentifiedObjectType provides identification properties of a CRS-related object. In gml:DefinitionType, the gml:identifier element shall be the primary name by which this object is identified, encoding the "name" attribute in the UML model.
  * Zero or more of the gml:name elements can be an unordered set of "identifiers", encoding the "identifier" attribute in the UML model. Each of these gml:name elements can reference elsewhere the object's defining information or be an identifier by which this object can be referenced.
  * Zero or more other gml:name elements can be an unordered set of "alias" alternative names by which this CRS related object is identified, encoding the "alias" attributes in the UML model. An object may have several aliases, typically used in different contexts. The context for an alias is indicated by the value of its (optional) codeSpace attribute.
  * Any needed version information shall be included in the codeSpace attribute of a gml:identifier and gml:name elements. In this use, the gml:remarks element in the gml:DefinitionType shall contain comments on or information about this object, including data source information. */
interface _IdentifiedObjectType extends _DefinitionType {}
export interface IdentifiedObjectType extends _IdentifiedObjectType { constructor: { new(): IdentifiedObjectType }; }
export var IdentifiedObjectType: { new(): IdentifiedObjectType };

/** gml:ImageCRSPropertyType is a property type for association roles to an image coordinate reference system, either referencing or containing the definition of that reference system. */
interface _ImageCRSPropertyType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** gml:ImageCRS is an engineering coordinate reference system applied to locations in images. Image coordinate reference systems are treated as a separate sub-type because the definition of the associated image datum contains two attributes not relevant to other engineering datums. */
	ImageCRS?: ImageCRSType;
}
export interface ImageCRSPropertyType extends _ImageCRSPropertyType { constructor: { new(): ImageCRSPropertyType }; }
export var ImageCRSPropertyType: { new(): ImageCRSPropertyType };

interface _ImageCRSType extends _AbstractCRSType, _AffineCSProxyType, _CartesianCSProxyType, _ImageDatumProxyType {
	usesObliqueCartesianCS: ObliqueCartesianCSPropertyType;
}
export interface ImageCRSType extends _ImageCRSType { constructor: { new(): ImageCRSType }; }
export var ImageCRSType: { new(): ImageCRSType };

/** gml:ImageDatumPropertyType is a property type for association roles to an image datum, either referencing or containing the definition of that datum. */
interface _ImageDatumPropertyType extends _ImageDatumProxyType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface ImageDatumPropertyType extends _ImageDatumPropertyType { constructor: { new(): ImageDatumPropertyType }; }
export var ImageDatumPropertyType: { new(): ImageDatumPropertyType };

interface _ImageDatumProxyType extends BaseType {
	/** gml:ImageDatum defines the origin of an image coordinate reference system, and is used in a local context only. For an image datum, the anchor definition is usually either the centre of the image or the corner of the image. For more information, see ISO 19111 B.3.5. */
	ImageDatum?: ImageDatumType;
	usesImageDatum?: ImageDatumPropertyType;
}
interface ImageDatumProxyType extends _ImageDatumProxyType { constructor: { new(): ImageDatumProxyType }; }

interface _ImageDatumType extends _AbstractDatumType {
	/** gml:pixelInCell is a specification of the way an image grid is associated with the image data attributes. The required codeSpace attribute shall reference a source of information specifying the values and meanings of all the allowed string values for this property. */
	pixelInCell: CodeWithAuthorityType;
}
export interface ImageDatumType extends _ImageDatumType { constructor: { new(): ImageDatumType }; }
export var ImageDatumType: { new(): ImageDatumType };

export type IncrementOrder = ("+x+y" | "+y+x" | "+x-y" | "-x-y");
interface _IncrementOrder extends Primitive._string { content: IncrementOrder; }

interface _IndirectEntryType extends BaseType {
	DefinitionProxy: DefinitionProxyType;
}
export interface IndirectEntryType extends _IndirectEntryType { constructor: { new(): IndirectEntryType }; }
export var IndirectEntryType: { new(): IndirectEntryType };

interface _InlinePropertyType extends BaseType {
	owns: boolean;
}
export interface InlinePropertyType extends _InlinePropertyType { constructor: { new(): InlinePropertyType }; }
export var InlinePropertyType: { new(): InlinePropertyType };

/** A type for a list of values of the respective simple type. */
export type integerList = number[];

/** Extension to the respective XML Schema built-in simple type to allow a choice of either a value of the built-in simple type or a reason for a nil value. */
export type integerOrNilReason = string;
type _integerOrNilReason = Primitive._string;

/** A type for a list of values of the respective simple type. */
export type integerOrNilReasonList = string[];

/** gml:KnotPropertyType encapsulates a knot to use it in a geometric type. */
interface _KnotPropertyType extends BaseType {
	/** A knot is a breakpoint on a piecewise spline curve.
	  * value is the value of the parameter at the knot of the spline (see ISO 19107:2003, 6.4.24.2).
	  * multiplicity is the multiplicity of this knot used in the definition of the spline (with the same weight).
	  * weight is the value of the averaging weight used for this knot of the spline. */
	Knot: KnotType;
}
export interface KnotPropertyType extends _KnotPropertyType { constructor: { new(): KnotPropertyType }; }
export var KnotPropertyType: { new(): KnotPropertyType };

interface _KnotType extends BaseType {
	multiplicity: number;
	value: number;
	weight: number;
}
export interface KnotType extends _KnotType { constructor: { new(): KnotType }; }
export var KnotType: { new(): KnotType };

/** This enumeration type specifies values for the knots' type (see ISO 19107:2003, 6.4.25). */
export type KnotTypesType = ("uniform" | "quasiUniform" | "piecewiseBezier");
interface _KnotTypesType extends Primitive._string { content: KnotTypesType; }

/** This is a prototypical definition for a specific measure type defined as a vacuous extension (i.e. aliases) of gml:MeasureType. In this case, the content model supports the description of a length (or distance) quantity, with its units. The unit of measure referenced by uom shall be suitable for a length, such as metres or feet. */
interface _LengthType extends _MeasureType {}
export interface LengthType extends _LengthType { constructor: { new(): LengthType }; }
export var LengthType: { new(): LengthType };

/** gml:LinearCSPropertyType is a property type for association roles to a linear coordinate system, either referencing or containing the definition of that coordinate system. */
interface _LinearCSPropertyType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** gml:LinearCS is a one-dimensional coordinate system that consists of the points that lie on the single axis described. The associated coordinate is the distance – with or without offset – from the specified datum to the point along the axis. A LinearCS shall have one gml:axis property element. */
	LinearCS?: LinearCSType;
}
export interface LinearCSPropertyType extends _LinearCSPropertyType { constructor: { new(): LinearCSPropertyType }; }
export var LinearCSPropertyType: { new(): LinearCSPropertyType };

interface _LinearCSType extends _AbstractCoordinateSystemType {}
export interface LinearCSType extends _LinearCSType { constructor: { new(): LinearCSType }; }
export var LinearCSType: { new(): LinearCSType };

/** A property with the content model of gml:LinearRingPropertyType encapsulates a linear ring to represent a component of a surface boundary. */
interface _LinearRingPropertyType extends BaseType {
	/** A LinearRing is defined by four or more coordinate tuples, with linear interpolation between them; the first and last coordinates shall be coincident. The number of direct positions in the list shall be at least four. */
	LinearRing: LinearRingType;
}
export interface LinearRingPropertyType extends _LinearRingPropertyType { constructor: { new(): LinearRingPropertyType }; }
export var LinearRingPropertyType: { new(): LinearRingPropertyType };

interface _LinearRingType extends _AbstractRingType {
	coordinates: CoordinatesType;
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty is the predefined property which may be used by GML Application Schemas whenever a GML feature has a property with a value that is substitutable for Point. */
	pointProperty: PointPropertyType[];
	pointRep: PointPropertyType[];
	pos: DirectPositionType[];
	posList: DirectPositionListType;
}
export interface LinearRingType extends _LinearRingType { constructor: { new(): LinearRingType }; }
export var LinearRingType: { new(): LinearRingType };

/** gml:LineStringSegmentArrayPropertyType provides a container for line strings. */
interface _LineStringSegmentArrayPropertyType extends BaseType {
	/** A LineStringSegment is a curve segment that is defined by two or more control points including the start and end point, with linear interpolation between them.
	  * The content model follows the general pattern for the encoding of curve segments. */
	LineStringSegment?: LineStringSegmentType[];
}
export interface LineStringSegmentArrayPropertyType extends _LineStringSegmentArrayPropertyType { constructor: { new(): LineStringSegmentArrayPropertyType }; }
export var LineStringSegmentArrayPropertyType: { new(): LineStringSegmentArrayPropertyType };

interface _LineStringSegmentType extends _AbstractCurveSegmentType {
	interpolation: CurveInterpolationType;
	coordinates: CoordinatesType;
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty is the predefined property which may be used by GML Application Schemas whenever a GML feature has a property with a value that is substitutable for Point. */
	pointProperty: PointPropertyType[];
	pointRep: PointPropertyType[];
	pos: DirectPositionType[];
	posList: DirectPositionListType;
}
export interface LineStringSegmentType extends _LineStringSegmentType { constructor: { new(): LineStringSegmentType }; }
export var LineStringSegmentType: { new(): LineStringSegmentType };

interface _LineStringType extends _AbstractCurveType {
	coordinates: CoordinatesType;
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty is the predefined property which may be used by GML Application Schemas whenever a GML feature has a property with a value that is substitutable for Point. */
	pointProperty: PointPropertyType[];
	pointRep: PointPropertyType[];
	pos: DirectPositionType[];
	posList: DirectPositionListType;
}
export interface LineStringType extends _LineStringType { constructor: { new(): LineStringType }; }
export var LineStringType: { new(): LineStringType };

interface _LocationPropertyType extends _AbstractGeometryProxyType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	LocationKeyWord: CodeType;
	LocationString: StringOrRefType;
	Null: string;
}
export interface LocationPropertyType extends _LocationPropertyType { constructor: { new(): LocationPropertyType }; }
export var LocationPropertyType: { new(): LocationPropertyType };

interface _LocationProxyType extends BaseType {
	location?: LocationPropertyType;
	priorityLocation?: PriorityLocationPropertyType;
}
interface LocationProxyType extends _LocationProxyType { constructor: { new(): LocationProxyType }; }

interface _MappingRuleType extends BaseType {
	ruleDefinition: string;
	ruleReference: ReferenceType;
}
export interface MappingRuleType extends _MappingRuleType { constructor: { new(): MappingRuleType }; }
export var MappingRuleType: { new(): MappingRuleType };

/** gml:MeasureListType provides for a list of quantities. */
export type MeasureListType = number[];

/** gml:MeasureOrNilReasonListType provides for a list of quantities. An instance element may also include embedded values from NilReasonType. It is intended to be used in situations where a value is expected, but the value may be absent for some reason. */
export type MeasureOrNilReasonListType = string[];

/** gml:MeasureType supports recording an amount encoded as a value of XML Schema double, together with a units of measure indicated by an attribute uom, short for "units Of measure". The value of the uom attribute identifies a reference system for the amount, usually a ratio or interval scale. */
interface _MeasureType extends Primitive._number {
	uom: string;
}
export interface MeasureType extends _MeasureType { constructor: { new(): MeasureType }; }
export var MeasureType: { new(): MeasureType };

interface _MetaDataPropertyType extends _AbstractMetaDataProxyType {
	about: string;
	nilReason: string;
	remoteSchema: string;
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

interface _MethodProxyType extends BaseType {
	/** gml:method is an association role to the operation method used by a coordinate operation. */
	method?: OperationMethodPropertyType;
	usesMethod?: OperationMethodPropertyType;
}
interface MethodProxyType extends _MethodProxyType { constructor: { new(): MethodProxyType }; }

interface _MovingObjectStatusType extends _AbstractTimeSliceType, _LocationProxyType {
	acceleration?: MeasureType;
	bearing?: DirectionPropertyType;
	elevation?: MeasureType;
	/** The gml:locationName property element is a convenience property where the text value describes the location of the feature. If the location names are selected from a controlled list, then the list shall be identified in the codeSpace attribute. */
	locationName: CodeType;
	/** The gml:locationReference property element is a convenience property where the text value referenced by the xlink:href attribute describes the location of the feature. */
	locationReference: ReferenceType;
	pos: DirectPositionType;
	position: GeometryPropertyType;
	speed?: MeasureType;
	status?: StringOrRefType;
	statusReference?: ReferenceType;
}
export interface MovingObjectStatusType extends _MovingObjectStatusType { constructor: { new(): MovingObjectStatusType }; }
export var MovingObjectStatusType: { new(): MovingObjectStatusType };

/** A property that has a collection of curves as its value domain may either be an appropriate geometry element encapsulated in an element of this type or an XLink reference to a remote geometry element (where remote includes geometry elements located elsewhere in the same document). Either the reference or the contained element shall be given, but neither both nor none. */
interface _MultiCurvePropertyType extends BaseType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** A gml:MultiCurve is defined by one or more gml:AbstractCurves.
	  * The members of the geometric aggregate may be specified either using the "standard" property (gml:curveMember) or the array property (gml:curveMembers). It is also valid to use both the "standard" and the array properties in the same collection. */
	MultiCurve?: MultiCurveType;
}
export interface MultiCurvePropertyType extends _MultiCurvePropertyType { constructor: { new(): MultiCurvePropertyType }; }
export var MultiCurvePropertyType: { new(): MultiCurvePropertyType };

interface _MultiCurveType extends _AbstractGeometricAggregateType {
	curveMember?: CurvePropertyType[];
	/** This property element contains a list of curves. The order of the elements is significant and shall be preserved when processing the array. */
	curveMembers?: CurveArrayPropertyType;
}
export interface MultiCurveType extends _MultiCurveType { constructor: { new(): MultiCurveType }; }
export var MultiCurveType: { new(): MultiCurveType };

/** A property that has a geometric aggregate as its value domain may either be an appropriate geometry element encapsulated in an element of this type or an XLink reference to a remote geometry element (where remote includes geometry elements located elsewhere in the same document). Either the reference or the contained element shall be given, but neither both nor none. */
interface _MultiGeometryPropertyType extends _AbstractGeometricAggregateProxyType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface MultiGeometryPropertyType extends _MultiGeometryPropertyType { constructor: { new(): MultiGeometryPropertyType }; }
export var MultiGeometryPropertyType: { new(): MultiGeometryPropertyType };

interface _MultiGeometryType extends _AbstractGeometricAggregateType {
	/** This property element either references a geometry element via the XLink-attributes or contains the geometry element. */
	geometryMember?: GeometryPropertyType[];
	/** This property element contains a list of geometry elements. The order of the elements is significant and shall be preserved when processing the array. */
	geometryMembers?: GeometryArrayPropertyType;
}
export interface MultiGeometryType extends _MultiGeometryType { constructor: { new(): MultiGeometryType }; }
export var MultiGeometryType: { new(): MultiGeometryType };

/** A property that has a collection of points as its value domain may either be an appropriate geometry element encapsulated in an element of this type or an XLink reference to a remote geometry element (where remote includes geometry elements located elsewhere in the same document). Either the reference or the contained element shall be given, but neither both nor none. */
interface _MultiPointPropertyType extends BaseType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** A gml:MultiPoint consists of one or more gml:Points.
	  * The members of the geometric aggregate may be specified either using the "standard" property (gml:pointMember) or the array property (gml:pointMembers). It is also valid to use both the "standard" and the array properties in the same collection. */
	MultiPoint?: MultiPointType;
}
export interface MultiPointPropertyType extends _MultiPointPropertyType { constructor: { new(): MultiPointPropertyType }; }
export var MultiPointPropertyType: { new(): MultiPointPropertyType };

interface _MultiPointType extends _AbstractGeometricAggregateType {
	/** This property element either references a Point via the XLink-attributes or contains the Point element. */
	pointMember?: PointPropertyType[];
	/** This property element contains a list of points. The order of the elements is significant and shall be preserved when processing the array. */
	pointMembers?: PointArrayPropertyType;
}
export interface MultiPointType extends _MultiPointType { constructor: { new(): MultiPointType }; }
export var MultiPointType: { new(): MultiPointType };

/** A property that has a collection of solids as its value domain may either be an appropriate geometry element encapsulated in an element of this type or an XLink reference to a remote geometry element (where remote includes geometry elements located elsewhere in the same document). Either the reference or the contained element shall be given, but neither both nor none. */
interface _MultiSolidPropertyType extends BaseType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** A gml:MultiSolid is defined by one or more gml:AbstractSolids.
	  * The members of the geometric aggregate may be specified either using the "standard" property (gml:solidMember) or the array property (gml:solidMembers). It is also valid to use both the "standard" and the array properties in the same collection. */
	MultiSolid?: MultiSolidType;
}
export interface MultiSolidPropertyType extends _MultiSolidPropertyType { constructor: { new(): MultiSolidPropertyType }; }
export var MultiSolidPropertyType: { new(): MultiSolidPropertyType };

interface _MultiSolidType extends _AbstractGeometricAggregateType {
	/** This property element either references a solid via the XLink-attributes or contains the solid element. A solid element is any element, which is substitutable for gml:AbstractSolid. */
	solidMember?: SolidPropertyType[];
	/** This property element contains a list of solids. The order of the elements is significant and shall be preserved when processing the array. */
	solidMembers?: SolidArrayPropertyType;
}
export interface MultiSolidType extends _MultiSolidType { constructor: { new(): MultiSolidType }; }
export var MultiSolidType: { new(): MultiSolidType };

/** A property that has a collection of surfaces as its value domain may either be an appropriate geometry element encapsulated in an element of this type or an XLink reference to a remote geometry element (where remote includes geometry elements located elsewhere in the same document). Either the reference or the contained element shall be given, but neither both nor none. */
interface _MultiSurfacePropertyType extends BaseType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** A gml:MultiSurface is defined by one or more gml:AbstractSurfaces.
	  * The members of the geometric aggregate may be specified either using the "standard" property (gml:surfaceMember) or the array property (gml:surfaceMembers). It is also valid to use both the "standard" and the array properties in the same collection. */
	MultiSurface?: MultiSurfaceType;
}
export interface MultiSurfacePropertyType extends _MultiSurfacePropertyType { constructor: { new(): MultiSurfacePropertyType }; }
export var MultiSurfacePropertyType: { new(): MultiSurfacePropertyType };

interface _MultiSurfaceType extends _AbstractGeometricAggregateType {
	/** This property element either references a surface via the XLink-attributes or contains the surface element. A surface element is any element, which is substitutable for gml:AbstractSurface. */
	surfaceMember?: SurfacePropertyType[];
	/** This property element contains a list of surfaces. The order of the elements is significant and shall be preserved when processing the array. */
	surfaceMembers?: SurfaceArrayPropertyType;
}
export interface MultiSurfaceType extends _MultiSurfaceType { constructor: { new(): MultiSurfaceType }; }
export var MultiSurfaceType: { new(): MultiSurfaceType };

/** A type for a list of values of the respective simple type. */
export type NameList = string[];

/** Extension to the respective XML Schema built-in simple type to allow a choice of either a value of the built-in simple type or a reason for a nil value. */
export type NameOrNilReason = string;
type _NameOrNilReason = Primitive._string;

/** A type for a list of values of the respective simple type. */
export type NameOrNilReasonList = string[];

/** A type for a list of values of the respective simple type. */
export type NCNameList = string[];

export type NilReasonEnumeration = string;
type _NilReasonEnumeration = Primitive._string;

/** gml:NilReasonType defines a content model that allows recording of an explanation for a void value or other exception.
  * gml:NilReasonType is a union of the following enumerated values:
  * -	inapplicable there is no value
  * -	missing the correct value is not readily available to the sender of this data. Furthermore, a correct value may not exist
  * -	template the value will be available later
  * -	unknown the correct value is not known to, and not computable by, the sender of this data. However, a correct value probably exists
  * -	withheld the value is not divulged
  * -	other:text other brief explanation, where text is a string of two or more characters with no included spaces
  * and
  * -	anyURI which should refer to a resource which describes the reason for the exception
  * A particular community may choose to assign more detailed semantics to the standard values provided. Alternatively, the URI method enables a specific or more complete explanation for the absence of a value to be provided elsewhere and indicated by-reference in an instance document.
  * gml:NilReasonType is used as a member of a union in a number of simple content types where it is necessary to permit a value from the NilReasonType union as an alternative to the primary type. */
export type NilReasonType = string;
type _NilReasonType = Primitive._string;

interface _NodeOrEdgePropertyType extends BaseType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** gml:Edge represents the 1-dimensional primitive.
	  * The topological boundary of an Edge (gml:directedNode) consists of a negatively directed start Node and a positively directed end Node.
	  * The optional coboundary of an edge (gml:directedFace) is a circular sequence of directed faces which are incident on this edge in document order. In the 2D case, the orientation of the face on the left of the edge is "+"; the orientation of the face on the right on its right is "-".
	  * If provided, the aggregationType attribute shall have the value "sequence".
	  * An edge may optionally be realised by a 1-dimensional geometric primitive (gml:curveProperty). */
	Edge?: EdgeType;
	/** gml:Node represents the 0-dimensional primitive.
	  * The optional coboundary of a node (gml:directedEdge) is a sequence of directed edges which are incident on this node. Edges emanating from this node appear in the node coboundary with a negative orientation.
	  * If provided, the aggregationType attribute shall have the value "sequence".
	  * A node may optionally be realised by a 0-dimensional geometric primitive (gml:pointProperty). */
	Node?: NodeType;
}
export interface NodeOrEdgePropertyType extends _NodeOrEdgePropertyType { constructor: { new(): NodeOrEdgePropertyType }; }
export var NodeOrEdgePropertyType: { new(): NodeOrEdgePropertyType };

interface _NodePropertyType extends BaseType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** gml:Node represents the 0-dimensional primitive.
	  * The optional coboundary of a node (gml:directedEdge) is a sequence of directed edges which are incident on this node. Edges emanating from this node appear in the node coboundary with a negative orientation.
	  * If provided, the aggregationType attribute shall have the value "sequence".
	  * A node may optionally be realised by a 0-dimensional geometric primitive (gml:pointProperty). */
	Node?: NodeType;
}
export interface NodePropertyType extends _NodePropertyType { constructor: { new(): NodePropertyType }; }
export var NodePropertyType: { new(): NodePropertyType };

interface _NodeType extends _AbstractTopoPrimitiveType {
	aggregationType: AggregationType;
	container?: FaceOrTopoSolidPropertyType;
	/** A gml:directedEdge property element describes the boundary of topology faces, the coBoundary of topology nodes and is used in the support of topological line features via the gml:TopoCurve expression, see below. The orientation attribute of type gml:SignType expresses the sense in which the included edge is used, i.e. forward or reverse. */
	directedEdge?: DirectedEdgePropertyType[];
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty is the predefined property which may be used by GML Application Schemas whenever a GML feature has a property with a value that is substitutable for Point. */
	pointProperty?: PointPropertyType;
}
export interface NodeType extends _NodeType { constructor: { new(): NodeType }; }
export var NodeType: { new(): NodeType };

interface _ObliqueCartesianCSPropertyType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	ObliqueCartesianCS?: ObliqueCartesianCSType;
}
export interface ObliqueCartesianCSPropertyType extends _ObliqueCartesianCSPropertyType { constructor: { new(): ObliqueCartesianCSPropertyType }; }
export var ObliqueCartesianCSPropertyType: { new(): ObliqueCartesianCSPropertyType };

interface _ObliqueCartesianCSType extends _AbstractCoordinateSystemType {}
export interface ObliqueCartesianCSType extends _ObliqueCartesianCSType { constructor: { new(): ObliqueCartesianCSType }; }
export var ObliqueCartesianCSType: { new(): ObliqueCartesianCSType };

interface _ObservationProxyType extends _DirectedObservationProxyType {
	/** The content model is a straightforward extension of gml:AbstractFeatureType; it automatically has the gml:identifier, gml:description, gml:descriptionReference, gml:name, and gml:boundedBy properties.
	  * The gml:validTime element describes the time of the observation. Note that this may be a time instant or a time period.
	  * The gml:using property contains or references a description of a sensor, instrument or procedure used for the observation.
	  * The gml:target property contains or references the specimen, region or station which is the object of the observation. This property is particularly useful for remote observations, such as photographs, where a generic location property might apply to the location of the camera or the location of the field of view, and thus may be ambiguous.
	  * The gml:subject element is provided as a convenient synonym for gml:target. This is the term commonly used in phtotography.
	  * The gml:resultOf property indicates the result of the observation.  The value may be inline, or a reference to a value elsewhere. */
	Observation?: ObservationType;
}
interface ObservationProxyType extends _ObservationProxyType { constructor: { new(): ObservationProxyType }; }

interface _ObservationType extends _AbstractFeatureType, _TargetProxyType {
	resultOf: ResultType;
	using?: ProcedurePropertyType;
	/** gml:validTime is a convenience property element. */
	validTime: TimePrimitivePropertyType;
}
export interface ObservationType extends _ObservationType { constructor: { new(): ObservationType }; }
export var ObservationType: { new(): ObservationType };

interface _OffsetCurveType extends _AbstractCurveSegmentType {
	distance: LengthType;
	offsetBase: CurvePropertyType;
	refDirection?: VectorType;
}
export interface OffsetCurveType extends _OffsetCurveType { constructor: { new(): OffsetCurveType }; }
export var OffsetCurveType: { new(): OffsetCurveType };

/** gml:OperationMethodPropertyType is a property type for association roles to a concrete general-purpose operation method, either referencing or containing the definition of that method. */
interface _OperationMethodPropertyType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** gml:OperationMethod is a method (algorithm or procedure) used to perform a coordinate operation. Most operation methods use a number of operation parameters, although some coordinate conversions use none. Each coordinate operation using the method assigns values to these parameters.
	  * The parameter elements are an unordered list of associations to the set of operation parameters and parameter groups used by this operation method. */
	OperationMethod?: OperationMethodType;
}
export interface OperationMethodPropertyType extends _OperationMethodPropertyType { constructor: { new(): OperationMethodPropertyType }; }
export var OperationMethodPropertyType: { new(): OperationMethodPropertyType };

interface _OperationMethodType extends _IdentifiedObjectType, _FormulaProxyType {
	/** gml:formulaCitation provides a reference to a publication giving the formula(s) or procedure used by an coordinate operation method. */
	formulaCitation: FormulaCitationType;
	/** gml:parameter is an association to an operation parameter or parameter group. */
	parameter?: ParameterProxyType[];
	/** gml:sourceDimensions is the number of dimensions in the source CRS of this operation method. */
	sourceDimensions?: number;
	/** gml:targetDimensions is the number of dimensions in the target CRS of this operation method. */
	targetDimensions?: number;
}
export interface OperationMethodType extends _OperationMethodType { constructor: { new(): OperationMethodType }; }
export var OperationMethodType: { new(): OperationMethodType };

/** gml:OperationParameterPropertyType is a property type for association roles to an operation parameter group, either referencing or containing the definition of that parameter group. */
interface _OperationParameterGroupPropertyType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** gml:OperationParameterGroup is the definition of a group of parameters used by an operation method. This complex type is expected to be used or extended for all applicable operation methods, without defining operation-method-specialized element names.
	  * The generalOperationParameter elements are an unordered list of associations to the set of operation parameters that are members of this group. */
	OperationParameterGroup?: OperationParameterGroupType;
}
export interface OperationParameterGroupPropertyType extends _OperationParameterGroupPropertyType { constructor: { new(): OperationParameterGroupPropertyType }; }
export var OperationParameterGroupPropertyType: { new(): OperationParameterGroupPropertyType };

interface _OperationParameterGroupType extends _AbstractGeneralOperationParameterType {
	/** gml:maximumOccurs is the maximum number of times that values for this parameter group may be included. If this attribute is omitted, the maximum number shall be one. */
	maximumOccurs?: number;
	/** gml:parameter is an association to an operation parameter or parameter group. */
	parameter: ParameterProxyType[];
}
export interface OperationParameterGroupType extends _OperationParameterGroupType { constructor: { new(): OperationParameterGroupType }; }
export var OperationParameterGroupType: { new(): OperationParameterGroupType };

/** gml:OperationParameterPropertyType is a property type for association roles to an operation parameter, either referencing or containing the definition of that parameter. */
interface _OperationParameterPropertyType extends _OperationParameterProxyType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface OperationParameterPropertyType extends _OperationParameterPropertyType { constructor: { new(): OperationParameterPropertyType }; }
export var OperationParameterPropertyType: { new(): OperationParameterPropertyType };

interface _OperationParameterProxyType extends BaseType {
	/** gml:OperationParameter is the definition of a parameter used by an operation method. Most parameter values are numeric, but other types of parameter values are possible. This complex type is expected to be used or extended for all operation methods, without defining operation-method-specialized element names. */
	OperationParameter?: OperationParameterType;
	valueOfParameter?: OperationParameterPropertyType;
}
interface OperationParameterProxyType extends _OperationParameterProxyType { constructor: { new(): OperationParameterProxyType }; }

interface _OperationParameterType extends _AbstractGeneralOperationParameterType {}
export interface OperationParameterType extends _OperationParameterType { constructor: { new(): OperationParameterType }; }
export var OperationParameterType: { new(): OperationParameterType };

interface _OperationPropertyType extends _AbstractOperationProxyType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface OperationPropertyType extends _OperationPropertyType { constructor: { new(): OperationPropertyType }; }
export var OperationPropertyType: { new(): OperationPropertyType };

interface _OrientableCurveType extends _AbstractCurveType {
	orientation: SignType;
	/** The property baseCurve references or contains the base curve, i.e. it either references the base curve via the XLink-attributes or contains the curve element. A curve element is any element which is substitutable for AbstractCurve. The base curve has positive orientation. */
	baseCurve: CurvePropertyType;
}
export interface OrientableCurveType extends _OrientableCurveType { constructor: { new(): OrientableCurveType }; }
export var OrientableCurveType: { new(): OrientableCurveType };

interface _OrientableSurfaceType extends _AbstractSurfaceType {
	orientation: SignType;
	/** The property baseSurface references or contains the base surface. The property baseSurface either references the base surface via the XLink-attributes or contains the surface element. A surface element is any element which is substitutable for gml:AbstractSurface. The base surface has positive orientation. */
	baseSurface: SurfacePropertyType;
}
export interface OrientableSurfaceType extends _OrientableSurfaceType { constructor: { new(): OrientableSurfaceType }; }
export var OrientableSurfaceType: { new(): OrientableSurfaceType };

interface _ParameterProxyType extends _GeneralOperationParameterProxyType {
	/** gml:parameter is an association to an operation parameter or parameter group. */
	parameter?: AbstractGeneralOperationParameterPropertyType;
	includesParameter?: AbstractGeneralOperationParameterPropertyType;
}
interface ParameterProxyType extends _ParameterProxyType { constructor: { new(): ParameterProxyType }; }

interface _ParameterValueGroupType extends _AbstractGeneralParameterValueType, _GroupProxyType {
	/** gml:ParameterValue is a parameter value, an ordered sequence of values, or a reference to a file of parameter values. This concrete complex type may be used for operation methods without using an Application Schema that defines operation-method-specialized element names and contents, especially for methods with only one instance. This complex type may be used, extended, or restricted for well-known operation methods, especially for methods with many instances. */
	ParameterValue: ParameterValueProxyType[];
}
export interface ParameterValueGroupType extends _ParameterValueGroupType { constructor: { new(): ParameterValueGroupType }; }
export var ParameterValueGroupType: { new(): ParameterValueGroupType };

interface _ParameterValueProxyType extends BaseType {
	/** gml:ParameterValue is a parameter value, an ordered sequence of values, or a reference to a file of parameter values. This concrete complex type may be used for operation methods without using an Application Schema that defines operation-method-specialized element names and contents, especially for methods with only one instance. This complex type may be used, extended, or restricted for well-known operation methods, especially for methods with many instances. */
	ParameterValue?: ParameterValueType;
	includesValue?: AbstractGeneralParameterValuePropertyType;
	usesValue?: AbstractGeneralParameterValuePropertyType;
}
interface ParameterValueProxyType extends _ParameterValueProxyType { constructor: { new(): ParameterValueProxyType }; }

interface _ParameterValueType extends _AbstractGeneralParameterValueType, _OperationParameterProxyType {
	/** gml:booleanValue is a boolean value of an operation parameter. A Boolean value does not have an associated unit of measure. */
	booleanValue: boolean;
	dmsAngleValue: DMSAngleType;
	/** gml:integerValue is a positive integer value of an operation parameter, usually used for a count. An integer value does not have an associated unit of measure. */
	integerValue: number;
	/** gml:integerValueList is an ordered sequence of two or more integer values of an operation parameter list, usually used for counts. These integer values do not have an associated unit of measure. An element of this type contains a space-separated sequence of integer values. */
	integerValueList: integerList;
	/** gml:stringValue is a character string value of an operation parameter. A string value does not have an associated unit of measure. */
	stringValue: string;
	/** gml:value is a numeric value of an operation parameter, with its associated unit of measure. */
	value: MeasureType;
	/** gml:valueFile is a reference to a file or a part of a file containing one or more parameter values, each numeric value with its associated unit of measure. When referencing a part of a file, that file shall contain multiple identified parts, such as an XML encoded document. Furthermore, the referenced file or part of a file may reference another part of the same or different files, as allowed in XML documents. */
	valueFile: string;
	/** gml:valueList is an ordered sequence of two or more numeric values of an operation parameter list, where each value has the same associated unit of measure. An element of this type contains a space-separated sequence of double values. */
	valueList: MeasureListType;
}
export interface ParameterValueType extends _ParameterValueType { constructor: { new(): ParameterValueType }; }
export var ParameterValueType: { new(): ParameterValueType };

/** gml:PassThroughOperationPropertyType is a property type for association roles to a pass through operation, either referencing or containing the definition of that pass through operation. */
interface _PassThroughOperationPropertyType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** gml:PassThroughOperation is a pass-through operation specifies that a subset of a coordinate tuple is subject to a specific coordinate operation.
	  * The modifiedCoordinate property elements are an ordered sequence of positive integers defining the positions in a coordinate tuple of the coordinates affected by this pass-through operation. The AggregationAttributeGroup should be used to specify that the modifiedCoordinate elements are ordered. */
	PassThroughOperation?: PassThroughOperationType;
}
export interface PassThroughOperationPropertyType extends _PassThroughOperationPropertyType { constructor: { new(): PassThroughOperationPropertyType }; }
export var PassThroughOperationPropertyType: { new(): PassThroughOperationPropertyType };

interface _PassThroughOperationType extends _AbstractCoordinateOperationType, _CoordOperationProxyType {
	aggregationType: AggregationType;
	/** gml:modifiedCoordinate is a positive integer defining a position in a coordinate tuple. */
	modifiedCoordinate: number[];
}
export interface PassThroughOperationType extends _PassThroughOperationType { constructor: { new(): PassThroughOperationType }; }
export var PassThroughOperationType: { new(): PassThroughOperationType };

interface _PatchesProxyType extends BaseType {
	/** The patches property element contains the sequence of surface patches. The order of the elements is significant and shall be preserved when processing the array. */
	patches?: SurfacePatchArrayPropertyType;
	polygonPatches?: SurfacePatchArrayPropertyType;
	trianglePatches?: SurfacePatchArrayPropertyType;
}
interface PatchesProxyType extends _PatchesProxyType { constructor: { new(): PatchesProxyType }; }

/** gml:PointArrayPropertyType is a container for an array of points. The elements are always contained inline in the array property, referencing geometry elements or arrays of geometry elements via XLinks is not supported. */
interface _PointArrayPropertyType extends BaseType {
	owns: boolean;
	/** A Point is defined by a single coordinate tuple. The direct position of a point is specified by the pos element which is of type DirectPositionType. */
	Point?: PointType[];
}
export interface PointArrayPropertyType extends _PointArrayPropertyType { constructor: { new(): PointArrayPropertyType }; }
export var PointArrayPropertyType: { new(): PointArrayPropertyType };

/** A property that has a point as its value domain may either be an appropriate geometry element encapsulated in an element of this type or an XLink reference to a remote geometry element (where remote includes geometry elements located elsewhere in the same document). Either the reference or the contained element shall be given, but neither both nor none. */
interface _PointPropertyType extends BaseType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** A Point is defined by a single coordinate tuple. The direct position of a point is specified by the pos element which is of type DirectPositionType. */
	Point?: PointType;
}
export interface PointPropertyType extends _PointPropertyType { constructor: { new(): PointPropertyType }; }
export var PointPropertyType: { new(): PointPropertyType };

interface _PointType extends _AbstractGeometricPrimitiveType {
	coordinates: CoordinatesType;
	pos: DirectPositionType;
}
export interface PointType extends _PointType { constructor: { new(): PointType }; }
export var PointType: { new(): PointType };

/** gml:PolarCSPropertyType is a property type for association roles to a polar coordinate system, either referencing or containing the definition of that coordinate system. */
interface _PolarCSPropertyType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** gml:PolarCS ia s two-dimensional coordinate system in which position is specified by the distance from the origin and the angle between the line from the origin to a point and a reference direction. A PolarCS shall have two gml:axis property elements. */
	PolarCS?: PolarCSType;
}
export interface PolarCSPropertyType extends _PolarCSPropertyType { constructor: { new(): PolarCSPropertyType }; }
export var PolarCSPropertyType: { new(): PolarCSPropertyType };

interface _PolarCSType extends _AbstractCoordinateSystemType {}
export interface PolarCSType extends _PolarCSType { constructor: { new(): PolarCSType }; }
export var PolarCSType: { new(): PolarCSType };

interface _PolygonPatchType extends _AbstractSurfacePatchType {
	interpolation: SurfaceInterpolationType;
	/** A boundary of a surface consists of a number of rings. In the normal 2D case, one of these rings is distinguished as being the exterior boundary. In a general manifold this is not always possible, in which case all boundaries shall be listed as interior boundaries, and the exterior will be empty. */
	exterior?: AbstractRingPropertyType;
	/** A boundary of a surface consists of a number of rings. The "interior" rings separate the surface / surface patch from the area enclosed by the rings. */
	interior?: AbstractRingPropertyType[];
}
export interface PolygonPatchType extends _PolygonPatchType { constructor: { new(): PolygonPatchType }; }
export var PolygonPatchType: { new(): PolygonPatchType };

interface _PolygonType extends _AbstractSurfaceType {
	/** A boundary of a surface consists of a number of rings. In the normal 2D case, one of these rings is distinguished as being the exterior boundary. In a general manifold this is not always possible, in which case all boundaries shall be listed as interior boundaries, and the exterior will be empty. */
	exterior?: AbstractRingPropertyType;
	/** A boundary of a surface consists of a number of rings. The "interior" rings separate the surface / surface patch from the area enclosed by the rings. */
	interior?: AbstractRingPropertyType[];
}
export interface PolygonType extends _PolygonType { constructor: { new(): PolygonType }; }
export var PolygonType: { new(): PolygonType };

/** gml:PrimeMeridianPropertyType is a property type for association roles to a prime meridian, either referencing or containing the definition of that meridian. */
interface _PrimeMeridianPropertyType extends _PrimeMeridianProxyType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface PrimeMeridianPropertyType extends _PrimeMeridianPropertyType { constructor: { new(): PrimeMeridianPropertyType }; }
export var PrimeMeridianPropertyType: { new(): PrimeMeridianPropertyType };

interface _PrimeMeridianProxyType extends BaseType {
	/** A gml:PrimeMeridian defines the origin from which longitude values are determined. The default value for the prime meridian gml:identifier value is "Greenwich". */
	PrimeMeridian?: PrimeMeridianType;
	usesPrimeMeridian?: PrimeMeridianPropertyType;
}
interface PrimeMeridianProxyType extends _PrimeMeridianProxyType { constructor: { new(): PrimeMeridianProxyType }; }

interface _PrimeMeridianType extends _IdentifiedObjectType {
	/** gml:greenwichLongitude is the longitude of the prime meridian measured from the Greenwich meridian, positive eastward. If the value of the prime meridian "name" is "Greenwich" then the value of greenwichLongitude shall be 0 degrees. */
	greenwichLongitude: AngleType;
}
export interface PrimeMeridianType extends _PrimeMeridianType { constructor: { new(): PrimeMeridianType }; }
export var PrimeMeridianType: { new(): PrimeMeridianType };

interface _PriorityLocationPropertyType extends _LocationPropertyType {
	priority: string;
}
export interface PriorityLocationPropertyType extends _PriorityLocationPropertyType { constructor: { new(): PriorityLocationPropertyType }; }
export var PriorityLocationPropertyType: { new(): PriorityLocationPropertyType };

interface _ProcedurePropertyType extends _AbstractFeatureProxyType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface ProcedurePropertyType extends _ProcedurePropertyType { constructor: { new(): ProcedurePropertyType }; }
export var ProcedurePropertyType: { new(): ProcedurePropertyType };

/** gml:ProjectedCRSPropertyType is a property type for association roles to a projected coordinate reference system, either referencing or containing the definition of that reference system. */
interface _ProjectedCRSPropertyType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** gml:ProjectedCRS is a 2D coordinate reference system used to approximate the shape of the earth on a planar surface, but in such a way that the distortion that is inherent to the approximation is carefully controlled and known. Distortion correction is commonly applied to calculated bearings and distances to produce values that are a close match to actual field values. */
	ProjectedCRS?: ProjectedCRSType;
}
export interface ProjectedCRSPropertyType extends _ProjectedCRSPropertyType { constructor: { new(): ProjectedCRSPropertyType }; }
export var ProjectedCRSPropertyType: { new(): ProjectedCRSPropertyType };

interface _ProjectedCRSType extends _AbstractGeneralDerivedCRSType, _CartesianCSProxyType {
	/** gml:baseGeodeticCRS is an association role to the geodetic coordinate reference system used by this projected CRS. */
	baseGeodeticCRS: GeodeticCRSPropertyType;
	baseGeographicCRS: GeographicCRSPropertyType;
}
export interface ProjectedCRSType extends _ProjectedCRSType { constructor: { new(): ProjectedCRSType }; }
export var ProjectedCRSType: { new(): ProjectedCRSType };

/** A type for a list of values of the respective simple type. */
export type QNameList = string[];

export type QuantityExtentType = string[];

interface _QuantityPropertyType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** An XML attribute uom ("unit of measure") is required, whose value is a URI which identifies the definition of a ratio scale or units by which the numeric value shall be multiplied, or an interval or position scale on which the value occurs. */
	Quantity?: QuantityType;
}
export interface QuantityPropertyType extends _QuantityPropertyType { constructor: { new(): QuantityPropertyType }; }
export var QuantityPropertyType: { new(): QuantityPropertyType };

interface _QuantityType extends _MeasureType {
	nilReason: string;
}
interface QuantityType extends _QuantityType { constructor: { new(): QuantityType }; }

interface _RangeSetType extends BaseType {
	/** gml:AbstractScalarValueList is an abstract element which acts as the head of a substitution group which contains gml:BooleanList, gml:CategoryList, gml:CountList and gml:QuantityList, and (transitively) the elements in their substitution groups. */
	AbstractScalarValueList: AbstractScalarValueListProxyType[];
	/** gml:DataBlock describes the Range as a block of text encoded values similar to a Common Separated Value (CSV) representation.
	  * The range set parameterization is described by the property gml:rangeParameters. */
	DataBlock: DataBlockType;
	/** for efficiency reasons, GML also provides a means of encoding the range set in an arbitrary external encoding, such as a binary file.  This encoding may be "well-known" but this is not required. This mode uses the gml:File element.
	  * The values of the coverage (attribute values in the range set) are transmitted in a external file that is referenced from the XML structure described by gml:FileType.  The external file is referenced by the gml:fileReference property that is an anyURI (the gml:fileName property has been deprecated).  This means that the external file may be located remotely from the referencing GML instance.
	  * The gml:compression property points to a definition of a compression algorithm through an anyURI.  This may be a retrievable, computable definition or simply a reference to an unambiguous name for the compression method.
	  * The gml:mimeType property points to a definition of the file mime type.
	  * The gml:fileStructure property is defined by a codelist. Note further that all values shall be enclosed in a single file. Multi-file structures for values are not supported in GML.
	  * The semantics of the range set is described as above using the gml:rangeParameters property.
	  * Note that if any compression algorithm is applied, the structure above applies only to the pre-compression or post-decompression structure of the file.
	  * Note that the fields within a record match the gml:valueComponents of the gml:CompositeValue in document order. */
	File: FileType;
	/** A Value Array is used for homogeneous arrays of primitive and aggregate values.
	  * The member values may be scalars, composites, arrays or lists.
	  * ValueArray has the same content model as CompositeValue, but the member values shall be homogeneous.  The element declaration contains a Schematron constraint which expresses this restriction precisely.  Since the members are homogeneous, the gml:referenceSystem (uom, codeSpace) may be specified on the gml:ValueArray itself and inherited by all the members if desired. */
	ValueArray: ValueArrayType[];
}
export interface RangeSetType extends _RangeSetType { constructor: { new(): RangeSetType }; }
export var RangeSetType: { new(): RangeSetType };

interface _RectangleType extends _AbstractSurfacePatchType {
	interpolation: SurfaceInterpolationType;
	/** A boundary of a surface consists of a number of rings. In the normal 2D case, one of these rings is distinguished as being the exterior boundary. In a general manifold this is not always possible, in which case all boundaries shall be listed as interior boundaries, and the exterior will be empty. */
	exterior: AbstractRingPropertyType;
}
export interface RectangleType extends _RectangleType { constructor: { new(): RectangleType }; }
export var RectangleType: { new(): RectangleType };

interface _RectifiedGridType extends _GridType {
	offsetVector: VectorType[];
	origin: PointPropertyType;
}
export interface RectifiedGridType extends _RectifiedGridType { constructor: { new(): RectifiedGridType }; }
export var RectifiedGridType: { new(): RectifiedGridType };

/** gml:ReferenceType is intended to be used in application schemas directly, if a property element shall use a "by-reference only" encoding. */
interface _ReferenceType extends BaseType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
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

/** gml:RelatedTimeType provides a content model for indicating the relative position of an arbitrary member of the substitution group whose head is gml:AbstractTimePrimitive. It extends the generic gml:TimePrimitivePropertyType with an XML attribute relativePosition, whose value is selected from the set of 13 temporal relationships identified by Allen (1983) */
interface _RelatedTimeType extends _TimePrimitivePropertyType {
	relativePosition: RelatedTimeTypeRelativePositionType;
}
export interface RelatedTimeType extends _RelatedTimeType { constructor: { new(): RelatedTimeType }; }
export var RelatedTimeType: { new(): RelatedTimeType };

type RelatedTimeTypeRelativePositionType = ("Before" | "After" | "Begins" | "Ends" | "During" | "Equals" | "Contains" | "Overlaps" | "Meets" | "OverlappedBy" | "MetBy" | "BegunBy" | "EndedBy");
interface _RelatedTimeTypeRelativePositionType extends Primitive._string { content: RelatedTimeTypeRelativePositionType; }

interface _ResultType extends BaseType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface ResultType extends _ResultType { constructor: { new(): ResultType }; }
export var ResultType: { new(): ResultType };

/** A property with the content model of gml:RingPropertyType encapsulates a ring to represent a component of a surface boundary. */
interface _RingPropertyType extends BaseType {
	/** A ring is used to represent a single connected component of a surface boundary as specified in ISO 19107:2003, 6.3.6.
	  * Every gml:curveMember references or contains one curve, i.e. any element which is substitutable for gml:AbstractCurve. In the context of a ring, the curves describe the boundary of the surface. The sequence of curves shall be contiguous and connected in a cycle.
	  * If provided, the aggregationType attribute shall have the value "sequence". */
	Ring: RingType;
}
export interface RingPropertyType extends _RingPropertyType { constructor: { new(): RingPropertyType }; }
export var RingPropertyType: { new(): RingPropertyType };

interface _RingType extends _AbstractRingType {
	aggregationType: AggregationType;
	curveMember: CurvePropertyType[];
}
export interface RingType extends _RingType { constructor: { new(): RingType }; }
export var RingType: { new(): RingType };

interface _RowsType extends BaseType {
	Row: RowsTypeRowType[];
}
interface RowsType extends _RowsType { constructor: { new(): RowsType }; }

interface _RowsTypeRowType extends BaseType {
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty is the predefined property which may be used by GML Application Schemas whenever a GML feature has a property with a value that is substitutable for Point. */
	pointProperty: PointPropertyType[];
	pos: DirectPositionType[];
	posList: DirectPositionListType;
}
interface RowsTypeRowType extends _RowsTypeRowType { constructor: { new(): RowsTypeRowType }; }

interface _ScaleType extends _MeasureType {}
export interface ScaleType extends _ScaleType { constructor: { new(): ScaleType }; }
export var ScaleType: { new(): ScaleType };

interface _SecondDefiningParameterType extends BaseType {
	inverseFlattening: MeasureType;
	isSphere: boolean;
	semiMinorAxis: LengthType;
}
interface SecondDefiningParameterType extends _SecondDefiningParameterType { constructor: { new(): SecondDefiningParameterType }; }

interface _SecondDefiningParameterType_2 extends BaseType {
	SecondDefiningParameter: SecondDefiningParameterType;
}
interface SecondDefiningParameterType_2 extends _SecondDefiningParameterType_2 { constructor: { new(): SecondDefiningParameterType_2 }; }

export type SequenceRuleEnumeration = ("Linear" | "Boustrophedonic" | "Cantor-diagonal" | "Spiral" | "Morton" | "Hilbert");
interface _SequenceRuleEnumeration extends Primitive._string { content: SequenceRuleEnumeration; }

/** The gml:SequenceRuleType is derived from the gml:SequenceRuleEnumeration through the addition of an axisOrder attribute.  The gml:SequenceRuleEnumeration is an enumerated type. The rule names are defined in ISO 19123. If no rule name is specified the default is "Linear". */
interface _SequenceRuleType extends _SequenceRuleEnumeration {
	axisOrder: AxisDirectionList;
	order: IncrementOrder;
}
export interface SequenceRuleType extends _SequenceRuleType { constructor: { new(): SequenceRuleType }; }
export var SequenceRuleType: { new(): SequenceRuleType };

/** A property with the content model of gml:ShellPropertyType encapsulates a shell to represent a component of a solid boundary. */
interface _ShellPropertyType extends BaseType {
	/** A shell is used to represent a single connected component of a solid boundary as specified in ISO 19107:2003, 6.3.8.
	  * Every gml:surfaceMember references or contains one surface, i.e. any element which is substitutable for gml:AbstractSurface. In the context of a shell, the surfaces describe the boundary of the solid.
	  * If provided, the aggregationType attribute shall have the value "set". */
	Shell: ShellType;
}
export interface ShellPropertyType extends _ShellPropertyType { constructor: { new(): ShellPropertyType }; }
export var ShellPropertyType: { new(): ShellPropertyType };

interface _ShellType extends _AbstractSurfaceType {
	aggregationType: AggregationType;
	/** This property element either references a surface via the XLink-attributes or contains the surface element. A surface element is any element, which is substitutable for gml:AbstractSurface. */
	surfaceMember: SurfacePropertyType[];
}
export interface ShellType extends _ShellType { constructor: { new(): ShellType }; }
export var ShellType: { new(): ShellType };

/** gml:SignType is a convenience type with values "+" (plus) and "-" (minus). */
export type SignType = ("-" | "+");
interface _SignType extends Primitive._string { content: SignType; }

/** gml:SingleCRSPropertyType is a property type for association roles to a single coordinate reference system, either referencing or containing the definition of that coordinate reference system. */
interface _SingleCRSPropertyType extends _AbstractSingleCRSProxyType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface SingleCRSPropertyType extends _SingleCRSPropertyType { constructor: { new(): SingleCRSPropertyType }; }
export var SingleCRSPropertyType: { new(): SingleCRSPropertyType };

/** gml:SingleOperationPropertyType is a property type for association roles to a single operation, either referencing or containing the definition of that single operation. */
interface _SingleOperationPropertyType extends _AbstractSingleOperationProxyType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface SingleOperationPropertyType extends _SingleOperationPropertyType { constructor: { new(): SingleOperationPropertyType }; }
export var SingleOperationPropertyType: { new(): SingleOperationPropertyType };

/** gml:SolidArrayPropertyType is a container for an array of solids. The elements are always contained in the array property, referencing geometry elements or arrays of geometry elements is not supported. */
interface _SolidArrayPropertyType extends BaseType {
	owns: boolean;
	/** The AbstractSolid element is the abstract head of the substituition group for all (continuous) solid elements. */
	AbstractSolid?: AbstractSolidProxyType[];
}
export interface SolidArrayPropertyType extends _SolidArrayPropertyType { constructor: { new(): SolidArrayPropertyType }; }
export var SolidArrayPropertyType: { new(): SolidArrayPropertyType };

/** A property that has a solid as its value domain may either be an appropriate geometry element encapsulated in an element of this type or an XLink reference to a remote geometry element (where remote includes geometry elements located elsewhere in the same document). Either the reference or the contained element shall be given, but neither both nor none. */
interface _SolidPropertyType extends _AbstractSolidProxyType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface SolidPropertyType extends _SolidPropertyType { constructor: { new(): SolidPropertyType }; }
export var SolidPropertyType: { new(): SolidPropertyType };

interface _SolidType extends _AbstractSolidType {
	exterior?: ShellPropertyType;
	interior?: ShellPropertyType[];
}
export interface SolidType extends _SolidType { constructor: { new(): SolidType }; }
export var SolidType: { new(): SolidType };

interface _SpeedType extends _MeasureType {}
export interface SpeedType extends _SpeedType { constructor: { new(): SpeedType }; }
export var SpeedType: { new(): SpeedType };

interface _SphereType extends _AbstractGriddedSurfaceType {
	horizontalCurveType: CurveInterpolationType;
	verticalCurveType: CurveInterpolationType;
}
export interface SphereType extends _SphereType { constructor: { new(): SphereType }; }
export var SphereType: { new(): SphereType };

/** gml:SphericalCSPropertyType is property type for association roles to a spherical coordinate system, either referencing or containing the definition of that coordinate system. */
interface _SphericalCSPropertyType extends _SphericalCSProxyType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface SphericalCSPropertyType extends _SphericalCSPropertyType { constructor: { new(): SphericalCSPropertyType }; }
export var SphericalCSPropertyType: { new(): SphericalCSPropertyType };

interface _SphericalCSProxyType extends BaseType {
	/** gml:SphericalCS is a three-dimensional coordinate system with one distance measured from the origin and two angular coordinates. A SphericalCS shall have three gml:axis property elements. */
	SphericalCS?: SphericalCSType;
	usesSphericalCS?: SphericalCSPropertyType;
}
interface SphericalCSProxyType extends _SphericalCSProxyType { constructor: { new(): SphericalCSProxyType }; }

interface _SphericalCSType extends _AbstractCoordinateSystemType {}
export interface SphericalCSType extends _SphericalCSType { constructor: { new(): SphericalCSType }; }
export var SphericalCSType: { new(): SphericalCSType };

/** Extension to the respective XML Schema built-in simple type to allow a choice of either a value of the built-in simple type or a reason for a nil value. */
export type stringOrNilReason = string;
type _stringOrNilReason = Primitive._string;

interface _StringOrRefType extends Primitive._string {
	nilReason: string;
	remoteSchema: string;
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

export type SuccessionType = ("substitution" | "division" | "fusion" | "initiation");
interface _SuccessionType extends Primitive._string { content: SuccessionType; }

/** gml:SurfaceArrayPropertyType is a container for an array of surfaces. The elements are always contained in the array property, referencing geometry elements or arrays of geometry elements via XLinks is not supported. */
interface _SurfaceArrayPropertyType extends BaseType {
	owns: boolean;
	/** The AbstractSurface element is the abstract head of the substitution group for all (continuous) surface elements. */
	AbstractSurface?: AbstractSurfaceProxyType[];
}
export interface SurfaceArrayPropertyType extends _SurfaceArrayPropertyType { constructor: { new(): SurfaceArrayPropertyType }; }
export var SurfaceArrayPropertyType: { new(): SurfaceArrayPropertyType };

/** gml:SurfaceInterpolationType is a list of codes that may be used to identify the interpolation mechanisms specified by an application schema. */
export type SurfaceInterpolationType = ("none" | "planar" | "spherical" | "elliptical" | "conic" | "tin" | "parametricCurve" | "polynomialSpline" | "rationalSpline" | "triangulatedSpline");
interface _SurfaceInterpolationType extends Primitive._string { content: SurfaceInterpolationType; }

/** gml:SurfacePatchArrayPropertyType is a container for a sequence of surface patches. */
interface _SurfacePatchArrayPropertyType extends BaseType {
	/** A surface patch defines a homogenuous portion of a surface.
	  * The AbstractSurfacePatch element is the abstract head of the substituition group for all surface patch elements describing a continuous portion of a surface.
	  * All surface patches shall have an attribute interpolation (declared in the types derived from gml:AbstractSurfacePatchType) specifying the interpolation mechanism used for the patch using gml:SurfaceInterpolationType. */
	AbstractSurfacePatch?: AbstractSurfacePatchProxyType[];
}
export interface SurfacePatchArrayPropertyType extends _SurfacePatchArrayPropertyType { constructor: { new(): SurfacePatchArrayPropertyType }; }
export var SurfacePatchArrayPropertyType: { new(): SurfacePatchArrayPropertyType };

/** A property that has a surface as its value domain may either be an appropriate geometry element encapsulated in an element of this type or an XLink reference to a remote geometry element (where remote includes geometry elements located elsewhere in the same document). Either the reference or the contained element shall be given, but neither both nor none. */
interface _SurfacePropertyType extends _AbstractSurfaceProxyType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface SurfacePropertyType extends _SurfacePropertyType { constructor: { new(): SurfacePropertyType }; }
export var SurfacePropertyType: { new(): SurfacePropertyType };

interface _SurfaceProxyType extends _TriangulatedSurfaceProxyType {
	/** A Surface is a 2-dimensional primitive and is composed of one or more surface patches as specified in ISO 19107:2003, 6.3.17.1. The surface patches are connected to one another.
	  * patches encapsulates the patches of the surface. */
	Surface?: SurfaceType;
	/** A polyhedral surface is a surface composed of polygon patches connected along their common boundary curves. This differs from the surface type only in the restriction on the types of surface patches acceptable.
	  * polygonPatches encapsulates the polygon patches of the polyhedral surface. */
	PolyhedralSurface?: SurfaceType;
}
interface SurfaceProxyType extends _SurfaceProxyType { constructor: { new(): SurfaceProxyType }; }

interface _SurfaceType extends _AbstractSurfaceType, _PatchesProxyType {}
export interface SurfaceType extends _SurfaceType { constructor: { new(): SurfaceType }; }
export var SurfaceType: { new(): SurfaceType };

interface _TargetPropertyType extends _AbstractFeatureProxyType, _AbstractGeometryProxyType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface TargetPropertyType extends _TargetPropertyType { constructor: { new(): TargetPropertyType }; }
export var TargetPropertyType: { new(): TargetPropertyType };

interface _TargetProxyType extends BaseType {
	target?: TargetPropertyType;
	subject?: TargetPropertyType;
}
interface TargetProxyType extends _TargetProxyType { constructor: { new(): TargetProxyType }; }

/** gml:TemporalCRSPropertyType is a property type for association roles to a temporal coordinate reference system, either referencing or containing the definition of that reference system. */
interface _TemporalCRSPropertyType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** gml:TemporalCRS is a 1D coordinate reference system used for the recording of time. */
	TemporalCRS?: TemporalCRSType;
}
export interface TemporalCRSPropertyType extends _TemporalCRSPropertyType { constructor: { new(): TemporalCRSPropertyType }; }
export var TemporalCRSPropertyType: { new(): TemporalCRSPropertyType };

interface _TemporalCRSType extends _AbstractCRSType, _TemporalDatumProxyType, _TimeCSProxyType {
	usesTemporalCS: TemporalCSPropertyType;
}
export interface TemporalCRSType extends _TemporalCRSType { constructor: { new(): TemporalCRSType }; }
export var TemporalCRSType: { new(): TemporalCRSType };

interface _TemporalCSPropertyType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	TemporalCS?: TemporalCSType;
}
export interface TemporalCSPropertyType extends _TemporalCSPropertyType { constructor: { new(): TemporalCSPropertyType }; }
export var TemporalCSPropertyType: { new(): TemporalCSPropertyType };

interface _TemporalCSType extends _AbstractCoordinateSystemType {}
export interface TemporalCSType extends _TemporalCSType { constructor: { new(): TemporalCSType }; }
export var TemporalCSType: { new(): TemporalCSType };

/** The TemporalDatumBaseType partially defines the origin of a temporal coordinate reference system. This type restricts the AbstractDatumType to remove the "anchorDefinition" and "realizationEpoch" elements. */
interface _TemporalDatumBaseType extends _AbstractDatumType {
	/** The attribute gml:id supports provision of a handle for the XML element representing a GML Object. Its use is mandatory for all GML objects. It is of XML type ID, so is constrained to be unique in the XML document within which it occurs. */
	id: string;
	/** The value of this property is a text description of the object. gml:description uses gml:StringOrRefType as its content model, so it may contain a simple text string content, or carry a reference to an external description. The use of gml:description to reference an external description has been deprecated and replaced by the gml:descriptionReference property. */
	description?: StringOrRefType;
	/** The value of this property is a remote text description of the object. The xlink:href attribute of the gml:descriptionReference property references the external description. */
	descriptionReference?: ReferenceType;
	/** The gml:domainOfValidity property implements an association role to an EX_Extent object as encoded in ISO/TS 19139, either referencing or containing the definition of that extent. */
	domainOfValidity?: DomainOfValidityType;
	/** Often, a special identifier is assigned to an object by the maintaining authority with the intention that it is used in references to the object For such cases, the codeSpace shall be provided. That identifier is usually unique either globally or within an application domain. gml:identifier is a pre-defined property for such identifiers. */
	identifier: CodeWithAuthorityType;
	metaDataProperty?: MetaDataPropertyType[];
	/** The gml:name property provides a label or identifier for the object, commonly a descriptive name. An object may have several names, typically assigned by different authorities. gml:name uses the gml:CodeType content model.  The authority for a name is indicated by the value of its (optional) codeSpace attribute.  The name may or may not be unique, as determined by the rules of the organization responsible for the codeSpace.  In common usage there will be one name per authority, so a processing application may select the name from its preferred codeSpace. */
	name?: CodeType[];
	remarks?: string;
	/** The gml:scope property provides a description of the usage, or limitations of usage, for which this CRS-related object is valid. If unknown, enter "not known". */
	scope: string[];
}
export interface TemporalDatumBaseType extends _TemporalDatumBaseType { constructor: { new(): TemporalDatumBaseType }; }
export var TemporalDatumBaseType: { new(): TemporalDatumBaseType };

/** gml:TemporalDatumPropertyType is a property type for association roles to a temporal datum, either referencing or containing the definition of that datum. */
interface _TemporalDatumPropertyType extends _TemporalDatumProxyType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface TemporalDatumPropertyType extends _TemporalDatumPropertyType { constructor: { new(): TemporalDatumPropertyType }; }
export var TemporalDatumPropertyType: { new(): TemporalDatumPropertyType };

interface _TemporalDatumProxyType extends BaseType {
	/** A gml:TemporalDatum defines the origin of a Temporal Reference System. This type omits the "anchorDefinition" and "realizationEpoch" elements and adds the "origin" element with the dateTime type. */
	TemporalDatum?: TemporalDatumType;
	usesTemporalDatum?: TemporalDatumPropertyType;
}
interface TemporalDatumProxyType extends _TemporalDatumProxyType { constructor: { new(): TemporalDatumProxyType }; }

interface _TemporalDatumType extends _TemporalDatumBaseType {
	/** gml:origin is the date and time origin of this temporal datum. */
	origin: Date;
}
export interface TemporalDatumType extends _TemporalDatumType { constructor: { new(): TemporalDatumType }; }
export var TemporalDatumType: { new(): TemporalDatumType };

/** gml:TimeCalendarEraPropertyType provides for associating a gml:TimeCalendarEra with an object. */
interface _TimeCalendarEraPropertyType extends BaseType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** gml:TimeCalendarEra inherits basic properties from gml:DefinitionType and has the following additional properties:
	  * -	gml:referenceEvent is the name or description of a mythical or historic event which fixes the position of the base scale of the calendar era.  This is given as text or using a link to description held elsewhere.
	  * -	gml:referenceDate specifies the date of the referenceEvent expressed as a date in the given calendar.  In most calendars, this date is the origin (i.e., the first day) of the scale, but this is not always true.
	  * -	gml:julianReference specifies the Julian date that corresponds to the reference date.  The Julian day number is an integer value; the Julian date is a decimal value that allows greater resolution.  Transforming calendar dates to and from Julian dates provides a relatively simple basis for transforming dates from one calendar to another.
	  * -	gml:epochOfUse is the period for which the calendar era was used as a basis for dating. */
	TimeCalendarEra?: TimeCalendarEraType;
}
export interface TimeCalendarEraPropertyType extends _TimeCalendarEraPropertyType { constructor: { new(): TimeCalendarEraPropertyType }; }
export var TimeCalendarEraPropertyType: { new(): TimeCalendarEraPropertyType };

interface _TimeCalendarEraType extends _DefinitionType {
	epochOfUse: TimePeriodPropertyType;
	julianReference: number;
	referenceDate: string;
	referenceEvent: StringOrRefType;
}
export interface TimeCalendarEraType extends _TimeCalendarEraType { constructor: { new(): TimeCalendarEraType }; }
export var TimeCalendarEraType: { new(): TimeCalendarEraType };

/** gml:TimeCalendarPropertyType provides for associating a gml:TimeCalendar with an object. */
interface _TimeCalendarPropertyType extends BaseType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** A calendar is a discrete temporal reference system that provides a basis for defining temporal position to a resolution of one day.
	  * gml:TimeCalendar adds one property to those inherited from gml:TimeReferenceSystem. A gml:referenceFrame provides a link to a gml:TimeCalendarEra that it uses. A  gml:TimeCalendar may reference more than one calendar era.
	  * The referenceFrame element follows the standard GML property model, allowing the association to be instantiated either using an inline description using the gml:TimeCalendarEra element, or a link to a gml:TimeCalendarEra which is explicit elsewhere. */
	TimeCalendar?: TimeCalendarType;
}
export interface TimeCalendarPropertyType extends _TimeCalendarPropertyType { constructor: { new(): TimeCalendarPropertyType }; }
export var TimeCalendarPropertyType: { new(): TimeCalendarPropertyType };

interface _TimeCalendarType extends _TimeReferenceSystemType {
	referenceFrame: TimeCalendarEraPropertyType[];
}
export interface TimeCalendarType extends _TimeCalendarType { constructor: { new(): TimeCalendarType }; }
export var TimeCalendarType: { new(): TimeCalendarType };

/** gml:TimeClockPropertyType provides for associating a gml:TimeClock with an object. */
interface _TimeClockPropertyType extends BaseType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** A clock provides a basis for defining temporal position within a day. A clock shall be used with a calendar in order to provide a complete description of a temporal position within a specific day.
	  * gml:TimeClock adds the following properties to those inherited from gml:TimeReferenceSystemType:
	  * -	gml:referenceEvent is the name or description of an event, such as solar noon or sunrise, which fixes the position of the base scale of the clock.
	  * -	gml:referenceTime specifies the time of day associated with the reference event expressed as a time of day in the given clock. The reference time is usually the origin of the clock scale.
	  * -	gml:utcReference specifies the 24 hour local or UTC time that corresponds to the reference time.
	  * -	gml:dateBasis contains or references the calendars that use this clock. */
	TimeClock?: TimeClockType;
}
export interface TimeClockPropertyType extends _TimeClockPropertyType { constructor: { new(): TimeClockPropertyType }; }
export var TimeClockPropertyType: { new(): TimeClockPropertyType };

interface _TimeClockType extends _TimeReferenceSystemType {
	dateBasis?: TimeCalendarPropertyType[];
	referenceEvent: StringOrRefType;
	referenceTime: string;
	utcReference: string;
}
export interface TimeClockType extends _TimeClockType { constructor: { new(): TimeClockType }; }
export var TimeClockType: { new(): TimeClockType };

interface _TimeCoordinateSystemType extends _TimeReferenceSystemType {
	interval: TimeIntervalLengthType;
	origin: TimeInstantPropertyType;
	originPosition: TimePositionType;
}
export interface TimeCoordinateSystemType extends _TimeCoordinateSystemType { constructor: { new(): TimeCoordinateSystemType }; }
export var TimeCoordinateSystemType: { new(): TimeCoordinateSystemType };

/** gml:TimeCSPropertyType is a property type for association roles to a time coordinate system, either referencing or containing the definition of that coordinate system. */
interface _TimeCSPropertyType extends _TimeCSProxyType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface TimeCSPropertyType extends _TimeCSPropertyType { constructor: { new(): TimeCSPropertyType }; }
export var TimeCSPropertyType: { new(): TimeCSPropertyType };

interface _TimeCSProxyType extends BaseType {
	/** gml:TimeCS is a one-dimensional coordinate system containing a time axis, used to describe the temporal position of a point in the specified time units from a specified time origin. A TimeCS shall have one gml:axis property element. */
	TimeCS?: TimeCSType;
	usesTimeCS?: TimeCSPropertyType;
}
interface TimeCSProxyType extends _TimeCSProxyType { constructor: { new(): TimeCSProxyType }; }

interface _TimeCSType extends _AbstractCoordinateSystemType {}
export interface TimeCSType extends _TimeCSType { constructor: { new(): TimeCSType }; }
export var TimeCSType: { new(): TimeCSType };

/** gml:TimeEdgePropertyType provides for associating a gml:TimeEdge with an object. */
interface _TimeEdgePropertyType extends BaseType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** A time edge is a one-dimensional topological primitive. It is an open interval that starts and ends at a node. The edge may be realised as a geometry whose value is a time period. */
	TimeEdge?: TimeEdgeType;
}
export interface TimeEdgePropertyType extends _TimeEdgePropertyType { constructor: { new(): TimeEdgePropertyType }; }
export var TimeEdgePropertyType: { new(): TimeEdgePropertyType };

interface _TimeEdgeType extends _AbstractTimeTopologyPrimitiveType {
	end: TimeNodePropertyType;
	extent?: TimePeriodPropertyType;
	start: TimeNodePropertyType;
}
export interface TimeEdgeType extends _TimeEdgeType { constructor: { new(): TimeEdgeType }; }
export var TimeEdgeType: { new(): TimeEdgeType };

/** These values are interpreted as follows:
  * -	"unknown" indicates that no specific value for temporal position is provided.
  * -	"now" indicates that the specified value shall be replaced with the current temporal position whenever the value is accessed.
  * -	"before" indicates that the actual temporal position is unknown, but it is known to be before the specified value.
  * -	"after" indicates that the actual temporal position is unknown, but it is known to be after the specified value.
  * A value for indeterminatePosition may
  * -	be used either alone, or
  * -	qualify a specific value for temporal position. */
export type TimeIndeterminateValueType = ("after" | "before" | "now" | "unknown");
interface _TimeIndeterminateValueType extends Primitive._string { content: TimeIndeterminateValueType; }

/** gml:TimeInstantPropertyType provides for associating a gml:TimeInstant with an object. */
interface _TimeInstantPropertyType extends BaseType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** gml:TimeInstant acts as a zero-dimensional geometric primitive that represents an identifiable position in time. */
	TimeInstant?: TimeInstantType;
}
export interface TimeInstantPropertyType extends _TimeInstantPropertyType { constructor: { new(): TimeInstantPropertyType }; }
export var TimeInstantPropertyType: { new(): TimeInstantPropertyType };

interface _TimeInstantType extends _AbstractTimeGeometricPrimitiveType {
	/** This element is used directly as a property of gml:TimeInstant (see 15.2.2.3), and may also be used in application schemas. */
	timePosition: TimePositionType;
}
export interface TimeInstantType extends _TimeInstantType { constructor: { new(): TimeInstantType }; }
export var TimeInstantType: { new(): TimeInstantType };

interface _TimeIntervalLengthType extends Primitive._number {
	factor: number;
	radix: number;
	unit: string;
}
export interface TimeIntervalLengthType extends _TimeIntervalLengthType { constructor: { new(): TimeIntervalLengthType }; }
export var TimeIntervalLengthType: { new(): TimeIntervalLengthType };

/** gml:TimeNodePropertyType provides for associating a gml:TimeNode with an object */
interface _TimeNodePropertyType extends BaseType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** A time node is a zero-dimensional topological primitive that represents an identifiable node in time (it is equivalent to a point in space). A node may act as the termination or initiation of any number of time edges. A time node may be realised as a geometry, its position, whose value is a time instant. */
	TimeNode?: TimeNodeType;
}
export interface TimeNodePropertyType extends _TimeNodePropertyType { constructor: { new(): TimeNodePropertyType }; }
export var TimeNodePropertyType: { new(): TimeNodePropertyType };

interface _TimeNodeType extends _AbstractTimeTopologyPrimitiveType {
	nextEdge?: TimeEdgePropertyType[];
	position?: TimeInstantPropertyType;
	previousEdge?: TimeEdgePropertyType[];
}
export interface TimeNodeType extends _TimeNodeType { constructor: { new(): TimeNodeType }; }
export var TimeNodeType: { new(): TimeNodeType };

/** gml:TimeOrdinalEraPropertyType provides for associating a gml:TimeOrdinalEra with an object. */
interface _TimeOrdinalEraPropertyType extends BaseType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Its content model follows the pattern of gml:TimeEdge, inheriting standard properties from gml:DefinitionType, and adding gml:start, gml:end and gml:extent properties, a set of gml:member properties which indicate ordered gml:TimeOrdinalEra elements, and a gml:group property which points to the parent era.
	  * The recursive inclusion of gml:TimeOrdinalEra elements allow the construction of an arbitrary depth hierarchical ordinal reference schema, such that an ordinal era at a given level of the hierarchy includes a sequence of shorter, coterminous ordinal eras. */
	TimeOrdinalEra?: TimeOrdinalEraType;
}
export interface TimeOrdinalEraPropertyType extends _TimeOrdinalEraPropertyType { constructor: { new(): TimeOrdinalEraPropertyType }; }
export var TimeOrdinalEraPropertyType: { new(): TimeOrdinalEraPropertyType };

interface _TimeOrdinalEraType extends _DefinitionType {
	end?: TimeNodePropertyType;
	extent?: TimePeriodPropertyType;
	group?: ReferenceType;
	member?: TimeOrdinalEraPropertyType[];
	relatedTime?: RelatedTimeType[];
	start?: TimeNodePropertyType;
}
export interface TimeOrdinalEraType extends _TimeOrdinalEraType { constructor: { new(): TimeOrdinalEraType }; }
export var TimeOrdinalEraType: { new(): TimeOrdinalEraType };

interface _TimeOrdinalReferenceSystemType extends _TimeReferenceSystemType {
	component: TimeOrdinalEraPropertyType[];
}
export interface TimeOrdinalReferenceSystemType extends _TimeOrdinalReferenceSystemType { constructor: { new(): TimeOrdinalReferenceSystemType }; }
export var TimeOrdinalReferenceSystemType: { new(): TimeOrdinalReferenceSystemType };

/** gml:TimePeriodPropertyType provides for associating a gml:TimePeriod with an object. */
interface _TimePeriodPropertyType extends BaseType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** gml:TimePeriod acts as a one-dimensional geometric primitive that represents an identifiable extent in time.
	  * The location in of a gml:TimePeriod is described by the temporal positions of the instants at which it begins and ends. The length of the period is equal to the temporal distance between the two bounding temporal positions.
	  * Both beginning and end may be described in terms of their direct position using gml:TimePositionType which is an XML Schema simple content type, or by reference to an indentifiable time instant using gml:TimeInstantPropertyType.
	  * Alternatively a limit of a gml:TimePeriod may use the conventional GML property model to make a reference to a time instant described elsewhere, or a limit may be indicated as a direct position. */
	TimePeriod?: TimePeriodType;
}
export interface TimePeriodPropertyType extends _TimePeriodPropertyType { constructor: { new(): TimePeriodPropertyType }; }
export var TimePeriodPropertyType: { new(): TimePeriodPropertyType };

interface _TimePeriodType extends _AbstractTimeGeometricPrimitiveType {
	begin: TimeInstantPropertyType;
	beginPosition: TimePositionType;
	/** gml:duration conforms to the ISO 8601 syntax for temporal length as implemented by the XML Schema duration type. */
	duration?: string;
	end: TimeInstantPropertyType;
	endPosition: TimePositionType;
	/** gml:timeInterval conforms to ISO 11404 which is based on floating point values for temporal length.
	  * ISO 11404 syntax specifies the use of a positiveInteger together with appropriate values for radix and factor. The resolution of the time interval is to one radix ^(-factor) of the specified time unit.
	  * The value of the unit is either selected from the units for time intervals from ISO 31-1:1992, or is another suitable unit.  The encoding is defined for GML in gml:TimeUnitType. The second component of this union type provides a method for indicating time units other than the six standard units given in the enumeration. */
	timeInterval?: TimeIntervalLengthType;
}
export interface TimePeriodType extends _TimePeriodType { constructor: { new(): TimePeriodType }; }
export var TimePeriodType: { new(): TimePeriodType };

/** The method for identifying a temporal position is specific to each temporal reference system.  gml:TimePositionType supports the description of temporal position according to the subtypes described in ISO 19108.
  * Values based on calendars and clocks use lexical formats that are based on ISO 8601, as described in XML Schema Part 2:2001. A decimal value may be used with coordinate systems such as GPS time or UNIX time. A URI may be used to provide a reference to some era in an ordinal reference system .
  * In common with many of the components modelled as data types in the ISO 19100 series of International Standards, the corresponding GML component has simple content. However, the content model gml:TimePositionType is defined in several steps.
  * Three XML attributes appear on gml:TimePositionType:
  * A time value shall be associated with a temporal reference system through the frame attribute that provides a URI reference that identifies a description of the reference system. Following ISO 19108, the Gregorian calendar with UTC is the default reference system, but others may also be used. Components for describing temporal reference systems are described in 14.4, but it is not required that the reference system be described in this, as the reference may refer to anything that may be indentified with a URI.
  * For time values using a calendar containing more than one era, the (optional) calendarEraName attribute provides the name of the calendar era.
  * Inexact temporal positions may be expressed using the optional indeterminatePosition attribute.  This takes a value from an enumeration. */
interface _TimePositionType extends _TimePositionUnion {
	calendarEraName: string;
	frame: string;
	indeterminatePosition: TimeIndeterminateValueType;
}
export interface TimePositionType extends _TimePositionType { constructor: { new(): TimePositionType }; }
export var TimePositionType: { new(): TimePositionType };

/** The simple type gml:TimePositionUnion is a union of XML Schema simple types which instantiate the subtypes for temporal position described in ISO 19108.
  * An ordinal era may be referenced via URI.  A decimal value may be used to indicate the distance from the scale origin .  time is used for a position that recurs daily (see ISO 19108:2002 5.4.4.2).
  * Finally, calendar and clock forms that support the representation of time in systems based on years, months, days, hours, minutes and seconds, in a notation following ISO 8601, are assembled by gml:CalDate */
export type TimePositionUnion = string;
type _TimePositionUnion = Primitive._string;

/** gml:TimePrimitivePropertyType provides a standard content model for associations between an arbitrary member of the substitution group whose head is gml:AbstractTimePrimitive and another object. */
interface _TimePrimitivePropertyType extends _AbstractTimePrimitiveProxyType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface TimePrimitivePropertyType extends _TimePrimitivePropertyType { constructor: { new(): TimePrimitivePropertyType }; }
export var TimePrimitivePropertyType: { new(): TimePrimitivePropertyType };

interface _TimeReferenceSystemProxyType extends BaseType {
	/** A reference system is characterized in terms of its domain of validity: the spatial and temporal extent over which it is applicable. The basic GML element for temporal reference systems is gml:TimeReferenceSystem.  Its content model extends gml:DefinitionType with one additional property, gml:domainOfValidity. */
	TimeReferenceSystem?: TimeReferenceSystemType;
	/** A calendar is a discrete temporal reference system that provides a basis for defining temporal position to a resolution of one day.
	  * gml:TimeCalendar adds one property to those inherited from gml:TimeReferenceSystem. A gml:referenceFrame provides a link to a gml:TimeCalendarEra that it uses. A  gml:TimeCalendar may reference more than one calendar era.
	  * The referenceFrame element follows the standard GML property model, allowing the association to be instantiated either using an inline description using the gml:TimeCalendarEra element, or a link to a gml:TimeCalendarEra which is explicit elsewhere. */
	TimeCalendar?: TimeCalendarType;
	/** A clock provides a basis for defining temporal position within a day. A clock shall be used with a calendar in order to provide a complete description of a temporal position within a specific day.
	  * gml:TimeClock adds the following properties to those inherited from gml:TimeReferenceSystemType:
	  * -	gml:referenceEvent is the name or description of an event, such as solar noon or sunrise, which fixes the position of the base scale of the clock.
	  * -	gml:referenceTime specifies the time of day associated with the reference event expressed as a time of day in the given clock. The reference time is usually the origin of the clock scale.
	  * -	gml:utcReference specifies the 24 hour local or UTC time that corresponds to the reference time.
	  * -	gml:dateBasis contains or references the calendars that use this clock. */
	TimeClock?: TimeClockType;
	/** A temporal coordinate system shall be based on a continuous interval scale defined in terms of a single time interval.
	  * The differences to ISO 19108 TM_CoordinateSystem are:
	  * -	the origin is specified either using the property gml:originPosition whose value is a direct time position, or using the property gml:origin whose model is gml:TimeInstantPropertyType; this permits more flexibility in representation and also supports referring to a value fixed elsewhere;
	  * -	the interval uses gml:TimeIntervalLengthType. */
	TimeCoordinateSystem?: TimeCoordinateSystemType;
	/** In some applications of geographic information — such as geology and archaeology — relative position in time is known more precisely than absolute time or duration. The order of events in time can be well established, but the magnitude of the intervals between them cannot be accurately determined; in such cases, the use of an ordinal temporal reference system is appropriate. An ordinal temporal reference system is composed of a sequence of named coterminous eras, which may in turn be composed of sequences of member eras at a finer scale, giving the whole a hierarchical structure of eras of verying resolution.
	  * An ordinal temporal reference system whose component eras are not further subdivided is effectively a temporal topological complex constrained to be a linear graph. An ordinal temporal reference system some or all of whose component eras are subdivided is effectively a temporal topological complex with the constraint that parallel branches may only be constructed in pairs where one is a single temporal ordinal era and the other is a sequence of temporal ordinal eras that are called "members" of the "group". This constraint means that within a single temporal ordinal reference system, the relative position of all temporal ordinal eras is unambiguous.
	  * The positions of the beginning and end of a given era may calibrate the relative time scale.
	  * gml:TimeOrdinalReferenceSystem adds one or more gml:component properties to the generic temporal reference system model. */
	TimeOrdinalReferenceSystem?: TimeOrdinalReferenceSystemType;
}
interface TimeReferenceSystemProxyType extends _TimeReferenceSystemProxyType { constructor: { new(): TimeReferenceSystemProxyType }; }

interface _TimeReferenceSystemType extends _DefinitionType {
	domainOfValidity: string;
}
export interface TimeReferenceSystemType extends _TimeReferenceSystemType { constructor: { new(): TimeReferenceSystemType }; }
export var TimeReferenceSystemType: { new(): TimeReferenceSystemType };

/** gml:TimeTopologyComplexPropertyType provides for associating a gml:TimeTopologyComplex with an object. */
interface _TimeTopologyComplexPropertyType extends BaseType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** A temporal topology complex shall be the connected acyclic directed graph composed of temporal topological primitives, i.e. time nodes and time edges. Because a time edge may not exist without two time nodes on its boundaries, static features have time edges from a temporal topology complex as the values of their temporal properties, regardless of explicit declarations.
	  * A temporal topology complex expresses a linear or a non-linear graph. A temporal linear graph, composed of a sequence of time edges, provides a lineage described only by "substitution" of feature instances or feature element values. A time node as the start or the end of the graph connects with at least one time edge. A time node other than the start and the end shall connect to at least two time edges: one of starting from the node, and another ending at the node.
	  * A temporal topological complex is a set of connected temporal topological primitives. The member primtives are indicated, either by reference or by value, using the primitive property. */
	TimeTopologyComplex?: TimeTopologyComplexType;
}
export interface TimeTopologyComplexPropertyType extends _TimeTopologyComplexPropertyType { constructor: { new(): TimeTopologyComplexPropertyType }; }
export var TimeTopologyComplexPropertyType: { new(): TimeTopologyComplexPropertyType };

interface _TimeTopologyComplexType extends _AbstractTimeComplexType {
	primitive: TimeTopologyPrimitivePropertyType[];
}
export interface TimeTopologyComplexType extends _TimeTopologyComplexType { constructor: { new(): TimeTopologyComplexType }; }
export var TimeTopologyComplexType: { new(): TimeTopologyComplexType };

/** gml:TimeTopologyPrimitivePropertyType provides for associating a gml:AbstractTimeTopologyPrimitive with an object. */
interface _TimeTopologyPrimitivePropertyType extends _AbstractTimeTopologyPrimitiveProxyType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface TimeTopologyPrimitivePropertyType extends _TimeTopologyPrimitivePropertyType { constructor: { new(): TimeTopologyPrimitivePropertyType }; }
export var TimeTopologyPrimitivePropertyType: { new(): TimeTopologyPrimitivePropertyType };

interface _TimeType extends _MeasureType {}
export interface TimeType extends _TimeType { constructor: { new(): TimeType }; }
export var TimeType: { new(): TimeType };

export type TimeUnitType = string;
type _TimeUnitType = Primitive._string;

interface _TinType extends _SurfaceType {
	breakLines?: LineStringSegmentArrayPropertyType[];
	controlPoint: TinTypeControlPointType;
	maxLength: LengthType;
	stopLines?: LineStringSegmentArrayPropertyType[];
}
export interface TinType extends _TinType { constructor: { new(): TinType }; }
export var TinType: { new(): TinType };

interface _TinTypeControlPointType extends BaseType {
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty is the predefined property which may be used by GML Application Schemas whenever a GML feature has a property with a value that is substitutable for Point. */
	pointProperty: PointPropertyType[];
	pos: DirectPositionType[];
	posList: DirectPositionListType;
}
interface TinTypeControlPointType extends _TinTypeControlPointType { constructor: { new(): TinTypeControlPointType }; }

interface _TopoComplexPropertyType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** gml:TopoComplex is a collection of topological primitives.
	  * Each complex holds a reference to its maximal complex (gml:maximalComplex) and optionally to sub- or super-complexes (gml:subComplex, gml:superComplex).
	  * A topology complex contains its primitive and sub-complex members. */
	TopoComplex?: TopoComplexType;
}
export interface TopoComplexPropertyType extends _TopoComplexPropertyType { constructor: { new(): TopoComplexPropertyType }; }
export var TopoComplexPropertyType: { new(): TopoComplexPropertyType };

interface _TopoComplexType extends _AbstractTopologyType {
	aggregationType: AggregationType;
	isMaximal: boolean;
	/** The property elements gml:subComplex, gml:superComplex and gml:maximalComplex provide an encoding for relationships between topology complexes as described for gml:TopoComplex above. */
	maximalComplex: TopoComplexPropertyType;
	/** The property elements gml:subComplex, gml:superComplex and gml:maximalComplex provide an encoding for relationships between topology complexes as described for gml:TopoComplex above. */
	subComplex?: TopoComplexPropertyType[];
	/** The property elements gml:subComplex, gml:superComplex and gml:maximalComplex provide an encoding for relationships between topology complexes as described for gml:TopoComplex above. */
	superComplex?: TopoComplexPropertyType[];
	/** The gml:topoPrimitiveMember property element encodes for the relationship between a topology complex and a single topology primitive. */
	topoPrimitiveMember?: TopoPrimitiveMemberType[];
	/** The gml:topoPrimitiveMembers property element encodes the relationship between a topology complex and an arbitrary number of topology primitives. */
	topoPrimitiveMembers?: TopoPrimitiveArrayAssociationType;
}
export interface TopoComplexType extends _TopoComplexType { constructor: { new(): TopoComplexType }; }
export var TopoComplexType: { new(): TopoComplexType };

interface _TopoCurvePropertyType extends BaseType {
	owns: boolean;
	/** gml:TopoCurve represents a homogeneous topological expression, a sequence of directed edges, which if realised are isomorphic to a geometric curve primitive. The intended use of gml:TopoCurve is to appear within a line feature to express the structural and geometric relationships of this feature to other features via the shared edge definitions.
	  * If provided, the aggregationType attribute shall have the value "sequence". */
	TopoCurve: TopoCurveType;
}
export interface TopoCurvePropertyType extends _TopoCurvePropertyType { constructor: { new(): TopoCurvePropertyType }; }
export var TopoCurvePropertyType: { new(): TopoCurvePropertyType };

interface _TopoCurveType extends _AbstractTopologyType {
	aggregationType: AggregationType;
	/** A gml:directedEdge property element describes the boundary of topology faces, the coBoundary of topology nodes and is used in the support of topological line features via the gml:TopoCurve expression, see below. The orientation attribute of type gml:SignType expresses the sense in which the included edge is used, i.e. forward or reverse. */
	directedEdge: DirectedEdgePropertyType[];
}
export interface TopoCurveType extends _TopoCurveType { constructor: { new(): TopoCurveType }; }
export var TopoCurveType: { new(): TopoCurveType };

interface _TopoPointPropertyType extends BaseType {
	owns: boolean;
	/** The intended use of gml:TopoPoint is to appear within a point feature to express the structural and possibly geometric relationships of this feature to other features via shared node definitions. */
	TopoPoint: TopoPointType;
}
export interface TopoPointPropertyType extends _TopoPointPropertyType { constructor: { new(): TopoPointPropertyType }; }
export var TopoPointPropertyType: { new(): TopoPointPropertyType };

interface _TopoPointType extends _AbstractTopologyType {
	/** A gml:directedNode property element describes the boundary of topology edges and is used in the support of topological point features via the gml:TopoPoint expression, see below. The orientation attribute of type gml:SignType expresses the sense in which the included node is used: start ("-") or end ("+") node. */
	directedNode: DirectedNodePropertyType;
}
export interface TopoPointType extends _TopoPointType { constructor: { new(): TopoPointType }; }
export var TopoPointType: { new(): TopoPointType };

interface _TopoPrimitiveArrayAssociationType extends BaseType {
	owns: boolean;
	/** gml:AbstractTopoPrimitive acts as the base type for all topological primitives. Topology primitives are the atomic (smallest possible) units of a topology complex.
	  * Each topology primitive may contain references to other topology primitives of codimension 2 or more (gml:isolated). Conversely, nodes may have faces as containers and nodes and edges may have solids as containers (gml:container). */
	AbstractTopoPrimitive?: AbstractTopoPrimitiveProxyType[];
}
export interface TopoPrimitiveArrayAssociationType extends _TopoPrimitiveArrayAssociationType { constructor: { new(): TopoPrimitiveArrayAssociationType }; }
export var TopoPrimitiveArrayAssociationType: { new(): TopoPrimitiveArrayAssociationType };

interface _TopoPrimitiveMemberType extends _AbstractTopoPrimitiveProxyType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface TopoPrimitiveMemberType extends _TopoPrimitiveMemberType { constructor: { new(): TopoPrimitiveMemberType }; }
export var TopoPrimitiveMemberType: { new(): TopoPrimitiveMemberType };

interface _TopoSolidPropertyType extends BaseType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** gml:TopoSolid represents the 3-dimensional topology primitive.
	  * The topological boundary of a solid (gml:directedFace) consists of a set of directed faces.
	  * A solid may optionally be realised by a 3-dimensional geometric primitive (gml:solidProperty). */
	TopoSolid?: TopoSolidType;
}
export interface TopoSolidPropertyType extends _TopoSolidPropertyType { constructor: { new(): TopoSolidPropertyType }; }
export var TopoSolidPropertyType: { new(): TopoSolidPropertyType };

interface _TopoSolidType extends _AbstractTopoPrimitiveType {
	aggregationType: AggregationType;
	/** A gml:TopoSolid must indicate whether it is a universal topo-solid or not, to ensure a lossless topology representation as defined by Kuijpers, et. al. (see OGC 05-102 Topology IPR). The optional universal attribute of type boolean is used to indicate this and the default is fault. NOTE The universal topo-solid is normally not part of any feature, and is used to represent the unbounded portion of the data set. Its interior boundary (it has no exterior boundary) would normally be considered the exterior boundary of the data set. */
	universal?: boolean;
	/** The gml:directedFace property element describes the boundary of topology solids, in the coBoundary of topology edges and is used in the support of surface features via the gml:TopoSurface expression, see below. The orientation attribute of type gml:SignType expresses the sense in which the included face is used i.e. inward or outward with respect to the surface normal in any geometric realisation. */
	directedFace: DirectedFacePropertyType[];
	isolated?: NodeOrEdgePropertyType[];
	/** This property element either references a solid via the XLink-attributes or contains the solid element. solidProperty is the predefined property which may be used by GML Application Schemas whenever a GML feature has a property with a value that is substitutable for AbstractSolid. */
	solidProperty?: SolidPropertyType;
}
export interface TopoSolidType extends _TopoSolidType { constructor: { new(): TopoSolidType }; }
export var TopoSolidType: { new(): TopoSolidType };

interface _TopoSurfacePropertyType extends BaseType {
	owns: boolean;
	/** gml:TopoSurface represents a homogeneous topological expression, a set of directed faces, which if realised are isomorphic to a geometric surface primitive. The intended use of gml:TopoSurface is to appear within a surface feature to express the structural and possibly geometric relationships of this surface feature to other features via the shared face definitions. */
	TopoSurface: TopoSurfaceType;
}
export interface TopoSurfacePropertyType extends _TopoSurfacePropertyType { constructor: { new(): TopoSurfacePropertyType }; }
export var TopoSurfacePropertyType: { new(): TopoSurfacePropertyType };

interface _TopoSurfaceType extends _AbstractTopologyType {
	aggregationType: AggregationType;
	/** The gml:directedFace property element describes the boundary of topology solids, in the coBoundary of topology edges and is used in the support of surface features via the gml:TopoSurface expression, see below. The orientation attribute of type gml:SignType expresses the sense in which the included face is used i.e. inward or outward with respect to the surface normal in any geometric realisation. */
	directedFace: DirectedFacePropertyType[];
}
export interface TopoSurfaceType extends _TopoSurfaceType { constructor: { new(): TopoSurfaceType }; }
export var TopoSurfaceType: { new(): TopoSurfaceType };

interface _TopoVolumePropertyType extends BaseType {
	owns: boolean;
	/** gml:TopoVolume represents a homogeneous topological expression, a set of directed topologic solids, which if realised are isomorphic to a geometric solid primitive. The intended use of gml:TopoVolume is to appear within a solid feature to express the structural and geometric relationships of this solid feature to other features via the shared solid definitions. */
	TopoVolume: TopoVolumeType;
}
export interface TopoVolumePropertyType extends _TopoVolumePropertyType { constructor: { new(): TopoVolumePropertyType }; }
export var TopoVolumePropertyType: { new(): TopoVolumePropertyType };

interface _TopoVolumeType extends _AbstractTopologyType {
	aggregationType: AggregationType;
	/** The gml:directedSolid property element describes the coBoundary of topology faces and is used in the support of volume features via the gml:TopoVolume expression, see below. The orientation attribute of type gml:SignType expresses the sense in which the included solid appears in the face coboundary. In the context of a gml:TopoVolume the orientation attribute has no meaning. */
	directedTopoSolid: DirectedTopoSolidPropertyType[];
}
export interface TopoVolumeType extends _TopoVolumeType { constructor: { new(): TopoVolumeType }; }
export var TopoVolumeType: { new(): TopoVolumeType };

/** gml:TransformationPropertyType is a property type for association roles to a transformation, either referencing or containing the definition of that transformation. */
interface _TransformationPropertyType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** gml:Transformation is a concrete object element derived from gml:GeneralTransformation (13.6.2.13).
	  * This concrete object can be used for all operation methods, without using a GML Application Schema that defines operation-method-specialized element names and contents, especially for methods with only one Transformation instance.
	  * The parameterValue elements are an unordered list of composition associations to the set of parameter values used by this conversion operation. */
	Transformation?: TransformationType;
}
export interface TransformationPropertyType extends _TransformationPropertyType { constructor: { new(): TransformationPropertyType }; }
export var TransformationPropertyType: { new(): TransformationPropertyType };

interface _TransformationType extends _AbstractGeneralTransformationType, _MethodProxyType {
	/** gml:ParameterValue is a parameter value, an ordered sequence of values, or a reference to a file of parameter values. This concrete complex type may be used for operation methods without using an Application Schema that defines operation-method-specialized element names and contents, especially for methods with only one instance. This complex type may be used, extended, or restricted for well-known operation methods, especially for methods with many instances. */
	ParameterValue?: ParameterValueProxyType[];
}
export interface TransformationType extends _TransformationType { constructor: { new(): TransformationType }; }
export var TransformationType: { new(): TransformationType };

interface _TriangleType extends _AbstractSurfacePatchType {
	interpolation: SurfaceInterpolationType;
	/** A boundary of a surface consists of a number of rings. In the normal 2D case, one of these rings is distinguished as being the exterior boundary. In a general manifold this is not always possible, in which case all boundaries shall be listed as interior boundaries, and the exterior will be empty. */
	exterior: AbstractRingPropertyType;
}
export interface TriangleType extends _TriangleType { constructor: { new(): TriangleType }; }
export var TriangleType: { new(): TriangleType };

interface _TriangulatedSurfaceProxyType extends BaseType {
	/** A triangulated surface is a polyhedral surface that is composed only of triangles. There is no restriction on how the triangulation is derived.
	  * trianglePatches encapsulates the triangles of the triangulated surface. */
	TriangulatedSurface?: SurfaceType;
	/** A tin is a triangulated surface that uses the Delauny algorithm or a similar algorithm complemented with consideration of stoplines (stopLines), breaklines (breakLines), and maximum length of triangle sides (maxLength). controlPoint shall contain a set of the positions (three or more) used as posts for this TIN (corners of the triangles in the TIN). See ISO 19107:2003, 6.4.39 for details. */
	Tin?: TinType;
}
interface TriangulatedSurfaceProxyType extends _TriangulatedSurfaceProxyType { constructor: { new(): TriangulatedSurfaceProxyType }; }

interface _UnitDefinitionProxyType extends BaseType {
	/** A gml:UnitDefinition is a general definition of a unit of measure. This generic element is used only for units for which no relationship with other units or units systems is known.
	  * The content model of gml:UnitDefinition adds three additional properties to gml:Definition, gml:quantityType, gml:quantityTypeReference and gml:catalogSymbol.
	  * The gml:catalogSymbol property optionally gives the short symbol used for this unit. This element is usually used when the relationship of this unit to other units or units systems is unknown. */
	UnitDefinition?: UnitDefinitionType;
	/** A base unit is a unit of measure that cannot be derived by combination of other base units within a particular system of units.  For example, in the SI system of units, the base units are metre, kilogram, second, Ampere, Kelvin, mole, and candela, for the physical quantity types length, mass, time interval, electric current, thermodynamic temperature, amount of substance and luminous intensity, respectively.
	  * gml:BaseUnit extends generic gml:UnitDefinition with the property gml:unitsSystem, which carries a reference to the units system to which this base unit is asserted to belong. */
	BaseUnit?: BaseUnitType;
	/** Conventional units that are neither base units nor defined by direct combination of base units are used in many application domains.  For example electronVolt for energy, feet and nautical miles for length.  In most cases there is a known, usually linear, conversion to a preferred unit which is either a base unit or derived by direct combination of base units.
	  * The gml:ConventionalUnit extends gml:UnitDefinition with a property that describes a conversion to a preferred unit for this physical quantity.  When the conversion is exact, the element gml:conversionToPreferredUnit should be used, or when the conversion is not exact the element gml:roughConversionToPreferredUnit is available. Both of these elements have the same content model.  The gml:derivationUnitTerm property defined above is included to allow a user to optionally record how this unit may be derived from other ("more primitive") units. */
	ConventionalUnit?: ConventionalUnitType;
	/** Derived units are defined by combination of other units.  Derived units are used for quantities other than those corresponding to the base units, such as hertz (s-1) for frequency, Newton (kg.m/s2) for force.  Derived units based directly on base units are usually preferred for quantities other than the fundamental quantities within a system. If a derived unit is not the preferred unit, the gml:ConventionalUnit element should be used instead.
	  * The gml:DerivedUnit extends gml:UnitDefinition with the property gml:derivationUnitTerms. */
	DerivedUnit?: DerivedUnitType;
}
interface UnitDefinitionProxyType extends _UnitDefinitionProxyType { constructor: { new(): UnitDefinitionProxyType }; }

interface _UnitDefinitionType extends _DefinitionType {
	/** The catalogSymbol is the preferred lexical symbol used for this unit of measure.
	  * The codeSpace attribute in gml:CodeType identifies a namespace for the catalog symbol value, and might reference the external catalog. The string value in gml:CodeType contains the value of a symbol that should be unique within this catalog namespace. This symbol often appears explicitly in the catalog, but it could be a combination of symbols using a specified algebra of units. */
	catalogSymbol?: CodeType;
	/** The gml:quantityType property indicates the phenomenon to which the units apply. This element contains an informal description of the phenomenon or type of physical quantity that is measured or observed. When the physical quantity is the result of an observation or measurement, this term is known as observable type or measurand.
	  * The use of gml:quantityType for references to remote values is deprecated. */
	quantityType?: StringOrRefType;
	/** The gml:quantityTypeReference property indicates the phenomenon to which the units apply. The content is a reference to a remote value. */
	quantityTypeReference?: ReferenceType;
}
export interface UnitDefinitionType extends _UnitDefinitionType { constructor: { new(): UnitDefinitionType }; }
export var UnitDefinitionType: { new(): UnitDefinitionType };

interface _UnitOfMeasureType extends BaseType {
	uom: string;
}
export interface UnitOfMeasureType extends _UnitOfMeasureType { constructor: { new(): UnitOfMeasureType }; }
export var UnitOfMeasureType: { new(): UnitOfMeasureType };

/** The simple type gml:UomIdentifer defines the syntax and value space of the unit of measure identifier. */
export type UomIdentifier = string;
type _UomIdentifier = Primitive._string;

/** This type specifies a character string of length at least one, and restricted such that it must not contain any of the following characters: ":" (colon), " " (space), (newline), (carriage return), (tab). This allows values corresponding to familiar abbreviations, such as "kg", "m/s", etc.
  * It is recommended that the symbol be an identifier for a unit of measure as specified in the "Unified Code of Units of Measure" (UCUM) (http://aurora.regenstrief.org/UCUM). This provides a set of symbols and a grammar for constructing identifiers for units of measure that are unique, and may be easily entered with a keyboard supporting the limited character set known as 7-bit ASCII. ISO 2955 formerly provided a specification with this scope, but was withdrawn in 2001. UCUM largely follows ISO 2955 with modifications to remove ambiguities and other problems. */
export type UomSymbol = string;
type _UomSymbol = Primitive._string;

/** This type specifies a URI, restricted such that it must start with one of the following sequences: "#", "./", "../", or a string of characters followed by a ":". These patterns ensure that the most common URI forms are supported, including absolute and relative URIs and URIs that are simple fragment identifiers, but prohibits certain forms of relative URI that could be mistaken for unit of measure symbol .
  * NOTE	It is possible to re-write such a relative URI to conform to the restriction (e.g. "./m/s").
  * In an instance document, on elements of type gml:MeasureType the mandatory uom attribute shall carry a value corresponding to either
  * -	a conventional unit of measure symbol,
  * -	a link to a definition of a unit of measure that does not have a conventional symbol, or when it is desired to indicate a precise or variant definition. */
export type UomURI = string;
type _UomURI = Primitive._string;

/** gml:UserDefinedCSPropertyType is a property type for association roles to a user-defined coordinate system, either referencing or containing the definition of that coordinate system. */
interface _UserDefinedCSPropertyType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** gml:UserDefinedCS is a two- or three-dimensional coordinate system that consists of any combination of coordinate axes not covered by any other coordinate system type. A UserDefinedCS shall have two or three gml:axis property elements; the number of property elements shall equal the dimension of the CS. */
	UserDefinedCS?: UserDefinedCSType;
}
export interface UserDefinedCSPropertyType extends _UserDefinedCSPropertyType { constructor: { new(): UserDefinedCSPropertyType }; }
export var UserDefinedCSPropertyType: { new(): UserDefinedCSPropertyType };

interface _UserDefinedCSType extends _AbstractCoordinateSystemType {}
export interface UserDefinedCSType extends _UserDefinedCSType { constructor: { new(): UserDefinedCSType }; }
export var UserDefinedCSType: { new(): UserDefinedCSType };

interface _ValueArrayPropertyType extends BaseType {
	owns: boolean;
	/** The AbstractGeometry element is the abstract head of the substitution group for all geometry elements of GML. This includes pre-defined and user-defined geometry elements. Any geometry element shall be a direct or indirect extension/restriction of AbstractGeometryType and shall be directly or indirectly in the substitution group of AbstractGeometry. */
	AbstractGeometry: AbstractGeometryProxyType[];
	/** gml:AbstractTimeObject acts as the head of a substitution group for all temporal primitives and complexes. */
	AbstractTimeObject: AbstractTimeObjectProxyType[];
	/** gml:AbstractValue is an abstract element which acts as the head of a substitution group which contains gml:AbstractScalarValue, gml:AbstractScalarValueList, gml:CompositeValue and gml:ValueExtent, and (transitively) the elements in their substitution groups.
	  * These elements may be used in an application schema as variables, so that in an XML instance document any member of its substitution group may occur. */
	AbstractValue: AbstractValueProxyType[];
	Null: string[];
}
export interface ValueArrayPropertyType extends _ValueArrayPropertyType { constructor: { new(): ValueArrayPropertyType }; }
export var ValueArrayPropertyType: { new(): ValueArrayPropertyType };

interface _ValueArrayType extends _CompositeValueType {
	codeSpace: string;
	uom: string;
}
export interface ValueArrayType extends _ValueArrayType { constructor: { new(): ValueArrayType }; }
export var ValueArrayType: { new(): ValueArrayType };

interface _ValuePropertyType extends _AbstractGeometryProxyType, _AbstractTimeObjectProxyType, _AbstractValueProxyType {
	nilReason: string;
	owns: boolean;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	Null?: string;
}
export interface ValuePropertyType extends _ValuePropertyType { constructor: { new(): ValuePropertyType }; }
export var ValuePropertyType: { new(): ValuePropertyType };

/** For some applications the components of the position may be adjusted to yield a unit vector. */
export type VectorType = number[];

/** gml:VerticalCRSPropertyType is a property type for association roles to a vertical coordinate reference system, either referencing or containing the definition of that reference system. */
interface _VerticalCRSPropertyType extends BaseType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** gml:VerticalCRS is a 1D coordinate reference system used for recording heights or depths. Vertical CRSs make use of the direction of gravity to define the concept of height or depth, but the relationship with gravity may not be straightforward. By implication, ellipsoidal heights (h) cannot be captured in a vertical coordinate reference system. Ellipsoidal heights cannot exist independently, but only as an inseparable part of a 3D coordinate tuple defined in a geographic 3D coordinate reference system. */
	VerticalCRS?: VerticalCRSType;
}
export interface VerticalCRSPropertyType extends _VerticalCRSPropertyType { constructor: { new(): VerticalCRSPropertyType }; }
export var VerticalCRSPropertyType: { new(): VerticalCRSPropertyType };

interface _VerticalCRSType extends _AbstractCRSType, _VerticalCSProxyType, _VerticalDatumProxyType {}
export interface VerticalCRSType extends _VerticalCRSType { constructor: { new(): VerticalCRSType }; }
export var VerticalCRSType: { new(): VerticalCRSType };

/** gml:VerticalCSPropertyType is a property type for association roles to a vertical coordinate system, either referencing or containing the definition of that coordinate system. */
interface _VerticalCSPropertyType extends _VerticalCSProxyType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface VerticalCSPropertyType extends _VerticalCSPropertyType { constructor: { new(): VerticalCSPropertyType }; }
export var VerticalCSPropertyType: { new(): VerticalCSPropertyType };

interface _VerticalCSProxyType extends BaseType {
	/** gml:VerticalCS is a one-dimensional coordinate system used to record the heights or depths of points. Such a coordinate system is usually dependent on the Earth's gravity field, perhaps loosely as when atmospheric pressure is the basis for the vertical coordinate system axis. A VerticalCS shall have one gml:axis property element. */
	VerticalCS?: VerticalCSType;
	usesVerticalCS?: VerticalCSPropertyType;
}
interface VerticalCSProxyType extends _VerticalCSProxyType { constructor: { new(): VerticalCSProxyType }; }

interface _VerticalCSType extends _AbstractCoordinateSystemType {}
export interface VerticalCSType extends _VerticalCSType { constructor: { new(): VerticalCSType }; }
export var VerticalCSType: { new(): VerticalCSType };

/** gml:VerticalDatumPropertyType is property type for association roles to a vertical datum, either referencing or containing the definition of that datum. */
interface _VerticalDatumPropertyType extends _VerticalDatumProxyType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface VerticalDatumPropertyType extends _VerticalDatumPropertyType { constructor: { new(): VerticalDatumPropertyType }; }
export var VerticalDatumPropertyType: { new(): VerticalDatumPropertyType };

interface _VerticalDatumProxyType extends BaseType {
	/** gml:VerticalDatum is a textual description and/or a set of parameters identifying a particular reference level surface used as a zero-height surface, including its position with respect to the Earth for any of the height types recognized by this International Standard. */
	VerticalDatum?: VerticalDatumType;
	usesVerticalDatum?: VerticalDatumPropertyType;
}
interface VerticalDatumProxyType extends _VerticalDatumProxyType { constructor: { new(): VerticalDatumProxyType }; }

interface _VerticalDatumType extends _AbstractDatumType {}
export interface VerticalDatumType extends _VerticalDatumType { constructor: { new(): VerticalDatumType }; }
export var VerticalDatumType: { new(): VerticalDatumType };

interface _VolumeType extends _MeasureType {}
export interface VolumeType extends _VolumeType { constructor: { new(): VolumeType }; }
export var VolumeType: { new(): VolumeType };

export interface document extends BaseType {
	abstractGeneralOperationParameterRef: AbstractGeneralOperationParameterPropertyType;
	/** gml:affineCS is an association role to the affine coordinate system used by this CRS. */
	affineCS: AffineCSPropertyType[];
	/** location, refDirection, inDimension and outDimension have the same meaning as specified in ISO 19107:2003, 6.4.21. */
	AffinePlacement: AffinePlacementType;
	anchorPoint: CodeType;
	/** The gml:angle property element is used to record the value of an angle quantity as a single number, with its units. */
	angle: AngleType;
	/** An ArcByBulge is an arc string with only one arc unit, i.e. two control points, one bulge and one normal vector.
	  * As arc is an arc string consisting of a single arc, the attribute "numArc" is fixed to "1". */
	ArcByBulge: ArcByBulgeType;
	Array: ArrayType;
	associationName: string;
	/** gml:axisAbbrev is the abbreviation used for this coordinate system axis; this abbreviation is also used to identify the coordinates in the coordinate tuple. The codeSpace attribute may reference a source of more information on a set of standardized abbreviations, or on this abbreviation. */
	axisAbbrev: CodeType;
	/** gml:axisDirection is the direction of this coordinate system axis (or in the case of Cartesian projected coordinates, the direction of this coordinate system axis at the origin).
	  * Within any set of coordinate system axes, only one of each pair of terms may be used. For earth-fixed CRSs, this direction is often approximate and intended to provide a human interpretable meaning to the axis. When a geodetic datum is used, the precise directions of the axes may therefore vary slightly from this approximate direction.
	  * The codeSpace attribute shall reference a source of information specifying the values and meanings of all the allowed string values for this property. */
	axisDirection: CodeWithAuthorityType;
	Bag: BagType;
	/** gml:baseCRS is an association role to the coordinate reference system used by this derived CRS. */
	baseCRS: SingleCRSPropertyType;
	/** The property baseCurve references or contains the base curve, i.e. it either references the base curve via the XLink-attributes or contains the curve element. A curve element is any element which is substitutable for AbstractCurve. The base curve has positive orientation. */
	baseCurve: CurvePropertyType;
	/** gml:baseGeodeticCRS is an association role to the geodetic coordinate reference system used by this projected CRS. */
	baseGeodeticCRS: GeodeticCRSPropertyType;
	baseGeographicCRS: GeographicCRSPropertyType;
	/** The property baseSurface references or contains the base surface. The property baseSurface either references the base surface via the XLink-attributes or contains the surface element. A surface element is any element which is substitutable for gml:AbstractSurface. The base surface has positive orientation. */
	baseSurface: SurfacePropertyType;
	/** A base unit is a unit of measure that cannot be derived by combination of other base units within a particular system of units.  For example, in the SI system of units, the base units are metre, kilogram, second, Ampere, Kelvin, mole, and candela, for the physical quantity types length, mass, time interval, electric current, thermodynamic temperature, amount of substance and luminous intensity, respectively.
	  * gml:BaseUnit extends generic gml:UnitDefinition with the property gml:unitsSystem, which carries a reference to the units system to which this base unit is asserted to belong. */
	BaseUnit: BaseUnitType;
	/** Bezier curves are polynomial splines that use Bezier or Bernstein polynomials for interpolation purposes. It is a special case of the B-Spline curve with two knots.
	  * degree shall be the degree of the polynomial used for interpolation in this spline.
	  * knot shall be the sequence of distinct knots used to define the spline basis functions.
	  * interpolation is fixed as "polynomialSpline".
	  * isPolynomial is fixed as "true".
	  * knotType is not relevant for Bezier curve segments. */
	Bezier: BezierType;
	Boolean: BooleanType;
	BooleanList: booleanOrNilReasonList;
	/** gml:booleanValue is a boolean value of an operation parameter. A Boolean value does not have an associated unit of measure. */
	booleanValue: boolean;
	/** This property describes the minimum bounding box or rectangle that encloses the entire feature. */
	boundedBy: BoundingShapeType;
	/** gml:cartesianCS is an association role to the Cartesian coordinate system used by this CRS. */
	cartesianCS: CartesianCSPropertyType[];
	cartesianCSRef: CartesianCSPropertyType;
	/** The catalogSymbol is the preferred lexical symbol used for this unit of measure.
	  * The codeSpace attribute in gml:CodeType identifies a namespace for the catalog symbol value, and might reference the external catalog. The string value in gml:CodeType contains the value of a symbol that should be unique within this catalog namespace. This symbol often appears explicitly in the catalog, but it could be a combination of symbols using a specified algebra of units. */
	catalogSymbol: CodeType;
	/** A gml:Category has an optional XML attribute codeSpace, whose value is a URI which identifies a dictionary, codelist or authority for the term. */
	Category: CategoryType;
	CategoryExtent: CategoryExtentType;
	CategoryList: CodeOrNilReasonListType;
	centerLineOf: CurvePropertyType;
	centerOf: PointPropertyType;
	/** A Circle is an arc whose ends coincide to form a simple closed loop. The three control points shall be distinct non-co-linear points for the circle to be unambiguously defined. The arc is simply extended past the third control point until the first control point is encountered. */
	Circle: CircleType;
	/** A gml:CircleByCenterPoint is an gml:ArcByCenterPoint with identical start and end angle to form a full circle. Again, this representation can be used only in 2D. */
	CircleByCenterPoint: CircleByCenterPointType;
	/** A clothoid, or Cornu's spiral, is plane curve whose curvature is a fixed function of its length.
	  * refLocation, startParameter, endParameter and scaleFactor have the same meaning as specified in ISO 19107:2003, 6.4.22.
	  * interpolation is fixed as "clothoid".
	  * The content model follows the general pattern for the encoding of curve segments. */
	Clothoid: ClothoidType;
	/** A gml:CompositeCurve is represented by a sequence of (orientable) curves such that each curve in the sequence terminates at the start point of the subsequent curve in the list.
	  * curveMember references or contains inline one curve in the composite curve.
	  * The curves are contiguous, the collection of curves is ordered. Therefore, if provided, the aggregationType attribute shall have the value "sequence". */
	CompositeCurve: CompositeCurveType;
	/** gml:CompositeSolid implements ISO 19107 GM_CompositeSolid (see ISO 19107:2003, 6.6.7) as specified in D.2.3.6.
	  * A gml:CompositeSolid is represented by a set of orientable surfaces. It is a geometry type with all the geometric properties of a (primitive) solid. Essentially, a composite solid is a collection of solids that join in pairs on common boundary surfaces and which, when considered as a whole, form a single solid.
	  * solidMember references or contains one solid in the composite solid. The solids are contiguous. */
	CompositeSolid: CompositeSolidType;
	/** A gml:CompositeSurface is represented by a set of orientable surfaces. It is geometry type with all the geometric properties of a (primitive) surface. Essentially, a composite surface is a collection of surfaces that join in pairs on common boundary curves and which, when considered as a whole, form a single surface.
	  * surfaceMember references or contains inline one surface in the composite surface.
	  * The surfaces are contiguous. */
	CompositeSurface: CompositeSurfaceType;
	/** gml:CompundCRS is a coordinate reference system describing the position of points through two or more independent coordinate reference systems. It is associated with a non-repeating sequence of two or more instances of SingleCRS. */
	CompoundCRS: CompoundCRSType;
	compoundCRSRef: CompoundCRSPropertyType;
	ConcatenatedOperation: ConcatenatedOperationType;
	concatenatedOperationRef: ConcatenatedOperationPropertyType;
	Cone: ConeType;
	/** Conventional units that are neither base units nor defined by direct combination of base units are used in many application domains.  For example electronVolt for energy, feet and nautical miles for length.  In most cases there is a known, usually linear, conversion to a preferred unit which is either a base unit or derived by direct combination of base units.
	  * The gml:ConventionalUnit extends gml:UnitDefinition with a property that describes a conversion to a preferred unit for this physical quantity.  When the conversion is exact, the element gml:conversionToPreferredUnit should be used, or when the conversion is not exact the element gml:roughConversionToPreferredUnit is available. Both of these elements have the same content model.  The gml:derivationUnitTerm property defined above is included to allow a user to optionally record how this unit may be derived from other ("more primitive") units. */
	ConventionalUnit: ConventionalUnitType;
	/** gml:conversion is an association role to the coordinate conversion used to define the derived CRS. */
	conversion: GeneralConversionPropertyType[];
	conversionRef: ConversionPropertyType;
	/** The elements gml:conversionToPreferredUnit and gml:roughConversionToPreferredUnit represent parameters used to convert conventional units to preferred units for this physical quantity type.  A preferred unit is either a Base Unit or a Derived Unit that is selected for all values of one physical quantity type. */
	conversionToPreferredUnit: ConversionToPreferredUnitType;
	/** gml:coordinateOperationAccuracy is an association role to a DQ_PositionalAccuracy object as encoded in ISO/TS 19139, either referencing or containing the definition of that positional accuracy. That object contains an estimate of the impact of this coordinate operation on point accuracy. That is, it gives position error estimates for the target coordinates of this coordinate operation, assuming no errors in the source coordinates. */
	coordinateOperationAccuracy: CoordinateOperationAccuracyType;
	coordinateOperationRef: CoordinateOperationPropertyType;
	coordinates: CoordinatesType;
	/** gml:CoordinateSystemAxis is a definition of a coordinate system axis. */
	CoordinateSystemAxis: CoordinateSystemAxisType;
	coordinateSystemAxisRef: CoordinateSystemAxisPropertyType;
	coordinateSystemRef: CoordinateSystemPropertyType;
	Count: CountType;
	CountExtent: CountExtentType;
	CountList: integerOrNilReasonList;
	/** The gml:coverageFunction property describes the mapping function from the domain to the range of the coverage.
	  * The value of the CoverageFunction is one of gml:CoverageMappingRule and gml:GridFunction.
	  * If the gml:coverageFunction property is omitted for a gridded coverage (including rectified gridded coverages) the gml:startPoint is assumed to be the value of the gml:low property in the gml:Grid geometry, and the gml:sequenceRule is assumed to be linear and the gml:axisOrder property is assumed to be "+1 +2". */
	coverageFunction: CoverageFunctionType;
	/** gml:CoverageMappingRule provides a formal or informal description of the coverage function.
	  * The mapping rule may be defined as an in-line string (gml:ruleDefinition) or via a remote reference through xlink:href (gml:ruleReference).
	  * If no rule name is specified, the default is 'Linear' with respect to members of the domain in document order. */
	CoverageMappingRule: MappingRuleType;
	crsRef: CRSPropertyType;
	/** The number of control points shall be at least three.
	  * vectorAtStart is the unit tangent vector at the start point of the spline. vectorAtEnd is the unit tangent vector at the end point of the spline. Only the direction of the vectors shall be used to determine the shape of the cubic spline, not their length.
	  * interpolation is fixed as "cubicSpline".
	  * degree shall be the degree of the polynomial used for the interpolation in this spline. Therefore the degree for a cubic spline is fixed to "3".
	  * The content model follows the general pattern for the encoding of curve segments. */
	CubicSpline: CubicSplineType;
	/** A curve is a 1-dimensional primitive. Curves are continuous, connected, and have a measurable length in terms of the coordinate system.
	  * A curve is composed of one or more curve segments. Each curve segment within a curve may be defined using a different interpolation method. The curve segments are connected to one another, with the end point of each segment except the last being the start point of the next segment in the segment list.
	  * The orientation of the curve is positive.
	  * The element segments encapsulates the segments of the curve. */
	Curve: CurveType;
	curveArrayProperty: CurveArrayPropertyType;
	curveMember: CurvePropertyType;
	/** This property element contains a list of curves. The order of the elements is significant and shall be preserved when processing the array. */
	curveMembers: CurveArrayPropertyType;
	/** This property element either references a curve via the XLink-attributes or contains the curve element. curveProperty is the predefined property which may be used by GML Application Schemas whenever a GML feature has a property with a value that is substitutable for AbstractCurve. */
	curveProperty: CurvePropertyType;
	Cylinder: CylinderType;
	/** gml:cylindricalCS is an association role to the cylindrical coordinate system used by this CRS. */
	cylindricalCS: CylindricalCSPropertyType[];
	cylindricalCSRef: CylindricalCSPropertyType;
	/** gml:DataBlock describes the Range as a block of text encoded values similar to a Common Separated Value (CSV) representation.
	  * The range set parameterization is described by the property gml:rangeParameters. */
	DataBlock: DataBlockType;
	/** Evidence is represented by a simple gml:dataSource or gml:dataSourceReference property that indicates the source of the temporal data. The remote link attributes of the gml:dataSource element have been deprecated along with its current type. */
	dataSource: StringOrRefType;
	/** Evidence is represented by a simple gml:dataSource or gml:dataSourceReference property that indicates the source of the temporal data. */
	dataSourceReference: ReferenceType;
	datumRef: DatumPropertyType;
	decimalMinutes: number;
	defaultCodeSpace: string;
	definedByConversion: GeneralConversionPropertyType;
	DefinitionCollection: DictionaryType;
	definitionMember: DictionaryEntryType;
	DefinitionProxy: DefinitionProxyType;
	definitionRef: ReferenceType;
	degrees: DegreesType;
	/** A set of gml:derivationUnitTerm elements describes a derived unit of measure.  Each element carries an integer exponent.  The terms are combined by raising each referenced unit to the power of its exponent and forming the product.
	  * This unit term references another unit of measure (uom) and provides an integer exponent applied to that unit in defining the compound unit. The exponent may be positive or negative, but not zero. */
	derivationUnitTerm: DerivationUnitTermType;
	/** gml:DerivedCRS is a single coordinate reference system that is defined by its coordinate conversion from another single coordinate reference system known as the base CRS. The base CRS can be a projected coordinate reference system, if this DerivedCRS is used for a georectified grid coverage as described in ISO 19123, Clause 8. */
	DerivedCRS: DerivedCRSType;
	derivedCRSRef: DerivedCRSPropertyType;
	/** The gml:derivedCRSType property describes the type of a derived coordinate reference system. The required codeSpace attribute shall reference a source of information specifying the values and meanings of all the allowed string values for this property. */
	derivedCRSType: CodeWithAuthorityType;
	/** Derived units are defined by combination of other units.  Derived units are used for quantities other than those corresponding to the base units, such as hertz (s-1) for frequency, Newton (kg.m/s2) for force.  Derived units based directly on base units are usually preferred for quantities other than the fundamental quantities within a system. If a derived unit is not the preferred unit, the gml:ConventionalUnit element should be used instead.
	  * The gml:DerivedUnit extends gml:UnitDefinition with the property gml:derivationUnitTerms. */
	DerivedUnit: DerivedUnitType;
	/** The value of this property is a text description of the object. gml:description uses gml:StringOrRefType as its content model, so it may contain a simple text string content, or carry a reference to an external description. The use of gml:description to reference an external description has been deprecated and replaced by the gml:descriptionReference property. */
	description: StringOrRefType;
	/** The value of this property is a remote text description of the object. The xlink:href attribute of the gml:descriptionReference property references the external description. */
	descriptionReference: ReferenceType;
	/** Sets of definitions may be collected into dictionaries or collections.
	  * A gml:Dictionary is a non-abstract collection of definitions.
	  * The gml:Dictionary content model adds a list of gml:dictionaryEntry properties that contain or reference gml:Definition objects.  A database handle (gml:id attribute) is required, in order that this collection may be referred to. The standard gml:identifier, gml:description, gml:descriptionReference and gml:name properties are available to reference or contain more information about this dictionary. The gml:description and gml:descriptionReference property elements may be used for a description of this dictionary. The derived gml:name element may be used for the name(s) of this dictionary. for remote definiton references gml:dictionaryEntry shall be used. If a Definition object contained within a Dictionary uses the descriptionReference property to refer to a remote definition, then this enables the inclusion of a remote definition in a local dictionary, giving a handle and identifier in the context of the local dictionary. */
	Dictionary: DictionaryType;
	/** A gml:directedEdge property element describes the boundary of topology faces, the coBoundary of topology nodes and is used in the support of topological line features via the gml:TopoCurve expression, see below. The orientation attribute of type gml:SignType expresses the sense in which the included edge is used, i.e. forward or reverse. */
	directedEdge: DirectedEdgePropertyType;
	/** The gml:directedFace property element describes the boundary of topology solids, in the coBoundary of topology edges and is used in the support of surface features via the gml:TopoSurface expression, see below. The orientation attribute of type gml:SignType expresses the sense in which the included face is used i.e. inward or outward with respect to the surface normal in any geometric realisation. */
	directedFace: DirectedFacePropertyType;
	/** A gml:directedNode property element describes the boundary of topology edges and is used in the support of topological point features via the gml:TopoPoint expression, see below. The orientation attribute of type gml:SignType expresses the sense in which the included node is used: start ("-") or end ("+") node. */
	directedNode: DirectedNodePropertyType;
	/** gml:DirectedObservationAtDistance adds an additional distance property. This is the distance from the observer to the subject of the observation. Clearly this applies only to certain types of observations such as visual observations by people, or observations obtained from terrestrial cameras. */
	DirectedObservationAtDistance: DirectedObservationAtDistanceType;
	/** The gml:directedSolid property element describes the coBoundary of topology faces and is used in the support of volume features via the gml:TopoVolume expression, see below. The orientation attribute of type gml:SignType expresses the sense in which the included solid appears in the face coboundary. In the context of a gml:TopoVolume the orientation attribute has no meaning. */
	directedTopoSolid: DirectedTopoSolidPropertyType;
	/** The property gml:direction is intended as a pre-defined property expressing a direction to be assigned to features defined in a GML application schema. */
	direction: DirectionPropertyType;
	dmsAngle: DMSAngleType;
	dmsAngleValue: DMSAngleType;
	/** The gml:domainOfValidity property implements an association role to an EX_Extent object as encoded in ISO/TS 19139, either referencing or containing the definition of that extent. */
	domainOfValidity: DomainOfValidityType;
	/** gml:doubleOrNilReasonList consists of a list of gml:doubleOrNilReason values, each separated by a whitespace. The gml:doubleOrNilReason values are grouped into tuples where the dimension of each tuple in the list is equal to the number of range parameters. */
	doubleOrNilReasonTupleList: doubleOrNilReasonList;
	/** gml:duration conforms to the ISO 8601 syntax for temporal length as implemented by the XML Schema duration type. */
	duration: string;
	/** A gml:DynamicFeatureCollection is a feature collection that has a gml:validTime property (i.e. is a snapshot of the feature collection) or which has a gml:history property that contains one or more gml:AbstractTimeSlices each of which contain values of the time varying properties of the feature collection.  Note that the gml:DynamicFeatureCollection may be one of the following:
	  * 1.	A feature collection which consists of static feature members (members do not change in time) but which has properties of the collection object as a whole that do change in time .
	  * 2.	A feature collection which consists of dynamic feature members (the members are gml:DynamicFeatures) but which also has properties of the collection as a whole that vary in time. */
	DynamicFeatureCollection: DynamicFeatureCollectionType;
	dynamicMembers: DynamicFeatureMemberType;
	/** gml:Edge represents the 1-dimensional primitive.
	  * The topological boundary of an Edge (gml:directedNode) consists of a negatively directed start Node and a positively directed end Node.
	  * The optional coboundary of an edge (gml:directedFace) is a circular sequence of directed faces which are incident on this edge in document order. In the 2D case, the orientation of the face on the left of the edge is "+"; the orientation of the face on the right on its right is "-".
	  * If provided, the aggregationType attribute shall have the value "sequence".
	  * An edge may optionally be realised by a 1-dimensional geometric primitive (gml:curveProperty). */
	Edge: EdgeType;
	edgeOf: CurvePropertyType;
	/** gml:ellipsoid is an association role to the ellipsoid used by this geodetic datum. */
	ellipsoid: EllipsoidPropertyType[];
	/** gml:ellipsoidalCS is an association role to the ellipsoidal coordinate system used by this CRS. */
	ellipsoidalCS: EllipsoidalCSPropertyType[];
	ellipsoidalCSRef: EllipsoidalCSPropertyType;
	ellipsoidRef: EllipsoidPropertyType;
	/** gml:EngineeringCRS is a contextually local coordinate reference system which can be divided into two broad categories:
	  * -	earth-fixed systems applied to engineering activities on or near the surface of the earth;
	  * -	CRSs on moving platforms such as road vehicles, vessels, aircraft, or spacecraft, see ISO 19111 8.3. */
	EngineeringCRS: EngineeringCRSType;
	engineeringCRSRef: EngineeringCRSPropertyType;
	/** gml:engineeringDatum is an association role to the engineering datum used by this CRS. */
	engineeringDatum: EngineeringDatumPropertyType[];
	engineeringDatumRef: EngineeringDatumPropertyType;
	/** gml:EnvelopeWithTimePeriod is provided for envelopes that include a temporal extent. It adds two time position properties, gml:beginPosition and gml:endPosition, which describe the extent of a time-envelope.
	  * Since gml:EnvelopeWithTimePeriod is assigned to the substitution group headed by gml:Envelope, it may be used whenever gml:Envelope is valid. */
	EnvelopeWithTimePeriod: EnvelopeWithTimePeriodType;
	extentOf: SurfacePropertyType;
	/** A boundary of a surface consists of a number of rings. In the normal 2D case, one of these rings is distinguished as being the exterior boundary. In a general manifold this is not always possible, in which case all boundaries shall be listed as interior boundaries, and the exterior will be empty. */
	exterior: AbstractRingPropertyType;
	/** gml:Face represents the 2-dimensional topology primitive.
	  * The topological boundary of a face (gml:directedEdge) consists of a sequence of directed edges. If provided, the aggregationType attribute shall have the value "sequence".
	  * The optional coboundary of a face (gml:directedTopoSolid) is a pair of directed solids which are bounded by this face. A positively directed solid corresponds to a solid which lies in the direction of the negatively directed normal to the face in any geometric realisation.
	  * A face may optionally be realised by a 2-dimensional geometric primitive (gml:surfaceProperty). */
	Face: FaceType;
	FeatureCollection: FeatureCollectionType;
	featureMember: FeaturePropertyType;
	featureMembers: FeatureArrayPropertyType;
	featureProperty: FeaturePropertyType;
	/** for efficiency reasons, GML also provides a means of encoding the range set in an arbitrary external encoding, such as a binary file.  This encoding may be "well-known" but this is not required. This mode uses the gml:File element.
	  * The values of the coverage (attribute values in the range set) are transmitted in a external file that is referenced from the XML structure described by gml:FileType.  The external file is referenced by the gml:fileReference property that is an anyURI (the gml:fileName property has been deprecated).  This means that the external file may be located remotely from the referencing GML instance.
	  * The gml:compression property points to a definition of a compression algorithm through an anyURI.  This may be a retrievable, computable definition or simply a reference to an unambiguous name for the compression method.
	  * The gml:mimeType property points to a definition of the file mime type.
	  * The gml:fileStructure property is defined by a codelist. Note further that all values shall be enclosed in a single file. Multi-file structures for values are not supported in GML.
	  * The semantics of the range set is described as above using the gml:rangeParameters property.
	  * Note that if any compression algorithm is applied, the structure above applies only to the pre-compression or post-decompression structure of the file.
	  * Note that the fields within a record match the gml:valueComponents of the gml:CompositeValue in document order. */
	File: FileType;
	/** gml:formulaCitation provides a reference to a publication giving the formula(s) or procedure used by an coordinate operation method. */
	formulaCitation: FormulaCitationType;
	generalConversionRef: GeneralConversionPropertyType;
	generalTransformationRef: GeneralTransformationPropertyType;
	GenericMetaData: GenericMetaDataType;
	GeocentricCRS: GeocentricCRSType;
	geocentricCRSRef: GeocentricCRSPropertyType;
	Geodesic: GeodesicType;
	GeodeticCRS: GeodeticCRSType;
	/** gml:geodeticDatum is an association role to the geodetic datum used by this CRS. */
	geodeticDatum: GeodeticDatumPropertyType[];
	geodeticDatumRef: GeodeticDatumPropertyType;
	GeographicCRS: GeographicCRSType;
	geographicCRSRef: GeographicCRSPropertyType;
	GeometricComplex: GeometricComplexType;
	/** This property element either references a geometry element via the XLink-attributes or contains the geometry element. */
	geometryMember: GeometryPropertyType;
	/** This property element contains a list of geometry elements. The order of the elements is significant and shall be preserved when processing the array. */
	geometryMembers: GeometryArrayPropertyType;
	gmlProfileSchema: string;
	/** gml:greenwichLongitude is the longitude of the prime meridian measured from the Greenwich meridian, positive eastward. If the value of the prime meridian "name" is "Greenwich" then the value of greenwichLongitude shall be 0 degrees. */
	greenwichLongitude: AngleType;
	/** A gml:GriddedCoverage is a discrete point coverage in which the domain set is a geometric grid of points.
	  * Note that this is the same as the gml:MultiPointCoverage except that we have a gml:Grid to describe the domain.
	  * The simple gridded coverage is not geometrically referenced and hence no geometric positions are assignable to the points in the grid. Such geometric positioning is introduced in the gml:RectifiedGridCoverage. */
	GridCoverage: DiscreteCoverageType;
	gridDomain: DomainSetType;
	/** gml:GridFunction provides an explicit mapping rule for grid geometries, i.e. the domain shall be a geometry of type grid.  It describes the mapping of grid posts (discrete point grid coverage) or grid cells (discrete surface coverage) to the values in the range set.
	  * The gml:startPoint is the index position of a point in the grid that is mapped to the first point in the range set (this is also the index position of the first grid post).  If the gml:startPoint property is omitted the gml:startPoint is assumed to be equal to the value of gml:low in the gml:Grid geometry. Subsequent points in the mapping are determined by the value of the gml:sequenceRule. */
	GridFunction: GridFunctionType;
	/** Often, a special identifier is assigned to an object by the maintaining authority with the intention that it is used in references to the object For such cases, the codeSpace shall be provided. That identifier is usually unique either globally or within an application domain. gml:identifier is a pre-defined property for such identifiers. */
	identifier: CodeWithAuthorityType;
	/** gml:ImageCRS is an engineering coordinate reference system applied to locations in images. Image coordinate reference systems are treated as a separate sub-type because the definition of the associated image datum contains two attributes not relevant to other engineering datums. */
	ImageCRS: ImageCRSType;
	imageCRSRef: ImageCRSPropertyType;
	/** gml:imageDatum is an association role to the image datum used by this CRS. */
	imageDatum: ImageDatumPropertyType[];
	imageDatumRef: ImageDatumPropertyType;
	includesParameter: AbstractGeneralOperationParameterPropertyType;
	includesSingleCRS: SingleCRSPropertyType;
	includesValue: AbstractGeneralParameterValuePropertyType;
	indirectEntry: IndirectEntryType;
	/** gml:integerValue is a positive integer value of an operation parameter, usually used for a count. An integer value does not have an associated unit of measure. */
	integerValue: number;
	/** gml:integerValueList is an ordered sequence of two or more integer values of an operation parameter list, usually used for counts. These integer values do not have an associated unit of measure. An element of this type contains a space-separated sequence of integer values. */
	integerValueList: integerList;
	/** A boundary of a surface consists of a number of rings. The "interior" rings separate the surface / surface patch from the area enclosed by the rings. */
	interior: AbstractRingPropertyType;
	/** gml:linearCS is an association role to the linear coordinate system used by this CRS. */
	linearCS: LinearCSPropertyType[];
	linearCSRef: LinearCSPropertyType;
	/** A LinearRing is defined by four or more coordinate tuples, with linear interpolation between them; the first and last coordinates shall be coincident. The number of direct positions in the list shall be at least four. */
	LinearRing: LinearRingType;
	/** A LineString is a special curve that consists of a single segment with linear interpolation. It is defined by two or more coordinate tuples, with linear interpolation between them. The number of direct positions in the list shall be at least two. */
	LineString: LineStringType;
	/** A LineStringSegment is a curve segment that is defined by two or more control points including the start and end point, with linear interpolation between them.
	  * The content model follows the general pattern for the encoding of curve segments. */
	LineStringSegment: LineStringSegmentType;
	LocationKeyWord: CodeType;
	/** The gml:locationName property element is a convenience property where the text value describes the location of the feature. If the location names are selected from a controlled list, then the list shall be identified in the codeSpace attribute. */
	locationName: CodeType;
	/** The gml:locationReference property element is a convenience property where the text value referenced by the xlink:href attribute describes the location of the feature. */
	locationReference: ReferenceType;
	LocationString: StringOrRefType;
	MappingRule: StringOrRefType;
	/** The property elements gml:subComplex, gml:superComplex and gml:maximalComplex provide an encoding for relationships between topology complexes as described for gml:TopoComplex above. */
	maximalComplex: TopoComplexPropertyType;
	/** gml:maximumOccurs is the maximum number of times that values for this parameter group may be included. If this attribute is omitted, the maximum number shall be one. */
	maximumOccurs: number;
	/** The gml:minimumValue and gml:maximumValue properties allow the specification of minimum and maximum value normally allowed for this axis, in the unit of measure for the axis. For a continuous angular axis such as longitude, the values wrap-around at this value. Also, values beyond this minimum/maximum can be used for specified purposes, such as in a bounding box. A value of minus infinity shall be allowed for the gml:minimumValue element, a value of plus infiniy for the gml:maximumValue element. If these elements are omitted, the value is unspecified. */
	maximumValue: number;
	/** The value of a physical quantity, together with its unit. */
	measure: MeasureType;
	member: AssociationRoleType;
	members: ArrayAssociationType;
	metaDataProperty: MetaDataPropertyType;
	methodFormula: CodeType;
	/** gml:minimumOccurs is the minimum number of times that values for this parameter group or parameter are required. If this attribute is omitted, the minimum number shall be one. */
	minimumOccurs: number;
	/** The gml:minimumValue and gml:maximumValue properties allow the specification of minimum and maximum value normally allowed for this axis, in the unit of measure for the axis. For a continuous angular axis such as longitude, the values wrap-around at this value. Also, values beyond this minimum/maximum can be used for specified purposes, such as in a bounding box. A value of minus infinity shall be allowed for the gml:minimumValue element, a value of plus infiniy for the gml:maximumValue element. If these elements are omitted, the value is unspecified. */
	minimumValue: number;
	minutes: number;
	/** gml:modifiedCoordinate is a positive integer defining a position in a coordinate tuple. */
	modifiedCoordinate: number;
	MovingObjectStatus: MovingObjectStatusType;
	multiCenterLineOf: MultiCurvePropertyType;
	multiCenterOf: MultiPointPropertyType;
	multiCoverage: MultiSurfacePropertyType;
	/** A gml:MultiCurve is defined by one or more gml:AbstractCurves.
	  * The members of the geometric aggregate may be specified either using the "standard" property (gml:curveMember) or the array property (gml:curveMembers). It is also valid to use both the "standard" and the array properties in the same collection. */
	MultiCurve: MultiCurveType;
	/** In a gml:MultiCurveCoverage the domain is partioned into a collection of curves comprising a gml:MultiCurve.  The coverage function then maps each curve in the collection to a value in the range set.
	  * The content model is identical with gml:DiscreteCoverageType, but that gml:domainSet shall have values gml:MultiCurve.
	  * In a gml:MultiCurveCoverage the mapping from the domain to the range is straightforward.
	  * -	For gml:DataBlock encodings the curves of the gml:MultiCurve are mapped in document order to the tuples of the data block.
	  * -	For gml:CompositeValue encodings the curves of the gml:MultiCurve are mapped to the members of the composite value in document order.
	  * -	For gml:File encodings the curves of the gml:MultiCurve are mapped to the records of the file in sequential order. */
	MultiCurveCoverage: DiscreteCoverageType;
	multiCurveDomain: DomainSetType;
	multiCurveProperty: MultiCurvePropertyType;
	multiEdgeOf: MultiCurvePropertyType;
	multiExtentOf: MultiSurfacePropertyType;
	/** gml:MultiGeometry is a collection of one or more GML geometry objects of arbitrary type.
	  * The members of the geometric aggregate may be specified either using the "standard" property (gml:geometryMember) or the array property (gml:geometryMembers). It is also valid to use both the "standard" and the array properties in the same collection. */
	MultiGeometry: MultiGeometryType;
	multiGeometryProperty: MultiGeometryPropertyType;
	multiLocation: MultiPointPropertyType;
	/** A gml:MultiPoint consists of one or more gml:Points.
	  * The members of the geometric aggregate may be specified either using the "standard" property (gml:pointMember) or the array property (gml:pointMembers). It is also valid to use both the "standard" and the array properties in the same collection. */
	MultiPoint: MultiPointType;
	/** In a gml:MultiPointCoverage the domain set is a gml:MultiPoint, that is a collection of arbitrarily distributed geometric points.
	  * The content model is identical with gml:DiscreteCoverageType, but that gml:domainSet shall have values gml:MultiPoint.
	  * In a gml:MultiPointCoverage the mapping from the domain to the range is straightforward.
	  * -	For gml:DataBlock encodings the points of the gml:MultiPoint are mapped in document order to the tuples of the data block.
	  * -	For gml:CompositeValue encodings the points of the gml:MultiPoint are mapped to the members of the composite value in document order.
	  * -	For gml:File encodings the points of the gml:MultiPoint are mapped to the records of the file in sequential order. */
	MultiPointCoverage: DiscreteCoverageType;
	multiPointDomain: DomainSetType;
	multiPointProperty: MultiPointPropertyType;
	multiPosition: MultiPointPropertyType;
	/** A gml:MultiSolid is defined by one or more gml:AbstractSolids.
	  * The members of the geometric aggregate may be specified either using the "standard" property (gml:solidMember) or the array property (gml:solidMembers). It is also valid to use both the "standard" and the array properties in the same collection. */
	MultiSolid: MultiSolidType;
	/** In a gml:MultiSolidCoverage the domain is partioned into a collection of solids comprising a gml:MultiSolid.  The coverage function than maps each solid in the collection to a value in the range set.
	  * The content model is identical with gml:DiscreteCoverageType, but that gml:domainSet shall have values gml:MultiSolid.
	  * In a gml:MultiSolidCoverage the mapping from the domain to the range is straightforward.
	  * -	For gml:DataBlock encodings the solids of the gml:MultiSolid are mapped in document order to the tuples of the data block.
	  * -	For gml:CompositeValue encodings the solids of the gml:MultiSolid are mapped to the members of the composite value in document order.
	  * -	For gml:File encodings the solids of the gml:MultiSolid are mapped to the records of the file in sequential order. */
	MultiSolidCoverage: DiscreteCoverageType;
	multiSolidDomain: DomainSetType;
	multiSolidProperty: MultiSolidPropertyType;
	/** A gml:MultiSurface is defined by one or more gml:AbstractSurfaces.
	  * The members of the geometric aggregate may be specified either using the "standard" property (gml:surfaceMember) or the array property (gml:surfaceMembers). It is also valid to use both the "standard" and the array properties in the same collection. */
	MultiSurface: MultiSurfaceType;
	/** In a gml:MultiSurfaceCoverage the domain is partioned into a collection of surfaces comprising a gml:MultiSurface.  The coverage function than maps each surface in the collection to a value in the range set.
	  * The content model is identical with gml:DiscreteCoverageType, but that gml:domainSet shall have values gml:MultiSurface.
	  * In a gml:MultiSurfaceCoverage the mapping from the domain to the range is straightforward.
	  * -	For gml:DataBlock encodings the surfaces of the gml:MultiSurface are mapped in document order to the tuples of the data block.
	  * -	For gml:CompositeValue encodings the surfaces of the gml:MultiSurface are mapped to the members of the composite value in document order.
	  * -	For gml:File encodings the surfaces of the gml:MultiSurface are mapped to the records of the file in sequential order. */
	MultiSurfaceCoverage: DiscreteCoverageType;
	multiSurfaceDomain: DomainSetType;
	multiSurfaceProperty: MultiSurfacePropertyType;
	/** The gml:name property provides a label or identifier for the object, commonly a descriptive name. An object may have several names, typically assigned by different authorities. gml:name uses the gml:CodeType content model.  The authority for a name is indicated by the value of its (optional) codeSpace attribute.  The name may or may not be unique, as determined by the rules of the organization responsible for the codeSpace.  In common usage there will be one name per authority, so a processing application may select the name from its preferred codeSpace. */
	name: CodeType;
	/** gml:Node represents the 0-dimensional primitive.
	  * The optional coboundary of a node (gml:directedEdge) is a sequence of directed edges which are incident on this node. Edges emanating from this node appear in the node coboundary with a negative orientation.
	  * If provided, the aggregationType attribute shall have the value "sequence".
	  * A node may optionally be realised by a 0-dimensional geometric primitive (gml:pointProperty). */
	Node: NodeType;
	Null: string;
	ObliqueCartesianCS: ObliqueCartesianCSType;
	obliqueCartesianCSRef: ObliqueCartesianCSPropertyType;
	/** An offset curve is a curve at a constant distance from the basis curve. offsetBase is the base curve from which this curve is defined as an offset. distance and refDirection have the same meaning as specified in ISO 19107:2003, 6.4.23.
	  * The content model follows the general pattern for the encoding of curve segments. */
	OffsetCurve: OffsetCurveType;
	/** gml:OperationMethod is a method (algorithm or procedure) used to perform a coordinate operation. Most operation methods use a number of operation parameters, although some coordinate conversions use none. Each coordinate operation using the method assigns values to these parameters.
	  * The parameter elements are an unordered list of associations to the set of operation parameters and parameter groups used by this operation method. */
	OperationMethod: OperationMethodType;
	operationMethodRef: OperationMethodPropertyType;
	/** gml:operationParameter is an association role to the operation parameter of which this is a value. */
	operationParameter: OperationParameterPropertyType[];
	/** gml:OperationParameterGroup is the definition of a group of parameters used by an operation method. This complex type is expected to be used or extended for all applicable operation methods, without defining operation-method-specialized element names.
	  * The generalOperationParameter elements are an unordered list of associations to the set of operation parameters that are members of this group. */
	OperationParameterGroup: OperationParameterGroupType;
	operationParameterGroupRef: OperationParameterPropertyType;
	operationParameterRef: OperationParameterPropertyType;
	operationRef: OperationPropertyType;
	/** gml:operationVersion is the version of the coordinate transformation (i.e., instantiation due to the stochastic nature of the parameters). Mandatory when describing a transformation, and should not be supplied for a conversion. */
	operationVersion: string;
	/** OrientableCurve consists of a curve and an orientation. If the orientation is "+", then the OrientableCurve is identical to the baseCurve. If the orientation is "-", then the OrientableCurve is related to another AbstractCurve with a parameterization that reverses the sense of the curve traversal. */
	OrientableCurve: OrientableCurveType;
	/** OrientableSurface consists of a surface and an orientation. If the orientation is "+", then the OrientableSurface is identical to the baseSurface. If the orientation is "-", then the OrientableSurface is a reference to a gml:AbstractSurface with an up-normal that reverses the direction for this OrientableSurface, the sense of "the top of the surface". */
	OrientableSurface: OrientableSurfaceType;
	/** gml:origin is the date and time origin of this temporal datum. */
	origin: Date;
	/** gml:parameterValue is a composition association to a parameter value or group of parameter values used by a coordinate operation. */
	parameterValue: AbstractGeneralParameterValuePropertyType[];
	/** gml:ParameterValueGroup is a group of related parameter values. The same group can be repeated more than once in a Conversion, Transformation, or higher level ParameterValueGroup, if those instances contain different values of one or more parameterValues which suitably distinquish among those groups. This concrete complex type can be used for operation methods without using an Application Schema that defines operation-method-specialized element names and contents. This complex type may be used, extended, or restricted for well-known operation methods, especially for methods with only one instance.
	  * The parameterValue elements are an unordered set of composition association roles to the parameter values and groups of values included in this group. */
	ParameterValueGroup: ParameterValueGroupType;
	/** gml:PassThroughOperation is a pass-through operation specifies that a subset of a coordinate tuple is subject to a specific coordinate operation.
	  * The modifiedCoordinate property elements are an ordered sequence of positive integers defining the positions in a coordinate tuple of the coordinates affected by this pass-through operation. The AggregationAttributeGroup should be used to specify that the modifiedCoordinate elements are ordered. */
	PassThroughOperation: PassThroughOperationType;
	passThroughOperationRef: PassThroughOperationPropertyType;
	/** gml:pixelInCell is a specification of the way an image grid is associated with the image data attributes. The required codeSpace attribute shall reference a source of information specifying the values and meanings of all the allowed string values for this property. */
	pixelInCell: CodeWithAuthorityType;
	/** A Point is defined by a single coordinate tuple. The direct position of a point is specified by the pos element which is of type DirectPositionType. */
	Point: PointType;
	pointArrayProperty: PointArrayPropertyType;
	/** This property element either references a Point via the XLink-attributes or contains the Point element. */
	pointMember: PointPropertyType;
	/** This property element contains a list of points. The order of the elements is significant and shall be preserved when processing the array. */
	pointMembers: PointArrayPropertyType;
	/** This property element either references a point via the XLink-attributes or contains the point element. pointProperty is the predefined property which may be used by GML Application Schemas whenever a GML feature has a property with a value that is substitutable for Point. */
	pointProperty: PointPropertyType;
	pointRep: PointPropertyType;
	/** gml:polarCS is an association role to the polar coordinate system used by this CRS. */
	polarCS: PolarCSPropertyType[];
	polarCSRef: PolarCSPropertyType;
	/** A Polygon is a special surface that is defined by a single surface patch (see D.3.6). The boundary of this patch is coplanar and the polygon uses planar interpolation in its interior.
	  * The elements exterior and interior describe the surface boundary of the polygon. */
	Polygon: PolygonType;
	/** A gml:PolygonPatch is a surface patch that is defined by a set of boundary curves and an underlying surface to which these curves adhere. The curves shall be coplanar and the polygon uses planar interpolation in its interior.
	  * interpolation is fixed to "planar", i.e. an interpolation shall return points on a single plane. The boundary of the patch shall be contained within that plane. */
	PolygonPatch: PolygonPatchType;
	polygonPatches: SurfacePatchArrayPropertyType;
	/** A polyhedral surface is a surface composed of polygon patches connected along their common boundary curves. This differs from the surface type only in the restriction on the types of surface patches acceptable.
	  * polygonPatches encapsulates the polygon patches of the polyhedral surface. */
	PolyhedralSurface: SurfaceType;
	pos: DirectPositionType;
	position: PointPropertyType;
	posList: DirectPositionListType;
	/** gml:primeMeridian is an association role to the prime meridian used by this geodetic datum. */
	primeMeridian: PrimeMeridianPropertyType[];
	primeMeridianRef: PrimeMeridianPropertyType;
	priorityLocation: PriorityLocationPropertyType;
	/** gml:ProjectedCRS is a 2D coordinate reference system used to approximate the shape of the earth on a planar surface, but in such a way that the distortion that is inherent to the approximation is carefully controlled and known. Distortion correction is commonly applied to calculated bearings and distances to produce values that are a close match to actual field values. */
	ProjectedCRS: ProjectedCRSType;
	projectedCRSRef: ProjectedCRSPropertyType;
	/** An XML attribute uom ("unit of measure") is required, whose value is a URI which identifies the definition of a ratio scale or units by which the numeric value shall be multiplied, or an interval or position scale on which the value occurs. */
	Quantity: QuantityType;
	QuantityExtent: QuantityExtentType;
	QuantityList: MeasureOrNilReasonListType;
	/** The gml:quantityType property indicates the phenomenon to which the units apply. This element contains an informal description of the phenomenon or type of physical quantity that is measured or observed. When the physical quantity is the result of an observation or measurement, this term is known as observable type or measurand.
	  * The use of gml:quantityType for references to remote values is deprecated. */
	quantityType: StringOrRefType;
	/** The gml:quantityTypeReference property indicates the phenomenon to which the units apply. The content is a reference to a remote value. */
	quantityTypeReference: ReferenceType;
	/** gml:rangeMeaning describes the meaning of axis value range specified by gml:minimumValue and gml:maximumValue. This element shall be omitted when both gml:minimumValue and gml:maximumValue are omitted. This element should be included when gml:minimumValue and/or gml:maximumValue are included. If this element is omitted when the gml:minimumValue and/or gml:maximumValue are included, the meaning is unspecified. The codeSpace attribute shall reference a source of information specifying the values and meanings of all the allowed string values for this property. */
	rangeMeaning: CodeWithAuthorityType;
	rangeParameters: AssociationRoleType;
	/** The gml:rangeSet property element contains the values of the coverage (sometimes called the attribute values).  Its content model is given by gml:RangeSetType.
	  * This content model supports a structural description of the range.  The semantic information describing the range set is embedded using a uniform method, as part of the explicit values, or as a template value accompanying the representation using gml:DataBlock and gml:File.
	  * The values from each component (or "band") in the range may be encoded within a gml:ValueArray element or a concrete member of the gml:AbstractScalarValueList substitution group . Use of these elements satisfies the value-type homogeneity requirement. */
	rangeSet: RangeSetType;
	/** gml:realizationEpoch is the time after which this datum definition is valid. See ISO 19111 Table 32 for details. */
	realizationEpoch: Date;
	/** gml:Rectangle represents a rectangle as a surface patch with an outer boundary consisting of a linear ring. Note that this is a polygon (subtype) with no inner boundaries. The number of points in the linear ring shall be five.
	  * The ring (element exterior) shall be a gml:LinearRing and shall form a rectangle; the first and the last position shall be coincident.
	  * interpolation is fixed to "planar", i.e. an interpolation shall return points on a single plane. The boundary of the patch shall be contained within that plane. */
	Rectangle: RectangleType;
	/** A rectified grid is a grid for which there is an affine transformation between the grid coordinates and the coordinates of an external coordinate reference system. It is defined by specifying the position (in some geometric space) of the grid "origin" and of the vectors that specify the post locations.
	  * Note that the grid limits (post indexes) and axis name properties are inherited from gml:GridType and that gml:RectifiedGrid adds a gml:origin property (contains or references a gml:Point) and a set of gml:offsetVector properties. */
	RectifiedGrid: RectifiedGridType;
	/** The gml:RectifiedGridCoverage is a discrete point coverage based on a rectified grid. It is similar to the grid coverage except that the points of the grid are geometrically referenced. The rectified grid coverage has a domain that is a gml:RectifiedGrid geometry. */
	RectifiedGridCoverage: DiscreteCoverageType;
	rectifiedGridDomain: DomainSetType;
	referenceSystemRef: CRSPropertyType;
	remarks: string;
	resultOf: ResultType;
	/** If the value of an object property is another object and that object contains also a property for the association between the two objects, then this name of the reverse property may be encoded in a gml:reversePropertyName element in an appinfo annotation of the property element to document the constraint between the two properties. The value of the element shall contain the qualified name of the property element. */
	reversePropertyName: string;
	/** A ring is used to represent a single connected component of a surface boundary as specified in ISO 19107:2003, 6.3.6.
	  * Every gml:curveMember references or contains one curve, i.e. any element which is substitutable for gml:AbstractCurve. In the context of a ring, the curves describe the boundary of the surface. The sequence of curves shall be contiguous and connected in a cycle.
	  * If provided, the aggregationType attribute shall have the value "sequence". */
	Ring: RingType;
	/** The elements gml:conversionToPreferredUnit and gml:roughConversionToPreferredUnit represent parameters used to convert conventional units to preferred units for this physical quantity type.  A preferred unit is either a Base Unit or a Derived Unit that is selected for all values of one physical quantity type. */
	roughConversionToPreferredUnit: ConversionToPreferredUnitType;
	/** The gml:scope property provides a description of the usage, or limitations of usage, for which this CRS-related object is valid. If unknown, enter "not known". */
	scope: string;
	/** gml:secondDefiningParameter is a property containing the definition of the second parameter that defines the shape of an ellipsoid. An ellipsoid requires two defining parameters: semi-major axis and inverse flattening or semi-major axis and semi-minor axis. When the reference body is a sphere rather than an ellipsoid, only a single defining parameter is required, namely the radius of the sphere; in that case, the semi-major axis "degenerates" into the radius of the sphere.
	  * The inverseFlattening element contains the inverse flattening value of the ellipsoid. This value is a scale factor (or ratio). It uses gml:LengthType with the restriction that the unit of measure referenced by the uom attribute must be suitable for a scale factor, such as percent, permil, or parts-per-million.
	  * The semiMinorAxis element contains the length of the semi-minor axis of the ellipsoid. When the isSphere element is included, the ellipsoid is degenerate and is actually a sphere. The sphere is completely defined by the semi-major axis, which is the radius of the sphere. */
	secondDefiningParameter: SecondDefiningParameterType_2[];
	seconds: number;
	/** This property element contains a list of curve segments. The order of the elements is significant and shall be preserved when processing the array. */
	segments: CurveSegmentArrayPropertyType;
	/** gml:semiMajorAxis specifies the length of the semi-major axis of the ellipsoid, with its units. Uses the MeasureType with the restriction that the unit of measure referenced by uom must be suitable for a length, such as metres or feet. */
	semiMajorAxis: MeasureType;
	/** A shell is used to represent a single connected component of a solid boundary as specified in ISO 19107:2003, 6.3.8.
	  * Every gml:surfaceMember references or contains one surface, i.e. any element which is substitutable for gml:AbstractSurface. In the context of a shell, the surfaces describe the boundary of the solid.
	  * If provided, the aggregationType attribute shall have the value "set". */
	Shell: ShellType;
	singleCRSRef: SingleCRSPropertyType;
	singleOperationRef: SingleOperationPropertyType;
	/** A solid is the basis for 3-dimensional geometry. The extent of a solid is defined by the boundary surfaces as specified in ISO 19107:2003, 6.3.18. exterior specifies the outer boundary, interior the inner boundary of the solid. */
	Solid: SolidType;
	solidArrayProperty: SolidArrayPropertyType;
	/** This property element either references a solid via the XLink-attributes or contains the solid element. A solid element is any element, which is substitutable for gml:AbstractSolid. */
	solidMember: SolidPropertyType;
	/** This property element contains a list of solids. The order of the elements is significant and shall be preserved when processing the array. */
	solidMembers: SolidArrayPropertyType;
	/** This property element either references a solid via the XLink-attributes or contains the solid element. solidProperty is the predefined property which may be used by GML Application Schemas whenever a GML feature has a property with a value that is substitutable for AbstractSolid. */
	solidProperty: SolidPropertyType;
	/** gml:sourceCRS is an association role to the source CRS (coordinate reference system) of this coordinate operation. */
	sourceCRS: CRSPropertyType;
	/** gml:sourceDimensions is the number of dimensions in the source CRS of this operation method. */
	sourceDimensions: number;
	Sphere: SphereType;
	/** gml:sphericalCS is an association role to the spherical coordinate system used by this CRS. */
	sphericalCS: SphericalCSPropertyType[];
	sphericalCSRef: SphericalCSPropertyType;
	status: StringOrRefType;
	statusReference: ReferenceType;
	/** gml:stringValue is a character string value of an operation parameter. A string value does not have an associated unit of measure. */
	stringValue: string;
	/** The property elements gml:subComplex, gml:superComplex and gml:maximalComplex provide an encoding for relationships between topology complexes as described for gml:TopoComplex above. */
	subComplex: TopoComplexPropertyType;
	subject: TargetPropertyType;
	/** The property elements gml:subComplex, gml:superComplex and gml:maximalComplex provide an encoding for relationships between topology complexes as described for gml:TopoComplex above. */
	superComplex: TopoComplexPropertyType;
	surfaceArrayProperty: SurfaceArrayPropertyType;
	/** This property element either references a surface via the XLink-attributes or contains the surface element. A surface element is any element, which is substitutable for gml:AbstractSurface. */
	surfaceMember: SurfacePropertyType;
	/** This property element contains a list of surfaces. The order of the elements is significant and shall be preserved when processing the array. */
	surfaceMembers: SurfaceArrayPropertyType;
	/** This property element either references a surface via the XLink-attributes or contains the surface element. surfaceProperty is the predefined property which may be used by GML Application Schemas whenever a GML feature has a property with a value that is substitutable for AbstractSurface. */
	surfaceProperty: SurfacePropertyType;
	/** gml:targetCRS is an association role to the target CRS (coordinate reference system) of this coordinate operation. */
	targetCRS: CRSPropertyType;
	/** gml:targetDimensions is the number of dimensions in the target CRS of this operation method. */
	targetDimensions: number;
	targetElement: string;
	/** gml:TemporalCRS is a 1D coordinate reference system used for the recording of time. */
	TemporalCRS: TemporalCRSType;
	temporalCRSRef: TemporalCRSPropertyType;
	TemporalCS: TemporalCSType;
	temporalCSRef: TemporalCSPropertyType;
	/** gml:temporalDatum is an association role to the temporal datum used by this CRS. */
	temporalDatum: TemporalDatumPropertyType[];
	temporalDatumRef: TemporalDatumPropertyType;
	/** A calendar is a discrete temporal reference system that provides a basis for defining temporal position to a resolution of one day.
	  * gml:TimeCalendar adds one property to those inherited from gml:TimeReferenceSystem. A gml:referenceFrame provides a link to a gml:TimeCalendarEra that it uses. A  gml:TimeCalendar may reference more than one calendar era.
	  * The referenceFrame element follows the standard GML property model, allowing the association to be instantiated either using an inline description using the gml:TimeCalendarEra element, or a link to a gml:TimeCalendarEra which is explicit elsewhere. */
	TimeCalendar: TimeCalendarType;
	/** gml:TimeCalendarEra inherits basic properties from gml:DefinitionType and has the following additional properties:
	  * -	gml:referenceEvent is the name or description of a mythical or historic event which fixes the position of the base scale of the calendar era.  This is given as text or using a link to description held elsewhere.
	  * -	gml:referenceDate specifies the date of the referenceEvent expressed as a date in the given calendar.  In most calendars, this date is the origin (i.e., the first day) of the scale, but this is not always true.
	  * -	gml:julianReference specifies the Julian date that corresponds to the reference date.  The Julian day number is an integer value; the Julian date is a decimal value that allows greater resolution.  Transforming calendar dates to and from Julian dates provides a relatively simple basis for transforming dates from one calendar to another.
	  * -	gml:epochOfUse is the period for which the calendar era was used as a basis for dating. */
	TimeCalendarEra: TimeCalendarEraType;
	/** A clock provides a basis for defining temporal position within a day. A clock shall be used with a calendar in order to provide a complete description of a temporal position within a specific day.
	  * gml:TimeClock adds the following properties to those inherited from gml:TimeReferenceSystemType:
	  * -	gml:referenceEvent is the name or description of an event, such as solar noon or sunrise, which fixes the position of the base scale of the clock.
	  * -	gml:referenceTime specifies the time of day associated with the reference event expressed as a time of day in the given clock. The reference time is usually the origin of the clock scale.
	  * -	gml:utcReference specifies the 24 hour local or UTC time that corresponds to the reference time.
	  * -	gml:dateBasis contains or references the calendars that use this clock. */
	TimeClock: TimeClockType;
	/** A temporal coordinate system shall be based on a continuous interval scale defined in terms of a single time interval.
	  * The differences to ISO 19108 TM_CoordinateSystem are:
	  * -	the origin is specified either using the property gml:originPosition whose value is a direct time position, or using the property gml:origin whose model is gml:TimeInstantPropertyType; this permits more flexibility in representation and also supports referring to a value fixed elsewhere;
	  * -	the interval uses gml:TimeIntervalLengthType. */
	TimeCoordinateSystem: TimeCoordinateSystemType;
	/** gml:timeCS is an association role to the time coordinate system used by this CRS. */
	timeCS: TimeCSPropertyType[];
	/** A time edge is a one-dimensional topological primitive. It is an open interval that starts and ends at a node. The edge may be realised as a geometry whose value is a time period. */
	TimeEdge: TimeEdgeType;
	/** gml:TimeInstant acts as a zero-dimensional geometric primitive that represents an identifiable position in time. */
	TimeInstant: TimeInstantType;
	/** gml:timeInterval conforms to ISO 11404 which is based on floating point values for temporal length.
	  * ISO 11404 syntax specifies the use of a positiveInteger together with appropriate values for radix and factor. The resolution of the time interval is to one radix ^(-factor) of the specified time unit.
	  * The value of the unit is either selected from the units for time intervals from ISO 31-1:1992, or is another suitable unit.  The encoding is defined for GML in gml:TimeUnitType. The second component of this union type provides a method for indicating time units other than the six standard units given in the enumeration. */
	timeInterval: TimeIntervalLengthType;
	/** A time node is a zero-dimensional topological primitive that represents an identifiable node in time (it is equivalent to a point in space). A node may act as the termination or initiation of any number of time edges. A time node may be realised as a geometry, its position, whose value is a time instant. */
	TimeNode: TimeNodeType;
	/** Its content model follows the pattern of gml:TimeEdge, inheriting standard properties from gml:DefinitionType, and adding gml:start, gml:end and gml:extent properties, a set of gml:member properties which indicate ordered gml:TimeOrdinalEra elements, and a gml:group property which points to the parent era.
	  * The recursive inclusion of gml:TimeOrdinalEra elements allow the construction of an arbitrary depth hierarchical ordinal reference schema, such that an ordinal era at a given level of the hierarchy includes a sequence of shorter, coterminous ordinal eras. */
	TimeOrdinalEra: TimeOrdinalEraType;
	/** In some applications of geographic information — such as geology and archaeology — relative position in time is known more precisely than absolute time or duration. The order of events in time can be well established, but the magnitude of the intervals between them cannot be accurately determined; in such cases, the use of an ordinal temporal reference system is appropriate. An ordinal temporal reference system is composed of a sequence of named coterminous eras, which may in turn be composed of sequences of member eras at a finer scale, giving the whole a hierarchical structure of eras of verying resolution.
	  * An ordinal temporal reference system whose component eras are not further subdivided is effectively a temporal topological complex constrained to be a linear graph. An ordinal temporal reference system some or all of whose component eras are subdivided is effectively a temporal topological complex with the constraint that parallel branches may only be constructed in pairs where one is a single temporal ordinal era and the other is a sequence of temporal ordinal eras that are called "members" of the "group". This constraint means that within a single temporal ordinal reference system, the relative position of all temporal ordinal eras is unambiguous.
	  * The positions of the beginning and end of a given era may calibrate the relative time scale.
	  * gml:TimeOrdinalReferenceSystem adds one or more gml:component properties to the generic temporal reference system model. */
	TimeOrdinalReferenceSystem: TimeOrdinalReferenceSystemType;
	/** gml:TimePeriod acts as a one-dimensional geometric primitive that represents an identifiable extent in time.
	  * The location in of a gml:TimePeriod is described by the temporal positions of the instants at which it begins and ends. The length of the period is equal to the temporal distance between the two bounding temporal positions.
	  * Both beginning and end may be described in terms of their direct position using gml:TimePositionType which is an XML Schema simple content type, or by reference to an indentifiable time instant using gml:TimeInstantPropertyType.
	  * Alternatively a limit of a gml:TimePeriod may use the conventional GML property model to make a reference to a time instant described elsewhere, or a limit may be indicated as a direct position. */
	TimePeriod: TimePeriodType;
	/** This element is used directly as a property of gml:TimeInstant (see 15.2.2.3), and may also be used in application schemas. */
	timePosition: TimePositionType;
	/** A temporal topology complex shall be the connected acyclic directed graph composed of temporal topological primitives, i.e. time nodes and time edges. Because a time edge may not exist without two time nodes on its boundaries, static features have time edges from a temporal topology complex as the values of their temporal properties, regardless of explicit declarations.
	  * A temporal topology complex expresses a linear or a non-linear graph. A temporal linear graph, composed of a sequence of time edges, provides a lineage described only by "substitution" of feature instances or feature element values. A time node as the start or the end of the graph connects with at least one time edge. A time node other than the start and the end shall connect to at least two time edges: one of starting from the node, and another ending at the node.
	  * A temporal topological complex is a set of connected temporal topological primitives. The member primtives are indicated, either by reference or by value, using the primitive property. */
	TimeTopologyComplex: TimeTopologyComplexType;
	/** A tin is a triangulated surface that uses the Delauny algorithm or a similar algorithm complemented with consideration of stoplines (stopLines), breaklines (breakLines), and maximum length of triangle sides (maxLength). controlPoint shall contain a set of the positions (three or more) used as posts for this TIN (corners of the triangles in the TIN). See ISO 19107:2003, 6.4.39 for details. */
	Tin: TinType;
	/** gml:TopoComplex is a collection of topological primitives.
	  * Each complex holds a reference to its maximal complex (gml:maximalComplex) and optionally to sub- or super-complexes (gml:subComplex, gml:superComplex).
	  * A topology complex contains its primitive and sub-complex members. */
	TopoComplex: TopoComplexType;
	topoComplexProperty: TopoComplexPropertyType;
	/** gml:TopoCurve represents a homogeneous topological expression, a sequence of directed edges, which if realised are isomorphic to a geometric curve primitive. The intended use of gml:TopoCurve is to appear within a line feature to express the structural and geometric relationships of this feature to other features via the shared edge definitions.
	  * If provided, the aggregationType attribute shall have the value "sequence". */
	TopoCurve: TopoCurveType;
	/** The gml:topoCurveProperty property element may be used in features to express their relationship to the referenced topology edges. */
	topoCurveProperty: TopoCurvePropertyType;
	/** The intended use of gml:TopoPoint is to appear within a point feature to express the structural and possibly geometric relationships of this feature to other features via shared node definitions. */
	TopoPoint: TopoPointType;
	/** The gml:topoPointProperty property element may be used in features to express their relationship to the referenced topology node. */
	topoPointProperty: TopoPointPropertyType;
	/** The gml:topoPrimitiveMember property element encodes for the relationship between a topology complex and a single topology primitive. */
	topoPrimitiveMember: TopoPrimitiveMemberType;
	/** The gml:topoPrimitiveMembers property element encodes the relationship between a topology complex and an arbitrary number of topology primitives. */
	topoPrimitiveMembers: TopoPrimitiveArrayAssociationType;
	/** gml:TopoSolid represents the 3-dimensional topology primitive.
	  * The topological boundary of a solid (gml:directedFace) consists of a set of directed faces.
	  * A solid may optionally be realised by a 3-dimensional geometric primitive (gml:solidProperty). */
	TopoSolid: TopoSolidType;
	/** gml:TopoSurface represents a homogeneous topological expression, a set of directed faces, which if realised are isomorphic to a geometric surface primitive. The intended use of gml:TopoSurface is to appear within a surface feature to express the structural and possibly geometric relationships of this surface feature to other features via the shared face definitions. */
	TopoSurface: TopoSurfaceType;
	/** The gml:topoSurfaceProperty property element may be used in features to express their relationship to the referenced topology faces. */
	topoSurfaceProperty: TopoSurfacePropertyType;
	/** gml:TopoVolume represents a homogeneous topological expression, a set of directed topologic solids, which if realised are isomorphic to a geometric solid primitive. The intended use of gml:TopoVolume is to appear within a solid feature to express the structural and geometric relationships of this solid feature to other features via the shared solid definitions. */
	TopoVolume: TopoVolumeType;
	/** The gml:topoVolumeProperty element may be used in features to express their relationship to the referenced topology volume. */
	topoVolumeProperty: TopoVolumePropertyType;
	track: HistoryPropertyType;
	/** gml:Transformation is a concrete object element derived from gml:GeneralTransformation (13.6.2.13).
	  * This concrete object can be used for all operation methods, without using a GML Application Schema that defines operation-method-specialized element names and contents, especially for methods with only one Transformation instance.
	  * The parameterValue elements are an unordered list of composition associations to the set of parameter values used by this conversion operation. */
	Transformation: TransformationType;
	transformationRef: TransformationPropertyType;
	/** gml:Triangle represents a triangle as a surface patch with an outer boundary consisting of a linear ring. Note that this is a polygon (subtype) with no inner boundaries. The number of points in the linear ring shall be four.
	  * The ring (element exterior) shall be a gml:LinearRing and shall form a triangle, the first and the last position shall be coincident.
	  * interpolation is fixed to "planar", i.e. an interpolation shall return points on a single plane. The boundary of the patch shall be contained within that plane. */
	Triangle: TriangleType;
	trianglePatches: SurfacePatchArrayPropertyType;
	/** gml:CoordinatesType consists of a list of coordinate tuples, with each coordinate tuple separated by the ts or tuple separator (whitespace), and each coordinate in the tuple by the cs or coordinate separator (comma).
	  * The gml:tupleList encoding is effectively "band-interleaved". */
	tupleList: CoordinatesType;
	/** The element gml:unitOfMeasure is a property element to refer to a unit of measure. This is an empty element which carries a reference to a unit of measure definition. */
	unitOfMeasure: UnitOfMeasureType;
	/** gml:userDefinedCS is an association role to the user defined coordinate system used by this CRS. */
	userDefinedCS: UserDefinedCSPropertyType[];
	userDefinedCSRef: UserDefinedCSPropertyType;
	usesAffineCS: AffineCSPropertyType;
	usesAxis: CoordinateSystemAxisPropertyType;
	usesCartesianCS: CartesianCSPropertyType;
	usesCS: CoordinateSystemPropertyType;
	usesEllipsoid: EllipsoidPropertyType;
	usesEllipsoidalCS: EllipsoidalCSPropertyType;
	usesEngineeringDatum: EngineeringDatumPropertyType;
	usesGeodeticDatum: GeodeticDatumPropertyType;
	usesImageDatum: ImageDatumPropertyType;
	usesMethod: OperationMethodPropertyType;
	usesObliqueCartesianCS: ObliqueCartesianCSPropertyType;
	usesOperation: CoordinateOperationPropertyType;
	usesParameter: AbstractGeneralOperationParameterPropertyType;
	usesPrimeMeridian: PrimeMeridianPropertyType;
	usesSingleOperation: CoordinateOperationPropertyType;
	usesSphericalCS: SphericalCSPropertyType;
	usesTemporalCS: TemporalCSPropertyType;
	usesTemporalDatum: TemporalDatumPropertyType;
	usesTimeCS: TimeCSPropertyType;
	usesValue: AbstractGeneralParameterValuePropertyType;
	usesVerticalCS: VerticalCSPropertyType;
	usesVerticalDatum: VerticalDatumPropertyType;
	using: ProcedurePropertyType;
	/** gml:validTime is a convenience property element. */
	validTime: TimePrimitivePropertyType;
	/** gml:value is a numeric value of an operation parameter, with its associated unit of measure. */
	value: MeasureType;
	/** A Value Array is used for homogeneous arrays of primitive and aggregate values.
	  * The member values may be scalars, composites, arrays or lists.
	  * ValueArray has the same content model as CompositeValue, but the member values shall be homogeneous.  The element declaration contains a Schematron constraint which expresses this restriction precisely.  Since the members are homogeneous, the gml:referenceSystem (uom, codeSpace) may be specified on the gml:ValueArray itself and inherited by all the members if desired. */
	ValueArray: ValueArrayType;
	/** Property that refers to, or contains, a Value. */
	valueComponent: ValuePropertyType;
	/** Property that contains Values. */
	valueComponents: ValueArrayPropertyType;
	/** gml:valueFile is a reference to a file or a part of a file containing one or more parameter values, each numeric value with its associated unit of measure. When referencing a part of a file, that file shall contain multiple identified parts, such as an XML encoded document. Furthermore, the referenced file or part of a file may reference another part of the same or different files, as allowed in XML documents. */
	valueFile: string;
	/** gml:valueList is an ordered sequence of two or more numeric values of an operation parameter list, where each value has the same associated unit of measure. An element of this type contains a space-separated sequence of double values. */
	valueList: MeasureListType;
	valueOfParameter: OperationParameterPropertyType;
	/** Property that refers to, or contains, a Value. Convenience element for general use. */
	valueProperty: ValuePropertyType;
	valuesOfGroup: OperationParameterGroupPropertyType;
	vector: VectorType;
	/** gml:VerticalCRS is a 1D coordinate reference system used for recording heights or depths. Vertical CRSs make use of the direction of gravity to define the concept of height or depth, but the relationship with gravity may not be straightforward. By implication, ellipsoidal heights (h) cannot be captured in a vertical coordinate reference system. Ellipsoidal heights cannot exist independently, but only as an inseparable part of a 3D coordinate tuple defined in a geographic 3D coordinate reference system. */
	VerticalCRS: VerticalCRSType;
	verticalCRSRef: VerticalCRSPropertyType;
	/** gml:verticalCS is an association role to the vertical coordinate system used by this CRS. */
	verticalCS: VerticalCSPropertyType[];
	verticalCSRef: VerticalCSPropertyType;
	/** gml:verticalDatum is an association role to the vertical datum used by this CRS. */
	verticalDatum: VerticalDatumPropertyType[];
	verticalDatumRef: VerticalDatumPropertyType;
}
export var document: document;
