import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { UtilStoreService } from './util-store';
import { MockLocalStorage } from '@dlr-eoc/shared-assets/testing';


vi.stubGlobal('localStorage', new MockLocalStorage()); // to use localStorage in window
// vi.stubGlobal('Storage', () => {}); // to test for typeof Storage in window

describe('UtilStore', () => {
  let service: UtilStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a runtime store', () => {
    expect(service.runtime).toBeTruthy();
  });

  it('should have a localStorage store', () => {
    expect(service.local).toBeTruthy();
  });

  it('shouldset/get key, value in localStorage', () => {
    const value = { name: 'Sepp' };
    service.local('person', value);
    expect(service.local('person')).toEqual(value);
  });

  it('should have a sessionStorage store', () => {
    expect(service.session).toBeTruthy();
  });

  it('should set/get key, value in runtime store', () => {
    const value = { name: 'Sepp' };
    service.runtime('person', value);
    expect(service.runtime('person')).toBe(value);
  });

  it('should clear the runtime store', () => {
    const value = { name: 'Sepp' };
    service.runtime('person', value);
    service.clearRuntime();
    expect(service.runtime('person')).toBeFalsy();
  });
});
