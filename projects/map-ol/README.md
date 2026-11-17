# @dlr-eoc/map-ol

### how to use this in a ukis-angular project

For examples [see demo maps](../demo-maps/README.md)

#### add the following dependencies to the package.json
- "@dlr-eoc/map-ol"
- "@dlr-eoc/ngx-ukis-ui-clarity" (optional)
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

#### add the following to a route-view.component.html
```
<section class="content-area map-view">
  <ngx-ukis-map-ol [layersSvc]="layerSvc" [mapState]="mapStateSvc" [controls]="controls"></ngx-ukis-map-ol>
</section>
```

#### add the following to a route-view.component.ts
```
import { MapOlComponent, MapOlService, IMapControls } from '@dlr-eoc/map-ol';
import { LayersService } from '@dlr-eoc/services-layers';
import { LayerControlComponent } from '@dlr-eoc/ngx-ukis-ui-clarity';
import { MapStateService } from '@dlr-eoc/services-map-state';

import { OsmTileLayer, EocLitemap, BlueMarbleTile } from '@dlr-eoc/base-layers-raster';
```


```
providers: [LayersService, MapStateService, MapOlService],
imports: [
    ...
    MapOlComponent,
    LayerControlComponent
]

...
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

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.0.