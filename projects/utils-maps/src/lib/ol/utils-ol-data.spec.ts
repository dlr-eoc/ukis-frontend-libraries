import { Map, View } from 'ol';
import testData from '../../assets/testFeatureCollection.json';
import { geoJsonToFeature, geoJsonToFeatures } from './utils-ol-data';
describe('Utils OpenLayers Data conversion test-suite', () => {
  let map: Map;
  let view: View;
  beforeEach(() => {
    view = new View({
      // x , y
      center: [0, 0],
      zoom: 0
    });

    map = new Map({
      target: 'map',
      view
    });
  });

  it('should create a OpenLayers Feature from a GeoJson Feature', () => {
    const feature = geoJsonToFeature(testData.features[0], map);
    expect(feature.getGeometry().getType()).toBe('Polygon');
  });

  it('should create a Array of OpenLayers Features from a GeoJson FeatureCollection', () => {
    const features = geoJsonToFeatures(testData, map);
    expect(features.length).toBe(4);
  });
});
