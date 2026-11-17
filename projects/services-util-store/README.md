# @dlr-eoc/services-util-store

### how to use this in a ukis-angular project

```
import { UtilStoreService } from '@dlr-eoc/services-util-store';
```

```
constructor(private UtilStore: UtilStoreService,...)
```

```
function(){
  // set value
  this.UtilStore.local(key, value);

  // get value
  const value = this.UtilStore.local(key);
}
```


For examples see:
- [demo maps](../demo-maps/README.md)
- [cookie-alert](../cookie-alert/src/lib/cookie-alert.component.ts)


This module is used by components like:
- @dlr-eoc/cookie-alert
- @dlr-eoc/services-ogc
- ...


It implements a basic 'storage' to store key value based data in:
- local: localStorage
- session: sessionStorage
- runtime: runtimeStorage
- cookie


for more details [see map-state](../services-util-store/src/lib/util-store.service.ts)




===

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.0.