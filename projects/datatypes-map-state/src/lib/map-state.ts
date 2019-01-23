export interface IMapCenter {
  lat: number;
  lon: number;
}

export interface IMapStateOptions {
  maxzoom?: number;
  minzoom?: number;
  notifier?: 'user' | 'map';
}

export interface IMapState {
  zoom: number;
  center: IMapCenter;
}

/**
* like ol.extent: minX, minY, maxX, maxY
*/
export type TGeoExtent = [number, number, number, number];

export class MapState implements IMapState {
  zoom: number;
  options: IMapStateOptions;
  center: {
    lat: number;
    lon: number;
  };

  constructor(zoom: number, center: IMapCenter, options?: IMapStateOptions) {
    this.zoom = zoom;
    this.center = center;
    if (options) {
      this.options = options
    } else {
      this.options = {
        maxzoom: 0,
        minzoom: 0,
        notifier: 'map'
      }
    }
  }
}
