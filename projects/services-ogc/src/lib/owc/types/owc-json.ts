/**
 * Type definitions for OGC OWS Context Geo Encoding Standard Version: 1.0
 * http://docs.opengeospatial.org/is/14-055r2/14-055r2.html
 * Definitions by: Mathias Boeck
 * TypeScript Version: 2.5.3
 *
 * depends on @types/geojson@^7946.0.2
 */
import * as GeoJSON from 'geojson';

/**
 * The OWS Context describes Metadata, API, Time Range
 * http://www.owscontext.org/owc_user_guide/C0_userGuide.html#truethe-ows-context-document-structure
 * If no bounding box is specified, do not change the current view when the context document is loaded.
 */
export interface IOwsContext extends GeoJSON.FeatureCollection<GeoJSON.GeometryObject | null, GeoJSON.GeoJsonProperties> {
  /**
   * The id element defines a mandatory reference to the identification of the Context document.
   * The content for the id element SHALL be an IRI, as defined by IETF [RFC3987]
   */
  id: string | number;
  properties: {
    links: {
      profiles: IOwsLinks[],
      via?: IOwsLinks[]
    };
    /** Language of Context document content */
    lang: LangString;
    /** Title for the Context document */
    title: string;
    /** Date of a creation or update of the Context document */
    updated: DateString;
    /** Description of the Context document purpose or content */
    subtitle?: string;
    /** This element is optional and indicates the authors array of the Context document */
    authors?: IOwsAuthor[];
    /** Identifier for the publisher of the Context document */
    publisher?: string;
    /** Tool/application used to create the Context document and its properties */
    generator?: IOwsGenerator;
    /**
     * Properties of the display in use when the context document was created (for display based applications only).
     * This class is optional and intended for creator applications that use a graphical user interface with a geographical display within a fixed pixel size and not scalable to different computational devices
     */
    display?: IOwsCreatorDisplay[];
    /** Information about rights held in and over the Context document */
    rights?: string;
    /**
     * This element is optional and expressed a date or range of dates relevant to the Context document.
     * It can contain the element start, stop and instant. The values of these elements SHALL conform to the "date-time" production of ISO-8601[5]. An uppercase "T" character SHALL be used to separate date and time, and an uppercase "Z" character SHALL be present in the absence of a numeric time zone offset. To specify a range of dates the "/" character SHALL be used.
     */
    date?: DateString;
    /** This array is an optional and expresses categories related to this Context document */
    categories?: IOwsCategory[];
    /** Extension Any other element */
    [k: string]: any;
  };
  /** Ordered List of Resources available on the Context document
   * The order of the member of the features MAY be used to identify the drawing order of the resources.
   * In that case, the first item of the array represents the top most layer
   */
  features: IOwsResource[];
  /** Extension Any other element */
  [k: string]: any;
}

/**
 * Each layer (a.k.a. feature) in a context document is known as a ‘Resource’
 * A Resource reference a set of geospatial information to be treated as a logical element.
 * The resources are ordered such that the first item in the document is to be displayed at the front.
 * This defines the order in which layers are drawn.
 * A resource (which in GIS terms is a layer) can have a number of offerings, and each offering
 * is focussed on a particular representation of information.
 * These can be one of a number of OGC Web Services, specifically WMS, WMTS, WFS, WCS, WPS and CSW,
 * or one of a number of inline or referenced formats, specifically GML, KML, GeoTIFF, GMLJP2, GMLCOV,
 * or a custom offering type defined in a profile or by an organisation.
 * http://www.owscontext.org/owc_user_guide/C0_userGuide.html#truethe-ows-context-document-structure
 */
export interface IOwsResource extends GeoJSON.Feature {
  /**
   * Unambiguous reference to the identification of the Context resource (IRI)
   * String type that SHALL contain a URI value
   */
  id: string | number;
  properties: IOwsResourceProperties;
  [k: string]: any;
}
export interface IOwsResourceProperties {
  /** Title given to the Context resource */
  title: string;
  /** Date of the last update of the Context resource */
  updated: DateString;
  /** The purpose is to provide a generic description of the content in a format understandable by generic readers */
  abstract?: string;
  /** This element is optional and indicates the authors array of the Context resource */
  authors?: IOwsAuthor[];
  /** Entity responsible for making the Context resource available */
  publisher?: string;
  /** Information about rights held in and over the Context resource */
  rights?: string;
  /** Date or range of dates relevant to the Context resource. The values of these elements SHALL conform to the "date-time" production of ISO-8601[5]*/
  date?: DateString;
  /** This element is optional and can contain a number of offerings defined by the class OWC:Offering */
  offerings?: IOwsOffering[];
  /** Flag value indicating to the client if the Context resource should be displayed by default.
   * E.g. Layer is visible
   */
  active?: boolean;
  /** This array is optional and expresses a category related to the Context resource */
  categories?: IOwsCategory[];
  /** Minimum scale for the display of the Context resource Double */
  minscaledenominator?: number;
  /** Maximum scale for the display of the Context resource Double */
  maxscaledenominator?: number;
  /** Definition of the folder in which the resource is placed
   * The folder attribute is intended to support the concept present in many clients or organising layers into folders.
   */
  folder?: string;
  links?: {
    previews?: IOwsLinks[],
    alternates?: IOwsLinks[],
    data?: IOwsLinks[],
    via?: IOwsLinks[]
  };
  [k: string]: any;
}

/**
 * In reality a resource can be realized in a number of different ways, and so an OWC document allows various options to be specified.
 * These are known as offerings.
 * The intention is that these are, as far as is possible by the format used,
 * equivalent and no priority is assigned to their order in the standard.
 * They are intended to be alternatives that the client can use to allow it to visualize or use the resource.
 *
 * So for example four offerings, a WMS, a WFS with portrayal as SLD, and an inline GML Offering again with portrayal as SLD.
 * Different clients could use these offerings as appropriate:
 * - a simple browser based client could use the WMS offering provided, using the standard portrayal
 * - a more sophisticated client, could use the WFS offering and the associated SLD Document.
 *
 * There are two types of offering, service offerings and data offerings.
 * A service offering has a service request (in the form of a capabilities request and a data request)
 * and optional content and styling elements.
 * A data offering has a content element and optional styling elements.
 *
 *
 * http://www.owscontext.org/owc_user_guide/C0_userGuide.html#truemultiple-offerings-and-priority
 */
export interface IOwsOffering {
  /** Code identifying the type of offering - Extension Offerings with type - string */
  code: WMS_Offering | WFS_Offering | WCS_Offering | WPS_Offering | CSW_Offering | WMTS_Offering |
  GML_Offering | KML_Offering | GeoTIFF_Offering | GMLJP2_Offering | GMLCOV_Offering | string;
  /** Web Service Offerings provide their operations - Array of operations used to invoke the service */
  operations?: IOwsOperation[];
  /** Content Offerings allow content to be embedded in an OWS Context document (inline or byRef) */
  contents?: IOwsContent[];
  /** Array of style sets - A style representation for a resource (inline or service derived) content */
  styles?: IOwsStyleSet[];
  [k: string]: any;
}

export interface IOwsGenerator {
  title?: string;
  uri?: string;
  version?: string;
}

export interface IOwsAuthor {
  /** Entity primarily responsible for making the Context document
   * Properties that all types of authors have. It mimics the Atom author
   */
  name: string;
  email?: string;
  uri?: string;
  [k: string]: any;
}

export interface IOwsCategory {
  /** Category related to this context document. It MAY have a related code-list that is identified by the scheme attribute */
  term: string;
  scheme?: string;
  label?: string;
}

/** Properties that all types of links have. It mimics the Atom link */
export interface IOwsLinks {
  href: string;
  type?: string;
  title?: string;
  lang?: LangString;
  length?: number;
  [k: string]: any;
}

export interface IOwsCreatorApplication {
  title?: string;
  uri?: string;
  version?: string;
}

export interface IOwsCreatorDisplay {
  /** Width measured in pixels of the display showing the Area of Interest */
  pixelWidth?: number;
  /** Width measured in pixels of the display showing by the Area of Interest */
  pixelHeight?: number;
  /** The size of a pixel of the display in millimeters
   * (combined with the previous ones allows for the real display size to be calculated)
   */
  mmPerPixel?: number;
  [k: string]: any;
}

/**
 * Most service offerings have two operations, a ‘GetCapabilities’ operation and a data operation such as ‘GetMap’ for WMS
 */
export interface IOwsOperation {
  /**
   * The code identifies the type of operation.
   * Valid types are defined within each specific extension within the OWS Context conceptual model [OGC 12-080].
   */
  code: string;
  /** method defines the access method, for example GET or POST. */
  method: string;
  /** Service Request URL - The URI containing the definition of the request */
  href: string;
  /** MIME type of the expected results */
  type?: string;
  /** Optional request body content */
  request?: IOwsContent;
  /** Optional Result Payload of the operation */
  result?: IOwsContent;
  /** Extension of Operation */
  [k: string]: any;
}

export interface IOwsContent {
  /** MIME type of the Content */
  type: string;
  /** URL of the Content */
  href?: string;
  /** Title of the Content */
  title?: string;
  /** In-line content for the Content element- String type, not empty that can contain any text encoded media type */
  content?: string;
  [k: string]: any;
}

export interface IOwsStyleSet {
  /** Unique name of the styleSet within a given offering */
  name: string;
  /** Human Readable title of the styleSet within a given offering */
  title: string;
  /** Description of the styleSet */
  abstract?: string;
  /** Whether this styleSet is the one to be defined by default */
  default?: boolean;
  /** URL of a legend image for the styleSet */
  legendURL?: string;
  /** The inline or a external reference to the styleSet definition */
  content?: IOwsContent;
  [k: string]: any;
}

/** ISO-8601 format e.g. YYYY-MM-DDThh:mm:ssZ or YYYY-MM-DDThh:mm:ssZ/YYYY-MM-DDThh:mm:ssZ */
export type DateString = string;


/** RFC-3066 code e.g. en,de */
export type LangString = string;

export const wmsOffering = 'http://www.opengis.net/spec/owc-geojson/1.0/req/wms' as const;
export type WMS_Offering = typeof wmsOffering;

export const wfsOffering = 'http://www.opengis.net/spec/owc-geojson/1.0/req/wfs' as const;
export type WFS_Offering = typeof wfsOffering;

export const wcsOffering = 'http://www.opengis.net/spec/owc-geojson/1.0/req/wcs' as const;
export type WCS_Offering = typeof wcsOffering;

export const wpsOffering = 'http://www.opengis.net/spec/owc-geojson/1.0/req/wps' as const;
export type WPS_Offering = typeof wpsOffering;

export const cswOffering = 'http://www.opengis.net/spec/owc-geojson/1.0/req/csw' as const;
export type CSW_Offering = typeof cswOffering;

export const wmtsOffering = 'http://www.opengis.net/spec/owc-geojson/1.0/req/wmts' as const;
export type WMTS_Offering = typeof wmtsOffering;

export const gmlOffering = 'http://www.opengis.net/spec/owc-geojson/1.0/req/gml' as const;
export type GML_Offering = typeof gmlOffering;

export const kmlOffering = 'http://www.opengis.net/spec/owc-geojson/1.0/req/kml' as const;
export type KML_Offering = typeof kmlOffering;

export const GeoTIFFOffering = 'http://www.opengis.net/spec/owc-geojson/1.0/req/geotiff' as const;
export type GeoTIFF_Offering = typeof GeoTIFFOffering;

export const GMLJP2Offering = 'http://www.opengis.net/spec/owc-geojson/1.0/req/gmljp2' as const;
export type GMLJP2_Offering = typeof GMLJP2Offering;

export const GMLCOVOffering = 'http://www.opengis.net/spec/owc-geojson/1.0/req/gmlcov' as const;
export type GMLCOV_Offering = typeof GMLCOVOffering;
