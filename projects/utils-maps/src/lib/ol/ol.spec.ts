import Map from 'ol/Map';
import View from 'ol/View';
import { Group as LayerGroup, Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { flattenLayers, simpleMapToCanvas } from './ol';



describe('flattenLayers test suite', () => {
    it('flattenLayers should work with nested groups', () => {

        const map = new Map({
            layers: [
                new TileLayer({
                    source: new OSM()
                }), new LayerGroup({
                    layers: [
                        new VectorLayer({
                            source: new VectorSource({
                                features: (new GeoJSON()).readFeatures({
                                    type: 'FeatureCollection',
                                    features: [{
                                        type: 'Feature',
                                        properties: {},
                                        geometry: {
                                          type: 'Point',
                                          coordinates: [ -1.40625, 51.83577752045248 ]
                                        }
                                    }]
                                  })
                            })
                        })
                    ]
                })
            ],
            target: 'map',
            view: new View({
                center: fromLonLat([37.40570, 8.81566]),
                zoom: 4
            })
        });

        const flattenedLayers = flattenLayers(map.getLayers().getArray());
        expect(flattenedLayers.length).toEqual(2);
    });
});


describe('mapToCanvas test suite', () => {
    it('simpleMapToCanvas should create an image in a canvas', (done) => {

        const mapTarget = document.createElement('div');
        mapTarget.style.setProperty('width', '300px');
        mapTarget.style.setProperty('height', '200px');

        const map = new Map({
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: fromLonLat([37.40570, 8.81566]),
                zoom: 4
            }),
            target: mapTarget,
        });

        // For testing purposes: using an offscreen-canvas as render-target because it doesn't need to be attached to the DOM to allow drawing.
        const imageTargetCanvas = new OffscreenCanvas(300, 400);

        simpleMapToCanvas(map, imageTargetCanvas, 600, 800, (updatedCanvas: OffscreenCanvas) => {
            const image = updatedCanvas.transferToImageBitmap();
            expect(image.width).toBeTruthy();
            expect(image.height).toBeTruthy();
            done();
        });

    });
});