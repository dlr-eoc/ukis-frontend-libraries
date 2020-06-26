import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { RouteMapComponent } from './route-components/route-example-layers/route-map.component';
import { RouteMap2Component } from './route-components/route-example-projection/route-map2.component';
import { RouteMap3Component } from './route-components/route-example-events/route-map3.component';
import { RouteMap4Component } from './route-components/route-example-custom-layers/route-map4.component';
import { RouteMap5Component } from './route-components/route-example-layout/route-map5.component';
import { RouteMap6Component } from './route-components/route-example-layer-style/route-map6.component';
import { RouteLicensesComponent } from './route-components/route-licenses/route-licenses.component';
import { RouteMap7Component } from './route-components/route-example-olperformance/route-map7.component';

const routes: Routes = [
  { path: '', redirectTo: 'example-layers', pathMatch: 'full' },
  {
    path: 'example-layers', component: RouteMapComponent,
    data: {
      title: 'Layers'
    }
  },
  {
    path: 'example-projection', component: RouteMap2Component,
    data: {
      title: 'Projection'
    }
  },
  {
    path: 'example-events', component: RouteMap3Component,
    data: {
      title: 'Events'
    }
  },
  {
    path: 'example-custom-layers', component: RouteMap4Component,
    data: {
      title: 'Custom Layers'
    }
  },
  {
    path: 'example-layout', component: RouteMap5Component,
    data: {
      title: 'Two Vertical-Nav Layout'
    }
  },
  {
    path: 'example-layer-style',
    component: RouteMap6Component,
    data: {
      title: 'Switching Layer-Style'
    }
  },
  {
    path: 'ol-performance',
    component: RouteMap7Component,
    data: {
      title: 'Ol-Performance'
    }
  },
  {
    path: 'licenses',
    component: RouteLicensesComponent,
    data: {
      title: 'Licenses'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
