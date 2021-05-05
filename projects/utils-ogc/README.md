# @dlr-eoc/utils-ogc

This library bundles our clients for OGC standards. 
The long-term-strategy is to make all services in `@dlr-eoc/services-ogc` independent of angular and move them here.

## WPS
This is a client to communicate with WPS-servers. With it, remote procedures can be called, their status monitored and their results fetched.
The service is intended to abstract away the differences between the versions of the WPS protocol. It currently supports both WPS 1.0.0 and WPS 2.0.0.

```
const c = new WpsClient('1.0.0', httpClient);
const exec$ = c.execute('http://testserver.com/wps', 'processId', inputs, outputDescriptions);
exec$.subscribe(results => console.log(results) );
```

## Jsonix
Parts of this library depend on [jsonix](https://github.com/highsource/jsonix). The current version of jsonix ([3.0.0](https://github.com/highsource/jsonix/releases/tag/3.0.0)) does not build to ES2015. To still be able to use this library, we created a [fork with some minor modifications](https://github.com/MichaelLangbein/jsonix). As soon as the main repository of jsonix has fixed its build problems (we're working on a pull-request) we can move from our fork back to the main repo.  


## WMS
A simple client to parse WMS-GetCapabilities documents into json.
That json-information might be used to create an ol- or ukis-layer, but that step is to be done by another library.