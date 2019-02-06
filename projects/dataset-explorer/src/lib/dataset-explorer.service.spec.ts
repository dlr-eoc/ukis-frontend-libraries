import { TestBed, getTestBed } from '@angular/core/testing';
import { DatasetExplorerService } from './dataset-explorer.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { testContext } from './testContext';


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

    // step 1: setup data
    const fakeContext = testContext;
    const url = "testUrl/rest/owc/";

    // step 2: setup answer to http-request
    const request = httpMock.expectOne(url);
    request.flush(fakeContext);

    // step 3: call url
    datasetExplorer.getObservations(url).subscribe((data) => {
      expect(data).toBe(fakeContext);
    });
  });

});
