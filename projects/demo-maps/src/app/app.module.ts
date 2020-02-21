import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapOlModule } from '@ukis/map-ol';
import { LayerControlModule } from '@ukis/layer-control';
import { MapNavigatorModule } from '@ukis/map-navigator';

import { HeaderComponent } from './components/header/header.component';
import { GlobalFooterComponent } from './components/global-footer/global-footer.component';
import { GlobalProgressComponent } from './components/global-progress/global-progress.component';
import { ProgressService } from './components/global-progress/progress.service';

import { RouteMapComponent } from './route-components/route-example-layers/route-map.component';
import { RouteMap2Component } from './route-components/route-example-projection/route-map2.component';
import { RouteMap3Component } from './route-components/route-example-events/route-map3.component';
import { RouteMap4Component } from './route-components/route-example-custom-layers/route-map4.component';
import { RouteMap5Component } from './route-components/route-example-layout/route-map5.component';
import { RouteMap6Component } from './route-components/route-example-layer-style/route-map6.component';
import { RouteLicensesComponent } from './route-components/route-licenses/route-licenses.component';
import { HttpClientModule } from '@angular/common/http';



export const appRoutes: Routes = [
  { path: '', redirectTo: 'example-layers', pathMatch: 'full', },
  {
    path: 'example-layers', component: RouteMapComponent,
    data: {
      title: 'Layers'
    }
  },
  {
    path: 'example-projection', component: RouteMap2Component,
    data: {
      title: 'Projection'
    }
  },
  {
    path: 'example-events', component: RouteMap3Component,
    data: {
      title: 'Events'
    }
  },
  {
    path: 'example-custom-layers', component: RouteMap4Component,
    data: {
      title: 'Custom Layers'
    }
  },
  {
    path: 'example-layout', component: RouteMap5Component,
    data: {
      title: 'Two Vertical-Nav Layout'
    }
  },
  {
    path: 'example-layer-style',
    component: RouteMap6Component,
    data: {
      title: 'Switching Layer-Style'
    }
  },
  {
    path: 'licenses',
    component: RouteLicensesComponent,
    data: {
      title: 'Licenses'
    }
  }
];


@NgModule({
  declarations: [
    AppComponent,
    RouteMapComponent,
    HeaderComponent,
    GlobalFooterComponent,
    GlobalProgressComponent,
    RouteMap2Component,
    RouteMap3Component,
    RouteMap4Component,
    RouteMap5Component,
    RouteMap6Component,
    RouteLicensesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ClarityModule,
    BrowserAnimationsModule,
    MapOlModule,
    LayerControlModule,
    MapNavigatorModule,
    HttpClientModule
  ],
  providers: [ProgressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
