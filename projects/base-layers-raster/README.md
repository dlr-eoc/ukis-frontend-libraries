# @dlr-eoc/base-layers-raster

This project includes a few often used layers in ukis mapping applications e.g. eoc_litemap, osm, ...

### how to use this in a ukis-angular (@dlr-eoc/core-ui) project

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


This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.14.

## Code scaffolding

Run `ng generate component component-name --project base-layers-raster` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project base-layers-raster`.
> Note: Don't forget to add `--project base-layers-raster` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build base-layers-raster` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test base-layers-raster` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


