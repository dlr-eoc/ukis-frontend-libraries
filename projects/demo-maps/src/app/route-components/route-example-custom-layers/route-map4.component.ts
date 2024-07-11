import { Component, OnInit, HostBinding, AfterViewInit } from '@angular/core';
import { LayersService, CustomLayer, LayerGroup, VectorLayer, Layer, IPopupParams, TGeoExtent } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { MapOlService, IMapControls } from '@dlr-eoc/map-ol';
import { OsmTileLayer } from '@dlr-eoc/base-layers-raster';

import { Feature as olFeature } from 'ol';
import {
  Heatmap as olHeatmapLayer, Vector as olVectorLayer, VectorImage as olVectorImageLayer,
  Group as olLayerGroup, Image as olImageLayer, Tile as olTileLayer, VectorTile as olVectorTileLayer
} from 'ol/layer';
import {
  ImageStatic as olStatic, Vector as olVectorSource, ImageWMS as olImageWMS, Cluster as olCluster,
  TileWMS as olTileWMS, VectorTile as olVectorTileSource, ImageCanvas as olImageCanvasSource, OSM as olOSM, Raster as olRasterSource
} from 'ol/source';
import { GeoJSON as olGeoJSON, KML as olKML, TopoJSON as olTopoJSON, MVT as olMVT } from 'ol/format';
import { Fill as olFill, Stroke as olStroke, Style as olStyle, Circle as olCircle, Text as olText } from 'ol/style';
import { getUid } from 'ol/util';
import { Projection } from 'ol/proj';

import { ExampleLayerActionComponent } from '../../components/example-layer-action/example-layer-action.component';
import { munichPolys, heatMapData, vectorLayerData, crescentPoints } from './resources/features';
import { SunlightComponent } from '../../components/sunlight/sunlight.component';
import { InterpolationSettingsComponent } from '../../components/interpolation-settings/interpolation-settings.component';
import { BarsLayer } from './customRenderers/threejs_renderer';
import { InterpolationLayer, ColorRamp, DtmLayer } from '@dlr-eoc/utils-maps';

import testData from '@dlr-eoc/shared-assets/geojson/test.json';
import testPolys from '@dlr-eoc/shared-assets/geojson/test.polys.json';
import { ExampleGroupActionComponent } from '../../components/example-group-action/example-group-action.component';
import { TablePopupComponent } from '../../components/table-popup/table-popup.component';
import { Popup2Component } from '../../components/popup2/popup2.component';

import { ClarityIcons, layersIcon, paperclipIcon } from '@cds/core/icon';
ClarityIcons.addIcons(...[layersIcon, paperclipIcon]);


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
  }


  ngOnInit(): void {
    this.addLayers();
  }

  setInput() {
    const layer = this.layersSvc.getLayerById('heatmap_layer') as CustomLayer;
    this.inputValue.value = 40;
    layer.action.inputs.value = this.inputValue.value;
  }

  addLayers() {
    const osmLayer1 = new OsmTileLayer({
      id: 'OSM1',
      visible: false,
      bbox: [-66.408, 3.577, 113.592, 64.940]
    });

    const customHeatmapLayer = new CustomLayer({
      id: 'heatmap_layer',
      name: 'Heatmap Layer',
      actions: [{ title: 'test', icon: '', action: (layer) => { } }],
      popup: {
        event: 'click',
      },
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
      visible: true,
      popup: {
        single: true
      }
    });


    const kmlLayer = new CustomLayer({
      id: 'Layer_KML',
      name: 'KML - VectorLayer',
      popup: true,
      custom_layer: new olVectorLayer({
        source: new olVectorSource({
          url: 'assets/kml/TimeZones.kml',
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
      custom_layer: new olVectorImageLayer({
        source: new olVectorSource({
          url: 'https://openlayers.org/en/latest/examples/data/topojson/world-110m.json',
          format: new olTopoJSON({
            // don't want to render the full world polygon (stored as 'land' layer),
            // which repeats all countries
            layers: ['countries']
          }),
          overlaps: false
        }),
        style: (feature, resolution) => {
          const label = `uID: ${getUid(feature)}`;
          return [new olStyle({
            stroke: new olStroke({
              color: 'gray',
              width: 1
            }),
            fill: new olFill({
              color: 'rgba(0, 153, 255, 0.2)',
            })
          })
          ];
        }
      }),
      visible: false
    });


    const geoJsonLayer = new CustomLayer({
      id: 'geo_json_layer_ocean',
      name: 'GeoJson - VectorImageLayer ocean',
      popup: {
        event: 'move'
        // filterLayer: true
      },
      custom_layer: new olVectorImageLayer({
        source: new olVectorSource({
          features: this.mapSvc.geoJsonToFeatures(testData),
          // format: new olGeoJSON(),
        }),
        style: (feature, resolution) => {
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
      }),
      visible: true,
      bbox: [-180.35156249999997, -22.268764039073968, -129.375, 29.84064389983441],
    });

    const geoJsonLayer2 = new CustomLayer({
      id: 'geo_json_layer_polys',
      name: 'GeoJson polys - VectorImageLayer',
      popup: [
        {
          event: 'click',
          single: true,
          options: { autoPan: false },
          dynamicPopup: {
            component: TablePopupComponent,
            getAttributes: (args: IPopupParams) => {
              return { data: args.properties };
            }
          }
        },
        {
          event: 'move',
          options: { autoPan: false },
          dynamicPopup: {
            component: Popup2Component,
            getAttributes: (args: IPopupParams) => {
              return { data: args.properties };
            }
          }
        }
      ],
      custom_layer: new olVectorImageLayer({
        source: new olVectorSource({
          features: this.mapSvc.geoJsonToFeatures(testPolys),
          // format: new olGeoJSON(),
        }),
        style: (feature, resolution) => {
          return new olStyle({
            stroke: new olStroke({
              color: 'gray',
              width: 1
            }),
            fill: new olFill({
              color: 'rgba(51,153,51,1)'
            })
          });
        }
      }),
      visible: true,
    });


    const geoJsonLayer3 = new CustomLayer({
      id: 'geo_json_layer_collection',
      name: 'GeoJson Collection - VectorImageLayer',
      popup: {
        event: 'click',
        single: true,
        options: { autoPan: false }
      },
      custom_layer: new olVectorImageLayer({
        source: new olVectorSource({
          url: 'assets/geojson/test.collection.json',
          format: new olGeoJSON(),
        }),
        style: (feature, resolution) => {
          return new olStyle({
            stroke: new olStroke({
              color: 'rgba(153,51,51,1)',
              width: 2
            }),
            fill: new olFill({
              color: 'rgba(153,51,51,1)'
            }),
            image: new olCircle({
              radius: 5,
              fill: new olFill({
                color: 'rgba(153,51,51,1)'
              })
            })
          });
        }
      }),
      visible: true,
    });


    const staticImageLayer = new CustomLayer({
      id: 'static_image_layer',
      name: 'Static Image',
      visible: false,
      popup: {
        popupFunction: (params) => {
          return params.color.toString();
        }
      },
      // crossOrigin: null, // set this to get data for pixel for cross-origin data or not if null
      custom_layer: new olImageLayer({
        source: new olStatic({
          url: 'assets/image/srtm_small.png',
          imageExtent: [10.00, 45.00, 15.00, 50.00],
          projection: 'EPSG:4326',
          // crossOrigin: 'anonymous' // set this to get data for pixel for cross-origin data
        })
      })
    });

    const osmClipLayer = new CustomLayer({
      id: 'osm_clip_layer',
      name: 'OSM Clip',
      visible: true,
      popup: {
        popupFunction: (params) => {
          return params.color.toString();
        }
      },
      custom_layer: new olTileLayer({
        source: new olOSM()
      }),
      bbox: [
        -105.41888884797893,
        6.480590573390401,
        -15.540298246016693,
        42.53496284727569
      ]
    });

    const customLayerGroup = new CustomLayer({
      id: 'customLayerOlGroup',
      name: 'Custom Layer OlGroup',
      visible: true,
      opacity: 0.6,
      popup: {
        event: 'move',
        popupFunction: (params) => {
          return `${params.color.toString()}`;
        },
        options: { autoPan: false }
      },
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
      }),
      bbox: [-18.213, -26.814, 68.344, 11.783]
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
        filterkeys: ['name', 'layer', 'class'],  // of all the feature's properties, only pass these to the popup-render-function
        properties: { name: 'Name' },  // rename the feature.property key "name" to "Name"
        options: { autoPan: false }
      },
      custom_layer: new olVectorTileLayer({
        source: new olVectorTileSource({
          format: new olMVT(),
          // url: '.../VectorTileServer/tile/{z}/{y}/{x}.pbf'
          /** EOC Geoservice TMS
           * https://github.com/openlayers/openlayers/issues/3923
           */
          url: 'https://tiles.geoservice.dlr.de/service/tms/1.0.0/planet_eoc@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf?flipy=true'
        }),
        style: (feature, resolution) => {
          const mvtlayer = feature.get('layer');
          const mvtClass = feature.get('class');
          if (!this.test.includes(mvtlayer)) {
            this.test.push(mvtlayer);
          }
          /**
           * water, landcover, boundary, water_name, place
           */
          if (mvtlayer) {
            if (mvtlayer === 'water') {
              return new olStyle({
                fill: new olFill({
                  color: 'rgba(67,162,202,0.9)'
                })
              });
            } else if (mvtlayer === 'boundary') {
              return new olStyle({
                stroke: new olStroke({
                  color: 'gray',
                  width: 1
                }),
                fill: new olFill({
                  color: 'rgba(0,0,0,0)',
                })
              });
            } else if (mvtlayer === 'landcover') {
              if (mvtClass) {
                if (mvtClass === 'wood') {
                  return new olStyle({
                    fill: new olFill({
                      color: 'rgba(53,151,143,0.7)',
                    })
                  });
                } else if (mvtClass === 'grass') {
                  return new olStyle({
                    fill: new olFill({
                      color: 'rgba(168,221,181,0.7)',
                    })
                  });
                }
              }
            }
          }
        }
      }),
    });

    const layersGroup1 = new LayerGroup({
      name: 'Heatmap Group',
      filtertype: 'Layers',
      id: 'group1',
      layers: [customHeatmapLayer, vectorPointsForHeatmap],
      description: `This is a custom layer group with some custom angular components in the UI`,
      action: {
        component: ExampleGroupActionComponent
      }
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
      popup: {
        popupFunction: (params) => {
          return params.color.toString();
        }
      },
      bbox: [-133.9453125, 18.979025953255267, -60.46875, 52.908902047770255] /** for zoom to the layer */
    });


    const dtmLayerBbox = [10.00, 45.00, 15.00, 50.00];
    const dtmLayer = new CustomLayer({
      id: 'dtmLayer',
      name: 'SRTM DTM',
      filtertype: 'Layers',
      bbox: dtmLayerBbox as TGeoExtent,
      custom_layer: new DtmLayer({
        source: new olStatic({
          url: 'assets/image/srtm_small.png',
          imageExtent: dtmLayerBbox,
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

    const metersPerUnit = this.mapSvc.getProjection().getMetersPerUnit();
    const metersPerUnitWSG84 = new Projection({ code: 'EPSG:4326', units: 'degrees' }).getMetersPerUnit();
    munichPolys.features.map(f => f.properties.height = f.properties.height * metersPerUnitWSG84 / metersPerUnit);

    const barFeatures = this.mapSvc.geoJsonToFeatures(munichPolys);
    const barBbox = this.mapSvc.getFeaturesExtent(barFeatures, true);
    const barLayer = new CustomLayer({
      id: 'three',
      name: 'Bars layer',
      bbox: barBbox,
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



    const crescentFeatures = this.mapSvc.geoJsonToFeatures(crescentPoints);
    const crescentBbox = this.mapSvc.getFeaturesExtent(crescentFeatures, true);
    const crescentSource = new olVectorSource({
      features: this.mapSvc.geoJsonToFeatures(crescentPoints)
    });
    const clusteredCrescentSource = new olCluster({
      source: crescentSource,
      distance: 25  // pixel
    });
    const valueParameter = 'SWH';
    const colorRamp: ColorRamp = [
      { val: 0.0, rgb: [166, 97, 26] },
      { val: 0.4, rgb: [223, 194, 125] },
      { val: 0.8, rgb: [247, 247, 247] },
      { val: 2.0, rgb: [128, 205, 193] },
      { val: 22.5, rgb: [1, 133, 113] },
    ];
    const interpolationLayer = new CustomLayer({
      id: 'interpolation',
      name: 'Interpolation',
      bbox: crescentBbox,
      custom_layer: new InterpolationLayer({
        source: clusteredCrescentSource as any,
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
          colorRamp,
          smooth: true,
          showLabels: false,
          valueProperty: valueParameter,
          storeInterpolatedPixelData: false
        }
      }),
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


    const TransparentBackground = new CustomLayer({
      name: 'Transparenter Hintergrund',
      id: 'blank',
      type: 'custom',
      visible: false,
      custom_layer: new olImageLayer({
        source: new olImageCanvasSource({
          canvasFunction: () => {
            const canvas = document.createElement('canvas');
            return canvas;
          }
        }),
        // opacity: 0
      }),
    });

    // https://github.com/dlr-eoc/ukis-frontend-libraries/issues/100
    const rasterSourceLayer = new CustomLayer({
      name: "Ol Raster Source OSM",
      id: "rasterSourceLayer",
      type: "custom",
      visible: false,
      removable: true,
      custom_layer: new olImageLayer({
        source: new olRasterSource({
          sources: [new olOSM()],
          operation: (pixels) => {
            const pixel = pixels[0];
            return pixel;
          },
          operationType: "image",
        }),
      }),
    });

    const layers = [
      TransparentBackground,
      rasterSourceLayer,
      osmLayer1,
      vectorTile,
      layerGroup2,
      clusterLayer,
      imageWmsLayer,
      kmlLayer,
      staticImageLayer,
      osmClipLayer,
      topoJsonLayer,
      geoJsonLayer2,
      geoJsonLayer3,
      layersGroup1,
      geoJsonLayer,
      customLayerGroup];

    layers.forEach(layer => {
      if (layer instanceof Layer) {
        this.layersSvc.addLayer(layer, 'Layers');
      } else if (layer instanceof LayerGroup) {
        this.layersSvc.addLayerGroup(layer);
      }
    });

    // Test for https://github.com/dlr-eoc/ukis-frontend-libraries/issues/100
    setTimeout(() => {
      rasterSourceLayer.visible = true;
      rasterSourceLayer.custom_layer.setSource(new olRasterSource({
        sources: [new olOSM()],
        operation: (pixels) => {
          const pixel = pixels[0];
          return pixel;
        },
        operationType: "image",
      }));
      this.layersSvc.updateLayer(rasterSourceLayer);
    }, 2000);
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
