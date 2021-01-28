import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-table-popup',
  templateUrl: './table-popup.component.html',
  styleUrls: ['./table-popup.component.scss']
})
export class TablePopupComponent implements OnInit, AfterViewChecked {

  @Input() data: any;
  public id = Math.random() * 1000000;

  constructor() {
    console.log(`table-popup constructed with id ${this.id}`);
  }

  ngAfterViewChecked(): void {
    console.log(`checking table-popup with id ${this.id}`);
  }

  ngOnInit(): void {
    console.log(`table-popup on-init with id ${this.id}`);
  }

}
