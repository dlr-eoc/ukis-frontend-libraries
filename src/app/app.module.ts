import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UkisRoutingModule } from './app-routing.module';

import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';

import { UkisComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { GlobalAlertComponent } from './components/global-alert/global-alert.component';
import { AlertService } from './components/global-alert/alert.service';
import { ProgressService } from './components/global-progress/progress.service';

import { GlobalFooterComponent } from './components/global-footer/global-footer.component';
import { FooterService } from './components/global-footer/footer.service';

import { RouteVerticalNavComponent } from './route-components/route-vertical-nav/route-vertical-nav.component';
import { RouteHomeComponent } from './route-components/route-home/route-home.component';
import { RoutePrivacyComponent } from './route-components/route-privacy/route-privacy.component';
import { RouteLegalNoticeComponent } from './route-components/route-legal-notice/route-legal-notice.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { GlobalProgressComponent } from './components/global-progress/global-progress.component';
import { ServicesWpsModule } from 'services-wps/src/lib/services-wps.module';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    UkisComponent,
    GlobalAlertComponent,
    HeaderComponent,
    RouteVerticalNavComponent,
    RouteHomeComponent,
    GlobalFooterComponent,
    RoutePrivacyComponent,
    RouteLegalNoticeComponent,
    GlobalProgressComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UkisRoutingModule,
    FormsModule,
    ClarityModule,
    HttpClientModule,
    ServicesWpsModule
    //ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AlertService, FooterService, ProgressService],
  bootstrap: [UkisComponent]
})
export class UkisModule { }
