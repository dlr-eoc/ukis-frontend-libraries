import { Component, OnInit, HostBinding } from '@angular/core';
import { LayersService, RasterLayer, VectorLayer } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { MapOlService, IMapControls, MapOlComponent } from '@dlr-eoc/map-ol';
import { OsmTileLayer } from '@dlr-eoc/base-layers-raster';

import { ClarityIcons, layersIcon, mapIcon, compassIcon } from '@cds/core/icon';
import { ClrVerticalNavModule, ClrStandaloneCdkTrapFocus, ClrNavigationModule, ClrIconModule } from '@clr/angular';
import { LayerControlComponent, IProjDef, ProjectionSwitchComponent, MousePositionComponent, MapNavigatorComponent } from '@dlr-eoc/ngx-ukis-ui-clarity';
ClarityIcons.addIcons(...[layersIcon, mapIcon, compassIcon]);

@Component({
    selector: 'app-route-map2',
    templateUrl: './route-map2.component.html',
    styleUrls: ['./route-map2.component.scss'],
    /** use differnt instances of the services only for testing with diffenr routs  */
    providers: [LayersService, MapStateService, MapOlService],
    imports: [MapOlComponent, ClrVerticalNavModule, ClrStandaloneCdkTrapFocus, ClrNavigationModule, ClrIconModule, LayerControlComponent, ProjectionSwitchComponent, MousePositionComponent, MapNavigatorComponent]
})
export class RouteMap2Component implements OnInit {
  @HostBinding('class') class = 'content-container';
  controls: IMapControls;
  projections: IProjDef[];

  constructor(
    public layersSvc: LayersService,
    public mapStateSvc: MapStateService,
    public mapSvc: MapOlService) {

    this.controls = {
      attribution: true,
      scaleLine: true
    };

    const arcticPolarStereographic: IProjDef = {
      code: 'EPSG:3995',
      proj4js: '+proj=stere +lat_0=90 +lat_ts=71 +lon_0=0 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs +type=crs',
      title: 'Arctic Polar Stereographic',
      extent: [-3299207.53, -3333134.03, 3299207.53, 3333134.03],
      worldExtent: [-180.0, 60.0, 180.0, 90.0],
      global: true,
      units: 'm'
    };

    const antarcticPolarStereographic: IProjDef = {
      code: `EPSG:3031`,
      proj4js: '+proj=stere +lat_0=-90 +lat_ts=-71 +lon_0=0 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs +type=crs',
      title: 'Antarctic Polar Stereographic',
      extent: [-3299207.53, -3333134.03, 3299207.53, 3333134.03],
      worldExtent: [-180.0, -90.0, 180.0, -60.0],
      global: true,
      units: 'm'
    };

    const webMercator: IProjDef = {
      code: `EPSG:3857`,
      proj4js: '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs',
      title: 'Spherical Mercator',
      extent: [-20037508.34, -20048966.1, 20037508.34, 20048966.1],
      worldExtent: [-180.0, -85.06, 180.0, 85.06],
      global: true,
      units: 'm'
    };

    const SwissCH1903: IProjDef = {
      code: `EPSG:21781`,
      proj4js: '+proj=somerc +lat_0=46.9524055555556 +lon_0=7.43958333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs +type=crs',
      title: 'Swiss CH1903 / LV03',
      extent: [484273.3, 73150.16, 837939.88, 299970.97],
      worldExtent: [5.95, 45.81, 10.5, 47.81],
      global: false,
      units: 'm'
    };

    this.projections = [webMercator, arcticPolarStereographic, antarcticPolarStereographic, SwissCH1903];
    this.addOverlays();
    /** 
       * set map extent or IMapState (zoom, center...) with the MapStateService 
       * Check if the Extent is valid for the set projection.
       */
      this.mapStateSvc.setExtent([-14, 33, 40, 57]);

  }


  ngOnInit(): void {
    this.mapStateSvc.getMapState().subscribe(state => {
      console.log('MapState change', state);
    });

    this.mapSvc.projectionChange.subscribe(proj => {
      console.log('Map Proj change', proj);
    });
  }

  addOverlays() {
    const osm_layer = new OsmTileLayer({
      removable: true,
      legendImg: null,
      visible: true,
      id: 'osm'
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

    const overlays = [osm_layer, gufLayer, vectorLayer];
    overlays.map(layer => this.layersSvc.addLayer(layer, 'Layers'));
  }

}
