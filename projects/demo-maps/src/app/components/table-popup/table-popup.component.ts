import { Component, OnInit, Input, AfterViewChecked, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-table-popup',
  templateUrl: './table-popup.component.html',
  styleUrls: ['./table-popup.component.scss']
})
export class TablePopupComponent implements OnInit, AfterViewChecked, OnDestroy {

  @Input() data: any;
  public id: number;

  constructor() {
    this.id = Math.random() * 1000000;
    console.log(`table-popup constructed with id ${this.id}`);
  }

  ngOnInit(): void {
    // console.log(`table-popup on-init with id ${this.id}`);
  }

  ngAfterViewChecked(): void {
    console.log(`checking table-popup with id ${this.id}`);
  }

  ngOnDestroy(): void {
    console.log(`destroying table-popup with id ${this.id}`);
  }
}
