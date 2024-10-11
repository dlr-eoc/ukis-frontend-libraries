import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IAlert } from './alert.service';

import { ClarityIcons, infoCircleIcon, windowCloseIcon } from '@cds/core/icon';
import { NgIf, NgClass, NgFor } from '@angular/common';
import { ClrIconModule, ClrAlertModule } from '@clr/angular';
ClarityIcons.addIcons(...[infoCircleIcon, windowCloseIcon]);

@Component({
  selector: 'ukis-global-alert',
  templateUrl: './global-alert.component.html',
  styleUrls: ['./global-alert.component.scss'],
  standalone: true,
  imports: [NgIf, NgClass, ClrIconModule, ClrAlertModule, NgFor]
})
export class GlobalAlertComponent {
  @Input() alert!: null | IAlert;
  @Output() alertChange = new EventEmitter();
  constructor() { }

  close() {
    this.alert = null;
    this.alertChange.emit(this.alert);
  }

}
