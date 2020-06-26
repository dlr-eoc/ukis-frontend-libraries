import { Component, OnInit, HostBinding, OnDestroy, AfterViewInit } from '@angular/core';
import { LayersService, CustomLayer, TGeoExtent } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { MapOlService, IMapControls } from '@dlr-eoc/map-ol';
import { OsmTileLayer } from '@dlr-eoc/base-layers-raster';
import { ProgressService } from '../../components/global-progress/progress.service';

import olImageLayer from 'ol/layer/Image';
import olImageWMS from 'ol/source/ImageWMS';
import olVectorImageLayer from 'ol/layer/VectorImage';
import olVectorSource from 'ol/source/Vector';

import { parse } from 'url';
import { regularGrid } from './map.utils';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-route-map3',
  templateUrl: './route-map3.component.html',
  styleUrls: ['./route-map3.component.scss'],
  /** use differnt instances of the services only for testing with diffenr routs  */
  providers: [LayersService, MapStateService, MapOlService]
})
export class RouteMap3Component implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class') class = 'content-container';
  controls: IMapControls;
  subs: Subscription[] = [];
  private startBbox = null;
  constructor(
    public layersSvc: LayersService,
    public mapStateSvc: MapStateService,
    public mapSvc: MapOlService,
    private progressService: ProgressService,
    public route: ActivatedRoute) {

    this.controls = {
      attribution: true,
      scaleLine: true
    };
  }


  ngOnInit(): void {
    this.addLayers();
    this.subscribeToMapState();
    this.subscribeToRoute();
    if (this.startBbox) {
      console.log('this.startBbox', this.startBbox)
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
      visible: true
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

    const layers = [osmLayer, eventLayer];
    layers.forEach(layer => this.layersSvc.addLayer(layer, 'Layers'));

  }

  updateSearchParamsHashRouting(params: { [key: string]: string }) {
    const url = parse(window.location.href.replace('#/', ''));
    const urlHashRouting = parse(window.location.href);
    const queryString = urlHashRouting.hash.split('?')[1];
    let query = new URLSearchParams();
    if (queryString) {
      query = new URLSearchParams(queryString);
    }
    Object.keys(params).map(key => {
      query.set(key, params[key]);
    });
    const newQueryString = decodeURIComponent(`${query}`);
    const newurl = `${urlHashRouting.protocol}//${urlHashRouting.host}${urlHashRouting.pathname || ''}#${url.pathname}?${newQueryString}`; // &time=${state.time}
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


  updateLayerOnZoom = (evt) => {
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
      id: layerID,
      source: gridLayerSource
    });

    const oldGridLayer = this.layersSvc.getLayerById(layerID) as CustomLayer;
    if (!oldGridLayer) {
      const gridLayer = new CustomLayer({
        id: layerID,
        name: `gridLayer`,
        type: 'custom',
        opacity: 0.3,
        custom_layer: olGridLayer
      });

      this.layersSvc.addLayer(gridLayer, 'Layers');
    } else {
      oldGridLayer.custom_layer = olGridLayer;
      this.layersSvc.updateLayer(oldGridLayer, oldGridLayer.filtertype);
    }
  }

}

