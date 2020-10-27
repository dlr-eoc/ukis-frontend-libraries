import { Map } from 'ol';
import { extend as olExtend, Extent } from 'ol/extent';
import { transformExtent, get as getProjection, transform, Projection } from 'ol/proj';
import { easeOut } from 'ol/easing.js';
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import View, { ViewOptions } from 'ol/View';
import { reprojectVectorSource } from './utils-ol-data';
import { register as Register } from 'ol/proj/proj4';
import proj4 from 'proj4';
import { flattenLayers } from './utils-ol-layers';



function _getViewAndGeoProj(map: Map) {
  const view = map.getView();
  const viewProj = view.getProjection();
  const wgs84Proj = getProjection('EPSG:4326');
  return {
    view,
    viewProj,
    wgs84Proj
  };
}

/**
 * map.getView().fit() tries to fit the specified extent on the map
 *
 * So the extent is not set accurately!!!
 *
 * @param geographic - use true if your extent is in geographic coordinates
 */
export function fitExtent(map: Map, extent: Extent, geographic?: boolean, fitOptions?: any) {
  const { view, viewProj, wgs84Proj } = _getViewAndGeoProj(map);
  let transfomExtent = extent;
  if (geographic && viewProj.getCode() !== wgs84Proj.getCode()) {
    transfomExtent = transformExtent(extent, wgs84Proj, viewProj);
  }

  const newFitOptions = {
    size: map.getSize()
  };

  if (fitOptions) {
    Object.assign(newFitOptions, fitOptions);
  }

  view.fit(transfomExtent, fitOptions);
}

/**
 *
 * @param geographic - use true if your center is in geographic coordinates
 */
export function setCenter(map: Map, center: number[], geographic?: boolean) {
  const { view, viewProj, wgs84Proj } = _getViewAndGeoProj(map);
  let transformedCenter = center;

  if (geographic && viewProj.getCode() !== wgs84Proj.getCode()) {
    transformedCenter = transform(center, wgs84Proj, viewProj);
  }

  view.setCenter(transformedCenter);
}

/**
 * @param geographic - true: returns geographic coordinates
 */
export function getCenter(map: Map, geographic?: boolean) {
  const { view, viewProj, wgs84Proj } = _getViewAndGeoProj(map);
  let center = view.getCenter();

  if (geographic && viewProj.getCode() !== wgs84Proj.getCode()) {
    center = transform(center, viewProj, wgs84Proj);
  }

  return center;
}


/**
 * @param geographic - true: returns geographic coordinates
 * @returns olExtend: [minX, minY, maxX, maxY]
 */
export function getExtentFromFeatures(map: Map, features: Feature<any>[], geographic?: boolean) {
  const { viewProj, wgs84Proj } = _getViewAndGeoProj(map);
  const startIndex = 0;
  const extent: number[] = features[startIndex].getGeometry().getExtent().slice(0);
  features.forEach((feature, index) => {
    if (index > startIndex) {
      olExtend(extent, feature.getGeometry().getExtent());
    }
  });
  if (geographic && viewProj.getCode() !== wgs84Proj.getCode()) {
    const transformedExtent = transformExtent(extent, viewProj, wgs84Proj);
    return transformedExtent;
  } else {
    return extent;
  }
}

/**
 * @param geographic - true: returns geographic coordinates
 * @returns olExtend: [minX, minY, maxX, maxY]
 */
export function getCurrentExtent(map: Map, geographic?: boolean) {
  const { view, viewProj, wgs84Proj } = _getViewAndGeoProj(map);
  let viewExtent = view.calculateExtent();
  if (geographic && viewProj.getCode() !== wgs84Proj.getCode()) {
    viewExtent = transformExtent(viewExtent, viewProj, wgs84Proj);
  }

  return viewExtent;
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


/**
 * Get the view Projection from ol map
 */
export function getMapProjection(map: Map) {
  return map.getView().getProjection();
}


/**
 * vector layers will be reprojected automatically
 * wms layers will be updated with corresponding proj def in the requests.
 * for other raster layers and for those wms layers whose backend does not support target projection, please
 * define initial(default) layer projection, so openlayers will reproject on the client side
 */
export function setMapProjection(map: Map, newProjection: Projection | string) {
  const oldProjection = map.getView().getProjection();

  // Getting the most recent viewOptions, so we don't loose old settings like `multiWorld`, `enableRotation` etc.
  const oldViewOptions: ViewOptions = (map.getView() as any).getUpdatedOptions_();
  const newViewOptions = oldViewOptions;

  // When a new projection changes the map-unit, the old resolutions are no longer valid. Un-setting them here.
  newViewOptions.minResolution = undefined;
  newViewOptions.maxResolution = undefined;
  newViewOptions.resolution = undefined;
  newViewOptions.resolutions = undefined;

  // reprojecting center, copying current zoom
  newViewOptions.projection = newProjection;
  const newCenter = transform(map.getView().getCenter(), oldProjection, newProjection);
  newViewOptions.center = newCenter;
  newViewOptions.zoom = map.getView().getZoom();

  const newView = new View(newViewOptions);
  map.setView(newView);

  // reprojecting vector layers
  const layers = flattenLayers(map.getLayers().getArray());
  for (const layer of layers) {
    const source = layer.getSource();
    if (source instanceof VectorSource) {
      reprojectVectorSource(source, oldProjection, newProjection);
    }
  }

  // @TODO: wms layers will be updated with corresponding proj def in the requests.

  return {
    proj: newView.getProjection(),
    view: map.getView()
  };
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
export function getOlProjection(projDef: { code: any, [k: string]: any }): Projection {
  return new Projection({
    code: projDef.code,
    extent: projDef.extent ? projDef.extent : undefined,
    worldExtent: projDef.worldExtent ? projDef.worldExtent : undefined,
    global: projDef.global ? projDef.global : false,
    units: projDef.units ? projDef.units : undefined
  });
}
