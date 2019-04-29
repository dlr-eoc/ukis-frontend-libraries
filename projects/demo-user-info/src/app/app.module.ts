import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UkisRoutingModule } from './app-routing.module';

import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';

/** core  */
import { UkisComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GlobalAlertComponent } from './components/global-alert/global-alert.component';
import { AlertService } from './components/global-alert/alert.service';
import { GlobalProgressComponent } from './components/global-progress/global-progress.component';
import { ProgressService } from './components/global-progress/progress.service';
import { GlobalFooterComponent } from './components/global-footer/global-footer.component';
import { FooterService } from './components/global-footer/footer.service';

/** Routes */
import { RouteMapComponent } from './route-components/route-map/route-map.component';
import { RouteLoginComponent } from './route-components/route-login/route-login.component';
import { RouteUserComponent } from './route-components/route-user/route-user.component';

import { MapOlModule } from '@ukis/map-ol';
import { LayerControlModule } from '@ukis/layer-control';

/** for User */
import { UserInfoModule } from '@ukis/user-info';
import { BasicAuthService } from './auth/basic-auth.service';
import { HttpAuthInterceptor } from './auth/http-auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './auth/http-error.interceptor';

/*
//for User
import { TokenInterceptor } from '@ukis/services/src/app/auth/token.interceptor';
import { UserinfoModule } from '@ukis/user-info/src/app/userinfo/userinfo.module';
//import { AuthModule } from '@ukis/services/src/app/auth/auth.module';
import { BasicAuthService } from './shared/basic-auth-nocoockie.service';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
*/



@NgModule({
  declarations: [
    UkisComponent,
    GlobalAlertComponent,
    HeaderComponent,
    RouteMapComponent,
    RouteLoginComponent,
    GlobalFooterComponent,
    GlobalProgressComponent,
    RouteUserComponent,
    //ObjTypePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UkisRoutingModule,
    FormsModule,
    ClarityModule,
    MapOlModule,
    LayerControlModule,
    UserInfoModule
    //ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AlertService, FooterService, ProgressService,
    BasicAuthService,
    {
      provide: HTTP_INTERCEPTORS,
      //useClass: TokenInterceptor,
      useFactory: (BasicAuthService) => {
        return new HttpAuthInterceptor(<any>BasicAuthService)
      },
      deps: [BasicAuthService],
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [UkisComponent]
})
export class UkisModule { }