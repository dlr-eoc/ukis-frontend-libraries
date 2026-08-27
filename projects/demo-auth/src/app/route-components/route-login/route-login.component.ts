import { Component, OnInit, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from '@dlr-eoc/ngx-ukis-ui-clarity';

@Component({
    selector: 'app-route-login',
    templateUrl: './route-login.component.html',
    styleUrls: ['./route-login.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [LoginComponent]
})
export class RouteLoginComponent implements OnInit {
  @HostBinding('class') class = 'content-container';
  constructor(
    private http: HttpClient) { }

  ngOnInit() {
  }
}
