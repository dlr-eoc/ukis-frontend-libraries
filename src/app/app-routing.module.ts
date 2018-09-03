import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteHomeComponent } from './route-components/route-home/route-home.component';
import { RouteVerticalNavComponent } from './route-components/route-vertical-nav/route-vertical-nav.component';
import { RoutePrivacyComponent } from './route-components/route-privacy/route-privacy.component';
import { RouteLegalNoticeComponent } from './route-components/route-legal-notice/route-legal-notice.component';


const routes: Routes = [
  {
    path: '',
    component: RouteHomeComponent
  },
  {
    path: 'vertical-nav',
    component: RouteVerticalNavComponent
  },
  {
    path: 'privacy',
    component: RoutePrivacyComponent
  },
  {
    path: 'legal-notice',
    component: RouteLegalNoticeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class UkisRoutingModule { }
