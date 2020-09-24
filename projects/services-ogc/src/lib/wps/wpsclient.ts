import { WpsMarshaller, WpsInput, WpsVerion, WpsResult, WpsOutputDescription, WpsData, WpsState,
    isWpsState, WpsDataDescription, WpsCapability, WpsProcessDescription } from './wps_datatypes';
import { WpsMarshaller100 } from './wps100/wps_marshaller_1.0.0';
import { WpsMarshaller200 } from './wps200/wps_marshaller_2.0.0';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap, share, mergeMap } from 'rxjs/operators';
import * as XLink_1_0_Factory from 'w3c-schemas/lib/XLink_1_0'; const XLink_1_0 = XLink_1_0_Factory.XLink_1_0;
import * as OWS_1_1_0_Factory from 'ogc-schemas/lib/OWS_1_1_0'; const OWS_1_1_0 = OWS_1_1_0_Factory.OWS_1_1_0;
import * as OWS_2_0_Factory from 'ogc-schemas/lib/OWS_2_0'; const OWS_2_0 = OWS_2_0_Factory.OWS_2_0;
import * as WPS_1_0_0_Factory from 'ogc-schemas/lib/WPS_1_0_0'; const WPS_1_0_0 = WPS_1_0_0_Factory.WPS_1_0_0;
import * as WPS_2_0_Factory from 'ogc-schemas/lib/WPS_2_0'; const WPS_2_0 = WPS_2_0_Factory.WPS_2_0;
import { pollUntil, delayedRetry } from './utils/polling';
import { Jsonix } from '@michaellangbein/jsonix';
import { Cache, FakeCache } from './cache';
import { Injectable, Inject } from '@angular/core';


export interface WpsHttpClientRequestParameters {
    headers?: object;
    [key: string]: any;
}

/**
 * This library attempts to be largely independent of angular. 
 * As such, we allow other http-clients than @angular/http.
 */
export interface WpsHttpClient {
    get(url: string, paras?: WpsHttpClientRequestParameters): Observable<string>;
    post(url: string, body: string, paras?: WpsHttpClientRequestParameters): Observable<string>;
}


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
    private xmlmarshaller: any;
    private xmlunmarshaller: any;
    private wpsmarshaller: WpsMarshaller;
    private cache: Cache = new FakeCache();

    constructor(
        version: WpsVerion = '1.0.0',
        private webclient: WpsHttpClient,
        cache?: Cache
    ) {
        this.version = version;
        if (cache) this.cache = cache;
        let context;
        if (this.version === '1.0.0') {
            this.wpsmarshaller = new WpsMarshaller100();
            context = new Jsonix.Context([XLink_1_0, OWS_1_1_0, WPS_1_0_0]);
        } else if (this.version === '2.0.0') {
            this.wpsmarshaller = new WpsMarshaller200();
            context = new Jsonix.Context([XLink_1_0, OWS_2_0, WPS_2_0]);
        } else {
            throw new Error('You entered a WPS version other than 1.0.0 or 2.0.0.');
        }
        this.xmlunmarshaller = context.createUnmarshaller();
        this.xmlmarshaller = context.createMarshaller();
    }


    getCapabilities(url: string): Observable<WpsCapability[]> {
        const getCapabilitiesUrl = this.wpsmarshaller.getCapabilitiesUrl(url);
        return this.getRaw(getCapabilitiesUrl).pipe(
            map((response: any) => {
                const responseJson = this.xmlunmarshaller.unmarshalString(response);
                return this.wpsmarshaller.unmarshalCapabilities(responseJson.value);
            }) // @TODO: handle case when instead of WpsCapabilites an ExceptionReport is returned
        );
    }


    describeProcess(url: string, processId: string): Observable<WpsProcessDescription> {
        const describeProcessUrl = this.wpsmarshaller.getDescribeProcessUrl(url, processId);
        return this.getRaw(describeProcessUrl).pipe(
            map((response: any) => {
                const responseJson = this.xmlunmarshaller.unmarshalString(response);
                return this.wpsmarshaller.unmarshalProcessDescription(responseJson.value);
            })
        );
    }


    executeAsync(url: string, processId: string, inputs: WpsInput[], outputs: WpsOutputDescription[],
        pollingRate: number = 1000, tapFunction?: (response: WpsState | null) => any): Observable<WpsResult[]> {

        const executeRequest$: Observable<WpsState> = this.executeAsyncS(url, processId, inputs, outputs);

        const query$ = executeRequest$.pipe(

            // poll until suceeded
            mergeMap((currentState: WpsState) => {
                const nextState$: Observable<WpsState> = this.getNextState(currentState, url, processId, inputs, outputs);

                const poll$: Observable<WpsState> = pollUntil<WpsState>(
                    nextState$,
                    (response: WpsState) => {
                        if (response.status === 'Failed') {
                            throw new Error(`Error during execution of process ${processId}: ` + response.statusLocation);
                        }
                        return response.status === 'Succeeded';
                    },
                    tapFunction,
                    pollingRate
                );

                return poll$;
            }),

            // fetch results
            mergeMap((lastState: WpsState) => {
                return this.fetchResults(lastState, url, processId, inputs, outputs);
            }),

            // In case of errors:
            tap((response: WpsData[]) => {
                for (const result of response) {
                    if (result.description.type === 'error') {
                        console.log('server responded with 200, but body contained an error-result: ', result);
                        throw new Error(result.value);
                    }
                }
            })
        );

        return this.cachedQuery(url, processId, inputs, outputs, query$);
    }

    private cachedQuery(url: string, processId: string, inputs: WpsInput[],
        outputs: WpsOutputDescription[], query$: Observable<WpsData[]>): Observable<WpsData[]> {

        const cachedResponse$: Observable<WpsResult[] | null> = this.cache.get({url, processId, inputs, outputs});
        return cachedResponse$.pipe(
            switchMap((results) => {
                if (results) {
                    return of(results);
                } else {
                    return query$.pipe(
                        tap((response: WpsData[]) => {
                            this.cache.set({url, processId, inputs, outputs}, response).subscribe(success => {
                                console.log('set data in cache', success);
                            });
                        })
                    );
                }
            })
        );
    }

    private getNextState(currentState: WpsState, serverUrl: string, processId: string, inputs: WpsInput[],
        outputDescriptions: WpsOutputDescription[]): Observable<WpsState> {

        let request$: Observable<string>;
        if (this.version === '1.0.0') {

            if (!currentState.statusLocation) {
                throw Error('No status location');
            }
            request$ = this.getRaw(currentState.statusLocation);

        } else if (this.version === '2.0.0') {

            if (!currentState.jobID) {
                throw Error('No job-Id');
            }
            const execbody = this.wpsmarshaller.marshallGetStatusBody(serverUrl, processId, currentState.jobID);
            const xmlExecbody = this.xmlmarshaller.marshalString(execbody);

            request$ = this.postRaw(serverUrl, xmlExecbody);

        } else {
            throw new Error(`'GetStatus' has not yet been implemented for this WPS-Version (${this.version}).`);
        }

        const request1$: Observable<WpsState> = request$.pipe(
            delayedRetry(2000, 2),
            map((xmlResponse: string) => {
                const jsonResponse = this.xmlunmarshaller.unmarshalString(xmlResponse);
                const output: WpsData[] | WpsState =
                    this.wpsmarshaller.unmarshalGetStateResponse(jsonResponse, serverUrl, processId, inputs, outputDescriptions);
                return output;
            })
        );

        return request1$;
    }

    private fetchResults(lastState: WpsState, serverUrl: string, processId: string, inputs: WpsInput[],
        outputDescriptions: WpsOutputDescription[]): Observable<WpsData[]> {

        if (lastState.results) { // WPS 1.0: results should already be in last state
            return of(lastState.results);
        } else { // WPS 2.0: get results with post request

            if (!lastState.jobID) {
                throw new Error(`You want me to get a result, but I can't find a jobId. I don't know what to do now!`);
            }

            const execBody = this.wpsmarshaller.marshallGetResultBody(serverUrl, processId, lastState.jobID);
            const xmlExecBody = this.xmlmarshaller.marshalString(execBody);

            return this.postRaw(serverUrl, xmlExecBody).pipe(
                map((xmlResponse: string) => {
                    const jsonResponse = this.xmlunmarshaller.unmarshalString(xmlResponse);
                    const output = this.wpsmarshaller.unmarshalSyncExecuteResponse(jsonResponse, serverUrl, processId, inputs, outputDescriptions);
                    return output;
                }),
            );
        }
    }


    private executeAsyncS(url: string, processId: string, inputs: WpsInput[],
        outputDescriptions: WpsOutputDescription[]): Observable<WpsState> {

        const executeUrl = this.wpsmarshaller.executeUrl(url, processId);
        const execbody = this.wpsmarshaller.marshalExecBody(processId, inputs, outputDescriptions, true);
        const xmlExecbody = this.xmlmarshaller.marshalString(execbody);

        return this.postRaw(executeUrl, xmlExecbody).pipe(
            map((xmlResponse: string) => {
                const jsonResponse = this.xmlunmarshaller.unmarshalString(xmlResponse);
                const output: WpsState =
                    this.wpsmarshaller.unmarshalAsyncExecuteResponse(jsonResponse, url, processId, inputs, outputDescriptions);
                return output;
            })
        );
    }

    execute(url: string, processId: string, inputs: WpsInput[],
        outputDescriptions: WpsOutputDescription[]): Observable<WpsResult[]> {

        const executeUrl = this.wpsmarshaller.executeUrl(url, processId);
        const execbody = this.wpsmarshaller.marshalExecBody(processId, inputs, outputDescriptions, false);
        const xmlExecbody = this.xmlmarshaller.marshalString(execbody);

        return this.postRaw(executeUrl, xmlExecbody).pipe(
            map((xmlResponse: string) => {
                const jsonResponse = this.xmlunmarshaller.unmarshalString(xmlResponse);
                const output: WpsData[] =
                    this.wpsmarshaller.unmarshalSyncExecuteResponse(jsonResponse, url, processId, inputs, outputDescriptions);
                return output;
            })
        );
    }

    dismiss(serverUrl: string, processId: string, jobId: string): Observable<any> {

        const dismissUrl = this.wpsmarshaller.dismissUrl(serverUrl, processId, jobId);
        const dismissBody = this.wpsmarshaller.marshalDismissBody(jobId);
        const xmlDismissBody = this.xmlmarshaller.marshalString(dismissBody);

        return this.postRaw(dismissUrl, xmlDismissBody).pipe(
            map((xmlResponse: string) => {
                const jsonResponse = this.xmlunmarshaller.unmarshalString(xmlResponse);
                const output = this.wpsmarshaller.unmarshalDismissResponse(jsonResponse, serverUrl, processId);
                return output;
            })
        );
    }

    postRaw(url: string, xmlBody: string): Observable<string> {
        const paras = {
            headers: {
                'Content-Type': 'text/xml',
                'Accept': 'text/xml, application/xml'
            },
            responseType: 'text'
        };
        return this.webclient.post(url, xmlBody, paras).pipe(
            delayedRetry(2000, 2),
            share()  // turning hot: to make sure that multiple subscribers dont cause multiple requests
        );
    }

    getRaw(url: string): Observable<string> {
        const paras = {
            headers: {
                'Accept': 'text/xml, application/xml'
            },
            responseType: 'text'
        };
        return this.webclient.get(url, paras).pipe(
            delayedRetry(2000, 2)
        );
    }

    /**
     * Use this method if you want to set the caching mechanism on a client-level
     * (as opposed to on a app-wide level)
     * @param cache : Cache (@dlr-eoc/services-ogc)
     */
    setCache(cache: Cache): void {
        this.cache = cache;
    }
}
