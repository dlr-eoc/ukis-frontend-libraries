import { ElementSetType } from '../types/cxsd/www.opengis.net/cat/csw/2.0.2';

export type CswVersion = '2.0.2';


export type CswNodeType = 'Capabilities' | 'DescribeRecord' | 'DescribeRecordResponse' | 'GetRecordById'
            | 'GetRecordByIdResponse' | 'SummaryRecord' | 'BoundingBox' | 'Query' | 'Record' | 'GetRecords'
            | 'ExceptionReport' | 'GetRecordsResponse' | 'identifier';

export type GmdNodeType = 'MD_Metadata';


export interface ElementAttributes {
    namespaceURI: string;
    localPart: string;
    prefix: string;
    key: string;
    string: string;
}


export class GmdElementAttributes implements ElementAttributes {

    readonly namespaceURI: string;
    readonly localPart: string;
    readonly prefix: string;
    readonly key: string;
    readonly string: string;

    constructor(op: GmdNodeType) {
        this.namespaceURI = `http://www.isotc211.org/2005/gmd`;
        this.localPart = `${op}`;
        this.prefix = `gmd`;
        this.key = `{http://www.isotc211.org/2005/gmd}${op}`;
        this.string = `{http://www.isotc211.org/2005/gmd}csw:${op}`;
    }
}


export class CswElementAttributes implements ElementAttributes {

    readonly namespaceURI: string;
    readonly localPart: string;
    readonly prefix: string;
    readonly key: string;
    readonly string: string;

    constructor(op: CswNodeType) {
        this.namespaceURI = `http://www.opengis.net/cat/csw/2.0.2`;
        this.localPart = `${op}`;
        this.prefix = `csw`;
        this.key = `{http://www.opengis.net/cat/csw/2.0.2}${op}`;
        this.string = `{http://www.opengis.net/cat/csw/2.0.2}csw:${op}`;
    }
}

export interface ElementValue {
        TYPE_NAME: string;
}

export interface Element {
    name: ElementAttributes;
    value: ElementValue;
}

export interface ExceptionType extends ElementValue {
    TYPE_NAME: 'OWS_1_0_0.ExceptionType';
    exceptionCode: string;
    locator: string;
    exceptionText: string[];
}

export interface ExceptionReportType extends ElementValue {
    TYPE_NAME: 'OWS_1_0_0.ExceptionReport';
    language: string;
    version: string;
    exception: ExceptionType[];
  }

export interface ExceptionReportElement extends Element {
    value: ExceptionReportType;
}


export interface CswKeywords {
    TYPE_NAME: 'OWS_1_0_0.KeywordsType';
    keyword: string[];
}

export interface Code {
    TYPE_NAME: 'OWS_1_0_0.CodeType';
    codeSpace: string;
    value: string;
}

export interface CswServiceIdentification {
    TYPE_NAME: 'OWS_1_0_0.ServiceIdentification';
    title: string;
    _abstract: string;
    keywords: CswKeywords;
    serviceType: Code;
    serviceTypeVersion: CswVersion[];
    fees?: string;
    accessConstraints?: string[];
}

export interface OnlineResourceType {
    TYPE_NAME: 'OWS_1_0_0.OnlineResourceType';
    type: 'simple';
    href: string;
}

export interface CswServiceProvider {
    TYPE_NAME: 'OWS_1_0_0.ServiceProvider';
    providerName: string;
    providerSite: OnlineResourceType;
    serviceContact?: any;
}

export interface CswOperation {
    TYPE_NAME: 'OWS_1_0_0.Operation';
    name: string;
    dcp: any[];
    parameter: any[];
  }

export interface CswOperationsMetadata {
    TYPE_NAME: 'OWS_1_0_0.OperationsMetadata';
    operation: CswNodeType[];
}

export interface CswCapabilitiesValue extends ElementValue {
    TYPE_NAME: 'CSW_2_0_2.CapabilitiesType';
    version: '2.0.2';
    serviceIdentification: CswServiceIdentification;
    serviceProvider: CswServiceProvider;
    operationsMetadata: CswOperationsMetadata;
    filterCapabilities?: any;
}

export interface CswCapabilitiesElement extends Element {
    value: CswCapabilitiesValue;
}

export interface CswTypeName {
    namespaceURI: 'http://www.opengis.net/cat/csw/2.0.2';
    localPart: 'Record';
    prefix: 'csw';
    key: '{http://www.opengis.net/cat/csw/2.0.2}Record';
    string: '{http://www.opengis.net/cat/csw/2.0.2}csw:Record';
}

export interface CswDescribeRecordValue extends ElementValue {
    TYPE_NAME: 'CSW_2_0_2.DescribeRecordType';
    service: 'CSW';
    version: '2.0.2';
    outputFormat?: CswOutputFormat;
    schemaLanguage?: 'http://www.w3.org/2001/XMLSchema';
    typeName?: CswTypeName[];
    namespace?: string[];
}

export interface CswDescribeRecordElement extends Element {
    value: CswDescribeRecordValue;
}


export interface CswSchemaComponentType {
    TYPE_NAME: 'CSW_2_0_2.SchemaComponentType';
    schemaLanguage: 'XMLSCHEMA';
    targetNamespace: 'http://www.opengis.net/cat/csw/2.0.2';
    content: any[];
}


export interface CswDescribeRecordResponseValue extends ElementValue {
    TYPE_NAME: 'CSW_2_0_2.DescribeRecordResponseType';
    schemaComponent: CswSchemaComponentType[];
}

export interface CswDescribeRecordResponseElement extends Element {
    value: CswDescribeRecordResponseValue;
}


export type CswElementSetName = 'summary' | 'brief' | 'full';
export type CswOutputFormat = 'application/xml' | 'application/json' | 'text/html' | 'text/plain';
export type CswResultType = 'hits' | 'results' | 'validate';
export type CswOutputSchema =  'http://gcmd.gsfc.nasa.gov/Aboutus/xml/dif/' | 'http://www.interlis.ch/INTERLIS2.3'
        | 'http://www.isotc211.org/2005/gmd' | 'http://www.opengis.net/cat/csw/2.0.2' | 'http://www.opengis.net/cat/csw/csdgm'
        | 'http://www.w3.org/2005/Atom';

export interface CswGetRecordByIdValue extends ElementValue {
    TYPE_NAME: 'CSW_2_0_2.GetRecordByIdType';
    service: 'CSW';
    version: '2.0.2';
    outputFormat?: CswOutputFormat;
    outputSchema: CswOutputSchema;
    id: string[];
    ElementSetName?: CswElementSetName;
}

export interface CswGetRecordByIdElement extends Element {
    value: CswGetRecordByIdValue;
}

export interface SimpleLiteral {
    TYPE_NAME: 'DC_1_1.SimpleLiteral';
    content: string[];
}

export interface SimpleLiteralElement {
    name: ElementAttributes;
    value: SimpleLiteral;
    scheme?: string;
}



export interface BoundingBox extends ElementValue {
    TYPE_NAME: 'OWS_1_0_0.BoundingBoxType';
    crs: string;  // urn:x-ogc:def:crs:EPSG:6.11:4326
    dimensions: 2;
    lowerCorner: number[];
    upperCorner: number[];
}

export interface BoundingBoxElement extends Element {
    name: ElementAttributes;
    value: BoundingBox;
}

export interface CswSummaryRecordType extends ElementValue {
    TYPE_NAME: 'CSW_2_0_2.SummaryRecordType';
    identifier: SimpleLiteralElement[];
    relation: SimpleLiteralElement[];
    modified: SimpleLiteralElement[];
    _abstract: SimpleLiteralElement[];
    boundingBox: BoundingBoxElement[];
}

export interface CswSummaryRecordElement extends Element {
    name: ElementAttributes;
    value: CswSummaryRecordType;
}

export interface CswGetRecordByIdResponseValue extends ElementValue {
    TYPE_NAME: 'CSW_2_0_2.GetRecordByIdResponseType';
    abstractRecord: CswSummaryRecordElement[];
}

export interface CswGetRecordByIdResponseElement extends Element {
    value: CswGetRecordByIdResponseValue;
}

export type CswConstraintLanguage = 'CQL_TEXT' | 'FILTER';

export interface CswElementSetNameType {
    TYPE_NAME: 'CSW_2_0_2.ElementSetNameType';
    typeNames: ElementAttributes[];
    value: CswElementSetName;
}

export interface CswElementNameType {
    TYPE_NAME: 'CSW_2_0_2.ElementNameType';
    typeNames: ElementAttributes[];
    value: string;
}

export interface CswConstraintType {
    TYPE_NAME: 'CSW_2_0_2.QueryConstraintType';
    version: '1.1.0';
    filter?: any;
    cqlText?: string;
  }

export interface CswAbstractQueryType {
    TYPE_NAME: 'CSW_2_0_2.QueryType';
    typeNames: ElementAttributes[];  // new ElementName('Record')
    elementSetName?: CswElementSetNameType;
    elementName?: CswElementNameType;
    CONSTRAINTLANGUAGE?: CswConstraintLanguage;
    constraint?: CswConstraintType | string;
    SortBy?: string[];
    DistributedSearch?: boolean;
    hopCount?: number;
    ResponseHandler?: string;  // Any URI. If not included, process request synchronously.
}

export interface CswAbstractQueryElement extends Element {
    value: CswAbstractQueryType;
}

export interface CswGetRecordsType {
    TYPE_NAME: 'CSW_2_0_2.GetRecordsType';
    service: 'CSW';
    version: CswVersion;
    maxRecords?: number;
    startPosition?: number;
    resultType?: CswResultType;
    outputFormat?: CswOutputFormat;
    outputSchema?: CswOutputSchema;
    abstractQuery?: CswAbstractQueryElement;
    NAMESPACE?: string;  // Format shall be xmlns([prefix=]namespace-url). If the prefix is not specified then this is the default namespace.
    requestId?: string;
  }

export interface CswGetRecordsElement extends Element {
    value: CswGetRecordsType;
}

export interface CswTimeStamp {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    fractionalSecond: number;
    timezone: number;
    date: string;
}

export interface CswRequestStatusType {
    TYPE_NAME: 'CSW_2_0_2.RequestStatusType';
    timestamp?: CswTimeStamp;
}



export interface CswAbstractRecordType {
    TYPE_NAME: 'CSW_2_0_2.RecordType';
    dcElement: SimpleLiteralElement[]; // identifier, title, type, subject, references, abstract, modified, date
    boundingBox: BoundingBoxElement[];
}

export interface CswAbstractRecordElement extends Element {
    value: CswAbstractRecordType;
}

export interface CswSearchResultsType {
    TYPE_NAME: 'CSW_2_0_2.SearchResultsType';
    nextRecord: number;
    numberOfRecordsMatched: number;
    numberOfRecordsReturned: number;
    recordSchema: 'http://www.opengis.net/cat/csw/2.0.2';
    elementSet: ElementSetType;
    abstractRecord: CswAbstractRecordElement[];
}

export interface CswGetRecordsResponse {
    TYPE_NAME: 'CSW_2_0_2.GetRecordsResponseType';
    version: '2.0.2';
    searchStatus: CswRequestStatusType;
    searchResults: CswSearchResultsType;
}

export interface CswGetRecordsResponseElement extends Element {
    value: CswGetRecordsResponse;
}


