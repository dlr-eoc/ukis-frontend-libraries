import { Component, OnInit, HostBinding } from '@angular/core';
import { LayersService } from '@ukis/services-layers';
import { MapStateService } from '@ukis/services-map-state';
import { MapOlService } from '@ukis/map-ol';
import { osm } from '@ukis/base-layers-raster';

@Component({
  selector: 'app-route-map',
  templateUrl: './route-map.component.html',
  styleUrls: ['./route-map.component.css']
})
export class RouteMapComponent implements OnInit {
  @HostBinding('class') class = 'content-container';
  
  controls: { attribution?: boolean, scaleLine?: boolean, zoom?: boolean, crosshair?: boolean };
    

  constructor(
    public layersSvc: LayersService,
    public mapStateSvc: MapStateService,
    public mapSvc: MapOlService) {

    this.controls = {
      attribution: true,
      scaleLine: true
    };
      
  }


  ngOnInit(): void {
    const osmLayer = new osm();
    osmLayer.visible = true;
    this.layersSvc.addLayer(osmLayer, 'Overlays');
  }
}
