import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-route-landingpage',
  templateUrl: './route-landingpage.component.html',
  styleUrls: ['./route-landingpage.component.css']
})
export class RouteLandingpageComponent implements OnInit {
  @HostBinding('class') class = 'content-container';
  constructor() { }

  ngOnInit() {
  }

}
