import { Component, OnInit, Input } from '@angular/core';
import { ClrDatagridModule, ClrStopEscapePropagationDirective, ClrPopoverHostDirective } from '@clr/angular';
import { NgFor, KeyValuePipe } from '@angular/common';

@Component({
    selector: 'app-table-popup',
    templateUrl: './table-popup.component.html',
    styleUrls: ['./table-popup.component.scss'],
    standalone: true,
    imports: [ClrDatagridModule, NgFor, ClrStopEscapePropagationDirective, ClrPopoverHostDirective, KeyValuePipe]
})
export class TablePopupComponent implements OnInit {

  @Input() data: any;

  constructor() {
  }

  ngOnInit(): void {}
}
