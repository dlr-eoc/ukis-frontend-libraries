import { Component, OnInit, HostBinding, AfterViewInit } from '@angular/core';
import { LayersService, CustomLayer, LayerGroup, VectorLayer, Layer } from '@ukis/services-layers';
import { MapStateService } from '@ukis/services-map-state';
import { MapOlService } from '@ukis/map-ol';
import { esri_world_imagery, esri_grey_canvas, osm } from '@ukis/base-layers-raster';

import { Heatmap as olHeatmapLayer, Vector as olVectorLayer } from 'ol/layer';
import olVectorSource from 'ol/source/Vector';
import { GeoJSON as olGeoJSON, KML as olKML } from 'ol/format';
import olImageWMS from 'ol/source/ImageWMS';
import olImageLayer from 'ol/layer/Image';

@Component({
  selector: 'app-route-map4',
  templateUrl: './route-map4.component.html',
  styleUrls: ['./route-map4.component.scss'],
  /** use differnt instances of the services only for testing with diffenr routs  */
  providers: [LayersService, MapStateService, MapOlService]
})
export class RouteMap4Component implements OnInit, AfterViewInit {
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
    this.addLayers();
  }

  addLayers() {
    const osm_layer_base = new osm({
      legendImg: null
    });
    const osm_layer_1 = new osm({
      legendImg: null,
      id: 'OSM1'
    });

    const data = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'Point',
            'coordinates': [
              10.9423828125,
              49.001843917978526
            ]
          }
        },
        {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'Point',
            'coordinates': [
              11.18408203125,
              49.088257784724675
            ]
          }
        },
        {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'Point',
            'coordinates': [
              11.030273437499998,
              49.35375571830993
            ]
          }
        },
        {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'Point',
            'coordinates': [
              10.72265625,
              49.24629332459796
            ]
          }
        },
        {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'Point',
            'coordinates': [
              12.76611328125,
              48.011975126709956
            ]
          }
        },
        {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'Point',
            'coordinates': [
              13.55712890625,
              49.15296965617042
            ]
          }
        },
        {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'Point',
            'coordinates': [
              13.3154296875,
              48.545705491847464
            ]
          }
        },
        {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'Point',
            'coordinates': [
              4.482421875,
              49.224772722794825
            ]
          }
        }
      ]
    };

    const custom_layer = new CustomLayer({
      id: 'heatmap_layer',
      name: 'Heatmap Layer',
      type: 'custom',
      custom_layer: new olHeatmapLayer({
        source: new olVectorSource({
          features: this.mapSvc.geoJsonToFeatures(data),
          format: new olGeoJSON(),
        }),
      }),
      visible: false
    });

    const vector_layer = new VectorLayer({
      id: 'Vector Layer1',
      name: 'Vector Layer',
      type: 'geojson',
      data: data,
      visible: false
    });


    const custom_vector_layer = new CustomLayer({
      id: 'custom Vector Layer',
      name: 'Custom Layer KML',
      type: 'custom',
      custom_layer: new olVectorLayer({
        source: new olVectorSource({
          url: 'assets/data/kml/citsu_valparaiso_vinna.kml',
          format: new olKML(),
        }),
      }),
      visible: false,
      bbox: [-71.770, -33.112, -71.421, -32.867]
    });

    const esri_layer = new esri_world_imagery();

    const layers_group1 = new LayerGroup({
      name: 'Group 1',
      filtertype: 'Layers',
      id: 'group1',
      layers: [esri_layer, custom_layer, vector_layer]
    });

    const image_wms_layer = new CustomLayer({
      id: 'image_wms',
      name: 'Image WMS',
      type: 'custom',
      custom_layer: new olImageLayer({
        source: new olImageWMS({
          url: 'https://ahocevar.com/geoserver/wms',
          params: { 'LAYERS': 'topp:states' },
          serverType: 'geoserver'
        })
      }),
      visible: false,
      bbox: [-133.9453125, 18.979025953255267, -60.46875, 52.908902047770255] /** for zoom to the layer */
    });

    const esri_layer2 = new esri_grey_canvas();
    esri_layer2.id = 'esri_layer2';
    esri_layer2.removable = true;

    const layers = [osm_layer_1, layers_group1, image_wms_layer, esri_layer2, custom_vector_layer];

    this.layersSvc.addLayer(osm_layer_base, 'Baselayers');
    layers.forEach(layer => {
      if (layer instanceof Layer) {
        this.layersSvc.addLayer(layer, 'Layers');
      } else if (layer instanceof LayerGroup) {
        this.layersSvc.addLayerGroup(layer);
      }
    });

    this.mapStateSvc.setMapState({
      zoom: 5,
      center: { lat: 45, lon: 12 }
    });
  }

  ngAfterViewInit() {
    const data = {
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
                  7.91015625,
                  50.233151832472245
                ],
                [
                  9.140625,
                  47.81315451752768
                ],
                [
                  13.33740234375,
                  48.28319289548349
                ],
                [
                  13.7109375,
                  50.17689812200107
                ],
                [
                  7.91015625,
                  50.233151832472245
                ]
              ]
            ]
          }
        }
      ]
    };

    const test_layer = new VectorLayer({
      id: 'Vector Layer2',
      name: 'Vector Layer',
      type: 'geojson',
      data: data,
      visible: false
    });

    setTimeout(() => {
      this.layersSvc.addLayer(test_layer, 'Layers');
    }, 2000);

  }
}
