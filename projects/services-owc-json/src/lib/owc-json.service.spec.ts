import { TestBed, getTestBed } from '@angular/core/testing';

import { OwcJsonService } from './owc-json.service';
import { barebonesContext, basicContext, exampleContext } from '../../assets/exampleContext';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { optimizeGroupPlayer } from '@angular/animations/browser/src/render/shared';
import { Fill, Stroke, Style } from 'ol/style.js';
import { coastalXTestContext } from '../../assets/coastalx.test.context';
import { iterateListLike } from '@angular/core/src/change_detection/change_detection_util';
import { osm } from '@ukis/base-layers-raster';
import { LayersService } from '@ukis/services-layers';
import { VectorLayer, WfsLayertype, GeojsonLayertype } from '@ukis/services-layers';
import { Feature, Polygon, FeatureCollection } from 'geojson';
import { IOwsContext } from './types/owc-json';



describe('OwcJsonService: reading data from owc', () => {
  const allTestContexts = [barebonesContext, basicContext, exampleContext, coastalXTestContext];
  let injector: TestBed;
  let service: OwcJsonService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [OwcJsonService]
    });
    injector = getTestBed();
    service = injector.get(OwcJsonService);
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
    }
    expect(service.checkContext(context)).toBeTruthy();
  });


  // @TODO: this method seems to be a stub.
  // it('#layerGroupFromResource should properly create a LayerGroup-configuration', () => {
  //   const service: OwcJsonService = TestBed.get(OwcJsonService);
  //   for(const context of allTestContexts) {
  //     for(const resource of service.getResources(context)){

  //       const layergroup = service.layerGroupFromResource(resource);

  //       expect(layergroup.filtertype).toBe("Overlays"); // type is always "overlays" per default - though this might change in the future. 
  //       expect(layergroup.id).toBe(resource.id as string);
  //       expect(layergroup.name).toBe(resource.properties.title);
  //       expect(layergroup.removable).toBe(true); // default
  //       expect(layergroup.layerRemovable).toBe(false); // default
  //       expect(layergroup.layers).toEqual([]); // layers initially not set. @TODO: is this deliberate?
  //     }
  //   }
  // });


  // @TODO: this method seems to be a stub. Shouldn't it return an array of ILayerOptions?
  it('#getlayersFromResource should properly create an array of ILayerOptions?', () => {});


  it('#createRasterLayerFromOffering should return an IRasterLayerOptions instance', () => {
    for(const context of allTestContexts) {
      console.log("======= context: ", context.id)
      for(const resource of service.getResources(context)) {
        for(const offering of resource.properties.offerings) {
          if(service.checkIfServiceOffering(offering)) {

            const operation = offering.operations[0];
            expect(operation).toBeTruthy();
            const rlayerOptions = service.createRasterLayerFromOffering(offering, resource);

            //console.log(rlayerOptions);

            expect(rlayerOptions.name).toBe(resource.properties.title);
            expect(rlayerOptions.id as string).toBe(resource.id as string);
            expect(rlayerOptions.opacity).toBe(1); // opacity is not encoded in owc-json per default. Allways falling back to 1. 
            console.log("======= check visible: ", resource.properties.active);
            // if active is not set in conext file, then it must default to true
            expect(rlayerOptions.visible).toBe(resource.properties.active === undefined ? true : resource.properties.active);

            console.log("======= check removeable: ", rlayerOptions.removable);
            expect(rlayerOptions.removable).toBe(true); // "removable" is not encoded in owc-json; falling back to "true"
            console.log("======= check filtertype == Layers: ", rlayerOptions.filtertype);
            expect(rlayerOptions.filtertype).toBe("Layers"); // all data in owc-json will - for now - be an overlay. Might be changed in the future.

            console.log("======= check serviceType: ", rlayerOptions.type);

      
            expect(rlayerOptions.type).toBe("wms");
            console.log("======= check url: ", operation.href.substr(0, operation.href.indexOf("?")));
            expect(rlayerOptions.url).toBe(operation.href.substr(0, operation.href.indexOf("?")));
  
            // @TODO: checke hier auch noch die rlayerOptions.params
          }
        }
      }
    }
  });


  it('#createVectorLayerFromOffering should return an IVectorLayerOptions instance', () => {
    for(const context of allTestContexts) {
      for(const resource of service.getResources(context)) {
        for(const offering of resource.properties.offerings) {
          if(service.checkIfServiceOffering(offering)) {

            const operation = offering.operations[0];
            expect(operation).toBeTruthy();
            let layertype = service.getLayertypeFromOfferingCode(offering);
            if (layertype == WfsLayertype || layertype == GeojsonLayertype) {

              const vlayerOptions = service.createVectorLayerFromOffering(offering, resource);
    
              expect(vlayerOptions.name).toBe(resource.properties.title);
              expect(vlayerOptions.id as string).toBe(resource.id as string);
              expect(vlayerOptions.opacity).toBe(1); // opacity is not encoded in owc-json per default. Allways falling back to 1.
              // if active is not set in conext file, then it must default to true 
              expect(vlayerOptions.visible).toBe(resource.properties.active === undefined ? true : resource.properties.active); 
              expect(vlayerOptions.removable).toBe(true); // "removable" is not encoded in owc-json; falling back to "true"
              expect(vlayerOptions.filtertype).toBe("Overlays"); // all data in owc-json will - for now - be an overlay. Might be changed in the future. 
              expect(vlayerOptions.type).toBe("geojson"); // default
              expect(vlayerOptions.url).toBe(operation.href.substr(0, operation.href.indexOf("?")));
    
              // @TODO: checke hier auch noch die vlayerOptions.params
            }
          }
        }
      }
    }
  });


  it('#getLegendUrl should return a proper url', () => {
    const service: OwcJsonService = TestBed.get(OwcJsonService);
    for(const context of allTestContexts) {
      console.log("======= context: ", context.id)
      for(const resource of service.getResources(context)) {
        for(const offering of resource.properties.offerings) {
          console.log("====== offering: ", offering);
          let legendUrl = service.getLegendUrl(offering);
          console.log("====== legendUrl: ", legendUrl);
          let legendUrlS: string = legendUrl as string;
          expect(legendUrlS.lastIndexOf("//")).toBeTruthy();

        }
      }
    }
  });


});

describe('OwcJsonService: writing data into owc', () => {
  const allTestContexts = [barebonesContext, basicContext, exampleContext, coastalXTestContext];
  let injector: TestBed;
  let service: OwcJsonService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [OwcJsonService, LayersService]
    });
    injector = getTestBed();
    service = injector.get(OwcJsonService);
  });

  afterEach(() => {
  });

  it('#getLayers should properly restore a selection of layers from owc format created with #generateOwsContextFrom', () => {
    const service: OwcJsonService = TestBed.get(OwcJsonService);
    const layersService: LayersService = TestBed.get(LayersService);
    const osm_layer = new osm(<any>{
      visible: true,
      legendImg: null
    });
    layersService.addLayer(osm_layer, 'Baselayers');
    layersService.getBaseLayers().subscribe(baselayers => {
      const owc = service.generateOwsContextFrom("someid", baselayers, [-190, -90, 190, 90]);
      const layers = service.getLayers(owc);
      expect(layers.length).toBeTruthy();
    })
  });

  it('#generateOwcContextFrom should properly store and restore a geojson-layer', () => {

    // creating test-layer
    interface Props {
      "name": string,
      "id": string
    };
    let features: Feature<Polygon, Props>[] = [{
      type: "Feature",
      properties: {
        name: "Testfeature",
        id: "testfeatureId"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[0, 1], [0, 3]], [[2, 3], [2, 1]]]
      }
    }];
    let featureCollection: FeatureCollection<Polygon, Props> = {
      type: "FeatureCollection",
      features: features
    }

    let options = {
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

    let geojsonLayer = new VectorLayer({
      name: "GeojsonLayer",
      id: "GeojsonLayer",
      type: GeojsonLayertype,
      data: featureCollection,
      options: options
    });

    // enconding and deconding
    let context = service.generateOwsContextFrom("testcontext", [geojsonLayer], [-190, -90, 190, 90]);
    let recoveredLayers = service.getLayers(context);
    let recoveredLayer = recoveredLayers[0] as VectorLayer;

    // testing
    expect(recoveredLayer.id).toEqual(geojsonLayer.id);
    expect(JSON.parse(recoveredLayer.data)).toEqual(geojsonLayer.data);
    // expect(recoveredLayer.options).toEqual(geojsonLayer.options); // we dont encode style.

  });
});
