import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { WpsVersion } from '@dlr-eoc/services-ogc/src/public-api';
import { WmsClient, WmsVersion } from '../wms.service';
import { FakeWmsServer } from './fake_wms_server';




describe('WmsService test-suite', () => {
  const fakeWmsServer = new FakeWmsServer();
  const versions: WmsVersion[] = ['1.1.0', '1.1.1', '1.3.0'];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient]
    });
  });

  for (const version of versions) {
    it(`Should properly parse GetCapabilities response for version ${version}`, (done) => {
      const fakeHttpClient = TestBed.inject(HttpClient);
      const httpMockServer: HttpTestingController = TestBed.inject(HttpTestingController);
      const wmsClient = new WmsClient(fakeHttpClient);

      const capabilities$ = wmsClient.getCapabilities('testServer.com', version);
      capabilities$.subscribe(capabilities => {
        expect(capabilities).toBeTruthy();

        const layer0 = wmsClient.getLayerFromCapabilities('nexrad-n0r-wmst', capabilities);
        expect(layer0.MetadataURL[0].OnlineResource).toEqual('https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?request=GetMetadata&layer=nexrad-n0r-wmst');

        // this property differs between WMS Versions!
        if (version === '1.3.0') {
          expect(layer0.BoundingBox[0].extent).toEqual([24, -126, 50, -66]);
        } else {
          expect(layer0.BoundingBox[0].extent).toEqual([-126, 24, -66, 50]);
        }

        const time = wmsClient.getTimeDimensionFromLayer(layer0);
        expect(time.name).toEqual('time');
        expect(time.units).toEqual('ISO8601');

        done();
      });

      const request = httpMockServer.expectOne(`testServer.com?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=${version}`);
      request.flush(fakeWmsServer.getCapabilities(version));
    });
  }


});
