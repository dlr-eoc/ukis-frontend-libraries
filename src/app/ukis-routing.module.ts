import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { Component } from '@angular/core';

import { RouteHomeComponent } from './route-components/route-home/route-home.component'
import { RouteVerticalNavComponent } from './route-components/route-vertical-nav/route-vertical-nav.component'


@Component({
  template: `another Route`
})
export class AnotherRoute { }

const routes: Routes = [
  {
    path: '',
    component: RouteHomeComponent
  },
  {
    path: 'vertical_nav',
    component: RouteVerticalNavComponent
  },
  {
    path: 'another_route',
    component: AnotherRoute
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class UkisRoutingModule { }