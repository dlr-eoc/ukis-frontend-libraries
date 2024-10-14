import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { RouteMap5Component } from './route-map5.component';
import { ClarityModule } from '@clr/angular';
import { MapOlComponent } from '@dlr-eoc/map-ol';



const routes: Routes = [{ path: '', component: RouteMap5Component }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RouteMap5RoutingModule { }


@NgModule({
    imports: [
    CommonModule,
    RouteMap5RoutingModule,
    ClarityModule,
    MapOlComponent,
    RouteMap5Component
]
})
export class RouteMap5Module { }