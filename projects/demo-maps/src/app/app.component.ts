import { Component } from '@angular/core';
import { appRoutes } from './app.module';
import { Routes, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ui = {
    floating: true,
    flipped: false,
    footer: false,
    alert: null,
    progress: null
  };

  routes: Routes;
  constructor(public router: Router) {
    this.routes = this.router.config.filter(r => r.data);
  }
}
