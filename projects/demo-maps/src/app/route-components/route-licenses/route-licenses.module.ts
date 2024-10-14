import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { RouteLicensesComponent } from './route-licenses.component';
import { ClarityModule } from '@clr/angular';



const routes: Routes = [{ path: '', component: RouteLicensesComponent }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RouteLicensesRoutingModule { }


@NgModule({
    imports: [
    CommonModule,
    RouteLicensesRoutingModule,
    ClarityModule,
    RouteLicensesComponent
]
})
export class RouteLicensesModule { }