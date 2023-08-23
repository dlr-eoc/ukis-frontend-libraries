import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, NgZone, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { LayerSpecification, Map as glMap, MapLibreEvent, NavigationControl, ScaleControl, StyleSpecification, TypedStyleLayer, GeoJSONSource, Dispatcher, Evented } from 'maplibre-gl';
import { setExtent, setCenter, setZoom, getExtent, getAllLayers, getLayerGroupIDs, getLayerChangeOrder, getFirstAndLastGroupLayer, removeLayerAndSource } from './maplibre.helpers';

import { MapState, MapStateService } from '@dlr-eoc/services-map-state';
import { LayersService, TFiltertypes, TFiltertypesUncap, Layer as ukisLayer } from '@dlr-eoc/services-layers';


import { Subject, Subscription } from 'rxjs';
import { combineLatest, delay } from 'rxjs/operators';
import { MapMaplibreService } from './map-maplibre.service';
import { getUkisLayerMetadata } from './maplibre-layers.helpers';
import toGeoJson from '@mapbox/togeojson';

type Tgroupfiltertype = TFiltertypesUncap | TFiltertypes;

/** 
 * This has to be global, because maplibre does this the same way
 * https://github1s.com/maplibre/maplibre-gl-js/blob/main/src/source/source.ts#L18-L19
 */
const hasSourceType = {};

@Component({
  selector: 'ukis-map-maplibre',
  templateUrl: './map-maplibre.component.html',
  styleUrls: ['./map-maplibre.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapMaplibreComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input('layersSvc') layersSvc!: LayersService;
  @Input('mapState') mapStateSvc!: MapStateService;

  @ViewChild('mapDiv') mapDivView!: ElementRef;
  map!: glMap
  subs: Subscription[] = [];

  mapCreated = new Subject<boolean>();

  /** [width, height] */
  public mapSize = [0, 0];
  private initialMapStateSet = false;
  private initialMapState: MapState | null = null;
  constructor(private ngZone: NgZone, private mapSvc: MapMaplibreService) { }

  ngOnInit(): void {
    if (!this.layersSvc) {
      console.error(`provide a LayersService as Input to ukis-map-leaflet`);
    }
    if (!this.mapStateSvc) {
      console.error(`provide a MapStateService as Input to ukis-map-leaflet`);
    }

    /** Subscribe to mapStateSvc before map is created */
    this.subscribeToMapState();

    /** subscribe to layers oninit so they get pulled after view init */
    this.subscribeToLayers();
  }

  ngAfterViewInit(): void {
    this.initMap();

    /** Subscribe to map events when the map is completely created  */
    this.subscribeToMapEvents();
    // this.map.getTargetElement().addEventListener('mouseleave', this.removePopupsOnMouseLeave);
  }

  ngAfterViewChecked() {
    /**
     * compare map and container size to update Map Size on container resize
     */
    this.updateMapSize();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.off('moveend', this.mapOnMoveend);
      // this.mapDivView.nativeElement.removeEventListener('mouseleave', this.removePopupsOnMouseLeave);
    }
  }

  /** 
   * https://maplibre.org/maplibre-gl-js-docs/api/ 
   * 
   * https://github.com/maplibre/ngx-maplibre-gl
   * 
   * */
  private initMap() {
    // https://github.com/maptiler/angular-template-maplibre-gl-js/blob/master/src/app/map/map.component.ts
    // zone? : https://github.com/Wykks/ngx-mapbox-gl/blob/main/libs/ngx-mapbox-gl/src/lib/map/map.service.ts#L104
    // NgZone.assertNotInAngularZone();

    // for font styles: The easiest way to turn your custom fonts into files compatible with maplibre-gl - https://github.com/maplibre/font-maker

    const baseStyle: StyleSpecification = {
      "version": 8,
      "name": "Merged Style Specifications",
      "metadata": {
      },
      "sources": {},
      "sprite": "https://openmaptiles.github.io/positron-gl-style/sprite",
      "glyphs": "http://fonts.openmaptiles.org/{fontstack}/{range}.pbf",
      "layers": []
    };

    this.map = new glMap({
      container: this.mapDivView.nativeElement,
      style: baseStyle as StyleSpecification
    });

    this.addCustomSources();
    this.setControls();

    if (!this.layersSvc) {
      console.log('there is no layersSvc as defined!');
    }

    if (!this.mapStateSvc) {
      console.log('there is no mapStateSvc as defined!');
    }



    this.map.once('load', () => {
      // first wait till map and style load then layers can be add
      this.mapCreated.next(true);
      this.mapSvc.map.next(this.map);
    });
  }

  private addCustomSources() {
    if (!hasSourceType['kml']) {
      this.addKmlSourceType();
      hasSourceType['kml'] = true;
    }
  }

  private addKmlSourceType() {
    /**
      * add custom source 
      * https://github.com/maplibre/maplibre-gl-js/blob/4619234968089ee67f761bde6ce24e1f861fb8c6/src/source/geojson_source.ts#L266
      * https://github.com/jimmyrocks/mapbox-gl-custom-protocol/blob/main/src/index.ts#L44
      * https://github.com/indus/mapsrc/blob/main/packages/TOPO/src/mapsrcTOPO.ts
      * https://github.com/mapbox/mapbox-gl-js/issues/2920
      */
    const FeatureCollection = { 'type': 'FeatureCollection', 'features': [] };
    class KMLSource extends GeoJSONSource {
      constructor(id: string, { data, ...options }: any, dispatcher: Dispatcher, eventedParent: Evented) {
        super(id, Object.assign(options, { data: FeatureCollection }), dispatcher, eventedParent);
        this.id = id;
        this.type = "geojson";
        this._options.data = data;
        this._preSetData(data);
      }

      setData(data: string) {
        this._preSetData(data);
        super.setData(this._data);
        return this;
      }

      /** kml string or url */
      _preSetData(data: string) {
        if (typeof data === 'string' && data.includes('.kml')) {
          var req = new XMLHttpRequest();
          req.open("GET", <string>data);
          req.responseType = "text";
          req.addEventListener("load", () => this.setData(req.response));
          req.send();
        } else if (data.includes('<?xml')) {
          this._options.data = data;
          const geojson = this._dataToGeojson(data);
          this._data = geojson;
        } else {
          console.error("KMLSource expects a URL or a KML (XML) as string 'data'");
        }
      }

      _dataToGeojson(data: string) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        return toGeoJson.kml(xmlDoc);
      }
    }

    // https://github1s.com/maplibre/maplibre-gl-js/blob/4619234968089ee67f761bde6ce24e1f861fb8c6/src/source/source.ts#L130-L131
    // return registeredSources[name];
    // addSourceType -> registeredSources[name] = SourceType
    // getSourceType -> return registeredSources[name]
    this.map.addSourceType('kml', KMLSource, (err, result) => {
      if (err) {
        console.log(err, result);
      }
    });
  }

  private setControls() {
    this.map.setMaxPitch(75);

    const nav = new NavigationControl({
      showCompass: true,
      showZoom: true,
      visualizePitch: true
    });
    this.map.addControl(nav, 'top-left');

    const scale = new ScaleControl({
      unit: 'metric'
    });
    this.map.addControl(scale, 'bottom-left');


    /* const attribution = new AttributionControl({
      compact: false
    });
    this.map.addControl(attribution, 'bottom-right'); */
  }


  private subscribeToMapEvents() {
    this.map.on('moveend', this.mapOnMoveend);

    /** 
     * TODO: Popups
     * handle click and pointermove/mousemove 
     */

    /** 
     * TODO:
     * handle double click
     */
  }

  private mapOnMoveend = (evt: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>) => {
    const zoom = this.map.getZoom();
    const latLng = this.map.getCenter();
    const extent = getExtent(this.map, true);

    const newCenter = { lat: latLng.lat, lon: latLng.lng };
    const ms = new MapState(zoom, newCenter, { notifier: 'map' }, extent);
    this.mapStateSvc.setMapState(ms);
  };

  private updateMapSize() {
    const mapDiv = this.getMapDiv();
    if (mapDiv) {
      if (mapDiv.width === this.mapSize[0] && mapDiv.height === this.mapSize[1]) {
        if (!this.initialMapStateSet && this.initialMapState) {
          /**
           * If container size and map size are equal (map size 'stable')
           * Get last state from mapStateSvc and set it, so a User can set the initial MapState in a component on ngOnInit 
           * Update map size before so view.fit can calculate correct center
           */
          this.setMapState(this.initialMapState);
          this.initialMapStateSet = true;
        }
      } else {
        /** update map size till container size and map size are equal */
        this.ngZone.runOutsideAngular(() => {
          // resize triggers setMapState so mapStateSvc.getLastAction().getValue() was incorrect -> now use the initialMapState
          this.map.resize();
          const container = this.map.getContainer();
          this.mapSize = [container.clientWidth, container.clientHeight];
        });
      }

    }
  }

  private setMapState(mapState: MapState) {
    if (!this.initialMapState) {
      this.initialMapState = mapState;
    }
    const lastAction = this.mapStateSvc.getLastAction().getValue();
    if (mapState.options.notifier === 'user' && this.map) {
      if (lastAction === 'setExtent') {
        setExtent(this.map, mapState.extent, true);
      } else if (lastAction === 'setState') {
        setZoom(this.map, mapState.zoom, mapState.options.notifier);
        setCenter(this.map, [mapState.center.lon, mapState.center.lat], true);
      }
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

  private subscribeToMapState() {
    if (this.mapStateSvc) {
      const mapStateOn = this.mapStateSvc.getMapState().subscribe(item => this.setMapState(item));
      this.subs.push(mapStateOn);
    }
  }

  // --------------------------------------------------

  private subscribeToLayers() {
    // add and remove layers
    if (this.layersSvc) {
      /**
       * use delay https://blog.angular-university.io/angular-debugging/#analternativeusingrxjs
       * Expression has changed after it was checked
       * -> addBaseLayers changes visible in layers array
       * -> better try to create layers before the map is created, but add them when the map is created.
       * 
       * combineLatest is replaced with combineLatestWith in rxjs v7.x. Wait until Angular supports this.
       */
      const onBaselayers = this.mapCreated.asObservable().pipe(delay(0), (combineLatest(this.layersSvc.getBaseLayers())))
        .subscribe(obs => this.addUpdateBaseLayers(obs[1].filter(l => this.mapSvc.layerIsSupported(l))));
      this.subs.push(onBaselayers);

      const onLayers = this.mapCreated.asObservable().pipe(delay(0), (combineLatest(this.layersSvc.getLayers())))
        .subscribe(obs => this.addUpdateLayers(obs[1].filter(l => this.mapSvc.layerIsSupported(l)), 'layers'));
      this.subs.push(onLayers);

      const onOverlays = this.mapCreated.asObservable().pipe(delay(0), (combineLatest(this.layersSvc.getOverlays())))
        .subscribe(obs => this.addUpdateLayers(obs[1].filter(l => this.mapSvc.layerIsSupported(l)), 'overlays'));
      this.subs.push(onOverlays);
    }
  }



  private addUpdateBaseLayers(layers: ukisLayer[]) {
    const filtertype = 'baselayers';
    // this is like map change style but we only like to update nor recreat alle style 
    // map.setStyle(): https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Map/#setstyle
    // Changes in sprites and glyphs cannot be diffed.
    const visiblelayers = layers.filter(i => i.visible);


    /** if length of layers has changed add new layers */
    const mapLayers = getLayerGroupIDs(this.map, filtertype);

    if (layers.length !== mapLayers.length) {
      // set only one visible at start
      if (visiblelayers.length === 0) {
        layers[0].visible = true;
      } else if (visiblelayers.length > 1) {
        layers.forEach(l => l.visible = false);
        layers[0].visible = true;
      }

      this.mapSvc.setUkisLayers(layers, filtertype, this.map);
    } else {
      /** if layers already on the map -length not changed- update them */
      this.updateLayers(layers, mapLayers);
    }
    // console.log(layers, 'visible', visiblelayers, 'map -', mapLayers, 'map visible -', visibleMapLayers)
  }

  private addUpdateLayers(layers: ukisLayer[], filtertype: Tgroupfiltertype) {
    // this.map.addSource or update (this.map.removeLayer and this.map.addLayer) 
    // and this.map.addLayer or update (this.map.removeLayer and this.map.addLayer) 


    /** if length of layers has changed add new layers */
    const mapLayers = getLayerGroupIDs(this.map, filtertype)

    if (layers.length !== mapLayers.length) {
      const layerIDs = layers.map(l => l.id);
      const removedLayers = mapLayers.filter(l => layerIDs.indexOf(l) === -1);

      //TODO: if layer was StyleSpecification how to remove all things from it
      removeLayerAndSource(this.map, removedLayers);
      // console.log('reset layers', layers, mapLayers);
      this.mapSvc.setUkisLayers(layers, filtertype, this.map);
    } else {
      /** if layers already on the map - length not changed - update them */
      this.updateLayers(layers, mapLayers);
      // console.log('update layers', layers, mapLayers);
    }

  }

  private updateLayers(layers: ukisLayer[], mapLayerIds: string[]) {
    const layerChange = getLayerChangeOrder(layers, mapLayerIds);

    if (layerChange) {
      const layerMapLayers = getFirstAndLastGroupLayer(this.map, layerChange.layerId);
      const beforeMapLayers = getFirstAndLastGroupLayer(this.map, layerChange.beforeId);
      /** 
       * if the layer before the one to be moved has several layers, move the layer on beforeMapLayers[0]
       * If there is no layer before, move it to the top.
       * 
       * https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Map/#movelayer
       * -  If beforeId is omitted, the layer will be appended to the end of the layers array... -
       */
      if (beforeMapLayers.length >= 1) {
        layerChange.beforeId = beforeMapLayers[0].id;
      } else {
        layerChange.beforeId = null;
      }


      /** If the layer which should be moved has several layers, move all of them. */
      if (layerMapLayers.length > 1) {
        // reverse to move
        layerMapLayers.reverse();
        layerMapLayers.forEach((value: LayerSpecification, index: number) => {
          // Move the first layer to the Before ID and the Move All layer after the moved layer.
          if (index === 0) {
            if (layerChange.beforeId) {
              this.map.moveLayer(value.id, layerChange.beforeId);
            } else {
              this.map.moveLayer(value.id);
            }
          } else {
            const beforeLayer = layerMapLayers[index - 1];
            this.map.moveLayer(value.id, beforeLayer.id);
          }
        });
      } else if (layerMapLayers.length === 1) {
        const layer = layerMapLayers[0];
        if (layerChange.beforeId) {
          this.map.moveLayer(layer.id, layerChange.beforeId);
        } else {
          this.map.moveLayer(layer.id)
        }
      } else {
        // layerMapLayers.length === 0 
        // there is nothing to move
      }
    }

    for (const layer of layers) {
      const mllayers = getAllLayers(this.map).filter(l => {
        const ukismetadata = getUkisLayerMetadata(l as TypedStyleLayer)
        return ukismetadata['ukis:layergroup'] === layer.id;
      }).map(l => this.map.getLayer(l.id)).filter(l => l);

      mllayers.forEach(l => {
        this.mapSvc.updateMlLayer(l as any, layer, this.map);
      })
    }
  }
}



