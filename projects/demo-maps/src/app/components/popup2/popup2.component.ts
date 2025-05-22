import { Component, Input, OnInit } from '@angular/core';
import { KeyValuePipe } from '@angular/common';

@Component({
    selector: 'app-popup2',
    templateUrl: './popup2.component.html',
    styleUrls: ['./popup2.component.scss'],
    imports: [KeyValuePipe]
})
export class Popup2Component implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
