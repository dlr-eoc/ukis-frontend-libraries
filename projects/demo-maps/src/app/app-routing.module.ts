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
import { RouteMap8Component } from './route-components/route-example-threejs/route-example-threejs.component';
import { RouteExampleOwcLayersComponent } from './route-components/route-example-owc-layers/route-example-owc-layers.component';
import { BookmarksComponent } from './route-components/bookmarks/bookmarks.component';
import { RouteExampleCesiumComponent } from './route-components/route-example-cesium/route-example-cesium.component';

const routes: Routes = [
  { path: '', redirectTo: 'examples', pathMatch: 'full' },
  {
    path: 'examples', component: BookmarksComponent
  },
  {
    path: 'example-layers', component: RouteMapComponent,
    data: {
      title: 'Layers',
      description: 'Example shows how to work with UKIS layers, groups and the layer-service.',
      img: 'assets/route-layers.jpg'
    }
  },
  {
    path: 'example-projection', component: RouteMap2Component,
    data: {
      title: 'Projection',
      description: 'Example shows how to work with projections using ukis-projection-switch from @dlr-eoc/map-tools.',
      img: 'assets/route-projection.jpg'
    }
  },
  {
    path: 'example-events', component: RouteMap3Component,
    data: {
      title: 'Events',
      description: 'Example of map and layer events e.g. to show a loading bar or create a grid layer based on zoom.',
      img: 'assets/route-events.jpg'
    }
  },
  {
    path: 'example-custom-layers', component: RouteMap4Component,
    data: {
      title: 'Custom Layers',
      description: 'Example how to use UKIS custom layer e.g. use OpenLayers instances directly, bind events, styles and renderers.',
      img: 'assets/route-custom-layers.jpg'
    }
  },
  {
    path: 'example-owc-layers', component: RouteExampleOwcLayersComponent,
    data: {
      title: 'OWS Context layers',
      description: 'Example how to declaratively configure layers in a json structure to save and exchange this state. This is using the "OWS Context GeoJSON format". The example context are sored in projects/shared-assets/owc.',
      img: 'assets/route-ows-context.jpg'
    }
  },
  {
    path: 'example-layout', component: RouteMap5Component,
    data: {
      title: 'Two Vertical-Nav Layout',
      description: 'Example shows how to use "Clarity Vertical Nav" on both sides and a footer. This should not be used when working on smaller screens. See also "Clarity Design System" Responsive navigation.',
      img: 'assets/route-2-nav.jpg'
    }
  },
  {
    path: 'example-layer-style',
    component: RouteMap6Component,
    data: {
      title: 'Switching Layer-Style',
      description: 'The example shows how styles for "WMS" and "WMTS" are switched dynamically.',
      img: 'assets/route-style-switch.jpg'
    }
  },
  {
    path: 'ol-performance',
    component: RouteMap7Component,
    data: {
      title: 'Ol-Performance',
      description: 'Example to messure/check performance on layer rendering.',
      img: 'assets/route-performance.jpg'
    }
  },
  {
    path: 'threejs',
    component: RouteMap8Component,
    data: {
      title: 'Threejs',
      description: 'This example shows a Threejs map connected to a OpenLayers map e.g. to display a globe and a flat map side by side.',
      img: 'assets/route-threejs.jpg'
    }
  },
  {
    path: 'cesium',
    component: RouteExampleCesiumComponent,
    data: {
      title: 'Cesium',
      description: 'This example shows a cesium map and switch to OpenLayers map',
      img: 'assets/route-threejs.jpg'
    }
  },
  {
    path: 'licenses',
    component: RouteLicensesComponent,
    data: {
      title: 'Licenses',
      description: 'This example renders all used dependencies specified in assets/licenses.json which are created with "license-checker"',
      img: 'assets/route-licenses.jpg'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
