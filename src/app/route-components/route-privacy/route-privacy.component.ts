import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ukis-route-privacy',
  templateUrl: './route-privacy.component.html',
  styleUrls: ['./route-privacy.component.scss'],
  host: {
    "[class.content-container]": "true"
  }
})
export class RoutePrivacyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
