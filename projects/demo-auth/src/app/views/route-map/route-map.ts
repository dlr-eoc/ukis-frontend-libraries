import { Component, effect, inject } from "@angular/core";
import {
  ClarityIcons,
  ClrIcon,
  ClrNavigationModule,
  ClrStandaloneCdkTrapFocus,
  ClrVerticalNavModule,
} from "@clr/angular";
import { layersIcon, worldIcon } from "@clr/angular/icon";
import { HillshadeTile, OsmTileLayer } from "@dlr-eoc/base-layers-raster";
import { IMapControls, MapOlComponent, MapOlService } from "@dlr-eoc/map-ol";
import { LayerControlComponent } from "@dlr-eoc/ngx-ukis-ui-clarity";
import { LayersService } from "@dlr-eoc/services-layers";
import { MapStateService } from "@dlr-eoc/services-map-state";
ClarityIcons.addIcons(layersIcon, worldIcon);

@Component({
  imports: [
    MapOlComponent,
    ClrVerticalNavModule,
    ClrStandaloneCdkTrapFocus,
    ClrNavigationModule,
    ClrIcon,
    LayerControlComponent,
  ],
  /** use different instances of the services only for testing with different routes  */
  providers: [LayersService, MapStateService, MapOlService],
  selector: "app-route-map",
  styleUrl: "./route-map.scss",
  templateUrl: "./route-map.html",
  host: {
    class: "content-container",
  },
})
export class RouteMap {
  controls: IMapControls;

  public layerSvc = inject(LayersService);
  public mapStateSvc = inject(MapStateService);
  public mapSvc = inject(MapOlService);
  constructor() {
    this.controls = { attribution: true, scaleLine: true, zoom: true };

    const onInit = effect(() => {
      this.addlayers();

      onInit.destroy();
    });
  }

  addlayers() {
    const osmLayer = new OsmTileLayer({
      visible: true,
    });

    const eocLayer = new HillshadeTile({
      visible: false,
    });

    this.layerSvc.addLayer(osmLayer, "Layers");
    this.layerSvc.addLayer(eocLayer, "Layers");
  }
}
