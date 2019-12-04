import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/** core  */
import { HeaderComponent } from './components/header/header.component';
import { GlobalAlertComponent } from './components/global-alert/global-alert.component';
import { AlertService } from './components/global-alert/alert.service';
import { GlobalProgressComponent } from './components/global-progress/global-progress.component';
import { ProgressService } from './components/global-progress/progress.service';
import { GlobalFooterComponent } from './components/global-footer/global-footer.component';
import { FooterService } from './components/global-footer/footer.service';


/** Routes */



/** Map */
import { MapOlModule } from '@ukis/map-ol';
import { LayerControlModule } from '@ukis/layer-control';
import { MapNavigatorModule } from '@ukis/map-navigator';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        GlobalFooterComponent,
        GlobalProgressComponent,
        GlobalAlertComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ClarityModule,
        BrowserAnimationsModule,
        HttpClientModule
    ],
    providers: [AlertService, FooterService, ProgressService],
    bootstrap: [AppComponent]
})
export class AppModule { }