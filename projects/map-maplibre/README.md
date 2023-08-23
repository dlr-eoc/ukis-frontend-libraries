# @dlr-eoc/map-maplibre

### how to use this in a ukis-angular (@dlr-eoc/core-ui) project

For examples [see demo maps](../demo-maps/README.md)

#### add the following dependencies to the package.json
- "@dlr-eoc/map-maplibre"
- "@dlr-eoc/layer-control" (optional)
- "@dlr-eoc/base-layers-raster" (optional)


### add styles from maplibre to your application

e.g. in your apps style file
```
// styles.scss/styles.css
@import 'maplibre-gl/dist/maplibre-gl.css';
...

```

or in the angular config file
```
// angular.json
...
  "styles": [
    ...
    "node_modules/maplibre-gl/dist/maplibre-gl.css",
    "src/styles.scss"
  ],
...

```


#### add the following to the app.module.ts
```
import { MapMaplibreModule } from '@dlr-eoc/map-maplibre';
import { LayerControlModule } from '@dlr-eoc/layer-control';

...

 imports: [
    ...
    MapMaplibreModule,
    LayerControlModule
  ]
```


#### add the following to a route-view.component.html
```
<section class="content-area map-view">
    <ukis-map-maplibre [mapState]="mapStateSvc" [layersSvc]="layerSvc"></ukis-map-maplibre>
</section>
```

#### add the following to a route-view.component.ts
```
import { LayersService } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { MapMaplibreService } from '@dlr-eoc/map-maplibre';

import { OsmTileLayer, EocLitemap, BlueMarbleTile } from '@dlr-eoc/base-layers-raster';
```


```
constructor(
    public layerSvc: LayersService,
    public mapStateSvc: MapStateService,
    public mapSvc: MapMaplibreService) { }
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

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.0.

## Code scaffolding

Run `ng generate component component-name --project map-maplibre` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project map-maplibre`.
> Note: Don't forget to add `--project map-maplibre` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build map-maplibre` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build map-maplibre`, go to the dist folder `cd dist/map-maplibre` and run `npm publish`.

## Running unit tests

Run `ng test map-maplibre` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
