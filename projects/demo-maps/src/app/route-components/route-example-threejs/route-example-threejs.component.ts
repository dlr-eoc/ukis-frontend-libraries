import { Component, OnInit, HostBinding, AfterViewInit } from '@angular/core';

import { LayersService, CustomLayer } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { MapOlService, IMapControls } from '@dlr-eoc/map-ol';
import { MapThreeService } from '@dlr-eoc/map-three';

import { Graticule } from 'ol';
import { TileWMS } from 'ol/source';
import { Tile as TileLayer } from 'ol/layer';
import { get as getProjection } from 'ol/proj';

import { ClarityIcons, layersIcon, infoStandardIcon } from '@cds/core/icon';
import { MapOlComponent } from '../../../../../map-ol/src/lib/map-ol.component';
import { MapThreeComponent } from '../../../../../map-three/src/lib/map-three.component';
import { ClrVerticalNavModule, ClrStandaloneCdkTrapFocus, ClrNavigationModule, ClrIconModule, ClrAlertModule } from '@clr/angular';
import { LayerControlComponent } from '../../../../../layer-control/src/lib/layer-control/layer-control.component';
ClarityIcons.addIcons(...[layersIcon, infoStandardIcon]);

@Component({
    selector: 'app-route-example-threejs',
    templateUrl: './route-example-threejs.component.html',
    styleUrls: ['./route-example-threejs.component.scss'],
    providers: [LayersService, MapOlService] // <-- Don't provide MapStateSvc here! If we do, state is no longer synced between the two maps.
    ,
    standalone: true,
    imports: [MapOlComponent, MapThreeComponent, ClrVerticalNavModule, ClrStandaloneCdkTrapFocus, ClrNavigationModule, ClrIconModule, ClrAlertModule, LayerControlComponent]
})
export class RouteMap8Component implements OnInit, AfterViewInit {
  @HostBinding('class') class = 'content-container';
  controls: IMapControls;

  constructor(
    public layersSvc: LayersService,
    public mapStateSvc: MapStateService,
    public mapOlSvc: MapOlService,
    public mapThreeSvc: MapThreeService
  ) {
    this.controls = {
      attribution: true,
      mousePosition: true,
      scaleLine: true,
      zoom: true
    };
  }

  ngOnInit(): void {
    const phobosShadeWms = new TileLayer({
      source: new TileWMS({
        url: 'https://planetarymaps.usgs.gov/cgi-bin/mapserv?map=/maps/mars/phobos_simp_cyl.map',
        params: {
          'LAYERS': 'VIKING',
        },
        crossOrigin: 'anonymous',  // this is important: prevents CORS errors.
      })
    });

    const graticule = new Graticule({
      showLabels: true,
      wrapX: true,
      latLabelPosition: 0.5
    });

    const phobosLayer = new CustomLayer({
      id: 'phobos',
      name: 'Phobos',
      custom_layer: phobosShadeWms,
      description: `There are a few objects that are very big, but still irregularly shaped.
      Because they are big, it makes sense to serve their image-material per WMTS instead of a single, humongous file.
      Because they are irregularly shaped, it makes sense to display them in 3d.

      This demo shows how we can project openlayers-layers onto a three-js mesh to reap the benefits of both libraries.`
    });


    const graticuleLayer = new CustomLayer({
      id: 'graticule',
      name: 'Graticule',
      custom_layer: graticule,
      description: `Note how adding and removing this layer is reflected in both the map and the 3d-object.`
    });

    this.layersSvc.addLayer(phobosLayer);
    this.layersSvc.addLayer(graticuleLayer);
  }

  ngAfterViewInit(): void {
    const projection = getProjection('EPSG:4326');
    this.mapOlSvc.setProjection(projection);
    this.mapOlSvc.map.getView().setMaxZoom(4); // zooming in deeper causes too much noise on the image-edges.
  }

}
