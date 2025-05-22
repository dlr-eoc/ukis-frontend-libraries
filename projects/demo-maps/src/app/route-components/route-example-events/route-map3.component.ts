import { Component, OnInit, HostBinding, OnDestroy, AfterViewInit } from '@angular/core';
import { LayersService, CustomLayer, TGeoExtent, VectorLayer } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { MapOlService, IMapControls } from '@dlr-eoc/map-ol';
import { EocLitemap, OsmTileLayer } from '@dlr-eoc/base-layers-raster';
import { ProgressService } from '../../components/global-progress/progress.service';

import olImageLayer from 'ol/layer/Image';
import olImageWMS from 'ol/source/ImageWMS';
import olVectorImageLayer from 'ol/layer/VectorImage';
import olVectorSource from 'ol/source/Vector';

import { regularGrid } from './map.utils';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, first } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';

import testData from '@dlr-eoc/shared-assets/geojson/test.json';


import olTileLayer from 'ol/layer/Tile';
import olTileWMS from 'ol/source/TileWMS';
import { getRenderPixel } from 'ol/render';
import olLayerGroup from 'ol/layer/Group';
import { AlertService } from '../../components/global-alert/alert.service';

import { ClarityIcons, layersIcon, cogIcon, compassIcon, downloadIcon } from '@cds/core/icon';
import { MapOlComponent } from '@dlr-eoc/map-ol';
import { ClrVerticalNavModule, ClrStandaloneCdkTrapFocus, ClrNavigationModule, ClrIconModule } from '@clr/angular';
import { LayerControlComponent } from '@dlr-eoc/layer-control';
import { MousePositionComponent } from '@dlr-eoc/map-tools';
ClarityIcons.addIcons(...[layersIcon, cogIcon, compassIcon, downloadIcon]);

@Component({
    selector: 'app-route-map3',
    templateUrl: './route-map3.component.html',
    styleUrls: ['./route-map3.component.scss'],
    /** use different instances of the services only for testing with different routes  */
    providers: [LayersService, MapStateService, MapOlService],
    imports: [MapOlComponent, ClrVerticalNavModule, ClrStandaloneCdkTrapFocus, ClrNavigationModule, ClrIconModule, LayerControlComponent, MousePositionComponent]
})
export class RouteMap3Component implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class') class = 'content-container floating';
  controls: IMapControls;
  subs: Subscription[] = [];
  private startBbox = null;
  constructor(
    public layersSvc: LayersService,
    public mapStateSvc: MapStateService,
    public mapSvc: MapOlService,
    public alertSvc: AlertService,
    private progressService: ProgressService,
    public route: ActivatedRoute) {

    this.controls = {
      attribution: true,
      scaleLine: true
    };
  }


  ngOnInit(): void {
    this.addLayers();
    this.subscribeToLayers();
    this.subscribeToMapState();
    this.subscribeToRoute();
    if (this.startBbox) {
      this.mapStateSvc.setExtent(this.startBbox);
    }
  }

  ngAfterViewInit() {
    this.mapSvc.map.on('moveend', this.updateLayerOnZoom);
  }


  ngOnDestroy() {
    this.subs.map(s => s.unsubscribe());
    this.mapSvc.map.un('moveend', this.updateLayerOnZoom);
  }

  addLayers() {
    const osmLayer = new OsmTileLayer({
      visible: false
    });

    const eocLitemapLayer = new EocLitemap({
      visible: true,
      tileSize: 512
    });

    const source = new olImageWMS({
      url: 'https://ahocevar.com/geoserver/wms',
      params: { LAYERS: 'topp:states' },
      serverType: 'geoserver'
    });

    source.on('imageloadstart', () => {
      this.progressService.progress({ indeterminate: true });
    });

    source.on('imageloadend', () => {
      this.progressService.progress(null);
    });
    source.on('imageloaderror', () => {
      this.progressService.progress(null);
    });

    const eventLayer = new CustomLayer({
      id: 'event_layer',
      name: 'Image load Layer',
      type: 'custom',
      custom_layer: new olImageLayer({ source }),
      visible: false,
      bbox: [-133.9453125, 18.979025953255267, -60.46875, 52.908902047770255] /** for zoom to the layer */
    });

    const updatableFeatureLayer = new VectorLayer({
      id: 'updatable_feature_layer',
      name: 'Updatable feature layer',
      type: 'geojson',
      visible: false,
      data: {
        type: "FeatureCollection",
        features: [{
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Polygon",
            "coordinates": [[
              [-192.48046875, -24.686952411999144],
              [-88.06640625, -24.686952411999144],
              [-88.06640625, 50.28933925329178],
              [-192.48046875, 50.28933925329178],
              [-192.48046875, -24.686952411999144]
            ]]
          }
        }]
      },
      actions: [{
        action: (layer: any) => {
          updatableFeatureLayer.data = testData;
          this.layersSvc.updateLayer(updatableFeatureLayer);
        },
        icon: 'download',
        title: 'Load data'
      }]
    });

    const olGridLayer = this.getGridLayer();
    const gridLayer = new CustomLayer({
      id: olGridLayer.id,
      name: `gridLayer`,
      type: 'custom',
      opacity: 0.3,
      custom_layer: olGridLayer.layer
    });

    const layers = [eocLitemapLayer, osmLayer, eventLayer, updatableFeatureLayer, gridLayer];
    layers.forEach(layer => this.layersSvc.addLayer(layer, 'Layers'));
  }

  removeLayer() {
    this.layersSvc.removeLayerOrGroupById('event_layer2');
  }

  addLayer() {
    const onTileLoadStart = new Subject<any>()
    const onTileLoadEnd = new Subject<any>()

    const olevent_layer2 = new olTileLayer({
      source: new olTileWMS({
        url: 'https://geoservice.dlr.de/eoc/land/wms',
        params: {
          LAYERS: 'GUF28_DLR_v1_Mosaic'
        }
      })
    });

    const onPrerender = (arg) => {
      var ctx = arg.context;
      var mapSize = this.mapSvc.map.getSize();
      var width = mapSize[0] * (50 / 100);
      var tl = getRenderPixel(arg, [width, 0]);
      var tr = getRenderPixel(arg, [mapSize[0], 0]);
      var bl = getRenderPixel(arg, [width, mapSize[1]]);
      var br = getRenderPixel(arg, mapSize);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(tl[0], tl[1]);
      ctx.lineTo(bl[0], bl[1]);
      ctx.lineTo(br[0], br[1]);
      ctx.lineTo(tr[0], tr[1]);
      ctx.closePath();
      ctx.clip();
    };

    const onPostrender = (arg) => {
      const ctx = arg.context;
      ctx.restore();
    };

    olevent_layer2.on('prerender', (arg) => {
      onPrerender(arg);
    });

    olevent_layer2.on('postrender', (arg) => {
      onPostrender(arg);
    });

    const eventLayer2 = new CustomLayer({
      id: 'event_layer2',
      name: 'Image load Layer 2',
      type: 'custom',
      custom_layer: new olLayerGroup({
        layers: [olevent_layer2]
      }),
      visible: true,
      removable: true,
      events: {
        source: [{
          event: 'tileloadstart', listener: (arg) => {
            onTileLoadStart.next(arg)
          }
        },
        {
          event: 'tileloadend', listener: (arg) => {
            onTileLoadEnd.next(arg);
          }
        }],
        layer: [
          {
            event: 'prerender', listener: (arg) => {
              onPrerender(arg);
            }
          },
          {
            event: 'postrender', listener: (arg) => {
              onPrerender(arg);
            }
          }
        ]
      }
    });
    onTileLoadStart.subscribe(e => this.progressService.progress({ indeterminate: true }));
    onTileLoadEnd.pipe(debounceTime(200)).subscribe(e => this.progressService.progress(null));
    this.layersSvc.addLayer(eventLayer2, 'Layers');
  }

  getSearchParamsHashRouting(url = window.location.href) {
    if (url.indexOf('http') === -1) {
      url = new URL(url, `${window.location.origin}${window.location.pathname}`).toString();
    }

    const urlHashRouting = new URL(window.location.href, window.location.origin);
    const [hash, queryString] = urlHashRouting.hash.split('?');

    let query = new URLSearchParams();
    if (queryString) {
      query = new URLSearchParams(queryString);
    }

    return {
      query,
      urlHashRouting,
      hash
    };
  }



  updateSearchParamsHashRouting(params: { [key: string]: string }) {
    const { query, urlHashRouting, hash } = this.getSearchParamsHashRouting();
    Object.keys(params).map(key => {
      query.set(key, params[key]);
    });
    const newQueryString = decodeURIComponent(`${query}`);
    const newurl = `${urlHashRouting.protocol}//${urlHashRouting.host}${urlHashRouting.pathname || '/'}${hash || '#/'}?${newQueryString}`;
    return newurl;
  }


  /** set url from MapState */
  subscribeToMapState() {
    const mapStatSub = this.mapStateSvc.getMapState().subscribe((state) => {
      if (history.pushState) {
        const extent = state.extent.map(item => item.toFixed(3));

        const newurl = this.updateSearchParamsHashRouting({ bbox: extent.join(','), zoom: state.zoom.toString() });
        window.history.pushState({ path: newurl }, '', newurl);
      }
    });
    this.subs.push(mapStatSub);
  }

  /** get url and set MapState */
  subscribeToRoute() {
    const queryParamsSub = this.route.queryParams.pipe(first()).subscribe((params) => {
      if (Object.keys(params).length > 0) {
        if (params.bbox) {
          const bbox = params.bbox.split(',').map(i => parseFloat(i));
          if (bbox.length === 4) {
            this.startBbox = bbox;
          }
        }
      }
    });
    this.subs.push(queryParamsSub);
  }

  subscribeToLayers() {
    if (this.layersSvc) {
      const onLayers = this.layersSvc.getLayers().subscribe(layers => {
        const visiblelayers = layers.filter(l => l.visible === true);
        visiblelayers.forEach(layer => {
          if (layer.id === 'updatable_feature_layer') {
            const vLayer = layer as VectorLayer;
            // if length > 1 features already loaded
            if (vLayer.data.features.length <= 1) {
              this.alertSvc.alert({
                type: 'info',
                text: `Click the layer setting down arrow icon to load new features.`,
                closeable: true
              });
            }
          }
        });
      });
      this.subs.push(onLayers);
    }
  }



  updateLayerOnZoom = () => {
    const olGridLayer = this.getGridLayer();
    const oldGridLayer = this.layersSvc.getLayerById(olGridLayer.id) as CustomLayer;
    if (oldGridLayer) {
      oldGridLayer.custom_layer = olGridLayer.layer;
      this.layersSvc.updateLayer(oldGridLayer, oldGridLayer.filtertype);
    }
  }

  getGridLayer = () => {
    const mapState = this.mapStateSvc.getMapState().getValue();
    const mapextent = mapState.extent;
    const zoom = mapState.zoom;
    const layerID = `gridLayer`;
    const bbox: TGeoExtent = [-180, -90, 180, 90];
    const cellSize = 0.5;
    const regulargrid = regularGrid(bbox, cellSize, zoom, this.mapSvc.EPSG, mapextent);

    const gridLayerSource = new olVectorSource({
      features: regulargrid,
      wrapX: false
    });

    const olGridLayer = new olVectorImageLayer({
      source: gridLayerSource
    });
    olGridLayer.set('id', layerID);

    return {
      layer: olGridLayer,
      id: layerID
    };
  }

}

