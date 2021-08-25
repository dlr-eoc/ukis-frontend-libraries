import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import * as XLink_1_0_Factory from 'w3c-schemas/lib/XLink_1_0'; const XLink_1_0 = XLink_1_0_Factory.XLink_1_0;
import * as OWS_1_1_0_Factory from 'ogc-schemas/lib/OWS_1_1_0'; const OWS_1_1_0 = OWS_1_1_0_Factory.OWS_1_1_0;
import * as OWS_2_0_Factory from 'ogc-schemas/lib/OWS_2_0'; const OWS_2_0 = OWS_2_0_Factory.OWS_2_0;
import * as WPS_1_0_0_Factory from 'ogc-schemas/lib/WPS_1_0_0'; const WPS_1_0_0 = WPS_1_0_0_Factory.WPS_1_0_0;
import * as WPS_2_0_Factory from 'ogc-schemas/lib/WPS_2_0'; const WPS_2_0 = WPS_2_0_Factory.WPS_2_0;
import * as JsonixFactory from '@michaellangbein/jsonix'; const Jsonix = JsonixFactory.Jsonix;
import { WpsClient } from '../wpsclient';
import { FakeWpsServer } from './fake_wps_server';
import { WpsInput, WpsOutputDescription } from '../wps_datatypes';




describe(`Testing wps-client version 1.0.0 functionality`, () => {
  const fakeWpsServer = new FakeWpsServer();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient]
    });
  });


  it('testing marshalling/unmarshalling', () => {
    const xml = `
            <wps:StatusInfo xmlns:ows="http://www.opengis.net/ows/2.0"
                xmlns:wps="http://www.opengis.net/wps/2.0"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xsi:schemaLocation="http://www.opengis.net/wps/2.0 ../wps.xsd">
                <wps:JobID>FB6DD4B0-A2BB-11E3-A5E2-0800200C9A66</wps:JobID>
                <wps:Status>Dismissed</wps:Status>
            </wps:StatusInfo>
            `;

    const context = new Jsonix.Context([XLink_1_0, OWS_2_0, WPS_2_0]);
    const xmlunmarshaller = context.createUnmarshaller();
    const xmlmarshaller = context.createMarshaller();

    const json = xmlunmarshaller.unmarshalString(xml);
    const xmlRecreated = xmlmarshaller.marshalString(json);

    expect(xmlRecreated).toBeTruthy();
    // expect(xmlRecreated).toEqual(xml);
  });


  it('Wps-client should init correctly', () => {
    const httpClient = TestBed.inject(HttpClient);
    const cl = new WpsClient('1.0.0', httpClient);
    expect(cl).toBeTruthy();
  });


  it('get-capabilities should work', (done) => {
    const fakeHttpClient = TestBed.inject(HttpClient);
    const httpMockServer: HttpTestingController = TestBed.inject(HttpTestingController);

    const cl = new WpsClient('1.0.0', fakeHttpClient);
    const capas$ = cl.getCapabilities('testServer.com');
    capas$.subscribe(result => {
      expect(result).toBeTruthy();
      done();
    });

    const request = httpMockServer.expectOne(`testServer.com?service=WPS&request=GetCapabilities&version=1.0.0`);
    request.flush(fakeWpsServer.createGetCapabilitiesResponse('1.0.0'));
  });


  it('execute should work', (done) => {
    const fakeHttpClient = TestBed.inject(HttpClient);
    const httpMockServer: HttpTestingController = TestBed.inject(HttpTestingController);

    const inputs = [];

    const outputDescriptions = [];

    const c = new WpsClient('1.0.0', fakeHttpClient);
    const exec$ = c.execute('testServer.com', 'testProcess', inputs, outputDescriptions);

    exec$.subscribe(results => {
      results.map(r => expect(r.value).toBeTruthy());
      done();
    });

    const request = httpMockServer.expectOne(`testServer.com?service=WPS&request=Execute&version=1.0.0&identifier=testProcess`);
    request.flush(fakeWpsServer.createExecuteResponse('1.0.0'));
  });


  it('execute-async should work', (done) => {
    const fakeHttpClient = TestBed.inject(HttpClient);
    const httpMockServer: HttpTestingController = TestBed.inject(HttpTestingController);

    const inputs = [];

    const outputDescriptions = [];

    const c = new WpsClient('1.0.0', fakeHttpClient);

    const exec$ = c.executeAsync('testServer.com', 'testProcess', inputs, outputDescriptions);
    exec$.subscribe(results => {
      results.map(r => expect(r.value).toBeTruthy());
      done();
    });

    const request = httpMockServer.expectOne(`testServer.com?service=WPS&request=Execute&version=1.0.0&identifier=testProcess`);
    request.flush(fakeWpsServer.creaExecuteAsyncResponse('1.0.0'));

    const request2 = httpMockServer.expectOne(`http://rz-vm140.gfz-potsdam.de:80/wps/RetrieveResultServlet?id=7593c54d-8284-4074-be9d-31449487cbb6`);
    request2.flush(fakeWpsServer.creaExecuteAsyncResultResponse('1.0.0'));
  });

  it('describeProcess should work as expected', (done) => {
    const mockHttpClient = TestBed.inject(HttpClient);
    const wpsClient: WpsClient = new WpsClient('1.0.0', mockHttpClient);
    const httpMockServer: HttpTestingController = TestBed.inject(HttpTestingController);
    const fakeWpsServer = new FakeWpsServer();

    const url = 'server.com';
    const processId = 'processId';

    const request$ = wpsClient.describeProcess(url, processId);
    request$.subscribe(results => {
      expect(results).toBeTruthy();
      expect(results.inputs[0].description.id).toBeTruthy();
      done();
    });

    const testRequest = httpMockServer.expectOne(`${url}?service=WPS&request=DescribeProcess&version=1.0.0&Identifier=${processId}`);
    testRequest.flush(fakeWpsServer.createDescribeProcessResponse('1.0.0'));
  });
});




describe(`Testing wps-client version 2.0.0 functionality`, () => {
  const fakeWpsServer = new FakeWpsServer();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient]
    });
  });


  it('testing marshalling/unmarshalling', () => {
    const xml = `
            <wps:StatusInfo xmlns:ows="http://www.opengis.net/ows/2.0"
                xmlns:wps="http://www.opengis.net/wps/2.0"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xsi:schemaLocation="http://www.opengis.net/wps/2.0 ../wps.xsd">
                <wps:JobID>FB6DD4B0-A2BB-11E3-A5E2-0800200C9A66</wps:JobID>
                <wps:Status>Dismissed</wps:Status>
            </wps:StatusInfo>
            `;

    const context = new Jsonix.Context([XLink_1_0, OWS_2_0, WPS_2_0]);
    const xmlunmarshaller = context.createUnmarshaller();
    const xmlmarshaller = context.createMarshaller();

    const json = xmlunmarshaller.unmarshalString(xml);
    const xmlRecreated = xmlmarshaller.marshalString(json);

    expect(xmlRecreated).toBeTruthy();
    // expect(xmlRecreated).toEqual(xml);
  });


  it('Wps-client should init correctly', () => {
    const httpClient = TestBed.inject(HttpClient);
    const cl = new WpsClient('2.0.0', httpClient);
    expect(cl).toBeTruthy();
  });

  it('execute should work', (done) => {
    const fakeHttpClient = TestBed.inject(HttpClient);
    const httpMockServer: HttpTestingController = TestBed.inject(HttpTestingController);

    const inputs: WpsInput[] = [{
      description: {
        id: 'country',
        title: 'country',
        reference: false,
        type: 'literal',
        format: 'text/plain'
      },
      value: 'ecuador'
    }];

    const outputDescriptions: WpsOutputDescription[] = [{
      id: 'shakemap-output',
      reference: true,
      title: 'shakemap-output',
      type: 'complex',
      format: 'application/WMS',
    }];

    const c = new WpsClient('2.0.0', fakeHttpClient);
    const exec$ = c.execute('testServer.com', 'testProcess', inputs, outputDescriptions);

    exec$.subscribe(results => {
      results.map(r => expect(r.value).toBeTruthy());
      done();
    });

    const request = httpMockServer.expectOne(`testServer.com`);
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual(`<wps:Execute xmlns:wps="http://www.opengis.net/wps/2.0" service="WPS" version="2.0.0" mode="sync" response="document"><p0:Identifier xmlns:p0="http://www.opengis.net/ows/2.0">testProcess</p0:Identifier><wps:Input id="country"><wps:Data mimeType="text/plain">ecuador</wps:Data></wps:Input><wps:Output id="shakemap-output" transmission="reference" mimeType="application/WMS"/></wps:Execute>`);
    request.flush(fakeWpsServer.createExecuteResponse('2.0.0'));
  });

});

