import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { RouteMapComponent } from './route-components/route-map/route-map.component';
import { RouteLoginComponent } from './route-components/route-login/route-login.component';
import { RouteUserComponent } from './route-components/route-user/route-user.component';
import { AuthGuardService } from './auth/auth-guard.service';



const routes: Routes = [
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

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class UkisRoutingModule { }
