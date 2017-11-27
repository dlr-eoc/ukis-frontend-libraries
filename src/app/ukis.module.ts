import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from 'clarity-angular';


import { UkisComponent } from './ukis.component';
import { GlobalAlertComponent } from './global-alert/global-alert.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    UkisComponent,
    GlobalAlertComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule.forRoot()
  ],
  providers: [],
  bootstrap: [UkisComponent]
})
export class UkisModule { }
