import { Component, OnInit, ViewEncapsulation, Input, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { MapState, MapStateService } from '@dlr-eoc/services-map-state';
import { Subscription, Subject } from 'rxjs';
import { filter, skip } from 'rxjs/operators';
import { MapCesiumService } from './map-cesium.service';
import { LayersService, Layer, TFiltertypes, TFiltertypesUncap } from '@dlr-eoc/services-layers';
import { Viewer } from '@cesium/widgets';
import { GeoJsonDataSource, ScreenSpaceEventHandler, ScreenSpaceEventType } from '@cesium/engine';


export interface ICesiumControls {
  //See: https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html#.ConstructorOptions
  timeline?: boolean;
  animation?: boolean;
  sceneModePicker?: boolean;
  homeButton?: boolean;
  baseLayerPicker?: boolean;
  geocoder?: boolean;
  navigationHelpButton?: boolean;
  navigationInstructionsInitiallyVisible?: boolean;
  fullscreenButton?: boolean;
  scene3DOnly?: boolean;
  infoBox?: boolean;
  //Also you can define an Cesium ion Access Token, https://cesium.com/learn/ion/cesium-ion-access-tokens/
  ionAccessToken?: string;
  //In the same way you can provide a personal key for Google Maps, https://cesium.com/learn/cesiumjs-learn/cesiumjs-photorealistic-3d-tiles/
  GoogleMapsApiKey?: string;
  selectionIndicator?: boolean;
}

declare type Tgroupfiltertype = TFiltertypesUncap | TFiltertypes;


@Component({
  selector: 'ukis-map-cesium',
  templateUrl: './map-cesium.component.html',
  styleUrls: ['./map-cesium.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapCesiumComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('cesiumMapDiv') mapDivView!: ElementRef;
  @ViewChild('cesiumCreditDiv') creditDivView!: ElementRef;
  @Input('twoDlayersSvc') twoDlayersSvc!: LayersService;
  @Input('threeDlayersSvc') threeDlayersSvc!: LayersService;
  @Input('mapState') mapStateSvc!: MapStateService;
  @Input('controls') controls!: ICesiumControls;
  @Input('timeInterval') timeInterval?: string[];
  @Input('startTime') startTime?: string | null;

  viewer!: Viewer;
  subs: Subscription[] = [];
  mapCreated = new Subject<boolean>();
  initState = true;

  constructor(private mapSvc: MapCesiumService) { }

  ngOnInit(): void {
    if (!this.twoDlayersSvc) {
      console.error(`provide a LayersService as Input to ukis-map-cesium`);
    }
    if (!this.mapStateSvc) {
      console.error(`provide a MapStateService as Input to ukis-map-cesium`);
    }
    this.mapSvc.removeAll2DLayers();
    //Set start time, if available
    if (this.startTime) {
      this.mapSvc.initTime(this.startTime);
    }
  }
  ngAfterViewInit(): void {
    this.initMap();
    this.subscribeToLayers();


    /** Get last state from mapStateSvc and set it, so a User can set the initial MapState in a component */
    const oldMapState = this.mapStateSvc.getMapState().getValue();
    this.setMapState(oldMapState);
    // set viewAngle and rotation seperatly again, as their values are not set by the viewer the first time
    this.mapSvc.setViewAngle(oldMapState.viewAngle);
    this.mapSvc.setRotation(oldMapState.rotation);
    /** Subscribe to map events when the map is completely created  */
    this.subscribeToMapEvents();
    /** Subscribe to mapStateSvc */
    this.subscribeToMapState();

  }

  ngOnDestroy(): void {

    const lastMapState = this.mapStateSvc.getMapState().value;
    lastMapState.options.notifier = 'user';
    this.mapStateSvc.setMapState(lastMapState);

    /** clean up all events on destroy */
    this.subs.forEach(s => s.unsubscribe());
    if (this.viewer?.scene?.primitives) {
      this.viewer.imageryLayers.removeAll();
      this.viewer.dataSources.removeAll();
      this.viewer.scene.primitives.removeAll();
      this.viewer.scene.primitives.destroy();
    }
    this.mapSvc.destroyLayerGrpoups();
  }


  private initMap() {
    if (this.timeInterval) {
      this.mapSvc.setTimeInterval(this.timeInterval);
    }
    this.mapSvc.setControls(this.controls);
    const cesiumView = this.mapSvc.createMap(this.mapDivView.nativeElement);
    this.viewer = cesiumView.viewer;
    this.mapCreated.next(true);
  }

  private subscribeToLayers() {

    // 2D layer
    if (this.twoDlayersSvc) {
      const onBaselayers = this.twoDlayersSvc.getBaseLayers().subscribe(layers => this.addUpdateBaseLayers(layers));
      this.subs.push(onBaselayers);

      const onLayers = this.twoDlayersSvc.getLayers().subscribe(layers => this.addUpdate2DLayers(layers, 'layers'));
      this.subs.push(onLayers);

      const onOverlays = this.twoDlayersSvc.getOverlays().subscribe(layers => this.addUpdate2DLayers(layers, 'overlays'));
      this.subs.push(onOverlays);
    }

    // 3D layer
    if (this.threeDlayersSvc) {

      const onTerrainLayers = this.threeDlayersSvc.getBaseLayers().subscribe(layers => this.addUpdateTerrainLayers(layers));
      this.subs.push(onTerrainLayers);

      const on3DLayers = this.threeDlayersSvc.getLayers().subscribe(layers => this.addUpdate3DLayers(layers, 'layers'));
      this.subs.push(on3DLayers);

    }
  }

  private subscribeToMapState() {
    if (this.mapStateSvc) {
      const mapStateOn = this.mapStateSvc.getMapState().pipe(skip(1)).subscribe(state => this.setMapState(state));
      this.subs.push(mapStateOn);
    }
  }

  private setMapState(mapState: MapState) {
    const lastAction = this.mapStateSvc.getLastAction().getValue();
    if (mapState.options.notifier === 'user') {
      if (lastAction === 'setExtent') {
        this.mapSvc.setExtent(mapState.extent, true);
      } else if (lastAction === 'setState') {
        this.mapSvc.setZoom(mapState.zoom);
        this.mapSvc.setCenter(mapState.center);
        this.mapSvc.setRotation(mapState.rotation);
        this.mapSvc.setViewAngle(mapState.viewAngle);
      } else if (lastAction === 'setRotation') {
        this.mapSvc.setRotation(mapState.rotation);
      } else if (lastAction === 'setAngle') {
        this.mapSvc.setViewAngle(mapState.viewAngle);
      }
    }
    else if (mapState.options.notifier === 'map') {
      this.mapSvc.updateTime(mapState.time);
    }
  }

  private subscribeToMapEvents() {

    this.viewer.camera.changed.addEventListener((evt) => {
      const time = this.mapStateSvc.getMapState().getValue().time;
      const zoom = this.mapSvc.getZoom();
      const newCenter = this.mapSvc.getCenter();
      const extent = this.mapSvc.getCurrentExtent();
      const viewAngle = this.mapSvc.getViewAngle();
      const rotation = this.mapSvc.getRotation();
      const ms = new MapState(zoom, newCenter, { notifier: 'map' }, extent, time, viewAngle, rotation);
      this.mapStateSvc.setMapState(ms);
    });

    //Changing entitiy parameters for the display in he infoBox window
    this.viewer.selectedEntityChanged.addEventListener(() => {
      const entity = this.viewer.selectedEntity;
      //change infoBox title
      const titleDiv = this.viewer.infoBox.container.getElementsByClassName('cesium-infoBox-title')[0];
      titleDiv.innerHTML = 'Layer Attributes';
      if (entity) {
        if(entity.entityCollection.owner instanceof GeoJsonDataSource){
          titleDiv.innerHTML = entity.entityCollection.owner.name;
          entity.name = entity.entityCollection.owner.name;
        }else{
          entity.name = 'Layer Attributes';
        }
        if (entity.description) {
          const description = entity.description.getValue(this.mapSvc.cesiumCurrentTime);
          const contentDiv = this.viewer.infoBox.container.getElementsByClassName('cesium-infoBox-content')[0];
          contentDiv.innerHTML = description;
          entity.name = 'Layer Attributes';

          //TODO: Fetch layer info for formatting the getFeatureInfo data, like specific units or value rounding.
        }
      }
    });
  }


  private addUpdateBaseLayers(layers: Layer[]) {
    /** if length of layers fom LayersService has changed add new layers */
    if (layers.length > 0) {
      if (layers.length !== this.mapSvc.getAll2DLayersSize('baselayers')) {
        this.add2DBaseLayers(layers);
      } else {
        /** if layers already on the map - length not changed - update them */
        this.update2DBaseLayers(layers);
      }
    }
  }

  private add2DBaseLayers(layers: Layer[]) {
    if (layers.length > 0) {
      // set only one visible at start
      const visiblelayers = layers.filter(l => l.visible === true);
      if (visiblelayers.length === 0) {
        layers[0].visible = true;
      } else if (visiblelayers.length > 1) {
        layers.forEach(l => l.visible = false);
        layers[0].visible = true;
      }
      this.mapSvc.set2DUkisLayers(layers, 'baselayers');
    }
  }

  private update2DBaseLayers(layers: Layer[]) {
    this.mapSvc.update2DLayerVisibility(layers, 'baselayers');
    //In current application the folllowing map control functions are not enabled for baselayers
    //this.mapSvc.updateLayerOpacity(layers, 'baselayers');
    //this.mapSvc.updateLayerZIndex(layers, 'baselayers');
  }

  private addUpdateTerrainLayers(layers: Layer[]) {
    /** if length of layers fom LayersService has changed add new layers */
    if (layers.length > 0) {
      /* if (layers.length !== this.mapSvc.get3DLayersSize('baselayers')) {
        this.addTerrainLayers(layers);
      } else { */
      /** if layers already on the map - length not changed - update them */
      this.mapSvc.update3DLayerVisibility(layers, 'baselayers');
      //}
    }
  }

  private addTerrainLayers(layers: Layer[]) {
    if (layers.length > 0) {
      // set only one visible at start
      const visiblelayers = layers.filter(l => l.visible === true);
      if (visiblelayers.length === 0) {
        layers[0].visible = true;
      } else if (visiblelayers.length > 1) {
        layers.forEach(l => l.visible = false);
        layers[0].visible = true;
      }
      this.mapSvc.set3DUkisLayers(layers, 'baselayers');
    }
  }

  private addUpdate2DLayers(layers: Layer[], filtertype: Tgroupfiltertype) {

    /** if length of layers (visible) has changed add new layers */
    if (layers.length !== this.mapSvc.getAll2DLayersSize(filtertype)) {
      this.addLayers(layers, filtertype);
    } else {
      /** if layers already on the map - length not changed - update them */
      this.updateLayers(layers, filtertype);
    }
  }

  private addLayers(layers: Layer[], filtertype: Tgroupfiltertype) {
    this.mapSvc.set2DUkisLayers(layers, filtertype);
  }

  private updateLayers(layers: Layer[], filtertype: Tgroupfiltertype) {
    // handle layer Visible change
    this.mapSvc.update2DLayerVisibility(layers, filtertype);
    this.mapSvc.update2DLayerOpacity(layers, filtertype);
    this.mapSvc.update2DLayerZIndex(layers, filtertype);
    this.mapSvc.updateDataSourceZIndex(layers, filtertype);

  }

  private addUpdate3DLayers(layers: Layer[], filtertype: Tgroupfiltertype) {

    /** if length of layers (visible) has changed add new layers */
    if (layers.length !== this.mapSvc.get3DLayersSize(filtertype)) {
      this.add3DLayers(layers, filtertype);
    } else {
      /** if layers already on the map - length not changed - update them */
      this.update3DLayers(layers, filtertype);
    }
  }

  private add3DLayers(layers: Layer[], filtertype: Tgroupfiltertype) {
    this.mapSvc.set3DUkisLayers(layers, filtertype);
  }

  private update3DLayers(layers: Layer[], filtertype: Tgroupfiltertype) {
    // handle layer Visible change
    this.mapSvc.update3DLayerVisibility(layers, filtertype);
    this.mapSvc.update3DLayerOpacity(layers, filtertype);
  }

}
