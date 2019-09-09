# [5.3.0](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/browse?at=refs%2Ftags%2Fv5.3.0) (2019-09-09) (layer-control and services-layers)

### Bug Fixes
* **@ukis/services-layers:** prevent to add layers or groups with same id

### Features
* **@ukis/services-layers:** new functions: getLayerOrGroupById(), getLayerById()

### Changes
* **@ukis/services-layers:** function params change - isInLayergroups(layergroup: Layer | string, groups?: Array<Layer | LayerGroup>)



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
