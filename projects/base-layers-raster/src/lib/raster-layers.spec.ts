import { TestBed } from '@angular/core/testing';
import { RasterLayer } from '@ukis/services-layers';

import { osm } from './raster-layers';

describe('Base Layers', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('osm should be instanceof of a UKIS RasterLayer', () => {
    const testLayer: osm = new osm();
    expect(testLayer instanceof RasterLayer).toBeTruthy();
  });

});
