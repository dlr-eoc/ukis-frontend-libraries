import { TestBed } from '@angular/core/testing';

import { UtilStoreService } from './util-store.service';

describe('UtilStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UtilStoreService = TestBed.get(UtilStoreService);
    expect(service).toBeTruthy();
  });

  it('should set/get key, value in runtime store', () => {
    const service: UtilStoreService = TestBed.get(UtilStoreService);
    const value = { name: 'Sepp' };
    service.runtime('person', value)
    expect(service.runtime('person')).toBe(value)
  });
});

