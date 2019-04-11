import * as Primitive from '../../xml-primitives';
import * as gml from '../gml';
import * as owcs from './1.1/ows';
import * as ows from '../ows';
import * as xlink from '../../www.w3.org/1999/xlink';

// Source files:
// http://schemas.opengis.net/wcs/1.1.0/wcsAll.xsd
// http://schemas.opengis.net/wcs/1.1.0/wcsCommon.xsd
// http://schemas.opengis.net/wcs/1.1.0/wcsContents.xsd
// http://schemas.opengis.net/wcs/1.1.0/wcsDescribeCoverage.xsd
// http://schemas.opengis.net/wcs/1.1.0/wcsGetCapabilities.xsd
// http://schemas.opengis.net/wcs/1.1.0/wcsGetCoverage.xsd
// http://schemas.opengis.net/wcs/1.1.0/wcsGridCRS.xsd


interface BaseType {
	_exists: boolean;
	_namespace: string;
}
interface _AvailableKeysType extends BaseType {
	/** Valid key value for this axis. There will normally be more than one key value for an axis, but one is allowed for special circumstances. */
	Key: string[];
}
interface AvailableKeysType extends _AvailableKeysType { constructor: { new(): AvailableKeysType }; }

interface _AxisSubsetType extends BaseType {
	Identifier: string;
	/** Unordered list of (at least one) Key, to be used for selecting values in a range vector field. The Keys within this list shall be unique. TBD. */
	Key: string[];
}
interface AxisSubsetType extends _AxisSubsetType { constructor: { new(): AxisSubsetType }; }

/** Definition of one axis in a field for which there are a vector of values. This type is largely a subset of the ows:DomainType as needed for a range field axis. */
interface _AxisType extends owcs._DescriptionType {
	/** Name or identifier of this axis. */
	identifier: string;
	/** List of all the available (valid) key values for this axis. For numeric keys, signed values should be ordered from negative infinity to positive infinity. */
	AvailableKeys: AvailableKeysType;
	/** Reference to the data type of this value or set of values. In this case, the '"reference" attribute can reference a URN for a well-known data type. For example, such a URN could be a data type identification URN defined in the "ogc" URN namespace. */
	DataType?: owcs.DomainMetadataType;
	/** Reference to the meaning or semantics of this value or set of values. */
	Meaning?: owcs.DomainMetadataType;
	Metadata?: ows.MetadataType[];
	/** Reference to the reference system used by this set of values, including the unit of measure whenever applicable (as is normal). In this case, the '"reference" attribute can reference a URN for a well-known reference system, such as for a coordinate reference system (CRS). For example, such a URN could be a CRS identification URN defined in the "ogc" URN namespace. */
	ReferenceSystem?: owcs.DomainMetadataType;
	/** Reference to the unit of measure of this value or set of values. In this case, the '"reference" attribute can reference a URN for a well-known unit of measure (uom). For example, such a URN could be a UOM identification URN defined in the "ogc" URN namespace. */
	UOM?: owcs.DomainMetadataType;
}
export interface AxisType extends _AxisType { constructor: { new(): AxisType }; }
export var AxisType: { new(): AxisType };

interface _CapabilitiesType extends owcs._CapabilitiesBaseType {
	/** Contents section of WCS service metadata (or Capabilities) XML document. For the WCS, these contents are brief metadata about the coverages available from this server, or a reference to another source from which this metadata is available. */
	Contents?: ContentsType;
}
interface CapabilitiesType extends _CapabilitiesType { constructor: { new(): CapabilitiesType }; }

interface _ContentsType extends BaseType {
	CoverageSummary?: CoverageSummaryType[];
	/** Unordered list of references to other sources of coverage metadata. This list shall be included unless one or more CoverageSummaries are included. */
	OtherSource?: ows.OnlineResourceType[];
	/** Unordered list of references to coordinate reference systems in which GetCoverage operation requests and responses may be expressed. This list of SupportedCRSs shall be the union of all of the supported CRSs in all of the nested CoverageSummaries. Servers should include this list since it reduces the work clients need to do to determine that they can interoperate with the server. There may be a dependency of SupportedCRS on SupportedFormat, as described in Subclause 10.3.5. */
	SupportedCRS?: string[];
	/** Unordered list of identifiers of formats in which GetCoverage operation response may be encoded. This list of SupportedFormats shall be the union of all of the supported formats in all of the nested CoverageSummaries. Servers should include this list since it reduces the work clients need to do to determine that they can interoperate with the server. There may be a dependency of SupportedCRS on SupportedFormat, as described in clause 10.3.5. */
	SupportedFormat?: string[];
}
interface ContentsType extends _ContentsType { constructor: { new(): ContentsType }; }

interface _CoverageDescriptionsType extends BaseType {
	CoverageDescription: CoverageDescriptionType[];
}
interface CoverageDescriptionsType extends _CoverageDescriptionsType { constructor: { new(): CoverageDescriptionsType }; }

/** Full description of one coverage available from a WCS server. This description shall include sufficient information to allow all valid GetCoverage operation requests to be prepared by a WCS client. */
interface _CoverageDescriptionType extends owcs._DescriptionType {
	Domain: CoverageDomainType;
	Identifier: string;
	Metadata?: ows.MetadataType[];
	Range: RangeType;
	/** Unordered list of references to all the coordinate reference systems in which GetCoverage operation requests and responses can be encoded for this coverage. */
	SupportedCRS: string[];
	/** Unordered list of identifiers of all the formats in which GetCoverage operation responses can be encoded for this coverage. */
	SupportedFormat: string[];
}
export interface CoverageDescriptionType extends _CoverageDescriptionType { constructor: { new(): CoverageDescriptionType }; }
export var CoverageDescriptionType: { new(): CoverageDescriptionType };

/** Definition of the spatial-temporal domain of a coverage. The Domain shall include a SpatialDomain (describing the spatial locations for which coverages can be requested), and should included a TemporalDomain (describing the time instants or intervals for which coverages can be requested). */
interface _CoverageDomainType extends BaseType {
	SpatialDomain: SpatialDomainType;
	/** Definition of the temporal domain of a coverage, the times for which valid data are available. The times should to be ordered from the oldest to the newest. */
	TemporalDomain?: TimeSequenceType;
}
export interface CoverageDomainType extends _CoverageDomainType { constructor: { new(): CoverageDomainType }; }
export var CoverageDomainType: { new(): CoverageDomainType };

/** Brief metadata describing one or more coverages available from this WCS server. */
interface _CoverageSummaryType extends owcs._DescriptionType {
	CoverageSummary: CoverageSummaryType[];
	Identifier: string[];
	Metadata?: ows.MetadataType[];
	/** Unordered list of references to CRSs in which GetCoverage operation requests and responses may be expressed. These CRSs shall also apply to all lower-level CoverageSummaries under this CoverageSummary, in addition to any other CRSs referenced. */
	SupportedCRS?: string[];
	/** Unordered list of identifiers of formats in which GetCoverage operation responses may be encoded. These formats shall also apply to all lower-level CoverageSummaries under this CoverageSummary, in addition to any other formats identified. */
	SupportedFormat?: string[];
	WGS84BoundingBox?: ows.WGS84BoundingBoxType[];
}
export interface CoverageSummaryType extends _CoverageSummaryType { constructor: { new(): CoverageSummaryType }; }
export var CoverageSummaryType: { new(): CoverageSummaryType };

interface _DescribeCoverageType extends _RequestBaseType {
	Identifier: string[];
}
interface DescribeCoverageType extends _DescribeCoverageType { constructor: { new(): DescribeCoverageType }; }

/** Definition of the desired subset of the domain of the coverage. Contains a spatial BoundingBox and optionally a TemporalSubset. */
interface _DomainSubsetType extends ows._BoundingBoxProxyType {
	/** Definition of subset of coverage temporal domain. */
	TemporalSubset?: TimeSequenceType;
}
export interface DomainSubsetType extends _DomainSubsetType { constructor: { new(): DomainSubsetType }; }
export var DomainSubsetType: { new(): DomainSubsetType };

/** Description of an individual field in a coverage range record. */
interface _FieldType extends owcs._DescriptionType {
	/** Unordered list of the axes in a vector field for which there are Field values. This list shall be included when this Field has a vector of values. Notice that the axes can be listed here in any order; however, the axis order listed here shall be used in the KVP encoding of a GetCoverage operation request (TBR). */
	Axis?: AxisType[];
	/** Further definition of this field, including meaning, units, etc. In this Definition, the AllowedValues should be used to encode the extent of possible values for this field, excluding the Null Value. If the range is not known, AnyValue should be used. */
	Definition: owcs.UnNamedDomainType;
	Identifier: string;
	/** Interpolation method(s) that can be used when continuous grid coverage resampling is needed. */
	InterpolationMethods: owcs.InterpolationMethodsType;
	/** Unordered list of the values used when valid Field values are not available for whatever reason. The coverage encoding itself may specify a fixed value for null (e.g. “–99999” or “N/A”), but often the choice is up to the provider and must be communicated to the client outside the coverage itself. Each null value shall be encoded as a string. The optional codeSpace attribute can reference a definition of the reason why this value is null. */
	NullValue?: ows.CodeType[];
}
export interface FieldType extends _FieldType { constructor: { new(): FieldType }; }
export var FieldType: { new(): FieldType };

interface _GetCapabilitiesType extends owcs._GetCapabilitiesType {
	service: string;
}
interface GetCapabilitiesType extends _GetCapabilitiesType { constructor: { new(): GetCapabilitiesType }; }

interface _GetCoverageType extends _RequestBaseType {
	DomainSubset: DomainSubsetType;
	/** Unique identifier or name of this dataset. */
	Identifier: ows.CodeType;
	Output: OutputType;
	/** Optional selection of a subset of the coverage's range. */
	RangeSubset?: RangeSubsetType;
}
interface GetCoverageType extends _GetCoverageType { constructor: { new(): GetCoverageType }; }

/** Definition of a coordinate reference system (CRS) for a quadrilateral grid that is defined in another CRS, where this grid is defined by its coordinate Conversion from the other CRS. This GridCRS is not a ProjectedCRS. However, like a ProjectedCRS, the coordinate system used is Cartesian. This GridCRS can use any type of baseCRS, including GeographicCRS, ProjectedCRS, ImageCRS, or a different GridCRS. This GridCRS is a simplification and specialization of a gml:DerivedCRS. All elements and attributes not required to define this GridCRS are optional. */
interface _GridCrsType extends BaseType {
	/** Database handle for the object.  It is of XML type ID, so is constrained to be unique in the XML document within which it occurs.  An external identifier for the object in the form of a URI may be constructed using standard XML and XPointer methods.  This is done by concatenating the URI for the document, a fragment separator, and the value of the id attribute. */
	id?: string;
	/** Association to the coordinate reference system (CRS) in which this Grid CRS is specified. A GridCRS can use any type of baseCRS, including GeographicCRS, ProjectedCRS, ImageCRS, or a different GridCRS. For a GridCRS, this association is limited to a remote definition of the baseCRS (not encoded in-line). */
	GridBaseCRS: string;
	/** Association to the (Cartesian) grid coordinate system used by this Grid CRS. In this use of a (Cartesian) grid coordinate system, the grid positions shall be in the centers of the image or other grid coverage values (not between the grid values), as specified in ISO 19123. Also, the grid point indices at the origin shall be 0, 0 (not 1,1), as specified in ISO 19123. For a GridCRS, this association is limited to a remote definition of the GridCS (not encoded in-line). */
	GridCS?: string;
	/** Two or more grid position offsets from the grid origin in the GridBaseCRS of this GridCRS. Example: For the grid2dIn2dCRs OperationMethod, this Offsets element shall contain four values, the first two values shall specify the grid offset for the first grid axis in the 2D base CRS, and the second pair of values shall specify the grid offset for the second grid axis. In this case, the middle two values are zero for un-rotated and un-skewed grids. */
	GridOffsets: gml.doubleList;
	/** Coordinates of the grid origin position in the GridBaseCRS of this GridCRS. This element is adapted from gml:pos. */
	GridOrigin?: gml.doubleList;
	/** Association to the OperationMethod used to define this Grid CRS. This association defaults to an association to the most commonly used method, which is referenced by the URN "urn:ogc:def:method:WCS:1.1:2dSimpleGrid". For a GridCRS, this association is limited to a remote definition of a grid definition Method (not encoded in-line) that encodes a variation on the method implied by the CV_RectifiedGrid class in ISO 19123, without the inheritance from CV_Grid. */
	GridType?: string;
	/** The name by which this reference system is identified. */
	srsName?: gml.CodeType;
}
export interface GridCrsType extends _GridCrsType { constructor: { new(): GridCrsType }; }
export var GridCrsType: { new(): GridCrsType };

/** Unambiguous identifier. Although there is no formal restriction on characters included, these identifiers shall be directly usable in GetCoverage operation requests for the specific server, whether those requests are encoded in KVP or XML. Each of these encodings requires that certain characters be avoided, encoded, or escaped (TBR). */
export type IdentifierType = string;
type _IdentifierType = Primitive._string;

/** Association to an image coordinate reference system, either referencing or containing the definition of that reference system. */
interface _ImageCRSRefType extends BaseType {
	/** Reference to an XML Schema fragment that specifies the content model of the propertys value. This is in conformance with the XML Schema Section 4.14 Referencing Schemas from Elsewhere. */
	remoteSchema?: string;
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
	ImageCRS?: gml.ImageCRSType;
}
export interface ImageCRSRefType extends _ImageCRSRefType { constructor: { new(): ImageCRSRefType }; }
export var ImageCRSRefType: { new(): ImageCRSRefType };

/** Asks for the GetCoverage response to be expressed in a particular CRS and encoded in a particular format. Can also ask for the response coverage to be stored remotely from the client at a URL, instead of being returned in the operation response. */
interface _OutputType extends BaseType {
	/** Identifier of the format in which GetCoverage response shall be encoded. This identifier value shall be among those listed as SupportedFormats in the DescribeCoverage operation response. */
	format: string;
	/** Specifies if the output coverage should be stored, remotely from the client at a network URL, instead of being returned with the operation response. This parameter should be included only if this operation parameter is supported by server, as encoded in the OperationsMetadata section of the Capabilities document. */
	store?: boolean;
	GridCRS?: GridCrsType;
}
export interface OutputType extends _OutputType { constructor: { new(): OutputType }; }
export var OutputType: { new(): OutputType };

/** Selection of desired subset of the coverage's range fields, (optionally) the interpolation method applied to eachfield, and (optionally) field subsets. */
interface _RangeSubsetType extends BaseType {
	/** Unordered list of one or more desired subsets of range fields. TBD. */
	FieldSubset: RangeSubsetTypeFieldSubsetType[];
}
export interface RangeSubsetType extends _RangeSubsetType { constructor: { new(): RangeSubsetType }; }
export var RangeSubsetType: { new(): RangeSubsetType };

interface _RangeSubsetTypeFieldSubsetType extends BaseType {
	/** List of selected Keys for this axis, to be used for selecting values in a vector range field. TBD. */
	AxisSubset?: AxisSubsetType[];
	/** Unique identifier or name of this dataset. */
	Identifier: ows.CodeType;
	/** Optional identifier of the spatial interpolation type to be applied to this range field. This interpolation type shall be one that is identified for this Field in the CoverageDescription. When this parameter is omitted, the interpolation method used shall be the default method specified for this Field, if any. */
	InterpolationType?: string;
}
interface RangeSubsetTypeFieldSubsetType extends _RangeSubsetTypeFieldSubsetType { constructor: { new(): RangeSubsetTypeFieldSubsetType }; }

/** Defines the fields (categories, measures, or values) in the range records available for each location in the coverage domain. Each such field may be a scalar (numeric or text) value, such as population density, or a vector (compound or tensor) of many similar values, such as incomes by race, or radiances by wavelength. Each range field is typically an observable whose meaning and reference system are referenced by URIs. */
interface _RangeType extends BaseType {
	/** Unordered list of the Fields in the Range of a coverage. */
	Field: FieldType[];
}
export interface RangeType extends _RangeType { constructor: { new(): RangeType }; }
export var RangeType: { new(): RangeType };

/** XML encoded WCS operation request base, for all operations except GetCapabilities. In this XML encoding, no "request" parameter is included, since the element name specifies the specific operation. */
interface _RequestBaseType extends BaseType {
	/** Service type identifier, where the value is the OWS type abbreviation. For WCS operation requests, the value is "WCS". */
	service: string;
	/** Specification version for WCS version and operation. See Version parameter Subclause 7.3.1 of OWS Common for more information. */
	version: string;
}
export interface RequestBaseType extends _RequestBaseType { constructor: { new(): RequestBaseType }; }
export var RequestBaseType: { new(): RequestBaseType };

/** Definition of the spatial domain of a coverage. */
interface _SpatialDomainType extends BaseType {
	BoundingBox: ows.BoundingBoxProxyType[];
	GridCRS?: GridCrsType;
	/** Association to ImageCRS of the stored coverage. This ImageCRS shall be included when this coverage is an image. The ImageCRS for an image coverage is referenced to inform clients of the ImageCRS, for possible use in a GetCoverage operation request. The definition of this ImageCRS shall be included unless the association reference URI completely specifies that ImageCRS (such as by using the URL of the definition or using a suitable URN). */
	ImageCRS?: ImageCRSRefType;
	Polygon?: gml.PolygonType[];
	/** Georeferencing coordinate transformation for unrectified coverage, which should be included when available for a coverage that is georeferenced but not georectified. To support use cases 4, 5, 9, and/or 10 specified in Annex H, a WCS server needs to use a georeferencing coordinate transformation for a georeferenced but not georectified coverage. That georeferencing transformation can be specified as a Transformation, or a ConcatenatedOperation that includes at least one Transformation. However, a WCS server may not support those use cases, not use a georeferencing transformation specified in that manner, or not make that transformation available to clients. */
	Transformation?: gml.AbstractCoordinateOperationType;
}
export interface SpatialDomainType extends _SpatialDomainType { constructor: { new(): SpatialDomainType }; }
export var SpatialDomainType: { new(): SpatialDomainType };

/** Base type for describing temporal length or distance. The value space is further
  * constrained by subtypes that conform to the ISO 8601 or ISO 11404 standards. */
export type TimeDurationType = string;
type _TimeDurationType = Primitive._string;

/** This is a variation of the GML TimePeriod, which allows the beginning and end of a time-period to be expressed in short-form inline using the begin/endPosition element, which allows an identifiable TimeInstant to be defined simultaneously with using it, or by reference, using xlinks on the begin/end elements. (Arliss) What does this mean? What do the TimeResolution and "frame" mean? */
interface _TimePeriodType extends BaseType {
	frame?: string;
	BeginPosition: gml.TimePositionType;
	EndPosition: gml.TimePositionType;
	TimeResolution?: string;
}
export interface TimePeriodType extends _TimePeriodType { constructor: { new(): TimePeriodType }; }
export var TimePeriodType: { new(): TimePeriodType };

/** List of time positions and periods. The time positions and periods should be ordered from the oldest to the newest, but this is not required. */
interface _TimeSequenceType extends BaseType {
	TimePeriod: TimePeriodType[];
	/** Direct representation of a temporal position */
	timePosition: gml.TimePositionType[];
}
export interface TimeSequenceType extends _TimeSequenceType { constructor: { new(): TimeSequenceType }; }
export var TimeSequenceType: { new(): TimeSequenceType };

export interface document extends BaseType {
	/** List of all the available (valid) key values for this axis. For numeric keys, signed values should be ordered from negative infinity to positive infinity. */
	AvailableKeys: AvailableKeysType;
	/** List of selected Keys for this axis, to be used for selecting values in a vector range field. TBD. */
	AxisSubset: AxisSubsetType;
	/** XML encoded WCS GetCapabilities operation response. The Capabilities document provides clients with service metadata about a specific service instance, including metadata about the coverages served. If the server does not implement the updateSequence parameter, the server shall always return the Capabilities document, without the updateSequence parameter. When the server implements the updateSequence parameter and the GetCapabilities operation request included the updateSequence parameter with the current value, the server shall return this element with only the "version" and "updateSequence" attributes. Otherwise, all optional sections shall be included or not depending on the actual value of the Contents parameter in the GetCapabilities operation request. */
	Capabilities: CapabilitiesType;
	/** Contents section of WCS service metadata (or Capabilities) XML document. For the WCS, these contents are brief metadata about the coverages available from this server, or a reference to another source from which this metadata is available. */
	Contents: ContentsType;
	/** Response from a WCS DescribeCoverage operation, containing one or more coverage descriptions. */
	CoverageDescriptions: CoverageDescriptionsType;
	CoverageSummary: CoverageSummaryType;
	/** Request to a WCS to perform the DescribeCoverage operation. This operation allows a client to retrieve descriptions of one or more coverages. In this XML encoding, no "request" parameter is included, since the element name specifies the specific operation. */
	DescribeCoverage: DescribeCoverageType;
	/** Request to a WCS server to perform the GetCapabilities operation. This operation allows a client to retrieve a Capabilities XML document providing metadata for the specific WCS server. In this XML encoding, no "request" parameter is included, since the element name specifies the specific operation. */
	GetCapabilities: GetCapabilitiesType;
	/** Request to a WCS to perform the GetCoverage operation. This operation allows a client to retrieve a subset of one coverage. In this XML encoding, no "request" parameter is included, since the element name specifies the specific operation. */
	GetCoverage: GetCoverageType;
	/** Association to the coordinate reference system (CRS) in which this Grid CRS is specified. A GridCRS can use any type of baseCRS, including GeographicCRS, ProjectedCRS, ImageCRS, or a different GridCRS. For a GridCRS, this association is limited to a remote definition of the baseCRS (not encoded in-line). */
	GridBaseCRS: string;
	GridCRS: GridCrsType;
	/** Association to the (Cartesian) grid coordinate system used by this Grid CRS. In this use of a (Cartesian) grid coordinate system, the grid positions shall be in the centers of the image or other grid coverage values (not between the grid values), as specified in ISO 19123. Also, the grid point indices at the origin shall be 0, 0 (not 1,1), as specified in ISO 19123. For a GridCRS, this association is limited to a remote definition of the GridCS (not encoded in-line). */
	GridCS: string;
	/** Two or more grid position offsets from the grid origin in the GridBaseCRS of this GridCRS. Example: For the grid2dIn2dCRs OperationMethod, this Offsets element shall contain four values, the first two values shall specify the grid offset for the first grid axis in the 2D base CRS, and the second pair of values shall specify the grid offset for the second grid axis. In this case, the middle two values are zero for un-rotated and un-skewed grids. */
	GridOffsets: gml.doubleList;
	/** Coordinates of the grid origin position in the GridBaseCRS of this GridCRS. This element is adapted from gml:pos. */
	GridOrigin: gml.doubleList;
	/** Association to the OperationMethod used to define this Grid CRS. This association defaults to an association to the most commonly used method, which is referenced by the URN "urn:ogc:def:method:WCS:1.1:2dSimpleGrid". For a GridCRS, this association is limited to a remote definition of a grid definition Method (not encoded in-line) that encodes a variation on the method implied by the CV_RectifiedGrid class in ISO 19123, without the inheritance from CV_Grid. */
	GridType: string;
	Identifier: string;
	/** Definition of the temporal domain of a coverage, the times for which valid data are available. The times should to be ordered from the oldest to the newest. */
	TemporalDomain: TimeSequenceType;
	/** Definition of subset of coverage temporal domain. */
	TemporalSubset: TimeSequenceType;
}
export var document: document;
