import { Injectable } from '@angular/core';
import { CswVersion, CswCapabilities, CswDescribeRecordResponse, ElementSetName } from './csw.types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as parser from 'fast-xml-parser';


@Injectable({
    providedIn: 'root'
})
export class CswService {

    constructor(
        private http: HttpClient
    ) {}


    public getCapabilities(url: string, version: CswVersion): Observable<CswCapabilities> {
        return this.http.get(
            `${url}?service=CSW&request=GetCapabilities&version=${version}`,
            {responseType: 'text'}
        ).pipe(
            map((xmlResponseBody: string) => {
                const validationResult = parser.validate(xmlResponseBody);
                if (validationResult !== true) {
                    throw new Error(`Parsing GetCapabilities has failed: ${validationResult}`);
                }
                const capabilities: CswCapabilities = parser.parse(xmlResponseBody);
                return capabilities;
            })
        );
    }


    public describeRecord(url: string, version: CswVersion): Observable<CswDescribeRecordResponse> {
        return this.http.get(
            `${url}?service=CSW&request=DescribeRecord&version=${version}&outputFormat=application/xml&schemaLanguage=http://www.w3.org/XML/Schema&namespace=csw:http://www.opengis.net/cat/csw/${version}`,
            {responseType: 'text'}
        ).pipe(
            map((xmlResponseBody: string) => {
                const validationResult = parser.validate(xmlResponseBody);
                if (validationResult !== true) {
                    throw new Error(`Parsing DescribeRecord has failed: ${validationResult}`);
                }
                const description: CswDescribeRecordResponse = parser.parse(xmlResponseBody);
                return description;
            })
        );
    }


    public getRecordById(url: string, version: CswVersion, id: string, elementSetName: ElementSetName = 'full') {
        return this.http.get(
            `${url}?request=GetRecordById&service=CSW&version=${version}&elementSetName=${elementSetName}&id=${id}`,
            {responseType: 'text'}
        ).pipe(
            map((xmlResponseBody: string) => {
                const validationResult = parser.validate(xmlResponseBody);
                if (validationResult !== true) {
                    throw new Error(`Parsing DescribeRecord has failed: ${validationResult}`);
                }
                const description: CswDescribeRecordResponse = parser.parse(xmlResponseBody);
                return description;
            })
        );
    }


    public getRecords() {
        // example: https://catalog.data.gov/csw-all?request=GetRecords&service=CSW&version=2.0.2
        // &namespace=xmlns(csw=http://www.opengis.net/cat/csw/2.0.2),xmlns(gmd=http://www.isotc211.org/2005/gmd)
        // &constraint=AnyText+like+%africa%
        // &constraintLanguage=CQL_TEXT
        // &constraint_language_version=1.1.0
        // &typeNames=csw:Record&ElementSetName=full
        // &resultType=results
    }

}
