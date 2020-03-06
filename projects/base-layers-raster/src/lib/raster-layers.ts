import { RasterLayer, IRasterLayerOptions, WmtsLayer, IWmtsOptions, WmsLayer, IWmsOptions } from '@dlr-eoc/services-layers';

/**
 * make all IRasterLayer Options optional because constructor use default objects
 */
type IoptionalRasterLayerOptions = {
  [K in keyof IRasterLayerOptions]?: IRasterLayerOptions[K]
};

type IoptionalIWmsOptions = {
  [K in keyof IWmsOptions]?: IWmsOptions[K]
};

type IoptionalIWmtsOptions = {
  [K in keyof IWmtsOptions]?: IWmtsOptions[K]
};



export class OsmTileLayer extends RasterLayer {
  constructor(options?: IoptionalRasterLayerOptions) {
    const defaultOptions: IRasterLayerOptions = {
      name: 'OpenStreetMap',
      displayName: 'OpenStreetMap',
      id: 'osm',
      visible: false,
      type: 'xyz',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      subdomains: ['a', 'b', 'c'],
      attribution: '&copy, <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors',
      continuousWorld: false,
      legendImg: 'https://a.tile.openstreetmap.org/3/4/3.png',
      description: 'OpenStreetMap z-x-y Tiles',
      opacity: 1
    };
    if (options) { Object.assign(defaultOptions, options); }
    super(defaultOptions);
  }
}

export class OpenSeaMap extends RasterLayer {
  constructor(options?: IoptionalRasterLayerOptions) {
    const defaultOptions: IRasterLayerOptions = {
      name: 'OpenSeaMap',
      displayName: 'OpenSeaMap',
      id: 'OpenSeaMap',
      visible: false,
      type: 'xyz',
      removable: false,
      url: 'https://{s}.openseamap.org/seamark/{z}/{x}/{y}.png',
      subdomains: ['t1'],
      attribution: '&copy, <a href="https://map.openseamap.org/legend.php?lang=de&page=license">OpenSeaMap</a>',
      continuousWorld: false,
      legendImg: 'https://t1.openseamap.org/seamark/10/554/321.png',
      description: 'http://map.openseamap.org/',
      opacity: 1
    };
    if (options) { Object.assign(defaultOptions, options); }
    super(defaultOptions);
  }
}


export class EocLitemap extends WmsLayer {
  constructor(options?: IoptionalIWmsOptions) {
    const defaultOptions: IWmsOptions = {
      name: 'EOC Litemap',
      displayName: 'EOC Litemap',
      id: 'eoc_litemap',
      visible: false,
      type: 'wms',
      removable: false,
      params: {
        LAYERS: 'litemap',
        FORMAT: 'image/png',
        TRANSPARENT: true
      },
      url: 'https://geoservice.dlr.de/eoc/basemap/wms',
      attribution: '&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',
      continuousWorld: false,
      legendImg: 'https://geoservice.dlr.de/eoc/basemap/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=litemap&ATTRIBUTION=&WIDTH=256&HEIGHT=256&CRS=EPSG%3A3857&STYLES=&BBOX=0%2C0%2C10018754.171394622%2C10018754.171394622',
      description: 'http://www.naturalearthdata.com/about/',
      opacity: 1
    };
    if (options) { Object.assign(defaultOptions, options); }
    super(defaultOptions);
  }
}

export class EocLitemapTile extends WmtsLayer {
  constructor(options?: IoptionalIWmtsOptions) {
    const defaultOptions: IWmtsOptions = {
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
    };
    if (options) { Object.assign(defaultOptions, options); }
    super(defaultOptions);
  }
}

export class EocLiteoverlayTile extends WmtsLayer {
  constructor(options?: IoptionalIWmtsOptions) {
    const defaultOptions: IWmtsOptions = {
      name: 'EOC Liteoverlay Tile',
      displayName: 'EOC LiteoverlayTile',
      id: 'eoc_Liteoverlay_tile',
      visible: false,
      type: 'wmts',
      removable: false,
      params: {
        layer: 'eoc:liteoverlay',
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
      legendImg: 'https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Aliteoverlay&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11',
      description: 'This is the liteoverlay provided for EOC Service Portals',
      opacity: 1
    };
    if (options) { Object.assign(defaultOptions, options); }
    super(defaultOptions);
  }
}

export class EocBasemapTile extends WmtsLayer {
  constructor(options?: IoptionalIWmtsOptions) {
    const defaultOptions: IWmtsOptions = {
      name: 'EOC Basemap Tile',
      displayName: 'EOC Basemap Tile',
      id: 'eoc_basemap_tile',
      visible: false,
      type: 'wmts',
      removable: false,
      params: {
        layer: 'eoc:basemap',
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
      legendImg: 'https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Abasemap&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11',
      description: 'This is the basemap for DLR Service Portals',
      opacity: 1
    };
    if (options) { Object.assign(defaultOptions, options); }
    super(defaultOptions);
  }
}

export class EocBaseoverlayTile extends WmtsLayer {
  constructor(options?: IoptionalIWmtsOptions) {
    const defaultOptions: IWmtsOptions = {
      name: 'EOC Baseoverlay Tile',
      displayName: 'EOC Baseoverlay Tile',
      id: 'eoc_Baseoverlay_tile',
      visible: false,
      type: 'wmts',
      removable: false,
      params: {
        layer: 'eoc:baseoverlay',
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
      legendImg: 'https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Abaseoverlay&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11',
      description: 'This is the basemap for DLR Service Portals',
      opacity: 1
    };
    if (options) { Object.assign(defaultOptions, options); }
    super(defaultOptions);
  }
}

export class BlueMarbleTile extends WmtsLayer {
  constructor(options?: IoptionalIWmtsOptions) {
    const defaultOptions: IWmtsOptions = {
      name: 'BlueMarble Tile',
      displayName: 'BlueMarble Tile',
      id: 'blueMarble_tile',
      visible: false,
      type: 'wmts',
      removable: false,
      params: {
        layer: 'bmng_topo_bathy',
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
      legendImg: 'https://tiles.geoservice.dlr.de/service/wmts?layer=bmng_topo_bathy&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11',
      description: 'Blue Marble NG dataset with topography and bathymetry',
      opacity: 1
    };
    if (options) { Object.assign(defaultOptions, options); }
    super(defaultOptions);
  }
}

export class WorldReliefBwTile extends WmtsLayer {
  constructor(options?: IoptionalIWmtsOptions) {
    const defaultOptions: IWmtsOptions = {
      name: 'World Relief B/W Tile',
      displayName: 'World Relief B/W Tile',
      id: 'eoc:world_relief_bw',
      visible: false,
      type: 'wmts',
      removable: false,
      params: {
        layer: 'eoc:world_relief_bw',
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
      legendImg: 'https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Aworld_relief_bw&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11',
      description: 'World Relief Black / White',
      opacity: 1
    };
    if (options) { Object.assign(defaultOptions, options); }
    super(defaultOptions);
  }
}

export class HillshadeTile extends WmtsLayer {
  constructor(options?: IoptionalIWmtsOptions) {
    const defaultOptions: IWmtsOptions = {
      name: 'Hillshade Tile',
      displayName: 'Hillshade Tile',
      id: 'eoc_hillshade',
      visible: false,
      type: 'wmts',
      removable: false,
      params: {
        layer: 'hillshade',
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
      legendImg: 'https://tiles.geoservice.dlr.de/service/wmts?layer=hillshade&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11',
      description: 'Global Hillshade based on GMTED2010',
      opacity: 1
    };
    if (options) { Object.assign(defaultOptions, options); }
    super(defaultOptions);
  }
}




