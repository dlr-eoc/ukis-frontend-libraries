import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  private showFooter = new Subject<boolean>();
  footer$ = this.showFooter.asObservable();
  constructor() { }
  show(show: boolean) {
    this.showFooter.next(show);
  }
}
