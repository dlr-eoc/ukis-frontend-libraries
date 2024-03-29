import { Observable, timer, of, forkJoin } from 'rxjs';
import { tap, map, mergeMap, retry } from 'rxjs/operators';




export function pollUntil<T>(
  task$: Observable<T>, predicate: (results: any) => boolean, doWhile?: (t: T | null) => any, minWaitTime: number = 1000): Observable<T> {

  if (doWhile) {
    doWhile(null);
  }

  const tappedTask$: Observable<T> = task$.pipe(
    tap((r: any) => {
      if (doWhile) {
        doWhile(r);
      }
    })
  );

  const requestTakesAtLeast$: Observable<T> = forkJoin([tappedTask$, timer(minWaitTime)]).pipe(
    map(r => r[0])
  );

  const polledRequest$: Observable<T> = requestTakesAtLeast$.pipe(
    mergeMap((response: any) => {
      if (predicate(response)) {
        // console.log(`obtained correct answer ${response}`);
        return of(response);
      } else {
        // console.log(`obtained false answer ${response}. trying again...`);
        return polledRequest$;
      }
    })
  );

  return polledRequest$;
}


export function delayedRetry(delayMs: number, maxRetries = 3) {
  return (src$: Observable<any>) => {
    return src$.pipe(
      // If an error occurs ...
      retry({
        count: maxRetries, delay: (error: any, retryCount: number) => {
          if (error.status && error.status === 400) {
            // In case of a server error, repeating won't help.
            throw error;
          } else if (retryCount <= maxRetries) {
            console.log('http-error. Retrying ...');
            return timer(delayMs); // Adding a timer from RxJS to return observable to delay param.
          } else {
            console.log(`Persistent http-errors after ${retryCount} attempts. Giving up.`);
            throw error; // an error causes request to be given up on.
          }
        }
      })
    );
  };
}