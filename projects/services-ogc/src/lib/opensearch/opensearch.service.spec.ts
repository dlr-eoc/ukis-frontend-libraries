import { OpensearchWrapperService } from "./opensearch.service";
import { OpenSearchService, OpenSearchUrl, OpenSearchResult } from 'opensearch-browser';
import { switchMap, map } from 'rxjs/operators';

/**
 * @TODO: these are not really unit tests.
 * They make actual http-requests; meaning they depend on external services.
 * Either create a dummy opensearch-server in js (lots of work)
 * or spin up a docker-container (but CI must support docker).
 */


// set this to true if you want to run tests on actual live backends.
// This makes only sense for development purposes. Deactivate this in any CI environment.
const runWithLifeBackend = false;


describe('opensearch API', () => {
    // 'https://catalog.dehub.dlr.de/opensearch/EOP:DLR:CODE-DE/description';
    // https://geotest.eoc.dlr.de/catalogue/srv/en/portal.opensearch
    const osServerUrl = 'https://catalog.dehub.dlr.de/opensearch/description.xml';

    if (runWithLifeBackend) {
        it('search should work as expected', (done) => {
            const osw = new OpensearchWrapperService();
            // step 1: parse description.xml for searchable urls
            osw.discover(osServerUrl).pipe(
                map((instance: OpenSearchService) => {
                    const urls = osw.getUrls(instance);
                    // step 2: select the url to search
                    return urls[3];
                }),
                switchMap((url: OpenSearchUrl) => {
                    // step 3: do the actual search. The possible search-parameters are described in the `URL` object.
                    const parameters = {
                        parentIdentifier: 'EOP:CODE-DE:S2_MSI_L1C',
                        startDate: '2020-06-01T00:00:00Z',
                        endDate: '2020-06-07T23:59:59Z',
                    };
                    return osw.search(url, parameters);
                })
            ).subscribe((results: OpenSearchResult | Response) => {
                expect(results).toBeTruthy();
                expect(results.records[0].properties.summary).toBeTruthy();
                done();
            });
        }, 3000);
    }


    it('parsing Url-Element should work as expected', () => {
        const osw = new OpensearchWrapperService();

        const urlString = `
        <Url indexOffset="1" pageOffset="1" rel="results" template="https://catalog.dehub.dlr.de/opensearch/request/?httpAccept=application/atom%2Bxml&amp;parentIdentifier={eo:parentIdentifier}&amp;query={searchTerms?}&amp;startRecord={startIndex?}&amp;startPage={startPage?}&amp;maximumRecords={count?}&amp;startDate={time:start?}&amp;endDate={time:end?}&amp;bbox={geo:box?}&amp;name={geo:name?}&amp;lat={geo:lat?}&amp;lon={geo:lon?}&amp;radius={geo:radius?}&amp;uid={geo:uid?}&amp;recordSchema={sru:recordSchema?}" type="application/atom+xml">
        <param:Parameter maxInclusive="50" minInclusive="0" name="maximumRecords" pattern="[0-9]+" value="{count}"/>
        <param:Parameter minInclusive="1" name="startRecord" pattern="[0-9]+" value="{startIndex}"/>
        <param:Parameter minInclusive="1" name="startPage" pattern="[0-9]+" value="{startPage}"/>
        <param:Parameter name="startDate" pattern="^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]+)?(Z|[\+\-][0-9]{2}:[0-9]{2})$" value="{time:start}"/>
        <param:Parameter name="endDate" pattern="^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]+)?(Z|[\+\-][0-9]{2}:[0-9]{2})$" value="{time:end}"/>
        <param:Parameter maxInclusive="90" minInclusive="-90" name="lat" value="{geo:lat}"/>
        <param:Parameter maxInclusive="180" minInclusive="-180" name="lon" value="{geo:lon}"/>
        <param:Parameter name="recordSchema" value="{sru:recordSchema}">
        <param:Option label="O&amp;M 1.1" value="om"/>
        <param:Option label="O&amp;M 1.0" value="om10"/>
        <param:Option label="server-choice" value="server-choice"/>
        </param:Parameter>
        <param:Parameter name="query" title="Textual search in the title, abstract or keyword section of the collection. Surround with double quotes for exact match." value="{searchTerms}"/>
        </Url>
        `;

        const osUrl: OpenSearchUrl = osw.stringToUrl(urlString);

        expect(osUrl).toBeTruthy();
        expect(osUrl.type).toEqual('application/atom+xml');
        expect(osUrl.relations).toEqual(['results']);
        expect(osUrl.getParameter('sru:recordSchema').name).toEqual('recordSchema');
    });


});
