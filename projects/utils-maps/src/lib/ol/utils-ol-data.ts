import GeoJSON from 'ol/format/GeoJSON';
import { Map } from 'ol';
import { Options as GeoJsonOptions } from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector';
import { ProjectionLike } from 'ol/proj';


/**
 * Create a OpenLayers Feature from a GeoJson Feature
 */
export function geoJsonToFeature(geojson: any, map: Map, options?: GeoJsonOptions) {
  const GEOJSON = new GeoJSON({
    dataProjection: options?.dataProjection || 'EPSG:4326',
    featureProjection: options?.featureProjection || map.getView().getProjection(),
    ...options
  });
  return GEOJSON.readFeature(geojson);
}

/**
 * Create a Array of OpenLayers Features from a GeoJson FeatureCollection
 */
export function geoJsonToFeatures(geojson: any, map: Map, options?: GeoJsonOptions) {
  const GEOJSON = new GeoJSON({
    dataProjection: options?.dataProjection || 'EPSG:4326',
    featureProjection: options?.featureProjection || map.getView().getProjection(),
    ...options
  });
  return GEOJSON.readFeatures(geojson);
}


/**
 * function to reproject vector features
 */
export function reprojectVectorSource(source: VectorSource<any>, srcProj: ProjectionLike, dstProj: ProjectionLike): void {
  source.getFeatures().forEach(feature => {
    feature.getGeometry().transform(srcProj, dstProj);
  });
}
