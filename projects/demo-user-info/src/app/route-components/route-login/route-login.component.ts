import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ukis-route-login',
  templateUrl: './route-login.component.html',
  styleUrls: ['./route-login.component.scss'],
  host: {
    "[class.content-container]": "true"
  }
})
export class RouteLoginComponent implements OnInit {

  constructor(
    private http: HttpClient) { }

  ngOnInit() {
  } 
}
