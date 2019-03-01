import { TestBed } from '@angular/core/testing';

import { WpsConfigurationService } from './wps-configuration.service';

describe('WpsConfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WpsConfigurationService = TestBed.get(WpsConfigurationService);
    expect(service).toBeTruthy();
  });
});
