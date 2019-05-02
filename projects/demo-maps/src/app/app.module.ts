import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapOlModule } from '@ukis/map-ol';
import { LayerControlModule } from '@ukis/layer-control';
import { RouteMapComponent } from './route-components/route-map/route-map.component';
import { RouteLandingpageComponent } from './route-components/route-landingpage/route-landingpage.component';
import { HeaderComponent } from './components/header/header.component';
import { GlobalFooterComponent } from './components/global-footer/global-footer.component';



const appRoutes: Routes = [
    { path: '', redirectTo: 'map', pathMatch: 'full', },  
    { path: 'landingpage', component: RouteLandingpageComponent  },
    { path: 'map', component: RouteMapComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    RouteMapComponent,
    RouteLandingpageComponent,
    HeaderComponent,
    GlobalFooterComponent
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
