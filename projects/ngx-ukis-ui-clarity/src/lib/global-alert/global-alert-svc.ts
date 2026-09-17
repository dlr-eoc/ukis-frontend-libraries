import { Service, signal } from '@angular/core';

export interface IAlert {
  type: string | 'info';
  text: string;
  closeable: boolean;
  actions?: { title: string, callback: () => void }[];
}

@Service()
export class AlertService {
  public alert = signal<IAlert| null>(null)
  constructor() { }
}
