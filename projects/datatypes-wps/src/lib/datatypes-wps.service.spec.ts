import { TestBed } from '@angular/core/testing';

import { DatatypesWpsService } from './datatypes-wps.service';

describe('DatatypesWpsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatatypesWpsService = TestBed.get(DatatypesWpsService);
    expect(service).toBeTruthy();
  });
});
