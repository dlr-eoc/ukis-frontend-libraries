import { Injectable } from '@angular/core';
import { Layer, VectorLayer, CustomLayer, RasterLayer, WmtsLayer, WmsLayer, TGeoExtent, TmsLayertype, WmtsLayertype, WmsLayertype, XyzLayertype, IListMatrixSet, TFiltertypesUncap, TFiltertypes } from '@dlr-eoc/services-layers';

import { ICesiumControls } from './map-cesium.component';
import { Cartesian3, Cesium3DTileStyle, Cesium3DTileset, CesiumTerrainProvider, Color, Credit, DataSource, EllipsoidTerrainProvider, GeoJsonDataSource, I3SDataProvider, ImageryLayer, Ion, JulianDate, KmlDataSource, Rectangle, TileMapServiceImageryProvider, TimeIntervalCollection, UrlTemplateImageryProvider, WebMapServiceImageryProvider, WebMapTileServiceImageryProvider, WebMercatorTilingScheme, Math as CesiumMath, BillboardGraphics} from '@cesium/engine';
import { Viewer } from '@cesium/widgets';
import { IMapCenter } from '@dlr-eoc/services-map-state';

declare type Tgroupfiltertype = TFiltertypesUncap | TFiltertypes
const WebMercator = 'EPSG:3857';
const WGS84 = 'EPSG:4326';

@Injectable({
  providedIn: 'root'
})
export class MapCesiumService {
  public viewer!: Viewer;

  //map objects for ImageryLayers
  private baseLayerImageryGroup = new Map<string, ImageryLayer>();
  private standardLayerImageryGroup = new Map<string, ImageryLayer>();
  private overlayLayerImageryGroup = new Map<string, ImageryLayer>();

  //map objects for vector DataSources
  private baseLayerDataSourceGroup = new Map<string, DataSource>();
  private standardLayerDataSourceGroup = new Map<string, DataSource>();
  private overlayLayerDataSourceGroup = new Map<string, DataSource>();

  //additional object for vector DataSource opacity
  private dataSourceOpacity = new Map<string, number>();

  //map objects for 3D data
  private terrainLayerGroup = new Map<string, boolean>(); //Map for terrain containing layerID and visibility
  private tilesetLayerGroup = new Map<string, Cesium3DTileset>(); //Map for 3D tilesets containing layerID and viewer handler

  public EPSG: string;

  //Time objects
  public cesiumCurrentTime = JulianDate.now();
  private cesiumTimeInterval = new TimeIntervalCollection();

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
    skyAtmosphere: false,
    infoBox: false,
    selectionIndicator: false,
    baseLayer: false
  };

  public defaultGlobeColor: Color = Color.WHITE;

  constructor() {
    this.EPSG = WebMercator;
  }

  //When the controlls are specified, change the default values of the viewer options
  public setControls(newControls: ICesiumControls) {
    //If an ion access token is given, set it as default. Some cesium widgets are requiring an working token.
    if (typeof newControls.ionAccessToken !== 'undefined') {
      this.addIonAccessToken(newControls.ionAccessToken);
    }
    if (typeof newControls.GoogleMapsApiKey !== 'undefined') {
      this.addGoogleMapsApiKey(newControls.GoogleMapsApiKey);
    }
    if (typeof newControls.timeline !== 'undefined') {
      this.viewerOptions.timeline = newControls.timeline;
    }
    if (typeof newControls.animation !== 'undefined') {
      this.viewerOptions.animation = newControls.animation;
    }
    if (typeof newControls.sceneModePicker !== 'undefined') {
      this.viewerOptions.sceneModePicker = newControls.sceneModePicker;
    }
    if (typeof newControls.homeButton !== 'undefined') {
      this.viewerOptions.homeButton = newControls.homeButton;
    }
    if (typeof newControls.baseLayerPicker !== 'undefined') {
      this.viewerOptions.baseLayerPicker = newControls.baseLayerPicker;
    }
    if (typeof newControls.navigationHelpButton !== 'undefined') {
      this.viewerOptions.navigationHelpButton = newControls.navigationHelpButton;
    }
    if (typeof newControls.navigationInstructionsInitiallyVisible !== 'undefined') {
      this.viewerOptions.navigationInstructionsInitiallyVisible = newControls.navigationInstructionsInitiallyVisible;
    }
    if (typeof newControls.fullscreenButton !== 'undefined') {
      this.viewerOptions.fullscreenButton = newControls.fullscreenButton;
    }
    if (typeof newControls.scene3DOnly !== 'undefined') {
      this.viewerOptions.scene3DOnly = newControls.scene3DOnly;
    }
    if (typeof newControls.infoBox !== 'undefined') {
      this.viewerOptions.infoBox = newControls.infoBox;
    }
    if (typeof newControls.selectionIndicator !== 'undefined') {
      this.viewerOptions.selectionIndicator = newControls.selectionIndicator;
    }
    if (typeof newControls.globeColor !== 'undefined') {
      this.defaultGlobeColor = Color.fromCssColorString(newControls.globeColor);
    }
  }

  //Create Cesium Viewer
  public createMap(target: HTMLElement) {

    this.viewer = new Viewer(target, this.viewerOptions);
    //remove all default baselayers
    this.viewer.imageryLayers.removeAll();

    //remove fog and ground atmosphere
    const scene = this.viewer.scene;
    scene.fog.enabled = false;
    scene.globe.showGroundAtmosphere = false;
    scene.sun.show = false;
    scene.moon.show = false;

    //reduce light effect on tilesets
    scene.globe.enableLighting = false;
    scene.highDynamicRange = false;

    //set default color to white for transparent backgrounds
    scene.globe.baseColor = this.defaultGlobeColor;

    //set start time
    this.viewer.clock.currentTime = this.cesiumCurrentTime;

    //change default infoBox
    if(this.viewerOptions.infoBox){
    this.viewer.infoBox.container.getElementsByTagName('iframe')[0].remove();
    const newDiv = document.createElement("div");
    newDiv.className = 'cesium-infoBox-content';
    newDiv.id = 'cesiumInfoBoxContent'
    this.viewer.infoBox.container.children[0].append(newDiv);
    }

    //Change primitive collection settings
    this.viewer.scene.primitives.destroyPrimitives = false;

    return {
      viewer: this.viewer
    }
  }

  // Map State functions
  // Partially not transferable to 3D globe, see: https://stackoverflow.com/questions/33237064/get-current-zoom-in-cesium
  // The following implementation is therefore not perfect but an approximation
  // Connection between zoom and map scale (WGS84/ EPSG: 4326): https://docs.geoserver.org/latest/en/user/styling/ysld/reference/scalezoom.html
  // map_scale = (2^zoom_level) / 559082264
  // Connection between map scale and view height (very rough approximation):
  // map_scale = 0.1/height
  // height = 55908226 / (2^zoom_level)
  // zoom_level = log (55908226 / height) / log (2)
  // log (2) = 0.3
  // There is also a constant offset between the zoom levels of the 2D and 3D map. To make the transition between the two maps more smooth, the cesium zoom level needs to be adjusted by this constant.


  public setZoom(zoom: number, notifier?: 'map' | 'user') {
    //set screen size dependent scale constant
    const screenSizeConst = this.viewer.canvas.width / 1000;
    zoom = zoom - screenSizeConst;
    // calculate new height and get current camera position
    const height = 55908226 / Math.pow(2, zoom);
    const currentPosition = this.viewer.camera.positionCartographic;
    // set camera to new position
    this.viewer.camera.setView({
      destination: Cartesian3.fromRadians(currentPosition.longitude, currentPosition.latitude, height)
    });
    //console.log('SetZoom: ' + height + ', ' + currentPosition.longitude + ', ' + currentPosition.latitude);
  }

  public getZoom(): number {
    let zoom: number;
    // get current height from viewer and calculate zoom value
    if (this.viewer) {
      const height = this.viewer.camera.positionCartographic.height;
      zoom = Math.round(Math.log10(55908226 / height) / 0.3);
      if (zoom < 0) {
        zoom = 0;
      }
    } else {
      // Cesium default zoom
      zoom = 2;
    }
    //console.log('GetZoom: ' + zoom);
    const screenSizeConst = this.viewer.canvas.width / 1000;
    zoom = zoom + screenSizeConst;
    return zoom;
  }

  public setCenter(center: IMapCenter) {
    // to avoid confusion about the lat, lon ordering, the IMapCenter interfaced is used here
    // get current height from viewer
    const height = this.viewer.camera.positionCartographic.height;
    // set camera to new position
    this.viewer.camera.setView({
      destination: Cartesian3.fromDegrees(center.lon, center.lat, height)
    });
    //console.log('SetCenter: ' + center.lat + ', ' + center.lon + ', ' + height);
  }

  public getCenter(): IMapCenter {
    const currentPosition = this.viewer.camera.positionCartographic;
    const lat = currentPosition.latitude * (180 / Math.PI);
    const lon = currentPosition.longitude * (180 / Math.PI);
    //console.log('GetCenter: ' + lat + ', ' + lon);
    return {lat: lat,lon: lon};
  }

  public setExtent(extent: TGeoExtent, geographic?: boolean, fitOptions?: any) {
    const destination = Rectangle.fromDegrees(extent[0], extent[1], extent[2], extent[3]);
    this.viewer.camera.setView({ destination });
    //console.log('SetExtent: ' + extent[0] + ', ' + extent[1] + ', ' + extent[3] + ', ' + extent[4]);
  }


  public getCurrentExtent(geographic?: boolean): TGeoExtent {
    let extent!: TGeoExtent;
    // https://cesium.com/learn/cesiumjs/ref-doc/Rectangle.html
    const currentRectangle = this.viewer.camera.computeViewRectangle();
    if (currentRectangle) {
      const minX = currentRectangle.west * (180 / Math.PI);
      const minY = currentRectangle.south * (180 / Math.PI);
      const maxX = currentRectangle.east * (180 / Math.PI);
      const maxY = currentRectangle.north * (180 / Math.PI);
      extent = [minX, minY, maxX, maxY];
      //console.log('GetCurrentExtent: ' + minX + ', ' + minY + ', ' + maxX  + ', ' + maxY);
    }
    return extent;
  }

  /**
    *  Set initial oblique view, see https://cesium.com/learn/cesiumjs/ref-doc/Camera.html
    *  subtract 90°, to get the same behavior as in openlayers
    *  options of viewer.camera.flyTo`
    *
    * https://github.com/CesiumGS/cesium/blob/99d6fffe20d9cf19f2d70de97777dc00a435bc5e/packages/engine/Source/Scene/Camera.js#L1457
    * https://github.com/CesiumGS/cesium/blob/99d6fffe20d9cf19f2d70de97777dc00a435bc5e/packages/engine/Source/Scene/Camera.js#L3540-L3541
    */
  public setViewAngle(viewAngle: number, options?: any) {
    const flyToOptions = Object.assign({
      destination: this.viewer.camera.position,
      orientation: {
        heading: this.viewer.camera.heading,
        pitch: CesiumMath.toRadians(viewAngle - 90),
        roll: this.viewer.camera.roll,
      },
    }, options || {});

    this.viewer.camera.flyTo(flyToOptions)
  }

  /**
   * @param options of viewer.camera.flyTo
   */
  public setNadirViewAngle(options?: any) {
    if (this.getViewAngle() !== 0) {
      if (options) {
        this.setViewAngle(0, options);
      } else {
        this.setViewAngle(0);
      }
    }else{
      // If view angle is 0, setViewAngle(0) (flyTo) is not necessary
      console.log(typeof options.complete);
      if(options.complete && typeof options.complete === 'function'){
        options.complete();
      }
    }
  }

  //add 90°, to get the same behavior as in openlayers
  public getViewAngle():number{
    return CesiumMath.toDegrees(this.viewer.camera.pitch) + 90;
  }

  /**
    *  subtract rotation degree from 360° to get the same behavior as in openlayers
    *  options of viewer.camera.flyTo`
    *
    * https://github.com/CesiumGS/cesium/blob/99d6fffe20d9cf19f2d70de97777dc00a435bc5e/packages/engine/Source/Scene/Camera.js#L3424
    * https://github.com/CesiumGS/cesium/blob/99d6fffe20d9cf19f2d70de97777dc00a435bc5e/packages/engine/Source/Scene/Camera.js#L1456
    */
  public setRotation(rotation: number, options?: any) {
    const flyToOptions = Object.assign({
      destination: this.viewer.camera.position,
      orientation: {
        heading: CesiumMath.toRadians(360 - rotation),
        pitch: this.viewer.camera.pitch,
        roll: this.viewer.camera.roll,
      },
    }, options || {});

    this.viewer.camera.flyTo(flyToOptions);
  }
  // subtract rotation degree from 360° to get the same behavior as in openlayers
  public getRotation():number{
    return 360 - CesiumMath.toDegrees(this.viewer.camera.heading);
  }

  // https://sandcastle.cesium.com/index.html?src=Imagery%2520Layers.html
  // https://sandcastle.cesium.com/index.html?src=Imagery%2520Layers%2520Manipulation.html


  public getAll2DLayersSize(filtertype: Tgroupfiltertype): number {
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
    let length = 0;
    if (lowerType === 'baselayers') {
      length = this.baseLayerImageryGroup.size + this.baseLayerDataSourceGroup.size;
    } else if (lowerType === 'layers') {
      length = this.standardLayerImageryGroup.size + this.standardLayerDataSourceGroup.size;
    } else if (lowerType === 'overlays') {
      length = this.overlayLayerImageryGroup.size + this.overlayLayerDataSourceGroup.size;
    }
    return length;
  }

  public get2DImageryLayersSize(filtertype: Tgroupfiltertype): number {
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
    let length = 0;
    if (lowerType === 'baselayers') {
      length = this.baseLayerImageryGroup.size;
    } else if (lowerType === 'layers') {
      length = this.standardLayerImageryGroup.size;
    } else if (lowerType === 'overlays') {
      length = this.overlayLayerImageryGroup.size;
    }
    return length;
  }

  public getDataSourceLayersSize(filtertype: Tgroupfiltertype): number {
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
    let length = 0;
    if (lowerType === 'baselayers') {
      length = this.baseLayerDataSourceGroup.size;
    } else if (lowerType === 'layers') {
      length = this.standardLayerDataSourceGroup.size;
    } else if (lowerType === 'overlays') {
      length = this.overlayLayerDataSourceGroup.size;
    }
    return length;
  }

  public getVisible2DLayersSize(filtertype: Tgroupfiltertype): number {
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
    let length = 0;
    if (lowerType === 'baselayers') {
      this.baseLayerImageryGroup.forEach(value => {
        if (value.show) {
          length++;
        }
      });
      this.baseLayerDataSourceGroup.forEach(value => {
        if (value.show) {
          length++;
        }
      });
    } else if (lowerType === 'layers') {
      this.standardLayerImageryGroup.forEach(value => {
        if (value.show) {
          length++;
        }
      });
      this.standardLayerDataSourceGroup.forEach(value => {
        if (value.show) {
          length++;
        }
      });
    } else if (lowerType === 'overlays') {
      this.overlayLayerImageryGroup.forEach(value => {
        if (value.show) {
          length++;
        }
      });
      this.overlayLayerDataSourceGroup.forEach(value => {
        if (value.show) {
          length++;
        }
      });
    }
    return length;
  }
  public get3DLayersSize(filtertype: Tgroupfiltertype): number {
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
    let length = 0;
    if (lowerType === 'baselayers') {
      length = this.terrainLayerGroup.size;
    } else if (lowerType === 'layers') {
      length = this.tilesetLayerGroup.size;
    }
    return length;
  }

  public getVisible3DLayersSize(filtertype: Tgroupfiltertype): number {
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
    let length = 0;
    if (lowerType === 'baselayers') {
      this.terrainLayerGroup.forEach(value => {
        if (value) {
          length++;
        }
      });
    } else if (lowerType === 'layers') {
      this.tilesetLayerGroup.forEach(value => {
        if (value.show) {
          length++;
        }
      });
    }
    return length;
  }

  public set2DUkisLayers(layers: Array<Layer>, filtertype: Tgroupfiltertype) {
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
    const tempLayers: ImageryLayer[] = [];
    this.remove2DLayers(lowerType);

    layers.forEach((newLayer) => {
      const layerType = newLayer.type;
      if (layerType === 'geojson' || layerType === 'kml') {
        const dataSourceLayer = this.create_dataSource_layer(newLayer as VectorLayer);
        if (typeof dataSourceLayer !== 'undefined') {
          if (lowerType === 'baselayers') {
            this.baseLayerDataSourceGroup.set(newLayer.id, dataSourceLayer);
          } else if (lowerType === 'layers') {
            this.standardLayerDataSourceGroup.set(newLayer.id, dataSourceLayer);
          } else if (lowerType === 'overlays') {
            this.overlayLayerDataSourceGroup.set(newLayer.id, dataSourceLayer);
          }
          this.viewer.dataSources.add(dataSourceLayer);
        }
      } else {
        const layer = this.create_2D_layer(newLayer);
        // check if layer not undefined
        if (typeof layer !== 'undefined') {
          tempLayers.push(layer);
          let layerIndex = layers.indexOf(newLayer);
          // index must be greater than or equal to zero and less than or equal to the number of the layers.

          if (layerIndex > this.viewer.imageryLayers.length) {
            layerIndex = this.viewer.imageryLayers.length;
          }
          if (lowerType === 'baselayers') {
            this.baseLayerImageryGroup.set(newLayer.id, layer);
          } else if (lowerType === 'layers') {
            layerIndex += this.get2DImageryLayersSize('baselayers');
            this.standardLayerImageryGroup.set(newLayer.id, layer);
          } else if (lowerType === 'overlays') {
            layerIndex += (this.get2DImageryLayersSize('baselayers') + this.get2DImageryLayersSize('layers'));
            this.overlayLayerImageryGroup.set(newLayer.id, layer);
          }
          this.viewer.imageryLayers.add(layer, layerIndex);
        }
      }
    });
  }

  public set3DUkisLayers(layers: Array<Layer>, filtertype: Tgroupfiltertype) {
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
    this.remove3DLayers(lowerType);

    layers.forEach((newLayer) => {
      this.create_3D_layer(newLayer as CustomLayer);
    })
  }

  private create_2D_layer(newLayer: Layer) {
    let newImageryLayer!: ImageryLayer;
    switch (newLayer.type) {
      case XyzLayertype:
        newImageryLayer = this.create_xyz_layer(newLayer as RasterLayer);
        break;
      case WmsLayertype:
        newImageryLayer = this.create_wms_layer(newLayer as WmsLayer);
        break;
      case WmtsLayertype:
        newImageryLayer = this.create_wmts_layer(newLayer as WmtsLayer);
        break;
      case TmsLayertype:
        if (newLayer instanceof RasterLayer) {
          newImageryLayer = this.create_xyz_layer(newLayer as RasterLayer);
          break;
        } else if (newLayer instanceof VectorLayer) {
          newImageryLayer = this.create_tms_layer(newLayer as VectorLayer);
          break;
        } else {
          console.log('Not supportet layer type: ' + newLayer.type + ' layer: ' + newLayer.name);
          break;
        }
      /*
      case WfsLayertype:
        // WFS is currently (01/2023) not supported by Cesium
        break;
      */
      default:
        console.log('Not supportet layer type: ' + newLayer.type + ' layer: ' + newLayer.name);
        break;
    }

    return newImageryLayer;
  }

  private create_3D_layer(newLayer: CustomLayer) {

    if (newLayer.custom_layer instanceof CesiumTerrainProvider) {
      this.setTerrain(newLayer);
    } else if (newLayer.custom_layer instanceof EllipsoidTerrainProvider) {
      this.setTerrain(newLayer);
    } else if (newLayer.custom_layer instanceof Cesium3DTileset || newLayer.custom_layer instanceof I3SDataProvider) {
      this.create_3Dtileset_layer(newLayer);
    } else {
      console.log('Not supportet layer type: ' + newLayer.name);
    }

  }


  private create_xyz_layer(l: RasterLayer): ImageryLayer {
    let maxLevel = 20;
    let enablePopups = false;
    if (l.maxZoom) {
      maxLevel = l.maxZoom;
    }
    if (l.popup) {
      enablePopups = true;
    }
    const newImageryLayer = new ImageryLayer(
      new UrlTemplateImageryProvider({
        url: l.url,
        subdomains: l.subdomains,
        credit: l.attribution,
        maximumLevel: maxLevel,
        enablePickFeatures: enablePopups
      }),
      {
        show: l.visible,
        alpha: l.opacity
      });
    return newImageryLayer;
  }

  private create_wms_layer(l: WmsLayer): ImageryLayer {
    let defaultFormat = 'image/png';
    let maxLevel = 20;
    if (l.maxZoom) {
      maxLevel = l.maxZoom;
    }
    if (l.params.FORMAT) {
      defaultFormat = l.params.FORMAT;
    }
    let wmsOptions = {} as WebMapServiceImageryProvider.ConstructorOptions;
    if (l.bbox) {
      wmsOptions.rectangle = Rectangle.fromDegrees(l.bbox[0], l.bbox[1], l.bbox[2], l.bbox[3]);
    }
    wmsOptions = {
      url: l.url,
      credit: l.attribution,
      layers: l.params.LAYERS,
      parameters: { transparent: l.params.TRANSPARENT, format: defaultFormat, tiled: l.params.TILED },
      maximumLevel: maxLevel,
      srs: this.EPSG,
      tilingScheme: new WebMercatorTilingScheme()
    }

    if (l.params.TIME) {
      wmsOptions.clock = this.viewer.clock;
      wmsOptions.times = this.cesiumTimeInterval;
    }

    if (l.popup) {
      wmsOptions.enablePickFeatures = true;
    } else {
      wmsOptions.enablePickFeatures = false;
    }

    const newImageryLayer = new ImageryLayer(
      new WebMapServiceImageryProvider(wmsOptions),
      {
        show: l.visible,
        alpha: l.opacity
      });
    return newImageryLayer;
  }

  private create_wmts_layer(l: WmtsLayer): ImageryLayer {
    let maxLevel = 16;
    if (l.maxZoom) {
      let maxLevel = l.maxZoom;
    }
    const matrixOptions = l.params.matrixSetOptions as IListMatrixSet;
    let wmtsOptions = {} as WebMapTileServiceImageryProvider.ConstructorOptions;
    if (matrixOptions.matrixIds) {
      wmtsOptions = {
        url: l.url,
        credit: l.attribution,
        layer: l.params.layer,
        style: l.params.style,
        format: l.params.format,
        tileMatrixSetID: matrixOptions.matrixSet,
        tileMatrixLabels: matrixOptions.matrixIds,
        maximumLevel: matrixOptions.matrixIds.length - 1
      };
    } else {
      wmtsOptions = {
        url: l.url,
        credit: l.attribution,
        layer: l.params.layer,
        style: l.params.style,
        format: l.params.format,
        tileMatrixSetID: this.EPSG,
        tileMatrixLabels: Array(maxLevel + 1).fill(null).map((e, i) => this.EPSG + ':' + i),
        maximumLevel: maxLevel
      };
    }
    if (l.bbox) {
      wmtsOptions.rectangle = Rectangle.fromDegrees(l.bbox[0], l.bbox[1], l.bbox[2], l.bbox[3]);
    }
    if (l.popup) {
      //Not supported by cesium as 07/2024, https://cesium.com/learn/cesiumjs/ref-doc/WebMapTileServiceImageryProvider.html#pickFeatures
    }
    const newImageryLayer = new ImageryLayer(
      new WebMapTileServiceImageryProvider(wmtsOptions),
      {
        show: l.visible,
        alpha: l.opacity
      });
    return newImageryLayer;
  }

  private create_tms_layer(l: VectorLayer): ImageryLayer {
    const constructorOptions = {
      url: l.url,
      fileExtension: 'png',
      maximumLevel: l.maxZoom,
      minimumLevel: l.minZoom
    } as TileMapServiceImageryProvider.ConstructorOptions;

    if (l.attribution) {
      constructorOptions.credit = new Credit(l.attribution);
    }

    const tmsImageryProvider = new TileMapServiceImageryProvider(constructorOptions);

    const imageryOptions = {
      show: l.visible,
      alpha: l.opacity
    };

    return new ImageryLayer(tmsImageryProvider, imageryOptions);
  }

  private create_dataSource_layer(l: VectorLayer): DataSource {
    let newDataSource;
    if (l.type === 'geojson') {
      newDataSource = this.create_geojson_layer(l);
    } else if (l.type === 'kml') {
      newDataSource = this.create_kml_layer(l);
    }
    return newDataSource as DataSource;
  }

  private create_geojson_layer(l: VectorLayer): GeoJsonDataSource {
    const newGeoJsonDataSource = new GeoJsonDataSource();
    // default UKIS values
    let fillColor = Color.fromCssColorString('#FFFFFF99');
    let strokeColor = Color.fromCssColorString('#3399CC');
    let strokeWidth = 1;
    let clamp = false;

    if(l.options && l.options.style){
      const styleProperties = l.options.style(l.data)[0];
      if(styleProperties){
      fillColor = Color.fromCssColorString(styleProperties.fill_.color_) || fillColor;
      strokeColor = Color.fromCssColorString(styleProperties.stroke_.color_) || strokeColor;
      strokeWidth = styleProperties.stroke_.width_ || strokeWidth;
      }
      if(l.options['clampToGround']){
        clamp = l.options['clampToGround'];
      }
    }
    const dataSourceOptions = {
      // as Cesium cannot handle an opacity for the whole datasource, we need to modify the layer opacity,
      // in case the cesium color already has an opacity value
      fill: fillColor.withAlpha(l.opacity*fillColor.alpha),
      stroke: strokeColor.withAlpha(l.opacity*strokeColor.alpha),
      strokeWidth: strokeWidth,
      clampToGround: clamp
    } as GeoJsonDataSource.LoadOptions;

    if (l.attribution) {
      dataSourceOptions.credit = new Credit(l.attribution);
    }

    newGeoJsonDataSource.load(l.data, dataSourceOptions).then(function(){
      let i = 0;
      const entityArray = newGeoJsonDataSource.entities.values;
      //check if vector data has icon features and set the icon graphic accordingly
      entityArray.forEach(entity => {
        if(l.data['features'] && l.data['features'][i]['properties'] && l.data['features'][i]['properties']['iconUrl']){
          entity.billboard =  new BillboardGraphics({
            image: l.data['features'][i]['properties']['iconUrl'],
            width: 20,
            height: 20
          });
          entity.description = l.data['features'][i]['properties']['id'];
        }
        i++;
      });
    });
    newGeoJsonDataSource.show = l.visible;
    newGeoJsonDataSource.name = l.name;

    this.dataSourceOpacity.set(l.id, l.opacity);
    return newGeoJsonDataSource;
  }

  private create_kml_layer(l: VectorLayer): KmlDataSource {
    const newKmlDataSource = new KmlDataSource();

    const dataSourceOptions = {} as KmlDataSource.ConstructorOptions;
    if (l.attribution) {
      dataSourceOptions.credit = new Credit(l.attribution);
    }
    newKmlDataSource.load(l.data, dataSourceOptions);
    newKmlDataSource.show = l.visible;
    newKmlDataSource.name = l.id;
    return newKmlDataSource;
  }

  public getLayerById(id: string, filtertype: Tgroupfiltertype): ImageryLayer | DataSource | undefined {
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
    let wantedLayer;
    if (lowerType === 'baselayers') {
      if (this.baseLayerImageryGroup.has(id)) {
        wantedLayer = this.baseLayerImageryGroup.get(id);
      } else if(this.baseLayerDataSourceGroup.has(id)){
        wantedLayer = this.baseLayerDataSourceGroup.get(id);
      }
    } else if (lowerType === 'layers') {
      if (this.standardLayerImageryGroup.has(id)) {
        wantedLayer = this.standardLayerImageryGroup.get(id);
      } else if(this.standardLayerDataSourceGroup.has(id)){
        wantedLayer = this.standardLayerDataSourceGroup.get(id);
      }
    } else if (lowerType === 'overlays') {
      if (this.overlayLayerImageryGroup.has(id)) {
        wantedLayer = this.overlayLayerImageryGroup.get(id);
      } else if(this.overlayLayerDataSourceGroup.has(id)){
        wantedLayer = this.overlayLayerDataSourceGroup.get(id);
      }
    }
    return wantedLayer;
  }

  public removeAll2DLayers() {
    let IDs = Array.from(this.baseLayerImageryGroup.keys());
    this.remove2DLayer(IDs, 'baselayers');
    IDs = Array.from(this.standardLayerImageryGroup.keys());
    this.remove2DLayer(IDs, 'layers');
    IDs = Array.from(this.overlayLayerImageryGroup.keys());
    this.remove2DLayer(IDs, 'overlays');
    IDs = Array.from(this.baseLayerDataSourceGroup.keys());
    this.remove2DLayer(IDs, 'baselayers');
    IDs = Array.from(this.standardLayerDataSourceGroup.keys());
    this.remove2DLayer(IDs, 'layers');
    IDs = Array.from(this.overlayLayerDataSourceGroup.keys());
    this.remove2DLayer(IDs, 'overlays');
  }

  public remove2DLayers(filtertype: Tgroupfiltertype) {
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
    if (lowerType === 'baselayers') {
      let IDs = Array.from(this.baseLayerImageryGroup.keys());
      this.remove2DLayer(IDs, 'baselayers');
      IDs = Array.from(this.baseLayerDataSourceGroup.keys());
      this.remove2DLayer(IDs, 'baselayers');
    } else if (lowerType === 'layers') {
      let IDs = Array.from(this.standardLayerImageryGroup.keys());
      this.remove2DLayer(IDs, 'layers');
      IDs = Array.from(this.standardLayerDataSourceGroup.keys());
      this.remove2DLayer(IDs, 'layers');
    } else if (lowerType === 'overlays') {
      let IDs = Array.from(this.overlayLayerImageryGroup.keys());
      this.remove2DLayer(IDs, 'overlays');
      IDs = Array.from(this.overlayLayerDataSourceGroup.keys());
      this.remove2DLayer(IDs, 'overlays');
    }
  }

  public remove2DLayer(layerId: string[], filtertype: Tgroupfiltertype) {
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
    if (lowerType === 'baselayers') {
      layerId.forEach(id => {
        if (this.baseLayerImageryGroup.has(id)) {
          this.viewer.imageryLayers.remove(this.baseLayerImageryGroup.get(id)!);
          this.baseLayerImageryGroup.delete(id);
        } else if (this.baseLayerDataSourceGroup.has(id)) {
          this.viewer.dataSources.remove(this.baseLayerDataSourceGroup.get(id)!);
          this.baseLayerDataSourceGroup.delete(id);
          if (this.dataSourceOpacity.has(id)) {
            this.dataSourceOpacity.delete(id);
          }
        }
      });
    } else if (lowerType === 'layers') {
      layerId.forEach(id => {
        if (this.standardLayerImageryGroup.has(id)) {
          this.viewer.imageryLayers.remove(this.standardLayerImageryGroup.get(id)!);
          this.standardLayerImageryGroup.delete(id);
        } else if (this.standardLayerDataSourceGroup.has(id)) {
          this.viewer.dataSources.remove(this.standardLayerDataSourceGroup.get(id)!);
          this.standardLayerDataSourceGroup.delete(id);
          if (this.dataSourceOpacity.has(id)) {
            this.dataSourceOpacity.delete(id);
          }
        }
      });
    } else if (lowerType === 'overlays') {
      layerId.forEach(id => {
        if (this.overlayLayerImageryGroup.has(id)) {
          this.viewer.imageryLayers.remove(this.overlayLayerImageryGroup.get(id)!);
          this.overlayLayerImageryGroup.delete(id);
        } else if (this.overlayLayerDataSourceGroup.has(id)) {
          this.viewer.dataSources.remove(this.overlayLayerDataSourceGroup.get(id)!);
          this.overlayLayerDataSourceGroup.delete(id);
          if (this.dataSourceOpacity.has(id)) {
            this.dataSourceOpacity.delete(id);
          }
        }
      });
    }

  }

  public removeAll3DLayers() {
    let IDs = Array.from(this.terrainLayerGroup.keys());
    this.remove3DLayer(IDs, 'baselayers');
    IDs = Array.from(this.tilesetLayerGroup.keys());
    this.remove3DLayer(IDs, 'layers');
  }

  public remove3DLayers(filtertype: Tgroupfiltertype) {
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
    if (lowerType === 'baselayers') {
      const IDs = Array.from(this.terrainLayerGroup.keys());
      this.remove3DLayer(IDs, 'baselayers');
    } else if (lowerType === 'layers') {
       const IDs = Array.from(this.tilesetLayerGroup.keys());
       this.remove3DLayer(IDs, 'layers');
      this.tilesetLayerGroup.clear();
    }
  }

  public remove3DLayer(layerId: string[], filtertype: Tgroupfiltertype) {
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
    if (lowerType === 'baselayers') {
      layerId.forEach(id => {
        if (this.terrainLayerGroup.has(id)) {
          this.removeTerrain()
          this.terrainLayerGroup.delete(id);
        }
      });
    } else if (lowerType === 'layers') {
      layerId.forEach(id => {
        if (this.tilesetLayerGroup.has(id)) {
          const temp = this.viewer.scene.primitives.remove(this.tilesetLayerGroup.get(id)!);
          this.tilesetLayerGroup.delete(id);
        }
      });
    }
  }

  public update2DLayerOpacity(layers: Layer[], filtertype: Tgroupfiltertype) {
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;

      if (lowerType === 'baselayers') {
        for (const layer of layers) {
        if (this.baseLayerImageryGroup.has(layer.id)) {
          const viewerLayer = this.baseLayerImageryGroup.get(layer.id);
          if (viewerLayer && viewerLayer.alpha !== layer.opacity) {
            viewerLayer.alpha = layer.opacity;
          }
        } else if (this.baseLayerDataSourceGroup.has(layer.id)) {
          //only set new datasource, if opacity has changed
          if (this.dataSourceOpacity.get(layer.id) != layer.opacity) {
            const oldDataSourceLayer = this.baseLayerDataSourceGroup.get(layer.id) as DataSource;
            this.viewer.dataSources.remove(oldDataSourceLayer);
            const newDataSourceLayer = this.create_dataSource_layer(layer as VectorLayer);
            this.viewer.dataSources.add(newDataSourceLayer);
            this.baseLayerDataSourceGroup.set(layer.id, newDataSourceLayer);
            this.dataSourceOpacity.set(layer.id, layer.opacity);
          }
        }
      }
      } else if (lowerType === 'layers') {
        for (const layer of layers) {
        if (this.standardLayerImageryGroup.has(layer.id)) {
          const viewerLayer = this.standardLayerImageryGroup.get(layer.id);

          if (viewerLayer && viewerLayer.alpha !== layer.opacity) {
            viewerLayer.alpha = layer.opacity;
          }
        } else if (this.standardLayerDataSourceGroup.has(layer.id)) {
          //only set new datasource, if opacity has changed
          if (this.dataSourceOpacity.get(layer.id) != layer.opacity) {
            const oldDataSourceLayer = this.standardLayerDataSourceGroup.get(layer.id) as DataSource;
            this.viewer.dataSources.remove(oldDataSourceLayer);
            const newDataSourceLayer = this.create_dataSource_layer(layer as VectorLayer);
            this.viewer.dataSources.add(newDataSourceLayer);
            this.standardLayerDataSourceGroup.set(layer.id, newDataSourceLayer);
            this.dataSourceOpacity.set(layer.id, layer.opacity);
          }
        }
      }
      } else if (lowerType === 'overlays') {
        for (const layer of layers) {
        if (this.overlayLayerImageryGroup.has(layer.id)) {
          const viewerLayer = this.overlayLayerImageryGroup.get(layer.id);

          if (viewerLayer && viewerLayer.alpha !== layer.opacity) {
            viewerLayer.alpha = layer.opacity;
          }
        } else if (this.overlayLayerDataSourceGroup.has(layer.id)) {
          //only set new datasource, if opacity has changed
          if (this.dataSourceOpacity.get(layer.id) != layer.opacity) {
            const oldDataSourceLayer = this.overlayLayerDataSourceGroup.get(layer.id) as DataSource;
            this.viewer.dataSources.remove(oldDataSourceLayer);
            const newDataSourceLayer = this.create_dataSource_layer(layer as VectorLayer);
            this.viewer.dataSources.add(newDataSourceLayer);
            this.overlayLayerDataSourceGroup.set(layer.id, newDataSourceLayer);
            this.dataSourceOpacity.set(layer.id, layer.opacity);
          }
        }
      }
    }
  }

  public update2DLayerVisibility(layers: Layer[], filtertype: Tgroupfiltertype) {
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
    for (const layer of layers) {
      if (layer.type === 'geojson' || layer.type === 'kml') {
        if (lowerType === 'baselayers') {
          const dataSourceLayer = this.baseLayerDataSourceGroup.get(layer.id);
          if (dataSourceLayer && dataSourceLayer.show !== layer.visible) {
            dataSourceLayer.show = layer.visible;
          }
        } else if (lowerType === 'layers') {
          const dataSourceLayer = this.standardLayerDataSourceGroup.get(layer.id);
          if (dataSourceLayer && dataSourceLayer.show !== layer.visible) {
            dataSourceLayer.show = layer.visible;
          }
        } else if (lowerType === 'overlays') {
          const dataSourceLayer = this.overlayLayerDataSourceGroup.get(layer.id);
          if (dataSourceLayer && dataSourceLayer.show !== layer.visible) {
            dataSourceLayer.show = layer.visible;
          }
        }
      } else {
        if (lowerType === 'baselayers') {
          if (this.baseLayerImageryGroup.has(layer.id)) {
            const viewerLayer = this.baseLayerImageryGroup.get(layer.id);

            if (viewerLayer && viewerLayer.show !== layer.visible) {
              viewerLayer.show = layer.visible;
            }
          }
        } else if (lowerType === 'layers') {
          if (this.standardLayerImageryGroup.has(layer.id)) {
            const viewerLayer = this.standardLayerImageryGroup.get(layer.id);
            if (viewerLayer && viewerLayer.show !== layer.visible) {
              viewerLayer.show = layer.visible;
            }
          }
        } else if (lowerType === 'overlays') {
          if (this.overlayLayerImageryGroup.has(layer.id)) {
            const viewerLayer = this.overlayLayerImageryGroup.get(layer.id);

            if (viewerLayer && viewerLayer.show !== layer.visible) {
              viewerLayer.show = layer.visible;
            }
          }
        }
      }
    }

  }

  public update2DLayerZIndex(layers: Layer[], filtertype: Tgroupfiltertype) {
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
    const layerCollection = this.viewer.imageryLayers;

      if (lowerType === 'baselayers') {
        for (const layer of layers) {
        if (this.baseLayerImageryGroup.has(layer.id)) {
          const viewerLayer = this.baseLayerImageryGroup.get(layer.id);
          if (viewerLayer) {
            const cesiumIndex = layerCollection.indexOf(viewerLayer);
            const layerIndex = layers.indexOf(layer);
            if (cesiumIndex !== layerIndex) {
              const diffIndex = cesiumIndex - layerIndex;
              if (diffIndex < 0) {
                // Move layer up in collection
                for (let i = 0; i < Math.abs(diffIndex); i++) {
                  layerCollection.raise(viewerLayer);
                }
              } else if (diffIndex > 0) {
                // Move layer down in collection
                for (let i = 0; i < Math.abs(diffIndex); i++) {
                  layerCollection.lower(viewerLayer);
                }
              }
            }
          }
        }
      }
      } else if (lowerType === 'layers') {
        for (const layer of layers) {
        if (this.standardLayerImageryGroup.has(layer.id)) {
          const viewerLayer = this.standardLayerImageryGroup.get(layer.id);
          if (viewerLayer) {
            const cesiumIndex = layerCollection.indexOf(viewerLayer);
            const layerIndex = layers.indexOf(layer) + this.get2DImageryLayersSize('baselayers');
            //console.log('CesiumIndex: '+ cesiumIndex);
            //console.log('LayerIndex: '+ layerIndex);
            if (cesiumIndex !== layerIndex) {
              const diffIndex = cesiumIndex - layerIndex;
              if (diffIndex < 0) {
                // Move layer up in collection
                for (let i = 0; i < Math.abs(diffIndex); i++) {
                  layerCollection.raise(viewerLayer);
                }
              } else if (diffIndex > 0) {
                // Move layer down in collection
                for (let i = 0; i < Math.abs(diffIndex); i++) {
                  layerCollection.lower(viewerLayer);
                }
              }
            }
          }
          }
        }
      } else if (lowerType === 'overlays') {
        for (const layer of layers) {
        if (this.overlayLayerImageryGroup.has(layer.id)) {
          const viewerLayer = this.overlayLayerImageryGroup.get(layer.id);
          if (viewerLayer) {
            const cesiumIndex = layerCollection.indexOf(viewerLayer);
            const layerIndex = layers.indexOf(layer) + this.get2DImageryLayersSize('baselayers') + this.get2DImageryLayersSize('layers');
            if (cesiumIndex !== layerIndex) {
              const diffIndex = cesiumIndex - layerIndex;
              if (diffIndex < 0) {
                // Move layer up in collection
                for (let i = 0; i < Math.abs(diffIndex); i++) {
                  layerCollection.raise(viewerLayer);
                }
              } else if (diffIndex > 0) {
                // Move layer down in collection
                for (let i = 0; i < Math.abs(diffIndex); i++) {
                  layerCollection.lower(viewerLayer);
                }
              }
            }
          }
        }
        }
    }

  }

  public updateDataSourceZIndex(layers: Layer[], filtertype: Tgroupfiltertype) {
    const dataSourceCollection = this.viewer.dataSources;
    if(dataSourceCollection.length>1){
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
      if (lowerType === 'baselayers') {
        for (const layer of layers) {
        if (this.baseLayerDataSourceGroup.has(layer.id)) {
          const viewerLayer = this.baseLayerDataSourceGroup.get(layer.id);
          if (viewerLayer) {
            const cesiumIndex = dataSourceCollection.indexOf(viewerLayer);
            const layerIndex = layers.indexOf(layer);
            if (cesiumIndex !== layerIndex && cesiumIndex >= 0) {
              const diffIndex = cesiumIndex - layerIndex;
              if (diffIndex < 0) {
                // Move layer up in collection
                for (let i = 0; i < Math.abs(diffIndex); i++) {
                  dataSourceCollection.raise(viewerLayer);
                }
              } else if (diffIndex > 0) {
                // Move layer down in collection
                for (let i = 0; i < Math.abs(diffIndex); i++) {
                  dataSourceCollection.lower(viewerLayer);
                }
              }
            }
          }
          }
        }
      } else if (lowerType === 'layers') {
        for (const layer of layers) {
        if (this.standardLayerDataSourceGroup.has(layer.id)) {
          const viewerLayer = this.standardLayerDataSourceGroup.get(layer.id);
          if (viewerLayer) {
            const cesiumIndex = dataSourceCollection.indexOf(viewerLayer);
            const layerIndex = layers.indexOf(layer) + this.getDataSourceLayersSize('baselayers');
            if (cesiumIndex !== layerIndex && cesiumIndex >= 0) {
              const diffIndex = cesiumIndex - layerIndex;
              if (diffIndex < 0) {
                // Move layer up in collection
                for (let i = 0; i < Math.abs(diffIndex); i++) {
                  dataSourceCollection.raise(viewerLayer);
                }
              } else if (diffIndex > 0) {
                // Move layer down in collection
                for (let i = 0; i < Math.abs(diffIndex); i++) {
                  dataSourceCollection.lower(viewerLayer);
                }
              }
            }
          }
          }
        }
      } else if (lowerType === 'overlays') {
        for (const layer of layers) {
        if (this.overlayLayerDataSourceGroup.has(layer.id)) {
          const viewerLayer = this.overlayLayerDataSourceGroup.get(layer.id);
          if (viewerLayer) {
            const cesiumIndex = dataSourceCollection.indexOf(viewerLayer);
            const layerIndex = layers.indexOf(layer) + this.getDataSourceLayersSize('baselayers') + this.getDataSourceLayersSize('layers');
            if (cesiumIndex !== layerIndex && cesiumIndex >= 0){
              const diffIndex = cesiumIndex - layerIndex;
              if (diffIndex < 0) {
                // Move layer up in collection
                for (let i = 0; i < Math.abs(diffIndex); i++) {
                  dataSourceCollection.raise(viewerLayer);
                }
              } else if (diffIndex > 0) {
                // Move layer down in collection
                for (let i = 0; i < Math.abs(diffIndex); i++) {
                  dataSourceCollection.lower(viewerLayer);
                }
              }
            }
          }
        }
      }
    }
  }
  }


  //Adding terrain provider from Layer
  public setTerrain(terrainLayer: CustomLayer) {
    if (terrainLayer.visible) {
      this.viewer.terrainProvider = terrainLayer.custom_layer;
    }
    this.terrainLayerGroup.set(terrainLayer.id, terrainLayer.visible);
  }

  public setDefaultTerrain() {
    this.viewer.terrainProvider = new EllipsoidTerrainProvider();
  }

  public removeTerrain() {
    this.viewer.terrainProvider = new EllipsoidTerrainProvider({});
  }

  private create_3Dtileset_layer(tilesetLayer: CustomLayer) {
    try {
      const new_tileset_layer = this.viewer.scene.primitives.add(tilesetLayer.custom_layer);
      if (new_tileset_layer.style == undefined) {
        new_tileset_layer.style = new Cesium3DTileStyle({
          "show": "true",
          "color": "color('white'," + tilesetLayer.opacity + ")"
        });
      }
      new_tileset_layer.credit = new Credit(tilesetLayer.attribution!);

      //set the luminance of the tileset. A high value reduces the day/night sun based lighting effect. Default value is 0.2
    if(tilesetLayer.custom_layer.imageBasedLighting){
      new_tileset_layer.imageBasedLighting.luminanceAtZenith = tilesetLayer.custom_layer.imageBasedLighting.luminanceAtZenith;
      }

      this.tilesetLayerGroup.set(tilesetLayer.id, new_tileset_layer);
    } catch (error) {
      console.log(`There was an error creating the 3D Data Provider: ${error}`);
    }

  }

  private dataCallback(interval: { stop: JulianDate; start: JulianDate; }, index: number) {
    let time;
    if (index === 0) {
      time = JulianDate.toIso8601(interval.stop);
    } else {
      time = JulianDate.toIso8601(interval.start);
    }

    return {
      Time: time
    };
  }

  public update3DLayerVisibility(layers: Layer[], filtertype: Tgroupfiltertype) {
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
    for (const layer of layers) {
      if (lowerType === 'baselayers') {
        const customLayer = layer as CustomLayer;
        if (customLayer.custom_layer instanceof CesiumTerrainProvider || customLayer.custom_layer instanceof EllipsoidTerrainProvider) {
          if (layer.visible) {
            this.removeTerrain();
            this.setTerrain(customLayer);
          }
        }
      } else if (lowerType === 'layers') {
        if (this.tilesetLayerGroup.has(layer.id)) {
          const tilesetLayer = this.tilesetLayerGroup.get(layer.id);
          if (tilesetLayer && tilesetLayer.show !== layer.visible) {
            tilesetLayer.show = layer.visible;
          }
        }
      }
    }
  }

  public update3DLayerOpacity(layers: Layer[], filtertype: Tgroupfiltertype) {
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
    for (const layer of layers) {
      if (lowerType === 'baselayers') {
        //not needed
      } else if (lowerType === 'layers') {

        const customLayer = layer as CustomLayer;
        if (customLayer.custom_layer instanceof Cesium3DTileset) {
          if (this.tilesetLayerGroup.has(layer.id)) {
            const viewerLayer = this.tilesetLayerGroup.get(layer.id);
            if (viewerLayer) {
              viewerLayer.style = new Cesium3DTileStyle({
                "show": "true",
                "color": "color('lightgrey'," + layer.opacity + ")"
              });
            }
          }
        }
      }
    }
  }

  public initTime(startTime: string) {
    this.cesiumCurrentTime = JulianDate.fromIso8601(startTime);
  }

  public updateTime(newTime: string) {
    const newClockTime = JulianDate.fromIso8601(newTime);
    //Check first, if time has changed
    if (!JulianDate.equals(newClockTime, this.cesiumCurrentTime)) {
      this.cesiumCurrentTime = newClockTime;
      this.viewer.clock.currentTime = newClockTime;
    }
  }

  public setTimeInterval(times: string[]) {
    this.cesiumTimeInterval = TimeIntervalCollection.fromIso8601DateArray({
      iso8601Dates: times,
      leadingInterval: true,
      trailingInterval: true,
      isStopIncluded: false, // We want stop time to be part of the trailing interval
      dataCallback: this.dataCallback,

    });
  }

  addIonAccessToken(token: string) {
    if(token){
      Ion.defaultAccessToken = token;
    }
  }
  addGoogleMapsApiKey(key: string) {
    if(key){
    //GoogleMaps.defaultApiKey = key;
    }
  }

  destroyLayerGrpoups() {
    this.baseLayerImageryGroup.clear();
    this.standardLayerImageryGroup.clear();
    this.overlayLayerImageryGroup.clear();

    this.baseLayerDataSourceGroup.clear();
    this.standardLayerDataSourceGroup.clear();
    this.overlayLayerDataSourceGroup.clear();

    this.dataSourceOpacity.clear();

    this.terrainLayerGroup.clear();
    this.tilesetLayerGroup.clear();
  }

}
