import { Component, OnInit, HostBinding } from '@angular/core';
import { LayersService, RasterLayer, VectorLayer } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { MapOlService } from '@dlr-eoc/map-ol';
import { eoc_litemap } from '@dlr-eoc/base-layers-raster';

import olProjection from 'ol/proj/Projection';
import { register as olRegister } from 'ol/proj/proj4';
import proj4 from 'proj4';

@Component({
  selector: 'app-route-map2',
  templateUrl: './route-map2.component.html',
  styleUrls: ['./route-map2.component.scss'],
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
    const arcticPolarStereographic = {
      code: `EPSG:3995`,
      extent: [-5817.41, 3333128.95, 948.75, 543592.47],
      worldExtent: [-180, -60, 180, 60],
      proj4js: '+proj=stere +lat_0=90 +lat_ts=71 +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs'
    };

    proj4.defs(arcticPolarStereographic.code, arcticPolarStereographic.proj4js);
    olRegister(proj4);


    const projection = new olProjection({
      code: arcticPolarStereographic.code,
      extent: arcticPolarStereographic.extent,
      worldExtent: arcticPolarStereographic.worldExtent
    });

    /** use the MapOlService for directly accessing the ol/Map or ol/View or bind popups to an event, set projections... */
    this.mapSvc.setProjection(projection);
    // this.mapSvc.setExtent(this.projExtent)
    // this.mapSvc.setZoom(3)

    this.addOverlays();

    /** set map extent or IMapState (zoom, center...) with the MapStateService */
    this.mapStateSvc.setExtent([-14, 33, 40, 57]);
  }

  addOverlays() {
    const eocLitemapLayer = new eoc_litemap({
      removable: true,
      legendImg: null,
      visible: true,
      id: 'eoc_litemap_base'
    });

    const gufLayer = new RasterLayer({
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

    const vectorLayer = new VectorLayer({
      id: 'geojson_test',
      name: 'GeoJSON Vector Layer',
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Polygon',
              coordinates: [
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
      visible: true
    });

    const overlays = [eocLitemapLayer, gufLayer, vectorLayer];
    overlays.map(layer => this.layersSvc.addLayer(layer, 'Layers'));
  }

}
