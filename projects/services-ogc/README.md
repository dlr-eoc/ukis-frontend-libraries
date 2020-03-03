# @dlr-eoc/services-ogc

This library bundles our clients for OGC standards. 

## WPS
This is a client to communicate with WPS-servers. With it, remote procedures can be called, their status monitored and their results fetched.
The service is intended to abstract away the differences between the versions of the WPS protocol. It currently supports both WPS 1.0.0 and WPS 2.0.0.

```
const c = new WpsClient('1.0.0', httpClient);
const exec$ = c.execute('http://testserver.com/wps', 'processId', inputs, outputDescriptions);
exec$.subscribe(results => console.log(results) );
```

## OWC
This is a parser to read from / write to OWC files. OWC can be used to share information about a map-context (such as extent, visible layers, zoom, ...) across multiple clients.
This parser converts to / from UKIS-specific datatypes, like UKIS-rasterlayers, UKIS-vectorlayers etc.
The OWC format is written to be easily extendable. We made use of this capability by adding some UKIS-specific semantic information - this information is encoded in the interfaces found in the file `eoc-owc-json.ts`.


```
const context: IOwsContext = {
  bbox: [ -13.684, 28.7793, 61.088, 64.9085 ],
  descriptionURL: 'https://code-de.org',
  features: [{
      geometry: null,
      id: 'S3_OLCI_L2_LAN',
      properties: {
        active: false,
        dimensions: [{
            display: 'P1D',
            name: 'time',
            units: 'ISO8601',
            value: '2017-01-01/2017-01-01/P1D'
          }],
        groupName: 'products',
        offerings: [{
            code: 'http://schemas.opengis.net/wms/1.1.1',
            operations: [{
                code: 'GetMap',
                href: 'https://geoservice.code-de.org/Sentinel3/wms?TRANSPARENT=TRUE&LAYERS=S3_OLCI_L2_LAN&VERSION=1.1.1&REQUEST=GetMap&TILED=True&FORMAT=image%2Fvnd.jpeg-png&SERVICE=WMS',
                method: 'GET',
                type: 'image/vnd.jpeg-png'
              },{
                code: 'GetCapabilities',
                href: 'https://geoservice.code-de.org/Sentinel3/wms?VERSION=1.1.1&REQUEST=GetCapabilities&SERVICE=WMS',
                method: 'GET',
                type: 'application/xml'
              },{
                code: 'GetFeatureInfo',
                href: 'https://geoservice.code-de.org/Sentinel3/wms?VERSION=1.1.1&REQUEST=GetFeatureInfo&SERVICE=WMS',
                method: 'GET',
                type: 'text/html'
              }]
          }],
        title: 'Sentinel-3 OLCI - Level 2 Land Product',
        updated: '2019-02-15T13:23:28'
      },
      type: 'Feature'
    }],
  id: 'codede:sentinel:3035',
  logoURL: 'https://geoservice.dlr.de/static/logos/dlr.gif',
  projections: [{
      bbox: [ 2000000.0, 1000000.0, 6500000.0, 5500000.0 ],
      code: 'EPSG:3035',
      default: true,
      unit: 'm'
    }],
  properties: {
    abstract: '<strong>CODE-DE</strong> Sentinel1 and 2',
    author: 'Geoservice Manager',
    authors: [{
        email: 'geoservice@dlr.de',
        name: 'Geoservice Manager',
        role: 'PoC'
      }],
    categories: [{
        term: 'WMS'
      },{
        term: 'DLR'
      }],
    lang: 'en',
    layerGroups: [{
        collapsed: false,
        groupName: 'products',
        title: 'Products',
        type: 'checkbox'
      },{
        collapsed: false,
        groupName: 'overlays',
        title: 'Overlays',
        type: 'checkbox'
      },{
        collapsed: false,
        groupName: 'base',
        title: 'Basemaps',
        type: 'radio'
      }],
    links: null,
    publisher: 'German Aerospace Center (DLR)',
    title: 'CODE-DE Sentinel 1 and 2 (EPSG:3035)',
    updated: '2019-02-15T13:23:28'
  },
  type: 'FeatureCollection'
};

const service = new OwcJsonService();
for (const resource of service.getResources(context)) {
    for (const offering of resource.properties.offerings) {
        if (service.checkIfServiceOffering(offering)) {
            const operation = offering.operations[0];
            const rlayerOptions$ = service.createRasterLayerFromOffering(offering, resource, context, targetProjection);
            rlayerOptions$.subscribe((rlayerOptions: RasterLayer) => console.log(rlayerOptions) );
        }
    }
}
```


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
