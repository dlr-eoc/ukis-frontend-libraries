import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { IMapControls, MapOlService } from '@dlr-eoc/map-ol';
import { LayerGroup, LayersService } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { IEocOwsContext, OwcJsonService } from '@dlr-eoc/services-ogc';
import { first } from 'rxjs/operators';
import { ZommNumberControl } from '../route-example-layers/ol-custom-control';

import { ClarityIcons, layersIcon, worldIcon, exportIcon } from '@cds/core/icon';
ClarityIcons.addIcons(...[layersIcon, worldIcon, exportIcon ]);

@Component({
  selector: 'app-route-example-owc-layers',
  templateUrl: './route-example-owc-layers.component.html',
  styleUrls: ['./route-example-owc-layers.component.scss'],
  /** use different instances of the services only for testing with different routes  */
  providers: [LayersService, MapStateService, MapOlService]
})
export class RouteExampleOwcLayersComponent implements OnInit {
  @HostBinding('class') class = 'content-container';
  controls: IMapControls;

  constructor(
    public layersSvc: LayersService,
    public mapStateSvc: MapStateService,
    public mapSvc: MapOlService,
    private owcSvc: OwcJsonService,
    private http: HttpClient) {

    this.controls = {
      attribution: true,
      scaleLine: true
    };
  }

  ngOnInit(): void {
    this.mapSvc.map.addControl(new ZommNumberControl());
    this.getOwcContext('assets/owc/ows-json-context.json');
  }

  getOwcContext(url: string) {
    return this.http.get(url).subscribe((context: IEocOwsContext) => {
      this.addLayersFromContext(context);
    });
  }

  addLayersFromContext(context: IEocOwsContext) {
    this.owcSvc.getLayers(context, this.mapSvc.EPSG).pipe(first()).subscribe((layers) => {
      for (const layer of layers) {
        if (layer instanceof LayerGroup) {

          // A owc context does not allow to configure popups right now!! 
          // https://github.com/dlr-eoc/ukis-frontend-libraries/issues/104
          // You have to set popups manually after creating the layers
          if (layer.id === 'VectorLayers_baseWFSLayer_eocGeojsonLayer_baseKMLLayer') {
            layer.layers.forEach(l => l.popup = true);
          }
          this.layersSvc.addLayerGroup(layer, layer.filtertype);
        } else {
          this.layersSvc.addLayer(layer, layer.filtertype);
        }
      }
    });

    if (context.bbox) {
      this.mapStateSvc.setExtent(context.bbox);
    }
  }


  async downloadOwc() {
    const layerGroups = await this.layersSvc.getLayerGroups().pipe(first()).toPromise();
    const extent = await this.mapStateSvc.getExtent().pipe(first()).toPromise();
    const owc = this.owcSvc.generateOwsContextFrom('Test_OWC', layerGroups, extent);

    const blob = new Blob([JSON.stringify(owc)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    window.open(url);
  }
}
