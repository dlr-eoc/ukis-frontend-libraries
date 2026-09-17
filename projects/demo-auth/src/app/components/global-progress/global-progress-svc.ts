import { Service, signal } from '@angular/core';

export interface IProgress {
  value?: number;
  max?: number;
  class?: string;
  indeterminate?: boolean;
}

@Service()
export class ProgressService {
  public progress = signal<IProgress| null>(null)
  constructor() { }
}
