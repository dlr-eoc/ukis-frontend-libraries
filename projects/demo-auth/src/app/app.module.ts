import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { GlobalAlertComponent } from './components/global-alert/global-alert.component';
import { AlertService } from './components/global-alert/alert.service';
import { GlobalProgressComponent } from './components/global-progress/global-progress.component';
import { ProgressService } from './components/global-progress/progress.service';

import { MapOlModule } from '@dlr-eoc/map-ol';
import { LayerControlModule } from '@dlr-eoc/layer-control';

import { RouteMapComponent } from './route-components/route-map/route-map.component';
import { RouteLoginComponent } from './route-components/route-login/route-login.component';
import { RouteUserComponent } from './route-components/route-user/route-user.component';

/** for User */
import { UserInfoModule } from '@dlr-eoc/user-info';
import { BasicAuthService } from './auth/basic-auth.service';
import { HttpAuthInterceptor } from './auth/http-auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './auth/http-error.interceptor';
import { CookieAlertModule } from '@dlr-eoc/cookie-alert';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GlobalAlertComponent,
    GlobalProgressComponent,
    RouteMapComponent,
    RouteLoginComponent,
    RouteUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    MapOlModule,
    LayerControlModule,
    UserInfoModule,
    CookieAlertModule
  ],
  providers: [
    AlertService, ProgressService,
    BasicAuthService,
    {
      provide: HTTP_INTERCEPTORS,
      // useClass: TokenInterceptor,
      useFactory: (authService) => {
        return new HttpAuthInterceptor(authService);
      },
      deps: [BasicAuthService],
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
