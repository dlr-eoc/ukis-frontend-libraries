import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ukis-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input('ukis-title') title: string = '';
  constructor() { }

  ngOnInit() {
  }

}
