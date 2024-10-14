import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { RouteMap2Component } from './route-map2.component';
import { ClarityModule } from '@clr/angular';
import { MapOlComponent } from '@dlr-eoc/map-ol';



const routes: Routes = [{ path: '', component: RouteMap2Component }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RouteMap2RoutingModule { }


@NgModule({
    imports: [
    CommonModule,
    RouteMap2RoutingModule,
    ClarityModule,
    MapOlComponent,
    RouteMap2Component,
]
})
export class RouteMap2Module { }