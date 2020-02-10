import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { GlobalAlertComponent } from './components/global-alert/global-alert.component';
import { AlertService } from './components/global-alert/alert.service';
import { GlobalProgressComponent } from './components/global-progress/global-progress.component';
import { ProgressService } from './components/global-progress/progress.service';

import { MapOlModule } from '@ukis/map-ol';
import { LayerControlModule } from '@ukis/layer-control';
import { MapNavigatorModule } from '@ukis/map-navigator';

import { RouteMapComponent } from './route-components/route-example-layers/route-map.component';
import { RouteMap2Component } from './route-components/route-example-projection/route-map2.component';
import { RouteMap3Component } from './route-components/route-example-events/route-map3.component';
import { RouteMap4Component } from './route-components/route-example-custom-layers/route-map4.component';
import { RouteMap5Component } from './route-components/route-example-layout/route-map5.component';
import { RouteMap6Component } from './route-components/route-example-layer-style/route-map6.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GlobalAlertComponent,
    GlobalProgressComponent,
    RouteMapComponent,
    RouteMap2Component,
    RouteMap3Component,
    RouteMap4Component,
    RouteMap5Component,
    RouteMap6Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    MapOlModule,
    LayerControlModule,
    MapNavigatorModule
  ],
  providers: [AlertService, ProgressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
