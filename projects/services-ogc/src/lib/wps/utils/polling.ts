import { Observable, timer, of, forkJoin } from 'rxjs';
import { tap, map, mergeMap, retryWhen, delay } from 'rxjs/operators';




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

  const requestTakesAtLeast$: Observable<T> = forkJoin(tappedTask$, timer(minWaitTime)).pipe(
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
  let attempts = 1;

  return (src$: Observable<any>) => {
    return src$.pipe(
      // If an error occurs ...
      retryWhen((error$: Observable<any>) => {
        return error$.pipe(
          delay(delayMs), // <- in any case, first wait a little while ...
          mergeMap((error: any) => {
            if (error.status && error.status === 400) {
              // In case of a server error, repeating won't help.
              throw error;
            } else if (attempts <= maxRetries) {
              console.log('http-error. Retrying ...');
              attempts += 1;
              return of(error); // <- an observable causes request to be retried
            } else {
              console.log(`Persistent http-errors after ${attempts} attempts. Giving up.`);
              throw error; // an error causes request to be given up on.
            }
          })
        );
      })
    );
  };

}
