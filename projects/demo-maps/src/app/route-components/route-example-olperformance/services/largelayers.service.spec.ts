import { TestBed } from '@angular/core/testing';

import { LargeLayersService } from './largelayers.service';

describe('LargeLayersService', () => {
  let service: LargeLayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LargeLayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
