import { Observable } from "rxjs";


export interface HttpClientRequestParameters {
    headers?: object;
    [key: string]: any;
}


export interface HttpClient {
    get(url: string, paras?: HttpClientRequestParameters): Observable<string>;
    post(url: string, body: string, paras?: HttpClientRequestParameters): Observable<string>;
}