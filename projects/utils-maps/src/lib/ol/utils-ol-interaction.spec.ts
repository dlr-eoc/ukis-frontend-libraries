import { Map, View, Feature } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer, Layer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import testData from '../../assets/testFeatureCollection.json';
import { geoJsonToFeatures } from './utils-ol-data';


describe('Utils OpenLayers interactions test-suite', () => {
  // do this so the size of the map is big enough to have the word extent
  const size = [1024, 768];
  const container = document.createElement('div');
  container.id = 'map';
  container.style.width = `${size[0]}px`;
  container.style.height = `${size[1]}px`;
  document.body.appendChild(container);
  // --------------------------------------

  let map: Map;
  let vectorData: Feature<any>[];
  let vectorLayer: Layer<any>;
  let view: View;
  let layers: Layer<any>[];
  beforeEach(() => {
    const osm = new TileLayer({
      source: new OSM(),
    });

    layers = [osm];
    view = new View({
      center: [0, 0],
      zoom: 0,
    });

    map = new Map({
      layers,
      target: container,
      view
    });

    map.setSize(size);


    vectorData = geoJsonToFeatures(testData, map);
    vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: vectorData
      })
    });
    vectorLayer.set('id', 'ID-vector');
    vectorLayer.set('name', 'GeoJSON Vector Layer');
    map.addLayer(vectorLayer);
  });



  /* it('should add a basic popup to the map for vector Layers', () => {

  }); */

});
