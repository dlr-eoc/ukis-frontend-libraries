import { Component, OnInit, Inject, AfterViewInit, OnDestroy, HostBinding } from '@angular/core';
import { LayersService } from '@ukis/services-layers';
import { osm, eoc_litemap } from '@ukis/base-layers-raster';
import { Subscription } from 'rxjs';
import { MapStateService } from '@ukis/services-map-state';
import { MapState } from '@ukis/services-map-state';
import { MapOlService } from '@ukis/map-ol';

import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { parse } from 'url';


@Component({
  selector: 'app-route-map',
  templateUrl: './route-map.component.html',
  styleUrls: ['./route-map.component.scss']
})
export class RouteMapComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class') class = 'content-container';

  queryParamsSub: Subscription;
  routParamsSub: Subscription;
  mapStateSub: Subscription;

  controls: { attribution?: boolean, scaleLine?: boolean, zoom?: boolean, crosshair?: boolean };

  constructor(
    public layerSvc: LayersService,
    public mapStateSvc: MapStateService,
    public http: HttpClient,
    public router: Router,
    public route: ActivatedRoute,
    @Inject(MapOlService) public mapOlSvc: MapOlService) {
    this.controls = { attribution: true, scaleLine: true, zoom: true };
  }

  ngOnInit() {
    this.subscribeToRoute();
    this.subscribeToMapState();


    this.addBaselayers();
  }

  ngAfterViewInit() {

  }

  addBaselayers() {
    let osm_layer = new osm({
      visible: false,
      legendImg: null
    } as any);

    let eoc_layer = new eoc_litemap({
      visible: true,
      legendImg: null
    } as any);
    this.layerSvc.addLayer(eoc_layer, 'Baselayers');
    this.layerSvc.addLayer(osm_layer, 'Baselayers');
  }

  subscribeToRoute() {
    this.routParamsSub = this.route.params.subscribe((params) => {
      console.info('routParamsSub', params);
    });


    this.queryParamsSub = this.route.queryParams.subscribe((params) => {
      if (Object.keys(params).length > 0) {
        if (params.bbox) {
          const strextent: string[] = params.bbox.split(',');
          const extent = strextent.map((i) => parseFloat(i));

          /** check if format is correct */
          if (extent.length == 4 && typeof extent[0] == 'number') {
            this.mapStateSvc.setExtent( extent as any);
          }
        }

        if (params.zoom) {
          const state = this.mapStateSvc.getMapState().getValue();
          state.zoom = params.zoom;
          this.mapStateSvc.getMapState().next(state);
        }

        if (params.center) {
          const state = this.mapStateSvc.getMapState().getValue();
          const center = params.center.split(',');
          state.center = { lon: center[0], lat: center[1] };
          this.mapStateSvc.getMapState().next(state);
        }

        if (params.time) {
          const state = this.mapStateSvc.getMapState().getValue();
          state.time = params.time;
          this.mapStateSvc.getMapState().next(state);
        }

      } else {
        const state = new MapState(3, { lat: 20, lon: 0 }, { notifier: 'user' });
        this.mapStateSvc.setMapState(state);
      }
    });



  }

  subscribeToMapState() {
    this.mapStateSub = this.mapStateSvc.getMapState().subscribe((state) => {
      if (history.pushState) {
        const url = parse(window.location.href.replace('#/', ''));
        const extent = state.extent.map(item => item.toFixed(3));
        let newurl = `${url.protocol}//${url.host}/#${url.pathname}?bbox=${extent.join(',')}`; // &time=${state.time}
        // console.log(newurl)
        window.history.pushState({ path: newurl }, '', newurl);
      }
    });
  }

  ngOnDestroy() {
    this.queryParamsSub.unsubscribe();
    this.routParamsSub.unsubscribe();
    this.mapStateSub.unsubscribe();
  }
}
