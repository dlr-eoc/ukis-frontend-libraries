import { HttpClient, HttpXhrBackend, XhrFactory } from '@angular/common/http';



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



describe('...', () => {

    const http = new TestHttpClient();
    const osServerUrl = 'https://geotest.eoc.dlr.de/catalogue/srv/en/portal.opensearch';

    it('...', (done) => {

        http.get(`${osServerUrl}`).subscribe(response => {
            console.log(response)
            done();
        });

    });


});
