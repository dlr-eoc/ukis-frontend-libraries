import { IOwsContext } from '../src/lib/owc/types/owc-json';


export const barebonesContext: IOwsContext = {
  id: 'test context',
  type: 'FeatureCollection',
  properties: {
    links: {
      profiles: [{
        href: 'http://www.opengis.net/spec/owc-geojson/1.0/req/core'
      }],
    },
    lang: 'de',
    title: 'test context',
    updated: '2018-11-28T00:00:00'
  },
  features: []
};


export const basicContext: IOwsContext = {

  bbox: [
    -13.68441114920683,
    28.779301457662182,
    61.0886988287346,
    64.90858361718878
  ],
  descriptionURL: 'https://code-de.org',
  features: [
    {
      geometry: null,
      id: 'S1_SAR_L1_GRD',
      properties: {
        active: false,
        dimensions: [
          {
            display: 'P1D',
            name: 'time',
            units: 'ISO8601',
            values: '2017-01-01/2017-01-01/P1D'
          }
        ],
        groupName: 'products',
        offerings: [
          {
            code: 'http://www.opengis.net/spec/owc-geojson/1.0/req/wms',
            operations: [
              {
                code: 'GetMap',
                href: 'https://geoservice.code-de.org/Sentinel1/wms?TRANSPARENT=TRUE&LAYERS=S1_SAR_L1_GRD&VERSION=1.1.1&REQUEST=GetMap&TILED=True&FORMAT=image%2Fvnd.jpeg-png&SERVICE=WMS',
                method: 'GET',
                type: 'image/vnd.jpeg-png'
              },
              {
                code: 'GetCapabilities',
                href: 'https://geoservice.code-de.org/Sentinel1/wms?VERSION=1.1.1&REQUEST=GetCapabilities&SERVICE=WMS',
                method: 'GET',
                type: 'application/xml'
              },
              {
                code: 'GetFeatureInfo',
                href: 'https://geoservice.code-de.org/Sentinel1/wms?VERSION=1.1.1&REQUEST=GetFeatureInfo&SERVICE=WMS',
                method: 'GET',
                type: 'text/html'
              }
            ]
          }
        ],
        title: 'Sentinel-1 SAR - Level 1 (Ground Range Detected)',
        updated: '2019-02-15T13:23:28'
      },
      type: 'Feature'
    },
    {
      geometry: null,
      id: 'S2_MSI_L1C',
      properties: {
        active: false,
        dimensions: [
          {
            display: 'P1D',
            name: 'time',
            units: 'ISO8601',
            values: '2017-01-01/2017-01-01/P1D'
          }
        ],
        groupName: 'products',
        offerings: [
          {
            code: 'http://www.opengis.net/spec/owc-geojson/1.0/req/wms',
            operations: [
              {
                code: 'GetMap',
                href: 'https://geoservice.code-de.org/Sentinel2/wms?TRANSPARENT=TRUE&LAYERS=S2_MSI_L1C&VERSION=1.1.1&REQUEST=GetMap&TILED=True&FORMAT=image%2Fvnd.jpeg-png&SERVICE=WMS',
                method: 'GET',
                type: 'image/vnd.jpeg-png'
              },
              {
                code: 'GetCapabilities',
                href: 'https://geoservice.code-de.org/Sentinel2/wms?VERSION=1.1.1&REQUEST=GetCapabilities&SERVICE=WMS',
                method: 'GET',
                type: 'application/xml'
              },
              {
                code: 'GetFeatureInfo',
                href: 'https://geoservice.code-de.org/Sentinel2/wms?VERSION=1.1.1&REQUEST=GetFeatureInfo&SERVICE=WMS',
                method: 'GET',
                type: 'text/html'
              }
            ],
            styles: [
              {
                default: true,
                legendURL: 'http://my/dummy/legendUrl',
                name: 'raster',
                title: 'Raster'
              }
            ]
          }
        ],
        title: 'Sentinel-2 MSI - Level 1C (Top-of-Atmosphere Reflectance)',
        updated: '2019-02-15T13:23:28'
      },
      type: 'Feature'
    },
    {
      geometry: null,
      id: 'S3_OLCI_L2_LAN',
      properties: {
        active: false,
        dimensions: [
          {
            display: 'P1D',
            name: 'time',
            units: 'ISO8601',
            values: '2017-01-01/2017-01-01/P1D'
          }
        ],
        groupName: 'products',
        offerings: [
          {
            code: 'http://www.opengis.net/spec/owc-geojson/1.0/req/wms',
            operations: [
              {
                code: 'GetMap',
                href: 'https://geoservice.code-de.org/Sentinel3/wms?TRANSPARENT=TRUE&LAYERS=S3_OLCI_L2_LAN&VERSION=1.1.1&REQUEST=GetMap&TILED=True&FORMAT=image%2Fvnd.jpeg-png&SERVICE=WMS',
                method: 'GET',
                type: 'image/vnd.jpeg-png'
              },
              {
                code: 'GetCapabilities',
                href: 'https://geoservice.code-de.org/Sentinel3/wms?VERSION=1.1.1&REQUEST=GetCapabilities&SERVICE=WMS',
                method: 'GET',
                type: 'application/xml'
              },
              {
                code: 'GetFeatureInfo',
                href: 'https://geoservice.code-de.org/Sentinel3/wms?VERSION=1.1.1&REQUEST=GetFeatureInfo&SERVICE=WMS',
                method: 'GET',
                type: 'text/html'
              }
            ]
          }
        ],
        title: 'Sentinel-3 OLCI - Level 2 Land Product',
        updated: '2019-02-15T13:23:28'
      },
      type: 'Feature'
    },
    {
      geometry: null,
      id: 'S3_OLCI_L1',
      properties: {
        active: false,
        dimensions: [
          {
            display: 'P1D',
            name: 'time',
            units: 'ISO8601',
            values: '2017-01-01/2017-01-01/P1D'
          }
        ],
        groupName: 'products',
        offerings: [
          {
            code: 'http://www.opengis.net/spec/owc-geojson/1.0/req/wms',
            operations: [
              {
                code: 'GetMap',
                href: 'https://geoservice.code-de.org/Sentinel3/wms?TRANSPARENT=TRUE&LAYERS=S3_OLCI_L1&VERSION=1.1.1&REQUEST=GetMap&TILED=True&FORMAT=image%2Fvnd.jpeg-png&SERVICE=WMS',
                method: 'GET',
                type: 'image/vnd.jpeg-png'
              },
              {
                code: 'GetCapabilities',
                href: 'https://geoservice.code-de.org/Sentinel3/wms?VERSION=1.1.1&REQUEST=GetCapabilities&SERVICE=WMS',
                method: 'GET',
                type: 'application/xml'
              },
              {
                code: 'GetFeatureInfo',
                href: 'https://geoservice.code-de.org/Sentinel3/wms?VERSION=1.1.1&REQUEST=GetFeatureInfo&SERVICE=WMS',
                method: 'GET',
                type: 'text/html'
              }
            ]
          }
        ],
        title: 'Sentinel-3 OLCI - Level 1B Top-of-Atmosphere Radiance',
        updated: '2019-02-15T13:23:28'
      },
      type: 'Feature'
    }
  ],
  id: 'codede:sentinel:3035',
  logoURL: 'https://geoservice.dlr.de/static/logos/dlr.gif',
  projections: [
    {
      bbox: [
        2000000.0,
        1000000.0,
        6500000.0,
        5500000.0
      ],
      code: 'EPSG:3035',
      default: true,
      unit: 'm'
    }
  ],
  properties: {
    abstract: '<strong>CODE-DE</strong> Sentinel1 and 2',
    author: 'Geoservice Manager',
    authors: [
      {
        email: 'geoservice@dlr.de',
        name: 'Geoservice Manager',
        role: 'PoC'
      }
    ],
    categories: [
      {
        term: 'WMS'
      },
      {
        term: 'DLR'
      }
    ],
    lang: 'en',
    layerGroups: [
      {
        collapsed: false,
        groupName: 'products',
        title: 'Products',
        type: 'checkbox'
      },
      {
        collapsed: false,
        groupName: 'overlays',
        title: 'Overlays',
        type: 'checkbox'
      },
      {
        collapsed: false,
        groupName: 'base',
        title: 'Basemaps',
        type: 'radio'
      }
    ],
    links: null,
    publisher: 'German Aerospace Center (DLR)',
    title: 'CODE-DE Sentinel 1 and 2 (EPSG:3035)',
    updated: '2019-02-15T13:23:28'
  },
  type: 'FeatureCollection'
};


export const zoomedContext: IOwsContext = {
  id: 'zoomed context',
  type: 'FeatureCollection',
  properties: {
    links: {
      profiles: [{
        href: 'http://www.opengis.net/spec/owc-geojson/1.0/req/core'
      }],
    },
    lang: 'en',
    title: 'zoomed context',
    updated: '2018-11-28T00:00:00'
  },
  features: [{
    geometry: null,
    id: 'RESA_L3M_GERMANY_2015',
    properties: {
      active: true,
      minscaledenominator: 1000,
      maxscaledenominator: 100000,
      offerings: [{
        code: 'http://www.opengis.net/spec/owc-geojson/1.0/req/wms',
        operations: [
          {
            code: 'GetMap',
            href: 'https://geoservice.dlr.de/eoc/imagery/wms?VERSION=1.1.0&REQUEST=GetMap&LAYERS=RESA_L3M_GERMANY_2015&TILED=False&FORMAT=image%2Fvnd.jpeg-png&SERVICE=WMS&TRANSPARENT=TRUE',
            method: 'GET',
            type: 'image/vnd.jpeg-png'
          },
          {
            code: 'GetCapabilities',
            href: 'https://geoservice.dlr.de/eoc/imagery/wms?VERSION=1.1.0&REQUEST=GetCapabilities&SERVICE=WMS',
            method: 'GET',
            type: 'application/xml'
          },
          {
            code: 'GetFeatureInfo',
            href: 'https://geoservice.dlr.de/eoc/imagery/wms?VERSION=1.1.0&REQUEST=GetFeatureInfo&SERVICE=WMS',
            method: 'GET',
            type: 'text/html'
          }
        ]
      }],
      opacity: 1.0,
      title: 'This should be an overlay',
      updated: '2019-02-15T11:21:59',
      folder: 'Overlays'
    },
    type: 'Feature'
  }]
};

export const exampleContext: IOwsContext = {

  bbox: [
    3.797648356603374,
    46.38508762530201,
    18.135928552479946,
    55.24338464819807
  ],
  descriptionURL: 'https://resa.planet.com/',
  features: [
    {
      geometry: null,
      id: 'RESA_L3M_GERMANY_2015',
      properties: {
        active: false,
        groupName: 'products',
        offerings: [
          {
            code: 'http://www.opengis.net/spec/owc-geojson/1.0/req/wms',
            operations: [
              {
                code: 'GetMap',
                href: 'https://geoservice.dlr.de/eoc/imagery/wms?VERSION=1.1.0&REQUEST=GetMap&LAYERS=RESA_L3M_GERMANY_2015&TILED=False&FORMAT=image%2Fvnd.jpeg-png&SERVICE=WMS&TRANSPARENT=TRUE',
                method: 'GET',
                type: 'image/vnd.jpeg-png'
              },
              {
                code: 'GetCapabilities',
                href: 'https://geoservice.dlr.de/eoc/imagery/wms?VERSION=1.1.0&REQUEST=GetCapabilities&SERVICE=WMS',
                method: 'GET',
                type: 'application/xml'
              },
              {
                code: 'GetFeatureInfo',
                href: 'https://geoservice.dlr.de/eoc/imagery/wms?VERSION=1.1.0&REQUEST=GetFeatureInfo&SERVICE=WMS',
                method: 'GET',
                type: 'text/html'
              }
            ],
            styles: [
              {
                default: true,
                legendURL: 'http://my/dummy/legendUrl',
                name: 'raster',
                title: 'raster'
              }
            ]
          }
        ],
        title: 'RapidEye RESA - L3M Mosaic - Germany, 2015',
        updated: '2019-02-15T11:22:07'
      },
      type: 'Feature'
    },
    {
      geometry: null,
      id: 'vectortile',
      properties: {
        active: true,
        minZoom: 1,
        maxZoom: 10,
        offerings: [
          {
            code: 'http://www.opengis.net/spec/owc-geojson/1.0/req/tms',
            operations: [
              {
                code: 'GetTiles',
                href: 'https://tiles.geotest.eoc.dlr.de/service/tms/1.0.0/planet_eoc@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf?flipy=true',
                method: 'GET'
              }
            ],
            styles: [{
              name: 'geotest_xyz_planet_eoc',
              title: 'grayscale',
              abstract: 'This is a slightly modified version of Positron style @see: https://github.com/openmaptiles/positron-gl-style/blob/master/LICENSE.md',
              content: {
                type: 'mapbox-style',
                'mapbox-source-key': 'geotest_xyz_planet_eoc',
                content: `{"version":8,"name":"Positron","metadata":{"mapbox:autocomposite":false,"mapbox:groups":{"101da9f13b64a08fa4b6ac1168e89e5f":{"collapsed":false,"name":"Places"},"a14c9607bc7954ba1df7205bf660433f":{"name":"Boundaries"},"b6371a3f2f5a9932464fa3867530a2e5":{"collapsed":false,"name":"Transportation"}},"mapbox:type":"template","openmaptiles:mapbox:owner":"openmaptiles","openmaptiles:mapbox:source:url":"mapbox:\/\/openmaptiles.4qljc88t","openmaptiles:version":"3.x","maputnik:renderer":"mbgljs","maputnik:thunderforest_access_token":""},"sources":{"geotest_xyz_planet_eoc":{"type":"vector","url":"https:\/\/pyxis.eoc.dlr.de\/tileserver\/planet0-12.json"}},"sprite":"https:\/\/openmaptiles.github.io\/positron-gl-style\/sprite","glyphs":"https:\/\/api.maptiler.com\/fonts\/{fontstack}\/{range}.pbf?key={key}","layers":[{"id":"background","type":"background","paint":{"background-color":"rgb(242,243,240)"}},{"id":"park","type":"fill","source":"geotest_xyz_planet_eoc","source-layer":"park","filter":["==","$type","Polygon"],"layout":{"visibility":"none"},"paint":{"fill-color":"rgb(230, 233, 229)"}},{"id":"water","type":"fill","source":"geotest_xyz_planet_eoc","source-layer":"water","filter":["all",["==","$type","Polygon"],["!=","brunnel","tunnel"]],"layout":{"visibility":"visible"},"paint":{"fill-antialias":true,"fill-color":"rgba(196, 203, 205, 1)"}},{"id":"landcover_ice_shelf","type":"fill","source":"geotest_xyz_planet_eoc","source-layer":"landcover","maxzoom":8,"filter":["all",["==","$type","Polygon"],["==","subclass","ice_shelf"]],"layout":{"visibility":"visible"},"paint":{"fill-color":"hsl(0, 0%, 98%)","fill-opacity":0.7}},{"id":"landcover_glacier","type":"fill","source":"geotest_xyz_planet_eoc","source-layer":"landcover","maxzoom":8,"filter":["all",["==","$type","Polygon"],["==","subclass","glacier"]],"layout":{"visibility":"visible"},"paint":{"fill-color":"hsl(0, 0%, 98%)","fill-opacity":{"base":1,"stops":[[0,1],[8,0.5]]}}},{"id":"landuse_residential","type":"fill","source":"geotest_xyz_planet_eoc","source-layer":"landuse","minzoom":0,"maxzoom":24,"filter":["all",["==","$type","Polygon"],["==","class",""]],"layout":{"visibility":"visible"},"paint":{"fill-color":"rgb(234, 234, 230)","fill-opacity":{"base":0.6,"stops":[[8,0.8],[9,0.6]]}}},{"id":"landcover_wood","type":"fill","source":"geotest_xyz_planet_eoc","source-layer":"landcover","minzoom":10,"filter":["all",["==","$type","Polygon"],["==","class","wood"]],"layout":{"visibility":"none"},"paint":{"fill-color":"rgb(220,224,220)","fill-opacity":{"base":1,"stops":[[8,0],[12,1]]}}},{"id":"waterway","type":"line","source":"geotest_xyz_planet_eoc","source-layer":"waterway","filter":["==","$type","LineString"],"layout":{"visibility":"visible"},"paint":{"line-color":"hsl(195, 17%, 78%)"}},{"id":"water_name","type":"symbol","source":"geotest_xyz_planet_eoc","source-layer":"water_name","filter":["==","$type","LineString"],"layout":{"symbol-placement":"line","symbol-spacing":500,"text-field":"{name:latin}{name:nonlatin}","text-font":["Metropolis Medium Italic","Noto Sans Italic"],"text-rotation-alignment":"map","text-size":12},"paint":{"text-color":"rgb(157,169,177)","text-halo-blur":1,"text-halo-color":"rgb(242,243,240)","text-halo-width":1}},{"id":"building","type":"fill","source":"geotest_xyz_planet_eoc","source-layer":"building","minzoom":12,"paint":{"fill-antialias":true,"fill-color":"rgb(234, 234, 229)","fill-outline-color":"rgb(219, 219, 218)"}},{"id":"tunnel_motorway_casing","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":6,"filter":["all",["==","$type","LineString"],["all",["==","brunnel","tunnel"],["==","class","motorway"]]],"layout":{"line-cap":"butt","line-join":"miter","visibility":"visible"},"paint":{"line-color":"rgb(213, 213, 213)","line-opacity":1,"line-width":{"base":1.4,"stops":[[5.8,0],[6,3],[20,40]]}}},{"id":"tunnel_motorway_inner","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":6,"filter":["all",["==","$type","LineString"],["all",["==","brunnel","tunnel"],["==","class","motorway"]]],"layout":{"line-cap":"round","line-join":"round","visibility":"visible"},"paint":{"line-color":"rgb(234,234,234)","line-width":{"base":1.4,"stops":[[4,2],[6,1.3],[20,30]]}}},{"id":"aeroway-taxiway","type":"line","metadata":{"mapbox:group":"1444849345966.4436"},"source":"geotest_xyz_planet_eoc","source-layer":"aeroway","minzoom":12,"filter":["all",["in","class","taxiway"]],"layout":{"line-cap":"round","line-join":"round","visibility":"visible"},"paint":{"line-color":"hsl(0, 0%, 88%)","line-opacity":1,"line-width":{"base":1.55,"stops":[[13,1.8],[20,20]]}}},{"id":"aeroway-runway-casing","type":"line","metadata":{"mapbox:group":"1444849345966.4436"},"source":"geotest_xyz_planet_eoc","source-layer":"aeroway","minzoom":11,"filter":["all",["in","class","runway"]],"layout":{"line-cap":"round","line-join":"round","visibility":"visible"},"paint":{"line-color":"hsl(0, 0%, 88%)","line-opacity":1,"line-width":{"base":1.5,"stops":[[11,6],[17,55]]}}},{"id":"aeroway-area","type":"fill","metadata":{"mapbox:group":"1444849345966.4436"},"source":"geotest_xyz_planet_eoc","source-layer":"aeroway","minzoom":4,"filter":["all",["==","$type","Polygon"],["in","class","runway","taxiway"]],"layout":{"visibility":"visible"},"paint":{"fill-color":"rgba(255, 255, 255, 1)","fill-opacity":{"base":1,"stops":[[13,0],[14,1]]}}},{"id":"aeroway-runway","type":"line","metadata":{"mapbox:group":"1444849345966.4436"},"source":"geotest_xyz_planet_eoc","source-layer":"aeroway","minzoom":11,"filter":["all",["in","class","runway"],["==","$type","LineString"]],"layout":{"line-cap":"round","line-join":"round","visibility":"visible"},"paint":{"line-color":"rgba(255, 255, 255, 1)","line-opacity":1,"line-width":{"base":1.5,"stops":[[11,4],[17,50]]}}},{"id":"road_area_pier","type":"fill","metadata":{},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","filter":["all",["==","$type","Polygon"],["==","class","pier"]],"layout":{"visibility":"visible"},"paint":{"fill-antialias":true,"fill-color":"rgb(242,243,240)"}},{"id":"road_pier","type":"line","metadata":{},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","filter":["all",["==","$type","LineString"],["in","class","pier"]],"layout":{"line-cap":"round","line-join":"round","visibility":"visible"},"paint":{"line-color":"rgb(242,243,240)","line-width":{"base":1.2,"stops":[[15,1],[17,4]]}}},{"id":"highway_path","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","filter":["all",["==","$type","LineString"],["==","class","path"]],"layout":{"line-cap":"round","line-join":"round","visibility":"visible"},"paint":{"line-color":"rgba(238, 235, 235, 1)","line-opacity":0.9,"line-width":{"base":1.2,"stops":[[13,1],[20,10]]}}},{"id":"highway_minor","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":8,"filter":["all",["==","$type","LineString"],["in","class","minor","service","track"]],"layout":{"line-cap":"round","line-join":"round","visibility":"visible"},"paint":{"line-color":"rgba(245, 244, 244, 1)","line-opacity":0.9,"line-width":{"base":1.55,"stops":[[13,1.8],[20,20]]}}},{"id":"highway_major_casing","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":11,"filter":["all",["==","$type","LineString"],["in","class","primary","secondary","tertiary","trunk"]],"layout":{"line-cap":"butt","line-join":"miter","visibility":"visible"},"paint":{"line-color":"rgb(213, 213, 213)","line-dasharray":[12,0],"line-width":{"base":1.3,"stops":[[10,3],[20,23]]}}},{"id":"highway_major_inner","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":11,"filter":["all",["==","$type","LineString"],["in","class","primary","secondary","tertiary","trunk"]],"layout":{"line-cap":"round","line-join":"round","visibility":"visible"},"paint":{"line-color":"#fff","line-width":{"base":1.3,"stops":[[10,2],[20,20]]}}},{"id":"highway_motorway_casing","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":6,"filter":["all",["==","$type","LineString"],["all",["!in","brunnel","bridge","tunnel"],["==","class","motorway"]]],"layout":{"line-cap":"butt","line-join":"miter","visibility":"visible"},"paint":{"line-color":"rgb(213, 213, 213)","line-dasharray":[2,0],"line-opacity":1,"line-width":{"base":1.4,"stops":[[5.8,0],[6,3],[20,40]]}}},{"id":"highway_motorway_inner","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":6,"filter":["all",["==","$type","LineString"],["all",["!in","brunnel","bridge","tunnel"],["==","class","motorway"]]],"layout":{"line-cap":"round","line-join":"round","visibility":"visible"},"paint":{"line-color":{"base":1,"stops":[[5.8,"hsla(0, 0%, 85%, 0.53)"],[6,"#fff"]]},"line-width":{"base":1.4,"stops":[[4,2],[6,1.3],[20,30]]}}},{"id":"highway_motorway_subtle","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":6,"maxzoom":9,"filter":["all",["==","$type","LineString"],["==","class","motorway"]],"layout":{"line-cap":"round","line-join":"round","visibility":"visible"},"paint":{"line-color":"hsla(0, 0%, 85%, 0.53)","line-width":{"base":1.4,"stops":[[4,2],[6,1.3]]}}},{"id":"railway_transit","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":16,"filter":["all",["==","$type","LineString"],["all",["==","class","transit"],["!in","brunnel","tunnel"]]],"layout":{"line-join":"round","visibility":"visible"},"paint":{"line-color":"#dddddd","line-width":3}},{"id":"railway_transit_dashline","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":16,"filter":["all",["==","$type","LineString"],["all",["==","class","transit"],["!in","brunnel","tunnel"]]],"layout":{"line-join":"round","visibility":"visible"},"paint":{"line-color":"#fafafa","line-dasharray":[3,3],"line-width":2}},{"id":"railway_service","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":16,"filter":["all",["==","$type","LineString"],["all",["==","class","rail"],["has","service"]]],"layout":{"line-join":"round","visibility":"visible"},"paint":{"line-color":"#dddddd","line-width":3}},{"id":"railway_service_dashline","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":16,"filter":["all",["==","$type","LineString"],["==","class","rail"],["has","service"]],"layout":{"line-join":"round","visibility":"visible"},"paint":{"line-color":"#fafafa","line-dasharray":[3,3],"line-width":2}},{"id":"railway","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":13,"filter":["all",["==","$type","LineString"],["all",["!has","service"],["==","class","rail"]]],"layout":{"line-join":"round","visibility":"visible"},"paint":{"line-color":"#dddddd","line-width":{"base":1.3,"stops":[[16,3],[20,7]]}}},{"id":"railway_dashline","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":13,"filter":["all",["==","$type","LineString"],["all",["!has","service"],["==","class","rail"]]],"layout":{"line-join":"round","visibility":"visible"},"paint":{"line-color":"#fafafa","line-dasharray":[3,3],"line-width":{"base":1.3,"stops":[[16,2],[20,6]]}}},{"id":"highway_motorway_bridge_casing","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":6,"filter":["all",["==","$type","LineString"],["all",["==","brunnel","bridge"],["==","class","motorway"]]],"layout":{"line-cap":"butt","line-join":"miter","visibility":"visible"},"paint":{"line-color":"rgb(213, 213, 213)","line-dasharray":[2,0],"line-opacity":1,"line-width":{"base":1.4,"stops":[[5.8,0],[6,5],[20,45]]}}},{"id":"highway_motorway_bridge_inner","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":6,"filter":["all",["==","$type","LineString"],["all",["==","brunnel","bridge"],["==","class","motorway"]]],"layout":{"line-cap":"round","line-join":"round","visibility":"visible"},"paint":{"line-color":{"base":1,"stops":[[5.8,"hsla(0, 0%, 85%, 0.53)"],[6,"#fff"]]},"line-width":{"base":1.4,"stops":[[4,2],[6,1.3],[20,30]]}}},{"id":"highway_name_other","type":"symbol","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation_name","filter":["all",["!=","class","motorway"],["==","$type","LineString"]],"layout":{"symbol-placement":"line","symbol-spacing":350,"text-field":"{name:latin} {name:nonlatin}","text-font":["Metropolis Regular","Noto Sans Regular"],"text-max-angle":30,"text-pitch-alignment":"viewport","text-rotation-alignment":"map","text-size":10,"text-transform":"uppercase","visibility":"visible"},"paint":{"text-color":"#bbb","text-halo-blur":1,"text-halo-color":"#fff","text-halo-width":2,"text-translate":[0,0]}},{"id":"highway_name_motorway","type":"symbol","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation_name","minzoom":9,"filter":["all",["==","$type","LineString"],["==","class","motorway"]],"layout":{"symbol-placement":"line","symbol-spacing":350,"text-field":"{ref}","text-font":["Metropolis Light","Noto Sans Regular"],"text-pitch-alignment":"viewport","text-rotation-alignment":"viewport","text-size":10,"visibility":"visible"},"paint":{"text-color":"rgb(117, 129, 145)","text-halo-blur":1,"text-halo-color":"hsl(0, 0%, 100%)","text-halo-width":1,"text-translate":[0,2]}},{"id":"boundary_state","type":"line","metadata":{"mapbox:group":"a14c9607bc7954ba1df7205bf660433f"},"source":"geotest_xyz_planet_eoc","source-layer":"boundary","filter":["==","admin_level",4],"layout":{"line-cap":"round","line-join":"round","visibility":"none"},"paint":{"line-blur":0.4,"line-color":"rgb(230, 204, 207)","line-dasharray":[2,2],"line-opacity":1,"line-width":{"base":1.3,"stops":[[3,1],[22,15]]}}},{"id":"boundary_country_z0-4","type":"line","metadata":{"mapbox:group":"a14c9607bc7954ba1df7205bf660433f"},"source":"geotest_xyz_planet_eoc","source-layer":"boundary","maxzoom":5,"filter":["all",["==","admin_level",2],["!has","claimed_by"]],"layout":{"line-cap":"round","line-join":"round"},"paint":{"line-blur":{"base":1,"stops":[[0,0.4],[22,4]]},"line-color":"rgba(181, 170, 171, 1)","line-opacity":1,"line-width":{"base":1.1,"stops":[[3,1],[22,20]]}}},{"id":"boundary_country_z5-","type":"line","metadata":{"mapbox:group":"a14c9607bc7954ba1df7205bf660433f"},"source":"geotest_xyz_planet_eoc","source-layer":"boundary","minzoom":5,"filter":["==","admin_level",2],"layout":{"line-cap":"round","line-join":"round"},"paint":{"line-blur":{"base":1,"stops":[[0,0.4],[22,4]]},"line-color":"rgba(181, 170, 171, 1)","line-opacity":1,"line-width":{"base":1.1,"stops":[[3,1],[22,20]]}}},{"id":"place_suburb","type":"symbol","metadata":{"mapbox:group":"101da9f13b64a08fa4b6ac1168e89e5f"},"source":"geotest_xyz_planet_eoc","source-layer":"place","minzoom":9,"maxzoom":15,"filter":["all",["==","$type","Point"],["==","class","suburb"]],"layout":{"text-anchor":"center","text-field":"{name:latin}{name:nonlatin}","text-font":["Metropolis Regular","Noto Sans Regular"],"text-justify":"center","text-offset":[0.5,0],"text-size":10,"text-transform":"uppercase","visibility":"visible"},"paint":{"text-color":"rgb(117, 129, 145)","text-halo-blur":1,"text-halo-color":"rgb(242,243,240)","text-halo-width":1}},{"id":"place_village","type":"symbol","metadata":{"mapbox:group":"101da9f13b64a08fa4b6ac1168e89e5f"},"source":"geotest_xyz_planet_eoc","source-layer":"place","minzoom":11,"maxzoom":24,"filter":["all",["==","$type","Point"],["==","class","village"]],"layout":{"icon-size":0.4,"text-anchor":"left","text-field":"{name:latin}{name:nonlatin}","text-font":["Metropolis Regular","Noto Sans Regular"],"text-justify":"left","text-offset":[0.5,0.2],"text-size":10,"text-transform":"uppercase","visibility":"visible"},"paint":{"icon-opacity":0.7,"text-color":"rgb(117, 129, 145)","text-halo-blur":1,"text-halo-color":"rgb(242,243,240)","text-halo-width":1}},{"id":"place_town","type":"symbol","metadata":{"mapbox:group":"101da9f13b64a08fa4b6ac1168e89e5f"},"source":"geotest_xyz_planet_eoc","source-layer":"place","minzoom":9,"maxzoom":15,"filter":["all",["==","$type","Point"],["==","class","town"]],"layout":{"icon-image":{"base":1,"stops":[[0,"circle-11"],[8,""]]},"icon-size":0.4,"text-anchor":{"base":1,"stops":[[0,"left"],[8,"center"]]},"text-field":"{name:latin}{name:nonlatin}","text-font":["Metropolis Regular","Noto Sans Regular"],"text-justify":"left","text-offset":[0.5,0.2],"text-size":10,"text-transform":"uppercase","visibility":"visible"},"paint":{"icon-opacity":0.7,"text-color":"rgb(117, 129, 145)","text-halo-blur":1,"text-halo-color":"rgb(242,243,240)","text-halo-width":1}},{"id":"place_city","type":"symbol","metadata":{"mapbox:group":"101da9f13b64a08fa4b6ac1168e89e5f"},"source":"geotest_xyz_planet_eoc","source-layer":"place","minzoom":7,"maxzoom":14,"filter":["all",["==","$type","Point"],["all",["!=","capital",2],["==","class","city"],[">","rank",3]]],"layout":{"icon-image":{"base":1,"stops":[[0,"circle-11"],[8,""]]},"icon-size":0.4,"text-anchor":{"base":1,"stops":[[0,"left"],[8,"center"]]},"text-field":"{name:latin}{name:nonlatin}","text-font":["Metropolis Regular","Noto Sans Regular"],"text-justify":"left","text-offset":[0.5,0.2],"text-size":10,"text-transform":"uppercase","visibility":"visible"},"paint":{"icon-opacity":0.7,"text-color":"rgb(117, 129, 145)","text-halo-blur":1,"text-halo-color":"rgb(242,243,240)","text-halo-width":1}},{"id":"place_capital","type":"symbol","metadata":{"mapbox:group":"101da9f13b64a08fa4b6ac1168e89e5f"},"source":"geotest_xyz_planet_eoc","source-layer":"place","minzoom":3,"maxzoom":12,"filter":["all",["==","$type","Point"],["all",["==","capital",2],["==","class","city"]]],"layout":{"icon-image":{"base":1,"stops":[[0,"circle-11"],[8,""]]},"text-anchor":{"base":1,"stops":[[0,"left"],[8,"center"]]},"text-field":"{name:latin}{name:nonlatin}","text-font":["Metropolis Regular","Noto Sans Regular"],"text-justify":"left","text-offset":[0.5,0.2],"text-transform":"uppercase","visibility":"visible","text-size":14,"icon-size":0},"paint":{"icon-opacity":0.7,"text-color":"rgb(117, 129, 145)","text-halo-blur":1,"text-halo-color":"rgb(242,243,240)","text-halo-width":1}},{"id":"place_city_large","type":"symbol","metadata":{"mapbox:group":"101da9f13b64a08fa4b6ac1168e89e5f"},"source":"geotest_xyz_planet_eoc","source-layer":"place","minzoom":4,"maxzoom":12,"filter":["all",["==","$type","Point"],["all",["!=","capital",2],["<=","rank",3],["==","class","city"]]],"layout":{"icon-image":{"base":1,"stops":[[0,"circle-11"],[8,""]]},"icon-size":0.4,"text-anchor":{"base":1,"stops":[[0,"left"],[8,"center"]]},"text-field":"{name:latin}{name:nonlatin}","text-font":["Metropolis Regular","Noto Sans Regular"],"text-justify":"left","text-offset":[0.5,0.2],"text-size":14,"text-transform":"uppercase","visibility":"visible"},"paint":{"icon-opacity":0.7,"text-color":"rgb(117, 129, 145)","text-halo-blur":1,"text-halo-color":"rgb(242,243,240)","text-halo-width":1}},{"id":"place_state","type":"symbol","metadata":{"mapbox:group":"101da9f13b64a08fa4b6ac1168e89e5f"},"source":"geotest_xyz_planet_eoc","source-layer":"place","maxzoom":12,"filter":["all",["==","$type","Point"],["==","class","state"]],"layout":{"text-field":"{name:latin}{name:nonlatin}","text-font":["Metropolis Regular","Noto Sans Regular"],"text-size":10,"text-transform":"uppercase","visibility":"visible"},"paint":{"text-color":"rgb(113, 129, 144)","text-halo-blur":1,"text-halo-color":"rgb(242,243,240)","text-halo-width":1}},{"id":"place_country_other","type":"symbol","metadata":{"mapbox:group":"101da9f13b64a08fa4b6ac1168e89e5f"},"source":"geotest_xyz_planet_eoc","source-layer":"place","maxzoom":8,"filter":["all",["==","$type","Point"],["==","class","country"],["!has","iso_a2"]],"layout":{"text-field":"{name:latin}","text-font":["Metropolis Light Italic","Noto Sans Italic"],"text-size":{"base":1,"stops":[[0,9],[6,11]]},"text-transform":"uppercase","visibility":"visible"},"paint":{"text-color":{"base":1,"stops":[[3,"rgb(157,169,177)"],[4,"rgb(153, 153, 153)"]]},"text-halo-color":"rgba(236,236,234,0.7)","text-halo-width":1.4}},{"id":"place_country_minor","type":"symbol","metadata":{"mapbox:group":"101da9f13b64a08fa4b6ac1168e89e5f"},"source":"geotest_xyz_planet_eoc","source-layer":"place","maxzoom":8,"filter":["all",["==","$type","Point"],["==","class","country"],[">=","rank",2],["has","iso_a2"]],"layout":{"text-field":"{name:latin}","text-font":["Metropolis Regular","Noto Sans Regular"],"text-size":{"base":1,"stops":[[0,10],[6,12]]},"text-transform":"uppercase","visibility":"visible"},"paint":{"text-color":{"base":1,"stops":[[3,"rgb(157,169,177)"],[4,"rgb(153, 153, 153)"]]},"text-halo-color":"rgba(236,236,234,0.7)","text-halo-width":1.4}},{"id":"place_country_major","type":"symbol","metadata":{"mapbox:group":"101da9f13b64a08fa4b6ac1168e89e5f"},"source":"geotest_xyz_planet_eoc","source-layer":"place","maxzoom":6,"filter":["all",["==","$type","Point"],["<=","rank",1],["==","class","country"],["has","iso_a2"]],"layout":{"text-anchor":"center","text-field":"{name:latin}","text-font":["Metropolis Regular","Noto Sans Regular"],"text-size":{"base":1.4,"stops":[[0,10],[3,12],[4,14]]},"text-transform":"uppercase","visibility":"visible"},"paint":{"text-color":{"base":1,"stops":[[3,"rgb(157,169,177)"],[4,"rgb(153, 153, 153)"]]},"text-halo-color":"rgba(236,236,234,0.7)","text-halo-width":1.4}}],"id":"positron"}`
              }
            }]
          }
        ],
        opacity: 1.0,
        title: 'This should be an overlay',
        updated: '2019-02-15T11:21:59',
        rights: '© OpenMapTiles © OpenStreetMap contributors',
        folder: 'Overlays'
      },
      type: 'Feature'
    },{
      "id": "OffshoreWindParks:wind turbines",
      "properties": {
          "title": "wind turbines",
          "updated": null,
          "links": null,
          "offerings": [
              {
                  "code": "http://www.opengis.net/spec/owc-geojson/1.0/req/wfs",
                  "operations": [
                      {
                          "code": "GetFeature",
                          "method": "GET",
                          "type": "application/json",
                          "href": "https://someTestServer.de/geoserver/OffshoreWindParks/wfs?service=WFS&version=1.1.0&request=GetFeature&outputFormat=application/json&typeName=wind%20turbines"
                      }
                  ]
              }
          ],
          "opacity": 1,
          "categories": [],
          "download": {
              "href": "",
              "status": "403"
          },
          "customAttributes": {
              "categoryIds": [
                   "features","global_owt_"
              ],
              "previewUrl": "",
              "endDate": "not a temporal data set",
              "description": "wind turbines detected from Sentinel-1 using a deep learning approach",
              "type": "polygon",
              "startDate": "not a temporal data set"
          }
      },
      "type": "Feature",
      "geometry": null,
      "bbox": [
          -71.5402563310422,
          9.20713003232199,
          126.34360664519528,
          61.646203287709156
      ]
  }
  ],
  id: 'de:resa:mosaic',
  logoURL: 'https://geoservice.dlr.de/static/logos/planet_dlr_logo.png',
  previewURL: '/data/owc/images/map-preview-de_resa_mosaic.jpg',
  projections: [
    {
      bbox: [
        100000.0,
        5150000.0,
        1080000.0,
        6160000.0
      ],
      code: 'EPSG:25832',
      default: true,
      unit: 'm'
    }
  ],
  properties: {
    abstract: '<p>The RapidEye RESA Germany Mosaic provides a nearly cloud-free view of the country\'s geography, natural resources, and infrastructure. It is composed of 374,240 sqkm of multi-spectral RapidEye imagery, acquired between April and October 2015. The\n      product is being provided in the framework of the RapidEye Science Archive (RESA) agreement. Co-funded by the German Federal Government, the fleet of RapidEye satellites were launched from the Baikonur cosmodrome in Kazakhstan in 2008. The satellites\n      are now owned by Planet Labs, Inc. The RapidEye Earth observation system comprises five satellites equipped with high-resolution optical sensors. With a spatial resolution of 6.5 m the 5-band instruments operate in the visible and near-infrared\n      portions of the electromagnetic spectrum. With its high repetition rate the RapidEye constellation can image each point on the Earth\'s at least once per day.<p>\n      <p>For more information see the <a href="http://www.dlr.de/rd/en/desktopdefault.aspx/tabid-2440/3586_read-5336/">DLR Earth Observation projects page</a> or the <a href="https://www.planet.com/products/planet-imagery/">Planet Website</a>.<p>',
    author: 'Geoservice Manager',
    authors: [
      {
        email: 'geoservice@dlr.de',
        name: 'Geoservice Manager',
        role: 'PoC'
      }
    ],
    categories: [
      {
        term: 'DLR'
      },
      {
        term: 'Planet'
      },
      {
        term: 'RapidEye'
      },
      {
        term: 'Germany'
      },
      {
        term: 'RESA'
      },
      {
        term: 'Mosaic'
      },
      {
        term: '2015'
      },
      {
        term: 'Orthoimagery'
      }
    ],
    lang: 'en',
    layerGroups: [
      {
        collapsed: false,
        groupName: 'products',
        title: 'Products',
        type: 'checkbox'
      },
      {
        collapsed: false,
        groupName: 'overlays',
        title: 'Overlays',
        type: 'checkbox'
      },
      {
        collapsed: false,
        groupName: 'base',
        title: 'Basemaps',
        type: 'radio'
      }
    ],
    links: null,
    publisher: 'German Aerospace Center (DLR)',
    title: 'RapidEye RESA - L3M Mosaic - Germany',
    updated: '2019-02-15T11:22:07'
  },
  type: 'FeatureCollection'
};

