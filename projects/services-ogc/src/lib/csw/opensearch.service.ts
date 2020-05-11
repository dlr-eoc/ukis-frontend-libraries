import { Injectable } from '@angular/core';
import { discover, OpenSearchService } from 'opensearch-browser';
import { of, Observable, from } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';

/**
 * @TODO: create Record-Type on the fly using XSD schema.
 * https://stackoverflow.com/questions/52055212/convert-xsd-to-typescript
 */


export interface SearchParameters {
    searchTerms: string | string[];
    startIndex?: number;
}


export interface SearchResult {
    totalResults: number;
    startIndex: number;
    itemsPerPage: number;
    qery: object;
    links: any[];
    records: Record[];
}

export interface Record {
    id: string;
    properties: object;
}



@Injectable({
    providedIn: 'root'
})
export class OpensearchWrapperService {

    /**
     * Checks whether this URL is compatible with the given parameters
     * @param {object} parameters An object mapping the name or type to the value
     * @param {string} [options.type=null] The preferred transfer type.
     * @param {string} [options.method=null] The preferred HTTP method type.
     * @param {boolean} [options.raw=false] Whether the response shall be parsed or returned raw.
     * @param {number} [options.maxUrlLength=undefined] The maximum URL length. URLs longer than that
     *                                                  will result in errors.
     * @param {boolean} [options.dropEmptyParameters=false] Whether unused parameter keys shall
     *                                                      be dropped from the request.
     * @param {object} [options.parseOptions=undefined] Additional options for the format.
     * @param {object} [options.headers=undefined] Specific headers to send to the service.
     * @returns {Promise<array>|Promise<Response>} The search result as a Promise
     */
    search(url: string, parameters: SearchParameters, options = {}): Observable<Result> {
        return this.getServiceInstance(url).pipe(
            switchMap((service: OpenSearchService) => {
                return from(service.search(parameters, options));
            })
        );
    }

    getServiceInstance(url: string): Observable<OpenSearchService> {
        return from(discover(url));
    }

}

