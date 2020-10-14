import { WpsClient as WCBasic, WpsVersion, Cache } from '@dlr-eoc/utils-ogc';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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
