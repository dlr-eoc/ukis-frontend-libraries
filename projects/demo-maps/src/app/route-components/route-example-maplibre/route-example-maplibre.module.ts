import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteExampleMaplibreComponent } from './route-example-maplibre.component';
import { MapMaplibreModule } from '@dlr-eoc/map-maplibre';
import { LayerControlModule } from '@dlr-eoc/layer-control';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponentsModule } from '../../app-shared-components.module';
import { ClarityModule } from '@clr/angular';


const routes: Routes = [{ path: '', component: RouteExampleMaplibreComponent }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RouteExampleMaplibreRoutingModule { }

@NgModule({
  declarations: [
    RouteExampleMaplibreComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    RouteExampleMaplibreRoutingModule,

    ClarityModule,
    LayerControlModule,
    MapMaplibreModule,
  ]
})
export class RouteExampleMaplibreModule { }
