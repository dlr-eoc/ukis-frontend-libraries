import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { UkisRoutingModule, AnotherRoute } from './ukis-routing.module';

import { UkisComponent } from './ukis.component';
import { GlobalAlertComponent } from './global-alert/global-alert.component';
import { HeaderComponent } from './header/header.component';
import { RouteVerticalNavComponent } from './route-vertical-nav/route-vertical-nav.component';
import { RouteHomeComponent } from './route-home/route-home.component';
import { AlertService } from './alert.service';

/**
 * Main App Module in which all Modules and services are plugged into
 */
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
    UkisRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ClarityModule.forRoot()
  ],
  providers: [AlertService],
  bootstrap: [UkisComponent]
})
export class UkisModule { }
