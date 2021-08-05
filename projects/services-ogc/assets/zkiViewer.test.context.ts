import { IOwsContext } from '../src/lib/owc/types/owc-json';


export const zkiViewerContext: IOwsContext = {
  "$schema": "https://raw.githubusercontent.com/opengeospatial/owscontext/master/json/dev/validation/owc-schema.json",
  "type": "FeatureCollection",
  "bbox": [
    6.433,
    50.483,
    6.905,
    50.661
  ],
  "projections": [
    {
      "code": "EPSG:4326",
      "unit": "degrees"
    }
  ],
  "legendURL": "",
  "descriptionURL": "",
  "id": "Eifel",
  "properties": {
    "title": "Storms and heavy rain cause floods in Western Germany",
    "lang": "en",
    "updated": "",
    "links": {
      "profiles": ["http://www.opengis.net/spec/owcgeojson/1.0/req/core"]
    }
  },
  "features": [
    {
      "geometry": null,
      "id": "zki152:dlr_aerial_olef_20210715",
      "type": "Feature",
      "properties": {
        "active": true,
        "title": "DLR Aerial Olef 15.07.2021",
        "folder": "Layers/aerial",
        "updated": null,
        "links": null,
        "offerings": [
          {
            "code": "http://schemas.opengis.net/wms/1.1.1",
            "operations": [
              {
                "code": "GetMap",
                "method": "GET",
                "type": "image/png",
                "href": "https://geoservice.dlr.de/eoc/zki/service/zki152/wms?service=WMS&version=1.1.0&request=GetMap&layers=zki152%3Adlr_aerial_olef_20210715&srs=EPSG%3A4326&format=image/png"
              }
            ]
          }
        ],
        "categories": [
          { "term": "dlr_aerial_olef_20210715" },
          { "term": "wcs" },
          { "term": "geotiff" }
        ],
        "dimensions": [{
          "name": "time",
          "units": "ISO8601",
          "values": "2016-01-01T00:00:00Z/2016-12-31T00:00:00Z/P1Y"
        }],
        "abstract": "Layer-Group type layer: dlr_aerial_sauer_20210716"
      },
      "bbox": [
        6.451250397855204,
        50.51446951324351,
        6.54233617431093,
        50.602470028140516
      ]
    },
    {
      "geometry": null,
      "id": "zki152:dlr_aerial_erft_20210715",
      "type": "Feature",
      "properties": {
        "active": true,
        "title": "DLR Aerial Erft 15.07.2021",
        "folder": "Layers/aerial",
        "updated": null,
        "links": null,
        "offerings": [
          {
            "code": "http://schemas.opengis.net/wms/1.1.1",
            "operations": [
              {
                "code": "GetMap",
                "method": "GET",
                "type": "image/png",
                "href": "https://geoservice.dlr.de/eoc/zki/service/zki152/wms?service=WMS&version=1.1.0&request=GetMap&layers=zki152%3Adlr_aerial_erft_20210715&srs=EPSG%3A4326&format=image/png"
              }
            ]
          }
        ],
        "categories": [
          { "term": "dlr_aerial_erft_20210715" },
          { "term": "wcs" },
          { "term": "geotiff" }
        ],
        "dimensions": [{
          "name": "time",
          "units": "ISO8601",
          "values": "2016-01-01T00:00:00Z/2016-12-31T00:00:00Z/P1Y"
        }],
        "abstract": "Layer-Group type layer: dlr_aerial_sauer_20210716"
      },
      "bbox": [
        6.717558607352603,
        50.53643794477393,
        6.804373875060644,
        50.61098274768985
      ]
    },
    {
      "geometry": null,
      "id": "zki152:dlr_aerial_ahr_20210716",
      "type": "Feature",
      "properties": {
        "active": true,
        "title": "DLR Aerial Ahr 16.07.2021",
        "folder": "Layers/aerial",
        "updated": null,
        "links": null,
        "offerings": [
          {
            "code": "http://schemas.opengis.net/wmts/1.1.0",
            "operations": [
              {
                "code": "GetTile",
                "href": "https://geoservice.dlr.de/eoc/zki/service/gwc/service/wmts?SERVICE=WMTS&REQUEST=GetTile&FORMAT=image%2Fpng&LAYER=zki152:dlr_aerial_ahr_20210716&VERSION=1.1.0",
                "method": "GET",
                "type": "image/png"
              },
              {
                "code": "GetCapabilities",
                "href": "https://geoservice.dlr.de/eoc/zki/service/gwc/service/wmts?SERVICE=WMTS&REQUEST=GetCapabilities&VERSION=1.1.0",
                "method": "GET",
                "type": "application/xml"
              }
            ]
          }
        ],
        "categories": [],
        "dimensions": [{
          "name": "time",
          "units": "ISO8601",
          "values": "2021-07-16T00:00:00Z"
        }]
      },
      "bbox": [
        6.771601326339797,
        50.3669197186389,
        7.159463768897562,
        50.55151934867549
      ]
    },
    {
      "geometry": null,
      "id": "zki152:dlr_aerial_sauer_20210716",
      "type": "Feature",
      "properties": {
        "active": true,
        "title": "DLR Aerial Sauer 16.07.2021",
        "folder": "Layers/aerial",
        "updated": null,
        "links": null,
        "offerings": [
          {
            "code": "http://schemas.opengis.net/wmts/1.1.0",
            "operations": [
              {
                "code": "GetTile",
                "href": "https://geoservice.dlr.de/eoc/zki/service/gwc/service/wmts?SERVICE=WMTS&REQUEST=GetTile&FORMAT=image%2Fpng&LAYER=zki152:dlr_aerial_sauer_20210716&VERSION=1.1.0",
                "method": "GET",
                "type": "image/png"
              },
              {
                "code": "GetCapabilities",
                "href": "https://geoservice.dlr.de/eoc/zki/service/gwc/service/wmts?SERVICE=WMTS&REQUEST=GetCapabilities&VERSION=1.1.0",
                "method": "GET",
                "type": "application/xml"
              }
            ]
          }
        ],
        "categories": [],
        "dimensions": [{
          "name": "time",
          "units": "ISO8601",
          "values": "2021-07-16T00:00:00Z"
        }]
      },
      "bbox": [
        6.3879581890597645,
        49.72094437380317,
        6.537373298918955,
        49.83141729747873
      ]
    },
    {
      "geometry": null,
      "id": "zki152:dlr_aerial_kyll_20210716",
      "type": "Feature",
      "properties": {
        "active": true,
        "title": "DLR Aerial Kyll 16.07.2021",
        "folder": "Layers/aerial",
        "updated": null,
        "links": null,
        "offerings": [
          {
            "code": "http://schemas.opengis.net/wmts/1.1.0",
            "operations": [
              {
                "code": "GetTile",
                "href": "https://geoservice.dlr.de/eoc/zki/service/gwc/service/wmts?SERVICE=WMTS&REQUEST=GetTile&FORMAT=image%2Fpng&LAYER=zki152:dlr_aerial_kyll_20210716&VERSION=1.1.0",
                "method": "GET",
                "type": "image/png"
              },
              {
                "code": "GetCapabilities",
                "href": "https://geoservice.dlr.de/eoc/zki/service/gwc/service/wmts?SERVICE=WMTS&REQUEST=GetCapabilities&VERSION=1.1.0",
                "method": "GET",
                "type": "application/xml"
              }
            ]
          }
        ],
        "categories": [],
        "dimensions": [{
          "name": "time",
          "units": "ISO8601",
          "values": "2021-07-16T00:00:00Z"
        }]
      },
      "bbox": [
        6.562324055086157,
        49.798797121374044,
        6.693321059894677,
        50.164407160911054
      ]
    },
    {
      "geometry": null,
      "id": "zki152:dlr_aerial_erftstadt_20210716",
      "type": "Feature",
      "properties": {
        "title": "DLR Aerial Erftstadt 16.07.2021",
        "folder": "Layers/aerial",
        "active": true,
        "updated": null,
        "links": null,
        "offerings": [
          {
            "code": "http://schemas.opengis.net/wms/1.1.1",
            "operations": [
              {
                "code": "GetMap",
                "method": "GET",
                "type": "image/png",
                "href": "https://geoservice.dlr.de/eoc/zki/service/zki152/wms?service=WMS&version=1.1.0&request=GetMap&layers=zki152%3Adlr_aerial_erftstadt_20210716&srs=EPSG%3A4326&format=image/png"
              }
            ]
          }
        ],
        "categories": [
          { "term": "eoc" },
          { "term": "zki" },
          { "term": "dlr" },
          { "term": "aerialimage" },
          { "term": "geoservice" }
        ],
        "dimensions": [{
          "name": "time",
          "units": "ISO8601",
          "values": "2016-01-01T00:00:00Z/2016-12-31T00:00:00Z/P1Y"
        }],
        "abstract": "Layer-Group type layer: dlr_aerial_erftstadt_20210716"
      },
      "bbox": [
        6.728932688989659,
        50.74491247363744,
        6.847459959967933,
        50.8538097643501
      ]
    },
    {
      "geometry": null,
      "id": "zki152:s1_water_20210715",
      "type": "Feature",
      "properties": {
        "title": "S1 Water mask 15.07.2021",
        "folder": "Layers/water",
        "updated": null,
        "links": null,
        "offerings": [
          {
            "code": "http://schemas.opengis.net/wms/1.1.1",
            "operations": [
              {
                "code": "GetMap",
                "method": "GET",
                "type": "image/png",
                "href": "https://geoservice.dlr.de/eoc/zki/service/zki152/wms?service=WMS&version=1.1.0&request=GetMap&layers=zki152%3As1_water_20210715&srs=EPSG%3A4326&format=image/png"
              }
            ]
          }
        ],
        "categories": [
          { "term": "s1_water_20210715" },
          { "term": "wcs" },
          { "term": "vrt" }
        ],
        "dimensions": [{
          "name": "time",
          "units": "ISO8601",
          "values": "2016-01-01T00:00:00Z/2016-12-31T00:00:00Z/P1Y"
        }]
      },
      "bbox": [
        5.255018326207443,
        48.00767524351541,
        9.997134879545982,
        52.88426959488664
      ]
    },
    {
      "geometry": null,
      "id": "zki152:s1_water_20210716",
      "type": "Feature",
      "properties": {
        "title": "S1 Water mask 16.07.2021",
        "folder": "Layers/water",
        "updated": null,
        "links": null,
        "offerings": [
          {
            "code": "http://schemas.opengis.net/wms/1.1.1",
            "operations": [
              {
                "code": "GetMap",
                "method": "GET",
                "type": "image/png",
                "href": "https://geoservice.dlr.de/eoc/zki/service/zki152/wms?service=WMS&version=1.1.0&request=GetMap&layers=zki152%3As1_water_20210716&srs=EPSG%3A4326&format=image/png"
              }
            ]
          }
        ],
        "categories": [
          { "term": "s1_water_20210716" },
          { "term": "wcs" },
          { "term": "vrt" }
        ],
        "dimensions": [{
          "name": "time",
          "units": "ISO8601",
          "values": "2016-01-01T00:00:00Z/2016-12-31T00:00:00Z/P1Y"
        }]
      },
      "bbox": [
        5.255018326207443,
        48.00767524351541,
        9.997134879545982,
        52.88426959488664
      ]
    },
    {
      "geometry": null,
      "id": "zki152:s1_water_20210718",
      "type": "Feature",
      "properties": {
        "title": "S1 Water mask 18.07.2021",
        "folder": "Layers/water",
        "updated": null,
        "links": null,
        "offerings": [
          {
            "code": "http://schemas.opengis.net/wms/1.1.1",
            "operations": [
              {
                "code": "GetMap",
                "method": "GET",
                "type": "image/png",
                "href": "https://geoservice.dlr.de/eoc/zki/service/zki152/wms?service=WMS&version=1.1.0&request=GetMap&layers=zki152%3As1_water_20210718&srs=EPSG%3A4326&format=image/png"
              }
            ]
          }
        ],
        "categories": [
          { "term": "s1_water_20210718" },
          { "term": "wcs" },
          { "term": "vrt" }
        ],
        "dimensions": [{
          "name": "time",
          "units": "ISO8601",
          "values": "2016-01-01T00:00:00Z/2016-12-31T00:00:00Z/P1Y"
        }]
      },
      "bbox": [
        4.042556021869075,
        48.420076397794304,
        8.329496220744254,
        51.80214361097589
      ]
    },
    {
      "geometry": null,
      "id": "zki152:s2_valid_20210718",
      "type": "Feature",
      "properties": {
        "title": "S2 Valid mask 18.07.2021",
        "folder": "Layers/water",
        "updated": null,
        "links": null,
        "offerings": [
          {
            "code": "http://schemas.opengis.net/wms/1.1.1",
            "operations": [
              {
                "code": "GetMap",
                "method": "GET",
                "type": "image/png",
                "href": "https://geoservice.dlr.de/eoc/zki/service/zki152/wms?service=WMS&version=1.1.0&request=GetMap&layers=zki152%3As2_valid_20210718&srs=EPSG%3A4326&format=image/png"
              }
            ]
          }
        ],
        "categories": [
          { "term": "s2_valid_20210718" },
          { "term": "wcs" },
          { "term": "geotiff" }
        ],
        "dimensions": [{
          "name": "time",
          "units": "ISO8601",
          "values": "2016-01-01T00:00:00Z/2016-12-31T00:00:00Z/P1Y"
        }]
      },
      "bbox": [
        6.23463206300017,
        48.775382192522706,
        8.77573206300017,
        51.43508219252271
      ]
    },
    {
      "geometry": null,
      "id": "zki152:s2_water_20210718",
      "type": "Feature",
      "properties": {
        "title": "S2 Water mask 18.07.2021",
        "folder": "Layers/water",
        "updated": null,
        "links": null,
        "offerings": [
          {
            "code": "http://schemas.opengis.net/wms/1.1.1",
            "operations": [
              {
                "code": "GetMap",
                "method": "GET",
                "type": "image/png",
                "href": "https://geoservice.dlr.de/eoc/zki/service/zki152/wms?service=WMS&version=1.1.0&request=GetMap&layers=zki152%3As2_water_20210718&srs=EPSG%3A4326&format=image/png"
              }
            ]
          }
        ],
        "categories": [
          { "term": "s2_water_20210718" },
          { "term": "wcs" },
          { "term": "vrt" }
        ],
        "dimensions": [{
          "name": "time",
          "units": "ISO8601",
          "values": "2016-01-01T00:00:00Z/2016-12-31T00:00:00Z/P1Y"
        }]
      },
      "bbox": [
        6.23463206300017,
        48.775382192522706,
        8.77573206300017,
        51.43508219252271
      ]
    },
    {
      "geometry": null,
      "id": "wms_dop__a8bb3cf7-fcb2-46d2-b392-3e613393f3da",
      "type": "Feature",
      "properties": {
        "active": false,
        "title": "DOP20 (BKG)",
        "updated": null,
        "links": null,
        "abstract": "Der Dienst stellt die Digitalen Orthophotos in 20 cm Bodenauflösung für das Gebiet der Bundesrepublik Deutschland bereit.",
        "rights": "&amp;copy; GeoBasis-DE / BKG &amp;lt;Jahr&amp;gt",
        "offerings": [
          {
            "code": "http://schemas.opengis.net/wms/1.1.0",
            "operations": [
              {
                "code": "GetMap",
                "method": "GET",
                "type": "image/png",
                "href": "https://sg.geodatenzentrum.de/wms_dop__a8bb3cf7-fcb2-46d2-b392-3e613393f3da?service=WMS&version=1.1.0&request=GetMap&layers=rgb&STYLES=default&srs=EPSG%3A4326&format=image/png"
              },
              {
                "code": "GetCapabilities",
                "href": "https://sg.geodatenzentrum.de/wms_dop__a8bb3cf7-fcb2-46d2-b392-3e613393f3da?request=GetCapabilities&Version=1.1.0&service=WMS",
                "method": "GET",
                "type": "application/xml"
              }
            ]
          }
        ],
        "categories": [],
        "dimensions": [{
          "name": "time",
          "units": "ISO8601",
          "values": "2021-06-28T00:00:00Z/2021-06-29T23:59:59Z/P2D"
        }]
      },
      "bbox": [
        5.42587260523,
        46.9672880527,
        15.7908768234,
        55.1764096793
      ]
    },
    {
      "geometry": null,
      "id": "vectortile",
      "properties": {
        "active": true,
        "offerings": [
          {
            "code": "https://wiki.osgeo.org/wiki/Tile_Map_Service_Specification",
            "operations": [
              {
                "code": "GetTiles",
                "href": "https://tiles.geotest.eoc.dlr.de/service/tms/1.0.0/planet_eoc@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf?flipy=true",
                "method": "GET"
              }
            ],
            "styles": [{
              "name": "geotest_xyz_planet_eoc",
              "title": "grayscale",
              "content": {
                "type": "mapbox-style",
                "mapbox-source-key": "geotest_xyz_planet_eoc",
                "content": `{"version":8,"name":"Positron","metadata":{"mapbox:autocomposite":false,"mapbox:groups":{"101da9f13b64a08fa4b6ac1168e89e5f":{"collapsed":false,"name":"Places"},"a14c9607bc7954ba1df7205bf660433f":{"name":"Boundaries"},"b6371a3f2f5a9932464fa3867530a2e5":{"collapsed":false,"name":"Transportation"}},"mapbox:type":"template","openmaptiles:mapbox:owner":"openmaptiles","openmaptiles:mapbox:source:url":"mapbox:\/\/openmaptiles.4qljc88t","openmaptiles:version":"3.x","maputnik:renderer":"mbgljs","maputnik:thunderforest_access_token":""},"sources":{"geotest_xyz_planet_eoc":{"type":"vector","url":"https:\/\/pyxis.eoc.dlr.de\/tileserver\/planet0-12.json"}},"sprite":"https:\/\/openmaptiles.github.io\/positron-gl-style\/sprite","glyphs":"https:\/\/api.maptiler.com\/fonts\/{fontstack}\/{range}.pbf?key={key}","layers":[{"id":"background","type":"background","paint":{"background-color":"rgb(242,243,240)"}},{"id":"park","type":"fill","source":"geotest_xyz_planet_eoc","source-layer":"park","filter":["==","$type","Polygon"],"layout":{"visibility":"none"},"paint":{"fill-color":"rgb(230, 233, 229)"}},{"id":"water","type":"fill","source":"geotest_xyz_planet_eoc","source-layer":"water","filter":["all",["==","$type","Polygon"],["!=","brunnel","tunnel"]],"layout":{"visibility":"visible"},"paint":{"fill-antialias":true,"fill-color":"rgba(196, 203, 205, 1)"}},{"id":"landcover_ice_shelf","type":"fill","source":"geotest_xyz_planet_eoc","source-layer":"landcover","maxzoom":8,"filter":["all",["==","$type","Polygon"],["==","subclass","ice_shelf"]],"layout":{"visibility":"visible"},"paint":{"fill-color":"hsl(0, 0%, 98%)","fill-opacity":0.7}},{"id":"landcover_glacier","type":"fill","source":"geotest_xyz_planet_eoc","source-layer":"landcover","maxzoom":8,"filter":["all",["==","$type","Polygon"],["==","subclass","glacier"]],"layout":{"visibility":"visible"},"paint":{"fill-color":"hsl(0, 0%, 98%)","fill-opacity":{"base":1,"stops":[[0,1],[8,0.5]]}}},{"id":"landuse_residential","type":"fill","source":"geotest_xyz_planet_eoc","source-layer":"landuse","minzoom":0,"maxzoom":24,"filter":["all",["==","$type","Polygon"],["==","class",""]],"layout":{"visibility":"visible"},"paint":{"fill-color":"rgb(234, 234, 230)","fill-opacity":{"base":0.6,"stops":[[8,0.8],[9,0.6]]}}},{"id":"landcover_wood","type":"fill","source":"geotest_xyz_planet_eoc","source-layer":"landcover","minzoom":10,"filter":["all",["==","$type","Polygon"],["==","class","wood"]],"layout":{"visibility":"none"},"paint":{"fill-color":"rgb(220,224,220)","fill-opacity":{"base":1,"stops":[[8,0],[12,1]]}}},{"id":"waterway","type":"line","source":"geotest_xyz_planet_eoc","source-layer":"waterway","filter":["==","$type","LineString"],"layout":{"visibility":"visible"},"paint":{"line-color":"hsl(195, 17%, 78%)"}},{"id":"water_name","type":"symbol","source":"geotest_xyz_planet_eoc","source-layer":"water_name","filter":["==","$type","LineString"],"layout":{"symbol-placement":"line","symbol-spacing":500,"text-field":"{name:latin}{name:nonlatin}","text-font":["Metropolis Medium Italic","Noto Sans Italic"],"text-rotation-alignment":"map","text-size":12},"paint":{"text-color":"rgb(157,169,177)","text-halo-blur":1,"text-halo-color":"rgb(242,243,240)","text-halo-width":1}},{"id":"building","type":"fill","source":"geotest_xyz_planet_eoc","source-layer":"building","minzoom":12,"paint":{"fill-antialias":true,"fill-color":"rgb(234, 234, 229)","fill-outline-color":"rgb(219, 219, 218)"}},{"id":"tunnel_motorway_casing","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":6,"filter":["all",["==","$type","LineString"],["all",["==","brunnel","tunnel"],["==","class","motorway"]]],"layout":{"line-cap":"butt","line-join":"miter","visibility":"visible"},"paint":{"line-color":"rgb(213, 213, 213)","line-opacity":1,"line-width":{"base":1.4,"stops":[[5.8,0],[6,3],[20,40]]}}},{"id":"tunnel_motorway_inner","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":6,"filter":["all",["==","$type","LineString"],["all",["==","brunnel","tunnel"],["==","class","motorway"]]],"layout":{"line-cap":"round","line-join":"round","visibility":"visible"},"paint":{"line-color":"rgb(234,234,234)","line-width":{"base":1.4,"stops":[[4,2],[6,1.3],[20,30]]}}},{"id":"aeroway-taxiway","type":"line","metadata":{"mapbox:group":"1444849345966.4436"},"source":"geotest_xyz_planet_eoc","source-layer":"aeroway","minzoom":12,"filter":["all",["in","class","taxiway"]],"layout":{"line-cap":"round","line-join":"round","visibility":"visible"},"paint":{"line-color":"hsl(0, 0%, 88%)","line-opacity":1,"line-width":{"base":1.55,"stops":[[13,1.8],[20,20]]}}},{"id":"aeroway-runway-casing","type":"line","metadata":{"mapbox:group":"1444849345966.4436"},"source":"geotest_xyz_planet_eoc","source-layer":"aeroway","minzoom":11,"filter":["all",["in","class","runway"]],"layout":{"line-cap":"round","line-join":"round","visibility":"visible"},"paint":{"line-color":"hsl(0, 0%, 88%)","line-opacity":1,"line-width":{"base":1.5,"stops":[[11,6],[17,55]]}}},{"id":"aeroway-area","type":"fill","metadata":{"mapbox:group":"1444849345966.4436"},"source":"geotest_xyz_planet_eoc","source-layer":"aeroway","minzoom":4,"filter":["all",["==","$type","Polygon"],["in","class","runway","taxiway"]],"layout":{"visibility":"visible"},"paint":{"fill-color":"rgba(255, 255, 255, 1)","fill-opacity":{"base":1,"stops":[[13,0],[14,1]]}}},{"id":"aeroway-runway","type":"line","metadata":{"mapbox:group":"1444849345966.4436"},"source":"geotest_xyz_planet_eoc","source-layer":"aeroway","minzoom":11,"filter":["all",["in","class","runway"],["==","$type","LineString"]],"layout":{"line-cap":"round","line-join":"round","visibility":"visible"},"paint":{"line-color":"rgba(255, 255, 255, 1)","line-opacity":1,"line-width":{"base":1.5,"stops":[[11,4],[17,50]]}}},{"id":"road_area_pier","type":"fill","metadata":{},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","filter":["all",["==","$type","Polygon"],["==","class","pier"]],"layout":{"visibility":"visible"},"paint":{"fill-antialias":true,"fill-color":"rgb(242,243,240)"}},{"id":"road_pier","type":"line","metadata":{},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","filter":["all",["==","$type","LineString"],["in","class","pier"]],"layout":{"line-cap":"round","line-join":"round","visibility":"visible"},"paint":{"line-color":"rgb(242,243,240)","line-width":{"base":1.2,"stops":[[15,1],[17,4]]}}},{"id":"highway_path","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","filter":["all",["==","$type","LineString"],["==","class","path"]],"layout":{"line-cap":"round","line-join":"round","visibility":"visible"},"paint":{"line-color":"rgba(238, 235, 235, 1)","line-opacity":0.9,"line-width":{"base":1.2,"stops":[[13,1],[20,10]]}}},{"id":"highway_minor","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":8,"filter":["all",["==","$type","LineString"],["in","class","minor","service","track"]],"layout":{"line-cap":"round","line-join":"round","visibility":"visible"},"paint":{"line-color":"rgba(245, 244, 244, 1)","line-opacity":0.9,"line-width":{"base":1.55,"stops":[[13,1.8],[20,20]]}}},{"id":"highway_major_casing","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":11,"filter":["all",["==","$type","LineString"],["in","class","primary","secondary","tertiary","trunk"]],"layout":{"line-cap":"butt","line-join":"miter","visibility":"visible"},"paint":{"line-color":"rgb(213, 213, 213)","line-dasharray":[12,0],"line-width":{"base":1.3,"stops":[[10,3],[20,23]]}}},{"id":"highway_major_inner","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":11,"filter":["all",["==","$type","LineString"],["in","class","primary","secondary","tertiary","trunk"]],"layout":{"line-cap":"round","line-join":"round","visibility":"visible"},"paint":{"line-color":"#fff","line-width":{"base":1.3,"stops":[[10,2],[20,20]]}}},{"id":"highway_motorway_casing","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":6,"filter":["all",["==","$type","LineString"],["all",["!in","brunnel","bridge","tunnel"],["==","class","motorway"]]],"layout":{"line-cap":"butt","line-join":"miter","visibility":"visible"},"paint":{"line-color":"rgb(213, 213, 213)","line-dasharray":[2,0],"line-opacity":1,"line-width":{"base":1.4,"stops":[[5.8,0],[6,3],[20,40]]}}},{"id":"highway_motorway_inner","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":6,"filter":["all",["==","$type","LineString"],["all",["!in","brunnel","bridge","tunnel"],["==","class","motorway"]]],"layout":{"line-cap":"round","line-join":"round","visibility":"visible"},"paint":{"line-color":{"base":1,"stops":[[5.8,"hsla(0, 0%, 85%, 0.53)"],[6,"#fff"]]},"line-width":{"base":1.4,"stops":[[4,2],[6,1.3],[20,30]]}}},{"id":"highway_motorway_subtle","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":6,"maxzoom":9,"filter":["all",["==","$type","LineString"],["==","class","motorway"]],"layout":{"line-cap":"round","line-join":"round","visibility":"visible"},"paint":{"line-color":"hsla(0, 0%, 85%, 0.53)","line-width":{"base":1.4,"stops":[[4,2],[6,1.3]]}}},{"id":"railway_transit","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":16,"filter":["all",["==","$type","LineString"],["all",["==","class","transit"],["!in","brunnel","tunnel"]]],"layout":{"line-join":"round","visibility":"visible"},"paint":{"line-color":"#dddddd","line-width":3}},{"id":"railway_transit_dashline","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":16,"filter":["all",["==","$type","LineString"],["all",["==","class","transit"],["!in","brunnel","tunnel"]]],"layout":{"line-join":"round","visibility":"visible"},"paint":{"line-color":"#fafafa","line-dasharray":[3,3],"line-width":2}},{"id":"railway_service","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":16,"filter":["all",["==","$type","LineString"],["all",["==","class","rail"],["has","service"]]],"layout":{"line-join":"round","visibility":"visible"},"paint":{"line-color":"#dddddd","line-width":3}},{"id":"railway_service_dashline","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":16,"filter":["all",["==","$type","LineString"],["==","class","rail"],["has","service"]],"layout":{"line-join":"round","visibility":"visible"},"paint":{"line-color":"#fafafa","line-dasharray":[3,3],"line-width":2}},{"id":"railway","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":13,"filter":["all",["==","$type","LineString"],["all",["!has","service"],["==","class","rail"]]],"layout":{"line-join":"round","visibility":"visible"},"paint":{"line-color":"#dddddd","line-width":{"base":1.3,"stops":[[16,3],[20,7]]}}},{"id":"railway_dashline","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":13,"filter":["all",["==","$type","LineString"],["all",["!has","service"],["==","class","rail"]]],"layout":{"line-join":"round","visibility":"visible"},"paint":{"line-color":"#fafafa","line-dasharray":[3,3],"line-width":{"base":1.3,"stops":[[16,2],[20,6]]}}},{"id":"highway_motorway_bridge_casing","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":6,"filter":["all",["==","$type","LineString"],["all",["==","brunnel","bridge"],["==","class","motorway"]]],"layout":{"line-cap":"butt","line-join":"miter","visibility":"visible"},"paint":{"line-color":"rgb(213, 213, 213)","line-dasharray":[2,0],"line-opacity":1,"line-width":{"base":1.4,"stops":[[5.8,0],[6,5],[20,45]]}}},{"id":"highway_motorway_bridge_inner","type":"line","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation","minzoom":6,"filter":["all",["==","$type","LineString"],["all",["==","brunnel","bridge"],["==","class","motorway"]]],"layout":{"line-cap":"round","line-join":"round","visibility":"visible"},"paint":{"line-color":{"base":1,"stops":[[5.8,"hsla(0, 0%, 85%, 0.53)"],[6,"#fff"]]},"line-width":{"base":1.4,"stops":[[4,2],[6,1.3],[20,30]]}}},{"id":"highway_name_other","type":"symbol","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation_name","filter":["all",["!=","class","motorway"],["==","$type","LineString"]],"layout":{"symbol-placement":"line","symbol-spacing":350,"text-field":"{name:latin} {name:nonlatin}","text-font":["Metropolis Regular","Noto Sans Regular"],"text-max-angle":30,"text-pitch-alignment":"viewport","text-rotation-alignment":"map","text-size":10,"text-transform":"uppercase","visibility":"visible"},"paint":{"text-color":"#bbb","text-halo-blur":1,"text-halo-color":"#fff","text-halo-width":2,"text-translate":[0,0]}},{"id":"highway_name_motorway","type":"symbol","metadata":{"mapbox:group":"b6371a3f2f5a9932464fa3867530a2e5"},"source":"geotest_xyz_planet_eoc","source-layer":"transportation_name","minzoom":9,"filter":["all",["==","$type","LineString"],["==","class","motorway"]],"layout":{"symbol-placement":"line","symbol-spacing":350,"text-field":"{ref}","text-font":["Metropolis Light","Noto Sans Regular"],"text-pitch-alignment":"viewport","text-rotation-alignment":"viewport","text-size":10,"visibility":"visible"},"paint":{"text-color":"rgb(117, 129, 145)","text-halo-blur":1,"text-halo-color":"hsl(0, 0%, 100%)","text-halo-width":1,"text-translate":[0,2]}},{"id":"boundary_state","type":"line","metadata":{"mapbox:group":"a14c9607bc7954ba1df7205bf660433f"},"source":"geotest_xyz_planet_eoc","source-layer":"boundary","filter":["==","admin_level",4],"layout":{"line-cap":"round","line-join":"round","visibility":"none"},"paint":{"line-blur":0.4,"line-color":"rgb(230, 204, 207)","line-dasharray":[2,2],"line-opacity":1,"line-width":{"base":1.3,"stops":[[3,1],[22,15]]}}},{"id":"boundary_country_z0-4","type":"line","metadata":{"mapbox:group":"a14c9607bc7954ba1df7205bf660433f"},"source":"geotest_xyz_planet_eoc","source-layer":"boundary","maxzoom":5,"filter":["all",["==","admin_level",2],["!has","claimed_by"]],"layout":{"line-cap":"round","line-join":"round"},"paint":{"line-blur":{"base":1,"stops":[[0,0.4],[22,4]]},"line-color":"rgba(181, 170, 171, 1)","line-opacity":1,"line-width":{"base":1.1,"stops":[[3,1],[22,20]]}}},{"id":"boundary_country_z5-","type":"line","metadata":{"mapbox:group":"a14c9607bc7954ba1df7205bf660433f"},"source":"geotest_xyz_planet_eoc","source-layer":"boundary","minzoom":5,"filter":["==","admin_level",2],"layout":{"line-cap":"round","line-join":"round"},"paint":{"line-blur":{"base":1,"stops":[[0,0.4],[22,4]]},"line-color":"rgba(181, 170, 171, 1)","line-opacity":1,"line-width":{"base":1.1,"stops":[[3,1],[22,20]]}}},{"id":"place_suburb","type":"symbol","metadata":{"mapbox:group":"101da9f13b64a08fa4b6ac1168e89e5f"},"source":"geotest_xyz_planet_eoc","source-layer":"place","minzoom":9,"maxzoom":15,"filter":["all",["==","$type","Point"],["==","class","suburb"]],"layout":{"text-anchor":"center","text-field":"{name:latin}{name:nonlatin}","text-font":["Metropolis Regular","Noto Sans Regular"],"text-justify":"center","text-offset":[0.5,0],"text-size":10,"text-transform":"uppercase","visibility":"visible"},"paint":{"text-color":"rgb(117, 129, 145)","text-halo-blur":1,"text-halo-color":"rgb(242,243,240)","text-halo-width":1}},{"id":"place_village","type":"symbol","metadata":{"mapbox:group":"101da9f13b64a08fa4b6ac1168e89e5f"},"source":"geotest_xyz_planet_eoc","source-layer":"place","minzoom":11,"maxzoom":24,"filter":["all",["==","$type","Point"],["==","class","village"]],"layout":{"icon-size":0.4,"text-anchor":"left","text-field":"{name:latin}{name:nonlatin}","text-font":["Metropolis Regular","Noto Sans Regular"],"text-justify":"left","text-offset":[0.5,0.2],"text-size":10,"text-transform":"uppercase","visibility":"visible"},"paint":{"icon-opacity":0.7,"text-color":"rgb(117, 129, 145)","text-halo-blur":1,"text-halo-color":"rgb(242,243,240)","text-halo-width":1}},{"id":"place_town","type":"symbol","metadata":{"mapbox:group":"101da9f13b64a08fa4b6ac1168e89e5f"},"source":"geotest_xyz_planet_eoc","source-layer":"place","minzoom":9,"maxzoom":15,"filter":["all",["==","$type","Point"],["==","class","town"]],"layout":{"icon-image":{"base":1,"stops":[[0,"circle-11"],[8,""]]},"icon-size":0.4,"text-anchor":{"base":1,"stops":[[0,"left"],[8,"center"]]},"text-field":"{name:latin}{name:nonlatin}","text-font":["Metropolis Regular","Noto Sans Regular"],"text-justify":"left","text-offset":[0.5,0.2],"text-size":10,"text-transform":"uppercase","visibility":"visible"},"paint":{"icon-opacity":0.7,"text-color":"rgb(117, 129, 145)","text-halo-blur":1,"text-halo-color":"rgb(242,243,240)","text-halo-width":1}},{"id":"place_city","type":"symbol","metadata":{"mapbox:group":"101da9f13b64a08fa4b6ac1168e89e5f"},"source":"geotest_xyz_planet_eoc","source-layer":"place","minzoom":7,"maxzoom":14,"filter":["all",["==","$type","Point"],["all",["!=","capital",2],["==","class","city"],[">","rank",3]]],"layout":{"icon-image":{"base":1,"stops":[[0,"circle-11"],[8,""]]},"icon-size":0.4,"text-anchor":{"base":1,"stops":[[0,"left"],[8,"center"]]},"text-field":"{name:latin}{name:nonlatin}","text-font":["Metropolis Regular","Noto Sans Regular"],"text-justify":"left","text-offset":[0.5,0.2],"text-size":10,"text-transform":"uppercase","visibility":"visible"},"paint":{"icon-opacity":0.7,"text-color":"rgb(117, 129, 145)","text-halo-blur":1,"text-halo-color":"rgb(242,243,240)","text-halo-width":1}},{"id":"place_capital","type":"symbol","metadata":{"mapbox:group":"101da9f13b64a08fa4b6ac1168e89e5f"},"source":"geotest_xyz_planet_eoc","source-layer":"place","minzoom":3,"maxzoom":12,"filter":["all",["==","$type","Point"],["all",["==","capital",2],["==","class","city"]]],"layout":{"icon-image":{"base":1,"stops":[[0,"circle-11"],[8,""]]},"text-anchor":{"base":1,"stops":[[0,"left"],[8,"center"]]},"text-field":"{name:latin}{name:nonlatin}","text-font":["Metropolis Regular","Noto Sans Regular"],"text-justify":"left","text-offset":[0.5,0.2],"text-transform":"uppercase","visibility":"visible","text-size":14,"icon-size":0},"paint":{"icon-opacity":0.7,"text-color":"rgb(117, 129, 145)","text-halo-blur":1,"text-halo-color":"rgb(242,243,240)","text-halo-width":1}},{"id":"place_city_large","type":"symbol","metadata":{"mapbox:group":"101da9f13b64a08fa4b6ac1168e89e5f"},"source":"geotest_xyz_planet_eoc","source-layer":"place","minzoom":4,"maxzoom":12,"filter":["all",["==","$type","Point"],["all",["!=","capital",2],["<=","rank",3],["==","class","city"]]],"layout":{"icon-image":{"base":1,"stops":[[0,"circle-11"],[8,""]]},"icon-size":0.4,"text-anchor":{"base":1,"stops":[[0,"left"],[8,"center"]]},"text-field":"{name:latin}{name:nonlatin}","text-font":["Metropolis Regular","Noto Sans Regular"],"text-justify":"left","text-offset":[0.5,0.2],"text-size":14,"text-transform":"uppercase","visibility":"visible"},"paint":{"icon-opacity":0.7,"text-color":"rgb(117, 129, 145)","text-halo-blur":1,"text-halo-color":"rgb(242,243,240)","text-halo-width":1}},{"id":"place_state","type":"symbol","metadata":{"mapbox:group":"101da9f13b64a08fa4b6ac1168e89e5f"},"source":"geotest_xyz_planet_eoc","source-layer":"place","maxzoom":12,"filter":["all",["==","$type","Point"],["==","class","state"]],"layout":{"text-field":"{name:latin}{name:nonlatin}","text-font":["Metropolis Regular","Noto Sans Regular"],"text-size":10,"text-transform":"uppercase","visibility":"visible"},"paint":{"text-color":"rgb(113, 129, 144)","text-halo-blur":1,"text-halo-color":"rgb(242,243,240)","text-halo-width":1}},{"id":"place_country_other","type":"symbol","metadata":{"mapbox:group":"101da9f13b64a08fa4b6ac1168e89e5f"},"source":"geotest_xyz_planet_eoc","source-layer":"place","maxzoom":8,"filter":["all",["==","$type","Point"],["==","class","country"],["!has","iso_a2"]],"layout":{"text-field":"{name:latin}","text-font":["Metropolis Light Italic","Noto Sans Italic"],"text-size":{"base":1,"stops":[[0,9],[6,11]]},"text-transform":"uppercase","visibility":"visible"},"paint":{"text-color":{"base":1,"stops":[[3,"rgb(157,169,177)"],[4,"rgb(153, 153, 153)"]]},"text-halo-color":"rgba(236,236,234,0.7)","text-halo-width":1.4}},{"id":"place_country_minor","type":"symbol","metadata":{"mapbox:group":"101da9f13b64a08fa4b6ac1168e89e5f"},"source":"geotest_xyz_planet_eoc","source-layer":"place","maxzoom":8,"filter":["all",["==","$type","Point"],["==","class","country"],[">=","rank",2],["has","iso_a2"]],"layout":{"text-field":"{name:latin}","text-font":["Metropolis Regular","Noto Sans Regular"],"text-size":{"base":1,"stops":[[0,10],[6,12]]},"text-transform":"uppercase","visibility":"visible"},"paint":{"text-color":{"base":1,"stops":[[3,"rgb(157,169,177)"],[4,"rgb(153, 153, 153)"]]},"text-halo-color":"rgba(236,236,234,0.7)","text-halo-width":1.4}},{"id":"place_country_major","type":"symbol","metadata":{"mapbox:group":"101da9f13b64a08fa4b6ac1168e89e5f"},"source":"geotest_xyz_planet_eoc","source-layer":"place","maxzoom":6,"filter":["all",["==","$type","Point"],["<=","rank",1],["==","class","country"],["has","iso_a2"]],"layout":{"text-anchor":"center","text-field":"{name:latin}","text-font":["Metropolis Regular","Noto Sans Regular"],"text-size":{"base":1.4,"stops":[[0,10],[3,12],[4,14]]},"text-transform":"uppercase","visibility":"visible"},"paint":{"text-color":{"base":1,"stops":[[3,"rgb(157,169,177)"],[4,"rgb(153, 153, 153)"]]},"text-halo-color":"rgba(236,236,234,0.7)","text-halo-width":1.4}}],"id":"positron"}`
              }
            }]
          }
        ],
        "opacity": 1.0,
        "title": "This should be an overlay",
        "updated": "2019-02-15T11:21:59",
        "folder": "Overlays"
      },
      "type": "Feature"
    }
  ]
}
