# @dlr-eoc/base-layers-raster

This project includes a few often used layers in ukis mapping applications e.g. eoc_litemap, osm, ...

### how to use this in a ukis-angular project

For examples [see demo maps](../demo-maps/README.md)

#### add the following dependencies to the package.json
- "@dlr-eoc/base-layers-raster"

#### add the following to map route/component
```
import { osm, eoc_litemap } from '@dlr-eoc/base-layers-raster';


const layer = new eoc_litemap({
    visible: true
});


this.layersSvc.addLayer(layer, 'Baselayers');
```


===

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.0.