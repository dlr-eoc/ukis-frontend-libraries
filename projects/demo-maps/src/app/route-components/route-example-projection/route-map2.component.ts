import { Component, OnInit, HostBinding } from '@angular/core';
import { LayersService, RasterLayer, TGeoExtent, VectorLayer, WmtsLayer } from '@dlr-eoc/services-layers';
import { EPSG_3031_Def, EPSG_3995_Def, IProjDef, MapStateService, EPSG_3857_Def, EPSG_4326_Def, EPSG_3035_Def, adjustBBoxAxisToEnu } from '@dlr-eoc/services-map-state';
import { MapOlService, IMapControls, MapOlComponent } from '@dlr-eoc/map-ol';
import { ViewOptions as olViewOptions } from 'ol/View';
import { OsmTileLayer } from '@dlr-eoc/base-layers-raster';

import { ClarityIcons, layersIcon, mapIcon, compassIcon } from '@clr/angular/icon';
import { ClrVerticalNavModule, ClrStandaloneCdkTrapFocus, ClrNavigationModule, ClrIcon } from '@clr/angular';
import { LayerControlComponent, ProjectionSwitchComponent, MousePositionComponent, MapNavigatorComponent } from '@dlr-eoc/ngx-ukis-ui-clarity';
import { ExtentHelperComponent } from "../../components/extent-helper/extent-helper.component";
import { delay } from 'rxjs/operators';
ClarityIcons.addIcons(...[layersIcon, mapIcon, compassIcon]);

@Component({
  selector: 'app-route-map2',
  templateUrl: './route-map2.component.html',
  styleUrls: ['./route-map2.component.scss'],
  /** use differnt instances of the services only for testing with diffenr routs  */
  providers: [LayersService, MapStateService, MapOlService],
  imports: [MapOlComponent, ClrVerticalNavModule, ClrStandaloneCdkTrapFocus, ClrNavigationModule, ClrIcon, LayerControlComponent, ProjectionSwitchComponent, MousePositionComponent, MapNavigatorComponent, ExtentHelperComponent]
})
export class RouteMap2Component implements OnInit {
  @HostBinding('class') class = 'content-container';
  controls: IMapControls;
  viewOptions: olViewOptions;
  projections: IProjDef[];

  projectionSet = false;

  constructor(
    public layersSvc: LayersService,
    public mapStateSvc: MapStateService,
    public mapSvc: MapOlService) {

    this.controls = {
      attribution: true,
      scaleLine: true
    };

    this.viewOptions = {
      showFullExtent: true
    }

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

    const ETRS89_UTM_37N: IProjDef = {
      code: 'EPSG:25837',
      proj4js: '+proj=utm +zone=37 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
      title: 'UTM zone 37N',
      extent: [-4861198.58, 3680548.11, 489848.43, 9660688.94],
      worldExtent: [-16.1, 33.26, 38.01, 84.73],
      global: false,
      units: 'm'
    }

    this.projections = [EPSG_3857_Def, EPSG_3995_Def, EPSG_3031_Def, SwissCH1903, ESRI_53034, ETRS89_UTM_37N, EPSG_4326_Def, EPSG_3035_Def];
    /** 
       * set map extent or IMapState (zoom, center...) with the MapStateService 
       * Check if the Extent is valid for the set projection.
       */
    this.mapStateSvc.setExtent([-14, 33, 40, 57]);

  }


  ngOnInit(): void {
    this.mapStateSvc.getProjection().pipe(delay(300)).subscribe(proj => {
      console.log('Map Proj change', proj);
      if (proj.epsg === 'EPSG:21781') {
        this.addLayer();
      }

      if (!this.projectionSet) {
        this.addOverlays();
        this.projectionSet = true;
      }
    });
  }

  addOverlays() {
    const osm_layer = new OsmTileLayer({
      removable: true,
      legendImg: undefined,
      visible: true,
      id: 'osm'
    });

    const wmtsCustomTilegrid = new WmtsLayer({
      name: 'EOC Basemap - ETRS89',
      id: 'eoc_basemap_tile_EPSG_3035',
      description: 'This basemap only works for EPSG:3035 - custom TileGrid',
      visible: false,
      type: 'wmts',
      removable: false,
      params: {
        layer: 'eoc:basemap',
        format: 'image/png', // 'image/vnd.jpeg-png',
        style: '_empty',
        matrixSetOptions: {
          matrixSet: 'EPSG:3035:512',
          matrixIds: ['EPSG:3035:512:0', 'EPSG:3035:512:1', 'EPSG:3035:512:2', 'EPSG:3035:512:3', 'EPSG:3035:512:4', 'EPSG:3035:512:5', 'EPSG:3035:512:6', 'EPSG:3035:512:7', 'EPSG:3035:512:8', 'EPSG:3035:512:9', 'EPSG:3035:512:10', 'EPSG:3035:512:11', 'EPSG:3035:512:12'],
          resolutions: [11190.7684596639, 5595.38422983195, 2797.692114915975, 1398.8460574579874, 699.4230287289937, 349.71151436449685, 174.85575718224842, 87.42787859112421, 43.713939295562106, 21.856969647781053, 10.928484823890527, 5.464242411945263, 2.7321212059726316],
          origin: [1896628.6179337814, 6827128]
        }
      },
      tileSize: 512,
      url: 'https://tiles.geoservice.dlr.de/service/wmts',
      attribution: '&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',
      continuousWorld: false,
      legendImg: 'https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Abasemap&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11',
      opacity: 1,
      nativeBbox: {
        epsg: EPSG_3035_Def.code,
        bbox: EPSG_3035_Def.extent
      }
    })


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
      description: 'GUF28_DLR_v1_Mosaic. </br> Not working for Cylindrical Equal Area!',
      attribution: ' | GUF®: <a href="https://www.dlr.de/eoc/en/desktopdefault.aspx/tabid-9628/16557_read-40454/">DLR License</a>',
      legendImg: ''
    });

    const fcclLayer = new RasterLayer({
      type: 'wms',
      url: 'https://geoservice.dlr.de/eoc/land/wms',
      name: 'FCCL DE P1M',
      id: 'FCCL_DE_P1M',
      attribution: ', <a href="https://geoservice.dlr.de/web/datasets/fccl" target="_blank">FCCL</a>',
      description: 'This raster dataset shows forest canopy cover loss (FCCL) in Germany at a monthly resolution from September 2017 to October 2025',
      params: {
        layers: 'FCCL_DE_P1M'
      },
      visible: false,
      legendImg: undefined,
      bbox: [
        5.230971659340296,
        47.06431450392907,
        15.694865911359667,
        55.169891337305664
      ],
      nativeBbox: {
        epsg: EPSG_3035_Def.code, // the axis must be defined in the IProjDef
        // wms 1.3.0 <BoundingBox CRS="EPSG:3035" minx="2672950.0" miny="4016550.0" maxx="3562840.0" maxy="4684770.0"/>
        bbox: adjustBBoxAxisToEnu([2672950, 4016550, 3562840, 4684770], EPSG_3035_Def)
        // wms: 1.1.1 <BoundingBox SRS="EPSG:3035" minx="4016550.0" miny="2672950.0" maxx="4684770.0" maxy="3562840.0"/>
        /* bbox: [4016550, 2672950, 4684770, 3562840] */
      }
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
      visible: true,
      bbox: [12.122762285148893, 45.75982471322655, 22.585503751196956, 52.936158926509194]
    });

    const vectorLayerPolar = new VectorLayer({
      id: 'geojson_test_PolarDEM',
      name: 'GeoJSON Vector Layer (PolarDEM)',
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "coordinates": [
                [
                  [
                    -56.610291493162265,
                    -63.14567134729959
                  ],
                  [
                    -65.55445992781995,
                    -65.42656926101324
                  ],
                  [
                    -73.57228421370289,
                    -70.01891446525254
                  ],
                  [
                    -79.9666203974736,
                    -72.86460180838449
                  ],
                  [
                    -83.04719665248149,
                    -74.13173444180848
                  ],
                  [
                    -55.69191893422601,
                    -75.70732872975574
                  ],
                  [
                    -59.942004469019835,
                    -72.39072889158679
                  ],
                  [
                    -61.35730570181974,
                    -67.91201652998802
                  ],
                  [
                    -56.610291493162265,
                    -63.14567134729959
                  ]
                ]
              ],
              "type": "Polygon"
            }
          }
        ]
      },
      visible: true,
      bbox: [-85.02702775046276, -75.78913027273286, -49.34343400046277, -62.95113726720521],
      nativeBbox: {
        epsg: 'EPSG:3031',
        bbox: [-2788223.8152697003, 180971.96438660682, -1093301.5018768182, 1969824.701551262]
      }
    });

    const TanDEMPolarDEM = new RasterLayer({
      type: 'wms',
      url: 'https://geoservice.dlr.de/eoc/elevation/wms',
      name: 'TanDEM-X PolarDEM Antarctica',
      id: 'TDM_POLARDEM90_ANT_HSC',
      params: {
        layers: 'TDM_POLARDEM90_ANT_HSC'
      },
      visible: false,
      description: 'A hillshade generated from the TanDEM-X PolarDEM 90m elevation layer. This shading represents a combination slope and oblique shading. </br> Not working for Cylindrical Equal Area!',
      attribution: 'PolarDEM Data &copy; DLR/EOC licensed for <a href="https://geoservice.dlr.de/resources/licenses/polardem90/License_for_the_Utilization_of_TanDEM-X-PolarDEM_90m_for_Scientific_Use.pdf">scientific use</a>',
      legendImg: '',
      bbox: [-180, -90, 180, -56.22686667234951],
      nativeBbox: {
        epsg: 'EPSG:3031',
        bbox: [-2699955, -2532555, 2799855, 2398455]
      }
    })

    const overlays = [wmtsCustomTilegrid, osm_layer, gufLayer, vectorLayer, TanDEMPolarDEM, vectorLayerPolar, fcclLayer];
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
    if (proJ) {
      this.mapStateSvc.registerProjection(proJ);
      this.mapStateSvc.setProjection(proJ.code, 'user', { fitToNativeBbox: nativeBbox });
    }
  }

  addLayer() {
    const vectorLayerSwiss = new VectorLayer({
      id: 'geojson_test_Swiss',
      name: 'GeoJSON Vector Layer (Swiss)',
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "coordinates": [
                [
                  [
                    9.476989243125104,
                    47.48067255204134
                  ],
                  [
                    8.536024138082581,
                    47.36586953083
                  ],
                  [
                    7.229985139825061,
                    47.13551220276787
                  ],
                  [
                    6.119337802724459,
                    46.182699028304654
                  ],
                  [
                    6.926613876449522,
                    46.41361480319924
                  ],
                  [
                    8.07839630011074,
                    46.7458325561617
                  ],
                  [
                    9.333016440167455,
                    47.111021589561204
                  ],
                  [
                    9.476989243125104,
                    47.48067255204134
                  ]
                ]
              ],
              "type": "Polygon"
            }
          }
        ]
      },
      visible: true,
      bbox: [6.121699327190461, 46.05823590807236, 9.496699327190466, 47.5945721328394],
      nativeBbox: {
        epsg: 'EPSG:21781',
        bbox: [495592.4002543411, 97816.18720803942, 758272.4757513476, 272596.3306093862]
      }
    });

    if (!this.layersSvc.getLayerById(vectorLayerSwiss.id)) {
      this.layersSvc.addLayer(vectorLayerSwiss, 'Layers');
    }
  }

}
