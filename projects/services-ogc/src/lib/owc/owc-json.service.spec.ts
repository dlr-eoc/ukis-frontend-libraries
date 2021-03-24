import { TestBed, getTestBed } from '@angular/core/testing/';
import { OwcJsonService } from './owc-json.service';
import { barebonesContext, basicContext, exampleContext, userGuideContext, wuekisContext } from '../../../assets/exampleContext';
import { coastalXTestContext } from '../../../assets/coastalx.test.context';
import { Fill, Stroke, Style } from 'ol/style.js';
import { EocLitemap } from '@dlr-eoc/base-layers-raster';
import { LayersService, RasterLayer, WmsLayertype, WmtsLayertype, Layer, 
  VectorLayer, WfsLayertype, GeojsonLayertype } from '@dlr-eoc/services-layers';
import { Feature, Polygon, FeatureCollection } from 'geojson';
import { IOwsContext } from './types/owc-json';
import { HttpClientTestingModule } from '@angular/common/http/testing';



describe('OwcJsonService: reading data from owc', () => {
  const allTestContexts = [barebonesContext, basicContext, exampleContext, coastalXTestContext, userGuideContext, wuekisContext];
  const targetProjection = 'EPSG:4326';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
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
          profiles: ['http://www.opengis.net/spec/owc-geojson/1.0/req/core'],
        },
        lang: 'de',
        title: 'test context',
        updated: '2018-11-28T00:00:00'
      },
      features: []
    };
    expect(service.checkContext(context)).toBeTruthy();


    const falseContext: any = {
      "id": "ndvi",
      "type": "FeatureCollection",
      "bbox": [
          8.0419921875,
          47.025206001585396,
          14.809570312499998,
          50.764259357116465
      ],
      "properties": {
          // "lang": "EN",
          "links": [],
          "title": "Wuekis NDVI OWC",
          "updated": "2021-03-10T16:18:30Z"
      },
      "features": [
          {
              "id": "ndvi:AGRODE_S2_EVI_P1M",
              "type": "Feature",
              "geometry": null,
              "properties": {
                  "title": "AGRODE_S2_EVI_P1M",
                  "updated": null,
                  "links": null,
                  "offerings": [
                      {
                          "code": "http://schemas.opengis.net/wms/1.1.1",
                          "operations": [
                              {
                                  "code": "GetMap",
                                  "method": "GET",
                                  "type": "image/png",
                                  "href": "https://geoservice.dlr.de/eoc/land/wms?service=WMS&version=1.1.0&request=GetMap&layers=AGRODE_S2_EVI_P1M&srs=EPSG%3A4326&format=image/png"
                              }
                          ],
                          "styles": [
                              {
                                  "title": "land:agrode-evi-mean",
                                  "legendURL": "https://geoservice.dlr.de/eoc/land/wms?service=WMS&version=1.1.0&request=GetLegendGraphic&layer=AGRODE_S2_EVI_P1M&srs=EPSG%3A4326&format=image/png&LEGEND_OPTIONS=forceLabels:on;fontAntiAliasing:true;",
                                  "name": "land:agrode-evi-mean",
                                  "default": true
                              }
                          ]
                      }
                  ],
                  "categories": [],
                  "customAttributes": {}
              },
              "bbox": [
                  23.225,
                  54.737,
                  29.838,
                  57.243
              ]
          }
      ]
    };
    expect(service.checkContext(falseContext)).toBeFalsy();

  });


  // it('#layerGroupFromResource should properly create a LayerGroup-configuration', () => {
  //   const service: OwcJsonService = TestBed.inject(OwcJsonService);
  //   for(const context of allTestContexts) {
  //     for(const resource of service.getResources(context)){

  //       const layergroup = service.layerGroupFromResource(resource);

  //       expect(layergroup.filtertype).toBe('Overlays');
  //       // type is always 'overlays' per default - though this might change in the future.
  //       expect(layergroup.id).toBe(resource.id as string);
  //       expect(layergroup.name).toBe(resource.properties.title);
  //       expect(layergroup.removable).toBe(true); // default
  //       expect(layergroup.layerRemovable).toBe(false); // default
  //       expect(layergroup.layers).toEqual([]); // layers initially not set. @TODO: is this deliberate?
  //     }
  //   }
  // });


  // @TODO: this method seems to be a stub. Shouldn't it return an array of ILayerOptions?
  it('#getLayersFromResource should properly create an array of ILayerOptions?', () => { });


  for (const context of allTestContexts) {
    it(`#createRasterLayerFromOffering should return an IRasterLayerOptions instance for context ${context.id}`, (done) => {
      const service: OwcJsonService = TestBed.inject(OwcJsonService);
      let foundRasterLayer = false;

      for (const resource of service.getResources(context)) {
        for (const offering of resource.properties.offerings) {
          if (service.checkIfServiceOffering(offering)) {

            const operation = offering.operations[0];
            expect(operation).toBeTruthy();

            const layertype = service.getLayertypeFromOfferingCode(offering);
            if (layertype === WmsLayertype || layertype === WmtsLayertype) {
              foundRasterLayer = true;

              const rlayerOptions$ = service.createRasterLayerFromOffering(offering, resource, context, targetProjection);

              rlayerOptions$.subscribe((layer: RasterLayer) => {
                expect(layer instanceof Layer).toBeTrue();
                expect(layer instanceof RasterLayer).toBeTrue();

                expect(layer.name).toBe(resource.properties.title);
                expect(layer.id as string).toBe(resource.id as string);
                expect(layer.opacity).toBe(1); // opacity is not encoded in owc-json per default. Always falling back to 1.
                // if active is not set in conext file, then it must default to true
                expect(layer.visible).toBe(resource.properties.active === undefined ? true : resource.properties.active);

                // 'removable' is not encoded in owc-json; falling back to 'true'
                expect(layer.removable).toBe(true);
                // all data in owc-json will - for now - be in 'Layers'. Might be changed in the future.
                expect(layer.filtertype).toBe('Layers');

                expect(layer.type).toBe('wms');
                expect(layer.url).toBe(operation.href.substr(0, operation.href.indexOf('?')));

                // @TODO: also check rlayerOptions.params
                done();
              });
            }

          }
        }
      }
      if (!foundRasterLayer) {
        done();
      }
    }, 3000);
  }

  it('#createRasterLayerFromOffering should work properly with WMTS', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);

  });


  for (const context of allTestContexts) {
    it(`#createVectorLayerFromOffering should return an IVectorLayerOptions instance for context ${context.id}`, (done) => {
      const service: OwcJsonService = TestBed.inject(OwcJsonService);
      let foundVectorLayer = false;

      for (const resource of service.getResources(context)) {
        for (const offering of resource.properties.offerings) {
          if (service.checkIfServiceOffering(offering)) {

            const operation = offering.operations[0];
            expect(operation).toBeTruthy();
            const layertype = service.getLayertypeFromOfferingCode(offering);
            if (layertype === WfsLayertype || layertype === GeojsonLayertype) {
              foundVectorLayer = true;

              service.createVectorLayerFromOffering(offering, resource).subscribe((layer) => {
                expect(layer instanceof Layer).toBeTrue();
                expect(layer instanceof VectorLayer).toBeTrue();

                expect(layer.name).toBe(resource.properties.title);
                expect(layer.id as string).toBe(resource.id as string);
                expect(layer.opacity).toBe(1); // opacity is not encoded in owc-json per default. Always falling back to 1.

                // if active is not set in context file, then it must default to true
                expect(layer.visible).toBe(resource.properties.active === undefined ? true : resource.properties.active);
                // 'removable' is not encoded in owc-json; falling back to 'true'
                expect(layer.removable).toBe(true);
                // all data in owc-json will - for now - be in 'Layers'. Might be changed in the future.
                expect(layer.filtertype).toBe('Layers');

                expect(['geojson', 'wfs'].includes(layer.type)).toBeTrue();
                expect(layer.url.substr(0, layer.url.indexOf('?'))).toBe(operation.href.substr(0, operation.href.indexOf('?')));

                // @TODO: also check vlayerOptions.params
                done();
              });
            }
          }
        }
      }
      if (!foundVectorLayer) {
        done();
      }
    }, 3000);
  }


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


  it('#getLayers should handle dimensions', (done) => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);

    service.getLayers(basicContext, 'EPSG:4326').subscribe((layers: Layer[]) => {
      for (const layer of layers) {
        expect(layer instanceof Layer).toBeTrue();

        expect(layer.dimensions).toBeTruthy();
        expect(layer.dimensions.time?.units).toEqual('ISO8601');
        expect(layer.dimensions.time?.values).toBeTruthy();
      }
      done();
    });
  }, 3000);

});

describe('OwcJsonService: writing data into owc', () => {
  const allTestContexts = [barebonesContext, basicContext, exampleContext, coastalXTestContext];
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

    const vectorLayer = new VectorLayer({
      id: 'testLayer',
      name: 'Test Layer',
      type: 'geojson',
      data: {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    -1.0546875,
                    44.59046718130883
                  ],
                  [
                    8.7890625,
                    44.59046718130883
                  ],
                  [
                    8.7890625,
                    53.54030739150022
                  ],
                  [
                    -1.0546875,
                    53.54030739150022
                  ],
                  [
                    -1.0546875,
                    44.59046718130883
                  ]
                ]
              ]
            }
          }
        ]
      },
    });
    layersService.addLayer(vectorLayer, 'Baselayers');


    layersService.getBaseLayers().subscribe(baselayers => {
      const owc = service.generateOwsContextFrom('someid', baselayers, [-190, -90, 190, 90]);
      service.getLayers(owc, targetProjection).subscribe((layers) => {
        expect(layers.length).toEqual(2);
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

    // enconding and deconding
    const context = service.generateOwsContextFrom('testcontext', [geojsonLayer], [-190, -90, 190, 90]);

    service.getLayers(context, targetProjection).subscribe(recoveredLayers => {
      for (const layer of recoveredLayers) {
        expect(layer instanceof Layer).toBeTrue();
      }

      const recoveredLayer = recoveredLayers[0] as VectorLayer;
      // testing
      expect(recoveredLayer.id).toEqual(geojsonLayer.id);
      expect(JSON.parse(recoveredLayer.data)).toEqual(geojsonLayer.data);
      // expect(recoveredLayer.options).toEqual(geojsonLayer.options); // we don't encode style.

      done();
    });
  }, 3000);
});
