import { TestBed, getTestBed } from '@angular/core/testing';
import { DatasetExplorerService } from './dataset-explorer.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { exampleContext } from '../../assets/exampleContext';
import { RasterLayer, VectorLayer } from '@ukis/datatypes-layers';


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

});