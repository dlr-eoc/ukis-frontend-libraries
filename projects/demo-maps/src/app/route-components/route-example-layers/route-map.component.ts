import { Component, OnInit, HostBinding } from '@angular/core';
import { LayersService, RasterLayer, VectorLayer, LayerGroup, Layer, WmtsLayer, WmsLayer } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { osm, esri_world_imagery, esri_ocean_imagery, eoc_litemap, esri_grey_canvas, esri_nav_charts, open_sea_map, google_earth } from '@dlr-eoc/base-layers-raster';
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
    const eoc_litemap_layer = new eoc_litemap({
      legendImg: null,
      id: 'eoc_litemap_base',
      visible: true
    });

    // not working in WGS84 because
    const world_relief = new WmtsLayer({
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

    const osmLayer = new osm({
      legendImg: null,
      id: 'osm_base',
      visible: false
    });

    const layers = [eoc_litemap_layer, world_relief, osmLayer];

    /** add layers with the LayersService*/
    layers.map(layer => this.layersSvc.addLayer(layer, 'Baselayers'));
  }

  addLayers() {
    const guf_layer = new RasterLayer({
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

    const TDM90_DEM_layer = new WmtsLayer({
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

    const vector_Layer = new VectorLayer({
      id: 'geojson_test',
      name: 'GeoJSON Vector Layer',
      type: 'geojson',
      data: {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": { "title": "Polygon" },
            "geometry": {
              "type": "Polygon",
              "coordinates": [
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
            "type": "Feature",
            "properties": { "title": "Rectangle" },
            "geometry": {
              "type": "Polygon",
              "coordinates": [
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
            "type": "Feature",
            "properties": { "title": "Line" },
            "geometry": {
              "type": "LineString",
              "coordinates": [
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
            "type": "Feature",
            "properties": { "title": "Point" },
            "geometry": {
              "type": "Point",
              "coordinates": [
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

    const vector_Layer2 = new VectorLayer({
      id: 'geojson_test_2',
      name: 'Vector Layer in Group',
      type: 'geojson',
      data: {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": { "title": "Rectangle" },
            "geometry": {
              "type": "Polygon",
              "coordinates": [
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
      actions: [{ title: 'download', icon: 'download-cloud', action: (layer) => { console.log(layer) } }]
    });

    const esri_Image_layer = new esri_world_imagery();
    esri_Image_layer.legendImg = null;

    const esri_grey_layer = new esri_grey_canvas({
      removable: true,
      legendImg: null,
    });

    const esri_ocean_imagery_layer = new esri_ocean_imagery({
      removable: true,
      legendImg: null,
      id: 'esri_ocean_base'
    });

    const osmLayer = new osm({
      legendImg: 'assets/osm.png'
    });
    /** add a Group of layers */


    const group_layer = new LayerGroup({
      id: 'group_1',
      name: 'Test Group',
      layers: [esri_ocean_imagery_layer, osmLayer, esri_Image_layer],
      description: 'this is a group with esri_ocean_imagery_layer, osmLayer, esri_Image_layer <img src="assets/osm.png"><a href="assets/osm.png">a link</a>',
      actions: [{ title: 'download', icon: 'download-cloud', action: (group) => { console.log(group) } }]
    });

    const group_layer2 = new LayerGroup({
      // visible: true,
      id: 'group_2',
      name: 'Test Group 2',
      layers: [TDM90_DEM_layer, vector_Layer2, esri_grey_layer]
    });

    const overlays = [guf_layer, group_layer2, vector_Layer, group_layer];
    overlays.map(layer => {
      if (layer instanceof Layer) {
        this.layersSvc.addLayer(layer, 'Layers');
      } else if (layer instanceof LayerGroup) {
        this.layersSvc.addLayerGroup(layer);
      }
    });

    // const test = this.layersSvc.getLayerOrGroupById('group_2')
    // console.log(test)
  }

  addOverlays() {
    const layer_on_topp_of_all = new esri_nav_charts();
    const open_sea_map_on_topp = new open_sea_map();
    this.layersSvc.addLayer(layer_on_topp_of_all, 'Overlays');
    this.layersSvc.addLayer(open_sea_map_on_topp, 'Overlays');
  }

  updateLayerGroup() {
    const test = <LayerGroup><unknown>this.layersSvc.getLayerOrGroupById('group_2');
    test.layers[1].visible = true;
    this.layersSvc.updateLayerGroup(test);
  }

  addLayerToGroup() {
    const group = <LayerGroup><unknown>this.layersSvc.getLayerOrGroupById('group_2');
    const google_earth_layer = new google_earth();
    this.layersSvc.addLayerToGroup(google_earth_layer, group);
  }

  removeAllLayers() {
    this.layersSvc.removeLayers();
  }

}
