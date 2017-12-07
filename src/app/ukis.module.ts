import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from 'clarity-angular';
import { FormsModule } from '@angular/forms';

import { AuthService } from '@ukis/services/src/app/user/dummy-auth.service';
import {MapstateServiceModule} from '@ukis/services/src/app/mapstate/mapstate.module';
import { LayersServiceModule } from '@ukis/services/src/app/layers/layers.module';
import { MapcontrolModule } from '@ukis/mapcontrol/src/app/mapcontrol/mapcontrol.module';
import { MapnavigatorModule } from '@ukis/mapcontrol/src/app/mapnavigator/mapnavigator.module';
import { OlMapModule } from '@ukis/ol-map//src/app/ol-map/ol-map.module';
import { AppStoreService } from './shared/app-store.service';
import { UserinfoModule } from '@ukis/user-info/src/app/userinfo/userinfo.module';
import { UserServiceModule } from '@ukis/services/src/app/user/user.module';
import { RestModule } from '@ukis/services/src/app/rest/rest.module';

import { UkisComponent } from './ukis.component';
import { GlobalAlertComponent } from './global-alert/global-alert.component';
import { HeaderComponent } from './header/header.component';
import { LayerlistComponent } from './layerlist/layerlist.component';
import { LayerpropertyComponent } from './layerlist/layerproperty/layerproperty.component';

@NgModule({
  declarations: [
    UkisComponent,
    GlobalAlertComponent,
    HeaderComponent,
    LayerlistComponent,
    LayerpropertyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ClarityModule.forRoot(),
    MapstateServiceModule.forRoot(),
    LayersServiceModule.forRoot(),
    RestModule.forRoot(),
    OlMapModule,
    MapcontrolModule,
    MapnavigatorModule,
    UserServiceModule.forRoot(),
    UserinfoModule
  ],
  providers: [AuthService, AppStoreService],
  bootstrap: [UkisComponent]
})
export class UkisModule { }
