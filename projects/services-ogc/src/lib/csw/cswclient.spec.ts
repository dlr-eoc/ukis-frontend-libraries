import { XhrFactory, HttpClient, HttpXhrBackend } from '@angular/common/http';
import { CswClient } from './cswclient';
import { CswCapabilitiesElement, CswDescribeRecordResponseElement, CswGetRecordByIdResponseElement } from './cswdatatypes';




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


describe('Testing CSW client', () => {

    const http = new TestHttpClient();
    const client = new CswClient(http);
    const serviceUrl = 'https://catalog.data.gov/csw-all';

    it('letting jsonix unmarshal some xml', () => {
        const xml = `
        <GetRecords service="CSW" version="2.0.2" maxRecords="5" startPosition="1" resultType="results" outputFormat="application/xml" outputSchema="http://www.opengis.net/cat/csw/2.0.2" xmlns="http://www.opengis.net/cat/csw/2.0.2" xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" xmlns:ogc="http://www.opengis.net/ogc" xmlns:ows="http://www.opengis.net/ows" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dct="http://purl.org/dc/terms/" xmlns:gml="http://www.opengis.net/gml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2
../../../csw/2.0.2/CSW-discovery.xsd">
    <Query typeNames="csw:Record">
        <ElementSetName typeNames="csw:Record">full</ElementSetName>
        <Constraint version="1.1.0">
            <Constraint>
                <CqlText>prop1!=10</CqlText>
            </Constraint>
        </Constraint>
    </Query>
</GetRecords>
        `;
        const unmarshalled = client.unmarshal(xml);
        console.log(unmarshalled);
        expect(unmarshalled).toBeTruthy();
    });


    it('testing GetCapabilities', (done) => {
        client.getCapabilities(serviceUrl).subscribe((result: CswCapabilitiesElement) => {
            expect(result).toBeTruthy();
            expect(result.value.operationsMetadata.operation[0]).toBeTruthy();
            done();
        });
    });

    it('testing DescribeRecord', (done) => {
        client.describeRecord(serviceUrl).subscribe((result: CswDescribeRecordResponseElement) => {
            expect(result).toBeTruthy();
            expect(result.value.schemaComponent[0].schemaLanguage).toBeTruthy();
            done();
        });
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
    });

    it('testing GetRecords', (done) => {
        const cqlString = "dc:title like '%ips%' and dct:abstract like '%pharetra%'";
        client.getRecords(serviceUrl, 1, 10, 'results', cqlString).subscribe((result) => {
            expect(result).toBeTruthy();
            expect(result.value.searchResults.abstractRecord[0].value.dcElement[0].value.content).toBeTruthy();
            done();
        });
    });

    // it('testing GetDomain', (done) => {
    //     client.getDomain(serviceUrl, args).subscribe((result: GetDomainResponseType) => {
    //         expect(result).toBeTruthy();
    //         expect(result.DomainValues[0].RangeOfValues).toBeTruthy();
    //         done();
    //     });
    // });



});
