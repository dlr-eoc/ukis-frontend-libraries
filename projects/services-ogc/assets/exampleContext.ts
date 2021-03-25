import { IOwsContext } from '../src/lib/owc/types/owc-json';


export const barebonesContext: IOwsContext = {
  id: 'test context',
  type: 'FeatureCollection',
  properties: {
    links: {
      profiles: ['http://www.opengis.net/spec/owc-geojson/1.0/req/core'],
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
            value: '2017-01-01/2017-01-01/P1D'
          }
        ],
        groupName: 'products',
        offerings: [
          {
            code: 'http://schemas.opengis.net/wms/1.1.1',
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
            value: '2017-01-01/2017-01-01/P1D'
          }
        ],
        groupName: 'products',
        offerings: [
          {
            code: 'http://schemas.opengis.net/wms/1.1.1',
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
            value: '2017-01-01/2017-01-01/P1D'
          }
        ],
        groupName: 'products',
        offerings: [
          {
            code: 'http://schemas.opengis.net/wms/1.1.1',
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
            value: '2017-01-01/2017-01-01/P1D'
          }
        ],
        groupName: 'products',
        offerings: [
          {
            code: 'http://schemas.opengis.net/wms/1.1.1',
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
            code: 'http://schemas.opengis.net/wms/1.1.0',
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


// as described here: http://www.owscontext.org/owc_user_guide/C0_userGuide.html
export const userGuideContext: IOwsContext = {
  "type": "FeatureCollection",
  "properties": {
      "lang": "en",
      "title": "Export--2016-09-30T16:18:30",
      "updated": "2016-09-30T16:18:30Z",
      "links": [{
          "rel": "profile",
          "href": "http://www.opengis.net/spec/owc-geojson/1.0/req/core",
          "title": "This file is compliant with version 1.0 of OWS Context"
      }],
      "authors": [{
          "name": "Envitia",
          "email": "support@envitia.com",
          "uri": "http://www.envitia.com"
      }]
  },
  "id": 1475248710263,
  "bbox": [
      -154.30193347887,
      -20.206335142339,
      57.363088142915,
      91.295774461995
  ],
  "features": [
      {
          "properties": {
              "title": "Intervisibility",
              "updated": "2016-09-30T16:18:30Z",
              "content": "Intervisibility",
              "categories": [
                  {
                      "term": true,
                      "scheme": "http://www.opengis.net/owc/active"
                  },
                  {
                      "term": 1,
                      "scheme": "http://www.envitia.com/horizon/layer/opacity"
                  }
              ],
              "offerings": [{
                  "code": "http://www.opengis.net/spec/owc-geojson/1.0/req/wps",
                  "operations": [
                      {
                          "code": "GetCapabilities",
                          "method": "GET",
                          "type": "text/xml",
                          "href": "http://10.68.2.68:11080/MapLinkOGCServices/OGC?REQUEST=GetCapabilities&SERVICE=WPS&VERSION=1.0.0"
                      },
                      {
                          "code": "Execute",
                          "method": "POST",
                          "href": "http://10.68.2.68:11080/MapLinkOGCServices/OGC?",
                          "request": {
                              "type": "text/xml",
                              "request": "<wps:Execute service=\"WPS\" version=\"1.0.0\" xmlns:wps=\"http://www.opengis.net/wps/1.0.0\" xmlns:ows=\"http://www.opengis.net/ows/1.1\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://www.opengis.net/wps/1.0.0 ..\\schemas\\wps\\1.0.0\\wps\\Execute_request.xsd\"><ows:Identifier>MultiViewShed<\/ows:Identifier><wps:DataInputs><wps:Input><ows:Identifier>source<\/ows:Identifier><ows:Title>source<\/ows:Title><wps:Data><wps:LiteralData>britsouthlatlon<\/wps:LiteralData><\/wps:Data><\/wps:Input><wps:Input><ows:Identifier>view_htype<\/ows:Identifier><ows:Title>view_htype<\/ows:Title><wps:Data><wps:LiteralData>groundHeight<\/wps:LiteralData><\/wps:Data><\/wps:Input><wps:Input><ows:Identifier>view_maxRadius<\/ows:Identifier><ows:Title>view_maxRadius<\/ows:Title><wps:Data><wps:LiteralData>10000<\/wps:LiteralData><\/wps:Data><\/wps:Input><wps:Input><ows:Identifier>target_height<\/ows:Identifier><ows:Title>target_height<\/ows:Title><wps:Data><wps:LiteralData>0<\/wps:LiteralData><\/wps:Data><\/wps:Input><wps:Input><ows:Identifier>target_htype<\/ows:Identifier><ows:Title>target_htype<\/ows:Title><wps:Data><wps:LiteralData>groundHeight<\/wps:LiteralData><\/wps:Data><\/wps:Input><wps:Input><ows:Identifier>requiredDisplayWidth<\/ows:Identifier><ows:Title>requiredDisplayWidth<\/ows:Title><wps:Data><wps:LiteralData>143<\/wps:LiteralData><\/wps:Data><\/wps:Input><wps:Input><ows:Identifier>requiredDisplayHeight<\/ows:Identifier><ows:Title>requiredDisplayHeight<\/ows:Title><wps:Data><wps:LiteralData>89<\/wps:LiteralData><\/wps:Data><\/wps:Input><wps:Input><ows:Identifier>displayStyle<\/ows:Identifier><ows:Title>displayStyle<\/ows:Title><wps:Data><wps:LiteralData>redGreen<\/wps:LiteralData><\/wps:Data><\/wps:Input><wps:Input><ows:Identifier>viewPoints<\/ows:Identifier><ows:Title>viewPoints<\/ows:Title><wps:Data><wps:LiteralData>&lt;gml:LineString srsName=&quot;EPSG:4326&quot;&gt;&lt;gml:posList srsDimension=&quot;3&quot;&gt;51.588791004021 -3.0247492773309 0   &lt;/gml:posList&gt;&lt;/gml:LineString&gt;<\/wps:LiteralData><\/wps:Data><\/wps:Input><wps:Input><ows:Identifier>requiredDisplayExtent<\/ows:Identifier><ows:Title>requiredDisplayExtent<\/ows:Title><wps:Data><wps:BoundingBoxData crs=\"EPSG:4326\"><ows:LowerCorner>-3.11458080574287 51.532798732668745<\/ows:LowerCorner><ows:UpperCorner>-2.934917748918966 51.644713993337504<\/ows:UpperCorner><\/wps:BoundingBoxData><\/wps:Data><\/wps:Input><\/wps:DataInputs><wps:ResponseForm><wps:ResponseDocument><wps:Output mimeType=\"image/png\" asReference=\"true\"><ows:Identifier>image<\/ows:Identifier><\/wps:Output><\/wps:ResponseDocument><\/wps:ResponseForm><\/wps:Execute>"
                          }
                      }
                  ]
              }]
          },
          "type": "Feature",
          "id": "OpenLayers_Layer_Image_135270",
          "geometry": {
              "type": "Polygon",
              "coordinates": [[
                  [
                      -3.11458080574287,
                      51.532798732668745
                  ],
                  [
                      -3.11458080574287,
                      51.644713993337504
                  ],
                  [
                      -2.934917748918966,
                      51.644713993337504
                  ],
                  [
                      -2.934917748918966,
                      51.532798732668745
                  ],
                  [
                      -3.11458080574287,
                      51.532798732668745
                  ]
              ]]
          }
      },
      {
          "properties": {
              "title": "us__countiescountiesType",
              "updated": "2016-09-30T16:18:30Z",
              "content": "us__countiescountiesType",
              "categories": [
                  {
                      "term": true,
                      "scheme": "http://www.opengis.net/owc/active"
                  },
                  {
                      "term": 1,
                      "scheme": "http://www.envitia.com/horizon/layer/opacity"
                  }
              ],
              "offerings": [{
                  "code": "http://www.opengis.net/spec/owc-geojson/1.0/req/wfs",
                  "operations": [
                      {
                          "code": "GetCapabilities",
                          "method": "GET",
                          "href": "http://demo.luciad.com:8080/LuciadFusion/wfs?REQUEST=GetCapabilities&SERVICE=WFS"
                      },
                      {
                          "code": "GetFeature",
                          "method": "GET",
                          "href": "http://demo.luciad.com:8080/LuciadFusion/wfs?REQUEST=GetFeature&SERVICE=WFS&VERSION=1.0.0&BBOX=-154.30193347887,-20.206335142339,57.363088142915,91.295774461995&NAMESPACES=xmlns(feature,null)&TYPENAME=feature:us__countiescountiesType"
                      }
                  ]
              }]
          },
          "type": "Feature",
          "id": "OpenLayers_Layer_Vector_134151",
          "geometry": {
              "type": "Polygon",
              "coordinates": [[
                  [
                      -180,
                      -90
                  ],
                  [
                      -180,
                      90
                  ],
                  [
                      180,
                      90
                  ],
                  [
                      180,
                      -90
                  ],
                  [
                      -180,
                      -90
                  ]
              ]]
          }
      },
      {
          "properties": {
              "title": "us_counties",
              "updated": "2016-09-30T16:18:30Z",
              "content": "us_counties",
              "categories": [
                  {
                      "term": true,
                      "scheme": "http://www.opengis.net/owc/active"
                  },
                  {
                      "term": 1,
                      "scheme": "http://www.envitia.com/horizon/layer/opacity"
                  }
              ],
              "offerings": [{
                  "code": "http://www.opengis.net/spec/owc-geojson/1.0/req/wms",
                  "operations": [
                      {
                          "code": "GetCapabilities",
                          "method": "GET",
                          "href": "http://demo.luciad.com:8080/LuciadFusion/wms?REQUEST=GetCapabilities&SERVICE=WMS"
                      },
                      {
                          "code": "GetMap",
                          "method": "GET",
                          "href": "http://demo.luciad.com:8080/LuciadFusion/wms?REQUEST=GetMap&SERVICE=WMS&TRANSPARENT=true&LAYERS=us_counties&FORMAT=image/png&VERSION=1.1.1&STYLES=&SRS=EPSG:4326&WIDTH=1680&HEIGHT=885&BBOX=-154.30193347887,-20.206335142339,57.363088142915,91.295774461995"
                      }
                  ]
              }]
          },
          "type": "Feature",
          "id": "OpenLayers_Layer_WMS_133883",
          "geometry": {
              "type": "Polygon",
              "coordinates": [[
                  [
                      -178.21502685547,
                      18.924781799316
                  ],
                  [
                      -178.21502685547,
                      71.406646728516
                  ],
                  [
                      -66.969848632813,
                      71.406646728516
                  ],
                  [
                      -66.969848632813,
                      18.924781799316
                  ],
                  [
                      -178.21502685547,
                      18.924781799316
                  ]
              ]]
          }
      },
      {
          "properties": {
              "title": "BlueMarbleCov",
              "updated": "2016-09-30T16:18:30Z",
              "content": "BlueMarbleCov",
              "categories": [
                  {
                      "term": true,
                      "scheme": "http://www.opengis.net/owc/active"
                  },
                  {
                      "term": 1,
                      "scheme": "http://www.envitia.com/horizon/layer/opacity"
                  }
              ],
              "offerings": [{
                  "code": "http://www.opengis.net/spec/owc-geojson/1.0/req/wcs",
                  "operations": [
                      {
                          "code": "GetCapabilities",
                          "method": "GET",
                          "type": "text/xml",
                          "href": "http://ows.rasdaman.org/rasdaman/ows?REQUEST=GetCapabilities&SERVICE=WCS&VERSION=2.0.0"
                      },
                      {
                          "code": "GetCoverage",
                          "method": "GET",
                          "href": "http://ows.rasdaman.org/rasdaman/ows?SCALEFACTOR=10.174297058223718&format=image/png&CoverageId=BlueMarbleCov&request=GetCoverage&version=2.0.0&service=WCS"
                      }
                  ]
              }]
          },
          "type": "Feature",
          "id": "OpenLayers_Layer_Image_134365",
          "geometry": {
              "type": "Polygon",
              "coordinates": [[
                  [
                      -180,
                      -90
                  ],
                  [
                      -180,
                      90
                  ],
                  [
                      180,
                      90
                  ],
                  [
                      180,
                      -90
                  ],
                  [
                      -180,
                      -90
                  ]
              ]]
          }
      }
  ]
};


export const wfsContext: IOwsContext = {
  "id": "ndvi",
  "type": "FeatureCollection",
  "bbox": [
      8.0419921875,
      47.025206001585396,
      14.809570312499998,
      50.764259357116465
  ],
  "properties": {
      "lang": "EN",
      "links": [],
      "title": "Wuekis NDVI OWC",
      "updated": "2021-03-10T16:18:30Z"
  },
  "features": [
      {
          "id": "ndvi:AGRODE_S2_EVI_P1M",
          "type": "Feature",
          "geometry": null,
          "properties": {
              "title": "AGRODE_S2_EVI_P1M",
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
                              "href": "https://geoservice.dlr.de/eoc/land/wms?service=WMS&version=1.1.0&request=GetMap&layers=AGRODE_S2_EVI_P1M&srs=EPSG%3A4326&format=image/png"
                          }
                      ],
                      "styles": [
                          {
                              "title": "land:agrode-evi-mean",
                              "legendURL": "https://geoservice.dlr.de/eoc/land/wms?service=WMS&version=1.1.0&request=GetLegendGraphic&layer=AGRODE_S2_EVI_P1M&srs=EPSG%3A4326&format=image/png&LEGEND_OPTIONS=forceLabels:on;fontAntiAliasing:true;",
                              "name": "land:agrode-evi-mean",
                              "default": true
                          }
                      ]
                  }
              ],
              "categories": [],
              "customAttributes": {}
          },
          "bbox": [
              23.225,
              54.737,
              29.838,
              57.243
          ]
      },
      {
          "id": "ndvi:AGRODE_S2_NDVI_P1M",
          "type": "Feature",
          "geometry": null,
          "properties": {
              "title": "AGRODE_S2_NDVI_P1M",
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
                              "href": "https://geoservice.dlr.de/eoc/land/wms?service=WMS&version=1.1.0&request=GetMap&layers=AGRODE_S2_NDVI_P1M&srs=EPSG%3A4326&format=image/png"
                          }
                      ],
                      "styles": [
                          {
                              "title": "land:agrode-evi-mean",
                              "legendURL": "https://geoservice.dlr.de/eoc/land/wms?service=WMS&version=1.1.0&request=GetLegendGraphic&layer=AGRODE_S2_NDVI_P1M&srs=EPSG%3A4326&format=image/png&LEGEND_OPTIONS=forceLabels:on;fontAntiAliasing:true;",
                              "name": "land:agrode-evi-mean",
                              "default": true
                          }
                      ]
                  }
              ],
              "categories": [],
              "customAttributes": {}
          },
          "bbox": [
              23.225,
              54.737,
              29.838,
              57.243
          ]
      },
      {
          "id": "ndvi:GSP_DAILY",
          "type": "Feature",
          "geometry": null,
          "properties": {
              "title": "GSP_DAILY",
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
                              "href": "https://geoservice.dlr.de/eoc/land/wms?service=WMS&version=1.1.0&request=GetMap&layers=GSP_DAILY&srs=EPSG%3A4326&format=image/png"
                          }
                      ],
                      "styles": [
                          {
                              "title": "land:gsp_daily",
                              "legendURL": "https://geoservice.dlr.de/eoc/land/wms?service=WMS&version=1.1.0&request=GetLegendGraphic&layer=GSP_DAILY&srs=EPSG%3A4326&format=image/png&LEGEND_OPTIONS=forceLabels:on;fontAntiAliasing:true;",
                              "name": "land:gsp_daily",
                              "default": true
                          }
                      ]
                  }
              ],
              "dimensions": [
                  {
                      "display": "P1D",
                      "name": "time",
                      "units": "ISO8601",
                      "value": "2017-01-01/2017-01-01/P1D"
                  }
              ],
              "categories": [],
              "customAttributes": {}
          },
          "bbox": [
              8.0419921875,
              47.025206001585396,
              14.809570312499998,
              50.764259357116465
          ]
      },
      {
          "properties": {
              "title": "NDVI",
              "updated": "2016-09-30T16:18:30Z",
              "content": "NDVI",
              "categories": [],
              "offerings": [
                  {
                      "code": "http://www.opengis.net/spec/owc-geojson/1.0/req/wfs",
                      "operations": [
                          {
                              "code": "GetCapabilities",
                              "method": "GET",
                              "href": "https://ahocevar.com/geoserver/wfs?service=WFS&request=GetCapabilities"
                          },
                          {
                              "code": "GetFeature",
                              "method": "GET",
                              "href": "https://ahocevar.com/geoserver/wfs?service=WFS&request=GetFeature&outputFormat=application/json&version=1.1.0&srsname=EPSG:3857&typenames=usa:states&cql_filter=STATE_NAME=%27Pennsylvania%27"
                          }
                      ]
                  }
              ]
          },
          "type": "Feature",
          "id": "OpenLayers_Layer_Vector_134151",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          8.4375,
                          47.17477833929903
                      ],
                      [
                          14.414062499999998,
                          47.17477833929903
                      ],
                      [
                          14.414062499999998,
                          50.62507306341435
                      ],
                      [
                          8.4375,
                          50.62507306341435
                      ],
                      [
                          8.4375,
                          47.17477833929903
                      ]
                  ]
              ]
          }
      }
  ]
};
