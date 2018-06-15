import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UkisRoutingModule, AnotherRoute } from './app-routing.module';

import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';

import { UkisComponent } from './app.component';
import { GlobalAlertComponent } from './components/global-alert/global-alert.component';
import { HeaderComponent } from './components/header/header.component';
import { RouteVerticalNavComponent } from './route-components/route-vertical-nav/route-vertical-nav.component';
import { RouteHomeComponent } from './route-components/route-home/route-home.component';

//for User
import { TokenInterceptor } from '@ukis/services/src/app/auth/token.interceptor';
import { UserinfoModule } from '@ukis/user-info/src/app/userinfo/userinfo.module';
import { AuthModule } from '@ukis/services/src/app/auth/auth.module';
import { AlertService } from './components/global-alert/alert.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    UkisComponent,
    GlobalAlertComponent,
    HeaderComponent,
    AnotherRoute,
    RouteVerticalNavComponent,
    RouteHomeComponent 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UkisRoutingModule,
    FormsModule,
    ClarityModule,
    UserinfoModule,
    AuthModule.forRoot()
  ],
  providers: [AlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [UkisComponent]
})
export class UkisModule { }
