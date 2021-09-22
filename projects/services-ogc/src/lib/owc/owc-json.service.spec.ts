import { TestBed } from '@angular/core/testing/';
import { OwcJsonService, TmsLayertype } from './owc-json.service';
import { barebonesContext, basicContext, exampleContext, zoomedContext } from '../../../assets/exampleContext';
import { Fill, Stroke, Style } from 'ol/style.js';
import { isRasterLayertype, isVectorLayertype, LayersService, RasterLayer, LayerGroup } from '@dlr-eoc/services-layers';
import { VectorLayer, GeojsonLayertype } from '@dlr-eoc/services-layers';
import { Feature, Polygon, FeatureCollection } from 'geojson';
import { IOwsContext } from './types/owc-json';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EocLitemap } from '@dlr-eoc/base-layers-raster';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';


describe('OwcJsonService: reading data from owc', () => {
  const allTestContexts = [barebonesContext, basicContext, zoomedContext, exampleContext];
  const targetProjection = 'EPSG:4326';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    proj4.defs(
      'EPSG:25832',
      '+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
    );
    proj4.defs(
      'EPSG:3035',
      '+proj=laea +lat_0=52 +lon_0=10 +x_0=4321000 +y_0=3210000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
    );
    register(proj4);
  });

  afterEach(() => {
  });


  it('#checkContext should check if the json is a ows context', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    const context: IOwsContext = {
      id: 'test context',
      type: 'FeatureCollection',
      properties: {
        links: {
          profiles: [{
            href: 'http://www.opengis.net/spec/owc-geojson/1.0/req/core'
          }],
        },
        lang: 'de',
        title: 'test context',
        updated: '2018-11-28T00:00:00'
      },
      features: []
    };
    expect(service.checkContext(context)).toBeTruthy();
  });

  it('#createRasterLayerFromOffering should return an IRasterLayerOptions instance', (done) => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);

    for (const context of allTestContexts) {
      for (const resource of service.getResources(context)) {
        for (const offering of resource.properties.offerings) {
          if (service.checkIfServiceOffering(offering)) {

            const operation = offering.operations[0];
            expect(operation).toBeTruthy();
            const layertype = service.getLayertypeFromOfferingCode(offering);
            if (isRasterLayertype(layertype)) {
              const rLayer$ = service.createRasterLayerFromOffering(offering, resource, context, targetProjection);

              rLayer$.subscribe((rLayer: RasterLayer) => {
                expect(rLayer.name).toBe(resource.properties.title);
                expect(rLayer.id as string).toBe(resource.id as string);
                expect(['Baselayers', 'Layers', 'Overlays'].includes(rLayer.filtertype)).toBeTrue();
                expect(rLayer.type).toBe('wms');
                expect(rLayer.url).toBe(operation.href.substr(0, operation.href.indexOf('?')));

                // opacity is not encoded in owc-json per default. Always falling back to 1.
                expect(rLayer.opacity).toBe(1);

                // if active is not set in context file, then it must default to true
                expect(rLayer.visible).toBe(resource.properties.active === undefined ? true : resource.properties.active);

                // 'removable' is not encoded in owc-json; falling back to 'true'
                expect(rLayer.removable).toBe(true);

                if (resource.properties.dimensions) {
                  const timeDimension = resource.properties.dimensions.find(d => d.name === 'time');
                  if (timeDimension) {
                    expect(rLayer.dimensions.time).toBeTruthy();
                  }
                }

                const styles = offering.styles;
                if (styles) {
                  const defaultStyle = styles.find(s => s.default);
                  if (defaultStyle) {
                    expect(rLayer.params.STYLES).toEqual(defaultStyle.name);
                  }
                } else {
                  const getMapOperation = offering.operations?.find(o => o.code === 'GetMap');
                  if (getMapOperation) {
                    const urlParas = new URL(getMapOperation.href).searchParams;
                    const style = urlParas.get('STYLES');
                    if (style) {
                      expect(rLayer.params.STYLES).toEqual(style);
                    }
                  }
                }

                if (resource.properties.abstract) {
                  expect(rLayer.description).toEqual(resource.properties.abstract);
                }

                if (resource.properties.minscaledenominator) {
                  expect(rLayer.minZoom).toBeDefined();
                }
                if (resource.properties.minZoom) {
                  expect(rLayer.minZoom).toEqual(resource.properties.minZoom);
                }
                if (resource.properties.maxscaledenominator) {
                  expect(rLayer.maxZoom).toBeDefined();
                }
                if (resource.properties.maxZoom) {
                  expect(rLayer.maxZoom).toEqual(resource.properties.maxZoom);
                }

                done();
              });
            }

          }
        }
      }
    }
  }, 3000);

  it('#createRasterLayerFromOffering should work properly with WMTS', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);

  });

  it('#createVectorLayerFromOffering should return a VectorLayer instance', (done) => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);

    let foundVectorLayer = false;

    for (const context of allTestContexts) {
      for (const resource of service.getResources(context)) {
        for (const offering of resource.properties.offerings) {
          if (service.checkIfServiceOffering(offering)) {

            const layertype = service.getLayertypeFromOfferingCode(offering);
            if (isVectorLayertype(layertype)) {
              foundVectorLayer = true;

              service.createVectorLayerFromOffering(offering, resource, context).subscribe((vLayer) => {
                expect(vLayer.name).toBe(resource.properties.title);
                expect(vLayer.id as string).toBe(resource.id as string);
                expect(vLayer.removable).toBe(true); // 'removable' is not encoded in owc-json; falling back to 'true'
                expect(['Baselayers', 'Layers', 'Overlays'].includes(vLayer.filtertype)).toBeTrue();
                expect(['wfs', 'geojson'].includes(vLayer.type)).toBeTrue();

                if (vLayer.type === 'wfs') {
                  const getFeatureOp = offering.operations?.find(o => o.code === 'GetFeature');
                  expect(getFeatureOp).toBeTruthy();
                  expect(vLayer.url).toBe(getFeatureOp.href);
                }

                // opacity is not encoded in owc-json per default. Always falling back to 1.
                expect(vLayer.opacity).toBe(1);

                // if active is not set in context file, then it must default to true
                expect(vLayer.visible).toBe(resource.properties.active === undefined ? true : resource.properties.active);

                if (offering.styles && offering.styles[0]?.legendURL) {
                  expect(vLayer.legendImg).toEqual(offering.styles[0].legendURL);
                }

                if (resource.properties.abstract) {
                  expect(vLayer.description).toEqual(resource.properties.abstract);
                }

                done();
              });
            }
          }
        }
      }
    }

    if (!foundVectorLayer) {
      done();
    }

  }, 3000);

  it('#createLayerFromOffering should work with CustomLayers', (done) => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);

    let foundCustomLayer = false;

    for (const context of allTestContexts) {
      for (const resource of service.getResources(context)) {
        for (const offering of resource.properties.offerings) {
          if (service.checkIfServiceOffering(offering)) {

            const operation = offering.operations[0];
            expect(operation).toBeTruthy();
            const layertype = service.getLayertypeFromOfferingCode(offering);
            if (layertype === TmsLayertype) {
              foundCustomLayer = true;

              const targetProjection = context.projections[0]?.code || 'EPSG:4326';
              service.createTmsLayerFromOffering(offering, resource, context, targetProjection).subscribe((cLayer) => {
                expect(cLayer.name).toBe(resource.properties.title);
                expect(cLayer.id as string).toBe(resource.id as string);
                expect(['Baselayers', 'Layers', 'Overlays'].includes(cLayer.filtertype)).toBeTrue();
                expect(cLayer.type).toBe('custom');

                // opacity is not encoded in owc-json per default. Always falling back to 1.
                expect(cLayer.opacity).toBe(1);

                // if active is not set in context file, then it must default to true
                expect(cLayer.visible).toBe(resource.properties.active === undefined ? true : resource.properties.active);

                // 'removable' is not encoded in owc-json; falling back to 'true'
                expect(cLayer.removable).toBe(true);

                if (offering.styles && offering.styles[0]?.legendURL) {
                  expect(cLayer.legendImg).toEqual(offering.styles[0].legendURL);
                }

                if (resource.properties.abstract) {
                  expect(cLayer.description).toEqual(resource.properties.abstract);
                }

                done();
              });
            }
          }
        }
      }
    }

    if (!foundCustomLayer) {
      done();
    }

  }, 3000);

  it('#getLegendUrl should return a proper url', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);

    for (const context of allTestContexts) {
      for (const resource of service.getResources(context)) {
        for (const offering of resource.properties.offerings) {
          const legendUrl = service.getLegendUrl(offering);
          const legendUrlS: string = legendUrl as string;
          expect(legendUrlS.lastIndexOf('//')).toBeTruthy();

        }
      }
    }
  });

  it('#getLayers should not stop working even if an unknown offering-code has been given', (done) => {

    const context: IOwsContext = {
      id: 'test context',
      type: 'FeatureCollection',
      properties: {
        links: {
          profiles: [{
            href: 'http://www.opengis.net/spec/owc-geojson/1.0/req/core'
          }],
        },
        lang: 'de',
        title: 'test context',
        updated: '2018-11-28T00:00:00'
      },
      features: [{
        id: 'weirdLayer',
        properties: {
          title: 'weird layer',
          updated: 'today',
          offerings: [{
            code: 'https://some.unknown/protocol'
          }]
        },
        geometry: null,
        type: 'Feature'
      }]
    };

    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    service.getLayers(context, 'EPSG:4326').subscribe((layers) => {
      expect(layers).toBeTruthy();
      done();
    });

  }, 3000);

});

describe('OwcJsonService: writing data into owc', () => {
  const allTestContexts = [barebonesContext, basicContext, exampleContext];
  const targetProjection = 'EPSG:4326';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
  });

  afterEach(() => {
  });

  it('#getLayers should properly restore a selection of layers from owc format created with #generateOwsContextFrom', (done) => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    const layersService: LayersService = TestBed.inject(LayersService);
    const osmLayer = new EocLitemap({
      visible: true,
      legendImg: null
    });
    layersService.addLayer(osmLayer, 'Baselayers');
    layersService.getBaseLayers().subscribe(baselayers => {
      const owc = service.generateOwsContextFrom('someid', baselayers, [-190, -90, 190, 90]);
      service.getLayers(owc, targetProjection).subscribe((layers) => {
        expect(layers.length).toBeTruthy();
        done();
      });
    });
  }, 3000);

  it('#generateOwcContextFrom should properly store and restore a geojson-layer', (done) => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);

    // creating test-layer
    interface Props {
      'name': string;
      'id': string;
    }

    const features: Feature<Polygon, Props>[] = [{
      type: 'Feature',
      properties: {
        name: 'Testfeature',
        id: 'testfeatureId'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[0, 1], [0, 3]], [[2, 3], [2, 1]]]
      }
    }];

    const featureCollection: FeatureCollection<Polygon, Props> = {
      type: 'FeatureCollection',
      features
    };

    const options = {
      style: new Style({
        stroke: new Stroke({
          color: 'rgb(214, 102, 27)',
          width: 3
        }),
        fill: new Fill({
          color: 'rgba(226, 123, 54, 0.1)'
        })
      })
    };

    const geojsonLayer = new VectorLayer({
      name: 'GeojsonLayer',
      id: 'GeojsonLayer',
      type: GeojsonLayertype,
      data: featureCollection,
      options
    });

    // encoding and decoding
    const context = service.generateOwsContextFrom('testcontext', [geojsonLayer], [-190, -90, 190, 90]);

    service.getLayers(context, targetProjection).subscribe(recoveredLayers => {
      const recoveredLayer = recoveredLayers[0] as VectorLayer;
      // testing
      expect(recoveredLayer.id).toEqual(geojsonLayer.id);
      expect(recoveredLayer.data).toEqual(geojsonLayer.data);
      // expect(recoveredLayer.options).toEqual(geojsonLayer.options); // we dont encode style.

      done();
    });
  }, 3000);

  it('#generateOwcContextFrom should work with all layers in test-contexts', (done) => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);

    for (const context of allTestContexts) {
      service.getLayers(context, 'EPSG:4326').subscribe((layers) => {

        const regeneratedContext = service.generateOwsContextFrom('someId', layers);

        for (const feature of context.features) {
          const generatedLayer = layers.find(l => l.id === feature.id);
          const regeneratedFeature = regeneratedContext.features.find(f => f.id === feature.id);

          if (!(generatedLayer instanceof LayerGroup)) {
            if (generatedLayer.type !== 'custom') {
              expect(regeneratedFeature).toBeTruthy();
              expect(regeneratedFeature.properties.offerings.length > 0).toBeTrue();
              expect(regeneratedFeature.properties.offerings[0].operations.length > 0).toBeTrue();
            }
          }
        }

        done();

      });
    }

  }, 3000);

  it('#generateOwcContextFrom should honor (nested) layer-groups', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);

    const group = new LayerGroup({
      id: 'parent',
      name: 'parent',
      layers: [
        new EocLitemap({
          name: 'child'
        }),
      ],
    });

    const context = service.generateOwsContextFrom('someId', [group]);

    expect(context.features[0].properties.folder).toEqual('parent');

  });
});
