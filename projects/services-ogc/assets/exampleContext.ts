import { IOwsContext, IOwsOffering, IOwsResource } from '../src/lib/owc/types/owc-json';
import { IEocOwsContext, IEocOwsOffering, IEocOwsResource, IEocOwsTimeDimension } from '../src/lib/owc/types/eoc-owc-json';
import customPositron from '../assets/open-map-style.json';
import testGeojson from '../assets/testGeoJson.json';


/**
 * check https://github.com/opengeospatial/owscontext/tree/master/json/dev/trax/json
 */

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
export const baseWMSOffering: IOwsOffering = {
  code: 'http://www.opengis.net/spec/owc-geojson/1.0/req/wms',
  operations: [
    {
      code: 'GetCapabilities',
      method: 'GET',
      href: 'https://geoservice.dlr.de/eoc/land/wms/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities'
    },
    {
      code: 'GetMap',
      method: 'GET',
      href: 'https://geoservice.dlr.de/eoc/land/wms/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=WSF_2015'
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
  id: 'WMS-Layer_WSF_2015',
  geometry: null,
  properties: {
    title: 'World Settlement Footprint (WSF) 2015',
    updated: '2021-11-09T09:02:20Z',
    abstract: 'World Settlement Footprint 2015',
    folder: 'RasterLayers',
    offerings: [
      baseWMSOffering
    ],
    active: true,
    categories: [
      {
        'term': 'land'
      },
      {
        'term': 'urbanization'
      },
      {
        'term': 'global'
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
      href: 'https://tiles.geoservice.dlr.de/service/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=eoc%3Abasemap'
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
  id: 'WMTS-Layer_eoc:basemap',
  geometry: null,
  properties: {
    title: 'EOC Basemap',
    updated: '2021-11-09T09:43:37Z',
    abstract: 'This is the basemap for DLR Service Portals',
    folder: 'RasterLayers',
    offerings: [
      baseWMTSOffering
    ],
    active: true
  },
  bbox: [
    -180,
    -90,
    180,
    90
  ]
};

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
      href: 'https://geoservice.dlr.de/eoc/basemap/wfs/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAME=osm%3Aosm_boundaries_gen1&OUTPUTFORMAT=application%2Fjson',
      type: 'application/json'
    }
  ]
};
export const baseWFSLayer: IOwsResource = {
  type: 'Feature',
  id: 'WFS-Layer_osm:osm_boundaries_gen1',
  geometry: null,
  properties: {
    title: 'osm_boundaries_gen1',
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
      content: `<kml xmlns='http://www.opengis.net/kml/2.2' xmlns:ns2='http://www.google.com/kml/ext/2.2' xmlns:ns3='http://www.w3.org/2005/Atom' xmlns:ns4='urn:oasis:names:tc:ciq:xsdschema:xAL:2.0'>
      <Document>
          <Schema name='cities_1' id='cities_1'>
              <SimpleField type='string' name='name'/>
              <SimpleField type='string' name='asciiname'/>
              <SimpleField type='string' name='alternatenames'/>
              <SimpleField type='double' name='latitude'/>
              <SimpleField type='double' name='longitude'/>
              <SimpleField type='string' name='fclass'/>
              <SimpleField type='string' name='fcode'/>
              <SimpleField type='string' name='country'/>
              <SimpleField type='string' name='cc2'/>
              <SimpleField type='string' name='admin1'/>
              <SimpleField type='string' name='admin2'/>
              <SimpleField type='string' name='admin3'/>
              <SimpleField type='string' name='admin4'/>
              <SimpleField type='string' name='population'/>
              <SimpleField type='int' name='elevation'/>
              <SimpleField type='int' name='gtopo30'/>
              <SimpleField type='string' name='timezone'/>
              <SimpleField type='string' name='moddate'/>
          </Schema>
          <Folder>
              <name>cities</name>
              <Placemark id='cities.6290315'>
                  <ExtendedData>
                      <SchemaData schemaUrl='#cities_1'>
                          <SimpleData name='name'>Müliberg</SimpleData>
                          <SimpleData name='asciiname'>Mueliberg</SimpleData>
                          <SimpleData name='latitude'>47.2818</SimpleData>
                          <SimpleData name='longitude'>8.48029</SimpleData>
                          <SimpleData name='fclass'>P</SimpleData>
                          <SimpleData name='fcode'>PPL</SimpleData>
                          <SimpleData name='country'>CH</SimpleData>
                          <SimpleData name='admin1'>ZH</SimpleData>
                          <SimpleData name='admin2'>101</SimpleData>
                          <SimpleData name='admin3'>1</SimpleData>
                          <SimpleData name='population'>101</SimpleData>
                          <SimpleData name='gtopo30'>672</SimpleData>
                          <SimpleData name='timezone'>Europe/Zurich</SimpleData>
                          <SimpleData name='moddate'>2006-10-05Z</SimpleData>
                      </SchemaData>
                  </ExtendedData>
                  <Point>
                      <coordinates>8.48029,47.2818</coordinates>
                  </Point>
              </Placemark>
          </Folder>
      </Document>
  </kml>`
    }
  ]
};
export const baseKMLLayer: IOwsResource = {
  type: 'Feature',
  id: 'KML-Layer_gn:cities',
  geometry: null,
  properties: {
    title: 'Example KML',
    updated: '2021-11-09T12:00:00',
    authors: [
      {
        email: 'geoservice@dlr.de',
        name: 'Earth Observation Center (EOC), DLR',
        uri: 'https://geoservice.dlr.de/web/contact'
      }
    ],
    links: {
      via: [
        {
          title: 'Example Feature of Geonames cities',
          href: 'https://geoservice.dlr.de/eoc/basemap/wfs/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAME=gn%3Acities&count=1&OUTPUTFORMAT=application/vnd.google-earth.kml+xml'
        }
      ]
    },
    folder: 'VectorLayers',
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
export const eocTMSOffering: IEocOwsOffering = {
  code: 'http://www.opengis.net/spec/owc-geojson/1.0/req/tms',
  operations: [
    {
      code: 'REST',
      href: 'https://tiles.geoservice.dlr.de/service/tms/1.0.0/eoc%3Abasemap@EPSG%3A3857@png/{z}/{x}/{y}.png',
      method: 'GET',
      type: 'image/png'
    }
  ]
};
export const eocTMSLayer: IEocOwsResource = {
  geometry: null,
  id: 'EOC_Basemap_TMS',
  properties: {
    active: false,
    offerings: [
      eocTMSOffering
    ],
    title: 'EOC Basemap TMS',
    updated: '2021-11-30T12:00:00'
  },
  type: 'Feature'
};

export const eocVectortileOffering: IEocOwsOffering = {
  code: 'http://www.opengis.net/spec/owc-geojson/1.0/req/tms',
  operations: [
    {
      code: 'REST',
      href: 'https://tiles.geotest.eoc.dlr.de/service/tms/1.0.0/planet_eoc@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf?flipy=true',
      method: 'GET',
      type: 'application/vnd.mapbox-vector-tile'
    }
  ],
  styles: [{
    name: 'geotest_xyz_planet_eoc',
    title: 'grayscale',
    abstract: 'This is a slightly modified version of Positron style @see: https://github.com/openmaptiles/positron-gl-style/blob/master/LICENSE.md',
    content: {
      type: 'mapbox-style',
      'mapbox-source-key': 'geotest_xyz_planet_eoc',
      content: JSON.stringify(customPositron)
    }
  }]
};
export const eocVectortileLayer: IEocOwsResource = {
  geometry: null,
  id: 'vectortile',
  properties: {
    active: true,
    minZoom: 1,
    maxZoom: 10,
    offerings: [
      eocVectortileOffering
    ],
    opacity: 1.0,
    title: 'This should be an overlay',
    updated: '2019-02-15T11:21:59',
    rights: '© OpenMapTiles © OpenStreetMap contributors',
    folder: 'Overlays'
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
  id: 'RESA_L3M_GERMANY_2015',
  properties: {
    active: false,
    offerings: [
      eocWMSOffering
    ],
    title: 'RapidEye RESA - L3M Mosaic - Germany, 2015',
    updated: '2019-02-15T11:22:07'
  },
  type: 'Feature'
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
  id: 'tm:tm_world_borders_simpl',
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
      legendURL: 'http://my/dummy/legendUrl',
      name: 'raster',
      title: 'raster'
    }
  ]
}
export const eocXyzLayer: IEocOwsResource = {
  geometry: null,
  id: 'XYZ_OSM',
  properties: {
    active: false,
    groupName: 'products',
    offerings: [
      eocXyzOffering
    ],
    title: 'OSM XYZ Tiles',
    rights: '© OpenStreetMap contributors',
    updated: '2019-02-15T11:22:07'
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
  id: 'GeoJsonOffering',
  properties: {
    active: false,
    groupName: 'products',
    offerings: [
      eocGeojsonOffering
    ],
    title: 'GeoJson Offering',
    updated: '2019-02-15T11:22:07'
  },
  type: 'Feature'
};


/**----------------Context Fragments-----------------*/

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
    title: 'test context projections',
    updated: '2018-11-28T00:00:00'
  },
  features: []
}

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

