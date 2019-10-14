import { Observable, timer, of, forkJoin } from 'rxjs';
import { tap, map, mergeMap } from 'rxjs/operators';
import { Predicate } from '@angular/core';




export function pollEveryUntil<T>(
    task$: Observable<T>, predicate: Predicate<T>, doWhile?: (t: T | null) => any, minWaitTime: number = 1000): Observable<T> {

    if (doWhile) {
        doWhile(null);
    }

    const tappedTask$ = task$.pipe(
        tap(r => {
            if (doWhile) {
                doWhile(r);
            }
        })
    );

    const requestTakesAtLeast$ = forkJoin({req: tappedTask$, timer: timer(minWaitTime)}).pipe(
        map(r => r.req)
    );

    const polledRequest$ = requestTakesAtLeast$.pipe(
        mergeMap(response => {
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
