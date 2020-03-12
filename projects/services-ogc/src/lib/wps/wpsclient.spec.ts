import { TestBed } from '@angular/core/testing';
import { WpsClient } from './wpsclient';
import { HttpClient, HttpXhrBackend, XhrFactory, HttpRequest } from '@angular/common/http';
import { pollUntil } from './utils/polling';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { tap, map } from 'rxjs/operators';
import { forkJoin, of, Observable } from 'rxjs';
import * as XLink_1_0_Factory from 'w3c-schemas/lib/XLink_1_0'; const XLink_1_0 = XLink_1_0_Factory.XLink_1_0;
import * as OWS_1_1_0_Factory from 'ogc-schemas/lib/OWS_1_1_0'; const OWS_1_1_0 = OWS_1_1_0_Factory.OWS_1_1_0;
import * as OWS_2_0_Factory from 'ogc-schemas/lib/OWS_2_0'; const OWS_2_0 = OWS_2_0_Factory.OWS_2_0;
import * as WPS_1_0_0_Factory from 'ogc-schemas/lib/WPS_1_0_0'; const WPS_1_0_0 = WPS_1_0_0_Factory.WPS_1_0_0;
import * as WPS_2_0_Factory from 'ogc-schemas/lib/WPS_2_0'; const WPS_2_0 = WPS_2_0_Factory.WPS_2_0;
import { Jsonix } from '@boundlessgeo/jsonix';
import { WpsData, WpsDataDescription, WpsVerion, isWpsState } from './wps_datatypes';

class MyXhrFactory extends XhrFactory {
  build(): XMLHttpRequest {
    return new XMLHttpRequest();
  }
}


class PollableServer {

  private callCount = 0;

  constructor(private maxCallCount: number, private waitResponse: string, private finalResponse: string) { }

  public call(): Observable<string> {
    return of('1').pipe(
      map(_ => {
        console.log(`server queried. current call count: ${this.callCount}`);
        let out;
        if (this.callCount <= this.maxCallCount) {
          out = this.waitResponse;
        } else {
          out = this.finalResponse;
        }
        this.callCount += 1;
        return out;
      })
    );
  }
}

class FakeWpsServer {

  constructor(
    private network: HttpTestingController,
    private url: string) {
    const requests = this.network.match((req: HttpRequest<any>) => {
      return req.url === this.url;
    });

    this.handle(requests);
  }

  private handle(requests: TestRequest[]) {
    for (const request of requests) {
      // const requestType = this.getRequestType(request);
      // switch (requestType) {
      //     case 'Execute':
      //         this.acceptExecuteRequest(request);
      //         break;
      //     case 'Status':
      //         this.returnStatus(request);
      //         break;
      //     case 'GetResults':
      //         this.sendResults(request);
      //         break;
      // }
    }
  }

}




function createRequestAcceptedResponse(serverUrl: string, pId: string): string {
  const currentStateUrl = `${serverUrl}?retrieveState`;
  return `
    <wps:ExecuteResponse
        xmlns:wps='http://www.opengis.net/wps/1.0.0'
        xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'
        xmlns:ows='http://www.opengis.net/ows/1.1'
        xsi:schemaLocation='http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsExecute_response.xsd'
        serviceInstance='${serverUrl}?REQUEST=GetCapabilities&amp;SERVICE=WPS'
        xml:lang='en-US'
        service='WPS'
        version='1.0.0'
        statusLocation='${currentStateUrl}'>
        <wps:Process wps:processVersion='1.0.0'>
        <ows:Identifier>${pId}</ows:Identifier>
        </wps:Process>
        <wps:Status creationTime='2019-10-04T13:23:43.830Z'>
        <wps:ProcessAccepted>Process Accepted</wps:ProcessAccepted>
        </wps:Status>
        </wps:ExecuteResponse>
        `;
}

function createWaitResponse(serverUrl: string, pId: string): string {
  const currentStateUrl = `${serverUrl}?retrieveState`;
  return `
    <wps:ExecuteResponse
        xmlns:wps='http://www.opengis.net/wps/1.0.0'
        xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'
        xmlns:ows='http://www.opengis.net/ows/1.1'
        xsi:schemaLocation='http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsExecute_response.xsd'
        serviceInstance='${serverUrl}?REQUEST=GetCapabilities&amp;SERVICE=WPS'
        xml:lang='en-US'
        service='WPS'
        version='1.0.0'
        statusLocation='${currentStateUrl}'>
        <wps:Process wps:processVersion='1.0.0'>
            <ows:Identifier>${pId}</ows:Identifier>
        </wps:Process>
        <wps:Status creationTime='2019-10-04T13:23:43.830Z'>
            <wps:ProcessStarted percentCompleted='0'/>
        </wps:Status>
    </wps:ExecuteResponse>
    `;
}

function createSuccessResponse(serverUrl: string, pId: string, outputId: string): string {
  const currentStateUrl = `${serverUrl}?retrieveState`;
  const resultUrl = `${serverUrl}?retrieveResult`;
  return `
    <wps:ExecuteResponse
        xmlns:wps='http://www.opengis.net/wps/1.0.0'
        xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'
        xmlns:ows='http://www.opengis.net/ows/1.1'
        xsi:schemaLocation='http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsExecute_response.xsd'
        serviceInstance='${serverUrl}?REQUEST=GetCapabilities&amp;SERVICE=WPS'
        xml:lang='en-US'
        service='WPS'
        version='1.0.0'
        statusLocation='${currentStateUrl}'>
        <wps:Process wps:processVersion='1.0.0'>
            <ows:Identifier>${pId}</ows:Identifier>
        </wps:Process>
        <wps:Status creationTime='2019-10-04T13:23:43.830Z'>
            <wps:ProcessSucceeded>Process successful</wps:ProcessSucceeded>
        </wps:Status>
        <wps:ProcessOutputs>
            <wps:Output>
                <ows:Identifier>${outputId}</ows:Identifier>
                <wps:Reference
                    encoding='UTF-8' mimeType='text/xml'
                    href='${resultUrl}'/>
            </wps:Output>
        </wps:ProcessOutputs>
    </wps:ExecuteResponse>
`;
}


describe(`Testing polling funcitonality`, () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient]
    });
  });

  it('#pollUntil should work fine with multiple poll-requests', (done) => {
    const server = new PollableServer(2, 'ongoing...', 'finished!');

    const baseRequest$ = server.call();

    const polledRequest$ = pollUntil(baseRequest$,
      (response) => response === 'finished!',
      (response) => console.log(`polling server. response: ${response} ...`),
      1000).pipe(
        tap((response) => console.log(`request received ${response}`))
      );

    polledRequest$.subscribe(response => {
      expect(response === 'finished!').toBeTruthy();
      done();
    });


  }, 5000);

  it('#pollUntil should handle multithreading', (done) => {
    // prepare basic requests
    const server1 = new PollableServer(2, 'srv1: ongoing...', 'srv1: finished!');
    const server2 = new PollableServer(1, 'srv2: ongoing...', 'srv2: finished!');
    const firstRequest$ = server1.call();
    const secondRequest$ = server2.call();

    // wrap requests in a poll
    const polledFirstRequest$ = pollUntil(firstRequest$,
      (response) => response === 'srv1: finished!',
      (response) => console.log(`polling server 1. response: ${response} ...`),
      1000).pipe(
        tap((response) => console.log(`first request received ${response}`))
      );
    const polledSecondRequest$ = pollUntil(secondRequest$,
      (response) => response === 'srv2: finished!',
      (response) => console.log(`polling server 2. response: ${response} ...`),
      1200).pipe(
        tap((response) => console.log(`second request received ${response}`))
      );

    // execute polled requests in parallel
    forkJoin(
      polledFirstRequest$,
      polledSecondRequest$
    ).subscribe((responses) => {
      expect(responses[0] === 'srv1: finished!').toBeTruthy();
      expect(responses[1] === 'srv2: finished!').toBeTruthy();
      done();
    });

  }, 10000);

  it('#execAsync should work with multiple requests in parallel', (done) => {
    const mockHttpClient = TestBed.inject(HttpClient);
    const wpsClient: WpsClient = new WpsClient('1.0.0', mockHttpClient);
    const httpMockServer: HttpTestingController = TestBed.inject(HttpTestingController);

    const url1 = 'wpsserver1.com';
    const pId1 = 'p1';
    const inputs1 = [];
    const outputs1 = [];

    const url2 = 'wpsserver2.com';
    const pId2 = 'p2';
    const inputs2 = [];
    const outputs2 = [];

    const poll1$ = wpsClient.executeAsync(url1, pId1, inputs1, outputs1);
    const poll2$ = wpsClient.executeAsync(url2, pId2, inputs2, outputs2);

    forkJoin(
      poll1$,
      poll2$
    ).subscribe(r => {
      expect(r[0]).toBeTruthy();
      expect(r[1]).toBeTruthy();
      done();
    });

    const post1 = httpMockServer.expectOne(url1 + '?service=WPS&request=Execute&version=1.0.0&identifier=' + pId1);
    post1.flush(createRequestAcceptedResponse(url1, pId1));
    const get1 = httpMockServer.expectOne(url1 + '?retrieveState');
    get1.flush(createSuccessResponse(url1, pId1, 'outId1'));

    const post2 = httpMockServer.expectOne(url2 + '?service=WPS&request=Execute&version=1.0.0&identifier=' + pId2);
    post2.flush(createRequestAcceptedResponse(url2, pId2));
    const get2 = httpMockServer.expectOne(url2 + '?retrieveState');
    get2.flush(createSuccessResponse(url2, pId2, 'outId2'));

    httpMockServer.verify();

  }, 10000);
});

/**
 * Only set 'runTestsWithLiveServer' to true in your local testenvironment.
 * These tests are not useful for automatic testing, because they rely on the server to be up.
 */
const runTestsWithLiveServer = false;
if (runTestsWithLiveServer) {
  const versions: WpsVerion[] = ['1.0.0', '2.0.0'];
  for (const version of versions) {
    describe(`Testing wps-client version ${version} functionality`, () => {

      it('testing unmarshaller', () => {
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
        const json = xmlunmarshaller.unmarshalString(xml);
        console.log('unmarshalled json: ', json);
      });

      const httpClient = new HttpClient(new HttpXhrBackend(new MyXhrFactory()));

      it('Wps-client should init correctly', () => {
        const cl = new WpsClient(version, httpClient);
        expect(cl).toBeTruthy();
      });


      it('get-capabilities should work', (done) => {
        const server = 'http://geoprocessing.demo.52north.org/javaps/service';
        const cl = new WpsClient(version, httpClient);
        const capas$ = cl.getCapabilities(server);
        capas$.subscribe(result => {
          done();
        });
      }, 3000);



      const testserver = 'https://riesgos.52north.org/wps/WebProcessingService';
      const processId = 'org.n52.wps.python.algorithm.ShakemapProcess';

      const quakemlInput: WpsData = {
        description: {
          id: 'quakeml-input',
          reference: false,
          type: 'complex',
          format: 'application/vnd.geo+json'
        },
        value: { type: 'FeatureCollection', features: [{ type: 'Feature', geometry: { type: 'Point', coordinates: [-72.3123, -33.0559] }, properties: { preferredOriginID: '359112', preferredMagnitudeID: '359112', type: 'earthquake', 'description.text': 'stochastic', 'origin.publicID': '359112', 'origin.time.value': '69051-01-01T00:00:00.000000Z', 'origin.time.uncertainty': 'nan', 'origin.depth.value': '32.15805', 'origin.depth.uncertainty': 'nan', 'origin.creationInfo.value': 'GFZ', 'originUncertainty.horizontalUncertainty': 'nan', 'originUncertainty.minHorizontalUncertainty': 'nan', 'originUncertainty.maxHorizontalUncertainty': 'nan', 'originUncertainty.azimuthMaxHorizontalUncertainty': 'nan', 'magnitude.publicID': '359112', 'magnitude.mag.value': '7.05', 'magnitude.mag.uncertainty': 'nan', 'magnitude.type': 'MW', 'magnitude.creationInfo.value': 'GFZ', 'focalMechanism.publicID': '359112', 'focalMechanism.nodalPlanes.nodalPlane1.strike.value': '10.68754', 'focalMechanism.nodalPlanes.nodalPlane1.strike.uncertainty': 'nan', 'focalMechanism.nodalPlanes.nodalPlane1.dip.value': '16.93797', 'focalMechanism.nodalPlanes.nodalPlane1.dip.uncertainty': 'nan', 'focalMechanism.nodalPlanes.nodalPlane1.rake.value': '90.0', 'focalMechanism.nodalPlanes.nodalPlane1.rake.uncertainty': 'nan', 'focalMechanism.nodalPlanes.preferredPlane': 'nodalPlane1', popupContent: 'selected-rows' }, id: '359112' }] }
      };

      const shakemapOutput: WpsDataDescription = {
        id: 'shakemap-output',
        reference: false,
        type: 'complex',
        format: 'application/WMS',
      };

      const inputs: WpsData[] = [quakemlInput];
      const outputDescriptions: WpsDataDescription[] = [shakemapOutput];

      const c = new WpsClient(version, httpClient);

      it('execute should work', (done) => {
        const exec$ = c.execute(testserver, processId, inputs, outputDescriptions);

        exec$.subscribe(results => {
          console.log(results);
          results.map(r => expect(r.value).toBeTruthy());
          done();
        });
      }, 10000);


      it('execute-async should work', (done) => {
        const exec$ = c.executeAsync(testserver, processId, inputs, outputDescriptions);

        exec$.subscribe(results => {
          console.log(results);
          results.map(r => expect(r.value).toBeTruthy());
          done();
        });
      }, 10000);

      if (version === '2.0.0') {
        it('dismiss should work', (done) => {
          const exec$ = c.executeAsync(testserver, processId, inputs, outputDescriptions, 3000, (response) => {
            if (isWpsState(response)) {
              const jobId = response.jobID;
              c.dismiss(testserver, processId, jobId).subscribe(results => {
                console.log(results);
                done();
              });
            }
          });
          exec$.subscribe();
        }, 10000);
      }

      it('describe-process should work', (done) => {

      }, 10000);
    });
  }
}
