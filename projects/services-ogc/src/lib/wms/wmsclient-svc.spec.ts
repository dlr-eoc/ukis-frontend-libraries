import { TestBed } from '@angular/core/testing';
import { WmsService } from './wmsclient-svc';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('WmsclientSvc', () => {
  let service: WmsService;

  beforeEach( async () => {
    await TestBed.configureTestingModule({ imports: [], providers: [provideHttpClient(withXhr(), withInterceptorsFromDi()), provideHttpClientTesting()] });
    service = TestBed.inject(WmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
