# [2.1.0](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/browse?at=refs%2Ftags%2Fv2.1.0) (2019-04-01)

### Features
* **@ukis/services-layers:** filter for remove overlays ([#UKISDEV-749](http://jira.ukis.eoc.dlr.de/browse/UKISDEV-749)) ([a39b6fd7bf4](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/a39b6fd7bf406267d1587dce8c8af01e60342087))
* **@ukis/datatypes-owc-json** , **@ukis/services-owc-json:** implemented support for geojson-layers: storing geojson-data in a data-offering
* **@ukis/dataset-explorer:** filter for bbox and time ([#UKISDEV-604](http://jira.ukis.eoc.dlr.de/browse/UKISDEV-604))


### Bug Fixes
* **@ukis/dataset-explorer:** Datasetexplorer is not removing layers from service ([#UKISDEV-738
](http://jira.ukis.eoc.dlr.de/browse/UKISDEV-738)) ([f5a98f5c9be](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/f5a98f5c9be12df6840a7361657ad860d2d0221a))
* **@ukis/datatypes-layers:** vector-layers can no longer have type "wms", "wmts" or "xyz", raster-layers can no longer have type "geojson" or "wfs".
* **@ukis/datatypes-owc-json** , **@ukis/services-owc-json:** in marshalling to and from owc to layer, the layertype is now explicitly checked for compliance with **@ukis/datatypes-layers:**


# [2.0.0](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/browse?at=refs%2Ftags%2Fv2.0.0) (2019-03-15)

### Breaking Changes
* **@ukis/map-ol:** change input name layersSvc for mal-ol ([fc24393c4d9](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/fc24393c4d9ab5230211bb1b8854ad2f2a3c5279)) 
* **@ukis/map-ol:** fix typo controlls, rename to controls ([f71cadb1db3](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/f71cadb1db3e9e60457d21600a6798095a7b58a6#projects/map-ol/src/lib/map-ol.component.ts)) 


### Bug Fixes
* **@ukis/layer-control:** opacity slider not working with dragging ([#UKISDEV-673
](http://jira.ukis.eoc.dlr.de/browse/UKISDEV-673)) ([caba7bc876c](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/caba7bc876cc3ee4f94e4172eddf90d6c91c401f))


### Features
* **@ukis/owc-control:** control to export map layers as [OWS-Context](http://www.owscontext.org/owc_user_guide/C0_userGuide.html) ([#UKISDEV-645](http://jira.ukis.eoc.dlr.de/browse/UKISDEV-645)) ([46cc38c6179](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/46cc38c61798a6a71897cab46423c8d3b72998c4#projects/owc-control/src/lib/owc-control.component.ts))


# [1.0.0](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/browse?at=refs%2Ftags%2Fv1.0.0) (2019-02-12)


### Dependency updates
* "@angular/core": "~7.2.0"

### Bug Fixes
* **repo:** remove not used files and  ([#UKISDEV-668
](http://jira.ukis.eoc.dlr.de/browse/UKISDEV-668)) ([7f4378ad74b](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/7f4378ad74b81a8b702607de55261467e08c56c6))


### Features
* 

### Performance Improvements

* 

### Possible Breaking Changes
* 
