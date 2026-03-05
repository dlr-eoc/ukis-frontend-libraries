import { Component, OnInit, HostBinding } from '@angular/core';
import { LayersService, RasterLayer, TGeoExtent, VectorLayer } from '@dlr-eoc/services-layers';
import { EPSG_3031_Def, EPSG_3995_Def, IProjDef, MapStateService, EPSG_3857_Def } from '@dlr-eoc/services-map-state';
import { MapOlService, IMapControls, MapOlComponent } from '@dlr-eoc/map-ol';
import { OsmTileLayer } from '@dlr-eoc/base-layers-raster';

import { ClarityIcons, layersIcon, mapIcon, compassIcon } from '@cds/core/icon';
import { ClrVerticalNavModule, ClrStandaloneCdkTrapFocus, ClrNavigationModule, ClrIconModule } from '@clr/angular';
import { LayerControlComponent, ProjectionSwitchComponent, MousePositionComponent, MapNavigatorComponent } from '@dlr-eoc/ngx-ukis-ui-clarity';
import { ExtentHelperComponent } from "../../components/extent-helper/extent-helper.component";
ClarityIcons.addIcons(...[layersIcon, mapIcon, compassIcon]);

@Component({
  selector: 'app-route-map2',
  templateUrl: './route-map2.component.html',
  styleUrls: ['./route-map2.component.scss'],
  /** use differnt instances of the services only for testing with diffenr routs  */
  providers: [LayersService, MapStateService, MapOlService],
  imports: [MapOlComponent, ClrVerticalNavModule, ClrStandaloneCdkTrapFocus, ClrNavigationModule, ClrIconModule, LayerControlComponent, ProjectionSwitchComponent, MousePositionComponent, MapNavigatorComponent, ExtentHelperComponent]
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

    const SwissCH1903: IProjDef = {
      code: `EPSG:21781`,
      proj4js: '+proj=somerc +lat_0=46.9524055555556 +lon_0=7.43958333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs +type=crs',
      title: 'Swiss CH1903 / LV03',
      extent: [484273.3, 73150.16, 837939.88, 299970.97],
      worldExtent: [5.95, 45.81, 10.5, 47.81],
      global: false,
      units: 'm'
    };

    const ESRI_53034: IProjDef = {
      code: 'ESRI:53034',
      proj4js: '+proj=cea +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +R=6371000 +units=m +no_defs +type=crs',
      title: 'Cylindrical Equal Area',
      extent: [-20015086.8, -6371000.0, 20015086.8, 6371000.0],
      worldExtent: [-180.0, -90.0, 180.0, 90.0],
      global: true,
      units: 'm'
    }

    this.projections = [EPSG_3857_Def, EPSG_3995_Def, EPSG_3031_Def, SwissCH1903, ESRI_53034];
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

  setExtent() {
    const nativeBbox: TGeoExtent = [-2166686.6992718857, 532310.7393676594, -2089422.303209693, 594837.26196001];
    const wgs84bbox: TGeoExtent = [-76.19697134976582, -70.34272872293334, -74.10888626456216, -69.53237850373523];

    // this.mapStateSvc.setExtent(wgs84bbox);
    this.mapStateSvc.setNativeExtent(nativeBbox);
  }

  setNewProjection() {
    const nativeBbox: TGeoExtent = [-2166686.6992718857, 532310.7393676594, -2089422.303209693, 594837.26196001];
    const wgs84bbox: TGeoExtent = [-76.19697134976582, -70.34272872293334, -74.10888626456216, -69.53237850373523];
    const proJ = this.projections.find(p => p.title === 'Antarctic Polar Stereographic');
    this.mapStateSvc.registerProjection(proJ);
    this.mapStateSvc.setProjection(proJ.code, 'user', { fitToNativeBbox: nativeBbox });
  }

}
