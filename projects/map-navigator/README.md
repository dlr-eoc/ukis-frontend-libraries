# @dlr-eoc/map-navigator

### how to use this in a ukis-angular (@dlr-eoc/core-ui) project

This repository contains 3 ui components:

1. mouse-position: shows projected coordinates of mouse pointer <br />
 ```<ukis-mouse-position></ukis-mouse-position>```
2. navigator: allows to insert coordinates in order to navigate the map to desired position <br />
 ```<ukis-projection-switch [mapSvc]="mapSvc" [projectionList]="projections"></ukis-projection-switch>```
3. projection-switch: ui element for interactive projection switch <br />
 ```<ukis-map-navigator [mapState]="mapStateSvc"></ukis-map-navigator>```

For examples [see demo maps route-example-events](../demo-maps/README.md)

#### add the following dependencies to the package.json
- "@dlr-eoc/map-ol"
- "@dlr-eoc/map-navigator"

#### add the following to the app.module.ts
```
import { MapOlModule } from '@dlr-eoc/map-ol';
import { MapNavigatorModule } from '@dlr-eoc/map-navigator';

...

 imports: [
    ...
    MapOlModule,
    MapNavigatorModule
  ]
```
##Create simple map:


#### add the following to a route-view.component.html
```
<main class="content-area">
  <ukis-map-ol [layersSvc]="layersSvc" [mapState]="mapStateSvc" [controls]="controls" id="olMap"></ukis-map-ol>
</main>
```



#### add the following to a route-view.component.ts
```
import { LayersService } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { IMapControls } from '@dlr-eoc/map-ol';

import { osm, eoc_litemap } from '@dlr-eoc/base-layers-raster';
```

```
controls: IMapControls;
  constructor(
    public layerSvc: LayersService,
    public mapStateSvc: MapStateService
) { }
```

```
ngOnInit() {
    this.addBaselayers();
}

addBaselayers() {
    const layers = [
        new osm({
        visible: false,
        legendImg: null
        }),
        new eoc_litemap({
        visible: true,
        legendImg: null
        })
    ];

    layers.map(l => this.layerSvc.addLayer(l, 'Baselayers'));
}
```

##To add mouse position component:
#### add the following to a route-view.component.html
```
<clr-vertical-nav [clrVerticalNavCollapsible]="true" [clr-nav-level]="2">
  <clr-vertical-nav-group [clrVerticalNavGroupExpanded]="false" class="layers" title="Coordinates">
    <clr-icon shape="compass" clrVerticalNavIcon></clr-icon>
    Coordinates
    <clr-vertical-nav-group-children class="padding title-ellipsis">
      <ukis-mouse-position></ukis-mouse-position>
    </clr-vertical-nav-group-children>
  </clr-vertical-nav-group>
</clr-vertical-nav>
```

##To add projection switch component (with 3 predefined projections):
#### add the following to a route-view.component.html
```
<clr-vertical-nav-group [clrVerticalNavGroupExpanded]="false" class="layers" title="Projection">
    <clr-icon shape="map" clrVerticalNavIcon></clr-icon>
    Projection
    <clr-vertical-nav-group-children class="padding title-ellipsis">
      <ukis-projection-switch [mapSvc]="mapSvc" [projectionList]="projections"></ukis-projection-switch>
    </clr-vertical-nav-group-children>
  </clr-vertical-nav-group>
```
#### add the following to a route-view.component.ts
```
import { IProjDef } from '@dlr-eoc/map-navigator'
```
```
projections: IProjDef[];

constructor(
    public layerSvc: LayersService,
    public mapStateSvc: MapStateService
) { 

    let arcticPolarStereographic:IProjDef = {
      code: 'EPSG:3995',
      proj4js: '+proj=stere +lat_0=90 +lat_ts=71 +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs',
      title: 'Arctic Polar Stereographic',
      extent: [-20048966.10, -20048966.10, 20048966.10, 20048966.10],
      worldExtent: [-180.0, 60.0, 180.0, 90.0],
      global: false,
      units: 'm'
    };

    let antarcticPolarStereographic:IProjDef = {
      code: `EPSG:3031`,
      proj4js: '+proj=stere +lat_0=-90 +lat_ts=-71 +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs',
      title: 'Antarctic Polar Stereographic',
      extent: [-20048966.10, -20048966.10, 20048966.10, 20048966.10],
      worldExtent: [-180.0, -90.0, 180.0, -60.0 ],
      global: false,
      units: 'm'
    };

    let webMercator:IProjDef = {
      code: `EPSG:3857`,
      proj4js: '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs',
      title: 'Spherical Mercator',
      extent: [-20026376.39, -20048966.10, 20026376.39, 20048966.10],
      worldExtent: [-180.0, -85.06, 180.0, 85.06],
      global: true,
      units: 'm'
    };

    this.projections=[webMercator, arcticPolarStereographic, antarcticPolarStereographic];
}
```

##To add navigator component:
#### add the following to a route-view.component.html
```
<clr-vertical-nav-group [clrVerticalNavGroupExpanded]="true" class="layers" title="Navigator">
    <clr-icon shape="compass" clrVerticalNavIcon></clr-icon>
    Navigator
    <clr-vertical-nav-group-children class="padding title-ellipsis">
      <ukis-map-navigator [mapState]="mapStateSvc"></ukis-map-navigator>
    </clr-vertical-nav-group-children>
  </clr-vertical-nav-group>
```

===

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.14.

## Code scaffolding

Run `ng generate component component-name --project map-navigator` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project map-navigator`.
> Note: Don't forget to add `--project map-navigator` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build map-navigator` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test map-navigator` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
