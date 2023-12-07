# @dlr-eoc/map-cesium
This library enables the UKIS frontend to display content on a 3D virtual globe using [CesiumJS](https://cesium.com/platform/cesiumjs/). It uses the same toolsets as the 2D mapping libraries and adds additional 3D capabilities. In the most basic version, map-cesium is displaying 2D maps on a 3D globe without explicit 3D content.

### How to use this in a ukis-angular (@dlr-eoc/core-ui) project
First, install and setupt UKIS core, like described in the [Tutorial](../../TUTORIALS.md#setting-up-ukis-core-ui).

#### Add the following dependencies to the package.json
- "@dlr-eoc/map-cesium"
- "@dlr-eoc/layer-control" (optional)
- "@dlr-eoc/base-layers-raster" (optional)

#### Add styles from cesium to your application

e.g. in your apps style file
```
// styles.scss/styles.css
@import '@cesium/widgets/Source/widgets.css';
...

```

or in the angular config file
```
// angular.json
...
  "styles": [
    ...
    "node_modules/@cesium/widgets/Source/widgets.css",
    "src/styles.scss"
  ],
...

```

#### Add assets for angular-cli build and serve
```
// angular.json
 "assets": [
              ...
              {
                "glob": "**/*",
                "input": "node_modules/@cesium/engine/Source/Assets",
                "output": "/assets/cesium/Assets"
              },
              {
                "glob": "**/*.css",
                "input": "node_modules/@cesium/widgets/Source/",
                "output": "/assets/cesium/Widgets/"
              },
              {
                "glob": "**/*",
                "input": "node_modules/@cesium/engine/Build/Workers",
                "output": "/assets/cesium/Workers"
              },
              {
                "glob": "**/*",
                "input": "node_modules/@cesium/engine/Source/ThirdParty",
                "output": "/assets/cesium/ThirdParty"
              }
            ],
```

#### Add CESIUM_BASE_URL as a global object in main.ts:
```
// main.ts
(window as Record<string, any>)['CESIUM_BASE_URL'] = 'assets/cesium/';
```

Now, you can display the same layers as used in the [Tutorial](https://github.com/dlr-eoc/ukis-frontend-libraries/blob/main/TUTORIALS.md#adding-layer-controll-and-layers) on the cesium 3D globe.

To make the application more interesting, let's add some global layers from the [EOC GeoService](https://geoservice.dlr.de/web/) to the layers array in example-view.component.ts:
```
  new WmsLayer({
        type: 'wms',
        id: 'metopGome2Ozone',
        name: 'MetOp GOME-2 L2C Daily O3 Combined',
        visible: false,
        opacity: 0.8,
        description: 'MetOp GOME-2 Total Column Ozone (O3) Composite Layer',
        legendImg: 'https://geoservice.dlr.de/eoc/atmosphere/wms?service=WMS&version=1.3.0&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=METOP_GOME-2_L2C_P1D_COMB_O3',
        url: 'https://geoservice.dlr.de/eoc/atmosphere/wms',
        params: {
          LAYERS: 'METOP_GOME-2_L2C_P1D_COMB_O3',
          FORMAT: 'image/vnd.jpeg-png',
          VERSION: '1.1.1',
          TRANSPARENT: true
        },
        expanded: false
      })
```

#### CesiumJS controls
You can add widgets to the cesium viewer by specifying them in an `ICesiumControls` object. For some widgets it is neccessary to add a working cesium ion access token as well.
```
  //Default viewer options
  private viewerOptions: Viewer.ConstructorOptions = {
    timeline: false,
    animation: false,
    sceneModePicker: false,
    homeButton: false,
    baseLayerPicker: false,
    geocoder: false, //the geocoder requires an cesium ion access token to work
    navigationHelpButton: false,
    navigationInstructionsInitiallyVisible: false,
    fullscreenButton: false,
    scene3DOnly: true,
    infoBox: false
  };
```
The widgets can be switched on and off inside the constructor of example-view.component.ts:
```
controls!: ICesiumControls;
 constructor(
    ...
  ) {
    this.controls = {
      navigationHelpButton: true
    }
  }
```

#### Popup handling with infoBox widget
Popups for layers inside Cesium are handled with the [InfoBox widget](https://cesium.com/learn/cesiumjs/ref-doc/InfoBox.html). It can be activated inside the ICesiumControls:
```
controls!: ICesiumControls;
constructor() {
    this.controls = {
      infoBox: true
    }
  }
```
The layers, for which the popup should be visible, need to set popup to true in the layer definition:

```
new VectorLayer({
    id: 'geojson_test',
    name: 'GeoJSON Vector Layer',
    attribution: `© DLR GeoJSON`,
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [
       ...
       ]
    },
    visible: false,
    popup: true
  })
```

#### Adding 3D content
Layer with 3D content like terrain and tilesets can be added with a second instance of the layers service. 3D tilesets have to be added as 'Layers', terrain datasets as 'Baselayers'.
Change the following inside example-view.component.ts:

```
@Component({
  selector: 'app-example-view',
  templateUrl: './example-view.component.html',
  styleUrls: ['./example-view.component.scss'],
  providers: [
    {
      provide: 'twoDlayerSvc', useClass: LayersService
    }, {
      provide: 'threeDlayerSvc', useClass: LayersService
    }
    ...
  ]
})
```

```
onstructor(
    @Inject('twoDlayerSvc') public twoDlayerSvc: LayersService,
    @Inject('threeDlayerSvc') public threeDlayerSvc: LayersService,
    public mapStateSvc: MapStateService
  ) {
   ...
  }
```

Then you can add 3D services, e.g.
```
addTilelayer(){
  // Cesium 3D Tileset Datasource as Custom Layer
  const tileset_layer = new CustomLayer({
    name: '3D Tileset',
    displayName: '3D Tileset',
    id: 'tileset_3d',
    custom_layer: new Cesium3DTileset({
      url:'https://link_to_dataset/tileset.json',
      show: false
    }),
    visible: false,
    description: '3D Tileset',
    type: 'custom',
    opacity: 1
  });

  const layers = [tileset_layer];
  layers.map(l => this.threeDlayerSvc.addLayer(l, 'Layers'));
}

addTerrainlayer(){
  // Terrain Datasource as Custom Layer
  const terrain_layer = new CustomLayer({
    name: 'Terain',
    displayName: 'Terrain',
    id: 'terrain',
    custom_layer: new CesiumTerrainProvider({
      url:'https://link_to_terrain_dataset',
      credit: new Credit('© <a href="https://link_to_dataprovider">Attribution</a>')
    }),
    visible: false,
    description: 'digital elevation modell with 5m grid resulution',
    type: 'custom',
  });

  const default_ellipsoid = new CustomLayer({
    name: 'Ellipsoid',
    displayName: 'Ellipsoid',
    id: 'ellipsoid',
    custom_layer: new EllipsoidTerrainProvider({}),
    visible: true,
    attribution: ``,
    description: '',
    type: 'custom',
  });


  const layers = [terrain_layer, default_ellipsoid];
  layers.map(l => this.threeDlayerSvc.addLayer(l, 'Baselayers'));
}
```
To be able to interact with the layers in the viewer, additional layer controls have to be added to the vertical nav in `example-view.component.html`. Note, that the 3D serve-layers instanced is used here.
```
      <clr-vertical-nav-group [clrVerticalNavGroupExpanded]="true" class="layers three-d-layer-control">
        <clr-icon shape="block" clrVerticalNavIcon title="tilelayers"></clr-icon>
        3D Tilelayers
        <clr-vertical-nav-group-children class="padding title-ellipsis">
          <ukis-layer-control [layersSvc]="threeDlayerSvc" [mapStateSvc]="mapStateSvc"></ukis-layer-control>
        </clr-vertical-nav-group-children>
      </clr-vertical-nav-group>

      <clr-vertical-nav-group [clrVerticalNavGroupExpanded]="true" class="layers">
        <clr-icon shape="world" title="terain" clrVerticalNavIcon></clr-icon>
        3D Terrain
        <clr-vertical-nav-group-children class="padding title-ellipsis">
          <ukis-base-layer-control [layersSvc]="threeDlayerSvc" [mapStateSvc]="mapStateSvc"></ukis-base-layer-control>
        </clr-vertical-nav-group-children>
      </clr-vertical-nav-group>
```
#### Service for the 3D layers
Instead of a new 3D layer service, the existing [@dlr-eoc/services-layers](https://github.com/dlr-eoc/ukis-frontend-libraries/tree/main/projects/services-layers) is used. To be able to handle 2D and 3D data efficiently, two separate service-layers instances are needed. The first one manages the 2D data in the same way as for map-ol. The second one handles the 3D data sources. As there are no dedicated layer types for 3D data sources at the moment, the custom layer type is used. Terrain layer should be added as 'Baselayers' and tilesets as standard 'Layers'. This has the benefit, that only one terrain layer can be selected at a time in the layer control.  This leads to some restrictions, but no changes in the libraries code is necessary for this. In the future, dedicated 3D layer types should be integrated to allow for more input of the 3D data layers, e.g. attributes like height-offset or conditional coloring of tilesets.

#### Serving 3D content
At the moment there are not many services out there, which serve 3D data. If you have data in the right format ([Cesium 3D Tiles](https://github.com/CesiumGS/3d-tiles), [Cesium quantized-mesh](https://github.com/CesiumGS/quantized-mesh)) available, everything you need is a web server for making the data accessible to the app. To quickly test the 3D capabilities you could use [http-server](https://github.com/http-party/http-server) to host 3D tiles and terrain meshes locally. A useful tool for generating terrain in the quantized-mesh format is the  [Cesium Terrain Builder Docker](https://github.com/tum-gis/cesium-terrain-builder-docker).

#### Styling geoJSON vector layer
GeoJSON layer in Cesium access the layer.options style property. To clamp a vector layer to the ground use `clampToGround: true` as an optional property of layer.options. Here is an example:
```
new VectorLayer({
        id: 'geojson_test',
        name: 'GeoJSON Vector Layer',
        attribution: `© Attribution`,
        type: 'geojson',
        data: testData,
        visible: true,
        options: {
          style: (feature: Feature) => {
            let styles = [];

            let polygonStyle = new Style({
              stroke: new Stroke({
                color: '#FF7400',
                width: 1
              }),
              fill: new Fill({
                color: '#FF7400' + '99',

              }),
            });
            styles.push(polygonStyle);
            return styles;
          },
          clampToGround: false
        }
      })
```

#### Notes
- Terrain has to be attributed with a new Cesium Credit object, see the example above. 
- GeoJSON layer are supported, but they are always shown above imagery layers, regardless of their ordering index in the layer control. Therefore they should be added as overlays.
- As of 01/2023, WFS is not supported by Cesium yet. 
- KmlDataSource does not support opacity change at the moment.
- The stroke-width of vector polygons in Cesium does not change on non Apple browsers. There seems to be an issue with the browser support for this feature.
- When a vector layer is clamped to the ground, Cesium does not display the stroke anymore. Cesium's proposed workaround at the moment is to include the stroke as additional polyline vector layer. 


===

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.0.

## Code scaffolding

Run `ng generate component component-name --project map-cesium` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project map-cesium`.
> Note: Don't forget to add `--project map-cesium` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build map-cesium` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build map-cesium`, go to the dist folder `cd dist/map-cesium` and run `npm publish`.

## Running unit tests

Run `ng test map-cesium` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
