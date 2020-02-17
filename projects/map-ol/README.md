# @ukis/map-ol

### how use this in a ukis-angular (@ukis/core-ui) project

For exampels [see demo maps](../demo-maps/README.md)

#### add the following dependencies to the package.json
- "@ukis/map-ol"
- "@ukis/layer-control" (optional)
- "@ukis/base-layers-raster" (optional)

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
<section class="content-area map-view">
  <ukis-map-ol [layersSvc]="layerSvc" [mapState]="mapStateSvc" [controls]="controls"></ukis-map-ol>
</section>
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

Run `ng generate component component-name --project map-ol` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project map-ol`.
> Note: Don't forget to add `--project map-ol` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build map-ol` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test map-ol` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
