import { TestBed } from '@angular/core/testing';
import { UtilStoreService } from './util-store.service';


describe('UtilStoreService', () => {



  let service: UtilStoreService;
  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.inject(UtilStoreService); // new UtilStoreService();
  });

  it('should have a runtime store', () => {
    expect(service.runtime).toBeTruthy();
  });

  it('should have a localStorage store', () => {
    expect(service.local).toBeTruthy();
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

