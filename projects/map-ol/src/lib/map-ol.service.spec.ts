import { TestBed } from '@angular/core/testing';

import { MapOlService } from './map-ol.service';

describe('MapOlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapOlService = TestBed.get(MapOlService);
    expect(service).toBeTruthy();
  });
});
