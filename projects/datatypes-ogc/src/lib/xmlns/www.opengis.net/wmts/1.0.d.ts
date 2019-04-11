import * as Primitive from '../../xml-primitives';
import * as gml from '../gml';
import * as ows from '../ows/1.1';

// Source files:
// http://schemas.opengis.net/wmts/1.0/wmts.xsd
// http://schemas.opengis.net/wmts/1.0/wmtsGetCapabilities_request.xsd
// http://schemas.opengis.net/wmts/1.0/wmtsGetCapabilities_response.xsd
// http://schemas.opengis.net/wmts/1.0/wmtsGetFeatureInfo_request.xsd
// http://schemas.opengis.net/wmts/1.0/wmtsGetFeatureInfo_response.xsd
// http://schemas.opengis.net/wmts/1.0/wmtsGetTile_request.xsd
// http://schemas.opengis.net/wmts/1.0/wmtsKVP.xsd
// http://schemas.opengis.net/wmts/1.0/wmtsPayload_response.xsd


declare module '../ows/1.1' {
export interface _DatasetDescriptionSummaryProxyType {
	Layer?: LayerType;
}
}
interface BaseType {
	_exists: boolean;
	_namespace: string;
}
/** Comma separated list of a standard MIME type,
  * possibly a parameterized MIME type. */
export type AcceptedFormatsType = string;
type _AcceptedFormatsType = Primitive._string;

interface _BinaryPayloadType extends BaseType {
	/** Binary content encoded in base64. It could be useful to
	  * enclose it in a CDATA element to avoid XML parsing. */
	BinaryContent: string;
	/** MIMEType format of the PayloadContent
	  * once base64 decodified. */
	Format: string;
}
interface BinaryPayloadType extends _BinaryPayloadType { constructor: { new(): BinaryPayloadType }; }

interface _CapabilitiesType extends ows._CapabilitiesBaseType {
	/** Metadata about the data served by this server.
	  * For WMTS, this section SHALL contain data about layers and
	  * TileMatrixSets */
	Contents?: ContentsType;
	/** Reference to a ServiceMetadata resource on resource
	  * oriented architectural style */
	ServiceMetadataURL?: ows.OnlineResourceType[];
	/** Provides a set of hierarchical themes that the
	  * client can use to categorize the layers by. */
	Themes?: ThemesType[];
	/** Reference to a WSDL resource */
	WSDL?: ows.OnlineResourceType[];
}
interface CapabilitiesType extends _CapabilitiesType { constructor: { new(): CapabilitiesType }; }

interface _ContentsType extends ows._ContentsBaseType {
	/** Describes a particular set of tile matrices. */
	TileMatrixSet?: TileMatrixSetType[];
}
export interface ContentsType extends _ContentsType { constructor: { new(): ContentsType }; }
export var ContentsType: { new(): ContentsType };

interface _DimensionNameValueType extends Primitive._string {
	/** Dimension name */
	name: string;
}
interface DimensionNameValueType extends _DimensionNameValueType { constructor: { new(): DimensionNameValueType }; }

interface _DimensionType extends ows._DescriptionType {
	/** A value of 1 (or 'true') indicates (a) that temporal data are
	  * normally kept current and (b) that the request value of this
	  * dimension accepts the keyword 'current'. */
	Current?: boolean;
	/** Default value that will be used if a tile request does
	  * not specify a value or uses the keyword 'default'. */
	Default?: string;
	/** Unique identifier or name of this dataset. */
	Identifier: ows.CodeType;
	/** Symbol of the units. */
	UnitSymbol?: string;
	/** Definition of the unit of measure of this set of values. In this case, the xlink:href attribute can reference a URN for a well-known unit of measure (uom). For example, such a URN could be a UOM identification URN defined in the "ogc" URN namespace. */
	UOM?: ows.DomainMetadataType;
	/** Available value for this dimension. */
	Value: string[];
}
interface DimensionType extends _DimensionType { constructor: { new(): DimensionType }; }

interface _FeatureInfoResponseType extends gml._FeatureCollectionProxyType {
	/** This allows to include any XML content that it is not any of
	  * the previous ones. */
	AnyContent: any;
	BinaryPayload: BinaryPayloadType;
	TextPayload: TextPayloadType;
}
interface FeatureInfoResponseType extends _FeatureInfoResponseType { constructor: { new(): FeatureInfoResponseType }; }

interface _GetCapabilitiesType extends ows._GetCapabilitiesType {
	service: string;
}
interface GetCapabilitiesType extends _GetCapabilitiesType { constructor: { new(): GetCapabilitiesType }; }

export type GetCapabilitiesValueType = "GetCapabilities";
interface _GetCapabilitiesValueType extends Primitive._string { content: GetCapabilitiesValueType; }

interface _GetFeatureInfoType extends BaseType {
	service: string;
	version: string;
	GetTile: GetTileType;
	/** Column index of a pixel in the tile */
	I: number;
	/** Output MIME type format of the
	  * retrieved information */
	InfoFormat: string;
	/** Row index of a pixel in the tile */
	J: number;
}
interface GetFeatureInfoType extends _GetFeatureInfoType { constructor: { new(): GetFeatureInfoType }; }

export type GetFeatureInfoValueType = "GetFeatureInfo";
interface _GetFeatureInfoValueType extends Primitive._string { content: GetFeatureInfoValueType; }

interface _GetTileType extends BaseType {
	service: string;
	version: string;
	DimensionNameValue?: DimensionNameValueType[];
	/** Output format of the tile */
	Format: string;
	/** A layer identifier has to be referenced */
	Layer: string;
	/** A style identifier has to be referenced. */
	Style: string;
	/** Column index of tile matrix */
	TileCol: number;
	/** A TileMatrix identifier has to be referenced */
	TileMatrix: string;
	/** A TileMatrixSet identifier has to be referenced */
	TileMatrixSet: string;
	/** Row index of tile matrix */
	TileRow: number;
}
interface GetTileType extends _GetTileType { constructor: { new(): GetTileType }; }

export type GetTileValueType = "GetTile";
interface _GetTileValueType extends Primitive._string { content: GetTileValueType; }

/** Resource type to be retrieved. The WMTS main standard only defines "tile" or "FeatureInfo" but others can be incorporated in the future. */
export type KnownResourceTypeCodeType = ("tile" | "FeatureInfo");
interface _KnownResourceTypeCodeType extends Primitive._string { content: KnownResourceTypeCodeType; }

interface _LayerType extends ows._DatasetDescriptionSummaryBaseType {
	/** Metadata about a particular dimension that the tiles of
	  * a layer are available. */
	Dimension?: DimensionType[];
	/** Supported valid output MIME types for a tile */
	Format: string[];
	/** Supported valid output MIME types for a FeatureInfo.
	  * If there isn't any, The server do not support FeatureInfo requests
	  * for this layer. */
	InfoFormat?: string[];
	/** URL template to a tile or a FeatureInfo resource on
	  * resource oriented architectural style */
	ResourceURL?: URLTemplateType[];
	Style: StyleType[];
	/** Metadata about the TileMatrixSet reference. */
	TileMatrixSetLink: TileMatrixSetLinkType[];
}
export interface LayerType extends _LayerType { constructor: { new(): LayerType }; }
export var LayerType: { new(): LayerType };

interface _LegendURLType extends ows._OnlineResourceType {
	/** A supported output format for the legend image */
	format: string;
	/** Height (in pixels) of the legend image */
	height: number;
	/** Denominator of the maximum scale (exclusive) for which this legend image is valid */
	maxScaleDenominator: number;
	/** Denominator of the minimum scale (inclusive) for which this legend image is valid */
	minScaleDenominator: number;
	/** Width (in pixels) of the legend image */
	width: number;
}
interface LegendURLType extends _LegendURLType { constructor: { new(): LegendURLType }; }

export type RequestServiceType = "WMTS";
interface _RequestServiceType extends Primitive._string { content: RequestServiceType; }

export type ResourceTypeCodeType = string;
type _ResourceTypeCodeType = Primitive._string;

/** XML encoded identifier comma separated list of a standard
  * MIME type, possibly a parameterized MIME type. */
export type SectionsType = string;
type _SectionsType = Primitive._string;

interface _StyleType extends ows._DescriptionType {
	/** This style is used when no style is specified */
	isDefault: boolean;
	/** Unique identifier or name of this dataset. */
	Identifier: ows.CodeType;
	/** Zero or more LegendURL elements may be provided, providing an
	  * image(s) of a legend relevant to each Style of a Layer.  The Format
	  * element indicates the MIME type of the legend. minScaleDenominator
	  * and maxScaleDenominator attributes may be provided to indicate to
	  * the client which scale(s) (inclusive) the legend image is appropriate
	  * for.  (If provided, these values must exactly match the scale
	  * denominators of available TileMatrixes.)  width and height
	  * attributes may be provided to assist client applications in laying
	  * out space to display the legend. */
	LegendURL?: LegendURLType[];
}
interface StyleType extends _StyleType { constructor: { new(): StyleType }; }

interface _TextPayloadType extends BaseType {
	/** MIMEType format of the TextContent */
	Format: string;
	/** Text string like HTML, XHTML, XML or TXT. HTML and TXT data has
	  * to be enclosed in a CDATA element to avoid XML parsing. */
	TextContent: string;
}
interface TextPayloadType extends _TextPayloadType { constructor: { new(): TextPayloadType }; }

interface _ThemesType extends BaseType {
	Theme?: ThemeType[];
}
interface ThemesType extends _ThemesType { constructor: { new(): ThemesType }; }

interface _ThemeType extends ows._DescriptionType {
	/** Unique identifier or name of this dataset. */
	Identifier: ows.CodeType;
	/** Reference to layer */
	LayerRef?: string[];
	Theme?: ThemeType[];
}
interface ThemeType extends _ThemeType { constructor: { new(): ThemeType }; }

interface _TileMatrixLimitsType extends BaseType {
	/** Maximim tile column index valid for this layer.
	  * From minTileCol to tileHeight-1 of the tileMatrix section
	  * of this tileMatrixSet. */
	MaxTileCol: number;
	/** Maximim tile row index valid for this
	  * layer. From minTileRow to matrixWidth-1 of the tileMatrix
	  * section of this tileMatrixSet */
	MaxTileRow: number;
	/** Minimum tile column index valid for this
	  * layer. From 0 to maxTileCol */
	MinTileCol: number;
	/** Minimum tile row index valid for this
	  * layer. From 0 to maxTileRow */
	MinTileRow: number;
	/** Reference to a TileMatrix identifier */
	TileMatrix: string;
}
interface TileMatrixLimitsType extends _TileMatrixLimitsType { constructor: { new(): TileMatrixLimitsType }; }

interface _TileMatrixSetLimitsType extends BaseType {
	/** Metadata describing the limits of a TileMatrix
	  * for this layer. */
	TileMatrixLimits: TileMatrixLimitsType[];
}
interface TileMatrixSetLimitsType extends _TileMatrixSetLimitsType { constructor: { new(): TileMatrixSetLimitsType }; }

interface _TileMatrixSetLinkType extends BaseType {
	/** Reference to a tileMatrixSet */
	TileMatrixSet: string;
	/** Metadata about a the limits of the tile row and tile col indices. */
	TileMatrixSetLimits?: TileMatrixSetLimitsType;
}
interface TileMatrixSetLinkType extends _TileMatrixSetLinkType { constructor: { new(): TileMatrixSetLinkType }; }

interface _TileMatrixSetType extends ows._DescriptionType, ows._BoundingBoxProxyType {
	/** Unique identifier or name of this dataset. */
	Identifier: ows.CodeType;
	/** Coordinate reference system in which data from this data(set) or resource is available or supported. More specific parameter names should be used by specific OWS specifications wherever applicable. More than one such parameter can be included for different purposes. */
	SupportedCRS: string;
	/** Describes a particular tile matrix. */
	TileMatrix: TileMatrixType[];
	/** Reference to a well known scale set.
	  * urn:ogc:def:wkss:OGC:1.0:GlobalCRS84Scale,
	  * urn:ogc:def:wkss:OGC:1.0:GlobalCRS84Pixel,
	  * urn:ogc:def:wkss:OGC:1.0:GoogleCRS84Quad and
	  * urn:ogc:def:wkss:OGC:1.0:GoogleMapsCompatible are
	  * possible values that are defined in Annex E. It has to be consistent with the
	  * SupportedCRS and with the ScaleDenominators of the TileMatrix elements. */
	WellKnownScaleSet?: string;
}
interface TileMatrixSetType extends _TileMatrixSetType { constructor: { new(): TileMatrixSetType }; }

interface _TileMatrixType extends ows._DescriptionType {
	/** Unique identifier or name of this dataset. */
	Identifier: ows.CodeType;
	/** Height of the matrix (number of tiles in height) */
	MatrixHeight: number;
	/** Width of the matrix (number of tiles in width) */
	MatrixWidth: number;
	/** Scale denominator level of this tile matrix */
	ScaleDenominator: number;
	/** Height of each tile of this tile matrix in pixels */
	TileHeight: number;
	/** Width of each tile of this tile matrix in pixels. */
	TileWidth: number;
	/** Position in CRS coordinates of the top-left corner of this tile matrix.
	  * This are the  precise coordinates of the top left corner of top left
	  * pixel of the 0,0 tile in SupportedCRS coordinates of this TileMatrixSet. */
	TopLeftCorner: ows.PositionType;
}
interface TileMatrixType extends _TileMatrixType { constructor: { new(): TileMatrixType }; }

interface _URLTemplateType extends BaseType {
	/** Format of the resource representation that can
	  * be retrieved one resolved the URL template. */
	format: string;
	resourceType: string;
	/** URL template. A template processor will be
	  * applied to substitute some variables between {} for their values
	  * and get a URL to a resource.
	  * We cound not use a anyURI type (that conforms the character
	  * restrictions specified in RFC2396 and excludes '{' '}' characters
	  * in some XML parsers) because this attribute must accept the
	  * '{' '}' caracters. */
	template: string;
}
export interface URLTemplateType extends _URLTemplateType { constructor: { new(): URLTemplateType }; }
export var URLTemplateType: { new(): URLTemplateType };

type URLTemplateTypeTemplateType = string;
type _URLTemplateTypeTemplateType = Primitive._string;

export type VersionType = "1.0.0";
interface _VersionType extends Primitive._string { content: VersionType; }

export interface document extends BaseType {
	BinaryPayload: BinaryPayloadType;
	/** XML defines the WMTS GetCapabilities operation response.
	  * ServiceMetadata document provides clients with service metadata about a specific service
	  * instance, including metadata about the tightly-coupled data served. If the server
	  * does not implement the updateSequence parameter, the server SHALL always
	  * return the complete Capabilities document, without the updateSequence parameter.
	  * When the server implements the updateSequence parameter and the
	  * GetCapabilities operation request included the updateSequence parameter
	  * with the current value, the server SHALL return this element with only the
	  * "version" and "updateSequence" attributes. Otherwise, all optional elements
	  * SHALL be included or not depending on the actual value of the Contents
	  * parameter in the GetCapabilities operation request. */
	Capabilities: CapabilitiesType;
	/** Metadata about a particular dimension that the tiles of
	  * a layer are available. */
	Dimension: DimensionType;
	DimensionNameValue: DimensionNameValueType;
	FeatureInfoResponse: FeatureInfoResponseType;
	/** WMTS GetCapabilities operation request. */
	GetCapabilities: GetCapabilitiesType;
	GetFeatureInfo: GetFeatureInfoType;
	GetTile: GetTileType;
	Layer: LayerType;
	/** Zero or more LegendURL elements may be provided, providing an
	  * image(s) of a legend relevant to each Style of a Layer.  The Format
	  * element indicates the MIME type of the legend. minScaleDenominator
	  * and maxScaleDenominator attributes may be provided to indicate to
	  * the client which scale(s) (inclusive) the legend image is appropriate
	  * for.  (If provided, these values must exactly match the scale
	  * denominators of available TileMatrixes.)  width and height
	  * attributes may be provided to assist client applications in laying
	  * out space to display the legend. */
	LegendURL: LegendURLType;
	Style: StyleType;
	TextPayload: TextPayloadType;
	Theme: ThemeType;
	/** Provides a set of hierarchical themes that the
	  * client can use to categorize the layers by. */
	Themes: ThemesType;
	/** Describes a particular tile matrix. */
	TileMatrix: TileMatrixType;
	/** Metadata describing the limits of a TileMatrix
	  * for this layer. */
	TileMatrixLimits: TileMatrixLimitsType;
	/** Describes a particular set of tile matrices. */
	TileMatrixSet: TileMatrixSetType;
	/** Metadata about a the limits of the tile row and tile col indices. */
	TileMatrixSetLimits: TileMatrixSetLimitsType;
	/** Metadata about the TileMatrixSet reference. */
	TileMatrixSetLink: TileMatrixSetLinkType;
}
export var document: document;
