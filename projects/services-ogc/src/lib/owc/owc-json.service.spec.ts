import { TestBed, getTestBed } from '@angular/core/testing/';
import { OwcJsonService } from './owc-json.service';
import { barebonesContext, basicContext, exampleContext } from '../../../assets/exampleContext';
import { coastalXTestContext } from '../../../assets/coastalx.test.context';
import { Fill, Stroke, Style } from 'ol/style.js';
import { eoc_litemap } from '@dlr-eoc/base-layers-raster';
import { LayersService, RasterLayer } from '@dlr-eoc/services-layers';
import { VectorLayer, WfsLayertype, GeojsonLayertype } from '@dlr-eoc/services-layers';
import { Feature, Polygon, FeatureCollection } from 'geojson';
import { IOwsContext } from './types/owc-json';
import { HttpClientTestingModule } from '@angular/common/http/testing';



describe('OwcJsonService: reading data from owc', () => {
  const allTestContexts = [barebonesContext, basicContext, exampleContext, coastalXTestContext];
  const targetProjection = 'EPSG:4326';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
  });

  afterEach(() => {
  });


  it('#checkContext should check if the json is a ows context', () => {
    const service: OwcJsonService = TestBed.get(OwcJsonService);
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
  });


  // @TODO: this method seems to be a stub.
  // it('#layerGroupFromResource should properly create a LayerGroup-configuration', () => {
  //   const service: OwcJsonService = TestBed.get(OwcJsonService);
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
  it('#getlayersFromResource should properly create an array of ILayerOptions?', () => { });


  it('#createRasterLayerFromOffering should return an IRasterLayerOptions instance', (done) => {
    const service: OwcJsonService = TestBed.get(OwcJsonService);

    for (const context of allTestContexts) {
      console.log('======= context: ', context.id);
      for (const resource of service.getResources(context)) {
        for (const offering of resource.properties.offerings) {
          if (service.checkIfServiceOffering(offering)) {

            const operation = offering.operations[0];
            expect(operation).toBeTruthy();
            const rlayerOptions$ = service.createRasterLayerFromOffering(offering, resource, context, targetProjection);

            rlayerOptions$.subscribe((rlayerOptions: RasterLayer) => {
              expect(rlayerOptions.name).toBe(resource.properties.title);
              expect(rlayerOptions.id as string).toBe(resource.id as string);
              expect(rlayerOptions.opacity).toBe(1); // opacity is not encoded in owc-json per default. Allways falling back to 1.
              console.log('======= check visible: ', resource.properties.active);
              // if active is not set in conext file, then it must default to true
              expect(rlayerOptions.visible).toBe(resource.properties.active === undefined ? true : resource.properties.active);

              console.log('======= check removeable: ', rlayerOptions.removable);
              expect(rlayerOptions.removable).toBe(true); // 'removable' is not encoded in owc-json; falling back to 'true'
              console.log('======= check filtertype == Layers: ', rlayerOptions.filtertype);
              expect(rlayerOptions.filtertype).toBe('Layers');
              // all data in owc-json will - for now - be an overlay. Might be changed in the future.

              console.log('======= check serviceType: ', rlayerOptions.type);

              expect(rlayerOptions.type).toBe('wms');
              console.log('======= check url: ', operation.href.substr(0, operation.href.indexOf('?')));
              expect(rlayerOptions.url).toBe(operation.href.substr(0, operation.href.indexOf('?')));

              // @TODO: checke hier auch noch die rlayerOptions.params
              done();
            });
          }
        }
      }
    }
  }, 3000);

  it('#createRasterLayerFromOffering should work properly with WMTS', () => {
    const service: OwcJsonService = TestBed.get(OwcJsonService);

  });


  it('#createVectorLayerFromOffering should return an IVectorLayerOptions instance', (done) => {
    const service: OwcJsonService = TestBed.get(OwcJsonService);

    let foundVectorLayer = false;

    for (const context of allTestContexts) {
      for (const resource of service.getResources(context)) {
        for (const offering of resource.properties.offerings) {
          if (service.checkIfServiceOffering(offering)) {

            const operation = offering.operations[0];
            expect(operation).toBeTruthy();
            const layertype = service.getLayertypeFromOfferingCode(offering);
            if (layertype === WfsLayertype || layertype === GeojsonLayertype) {
              foundVectorLayer = true;

              service.createVectorLayerFromOffering(offering, resource).subscribe((vlayerOptions) => {
                expect(vlayerOptions.name).toBe(resource.properties.title);
                expect(vlayerOptions.id as string).toBe(resource.id as string);
                expect(vlayerOptions.opacity).toBe(1); // opacity is not encoded in owc-json per default. Allways falling back to 1.
                // if active is not set in conext file, then it must default to true
                expect(vlayerOptions.visible).toBe(resource.properties.active === undefined ? true : resource.properties.active);
                expect(vlayerOptions.removable).toBe(true); // 'removable' is not encoded in owc-json; falling back to 'true'
                expect(vlayerOptions.filtertype).toBe('Overlays');
                // all data in owc-json will - for now - be an overlay. Might be changed in the future.
                expect(vlayerOptions.type).toBe('geojson'); // default
                expect(vlayerOptions.url).toBe(operation.href.substr(0, operation.href.indexOf('?')));

                // @TODO: checke hier auch noch die vlayerOptions.params
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


  it('#getLegendUrl should return a proper url', () => {
    const service: OwcJsonService = TestBed.get(OwcJsonService);

    for (const context of allTestContexts) {
      console.log('======= context: ', context.id);
      for (const resource of service.getResources(context)) {
        for (const offering of resource.properties.offerings) {
          console.log('====== offering: ', offering);
          const legendUrl = service.getLegendUrl(offering);
          console.log('====== legendUrl: ', legendUrl);
          const legendUrlS: string = legendUrl as string;
          expect(legendUrlS.lastIndexOf('//')).toBeTruthy();

        }
      }
    }
  });


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
    const service: OwcJsonService = TestBed.get(OwcJsonService);
    const layersService: LayersService = TestBed.get(LayersService);
    const osm_layer = new eoc_litemap({
      visible: true,
      legendImg: null
    });
    layersService.addLayer(osm_layer, 'Baselayers');
    layersService.getBaseLayers().subscribe(baselayers => {
      const owc = service.generateOwsContextFrom('someid', baselayers, [-190, -90, 190, 90]);
      service.getLayers(owc, targetProjection).subscribe((layers) => {
        expect(layers.length).toBeTruthy();
        done();
      });
    });
  }, 3000);

  it('#generateOwcContextFrom should properly store and restore a geojson-layer', (done) => {
    const service: OwcJsonService = TestBed.get(OwcJsonService);

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
      features: features
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
      options: options
    });

    // enconding and deconding
    const context = service.generateOwsContextFrom('testcontext', [geojsonLayer], [-190, -90, 190, 90]);

    service.getLayers(context, targetProjection).subscribe(recoveredLayers => {
      const recoveredLayer = recoveredLayers[0] as VectorLayer;
      // testing
      expect(recoveredLayer.id).toEqual(geojsonLayer.id);
      expect(JSON.parse(recoveredLayer.data)).toEqual(geojsonLayer.data);
      // expect(recoveredLayer.options).toEqual(geojsonLayer.options); // we dont encode style.

      done();
    });
  }, 3000);
});
