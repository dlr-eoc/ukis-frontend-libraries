import { TestBed } from '@angular/core/testing';

import { DemoProcessService } from './demo-process.service';

describe('DemoProcessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DemoProcessService = TestBed.get(DemoProcessService);
    expect(service).toBeTruthy();
  });
});
