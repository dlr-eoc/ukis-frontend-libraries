declare module 'opensearch-browser' {
    export type OpenSearchService = any;
    export type OpenSearchUrl = any;
    export type OpenSearchDescription = any;
    export type SearchResult = any;
    export type OpenSearchResult = any;

    export function discover(url: string): Promise<any>
}


declare module 'opensearch-browser/dist/url' {
    export const OpenSearchUrl = {
        fromNode(node: Element): Promise<any>
    }

}

declare module 'opensearch-browser/dist/search' {
    export function search(url: OpenSearchUrl, paras: object, options: any): Promise<any>
}

export { };  // <- makes the file an ES module