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
  options?: IMapStateOptions;
  extent?: TGeoExtent;
  /** iso 8601 Datestring */
  time?: string;
}

/**
* like ol.extent: minX, minY, maxX, maxY
*/
export type TGeoExtent = [number, number, number, number] | [number, number, number, number, number, number];

export class MapState implements IMapState {
  zoom: number;
  center: {
    lat: number;
    lon: number;
  };
  options: IMapStateOptions;
  extent: TGeoExtent;
  /** iso 8601 Datestring */
  time: string;

  constructor(zoom: number, center: IMapCenter, options?: IMapStateOptions, extent?: TGeoExtent, time?: string) {
    this.zoom = zoom;
    this.center = center;
    this.extent = extent || [-180.0, -90.0, 180.0, 90.0];
    this.time = time || new Date().toISOString();
    if (options) {
      this.options = options;
    } else {
      this.options = {
        maxzoom: 0,
        minzoom: 0,
        notifier: 'map'
      }
    }
  }
}
