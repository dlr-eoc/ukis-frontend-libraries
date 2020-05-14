import { Component, OnInit, HostBinding, AfterViewInit } from '@angular/core';
import { LayersService, VectorLayer } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { MapOlService, IMapControls } from '@dlr-eoc/map-ol';
import { OsmTileLayer } from '@dlr-eoc/base-layers-raster';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-route-map7',
  templateUrl: './route-map7.component.html',
  styleUrls: ['./route-map7.component.scss'],
  providers: [LayersService, MapStateService, MapOlService]
})
export class RouteMap7Component implements OnInit, AfterViewInit {
  @HostBinding('class') class = 'content-container';

  controls: IMapControls;

  constructor(
    public layersSvc: LayersService,
    public mapStateSvc: MapStateService,
    public mapSvc: MapOlService,
    private http: HttpClient
  ) {
    this.controls = {
      attribution: true,
      scaleLine: true
    };
   }

  ngOnInit(): void {
    this.mapSvc.setProjection('EPSG:4326');

    const bgLayer = new OsmTileLayer({
      visible: true
    });
    this.layersSvc.addLayer(bgLayer, 'Layers');
  }

  ngAfterViewInit(): void {
    const extent = [-87, 38.5, -86, 39.5] as [number, number, number, number];
    /**
     * Currenty, there is a small bug in mapStateSvc.setExtent:
     * this method does not work as long as the 'duration' parameter is given.
     * As a short-term workaround, we work on the olMap directly.
     */
    // this.mapStateSvc.setExtent(extent);
    this.mapSvc.map.getView().fit(
      extent, {
        size: this.mapSvc.map.getSize(),
      });
  }

}
