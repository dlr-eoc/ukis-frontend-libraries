import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ukis-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input('ukis-title') title: string;
  constructor() { }

  ngOnInit() {
  }

}
