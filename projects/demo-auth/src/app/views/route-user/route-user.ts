import { Component } from '@angular/core';
import { UserDetailsComponent } from '@dlr-eoc/ngx-ukis-ui-clarity';

@Component({
  imports: [UserDetailsComponent],
  selector: 'app-route-user',
  styleUrl: './route-user.scss',
  templateUrl: './route-user.html',
  host: {
    class: 'content-container'
  }
})
export class RouteUser {}
