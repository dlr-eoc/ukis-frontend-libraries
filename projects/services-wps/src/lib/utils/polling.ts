import { Observable, timer } from "rxjs";
import { switchMap, tap, filter, take } from "rxjs/operators";


export const poll = (request: Observable<any>, interval: number): Observable<any> => {
    return timer(0, interval).pipe(
        switchMap(() => request)
    );
};

export const doUntil = (action: Observable<any>, predicate: (result: any) => boolean, tapFunc?: (result: any) => void): Observable<any> => {
    return action.pipe(
        tap(tapFunc),
        filter(result => {
            return predicate(result)
        }),
        take(1)
    );
};

export const pollUntil = (request: Observable<any>, interval: number, predicate: (result: any) => boolean, tapFunc?: (result: any) => void): Observable<any> => {
    return doUntil(
        poll(request, interval), 
        predicate, 
        tapFunc
    );
};


export const doAfter = (observable: Observable<any>, callback: (result: any) => Observable<any>): Observable<any> => {
    return observable.pipe(
        switchMap(callback)
    )
}



//   const firstRequest = this.http.get("https://swapi.co/api/people/1");

//   const timeRequest = this.http.get("http://worldclockapi.com/api/json/est/now");

//   doAfter(
//     firstRequest, 
//     (result) => doUntil(
//       poll(timeRequest, 1000),
//       (response) => { return response["currentFileTime"] % 6 == 0 },
//       (response) => console.log("got intermediate", response)
//     )
//   ).subscribe(response => {
//     console.log("got final result", response);
//   })