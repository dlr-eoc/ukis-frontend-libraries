import { Component, OnInit, HostBinding } from '@angular/core';
import { UserDetailsComponent } from '@dlr-eoc/user-info';

@Component({
    selector: 'app-route-user',
    templateUrl: './route-user.component.html',
    styleUrls: ['./route-user.component.scss'],
    imports: [UserDetailsComponent]
})
export class RouteUserComponent implements OnInit {
  @HostBinding('class') class = 'content-container';
  constructor() { }

  ngOnInit() {
  }

}
