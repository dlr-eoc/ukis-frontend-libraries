import { Component, effect, inject, signal } from "@angular/core";
import {
  ClrIcon,
  ClrNavigationModule,
  ClrStandaloneCdkTrapFocus,
  ClrVerticalNavModule,
} from "@clr/angular";
import { MapOlComponent } from "@dlr-eoc/map-ol";
import {
  BaseLayerControlComponent,
  LayerControlComponent,
} from "@dlr-eoc/ngx-ukis-ui-clarity";

import { HttpClient } from "@angular/common/http";
import { IMapControls, MapOlService } from "@dlr-eoc/map-ol";
import { LayerGroup, LayersService } from "@dlr-eoc/services-layers";
import { MapStateService } from "@dlr-eoc/services-map-state";
import {
  IEocOwsContext,
  OwcJsonService,
  WmsService,
} from "@dlr-eoc/services-ogc";
import { first } from "rxjs/operators";
import { ZommNumberControl } from "../map-ol-layers-example/ol-custom-control";

import {
  ClarityIcons,
  exportIcon,
  layersIcon,
  worldIcon,
} from "@clr/angular/icon";
import { firstValueFrom } from "rxjs";
ClarityIcons.addIcons(layersIcon, worldIcon, exportIcon);

@Component({
  imports: [
    MapOlComponent,
    ClrVerticalNavModule,
    ClrStandaloneCdkTrapFocus,
    ClrNavigationModule,
    ClrIcon,
    LayerControlComponent,
    BaseLayerControlComponent,
  ],
  /** use different instances of the services only for testing with different routes  */
  providers: [LayersService, MapStateService, MapOlService],
  selector: "app-map-ol-owc-layers-example",
  styleUrl: "./map-ol-owc-layers-example.scss",
  templateUrl: "./map-ol-owc-layers-example.html",
  host: {
    class: "content-container",
  },
})
export class MapOlOwcLayersExample {
  controls: IMapControls;
  contextReady = signal(false);

  public layersSvc = inject(LayersService);
  public mapStateSvc = inject(MapStateService);
  public mapSvc = inject(MapOlService);
  private owcSvc = inject(OwcJsonService);
  private http = inject(HttpClient);
  constructor() {
    this.controls = {
      attribution: true,
      scaleLine: true,
    };

    effect(() => {
      this.mapSvc.map.addControl(new ZommNumberControl());
      this.getOwcContext("assets/owc/ows-json-context.json");
    });
  }

  getOwcContext(url: string) {
    return this.http.get<IEocOwsContext>(url).subscribe(
      (context: IEocOwsContext) => {
        this.addLayersFromContext(context);
      },
    );
  }

  addLayersFromContext(context: IEocOwsContext) {
    this.owcSvc.getLayers(context, this.mapSvc.EPSG).pipe(first()).subscribe(
      (layers) => {
        for (const layer of layers) {
          if (layer instanceof LayerGroup) {
            // A owc context does not allow to configure popups right now!!
            // https://github.com/dlr-eoc/ukis-frontend-libraries/issues/104
            // You have to set popups manually after creating the layers
            if (
              layer.id ===
                "VectorLayers_baseWFSLayer_eocGeojsonLayer_baseKMLLayer"
            ) {
              layer.layers.forEach((l) => l.popup = true);
            }
            this.layersSvc.addLayerGroup(layer, layer.filtertype);
          } else {
            this.layersSvc.addLayer(layer, layer.filtertype);
          }
        }
        this.contextReady.set(true);
      },
    );

    if (context["bbox"]) {
      this.mapStateSvc.setExtent(context["bbox"]);
    }
  }

  async downloadOwc() {
    const layerGroups = await firstValueFrom(this.layersSvc.getLayerGroups());
    const extent = await firstValueFrom(this.mapStateSvc.getExtent());
    const owc = this.owcSvc.generateOwsContextFrom(
      "Test_OWC",
      layerGroups,
      extent,
    );

    const blob = new Blob([JSON.stringify(owc)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    window.open(url);
  }
}
