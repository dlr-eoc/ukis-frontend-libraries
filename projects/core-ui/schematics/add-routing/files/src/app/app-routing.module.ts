import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExampleRouteComponent } from './route-components/example-route/example-route.component';

const routes: Routes = [
  { path: '', redirectTo: 'example', pathMatch: 'full', },
  {
    path: 'example', component: ExampleRouteComponent,
    data: {
      title: 'example'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
