import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-route-user',
  templateUrl: './route-user.component.html',
  styleUrls: ['./route-user.component.scss']
})
export class RouteUserComponent implements OnInit {
  @HostBinding('class') class = 'content-container';
  constructor() { }

  ngOnInit() {
  }

}
