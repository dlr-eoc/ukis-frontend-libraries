import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../../app-shared-components.module';
import { RouterModule, Routes } from '@angular/router';
import { RouteMapComponent } from './route-map.component';
import { ClarityModule } from '@clr/angular';
import { LayerControlModule } from '@dlr-eoc/layer-control';
import { MapOlModule } from '@dlr-eoc/map-ol';
import { ServicesOgcModule } from '@dlr-eoc/services-ogc';



const routes: Routes = [{ path: '', component: RouteMapComponent }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RouteMapRoutingModule { }


@NgModule({
    declarations: [
        RouteMapComponent
    ],
    imports: [
        CommonModule,
        SharedComponentsModule,
        RouteMapRoutingModule,

        ClarityModule,
        LayerControlModule,
        MapOlModule,
        ServicesOgcModule,
    ]
})
export class RouteMapModule { }