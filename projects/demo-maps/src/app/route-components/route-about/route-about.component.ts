import { Component, OnInit, HostBinding } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-route-about',
  templateUrl: './route-about.component.html',
  styleUrls: ['./route-about.component.css'],
})
export class RouteAboutComponent implements OnInit {
  @HostBinding('class') class = 'content-container';

  content: Observable<string>;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.content = this.http.get('assets/3rdpartylicenses.txt', { responseType: 'text' });
  }
}
