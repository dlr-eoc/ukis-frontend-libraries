import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-popup',
  templateUrl: './table-popup.component.html',
  styleUrls: ['./table-popup.component.scss']
})
export class TablePopupComponent implements OnInit {

  @Input() data: any;

  constructor() {
  }

  ngOnInit(): void {}
}
