import { HttpClient } from '@angular/common/http';
import * as XHTML_1_0_Strict_Factory from 'w3c-schemas/lib/XHTML_1_0_Strict'; const XHTML_1_0_Strict = XHTML_1_0_Strict_Factory.XHTML_1_0_Strict;
import * as XLink_1_0_Factory from 'w3c-schemas/lib/XLink_1_0'; const XLink_1_0 = XLink_1_0_Factory.XLink_1_0;
import * as DC_1_1_Factory from 'ogc-schemas/lib/DC_1_1'; const DC_1_1 = DC_1_1_Factory.DC_1_1;
import * as OWS_1_0_0_Factory from 'ogc-schemas/lib/OWS_1_0_0'; const OWS_1_0_0 = OWS_1_0_0_Factory.OWS_1_0_0;
import * as DCT_Factory from 'ogc-schemas/lib/DCT'; const DCT = DCT_Factory.DCT;
import * as CSW_2_0_2_Factory from 'ogc-schemas/lib/CSW_2_0_2'; const CSW_2_0_2 = CSW_2_0_2_Factory.CSW_2_0_2;
// import * as OWS_1_1_0_Factory from 'ogc-schemas/lib/OWS_1_1_0'; const OWS_1_1_0 = OWS_1_1_0_Factory.OWS_1_1_0;
// import * as CSW_2_0_2_Factory_Full from 'ogc-schemas/lib/CSW_2_0_2_Full'; const CSW_2_0_2_Full = CSW_2_0_2_Factory_Full.CSW_2_0_2;
// import * as CSW_2_0_2_Factory_OWS from 'ogc-schemas/lib/CSW_2_0_2_OWS_1_0_0'; const CSW_2_0_2_OWS = CSW_2_0_2_Factory_OWS.CSW_2_0_2;
import { Injectable } from '@angular/core';
import { Jsonix } from '@michaellangbein/jsonix';
import { CswVersion, Element, CswCapabilitiesElement, CswDescribeRecordElement,
    CswDescribeRecordResponseElement, CswGetRecordByIdResponseElement, CswGetRecordByIdElement,
    CswGetRecordsElement, CswResultType, ExceptionReportType, CswGetRecordsResponseElement, CswElementAttributes, CswGetDomainElement, CswGetDomainResponseElement, CswElementSetName } from './cswdatatypes';
import { Observable } from 'rxjs';
import { delayedRetry } from '../wps/utils/polling';
import { share, map, tap } from 'rxjs/operators';




@Injectable()
export class CswClient {

    private version: CswVersion;
    private xmlMarshaller: any;
    private xmlUnmarshaller: any;

    constructor(
        private webClient: HttpClient
    ) {
        this.version = '2.0.2';
        const context = new Jsonix.Context([XHTML_1_0_Strict, XLink_1_0, DCT, DC_1_1, OWS_1_0_0, CSW_2_0_2]);
        this.xmlUnmarshaller = context.createUnmarshaller();
        this.xmlMarshaller = context.createMarshaller();
    }


    getCapabilities(url: string): Observable<CswCapabilitiesElement> {
        return this.get(`${url}?service=CSW&version=2.0.2&request=GetCapabilities`) as Observable<CswCapabilitiesElement>;
    }

    describeRecord(url: string): Observable<CswDescribeRecordResponseElement> {
        const body: CswDescribeRecordElement = {
            name: new CswElementAttributes('DescribeRecord'),
            value: {
                TYPE_NAME: 'CSW_2_0_2.DescribeRecordType',
                outputFormat: 'application/xml',
                service: 'CSW',
                version: '2.0.2',
                schemaLanguage: 'http://www.w3.org/2001/XMLSchema',
                typeName: [{
                    key: '{http://www.opengis.net/cat/csw/2.0.2}Record',
                    localPart: 'Record',
                    namespaceURI: 'http://www.opengis.net/cat/csw/2.0.2',
                    prefix: 'csw',
                    string: '{http://www.opengis.net/cat/csw/2.0.2}csw:Record'
                }]
            }
        };
        return this.post(url, body) as Observable<CswDescribeRecordResponseElement>;
    }

    getRecordById(url: string, ids: string[]): Observable<CswGetRecordByIdResponseElement> {
        const body: CswGetRecordByIdElement = {
            name: new CswElementAttributes('GetRecordById'),
            value: {
                TYPE_NAME: 'CSW_2_0_2.GetRecordByIdType',
                id: ids,
                outputFormat: 'application/xml',
                outputSchema: 'http://www.opengis.net/cat/csw/2.0.2',
                service: 'CSW',
                version: '2.0.2',
            }
        };
        return this.post(url, body) as Observable<CswGetRecordByIdResponseElement>;
    }


    getRecords( url: string, startPos: number = 1, count: number = 10,
                elementSetName: CswElementSetName = 'full', cqlString?: string): Observable<CswGetRecordsResponseElement> {

        const body: CswGetRecordsElement = {
            name: new CswElementAttributes('GetRecords'),
            value: {
                TYPE_NAME: 'CSW_2_0_2.GetRecordsType',
                service: 'CSW',
                version: '2.0.2',
                outputSchema: 'http://www.opengis.net/cat/csw/2.0.2',
                resultType: 'results',
                outputFormat: 'application/xml',
                startPosition: startPos,
                maxRecords: count,
                abstractQuery: {
                    name: new CswElementAttributes('Query'),
                    value: {
                        TYPE_NAME: 'CSW_2_0_2.QueryType',
                        typeNames: [new CswElementAttributes('Record')],
                        elementSetName: {
                            TYPE_NAME: 'CSW_2_0_2.ElementSetNameType',
                            typeNames: [new CswElementAttributes('Record')],
                            value: elementSetName
                        },
                        CONSTRAINTLANGUAGE: 'CQL_TEXT',
                        constraint: {
                            TYPE_NAME: 'CSW_2_0_2.QueryConstraintType',
                            version: '1.1.0',
                            cqlText: cqlString
                        }
                    }
                },
            }
        };
        return this.post(url, body) as Observable<CswGetRecordsResponseElement>;
    }

    getDomain(url: string, parameterName: string): Observable<CswGetDomainResponseElement> {
        const body: CswGetDomainElement = {
            name: new CswElementAttributes('GetDomain'),
            value: {
                TYPE_NAME: 'CSW_2_0_2.GetDomainType',
                service: 'CSW',
                version: '2.0.2',
                parameterName: parameterName
            }
        };
        return this.post(url, body) as Observable<CswGetDomainResponseElement>;
    }

    private post(url: string, body: any): Observable<Element> {
        const xmlBody = this.xmlMarshaller.marshalString(body);
        return this.unmarshalRequest(this.postRaw(url, xmlBody));
    }

    private get(url: string): Observable<Element> {
        return this.unmarshalRequest(this.getRaw(url));
    }

    private unmarshalRequest(req: Observable<string>): Observable<Element> {
        return req.pipe(
            map((xmlResponseBody: string) => {
                const jsonResponse = this.xmlUnmarshaller.unmarshalString(xmlResponseBody) as Element;
                return jsonResponse;
            }),
            tap((jsonResponse: Element) => {
                if (jsonResponse.name.localPart === 'ExceptionReport') {
                    const errorVal = jsonResponse.value as ExceptionReportType;
                    console.error(jsonResponse);
                    throw new Error(`${errorVal.exception[0].exceptionText}`);
                }
            })
        );
    }

    private postRaw(url: string, xmlBody: string): Observable<string> {
        const headers = {
            'Content-Type': 'text/xml',
            'Accept': 'text/xml, application/xml'
        };
        return this.webClient.post(url, xmlBody, { headers, responseType: 'text' }).pipe(
            delayedRetry(2000, 2),
            share()  // turning hot: to make sure that multiple subscribers don't cause multiple requests
        );
    }

    private getRaw(url: string): Observable<string> {
        const headers = {
            'Accept': 'text/xml, application/xml'
        };
        return this.webClient.get(url, { headers, responseType: 'text' }).pipe(
            delayedRetry(2000, 2),
            share()  // turning hot: to make sure that multiple subscribers don't cause multiple requests
        );
    }

    public unmarshal(xml: string): object {
        return this.xmlUnmarshaller.unmarshalString(xml);
    }

}
