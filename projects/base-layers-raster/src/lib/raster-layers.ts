import { RasterLayer, IRasterLayerOptions } from '@dlr-eoc/services-layers';

/**
 * make all IRasterLayer Options optional because constructor use default objects
 */
type IoptionalRasterLayerOptions = {
  [K in keyof IRasterLayerOptions]?: IRasterLayerOptions[K]
};
export class google_earth extends RasterLayer {
  constructor(options?: IoptionalRasterLayerOptions) {
    let _options: IRasterLayerOptions = {
      name: 'Google Satellite',
      displayName: 'Google Satellite',
      id: 'google_satellite',
      visible: false,
      type: 'xyz',
      url: 'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
      attribution: '&copy, <a href="https://www.google.de/maps">Google</a> contributors',
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      continuousWorld: false,
      legendImg: 'google-sat.png',
      description: '&copy google.com/vt/lyrs - satellite only',
      opacity: 1
    }
    if (options) { Object.assign(_options, options); }
    super(_options)
  }
}

export class google_maps extends RasterLayer {
  constructor(options?: IoptionalRasterLayerOptions) {
    let _options: IRasterLayerOptions = {
      name: 'Google Maps',
      displayName: 'Google Maps',
      id: 'google_maps',
      visible: false,
      type: 'xyz',
      url: 'https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
      attribution: '&copy, <a href="https://www.google.de/maps">Google</a> contributors',
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      continuousWorld: true,
      legendImg: 'google-maps.png',
      description: '&copy google.com/vt/lyrs - terrain',
      opacity: 1
    }
    if (options) { Object.assign(_options, options); }
    super(_options)
  }
}

export class google_hybrid extends RasterLayer {
  constructor(options?: IoptionalRasterLayerOptions) {
    let _options: IRasterLayerOptions = {
      name: 'Google Hybrid',
      displayName: 'Google Hybrid',
      id: 'google_maps',
      visible: false,
      type: 'xyz',
      url: 'https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
      attribution: '&copy, <a href="https://www.google.de/maps">Google</a> contributors',
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      continuousWorld: false,
      legendImg: 'google-hybrid.png',
      description: '&copy google.com/vt/lyrs - hybrid',
      opacity: 1
    }
    if (options) { Object.assign(_options, options); }
    super(_options)
  }
}

export class esri_grey_canvas extends RasterLayer {
  constructor(options?: IoptionalRasterLayerOptions) {
    let _options: IRasterLayerOptions = {
      name: 'ESRI Neutral Map',
      displayName: 'ESRI Neutral Map',
      id: 'esri_grey_canvas',
      visible: false,
      type: 'xyz',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}.png',
      attribution: '&copy; ESRI',
      continuousWorld: false,
      legendImg: 'esri_grey_canvas.png',
      description: '&copy arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base',
      opacity: 1
    }
    if (options) { Object.assign(_options, options); }
    super(_options)
  }
}


export class esri_world_imagery extends RasterLayer {
  constructor(options?: IoptionalRasterLayerOptions) {
    let _options: IRasterLayerOptions = {
      name: 'ESRI Imagery',
      displayName: 'ESRI Imagery',
      id: 'esri_imagery',
      visible: false,
      type: 'xyz',
      url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png',
      attribution: '&copy; ESRI',
      continuousWorld: false,
      legendImg: 'esri_imagery.png',
      description: '&copy arcgisonline.com/arcgis/rest/services/World_Imagery',
      opacity: 1
    }
    if (options) { Object.assign(_options, options); }
    super(_options)
  }
}


export class esri_ocean_imagery extends RasterLayer {
  constructor(options?: IoptionalRasterLayerOptions) {
    let _options: IRasterLayerOptions = {
      name: 'ESRI Ocean',
      displayName: 'ESRI Ocean',
      id: 'esri_ocean',
      visible: false,
      type: 'xyz',
      url: 'https://server.arcgisonline.com/arcgis/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}.png',
      attribution: '&copy; ESRI',
      continuousWorld: false,
      legendImg: 'esri-ocean.png',
      description: '&copy arcgisonline.com/arcgis/rest/services/Ocean_Basemap',
      opacity: 1
    }
    if (options) { Object.assign(_options, options); }
    super(_options)
  }
}


export class esri_nav_charts extends RasterLayer {
  constructor(options?: IoptionalRasterLayerOptions) {
    let _options: IRasterLayerOptions = {
      name: 'ESRI Charts',
      displayName: 'ESRI Charts',
      id: 'esri_charts',
      visible: false,
      type: 'xyz',
      url: 'https://server.arcgisonline.com/arcgis/rest/services/Specialty/World_Navigation_Charts/MapServer/tile/{z}/{y}/{x}.png',
      attribution: '&copy; ESRI',
      continuousWorld: false,
      legendImg: 'esri_charts.png',
      description: '&copy arcgisonline.com/arcgis/rest/services/Specialty/World_Navigation_Charts',
      opacity: 1
    }
    if (options) { Object.assign(_options, options); }
    super(_options)
  }
}


export class osm extends RasterLayer {
  constructor(options?: IoptionalRasterLayerOptions) {
    let _options: IRasterLayerOptions = {
      name: 'OpenStreetMap',
      displayName: 'OpenStreetMap',
      id: 'osm',
      visible: false,
      type: 'xyz',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      subdomains: ['a', 'b', 'c'],
      attribution: '&copy, <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors',
      continuousWorld: false,
      legendImg: 'osm.png',
      description: '&copy OpenStreetMap and contributors',
      opacity: 1,
      zIndex: 1
    }
    if (options) { Object.assign(_options, options); }
    super(_options)
  }
}


export class eoc_litemap extends RasterLayer {
  constructor(options: IoptionalRasterLayerOptions) {
    let _options: IRasterLayerOptions = {
      name: 'EOC Litemap',
      displayName: 'EOC Litemap',
      id: 'eoc_litemap',
      visible: false,
      type: 'wms',
      removable: false,
      params: {
        layers: 'litemap',
        format: 'image/png',
        transparent: true,
        attribution: "",
      },
      url: 'https://geoservice.dlr.de/eoc/basemap/wms',
      attribution: '&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',
      continuousWorld: false,
      legendImg: 'eoc_litemap.png',
      description: 'http://www.naturalearthdata.com/about/',
      opacity: 1
    }
    if (options) { Object.assign(_options, options); }
    super(_options)
  }
}



export class open_sea_map extends RasterLayer {
  constructor(options?: IoptionalRasterLayerOptions) {
    let _options: IRasterLayerOptions = {
      name: 'OpenSeaMap',
      displayName: 'OpenSeaMap',
      id: 'OpenSeaMap',
      visible: false,
      type: 'xyz',
      removable: false,
      url: 'https://{s}.openseamap.org/seamark/{z}/{x}/{y}.png',
      subdomains: ['t1'],
      attribution: '',
      continuousWorld: false,
      zIndex: 99999,
      legendImg: '',
      description: 'http://map.openseamap.org/',
      opacity: 1
    }
    if (options) { Object.assign(_options, options); }
    super(_options)
  }
}
