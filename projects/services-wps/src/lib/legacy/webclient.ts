import "isomorphic-fetch";
import { Observable, of, from } from "rxjs";
import { tap, map } from "rxjs/operators";

export class Webclient {

    get(url: string): Observable<string> {
        return from(fetch(url).then(
            response => response.text()
        ));
    }

    post(url: string, data: string): Observable<any> {
          return from(fetch(url, {
              method: "POST", 
              body: data,
          })
          .then(response => response.text()));
      }
    
}