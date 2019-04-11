import { TestBed } from '@angular/core/testing';
import { ServicesWps100Service } from './services-wps.service';
import { HttpTestingController } from '@angular/common/http/testing';

describe('ServicesWpsService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpTestingController ]
    });
  });

  it('should be created', () => {
    const service: ServicesWps100Service = TestBed.get(ServicesWps100Service);
    expect(service).toBeTruthy();
  });



  it('#getCapabilities should return an Observable<WPS_100_WPSCapabilitiesType>', () => {
    let wpsUrl = "http://geoprocessing.demo.52north.org:8080/wps/WebProcessingService";
    let service: ServicesWps100Service = TestBed.get(ServicesWps100Service);
    service.getCapabilities(wpsUrl).subscribe((data) => {
      console.log(data);
    });
  });


});
