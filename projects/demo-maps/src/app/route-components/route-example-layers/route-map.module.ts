import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { RouteMapComponent } from './route-map.component';
import { ClarityModule } from '@clr/angular';
import { MapOlComponent } from '@dlr-eoc/map-ol';



const routes: Routes = [{ path: '', component: RouteMapComponent }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RouteMapRoutingModule { }


@NgModule({
    imports: [
    CommonModule,
    RouteMapRoutingModule,
    ClarityModule,
    MapOlComponent,
    RouteMapComponent,
]
})
export class RouteMapModule { }