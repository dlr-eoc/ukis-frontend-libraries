import { Map } from 'ol';
import { Layer } from 'ol/layer';
import LayerGroup from 'ol/layer/Group';
import { extend as olExtend, Extent } from 'ol/extent';
import { transformExtent, get as getProjection, transform, Projection } from 'ol/proj';
import { easeOut } from 'ol/easing.js';
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import View, { ViewOptions } from 'ol/View';
import { reprojectVectorSource } from './utils-ol-data';
import { register as Register } from 'ol/proj/proj4';
import proj4 from 'proj4';

const DEFAULT_PROJECTION = 'EPSG:3857';
/**
 *
 */
export function setExtent(map: Map, extent: Extent, geographic?: boolean, fitOptions?: any) {
  const projection = (geographic) ? getProjection('EPSG:4326') : getProjection(DEFAULT_PROJECTION);
  const transfomExtent = transformExtent(extent, projection, map.getView().getProjection().getCode());
  const newFitOptions = {
    size: map.getSize(),
    // padding: [100, 200, 100, 100] // Padding (in pixels) to be cleared inside the view. Values in the array are top, right, bottom and left padding. Default is [0, 0, 0, 0].
  };
  if (fitOptions) {
    Object.assign(newFitOptions, fitOptions);
  }
  map.getView().fit(transfomExtent, fitOptions);
  return (transfomExtent as Extent);
}

export function setCenter(map: Map, center: number[], geographic?: boolean): number[] {
  const projection = (geographic) ? getProjection('EPSG:4326') : getProjection(DEFAULT_PROJECTION);
  const transformedCenter = transform(center, projection, map.getView().getProjection().getCode());
  // console.log('set center in svc', transfomCenter)
  // console.log(map.getView().getCenter())
  map.getView().setCenter(transformedCenter);
  return transformedCenter;
}

export function getCenter(map: Map, geographic?: boolean): any {
  const dstProjection = (geographic) ? getProjection('EPSG:4326') : getProjection(DEFAULT_PROJECTION);
  const srcProjection = getProjection(map.getView().getProjection().getCode());
  const transformedCenter = transform(map.getView().getCenter(), srcProjection, dstProjection);
  return transformedCenter;
}


/**
  *
  * @param features: olFeature[]
  * @param geographic: boolean
  * @returns olExtend: [minX, minY, maxX, maxY]
  */
export function getFeaturesExtent(map: Map, features: Feature<any>[], geographic?: boolean) {
  const extent: any = features[0].getGeometry().getExtent().slice(0);
  features.forEach((feature) => {
    olExtend(extent, feature.getGeometry().getExtent());
  });
  if (geographic) {
    const projection = getProjection('EPSG:4326');
    const transformedExtent = transformExtent(extent, map.getView().getProjection().getCode(), projection);
    return (transformedExtent as Extent);
  } else {
    return extent;
  }
}

/**
 * @param geographic: boolean
 * @returns olExtend: [minX, minY, maxX, maxY]
 */
export function getCurrentExtent(map: Map, geographic?: boolean) {
  const projection = (geographic) ? getProjection('EPSG:4326') : getProjection(DEFAULT_PROJECTION);
  const extent = map.getView().calculateExtent();
  const transformedExtent = transformExtent(extent, map.getView().getProjection().getCode(), projection);
  return (transformedExtent as Extent);
}


export function setZoom(map: Map, zoom: number, notifier?: 'map' | 'user') {
  const view = map.getView();
  view.setZoom(zoom);
}

/** USED in map-ol.component */
export function getZoom(map: Map): number {
  return map.getView().getZoom();
}

export function zoomInOut(map: Map, value: '-' | '+') {
  const view = map.getView();
  if (!view) {
    // the map does not have a view, so we can't act
    // upon it
    return;
  }
  const delta = 1, duration = 250;
  const currentZoom = view.getZoom();
  if (currentZoom !== undefined) {
    const newZoom = view.getConstrainedZoom(currentZoom + delta);
    if (duration > 0) {
      if (view.getAnimating()) {
        view.cancelAnimations();
      }
      view.animate({
        zoom: newZoom,
        duration,
        easing: easeOut
      });
    } else {
      view.setZoom(newZoom);
    }
  }
}



export function getMapProjection(map: Map) {
  return map.getView().getProjection();
}


/**
 * vector layers will be reprojected automatically
 * wms layers will be updated with corresponding proj def in the requests.
 * for other raster layers and for those wms layers whose backend does not support target projection, please
 * define initial(default) layer projection, so openlayers will reproject on the client side
 * projection is proj~ProjectionLike
 */
export function setMapProjection(map: Map, projection: Projection | string, viewOptions?: ViewOptions, cb?: (projection: Projection) => void) {
  let epsg = DEFAULT_PROJECTION;
  let view = null;
  if (projection) {
    let newViewOptions: ViewOptions = {};
    if (viewOptions) {
      newViewOptions = viewOptions;
      newViewOptions.minResolution = undefined;
      newViewOptions.maxResolution = undefined;
      newViewOptions.resolution = undefined;
      newViewOptions.resolutions = undefined;
    }
    if (projection instanceof Projection) {
      newViewOptions.projection = projection;
      const newCenter = transform(map.getView().getCenter(), map.getView().getProjection(), projection); // get center coordinates in the new projection
      newViewOptions.center = newCenter; // map.getView().getCenter();
      // _viewOptions.extent = projection.getExtent();// || undefined;
      newViewOptions.zoom = map.getView().getZoom();
    } else if (typeof projection === 'string') {
      newViewOptions.projection = projection;
      newViewOptions.center = map.getView().getCenter();
      newViewOptions.zoom = map.getView().getZoom();
    }
    const mapView = new View(newViewOptions);
    const oldProjection = DEFAULT_PROJECTION;
    epsg = mapView.getProjection().getCode();
    map.setView(mapView);
    view = map.getView();

    // reprojecting vector layers
    map.getLayers().getArray().forEach((layerGroup: LayerGroup) => {
      layerGroup.getLayers().getArray().forEach(layer => {
        if (layer instanceof Layer) {
          let source = layer.getSource();
          // check for nested sources, e.g. cluster or cluster of clusters etc
          while (source['source']) {
            source = source['source'];
          }
          if (source instanceof VectorSource) {
            reprojectVectorSource(source, oldProjection, DEFAULT_PROJECTION);
          }
        }
      });
    });
    cb(getMapProjection(map));
    return {
      epsg,
      view
    };
  } else {
    console.warn('projection code is undefined');
  }
}


export function registerProjection(projDef: any) {
  proj4.defs(projDef.code, projDef.proj4js);
  Register(proj4);
}

/**
 * Takes a `Projection` like object
 * and sets all fields that are missing to make it an actual `Projection`
 * to `undefined` or `false`.
 */
export function getOlProjection(projDef: { code: any, [k: string]: any}): Projection {
  return new Projection({
    code: projDef.code,
    extent: projDef.extent ? projDef.extent : undefined,
    worldExtent: projDef.worldExtent ? projDef.worldExtent : undefined,
    global: projDef.global ? projDef.global : false,
    units: projDef.units ? projDef.units : undefined
  });
}
