import { IOwsContext } from "../src/lib/owc/types/owc-json";


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

  "bbox": [
    -13.68441114920683,
    28.779301457662182,
    61.0886988287346,
    64.90858361718878
  ],
  "descriptionURL": "https://code-de.org",
  "features": [
    {
      "geometry": null,
      "id": "S1_SAR_L1_GRD",
      "properties": {
        "active": false,
        "dimensions": [
          {
            "display": "P1D",
            "name": "time",
            "units": "ISO8601",
            "value": "2017-01-01/2017-01-01/P1D"
          }
        ],
        "groupName": "products",
        "offerings": [
          {
            "code": "http://schemas.opengis.net/wms/1.1.1",
            "operations": [
              {
                "code": "GetMap",
                "href": "https://geoservice.code-de.org/Sentinel1/wms?TRANSPARENT=TRUE&LAYERS=S1_SAR_L1_GRD&VERSION=1.1.1&REQUEST=GetMap&TILED=True&FORMAT=image%2Fvnd.jpeg-png&SERVICE=WMS",
                "method": "GET",
                "type": "image/vnd.jpeg-png"
              },
              {
                "code": "GetCapabilities",
                "href": "https://geoservice.code-de.org/Sentinel1/wms?VERSION=1.1.1&REQUEST=GetCapabilities&SERVICE=WMS",
                "method": "GET",
                "type": "application/xml"
              },
              {
                "code": "GetFeatureInfo",
                "href": "https://geoservice.code-de.org/Sentinel1/wms?VERSION=1.1.1&REQUEST=GetFeatureInfo&SERVICE=WMS",
                "method": "GET",
                "type": "text/html"
              }
            ]
          }
        ],
        "title": "Sentinel-1 SAR - Level 1 (Ground Range Detected)",
        "updated": "2019-02-15T13:23:28"
      },
      "type": "Feature"
    },
    {
      "geometry": null,
      "id": "S2_MSI_L1C",
      "properties": {
        "active": false,
        "dimensions": [
          {
            "display": "P1D",
            "name": "time",
            "units": "ISO8601",
            "value": "2017-01-01/2017-01-01/P1D"
          }
        ],
        "groupName": "products",
        "offerings": [
          {
            "code": "http://schemas.opengis.net/wms/1.1.1",
            "operations": [
              {
                "code": "GetMap",
                "href": "https://geoservice.code-de.org/Sentinel2/wms?TRANSPARENT=TRUE&LAYERS=S2_MSI_L1C&VERSION=1.1.1&REQUEST=GetMap&TILED=True&FORMAT=image%2Fvnd.jpeg-png&SERVICE=WMS",
                "method": "GET",
                "type": "image/vnd.jpeg-png"
              },
              {
                "code": "GetCapabilities",
                "href": "https://geoservice.code-de.org/Sentinel2/wms?VERSION=1.1.1&REQUEST=GetCapabilities&SERVICE=WMS",
                "method": "GET",
                "type": "application/xml"
              },
              {
                "code": "GetFeatureInfo",
                "href": "https://geoservice.code-de.org/Sentinel2/wms?VERSION=1.1.1&REQUEST=GetFeatureInfo&SERVICE=WMS",
                "method": "GET",
                "type": "text/html"
              }
            ],
            "styles": [
              {
                "default": true,
                "legendURL": "http://my/dummy/legendUrl",
                "name": "raster",
                "title": "Raster"
              }
            ]
          }
        ],
        "title": "Sentinel-2 MSI - Level 1C (Top-of-Atmosphere Reflectance)",
        "updated": "2019-02-15T13:23:28"
      },
      "type": "Feature"
    },
    {
      "geometry": null,
      "id": "S3_OLCI_L2_LAN",
      "properties": {
        "active": false,
        "dimensions": [
          {
            "display": "P1D",
            "name": "time",
            "units": "ISO8601",
            "value": "2017-01-01/2017-01-01/P1D"
          }
        ],
        "groupName": "products",
        "offerings": [
          {
            "code": "http://schemas.opengis.net/wms/1.1.1",
            "operations": [
              {
                "code": "GetMap",
                "href": "https://geoservice.code-de.org/Sentinel3/wms?TRANSPARENT=TRUE&LAYERS=S3_OLCI_L2_LAN&VERSION=1.1.1&REQUEST=GetMap&TILED=True&FORMAT=image%2Fvnd.jpeg-png&SERVICE=WMS",
                "method": "GET",
                "type": "image/vnd.jpeg-png"
              },
              {
                "code": "GetCapabilities",
                "href": "https://geoservice.code-de.org/Sentinel3/wms?VERSION=1.1.1&REQUEST=GetCapabilities&SERVICE=WMS",
                "method": "GET",
                "type": "application/xml"
              },
              {
                "code": "GetFeatureInfo",
                "href": "https://geoservice.code-de.org/Sentinel3/wms?VERSION=1.1.1&REQUEST=GetFeatureInfo&SERVICE=WMS",
                "method": "GET",
                "type": "text/html"
              }
            ]
          }
        ],
        "title": "Sentinel-3 OLCI - Level 2 Land Product",
        "updated": "2019-02-15T13:23:28"
      },
      "type": "Feature"
    },
    {
      "geometry": null,
      "id": "S3_OLCI_L1",
      "properties": {
        "active": false,
        "dimensions": [
          {
            "display": "P1D",
            "name": "time",
            "units": "ISO8601",
            "value": "2017-01-01/2017-01-01/P1D"
          }
        ],
        "groupName": "products",
        "offerings": [
          {
            "code": "http://schemas.opengis.net/wms/1.1.1",
            "operations": [
              {
                "code": "GetMap",
                "href": "https://geoservice.code-de.org/Sentinel3/wms?TRANSPARENT=TRUE&LAYERS=S3_OLCI_L1&VERSION=1.1.1&REQUEST=GetMap&TILED=True&FORMAT=image%2Fvnd.jpeg-png&SERVICE=WMS",
                "method": "GET",
                "type": "image/vnd.jpeg-png"
              },
              {
                "code": "GetCapabilities",
                "href": "https://geoservice.code-de.org/Sentinel3/wms?VERSION=1.1.1&REQUEST=GetCapabilities&SERVICE=WMS",
                "method": "GET",
                "type": "application/xml"
              },
              {
                "code": "GetFeatureInfo",
                "href": "https://geoservice.code-de.org/Sentinel3/wms?VERSION=1.1.1&REQUEST=GetFeatureInfo&SERVICE=WMS",
                "method": "GET",
                "type": "text/html"
              }
            ]
          }
        ],
        "title": "Sentinel-3 OLCI - Level 1B Top-of-Atmosphere Radiance",
        "updated": "2019-02-15T13:23:28"
      },
      "type": "Feature"
    }
  ],
  "id": "codede:sentinel:3035",
  "logoURL": "https://geoservice.dlr.de/static/logos/dlr.gif",
  "projections": [
    {
      "bbox": [
        2000000.0,
        1000000.0,
        6500000.0,
        5500000.0
      ],
      "code": "EPSG:3035",
      "default": true,
      "unit": "m"
    }
  ],
  "properties": {
    "abstract": "<strong>CODE-DE</strong> Sentinel1 and 2",
    "author": "Geoservice Manager",
    "authors": [
      {
        "email": "geoservice@dlr.de",
        "name": "Geoservice Manager",
        "role": "PoC"
      }
    ],
    "categories": [
      {
        "term": "WMS"
      },
      {
        "term": "DLR"
      }
    ],
    "lang": "en",
    "layerGroups": [
      {
        "collapsed": false,
        "groupName": "products",
        "title": "Products",
        "type": "checkbox"
      },
      {
        "collapsed": false,
        "groupName": "overlays",
        "title": "Overlays",
        "type": "checkbox"
      },
      {
        "collapsed": false,
        "groupName": "base",
        "title": "Basemaps",
        "type": "radio"
      }
    ],
    "links": null,
    "publisher": "German Aerospace Center (DLR)",
    "title": "CODE-DE Sentinel 1 and 2 (EPSG:3035)",
    "updated": "2019-02-15T13:23:28"
  },
  "type": "FeatureCollection"
}

export const exampleContext: IOwsContext = {

  "bbox": [
    3.797648356603374,
    46.38508762530201,
    18.135928552479946,
    55.24338464819807
  ],
  "descriptionURL": "https://resa.planet.com/",
  "features": [
    {
      "geometry": null,
      "id": "RESA_L3M_GERMANY_2015",
      "properties": {
        "active": false,
        "groupName": "products",
        "offerings": [
          {
            "code": "http://schemas.opengis.net/wms/1.1.0",
            "operations": [
              {
                "code": "GetMap",
                "href": "https://geoservice.dlr.de/eoc/imagery/wms?VERSION=1.1.0&REQUEST=GetMap&LAYERS=RESA_L3M_GERMANY_2015&TILED=False&FORMAT=image%2Fvnd.jpeg-png&SERVICE=WMS&TRANSPARENT=TRUE",
                "method": "GET",
                "type": "image/vnd.jpeg-png"
              },
              {
                "code": "GetCapabilities",
                "href": "https://geoservice.dlr.de/eoc/imagery/wms?VERSION=1.1.0&REQUEST=GetCapabilities&SERVICE=WMS",
                "method": "GET",
                "type": "application/xml"
              },
              {
                "code": "GetFeatureInfo",
                "href": "https://geoservice.dlr.de/eoc/imagery/wms?VERSION=1.1.0&REQUEST=GetFeatureInfo&SERVICE=WMS",
                "method": "GET",
                "type": "text/html"
              }
            ],
            "styles": [
              {
                "default": true,
                "legendURL": "http://my/dummy/legendUrl",
                "name": "raster",
                "title": "raster"
              }
            ]
          }
        ],
        "title": "RapidEye RESA - L3M Mosaic - Germany, 2015",
        "updated": "2019-02-15T11:22:07"
      },
      "type": "Feature"
    }
  ],
  "id": "de:resa:mosaic",
  "logoURL": "https://geoservice.dlr.de/static/logos/planet_dlr_logo.png",
  "previewURL": "/data/owc/images/map-preview-de_resa_mosaic.jpg",
  "projections": [
    {
      "bbox": [
        100000.0,
        5150000.0,
        1080000.0,
        6160000.0
      ],
      "code": "EPSG:25832",
      "default": true,
      "unit": "m"
    }
  ],
  "properties": {
    "abstract": "<p>The RapidEye RESA Germany Mosaic provides a nearly cloud-free view of the country's geography, natural resources, and infrastructure. It is composed of 374,240 sqkm of multi-spectral RapidEye imagery, acquired between April and October 2015. The\n      product is being provided in the framework of the RapidEye Science Archive (RESA) agreement. Co-funded by the German Federal Government, the fleet of RapidEye satellites were launched from the Baikonur cosmodrome in Kazakhstan in 2008. The satellites\n      are now owned by Planet Labs, Inc. The RapidEye Earth observation system comprises five satellites equipped with high-resolution optical sensors. With a spatial resolution of 6.5 m the 5-band instruments operate in the visible and near-infrared\n      portions of the electromagnetic spectrum. With its high repetition rate the RapidEye constellation can image each point on the Earth's at least once per day.<p>\n      <p>For more information see the <a href=\"http://www.dlr.de/rd/en/desktopdefault.aspx/tabid-2440/3586_read-5336/\">DLR Earth Observation projects page</a> or the <a href=\"https://www.planet.com/products/planet-imagery/\">Planet Website</a>.<p>",
    "author": "Geoservice Manager",
    "authors": [
      {
        "email": "geoservice@dlr.de",
        "name": "Geoservice Manager",
        "role": "PoC"
      }
    ],
    "categories": [
      {
        "term": "DLR"
      },
      {
        "term": "Planet"
      },
      {
        "term": "RapidEye"
      },
      {
        "term": "Germany"
      },
      {
        "term": "RESA"
      },
      {
        "term": "Mosaic"
      },
      {
        "term": "2015"
      },
      {
        "term": "Orthoimagery"
      }
    ],
    "lang": "en",
    "layerGroups": [
      {
        "collapsed": false,
        "groupName": "products",
        "title": "Products",
        "type": "checkbox"
      },
      {
        "collapsed": false,
        "groupName": "overlays",
        "title": "Overlays",
        "type": "checkbox"
      },
      {
        "collapsed": false,
        "groupName": "base",
        "title": "Basemaps",
        "type": "radio"
      }
    ],
    "links": null,
    "publisher": "German Aerospace Center (DLR)",
    "title": "RapidEye RESA - L3M Mosaic - Germany",
    "updated": "2019-02-15T11:22:07"
  },
  "type": "FeatureCollection"
};

