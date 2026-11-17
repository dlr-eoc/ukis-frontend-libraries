# @dlr-eoc/services-map-state

The `MapStateService` should be an interface to handle `zoom`, `center`, `extent`, `view angle`, `rotation` and `time` of maps.
The idea is similar to `@dlr-eoc/services-layers`.
### how to use this in a ukis-angular project

```
import { MapStateService } from '@dlr-eoc/services-map-state';
```

```
constructor(public mapStateSvc: MapStateService,...)
```

```
ngOnInit(){
  this.mapStateSvc.setExtent([-14, 33, 40, 57]);
}
```


For examples see:
- [demo maps](../demo-maps/README.md)
- [map-ol](../layer-control/src/lib/base-layer-control/base-layer-control.component.ts)


This module is used by components like:
- @dlr-eoc/map-ol
- @dlr-eoc/map-cesium
- @dlr-eoc/map-maplibre
- @dlr-eoc/ngx-ukis-ui-clarity (layer-control, map-tools)
- ...

It implements a basic 'state' for the map like:
- zoom
- center
- options
- extent
- view angle (for 3D maps)
- rotation
- time

for more details [see map-state](../services-map-state/src/lib/types/map-state.ts)



===

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.0.