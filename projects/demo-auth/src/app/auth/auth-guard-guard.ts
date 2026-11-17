import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { UserService } from "@dlr-eoc/ngx-ukis-ui-clarity";
import { BasicAuthSvc } from "./basic-auth-svc";
import { AlertService } from "../components/global-alert/global-alert-svc";
import { map } from "rxjs";

export const authGuardGuard: CanActivateFn = (route, state) => {
  const url: string = state.url;
  return checkRoute(url, route);
};

function checkRoute(url: string, route: ActivatedRouteSnapshot) {
  const userService = inject(UserService);
  const authService = inject(BasicAuthSvc);
  const router = inject(Router);
  const alertService = inject(AlertService);

  const routeConfig = route.routeConfig;
  if (userService.isloggedIn() && routeConfig) {
    const canEnterRoute = authService.checkAuthorization(
      route.data["hasPermissions"],
    ).pipe(
      map((value) => {
        if (!value) {
          alertService.alert.set({
            type: "info",
            text: `<strong>You dont have the Permission to enter ${
              removeCamel(routeConfig?.component?.name || "")
            }!</strong>`,
            closeable: true,
          });
        }
        return value;
      }),
    );
    return canEnterRoute;
  } else {
    alertService.alert.set({
      type: "info",
      text: `<strong>Login first to enter ${
        removeCamel(routeConfig?.component?.name || "")
      }!</strong>`,
      closeable: true,
    });
    router.navigate(["login"]);
    return false;
  }
}

/**
 * make component name no camel
 */
function removeCamel(str: string) {
  return str.split(/(?=[A-Z])/).join(" ");
}
