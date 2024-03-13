import { Component, OnInit, HostBinding, OnDestroy, Inject, ViewEncapsulation } from '@angular/core';
import { LayersService, Layer, WmtsLayer, RasterLayer, CustomLayer, WmsLayer, VectorLayer } from '@dlr-eoc/services-layers';
import { MapStateService, IMapState } from '@dlr-eoc/services-map-state';

import { OsmTileLayer, EocLitemap, BlueMarbleTile, EocLiteoverlayTile } from '@dlr-eoc/base-layers-raster';
import { ICesiumControls, MapCesiumService } from '@dlr-eoc/map-cesium';
import { MapOlService } from '@dlr-eoc/map-ol';
import { Cesium3DTileset, CesiumTerrainProvider, Credit, EllipsoidTerrainProvider, I3SDataProvider, createGooglePhotorealistic3DTileset } from '@cesium/engine';
import testData from '@dlr-eoc/shared-assets/geojson/test.json';
import { Feature } from 'ol';
import { Fill, Stroke, Style } from 'ol/style';

@Component({
  selector: 'app-route-example-cesium',
  templateUrl: './route-example-cesium.component.html',
  styleUrls: ['./route-example-cesium.component.scss'],
  // https://medium.com/@rishanthakumar/angular-lazy-load-common-styles-specific-to-a-feature-module-c3f81c40daf1
  encapsulation: ViewEncapsulation.None,
  providers: [
    MapStateService,
    MapOlService,
    MapCesiumService,
    {
      provide: 'twoDlayerSvc', useClass: LayersService
    }, {
      provide: 'threeDlayerSvc', useClass: LayersService
    }]
})
export class RouteExampleCesiumComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'content-container';

  controls!: ICesiumControls;
  /** Europe */
  public startState: IMapState = {
    zoom: 3,
    center: {
      lat: 40,
      lon: 13
    },
    rotation: 0,
    viewAngle: 0
  };

  //Set inititial 2D/3D state
  is2dMap: boolean = false;

  constructor(
    @Inject('twoDlayerSvc') public twoDlayerSvc: LayersService,
    @Inject('threeDlayerSvc') public threeDlayerSvc: LayersService,
    public mapOlSvc: MapOlService,
    public mapStateSvc: MapStateService,
    public mapCesiumSvc: MapCesiumService
  ) {
    this.controls = {
      infoBox: true,
      selectionIndicator: true
    }
  }

  ngOnInit() {
    //set 2D layer
    this.addBaselayers();
    this.addLayers();
    this.addOverlays();

    //set 3D layer
    this.addTilelayer();
    this.addTerrainlayer();

    //Setting the start map state
    this.mapStateSvc.setMapState(this.startState);
  }

  ngOnDestroy() {

  }

  addBaselayers() {
    const layers = [
      new OsmTileLayer({
        visible: true
      }),
      new EocLitemap({
        visible: false
      }),
      new BlueMarbleTile({
        visible: false
      })
    ];

    layers.map(l => this.twoDlayerSvc.addLayer(l, 'Baselayers'));
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
          TRANSPARENT: true
        },
        tileSize: 512,
        visible: false,
        description: 'GUF28_DLR_v1_Mosaic',
        attribution: ' | GUF®: <a href="https://www.dlr.de/eoc/en/desktopdefault.aspx/tabid-9628/16557_read-40454/">DLR License</a>',
        legendImg: '',
      }),
      new WmsLayer({
        type: 'wms',
        id: 'metopGome2Ozone',
        name: 'MetOp GOME-2 L2C Daily O3 Combined',
        visible: true,
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
        expanded: false,
        popup: true,
        time: new Date().toISOString()
      }),
      new WmsLayer({
        type: 'wms',
        id: 'gsp_yearly',
        name: 'Global SnowPack Yearly',
        visible: false,
        opacity: 1,
        description: 'This product shows the snow cover duration for a hydrological year. Its beginning differs from the calendar year, since some of the precipitation that falls in late autumn and winter falls as snow and only drains away when the snow melts in the following spring or summer.',
        legendImg: 'https://geoservice.dlr.de/eoc/land/wms?service=WMS&version=1.3.0&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=GSP_SCD_P1Y',
        url: 'https://geoservice.dlr.de/eoc/land/wms',
        params: {
          LAYERS: 'GSP_SCD_P1Y',
          TRANSPARENT: true
        },
        expanded: false,
        popup: true
      })
    ];

    layers.map(l => this.twoDlayerSvc.addLayer(l, 'Layers'));
  }

  addOverlays() {
    const layers: Layer[] = [
      new EocLiteoverlayTile({
        visible: true,
        displayName: 'Litelables'
      }), new RasterLayer({
        type: 'wms',
        url: 'https://geoservice.dlr.de/eoc/land/wms',
        name: 'WSF Evolution',
        id: 'WSF_Evolution',
        params: {
          LAYERS: 'WSF_Evolution',
          STYLES: 'wsfevolution',
          TRANSPARENT: true
        },
        tileSize: 512,
        visible: false,
        description: 'World Settlement Footprint Evolution',
        attribution: 'DLR/EOC: <a href="https://www.dlr.de/eoc/</a>',
        legendImg: 'https://geoservice.dlr.de/eoc/land/wms?service=WMS&version=1.3.0&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=WSF_Evolution',
      }),
      new VectorLayer({
        id: 'kml_test',
        name: 'KML Vector Layer',
        attribution: `© DLR KML`,
        type: 'kml',
        data: 'assets/kml/TimeZones.kml',
        visible: false
      }),
      new VectorLayer({
        id: 'geojson_test',
        name: 'GeoJSON Vector Layer (default)',
        attribution: `© DLR GeoJSON`,
        type: 'geojson',
        data: testData,
        visible: false,
        popup: true
      }),
      new VectorLayer({
        id: 'geojson_test2',
        name: 'GeoJSON Vector Layer (styled)',
        attribution: `© DLR GeoJSON`,
        type: 'geojson',
        data: testData,
        visible: false,
        popup: true,
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
    ];

    layers.map(l => this.twoDlayerSvc.addLayer(l, 'Overlays'));
  }

  async addTilelayer() {
    // Dataservices from the masterportal: https://bitbucket.org/geowerkstatt-hamburg/masterportalapi/src/master/
    // https://github1s.com/CesiumGS/cesium/blob/690b4e8850493c9c208b7bd137e9692cbeeca698/packages/engine/Source/Scene/Cesium3DTileset.js#L997-L998
    // https://cesium.com/learn/cesiumjs/ref-doc/Cesium3DTileset.html
    const hamburg = new CustomLayer({
      name: 'Hamburg 3D',
      displayName: 'Hamburg 3D (LoD2 Tileset)',
      id: 'hamburg_3d',
      custom_layer: await Cesium3DTileset.fromUrl('https://daten-hamburg.de/gdi3d/datasource-data/LoD2/tileset.json', { show: false }),
      visible: false,
      description: '3D Model of Hamburg',
      type: 'custom',
      opacity: 1,
      attribution: '© Hamburg Masterportal'
    });

    // https://cesium.com/learn/cesiumjs/ref-doc/I3SDataProvider.html
    const i3s_tileset = new CustomLayer({
      name: 'Frankfurt 3D',
      displayName: 'Frankfurt 3D (Esri i3s)',
      id: 'i3s_3d',
      custom_layer: await I3SDataProvider.fromUrl('https://tiles.arcgis.com/tiles/z2tnIkrLQ2BRzr6P/arcgis/rest/services/Frankfurt2017_vi3s_18/SceneServer/layers/0', { show: false }),
      visible: false,
      description: 'Esri Portal 3D Model',
      type: 'custom',
      opacity: 1,
      attribution: '© Esri'
    });


    const layers = [hamburg, i3s_tileset];
    layers.map(l => this.threeDlayerSvc.addLayer(l, 'Layers'));
  }

  async addTerrainlayer() {

    // Dataservices from the masterportal: https://bitbucket.org/geowerkstatt-hamburg/masterportalapi/src/master/
    const hamburg_dgm = new CustomLayer({
      name: 'Hamburg Terrain',
      displayName: 'Hamburg Terrain',
      id: 'hamburg_terrain',
      custom_layer: await CesiumTerrainProvider.fromUrl('https://daten-hamburg.de/gdi3d/datasource-data/Gelaende/',
        {
          credit: new Credit(`© MasterPortal Hamburg`)
        }),
      visible: false,
      attribution: `© MasterPortal Hamburg`,
      description: 'Geländemodell Hamburg',
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


    const layers = [hamburg_dgm, default_ellipsoid];
    layers.map(l => this.threeDlayerSvc.addLayer(l, 'Baselayers'));
  }

  changeMapDimension() {
    if (this.is2dMap) {
      this.is2dMap = false;
    } else {
      this.mapCesiumSvc.setNadirViewAngle({
        complete: () => {
          this.is2dMap = true;
        }
      });
    }
  }

  setViewAngle() {
    /** set map rotation with the MapStateService */
    this.mapStateSvc.setViewAngle(45);
  }
  resetViewAngle() {
    /** set map rotation with the MapStateService */
    this.mapStateSvc.setViewAngle(0);
  }
  setRotation() {
    /** set map rotation with the MapStateService */
    this.mapStateSvc.setRotation(10);
  }
  resetRotation() {
    /** set map rotation with the MapStateService, due to the rotation constraint small numbers are snapped to 0 */
    this.mapStateSvc.setRotation(0);
  }
}

