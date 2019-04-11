import { TestBed } from '@angular/core/testing';

import { UtilStoreService } from './util-store.service';


describe('UtilStoreService', () => {

  let service: UtilStoreService;
  

  beforeEach(() => {service = new UtilStoreService() } );

  

  it('should set/get key, value in runtime store', () => {
    
    const value = { name: 'Sepp' };
    service.runtime('person', value)
    expect(service.runtime('person')).toBe(value)
  });
});

