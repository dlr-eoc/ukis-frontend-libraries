import { WpsMarshaller, WpsInput, WpsVerion, WpsResult, WpsOutputDescription, WpsData, WpsState, isWpsState } from './wps_datatypes';
import { WpsMarshaller100 } from './wps100/wps_marshaller_1.0.0';
import { WpsMarshaller200 } from './wps200/wps_marshaller_2.0.0';
import { Cache } from './utils/cache';
import { Observable, timer, of, throwError } from 'rxjs';
import { map, catchError, switchMap, tap, share, mergeMap, first } from 'rxjs/operators';
import { Jsonix } from '@boundlessgeo/jsonix';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as XLink_1_0_Factory from 'w3c-schemas/lib/XLink_1_0'; const XLink_1_0 = XLink_1_0_Factory.XLink_1_0;
import * as OWS_1_1_0_Factory from 'ogc-schemas/lib/OWS_1_1_0'; const OWS_1_1_0 = OWS_1_1_0_Factory.OWS_1_1_0;
import * as OWS_2_0_Factory from 'ogc-schemas/lib/OWS_2_0'; const OWS_2_0 = OWS_2_0_Factory.OWS_2_0;
import * as WPS_1_0_0_Factory from 'ogc-schemas/lib/WPS_1_0_0'; const WPS_1_0_0 = WPS_1_0_0_Factory.WPS_1_0_0;
import * as WPS_2_0_Factory from 'ogc-schemas/lib/WPS_2_0'; const WPS_2_0 = WPS_2_0_Factory.WPS_2_0;
import { pollEveryUntil, delayedRetry } from './utils/polling';
import { Injectable, Inject } from '@angular/core';



/**
 * The Wps-client abstracts away the differences between Wps1.0.0 and Wps2.0.0
 * There are two layers of marshalling:
 *  - the Wps-marshaller marshals user-facing data to wps-specific types
 *  - Jsonix marshals wps-specific data to xml.
 * user-facing data -> wpsmarshaller -> Wps-type-specific data -> Jsonix-marhsaller -> XML ->
 * -> webclient -> WPS -> XML -> Jsonix-unmarshaller -> Wps-type-specific data -> wpsmarshaller -> user-facing data
 */
@Injectable()
export class WpsClient {

    private version: WpsVerion;
    private xmlmarshaller;
    private xmlunmarshaller;
    private wpsmarshaller: WpsMarshaller;
    private cache: Cache;


    constructor(
        @Inject('WpsVersion') version: WpsVerion = '1.0.0',
        private webclient: HttpClient,
        @Inject('wpsCaching') private caching = false
    ) {
        this.cache = new Cache();
        this.version = version;
        let context;
        if (this.version === '1.0.0') {
            this.wpsmarshaller = new WpsMarshaller100();
            context = new Jsonix.Context([XLink_1_0, OWS_1_1_0, WPS_1_0_0]);
        } else if (this.version === '2.0.0') {
            this.wpsmarshaller = new WpsMarshaller200();
            context = new Jsonix.Context([XLink_1_0, OWS_2_0, WPS_2_0]);
        }
        this.xmlunmarshaller = context.createUnmarshaller();
        this.xmlmarshaller = context.createMarshaller();
    }


    getCapabilities(url: string): Observable<any> {
        const getCapabilitiesUrl = this.wpsmarshaller.getCapabilitiesUrl(url);
        const headers = new HttpHeaders({
            'Accept': 'text/xml, application/xml'
        });
        return this.webclient.get(getCapabilitiesUrl, { headers, responseType: 'text' }).pipe(
            delayedRetry(2000, 2),
            map(response => {
                return this.xmlunmarshaller.unmarshalString(response);
            }),
            map(responseJson => {
                return this.wpsmarshaller.unmarshalCapabilities(responseJson.value);
            }) // @TODO: handle case when instead of WpsCapabilites an ExceptionReport is returned
        );
    }


    describeProcess(processId: string): Observable<any> {
        throw new Error('Not implemented yet');
    }


    executeAsync(url: string, processId: string, inputs: WpsInput[], outputs: WpsOutputDescription[],
                 pollingRate: number = 1000, tapFunction?: (response: any) => void): Observable<WpsResult[]> {

        const executeRequest = this.execute(url, processId, inputs, outputs, true);

        const cacheKey = this.cache.makeKey({url, id: processId, inputs, outputs});
        if (this.caching)  {
            const cachedResponse = this.cache.get(cacheKey);
            if (cachedResponse) {
                console.log('found data in cache.');
                return of(cachedResponse);
            }
        }

        return executeRequest.pipe(

            // poll until results
            mergeMap((executeResponse: WpsData[]) => {

                const firstState: WpsState = executeResponse[0].value;
                const resultsOrState$: Observable<WpsData[] | WpsState> =
                    this.getResultsOrState(url, processId, firstState, inputs, outputs);

                return pollEveryUntil(
                    resultsOrState$,
                    (response: WpsData[] | WpsState) => {
                        return (!isWpsState(response));
                    },
                    tapFunction,
                    pollingRate
                );
            }),

            // In case of errors:
            tap((response: WpsResult[]) => {
                for (const result of response) {
                    if (result.description.type === 'error') {
                        console.log('server responded with 200, but body contained an error-result: ', result);
                        throw new Error(result.value);
                    }
                }
            }),

            // caching
            tap((response: WpsResult[]) => {
                if (this.caching) {
                    console.log('storing data in cache.');
                    try {
                        this.cache.set(cacheKey, response);
                    } catch (error) {
                        console.error(error);
                    }
                }
            }),
        );

    }



    execute(url: string, processId: string, inputs: WpsInput[],
            outputDescriptions: WpsOutputDescription[], async: boolean): Observable<WpsResult[]> {

        const executeUrl = this.wpsmarshaller.executeUrl(url, processId);
        const execbody = this.wpsmarshaller.marshalExecBody(processId, inputs, outputDescriptions, async);
        const xmlExecbody = this.xmlmarshaller.marshalString(execbody);

        const headers = new HttpHeaders({
            'Content-Type': 'text/xml',
            'Accept': 'text/xml, application/xml'
        });
        return this.webclient.post(executeUrl, xmlExecbody, { headers, responseType: 'text' }).pipe(
            delayedRetry(2000, 2),
            map(xmlResponse => {
                const jsonResponse = this.xmlunmarshaller.unmarshalString(xmlResponse);
                const output = this.wpsmarshaller.unmarshalExecuteResponse(jsonResponse, url, processId, inputs, outputDescriptions);
                return output;
            }),
            share()  // turning hot: to make sure that multiple subscribers dont cause multiple requests
        );
    }

    private getResultsOrState(serverUrl: string, processId: string, lastState: WpsState, inputs: WpsInput[],
        outputDescriptions: WpsOutputDescription[]): Observable<WpsData[] | WpsState> {

        let request$;

        if (this.version === '1.0.0') {

            const headers = new HttpHeaders({
                'Accept': 'text/xml, application/xml'
            });
            request$ = this.webclient.get(lastState.statusLocation, {headers, responseType: 'text'});

        } else if (this.version === '2.0.0') {

            const execbody = this.wpsmarshaller.marshallGetStatusBody(serverUrl, processId, lastState.jobID);
            const xmlExecbody = this.xmlmarshaller.marshalString(execbody);
            const headers = new HttpHeaders({
                'Content-Type': 'text/xml',
                'Accept': 'text/xml, application/xml'
            });
            request$ = this.webclient.post(serverUrl, xmlExecbody, {headers, responseType: 'text'});

        } else {
            throw new Error(`'GetStatus' has not yet been implemented for this WPS-Version (${this.version}).`);
        }

        const request1$: Observable<WpsData[] | WpsState> = request$.pipe(
            delayedRetry(2000, 2),
            map( xmlResponse => {
                const jsonResponse = this.xmlunmarshaller.unmarshalString(xmlResponse);
                const output: WpsData[] | WpsState =
                    this.wpsmarshaller.unmarshalGetStateResponse(jsonResponse, serverUrl, processId, inputs, outputDescriptions);
                return output;
            })
        );

        // Wps2.0: does not fetch results immediately. Need to do this manually.
        let request2$;
        if (this.version === '2.0.0') {
            request2$ = request1$.pipe(

                switchMap((response: WpsState) => {
                    if (response.status !== 'Succeeded') {
                        return of(response);
                    }

                    const execBody = this.wpsmarshaller.marshallGetResultBody(serverUrl, processId, lastState.jobID);
                    const xmlExecBody = this.xmlmarshaller.marshalString(execBody);
                    const headers = new HttpHeaders({
                        'Content-Type': 'text/xml',
                        'Accept': 'text/xml, application/xml'
                    });
                    const result$ = this.webclient.post(serverUrl, xmlExecBody, {headers, responseType: 'text'});
                    return result$.pipe(
                        map(xmlResponse => {
                            const jsonResponse = this.xmlunmarshaller.unmarshalString(xmlResponse);
                            const output = this.wpsmarshaller.unmarshalExecuteResponse(jsonResponse, serverUrl, processId, inputs, outputDescriptions);
                            return output;
                        }),
                    );
                }),

            );
        } else {
            request2$ = request1$;
        }

        return request2$;
    }

    dismiss(processId: string): Observable<any> {
        throw new Error('Not implemented yet');
    }
}
