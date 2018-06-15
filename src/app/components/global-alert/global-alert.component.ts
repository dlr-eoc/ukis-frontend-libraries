import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ukis-global-alert',
  templateUrl: './global-alert.component.html',
  styleUrls: ['./global-alert.component.scss']
})
export class GlobalAlertComponent implements OnInit {
  @Input() alert: any;
  @Output() alertChange = new EventEmitter();
  constructor() { }

  close() {
    this.alert = null;
    this.alertChange.emit(this.alert);
  }

  ngOnInit() {
  }

}
