import { Component, OnInit, HostBinding } from '@angular/core';
import { UserDetailsComponent } from '../../../../../user-info/src/lib/user-details/user-details.component';

@Component({
    selector: 'app-route-user',
    templateUrl: './route-user.component.html',
    styleUrls: ['./route-user.component.scss'],
    standalone: true,
    imports: [UserDetailsComponent]
})
export class RouteUserComponent implements OnInit {
  @HostBinding('class') class = 'content-container';
  constructor() { }

  ngOnInit() {
  }

}
