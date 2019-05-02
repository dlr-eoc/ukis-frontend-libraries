import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ukis-route-user',
  templateUrl: './route-user.component.html',
  styleUrls: ['./route-user.component.scss'],
  host: {
    "[class.content-container]": "true"
  }
})
export class RouteUserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
