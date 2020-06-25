import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as parser from 'fast-xml-parser';
import { CswVersion } from './typedefinitions/manually-added';
import { DescribeRecordResponseType, GetRecordByIdResponseType, GetRecordsResponseType, ElementSetType } from './typedefinitions/www.opengis.net/cat/csw/2.0.2';
import { CapabilitiesBaseType } from './typedefinitions/www.opengis.net/ows';


@Injectable({
    providedIn: 'root'
})
export class CswService {

    constructor(
        private http: HttpClient
    ) {}


    public getCapabilities(url: string, version: CswVersion): Observable<CapabilitiesBaseType> {
        return this.http.get(
            `${url}?service=CSW&request=GetCapabilities&version=${version}`,
            {responseType: 'text'}
        ).pipe(
            map((xmlResponseBody: string) => {
                const validationResult = parser.validate(xmlResponseBody);
                if (validationResult !== true) {
                    throw new Error(`Parsing GetCapabilities has failed: ${validationResult}`);
                }
                const capabilities: CapabilitiesBaseType = parser.parse(xmlResponseBody, {
                    ignoreNameSpace: true
                }).Capabilities;
                return capabilities;
            })
        );
    }


    public describeRecord(url: string, version: CswVersion): Observable<DescribeRecordResponseType> {
        return this.http.get(
            `${url}?service=CSW&request=DescribeRecord&version=${version}&outputFormat=application/xml&schemaLanguage=http://www.w3.org/XML/Schema&namespace=csw:http://www.opengis.net/cat/csw/${version}`,
            {responseType: 'text'}
        ).pipe(
            map((xmlResponseBody: string) => {
                const validationResult = parser.validate(xmlResponseBody);
                if (validationResult !== true) {
                    throw new Error(`Parsing DescribeRecord has failed: ${validationResult}`);
                }
                const description: DescribeRecordResponseType = parser.parse(xmlResponseBody);
                return description;
            })
        );
    }


    public getRecordById(url: string, version: CswVersion, id: string, elementSetName: ElementSetType): Observable<GetRecordByIdResponseType> {
        return this.http.get(
            `${url}?request=GetRecordById&service=CSW&version=${version}&elementSetName=${elementSetName}&id=${id}`,
            {responseType: 'text'}
        ).pipe(
            map((xmlResponseBody: string) => {
                const validationResult = parser.validate(xmlResponseBody);
                if (validationResult !== true) {
                    throw new Error(`Parsing DescribeRecord has failed: ${validationResult}`);
                }
                const description: GetRecordByIdResponseType = parser.parse(xmlResponseBody);
                return description;
            })
        );
    }


    public getRecords(url: string, version: CswVersion, elementSetName: ElementSetType, constraintText?: string): Observable<GetRecordsResponseType> {
        // example: https://catalog.data.gov/csw-all?request=GetRecords&service=CSW&version=2.0.2
        // &namespace=xmlns(csw=http://www.opengis.net/cat/csw/2.0.2),xmlns(gmd=http://www.isotc211.org/2005/gmd)
        // &typeNames=csw:Record
        // &ElementSetName=full
        // &resultType=results
        // &constraint=AnyText+like+%africa%
        // &constraintLanguage=CQL_TEXT
        // &constraint_language_version=1.1.0
        let fullRequest = `${url}?request=GetRecords&service=CSW&version=${version}` + 
                            `&namespace=xmlns(csw=http://www.opengis.net/cat/csw/2.0.2),xmlns(gmd=http://www.isotc211.org/2005/gmd)` +
                            `&typeNames=csw:Record` +
                            `&elementSetName=${elementSetName}` +
                            `&resultType=results`;
        if(constraintText) {
            fullRequest += `constraintLanguage=CQL_TEXT&constraint_language_version=1.1.0&constraint=${constraintText}`;
        }
        return this.http.get(
            fullRequest,
            {responseType: 'text'}
        ).pipe(
            map((xmlResponseBody: string) => {
                const validationResult = parser.validate(xmlResponseBody);
                if (validationResult !== true) {
                    throw new Error(`Parsing GetRecords has failed: ${validationResult}`);
                }
                const results: GetRecordsResponseType = parser.parse(xmlResponseBody);
                return results;
            })
        );
    }

}
