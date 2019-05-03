import { Component, OnInit, HostBinding } from '@angular/core';
import { LayersService, RasterLayer, VectorLayer } from '@ukis/services-layers/src/public_api';
import { MapStateService } from '@ukis/services-map-state/src/public_api';
import { MapOlService } from '@ukis/map-ol/src/public_api';
import { osm, esri_world_imagery } from '@ukis/base-layers-raster/src/public_api';

@Component({
  selector: 'app-route-map2',
  templateUrl: './route-map2.component.html',
  styleUrls: ['./route-map2.component.css'],
  /** use differnt instances of the services only for testing with diffenr routs  */
  providers: [LayersService, MapStateService, MapOlService]
})
export class RouteMap2Component implements OnInit {
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
    this.addOverlays();

    /** use the MapOlService for directly accessing the ol/Map or ol/View or bind popups to an event, set projections... */
    this.mapSvc.setProjection('EPSG:4326');
    // reprojection to WGS84 https://openlayers.org/en/latest/apidoc/module-ol_proj_Projection-Projection.html

    /** set map extent or IMapState (zoom, center...) with the MapStateService */
    this.mapStateSvc.setExtent([-14, 33, 40, 57]);
  }

  addOverlays() {
    const osmLayer = new osm();
    osmLayer.visible = true;

    const guf_layer = new RasterLayer({
      type: 'wms',
      url: 'https://geoservice.dlr.de/eoc/land/wms',
      name: 'GUF Mosaic',
      id: 'GUF28_DLR_v1_Mosaic',
      params: {
        layers: 'GUF28_DLR_v1_Mosaic',
        styles: 'guf_8bit'
      },
      visible: false,
      description: 'GUF28_DLR_v1_Mosaic',
      attribution: ' | GUF®: <a href="https://www.dlr.de/eoc/en/desktopdefault.aspx/tabid-9628/16557_read-40454/">DLR License</a>',
      legendImg: ''
    });

    const vector_Layer = new VectorLayer({
      id: 'geojson_test',
      name: 'GeoJSON Vector Layer',
      type: 'geojson',
      data: {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'type': 'Polygon',
              'coordinates': [
                [
                  [
                    12.65625,
                    49.61070993807422
                  ],
                  [
                    20.698242187499996,
                    46.830133640447386
                  ],
                  [
                    22.5,
                    49.781264058178344
                  ],
                  [
                    15.161132812500002,
                    51.508742458803326
                  ],
                  [
                    12.65625,
                    49.61070993807422
                  ]
                ]
              ]
            }
          }
        ]
      },
      visible: true,
      popup: true
    });

    const overlays = [osmLayer, guf_layer, vector_Layer];
    overlays.map(layer => this.layersSvc.addLayer(layer, 'Overlays'));
  }

}
