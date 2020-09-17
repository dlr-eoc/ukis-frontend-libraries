import { Component, OnInit, HostBinding, AfterViewInit } from '@angular/core';
import { LayersService, CustomLayer, LayerGroup, VectorLayer, Layer } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { MapOlService, IMapControls } from '@dlr-eoc/map-ol';
import { OsmTileLayer } from '@dlr-eoc/base-layers-raster';

import { Feature as olFeature } from 'ol';
import { Heatmap as olHeatmapLayer, Vector as olVectorLayer, VectorImage as olVectorImageLayer,
         Group as olLayerGroup, Image as olImageLayer, Tile as olTileLayer, VectorTile as olVectorTileLayer } from 'ol/layer';
import { ImageStatic as olStatic, Vector as olVectorSource, ImageWMS as olImageWMS, Cluster as olCluster,
         TileWMS as olTileWMS, VectorTile as olVectorTileSource } from 'ol/source';
import { GeoJSON as olGeoJSON, KML as olKML, TopoJSON as olTopoJSON, MVT as olMVT } from 'ol/format';
import { Fill as olFill, Stroke as olStroke, Style as olStyle, Circle as olCircle, Text as olText } from 'ol/style';
import { Point as olPoint } from 'ol/geom';

import { ExampleLayerActionComponent } from '../../components/example-layer-action/example-layer-action.component';
import { munichPolys, heatMapData, vectorLayerData, crescentPoints } from './resources/features';
import { SunlightComponent } from '../../components/sunlight/sunlight.component';
import { InterpolationSettingsComponent } from '../../components/interpolation-settings/interpolation-settings.component';
import { BarsLayer } from './customRenderers/threejs_renderer';
import { InterpolationLayer, ColorRamp, DtmLayer } from '@dlr-eoc/utils-maps';


@Component({
  selector: 'app-route-map4',
  templateUrl: './route-map4.component.html',
  styleUrls: ['./route-map4.component.scss'],
  /** use different instances of the services only for testing with different routes  */
  providers: [LayersService, MapStateService, MapOlService]
})
export class RouteMap4Component implements OnInit, AfterViewInit {
  @HostBinding('class') class = 'content-container';
  controls: IMapControls;
  test = [];
  inputValue = { value: 15 };
  constructor(
    public layersSvc: LayersService,
    public mapStateSvc: MapStateService,
    public mapSvc: MapOlService
  ) {

    this.controls = {
      attribution: true,
      scaleLine: true,
      overviewMap: true
    };

    /* this.heatMapComp = {
      component: ExampleLayerActionComponent, inputs: { value: 15 }
    }; */
  }


  ngOnInit(): void {
    this.addLayers();
  }

  setInput() {
    const layer = this.layersSvc.getLayerById('heatmap_layer') as CustomLayer;
    this.inputValue.value = 40;
    layer.action.inputs = this.inputValue;
    /** change object ref to trigger input change */
    layer.action = Object.assign({}, layer.action);
  }

  addLayers() {
    const osmLayer1 = new OsmTileLayer({
      id: 'OSM1',
      visible: true
    });

    const customHeatmapLayer = new CustomLayer({
      id: 'heatmap_layer',
      name: 'Heatmap Layer',
      actions: [{ title: 'test', icon: '', action: (layer) => { } }],
      action: {
        component: ExampleLayerActionComponent, inputs: this.inputValue, outputs: {
          valueChange: (value) => {
            this.inputValue.value = value;
          }
        }
      },
      custom_layer: new olHeatmapLayer({
        source: new olVectorSource({
          features: this.mapSvc.geoJsonToFeatures(heatMapData),
          format: new olGeoJSON(),
        }),
        radius: this.inputValue.value
      }),
      visible: false
    });

    const vectorPointsForHeatmap = new VectorLayer({
      id: 'Vector Layer1',
      name: 'Vector Layer',
      type: 'geojson',
      data: heatMapData,
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
      popup: {
        single: true
      },
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

    const customLayerGroup = new CustomLayer({
      id: 'customLayerOlGroup',
      name: 'Custom Layer OlGroup',
      visible: false,
      popup: true,
      custom_layer: new olLayerGroup({
        layers: [
          new olTileLayer({
            source: new olTileWMS({
              url: 'https://geoservice.dlr.de/eoc/basemap/wms',
              params: { LAYERS: 'litemap', TILED: true },
              serverType: 'geoserver',
              // Countries have transparency, so do not fade tiles:
              transition: 0,
            }),
          }),
          new olTileLayer({
            source: new olTileWMS({
              url: 'https://geoservice.dlr.de/eoc/basemap/wms',
              params: { LAYERS: 'liteoverlay', TILED: true },
              serverType: 'geoserver',
              // Countries have transparency, so do not fade tiles:
              transition: 0,
            }),
          })
        ]
      })
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
            features: this.mapSvc.geoJsonToFeatures(heatMapData)
          })
        })
      }),
    });


    const vectorTile = new CustomLayer({
      id: 'vectorTile',
      name: 'VectorTileLayer',
      visible: false,
      popup: {
        event: 'move',
        filterkeys: ['name', 'region_un', 'region_wb'],
        properties: { 'name': 'Name' },
        options: { autoPan: false }
      },
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



    const dtmLayer = new CustomLayer({
      id: 'dtmLayer',
      name: 'SRTM DTM',
      filtertype: 'Layers',
      custom_layer: new DtmLayer({
        source: new olStatic({
            url: 'assets/images/srtm_small.png',
            imageExtent: [10.00, 45.00, 15.00, 50.00],
            projection: 'EPSG:4326',
          })
      }),
      action: {
        component: SunlightComponent,
        inputs: {
          changeHandler: (x: number, y: number) => {
            dtmLayer.custom_layer.updateSunAngle([x, y]);
          }
        }
      },
      opacity: 0.6,
      visible: false,
      description: `<p>This layer uses SRTM data to calculate surface-normals and uses them to dynamically create shades on hilltops. Things like these might be a nice illustration for time-enabled maps.</p>
      <p>Use the controls to dynamically change the sun's angle.</p>`
    });

    const barLayer = new CustomLayer({
      id: 'three',
      name: 'Bars layer',
      custom_layer: new BarsLayer({
        source: new olVectorSource({
          features: this.mapSvc.geoJsonToFeatures(munichPolys)
        })
      }),
      filtertype: 'Layers',
      opacity: 0.7,
      visible: false,
      description: `<p>This layer demonstrates how a common 3d-library, three.js, can be integrated in a 2d-map. Using three.js often yields less verbose code than calling WebGL directly.</p>`
    });


    const metersPerUnit = this.mapSvc.map.getView().getProjection().getMetersPerUnit();
    const crescentSource = new olVectorSource({
      features: this.mapSvc.geoJsonToFeatures(crescentPoints)
    });
    const clusteredCrescentSource = new olCluster({
      source: crescentSource,
      distance: 25  // pixel
    });
    const valueParameter = 'SWH';
    const colorRamp: ColorRamp = [
      { val: 0.0,   rgb: [166, 97, 26]    },
      { val: 0.4,   rgb: [223, 194, 125]  },
      { val: 0.8,   rgb: [247, 247, 247]  },
      { val: 2.0,   rgb: [128, 205, 193]  },
      { val: 22.5,  rgb: [1, 133, 113]    },
    ];
    const interpolationLayer = new CustomLayer({
      id: 'interpolation',
      name: 'Interpolation',
      custom_layer: new InterpolationLayer({
        source: clusteredCrescentSource,
        style: (feature: olFeature<any>, resolution: number): olStyle => {
          const features = feature.getProperties().features;
          let labelText: string;
          if (features.length > 1) {
            labelText = `${feature.getProperties().features.length}`;
          } else {
            labelText = `${Number.parseFloat(features[0].getProperties()[valueParameter]).toPrecision(3)}`;
          }

          return new olStyle({
            image: new olCircle({
              radius: 13,
              fill: new olFill({
                color: 'rgba(0, 153, 255, 0.2)',
              }),
              stroke: new olStroke({
                color: 'rgba(255, 255, 255, 0.2)',
                width: 1,
              })
            }),
            text: new olText({
              text: labelText,
              overflow: true,
              offsetX: -((labelText.length * 5) / 2),
              offsetY: 1,
              textAlign: 'left',
              fill: new olFill({
                color: '#ffffff'
              }),
            })
          });
        },
        renderSettings: {
          maxEdgeLength: 15000 / metersPerUnit,
          power: 2.0,
          colorRamp: colorRamp,
          smooth: true,
          showLabels: false,
          valueProperty: valueParameter,
          storeInterpolatedPixelData: false
        }
      }),
      actions: [{ title: 'test', icon: '', action: (layer) => { } }],
      action: {
        component: InterpolationSettingsComponent,
        inputs: {
          changeHandler: (power: number, smooth: boolean, labels: boolean) => {
            (interpolationLayer.custom_layer as InterpolationLayer).updateParas(power, smooth, labels);
          }
        }
      },
      filtertype: 'Layers',
      opacity: 0.7,
      visible: false,
      description: 'This layer is an example of how WebGL can be used to outsource computationally expensive operations. For inverse-distance interpolation we need to account for every datapoint at every pixel.'
    });

    const layerGroup2 = new LayerGroup({
      name: 'Webgl Group',
      filtertype: 'Layers',
      id: 'group2',
      layers: [dtmLayer, barLayer, interpolationLayer]
    });

    const layers = [osmLayer1, layersGroup1, layerGroup2, clusterLayer, vectorTile, imageWmsLayer, kmlLayer, topoJsonLayer, customLayerGroup];

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
    const testLayer = new VectorLayer({
      id: 'Vector Layer2',
      name: 'async add Layer',
      type: 'geojson',
      data: vectorLayerData,
      visible: false,
      popup: true
    });

    setTimeout(() => {
      this.layersSvc.addLayer(testLayer, 'Layers');
    }, 2000);


  }
}
