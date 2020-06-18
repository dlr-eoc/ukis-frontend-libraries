import { Component, OnInit, HostBinding, AfterViewInit } from '@angular/core';
import { LayersService, CustomLayer, LayerGroup, VectorLayer, Layer } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { MapOlService, IMapControls } from '@dlr-eoc/map-ol';
import { OsmTileLayer } from '@dlr-eoc/base-layers-raster';

import { Heatmap as olHeatmapLayer, Vector as olVectorLayer, VectorImage as olVectorImageLayer } from 'ol/layer';
import olVectorSource from 'ol/source/Vector';
import olCluster from 'ol/source/Cluster';
import { GeoJSON as olGeoJSON, KML as olKML, TopoJSON as olTopoJSON } from 'ol/format';
import olImageWMS from 'ol/source/ImageWMS';
import olImageLayer from 'ol/layer/Image';

import olVectorTileLayer from 'ol/layer/VectorTile';
import olVectorTileSource from 'ol/source/VectorTile';
import olMVT from 'ol/format/MVT';
import { Fill as olFill, Stroke as olStroke, Style as olStyle } from 'ol/style';
import { ExampleLayerActionComponent } from '../../components/example-layer-action/example-layer-action.component';

@Component({
  selector: 'app-route-map4',
  templateUrl: './route-map4.component.html',
  styleUrls: ['./route-map4.component.scss'],
  /** use differnt instances of the services only for testing with diffenr routs  */
  providers: [LayersService, MapStateService, MapOlService]
})
export class RouteMap4Component implements OnInit, AfterViewInit {
  @HostBinding('class') class = 'content-container';
  controls: IMapControls;
  test = [];
  constructor(
    public layersSvc: LayersService,
    public mapStateSvc: MapStateService,
    public mapSvc: MapOlService) {

    this.controls = {
      attribution: true,
      scaleLine: true,
      overviewMap: true
    };
  }


  ngOnInit(): void {
    this.addLayers();
  }

  addLayers() {
    const osmLayer1 = new OsmTileLayer({
      id: 'OSM1',
      visible: true
    });

    const data = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: { pid: 1 },
          geometry: {
            type: 'Point',
            coordinates: [
              10.9423828125,
              49.001843917978526
            ]
          }
        },
        {
          type: 'Feature',
          properties: { pid: 2 },
          geometry: {
            type: 'Point',
            coordinates: [
              11.18408203125,
              49.088257784724675
            ]
          }
        },
        {
          type: 'Feature',
          properties: { pid: 3 },
          geometry: {
            type: 'Point',
            coordinates: [
              11.030273437499998,
              49.35375571830993
            ]
          }
        },
        {
          type: 'Feature',
          properties: { pid: 4 },
          geometry: {
            type: 'Point',
            coordinates: [
              10.72265625,
              49.24629332459796
            ]
          }
        },
        {
          type: 'Feature',
          properties: { pid: 5 },
          geometry: {
            type: 'Point',
            coordinates: [
              12.76611328125,
              48.011975126709956
            ]
          }
        },
        {
          type: 'Feature',
          properties: { pid: 6 },
          geometry: {
            type: 'Point',
            coordinates: [
              13.55712890625,
              49.15296965617042
            ]
          }
        },
        {
          type: 'Feature',
          properties: { pid: 7 },
          geometry: {
            type: 'Point',
            coordinates: [
              13.3154296875,
              48.545705491847464
            ]
          }
        },
        {
          type: 'Feature',
          properties: { pid: 8 },
          geometry: {
            type: 'Point',
            coordinates: [
              4.482421875,
              49.224772722794825
            ]
          }
        }
      ]
    };

    const customHeatmapLayer = new CustomLayer({
      id: 'heatmap_layer',
      name: 'Heatmap Layer',
      actions: [{ title: 'test', icon: '', action: (layer) => { } }],
      action: {
        component: ExampleLayerActionComponent, inputs: { value: 10 }
      },
      custom_layer: new olHeatmapLayer({
        source: new olVectorSource({
          features: this.mapSvc.geoJsonToFeatures(data),
          format: new olGeoJSON(),
        }),
      }),
      visible: false
    });

    const vectorPointsForHeatmap = new VectorLayer({
      id: 'Vector Layer1',
      name: 'Vector Layer',
      type: 'geojson',
      data,
      visible: false,
      popup: true
    });


    const kmlLayer = new CustomLayer({
      id: 'Layer_KML',
      name: 'KML - VectorLayer',
      popup: true,
      custom_layer: new olVectorLayer({
        source: new olVectorSource({
          url: 'assets/data/kml/TimeZones.kml',
          format: new olKML({
            extractStyles: true
          }),
        }),
      }),
      visible: false,
      bbox: [-180, -90, 180, 90]
    });

    const topoJsonLayer = new CustomLayer({
      id: 'topo_json_layer',
      name: 'Topo Json - VectorImageLayer',
      popup: true,
      custom_layer: new olVectorImageLayer({
        source: new olVectorSource({
          url: 'https://openlayers.org/en/latest/examples/data/topojson/world-110m.json',
          format: new olTopoJSON({
            // don't want to render the full world polygon (stored as 'land' layer),
            // which repeats all countries
            layers: ['countries']
          }),
          overlaps: false
        })
      }),
      visible: false,
    });

    const clusterLayer = new CustomLayer({
      id: 'clusterLayer',
      name: 'cluster Layer - VectorLayer',
      visible: false,
      popup: true,
      custom_layer: new olVectorLayer({
        source: new olCluster({
          distance: 10,
          source: new olVectorSource({
            features: this.mapSvc.geoJsonToFeatures(data)
          })
        })
      }),
    });


    const vectorTile = new CustomLayer({
      id: 'vectorTile',
      name: 'VectorTileLayer',
      visible: false,
      popup: true,
      custom_layer: new olVectorTileLayer({
        source: new olVectorTileSource({
          format: new olMVT(),
          // url: '.../VectorTileServer/tile/{z}/{y}/{x}.pbf'
          /** EOC Geoservice TMS
           * https://github.com/openlayers/openlayers/issues/3923
           */
          url: 'https://tiles.geoservice.dlr.de/service/tms/1.0.0/eoc:litemap@EPSG%3A3857@pbf/{z}/{x}/{-y}.pbf'
          // url: 'https://ahocevar.com/geoserver/gwc/service/tms/1.0.0/ne:ne_10m_admin_0_countries@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf'
        }),
        style: (feature, resolution) => {
          const mvtlayer = feature.get('layer');
          if (!this.test.includes(mvtlayer)) {
            this.test.push(mvtlayer);
          }
          // && layer === 'ne_50m_land'  // ne_50m_admin_0_countries // ne_10m_admin_0_countries
          if (mvtlayer && (mvtlayer === 'ne_50m_land' || mvtlayer === 'ne_50m_admin_0_countries' || mvtlayer === 'ne_10m_admin_0_countries')) {
            return new olStyle({
              stroke: new olStroke({
                color: 'gray',
                width: 1
              }),
              fill: new olFill({
                color: 'rgba(20,20,20,0.9)'
              })
            });
          }
        }
      }),
    });

    const layersGroup1 = new LayerGroup({
      name: 'Heatmap Group',
      filtertype: 'Layers',
      id: 'group1',
      layers: [customHeatmapLayer, vectorPointsForHeatmap]
    });

    const imageWmsLayer = new CustomLayer({
      id: 'image_wms',
      name: 'Image WMS',
      custom_layer: new olImageLayer({
        source: new olImageWMS({
          url: 'https://ahocevar.com/geoserver/wms',
          params: { LAYERS: 'topp:states' },
          serverType: 'geoserver'
        })
      }),
      visible: false,
      popup: true,
      bbox: [-133.9453125, 18.979025953255267, -60.46875, 52.908902047770255] /** for zoom to the layer */
    });

    const layers = [osmLayer1, layersGroup1, clusterLayer, vectorTile, imageWmsLayer, kmlLayer, topoJsonLayer];

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
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: { name: 'Feature 1 - Polygon' },
          geometry: {
            type: 'Polygon',
            coordinates: [
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

    const testLayer = new VectorLayer({
      id: 'Vector Layer2',
      name: 'async add Layer',
      type: 'geojson',
      data,
      visible: false,
      popup: true
    });

    setTimeout(() => {
      this.layersSvc.addLayer(testLayer, 'Layers');
    }, 2000);

  }
}
