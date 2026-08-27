import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { KeyValuePipe } from '@angular/common';

@Component({
    selector: 'app-popup2',
    templateUrl: './popup2.component.html',
    styleUrls: ['./popup2.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [KeyValuePipe]
})
export class Popup2Component implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
