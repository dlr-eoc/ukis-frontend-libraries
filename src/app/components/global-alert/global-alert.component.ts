import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ukis-global-alert',
  templateUrl: './global-alert.component.html',
  styleUrls: ['./global-alert.component.css']
})
export class GlobalAlertComponent implements OnInit {

  constructor() {
  }

  @Input() alert: any;

  @Output() alertChange = new EventEmitter();

  close() {
    this.alert = null;
    this.alertChange.emit(this.alert);
  }

  ngOnInit() {
  }

}
