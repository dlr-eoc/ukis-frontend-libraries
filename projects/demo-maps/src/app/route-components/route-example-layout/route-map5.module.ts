import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../../app-shared-components.module';
import { RouterModule, Routes } from '@angular/router';
import { RouteMap5Component } from './route-map5.component';
import { ClarityModule } from '@clr/angular';
import { LayerControlModule } from '@dlr-eoc/layer-control';
import { MapOlModule } from '@dlr-eoc/map-ol';



const routes: Routes = [{ path: '', component: RouteMap5Component }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RouteMap5RoutingModule { }


@NgModule({
    declarations: [
        RouteMap5Component
    ],
    imports: [
        CommonModule,
        SharedComponentsModule,
        RouteMap5RoutingModule,

        ClarityModule,
        LayerControlModule,
        MapOlModule
    ]
})
export class RouteMap5Module { }