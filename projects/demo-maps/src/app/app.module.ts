import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapOlModule } from '@ukis/map-ol';
import { LayerControlModule } from '@ukis/layer-control';
import { RouteMapComponent } from './route-components/route-map/route-map.component';
import { HeaderComponent } from './components/header/header.component';
import { GlobalFooterComponent } from './components/global-footer/global-footer.component';
import { GlobalProgressComponent } from './components/global-progress/global-progress.component';
import { ProgressService } from './components/global-progress/progress.service';
import { RouteMap2Component } from './route-components/route-map2/route-map2.component';
import { RouteMap3Component } from './route-components/route-map3/route-map3.component';
import { RouteMap4Component } from './route-components/route-map4/route-map4.component';



export const appRoutes: Routes = [
  { path: '', redirectTo: 'map', pathMatch: 'full', },
  {
    path: 'map', component: RouteMapComponent,
    data: {
      title: 'Layers'
    }
  },
  {
    path: 'map2', component: RouteMap2Component,
    data: {
      title: 'Projection'
    }
  },
  {
    path: 'map3', component: RouteMap3Component,
    data: {
      title: 'Events'
    }
  },
  {
    path: 'map4', component: RouteMap4Component,
    data: {
      title: 'Custom Layers'
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
    RouteMap4Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ClarityModule,
    BrowserAnimationsModule,
    MapOlModule,
    LayerControlModule
  ],
  providers: [ProgressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
