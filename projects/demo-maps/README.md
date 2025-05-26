# This is an angular demo application to show how to create a UKIS mapping application

This application was generated with `ng generate application demo-maps` and then `@dlr-eoc/core-ui:ng-add --routing=true` was applied.

In the src folder you can find a few route-components which show the usage of main UKIS frontend components, e. g.:
- [layers](src/app/route-components/route-example-layers/route-map.component.ts)
- [events](src/app/route-components/route-example-events/route-map3.component.ts)
- [layer style](src/app/route-components/route-example-layer-style/route-map6.component.ts)
- [custom layers](src/app/route-components/route-example-custom-layers/route-map4.component.ts)
- [layout](src/app/route-components/route-example-layout/route-map5.component.ts)
- [map projection](src/app/route-components/route-example-projection/route-map2.component.ts)
- [3D CesiumJS map](src/app/route-components/route-example-cesium/route-example-cesium.component.ts)
- [maplibre map](src/app/route-components/route-example-maplibre/route-example-maplibre.component.ts)


## Getting started
- run `npm install` (for ukis-frontend-libraries) 
- run `ng serve demo-maps`
- open a browser on *http://localhost:4200*

## Usage!!!
This application musst be patched to use `jsonix` because it is not compatible with modern angular build.
To do this, run `patch-package`, which uses the patch from [patches](patches\jsonix+3.0.0.patch).
