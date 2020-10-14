import { WpsData } from './wps_datatypes';
import { Observable, of } from 'rxjs';


export interface Cache {
    set(input: any, output: any): Observable<any>;
    get(input: any): Observable<any>;
}

export class FakeCache implements Cache {
    set(input: object, output: WpsData[]): Observable<boolean> {
        return of(true);
    }

    get(input: object): Observable<WpsData[] | null> {
        return of(null);
    }
}
