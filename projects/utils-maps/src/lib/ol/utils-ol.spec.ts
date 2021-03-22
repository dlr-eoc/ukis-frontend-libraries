import Map from 'ol/Map';
import View from 'ol/View';
import { Group as LayerGroup, Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { flattenLayers, simpleMapToCanvas } from './utils-ol';
import { MinimalWebGlRenderer } from './customRenderers/minimal_renderer';
import { InterpolationRenderer } from './customRenderers/interpolation_renderer';
import { ParticleRenderer } from './customRenderers/particle_renderer';
import { DtmImageRenderer } from './customRenderers/dtm_renderer';



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

describe('ol-renderer test suite', () => {
    it('all renderers should have the methods `prepareFrame`, `renderFrame` and `renderDeclutter`', () => {
        // If ol exported a typescript interface, this test would not be necessary. But the @types repo of ol tends to lag behind, so we're making sure here.
        expect(MinimalWebGlRenderer.prototype.prepareFrame).toBeTruthy();
        expect(MinimalWebGlRenderer.prototype.renderFrame).toBeTruthy();
        expect(MinimalWebGlRenderer.prototype.renderDeclutter).toBeTruthy();
        expect(InterpolationRenderer.prototype.prepareFrame).toBeTruthy();
        expect(InterpolationRenderer.prototype.renderFrame).toBeTruthy();
        expect(InterpolationRenderer.prototype.renderDeclutter).toBeTruthy();
        expect(ParticleRenderer.prototype.prepareFrame).toBeTruthy();
        expect(ParticleRenderer.prototype.renderFrame).toBeTruthy();
        expect(ParticleRenderer.prototype.renderDeclutter).toBeTruthy();
        expect(DtmImageRenderer.prototype.prepareFrame).toBeTruthy();
        expect(DtmImageRenderer.prototype.renderFrame).toBeTruthy();
        expect(DtmImageRenderer.prototype.renderDeclutter).toBeTruthy();
    });
});
