import * as Primitive from '../../xml-primitives';
import * as gml from '../gml/3.2';
import * as swe from '../swe/2.0';
import * as xlink from '../../www.w3.org/1999/xlink';

// Source files:
// http://schemas.opengis.net/gmlcov/1.0/coverage.xsd
// http://schemas.opengis.net/gmlcov/1.0/gmlcovAll.xsd
// http://schemas.opengis.net/gmlcov/1.0/grids.xsd


declare module '../gml/3.2' {
export interface _AbstractFeatureProxyType {
	/** A GridCoverage is a discrete point coverage in which the domain is a geometric grid of points encoded using gml:Grid (not its subtypes gml:RectifiedGrid or a subtype of AbstractReferenceableGrid). Note that this is similar to the MultiPointCoverage except that a gml:Grid shall be used to describe the domain.
	  * In order to address ambiguities in the gml:Grid definition, this GML Application Schema for Coverages imposes additional constraints on the use of a gml:Grid within a gmlcov:GridCoverage. (Specifically, there is no provision in the definition of gml:Grid definition to express the relationship between the grid positions and this geometry's coordinate reference system, which will always exist in some contexts, such as a Web Coverage Service. This coordinate reference system will be explicitly referenced in the srsName attribute of the gml:SRSReferenceGroup of gml:Grid, or be inherited from an enclosing container element, such as the gml:Envelope of this gmlcov:GridCoverage.) Since provision for expressing a relationship does not exist, whenever used in gmlcov:GridCoverage, the relationship shall be simple. In this simple relationship, the dimension attribute of the gml:Grid shall be identical to the dimension of the geometry's coordinate system, the axes of the gml:Grid shall be identical to the axes of the geometry's coordinate system (which requires that the axisLabels be identical to those in the coordinate system definition), and the limits shall be treated as being expressed as coordinates in the geometry's coordinate reference system.
	  * Clearly these additional constraints are quite limiting, in that gridded datasets whose Reference points happen to exist exactly at integral coordinates of a spatial coordinate system at a spacing of exactly one in all coordinate dimensions are exceedingly rare, unless that coordinate system is part of a gml:ImageCRS. Nevertheless, the gmlcov:GridCoverage is available for such purposes.
	  * It is recommended that the more sensible provisions of the gmlcov:RectifiedGridCoverage or gmlcov:ReferenceableGridCoverage be utilized for all gridded datasets, since their domains can accommodate the simple provisions of the gmlcov:GridCoverage as well as more complex referencing situations. Since this GridCoverage uses the gmlcov:AbstractCoverageType, it can be used for both discrete and continuous coverages. */
	GridCoverage?: AbstractDiscreteCoverageType;
	/** A RectifiedGridCoverage is a discrete point coverage based on a rectified grid. It is similar to the grid coverage except that the points of the grid are geometrically referenced. The rectified grid coverage has a domain that is a gml:RectifiedGrid geometry. Since this RectifiedGridCoverage uses the gmlcov:AbstractCoverageType, it can be used for both discrete and continuous coverages. */
	RectifiedGridCoverage?: AbstractDiscreteCoverageType;
	/** A ReferenceableGridCoverage is an implementation of ISO 19123 CV_DiscreteGridPointCoverage for a CV_ReferenceableGrid domain. It is a coverage based on a referenceable grid and has a domain geometry that is in the substitution group of AbstractReferenceableGrid.The equivalent of this element is being added to GML 3.2.1 as 3.3 by approved Change Request 07-112r3.Since this ReferenceableGridCoverage uses the gmlcov:AbstractCoverageType, it can be used for both discrete and continuous coverages. */
	ReferenceableGridCoverage?: AbstractDiscreteCoverageType;
	/** In a gmlcov:MultiCurveCoverage the domain is partioned into a collection of curves comprising a gml:MultiCurve.  The coverage function then maps each curve in the collection to a value in the range set.
	  * The content model is identical with gmlcov:AbstractDiscreteCoverageType, but that gml:domainSet shall have values gml:MultiCurve.
	  * In a gmlcov:MultiCurveCoverage the mapping from the domain to the range is straightforward.
	  * -    For gml:DataBlock encodings the curves of the gmlcov:MultiCurve are mapped in document order to the tuples of the data block.
	  * -    For gml:CompositeValue encodings the curves of the gmlcov:MultiCurve are mapped to the members of the composite value in document order.
	  * -    For gml:File encodings the curves of the gmlcov:MultiCurve are mapped to the records of the file in sequential order. */
	MultiCurveCoverage?: AbstractDiscreteCoverageType;
	/** In a gmlcov:MultiPointCoverage the domain set is a gml:MultiPoint, that is a collection of arbitrarily distributed geometric points.
	  * The content model is identical with gmlcov:AbstractDiscreteCoverageType, but that gml:domainSet shall have values gml:MultiPoint.
	  * In a gmlcov:MultiPointCoverage the mapping from the domain to the range is straightforward.
	  * -    For gml:DataBlock encodings the points of the gmlcov:MultiPoint are mapped in document order to the tuples of the data block.
	  * -    For gml:CompositeValue encodings the points of the gmlcov:MultiPoint are mapped to the members of the composite value in document order.
	  * -    For gml:File encodings the points of the gmlcov:MultiPoint are mapped to the records of the file in sequential order. */
	MultiPointCoverage?: AbstractDiscreteCoverageType;
	/** In a gmlcov:MultiSolidCoverage the domain is partitioned into a collection of solids comprising a gml:MultiSolid.  The coverage function than maps each solid in the collection to a value in the range set.
	  * The content model is identical with gmlcov:AbstractDiscreteCoverageType, but that gml:domainSet shall have values gml:MultiSolid.
	  * In a gmlcov:MultiSolidCoverage the mapping from the domain to the range is straightforward.
	  * -    For gml:DataBlock encodings the solids of the gmlcov:MultiSolid are mapped in document order to the tuples of the data block.
	  * -    For gml:CompositeValue encodings the solids of the gmlcov:MultiSolid are mapped to the members of the composite value in document order.
	  * -    For gml:File encodings the solids of the gmlcov:MultiSolid are mapped to the records of the file in sequential order. */
	MultiSolidCoverage?: AbstractDiscreteCoverageType;
	/** In a gmlcov:MultiSurfaceCoverage the domain is partioned into a collection of surfaces comprising a gml:MultiSurface.  The coverage function than maps each surface in the collection to a value in the range set.
	  * The content model is identical with gmlcov:AbstractDiscreteCoverageType, but that gml:domainSet shall have values gml:MultiSurface.
	  * In a gmlcov:MultiSurfaceCoverage the mapping from the domain to the range is straightforward.
	  * -    For gml:DataBlock encodings the surfaces of the gmlcov:MultiSurface are mapped in document order to the tuples of the data block.
	  * -    For gml:CompositeValue encodings the surfaces of the gmlcov:MultiSurface are mapped to the members of the composite value in document order.
	  * -    For gml:File encodings the surfaces of the gmlcov:MultiSurface are mapped to the records of the file in sequential order. */
	MultiSurfaceCoverage?: AbstractDiscreteCoverageType;
	/** States are captured by time-stamped instances of a feature. The content model extends the standard gml:AbstractFeatureType with the gml:dynamicProperties model group.
	  * Each time-stamped instance represents a 'snapshot' of a feature. The dynamic feature classes will normally be extended to suit particular applications.  A dynamic feature bears either a time stamp or a history. */
	DynamicFeature?: gml.DynamicFeatureType;
	/** A gml:DynamicFeatureCollection is a feature collection that has a gml:validTime property (i.e. is a snapshot of the feature collection) or which has a gml:history property that contains one or more gml:AbstractTimeSlices each of which contain values of the time varying properties of the feature collection.  Note that the gml:DynamicFeatureCollection may be one of the following:
	  * 1.	A feature collection which consists of static feature members (members do not change in time) but which has properties of the collection object as a whole that do change in time .
	  * 2.	A feature collection which consists of dynamic feature members (the members are gml:DynamicFeatures) but which also has properties of the collection as a whole that vary in time. */
	DynamicFeatureCollection?: gml.DynamicFeatureCollectionType;
	/** A gml:GriddedCoverage is a discrete point coverage in which the domain set is a geometric grid of points.
	  * Note that this is the same as the gml:MultiPointCoverage except that we have a gml:Grid to describe the domain.
	  * The simple gridded coverage is not geometrically referenced and hence no geometric positions are assignable to the points in the grid. Such geometric positioning is introduced in the gml:RectifiedGridCoverage. */
	GridCoverage?: gml.DiscreteCoverageType;
	/** In a gml:MultiCurveCoverage the domain is partioned into a collection of curves comprising a gml:MultiCurve.  The coverage function then maps each curve in the collection to a value in the range set.
	  * The content model is identical with gml:DiscreteCoverageType, but that gml:domainSet shall have values gml:MultiCurve.
	  * In a gml:MultiCurveCoverage the mapping from the domain to the range is straightforward.
	  * -	For gml:DataBlock encodings the curves of the gml:MultiCurve are mapped in document order to the tuples of the data block.
	  * -	For gml:CompositeValue encodings the curves of the gml:MultiCurve are mapped to the members of the composite value in document order.
	  * -	For gml:File encodings the curves of the gml:MultiCurve are mapped to the records of the file in sequential order. */
	MultiCurveCoverage?: gml.DiscreteCoverageType;
	/** In a gml:MultiPointCoverage the domain set is a gml:MultiPoint, that is a collection of arbitrarily distributed geometric points.
	  * The content model is identical with gml:DiscreteCoverageType, but that gml:domainSet shall have values gml:MultiPoint.
	  * In a gml:MultiPointCoverage the mapping from the domain to the range is straightforward.
	  * -	For gml:DataBlock encodings the points of the gml:MultiPoint are mapped in document order to the tuples of the data block.
	  * -	For gml:CompositeValue encodings the points of the gml:MultiPoint are mapped to the members of the composite value in document order.
	  * -	For gml:File encodings the points of the gml:MultiPoint are mapped to the records of the file in sequential order. */
	MultiPointCoverage?: gml.DiscreteCoverageType;
	/** In a gml:MultiSolidCoverage the domain is partioned into a collection of solids comprising a gml:MultiSolid.  The coverage function than maps each solid in the collection to a value in the range set.
	  * The content model is identical with gml:DiscreteCoverageType, but that gml:domainSet shall have values gml:MultiSolid.
	  * In a gml:MultiSolidCoverage the mapping from the domain to the range is straightforward.
	  * -	For gml:DataBlock encodings the solids of the gml:MultiSolid are mapped in document order to the tuples of the data block.
	  * -	For gml:CompositeValue encodings the solids of the gml:MultiSolid are mapped to the members of the composite value in document order.
	  * -	For gml:File encodings the solids of the gml:MultiSolid are mapped to the records of the file in sequential order. */
	MultiSolidCoverage?: gml.DiscreteCoverageType;
	/** In a gml:MultiSurfaceCoverage the domain is partioned into a collection of surfaces comprising a gml:MultiSurface.  The coverage function than maps each surface in the collection to a value in the range set.
	  * The content model is identical with gml:DiscreteCoverageType, but that gml:domainSet shall have values gml:MultiSurface.
	  * In a gml:MultiSurfaceCoverage the mapping from the domain to the range is straightforward.
	  * -	For gml:DataBlock encodings the surfaces of the gml:MultiSurface are mapped in document order to the tuples of the data block.
	  * -	For gml:CompositeValue encodings the surfaces of the gml:MultiSurface are mapped to the members of the composite value in document order.
	  * -	For gml:File encodings the surfaces of the gml:MultiSurface are mapped to the records of the file in sequential order. */
	MultiSurfaceCoverage?: gml.DiscreteCoverageType;
	/** The gml:RectifiedGridCoverage is a discrete point coverage based on a rectified grid. It is similar to the grid coverage except that the points of the grid are geometrically referenced. The rectified grid coverage has a domain that is a gml:RectifiedGrid geometry. */
	RectifiedGridCoverage?: gml.DiscreteCoverageType;
	/** The content model is a straightforward extension of gml:AbstractFeatureType; it automatically has the gml:identifier, gml:description, gml:descriptionReference, gml:name, and gml:boundedBy properties.
	  * The gml:validTime element describes the time of the observation. Note that this may be a time instant or a time period.
	  * The gml:using property contains or references a description of a sensor, instrument or procedure used for the observation.
	  * The gml:target property contains or references the specimen, region or station which is the object of the observation. This property is particularly useful for remote observations, such as photographs, where a generic location property might apply to the location of the camera or the location of the field of view, and thus may be ambiguous.
	  * The gml:subject element is provided as a convenient synonym for gml:target. This is the term commonly used in phtotography.
	  * The gml:resultOf property indicates the result of the observation.  The value may be inline, or a reference to a value elsewhere. */
	Observation?: gml.ObservationType;
	/** A gml:DirectedObservation is the same as an observation except that it adds an additional gml:direction property. This is the direction in which the observation was acquired. Clearly this applies only to certain types of observations such as visual observations by people, or observations obtained from terrestrial cameras. */
	DirectedObservation?: gml.DirectedObservationType;
	/** gml:DirectedObservationAtDistance adds an additional distance property. This is the distance from the observer to the subject of the observation. Clearly this applies only to certain types of observations such as visual observations by people, or observations obtained from terrestrial cameras. */
	DirectedObservationAtDistance?: gml.DirectedObservationAtDistanceType;
}
export interface _AbstractGeometricAggregateProxyType {
	/** gml:SimpleMultiPoint implements, and provides a simplified encoding for, ISO 19107 GM_MultiPoint (see ISO 19107:2003, 6.5.4). A gml:SimpleMultiPoint consists of a list of DirectPositions. */
	SimpleMultiPoint?: SimpleMultiPointType;
}
export interface _AbstractGeneralParameterValueProxyType {
	/** Extends gml:ParameterValue to also allow values that are a gml:Geometry or a gml:vector. This element and its type are copied from  Change Request 09-091r1, which adds them to GML 3.2.1. */
	ParameterValue?: ParameterValueType;
	/** gml:ParameterValue is a parameter value, an ordered sequence of values, or a reference to a file of parameter values. This concrete complex type may be used for operation methods without using an Application Schema that defines operation-method-specialized element names and contents, especially for methods with only one instance. This complex type may be used, extended, or restricted for well-known operation methods, especially for methods with many instances. */
	ParameterValue?: gml.ParameterValueType;
	includesValue?: gml.AbstractGeneralParameterValuePropertyType;
	usesValue?: gml.AbstractGeneralParameterValuePropertyType;
}
export interface _AbstractCoverageProxyType {
	/** A gml:GriddedCoverage is a discrete point coverage in which the domain set is a geometric grid of points.
	  * Note that this is the same as the gml:MultiPointCoverage except that we have a gml:Grid to describe the domain.
	  * The simple gridded coverage is not geometrically referenced and hence no geometric positions are assignable to the points in the grid. Such geometric positioning is introduced in the gml:RectifiedGridCoverage. */
	GridCoverage?: gml.DiscreteCoverageType;
	/** In a gml:MultiCurveCoverage the domain is partioned into a collection of curves comprising a gml:MultiCurve.  The coverage function then maps each curve in the collection to a value in the range set.
	  * The content model is identical with gml:DiscreteCoverageType, but that gml:domainSet shall have values gml:MultiCurve.
	  * In a gml:MultiCurveCoverage the mapping from the domain to the range is straightforward.
	  * -	For gml:DataBlock encodings the curves of the gml:MultiCurve are mapped in document order to the tuples of the data block.
	  * -	For gml:CompositeValue encodings the curves of the gml:MultiCurve are mapped to the members of the composite value in document order.
	  * -	For gml:File encodings the curves of the gml:MultiCurve are mapped to the records of the file in sequential order. */
	MultiCurveCoverage?: gml.DiscreteCoverageType;
	/** In a gml:MultiPointCoverage the domain set is a gml:MultiPoint, that is a collection of arbitrarily distributed geometric points.
	  * The content model is identical with gml:DiscreteCoverageType, but that gml:domainSet shall have values gml:MultiPoint.
	  * In a gml:MultiPointCoverage the mapping from the domain to the range is straightforward.
	  * -	For gml:DataBlock encodings the points of the gml:MultiPoint are mapped in document order to the tuples of the data block.
	  * -	For gml:CompositeValue encodings the points of the gml:MultiPoint are mapped to the members of the composite value in document order.
	  * -	For gml:File encodings the points of the gml:MultiPoint are mapped to the records of the file in sequential order. */
	MultiPointCoverage?: gml.DiscreteCoverageType;
	/** In a gml:MultiSolidCoverage the domain is partioned into a collection of solids comprising a gml:MultiSolid.  The coverage function than maps each solid in the collection to a value in the range set.
	  * The content model is identical with gml:DiscreteCoverageType, but that gml:domainSet shall have values gml:MultiSolid.
	  * In a gml:MultiSolidCoverage the mapping from the domain to the range is straightforward.
	  * -	For gml:DataBlock encodings the solids of the gml:MultiSolid are mapped in document order to the tuples of the data block.
	  * -	For gml:CompositeValue encodings the solids of the gml:MultiSolid are mapped to the members of the composite value in document order.
	  * -	For gml:File encodings the solids of the gml:MultiSolid are mapped to the records of the file in sequential order. */
	MultiSolidCoverage?: gml.DiscreteCoverageType;
	/** In a gml:MultiSurfaceCoverage the domain is partioned into a collection of surfaces comprising a gml:MultiSurface.  The coverage function than maps each surface in the collection to a value in the range set.
	  * The content model is identical with gml:DiscreteCoverageType, but that gml:domainSet shall have values gml:MultiSurface.
	  * In a gml:MultiSurfaceCoverage the mapping from the domain to the range is straightforward.
	  * -	For gml:DataBlock encodings the surfaces of the gml:MultiSurface are mapped in document order to the tuples of the data block.
	  * -	For gml:CompositeValue encodings the surfaces of the gml:MultiSurface are mapped to the members of the composite value in document order.
	  * -	For gml:File encodings the surfaces of the gml:MultiSurface are mapped to the records of the file in sequential order. */
	MultiSurfaceCoverage?: gml.DiscreteCoverageType;
	/** The gml:RectifiedGridCoverage is a discrete point coverage based on a rectified grid. It is similar to the grid coverage except that the points of the grid are geometrically referenced. The rectified grid coverage has a domain that is a gml:RectifiedGrid geometry. */
	RectifiedGridCoverage?: gml.DiscreteCoverageType;
}
export interface _GridProxyType {
}
}
interface BaseType {
	_exists: boolean;
	_namespace: string;
}
interface _AbstractContinuousCoverageProxyType extends BaseType {}
interface AbstractContinuousCoverageProxyType extends _AbstractContinuousCoverageProxyType { constructor: { new(): AbstractContinuousCoverageProxyType }; }

/** This parallels gml:AbstractContinuousCoverageType, except that the gml:coverageFunction element has been moved "up" into gmlcov:AbstractCoverageType. */
interface _AbstractContinuousCoverageType extends _AbstractCoverageType {}
export interface AbstractContinuousCoverageType extends _AbstractContinuousCoverageType { constructor: { new(): AbstractContinuousCoverageType }; }
export var AbstractContinuousCoverageType: { new(): AbstractContinuousCoverageType };

interface _AbstractCoverageProxyType extends _AbstractDiscreteCoverageProxyType {
	/** A GridCoverage is a discrete point coverage in which the domain is a geometric grid of points encoded using gml:Grid (not its subtypes gml:RectifiedGrid or a subtype of AbstractReferenceableGrid). Note that this is similar to the MultiPointCoverage except that a gml:Grid shall be used to describe the domain.
	  * In order to address ambiguities in the gml:Grid definition, this GML Application Schema for Coverages imposes additional constraints on the use of a gml:Grid within a gmlcov:GridCoverage. (Specifically, there is no provision in the definition of gml:Grid definition to express the relationship between the grid positions and this geometry's coordinate reference system, which will always exist in some contexts, such as a Web Coverage Service. This coordinate reference system will be explicitly referenced in the srsName attribute of the gml:SRSReferenceGroup of gml:Grid, or be inherited from an enclosing container element, such as the gml:Envelope of this gmlcov:GridCoverage.) Since provision for expressing a relationship does not exist, whenever used in gmlcov:GridCoverage, the relationship shall be simple. In this simple relationship, the dimension attribute of the gml:Grid shall be identical to the dimension of the geometry's coordinate system, the axes of the gml:Grid shall be identical to the axes of the geometry's coordinate system (which requires that the axisLabels be identical to those in the coordinate system definition), and the limits shall be treated as being expressed as coordinates in the geometry's coordinate reference system.
	  * Clearly these additional constraints are quite limiting, in that gridded datasets whose Reference points happen to exist exactly at integral coordinates of a spatial coordinate system at a spacing of exactly one in all coordinate dimensions are exceedingly rare, unless that coordinate system is part of a gml:ImageCRS. Nevertheless, the gmlcov:GridCoverage is available for such purposes.
	  * It is recommended that the more sensible provisions of the gmlcov:RectifiedGridCoverage or gmlcov:ReferenceableGridCoverage be utilized for all gridded datasets, since their domains can accommodate the simple provisions of the gmlcov:GridCoverage as well as more complex referencing situations. Since this GridCoverage uses the gmlcov:AbstractCoverageType, it can be used for both discrete and continuous coverages. */
	GridCoverage?: AbstractDiscreteCoverageType;
	/** A RectifiedGridCoverage is a discrete point coverage based on a rectified grid. It is similar to the grid coverage except that the points of the grid are geometrically referenced. The rectified grid coverage has a domain that is a gml:RectifiedGrid geometry. Since this RectifiedGridCoverage uses the gmlcov:AbstractCoverageType, it can be used for both discrete and continuous coverages. */
	RectifiedGridCoverage?: AbstractDiscreteCoverageType;
	/** A ReferenceableGridCoverage is an implementation of ISO 19123 CV_DiscreteGridPointCoverage for a CV_ReferenceableGrid domain. It is a coverage based on a referenceable grid and has a domain geometry that is in the substitution group of AbstractReferenceableGrid.The equivalent of this element is being added to GML 3.2.1 as 3.3 by approved Change Request 07-112r3.Since this ReferenceableGridCoverage uses the gmlcov:AbstractCoverageType, it can be used for both discrete and continuous coverages. */
	ReferenceableGridCoverage?: AbstractDiscreteCoverageType;
}
interface AbstractCoverageProxyType extends _AbstractCoverageProxyType { constructor: { new(): AbstractCoverageProxyType }; }

/** The gml:coverageFunction property is shifted "up" to this place in the inheritance hierarchy because it is included in both discrete and continuous coverages (i.e., all subtypes of AbstractCoverageType) and, hence, does not change syntax nor semantic in any way. It permits, however, coverages in the gmlcov:AbstractCoverage substitutionGroup to be used for either discrete and continuous coverages, in preparation for expected future elimination of this distinction. */
interface _AbstractCoverageType extends gml._AbstractCoverageType {
	/** The gml:coverageFunction property describes the mapping function from the domain to the range of the coverage.
	  * The value of the CoverageFunction is one of gml:CoverageMappingRule and gml:GridFunction.
	  * If the gml:coverageFunction property is omitted for a gridded coverage (including rectified gridded coverages) the gml:startPoint is assumed to be the value of the gml:low property in the gml:Grid geometry, and the gml:sequenceRule is assumed to be linear and the gml:axisOrder property is assumed to be "+1 +2". */
	coverageFunction?: gml.CoverageFunctionType;
	/** This is a hook for adding any further information to a coverage, such as domain-specific metadata. Recommended use is to use the XML extension mechanism, such as in a WCS extension or Application Profile, to define the desired metadata structure. */
	metadata?: MetadataType[];
	/** The rangeType element describes the structure of a coverage's range values, introduced for coverage definitions used, e.g., by WCS 2.0. */
	rangeType: swe.DataRecordPropertyType;
}
export interface AbstractCoverageType extends _AbstractCoverageType { constructor: { new(): AbstractCoverageType }; }
export var AbstractCoverageType: { new(): AbstractCoverageType };

interface _AbstractDiscreteCoverageProxyType extends BaseType {
	/** In a gmlcov:MultiCurveCoverage the domain is partioned into a collection of curves comprising a gml:MultiCurve.  The coverage function then maps each curve in the collection to a value in the range set.
	  * The content model is identical with gmlcov:AbstractDiscreteCoverageType, but that gml:domainSet shall have values gml:MultiCurve.
	  * In a gmlcov:MultiCurveCoverage the mapping from the domain to the range is straightforward.
	  * -    For gml:DataBlock encodings the curves of the gmlcov:MultiCurve are mapped in document order to the tuples of the data block.
	  * -    For gml:CompositeValue encodings the curves of the gmlcov:MultiCurve are mapped to the members of the composite value in document order.
	  * -    For gml:File encodings the curves of the gmlcov:MultiCurve are mapped to the records of the file in sequential order. */
	MultiCurveCoverage?: AbstractDiscreteCoverageType;
	/** In a gmlcov:MultiPointCoverage the domain set is a gml:MultiPoint, that is a collection of arbitrarily distributed geometric points.
	  * The content model is identical with gmlcov:AbstractDiscreteCoverageType, but that gml:domainSet shall have values gml:MultiPoint.
	  * In a gmlcov:MultiPointCoverage the mapping from the domain to the range is straightforward.
	  * -    For gml:DataBlock encodings the points of the gmlcov:MultiPoint are mapped in document order to the tuples of the data block.
	  * -    For gml:CompositeValue encodings the points of the gmlcov:MultiPoint are mapped to the members of the composite value in document order.
	  * -    For gml:File encodings the points of the gmlcov:MultiPoint are mapped to the records of the file in sequential order. */
	MultiPointCoverage?: AbstractDiscreteCoverageType;
	/** In a gmlcov:MultiSolidCoverage the domain is partitioned into a collection of solids comprising a gml:MultiSolid.  The coverage function than maps each solid in the collection to a value in the range set.
	  * The content model is identical with gmlcov:AbstractDiscreteCoverageType, but that gml:domainSet shall have values gml:MultiSolid.
	  * In a gmlcov:MultiSolidCoverage the mapping from the domain to the range is straightforward.
	  * -    For gml:DataBlock encodings the solids of the gmlcov:MultiSolid are mapped in document order to the tuples of the data block.
	  * -    For gml:CompositeValue encodings the solids of the gmlcov:MultiSolid are mapped to the members of the composite value in document order.
	  * -    For gml:File encodings the solids of the gmlcov:MultiSolid are mapped to the records of the file in sequential order. */
	MultiSolidCoverage?: AbstractDiscreteCoverageType;
	/** In a gmlcov:MultiSurfaceCoverage the domain is partioned into a collection of surfaces comprising a gml:MultiSurface.  The coverage function than maps each surface in the collection to a value in the range set.
	  * The content model is identical with gmlcov:AbstractDiscreteCoverageType, but that gml:domainSet shall have values gml:MultiSurface.
	  * In a gmlcov:MultiSurfaceCoverage the mapping from the domain to the range is straightforward.
	  * -    For gml:DataBlock encodings the surfaces of the gmlcov:MultiSurface are mapped in document order to the tuples of the data block.
	  * -    For gml:CompositeValue encodings the surfaces of the gmlcov:MultiSurface are mapped to the members of the composite value in document order.
	  * -    For gml:File encodings the surfaces of the gmlcov:MultiSurface are mapped to the records of the file in sequential order. */
	MultiSurfaceCoverage?: AbstractDiscreteCoverageType;
}
interface AbstractDiscreteCoverageProxyType extends _AbstractDiscreteCoverageProxyType { constructor: { new(): AbstractDiscreteCoverageProxyType }; }

/** This parallels gml:DiscreteCoverageType, except that the gml:coverageFunction element has been moved "up" into gmlcov:AbstractCoverageType. Its name has been adjusted following the rule defined in GML 3.2.1 Subclause F.2.1.2.2. */
interface _AbstractDiscreteCoverageType extends _AbstractCoverageType {}
export interface AbstractDiscreteCoverageType extends _AbstractDiscreteCoverageType { constructor: { new(): AbstractDiscreteCoverageType }; }
export var AbstractDiscreteCoverageType: { new(): AbstractDiscreteCoverageType };

interface _AbstractReferenceableGridProxyType extends BaseType {}
interface AbstractReferenceableGridProxyType extends _AbstractReferenceableGridProxyType { constructor: { new(): AbstractReferenceableGridProxyType }; }

interface _AbstractReferenceableGridType extends gml._GridType {}
export interface AbstractReferenceableGridType extends _AbstractReferenceableGridType { constructor: { new(): AbstractReferenceableGridType }; }
export var AbstractReferenceableGridType: { new(): AbstractReferenceableGridType };

interface _ExtensionType extends BaseType {}
export interface ExtensionType extends _ExtensionType { constructor: { new(): ExtensionType }; }
export var ExtensionType: { new(): ExtensionType };

interface _MetadataType extends gml._AbstractMetadataPropertyType {
	nilReason: string;
	remoteSchema: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	/** Extension element used to hook in additional content e.g. in extensions or application profiles. */
	Extension?: ExtensionType;
}
export interface MetadataType extends _MetadataType { constructor: { new(): MetadataType }; }
export var MetadataType: { new(): MetadataType };

interface _ParameterValueType extends gml._AbstractGeneralParameterValueType, gml._OperationParameterProxyType {
	/** gml:booleanValue is a boolean value of an operation parameter. A Boolean value does not have an associated unit of measure. */
	booleanValue: boolean;
	dmsAngleValue: gml.DMSAngleType;
	/** A geometry used as a coordinate operation parameter value, which contains any type of geometry element, with a reference to its associated coordinate reference system. This element and its type are copied from  Change Request 09-091r1, which adds them to GML 3.2.1. */
	geometryValue: gml.GeometryPropertyType;
	/** gml:integerValue is a positive integer value of an operation parameter, usually used for a count. An integer value does not have an associated unit of measure. */
	integerValue: number;
	/** gml:integerValueList is an ordered sequence of two or more integer values of an operation parameter list, usually used for counts. These integer values do not have an associated unit of measure. An element of this type contains a space-separated sequence of integer values. */
	integerValueList: gml.integerList;
	/** gml:stringValue is a character string value of an operation parameter. A string value does not have an associated unit of measure. */
	stringValue: string;
	/** gml:value is a numeric value of an operation parameter, with its associated unit of measure. */
	value: gml.MeasureType;
	/** gml:valueFile is a reference to a file or a part of a file containing one or more parameter values, each numeric value with its associated unit of measure. When referencing a part of a file, that file shall contain multiple identified parts, such as an XML encoded document. Furthermore, the referenced file or part of a file may reference another part of the same or different files, as allowed in XML documents. */
	valueFile: string;
	/** gml:valueList is an ordered sequence of two or more numeric values of an operation parameter list, where each value has the same associated unit of measure. An element of this type contains a space-separated sequence of double values. */
	valueList: gml.MeasureListType;
	/** Vector value of a coordinate operation parameter. A vectorValue can represent a distance in a direction (when the magnitude of the vector is significant) or just a direction (when the magnitude of the vector is not considered significant). This vectorValue shall use the coordinate axes directions and units of the coordinate system in the referenced coordinate reference system. This coordinate reference system will often be the same as referenced by an associated geometryValue coordinate operation parameter. */
	vectorValue: gml.VectorType;
}
export interface ParameterValueType extends _ParameterValueType { constructor: { new(): ParameterValueType }; }
export var ParameterValueType: { new(): ParameterValueType };

interface _ReferenceableGridPropertyType extends _AbstractReferenceableGridProxyType {
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
export interface ReferenceableGridPropertyType extends _ReferenceableGridPropertyType { constructor: { new(): ReferenceableGridPropertyType }; }
export var ReferenceableGridPropertyType: { new(): ReferenceableGridPropertyType };

interface _SimpleMultiPointType extends gml._AbstractGeometricAggregateType {
	positions: gml.DirectPositionListType;
}
export interface SimpleMultiPointType extends _SimpleMultiPointType { constructor: { new(): SimpleMultiPointType }; }
export var SimpleMultiPointType: { new(): SimpleMultiPointType };

export interface document extends BaseType {
	/** Extension element used to hook in additional content e.g. in extensions or application profiles. */
	Extension: ExtensionType;
	/** A geometry used as a coordinate operation parameter value, which contains any type of geometry element, with a reference to its associated coordinate reference system. This element and its type are copied from  Change Request 09-091r1, which adds them to GML 3.2.1. */
	geometryValue: gml.GeometryPropertyType;
	/** A GridCoverage is a discrete point coverage in which the domain is a geometric grid of points encoded using gml:Grid (not its subtypes gml:RectifiedGrid or a subtype of AbstractReferenceableGrid). Note that this is similar to the MultiPointCoverage except that a gml:Grid shall be used to describe the domain.
	  * In order to address ambiguities in the gml:Grid definition, this GML Application Schema for Coverages imposes additional constraints on the use of a gml:Grid within a gmlcov:GridCoverage. (Specifically, there is no provision in the definition of gml:Grid definition to express the relationship between the grid positions and this geometry's coordinate reference system, which will always exist in some contexts, such as a Web Coverage Service. This coordinate reference system will be explicitly referenced in the srsName attribute of the gml:SRSReferenceGroup of gml:Grid, or be inherited from an enclosing container element, such as the gml:Envelope of this gmlcov:GridCoverage.) Since provision for expressing a relationship does not exist, whenever used in gmlcov:GridCoverage, the relationship shall be simple. In this simple relationship, the dimension attribute of the gml:Grid shall be identical to the dimension of the geometry's coordinate system, the axes of the gml:Grid shall be identical to the axes of the geometry's coordinate system (which requires that the axisLabels be identical to those in the coordinate system definition), and the limits shall be treated as being expressed as coordinates in the geometry's coordinate reference system.
	  * Clearly these additional constraints are quite limiting, in that gridded datasets whose Reference points happen to exist exactly at integral coordinates of a spatial coordinate system at a spacing of exactly one in all coordinate dimensions are exceedingly rare, unless that coordinate system is part of a gml:ImageCRS. Nevertheless, the gmlcov:GridCoverage is available for such purposes.
	  * It is recommended that the more sensible provisions of the gmlcov:RectifiedGridCoverage or gmlcov:ReferenceableGridCoverage be utilized for all gridded datasets, since their domains can accommodate the simple provisions of the gmlcov:GridCoverage as well as more complex referencing situations. Since this GridCoverage uses the gmlcov:AbstractCoverageType, it can be used for both discrete and continuous coverages. */
	GridCoverage: AbstractDiscreteCoverageType;
	/** This is a hook for adding any further information to a coverage, such as domain-specific metadata. Recommended use is to use the XML extension mechanism, such as in a WCS extension or Application Profile, to define the desired metadata structure. */
	metadata: MetadataType;
	/** In a gmlcov:MultiCurveCoverage the domain is partioned into a collection of curves comprising a gml:MultiCurve.  The coverage function then maps each curve in the collection to a value in the range set.
	  * The content model is identical with gmlcov:AbstractDiscreteCoverageType, but that gml:domainSet shall have values gml:MultiCurve.
	  * In a gmlcov:MultiCurveCoverage the mapping from the domain to the range is straightforward.
	  * -    For gml:DataBlock encodings the curves of the gmlcov:MultiCurve are mapped in document order to the tuples of the data block.
	  * -    For gml:CompositeValue encodings the curves of the gmlcov:MultiCurve are mapped to the members of the composite value in document order.
	  * -    For gml:File encodings the curves of the gmlcov:MultiCurve are mapped to the records of the file in sequential order. */
	MultiCurveCoverage: AbstractDiscreteCoverageType;
	/** In a gmlcov:MultiPointCoverage the domain set is a gml:MultiPoint, that is a collection of arbitrarily distributed geometric points.
	  * The content model is identical with gmlcov:AbstractDiscreteCoverageType, but that gml:domainSet shall have values gml:MultiPoint.
	  * In a gmlcov:MultiPointCoverage the mapping from the domain to the range is straightforward.
	  * -    For gml:DataBlock encodings the points of the gmlcov:MultiPoint are mapped in document order to the tuples of the data block.
	  * -    For gml:CompositeValue encodings the points of the gmlcov:MultiPoint are mapped to the members of the composite value in document order.
	  * -    For gml:File encodings the points of the gmlcov:MultiPoint are mapped to the records of the file in sequential order. */
	MultiPointCoverage: AbstractDiscreteCoverageType;
	/** In a gmlcov:MultiSolidCoverage the domain is partitioned into a collection of solids comprising a gml:MultiSolid.  The coverage function than maps each solid in the collection to a value in the range set.
	  * The content model is identical with gmlcov:AbstractDiscreteCoverageType, but that gml:domainSet shall have values gml:MultiSolid.
	  * In a gmlcov:MultiSolidCoverage the mapping from the domain to the range is straightforward.
	  * -    For gml:DataBlock encodings the solids of the gmlcov:MultiSolid are mapped in document order to the tuples of the data block.
	  * -    For gml:CompositeValue encodings the solids of the gmlcov:MultiSolid are mapped to the members of the composite value in document order.
	  * -    For gml:File encodings the solids of the gmlcov:MultiSolid are mapped to the records of the file in sequential order. */
	MultiSolidCoverage: AbstractDiscreteCoverageType;
	/** In a gmlcov:MultiSurfaceCoverage the domain is partioned into a collection of surfaces comprising a gml:MultiSurface.  The coverage function than maps each surface in the collection to a value in the range set.
	  * The content model is identical with gmlcov:AbstractDiscreteCoverageType, but that gml:domainSet shall have values gml:MultiSurface.
	  * In a gmlcov:MultiSurfaceCoverage the mapping from the domain to the range is straightforward.
	  * -    For gml:DataBlock encodings the surfaces of the gmlcov:MultiSurface are mapped in document order to the tuples of the data block.
	  * -    For gml:CompositeValue encodings the surfaces of the gmlcov:MultiSurface are mapped to the members of the composite value in document order.
	  * -    For gml:File encodings the surfaces of the gmlcov:MultiSurface are mapped to the records of the file in sequential order. */
	MultiSurfaceCoverage: AbstractDiscreteCoverageType;
	/** Extends gml:ParameterValue to also allow values that are a gml:Geometry or a gml:vector. This element and its type are copied from  Change Request 09-091r1, which adds them to GML 3.2.1. */
	ParameterValue: ParameterValueType;
	/** The rangeType element describes the structure of a coverage's range values, introduced for coverage definitions used, e.g., by WCS 2.0. */
	rangeType: swe.DataRecordPropertyType;
	/** A RectifiedGridCoverage is a discrete point coverage based on a rectified grid. It is similar to the grid coverage except that the points of the grid are geometrically referenced. The rectified grid coverage has a domain that is a gml:RectifiedGrid geometry. Since this RectifiedGridCoverage uses the gmlcov:AbstractCoverageType, it can be used for both discrete and continuous coverages. */
	RectifiedGridCoverage: AbstractDiscreteCoverageType;
	/** A ReferenceableGridCoverage is an implementation of ISO 19123 CV_DiscreteGridPointCoverage for a CV_ReferenceableGrid domain. It is a coverage based on a referenceable grid and has a domain geometry that is in the substitution group of AbstractReferenceableGrid.The equivalent of this element is being added to GML 3.2.1 as 3.3 by approved Change Request 07-112r3.Since this ReferenceableGridCoverage uses the gmlcov:AbstractCoverageType, it can be used for both discrete and continuous coverages. */
	ReferenceableGridCoverage: AbstractDiscreteCoverageType;
	/** This element and its type are copied from approved Change Request 07-112r3, which adds them to GML 3.2.1. */
	referenceableGridProperty: ReferenceableGridPropertyType;
	/** gml:SimpleMultiPoint implements, and provides a simplified encoding for, ISO 19107 GM_MultiPoint (see ISO 19107:2003, 6.5.4). A gml:SimpleMultiPoint consists of a list of DirectPositions. */
	SimpleMultiPoint: SimpleMultiPointType;
	/** Vector value of a coordinate operation parameter. A vectorValue can represent a distance in a direction (when the magnitude of the vector is significant) or just a direction (when the magnitude of the vector is not considered significant). This vectorValue shall use the coordinate axes directions and units of the coordinate system in the referenced coordinate reference system. This coordinate reference system will often be the same as referenced by an associated geometryValue coordinate operation parameter. */
	vectorValue: gml.VectorType;
}
export var document: document;
