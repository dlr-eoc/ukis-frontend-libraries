import { TestBed } from '@angular/core/testing';
import { WpsClient } from './wpsclient';
import { HttpClient, HttpXhrBackend, XhrFactory, HttpRequest } from '@angular/common/http';
import { pollEveryUntil } from './utils/polling';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { tap, map } from 'rxjs/operators';
import { forkJoin, of, Observable } from 'rxjs';

class MyXhrFactory extends XhrFactory {
    build(): XMLHttpRequest {
        return new XMLHttpRequest();
    }
}

describe(`Testing wps-client version 1 functionality`, () => {

    const httpClient = new HttpClient(new HttpXhrBackend(new MyXhrFactory()));

    it('Wps-client should init correctly', () => {
        const c = new WpsClient('1.0.0', httpClient);
        expect(c).toBeTruthy();
    });

});



class PollableServer {

    private callCount = 0;

    constructor(private maxCallCount: number, private waitResponse: string, private finalResponse: string) {}

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
        xmlns:wps="http://www.opengis.net/wps/1.0.0"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:ows="http://www.opengis.net/ows/1.1"
        xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsExecute_response.xsd"
        serviceInstance="${serverUrl}?REQUEST=GetCapabilities&amp;SERVICE=WPS"
        xml:lang="en-US"
        service="WPS"
        version="1.0.0"
        statusLocation="${currentStateUrl}">
        <wps:Process wps:processVersion="1.0.0">
        <ows:Identifier>${pId}</ows:Identifier>
        </wps:Process>
        <wps:Status creationTime="2019-10-04T13:23:43.830Z">
        <wps:ProcessAccepted>Process Accepted</wps:ProcessAccepted>
        </wps:Status>
        </wps:ExecuteResponse>
        `;
    }

function createWaitResponse(serverUrl: string, pId: string): string {
    const currentStateUrl = `${serverUrl}?retrieveState`;
    return `
    <wps:ExecuteResponse
        xmlns:wps="http://www.opengis.net/wps/1.0.0"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:ows="http://www.opengis.net/ows/1.1"
        xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsExecute_response.xsd"
        serviceInstance="${serverUrl}?REQUEST=GetCapabilities&amp;SERVICE=WPS"
        xml:lang="en-US"
        service="WPS"
        version="1.0.0"
        statusLocation="${currentStateUrl}">
        <wps:Process wps:processVersion="1.0.0">
            <ows:Identifier>${pId}</ows:Identifier>
        </wps:Process>
        <wps:Status creationTime="2019-10-04T13:23:43.830Z">
            <wps:ProcessStarted percentCompleted="0"/>
        </wps:Status>
    </wps:ExecuteResponse>
    `;
}

function createSuccessResponse(serverUrl: string, pId: string, outputId: string): string {
    const currentStateUrl = `${serverUrl}?retrieveState`;
    const resultUrl = `${serverUrl}?retrieveResult`;
    return `
    <wps:ExecuteResponse
        xmlns:wps="http://www.opengis.net/wps/1.0.0"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:ows="http://www.opengis.net/ows/1.1"
        xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsExecute_response.xsd"
        serviceInstance="${serverUrl}?REQUEST=GetCapabilities&amp;SERVICE=WPS"
        xml:lang="en-US"
        service="WPS"
        version="1.0.0"
        statusLocation="${currentStateUrl}">
        <wps:Process wps:processVersion="1.0.0">
            <ows:Identifier>${pId}</ows:Identifier>
        </wps:Process>
        <wps:Status creationTime="2019-10-04T13:23:43.830Z">
            <wps:ProcessSucceeded>Process successful</wps:ProcessSucceeded>
        </wps:Status>
        <wps:ProcessOutputs>
            <wps:Output>
                <ows:Identifier>${outputId}</ows:Identifier>
                <wps:Reference
                    encoding="UTF-8" mimeType="text/xml"
                    href="${resultUrl}"/>
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

    it('#pollEveryUntil should work fine with multiple poll-requests', (done) => {
        const server = new PollableServer(2, 'ongoing...', 'finished!');

        const baseRequest$ = server.call();

        const polledRequest$ = pollEveryUntil(baseRequest$,
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

    it('#pollEveryUntil should handle multithreading', (done) => {
        // prepare basic requests
        const server1 = new PollableServer(2, 'srv1: ongoing...', 'srv1: finished!');
        const server2 = new PollableServer(1, 'srv2: ongoing...', 'srv2: finished!');
        const firstRequest$ = server1.call();
        const secondRequest$ = server2.call();

        // wrap requests in a poll
        const polledFirstRequest$ = pollEveryUntil(firstRequest$,
            (response) => response === 'srv1: finished!',
            (response) => console.log(`polling server 1. response: ${response} ...`),
            1000).pipe(
                tap((response) => console.log(`first request received ${response}`))
            );
        const polledSecondRequest$ = pollEveryUntil(secondRequest$,
            (response) => response  === 'srv2: finished!',
            (response) => console.log(`polling server 2. response: ${response} ...`),
            1200).pipe(
                tap((response) => console.log(`second request received ${response}`))
            );

        // execute polled requests in parallel
        forkJoin({
            first: polledFirstRequest$,
            second: polledSecondRequest$
        }).subscribe((responses) => {
            expect(responses.first  === 'srv1: finished!').toBeTruthy();
            expect(responses.second  === 'srv2: finished!').toBeTruthy();
            done();
        });

    }, 10000);

    it('#execAsync should work with multiple requests in parallel', (done) => {
        const mockHttpClient = TestBed.get(HttpClient);
        const wpsClient: WpsClient = new WpsClient('1.0.0', mockHttpClient, false);
        const httpMockServer: HttpTestingController = TestBed.get(HttpTestingController);

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

        forkJoin({
            p1: poll1$,
            p2: poll2$
        }).subscribe(r => {
            expect(r.p1).toBeTruthy();
            expect(r.p2).toBeTruthy();
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
