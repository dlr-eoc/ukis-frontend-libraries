import { TestBed } from '@angular/core/testing';
import { WpsClient } from './wpsclient-svc';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';

describe('WpsclientSvc', () => {
  let service: WpsClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [], providers: [provideHttpClient(withXhr(), withInterceptorsFromDi()), provideHttpClientTesting()] });
    service = TestBed.inject(WpsClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should parse getCapabilities', async () => {

    const http: HttpTestingController = TestBed.inject(HttpTestingController);
    const url = 'http://server/geoserver/ows';

    // 1. Trigger the request
    const promise = firstValueFrom(service.getCapabilities(url));

    const request = http.expectOne('http://server/geoserver/ows?service=WPS&request=GetCapabilities&version=1.0.0');
    request.flush(`
<wps:Capabilities xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" service="WPS" version="1.0.0" xml:lang="en-US" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsGetCapabilities_response.xsd" updateSequence="1">
            <ows:ServiceIdentification>
            </ows:ServiceIdentification>
            <ows:ServiceProvider>
            </ows:ServiceProvider>
            <ows:OperationsMetadata>
            </ows:OperationsMetadata>
            <wps:ProcessOfferings>
                <wps:Process wps:processVersion="1.0.0">
                    <ows:Identifier>org.n52.wps.server.algorithm.r.AnnotationValidation</ows:Identifier>
                    <ows:Title>R Annotation Validation</ows:Title>
                    <ows:Metadata xlink:role="Process description" xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=1.0.0&amp;identifier=org.n52.wps.server.algorithm.r.AnnotationValidation"/>
                </wps:Process>
                <wps:Process wps:processVersion="1.0.0">
                    <ows:Identifier>org.n52.gfz.riesgos.algorithm.impl.ShakemapTransformationProcess</ows:Identifier>
                    <ows:Title>ShakemapTransformationProcess</ows:Title>
                    <ows:Metadata xlink:role="Process description" xlink:href="http://rz-vm140.gfz-potsdam.de:80/wps/WebProcessingService?service=WPS&amp;request=DescribeProcess&amp;version=1.0.0&amp;identifier=org.n52.gfz.riesgos.algorithm.impl.ShakemapTransformationProcess"/>
                </wps:Process>
            </wps:ProcessOfferings>
            <wps:Languages>
            </wps:Languages>
        </wps:Capabilities>`);

    const capabilities = await promise;

    expect(capabilities).toBeTruthy();
    expect(capabilities.find(item => item.id === 'org.n52.wps.server.algorithm.r.AnnotationValidation')).toBeTruthy();
    expect(capabilities.find(item => item.id === 'org.n52.gfz.riesgos.algorithm.impl.ShakemapTransformationProcess')).toBeTruthy();
  });
});
