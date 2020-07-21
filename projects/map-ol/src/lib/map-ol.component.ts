import { Component, OnInit, ViewEncapsulation, Input, Inject, OnDestroy, AfterViewChecked, AfterContentChecked, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';




import { MapState } from '@dlr-eoc/services-map-state';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { MapOlService, Tgroupfiltertype } from './map-ol.service';
import { LayersService, WmtsLayertype, Layer, WmsLayertype, WmtsLayer, WmsLayer, CustomLayer } from '@dlr-eoc/services-layers';

import Map from 'ol/Map';
import { getUid } from 'ol/util';

import olLayer from 'ol/layer/Layer';

import Attribution from 'ol/control/Attribution';
import ScaleLine from 'ol/control/ScaleLine';
import Zoom from 'ol/control/Zoom';

import olMousePosition from 'ol/control/MousePosition';
import { toStringXY } from 'ol/coordinate';

import olFullScreen from 'ol/control/FullScreen';

import olOverviewMap from 'ol/control/OverviewMap';
import olTileLayer from 'ol/layer/Tile';
import olOSM from 'ol/source/OSM';

import olRotate from 'ol/control/Rotate';


export interface IMapControls {
  /** @see (Attribution options) https://github.com/openlayers/openlayers/blob/v6.2.1/src/ol/control/Attribution.js#L13 */
  attribution?: boolean | object;
  /** @see (ScaleLine options) https://github.com/openlayers/openlayers/blob/v6.2.1/src/ol/control/ScaleLine.js#L39 */
  scaleLine?: boolean | object;
  /** @see (Zoom options) https://github.com/openlayers/openlayers/blob/v6.2.1/src/ol/control/Zoom.js#L11 */
  zoom?: boolean | object;
  crosshair?: boolean;
  /** @see (FullScreen options) https://github.com/openlayers/openlayers/blob/v6.2.1/src/ol/control/FullScreen.js#L13 */
  fullScreen?: boolean | object;
  /** @see (MousePosition options) https://github.com/openlayers/openlayers/blob/v6.2.1/src/ol/control/MousePosition.js#L25 */
  mousePosition?: boolean | object;
  /** @see (OverviewMap options) https://github.com/openlayers/openlayers/blob/v6.2.1/src/ol/control/OverviewMap.js#L46 */
  overviewMap?: boolean | object;
  /** @see (Rotate options) https://github.com/openlayers/openlayers/blob/v6.2.1/src/ol/control/Rotate.js#L11 */
  rotate?: boolean | object;
}

@Component({
  selector: 'ukis-map-ol',
  templateUrl: './map-ol.component.html',
  styleUrls: ['./map-ol.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapOlComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  @ViewChild('mapDiv') mapDivView: ElementRef;

  @Input('layersSvc') layersSvc: LayersService;
  @Input('mapState') mapStateSvc: MapStateService;
  @Input('controls') controls: IMapControls;

  map: Map;
  subs: Subscription[] = [];
  mapOnMoveend;
  mapOnClick;
  mapOnDclick;

  private privMapwidth = 0;
  private get mapwidth() {
    return this.privMapwidth;
  }

  private set mapwidth(width) {
    this.privMapwidth = width;
    this.map.updateSize();
  }

  constructor(private mapSvc: MapOlService, private ngZone: NgZone) {
  }
  /**
   * - subscribe to layers oninit so they get pulled after view init
   */
  ngOnInit() {
    /** Subscribe to mapStateSvc before map is created */
    this.subscribeToMapState();
    this.initMap();
    this.subscribeToLayers();
  }

  /**
   * - set target of ol map after angular has rendered the element
   * - then subscribe to map events
   */
  ngAfterViewInit() {
    this.map.setTarget(this.mapDivView.nativeElement);

    /** Get last state from mapStateSvc and set it, so a User can set the initial MapState in a component on ngOnInit */
    const oldMapState = this.mapStateSvc.getMapState().getValue();
    this.setMapState(oldMapState);

    /** Subscribe to map events when the map completely created  */
    this.subscribeToMapEvents();
  }

  ngAfterViewChecked() {
    /**
     * - compare map size to update Map Size on container resize
     * - set Timeout to also resize map on route change
     */
    if (this.mapDivView) {
      const mapWidth = this.mapDivView.nativeElement.offsetWidth;
      if (mapWidth !== this.mapwidth) {
        this.ngZone.runOutsideAngular(() => {
          setTimeout(() => {
            this.mapwidth = mapWidth;
          }, 100);
        });
      }
    }
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
    if (this.map) {
      this.map.un('moveend', this.mapOnMoveend);
      this.map.un('click', this.mapOnClick);
      this.map.un('dblclick', this.mapOnDclick);
      this.map.getInteractions().forEach((i) => {
        this.map.removeInteraction(i);
      });
    }
  }

  private addUpdateLayers(layers: Layer[], type: Tgroupfiltertype, layersunderneath: Array<Tgroupfiltertype>) {
    /** get all underneath layers for zIndex */
    let otherlayerslength = 0;
    layersunderneath.forEach(itemType => {
      otherlayerslength += this.mapSvc.getLayers(itemType).length;
    });

    /** if length of layers has changed add new layers */
    if (layers.length !== this.mapSvc.getLayers(type).length) {
      this.mapSvc.setUkisLayers(layers, type);
      // if layers underneath add thhen to the zIndex of layer
      if (otherlayerslength > 0) {
        for (const layer of layers) {
          const ollayer = this.mapSvc.getLayerByKey({ key: 'id', value: layer.id }, type);
          if (ollayer) {
            if (ollayer.getZIndex() !== layers.indexOf(layer) + otherlayerslength) {
              ollayer.setZIndex(layers.indexOf(layer) + otherlayerslength);
            }
          }
        }
      }
    } else {
      /** if layers already on the map -length not changed- update them */
      for (const layer of layers) {
        const ollayer = this.mapSvc.getLayerByKey({ key: 'id', value: layer.id }, type);
        if (ollayer) {
          if (ollayer.getVisible() !== layer.visible) {
            ollayer.setVisible(layer.visible);
          }
          if (ollayer.getOpacity() !== layer.opacity) {
            ollayer.setOpacity(layer.opacity);
          }
          if (layer instanceof CustomLayer && ollayer.getSource()) {
            const newSource = layer.custom_layer.getSource();
            const oldSource = ollayer.getSource();
            if (newSource && getUid(oldSource) !== getUid(newSource)) {
              ollayer.setSource(newSource);
            }
          }
          if (otherlayerslength > 0) {
            if (ollayer.getZIndex() !== layers.indexOf(layer) + otherlayerslength) {
              ollayer.setZIndex(layers.indexOf(layer) + otherlayerslength);
            }

          } else {
            if (ollayer.getZIndex() !== layers.indexOf(layer)) {
              ollayer.setZIndex(layers.indexOf(layer));
            }
          }
          this.updateLayerParamsWith(ollayer, layer);
        }
      }
    }
  }

  private updateLayerParamsWith(oldLayer: olLayer<any>, newLayer: Layer): void {
    switch (newLayer.type) {
      case WmsLayertype:
        this.updateWmsLayerParamsWith(oldLayer, newLayer as WmsLayer);
        break;
      case WmtsLayertype:
        this.updateWmtsLayerParamsWith(oldLayer, newLayer as WmtsLayer);
        break;
      default:
        break;
    }
  }

  private updateWmsLayerParamsWith(oldLayer: olLayer<any>, newWmsLayer: WmsLayer): void {
    const source = oldLayer.getSource();
    const oldParams = source.getParams();
    const newParams = newWmsLayer.params;
    if (!this.shallowEqual(oldParams, newParams)) {
      oldLayer.getSource().updateParams(newParams);
    }
  }

  private updateWmtsLayerParamsWith(oldLayer: olLayer<any>, newWmtsLayer: WmtsLayer): void {
    // contrary to a wms-source, a wmts-source has neither 'getParams' nor 'updateParams', so we need to do this manually.
    const source = oldLayer.getSource();
    const oldStyle = source.getStyle();
    const oldFormat = source.getFormat();
    const oldVersion = source.getVersion();
    const oldMatrix = source.getMatrixSet();
    const newStyle = newWmtsLayer.params.style;
    const newFormat = newWmtsLayer.params.format;
    const newVersion = newWmtsLayer.params.version;
    const newMatrix = newWmtsLayer.params.matrixSetOptions.matrixSet;
    if (newStyle !== undefined && oldStyle !== newStyle
      || newFormat !== undefined && oldFormat !== newFormat
      || newVersion !== undefined && oldVersion !== newVersion
      || newMatrix !== undefined && oldMatrix !== newMatrix) {
      // console.log(oldStyle, oldFormat, oldVersion, oldMatrix)
      // console.log(newStyle, newFormat, newVersion, newMatrix)
      const olFiltertype = newWmtsLayer.filtertype.toLowerCase() as Tgroupfiltertype;
      // this.mapSvc.setUkisLayer(newWmtsLayer, olFiltertype);
      this.mapSvc.updateUkisLayer(newWmtsLayer, olFiltertype);
    }
  }

  private shallowEqual(a: object, b: object): boolean {
    // Create arrays of property names
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length !== bProps.length) {
      return false;
    }

    for (const propName of aProps) {
      // If values of same property are not equal,
      // objects are not equivalent
      if (a[propName] !== b[propName]) {
        return false;
      }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
  }

  private addUpdateBaseLayers(layers) {
    /** if length of layers has changed add new layers */
    if (layers.length !== this.mapSvc.getLayers('baselayers').length) {
      // set only one visible at start
      const visiblelayers = layers.filter(l => l.visible === true);
      if (visiblelayers.length === 0) {
        layers[0].visible = true;
      } else if (visiblelayers.length > 1) {
        layers.forEach(l => l.visible = false);
        layers[0].visible = true;
      }
      this.mapSvc.setUkisLayers(layers, 'baselayers');
    } else {
      /** if layers already on the map -length not changed- update them */
      for (const layer of layers) {
        const bllayer = this.mapSvc.getLayerByKey({ key: 'id', value: layer.id }, 'baselayers');
        if (bllayer) {
          if (bllayer.getVisible() !== layer.visible) {
            bllayer.setVisible(layer.visible);
          }
          if (bllayer.getZIndex() !== layers.indexOf(layer)) {
            bllayer.setZIndex(layers.indexOf(layer));
          }
          if (bllayer.getOpacity() !== layer.opacity) {
            bllayer.setOpacity(layer.opacity);
          }
        }
      }
    }
  }

  private subscribeToLayers() {
    // ----------------------
    // add/remove layers
    if (this.layersSvc) {
      const baselayersAddRemoveOn = this.layersSvc.getBaseLayers().subscribe(layers => this.addUpdateBaseLayers(layers));
      this.subs.push(baselayersAddRemoveOn);
      const onLayers = this.layersSvc.getLayers().subscribe(layers => this.addUpdateLayers(layers, 'layers', ['baselayers']));
      this.subs.push(onLayers);
      const onOverlays = this.layersSvc.getOverlays().subscribe(layers => this.addUpdateLayers(layers, 'overlays', ['baselayers', 'layers']));
      this.subs.push(onOverlays);
    }
  }

  private setMapState(mapState: MapState) {
    const lastAction = this.mapStateSvc.getLastAction().getValue();
    if (mapState.options.notifier === 'user') {
      if (lastAction === 'setExtent') {
        this.mapSvc.setExtent(mapState.extent, true);
      } else if (lastAction === 'setState') {
        this.mapSvc.setZoom(mapState.zoom, mapState.options.notifier);
        this.mapSvc.setCenter([mapState.center.lon, mapState.center.lat], true);
      }
    }
    /* else if (mapState.options.notifier === 'map') {
      console.log("--------Map triggered mapState change", mapState);
    } */
  }

  private subscribeToMapState() {
    if (this.mapStateSvc) {
      /** .pipe(skip(1)) skips the first, e.g. initial value of the BehaviorSubject!! -- https://www.learnrxjs.io/learn-rxjs/operators/filtering/skip#why-use-skip  */
      const mapStateOn = this.mapStateSvc.getMapState().pipe(skip(1)).subscribe(state => this.setMapState(state));
      this.subs.push(mapStateOn);
    }
  }

  private subscribeToMapEvents() {
    this.mapOnMoveend = (evt) => {
      // const zoom = Math.round(this.mapSvc.getZoom());
      const zoom = this.mapSvc.getZoom();
      const center = this.mapSvc.getCenter(true);
      const extent = this.mapSvc.getCurrentExtent(true);

      // const newCenter = { lat: parseFloat(center[1].toFixed(6)), lon: parseFloat(center[0].toFixed(6)) };
      const newCenter = { lat: parseFloat(center[1]), lon: parseFloat(center[0]) };
      const ms = new MapState(zoom, newCenter, { notifier: 'map' }, extent);
      this.mapStateSvc.setMapState(ms);
    };
    this.map.on('moveend', this.mapOnMoveend);

    /** handle click on vektor layers */
    this.mapOnClick = (evt) => {
      this.mapSvc.layers_on_click(evt);
    };
    this.map.on('click', this.mapOnClick);

    /** handle double click */
    this.mapOnDclick = (evt) => {
      this.mapSvc.removeAllPopups();
    };
    this.map.on('dblclick', this.mapOnDclick);
  }


  private initMap() {
    const olMapView = this.mapSvc.createMap();
    this.map = olMapView.map; //

    this.setControls();
    if (!this.layersSvc) {
      console.log('there is no layersSvc as defined!');
    }

    if (!this.mapStateSvc) {
      console.log('there is no mapStateSvc as defined!');
    }
  }

  private setControls() {
    // add Control only if this functions is defined
    const tempControls = [];
    if (this.controls && this.map) {
      if (this.controls.attribution !== false) {
        let attributionOptions = {
          collapsible: true,
          collapsed: false
        };
        if (typeof this.controls.attribution === 'object') {
          attributionOptions = Object.assign(attributionOptions, this.controls.attribution);
        }
        const attribution = new Attribution(attributionOptions);
        tempControls.push(attribution);
      }
      if (this.controls.scaleLine) {
        let scaleLineOptions = {};
        if (typeof this.controls.scaleLine === 'object') {
          scaleLineOptions = Object.assign(scaleLineOptions, this.controls.scaleLine);
        }
        const scaleLineControl = new ScaleLine(scaleLineOptions);
        tempControls.push(scaleLineControl);
      }
      if (this.controls.zoom !== false) {
        let zoomOptions = {};
        if (typeof this.controls.zoom === 'object') {
          zoomOptions = Object.assign(zoomOptions, this.controls.zoom);
        }
        const zoomControl = new Zoom(zoomOptions);
        tempControls.push(zoomControl);
      }
      if (this.controls.mousePosition) {
        let mousePositionOptions = {
          coordinateFormat: coordinate => {
            return toStringXY(coordinate, 2);
          },
          projection: 'EPSG:4326'
        };
        if (typeof this.controls.mousePosition === 'object') {
          mousePositionOptions = Object.assign(mousePositionOptions, this.controls.mousePosition);
        }
        const mousePosition = new olMousePosition(mousePositionOptions);
        tempControls.push(mousePosition);
      }
      if (this.controls.fullScreen) {
        let fullScreenOptions = {};
        if (typeof this.controls.fullScreen === 'object') {
          fullScreenOptions = Object.assign(fullScreenOptions, this.controls.fullScreen);
        }
        const fullScreen = new olFullScreen(fullScreenOptions);
        tempControls.push(fullScreen);
      }
      if (this.controls.overviewMap) {
        const icon = document.createElement('spawn');
        icon.innerHTML = '<clr-icon shape="world"></clr-icon>';
        let overviewMapOptions = {
          layers: [new olTileLayer({
            source: new olOSM()
          })],
          label: icon
        };
        if (typeof this.controls.overviewMap === 'object') {
          overviewMapOptions = Object.assign(overviewMapOptions, this.controls.overviewMap);
        }
        const overviewMap = new olOverviewMap(overviewMapOptions);
        tempControls.push(overviewMap);
      }
      if (this.controls.rotate) {
        let rotateOptions = {};
        if (typeof this.controls.rotate === 'object') {
          rotateOptions = Object.assign(rotateOptions, this.controls.rotate);
        }
        const rotate = new olRotate(rotateOptions);
        tempControls.push(rotate);
      }

      if (tempControls.length) {
        this.map.getControls().extend(tempControls);
      }
    }
  }
}
