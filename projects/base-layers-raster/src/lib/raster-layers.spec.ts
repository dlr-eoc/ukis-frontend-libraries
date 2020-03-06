import { async, TestBed } from '@angular/core/testing';

import { RasterLayer, WmtsLayer, WmsLayer } from '@dlr-eoc/services-layers';

import { OsmTileLayer, OpenSeaMap, EocLitemap, EocLitemapTile, EocLiteoverlayTile, EocBasemapTile, EocBaseoverlayTile, BlueMarbleTile, WorldReliefBwTile, HillshadeTile } from './raster-layers';

describe('BaseLayersRasterComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({})
      .compileComponents();
  }));

  beforeEach(() => { });

  it('osm should be instanceof of a UKIS RasterLayer', () => {
    const testLayer = new OsmTileLayer();
    expect(testLayer instanceof RasterLayer).toBeTruthy();
  });

  it('OpenSeaMap should be instanceof of a UKIS RasterLayer', () => {
    const testLayer = new OpenSeaMap();
    expect(testLayer instanceof RasterLayer).toBeTruthy();
  });

  it('EocLitemap should be instanceof of a UKIS WmsLayer', () => {
    const testLayer = new EocLitemap();
    expect(testLayer instanceof WmsLayer).toBeTruthy();
  });

  it('EocLitemapTile should be instanceof of a UKIS WmtsLayer', () => {
    const testLayer = new EocLitemapTile();
    expect(testLayer instanceof WmtsLayer).toBeTruthy();
  });

  it('EocLiteoverlayTile should be instanceof of a UKIS WmtsLayer', () => {
    const testLayer = new EocLiteoverlayTile();
    expect(testLayer instanceof WmtsLayer).toBeTruthy();
  });

  it('EocBasemapTile should be instanceof of a UKIS WmtsLayer', () => {
    const testLayer = new EocBasemapTile();
    expect(testLayer instanceof WmtsLayer).toBeTruthy();
  });

  it('EocBaseoverlayTile should be instanceof of a UKIS WmtsLayer', () => {
    const testLayer = new EocBaseoverlayTile();
    expect(testLayer instanceof WmtsLayer).toBeTruthy();
  });

  it('BlueMarbleTile should be instanceof of a UKIS WmtsLayer', () => {
    const testLayer = new BlueMarbleTile();
    expect(testLayer instanceof WmtsLayer).toBeTruthy();
  });

  it('WorldReliefBwTile should be instanceof of a UKIS WmtsLayer', () => {
    const testLayer = new WorldReliefBwTile();
    expect(testLayer instanceof WmtsLayer).toBeTruthy();
  });

  it('HillshadeTile should be instanceof of a UKIS WmtsLayer', () => {
    const testLayer = new HillshadeTile();
    expect(testLayer instanceof WmtsLayer).toBeTruthy();
  });
});
