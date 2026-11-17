# 1. Create angular workspace
- ng new ukis-frontend-libraries --create-application=false --package-manager=pnpm --prefix=ukis --style=scss


## npm install 
- `npm i <p-name> --workspace=projects/<name>`

# 2. Create libs
## ngx-ukis-utilities
- ng generate library ngx-ukis-utilities --prefix=ngx-ukis
- ng generate c dynamic-component --project=ngx-ukis-utilities --prefix=ngx-ukis --style=scss
- ng generate pipe pipes/array-reverse --project=ngx-ukis-utilities
- ng generate pipe pipes/obj-type --project=ngx-ukis-utilities
> ng test ngx-ukis-utilities

*Build:*
> ng build ngx-ukis-utilities --configuration=production

## utilities
- ng generate library utilities --prefix=ukis
- ng generate class utilities --project=utilities
> ng test utilities

*Build:*
> ng build utilities --configuration=production

## services-util-store
- ng generate library services-util-store --prefix=ukis
- ng generate service util-store --project=services-util-store
> ng test services-util-store

*Build:*
> ng build services-util-store --configuration=production


## utils-browser
- ng generate library utils-browser --prefix=ukis
- ng generate class download/download --project=utils-browser
- ng generate class layout/layout --project=utils-browser
> ng test utils-browser

*Build:*
> ng build utils-browser --configuration=production

## utils-maps
- ng generate library utils-maps --prefix=ukis
- ng generate class ol/utils-ol --project=utils-maps
- ng generate class ol/customRenderers/dtm_renderer --project=utils-maps
- ng generate class ol/customRenderers/interpolation_renderer --project=utils-maps
- ng generate class ol/customRenderers/particle_renderer --project=utils-maps
- ng generate class webgl/webgl --project=utils-maps
- ng generate class webgl/engine.core --project=utils-maps
- ng generate class webgl/engine.helpers --project=utils-maps
- ng generate class webgl/engine.shapes --project=utils-maps
> ng test utils-maps
-> vitest config do not work with dom and canvas -> use "browsers": ["chromiumHeadless"] in angular config.test
- https://angular.dev/guide/testing/migrating-to-vitest#5-configure-browser-mode-optional
- https://playwright.dev/docs/browsers#chromium-headless-shell

*Build:*
> ng build utils-maps --configuration=production

## utils-ogc 
- ng generate library utils-ogc --prefix=ukis
- ng generate class wms/wms --project=utils-ogc
- ng generate class wmts/wmts --project=utils-ogc
- ng generate class wps/wpsclient --project=utils-ogc
> ng test utils-ogc

*Build:*
> ng build utils-ogc --configuration=production
-> missing types for xmlserializer, ogc-schemas, w3c-schemas and jsonix -> use compilerOptions.paths in tsconfig.lib.json or  /// <reference path="./typings.d.ts" /> in public-api.ts


## shared-assets
- copy -> files only

--------------------------------------------------------------------------

## services-layers -> ngx-ukis-utilities
- ng generate library services-layers --prefix=ngx-ukis
- ng generate service layers --project=services-layers 
> ng test services-layers

*Build:*
> ng build ngx-ukis-utilities --configuration=production
>>> ng build services-layers --configuration=production

## cookie-alert -> services-util-store
- ng generate library cookie-alert --prefix=ngx-ukis
- ng generate c cookie-alert --project=cookie-alert --prefix=ngx-ukis --style=scss
> ng test cookie-alert

*Build:*
> ng build services-util-store --configuration=production
>>> ng build cookie-alert --configuration=production

## services-map-state -> services-layers
- ng generate library services-map-state --prefix=ngx-ukis 
- ng generate service map-state --project=services-map-state
> ng test services-map-state

*Build:*
> ng build ngx-ukis-utilities --configuration=production
> ng build services-layers --configuration=production
>>> ng build services-map-state --configuration=production

## base-layers-raster -> services-layers
- ng generate library base-layers-raster --prefix=ngx-ukis
- ng generate class raster-layers --project=base-layers-raster
> ng test base-layers-raster

*Build:*
> ng build ngx-ukis-utilities --configuration=production
> ng build services-layers --configuration=production
>>> ng build base-layers-raster --configuration=production


## map-cesium (3) -> 'base-layers-raster, services-layers, services-map-state
- ng generate library map-cesium --prefix=ngx-ukis
- ng generate service map-cesium-svc --project=map-cesium
> ng test map-cesium
-> vitest config do not work with dom and canvas -> use "browsers": ["chromiumHeadless"] in angular config.test
- https://angular.dev/guide/testing/migrating-to-vitest#5-configure-browser-mode-optional
- https://playwright.dev/docs/browsers#chromium-headless-shell

-> migrate from karma.conf files and proxies??? include files from node_modules for CESIUM_BASE_URL = 'assets/cesium/'
-> vitest.config.ts: not all options are supported by angular cli!!!
-> https://cesium.com/blog/2024/02/13/configuring-vite-or-webpack-for-cesiumjs/ // does not work, vitest devserver not working with this plugin
-> we have to configure a buildTarget in test.options.buildTarget like the one used in "demo-maps:build:development" which includes the assets

*Build:*
> npm run library -- --build --projects=map-cesium

## map-ol (4) -> base-layers-raster, services-layers, services-map-state, utils-maps
- ng generate library map-ol --prefix=ngx-ukis
- ng generate service map-ol-svc --project=map-ol
> ng test map-ol
-> vitest config do not work with dom and canvas -> use "browsers": ["chromiumHeadless"] in angular config.test
-> we have to configure a buildTarget in test.options.buildTarget like the one used in "demo-maps:build:development" which includes the assets from shared-assets

*Build:*
> npm run library -- --build --projects=map-ol

## ngx-ukis-ui-clarity (4) -> map-ol, services-layers, services-map-state, ngx-ukis-utilities
- ng generate library ngx-ukis-ui-clarity --prefix=ngx-ukis
- ng generate c base-layer-control --project=ngx-ukis-ui-clarity --prefix=ngx-ukis --style=scss
- ng generate c layerentry --project=ngx-ukis-ui-clarity --prefix=ngx-ukis --style=scss
- ng generate c layerentry-group --project=ngx-ukis-ui-clarity --prefix=ngx-ukis --style=scss
- ng generate c layer-control --project=ngx-ukis-ui-clarity --prefix=ngx-ukis --style=scss

- ng generate c global-alert --project=ngx-ukis-ui-clarity --prefix=ngx-ukis --style=scss
- ng generate service global-alert/global-alert-svc --project=ngx-ukis-ui-clarity

- ng generate c global-progress --project=ngx-ukis-ui-clarity --prefix=ngx-ukis --style=scss
- ng generate service global-progress/global-progress-svc --project=ngx-ukis-ui-clarity

- ng generate c header --project=ngx-ukis-ui-clarity --prefix=ngx-ukis --style=scss
- ng generate c mouse-position --project=ngx-ukis-ui-clarity --prefix=ngx-ukis --style=scss
- ng generate c navigator --project=ngx-ukis-ui-clarity --prefix=ngx-ukis --style=scss
- ng generate c projection-switch --project=ngx-ukis-ui-clarity --prefix=ngx-ukis --style=scss

- ng generate service user-info/user-svc --project=ngx-ukis-ui-clarity
- ng generate c user-info/login --project=ngx-ukis-ui-clarity --prefix=ngx-ukis --style=scss
- ng generate c user-info/register --project=ngx-ukis-ui-clarity --prefix=ngx-ukis --style=scss
- ng generate c user-info/user-details --project=ngx-ukis-ui-clarity --prefix=ngx-ukis --style=scss

> ng test ngx-ukis-ui-clarity

- copy old schematics // https://angular.dev/tools/cli/schematics-for-libraries

// schemantics and vitest https://github.com/angular/angular-cli/issues/22786
// ng test ngx-ukis-ui-clarity --ts-config=tsconfig.schematics.spec.json -> not working
// create new configuration in test -> ng test ngx-ukis-ui-clarity --configuration=schematics-test -> not working
// Build tests and then execute them using Vitest.
// npm run schematics:build -> npx vitest --config vitest.schematics.config.ts

// https://github.com/cipchk/ng-deploy-oss/blob/master/vitest.config.ts -> same error if tests not build before
// https://github.com/Terrence721/platform-main/blob/main/modules/schematics/ng-add/component/index.spec.ts#L12
// https://github.com/vmware-clarity/ng-clarity/blob/main/projects/angular/schematics/vitest.config.ts -> clr do not use schematicRunner -> a helper runner
// https://github.com/vmware-clarity/ng-clarity/blob/main/projects/angular/schematics/ng-update/tests/test-helpers.ts#L20
> npm run schematics:test --workspace=projects/ngx-ukis-ui-clarity

*Build:*
> npm run library -- --build --projects=ngx-ukis-ui-clarity


## map-three (4) -> map-ol, services-layers, services-map-state, utils-maps
- ng generate library map-three --prefix=ngx-ukis
- ng generate class utils/utils-three --project=map-three
- ng generate service map-three-svc --project=map-three

> ng test map-three

*Build:*
> npm run library -- --build --projects=map-three

## map-maplibre (4) -> base-layers-raster, services-layers, services-map-state, utilities
- ng generate library map-maplibre --prefix=ngx-ukis
- ng generate service map-maplibre-svc --project=map-maplibre
- ng generate class maplibre.helpers --project=map-maplibre
- ng generate class maplibre-layers.helpers --project=map-maplibre

-> missing types for @mapbox/togeojson -> use compilerOptions.paths in tsconfig.lib.json or  /// <reference path="./typings.d.ts" /> in public-api.

> ng test map-maplibre

*Build:*
> npm run library -- --build --projects=map-maplibre

## services-ogc (5) -> base-layers-raster, services-layers, services-map-state, services-util-store, utils-ogc
- ng generate library services-ogc --prefix=ngx-ukis
- ng generate service wms/wmsclient-svc --project=services-ogc
- ng generate service wmts/wmtsclient-svc --project=services-ogc
- ng generate service wps/wpsclient-svc --project=services-ogc
- ng generate service owc/owc-json-svc --project=services-ogc
- ng generate service opensearch/opensearch-svc --project=services-ogc
- ng generate service csw/cswclient-svc --project=services-ogc

-> missing types for xmlserializer, ogc-schemas, w3c-schemas and jsonix -> use compilerOptions.paths in tsconfig.lib.json or  /// <reference path="./typings.d.ts" /> in public-api.ts
-> multiple declare module statements with the same file coused problems...

> ng test services-ogc

*Build:*
> npm run library -- --build --projects=services-ogc


## demo-maps (8) -> services-ogc, map-maplibre, map-ol, map-three, ngx-ukis-ui-clarity, map-cesium, base-layers-raster, utils-maps
- ng generate application demo-maps --prefix=app --routing=true --style=scss --ssr=false

- ng generate c components/example-group-action --project=demo-maps --prefix=app --style=scss
- ng generate c components/example-group-legend --project=demo-maps --prefix=app --style=scss
- ng generate c components/example-layer-action --project=demo-maps --prefix=app --style=scss
- ng generate c components/example-layer-description --project=demo-maps --prefix=app --style=scss
- ng generate c components/sunlight --project=demo-maps --prefix=app --style=scss
- ng generate c components/interpolation-settings --project=demo-maps --prefix=app --style=scss
- ng generate c components/table-popup --project=demo-maps --prefix=app --style=scss
- ng generate c components/popup2 --project=demo-maps --prefix=app --style=scss

- ng generate c views/cesium-example --project=demo-maps --prefix=app --style=scss
- ng generate c views/bookmarks --project=demo-maps --prefix=app --style=scss
- ng generate c views/map-ol-custom-layers-example --project=demo-maps --prefix=app --style=scss
- ng generate c views/map-ol-events-example --project=demo-maps --prefix=app --style=scss
- ng generate c views/map-ol-layers-example --project=demo-maps --prefix=app --style=scss

- ng generate c components/vtile-layer-action --project=demo-maps --prefix=app --style=scss
- ng generate c components/raster-feature-info --project=demo-maps --prefix=app --style=scss

- ng generate c views/layout-example --project=demo-maps --prefix=app --style=scss
- ng generate c views/maplibre-example --project=demo-maps --prefix=app --style=scss
- ng generate c views/map-ol-projection-example --project=demo-maps --prefix=app --style=scss

- ng generate c components/extent-helper --project=demo-maps --prefix=app --style=scss


- ng generate c components/performance --project=demo-maps --prefix=app --style=scss


- ng generate c views/map-ol-owc-layers-example --project=demo-maps --prefix=app --style=scss


- ng generate c components/performance --project=demo-maps --prefix=app --style=scss
- ng generate c components/performance/blinker --project=demo-maps --prefix=app --style=scss
- ng generate c components/performance/fpser --project=demo-maps --prefix=app --style=scss

- ng generate c views/map-ol-performance-example --project=demo-maps --prefix=app --style=scss
- ng generate service views/map-ol-performance-example/services/largelayers --project=demo-maps


- ng generate c views/licenses-example --project=demo-maps --prefix=app --style=scss
- ng generate c views/threejs-example --project=demo-maps --prefix=app --style=scss


> ng serve demo-maps

-> add assets in angular.json for cesium

> ng test demo-maps

*Build:*
> ng build demo-maps


## demo-auth (4) -> map-ol, ngx-ukis-ui-clarity, base-layers-raster, cookie-alert
- ng generate application demo-auth --prefix=app  --routing=true --style=scss --ssr=false
- ng generate service auth/basic-auth-svc --project=demo-auth
- ng generate guard auth/auth-guard --project=demo-auth
- ng generate interceptor auth/http-auth --project=demo-auth
- ng generate interceptor auth/http-error --project=demo-auth


- ng generate c views/route-login --project=demo-auth --prefix=app --style=scss
- ng generate c views/route-map --project=demo-auth --prefix=app --style=scss
- ng generate c views/route-user --project=demo-auth --prefix=app --style=scss

> ng serve demo-auth

> ng test demo-auth // For testing components, it might be better to use Browser Mode https://vitest.dev/guide/browser/component-testing


*Build:*
> ng build demo-auth