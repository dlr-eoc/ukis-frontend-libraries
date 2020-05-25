import { TestBed } from '@angular/core/testing';

import { LargelayersService } from './largelayers.service';

describe('LargelayersService', () => {
  let service: LargelayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LargelayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
