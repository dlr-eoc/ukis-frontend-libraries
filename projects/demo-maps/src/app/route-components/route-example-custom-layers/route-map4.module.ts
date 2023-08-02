import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../../app-shared-components.module';
import { RouterModule, Routes } from '@angular/router';
import { RouteMap4Component } from './route-map4.component';
import { LayerControlModule } from '@dlr-eoc/layer-control';
import { MapOlModule } from '@dlr-eoc/map-ol';
import { ClarityModule } from '@clr/angular';


const routes: Routes = [{ path: '', component: RouteMap4Component }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RouteMap4RoutingModule { }


@NgModule({
    declarations: [
        RouteMap4Component
    ],
    imports: [
        CommonModule,
        SharedComponentsModule,
        RouteMap4RoutingModule,

        ClarityModule,
        LayerControlModule,
        MapOlModule
    ]
})
export class RouteMap4Module { }