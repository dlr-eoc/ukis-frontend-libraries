import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector';
import { ProjectionLike } from 'ol/proj';


/**
 * Create a OpenLayers Feature from a GeoJson Feature
 */
export function geoJsonToFeature(geojson: any) {
  const GEOJSON = new GeoJSON({
    dataProjection: 'EPSG:4326',
    featureProjection: this.EPSG
  });
  return GEOJSON.readFeature(geojson);
}

/**
 * Create a Array of OpenLayers Features from a GeoJson FeatureCollection
 */
export function geoJsonToFeatures(geojson: any) {
  const GEOJSON = new GeoJSON({
    dataProjection: 'EPSG:4326',
    featureProjection: this.EPSG
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
