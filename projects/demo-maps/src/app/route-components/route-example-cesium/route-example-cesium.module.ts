import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { RouteExampleCesiumComponent } from './route-example-cesium.component';
import { MapCesiumModule } from '@dlr-eoc/map-cesium';
import { LayerControlModule } from '@dlr-eoc/layer-control';
import { MapOlModule } from '@dlr-eoc/map-ol';
import { SharedComponentsModule } from '../../app-shared-components.module';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [{ path: '', component: RouteExampleCesiumComponent }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RouteCesiumModuleRoutingModule { }


@NgModule({
    declarations: [
        RouteExampleCesiumComponent
    ],
    imports: [
        CommonModule,
        RouteCesiumModuleRoutingModule,
        SharedComponentsModule,
        ClarityModule,

        MapCesiumModule,
        LayerControlModule,
        MapOlModule
    ]
})
export class RouteCesiumModule { }