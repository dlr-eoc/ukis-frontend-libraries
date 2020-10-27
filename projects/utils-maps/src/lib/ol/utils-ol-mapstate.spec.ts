import { Map, View, Feature } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer, Layer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { GeoJSON } from 'ol/format';
import { get as getProjection } from 'ol/proj';
import { fitExtent, getCenter, getCurrentExtent, getExtentFromFeatures, getMapProjection, getZoom, setCenter, setMapProjection, setZoom, zoomInOut } from './utils-ol-mapstate';
import { Polygon } from 'ol/geom';
import { getCenter as getExtentCenter } from 'ol/extent';



describe('Utils OpenLayers mapstate test-suite', () => {
  // do this so the size of the map is big enough to have the word extent
  const size = [1024, 768];
  const container = document.createElement('div');
  container.id = 'map';
  container.style.width = `${size[0]}px`;
  container.style.height = `${size[1]}px`;
  document.body.appendChild(container);
  // --------------------------------------

  const wgs84 = getProjection('EPSG:4326');
  const google = getProjection('EPSG:3857');
  let map: Map;
  let vectorData: Feature<any>[];
  let view: View;
  let layers: Layer<any>[];
  beforeEach(() => {
    const osm = new TileLayer({
      source: new OSM(),
    });

    vectorData = new GeoJSON().readFeatures({
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [[[11, 51], [14, 51], [14, 53], [11, 53], [11, 51]]]
        }
      }]
    });

    const data = new VectorLayer({
      source: new VectorSource({
        features: vectorData
      })
    });

    layers = [osm, data];
    view = new View({
      // x , y
      center: [0, 0],
      zoom: 0,
      projection: wgs84
    });

    map = new Map({
      layers,
      target: container,
      view
    });

    map.setSize(size);
  });



  it('should set/get the correct new projection', () => {
    const newProj = setMapProjection(map, google);
    expect(newProj.epsg).toEqual('EPSG:3857');
    expect(getMapProjection(map)).toEqual(google);
  });

  it('#setMapProjection should update vectors to the correct new projection', () => {
    setMapProjection(map, google);
    const dataLayer = layers[1];
    const firstFeature = (dataLayer.getSource() as VectorSource<Polygon>).getFeatures()[0];
    expect(firstFeature.getGeometry().getCoordinates()[0][0][0]).toBeCloseTo(1224514.40);
    expect(firstFeature.getGeometry().getCoordinates()[0][0][1]).toBeCloseTo(6621293.72);
  });

  it('should set/get zoom, center', () => {
    const center = [11, 48];
    setZoom(map, 8);
    setCenter(map, center, true);

    expect(getZoom(map)).toBe(8);
    // Rounding errors 47.99999999999997 to equal 48
    expect(getCenter(map, true)[0]).toBeCloseTo(center[0], 1);
    expect(getCenter(map, true)[1]).toBeCloseTo(center[1], 1);
  });

  // https://github.com/openlayers/openlayers/blob/v6.4.3/test/spec/ol/view.test.js#L1773
  it('should set extent', () => {
    const extent = [-14, 33, 40, 57] as any;
    fitExtent(map, extent, true);
    // map.getView().fit() tries to fit the specified extent on the map
    // therefore only check if the ne Center is the Center of the Extent
    expect(getCenter(map, true)).toEqual(getExtentCenter(extent));
  });

  it('should set geographic extent on other projection', () => {
    setMapProjection(map, google);
    const extent = [-14, 33, 40, 57] as any;
    fitExtent(map, extent, true);
    // map.getView().fit() tries to fit the specified extent on the map
    // therefore only check if the ne Center is the Center of the Extent
    expect(getCenter(map, true)[0]).toBeCloseTo(getExtentCenter(extent)[0], -1);
    expect(getCenter(map, true)[1]).toBeCloseTo(getExtentCenter(extent)[1], -1);
  });

  it('should get te current extent', () => {
    // initial extent of map with zoom 0 and center [0,0]
    const initialExtent = [-120, -90, 120, 90];

    const extent = getCurrentExtent(map, true);
    expect(extent).toEqual(initialExtent);
  });

  it('should get the extent of all features', () => {
    const featuresExtent = [11, 51, 14, 53];
    expect(getExtentFromFeatures(map, vectorData, true)).toEqual(featuresExtent);
  });

  // TODO check async zoomInOut...
  it('should zoom in or out for one step', (done) => {
    const oldZoom = getZoom(map);
    const duration = 250;
    zoomInOut(map, '+');

    setTimeout(() => {
      const newZoom = getZoom(map);
      expect(newZoom).toBeCloseTo((oldZoom + 1), 0);
      done();
    }, duration + 50);
  });

});
