import { TestBed, getTestBed } from '@angular/core/testing';
import { DatasetExplorerService } from './dataset-explorer.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { IOwsContext } from "@ukis/datatypes-owc-json";



const barebonesContext: IOwsContext = {
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

    let context = barebonesContext;
    
      // call url
      const url = "testUrl/rest/owc/";
      datasetExplorer.getObservations(url).subscribe((data) => {
        expect(data).toBe(context);
      });
      
      // setup receiver of and answer to http-request
      const request = httpMock.expectOne(url);
      request.flush(context);
    }

  );

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



});