import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { RouteMap4Component } from './route-map4.component';
import { MapOlComponent } from '@dlr-eoc/map-ol';
import { ClarityModule } from '@clr/angular';


const routes: Routes = [{ path: '', component: RouteMap4Component }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RouteMap4RoutingModule { }


@NgModule({
    imports: [
    CommonModule,
    RouteMap4RoutingModule,
    ClarityModule,
    MapOlComponent,
    RouteMap4Component
]
})
export class RouteMap4Module { }