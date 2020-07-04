import { XhrFactory, HttpClient, HttpXhrBackend } from '@angular/common/http';
import { CswService } from './csw.service';
import { GetCapabilitiesType, CapabilitiesType, DescribeRecordType, DescribeRecordResponseType,
    GetRecordByIdType, GetRecordByIdResponseType, GetRecordsType, GetRecordsResponseType,
    GetDomainType, GetDomainResponseType } from '../types/typedefinitions/www.opengis.net/cat/csw/2.0.2';




class MyXhrFactory extends XhrFactory {
    build(): XMLHttpRequest {
        return new XMLHttpRequest();
    }
}

class TestHttpClient extends HttpClient {
    constructor() {
        super(new HttpXhrBackend(new MyXhrFactory()));
    }
}


fdescribe('Testing CSW client', () => {

    const http = new TestHttpClient();
    const client = new CswService(http);
    const serviceUrl = 'https://catalog.data.gov/csw-all';


    it('testing GetCapabilities', (done) => {
        const args: GetCapabilitiesType = {
            service: serviceUrl,
            AcceptVersions: {
                Version: ['2.0.2']
            }
        };
        client.getCapabilities(serviceUrl, args).subscribe((result: CapabilitiesType) => {
            expect(result).toBeTruthy();
            expect(result.OperationsMetadata.Operation).toBeTruthy();
            done();
        });
    });

    it('testing DescribeRecord', (done) => {
        const args: DescribeRecordType = {
            service: serviceUrl,
            version: '2.0.2',
        };
        client.describeRecord(serviceUrl, args).subscribe((result: DescribeRecordResponseType) => {
            expect(result).toBeTruthy();
            expect(result.SchemaComponent[0].schemaLanguage).toBeTruthy();
            done();
        });
    });

    it('testing GetRecordById', (done) => {
        const args: GetRecordByIdType = {
            Id: ['9e0ce87d-07b8-420c-a8aa-9de6104f61d6'],
            service: serviceUrl,
            version: '2.0.2',
        };
        client.getRecordById(serviceUrl, args).subscribe((result: GetRecordByIdResponseType) => {
            expect(result).toBeTruthy();
            expect(result.AbstractRecord[0].Record.AnyText).toBeTruthy();
            done();
        });
    });

    it('testing GetRecords', (done) => {
        const args: GetRecordsType = {
            service: serviceUrl,
            version: '2.0.2',
        };
        client.getRecords(serviceUrl, args).subscribe((result: GetRecordsResponseType) => {
            expect(result).toBeTruthy();
            expect(result.SearchResults.AbstractRecord[0].Record.AnyText).toBeTruthy();
            done();
        });
    });

    it('testing GetDomain', (done) => {
        const args: GetDomainType = {
            service: serviceUrl,
            version: '2.0.2',
            ParameterName: '',
            PropertyName: ''
        };
        client.getDomain(serviceUrl, args).subscribe((result: GetDomainResponseType) => {
            expect(result).toBeTruthy();
            expect(result.DomainValues[0].RangeOfValues).toBeTruthy();
            done();
        });
    });



});
