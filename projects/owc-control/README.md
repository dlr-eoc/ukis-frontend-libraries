# @dlr-eoc/owc-control

### how to use this in a ukis-angular (@dlr-eoc/core-ui) project

// TODO: For examples [see demo maps](../demo-maps/README.md)

#### add the following dependencies to the package.json
- "@dlr-eoc/map-ol"
- "@dlr-eoc/owc-control"

#### add the following to the app.module.ts
```
import { MapOlModule } from '@dlr-eoc/map-ol';
import { OwcControlModule } from '@dlr-eoc/owc-control';

...

 imports: [
    ...
    MapOlModule,
    OwcControlModule
  ]
```


#### add the following to a route-view.component.html
```
<main class="content-area">
  <ukis-map-ol [layersSvc]="layersSvc" [mapState]="mapStateSvc" [controls]="controls" id="olMap"></ukis-map-ol>
</main>


<clr-vertical-nav [clrVerticalNavCollapsible]="true" [clr-nav-level]="2">

  <clr-vertical-nav-group>
      <clr-icon shape="export" title="Export" clrVerticalNavIcon></clr-icon>
      OWC Control
      <clr-vertical-nav-group-children class="padding title-ellipsis">
        <ukis-owc-control [layerSvc]="layerSvc" [mapStateSvc]="mapStateSvc"></ukis-owc-control>
      </clr-vertical-nav-group-children>
    </clr-vertical-nav-group>

</clr-vertical-nav>
```

#### add the following to a route-view.component.ts
```
import { LayersService } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { IMapControls } from '@dlr-eoc/map-ol';

import { osm, eoc_litemap, esri_world_imagery } from '@dlr-eoc/base-layers-raster';
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
    this.addLayers();
}

addLayers() {
    const layers = [
        ...
    ];

    layers.map(l => this.layerSvc.addLayer(l, 'Layers'));
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



===

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.14.

## Code scaffolding

Run `ng generate component component-name --project owc-control` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project owc-control`.
> Note: Don't forget to add `--project owc-control` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build owc-control` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test owc-control` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
