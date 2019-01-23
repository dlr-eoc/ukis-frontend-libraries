# ObservationExplorer

This module allows to visualize list of observations/layers in tabular form. User can select observations/layers and add the on the map.

## Getting started

to integrate the Module in the [UI-Project](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/ui-core/browse) add this dependencies in the package.json

```
"@ukis/services": "git+http://git.ukis.eoc.dlr.de/scm/mofro/services.git",
"@ukis/datatypes": "git+http://git.ukis.eoc.dlr.de/scm/mofro/datatypes.git",
```

and Import this in the app Module (ukis.module.ts)
```
import { LayersServiceModule } from '@ukis/services/src/app/layers/layers.module';
import { MapstateServiceModule } from '@ukis/services/src/app/mapstate/mapstate.module';


imports: [
    MapstateServiceModule.forRoot(),
    LayersServiceModule.forRoot(),
    ...
  ],
```

In the route-map (folder route-map with route-map.component.html, route-map.component.ts, route-map.component.scss) or in any other component where ObservationExplorer must be integrated, it is necessary to make following import:

```
import { RestService } from "@ukis/services/src/app/rest/rest.service";
```
then in constructor of component add this:
```
    constructor(
    ...
    private obsRestSvc: RestService,
    ...
    ){
     obsRestSvc.init("url.com/rest");
    }

```

Imported "RestService" populates two methods that are used in ObservationExplorer:

1) getData() - which returns Observable of IOwsContext (geojson_ows)
2) getDataFromUrl(url:string) - which used to get data from given url (e.g. for fetching geojson from wfs)


Then, in [route-map].component.html, add 
```
<ukis-observationexplorer [obsRestSvc]="obsRestSvc"></ukis-observationexplorer>
```

here is an example how to integrate it in modal form:

```
<clr-modal *ngIf="user.loggedIn" [(clrModalOpen)]="obsListOpen" [clrModalStaticBackdrop]="false">
  <h3 class="modal-title">Observation explorer</h3>
  <div class="modal-body">
    <ukis-observationexplorer [obsRestSvc]="obsRestSvc"></ukis-observationexplorer>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-primary" (click)="obsListOpen = false">Ok</button>
  </div>
</clr-modal>
```

ObservationExplorer will build the table automatically, based on attributes in the observations[0].properties.customAttributes section

