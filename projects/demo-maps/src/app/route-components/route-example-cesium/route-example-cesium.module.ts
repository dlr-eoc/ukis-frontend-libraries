import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { RouteExampleCesiumComponent } from './route-example-cesium.component';
import { MapCesiumComponent } from '@dlr-eoc/map-cesium';
import { MapOlComponent } from '@dlr-eoc/map-ol';

import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [{ path: '', component: RouteExampleCesiumComponent }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RouteCesiumModuleRoutingModule { }


@NgModule({
    imports: [
    CommonModule,
    RouteCesiumModuleRoutingModule,
    ClarityModule,
    MapCesiumComponent,
    MapOlComponent,
    RouteExampleCesiumComponent
]
})
export class RouteCesiumModule { }