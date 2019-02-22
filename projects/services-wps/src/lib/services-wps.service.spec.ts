import { TestBed } from '@angular/core/testing';

import { ServicesWpsService } from './services-wps.service';

describe('ServicesWpsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicesWpsService = TestBed.get(ServicesWpsService);
    expect(service).toBeTruthy();
  });
});
