import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as parser from 'fast-xml-parser';
import { DescribeRecordResponseType, GetRecordByIdResponseType, GetRecordsResponseType,
    document as CSWDocument, CapabilitiesType, GetCapabilitiesType, DescribeRecordType,
    GetRecordByIdType, RequestBaseType, GetRecordsType, GetDomainType,
    GetDomainResponseType } from '../types/typedefinitions/www.opengis.net/cat/csw/2.0.2';


const xml2jsOptions = {
    ignoreNameSpace: true
};

const js2xmlOptions = {};


@Injectable({
    providedIn: 'root'
})
export class CswService {

    private xml2jsParser;
    private js2xmlParser;

    constructor(
        private http: HttpClient
    ) {
        this.xml2jsParser = parser;
        this.js2xmlParser = new parser.j2xParser(js2xmlOptions);
    }


    public getCapabilities(url: string, body: GetCapabilitiesType): Observable<CapabilitiesType> {
        return this.doPost(url, {
            GetCapabilities: body
        }).pipe(
            map((response: CSWDocument) => {
                return response.Capabilities;
            })
        );
    }


    /**
     * The mandatory ``DescribeRecord`` operation allows a client to discover elements of the
     * information model supported by the target catalogue service. The operation allows some
     * or all of the information model to be described.
     */
    public describeRecord(url: string, body: DescribeRecordType): Observable<DescribeRecordResponseType> {
        return this.doPost(url, {
            DescribeRecord: body
        }).pipe(
            map((response: CSWDocument) => {
                return response.DescribeRecordResponse;
            })
        );
    }


    /**
     * The mandatory ``GetRecordById`` request retrieves the default representation of catalogue
     * records using their identifier. The ``GetRecordById`` operation is an implementation of the
     * ``Present`` operation from the general model. This operation presumes that a previous query
     * has been performed in order to obtain the identifiers that may be used with this operation.
     * For example, records returned by a ``GetRecords`` operation may contain references to
     * other records in the catalogue that may be retrieved using the ``GetRecordById`` operation.
     * This operation is also a subset of the ``GetRecords`` operation, and is included as a
     * convenient short form for retrieving and linking to records in a catalogue.
     */
    public getRecordById(url: string, body: GetRecordByIdType): Observable<GetRecordByIdResponseType> {
        return this.doPost(url, {
            GetRecordById: body
        }).pipe(
            map((response: CSWDocument) => {
                return response.GetRecordByIdResponse;
            })
        );
    }


    /**
     * The primary means of resource discovery in the general model are the two operations
     * ``search`` and ``present``. In the HTTP protocol binding these are combined in the form of the
     * mandatory ``GetRecords`` operation, which does a search and a piggybacked present.
     *
     * The search portion of the ``GetRecords`` operation is encoded using the ``Query`` element.
     * The ``Query`` element includes the parameters ``typeName`` and ``Constraint``. The ``typeName``
     * parameter is used to specify which entities, from the information model of the catalogue,
     * shall be queried. The ``Constraint`` parameter is used to specify which query constraints
     * shall be applied to identify the request set.
     *
     * The present portion of the ``GetRecords`` operation is encoded using the ``outputSchema``
     * parameter and the ElementName/ElementSetName parameter(s). The ``outputSchema``
     * parameter indicates which schema shall be used to generate the response to the
     * ``GetRecords`` operation. The ElementName or ElementSetName parameter is used to
     * specify which properties of the ``outputSchema`` to include in each record in the
     * ``GetRecords`` response.
     */
    public getRecords(url: string, body: GetRecordsType): Observable<GetRecordsResponseType> {
        return this.doPost(url, {
            GetRecords: body
        }).pipe(
            map((response: CSWDocument) => {
                return response.GetRecordsResponse;
            })
        );
    }

    /**
     *  The optional GetDomain operation is used to obtain runtime information about the range
     *  of values of a metadata record element or request parameter. The runtime range of values
     *  for a property or request parameter is typically much smaller than the value space for that
     *  property or parameter based on its static type definition. For example, a property or
     *  request parameter defined as a 16bit positive integer in a database may have a value
     *  space of 65535 distinct integers but the actual number of distinct values existing in the
     *  database may be much smaller.
     *
     *  This type of runtime information about the range of values of a property or request
     *  parameter is useful for generating user interfaces with meaningful pick lists or for
     *  generating query predicates that have a higher chance of actually identifying a result set.
     *  It should be noted that the GetDomain operation is a “best-effort” operation. That is to
     *  say that a catalogue tries to generate useful information about the specified request
     *  parameter or property if it can. It is entirely possible that a catalogue may not be able to
     *  determine anything about the values of a property or request parameter beyond the basic
     *  type; in this case only a type reference or a type description will be returned.
     */
    public getDomain(url: string, body: GetDomainType): Observable<GetDomainResponseType> {
        return this.doPost(url, {
            GetDomain: body
        }).pipe(
            map((response: CSWDocument) => {
                return response.GetDomainResponse;
            })
        );
    }


    private doPost(url: string, body: CSWDocument): Observable<CSWDocument> {
        const xmlBody = this.js2xmlParser.parse(body);
        const headers = {
            'Content-Type': 'text/xml',
            Accept: 'text/xml, application/xml'
        };
        return this.http.post(url, xmlBody, { headers, responseType: 'text' }).pipe(
            map((xmlResponseBody: string) => {
                const validationResult = this.xml2jsParser.validate(xmlResponseBody);
                if (validationResult !== true) {
                    throw new Error(`Parsing has failed: ${validationResult}`);
                }
                const response: CSWDocument = parser.parse(xmlResponseBody, xml2jsOptions);
                return response;
            })
        );
    }
}
