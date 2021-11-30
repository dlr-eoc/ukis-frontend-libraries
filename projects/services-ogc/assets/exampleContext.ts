import { IOwsContext, IOwsOffering, IOwsResource } from '../src/lib/owc/types/owc-json';
import { IEocOwsContext, IEocOwsOffering, IEocOwsResource, IEocOwsTimeDimension } from '../src/lib/owc/types/eoc-owc-json';
import customPositron from '../assets/open-map-style.json';
import testGeojson from '../assets/testGeoJson.json';


/**
 * check https://github.com/opengeospatial/owscontext/tree/master/json/dev/trax/json
 */

export const barebonesContext: IOwsContext = {
  id: 'barebonesContext',
  type: 'FeatureCollection',
  properties: {
    links: {
      profiles: [{
        href: 'http://www.opengis.net/spec/owc-geojson/1.0/req/core'
      }],
    },
    lang: 'en',
    title: 'Minimal Context with mandatory properties',
    updated: '2018-11-28T00:00:00'
  },
  features: []
};

export const baseWMSGetMapParams = new URLSearchParams('SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=WSF_2015');
export const baseWMSOffering: IOwsOffering = {
  code: 'http://www.opengis.net/spec/owc-geojson/1.0/req/wms',
  operations: [
    {
      code: 'GetCapabilities',
      method: 'GET',
      href: `https://geoservice.dlr.de/eoc/land/wms/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities`
    },
    {
      code: 'GetMap',
      method: 'GET',
      href: `https://geoservice.dlr.de/eoc/land/wms/wms?${baseWMSGetMapParams.toString()}`
    },
    {
      code: 'GetFeatureInfo',
      method: 'GET',
      href: 'https://geoservice.dlr.de/eoc/land/wms/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=WSF_2015'
    }
  ],
  styles: [
    {
      name: 'wsf',
      title: 'World Settlement Footprint 2015',
      default: true,
      legendURL: 'https://geoservice.dlr.de/eoc/land/wms/wms?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=WSF_2015&style=wsf'
    }
  ]
};
export const baseWMSLayer: IOwsResource = {
  type: 'Feature',
  id: 'baseWMSLayer',
  geometry: null,
  properties: {
    title: 'WMS Offering',
    updated: '2021-11-09T09:02:20Z',
    date: '2015',
    active: true,
    abstract: 'World Settlement Footprint 2015',
    folder: 'Layers/RasterLayers',
    rights: '&copy; <a href="http://www.dlr.de" target="_blank">DLR</a>',
    offerings: [
      baseWMSOffering
    ],
    categories: [
      {
        term: 'land'
      },
      {
        term: 'urbanization'
      },
      {
        term: 'global'
      }
    ]
  },
  bbox: [
    -180.01007601815968,
    -60.01006609352275,
    180.01007601819816,
    78.0100585990529
  ]
};

export const baseWMTSGetTileParams = new URLSearchParams('SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=eoc%3Abasemap&FORMAT=image/png');
export const baseWMTSOffering: IOwsOffering = {
  code: 'http://www.opengis.net/spec/owc-geojson/1.0/req/wmts',
  operations: [
    {
      code: 'GetCapabilities',
      method: 'GET',
      href: 'https://tiles.geoservice.dlr.de/service/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities'
    },
    {
      code: 'GetTile',
      method: 'GET',
      href: `https://tiles.geoservice.dlr.de/service/wmts?${baseWMTSGetTileParams.toString()}`
    },
    {
      code: 'GetFeatureInfo',
      method: 'GET',
      href: 'https://tiles.geoservice.dlr.de/service/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetFeatureInfo&LAYERS=eoc%3Abasemap'
    }
  ],
  /** to skip getMatrixSetForWMTS because matrixSets are not definde on IOwsOffering */
  matrixSets: null
};
export const baseWMTSLayer: IOwsResource = {
  type: 'Feature',
  id: 'baseWMTSLayer',
  geometry: null,
  properties: {
    title: 'WMTS Offering',
    updated: '2021-11-09T09:43:37Z',
    active: true,
    abstract: 'This is the basemap for DLR Service Portals',
    folder: 'RasterLayers',
    offerings: [
      baseWMTSOffering
    ]
  },
  bbox: [
    -180,
    -90,
    180,
    90
  ]
};

export const baseWFSGetFeatureParams = new URLSearchParams('SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAME=osm%3Aosm_boundaries_gen1&OUTPUTFORMAT=application%2Fjson');
export const baseWFSOffering: IOwsOffering = {
  code: 'http://www.opengis.net/spec/owc-geojson/1.0/req/wfs',
  operations: [
    {
      code: 'GetCapabilities',
      method: 'GET',
      href: 'https://geoservice.dlr.de/eoc/basemap/wfs/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetCapabilities'
    },
    {
      code: 'GetFeature',
      method: 'GET',
      href: `https://geoservice.dlr.de/eoc/basemap/wfs/wfs?${baseWFSGetFeatureParams.toString()}`,
      type: 'application/json'
    }
  ]
};
export const baseWFSLayer: IOwsResource = {
  type: 'Feature',
  id: 'baseWFSLayer',
  geometry: null,
  properties: {
    title: 'WFS Offering',
    updated: '2021-11-09T09:34:51Z',
    folder: 'VectorLayers',
    offerings: [
      baseWFSOffering
    ],
    active: true
  },
  bbox: [
    -180,
    -89.0000000381628,
    179.999999917187,
    83.8751719209928
  ]
};

export const baseKMLOffering: IOwsOffering = {
  code: 'http://www.opengis.net/spec/owc-geojson/1.0/req/kml',
  contents: [
    {
      type: 'application/vnd.google-earth.kml+xml',
      href: 'assets/data/kml/TimeZones.kml'
    }
  ]
};
export const baseKMLLayer: IOwsResource = {
  type: 'Feature',
  id: 'baseKMLLayer',
  geometry: null,
  properties: {
    title: 'KML Offering - url',
    updated: '2021-11-09T12:00:00',
    authors: [
      {
        email: 'geoservice@dlr.de',
        name: 'Earth Observation Center (EOC), DLR',
        uri: 'https://geoservice.dlr.de/web/contact'
      }
    ],
    folder: 'VectorLayers',
    abstract: 'KML Data Offering from url',
    offerings: [
      baseKMLOffering
    ]
  }
};

export const basicOgcOwsContext: IOwsContext = {
  id: 'basicOgcOwsContext',
  type: 'FeatureCollection',
  properties: {
    links: {
      profiles: [{
        href: 'http://www.opengis.net/spec/owc-geojson/1.0/req/core'
      }],
      via: [{
        href: 'https://geoservice.dlr.de/web/services',
        type: 'application/xml',
        title: 'Eoc Geoservice GetCapabilities',
        lang: 'en'
        // length: number; // Hint about the content length in octets of the representation returned when the IRI in the href attribute is mapped to a URI and dereferenced.
      }]
    },
    lang: 'en',
    title: 'Eoc Geoservice WMS, WMTS and WFS',
    updated: '2021-11-09T12:00:00',
    subtitle: 'Derived Contexts from Eoc Geoservice GetCapabilities',
    authors: [
      {
        email: 'geoservice@dlr.de',
        name: 'Earth Observation Center (EOC), DLR',
        uri: 'https://geoservice.dlr.de/web/contact'
      }
    ],
    publisher: 'EOC-DLR',
    generator: {
      title: 'OWS Context file generator',
      uri: '.../ows-context.git',
      version: '0.1.0'
    },
    display: [],
    rights: 'Information about rights held in and over the Context document',
    date: '2019-02-15T13:23:28',
    categories: [
      {
        term: 'WMS'
      },
      {
        term: 'DLR'
      }
    ],
    abstract: '<strong>CODE-DE</strong> Sentinel1 and 2',
    author: 'Geoservice Manager'
  },
  /** bbox is not created for all layers */
  bbox: [
    -13.68441114920683,
    28.779301457662182,
    61.0886988287346,
    64.90858361718878
  ],
  features: [baseWMSLayer, baseWFSLayer, baseWMTSLayer, baseKMLLayer]
};

/** ---------IEoc Extensions----------------------- */
/** Context Fragments */

export const eocTimeDimensionsSteps: IEocOwsTimeDimension = {
  name: 'time',
  values: `2020-01-08T16:07:00.000Z,2020-01-20T16:07:00.000Z,2020-02-01T16:07:00.000Z`,
  units: 'ISO8601',
  display: {
    format: 'yyyy-MM-dd'
  }
};

export const eocTimeDimensionsInterval: IEocOwsTimeDimension = {
  name: 'time',
  values: `2016-01-01T00:00:00.000Z/2018-01-01T00:00:00.000Z`,
  units: 'ISO8601',
  display: {
    period: 'P1Y',
    format: 'yyyy-MM-dd'
  }
};

export const eocTimeDimensionsIntervalPeriod: IEocOwsTimeDimension = {
  name: 'time',
  values: `2016-01-01T00:00:00.000Z/2018-01-01T00:00:00.000Z/P1Y`,
  units: 'ISO8601',
  display: {
    format: 'yyyy-MM-dd'
  }
};

export const eocTimeDimensionsIntervalPeriodSteps: IEocOwsTimeDimension = {
  name: 'time',
  values: `1984-01-01T00:00:00.000Z/1989-12-31T23:59:59.000Z/P1Y,1990-01-01T00:00:00.000Z/1994-12-31T23:59:59.000Z/P1Y,1995-01-01T00:00:00.000Z/1999-12-31T23:59:59.000Z/P1Y`,
  units: 'ISO8601',
  display: {
    format: 'yyyy-MM-dd'
  }
};

export const eocTimeDimensionsIntervalPeriodStepsAndSteps: IEocOwsTimeDimension = {
  name: 'time',
  values: `1984-01-01T00:00:00.000Z/1989-12-31T23:59:59.000Z/P1Y,1990-01-01T00:00:00.000Z,1991-01-01T00:00:00.000Z,1992-01-01T00:00:00.000Z,1993-01-01T00:00:00.000Z/1994-12-31T23:59:59.000Z`,
  units: 'ISO8601',
  display: {
    format: 'yyyy-MM-dd'
  }
};

/** Context Resources */
export const eocTMSOffering: IEocOwsOffering = {
  code: 'http://www.opengis.net/spec/owc-geojson/1.0/req/tms',
  operations: [
    {
      code: 'REST',
      href: 'https://tiles.geoservice.dlr.de/service/tms/1.0.0/eoc%3Abasemap@EPSG%3A3857@png/{z}/{x}/{-y}.png',
      method: 'GET',
      type: 'image/png'
    }
  ]
};
export const eocTMSLayer: IEocOwsResource = {
  geometry: null,
  id: 'eocRasterTMSLayer',
  properties: {
    active: false,
    offerings: [
      eocTMSOffering
    ],
    title: 'TMS - EOC Basemap',
    updated: '2021-11-30T12:00:00'
  },
  type: 'Feature'
};

export const eocVectortileOffering: IEocOwsOffering = {
  code: 'http://www.opengis.net/spec/owc-geojson/1.0/req/tms',
  operations: [
    {
      code: 'REST',
      href: 'https://{s}.tiles.geoservice.dlr.de/service/tms/1.0.0/planet_eoc@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf?flipy=true',
      method: 'GET',
      type: 'application/vnd.mapbox-vector-tile'
    }
  ],
  styles: [{
    name: 'planet_eoc',
    title: 'grayscale',
    abstract: 'This is a slightly modified version of Positron style @see: https://github.com/openmaptiles/positron-gl-style/blob/master/LICENSE.md',
    content: {
      type: 'OpenMapStyle',
      styleSource: 'planet0-12',
      content: JSON.stringify(customPositron)
    }
  }]
};
export const eocVectortileLayer: IEocOwsResource = {
  geometry: null,
  id: 'eocVectorTMSLayer',
  properties: {
    active: true,
    opacity: 1.0,
    title: 'VectorTile Layer',
    updated: '2019-02-15T11:21:59',
    shards: 'a-d',
    rights: '© OpenMapTiles © OpenStreetMap contributors',
    offerings: [
      eocVectortileOffering
    ]
  },
  type: 'Feature'
};

export const eocWMSOffering: IEocOwsOffering = {
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
};
export const eocWMSLayer: IEocOwsResource = {
  geometry: null,
  id: 'eocWMSLayer',
  properties: {
    active: false,
    offerings: [
      eocWMSOffering
    ],
    minZoom: 4,
    maxZoom: 16,
    title: 'RapidEye RESA - L3M Mosaic - Germany, 2015',
    updated: '2019-02-15T11:22:07',
    dimensions: [eocTimeDimensionsSteps]
  },
  type: 'Feature'
};

export const eoxWMTSGetTileParams = new URLSearchParams('SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=eoc%3Abasemap&FORMAT=image/png');
export const eocWMTSOffering: IEocOwsOffering = {
  code: 'http://www.opengis.net/spec/owc-geojson/1.0/req/wmts',
  operations: [
    {
      code: 'GetCapabilities',
      method: 'GET',
      href: 'https://tiles.geoservice.dlr.de/service/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities'
    },
    {
      code: 'GetTile',
      method: 'GET',
      href: `https://tiles.geoservice.dlr.de/service/wmts?${eoxWMTSGetTileParams.toString()}`
    },
    {
      code: 'GetFeatureInfo',
      method: 'GET',
      href: 'https://tiles.geoservice.dlr.de/service/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetFeatureInfo&LAYERS=eoc%3Abasemap'
    }
  ],
  matrixSets: [
    {
      "srs": "EPSG:3857",
      "matrixSet": "GoogleMapsCompatible",
      "matrixIds": [
        "0",
        "1",
        "2",
        "3",
        "4"
      ],
      "origin": {
        "x": 20037508.342789,
        "y": -20037508.342789
      },
      "resolutions": [
        279541132.01435887813568115234,
        139770566.00717940926551818848,
        69885283.00358971953392028809,
        34942641.50179485976696014404,
        17471320.75089742988348007202,
      ],
      "tilesize": {
        "height": 256,
        "width": 256
      }
    }
  ]
}
export const eocWMTSLayer: IEocOwsResource = {
  type: 'Feature',
  id: 'eocWMTSLayer',
  geometry: null,
  properties: {
    title: 'WMTS Offering - matrixSet',
    updated: '2021-11-09T09:43:37Z',
    active: true,
    abstract: 'This is the basemap for DLR Service Portals',
    folder: 'RasterLayers',
    offerings: [
      eocWMTSOffering
    ]
  },
  bbox: [
    -180,
    -90,
    180,
    90
  ]
};

export const eocWFSoffering: IEocOwsOffering = {
  code: 'http://www.opengis.net/spec/owc-geojson/1.0/req/wfs',
  operations: [
    {
      code: 'GetCapabilities',
      method: 'GET',
      href: 'https://geoservice.dlr.de/eoc/basemap/wfs/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetCapabilities'
    },
    {
      code: 'GetFeature',
      method: 'GET',
      href: 'https://geoservice.dlr.de/eoc/basemap/wfs/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAME=tm%3Atm_world_borders_simpl&OUTPUTFORMAT=application%2Fjson',
      type: 'application/json'
    }
  ],
  styles: []
};
export const eocWFSLayer: IEocOwsResource = {
  type: 'Feature',
  geometry: null,
  id: 'eocWFSLayer',
  properties: {
    title: 'tm world borders simpl',
    updated: '2021-11-09T09:34:51Z',
    abstract: 'tm world borders simpl',
    offerings: [
      eocWFSoffering
    ],
    active: true
  },
  'bbox': [
    -180,
    -90,
    180.000001907349,
    83.5702686309814
  ]

};

export const eocXyzOffering: IEocOwsOffering = {
  code: 'http://www.opengis.net/spec/owc-geojson/1.0/req/xyz',
  operations: [
    {
      code: 'REST',
      href: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      method: 'GET',
      type: 'image/png'
    }
  ],
  styles: [
    {
      default: true,
      legendURL: 'https://c.tile.openstreetmap.org/11/1221/1142.png',
      name: 'raster',
      title: 'raster'
    }
  ]
};
export const eocXyzLayer: IEocOwsResource = {
  geometry: null,
  id: 'eocXyzLayer',
  properties: {
    active: false,
    shards: 'a-c',
    title: 'XYZ - OSM Tiles',
    rights: '© OpenStreetMap contributors',
    updated: '2019-02-15T11:22:07',
    offerings: [
      eocXyzOffering
    ]
  },
  type: 'Feature'
};

export const eocGeojsonOffering: IEocOwsOffering = {
  code: 'http://www.opengis.net/spec/owc-geojson/1.0/req/geojson',
  contents: [
    {
      type: 'application/geo+json',
      content: JSON.stringify(testGeojson)
    }
  ]
};
export const eocGeojsonLayer: IEocOwsResource = {
  geometry: null,
  id: 'eocGeojsonLayer',
  properties: {
    active: false,
    title: 'GeoJson Offering - inline',
    updated: '2019-02-15T11:22:07',
    abstract: 'GeoJson Data Offering from inline content',
    offerings: [
      eocGeojsonOffering
    ]
  },
  type: 'Feature'
};



const zoomedLayer: IEocOwsResource = {
  geometry: null,
  id: 'zoomedLayer',
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
    updated: '2019-02-15T11:21:59'
  },
  type: 'Feature'
};


export const eocOwsContext: IEocOwsContext = {
  id: 'eocOwsContext',
  type: 'FeatureCollection',
  properties: {
    links: {
      profiles: [{
        href: 'http://www.opengis.net/spec/owc-geojson/1.0/req/core'
      }],
      via: [{
        href: 'https://geoservice.dlr.de/web/services',
        type: 'application/xml',
        title: 'Eoc Geoservice GetCapabilities',
        lang: 'en'
        // length: number; // Hint about the content length in octets of the representation returned when the IRI in the href attribute is mapped to a URI and dereferenced.
      }]
    },
    lang: 'en',
    title: 'Eoc Geoservice WMS, WMTS, WFS and TMS',
    updated: '2021-11-09T12:00:00',
    subtitle: 'Derived Contexts from Eoc Geoservice GetCapabilities with extensions of IEocOwsContext',
    authors: [
      {
        email: 'geoservice@dlr.de',
        name: 'Earth Observation Center (EOC), DLR',
        uri: 'https://geoservice.dlr.de/web/contact'
      }
    ],
    publisher: 'EOC-DLR',
    generator: {
      title: 'OWS Context file generator',
      uri: '.../ows-context.git',
      version: '0.1.0'
    },
    display: [],
    rights: 'Information about rights held in and over the Context document',
    date: '2019-02-15T13:23:28',
    categories: [
      {
        term: 'WMS'
      },
      {
        term: 'DLR'
      }
    ],
    abstract: '<strong>CODE-DE</strong> Sentinel1 and 2',
    author: 'Geoservice Manager'
  },
  /** bbox is not created for all layers */
  bbox: [
    -13.68441114920683,
    28.779301457662182,
    61.0886988287346,
    64.90858361718878
  ],
  features: [eocTMSLayer, eocVectortileLayer, eocWMSLayer, eocWFSLayer, eocXyzLayer, eocGeojsonLayer]
};

/** ------------------------------------------ */
export const folderMixedContext: IEocOwsContext = {
  id: 'folderMixedContext',
  type: 'FeatureCollection',
  properties: {
    links: {
      profiles: [{
        href: 'http://www.opengis.net/spec/owc-geojson/1.0/req/core'
      }],
    },
    lang: 'de',
    title: 'Test context for folders',
    updated: '2018-11-28T00:00:00',
    subtitle: 'Includes folder and not folder resources'
  },
  features: [baseWMSLayer, baseWFSLayer, baseWMTSLayer, baseKMLLayer, eocWMSLayer, eocWFSLayer, eocXyzLayer, eocGeojsonLayer]
};

export const eocProjContext: IEocOwsContext = {
  id: 'test_context_proj',
  type: 'FeatureCollection',
  /** @deprecated we do not use this currently */
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
    links: {
      profiles: [{
        href: 'http://www.opengis.net/spec/owc-geojson/1.0/req/core'
      }],
    },
    lang: 'de',
    title: 'Test context projections',
    updated: '2018-11-28T00:00:00'
  },
  features: []
};

export const zoomedContext: IEocOwsContext = {
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
  features: []
};

