import { CswClient } from './cswclient';
import { CswCapabilitiesElement, CswDescribeRecordResponseElement, CswGetRecordByIdResponseElement, CswGetDomainResponseElement } from './cswdatatypes';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FakeCswServer } from './fakeCswServer';



describe('Testing CSW client', () => {
    let httpTestingController: HttpTestingController;
    let client: CswClient;
    const serviceUrl = 'https://catalog.data.gov/csw-all';
    const fakeCswServer = new FakeCswServer();

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CswClient],
            imports: [HttpClientTestingModule]
        });

        // We inject our service (which imports the HttpClient) and the Test Controller
        httpTestingController = TestBed.inject(HttpTestingController);
        client = TestBed.inject(CswClient);
    });

    afterEach(() => {
        httpTestingController.verify();
    });


    // it('testing GetCapabilities', (done) => {
    //     client.getCapabilities(serviceUrl).subscribe((result: CswCapabilitiesElement) => {
    //         expect(result).toBeTruthy();
    //         expect(result.value.operationsMetadata.operation[0]).toBeTruthy();
    //         done();
    //     });

    //     const req = httpTestingController.expectOne(serviceUrl + '?service=CSW&version=2.0.2&request=GetCapabilities');
    //     expect(req.request.method).toEqual('GET');
    //     req.flush(fakeCswServer.getCapabilities(req.request.body));
    // });

    it('testing DescribeRecord', (done) => {
        client.describeRecord(serviceUrl).subscribe((result: CswDescribeRecordResponseElement) => {
            expect(result).toBeTruthy();
            expect(result.value.schemaComponent[0].schemaLanguage).toBeTruthy();
            done();
        });

        const req = httpTestingController.expectOne(serviceUrl);
        expect(req.request.method).toEqual('POST');
        req.flush(fakeCswServer.describeRecord(req.request.body));
    });

    it('testing GetRecordById', (done) => {
        client.getRecordById(serviceUrl, [
            '351ae465-7427-4462-aa16-3ee0822c386d',
            'f470a3d5-f5cb-4209-93a6-c974f7d5a0a4'
        ]).subscribe((result: CswGetRecordByIdResponseElement) => {
            expect(result).toBeTruthy();
            expect(result.value.abstractRecord[0].value.identifier[0].name).toBeTruthy();
            done();
        });

        const req = httpTestingController.expectOne(serviceUrl);
        expect(req.request.method).toEqual('POST');
        req.flush(fakeCswServer.getRecordById(req.request.body));
    });


    // @TODO: it seems that getRecords('full') fails because there is no schema for 'DublinCode:URI'.
    // it('testing GetRecords', (done) => {
    //     const cqlString = "dc:title like '%ips%' and dct:abstract like '%pharetra%'";
    //     client.getRecords(serviceUrl, 1, 10, 'full', cqlString).subscribe((result) => {
    //         expect(result).toBeTruthy();
    //         expect(result.value.searchResults.abstractRecord[0].value.dcElement[0].value.content).toBeTruthy();
    //         done();
    //     });

    //     const req = httpTestingController.expectOne(serviceUrl);
    //     expect(req.request.method).toEqual('POST');
    //     req.flush(fakeCswServer.getRecordsFull(req.request.body));
    // });

    it('testing GetDomain', (done) => {
        client.getDomain(serviceUrl, 'title').subscribe((result: CswGetDomainResponseElement) => {
            expect(result).toBeTruthy();
            expect(result.value.domainValues[0].parameterName).toBeTruthy();
            done();
        });


        const req = httpTestingController.expectOne(serviceUrl);
        expect(req.request.method).toEqual('POST');
        req.flush(fakeCswServer.getDomain(req.request.body));
    });


});
