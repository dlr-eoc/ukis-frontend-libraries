import { TestBed, getTestBed } from '@angular/core/testing';
import { DatasetExplorerService } from './dataset-explorer.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { exampleContext } from '../../assets/exampleContext';




describe('DatasetExplorerService', () => {

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

    //setup data
    const fakeContext = exampleContext;
    const url = "testUrl/rest/owc/";

    // actually call url
    datasetExplorer.getObservations(url).subscribe((data) => {
      expect(data).toBe(fakeContext);
    });
    
    // setup receiver of and answer to http-request
    const request = httpMock.expectOne(url);
    request.flush(fakeContext);
  });


});
