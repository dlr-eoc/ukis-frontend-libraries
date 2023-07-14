import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'examples', pathMatch: 'full' },
  {
    path: 'examples',
    loadChildren: () => import('./route-components/bookmarks/route-bookmarks.module').then(m => m.RouteBookmarksModule),
  },
  {
    path: 'example-layers',
    loadChildren: () => import('./route-components/route-example-layers/route-map.module').then(m => m.RouteMapModule),
    data: {
      title: 'Layers',
      description: 'Example shows how to work with UKIS layers, groups and the layer-service.',
      img: 'assets/route-layers.jpg'
    }
  },
  {
    path: 'example-projection',
    loadChildren: () => import('./route-components/route-example-projection/route-map2.module').then(m => m.RouteMap2Module),
    data: {
      title: 'Projection',
      description: 'Example shows how to work with projections using ukis-projection-switch from @dlr-eoc/map-tools.',
      img: 'assets/route-projection.jpg'
    }
  },
  {
    path: 'example-events',
    loadChildren: () => import('./route-components/route-example-events/route-map3.module').then(m => m.RouteMap3Module),
    data: {
      title: 'Events',
      description: 'Example of map and layer events e.g. to show a loading bar or create a grid layer based on zoom.',
      img: 'assets/route-events.jpg'
    }
  },
  {
    path: 'example-custom-layers',
    loadChildren: () => import('./route-components/route-example-custom-layers/route-map4.module').then(m => m.RouteMap4Module),
    data: {
      title: 'Custom Layers',
      description: 'Example how to use UKIS custom layer e.g. use OpenLayers instances directly, bind events, styles and renderers.',
      img: 'assets/route-custom-layers.jpg'
    }
  },
  {
    path: 'example-owc-layers',
    loadChildren: () => import('./route-components/route-example-owc-layers/route-example-owc-layers.module').then(m => m.RouteExampleOwcLayersModule),
    data: {
      title: 'OWS Context layers',
      description: 'Example how to declaratively configure layers in a json structure to save and exchange this state. This is using the "OWS Context GeoJSON format". The example context are sored in projects/shared-assets/owc.',
      img: 'assets/route-ows-context.jpg'
    }
  },
  {
    path: 'example-layout',
    loadChildren: () => import('./route-components/route-example-layout/route-map5.module').then(m => m.RouteMap5Module),
    data: {
      title: 'Two Vertical-Nav Layout',
      description: 'Example shows how to use "Clarity Vertical Nav" on both sides and a footer. This should not be used when working on smaller screens. See also "Clarity Design System" Responsive navigation.',
      img: 'assets/route-2-nav.jpg'
    }
  },
  {
    path: 'example-layer-style',
    loadChildren: () => import('./route-components/route-example-layer-style/route-map6.module').then(m => m.RouteMap6Module),
    data: {
      title: 'Switching Layer-Style',
      description: 'The example shows how styles for "WMS" and "WMTS" are switched dynamically.',
      img: 'assets/route-style-switch.jpg'
    }
  },
  {
    path: 'ol-performance',
    loadChildren: () => import('./route-components/route-example-olperformance/route-map7.module').then(m => m.RouteMap7Module),
    data: {
      title: 'Ol-Performance',
      description: 'Example to messure/check performance on layer rendering.',
      img: 'assets/route-performance.jpg'
    }
  },
  {
    path: 'threejs',
    loadChildren: () => import('./route-components/route-example-threejs/route-example-threejs.module').then(m => m.RouteExampleThreejsModule),
    data: {
      title: 'Threejs',
      description: 'This example shows a Threejs map connected to a OpenLayers map e.g. to display a globe and a flat map side by side.',
      img: 'assets/route-threejs.jpg'
    }
  },
  {
    path: 'cesium',
    loadChildren: () => import('./route-components/route-example-cesium/route-example-cesium.module').then(m => m.RouteCesiumModule),
    data: {
      title: 'Cesium',
      description: 'This example shows a cesium map and switch to OpenLayers map',
      img: 'assets/route-threejs.jpg'
    }
  },
  {
    path: 'licenses',
    loadChildren: () => import('./route-components/route-licenses/route-licenses.module').then(m => m.RouteLicensesModule),
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
