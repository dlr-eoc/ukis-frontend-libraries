import { Component, OnInit, ViewEncapsulation, Input, Inject, OnDestroy, AfterViewChecked, AfterContentChecked, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';




import { MapState } from '@ukis/services-map-state';
import { MapStateService } from '@ukis/services-map-state';
import { Subscription } from 'rxjs';
import { MapOlService } from './map-ol.service';
import { LayersService, RasterLayer, WmtsLayertype, Layer, WmsLayertype } from '@ukis/services-layers';

import Map from 'ol/Map';
import View from 'ol/View';

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
  attribution?: boolean;
  scaleLine?: boolean;
  zoom?: boolean;
  crosshair?: boolean;
  fullScreen?: boolean;
  mousePosition?: boolean;
  overviewMap?: boolean;
  rotate?: boolean;
}

@Component({
  selector: 'ukis-map-ol',
  templateUrl: './map-ol.component.html',
  styleUrls: ['./map-ol.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapOlComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  @ViewChild('mapDiv', { static: false }) mapDivView: ElementRef;

  @Input('layersSvc') layersSvc: LayersService;
  @Input('mapState') mapStateSvc: MapStateService;
  @Input('controls') controls: IMapControls;

  map: Map;
  view: View;

  zoom: number; // default value
  center: any; // default value
  mapState: MapState;
  extent: Array<number>;
  extentOn: Subscription;
  subs: Subscription[] = [];
  mapOnMoveend;
  mapOnClick;
  mapOnDclick;

  private _mapwidth = 0;
  private get mapwidth() {
    return this._mapwidth;
  }

  private set mapwidth(width) {
    this._mapwidth = width;
    this.map.updateSize();
  }

  constructor(private mapSvc: MapOlService, private ngZone: NgZone) {
    this.zoom = 3;
    this.center = {
      lat: 0,
      lon: 0
    };
    const ms = new MapState(this.zoom, this.center);
    this.mapState = ms;
  }
  /**
   * - subscribe to layers oninit so they get pulled after view init
   */
  ngOnInit() {
    this.initMap();
    this.subscribeToLayers();
    this.mapStateSvc.setMapState(this.mapState);
  }

  /**
   * - set target of ol map after angular has rendered the element
   * - then subscribe to map events
   */
  ngAfterViewInit() {
    this.map.setTarget(this.mapDivView.nativeElement);
    this.subscribeToMapState();
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
    this.map.un('moveend', this.mapOnMoveend);
    this.map.un('click', this.mapOnClick);
    this.map.un('dblclick', this.mapOnDclick);
  }

  private addUpdateLayers(layers, type: 'baselayers' | 'layers' | 'overlays', layersunderneath: Array<'baselayers' | 'layers' | 'overlays'>) {
    /** get all underneath layers for zIndex */
    let _otherlayerslength = 0;
    layersunderneath.forEach(_type => {
      _otherlayerslength += this.mapSvc.getLayers(_type).length;
    });

    /** if length of layers has changed add new layers */
    if (layers.length !== this.mapSvc.getLayers(type).length) {
      this.mapSvc.setLayers(layers, type);
      // if layers underneath add thhen to the zIndex of layer
      if (_otherlayerslength > 0) {
        for (const layer of layers) {
          const ollayer = this.mapSvc.getLayerByKey({ key: 'id', value: layer.id }, type);
          if (ollayer) {
            if (ollayer.getZIndex() !== layers.indexOf(layer) + _otherlayerslength) {
              ollayer.setZIndex(layers.indexOf(layer) + _otherlayerslength);
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
          if (_otherlayerslength > 0) {
            if (ollayer.getZIndex() !== layers.indexOf(layer) + _otherlayerslength) {
              ollayer.setZIndex(layers.indexOf(layer) + _otherlayerslength);
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
        this.updateWmsLayerParamsWith(oldLayer, newLayer as RasterLayer);
        break;
      case WmtsLayertype:
        this.updateWmtsLayerParamsWith(oldLayer, newLayer as RasterLayer);
        break;
      default:
        break;
    }
  }

  private updateWmsLayerParamsWith(oldLayer: olLayer<any>, newWmsLayer: RasterLayer): void {
    const source = oldLayer.getSource();
    const oldParams = source.getParams();
    const newParams = newWmsLayer.params;
    // console.log(newWmsLayer)
    if (!this.shallowEqual(oldParams, newParams)) {
      oldLayer.getSource().updateParams(newParams);
    }
  }

  private updateWmtsLayerParamsWith(oldLayer: olLayer<any>, newWmtsLayer: RasterLayer): void {
    // contrary to a wms-source, a wmts-source has neither 'getParams' nor 'updateParams', so we need to do this manually.
    const source = oldLayer.getSource();
    if (source.getStyle() !== newWmtsLayer.params.style
      || source.getFormat() !== newWmtsLayer.params.FORMAT
      || source.getVersion() !== newWmtsLayer.params.VERSION
      || source.getMatrixSet() !== newWmtsLayer.params.MatrixSet) {
      // WMTS dont allow easy reloading; see:
      // https://gis.stackexchange.com/questions/299554/openlayers-refresh-wmts-tiles-when-underlying-data-changes
      // Instead of reloading, we remove the old layer and add the new one.
      const olFiltertype = newWmtsLayer.filtertype.toLowerCase() as 'baselayers' | 'layers' | 'overlays';
      this.mapSvc.setLayer(newWmtsLayer, olFiltertype);
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

    for (let i = 0; i < aProps.length; i++) {
      const propName = aProps[i];

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
      this.mapSvc.setLayers(layers, 'baselayers');
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

  private subscribeToMapState() {
    if (this.mapStateSvc) {
      const mapStateOn = this.mapStateSvc.getMapState().subscribe(mapState => {
        if (mapState.options.notifier === 'user') {
          this.mapState = mapState;
          // console.log("User triggered mapState change", mapState)
          this.mapSvc.setZoom(mapState.zoom, mapState.options.notifier);
          this.mapSvc.setCenter([mapState.center.lon, mapState.center.lat], true);
        } else if (mapState.options.notifier === 'map') {
          // console.log("Map triggered mapState change", mapState)
        }
      });
      this.subs.push(mapStateOn);

      const extentOn = this.mapStateSvc.getExtent().subscribe(extent => {
        // console.log("new extent is: ", extent);
        if (extent[0] && extent[1] && extent[2] && extent[3]) {
          this.mapSvc.setExtent([extent[0], extent[1], extent[2], extent[3]], true, { duration: 500 });
        }
      });
      this.subs.push(extentOn);
    }
  }

  private subscribeToMapEvents() {
    this.mapOnMoveend = (evt) => {
      // console.log(this.mapState.zoom,this.mapState.center, this.mapState.options)
      // console.log("mapOn fired", evt)
      const zoom = Math.round(this.view.getZoom());
      const center = this.mapSvc.getCenter(true);
      const extent = this.mapSvc.getCurrentExtent(true);
      const ms = new MapState(zoom, { lat: parseFloat(center[1].toFixed(6)), lon: parseFloat(center[0].toFixed(6)) }, { notifier: 'map' }, extent, null);
      this.mapState = ms;
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
    const _ol = this.mapSvc.createMap();
    this.map = _ol.map; //
    this.view = _ol.view; //

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
    if (this.controls && this.map) {
      if (this.controls.attribution) {
        const attribution = new Attribution({
          collapsible: true,
          collapsed: false
        });
        this.map.addControl(attribution);
      }
      if (this.controls.scaleLine) {
        const scaleLineControl = new ScaleLine();
        this.map.addControl(scaleLineControl);
      }
      if (this.controls.zoom) {
        const zoomControl = new Zoom();
        this.map.addControl(zoomControl);
      }
      if (this.controls.mousePosition) {
        const mousePosition = new olMousePosition({
          coordinateFormat: coordinate => {
            return toStringXY(coordinate, 2);
          },
          projection: 'EPSG:4326'
        });
        this.map.addControl(mousePosition);
      }
      if (this.controls.fullScreen) {
        const fullScreen = new olFullScreen();
        this.map.addControl(fullScreen);
      }
      if (this.controls.overviewMap) {
        const overviewMap = new olOverviewMap({
          layers: [new olTileLayer({
            source: new olOSM()
          })],
          label: '\uD83C\uDF10'
        });
        this.map.addControl(overviewMap);
      }
      if (this.controls.rotate) {
        const rotate = new olRotate();
        this.map.addControl(rotate);
      }
    }
  }
}
