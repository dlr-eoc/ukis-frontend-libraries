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
