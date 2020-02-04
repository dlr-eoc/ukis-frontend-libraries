import { TestBed } from '@angular/core/testing';

import { LicensesService } from './licenses.service';

describe('LicensesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LicensesService = TestBed.get(LicensesService);
    expect(service).toBeTruthy();
  });
});
