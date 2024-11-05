# Creating a basic web map application
## Introduction
In this guide you will follow the necessary steps for creating a basic web map application with the UKIS frontend libraries. At the end you should be able to set up an UKIS application yourself and start customizing it. The application contains the [core-ui](projects/core-ui/README.md), [map-ol](projects/map-ol/README.md), [base-layers-raster](projects/base-layers-raster/README.md) and [layer-control](projects/layer-control/README.md) libraries. The finished application integrates some layers from the [EOC GeoService](https://geoservice.dlr.de/web/).

## Requirements
For this tutorial to work you need a code editor of your choice (e.g. Visual Studio Code) and npm installed. 

## Setting up UKIS core-ui
### 1. Generate a new [Angular application](https://angular.dev/cli/new) in the same Version like specified in our package.json [@angular/core](package.json).
For this you have to install `@angular/cli` in this specific Version first. 
- See ukis-frontend-libraries package.json [version of @angular/core](package.json) 
```
npm install -g @angular/cli@<version>
```

- Then run:
```
ng new project-tutorial-map --style=scss --standalone=true
```
- We do not need angular routing, so decline the prompt with `N`

### 2. Move into the directory
```
cd project-tutorial-map
```
### 3. Add Clarity Angular
- At the moment Clarity does not support angular schematics ([github ng add issue](https://github.com/vmware-clarity/ng-clarity/issues/120)). Therefore Clarity has to be installed manually. For the versions also see ukis-frontend-libraries [package.json](package.json)
- Run 
```
npm install @cds/core@<version> @clr/angular@<version> @clr/ui@<version>
```

- Add Clarity Styles: This is done later by adding the UKIS Theme

- Add the Clarity module and others to app.config.ts:
```
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(BrowserModule, ClarityModule),
    provideAnimations()
    ]
};
```

- Add Clarity icons to any component that uses them.

e.g. in AppComponent
```
import { coreCollectionIcons, essentialCollectionIcons, ClarityIcons } from '@cds/core/icon';

ClarityIcons.addIcons(...coreCollectionIcons);
ClarityIcons.addIcons(...essentialCollectionIcons);

```



- Set Clarity Theme (index.html)
```
<body cds-theme="light">
```
For more information see 
- [Getting Started with Clarity Design System](https://clarity.design/documentation/get-started#seedProjectAngular)
- [Adding Clarity to an Existing Angular Application](https://clarity.design/pages/developing#adding-clarity-to-an-existing-angular-application)


### 4. Run the ng add command for the UKIS core-ui
- First you have to match the dependency of rxjs ([for ukis-frontend-libraries](package.json)), to do this you need to run
``` 
npm install rxjs@<version>
```
- Then run 
``` 
ng add @dlr-eoc/core-ui@<version> --project=project-tutorial-map 
``` 
to add files and styles from ukis-frontend-libraries in the desired version.

- Answer the promt with `Y`
- In this tutorial more additional options of the core-ui ng add like routing are not required.
- [for more information see core-ui ng-add](projects/core-ui/schematics/ng-add/schema.json)

### 5. Start and view the application
- Run `npm start`
- Open [http://localhost:4200/](http://localhost:4200/) on a browser
- You should now be able to see the basic application layout (still without a map) in the browser.

## Installing map libraries
In the following the components neccessary for the display of a web map are installed. More information can be found [in the map-ol library folder](projects/map-ol/README.md).
### 1. Add the following libraries:
```
npm install @dlr-eoc/map-ol @dlr-eoc/layer-control @dlr-eoc/base-layers-raster
```

The base layers raster library is optional, but it makes it easier to add a basemap. Without a given basemap the map canvas would be empty. 

### 2. Add styles from OpenLayers to your application

e.g. in your apps style file (src/styles.scss)
```
@import 'ol/ol.css';
...

```

### 3. Add the following to example-view.component.ts:
```
import { MapOlComponent, MapOlService } from '@dlr-eoc/map-ol';
import { LayerControlComponent, BaseLayerControlComponent} from '@dlr-eoc/layer-control';
import { LayersService } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { IMapControls } from '@dlr-eoc/map-ol';
import { OsmTileLayer, EocLitemap, BlueMarbleTile, EocLiteoverlayTile } from '@dlr-eoc/base-layers-raster';

...

providers: [LayersService, MapStateService, MapOlService],
standalone: true,
imports: [
  ...
  MapOlComponent,
  LayerControlComponent,
  BaseLayerControlComponent
]

...

controls!: IMapControls;
constructor(
  public layerSvc: LayersService,
  public mapStateSvc: MapStateService
) { }

ngOnInit(): void {
  this.addBaselayers();
}

...

addBaselayers() {
  const layers = [
    new OsmTileLayer({
      visible: false
    }),
    new EocLitemap({
      visible: true
    }),
    new BlueMarbleTile({
      visible: false
    })
  ];

  layers.map(l => this.layerSvc.addLayer(l, 'Baselayers'));
}
```

### 4. Also replace the example-view.component.html with:
```
<section class="content-area map-view">
  <ukis-map-ol [layersSvc]="layerSvc" [mapState]="mapStateSvc" [controls]="controls"></ukis-map-ol>
</section>
```
### 5. Remove the contents of example-view.component.scss
- This is necessary, as we do not have a footer or a side nav at the moment.

After these steps save your changes and visit your browser again. You should now see a working web map. As we have not included the layer control html yet, you are only able to see the baselayer with visibility set to 'true'.

## Adding layer controll and layers to the app
To enable more interaction with the application we are now adding the layer control, overlays and layers. 
### 1. First, add the layer control html code in the example-view.component.html:

```
<clr-vertical-nav [clrVerticalNavCollapsible]="true" [clr-nav-level]="2" class="right">

  <clr-vertical-nav-group [clrVerticalNavGroupExpanded]="true" class="layers">
    <cds-icon shape="world" title="Overlays" clrVerticalNavIcon></cds-icon>
    Overlays
    <clr-vertical-nav-group-children class="padding title-ellipsis">
      <ukis-layer-control [layersSvc]="layerSvc" [mapStateSvc]="mapStateSvc" [layerfilter]="'Overlays'">
      </ukis-layer-control>
    </clr-vertical-nav-group-children>
  </clr-vertical-nav-group>

  <clr-vertical-nav-group [clrVerticalNavGroupExpanded]="true" class="layers">
    <cds-icon shape="layers" clrVerticalNavIcon title="layers"></cds-icon>
    Layers
    <clr-vertical-nav-group-children class="padding title-ellipsis">
      <ukis-layer-control [layersSvc]="layerSvc" [mapStateSvc]="mapStateSvc"></ukis-layer-control>
    </clr-vertical-nav-group-children>
  </clr-vertical-nav-group>

  <clr-vertical-nav-group [clrVerticalNavGroupExpanded]="true" class="layers">
    <cds-icon shape="world" title="Baselayers" clrVerticalNavIcon></cds-icon>
    Baselayers
    <clr-vertical-nav-group-children class="padding title-ellipsis">
      <ukis-base-layer-control [layersSvc]="layerSvc" [mapStateSvc]="mapStateSvc"></ukis-base-layer-control>
    </clr-vertical-nav-group-children>
  </clr-vertical-nav-group>

</clr-vertical-nav>
```

More information about this library can be found [in the layer-control library folder](projects/layer-control/README.md).

### 2. Extend the import in the example-view.component.ts:
```
import { LayersService, Layer, WmtsLayer, RasterLayer } from '@dlr-eoc/services-layers';
import { ClarityIcons, layersIcon} from '@cds/core/icon';
ClarityIcons.addIcons(...[layersIcon]);
```

### 3. Add the overlays and layers next to the already existing baselayers in the example-view.component.ts:

```
ngOnInit() {
  this.addBaselayers();
  this.addLayers();
  this.addOverlays();
}

addBaselayers() {
  const layers: Layer[] = [
      ...
  ];

  layers.map(l => this.layerSvc.addLayer(l, 'Baselayers'));
}

addLayers() {
  const layers: Layer[] = [
    new WmtsLayer({
      type: 'wmts',
      url: 'https://tiles.geoservice.dlr.de/service/wmts',
      name: 'TDM90 DEM',
      id: 'TDM90_DEM',
      params: {
        layer: 'TDM90_DEM',
        style: 'default',
        matrixSetOptions: {
          matrixSet: 'EPSG:3857',
          tileMatrixPrefix: 'EPSG:3857'
        },
        format: 'image/png'
      },
      visible: false,
      // maxZoom: 8,
      description: 'TDM90_DEM maxZoom: 8',
      attribution: ' | TDM90 Data ©: <a href="http://www.dlr.de" target="_blank">DLR</a>  licensed for <a rel="license" target="_blank" href="https://geoservice.dlr.de/resources/licenses/tdm90/License_for_the_Utilization_of_90m_DEM_for_Scientific_Use.pdf">scientific use</a>',
      legendImg: 'https://tiles.geoservice.dlr.de/service/wmts?layer=TDM90_DEM&style=default&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A4&TileCol=8&TileRow=5',
      cssClass: 'custom-layer'
    }),

    new RasterLayer({
      type: 'wms',
      url: 'https://geoservice.dlr.de/eoc/land/wms',
      name: 'GUF Mosaic',
      id: 'GUF28_DLR_v1_Mosaic',
      params: {
        LAYERS: 'GUF28_DLR_v1_Mosaic',
        STYLES: 'guf_8bit',
      },
      tileSize: 512,
      visible: true,
      description: 'GUF28_DLR_v1_Mosaic',
      attribution: ' | GUF®: <a href="https://www.dlr.de/eoc/en/desktopdefault.aspx/tabid-9628/16557_read-40454/">DLR License</a>',
      legendImg: '',
    }),

    new RasterLayer({
      type: 'wms',
      url: 'https://geoservice.dlr.de/eoc/land/wms',
      name: 'WFS Evolution',
      id: 'WSF_Evolution',
      params: {
        LAYERS: 'WSF_Evolution',
        STYLES: 'wsfevolution',
      },
      tileSize: 512,
      visible: false,
      description: 'World Settlement Footprint Evolution',
      attribution: 'DLR/EOC: <a href="https://www.dlr.de/eoc/</a>',
      legendImg: 'https://geoservice.dlr.de/eoc/land/wms?service=WMS&version=1.3.0&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=WSF_Evolution',
    })
  ];

  layers.map(l => this.layerSvc.addLayer(l, 'Layers'));
}

addOverlays(){
  const layers: Layer[] = [
    new EocLiteoverlayTile({
      visible: true,
      displayName: 'Litelables'
    })
  ];

    layers.map(l => this.layerSvc.addLayer(l, 'Overlays'));
}
```
- For this tutorial we are using some example layers from the [EOC GeoService](https://geoservice.dlr.de/web/).
- Save and refresh your changes. You can now switch between the layers, change the layer order and adjust the opacity of individual layers in the layer control. Notice, that there is always the hierachical order overlays > layers > baselayers. Also, there is only one active baselayer possible at a time. If you do not need a layer category, you could hide or delete the corresponding code in example-view.component.html. 

## Optional adaptions
We are nearly finished with our basic example application in this tutorial. In the last steps we can adjust some details in the application.
- To change the starting view of the map, add the following changes in example-view.component.ts:
```
import { MapStateService, IMapState } from '@dlr-eoc/services-map-state';

...

controls!: IMapControls;
  /** Europe */
  public startState: IMapState = {
    zoom: 4.8,
    center: {
      lat: 50,
      lon: 15
    }
  };

  ...

    ngOnInit() {
    this.addBaselayers();
    this.addLayers();
    this.addOverlays()

    //Setting the start map state
    this.mapStateSvc.setMapState(this.startState);
  }
```
- To add some controls to the map, adjust the controls object in the example-view.component.ts:
```
constructor(
    public layerSvc: LayersService,
    public mapStateSvc: MapStateService
  ) {
    this.controls = {
      attribution: true,
      scaleLine: true,
      zoom: true
    };
  }
```
- As we have made some changes to the application, you should increase the version in the package.json to "1.0.0".
- You can adjust the application title, short title and description inside the corresponding meta tags in the index.html.

## Conclusion
Congratulations! You have set up a working web map application with the UKIS frontend libraries. Now you can start to adjust and customize the code to your needs. Make sure to check out our [demo-maps](projects/demo-maps) project, where you can find some inspirations. 
