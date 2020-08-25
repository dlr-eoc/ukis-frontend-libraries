import { Injectable } from '@angular/core';
import { discover, OpenSearchService, OpenSearchUrl, OpenSearchDescription, SearchResult } from 'opensearch-browser';
import { OpenSearchUrl as OSUO } from 'opensearch-browser/dist/url';
import { search } from 'opensearch-browser/dist/search';
import { Observable, from } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class OpensearchWrapperService {

    /**
     * Reads a description document
     */
    discover(osServerDescriptionUrl: string): Observable<OpenSearchService> {
        const instancePromise = discover(osServerDescriptionUrl);
        return from(instancePromise);
    }

    /**
     * To be called with the results of `discover`.
     * Returns the urls that can be queried with opensearch.
     */
    getUrls(instance: OpenSearchService): OpenSearchUrl[] {
        // do *not* call `getUrls`, because that filters the urls to only contain those with `rel === 'results'`;
        return instance.getDescription().urls;
    }

    /**
     * You might not want to discover a services description document online every time.
     * Instead, you can copy the description-document's relevant URL-node as a string and let it be parsed with this method.
     */
    stringToUrl(domNodeString: string): OpenSearchUrl {
        // const node: Element = (new DOMParser()).parseFromString(domNodeString, 'text/xml').children[0];
        const node: Element = document.createRange().createContextualFragment(domNodeString).children[0];
        return OSUO.fromNode(node);
    }

    /**
     * To be called with the one of the results of `getUrls`.
     * Searches a url with the given parameters.
     */
    search(url: OpenSearchUrl, paras: object): Observable<SearchResult | Response> {
        const resultPromise = search(url, paras, {
            dropEmptyParameters: true,
            type: url.type
        });
        return from(resultPromise);
    }

    getDescription(instance: OpenSearchService): Observable<OpenSearchDescription> {
        return instance.getDescription();
    }


}

