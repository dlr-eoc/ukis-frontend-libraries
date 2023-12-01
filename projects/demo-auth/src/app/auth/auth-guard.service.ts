import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService, IUser } from '@dlr-eoc/user-info';
import { AlertService } from '../components/global-alert/alert.service';
import { Observable } from 'rxjs';
import { BasicAuthService } from './basic-auth.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  {
  constructor(
    @Inject(UserService) private userService: UserService,
    private authService: BasicAuthService,
    private router: Router,
    private alertService: AlertService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url;
    return this.checkRoute(url, route);
  }

  checkRoute(url: string, route: ActivatedRouteSnapshot) {
    if (this.userService.isloggedIn()) {
      const canEnterRoute = this.authService.checkAuthorization(route.data.hasPermissions).pipe(
        map(value => {
          if (!value) {
            this.alertService.alert({
              type: 'info',
              text: `<strong>You dont have the Permission to enter ${this.removeCamel(route.routeConfig.component.name)}!</strong>`,
              closeable: true
            });
          }
          return value;
        }));
      return canEnterRoute;
    } else {
      this.alertService.alert({
        type: 'info',
        text: `<strong>Login first to enter ${this.removeCamel(route.routeConfig.component.name)}!</strong>`,
        closeable: true
      });
      this.router.navigate(['/login']);
      return false;
    }
  }

  /**
   * make component name no camel
   */
  removeCamel(str: string) {
    return str.split(/(?=[A-Z])/).join(' ');
  }




}
