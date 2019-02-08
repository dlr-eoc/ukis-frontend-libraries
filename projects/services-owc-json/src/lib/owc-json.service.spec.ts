import { TestBed, getTestBed } from '@angular/core/testing';

import { OwcJsonService } from './owc-json.service';
import { IOwsContext, IOwsResource, IOwsOffering } from '@ukis/datatypes-owc-json';
import { barebonesContext, basicContext } from '../../assets/exampleContext';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { optimizeGroupPlayer } from '@angular/animations/browser/src/render/shared';




describe('OwcJsonService', () => {
  const allTestContexts = [barebonesContext, basicContext];
  let injector: TestBed;
  let service: OwcJsonService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OwcJsonService]
    });
    injector = getTestBed();
    service = injector.get(OwcJsonService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    // checking that there are no outstanding requests
    httpMock.verify();
  });
    
  
  it('#getContextFromServer should actually get contexts', () => {
    for(const context of allTestContexts) {
      // call url
      const url = "testUrl/rest/owc/";
      service.getContextFromServer(url).subscribe((data) => {
        expect(data).toBe(context);
      });
      
      // setup receiver of and answer to http-request
      const request = httpMock.expectOne(url);
      request.flush(context);
    }
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


  it('#layerGroupFromResource should properly create a LayerGroup-configuration', () => {
    const service: OwcJsonService = TestBed.get(OwcJsonService);
    for(const context of allTestContexts) {
      for(const resource of service.getResources(context)){

        const layergroup = service.layerGroupFromResource(resource);

        expect(layergroup.filtertype).toBe("Overlays"); // type is always "overlays" per default - though this might change in the future. 
        expect(layergroup.id).toBe(resource.id as string);
        expect(layergroup.name).toBe(resource.properties.title);
        expect(layergroup.removable).toBe(true); // default
        expect(layergroup.layerRemovable).toBe(false); // default
        expect(layergroup.layers).toEqual([]); // layers initially not set. @TODO: is this deliberate?
      }
    }
  });


  // @TODO: this method seems to be a stub. Shouldn't it return an array of ILayerOptions?
  it('#getlayersFromResource should properly create an array of ILayerOptions?', () => {});


  it('#createRasterLayerFromOffering should return an IRasterLayerOptions instance', () => {
    for(const context of allTestContexts) {
      for(const resource of service.getResources(context)) {
        for(const offering of resource.properties.offerings) {
          if(service.checkIfServiceOffering(offering)) {

            const operation = offering.operations[0];
            expect(operation).toBeTruthy();
            const rlayerOptions = service.createRasterLayerFromOffering(offering, resource);
  
            expect(rlayerOptions.name).toBe(resource.properties.title);
            expect(rlayerOptions.id as string).toBe(resource.id as string);
            expect(rlayerOptions.opacity).toBe(1); // opacity is not encoded in owc-json per default. Allways falling back to 1. 
            expect(rlayerOptions.visible).toBe(resource.properties.active);
            expect(rlayerOptions.removable).toBe(true); // "removable" is not encoded in owc-json; falling back to "true"
            expect(rlayerOptions.filtertype).toBe("Overlays"); // all data in owc-json will - for now - be an overlay. Might be changed in the future. 
            expect(rlayerOptions.type).toBe(offering.code.split("/").pop());
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
            const vlayerOptions = service.createVectorLayerFromOffering(offering, resource);
  
            expect(vlayerOptions.name).toBe(resource.properties.title);
            expect(vlayerOptions.id as string).toBe(resource.id as string);
            expect(vlayerOptions.opacity).toBe(1); // opacity is not encoded in owc-json per default. Allways falling back to 1. 
            expect(vlayerOptions.visible).toBe(resource.properties.active);
            expect(vlayerOptions.removable).toBe(true); // "removable" is not encoded in owc-json; falling back to "true"
            expect(vlayerOptions.filtertype).toBe("Overlays"); // all data in owc-json will - for now - be an overlay. Might be changed in the future. 
            expect(vlayerOptions.type).toBe("geojson"); // default
            expect(vlayerOptions.url).toBe(operation.href.substr(0, operation.href.indexOf("?")));
  
            // @TODO: checke hier auch noch die vlayerOptions.params
          }
        }
      }
    }
  });


  it('#getLegendUrl should return a proper url', () => {
    const service: OwcJsonService = TestBed.get(OwcJsonService);
    for(const context of allTestContexts) {
      for(const resource of service.getResources(context)) {
        for(const offering of resource.properties.offerings) {

          let legendUrl = service.getLegendUrl(offering);
          let legendUrlS: string = legendUrl as string;
          expect(legendUrlS.lastIndexOf("//")).toBeTruthy();

        }
      }
    }
  });

});
