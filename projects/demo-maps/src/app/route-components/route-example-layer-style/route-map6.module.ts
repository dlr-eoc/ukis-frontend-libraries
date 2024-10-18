import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { RouteMap6Component } from './route-map6.component';
import { ClarityModule } from '@clr/angular';
import { MapOlComponent } from '@dlr-eoc/map-ol';



const routes: Routes = [{ path: '', component: RouteMap6Component }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RouteMap6RoutingModule { }


@NgModule({
    imports: [
    CommonModule,
    RouteMap6RoutingModule,
    ClarityModule,
    MapOlComponent,
    RouteMap6Component
]
})
export class RouteMap6Module { }