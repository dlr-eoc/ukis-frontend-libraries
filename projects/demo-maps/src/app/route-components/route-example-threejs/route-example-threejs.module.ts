import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { RouteMap8Component } from './route-example-threejs.component';
import { ClarityModule } from '@clr/angular';
import { MapOlComponent } from '@dlr-eoc/map-ol';




const routes: Routes = [{ path: '', component: RouteMap8Component }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RouteExampleThreejsRoutingModule { }


@NgModule({
    imports: [
    CommonModule,
    RouteExampleThreejsRoutingModule,
    ClarityModule,
    MapOlComponent,
    RouteMap8Component
]
})
export class RouteExampleThreejsModule { }