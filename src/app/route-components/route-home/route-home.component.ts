import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ukis-route-home',
  templateUrl: './route-home.component.html',
  styleUrls: ['./route-home.component.scss'],
  host: {
    "[class.content-container]": "true"
  }
})
export class RouteHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
