import { OpensearchWrapperService } from "./opensearch.service";




fdescribe('opensearch API', () => {

    it('search should function as expected', (done) => {

        const oss = new OpensearchWrapperService();
        const osServerUrl = 'https://geotest.eoc.dlr.de/catalogue/srv/en/portal.opensearch';
        oss.search(osServerUrl, {
            searchTerms: 'landsat'
        }).subscribe((results) => {
            console.log(results);
            expect(results).toBeTruthy();
            expect(results.length > 0).toBeTrue();
            done();
        });


    });


});
