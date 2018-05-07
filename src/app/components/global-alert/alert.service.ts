import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class AlertService {

  private alertSource = new Subject<string>();

  alert$ = this.alertSource.asObservable();

  alert(alert: string) {
    this.alertSource.next(alert);
  }
}