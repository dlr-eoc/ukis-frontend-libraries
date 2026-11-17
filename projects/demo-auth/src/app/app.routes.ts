import { Routes } from "@angular/router";
import { RouteLogin } from "./views/route-login/route-login";
import { RouteMap } from "./views/route-map/route-map";
import { RouteUser } from "./views/route-user/route-user";
import { authGuardGuard } from "./auth/auth-guard-guard";

export const routes: Routes = [
    { path: "", redirectTo: "map", pathMatch: "full" },
    {
        path: "login",
        component: RouteLogin,
    },
    {
        path: "map",
        component: RouteMap,
        canActivate: [authGuardGuard],
        data: { hasPermissions: ["can_view_map"] },
    },
    {
        path: "user",
        component: RouteUser,
        canActivate: [authGuardGuard],
        data: { hasPermissions: ["can_view_user"] },
    },
];
