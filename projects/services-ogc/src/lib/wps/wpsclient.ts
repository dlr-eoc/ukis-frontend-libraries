import { WpsClient as WCBasic, WpsVersion, Cache } from '@dlr-eoc/utils-ogc';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


/**
 * This file exports a wrapper around @dlr-eoc/utils-ogc/Wps for backwards compatibility.
 * While the WPS functionality has been moved to utils-ogc, we still maintain this wrapper
 * so that older clients don't need to change their imports.
 */


export { Cache, FakeCache } from '@dlr-eoc/utils-ogc';
export { WpsDataDescription, WpsInputDescription, WpsOutputDescription, WpsData, WpsInput, WpsResult,
    WpsBboxDescription, WpsBboxValue, WpsBboxData, WpsVersion, WpsDataFormat,
    WpsState, WpsCapability, WpsProcessDescription, WpsServerDescription, WpsMarshaller } from '@dlr-eoc/utils-ogc';


@Injectable()
export class WpsClient extends WCBasic {
    constructor(
        @Inject('WPS_VERSION') version: WpsVersion = '1.0.0',
        private webClient: HttpClient,
        @Inject('WPS_CACHE') cache?: Cache
    ) {
        super(version, webClient, cache);
    }
}
