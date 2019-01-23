import { TestBed } from '@angular/core/testing';

import { CookieAlertService } from './cookie-alert.service';

describe('CookieAlertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CookieAlertService = TestBed.get(CookieAlertService);
    expect(service).toBeTruthy();
  });
});
