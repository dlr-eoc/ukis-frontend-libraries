import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { LayersService, CustomLayer } from '@ukis/services-layers';
import { MapStateService } from '@ukis/services-map-state';
import { MapOlService } from '@ukis/map-ol';
import { osm } from '@ukis/base-layers-raster';
import { ProgressService } from '../../components/global-progress/progress.service';

import olImageLayer from 'ol/layer/Image';
import olImageWMS from 'ol/source/ImageWMS';
import { parse } from 'url';

@Component({
  selector: 'app-route-map3',
  templateUrl: './route-map3.component.html',
  styleUrls: ['./route-map3.component.css'],
  /** use differnt instances of the services only for testing with diffenr routs  */
  providers: [LayersService, MapStateService, MapOlService]
})
export class RouteMap3Component implements OnInit, OnDestroy {
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

  ngOnDestroy() {
    this.mapStateSub.unsubscribe();
  }

  addLayers() {
    const osm_layer = new osm(<any>{
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

}

