import { EPSG_3857_Def, WebMercator } from "./projections";

export interface IMapCenter {
  lat: number;
  lon: number;
}

export interface IMapStateOptions {
  maxzoom?: number;
  minzoom?: number;
  notifier?: 'user' | 'map';
}

export interface IProjOptions {
  fitToProjectionExtent?: boolean
  fitToBbox?: TGeoExtent
  fitToNativeBbox?: TGeoExtent
}

export interface IMapState {
  zoom: number;
  center: IMapCenter;
  options?: IMapStateOptions;
  /** WGS84: Extent */
  extent?: TGeoExtent;
  /** Extent in the current map projection */
  nativeExtent?: TGeoExtent;
  /** iso 8601 Datestring */
  time?: string;
  /** from nadir in degrees */
  viewAngle?: number;
  /** from north in degrees */
  rotation?: number;
  /** EPSG of current map projection */
  epsg?: string;
  projOptions?: IProjOptions;
}

export interface IMapStateProjection {
  /** EPSG of current map projection */
  epsg?: string;
  projOptions?: IProjOptions;
  IProjDef?: IProjDef;
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
  /** WGS84: Extent */
  extent: TGeoExtent;
  /** Extent in the current map projection */
  nativeExtent: TGeoExtent;
  /** iso 8601 Datestring */
  time: string;
  /** from nadir in degrees */
  viewAngle: number;
  /** from north in degrees */
  rotation: number;
  /** EPSG of current map projection */
  epsg: string;
  projOptions?: IProjOptions;

  constructor(zoom: number, center: IMapCenter, options?: IMapStateOptions, extent: TGeoExtent = [-180.0, -90.0, 180.0, 90.0], nativeExtent: TGeoExtent = EPSG_3857_Def.extent, time: string = new Date().toISOString(), viewAngle: number = 0, rotation: number = 0, epsg: string = WebMercator, projOptions?: IProjOptions) {
    const defaultOptions = {
      maxzoom: 0,
      minzoom: 0,
      notifier: 'map'
    };
    this.zoom = zoom;
    this.center = center;
    this.extent = extent;
    this.nativeExtent = nativeExtent;
    this.epsg = epsg;
    this.time = time;
    this.viewAngle = viewAngle;
    this.rotation = rotation;
    this.options = Object.assign(defaultOptions, options);
    this.projOptions = Object.assign({}, projOptions);
  }


  public sameCenter(center: IMapState['center']) {
    if (this.center.lat === center.lat && this.center.lon === center.lon) {
      return true;
    } else {
      return false;
    }
  }

  public sameZoom(zoom: IMapState['zoom']) {
    if (this.zoom === zoom) {
      return true;
    } else {
      return false;
    }
  }

  public sameExtent(extent: TGeoExtent) {
    const len = extent.length;
    let isSame = false;
    if (this.extent.length === len) {
      isSame = this.extent.every((v, i) => extent[i] === v);
    }
    return isSame;
  }

  public sameNotifier(notifier: IMapState['options']['notifier']) {
    if (this.options.notifier === notifier) {
      return true;
    } else {
      return false;
    }
  }
}
