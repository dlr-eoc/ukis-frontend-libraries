import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';

import { UkisComponent } from './ukis.component';
import { GlobalAlertComponent } from './global-alert/global-alert.component';
import { HeaderComponent } from './header/header.component';

/**
 * Main App Module in which all Modules and services are plugged into
 */
@NgModule({
  declarations: [
    UkisComponent,
    GlobalAlertComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ClarityModule.forRoot()
  ],
  providers: [],
  bootstrap: [UkisComponent]
})
export class UkisModule { }
