# @ukis/map-ol

### how use this in a ukis-angular (@ukis/core-ui) project


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
