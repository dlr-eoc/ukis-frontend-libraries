import { CswClient } from './cswclient';
import { CswCapabilitiesElement, CswDescribeRecordResponseElement, CswGetRecordByIdResponseElement, CswGetDomainResponseElement } from './cswdatatypes';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FakeDataGovCswServer, FakeGeotestCswServer } from './fakeCswServer';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';



describe('Testing CSW client geotest.eoc.dlr.de', () => {
    let httpTestingController: HttpTestingController;
    let client: CswClient;
    // CSW's often respond differently based on what record-schemas they implement. We've stored the responses of two real-world CSW's here:
    const serviceUrl = 'https://geotest.eoc.dlr.de/catalogue/srv/eng/csw';
    const fakeCswServer = new FakeGeotestCswServer();

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [],
            providers: [provideHttpClient(withXhr(), withInterceptorsFromDi()), provideHttpClientTesting()]
        });

        // We inject our service (which imports the HttpClient) and the Test Controller
        httpTestingController = TestBed.inject(HttpTestingController);
        client = TestBed.inject(CswClient);
    });

    afterEach(() => {
        httpTestingController.verify();
    });


    it(`${serviceUrl}: testing GetCapabilities`, async () => {
        const promise = firstValueFrom(client.getCapabilities(serviceUrl));

        const req = httpTestingController.expectOne(serviceUrl + '?service=CSW&version=2.0.2&request=GetCapabilities');
        expect(req.request.method).toEqual('GET');
        req.flush(fakeCswServer.getCapabilities());

        const result = await promise as any;

        expect(result).toBeTruthy();
        expect(result.value.operationsMetadata.operation[0]).toBeTruthy();
    });

    it(`${serviceUrl}: testing DescribeRecord`, async () => {
        const promise = firstValueFrom(client.describeRecord(serviceUrl));

        const req = httpTestingController.expectOne(serviceUrl);
        expect(req.request.method).toEqual('POST');
        req.flush(fakeCswServer.describeRecord());

        const result = await promise;

        expect(result).toBeTruthy();
        expect(result.value.schemaComponent[0].schemaLanguage).toBeTruthy();
    });

    it(`${serviceUrl}: testing GetRecordById`, async () => {
        const promise = firstValueFrom(client.getRecordById(serviceUrl, [
            '351ae465-7427-4462-aa16-3ee0822c386d',
            'f470a3d5-f5cb-4209-93a6-c974f7d5a0a4'
        ]));

        const req = httpTestingController.expectOne(serviceUrl);
        expect(req.request.method).toEqual('POST');
        req.flush(fakeCswServer.getRecordById());

        const result = await promise;
        expect(result).toBeTruthy();
        expect(result.value.abstractRecord[0].value.identifier[0].name).toBeTruthy();
    });

    it(`${serviceUrl}: testing GetRecords`, async () => {
        const cqlString = "dc:title like '%ips%' and dct:abstract like '%pharetra%'";
        const promise = firstValueFrom(client.getRecords(serviceUrl, 1, 10, 'full', cqlString));

        const req = httpTestingController.expectOne(serviceUrl);
        expect(req.request.method).toEqual('POST');
        req.flush(fakeCswServer.getRecordsFull());

        const result = await promise;

        expect(result).toBeTruthy();
        expect(result.value.searchResults.abstractRecord[0].value.dcElement[0].value.content).toBeTruthy();
    });

    it(`${serviceUrl}: testing GetDomain`, async () => {
        const promise = firstValueFrom(client.getDomain(serviceUrl, 'title'));

        const req = httpTestingController.expectOne(serviceUrl);
        expect(req.request.method).toEqual('POST');
        req.flush(fakeCswServer.getDomain());

        const result = await promise;

        expect(result).toBeTruthy();
        expect(result.value.domainValues[0].parameterName).toBeTruthy();
    });
});


describe('Testing CSW client catalog.data.gov', () => {
    let httpTestingController: HttpTestingController;
    let client: CswClient;
    // CSW's often respond differently based on what record-schemas they implement. We've stored the responses of two real-world CSW's here:
    const serviceUrl = 'https://catalog.data.gov/csw-all';
    const fakeCswServer = new FakeDataGovCswServer();

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [],
            providers: [provideHttpClient(withXhr(), withInterceptorsFromDi()), provideHttpClientTesting()]
        });

        // We inject our service (which imports the HttpClient) and the Test Controller
        httpTestingController = TestBed.inject(HttpTestingController);
        client = TestBed.inject(CswClient);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it(`${serviceUrl}: testing GetCapabilities`, async () => {
        const promise = firstValueFrom(client.getCapabilities(serviceUrl));

        const req = httpTestingController.expectOne(serviceUrl + '?service=CSW&version=2.0.2&request=GetCapabilities');
        expect(req.request.method).toEqual('GET');
        req.flush(fakeCswServer.getCapabilities());

        const result = await promise as any;

        expect(result).toBeTruthy();
        expect(result.value.operationsMetadata.operation[0]).toBeTruthy();
    });

    it(`${serviceUrl}: testing DescribeRecord`, async () => {
        const promise = firstValueFrom(client.describeRecord(serviceUrl));

        const req = httpTestingController.expectOne(serviceUrl);
        expect(req.request.method).toEqual('POST');
        req.flush(fakeCswServer.describeRecord());

        const result = await promise;

        expect(result).toBeTruthy();
        expect(result.value.schemaComponent[0].schemaLanguage).toBeTruthy();
    });

    it(`${serviceUrl}: testing GetRecordById`, async () => {
        const promise = firstValueFrom(client.getRecordById(serviceUrl, [
            '351ae465-7427-4462-aa16-3ee0822c386d',
            'f470a3d5-f5cb-4209-93a6-c974f7d5a0a4'
        ]));

        const req = httpTestingController.expectOne(serviceUrl);
        expect(req.request.method).toEqual('POST');
        req.flush(fakeCswServer.getRecordById());

        const result = await promise;
        expect(result).toBeTruthy();
        expect(result.value.abstractRecord[0].value.identifier[0].name).toBeTruthy();
    });

    it(`${serviceUrl}: testing GetRecords`, async () => {
        const cqlString = "dc:title like '%ips%' and dct:abstract like '%pharetra%'";
        const promise = firstValueFrom(client.getRecords(serviceUrl, 1, 10, 'full', cqlString));

        const req = httpTestingController.expectOne(serviceUrl);
        expect(req.request.method).toEqual('POST');
        req.flush(fakeCswServer.getRecordsFull());

        const result = await promise;

        expect(result).toBeTruthy();
        expect(result.value.searchResults.abstractRecord[0].value.dcElement[0].value.content).toBeTruthy();
    });

    it(`${serviceUrl}: testing GetDomain`, async () => {
        const promise = firstValueFrom(client.getDomain(serviceUrl, 'title'));

        const req = httpTestingController.expectOne(serviceUrl);
        expect(req.request.method).toEqual('POST');
        req.flush(fakeCswServer.getDomain());

        const result = await promise;

        expect(result).toBeTruthy();
        expect(result.value.domainValues[0].parameterName).toBeTruthy();
    });

});
