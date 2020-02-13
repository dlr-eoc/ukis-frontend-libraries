import { Component, OnInit, HostBinding } from '@angular/core';
import { LayersService } from '@ukis/services-layers';
import { osm, eoc_litemap } from '@ukis/base-layers-raster';
import { MapStateService } from '@ukis/services-map-state';

import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-route-map',
  templateUrl: './route-map.component.html',
  styleUrls: ['./route-map.component.scss']
})
export class RouteMapComponent implements OnInit {
  @HostBinding('class') class = 'content-container';


  controls: { attribution?: boolean, scaleLine?: boolean, zoom?: boolean, crosshair?: boolean };

  constructor(
    public layerSvc: LayersService,
    public mapStateSvc: MapStateService,
    public http: HttpClient,
    public router: Router,
    public route: ActivatedRoute) {
    this.controls = { attribution: true, scaleLine: true, zoom: true };
  }

  ngOnInit() {
    this.addlayers();
  }

  addlayers() {
    let osm_layer = new osm({
      visible: true,
      legendImg: null
    } as any);

    let eoc_layer = new eoc_litemap({
      visible: false,
      legendImg: null
    } as any);

    if (!this.layerSvc.getLayerById('eoc_litemap')) {
      this.layerSvc.addLayer(eoc_layer, 'Layers');
    }

    if (!this.layerSvc.getLayerById('osm')) {
      this.layerSvc.addLayer(osm_layer, 'Baselayers');
    }
  }
}
