import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertService } from './components/global-alert/alert.service';
import { ProgressService } from './components/global-progress/progress.service';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SharedComponentsModule } from './app-shared-components.module';

import { HeaderComponent } from './components/header/header.component';
import { GlobalAlertComponent } from './components/global-alert/global-alert.component';
import { GlobalProgressComponent } from './components/global-progress/global-progress.component';

@NgModule({ declarations: [
        HeaderComponent,
        GlobalAlertComponent,
        GlobalProgressComponent,
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        ClarityModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        SharedComponentsModule], providers: [AlertService, ProgressService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
