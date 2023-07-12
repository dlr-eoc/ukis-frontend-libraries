import { TestBed } from '@angular/core/testing';

import { MapCesiumService } from './map-cesium.service';

describe('MapCesiumService', () => {
  let service: MapCesiumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapCesiumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
