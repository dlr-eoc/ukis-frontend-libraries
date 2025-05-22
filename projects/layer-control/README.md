# @dlr-eoc/layer-control

### how to use this in a ukis-angular (@dlr-eoc/core-ui) project

For examples [see demo maps](../demo-maps/README.md)

#### add the following dependencies to the package.json
- "@dlr-eoc/map-ol"
- "@dlr-eoc/layer-control"

#### add the following to route-view.component.ts
```
import { MapOlComponent } from '@dlr-eoc/map-ol';
import { LayerControlComponent } from '@dlr-eoc/layer-control';

...
 imports: [
    ...
    MapOlComponent,
    LayerControlComponent
  ]
```


#### add the following to a route-view.component.html
```
<main class="content-area">
  <ukis-map-ol [layersSvc]="layersSvc" [mapState]="mapStateSvc" [controls]="controls" id="olMap"></ukis-map-ol>
</main>


<clr-vertical-nav [clrVerticalNavCollapsible]="true" [clr-nav-level]="2">

  <clr-vertical-nav-group [clrVerticalNavGroupExpanded]="true" class="layers">
    <cds-icon shape="world" title="Overlays" clrVerticalNavIcon></cds-icon>
    Overlays
    <clr-vertical-nav-group-children class="padding title-ellipsis">
      <ukis-layer-control [layersSvc]="layersSvc" [mapStateSvc]="mapStateSvc" [layerfilter]="'Overlays'">
      </ukis-layer-control>
    </clr-vertical-nav-group-children>
  </clr-vertical-nav-group>

  <clr-vertical-nav-group [clrVerticalNavGroupExpanded]="true" class="layers">
    <cds-icon shape="layers" clrVerticalNavIcon title="layers"></cds-icon>
    Layers
    <clr-vertical-nav-group-children class="padding title-ellipsis">
      <ukis-layer-control [layersSvc]="layersSvc" [mapStateSvc]="mapStateSvc"></ukis-layer-control>
    </clr-vertical-nav-group-children>
  </clr-vertical-nav-group>

  <clr-vertical-nav-group [clrVerticalNavGroupExpanded]="true" class="layers">
    <cds-icon shape="world" title="Baselayers" clrVerticalNavIcon></cds-icon>
    Baselayers
    <clr-vertical-nav-group-children class="padding title-ellipsis">
      <ukis-base-layer-control [layersSvc]="layersSvc" [mapStateSvc]="mapStateSvc"></ukis-base-layer-control>
    </clr-vertical-nav-group-children>
  </clr-vertical-nav-group>

</clr-vertical-nav>
```

#### add the following to a route-view.component.ts
```
import { LayersService, Layer } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { IMapControls } from '@dlr-eoc/map-ol';

import { OsmTileLayer } from '@dlr-eoc/base-layers-raster';
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
