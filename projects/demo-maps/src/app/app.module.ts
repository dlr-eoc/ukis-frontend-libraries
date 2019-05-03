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
import { RouteMap2Component } from './route-components/route-map2/route-map2.component';



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
  }
];


@NgModule({
  declarations: [
    AppComponent,
    RouteMapComponent,
    HeaderComponent,
    GlobalFooterComponent,
    RouteMap2Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ClarityModule,
    BrowserAnimationsModule,
    MapOlModule,
    LayerControlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
