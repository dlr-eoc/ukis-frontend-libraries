import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../../app-shared-components.module';
import { RouterModule, Routes } from '@angular/router';
import { RouteMap6Component } from './route-map6.component';
import { ClarityModule } from '@clr/angular';
import { LayerControlModule } from '@dlr-eoc/layer-control';
import { MapOlModule } from '@dlr-eoc/map-ol';



const routes: Routes = [{ path: '', component: RouteMap6Component }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RouteMap6RoutingModule { }


@NgModule({
    declarations: [
        RouteMap6Component
    ],
    imports: [
        CommonModule,
        SharedComponentsModule,
        RouteMap6RoutingModule,

        ClarityModule,
        LayerControlModule,
        MapOlModule
    ]
})
export class RouteMap6Module { }