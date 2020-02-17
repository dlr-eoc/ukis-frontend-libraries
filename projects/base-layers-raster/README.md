# @ukis/base-layers-raster

This project includes a view often used layers in ukis mapping applications e.g. eoc_litemap, osm, ...

### how use this in a ukis-angular (@ukis/core-ui) project

```
import { osm, eoc_litemap } from '@ukis/base-layers-raster';


const layer = new eoc_litemap({
    visible: true
});


this.layersSvc.addLayer(layer, 'Baselayers');
```
