import * as Primitive from '../../xml-primitives';
import * as gml from '../gml/3.2';
import * as gmlcov from '../gmlcov/1.0';
import * as ows from '../ows/2.0';
import * as swe from '../swe/2.0';

// Source files:
// http://schemas.opengis.net/wcs/2.0/wcsAll.xsd
// http://schemas.opengis.net/wcs/2.0/wcsCommon.xsd
// http://schemas.opengis.net/wcs/2.0/wcsDescribeCoverage.xsd
// http://schemas.opengis.net/wcs/2.0/wcsGetCapabilities.xsd
// http://schemas.opengis.net/wcs/2.0/wcsGetCoverage.xsd


declare module '../gml/3.2' {
export interface _AbstractFeatureProxyType {
	/** Description of a coverage available from a WCS server. This description shall include sufficient information to allow all valid GetCoverage operation requests to be prepared by a WCS client. */
	CoverageDescription?: CoverageDescriptionType;
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
}
interface BaseType {
	_exists: boolean;
	_namespace: string;
}
interface _CapabilitiesType extends ows._CapabilitiesBaseType {
	/** This element redefines the OWS Common [OGC 06-121r9] Contents section with a CoverageSummary, in accordance with the rules for modification laid down there. In addition it allows WCS extensions or application profiles to extend its content. */
	Contents?: ContentsType;
	/** ServiceMetadata contains information describing the WCS service on hand. Extension elements allow WCS extension standards to define their individual extra service metadata. */
	ServiceMetadata?: ServiceMetadataType;
}
export interface CapabilitiesType extends _CapabilitiesType { constructor: { new(): CapabilitiesType }; }
export var CapabilitiesType: { new(): CapabilitiesType };

interface _ContentsType extends ows._ContentsBaseType {
	/** A CoverageSummary contains information essential for accessing a coverage served by a WCS. The CoverageId is the identifier used to address a particular coverage. The CoverageSubtype is the name of the root of this coverage when expressed in XML. */
	CoverageSummary?: CoverageSummaryType[];
	/** Extension element used to hook in additional content e.g. in extensions or application profiles. */
	Extension?: ExtensionType;
}
export interface ContentsType extends _ContentsType { constructor: { new(): ContentsType }; }
export var ContentsType: { new(): ContentsType };

interface _CoverageDescriptionsType extends BaseType {
	/** Description of a coverage available from a WCS server. This description shall include sufficient information to allow all valid GetCoverage operation requests to be prepared by a WCS client. */
	CoverageDescription?: CoverageDescriptionType[];
}
export interface CoverageDescriptionsType extends _CoverageDescriptionsType { constructor: { new(): CoverageDescriptionsType }; }
export var CoverageDescriptionsType: { new(): CoverageDescriptionsType };

interface _CoverageDescriptionType extends gml._AbstractFeatureType, gml._DomainSetProxyType {
	/** The gml:coverageFunction property describes the mapping function from the domain to the range of the coverage.
	  * The value of the CoverageFunction is one of gml:CoverageMappingRule and gml:GridFunction.
	  * If the gml:coverageFunction property is omitted for a gridded coverage (including rectified gridded coverages) the gml:startPoint is assumed to be the value of the gml:low property in the gml:Grid geometry, and the gml:sequenceRule is assumed to be linear and the gml:axisOrder property is assumed to be "+1 +2". */
	coverageFunction?: gml.CoverageFunctionType;
	/** This element represents coverage identifiers. It uses the same type as gml:id to allow for identifier values to be used in both contexts. */
	CoverageId: string;
	/** This is a hook for adding any further information to a coverage, such as domain-specific metadata. Recommended use is to use the XML extension mechanism, such as in a WCS extension or Application Profile, to define the desired metadata structure. */
	metadata?: gmlcov.MetadataType[];
	/** The rangeType element describes the structure of a coverage's range values, introduced for coverage definitions used, e.g., by WCS 2.0. */
	rangeType: swe.DataRecordPropertyType;
	/** ServiceParameters further define how the corresponding coverage is accessible. CoverageSubtype helps identifying the type of coverage on hand, in particular with respect to the potential size of its domainSet and rangeSet components. Extension elements allow WCS extensions to plug in their particular coverage-specific service information. */
	ServiceParameters: ServiceParametersType;
}
export interface CoverageDescriptionType extends _CoverageDescriptionType { constructor: { new(): CoverageDescriptionType }; }
export var CoverageDescriptionType: { new(): CoverageDescriptionType };

interface _CoverageOfferingsType extends BaseType {
	/** An OfferedCoverage is the information set about a specific coverage offered by the WCS service on hand. It consists of a coverage, as defined in the GML Application Schema for Coverages [OGC 09-146r2] and coverage specific service parameters. Like CoverageOfferings, an OfferedCoverage element is never delivered to the client, but defines the response of coverage access requests. */
	OfferedCoverage?: OfferedCoverageType[];
	/** ServiceMetadata contains information describing the WCS service on hand. Extension elements allow WCS extension standards to define their individual extra service metadata. */
	ServiceMetadata: ServiceMetadataType;
}
export interface CoverageOfferingsType extends _CoverageOfferingsType { constructor: { new(): CoverageOfferingsType }; }
export var CoverageOfferingsType: { new(): CoverageOfferingsType };

interface _CoverageSubtypeParentType extends BaseType {
	/** CoverageSubtype characterizes the type of a coverage. This element shall contain the name of the XML root element that would be delivered if a GML encoded result were requested from the GetCoverage operation. The content model of the named element shall be described by a schema that is either normatively referenced by the WCS core specification or by a requirement in a WCS extension, the associated conformance class for which has been included in the ows:Profiles of the server's GetCapabilities response.
	  * This CoverageSubtype is delivered in GetCapabilities and DescribeCoverage to allow clients an estimation of the amount of data to be expected in the domain and range set. For example, a GridCoverage has a small domain set structure, but typically a large range set; a MultiSolidCoverage, on the other hand, tends to have large domain sets and small range sets. */
	CoverageSubtype: string;
	CoverageSubtypeParent?: CoverageSubtypeParentType;
}
export interface CoverageSubtypeParentType extends _CoverageSubtypeParentType { constructor: { new(): CoverageSubtypeParentType }; }
export var CoverageSubtypeParentType: { new(): CoverageSubtypeParentType };

interface _CoverageSummaryType extends ows._DescriptionType {
	BoundingBox?: ows.BoundingBoxProxyType[];
	/** This element represents coverage identifiers. It uses the same type as gml:id to allow for identifier values to be used in both contexts. */
	CoverageId: string;
	/** CoverageSubtype characterizes the type of a coverage. This element shall contain the name of the XML root element that would be delivered if a GML encoded result were requested from the GetCoverage operation. The content model of the named element shall be described by a schema that is either normatively referenced by the WCS core specification or by a requirement in a WCS extension, the associated conformance class for which has been included in the ows:Profiles of the server's GetCapabilities response.
	  * This CoverageSubtype is delivered in GetCapabilities and DescribeCoverage to allow clients an estimation of the amount of data to be expected in the domain and range set. For example, a GridCoverage has a small domain set structure, but typically a large range set; a MultiSolidCoverage, on the other hand, tends to have large domain sets and small range sets. */
	CoverageSubtype: string;
	CoverageSubtypeParent?: CoverageSubtypeParentType;
	Metadata?: ows.MetadataProxyType[];
	WGS84BoundingBox?: ows.WGS84BoundingBoxType[];
}
export interface CoverageSummaryType extends _CoverageSummaryType { constructor: { new(): CoverageSummaryType }; }
export var CoverageSummaryType: { new(): CoverageSummaryType };

interface _DescribeCoverageType extends _RequestBaseType {
	/** This element represents coverage identifiers. It uses the same type as gml:id to allow for identifier values to be used in both contexts. */
	CoverageId: string[];
}
export interface DescribeCoverageType extends _DescribeCoverageType { constructor: { new(): DescribeCoverageType }; }
export var DescribeCoverageType: { new(): DescribeCoverageType };

interface _DimensionSliceType extends _DimensionSubsetType {
	SlicePoint: string;
}
export interface DimensionSliceType extends _DimensionSliceType { constructor: { new(): DimensionSliceType }; }
export var DimensionSliceType: { new(): DimensionSliceType };

interface _DimensionSubsetProxyType extends BaseType {
	/** Describes the slicing of a coverage's domain axis at a particular point. */
	DimensionSlice?: DimensionSliceType;
	/** Describes the trimming of a coverage's domain axis, between two values. */
	DimensionTrim?: DimensionTrimType;
}
interface DimensionSubsetProxyType extends _DimensionSubsetProxyType { constructor: { new(): DimensionSubsetProxyType }; }

interface _DimensionSubsetType extends BaseType {
	Dimension: string;
}
export interface DimensionSubsetType extends _DimensionSubsetType { constructor: { new(): DimensionSubsetType }; }
export var DimensionSubsetType: { new(): DimensionSubsetType };

interface _DimensionTrimType extends _DimensionSubsetType {
	TrimHigh?: string;
	TrimLow?: string;
}
export interface DimensionTrimType extends _DimensionTrimType { constructor: { new(): DimensionTrimType }; }
export var DimensionTrimType: { new(): DimensionTrimType };

interface _ExtensionType extends BaseType {}
export interface ExtensionType extends _ExtensionType { constructor: { new(): ExtensionType }; }
export var ExtensionType: { new(): ExtensionType };

interface _GetCapabilitiesType extends ows._GetCapabilitiesType {
	service: string;
}
export interface GetCapabilitiesType extends _GetCapabilitiesType { constructor: { new(): GetCapabilitiesType }; }
export var GetCapabilitiesType: { new(): GetCapabilitiesType };

interface _GetCoverageType extends _RequestBaseType {
	/** This element represents coverage identifiers. It uses the same type as gml:id to allow for identifier values to be used in both contexts. */
	CoverageId: string;
	/** Definition of the desired subset of the domain of the coverage. This is either a Trim operation, or a Slice operation. */
	DimensionSubset?: DimensionSubsetProxyType[];
	/** MimeType of the format the resulting coverage shall be encoded in. Dafault is the coverage's native format. Type is anyURI because of the type of the element "mimeType" in "gml:FileType". */
	format?: string;
	/** Optional element indicating the MimeType of the response of a GetCoverage request. Only currently allowed valued is "multipart/related". */
	mediaType?: string;
}
export interface GetCoverageType extends _GetCoverageType { constructor: { new(): GetCoverageType }; }
export var GetCoverageType: { new(): GetCoverageType };

interface _OfferedCoverageType extends gmlcov._AbstractCoverageProxyType {
	/** ServiceParameters further define how the corresponding coverage is accessible. CoverageSubtype helps identifying the type of coverage on hand, in particular with respect to the potential size of its domainSet and rangeSet components. Extension elements allow WCS extensions to plug in their particular coverage-specific service information. */
	ServiceParameters: ServiceParametersType;
}
export interface OfferedCoverageType extends _OfferedCoverageType { constructor: { new(): OfferedCoverageType }; }
export var OfferedCoverageType: { new(): OfferedCoverageType };

/** XML encoded WCS operation request base, for all operations except GetCapabilities. In this XML encoding, no "request" parameter is included, since the element name specifies the specific operation. 'Extension' elements allow WCS extension standards to define their individual extra request parameters. */
interface _RequestBaseType extends BaseType {
	/** Service type identifier, where the value is the OWS type abbreviation. For WCS operation requests, the value is "WCS". */
	service: string;
	/** Specification version for WCS version and operation. See Version parameter Subclause 7.3.1 of OWS Common for more information. */
	version: string;
	/** Extension element used to hook in additional content e.g. in extensions or application profiles. */
	Extension?: ExtensionType;
}
export interface RequestBaseType extends _RequestBaseType { constructor: { new(): RequestBaseType }; }
export var RequestBaseType: { new(): RequestBaseType };

interface _ServiceMetadataType extends BaseType {
	/** Extension element used to hook in additional content e.g. in extensions or application profiles. */
	Extension?: ExtensionType;
	formatSupported: string[];
}
export interface ServiceMetadataType extends _ServiceMetadataType { constructor: { new(): ServiceMetadataType }; }
export var ServiceMetadataType: { new(): ServiceMetadataType };

interface _ServiceParametersType extends BaseType {
	/** CoverageSubtype characterizes the type of a coverage. This element shall contain the name of the XML root element that would be delivered if a GML encoded result were requested from the GetCoverage operation. The content model of the named element shall be described by a schema that is either normatively referenced by the WCS core specification or by a requirement in a WCS extension, the associated conformance class for which has been included in the ows:Profiles of the server's GetCapabilities response.
	  * This CoverageSubtype is delivered in GetCapabilities and DescribeCoverage to allow clients an estimation of the amount of data to be expected in the domain and range set. For example, a GridCoverage has a small domain set structure, but typically a large range set; a MultiSolidCoverage, on the other hand, tends to have large domain sets and small range sets. */
	CoverageSubtype: string;
	CoverageSubtypeParent?: CoverageSubtypeParentType;
	/** Extension element used to hook in additional content e.g. in extensions or application profiles. */
	Extension?: ExtensionType;
	nativeFormat: string;
}
export interface ServiceParametersType extends _ServiceParametersType { constructor: { new(): ServiceParametersType }; }
export var ServiceParametersType: { new(): ServiceParametersType };

export type VersionStringType = string;
type _VersionStringType = Primitive._string;

export interface document extends BaseType {
	/** XML encoded WCS GetCapabilities operation response. The Capabilities document provides clients with service metadata about a specific service instance, including metadata about the coverages served. If the server does not implement the updateSequence parameter, the server shall always return the Capabilities document, without the updateSequence parameter. When the server implements the updateSequence parameter and the GetCapabilities operation request included the updateSequence parameter with the current value, the server shall return this element with only the "version" and "updateSequence" attributes. Otherwise, all optional sections shall be included or not depending on the actual value of the Contents parameter in the GetCapabilities operation request. */
	Capabilities: CapabilitiesType;
	/** This element redefines the OWS Common [OGC 06-121r9] Contents section with a CoverageSummary, in accordance with the rules for modification laid down there. In addition it allows WCS extensions or application profiles to extend its content. */
	Contents: ContentsType;
	/** Description of a coverage available from a WCS server. This description shall include sufficient information to allow all valid GetCoverage operation requests to be prepared by a WCS client. */
	CoverageDescription: CoverageDescriptionType;
	/** Response from a WCS DescribeCoverage operation, containing one or more coverage descriptions. */
	CoverageDescriptions: CoverageDescriptionsType;
	/** This element represents coverage identifiers. It uses the same type as gml:id to allow for identifier values to be used in both contexts. */
	CoverageId: string;
	/** CoverageOfferings is the virtual document that a WCS offers. It consists of service metadata and a set of offered coverages. The CoverageOfferings element is never delivered to the client, however, responses of WCS requests are composed of constituents of the CoverageOfferings tree. Hence, CoverageOfferings serves to define responses. */
	CoverageOfferings: CoverageOfferingsType;
	/** CoverageSubtype characterizes the type of a coverage. This element shall contain the name of the XML root element that would be delivered if a GML encoded result were requested from the GetCoverage operation. The content model of the named element shall be described by a schema that is either normatively referenced by the WCS core specification or by a requirement in a WCS extension, the associated conformance class for which has been included in the ows:Profiles of the server's GetCapabilities response.
	  * This CoverageSubtype is delivered in GetCapabilities and DescribeCoverage to allow clients an estimation of the amount of data to be expected in the domain and range set. For example, a GridCoverage has a small domain set structure, but typically a large range set; a MultiSolidCoverage, on the other hand, tends to have large domain sets and small range sets. */
	CoverageSubtype: string;
	CoverageSubtypeParent: CoverageSubtypeParentType;
	/** A CoverageSummary contains information essential for accessing a coverage served by a WCS. The CoverageId is the identifier used to address a particular coverage. The CoverageSubtype is the name of the root of this coverage when expressed in XML. */
	CoverageSummary: CoverageSummaryType;
	/** Request to a WCS to perform the DescribeCoverage operation. This operation allows a client to retrieve descriptions of one or more coverages. In this XML encoding, no "request" parameter is included, since the element name specifies the specific operation. */
	DescribeCoverage: DescribeCoverageType;
	/** Describes the slicing of a coverage's domain axis at a particular point. */
	DimensionSlice: DimensionSliceType;
	/** Describes the trimming of a coverage's domain axis, between two values. */
	DimensionTrim: DimensionTrimType;
	/** Extension element used to hook in additional content e.g. in extensions or application profiles. */
	Extension: ExtensionType;
	/** Request to a WCS server to perform the GetCapabilities operation. This operation allows a client to retrieve a Capabilities XML document providing metadata for the specific WCS server. In this XML encoding, no "request" parameter is included, since the element name specifies the specific operation. */
	GetCapabilities: GetCapabilitiesType;
	/** Request to a WCS to perform the GetCoverage operation. This operation allows a client to retrieve a subset of one coverage. */
	GetCoverage: GetCoverageType;
	/** An OfferedCoverage is the information set about a specific coverage offered by the WCS service on hand. It consists of a coverage, as defined in the GML Application Schema for Coverages [OGC 09-146r2] and coverage specific service parameters. Like CoverageOfferings, an OfferedCoverage element is never delivered to the client, but defines the response of coverage access requests. */
	OfferedCoverage: OfferedCoverageType;
	/** ServiceMetadata contains information describing the WCS service on hand. Extension elements allow WCS extension standards to define their individual extra service metadata. */
	ServiceMetadata: ServiceMetadataType;
	/** ServiceParameters further define how the corresponding coverage is accessible. CoverageSubtype helps identifying the type of coverage on hand, in particular with respect to the potential size of its domainSet and rangeSet components. Extension elements allow WCS extensions to plug in their particular coverage-specific service information. */
	ServiceParameters: ServiceParametersType;
}
export var document: document;
