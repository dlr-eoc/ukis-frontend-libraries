import { Injectable } from '@angular/core';
import { discover, OpenSearchService } from 'opensearch-browser';
import { of, Observable, from } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';

/**
 * @TODO: create Record-Type on the fly using XSD schema.
 * https://stackoverflow.com/questions/52055212/convert-xsd-to-typescript
 */



export interface ServiceUrl {
    _type?: any;
    _url?: string;
    _method?: any;
    _enctype?: any;
    _indexOffset?: number;
    _pageOffset?: number;
    _relations?: any;
    _parameters?: any;
    _parametersByName?: any;
    _parametersByType?: any;
    _multiParameters?: any;
}

export interface ServiceImage {
    height?: number;
    width?: number;
    type?: string;
    url?: string;
}

export interface ServiceDescription {
    shortName?: string;
    longName?: string;
    description?: string;
    tags?: string | string[];
    contact?: string;
    urls?: ServiceUrl[];
    images?: ServiceImage[];
    queries?: any[];
    developer?: string;
    attribution?: string;
    syndicationRight?: string;
    adultContent?: string;
    language?: string;
    outputEncoding?: string;
    inputEncoding?: string;
}


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
     * @param {string} url The opensearch-server's url
     * @param {SearchParameters} parameters
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
    search(url: string, parameters: SearchParameters, options = {
        // type: 'application/atom+xml',
    }): Observable<SearchResult> {
        return this.getServiceInstance(url).pipe(
            switchMap((service: OpenSearchService) => {
                return from(service.search(parameters, options)) as Observable<SearchResult>;
            })
        );
    }

    getDescription(url: string): Observable<ServiceDescription> {
        return this.getServiceInstance(url).pipe(
            map((service) => {
                return service.getDescription();
            })
        );
    }

    getServiceInstance(url: string): Observable<OpenSearchService> {
        return from(discover(url));
    }

}

