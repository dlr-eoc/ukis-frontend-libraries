import { WpsClient as WCBasic, WpsVersion, Cache } from '@dlr-eoc/utils-ogc';
import { Service, Inject, inject, HostAttributeToken, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';


/**
 * This file exports a wrapper around @dlr-eoc/utils-ogc/Wps for backwards compatibility.
 * While the WPS functionality has been moved to utils-ogc, we still maintain this wrapper
 * so that older clients don't need to change their imports.
 */


export type { Cache, FakeCache } from '@dlr-eoc/utils-ogc';
export type { WpsDataDescription, WpsInputDescription, WpsOutputDescription, WpsData, WpsInput, WpsResult,
    WpsBboxDescription, WpsBboxValue, WpsBboxData, WpsVersion, WpsDataFormat,
    WpsState, WpsCapability, WpsProcessDescription, WpsServerDescription, WpsMarshaller } from '@dlr-eoc/utils-ogc';


@Service()
export class WpsClient extends WCBasic {
    constructor() {
        const WPS_VERSION = new InjectionToken<WpsVersion>('WPS_VERSION',{
            factory: () => '1.0.0'
        });
        const WPS_CACHE   = new InjectionToken<Cache>('WPS_CACHE');
        super(inject(WPS_VERSION), inject(HttpClient), inject(WPS_CACHE,{optional:true}) as never);
    }
}
