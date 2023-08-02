import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../../app-shared-components.module';
import { RouterModule, Routes } from '@angular/router';
import { RouteMap3Component } from './route-map3.component';
import { ClarityModule } from '@clr/angular';
import { LayerControlModule } from '@dlr-eoc/layer-control';
import { MapOlModule } from '@dlr-eoc/map-ol';
import { MapToolsModule } from '@dlr-eoc/map-tools';



const routes: Routes = [{ path: '', component: RouteMap3Component }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RouteMap3RoutingModule { }


@NgModule({
    declarations: [
        RouteMap3Component
    ],
    imports: [
        CommonModule,
        SharedComponentsModule,
        RouteMap3RoutingModule,
        ClarityModule,

        LayerControlModule,
        MapOlModule,
        MapToolsModule,
    ]
})
export class RouteMap3Module { }