import { TestBed } from '@angular/core/testing';
import { RasterLayer } from '@ukis/services-layers';

import { osm, google_earth, google_maps, google_hybrid, esri_grey_canvas, esri_nav_charts, esri_ocean_imagery, esri_world_imagery, eoc_litemap, open_sea_map } from './raster-layers';

describe('Base Layers', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('osm should be instanceof of a UKIS RasterLayer', () => {
    const testLayer = new osm();
    expect(testLayer instanceof RasterLayer).toBeTruthy();
  });

  it('google_earth should be instanceof of a UKIS RasterLayer', () => {
    const testLayer = new google_earth();
    expect(testLayer instanceof RasterLayer).toBeTruthy();
  });

  it('google_maps should be instanceof of a UKIS RasterLayer', () => {
    const testLayer = new google_maps();
    expect(testLayer instanceof RasterLayer).toBeTruthy();
  });

  it('google_hybrid should be instanceof of a UKIS RasterLayer', () => {
    const testLayer = new google_hybrid();
    expect(testLayer instanceof RasterLayer).toBeTruthy();
  });

  it('esri_grey_canvas should be instanceof of a UKIS RasterLayer', () => {
    const testLayer = new esri_grey_canvas();
    expect(testLayer instanceof RasterLayer).toBeTruthy();
  });

  it('esri_nav_charts should be instanceof of a UKIS RasterLayer', () => {
    const testLayer = new esri_nav_charts();
    expect(testLayer instanceof RasterLayer).toBeTruthy();
  });

  it('esri_ocean_imagery should be instanceof of a UKIS RasterLayer', () => {
    const testLayer = new esri_ocean_imagery();
    expect(testLayer instanceof RasterLayer).toBeTruthy();
  });

  it('esri_world_imagery should be instanceof of a UKIS RasterLayer', () => {
    const testLayer = new esri_world_imagery();
    expect(testLayer instanceof RasterLayer).toBeTruthy();
  });

  it('eoc_litemap should be instanceof of a UKIS RasterLayer', () => {
    const testLayer = new eoc_litemap();
    expect(testLayer instanceof RasterLayer).toBeTruthy();
  });

  it('open_sea_map should be instanceof of a UKIS RasterLayer', () => {
    const testLayer = new open_sea_map();
    expect(testLayer instanceof RasterLayer).toBeTruthy();
  });

});
