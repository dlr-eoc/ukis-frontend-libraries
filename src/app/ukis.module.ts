import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from 'clarity-angular';
import { FormsModule } from '@angular/forms';

<<<<<<< HEAD
import {MapstateServiceModule} from '@ukis/services/src/app/mapstate/mapstate.module';
import { LayersServiceModule } from '@ukis/services/src/app/layers/layers.module';
=======
import { MapstateServiceModule } from '@ukis/services/src/app/mapstate/mapstate.module';
import { MapcontrolModule } from '@ukis/mapcontrol/src/app/mapcontrol/mapcontrol.module';
>>>>>>> 921257c74ff9c05b802e19dc298916e6a34de21d
import { OlMapModule } from '@ukis/ol-map//src/app/ol-map/ol-map.module';


import { UkisComponent } from './ukis.component';
import { GlobalAlertComponent } from './global-alert/global-alert.component';
import { HeaderComponent } from './header/header.component';
import { LayerlistComponent } from './layerlist/layerlist.component';


@NgModule({
  declarations: [
    UkisComponent,
    GlobalAlertComponent,
    HeaderComponent,
    LayerlistComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule.forRoot(),
    MapstateServiceModule.forRoot(),
<<<<<<< HEAD
    LayersServiceModule.forRoot(),
    OlMapModule
=======
    OlMapModule,
    MapcontrolModule
>>>>>>> 921257c74ff9c05b802e19dc298916e6a34de21d
  ],
  providers: [],
  bootstrap: [UkisComponent]
})
export class UkisModule { }
