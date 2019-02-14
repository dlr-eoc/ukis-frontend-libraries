import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ukis-route-legal-notice',
  templateUrl: './route-legal-notice.component.html',
  styleUrls: ['./route-legal-notice.component.scss'],
  host: {
    "[class.content-container]": "true"
  }
})
export class RouteLegalNoticeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
