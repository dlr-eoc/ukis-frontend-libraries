# @ukis/services-map-state

### how use this in a ukis-angular (@ukis/core-ui) project

For exampels see 
- [demo maps](../demo-maps/README.md)
- [map-navigator](../owc-control/src/lib/owc-control.component.ts)
- [map-ol](../layer-control/src/lib/base-layer-control/base-layer-control.component.ts)


This module is used by components like:
- @ukis/map-ol
- @ukis/map-navigator
- @ukis/layer-control
- ...

It implements a basic 'state' for the map like:
- zoom
- center
- options
- extent
- time

for more details [see map-state](../services-map-state/src/lib/types/map-state.ts)



===

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.14.

## Code scaffolding

Run `ng generate component component-name --project services-map-state` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project services-map-state`.
> Note: Don't forget to add `--project services-map-state` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build services-map-state` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test services-map-state` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
