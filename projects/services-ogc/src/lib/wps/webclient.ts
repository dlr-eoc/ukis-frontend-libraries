import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Injector } from "@angular/core";
import { HttpClient, HttpXhrBackend, HttpHandler } from "@angular/common/http";


export class Webclient {
    
    get(url: string): Observable<any> {
        let promise = fetch(url).then(result => result.body);

        return of(promise);
    }

    post(url: string, body: string): Observable<any>  {
        let promise = fetch(url, {
            method: "post",
            body: body
        }).then(result => result.body);

        return of(promise);
    }

}
