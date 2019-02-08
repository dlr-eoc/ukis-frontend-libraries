import { TestBed, getTestBed } from '@angular/core/testing';
import { DatasetExplorerService } from './dataset-explorer.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { exampleContext } from '../../assets/exampleContext';
import { IOwsOffering, IOwsResource, IOwsOperation, IOwsContext } from '@ukis/datatypes-owc-json/src/lib/owc-json';
import { RasterLayer, VectorLayer } from '@ukis/datatypes-layers/src/lib/Layers';


// All tests run on all the owc-json files in this array. TODO: add more example files to this array!
let allTestContexts = [exampleContext];



describe('DatasetExplorerService: obtaining data', () => {

  let injector: TestBed;
  let datasetExplorer: DatasetExplorerService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DatasetExplorerService]
    });
    injector = getTestBed();
    datasetExplorer = injector.get(DatasetExplorerService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    // checking that there are no outstanding requests
    httpMock.verify();
  });


  it('#getObservations should actually get observations', () => {

    for(const context of allTestContexts) {
      // call url
      const url = "testUrl/rest/owc/";
      datasetExplorer.getObservations(url).subscribe((data) => {
        expect(data).toBe(context);
      });
      
      // setup receiver of and answer to http-request
      const request = httpMock.expectOne(url);
      request.flush(context);
    }

  });

});


describe('DatasetExplorerService: transforming data', () => {

  let injector: TestBed;
  let datasetExplorer: DatasetExplorerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DatasetExplorerService]
    });
    injector = getTestBed();
    datasetExplorer = injector.get(DatasetExplorerService);
  });


  it('#getJsonFromUrl should properly read parameters from url', () => {
    let url = "https://geoservice.code-de.org/Sentinel1/wms?service=WMS&version=1.1.0&request=GetMap&TRANSPARENT=TRUE&LAYERS=S1_SAR_L1_GRD&FORMAT=image/vnd.jpeg-png&TILEF=true";
    
    let params = datasetExplorer.getJsonFromUrl(url);
    
    expect(params["SERVICE"]).toBe("WMS");
    expect(params["VERSION"]).toBe("1.1.0");
    expect(params["REQUEST"]).toBe("GetMap");
    expect(params["TRANSPARENT"]).toBe("TRUE");
  });


  it('#getOfferingCode should return the correct type of offering', () => {
    for(const context of allTestContexts) {
      for(let observation of context.features) {
        for(let offering of observation.properties.offerings) {
          
          let realCode = offering.code.split("/").pop();
      
          let code = datasetExplorer.getOfferingCode(offering.code);
      
          expect(code).toBe(realCode);

        }
      }
    }
  });


  it('#addObservation should create an appropriate configuration object for a layer', () => {
    for(const context of allTestContexts) {
      for(let observation of context.features) {
        for(let offering of observation.properties.offerings) {
          for(let operation of offering.operations) {

            let layerOptions: RasterLayer | VectorLayer = datasetExplorer.addObservation(observation);
        
            expect(layerOptions.name).toBe(observation.properties.title);
            expect(layerOptions.id as string).toBe(observation.id as string);
            expect(layerOptions.opacity).toBe(1); // opacity is not encoded in owc-json per default. Allways falling back to 1. 
            expect(layerOptions.visible).toBe(observation.properties.active);
            expect(layerOptions.removable).toBe(true); // "removable" is not encoded in owc-json; falling back to "true"
            expect(layerOptions.filtertype).toBe("Overlays"); // all data in owc-json will - for now - be an overlay. Might be changed in the future. 
            expect(layerOptions.type).toBe(offering.code.split("/").pop());
            expect(layerOptions.url).toBe(operation.href.substr(0, operation.href.lastIndexOf("?")));
            //expect(layerOptions.params)
          
          }
        }
      }
    }
  });


  it('#getLegendUrl', () => {
    for(const context of allTestContexts) {
      let firstObservation: IOwsResource = context.features[0];
      let firstOffering: IOwsOffering = firstObservation.properties.offerings[0];

      let legendUrl = datasetExplorer.getLegendUrl(firstOffering);
    }
  });

});