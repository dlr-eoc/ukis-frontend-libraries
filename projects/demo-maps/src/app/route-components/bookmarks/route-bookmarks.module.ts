import { NgModule } from '@angular/core';
import { BookmarksComponent } from './route-bookmarks.component';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { ClarityModule } from '@clr/angular';


const routes: Routes = [{ path: '', component: BookmarksComponent }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RouteBookmarksRoutingModule { }


@NgModule({
    imports: [
    CommonModule,
    ClarityModule,
    RouteBookmarksRoutingModule,
    BookmarksComponent
]
})
export class RouteBookmarksModule { }