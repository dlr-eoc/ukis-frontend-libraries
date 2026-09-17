import { Component, model } from '@angular/core';
import { IAlert } from './global-alert-svc';

import { ClarityIcons, infoCircleIcon, windowCloseIcon } from '@clr/angular/icon';
import { NgClass } from '@angular/common';
import { ClrIcon, ClrAlertModule } from '@clr/angular';
ClarityIcons.addIcons(...[infoCircleIcon, windowCloseIcon]);

@Component({
  selector: 'ngx-ukis-global-alert',
  styleUrl: './global-alert.scss',
  templateUrl: './global-alert.html',
  imports: [NgClass, ClrIcon, ClrAlertModule]
})
export class GlobalAlertComponent {
  alert = model.required<null | IAlert>();
  constructor() { }

  close() {
    this.alert.set(null);
  }

}
