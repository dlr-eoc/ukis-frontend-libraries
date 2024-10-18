import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { RouteExampleOwcLayersComponent } from './route-example-owc-layers.component';
import { ClarityModule } from '@clr/angular';
import { MapOlComponent } from '@dlr-eoc/map-ol';


const routes: Routes = [{ path: '', component: RouteExampleOwcLayersComponent }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RouteExampleOwcLayersRoutingModule { }


@NgModule({
    imports: [
    CommonModule,
    RouteExampleOwcLayersRoutingModule,
    ClarityModule,
    MapOlComponent,
    RouteExampleOwcLayersComponent,
]
})
export class RouteExampleOwcLayersModule { }