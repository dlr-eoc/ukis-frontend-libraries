import { Component, HostBinding, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomLayer, Layer, LayerGroup, LayersService, RasterLayer, StackedLayer, VectorLayer, WmsLayer, WmtsLayer } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { MapMaplibreService } from '@dlr-eoc/map-maplibre';
import { StyleSpecification, TerrainControl } from 'maplibre-gl';

import { OsmTileLayer, EocLitemap, BlueMarbleTile, EocBaseoverlayTile } from '@dlr-eoc/base-layers-raster';
import greyscale from '@dlr-eoc/shared-assets/open-map-styles/open-map-style.json';
import placeLabels from '@dlr-eoc/shared-assets/open-map-styles/open-map-style-place-labels.json';
import testData from '@dlr-eoc/shared-assets/geojson/test.collection.json';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-route-example-maplibre',
  templateUrl: './route-example-maplibre.component.html',
  styleUrls: ['./route-example-maplibre.component.scss'],
  // https://medium.com/@rishanthakumar/angular-lazy-load-common-styles-specific-to-a-feature-module-c3f81c40daf1
  encapsulation: ViewEncapsulation.None,
  providers: [LayersService, MapStateService, MapMaplibreService]
})
export class RouteExampleMaplibreComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'content-container';

  subs: Subscription[] = [];
  constructor(
    public layerSvc: LayersService,
    public mapStateSvc: MapStateService,
    public mapSvc: MapMaplibreService) { }

  ngOnInit(): void {
    this.addBaselayers();
    this.setMapState();
    this.setTerrain();

    this.addlayers();
    this.addOverlays();

    // this.subscribeToMapState();
  }

  ngOnDestroy() {
    this.subs.map(s => s.unsubscribe());
  }

  setMapState() {
    const zoom = 11;
    const center = {
      lat: 47.41449812198263,
      lon: 11.7455863952639
    };
    const rotation = 45;
    const viewAngle = 60;
    this.mapStateSvc.setMapState({
      zoom,
      center,
      rotation,
      viewAngle
    });
  }

  setTerrain() {
    // https://sparkgeo.com/blog/augmenting-mapbox-terrain/
    // https://blog.mapbox.com/global-elevation-data-6689f1d0ba65
    // https://github.com/tilezen/joerd/blob/master/docs/formats.md#terrarium
    // https://water-gis.com/en/setups/terrain-rgb/create_terrainrgb/
    // https://github.com/syncpoint/terrain-rgb
    // https://www.maptiler.com/news/2022/05/maplibre-2/
    const mapSub = this.mapSvc.map.subscribe(map => {
      if (map) {
        map.addSource('terrainSource', {
          type: 'raster-dem',
          encoding: "terrarium", // "mapbox",
          tiles: [
            // "https://geoservice.dlr.de/eoc/test/wms?service=WMS&version=1.1.0&request=GetMap&layers=test%3ATDM90_DEM_Plus&bbox={bbox-epsg-3857}&width=256&height=256&srs=EPSG:3857&styles=&format=image/png"
            // "https://geoservice.dlr.de/eoc/basemap/gmted/wms?service=WMS&version=1.1.0&request=GetMap&layers=gmted%3Agmted&bbox={bbox-epsg-3857}&width=256&height=256&srs=EPSG:3857&styles=&format=image/png"
            // "https://sgx.geodatenzentrum.de/wms_dgm200?service=wms&version=1.3.0&request=GetMap&Layers=relief&bbox={bbox-epsg-3857}&width=256&height=256&srs=EPSG:3857&styles=&format=image/png"
            // "https://vtc-cdn.maptoolkit.net/terrainrgb/{z}/{x}/{y}.png"
            // "https://wms.wheregroup.com/dem_tileserver/raster_dem/{z}/{x}/{y}.webp"
            // "https://api.mapbox.com/raster/v1/mapbox.mapbox-terrain-dem-v1/{z}/{x}/{y}.webp",

            // https://registry.opendata.aws/terrain-tiles/
            "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"
          ],
          tileSize: 256,
          attribution: `© <a href="https://registry.opendata.aws/terrain-tiles/" target="_blank">AWS Terrain Tiles</a>`,
          minzoom: 3
        });
        const exaggeration = 1; // -0.001; // 0.001 // 1 //??? https://blog.mapbox.com/global-elevation-data-6689f1d0ba65 - height = -10000 + ((R * 256 * 256 + G * 256 + B) * 0.1)
        map.setTerrain({
          source: 'terrainSource',
          exaggeration: exaggeration
        });

        map.setMaxPitch(80);

        map.addControl(
          new TerrainControl({
            source: 'terrainSource',
            exaggeration: exaggeration
          }), 'top-left'
        );
      }
    });
    this.subs.push(mapSub);
  }

  addBaselayers() {
    // some of the fonts are not working
    greyscale.layers.forEach(l => {
      if (l?.layout?.['text-font']) {
        l.layout['text-font'] = l.layout['text-font'].filter(i => i !== 'Noto Sans Regular' && i !== 'Noto Sans Italic');
      }
    });

    const layers = [
      new OsmTileLayer({
        visible: false
      }),
      new EocLitemap({
        visible: true
      }),
      new BlueMarbleTile({
        visible: false
      }),
      new VectorLayer({
        name: 'Transparenter Hintergrund',
        id: 'blank_1',
        type: 'geojson',
        visible: false,
        // maplibre needs a valid geojson object
        data: { 'type': 'FeatureCollection', 'features': [] }
      }),
      new VectorLayer({
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
        visible: false
      })
    ];

    layers.map(l => this.layerSvc.addLayer(l, 'Baselayers'));
  }

  addlayers() {
    const eocBasemap = new WmsLayer({
      name: 'EOC Basemap',
      displayName: 'EOC Basemap',
      id: 'eoc_basemap',
      visible: false,
      type: 'wms',
      removable: false,
      params: {
        LAYERS: 'eoc:basemap',
        FORMAT: 'image/png',
        TRANSPARENT: true
      },
      url: 'https://tiles.geoservice.dlr.de/service/wms',
      attribution: '&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',
      continuousWorld: false,
      legendImg: 'https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Abasemap&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11',
      description: 'This is the basemap for DLR Service Portals',
      opacity: 1
    });

    const osm = new RasterLayer({
      name: 'OpenStreetMap',
      displayName: 'OpenStreetMap',
      id: 'osm_2',
      visible: false,
      type: 'xyz',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      subdomains: ['a', 'b', 'c'],
      attribution: '&copy, <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors',
      continuousWorld: false,
      legendImg: 'https://a.tile.openstreetmap.org/3/4/3.png',
      description: 'OpenStreetMap z-x-y Tiles',
      opacity: 1
    });

    const eocLiteMap = new WmtsLayer({
      name: 'EOC Litemap Tile',
      displayName: 'EOC Litemap Tile',
      id: 'eoc_litemap_tile',
      visible: false,
      type: 'wmts',
      removable: false,
      params: {
        layer: 'eoc:litemap',
        format: 'image/png',
        style: '_empty',
        matrixSetOptions: {
          matrixSet: 'EPSG:3857',
          tileMatrixPrefix: 'EPSG:3857'
        }
      },
      url: 'https://tiles.geoservice.dlr.de/service/wmts',
      attribution: '&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',
      continuousWorld: false,
      legendImg: 'https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Alitemap&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11',
      description: 'EOC Litemap as web map tile service',
      opacity: 1
    });

    const eocLiteOverlay = new EocBaseoverlayTile();

    const MODIS_EU_DAILY = new WmsLayer({
      name: 'MODIS EU Daily',
      id: 'MODIS_EU_DAILY',
      visible: false,
      type: 'wms',
      removable: false,
      params: {
        LAYERS: 'MODIS_EU_DAILY',
        FORMAT: 'image/png',
        TRANSPARENT: true
      },
      url: 'https://geoservice.dlr.de/eoc/imagery/wms',
      attribution: '&copy, <a href="//geoservice.dlr.de/eoc/imagery/">DLR</a>',
      continuousWorld: false,
      legendImg: 'https://geoservice.dlr.de/eoc/imagery/wms?service=WMS&version=1.3.0&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=MODIS_EU_DAILY',
      opacity: 1
    });

    // https://sgx.geodatenzentrum.de/wms_sen2europe?service=wms&version=1.3.0&request=GetMap&Layers=sentinel2-de:rgb&STYLES=&CRS=EPSG:25832&bbox=500000,5700000,550000,5750000&width=500&Height=500&Format=image/png&TIME=2018
    const sentinel2Europe = new WmsLayer({
      name: 'Sentinel-2 Europe',
      id: 'sentinel2Europe',
      visible: true,
      type: 'wms',
      removable: false,
      params: {
        LAYERS: 'rgb',
        FORMAT: 'image/png',
        TRANSPARENT: true
      },
      url: 'https://sgx.geodatenzentrum.de/wms_sen2europe',
      attribution: '&copy, <a href="https://gdz.bkg.bund.de/index.php/default/open-data/wms-europamosaik-aus-sentinel-2-daten-wms-sen2europe.html" target="_blank">Europäische Union - BKG</a>',
      continuousWorld: false,
      legendImg: 'https://sgx.geodatenzentrum.de/wms_sen2europe?service=WMS&version=1.3.0&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=rgb',
      opacity: 1
    });

    const mosaic_hillshade = new WmsLayer({
      name: 'mosaic_hillshade',
      id: 'gmted2010_dsc075_mosaic_hillshade',
      visible: false,
      type: 'wms',
      removable: false,
      params: {
        LAYERS: 'gmted2010_dsc075_mosaic_hillshade',
        FORMAT: 'image/png',
        TRANSPARENT: true
      },
      url: 'https://geoservice.dlr.de/eoc/basemap/wms',
      attribution: '&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',
      continuousWorld: false,
      legendImg: 'https://geoservice.dlr.de/eoc/basemap/wms?service=WMS&version=1.3.0&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=gmted%3Agmted2010_dsc075_mosaic_hillshade',
      opacity: 0.5
    });

    const waterway = new CustomLayer<StyleSpecification>({
      id: 'waterway-planet_eoc',
      name: 'waterway',
      visible: true,
      removable: true,
      custom_layer: {
        version: 8,
        // Use a different source for layers, to improve render quality
        sources: {
           // The url to the tilejson is not public available so we use the tiles array to skip the request, to make use of the tms service. See https://github.com/openlayers/ol-mapbox-style/blob/v8.2.1/src/util.js#L109
          'waterway-planet_eoc': // 'planet_eoc':
          {
            "type": "vector",
            "__Comment": "The url to the tilejson is not public available so we use the tiles array to skip the request, to make use of the tms service. See https://github.com/openlayers/ol-mapbox-style/blob/v8.2.1/src/util.js#L109",
            "url": "",
            "tiles": [
              "https://a.tiles.geoservice.dlr.de/service/tms/1.0.0/planet_eoc@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf?flipy=true",
              "https://b.tiles.geoservice.dlr.de/service/tms/1.0.0/planet_eoc@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf?flipy=true",
              "https://c.tiles.geoservice.dlr.de/service/tms/1.0.0/planet_eoc@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf?flipy=true",
              "https://d.tiles.geoservice.dlr.de/service/tms/1.0.0/planet_eoc@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf?flipy=true"
            ]
          }
        },
        layers: [
          {
            "id": "water",
            "type": "fill",
            "source": "waterway-planet_eoc", // 'planet_eoc',
            "source-layer": "water",
            "filter": [
              "all",
              [
                "==",
                "$type",
                "Polygon"
              ],
              [
                "!=",
                "brunnel",
                "tunnel"
              ]
            ],
            "layout": {
              "visibility": "visible"
            },
            "paint": {
              "fill-antialias": true,
              "fill-color": "hsl(198, 100%, 28%)"
            }
          },
          {
            "id": "waterway",
            "type": "line",
            "source": "waterway-planet_eoc", // 'planet_eoc',
            "source-layer": "waterway",
            "filter": [
              "==",
              "$type",
              "LineString"
            ],
            "layout": {
              "visibility": "visible"
            },
            "paint": {
              "line-color": "hsl(198, 100%, 28%)"
            },
            // ignore set visibility on ukisLayer change
            "metadata": {
              "ukis:ignore-visibility": true,
              "ukis:ignore-opacity": true
            }
          },
          {
            "id": "water_name",
            "type": "symbol",
            "source": "waterway-planet_eoc", // 'planet_eoc',
            "source-layer": "water_name",
            "filter": [
              "==",
              "$type",
              "LineString"
            ],
            "layout": {
              "symbol-placement": "line",
              "symbol-spacing": 500,
              "text-field": "{name:latin}\n{name:nonlatin}",
              "text-font": [
                "Metropolis Medium Italic",
                // "Noto Sans Italic"
              ],
              "text-rotation-alignment": "map",
              "text-size": 12
            },
            "paint": {
              "text-color": "rgb(157,169,177)",
              "text-halo-blur": 1,
              "text-halo-color": "rgb(242,243,240)",
              "text-halo-width": 1
            }
          }
        ]
      }
    });


    const hillshade = new CustomLayer<StyleSpecification>({
      id: 'hillshade_raster_dem',
      name: 'hillshade raster dem',
      visible: false,
      removable: true,
      attribution: `© <a href="https://registry.opendata.aws/terrain-tiles/" target="_blank">AWS Terrain Tiles</a>`,
      custom_layer: {
        version: 8,
        sources: {
          hillshadeSource: {
            "type": "raster-dem",
            "encoding": "terrarium", //"mapbox",
            "tileSize": 512, // 256
            "tiles": [
              // "https://geoservice.dlr.de/eoc/test/wms?service=WMS&version=1.1.0&request=GetMap&layers=test%3ATDM90_DEM_Plus&bbox={bbox-epsg-3857}&width=256&height=256&srs=EPSG:3857&styles=&format=image/png"
              // "https://geoservice.dlr.de/eoc/basemap/gmted/wms?service=WMS&version=1.1.0&request=GetMap&layers=gmted%3Agmted&bbox={bbox-epsg-3857}&width=256&height=256&srs=EPSG:3857&styles=&format=image/png"
              // "https://vtc-cdn.maptoolkit.net/terrainrgb/{z}/{x}/{y}.png"
              "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"
            ],
            minzoom: 3
          }
        },
        layers: [
          {
            id: 'hills',
            type: 'hillshade',
            source: 'hillshadeSource',
            layout: { visibility: 'visible' },
            paint: {
              'hillshade-shadow-color': '#473B24', //'#000000',
              /* 'hillshade-accent-color': '#9b9b9b',
              'hillshade-highlight-color': '#FFFFFF',
              'hillshade-illumination-anchor': 'map',
              'hillshade-illumination-direction': 335, */
            }
          }
        ]
      }
    });

    // https://docs.geoserver.org/latest/en/user/extensions/vectortiles/index.html
    const customTMSGeoserver = new CustomLayer({
      id: 'geoserverCountries',
      name: 'geoserverCountries',
      visible: false,
      removable: true,
      custom_layer: {
        version: 8,
        sources: {
          geoserverCountries: {
            type: 'vector',
            tiles: [
              "http://localhost:8080/geoserver/gwc/service/tms/1.0.0/ne%3Acountries@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf?flipy=true"
            ],
            tileSize: 512
          }
        },
        layers: [
          {
            "id": "geoserverCountries",
            "type": "fill",
            "source": "geoserverCountries",
            "source-layer": "countries", // name of the layer in geoserver
            'filter': [
              "all",
              [
                "!=",
                "NAME", // geoserver Feature Type Details -> Properties
                "Germany"
              ]
            ],
            "layout": {
              "visibility": "visible"
            },
            "paint": {
              "fill-antialias": true,
              "fill-color": "hsl(198, 100%, 28%)"
            }
          },
          {
            "id": "geoserverCountriesLine",
            "type": "line",
            "source": "geoserverCountries",
            "source-layer": "countries",
            'filter': [
              "all",
              [
                "==",
                "NAME", // geoserver Feature Type Details -> Properties
                "Germany"
              ]
            ],
            "layout": {
              "visibility": "visible"
            },
            "paint": {
              "line-color": "hsl(25, 100%, 50%)"
            }
          }
        ]
      }
    });

    const geoJsonLayer = new VectorLayer({
      id: 'geojson_test',
      name: 'GeoJSON Vector Layer',
      attribution: `© DLR GeoJSON`,
      type: 'geojson',
      data: testData,
      bbox: [5.461, 8.631, 53.931, 42.193],
      visible: false
    });


    const wfsLayer = new VectorLayer({
      id: 'WfsLayer',
      name: 'Coastline (WFS)',
      type: 'wfs',
      visible: false,
      url: "https://geoservice.dlr.de/eoc/basemap/wfs?service=WFS&request=GetFeature&outputFormat=application/json&version=1.1.0&srsname=EPSG:4326&typenames=ne:ne_50m_coastline", // &cql_filter=STATE_NAME='Pennsylvania'
    });


    const kmlLayer = new VectorLayer({
      id: 'ID-ukis-kml',
      name: 'TimeZones (KML)',
      type: 'kml',
      data: 'assets/kml/TimeZones.kml',
      visible: false
    });

    const agrodeLayer = new WmsLayer({
      type: 'wms',
      id: 'S2_L3A_WASP_FRC_P1M',
      url: 'https://{s}.geoservice.dlr.de/eoc/imagery/wms',
      name: 'Sentinel-2 L3A FRC (WASP)',
      visible: false,
      subdomains: ['a', 'b', 'c', 'd'],
      filtertype: 'Layers',
      attribution: '&copy; <a href="http://www.dlr.de" target="_blank">DLR</a> Contains modified Copernicus Sentinel Data [2020]',
      params: {
        LAYERS: 'S2_L3A_WASP_FRC_P1M',
        VERSION: '1.1.0',
        FORMAT: 'image/png',
      },
      expanded: {
        tab: 'settings'
      },
      bbox: [2.183, 47.076, 8.206, 49.287],
      styles: [
        {
          default: true,
          legendURL: 'https://geoservice.dlr.de/eoc/imagery/wms?service=WMS&request=GetLegendGraphic&format=image/png&width=20&height=20&layer=land:S2_L3A_WASP_FRC_P1M',
          name: 's2-ndvi',
          title: 'NDVI'
        },
        {
          default: false,
          legendURL: 'https://geoservice.dlr.de/eoc/imagery/wms?service=WMS&request=GetLegendGraphic&format=image/png&width=20&height=20&layer=land:S2_L3A_WASP_FRC_P1M',
          name: 's2-infrared',
          title: 'Infrared (8,4,3)'
        },
        {
          default: false,
          legendURL: 'https://geoservice.dlr.de/eoc/imagery/wms?service=WMS&request=GetLegendGraphic&format=image/png&width=20&height=20&layer=land:S2_L3A_WASP_FRC_P1M',
          name: 's2-l3a-wasp-frc',
          title: 'Style for L3A MAJA/WASP Ground Reflectances'
        }
      ]
    });


    const stackedLayer = new StackedLayer({
      id: 'stackedLayer_id',
      name: 'EocLiteMap And Overlay',
      description: 'merged/stacked Layers EOC Lite with Overlay',
      layers: [eocLiteMap, eocLiteOverlay],
      visible: false
    });

    const groupLayer = new LayerGroup({
      id: 'group_1',
      name: 'Raster Group',
      visible: false,
      layers: [eocBasemap, osm, MODIS_EU_DAILY, hillshade, mosaic_hillshade],
      description: 'This is a group with multiple raster layers',
      expanded: {
        tab: 'description'
      },
      actions: [{ title: 'download', icon: 'download-cloud', action: (group) => { console.log(group); } }]
    });


    const layers = [groupLayer, sentinel2Europe, waterway, wfsLayer, kmlLayer, geoJsonLayer, stackedLayer, agrodeLayer];
    layers.map(l => {
      if (l instanceof Layer) {
        this.layerSvc.addLayer(l, 'Layers');
      } else {
        this.layerSvc.addLayerGroup(l, 'Layers');
      }
    });
  }

  addOverlays() {
    const eocLitemapOverlay = new WmsLayer({
      name: 'EOC Liteoverlay',
      displayName: 'EOC Liteoverlay',
      id: 'eoc_Liteoverlay',
      visible: false,
      type: 'wms',
      removable: false,
      params: {
        LAYERS: 'eoc:liteoverlay',
        FORMAT: 'image/png',
        TRANSPARENT: true
      },
      url: 'https://tiles.geoservice.dlr.de/service/wms',
      attribution: '&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',
      continuousWorld: false,
      legendImg: 'https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Aliteoverlay&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11',
      description: 'This is the liteoverlay provided for EOC Service Portals',
      opacity: 1
    });

    const geonamesCities = new WmsLayer({
      name: 'Geonames cities',
      displayName: 'Geonames cities',
      id: 'gn_cities',
      visible: false,
      type: 'wms',
      removable: false,
      params: {
        LAYERS: 'gn:cities',
        FORMAT: 'image/png',
        TRANSPARENT: true
      },
      url: 'https://geoservice.dlr.de/eoc/basemap/wms',
      attribution: '&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',
      continuousWorld: false,
      legendImg: 'https://geoservice.dlr.de/eoc/basemap/wms?service=WMS&version=1.3.0&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=gn%3Acities',
      opacity: 1
    });

    const admin0countries = new WmsLayer({
      name: 'admin 0 countries',
      displayName: 'admin 0 countries',
      id: 'ne_10m_admin_0_countries',
      visible: false,
      type: 'wms',
      removable: false,
      params: {
        LAYERS: 'ne:ne_10m_admin_0_countries',
        FORMAT: 'image/png',
        TRANSPARENT: true
      },
      url: 'https://geoservice.dlr.de/eoc/basemap/wms',
      attribution: '&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',
      continuousWorld: false,
      legendImg: 'https://geoservice.dlr.de/eoc/basemap/wms?service=WMS&version=1.3.0&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=ne%3Ane_10m_admin_0_countries',
      opacity: 1
    });

    // some of the fonts are not working
    placeLabels.layers.forEach(l => {
      l.source = 'place-labels-planet_eoc';
      if (l?.layout?.['text-font']) {
        l.layout['text-font'] = l.layout['text-font'].filter(i => i !== 'Noto Sans Regular' && i !== 'Noto Sans Italic');
      }
    });
    const labels = new CustomLayer<StyleSpecification>({
      id: 'place-labels-planet_eoc',
      name: 'Place Labels',
      visible: true,
      removable: true,
      custom_layer: {
        version: 8,
        // Use a different source for layers, to improve render quality
        sources: {
          // The url to the tilejson is not public available so we use the tiles array to skip the request, to make use of the tms service. See https://github.com/openlayers/ol-mapbox-style/blob/v8.2.1/src/util.js#L109
          'place-labels-planet_eoc':
          {
            "type": "vector",
            "__Comment": "The url to the tilejson is not public available so we use the tiles array to skip the request, to make use of the tms service. See https://github.com/openlayers/ol-mapbox-style/blob/v8.2.1/src/util.js#L109",
            "url": "",
            "tiles": [
              "https://a.tiles.geoservice.dlr.de/service/tms/1.0.0/planet_eoc@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf?flipy=true",
              "https://b.tiles.geoservice.dlr.de/service/tms/1.0.0/planet_eoc@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf?flipy=true",
              "https://c.tiles.geoservice.dlr.de/service/tms/1.0.0/planet_eoc@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf?flipy=true",
              "https://d.tiles.geoservice.dlr.de/service/tms/1.0.0/planet_eoc@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf?flipy=true"
            ]
          }
        },
        layers: placeLabels.layers as StyleSpecification['layers']
      }
    })

    const overlays = [eocLitemapOverlay, geonamesCities, admin0countries, labels];
    overlays.map(l => this.layerSvc.addLayer(l, 'Overlays'));
  }

  subscribeToMapState() {
    const mapStatSub = this.mapStateSvc.getMapState().subscribe((state) => {
      console.log({ zoom: state.zoom.toString(), center: `${state.center.lat},${state.center.lon}` });
    });
    this.subs.push(mapStatSub);
  }

  updateLayer() {
    const layer = this.layerSvc.getLayerOrGroupById('geojson_test') as unknown as VectorLayer;
    layer.data = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              [
                [
                  11.771870735772268,
                  47.49013323424285
                ],
                [
                  11.771870735772268,
                  47.44101685032831
                ],
                [
                  11.85227430395085,
                  47.44101685032831
                ],
                [
                  11.85227430395085,
                  47.49013323424285
                ],
                [
                  11.771870735772268,
                  47.49013323424285
                ]
              ]
            ],
            "type": "Polygon"
          }
        }
      ]
    };
    this.layerSvc.updateLayer(layer);
  }
  setViewAngle() {
    /** set map rotation with the MapStateService */
    this.mapStateSvc.setViewAngle(45);
  }
  resetViewAngle() {
    /** set map rotation with the MapStateService */
    this.mapStateSvc.setViewAngle(0);
  }
  setRotation() {
    /** set map rotation with the MapStateService */
    this.mapStateSvc.setRotation(90);
  }
  resetRotation() {
    /** set map rotation with the MapStateService, due to the rotation constraint small numbers are snapped to 0 */
    this.mapStateSvc.setRotation(0);
  }

}
