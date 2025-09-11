import { Routes } from '@angular/router';
import { ExampleRouteComponent } from './route-components/example-route/example-route.component';

export const routes: Routes = [
  { path: '', redirectTo: 'example', pathMatch: 'full', },
  {
    path: 'example', component: ExampleRouteComponent,
    data: {
      title: 'example'
    }
  },
];