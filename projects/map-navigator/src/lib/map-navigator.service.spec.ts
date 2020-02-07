import { TestBed } from '@angular/core/testing';

import { MapNavigatorService } from './map-navigator.service';

describe('MapNavigatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapNavigatorService = TestBed.get(MapNavigatorService);
    expect(service).toBeTruthy();
  });
});
