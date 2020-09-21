import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export class PollableServer {

    private callCount = 0;

    constructor(private maxCallCount: number, private waitResponse: string, private finalResponse: string) { }

    public call(): Observable<string> {
      return of('1').pipe(
        map(_ => {
          console.log(`server queried. current call count: ${this.callCount}`);
          let out;
          if (this.callCount <= this.maxCallCount) {
            out = this.waitResponse;
          } else {
            out = this.finalResponse;
          }
          this.callCount += 1;
          return out;
        })
      );
    }
}
