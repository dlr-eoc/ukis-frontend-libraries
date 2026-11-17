import { inject, Service } from '@angular/core';
import { WmsClient } from '@dlr-eoc/utils-ogc';
import { HttpClient } from '@angular/common/http';


/**
 * This file exports a wrapper around @dlr-eoc/utils-ogc/Wms for backwards compatibility.
 * While the WMS functionality has been moved to utils-ogc, we still maintain this wrapper
 * so that older clients don't need to change their imports.
 */


export type { WmsVersion } from '@dlr-eoc/utils-ogc';


@Service()
export class WmsService extends WmsClient {
    constructor(
    ) {
        super(inject(HttpClient));
    }
}
