import { Component, OnInit, HostBinding } from '@angular/core';
import { LayersService, RasterLayer, VectorLayer, LayerGroup, Layer, WmtsLayer, StackedLayer, IPopupParams } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { OsmTileLayer, EocLitemapTile, OpenSeaMap, EocBasemapTile, EocBaseoverlayTile, EocLiteoverlayTile, BlueMarbleTile, WorldReliefBwTile, HillshadeTile } from '@dlr-eoc/base-layers-raster';
import { MapOlService, IMapControls } from '@dlr-eoc/map-ol';
import { ZommNumberControl } from './ol-custom-control';
import { getFeatureInfoPopup } from './map-helpers';
import { TablePopupComponent } from '../../components/table-popup/table-popup.component';
import testCities from '@dlr-eoc/shared-assets/geojson/test-cities.json';
import olStyle from 'ol/style/Style';
import olFill from 'ol/style/Fill';
import olCircleStyle from 'ol/style/Circle';
import olStroke from 'ol/style/Stroke';
import { WmsService } from '@dlr-eoc/services-ogc';
import { ExampleLayerDescriptionComponent } from '../../components/example-layer-description/example-layer-description.component';
import { ExampleGroupLegendComponent } from '../../components/example-group-legend/example-group-legend.component';
import greyscale from '@dlr-eoc/shared-assets/open-map-styles/open-map-style.json';
import { VtileLayerActionComponent } from '../../components/vtile-layer-action/vtile-layer-action.component';

@Component({
  selector: 'app-route-map',
  templateUrl: './route-map.component.html',
  styleUrls: ['./route-map.component.scss'],
  /** use different instances of the services only for testing with different routes  */
  providers: [LayersService, MapStateService, MapOlService]
})
export class RouteMapComponent implements OnInit {
  @HostBinding('class') class = 'content-container';
  controls: IMapControls;
  showMap = true;

  constructor(
    public layersSvc: LayersService,
    public mapStateSvc: MapStateService,
    public mapSvc: MapOlService,
    private wmsSvc: WmsService) {

    this.controls = {
      attribution: true,
      scaleLine: true
    };
  }

  ngOnInit(): void {
    this.mapSvc.map.addControl(new ZommNumberControl());
    this.addBaseLayers();
    this.addLayers();
    this.addOverlays();
    this.setExtent();
  }

  setExtent() {
    /** set map extent or IMapState (zoom, center...) with the MapStateService */
    this.mapStateSvc.setExtent([-14, 33, 40, 57]);
  }
  setRotation() {
    /** set map rotation with the MapStateService */
    this.mapStateSvc.setRotation(90);
  }
  resetRotation() {
    /** set map rotation with the MapStateService, due to the rotation constraint small numbers are snapped to 0 */
    this.mapStateSvc.setRotation(0);
  }

  parseCapabilities() {
    this.wmsSvc.getCapabilities('https://geoservice.dlr.de/eoc/land/wms').subscribe(caps => {
      const layer = this.wmsSvc.getLayerFromCapabilities('AGRODE_S2_EVI_P1M', caps);
      console.log(layer);
    });
  }

  addBaseLayers() {
    const TransparentBackground = new VectorLayer({
      name: 'Transparenter Hintergrund',
      id: 'blank',
      type: 'geojson'
    });

    const eocLitemapLayer = new EocLitemapTile({
      tileSize: 512
    });

    const eocLiteOverlay = new EocBaseoverlayTile();

    const eocLiteMerge = new StackedLayer({
      id: 'eocLiteAndOverlay',
      name: 'EOC Lite with Overlay',
      description: 'merged/stacked Layers EOC Lite with Overlay',
      legendImg: eocLitemapLayer.legendImg,
      layers: [eocLitemapLayer, eocLiteOverlay],
      visible: true
    });

    // not working in WGS84 because
    const worldRelief = new WmtsLayer({
      type: 'wmts',
      url: 'https://tiles.geoservice.dlr.de/service/wmts',
      name: 'Relief',
      id: 'world_relief_bw',
      params: {
        layer: 'eoc:world_relief_bw',
        style: '_empty',
        matrixSetOptions: {
          matrixSet: 'EPSG:3857',
          tileMatrixPrefix: 'EPSG:3857'
        }
      },
      visible: false,
      description: {
        component: ExampleLayerDescriptionComponent,
        inputs: { description: 'eoc:world_relief_bw as web map tile service' }
      },
      attribution: 'Relief: <a src="https://www.dlr.de/eoc">DLR/EOC</>',
      legendImg: ''
    });

    const OsmLayer = new OsmTileLayer({
      id: 'OSM_Base'
    });

    const geoserviceVTiles = new VectorLayer({
      name: 'Open Map Styles',
      id: 'planet_eoc_vector_tiles',
      attribution: `© <a href="http://openmaptiles.org/" target="_blank">OpenMapTiles</a> © <a href="https://www.openstreetmap.org/copyright" target="_blank"> OpenStreetMap contributors</a>`,
      description: `EOC-Geoservice TMS-Service, Vector Tiles with OpenMapTiles and customised <a href="https://openmaptiles.org/styles/#positron">positron</a> Style.`,
      type: 'tms',
      url: 'https://{s}.tiles.geoservice.dlr.de/service/tms/1.0.0/planet_eoc@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf?flipy=true',
      subdomains: ['a', 'b', 'c', 'd'],
      options: {
        style: greyscale,
        styleSource: 'planet_eoc'
      },
      visible: false,
      action: { component: VtileLayerActionComponent, inputs: { layersSvc: this.layersSvc } },
    });

    const layers = [eocLiteMerge, OsmLayer, TransparentBackground, worldRelief, geoserviceVTiles];

    /** add layers with the LayersService */
    layers.map(layer => this.layersSvc.addLayer(layer, 'Baselayers'));
  }

  addLayers() {
    const gufLayer = new RasterLayer({
      type: 'wms',
      url: 'https://geoservice.dlr.de/eoc/land/wms',
      name: 'GUF Mosaic',
      id: 'GUF28_DLR_v1_Mosaic',
      params: {
        LAYERS: 'GUF28_DLR_v1_Mosaic',
        STYLES: 'guf_8bit',
      },
      tileSize: 512,
      visible: false,
      description: 'GUF28_DLR_v1_Mosaic',
      attribution: ' | GUF®: <a href="https://www.dlr.de/eoc/en/desktopdefault.aspx/tabid-9628/16557_read-40454/">DLR License</a>',
      legendImg: '',
      popup: {
        asyncPopup: (obj, cb) => {
          getFeatureInfoPopup(obj, this.mapSvc, cb);
        }
      }
    });

    const TDM90DEMLayer = new WmtsLayer({
      type: 'wmts',
      url: 'https://tiles.geoservice.dlr.de/service/wmts',
      name: 'TDM90 DEM',
      id: 'TDM90_DEM',
      params: {
        layer: 'TDM90_DEM',
        style: 'default',
        matrixSetOptions: {
          matrixSet: 'EPSG:3857',
          tileMatrixPrefix: 'EPSG:3857'
        },
        format: 'image/png'
      },
      visible: false,
      // maxZoom: 8,
      description: 'TDM90_DEM maxZoom: 8',
      attribution: ' | TDM90 Data ©: <a href="http://www.dlr.de" target="_blank">DLR</a>  licensed for <a rel="license" target="_blank" href="https://geoservice.dlr.de/resources/licenses/tdm90/License_for_the_Utilization_of_90m_DEM_for_Scientific_Use.pdf">scientific use</a>',
      legendImg: 'https://tiles.geoservice.dlr.de/service/wmts?layer=TDM90_DEM&style=default&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A4&TileCol=8&TileRow=5',
      cssClass: 'custom-layer'
    });

    const vectorLayer = new VectorLayer({
      id: 'geojson_test',
      name: 'GeoJSON Vector Layer',
      attribution: `© DLR GeoJSON`,
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: { title: 'Polygon' },
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [
                    11.53564453125,
                    48.80686346108517
                  ],
                  [
                    11.42578125,
                    48.61838518688487
                  ],
                  [
                    11.97509765625,
                    48.516604348867475
                  ],
                  [
                    12.2607421875,
                    48.69096039092549
                  ],
                  [
                    12.0849609375,
                    48.99463598353405
                  ],
                  [
                    11.53564453125,
                    48.80686346108517
                  ]
                ]
              ]
            }
          },
          {
            type: 'Feature',
            properties: { title: 'Rectangle' },
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [
                    10.986328125,
                    43.89789239125797
                  ],
                  [
                    11.755371093749998,
                    43.89789239125797
                  ],
                  [
                    11.755371093749998,
                    44.41808794374846
                  ],
                  [
                    10.986328125,
                    44.41808794374846
                  ],
                  [
                    10.986328125,
                    43.89789239125797
                  ]
                ]
              ]
            }
          },
          {
            type: 'Feature',
            properties: { title: 'Line' },
            geometry: {
              type: 'LineString',
              coordinates: [
                [
                  13.29345703125,
                  48.268569112964336
                ],
                [
                  15.073242187499998,
                  47.56170075451973
                ],
                [
                  14.1064453125,
                  46.40756396630067
                ],
                [
                  15.886230468750002,
                  44.94924926661153
                ]
              ]
            }
          },
          {
            type: 'Feature',
            properties: { title: 'Point' },
            geometry: {
              type: 'Point',
              coordinates: [
                11.513671874999998,
                46.42271253466717
              ]
            }
          }
        ]
      },
      visible: false,
      popup: {
        event: 'move',
        dynamicPopup: {
          component: TablePopupComponent,
          getAttributes: (args: IPopupParams) => {
            return { data: args.properties };
          }
        }
      }
    });

    const vectorLayer3 = new VectorLayer({
      id: 'geojson_test_3',
      name: 'GeoJSON Point Layer',
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              title: 'Munich',
              type: 'City',
              image: 'https://en.wikipedia.org/wiki/Munich#/media/File:Stadtbild_M%C3%BCnchen.jpg',
              wiki: 'https://en.wikipedia.org/wiki/Munich'
            },
            geometry: {
              type: 'Point',
              coordinates: [
                11.557617187499998,
                48.151428143221224
              ]
            }
          }
        ]
      },
      visible: false,
      popup: { properties: { title: 'Title', type: 'Type' } }
    });

    const vectorLayer2 = new VectorLayer({
      id: 'geojson_test_2',
      name: 'Vector Layer in Group',
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              type: 'Polygon',
              name: 'Vector Layer in Group',
              data: 'geojson',
            },
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [
                    -4.9658203125,
                    41.09591205639546
                  ],
                  [
                    -6.459960937499999,
                    39.52099229357195
                  ],
                  [
                    -5.009765625,
                    38.42777351132902
                  ],
                  [
                    -1.8896484375,
                    38.77121637244273
                  ],
                  [
                    -0.68115234375,
                    40.84706035607122
                  ],
                  [
                    -2.900390625,
                    41.65649719441145
                  ],
                  [
                    -4.9658203125,
                    41.09591205639546
                  ]
                ]
              ]
            }
          }
        ]
      },
      visible: false,
      popup: ['type', 'name'],
      actions: [{ title: 'download', icon: 'download-cloud', action: (layer) => { console.log(layer); } }]
    });

    const vectorLayerCluster = new VectorLayer({
      id: "geojson_test_cluster",
      name: "Cluster - GeoJSON Vector Layer",
      type: "geojson",
      cluster: {
        distance: 20
      },
      data: testCities,
      visible: true,
      actions: [
        {
          title: 'update Layer',
          icon: 'sync',
          action: (layer) => {
            layer.cluster.distance = 25;
            if (!layer.options) {
              layer.options = {};
            }
            layer.options.style = (feature) => {
              const size = feature.get('features').length;
              const style = new olStyle({
                image: new olCircleStyle({
                  radius: (size <= 1) ? 6 : 10,
                  stroke: new olStroke({
                    color: '#fff'
                  }),
                  fill: new olFill({
                    color: (size <= 1) ? 'green' : 'red'
                  })
                })
              });
              return style;
            };

            this.layersSvc.updateLayer(layer);
          }
        }
      ],
      popup: {
        popupFunction: params => {
          return `<div>${JSON.stringify(params.properties)} </div>`;
        }
      },
      expanded: {
        tab: 'settings',
        expanded: false
      }
    });

    const wfsLayer = new VectorLayer({
      id: 'WfsLayer',
      name: 'WFS Pennsylvania',
      type: 'wfs',
      visible: false,
      url: "https://ahocevar.com/geoserver/wfs?service=WFS&request=GetFeature&outputFormat=application/json&version=1.1.0&srsname=EPSG:3857&typenames=usa:states&cql_filter=STATE_NAME='Pennsylvania'",
      bbox: [-83.1005859375, 38.37611542403604, -72.50976562499999, 43.03677585761058],
      popup: {
        dynamicPopup: {
          component: TablePopupComponent,
          getAttributes: (args) => ({ data: args })
        }
      }
    });

    const eocBasemap = new EocBasemapTile();
    eocBasemap.cssClass = 'hide';

    const eocBaseoverlay = new EocBaseoverlayTile();

    const eocLiteoverlay = new EocLiteoverlayTile();
    eocLiteoverlay.legendImg = 'https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Aliteoverlay&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A4&TileCol=8&TileRow=5';

    /** add a Group of layers */
    const groupLayer = new LayerGroup({
      id: 'group_1',
      name: 'Test Group',
      layers: [eocBasemap, eocBaseoverlay, eocLiteoverlay],
      description: 'This is a group with a hidden eocBasemap (layer.cssClass = hide), eocBaseoverlay and a eocLiteoverlay',
      expanded: {
        tab: 'description'
      },
      actions: [{ title: 'download', icon: 'download-cloud', action: (group) => { console.log(group); } }]
    });


    const eocLiteoverlay2 = new EocLiteoverlayTile();
    eocLiteoverlay2.id = 'eoc_Liteoverlay_2';

    const groupLayer2 = new LayerGroup({
      id: 'group_2',
      name: 'Test Group 2',
      description: {
        component: ExampleLayerDescriptionComponent,
        inputs: { description: `A LayerGroup with a hidden vectorLayer2.` }
      },
      legendImg: {
        component: ExampleGroupLegendComponent,
      },
      cssClass: 'custom-layer-group',
      layers: [TDM90DEMLayer, vectorLayer2, eocLiteoverlay2]
    });

    const groupVector = new LayerGroup({
      id: 'group_3',
      name: 'Test Group Vector-Data',
      expanded: false,
      layers: [vectorLayer, vectorLayer3, wfsLayer]
    });

    const hillshade = new HillshadeTile({
      popup: {
        popupFunction: (params) => {
          return `
            <table>
              <tbody>
                <tr>
                  <td style="vertical-align: top; padding-right: 7px;"><b>Name: ${params.properties.name}</b></td>
                  <td></td>
                </tr>
                <tr>
                  <td style="vertical-align: top; padding-right: 7px;"><b>type: ${params.properties.type}</b></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <img src="${params.properties.legendImg}">
            `;
        }
      }
    });

    const overlays = [gufLayer, hillshade, groupVector, groupLayer2, groupLayer, vectorLayerCluster];
    overlays.map(layer => {
      if (layer instanceof Layer) {
        this.layersSvc.addLayer(layer, 'Layers');
      } else if (layer instanceof LayerGroup) {
        this.layersSvc.addLayerGroup(layer);
      }
    });
  }

  addOverlays() {
    const blueMarble = new BlueMarbleTile({ crossOrigin: 'anonymous' });
    const openSeaMap = new OpenSeaMap({ crossOrigin: 'anonymous' });
    this.layersSvc.addLayer(blueMarble, 'Overlays');
    this.layersSvc.addLayer(openSeaMap, 'Overlays');

    const blueMarbleMerge = new BlueMarbleTile({ id: 'merge_BlueMarble' });
    const eocLiteoverlayMerge = new EocLiteoverlayTile({ id: 'merge_Liteoverlay' });
    const mergeLayer = new StackedLayer({
      id: 'BlueMarbleTile_Overlay',
      name: 'BlueMarble with Overlay',
      visible: false,
      legendImg: blueMarbleMerge.legendImg,
      description: 'merged/stacked Layers BlueMarble with Overlay',
      layers: [blueMarbleMerge, eocLiteoverlayMerge]
    });
    this.layersSvc.addLayer(mergeLayer, 'Overlays');
  }

  updateLayerGroup() {
    const group1 = this.layersSvc.getLayerOrGroupById('group_1') as unknown as LayerGroup;
    group1.expanded = true;
    group1.layers[1].cssClass = null;
    this.layersSvc.updateLayerGroup(group1);

    const group2 = this.layersSvc.getLayerOrGroupById('group_2') as unknown as LayerGroup;
    group2.layers[1].visible = true;
    this.layersSvc.updateLayerGroup(group2);
  }

  addLayerToGroup() {
    const group = this.layersSvc.getLayerOrGroupById('group_2') as unknown as LayerGroup;
    const worldReliefBw = new WorldReliefBwTile();
    this.layersSvc.addLayerToGroup(worldReliefBw, group);
  }

  removeAllLayers() {
    this.layersSvc.removeLayers();
  }

  toggleMap() {
    this.showMap = !this.showMap;
  }

}
