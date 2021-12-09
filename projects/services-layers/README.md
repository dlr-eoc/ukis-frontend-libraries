# @dlr-eoc/services-layers


## The idea of the LayersService

It should be a interface to use our components with different mapping libraries.  
For example one layer control which is working with all the different maps and layertypes. 
The conversion from our generalized layers to the map specific should be implemented in the corresponding component like in @dlr-eoc/map-ol 


![The idea of the layerService](assets/TheIdeaOfTheUkisLayerService.svg)
### how to use this in a ukis-angular (@dlr-eoc/core-ui) project
```
import { LayersService } from '@dlr-eoc/services-layers';
```

```
constructor(public layersSvc: LayersService,...)
```

```
ngOnInit(){
  this.layersSvc.addLayer(layer, 'Baselayers');
}
```

It implements the base of handling ukis-layers and defines classes and types for Layers, LayerGroups, RasterLayers... 
There are actually three slots ('Baselayers' | 'Overlays' | 'Layers') to push layers so we can create a flat layer tree from that to give it to the corresponding map component. So if the mapping library does not handle groups it should also work.


The main functions you will work with are:
- addLayer
- updateLayer
- removeLayer

- addLayerGroup
- updateLayerGroup
- removeLayerGroup

- removeLayerOrGroupById
- getLayerOrGroupById


For examples see:
- [demo maps](../demo-maps/README.md)
- [layer-control](../layer-control/src/lib/base-layer-control/base-layer-control.component.ts)


This module is used by components like:
- @dlr-eoc/layer-control
- @dlr-eoc/base-layers-raster
- ...



===

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.14.

## Code scaffolding

Run `ng generate component component-name --project services-layers` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project services-layers`.
> Note: Don't forget to add `--project services-layers` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build services-layers` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test services-layers` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
