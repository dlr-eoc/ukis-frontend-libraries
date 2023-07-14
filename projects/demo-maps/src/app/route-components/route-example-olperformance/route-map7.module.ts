import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../../app-shared-components.module';
import { RouterModule, Routes } from '@angular/router';
import { RouteMap7Component } from './route-map7.component';
import { ClarityModule } from '@clr/angular';
import { LayerControlModule } from '@dlr-eoc/layer-control';
import { MapOlModule } from '@dlr-eoc/map-ol';



const routes: Routes = [{ path: '', component: RouteMap7Component }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RouteMap7RoutingModule { }


@NgModule({
    declarations: [
        RouteMap7Component
    ],
    imports: [
        CommonModule,
        SharedComponentsModule,
        RouteMap7RoutingModule,

        ClarityModule,
        LayerControlModule,
        MapOlModule
    ]
})
export class RouteMap7Module { }