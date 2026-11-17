import { Routes } from '@angular/router';
import { CesiumExample } from './views/cesium-example/cesium-example';
const baseTitle = 'UKIS demo maps'
export const routes: Routes = [
    { path: '', redirectTo: 'examples', pathMatch: 'full' },
    {
        path: 'examples',
        loadComponent: () => import('./views/bookmarks/bookmarks').then(v => v.Bookmarks),
    },
    {
        path: 'maplibre',
        loadComponent: () => import('./views/maplibre-example/maplibre-example').then(v => v.MaplibreExample),
        data: {
            title: 'Maplibre - (map-maplibre)',
            description: 'This example shows a maplibre map and how to work with UKIS layers',
            img: 'route-maplibre.jpg'
        }
    },
    {
        path: 'cesium-example',
        loadComponent: () => import('./views/cesium-example/cesium-example').then(v => v.CesiumExample),
        data: {
            title: 'Cesium - (map-cesium)',
            description: 'This example shows a cesium map and switch to OpenLayers map',
            img: 'route-cesium.jpg'
        }
    },
    {
        path: 'threejs',
            loadComponent: () => import('./views/threejs-example/threejs-example').then(v => v.ThreejsExample),
            data: {
                title: 'Threejs - (map-three)',
                description: 'This example shows a Threejs map connected to a OpenLayers map e.g. to display a globe and a flat map side by side.',
                img: 'route-threejs.jpg'
            }
    },
    {
        path: 'example-layers',
        loadComponent: () => import('./views/map-ol-layers-example/map-ol-layers-example').then(v => v.MapOlLayersExample),
        data: {
            title: 'Layers - (map-ol)',
            description: 'Example shows how to work with UKIS layers, groups and the layer-service.',
            img: 'route-layers.jpg'
        }
    },
    {
        path: 'example-custom-layers',
        loadComponent: () => import('./views/map-ol-custom-layers-example/map-ol-custom-layers-example').then(v => v.MapOlCustomLayersExample),
        data: {
            title: 'Custom Layers - (map-ol)',
            description: 'Example how to use UKIS custom layer e.g. use OpenLayers instances directly, bind events, styles and renderers.',
            img: 'route-custom-layers.jpg'
        }
    },
    {
        path: 'example-events',
        loadComponent: () => import('./views/map-ol-events-example/map-ol-events-example').then(v => v.MapOlEventsExample),
        data: {
            title: 'Events - (map-ol)',
            description: 'Example of map and layer events e.g. to show a loading bar or create a grid layer based on zoom.',
            img: 'route-events.jpg'
        }
    },
    {
        path: 'example-projection',
        loadComponent: () => import('./views/map-ol-projection-example/map-ol-projection-example').then(v => v.MapOlProjectionExample),
        data: {
            title: 'Projection - (map-ol)',
            description: 'Example shows how to work with projections using ukis-projection-switch from @dlr-eoc/ngx-ukis-ui-clarity (map-tools).',
            img: 'route-projection.jpg'
        }
    },
    {
        path: 'example-owc-layers',
        loadComponent: () => import('./views/map-ol-owc-layers-example/map-ol-owc-layers-example').then(v => v.MapOlOwcLayersExample),
        data: {
            title: 'OWS Context layers - (map-ol)',
            description: 'Example how to declaratively configure layers in a json structure to save and exchange this state. This is using the "OWS Context GeoJSON format". The example context are sored in projects/shared-assets/owc.',
            img: 'route-ows-context.jpg'
        }
    },
    {
        path: 'example-layout',
        loadComponent: () => import('./views/layout-example/layout-example').then(v => v.LayoutExample),
        data: {
            title: 'Two Vertical-Nav Layout - (map-ol)',
            description: 'Example shows how to use "Clarity Vertical Nav" on both sides and a footer. This should not be used when working on smaller screens. See also "Clarity Design System" Responsive navigation.',
            img: 'route-2-nav.jpg'
        }
    },
    {
        path: 'ol-performance',
        loadComponent: () => import('./views/map-ol-performance-example/map-ol-performance-example').then(v => v.MapOlPerformanceExample),
        data: {
            title: 'Performance - (map-ol)',
            description: 'Example to messure/check performance on layer rendering.',
            img: 'route-performance.jpg'
        }
    },
    {
        path: 'licenses',
        loadComponent: () => import('./views/licenses-example/licenses-example').then(v => v.LicensesExample),
        data: {
            title: 'Licenses',
            description: 'This example renders all used dependencies specified in assets/licenses.json which are created with "greenstevester/license-checker-evergreen"',
            img: 'route-licenses.jpg'
        }
    }
];
