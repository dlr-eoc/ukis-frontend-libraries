import Map from 'ol/Map';
import View from 'ol/View';
import { Group as LayerGroup, Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { flattenLayers, getCollectionItem, layerOrGroupSetOpacity, layerOrGroupSetVisible, layerOrGroupSetZIndex, simpleMapToCanvas, collectionItemSetIndex } from './utils-ol';
import { MinimalWebGlRenderer } from './customRenderers/minimal_renderer';
import { InterpolationRenderer } from './customRenderers/interpolation_renderer';
import { ParticleRenderer } from './customRenderers/particle_renderer';
import { DtmImageRenderer } from './customRenderers/dtm_renderer';
import { FeatureLike } from 'ol/Feature';


let vector1: VectorLayer<FeatureLike>;
let vector2: VectorLayer<FeatureLike>;
let vector3: VectorLayer<FeatureLike>;
let tileLayerOSM: TileLayer<OSM>;

let group1: LayerGroup;
let group2: LayerGroup;

const createMapTarget = (size) => {
    const container = document.createElement('div');
    container.id = 'map';
    container.style.width = `${size[0]}px`;
    container.style.height = `${size[1]}px`;
    document.body.appendChild(container);
    return {
        size,
        container
    };
};
let mapTarget: HTMLElement = null;
const IDKey = 'id';

const beforeEachFn = () => {
    mapTarget = createMapTarget([300, 200]).container;

    beforeEachInitLayers();
};

const beforeEachInitLayers = () => {
    tileLayerOSM = new TileLayer({
        source: new OSM()
    });
    tileLayerOSM.set(IDKey, 'tileLayerOSM');


    vector1 = new VectorLayer({
        source: new VectorSource({
            features: (new GeoJSON()).readFeatures({
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'Point',
                        coordinates: [-1.40625, 51.83577752045248]
                    }
                }]
            })
        })
    });
    vector1.set(IDKey, 'vector_1');

    vector2 = new VectorLayer({
        source: new VectorSource()
    });
    vector2.set(IDKey, 'vector_2');

    vector3 = new VectorLayer({
        source: new VectorSource()
    });
    vector3.set(IDKey, 'vector_3');

    group1 = new LayerGroup({
        layers: [
            vector1
        ]
    });
    group1.set(IDKey, 'group_1');


    group2 = new LayerGroup({
        layers: [group1, vector2, vector3]
    });
    group2.set(IDKey, 'group_2');
}

describe('flattenLayers test suite', () => {
    beforeEach(beforeEachFn);
    it('flattenLayers should work with nested groups', () => {
        group1
        const map = new Map({
            layers: [
                tileLayerOSM,
                group1
            ],
            target: mapTarget,
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
    beforeEach(beforeEachFn);
    it('simpleMapToCanvas should create an image in a canvas', (done) => {
        const map = new Map({
            layers: [
                tileLayerOSM
            ],
            view: new View({
                center: fromLonLat([37.40570, 8.81566]),
                zoom: 4
            }),
            target: mapTarget,
        });

        // For testing purposes: using an offscreen-canvas as render-target because it doesn't need to be attached to the DOM to allow drawing.
        /** Experimental: This is an experimental technology Check the Browser compatibility table carefully before using this in production. */
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

describe('ol utils test suite', () => {
    beforeEach(beforeEachFn);
    it('should get a collection item', () => {
        const vector2Index = getCollectionItem(vector2.get(IDKey), group2.getLayers(), IDKey);
        expect(vector2Index.layer).toBe(vector2);
        expect(vector2Index.index).toBe(1);

        const group1Index = getCollectionItem(group1.get(IDKey), group2.getLayers(), IDKey);
        expect(group1Index.layer).toBe(group1);
        expect(group1Index.index).toBe(0);
    });

    it('should setVisible for a layer or group', () => {
        const before = true;
        const after = false;
        // group1 is in group2
        expect(group1.getVisible()).toBe(before);
        expect(vector1.getVisible()).toBe(before);


        expect(group2.getVisible()).toBe(before);
        expect(vector2.getVisible()).toBe(before);
        expect(vector3.getVisible()).toBe(before);


        // -----------------------------------
        layerOrGroupSetVisible(group2, after);

        expect(group1.getVisible()).toBe(after);
        expect(vector1.getVisible()).toBe(after);


        expect(group2.getVisible()).toBe(after);
        expect(vector2.getVisible()).toBe(after);
        expect(vector3.getVisible()).toBe(after);
    });

    it('should setVisible for a layer and not ! group', () => {
        const before = true;
        // group1 is in group2
        expect(group1.getVisible()).toBe(before);
        expect(vector1.getVisible()).toBe(before);

        // -----------------------------------
        const skipGroup = true;
        layerOrGroupSetVisible(group1, false, skipGroup);

        expect(group1.getVisible()).toBe(false);
        expect(vector1.getVisible()).toBe(true);
    });

    it('should setOpacity for a layer or group', () => {
        const before = 1;
        const after = 0.5;
        // group1 is in group2
        expect(group1.getOpacity()).toBe(before);
        expect(vector1.getOpacity()).toBe(before);


        expect(group2.getOpacity()).toBe(before);
        expect(vector2.getOpacity()).toBe(before);
        expect(vector3.getOpacity()).toBe(before);


        // -----------------------------------
        layerOrGroupSetOpacity(group2, after);

        expect(group1.getOpacity()).toBe(after);
        expect(vector1.getOpacity()).toBe(after);


        expect(group2.getOpacity()).toBe(after);
        expect(vector2.getOpacity()).toBe(after);
        expect(vector3.getOpacity()).toBe(after);
    });

    it('should setOpacity for a layer and not ! group', () => {
        const before = 1;
        const after = 0.5;
        // group1 is in group2
        expect(group1.getOpacity()).toBe(before);
        expect(vector1.getOpacity()).toBe(before);

        // -----------------------------------
        const skipGroup = true;
        layerOrGroupSetOpacity(group1, 0.5, skipGroup);

        expect(group1.getOpacity()).toBe(0.5);
        expect(vector1.getOpacity()).toBe(1);
    });

    it('should SetZIndex for a layer or group', () => {
        const before = undefined;
        const layers = [tileLayerOSM, group2];
        // group1 is in group2
        expect(group1.getZIndex()).toBe(before);
        expect(vector1.getZIndex()).toBe(before);


        expect(group2.getZIndex()).toBe(before);
        expect(vector2.getZIndex()).toBe(before);
        expect(vector3.getZIndex()).toBe(before);


        // -----------------------------------
        // layers[tileLayerOSM, group2] ->  group2[group1, vector2, vector3] -> group1[vector1]
        layers.forEach((l, i) => {
            layerOrGroupSetZIndex(l, i);
        });


        expect(tileLayerOSM.getZIndex()).toBe(0);

        expect(group2.getZIndex()).toBe(1);
        expect(vector2.getZIndex()).toBe(1);
        expect(vector3.getZIndex()).toBe(1);

        expect(group1.getZIndex()).toBe(1);
        expect(vector1.getZIndex()).toBe(1);
    });

    it('should move an item of a collection', () => {
        const map = new Map({
            layers: [tileLayerOSM, group2],
            view: new View({
                center: fromLonLat([37.40570, 8.81566]),
                zoom: 4
            }),
            target: mapTarget,
        });

        // -----------------------------------
        // layers[tileLayerOSM, group2] ->  group2[group1, vector2, vector3] -> group1[vector1]
        const collection = map.getLayers();
        collectionItemSetIndex(group2, 0, collection);

        // layers[group2, tileLayerOSM] ->  group2[group1, vector2, vector3] -> group1[vector1]
        expect(collection.item(0)).toBe(group2);
        expect(collection.item(1)).toBe(tileLayerOSM);

        const flattenedLayers = map.getAllLayers();
        // map.getAllLayers() -> [vector1, vector2, vector3, tileLayerOSM]

        expect(flattenedLayers[0]).toBe(vector1);
        expect(flattenedLayers[1]).toBe(vector2);
        expect(flattenedLayers[2]).toBe(vector3);
        expect(flattenedLayers[3]).toBe(tileLayerOSM);
    });
});
