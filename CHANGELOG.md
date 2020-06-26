
### Bug Fixes
* **demo-maps:** Set routing to HashLocationStrategy and fix update Search Params on MapState change example.


### Changes
* **update dependencies** angular, clarity, ol, proj4


### Features
 * **@dlr-eoc/layer-control:** Adjust layerentry so it can use a Angular Component in the settings and as legend #12 #13. 
 * **@dlr-eoc/services-layers:** Adjust layer types so it can use a Angular Component for `action` or `legendImg` #12 #13. 
 * **@dlr-eoc/core-ui:** Export DynamicComponent and ViewRefDirective
 * **@dlr-eoc/services-layers:** RasterLayers can now specify the parameter `crossOrigin` in their constructor. 


### Refactoring
* **@dlr-eoc/core-ui:** Add class ukis-range-input to adjust style of clr range


# [7.1.0](https://github.com/dlr-eoc/ukis-frontend-libraries/tree/v7.1.0) (2020-06-03) (Schematics, OL-configuration, performance-monitoring)

### Features
* **@dlr-eoc/core-ui:** add tests for schematics to CI
* **@dlr-eoc/core-ui:** Provide header component from core-ui module
* **@dlr-eoc/map-ol:** Allow to pass OpenLayers options to [IMapControls](projects/map-ol/src/lib/map-ol.component.ts)
* **demo-maps:** Added new component `performance`, that measures FPS and change detection.
* **demo-maps:** Added new route `map7` that showcases drop in performance when displaying large vector datasets.
* **demo-maps:** Added service `LargeLayersService` that allows users to load data from a WFS with a specified data-strategy (downloading full data, downloading only current viewport, using simplified geometry, not loading any properties) to compare how each strategy affects loading- and render-performance.


### Refactoring
* **@dlr-eoc/core-ui:** on ngAdd without routing setup a view component so not all code is placed in the App component - this 
* **@dlr-eoc/core-ui:** Start convert clr-theme to use custom css properties. If you must support IE11 see [Setting up IE11 support](https://clarity.design/documentation/themes).

* **@dlr-eoc/services-layers:** Type for CustomLayer (type: 'custom') now optional on creation

* **demo-maps:** Add more examples how to use CustomLayers for OpenLayers [route-example-custom-layers](projects/demo-maps/src/app/route-components/route-example-custom-layers/route-map4.component.ts)

* **@dlr-eoc/map-ol:**
  - Overview-Map Control now as default uses a Clarity Icon
  - Prepare for OpenLayers Types with [ol@dev](https://github.com/openlayers/openlayers/pull/10688)
  - Start to use custom css properties


### Bug Fixes
* **demo-maps:** workaround for header overflow [#6](https://github.com/dlr-eoc/ukis-frontend-libraries/issues/6)
* **@dlr-eoc/layer-control:** Layerentry expand icon not working in Edge Browser due to [dir]. 

* **@dlr-eoc/map-ol:** 
  - Fix Bug Attribution Control is displayed twice [Issue #3](https://github.com/dlr-eoc/ukis-frontend-libraries/issues/3)
  - Fix Bug [Issue #1](https://github.com/dlr-eoc/ukis-frontend-libraries/issues/1) Layer Popup now working for BaseTile, BaseImage, BaseVector (Cluster, Vector, VectorTile)

* **@dlr-eoc/core-ui:** Use the same types for 'ts' as @schematics/angular /**Types of property 'kind' are incompatible */

* **@dlr-eoc/services-ogc:**
  - Used to depend on @boundlessgeo/jsonix, because this fork of @highsource/jsonix worked with angular8. However, that fork declared a couple of variables globally, which now no longer works with angular9 and the ES2015 target.
  - Created an own fork under @michaellangbein/jsonix that adresses both the [global variables issue](https://github.com/MichaelLangbein/jsonix/commit/45217815924da28d642f6d07fb7fab009b469642) and [allows building to es2015](https://github.com/MichaelLangbein/jsonix/commit/62da04a4367a5c12b547c5f3cd769f8aaedaa186).
  - All imports of 'jsonix' have been updated to '@michaellangbein/jsonix'
  - As a consequence of using this package, the `sourceIsEvt` hack in `src/index.html` is no longer required and has been removed.


# [7.0.0](https://github.com/dlr-eoc/ukis-frontend-libraries/tree/v7.0.0) (2020-03-11) (Opensourcing)


### Breaking Changes
* **change npm package scope from @ukis to @dlr-eoc:** this is breaking all imports and path mappings for @ukis!!!
* **update dependencies** angular 9 and clarity 3

* **@ukis/map-navigator:** is renamed to @ukis/map-tools

* **@ukis/layer-control:** directive reverseForOf removed! 
* **@ukis/map-ol:** duplicated exported type 'TGeoExtent' removed! - now exported from *@ukis/services-layers*
* **@ukis/services-map-state:** duplicated exported type 'TGeoExtent' removed! - now exported from *@ukis/services-layers*

* **@ukis/services-layers:** getLayerOrGroupById() - is returning a Layer | LayerGroup | null - not a array anymore! 

* **@ukis/base-layers-raster:** esri and google layers are removed, new layers from EOC Geoservice (a complete restructuring)!!! 


### Changes

* **@ukis/services-ogc:** 
 - made wps-datatypes available via public api.
 - allowed to set caching mechanism on a client-wide level.

* **@ukis/services-layers:** 
- removeLayer(), removeLayerGroup(), removeLayerFromGroup(), removeLayerOrGroupById() - add optional force if layer was set to not removable
- updateLayerOrGroupInStore() - removed optional (not used) filtertype


* **scripts**: create package for libraryScripts and nexus publish
* **projects/demo-maps**: added route 'licenses' as an example for how to display third party licenses.


### Features
* **@ukis/layer-control:** add css class to visible layer or group to style them.
* **@ukis/core-ui:** new package which adds install support through schematics :) `ng add @ukis/core-ui`
* **@ukis/map-ol:** MapOlService exports projectionChange (Subject)


### Bug Fixes
* **@ukis/user-info:** fix tests
* **all projects:** add dev- and peerDependencies check through [depcheck](https://github.com/depcheck/depcheck)



# [6.2.0](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/browse?at=refs%2Ftags%2Fv6.2.0) (2019-12-05) (Sprint NextGEOSS)

### Features
* **@ukis/services-ogc:** added support for WPS 2.0
* **@ukis/services-layers:** new type *TFiltertypes = 'Baselayers' | 'Overlays' | 'Layers'* replace old duplicate definitions ([98c42aae0e6, a5f211272b6](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/98c42aae0e6f5cffa1c934933a6aa2828a0e32b6)).
* **@ukis/map-ol:** new functions in map-ol.service: setLayers(), updateLayerByKey(), setUkisLayers(), setUkisLayer(), updateUkisLayer() ([80c7e727f1c](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/80c7e727f1c777cdcc76d3a99b683bf8e73e8d8c)).
* **@ukis/map-ol:** ne type *Tgroupfiltertype = 'baselayers' | 'layers' | 'overlays' | 'Baselayers' | 'Overlays' | 'Layers'* to be backwards compatible with TFiltertypes.
* **@ukis/map-ol:** add tests for add/get/remove layers and a simple test for update layer ([db5bb17d5c2](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/db5bb17d5c29438a70985e59f708884e237674f6)).
* **@ukis/map-ol:** add update olSource on CustomLayer id uid changed ([7ccc339162b](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/7ccc339162b16892deaca20cdb3c500d40eda2bf)).



### Changes
* **@ukis/map-ol:** rename functions in map-ol.service:  setLayers() to setUkisLayers() and setLayer() to setUkisLayer() - They were only used in map-ol.component! ([f35efcfbb2e](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/f35efcfbb2ec18c7102766076febf45c2fbab268)).
* **@ukis/map-ol:** refactor map-ol.component and map-ol.service.
* **demo-maps:** adjust routes to test refactoring.


### Bug Fixes
* **@ukis/services-layers:** fix: update Layer and LayerGroup was not working. ([5acc1e36547](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/5acc1e365474c1178fe2cc5e61712b62e5011ea5),[6c8dea04538](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/6c8dea0453857677c75623bf888f026d808fb327))
* **@ukis/map-ol:** fix functions in map-ol.service addLayers(), removeLayerByKey().
* **@ukis/map-ol:** fix wms params were passed by obj reference - this was causing a unsuspected update of a layer on the map!
* **@ukis/map-ol:** fix wmts params update was triggered although nothing has changed! and use new function updateUkisLayer instead of remove and add the layer.



# [6.1.0](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/browse?at=refs%2Ftags%2Fv6.1.0) (2019-12-05) (Add projection switch from SV.)
### Features
* **@ukis/map-navigator:** SV: added projection switch. See mariss client for example.
### Bug Fixes
* **@ukis/map-ol:** SV: adjusted setProjection method. It creates a new View instance with keeping previously set settings with exception resolution-related parameters. They are calculated automatically by the OL. After applying new projection all existing layers are triggered to redraw their tiles
* **@ukis/map-ol:** SV: created getZoom method in the map-ol.service in order to get zoom value from actual olView instance. 
* **@ukis/map-ol:** SV: changed the zoom value source for mapSate. 
* **@ukis/services-layers:** adjust types
* **@ukis/map-ol:** [Backwards incompatible changes in ol6 on map.forEachLayerAtPixel](https://github.com/openlayers/openlayers/releases/tag/v6.0.0) - fix this for popup layers with className = layer.id
* **@ukis/map-ol:** add more types from openlayers
* **@ukis/map-ol:** set all olView options on MapOlService.createMap
* **@ukis/map-navigator:** set precision also on zoom and remove duplicate projection in dropdown


# [6.0.0](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/browse?at=refs%2Ftags%2Fv6.0.0) (2019-11-19) (Sprint Geoservice 2 and Sprint water system 1)

### Changes
* **@ukis/services-layers:** zIndex is removed (only used internal).

* **@ukis/services-owc-json:** is now in @ukis/services-ogc

* **@ukis/services-wps:** is now in @ukis/services-ogc


### Features
* **@ukis/map-navigator:** mouse-position component ([cc2e51b70ff](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/cc2e51b70ffb7b7c022d58248d4c4a0e28a14bad), [04d9bac9209](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/04d9bac9209c65220df8eb5fd1dd89db38ac8b45))

* **@ukis/services-ogc:** services for ogc like OWC, WMTS, WMS and WPS ([cf4fd58022a](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/cf4fd58022af471ddbf512fc6800dd1d1a1071cf))
* **@ukis/services-layers:** Add dimensions and styles property for OWC ([be9464860d4](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/be9464860d4ea8f8495383b714846a4e57405ba1))
* **@ukis/services-layers:** Wmts Layer use default tilegrid if nothing is provided and set tileSize on WMS ([b7ce28e5d1e](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/b7ce28e5d1e48111e9cf797ffd3b898069afc63a))
* **@ukis/services-layers:** Added new types for Rasterlayers like WMS and WMTS ([936c8b683da](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/936c8b683da2cb352705118b80bea09514f59b76), [ca6136c574e](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/ca6136c574eea01160411778afaae29278186cd6))

* **@ukis/layer-control:** now allows switching between styles of a layer (if more than one style is present) ([22c49e96015](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/22c49e960158aa20e5058536e9bd41b49a7fd55e))
* **@ukis/services-layers:** RasterLayer now has a property 'styles' to accommodate the above mentioned feature ([0e36a07f536](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/0e36a07f536c98e2c8d66cd5a3ec7729b0fb4a12))

* **@ukis/map-ol:** update to openLayers 6.1.1
* **@ukis/map-ol:** getFeaturesExtent add optional get extent geographic
* **@ukis/map-ol:** Added a method getTileGrid ([b7ce28e5d1e](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/b7ce28e5d1e48111e9cf797ffd3b898069afc63a))
* **@ukis/map-ol:** Added a method 'setLayer', analogous to 'setLayers'  ([9c74273b78e](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/9c74273b78e15c47326457fec4c51235cf146399))



### Bug Fixes
* **@ukis/map-ol:** fixed some type-signatures in map-ol-service ([76a9f4552c5](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/76a9f4552c58cd4af72cdbad58963cefad519632))



# [5.3.0](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/browse?at=refs%2Ftags%2Fv5.3.0) (2019-09-09) (layer-control and services-layers)

### Bug Fixes
* **@ukis/services-layers:** prevent to add layers or groups with same id ([71f5668a182](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/71f5668a1823fd02caf7eb24b4fc8f33d001da72))

* **@ukis/layer-control:** LayerGroup is not set to visible if the group is updated with the layerservice ([51b35fe2c17](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/51b35fe2c17e7b1c056c50ba0b7a604c7ad3dc1a))

### Features
* **@ukis/services-layers:** new functions: getLayerOrGroupById(), getLayerById() ([71f5668a182](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/71f5668a1823fd02caf7eb24b4fc8f33d001da72))

* **@ukis/services-layers:** LayerGroup now have the optional property visible witch is also set to Layers of the Group; Added Tests and dokumentation.

* **demo-maps:** add custom vector layer with bbox to demo-maps, add kml as custom layer ([e2544e8295e](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/e2544e8295ef3e64fa1bf868aae5fa2532948977), [ba5daa1028d](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/ba5daa1028d58064ecf70f796b06bc9c68976675))

### Changes
* **@ukis/services-layers:** function params change - isInLayergroups(layergroup: Layer | string, groups?: Array<Layer | LayerGroup>) ([71f5668a182](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/71f5668a1823fd02caf7eb24b4fc8f33d001da72))

* **@ukis/services-layers:** The filtertype on addLayer(), removeLayer(), updateLayer() and addLayerGroup() are now **optional** if not provided the type of the Layer or LayerGroup is used.


# [5.2.1](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/browse?at=refs%2Ftags%2Fv5.2.1) (2019-08-13) (layer-control)

### Bug Fixes
* **@ukis/layer-control:** layerentry-group don't use layer.name for the checkbox-id so layer with same name are not toggled simultaneously. ([UKISDEV-898](http://jira.ukis.eoc.dlr.de/browse/UKISDEV-898)) ([d360c8a21bf](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/d360c8a21bf85ea8967dbc1b743b81fe92744daa))



# [5.2.0](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/browse?at=refs%2Ftags%2Fv5.2.0) (2019-08-06) (services-layers)


### Features
* **@ukis/services-layers:** add function 'removeBaseLayers' and 'removeLayers' so layers can be filtered for all slots 'Baselayers' | 'Layers' | 'Overlays' ([UKISDEV-885](http://git.ukis.eoc.dlr.de/plugins/servlet/jira-integration/issues/UKISDEV-885)) ([bdb1017ab3b](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/bdb1017ab3b1f98d28b4e0709cc296a6e628898f))

* **@ukis/services-layers:** add 'description' to LayerGroup to show it in the ukis-layerentry-group ([UKISDEV-886](http://git.ukis.eoc.dlr.de/plugins/servlet/jira-integration/issues/UKISDEV-886)) ([3ffb35c9347](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/3ffb35c934777790cda3906c8ad3748bf4719b9c))
* **@ukis/services-layers, @ukis/layer-control:** add 'actions' to Layer and LayerGroup to trigger functions with clarity-icons ([UKISDEV-886](http://git.ukis.eoc.dlr.de/plugins/servlet/jira-integration/issues/UKISDEV-886)) ([3ffb35c9347](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/3ffb35c934777790cda3906c8ad3748bf4719b9c))



# [5.1.2](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/browse?at=refs%2Ftags%2Fv5.1.2) (2019-07-19) (olmap fix for routing)

### Bug Fixes
* **@ukis/map-ol:** map viewport was not set on route change due to olMap got no target element when used a string on map.setTarget - now using @ViewChild to get the nativeElement ([3dc113ecb6b](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/3dc113ecb6bb3a8d2d673d50629edea1f67bdabf))


### Features
* **demo-maps:** added new demo for a layout with two vertical navs



# [5.1.1](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/browse?at=refs%2Ftags%2Fv5.1.1) (2019-07-08) (angular update)

### Dependency updates
* "@angular/core": "~7.2.0" to "~8.1.0"
* "@clr": "^1.0.4" to "^2.0.2"


# [5.1.0](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/browse?at=refs%2Ftags%2Fv5.1.0) (2019-06-17) (services-wps/map-ol)

### Changes
* **@ukis/services-wps:** created new wps-client
* **@ukis/map-ol:** added means to do bbox-selection and show a hover-popup.
* **@ukis/services-layers:** commented out some log messages (layer/layergroup remove etc.) which are not good for production

### Features
* **@ukis/map-ol:** added public setHitTolerance(tolerance: number) method, for configuration of click events on touch devices

### Bug Fixes
* **@ukis/services-layers:** fixed bug where layer-visibility would be turned off after call to *removeOverlays*
* **@ukis/services-owc-json:** adjusted owc-json.service.spec.ts to the latest state of owc-json.service.ts 


# [5.0.0](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/browse?at=refs%2Ftags%2Fv5.0.0) (2019-05-09) (ability to put layers aboth overlays)

### Breaking Changes
* **@ukis/services-layers:** filtertype of Layers has changed from `'Baselayers' | 'Overlays' | string` to `'Baselayers' | 'Overlays' | 'Layers'` and default type is now 'Layers'. This is involving `@ukis/map-ol`, `@ukis/layer-control` and `@ukis/services-owc-json`

### Bug Fixes
* **@ukis/services-layers:** custem layer default type not set ([b6af54571e3](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/b6af54571e32092a9c43d5ef318ef2f0d1d86223))

* **@ukis/map-ol:** don't remove custom_layer from layer so it can be created newly ([UKISDEV-802](http://jira.ukis.eoc.dlr.de/browse/UKISDEV-802)) ([1f8ea6f7704](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/1f8ea6f7704e5bea67af9e65e5b6378c1818a0bb)))

### Features
* **@ukis/services-map-state:** set Mapstate use object or instance (not only instance) ([30e6ce143cd](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/30e6ce143cd93ce86edf1b7c54ac7d03859fa650))



# [4.0.0](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/browse?at=refs%2Ftags%2Fv4.0.0) (2019-05-03) (refactoring)

### Breaking Changes
**move all datatypes to there services** ([UKISDEV-787](http://jira.ukis.eoc.dlr.de/browse/UKISDEV-787)) ([1f9f3c748ec](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/1f9f3c748ec48abd5c123a7ed45539f109078904))
* **@ukis/datatypes-layers:** exports moved to @ukis/services-layers
* **@ukis/datatypes-map-state:** exports moved to @ukis/services-map-state
* **@ukis/datatypes-owc-json:** exports moved to @ukis/services-owc-json
* **@ukis/datatypes-user-info:** removed! already in @ukis/user-info

* **@ukis/dataset-explorer:** move dataset-explorer to project-coastalx! ([UKISDEV-789](http://jira.ukis.eoc.dlr.de/browse/UKISDEV-789)) ([bf9d5e3649d](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/bf9d5e3649d4ff2ab6616d4687b26f1797c00155))
* **@ukis/observation-explorer:** move observation-explorer to project-mariss! ([UKISDEV-790](http://jira.ukis.eoc.dlr.de/browse/UKISDEV-790)) ([b3240e4344b](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/b3240e4344be971bcc5380f37a9f4e3e9dd1ef05))


### Bug Fixes
* **@ukis/layer-control:** layer in group ordering not working ([4ee6fd97384](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/4ee6fd97384da42e402b8a4a86178ce741ba94e7))
* **@ukis/layer-control:** layer opacity slider not working on drag in group item ([87d4b12179c](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/87d4b12179ca31be6da7b1037a21c39c962f79c1))

* **@ukis/map-ol:** popup not added for Vecorlayers ([10dd1791d3b](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/10dd1791d3b573c78041d4855c0fb527c07c832c))
* **@ukis/map-ol:** create ol map in constructor of service and add layers, view and controls later ([83c64c406ce](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/83c64c406cec321d4dbf177a5185b56bf0d8a582))


### Features
* **demo-user-info:** create demo app for @ukis/user-info module ([UKISDEV-786](http://jira.ukis.eoc.dlr.de/browse/UKISDEV-785)) ([814097ed357](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/814097ed3574450062d58999dd14c645eac01018))

* **demo-maps:** create demo app for @ukis/map-ol module ([UKISDEV-785](http://jira.ukis.eoc.dlr.de/browse/UKISDEV-786)) ([01636a24f83](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/01636a24f8398ea1a8f94542ba9e0b7f8434d85e)) ([116f4bf9316](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/116f4bf93168b18563155adc1d4c3cb4527e5def))



# [3.0.2](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/browse?at=refs%2Ftags%2Fv3.0.2) (2019-04-26) (costalx-fixes)

### Bug Fixes
* **@ukis/dataset-explorer:** data type icons path to polygon, raster, line etc. was given absolute, therefore could not be found in deployed environments ([#UKISDEV-771](http://jira.ukis.eoc.dlr.de/browse/UKISDEV-771))


# [3.0.1](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/browse?at=refs%2Ftags%2Fv3.0.1) (2019-04-26) (costalx-fixes)

### Bug Fixes
* **@ukis/map-ol:** imports ol.css in bundel not working on linux build ([#UKISDEV-766](http://jira.ukis.eoc.dlr.de/browse/UKISDEV-766)) ([896f15ab39e](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/896f15ab39ef67325c9684dd3fd0d6a0ce795c06))


# [3.0.0](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/browse?at=refs%2Ftags%2Fv3.0.0) (2019-04-15) (FEATURE-planetary and costalx-fixes)

### Breaking Changes
* **@ukis/user-info:** component ukis-login-view removed - create your view e.g. in a route with the provided components! ([#UKISDEV-767](http://jira.ukis.eoc.dlr.de/browse/UKISDEV-767)) ([5c3001e6f6d](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/5c3001e6f6d87e41f808d06bf6b29dbe3fb83a03))
* **@ukis/user-info:** user.service.ts api changes!!! ([#UKISDEV-767](http://jira.ukis.eoc.dlr.de/browse/UKISDEV-767)) ([5c3001e6f6d](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/5c3001e6f6d87e41f808d06bf6b29dbe3fb83a03#projects/user-info/src/lib/user.service.ts))


### Features
* **@ukis/services-util-store:** method to remove cookies ([ca3b11fecac](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/ca3b11fecacb1a1f0372226ae3e5f7e29157a557))


### Bug Fixes
* **@ukis/map-ol:** imports ol.css in bundel ([#UKISDEV-766](http://jira.ukis.eoc.dlr.de/browse/UKISDEV-766)) ([5809fdb9df4](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/5809fdb9df433ab5523eb21197ef1b48cc4bef94))


# [2.1.0](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/browse?at=refs%2Ftags%2Fv2.1.0) (2019-04-01)

### Features
* **@ukis/services-layers:** filter for remove overlays ([#UKISDEV-749](http://jira.ukis.eoc.dlr.de/browse/UKISDEV-749)) ([a39b6fd7bf4](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/a39b6fd7bf406267d1587dce8c8af01e60342087))
* **@ukis/services-owc-json** , **@ukis/services-owc-json:** implemented support for geojson-layers: storing geojson-data in a data-offering
* **@ukis/dataset-explorer:** filter for bbox and time ([#UKISDEV-604](http://jira.ukis.eoc.dlr.de/browse/UKISDEV-604))


### Bug Fixes
* **@ukis/dataset-explorer:** Datasetexplorer is not removing layers from service ([#UKISDEV-738](http://jira.ukis.eoc.dlr.de/browse/UKISDEV-738)) ([f5a98f5c9be](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/f5a98f5c9be12df6840a7361657ad860d2d0221a))
* **@ukis/services-layers:** vector-layers can no longer have type "wms", "wmts" or "xyz", raster-layers can no longer have type "geojson" or "wfs".
* **@ukis/services-owc-json** , **@ukis/services-owc-json:** in marshalling to and from owc to layer, the layertype is now explicitly checked for compliance with **@ukis/services-layers:**


# [2.0.0](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/browse?at=refs%2Ftags%2Fv2.0.0) (2019-03-15) (SPRINT-geoservice I)

### Breaking Changes
* **@ukis/map-ol:** change input name layersSvc for mal-ol ([fc24393c4d9](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/fc24393c4d9ab5230211bb1b8854ad2f2a3c5279)) 
* **@ukis/map-ol:** fix typo controlls, rename to controls ([f71cadb1db3](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/f71cadb1db3e9e60457d21600a6798095a7b58a6#projects/map-ol/src/lib/map-ol.component.ts)) 


### Bug Fixes
* **@ukis/layer-control:** opacity slider not working with dragging ([#UKISDEV-673](http://jira.ukis.eoc.dlr.de/browse/UKISDEV-673)) ([caba7bc876c](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/caba7bc876cc3ee4f94e4172eddf90d6c91c401f))


### Features
* **@ukis/owc-control:** control to export map layers as [OWS-Context](http://www.owscontext.org/owc_user_guide/C0_userGuide.html) ([#UKISDEV-645](http://jira.ukis.eoc.dlr.de/browse/UKISDEV-645)) ([46cc38c6179](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/46cc38c61798a6a71897cab46423c8d3b72998c4#projects/owc-control/src/lib/owc-control.component.ts))


# [1.0.0](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/browse?at=refs%2Ftags%2Fv1.0.0) (2019-02-12) (RESTRUCTURE to monorepo)


### Dependency updates
* "@angular/core": "~7.2.0"

### Bug Fixes
* **repo:** remove not used files and  ([#UKISDEV-668](http://jira.ukis.eoc.dlr.de/browse/UKISDEV-668)) ([7f4378ad74b](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/7f4378ad74b81a8b702607de55261467e08c56c6))


### Features
* 

### Performance Improvements

* 

### Possible Breaking Changes
* 
