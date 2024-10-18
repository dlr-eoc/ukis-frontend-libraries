import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { RouteMap3Component } from './route-map3.component';
import { ClarityModule } from '@clr/angular';
import { MapOlComponent } from '@dlr-eoc/map-ol';



const routes: Routes = [{ path: '', component: RouteMap3Component }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RouteMap3RoutingModule { }


@NgModule({
    imports: [
    CommonModule,
    RouteMap3RoutingModule,
    ClarityModule,
    MapOlComponent,
    RouteMap3Component,
]
})
export class RouteMap3Module { }