import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../../app-shared-components.module';
import { RouterModule, Routes } from '@angular/router';
import { RouteMap2Component } from './route-map2.component';
import { ClarityModule } from '@clr/angular';
import { LayerControlModule } from '@dlr-eoc/layer-control';
import { MapOlModule } from '@dlr-eoc/map-ol';
import { MapToolsModule } from '@dlr-eoc/map-tools';



const routes: Routes = [{ path: '', component: RouteMap2Component }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RouteMap2RoutingModule { }


@NgModule({
    declarations: [
        RouteMap2Component
    ],
    imports: [
        CommonModule,
        SharedComponentsModule,
        RouteMap2RoutingModule,

        ClarityModule,
        LayerControlModule,
        MapOlModule,
        MapToolsModule,
    ]
})
export class RouteMap2Module { }