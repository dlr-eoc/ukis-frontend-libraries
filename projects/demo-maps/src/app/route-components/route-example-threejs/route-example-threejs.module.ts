import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../../app-shared-components.module';
import { RouterModule, Routes } from '@angular/router';
import { RouteMap8Component } from './route-example-threejs.component';
import { ClarityModule } from '@clr/angular';
import { MapOlModule } from '@dlr-eoc/map-ol';
import { LayerControlModule } from '@dlr-eoc/layer-control';
import { MapThreeModule } from '@dlr-eoc/map-three';



const routes: Routes = [{ path: '', component: RouteMap8Component }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RouteExampleThreejsRoutingModule { }


@NgModule({
    declarations: [
        RouteMap8Component
    ],
    imports: [
        CommonModule,
        SharedComponentsModule,
        RouteExampleThreejsRoutingModule,

        ClarityModule,
        LayerControlModule,
        MapOlModule,
        MapThreeModule
    ]
})
export class RouteExampleThreejsModule { }