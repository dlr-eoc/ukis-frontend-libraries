import { TestBed, getTestBed } from '@angular/core/testing';
import { DatasetExplorerService } from './dataset-explorer.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { exampleContext } from '../../assets/exampleContext';
import { IOwsOffering, IOwsResource, IOwsOperation } from '@ukis/datatypes-owc-json/src/lib/owc-json';
import { IRasterLayerOptions, VectorLayer, RasterLayer } from '@ukis/datatypes-layers/src/lib/Layers';
import { toBase64String } from '@angular/compiler/src/output/source_map';




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
    
    expect(params["service"]).toBe("WMS");
    expect(params["version"]).toBe("1.1.0");
    expect(params["request"]).toBe("GetMap");
    expect(params["TRANSPARENT"]).toBe("TRUE");
  });


  it('#getOfferingCode should return the correct type of offering', () => {
    let firstObservation: IOwsResource = exampleContext.features[0];
    let firstOffering: IOwsOffering = firstObservation.properties.offerings[0];
    let realCode = firstOffering.code.split("/").pop();

    let code = datasetExplorer.getOfferingCode(firstOffering.code);

    expect(code).toBe(realCode);
  });


  it('#addObservation should create an appropriate configuration object for a layer', () => {
    let firstObservation: IOwsResource = exampleContext.features[0];
    let firstOffering: IOwsOffering = firstObservation.properties.offerings[0];
    let firstOperation: IOwsOperation = firstOffering.operations[0];
    let layerUrl = firstOperation.href.substr(0, firstOperation.href.lastIndexOf("?"));

    let layerOptions: RasterLayer | VectorLayer = datasetExplorer.addObservation(firstObservation);
console.log(layerOptions);
    expect(layerOptions.name).toBe(firstObservation.properties.title);
    expect(layerOptions.id as string).toBe(firstObservation.id as string);
    expect(layerOptions.opacity).toBe(1); // opacity is not encoded in owc-json per default. Allways falling back to 1. 
    expect(layerOptions.visible).toBe(firstObservation.properties.active);
    expect(layerOptions.removable).toBe(true); // "removable" is not encoded in owc-json; falling back to "true"
    expect(layerOptions.filtertype).toBe("Overlays"); // all data in owc-json will - for now - be an overlay. Might be changed in the future. 
    expect(layerOptions.type).toBe(firstOffering.code.split("/").pop());
    expect(layerOptions.url).toBe(layerUrl);
    expect(layerOptions.visible).toBe(firstObservation.properties.active);
  });

});