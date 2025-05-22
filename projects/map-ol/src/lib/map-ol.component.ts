import { Component, OnInit, ViewEncapsulation, Input, OnDestroy, AfterViewChecked, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';




import { MapState } from '@dlr-eoc/services-map-state';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { MapOlService } from './map-ol.service';
import { LayersService, WmtsLayertype, Layer, WmsLayertype, WmtsLayer, WmsLayer, CustomLayer, VectorLayer, GeojsonLayertype, WfsLayertype, TmsLayertype, TFiltertypes, TFiltertypesUncap } from '@dlr-eoc/services-layers';

import Map from 'ol/Map';
import { getUid as olGetUid } from 'ol/util';

import olBaseLayer from 'ol/layer/Base';
import olLayer from 'ol/layer/Layer';
import olLayerGroup from 'ol/layer/Group';
import olCollection from 'ol/Collection';

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
import olMapBrowserEvent from 'ol/MapBrowserEvent';
import olMapEvent from 'ol/MapEvent';
import { Control as olControl } from 'ol/control';
import olRasterSource from 'ol/source/Raster';
import olSourceCluster from 'ol/source/Cluster';
import olVectorLayer from 'ol/layer/Vector';
import { applyStyle } from 'ol-mapbox-style';
import { collectionItemSetIndex, layerOrGroupSetOpacity, layerOrGroupSetVisible, layerOrGroupSetZIndex } from '@dlr-eoc/utils-maps';
import { defaults as defaultInteractions } from 'ol/interaction/defaults';
import { FeatureLike } from 'ol/Feature';

import { ClarityIcons, worldIcon } from '@cds/core/icon';

ClarityIcons.addIcons(...[worldIcon]);



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

declare type Tgroupfiltertype = TFiltertypesUncap | TFiltertypes

const ID_KEY = 'id';

@Component({
    selector: 'ukis-map-ol',
    templateUrl: './map-ol.component.html',
    styleUrls: ['./map-ol.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: []
})
export class MapOlComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  @ViewChild('mapDiv') mapDivView: ElementRef;

  @Input('layersSvc') layersSvc: LayersService;
  @Input('mapState') mapStateSvc: MapStateService;
  @Input('controls') controls: IMapControls;

  map: Map;
  subs: Subscription[] = [];
  mapOnMoveend;
  mapOnClickMove;
  mapOnDclick;

  /** [width, height] */
  private mapSize = [0, 0];
  private initialMapStateSet = false;

  constructor(private mapSvc: MapOlService, private ngZone: NgZone) {
  }
  ngOnInit() {
    /** Subscribe to mapStateSvc before map is created */
    this.subscribeToMapState();
    this.initMap();
    /** subscribe to layers oninit so they get pulled after view init */
    this.subscribeToLayers();
  }

  /**
   * - set target of ol map after angular has rendered the element
   * - then subscribe to map events
   */
  ngAfterViewInit() {
    this.map.setTarget(this.mapDivView.nativeElement);

    /** Subscribe to map events when the map completely created  */
    this.subscribeToMapEvents();
    this.map.getTargetElement().addEventListener('mouseleave', this.removePopupsOnMouseLeave);
  }

  ngAfterViewChecked() {
    /**
     * compare map and container size to update Map Size on container resize
     */
    this.updateMapSize();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());

    /**
     * Set the last MapState to Destroy. When the component is reinitialized, this MapState is used
     */
    const lastMapState = this.mapStateSvc.getMapState().value;
    lastMapState.options.notifier = 'user';
    this.mapStateSvc.setMapState(lastMapState);

    if (this.map) {
      this.map.un('moveend', this.mapOnMoveend);
      this.map.un('click', this.mapOnClickMove);
      this.map.un('dblclick', this.mapOnDclick);
      this.map.getTargetElement().removeEventListener('mouseleave', this.removePopupsOnMouseLeave);
      this.map.getInteractions().forEach((i) => {
        this.map.removeInteraction(i);
      });
    }
  }

  private getMapDiv() {
    if (this.mapDivView && this.mapDivView.nativeElement) {
      return {
        width: this.mapDivView.nativeElement.offsetWidth,
        height: this.mapDivView.nativeElement.offsetHeight
      }
    } else {
      return null;
    }
  }

  private updateMapSize() {
    const mapDiv = this.getMapDiv();
    if (mapDiv) {
      if (mapDiv.width === this.mapSize[0] && mapDiv.height === this.mapSize[1]) {
        if (!this.initialMapStateSet) {
          /**
           * If container size and map size are equal (map size 'stable')
           * Get last state from mapStateSvc and set it, so a User can set the initial MapState in a component on ngOnInit
           * Update map size before so view.fit can calculate correct center
           */
          const oldMapState = this.mapStateSvc.getMapState().getValue();
          this.setMapState(oldMapState);
          this.initialMapStateSet = true;
        }
      } else {
        /** update map size till container size and map size are equal */
        this.ngZone.runOutsideAngular(() => {
          this.map.updateSize();
          this.mapSize = this.map.getSize();
        })
      }
    }
  }

  private removePopupsOnMouseLeave = (evt) => {
    this.mapSvc.removeAllPopups((item) => {
      return item.get('addEvent') === 'pointermove';
    });
  }

  private addUpdateLayers(layers: Layer[], filtertype: Tgroupfiltertype, layersunderneath: Array<Tgroupfiltertype>) {
    const layerGroupCollection = this.mapSvc.getLayerGroups(filtertype)[0].getLayers();
    /** get all underneath layers (e.g. "baselayers" | "layers" ) to calculate the correct zIndex */
    const otherlayerslength = layersunderneath.reduce((previousValue, currentType) => {
      return previousValue + this.mapSvc.getLayers(currentType).length;
    }, 0);

    /** if length of layers has changed add new layers */
    if (layers.length !== this.mapSvc.getLayers(filtertype).length) {
      // if layers underneath add them to the zIndex of layer
      this.mapSvc.setUkisLayers(layers, filtertype, otherlayerslength);
    } else {
      /** if layers already on the map -length not changed- update them */
      this.updateLayers(layers, filtertype, otherlayerslength, layerGroupCollection);
    }
  }


  private updateLayers(layers: Layer[], filtertype: Tgroupfiltertype, otherlayerslength: number, layerGroupCollection: olCollection<olBaseLayer>) {
    for (const layer of layers) {
      const ollayer = this.mapSvc.getLayerByKey({ key: ID_KEY, value: layer.id }, filtertype) as olBaseLayer | olLayer<any> | olLayerGroup;
      if (ollayer) {
        if (ollayer.getVisible() !== layer.visible) {
          // On custom layers, only the group is set, not the layers, so they can be controlled by the user
          layerOrGroupSetVisible(ollayer, layer.visible, layer instanceof CustomLayer);

          // fixes https://github.com/dlr-eoc/ukis-frontend-libraries/issues/120
          // When a layer is set hidden, it's associated popups get a hidden class.
          this.mapSvc.hideAllPopups(!layer.visible, (item) => {
            // only hide the popups from the current layer
            const elementID = item.getId();
            const layerID = elementID.toString().split(':')[0];
            if (layerID) {
              if (layerID === layer.id) {
                return layerID === layer.id;
              }
            } else {
              return true;
            }
          });

        }
        if (ollayer.getOpacity() !== layer.opacity) {
          // On custom layers, only the group is set, not the layers, so they can be controlled by the user
          layerOrGroupSetOpacity(ollayer, layer.opacity, layer instanceof CustomLayer);
        }
        this.updateLayerSource(layer, ollayer);
        const indexOfLayer = layers.indexOf(layer);
        const newZIndex = (otherlayerslength > 0) ? indexOfLayer + otherlayerslength : indexOfLayer;
        if (ollayer.getZIndex() !== newZIndex) {
          collectionItemSetIndex(ollayer, indexOfLayer, layerGroupCollection);
          layerOrGroupSetZIndex(ollayer, indexOfLayer, otherlayerslength);
        }
        this.updateLayerParamsWith(ollayer as olLayer<any>, layer);
      }
    }
  }

  private updateLayerSource(layer: Layer, ollayer: olBaseLayer | olLayer<any> | olLayerGroup) {
    if (layer instanceof CustomLayer && ollayer instanceof olLayer) {
      const newSource = layer.custom_layer.getSource();
      const oldSource = ollayer.getSource();
      if (newSource && olGetUid(oldSource) !== olGetUid(newSource)) {
        ollayer.setSource(newSource);
        // https://github.com/dlr-eoc/ukis-frontend-libraries/issues/100
        if (oldSource instanceof olRasterSource) {
          oldSource.dispose();
        }
      }
    } else if (layer instanceof CustomLayer && layer.custom_layer instanceof olLayerGroup && ollayer instanceof olLayerGroup) {
      const newLayers = layer.custom_layer.getLayers().getArray();
      const oldLayers = ollayer.getLayers().getArray();

      /** assume the order and length of layers is not changing and no more grouping!!! */
      oldLayers.forEach((l, i) => {
        const newLayer = newLayers[i];
        if (l instanceof olLayer && newLayer instanceof olLayer) {
          const oldSource = l.getSource();
          const newSource = newLayer.getSource();
          if (newSource && olGetUid(oldSource) !== olGetUid(newSource)) {
            l.setSource(newSource);
          }
        }
      });
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
      case GeojsonLayertype:
        this.updateGeojsonLayerParamsWith(oldLayer as any, newLayer as VectorLayer);
        break;
      case WfsLayertype:
        this.updateWfsLayerParamsWith(oldLayer as any, newLayer as VectorLayer);
        break;
      case TmsLayertype:
        this.updateTmsLayerParamsWith(oldLayer as any, newLayer);
      default:
        break;
    }
  }

  private updateTmsLayerParamsWith(oldLayer: olVectorLayer<FeatureLike>, newLayer: Layer) {
    if (newLayer instanceof VectorLayer) {
      const style = newLayer.options.style;
      const mapboxSourceKey = newLayer.options.styleSource;
      applyStyle(oldLayer, style, mapboxSourceKey);
    }
  }

  private updateWfsLayerParamsWith(oldLayer: olVectorLayer<FeatureLike>, newLayer: VectorLayer) {

    // step 1: update style
    if (newLayer.options && newLayer.options.style !== oldLayer.getStyle()) {
      oldLayer.setStyle(newLayer.options.style);
    }

    // step 2: update source
    if (oldLayer.getSource().getUrl() !== newLayer.url) {
      oldLayer.getSource().setUrl(newLayer.url);
    }
  }

  /**
   * TODO: set all other props of GeoJsonLayer.options and GeoJsonLayer.cluster (see: IVectorLayerOptions)
   */
  updateGeojsonLayerParamsWith(oldLayer: olVectorLayer<FeatureLike>, newGeojsonLayer: VectorLayer) {
    const oldSource = oldLayer.getSource();
    if (oldSource) {
      if (newGeojsonLayer.data) {
        const features = this.mapSvc.geoJsonToFeatures(newGeojsonLayer.data)
        if (oldSource instanceof olSourceCluster) {
          const vectorSource = oldSource.getSource();
          vectorSource.clear();
          vectorSource.addFeatures(features);
        } else {
          oldSource.clear();
          oldSource.addFeatures(features);
        }
      } else if (newGeojsonLayer.url) {
        if (oldSource instanceof olSourceCluster) {
          const vectorSource = oldSource.getSource();
          vectorSource.setUrl(newGeojsonLayer.url);
        } else {
          oldSource.setUrl(newGeojsonLayer.url);
        }
      }

      // 'distance' in also checks for 0 values
      if (typeof newGeojsonLayer?.cluster === 'object' && 'distance' in newGeojsonLayer.cluster && oldSource instanceof olSourceCluster) {
        oldSource.setDistance(newGeojsonLayer.cluster.distance);
      }
    }

    if (newGeojsonLayer?.options?.style) {
      oldLayer.setStyle(newGeojsonLayer.options.style);
    }
  }

  private updateWmsLayerParamsWith(oldLayer: olLayer<any>, newWmsLayer: WmsLayer): void {
    if (oldLayer instanceof olLayer) {
      const source = oldLayer.getSource();
      const oldParams = source.getParams();
      const newParams = newWmsLayer.params;
      if (!this.shallowEqual(oldParams, newParams)) {
        oldLayer.getSource().updateParams(newParams);
      }
    }
  }

  private updateWmtsLayerParamsWith(oldLayer: olLayer<any>, newWmtsLayer: WmtsLayer): void {
    // contrary to a wms-source, a wmts-source has neither 'getParams' nor 'updateParams', so we need to do this manually.
    if (oldLayer instanceof olLayer) {
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
  }

  // TODO: replace with @dlr-eoc/utilities propsEqual()
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

  private addUpdateBaseLayers(layers: Layer[]) {
    const layerGroupCollection = this.mapSvc.getLayerGroups('baselayers')[0].getLayers();
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
        const bllayer = this.mapSvc.getLayerByKey({ key: ID_KEY, value: layer.id }, 'baselayers');
        if (bllayer) {
          const indexOfLayer = layers.indexOf(layer);
          if (bllayer.getVisible() !== layer.visible) {
            // On custom layers, only the group is set, not the layers, so they can be controlled by the user
            layerOrGroupSetVisible(bllayer, layer.visible, layer instanceof CustomLayer);
          }
          if (bllayer.getZIndex() !== indexOfLayer) {
            layerGroupCollection.remove(bllayer);
            layerGroupCollection.insertAt(indexOfLayer, bllayer);

            layerOrGroupSetZIndex(bllayer, indexOfLayer)
          }
          if (bllayer.getOpacity() !== layer.opacity) {
            // On custom layers, only the group is set, not the layers, so they can be controlled by the user
            layerOrGroupSetOpacity(bllayer, layer.opacity, layer instanceof CustomLayer);
          }
          this.updateLayerSource(layer, bllayer);
          this.updateLayerParamsWith(bllayer as olLayer<any>, layer);
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
        this.mapSvc.setZoom(mapState.zoom);
        this.mapSvc.setCenter([mapState.center.lon, mapState.center.lat], true);
        this.mapSvc.setRotation(mapState.rotation);
      } else if (lastAction === 'setRotation') {
        this.mapSvc.setRotation(mapState.rotation);
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
    this.mapOnMoveend = (evt: olMapEvent) => {
      const oldMapState = this.mapStateSvc.getMapState().getValue();
      const zoom = this.mapSvc.getZoom();
      const center = this.mapSvc.getCenter(true);
      const extent = this.mapSvc.getCurrentExtent(true);
      const rotation = this.mapSvc.getRotation();

      const newCenter = { lat: parseFloat(center[1]), lon: parseFloat(center[0]) };
      const ms = new MapState(zoom, newCenter, { notifier: 'map' }, extent, oldMapState.time, oldMapState.viewAngle, rotation);
      this.mapStateSvc.setMapState(ms);
    };
    this.map.on('moveend', this.mapOnMoveend);

    /** handle click and pointermove/mousemove */
    this.mapOnClickMove = (evt: olMapBrowserEvent<PointerEvent>) => {
      this.mapSvc.layersOnMapEvent(evt);
    };
    this.map.on(['click', 'pointermove'], this.mapOnClickMove);

    /** handle double click */
    this.mapOnDclick = (evt: olMapBrowserEvent<PointerEvent>) => {
      this.mapSvc.removeAllPopups();
    };
    this.map.on('dblclick', this.mapOnDclick);
  }


  private initMap() {
    const olMapView = this.mapSvc.createMap();
    this.map = olMapView.map; //
    const oldInteractions = this.map.getInteractions();
    const interactions = defaultInteractions();
    interactions.forEach((item) => {
      const hasInteraction = oldInteractions.getArray().find((i) => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor?retiredLocale=en
        return (i as Object).constructor.name === (item as Object).constructor.name;
      });
      if (!hasInteraction) {
        this.map.addInteraction(item)
      }
    });

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
    const tempControls: olControl[] = [];
    const oldControls: olControl[] = [];
    if (this.map) {
      const controlsArry = this.map.getControls().getArray();
      controlsArry.forEach(i => oldControls.push(i));
      /** fix: The Attribution Control is displayed twice #3 */
      this.map.getControls().clear();
    }

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
        icon.innerHTML = '<cds-icon shape="world"></cds-icon>';
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
        /**
         * check tempControls dose not include oldControls
         * https://medium.com/@alvaro.saburido/set-theory-for-arrays-in-es6-eb2f20a61848#f22b
         */
        const difference = oldControls.filter(x => !tempControls.includes(x));
        difference.forEach(i => tempControls.push(i));
        this.map.getControls().extend(tempControls);
      }
    }
  }
}
