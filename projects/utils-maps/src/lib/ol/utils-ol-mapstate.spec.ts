import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer, Layer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { GeoJSON } from 'ol/format';
import { fromLonLat, get as getProjection } from 'ol/proj';
import { setMapProjection } from './utils-ol-mapstate';
import { Polygon } from 'ol/geom';



describe('utils-ol-mapstate test-suite', () => {

    const wgs84 = getProjection('EPSG:4326');
    const google = getProjection('EPSG:3857');
    let map: Map;
    let layers: Layer<any>[];
    beforeEach(() => {
        const osm = new TileLayer({
            source: new OSM(),
        });

        const data = new VectorLayer({
            source : new VectorSource({
                features: new GeoJSON().readFeatures({
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                          "type": "Polygon",
                          "coordinates": [[[11, 51], [14, 51], [14, 53], [11, 53], [11, 51]]]
                        }
                      }]
                  }),
            })
        });

        layers = [osm, data];

        map = new Map({
            layers: layers,
            target: 'map',
            view: new View({
              center: [13, 52],
              zoom: 7,
              projection: wgs84
            })
        });
    });



    it('#setMapProjection should set and return the correct new projection', () => {
        const newProj = setMapProjection(map, google);
        expect(newProj.epsg).toEqual('EPSG:3857');
        expect(newProj.view.getProjection()).toEqual(google);
    });

    it('#setMapProjection should update vectors to the correct new projection', () => {
        const newProj = setMapProjection(map, google);
        const dataLayer = layers[1];
        const firstFeature = (dataLayer.getSource() as VectorSource<Polygon>).getFeatures()[0];
        expect(firstFeature.getGeometry().getCoordinates()[0][0][0]).toBeCloseTo(1224514.40);
        expect(firstFeature.getGeometry().getCoordinates()[0][0][1]).toBeCloseTo(6621293.72);
    });

});
