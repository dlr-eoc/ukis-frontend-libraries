import { TestBed } from '@angular/core/testing';

import { MapMaplibreService } from './map-maplibre.service';

describe('MapMaplibreService', () => {
  let service: MapMaplibreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapMaplibreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
