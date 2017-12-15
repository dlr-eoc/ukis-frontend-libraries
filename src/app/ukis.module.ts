import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from 'clarity-angular';
import { FormsModule } from '@angular/forms';

import { UkisComponent } from './ukis.component';
import { GlobalAlertComponent } from './global-alert/global-alert.component';
import { HeaderComponent } from './header/header.component';

//for map
import { MapstateServiceModule } from '@ukis/services/src/app/mapstate/mapstate.module';
import { LayersServiceModule } from '@ukis/services/src/app/layers/layers.module';
import { OlMapModule } from '@ukis/ol-map/src/app/ol-map/ol-map.module';

//for Mapcontrol
//import { MapstateServiceModule } from '@ukis/services/src/app/mapstate/mapstate.module';
import { MapcontrolModule } from '@ukis/mapcontrol/src/app/mapcontrol/mapcontrol.module';

//for Mapnavigator
//import { MapstateServiceModule } from '@ukis/services/src/app/mapstate/mapstate.module';
import { MapnavigatorModule } from '@ukis/mapcontrol/src/app/mapnavigator/mapnavigator.module';

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
    OlMapModule,
    MapcontrolModule,
    MapnavigatorModule
  ],
  providers: [],
  bootstrap: [UkisComponent]
})
export class UkisModule { }
