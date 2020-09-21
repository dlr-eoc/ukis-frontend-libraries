import Map from 'ol/Map';
import View from 'ol/View';
import { Tile as TileLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import { simpleMapToCanvas } from './utils-ol';


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

    simpleMapToCanvas(map, imageTargetCanvas, 600, 800, ((updatedCanvas: OffscreenCanvas) => {
      const image = updatedCanvas.transferToImageBitmap();
      expect(image.width).toBeTruthy();
      expect(image.height).toBeTruthy();
      done();
    }));
  });
});
