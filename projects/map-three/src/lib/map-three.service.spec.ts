import { TestBed } from '@angular/core/testing';

import { MapThreeService } from './map-three.service';

describe('MapThreeService', () => {
  let service: MapThreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapThreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
