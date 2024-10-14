import { Routes } from '@angular/router';
import { RouteLoginComponent } from './route-components/route-login/route-login.component';
import { RouteMapComponent } from './route-components/route-map/route-map.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { RouteUserComponent } from './route-components/route-user/route-user.component';

export const routes: Routes = [
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  {
    path: 'login',
    component: RouteLoginComponent
  }, {
    path: 'map',
    component: RouteMapComponent,
    canActivate: [AuthGuardService],
    data: { hasPermissions: ['can_view_map'] }
  }, {
    path: 'user',
    component: RouteUserComponent,
    canActivate: [AuthGuardService],
    data: { hasPermissions: ['can_view_user'] }
  }
];
