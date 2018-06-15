import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSource = new Subject<string>();
  alert$ = this.alertSource.asObservable();
  constructor() { }
  alert(alert: string) {
    this.alertSource.next(alert);
  }
}
