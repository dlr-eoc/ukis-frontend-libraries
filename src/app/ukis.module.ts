import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from 'clarity-angular';
import { FormsModule } from '@angular/forms';

import { UkisComponent } from './ukis.component';
import { GlobalAlertComponent } from './global-alert/global-alert.component';
import { HeaderComponent } from './header/header.component';

import { LayersServiceModule } from '@ukis/services/src/app/layers/layers.module';
import { MapstateServiceModule } from '@ukis/services/src/app/mapstate/mapstate.module';
import { OlMapModule } from '@ukis/ol-map//src/app/ol-map/ol-map.module';

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
    ClarityModule.forRoot(),
    MapstateServiceModule.forRoot(),
    LayersServiceModule.forRoot(),
    OlMapModule
  ],
  providers: [],
  bootstrap: [UkisComponent]
})
export class UkisModule { }
