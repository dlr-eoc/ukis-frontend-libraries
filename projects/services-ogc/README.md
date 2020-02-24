# @dlr-eoc/services-ogc

This library bundles our clients for OGC standards. 

## WPS
This is a client to communicate with WPS-servers. With it, remote procedures can be called, their status monitored and their results fetched.
The service is intended to abstract away the differences between the versions of the WPS protocol. It currently supports both WPS 1.0.0 and WPS 2.0.0.

## OWC
This is a parser to read from / write to OWC files. OWC can be used to share information about a map-context (such as extent, visible layers, zoom, ...) across multiple clients.
This parser converts to / from UKIS-specific datatypes, like UKIS-rasterlayers, UKIS-vectorlayers etc.
The OWC format is written to be easily extendable. We made use of this capability by adding some UKIS-specific semantic information - this information is encoded in the interfaces found in the file `eoc-owc-json.ts`.

===

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.14.

## Code scaffolding

Run `ng generate component component-name --project services-ogc` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project services-ogc`.
> Note: Don't forget to add `--project services-ogc` or else it will be added to the default project in your `angular.json` file. 

## Build

After building your library with `ng build services-ogc`, go to the dist folder `cd dist/services-ogc` and run `npm publish`.

## Running unit tests

Run `ng test services-ogc` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
