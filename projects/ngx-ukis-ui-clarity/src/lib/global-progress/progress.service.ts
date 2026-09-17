import { Service } from '@angular/core';
import { Subject } from 'rxjs';

export interface IProgress {
  value?: number;
  max?: number;
  class?: string;
  indeterminate?: boolean;
}

@Service()
export class ProgressService {
  private progressSource = new Subject<IProgress>();
  progress$ = this.progressSource.asObservable();
  constructor() { }
  progress(progress: IProgress) {
    this.progressSource.next(progress);
  }
}
