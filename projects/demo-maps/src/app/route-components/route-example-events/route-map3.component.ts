import { Component, OnInit, HostBinding, OnDestroy, AfterViewInit } from '@angular/core';
import { LayersService, CustomLayer, TGeoExtent } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { MapOlService } from '@dlr-eoc/map-ol';
import { osm } from '@dlr-eoc/base-layers-raster';
import { ProgressService } from '../../components/global-progress/progress.service';

import olImageLayer from 'ol/layer/Image';
import olImageWMS from 'ol/source/ImageWMS';
import olVectorImageLayer from 'ol/layer/VectorImage';
import olVectorSource from 'ol/source/Vector';

import { parse } from 'url';
import { regularGrid } from './map.utils';

@Component({
  selector: 'app-route-map3',
  templateUrl: './route-map3.component.html',
  styleUrls: ['./route-map3.component.scss'],
  /** use differnt instances of the services only for testing with diffenr routs  */
  providers: [LayersService, MapStateService, MapOlService]
})
export class RouteMap3Component implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class') class = 'content-container';
  controls: { attribution?: boolean, scaleLine?: boolean, zoom?: boolean, crosshair?: boolean };
  mapStateSub: any;
  constructor(
    public layersSvc: LayersService,
    public mapStateSvc: MapStateService,
    public mapSvc: MapOlService,
    private progressService: ProgressService) {

    this.controls = {
      attribution: true,
      scaleLine: true
    };
  }


  ngOnInit(): void {
    this.addLayers();
    this.subscribeToMapState();
  }

  ngAfterViewInit() {
    this.mapSvc.map.on('moveend', this.updateLayerOnZoom);
  }

  ngOnDestroy() {
    this.mapStateSub.unsubscribe();
    this.mapSvc.map.un('moveend', this.updateLayerOnZoom);
  }

  addLayers() {
    const osm_layer = new osm({
      legendImg: null,
      visible: true
    });

    const source = new olImageWMS({
      url: 'https://ahocevar.com/geoserver/wms',
      params: { 'LAYERS': 'topp:states' },
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

    const event_layer = new CustomLayer({
      id: 'event_layer',
      name: 'Image load Layer',
      type: 'custom',
      custom_layer: new olImageLayer({ source: source }),
      visible: false,
      bbox: [-133.9453125, 18.979025953255267, -60.46875, 52.908902047770255] /** for zoom to the layer */
    });

    const layers = [osm_layer, event_layer];
    layers.forEach(layer => this.layersSvc.addLayer(layer, 'Layers'));

  }

  subscribeToMapState() {
    this.mapStateSub = this.mapStateSvc.getMapState().subscribe((state) => {
      if (history.pushState) {
        const url = parse(window.location.href.replace('#/', ''));
        const extent = state.extent.map(item => item.toFixed(3));
        const newurl = `${url.protocol}//${url.host}/#${url.pathname}?bbox=${extent.join(',')}`; // &time=${state.time}
        // console.log(newurl)
        window.history.pushState({ path: newurl }, '', newurl);
      }
    });
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

    const _gridLayer = new olVectorImageLayer({
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
        custom_layer: _gridLayer
      });

      this.layersSvc.addLayer(gridLayer, 'Layers');
    } else {
      oldGridLayer.custom_layer = _gridLayer;
      this.layersSvc.updateLayer(oldGridLayer, oldGridLayer.filtertype);
    }
  }

}

