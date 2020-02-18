# @ukis/layer-control

### how to use this in a ukis-angular (@ukis/core-ui) project

For examples [see demo maps](../demo-maps/README.md)

#### add the following dependencies to the package.json
- "@ukis/map-ol"
- "@ukis/layer-control"

#### add the following to the app.module.ts
```
import { MapOlModule } from '@ukis/map-ol';
import { LayerControlModule } from '@ukis/layer-control';

...

 imports: [
    ...
    MapOlModule,
    LayerControlModule
  ]
```


#### add the following to a route-view.component.html
```
<main class="content-area">
  <ukis-map-ol [layersSvc]="layersSvc" [mapState]="mapStateSvc" [controls]="controls" id="olMap"></ukis-map-ol>
</main>


<clr-vertical-nav [clrVerticalNavCollapsible]="true" [clr-nav-level]="2">

  <clr-vertical-nav-group [clrVerticalNavGroupExpanded]="true" class="layers">
    <clr-icon shape="world" title="Overlays" clrVerticalNavIcon></clr-icon>
    Overlays
    <clr-vertical-nav-group-children class="padding title-ellipsis">
      <ukis-layer-control [layersSvc]="layersSvc" [mapStateSvc]="mapStateSvc" [layerfilter]="'Overlays'">
      </ukis-layer-control>
    </clr-vertical-nav-group-children>
  </clr-vertical-nav-group>

  <clr-vertical-nav-group [clrVerticalNavGroupExpanded]="true" class="layers">
    <clr-icon shape="layers" clrVerticalNavIcon title="layers"></clr-icon>
    Layers
    <clr-vertical-nav-group-children class="padding title-ellipsis">
      <ukis-layer-control [layersSvc]="layersSvc" [mapStateSvc]="mapStateSvc"></ukis-layer-control>
    </clr-vertical-nav-group-children>
  </clr-vertical-nav-group>

  <clr-vertical-nav-group [clrVerticalNavGroupExpanded]="true" class="layers">
    <clr-icon shape="world" title="Baselayers" clrVerticalNavIcon></clr-icon>
    Baselayers
    <clr-vertical-nav-group-children class="padding title-ellipsis">
      <ukis-base-layer-control [layersSvc]="layersSvc" [mapStateSvc]="mapStateSvc"></ukis-base-layer-control>
    </clr-vertical-nav-group-children>
  </clr-vertical-nav-group>

</clr-vertical-nav>
```

#### add the following to a route-view.component.ts
```
import { LayersService, Layer } from '@ukis/services-layers';
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
    this.addLayers();
    this.addOverlays()
}

addBaselayers() {
    const layers: Layer[] = [
        ...
    ];

    layers.map(l => this.layerSvc.addLayer(l, 'Baselayers'));
}

addLayers() {
    const layers: Layer[] = [
        ...
    ];

    layers.map(l => this.layerSvc.addLayer(l, 'Layers'));
}

addOverlays(){
    const layers: Layer[] = [
        ...
    ];

    layers.map(l => this.layerSvc.addLayer(l, 'Overlays'));
}
```



===

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.14.

## Code scaffolding

Run `ng generate component component-name --project layer-control` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project layer-control`.
> Note: Don't forget to add `--project layer-control` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build layer-control` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test layer-control` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
