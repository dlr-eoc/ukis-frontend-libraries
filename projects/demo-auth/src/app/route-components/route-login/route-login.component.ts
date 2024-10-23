import { Component, OnInit, HostBinding } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from '@dlr-eoc/user-info';

@Component({
    selector: 'app-route-login',
    templateUrl: './route-login.component.html',
    styleUrls: ['./route-login.component.scss'],
    standalone: true,
    imports: [LoginComponent]
})
export class RouteLoginComponent implements OnInit {
  @HostBinding('class') class = 'content-container';
  constructor(
    private http: HttpClient) { }

  ngOnInit() {
  }
}
