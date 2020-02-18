# @ukis/map-navigator

### how to use this in a ukis-angular (@ukis/core-ui) project

For examples [see demo maps route-example-events](../demo-maps/README.md)

#### add the following dependencies to the package.json
- "@ukis/map-ol"
- "@ukis/map-navigator"

#### add the following to the app.module.ts
```
import { MapOlModule } from '@ukis/map-ol';
import { MapNavigatorModule } from '@ukis/map-navigator';

...

 imports: [
    ...
    MapOlModule,
    MapNavigatorModule
  ]
```


#### add the following to a route-view.component.html
```
<main class="content-area">
  <ukis-map-ol [layersSvc]="layersSvc" [mapState]="mapStateSvc" [controls]="controls" id="olMap"></ukis-map-ol>
</main>

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

#### add the following to a route-view.component.ts
```
import { LayersService } from '@ukis/services-layers';
import { MapStateService } from '@ukis/services-map-state';
import { IMapControls } from '@ukis/map-ol';

import { osm, eoc_litemap, esri_world_imagery } from '@ukis/base-layers-raster';
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
        }),
        new esri_world_imagery({
        visible: false,
        legendImg: null
        })
    ];

    layers.map(l => this.layerSvc.addLayer(l, 'Baselayers'));
}
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
