import { XhrFactory, HttpClient, HttpXhrBackend } from '@angular/common/http';
import { CswService } from './csw.service';
import cli from '@angular/cli';
import { CswCapabilities, CswDescribeRecordResponse } from './csw.types';



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
        client.getCapabilities(serviceUrl, '2.0.2').subscribe((result: CswCapabilities) => {
            expect(result).toBeTruthy();
            done();
        });
    });

    it('testing DescribeRecord', (done) => {
        client.describeRecord(serviceUrl, '2.0.2').subscribe((result: CswDescribeRecordResponse) => {
            expect(result).toBeTruthy();
            done();
        });
    });

    fit('testing GetRecordById', (done) => {
        client.getRecordById(serviceUrl, '2.0.2', '9e0ce87d-07b8-420c-a8aa-9de6104f61d6').subscribe((result) => {
            expect(result).toBeTruthy();
            done();
        });
    });

});
