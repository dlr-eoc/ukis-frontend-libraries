import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { RouteMap7Component } from './route-map7.component';
import { ClarityModule } from '@clr/angular';
import { MapOlComponent } from '@dlr-eoc/map-ol';



const routes: Routes = [{ path: '', component: RouteMap7Component }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RouteMap7RoutingModule { }


@NgModule({
    imports: [
    CommonModule,
    RouteMap7RoutingModule,
    ClarityModule,
    MapOlComponent,
    RouteMap7Component
]
})
export class RouteMap7Module { }