import { Component, OnInit, HostBinding } from '@angular/core';
import { LayersService, RasterLayer, VectorLayer, LayerGroup, Layer, WmtsLayer, WmsLayer } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { OsmTileLayer, EocLitemapTile, OpenSeaMap, EocBasemapTile, EocBaseoverlayTile, EocLiteoverlayTile, BlueMarbleTile, WorldReliefBwTile, HillshadeTile } from '@dlr-eoc/base-layers-raster';
import { MapOlService } from '@dlr-eoc/map-ol';

@Component({
  selector: 'app-route-map',
  templateUrl: './route-map.component.html',
  styleUrls: ['./route-map.component.scss'],
  /** use differnt instances of the services only for testing with diffenr routs  */
  providers: [LayersService, MapStateService, MapOlService]
})
export class RouteMapComponent implements OnInit {
  @HostBinding('class') class = 'content-container';
  controls: { attribution?: boolean, scaleLine?: boolean, zoom?: boolean, crosshair?: boolean };

  constructor(
    public layersSvc: LayersService,
    public mapStateSvc: MapStateService) {

    this.controls = {
      attribution: true,
      scaleLine: true
    };
  }


  ngOnInit(): void {
    this.addBaseLayers();
    this.addLayers();
    this.addOverlays();
    this.setExtent();
  }

  setExtent() {
    /** set map extent or IMapState (zoom, center...) with the MapStateService */
    this.mapStateSvc.setExtent([-14, 33, 40, 57]);
  }

  addBaseLayers() {
    const eocLitemapLayer = new EocLitemapTile({
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
      description: 'eoc:world_relief_bw as web map tile service',
      attribution: 'Relief: <a src="https://www.dlr.de/eoc">DLR/EOC</>',
      legendImg: ''
    });

    const OsmLayer = new OsmTileLayer({
      id: 'OSM_Base'
    });

    const layers = [eocLitemapLayer, worldRelief, OsmLayer];

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
      legendImg: ''
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
      description: 'TDM90_DEM',
      attribution: ' | TDM90 Data ©: <a href="http://www.dlr.de" target="_blank">DLR</a>  licensed for <a rel="license" target="_blank" href="https://geoservice.dlr.de/resources/licenses/tdm90/License_for_the_Utilization_of_90m_DEM_for_Scientific_Use.pdf">scientific use</a>',
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
      popup: true
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
          }
        ]
      },
      visible: false,
      popup: true,
      actions: [{ title: 'download', icon: 'download-cloud', action: (layer) => { console.log(layer); } }]
    });

    const eocBasemap = new EocBasemapTile();

    const eocBaseoverlay = new EocBaseoverlayTile();

    const eocLiteoverlay = new EocLiteoverlayTile();

    const OsmLayer = new OsmTileLayer();
    /** add a Group of layers */


    const groupLayer = new LayerGroup({
      id: 'group_1',
      name: 'Test Group',
      layers: [OsmLayer, eocBasemap, eocBaseoverlay],
      description: 'this is a group with OsmLayer, eocBasemap, eocBaseoverlay',
      actions: [{ title: 'download', icon: 'download-cloud', action: (group) => { console.log(group); } }]
    });

    const groupLayer2 = new LayerGroup({
      id: 'group_2',
      name: 'Test Group 2',
      layers: [TDM90DEMLayer, vectorLayer2, eocLiteoverlay]
    });

    const hillshade = new HillshadeTile();

    const overlays = [gufLayer, hillshade, groupLayer2, vectorLayer, groupLayer];
    overlays.map(layer => {
      if (layer instanceof Layer) {
        this.layersSvc.addLayer(layer, 'Layers');
      } else if (layer instanceof LayerGroup) {
        this.layersSvc.addLayerGroup(layer);
      }
    });
  }

  addOverlays() {
    const layerOnToppOfAll = new BlueMarbleTile()
    const openSeaMapOnTopp = new OpenSeaMap();
    this.layersSvc.addLayer(layerOnToppOfAll, 'Overlays');
    this.layersSvc.addLayer(openSeaMapOnTopp, 'Overlays');
  }

  updateLayerGroup() {
    const test = this.layersSvc.getLayerOrGroupById('group_2') as unknown as LayerGroup;
    test.layers[1].visible = true;
    this.layersSvc.updateLayerGroup(test);
  }

  addLayerToGroup() {
    const group = this.layersSvc.getLayerOrGroupById('group_2') as unknown as LayerGroup;
    const worldReliefBw = new WorldReliefBwTile();
    this.layersSvc.addLayerToGroup(worldReliefBw, group);
  }

  removeAllLayers() {
    this.layersSvc.removeLayers();
  }

}
