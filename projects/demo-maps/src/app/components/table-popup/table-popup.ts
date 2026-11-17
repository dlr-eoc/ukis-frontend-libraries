import { KeyValuePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ClrDatagridModule, ClrPopoverHostDirective, ClrStopEscapePropagationDirective } from '@clr/angular';

@Component({
  imports: [ClrDatagridModule, ClrStopEscapePropagationDirective, ClrPopoverHostDirective, KeyValuePipe],
  selector: 'app-table-popup',
  styleUrl: './table-popup.scss',
  templateUrl: './table-popup.html',
})
export class TablePopup {
  data = input.required<any>();
}
