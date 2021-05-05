import { WmsClient } from '@dlr-eoc/utils-ogc';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


/**
 * This file exports a wrapper around @dlr-eoc/utils-ogc/Wms for backwards compatibility.
 * While the WMS functionality has been moved to utils-ogc, we still maintain this wrapper
 * so that older clients don't need to change their imports.
 */


export { WmsVersion } from '@dlr-eoc/utils-ogc';


@Injectable()
export class WmsService extends WmsClient {
    constructor(
        webClient: HttpClient,
    ) {
        super(webClient);
    }
}