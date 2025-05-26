import { Component, OnInit, HostBinding } from '@angular/core';
import { LayersService } from '@dlr-eoc/services-layers';
import { OsmTileLayer, HillshadeTile } from '@dlr-eoc/base-layers-raster';
import { MapStateService } from '@dlr-eoc/services-map-state';

import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MapOlService } from '@dlr-eoc/map-ol';

import { ClarityIcons, layersIcon, worldIcon} from '@cds/core/icon';
import { MapOlComponent } from '@dlr-eoc/map-ol';
import { ClrVerticalNavModule, ClrStandaloneCdkTrapFocus, ClrNavigationModule, ClrIconModule } from '@clr/angular';
import { LayerControlComponent, BaseLayerControlComponent } from '@dlr-eoc/layer-control';
ClarityIcons.addIcons(...[layersIcon, worldIcon]);


@Component({
    selector: 'app-route-map',
    templateUrl: './route-map.component.html',
    styleUrls: ['./route-map.component.scss'],
    providers: [MapOlService],
    imports: [MapOlComponent, ClrVerticalNavModule, ClrStandaloneCdkTrapFocus, ClrNavigationModule, ClrIconModule, LayerControlComponent, BaseLayerControlComponent]
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
    const osmLayer = new OsmTileLayer({
      visible: true
    });

    const eocLayer = new HillshadeTile({
      visible: false
    });

    if (!this.layerSvc.getLayerById(eocLayer.id)) {
      this.layerSvc.addLayer(eocLayer, 'Layers');
    }

    if (!this.layerSvc.getLayerById(osmLayer.id)) {
      this.layerSvc.addLayer(osmLayer, 'Baselayers');
    }
  }
}
