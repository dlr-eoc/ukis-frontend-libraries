import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface IProgress {
  value?: number;
  max?: number;
  class?: string;
  indeterminate?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private progressSource = new Subject<IProgress>();
  progress$ = this.progressSource.asObservable();
  constructor() { }
  progress(progress: IProgress) {
    this.progressSource.next(progress);
  }
}
