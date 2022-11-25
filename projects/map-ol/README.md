# @dlr-eoc/map-ol

### how to use this in a ukis-angular (@dlr-eoc/core-ui) project

For examples [see demo maps](../demo-maps/README.md)

#### add the following dependencies to the package.json
- "@dlr-eoc/map-ol"
- "@dlr-eoc/layer-control" (optional)
- "@dlr-eoc/base-layers-raster" (optional)


### add styles from OpenLayers to your application

e.g. in your apps style file
```
// styles.scss/styles.css
@import 'ol/ol.css';
...

```

or in the angular config file
```
// angular.json
...
  "styles": [
    ...
    "node_modules/ol/ol.css",
    "src/styles.scss"
  ],
...

```


#### add the following to the app.module.ts
```
import { MapOlModule } from '@dlr-eoc/map-ol';
import { LayerControlModule } from '@dlr-eoc/layer-control';

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
import { LayersService } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { IMapControls } from '@dlr-eoc/map-ol';

import { OsmTileLayer, EocLitemap, BlueMarbleTile } from '@dlr-eoc/base-layers-raster';
```


```
controls: IMapControls;
  constructor(
    public layerSvc: LayersService,
    public mapStateSvc: MapStateService
) { }
```

```
// add a OnInit Function
export class <MyComponent> implements OnInit...
```

```
ngOnInit() {
    this.addBaselayers();
}

addBaselayers() {
    const layers = [
        new OsmTileLayer({
        visible: false
        }),
        new EocLitemap({
        visible: true
        }),
        new BlueMarbleTile({
        visible: false
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
