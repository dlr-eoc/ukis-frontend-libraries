import { Component } from '@angular/core';
import { LoginComponent } from '@dlr-eoc/ngx-ukis-ui-clarity';

@Component({
  imports: [LoginComponent],
  selector: 'app-route-login',
  styleUrl: './route-login.scss',
  templateUrl: './route-login.html',
  host: {
    class: 'content-container'
  }
})
export class RouteLogin {}
