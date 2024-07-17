import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IAlert } from './alert.service';

import { ClarityIcons, infoCircleIcon, windowCloseIcon} from '@cds/core/icon';
ClarityIcons.addIcons(...[infoCircleIcon, windowCloseIcon]);

@Component({
  selector: 'ukis-global-alert',
  templateUrl: './global-alert.component.html',
  styleUrls: ['./global-alert.component.scss']
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
