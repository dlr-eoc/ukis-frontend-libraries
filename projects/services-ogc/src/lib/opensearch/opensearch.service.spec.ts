import { OpensearchWrapperService, SearchResult } from "./opensearch.service";

/**
 * @TODO: these are not really unit tests.
 * They make actual http-requests; meaning they depend on external services.
 * Either create a dummy opensearch-server in js (lots of work)
 * or spin up a docker-container (but CI must support docker).
 */


describe('opensearch API', () => {
    const osServerUrl = 'https://geotest.eoc.dlr.de/catalogue/srv/en/portal.opensearch';

    it('search should work as expected', (done) => {

        const oss = new OpensearchWrapperService();
        oss.search(osServerUrl, {
            searchTerms: 'landsat'
        }).subscribe((results: SearchResult) => {
            console.log(results);
            expect(results).toBeTruthy();
            expect(results.records.length > 0).toBeTrue();
            done();
        });

    });


    it('getDescription should work as expected', (done) => {
        const oss = new OpensearchWrapperService();
        oss.getDescription(osServerUrl).subscribe(description => {
            console.log(description);
            expect(description).toBeTruthy();
            done();
        });
    });

});
