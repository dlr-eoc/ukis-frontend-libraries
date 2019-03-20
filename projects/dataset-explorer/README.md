# Dataset Explorer

This module allows to visualize list of observations/layers in tabular form. User can select observations/layers and add the on the map.
Main use case is the Coastal Explorer.

## Getting started

to integrate the Module in the [UI-Project](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/project-frontend) add this dependencies in the package.json

```
"@ukis/dataset-explorer": "2.0.0",
```

and Import this in the app Module (app.module.ts)
```

import { DatasetExplorerModule } from '@ukis/dataset-explorer';


imports: [
     DatasetExplorerModule,
    ...
  ],
```

In the route-map (folder route-map with route-map.component.html, route-map.component.ts, route-map.component.scss) or in any other component where DatasetExplorer must be integrated, it is necessary to make following import:

```
import { DataGridDescriptor, DatasetExplorerService } from '@ukis/dataset-explorer';
```
then in constructor of component add this:
```
    constructor(
    ...
    @Inject(DatasetExplorerService) public datasetSvc: DatasetExplorerService,
    ...
    ){
     
    }

```

The Dataset Explorer grid can be configured depending on th DataGridDescriptor and also filter poperties:
```
  // class variables
  tableProps: DataGridDescriptor;
  filterProps: any[];

  /**
   * configure the table for dataset explorer
   */
  addObservations() {
    this.tableProps = {
      rowclass: "properties.customAttributes.type", rowdetail: "properties.customAttributes.description",
      columns: [{ title: "Type", prop: "properties.customAttributes.type", type: "image", hidden: true },
      { title: "Title", prop: "properties.title", bind: true, type: "test" },
      {
        title: "Download", prop: { href: "properties.download.href", title: "properties.title", status: "properties.download.status" },
        bind: true, type: "download", hidden: window.innerWidth < 500
      }]
    };
    this.filterProps = [{ title: "Themes", prop: "themes" }, { title: "Datatypes", prop: "dataTypes" }];

    // call the owc service;
    this.datasetSvc.getObservations("http://129.247.184.155/rest/owc").subscribe(
      data => { this.testOwsContext = data; }
    );
  }
```

The injected "DatasetExplorerService" retrieves a OWC with the fucntion getObservations() which returns an Observable of IOwsContext.


Then, in [route-map].component.html, add the <ukis-dataset-explorer> with inputs of LayerService, IOwsContext, DataGridDescriptor
```
<ukis-dataset-explorer [layers-svc]="layerSvc" [ows-context]="testOwsContext" [table-props]="tableProps" [filter-props]="filterProps"></ukis-dataset-explorer>
```

Here is an example how to integrate it in modal form:

```
<clr-modal *ngIf="testOwsContext" [(clrModalOpen)]="modalOpen" [clrModalSize]="'xl'" [clrModalStaticBackdrop]="false">

            <h3 class="modal-title">Dataset Explorer</h3>
            <div class="modal-body">
                <ukis-dataset-explorer [layers-svc]="layerSvc" [ows-context]="testOwsContext" [table-props]="tableProps" [filter-props]="filterProps"></ukis-dataset-explorer>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" (click)="modalOpen = false">Ok</button>
            </div>

        </clr-modal>
```

Dataset Explorer will build the table automatically, based on the DataGridDescriptor.

## Customisation
Grid Layout: 
To customize the grid, you need to adapt the tableProps in your route-map.component.ts in the project-frontend branch. 
Filtering:
Furthermore, filter can be adapted by modifying the filterProps array. Have a look into assets/coastalx.test.context.ts for an example OWC that shows the structure of a thesaurus mapping to customAttributes.categoryIds in the layer offerings. The OWC Properties are extended by themes and dataTypes, which define the keywords for the filter mechanism in the Dataset Explorer. 
Icons:
Currently, there is an image icon array defined in dataset-explorer.component.ts. This array holds relative paths to icons placed in the project-frontend path, so the icons need to be located in /assets/icons in the project specific angular app, and not within the dataset explorer library. Issue with packagr: https://github.com/ng-packagr/ng-packagr/issues/1092



## Testing 

To run the jasmine tests, simply execute 
```
ng test dataset-explorer
```