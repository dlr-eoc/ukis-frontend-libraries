# In this folder there are the components for each angular application route

- the route component.ts must have a ```@HostBinding('class') class = 'content-container';``` to work with the clarity layout!

- if the routes don't should share the same services e.g you want a new map instance on a other route use e.g.
```providers: [MapOlService, MapStateService, LayersService]```

- the route template should have a clarity content-area and e.g. a clr-vertical-nav
``` 
<section class="content-area"></section>
<clr-vertical-nav></clr-vertical-nav>
```

for more information see:
- [clarity application layout](https://clarity.design/documentation/app-layout) and
- [clarity navigation](https://clarity.design/documentation/navigation) and
- [clarity vertical nav](https://clarity.design/documentation/vertical-nav/)
