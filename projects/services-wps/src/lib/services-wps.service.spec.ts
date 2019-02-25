import { TestBed } from '@angular/core/testing';
import { ServicesWpsService } from './services-wps.service';
import { HttpTestingController } from '@angular/common/http/testing';

describe('ServicesWpsService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpTestingController ]
    });
  });

  it('should be created', () => {
    const service: ServicesWpsService = TestBed.get(ServicesWpsService);
    expect(service).toBeTruthy();
  });



  it('#getCapabilities should return an Observable<IWpsCapabilites>', () => {
    let wpsUrl = "http://geoprocessing.demo.52north.org:8080/wps/WebProcessingService";
    let service: ServicesWpsService = TestBed.get(ServicesWpsService);
    service.getCapabilities(wpsUrl).subscribe((data) => {
      console.log(data);
    });
  });

});
