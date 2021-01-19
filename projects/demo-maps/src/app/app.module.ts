import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { GlobalAlertComponent } from './components/global-alert/global-alert.component';
import { AlertService } from './components/global-alert/alert.service';
import { GlobalProgressComponent } from './components/global-progress/global-progress.component';
import { ProgressService } from './components/global-progress/progress.service';
import { BlinkerComponent } from './components/performance/blinker/blinker.component';
import { FpserComponent } from './components/performance/fpser/fpser.component';
import { PerformanceComponent } from './components/performance/performance.component';

import { MapOlModule } from '@dlr-eoc/map-ol';
import { LayerControlModule } from '@dlr-eoc/layer-control';
import { MapToolsModule } from '@dlr-eoc/map-tools';
import { OwcControlModule } from '@dlr-eoc/owc-control';
import { MapThreeModule } from '@dlr-eoc/map-three';

import { RouteMapComponent } from './route-components/route-example-layers/route-map.component';
import { RouteMap2Component } from './route-components/route-example-projection/route-map2.component';
import { RouteMap3Component } from './route-components/route-example-events/route-map3.component';
import { RouteMap4Component } from './route-components/route-example-custom-layers/route-map4.component';
import { RouteMap5Component } from './route-components/route-example-layout/route-map5.component';
import { RouteMap6Component } from './route-components/route-example-layer-style/route-map6.component';
import { RouteLicensesComponent } from './route-components/route-licenses/route-licenses.component';

import { HttpClientModule } from '@angular/common/http';
import { RouteMap7Component } from './route-components/route-example-olperformance/route-map7.component';
import { ExampleLayerActionComponent } from './components/example-layer-action/example-layer-action.component';
import { SunlightComponent } from './components/sunlight/sunlight.component';
import { InterpolationSettingsComponent } from './components/interpolation-settings/interpolation-settings.component';
import { RouteMap8Component } from './route-components/route-example-threejs/route-example-threejs.component';
import { TablePopupComponent } from './components/table-popup/table-popup.component';

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
    RouteMap6Component,
    RouteMap7Component,
    RouteLicensesComponent,
    PerformanceComponent,
    BlinkerComponent,
    FpserComponent,
    RouteLicensesComponent,
    ExampleLayerActionComponent,
    SunlightComponent,
    RouteMap8Component,
    InterpolationSettingsComponent,
    TablePopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MapOlModule,
    MapThreeModule,
    LayerControlModule,
    MapToolsModule,
    OwcControlModule,
    HttpClientModule
  ],
  providers: [AlertService, ProgressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
