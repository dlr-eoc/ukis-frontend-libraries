import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteExampleMaplibreComponent } from './route-example-maplibre.component';
import { MapMaplibreComponent } from '@dlr-eoc/map-maplibre';
import { RouterModule, Routes } from '@angular/router';

import { ClarityModule } from '@clr/angular';


const routes: Routes = [{ path: '', component: RouteExampleMaplibreComponent }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RouteExampleMaplibreRoutingModule { }

@NgModule({
    imports: [
    CommonModule,
    RouteExampleMaplibreRoutingModule,
    ClarityModule,
    MapMaplibreComponent,
    RouteExampleMaplibreComponent,
]
})
export class RouteExampleMaplibreModule { }
