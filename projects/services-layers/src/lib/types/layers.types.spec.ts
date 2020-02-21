import { TestBed, async } from '@angular/core/testing';
import { RasterLayer, Layer, VectorLayer, CustomLayer, TGeoExtent } from './Layers';
import { LayerGroup } from './LayerGroup';


let rasterlayer: RasterLayer, vectorlayer: VectorLayer, customlayer: CustomLayer;


describe('Layer Types', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({});
    rasterlayer = new RasterLayer({
      id: 'ID-raster',
      name: 'raster',
      type: 'wms',
      url: '//geoservice.dlr.de/eoc/basemap/wms',
      removable: true,
      visible: true,
      params: {
        layers: 'litemap'
      }
    });

    vectorlayer = new VectorLayer({
      id: 'ID-vector',
      name: 'vector',
      type: 'geojson',
      data: {},
      visible: false
    });

    customlayer = new CustomLayer({
      id: 'ID-custom',
      type: 'custom',
      name: 'custom',
      custom_layer: {}
    });
  }));

  it('should created a default Layer with options merged', () => {
    const id = 'ID-layer',
      type = 'xyz',
      name = 'layer',
      opacity = 0.5,
      bbox: TGeoExtent = [-180, -90, 180, 90];

    const layer = new Layer({
      id,
      type,
      name,
      opacity,
      bbox
    });

    /** mandatory */
    expect(layer.id).toBe(id);
    expect(layer.name).toBe(name);
    expect(layer.type).toBe(type);

    /** optional or defaults */
    expect(layer.opacity).toBe(opacity);
    expect(layer.visible).toBe(true);
    expect(layer.removable).toBe(false);
    expect(layer.filtertype).toBe('Layers');
    expect(layer.continuousWorld).toBe(false);

    expect(layer.attribution).toBe(undefined);
    expect(layer.displayName).toBe(undefined);
    expect(layer.description).toBe(undefined);
    expect(layer.time).toBe(undefined);
    expect(layer.minResolution).toBe(undefined);
    expect(layer.maxResolution).toBe(undefined);
    expect(layer.legendImg).toBe(undefined);
    expect(layer.bbox).toBe(bbox);
    expect(layer.dimensions).toBe(undefined);
    expect(layer.popup).toBe(undefined);
    expect(layer.actions).toBe(undefined);
    expect(layer.styles).toBe(undefined);
    expect(layer.crossOrigin).toBe(undefined);
  });


  it('should created a RasterLayer with options merged', () => {
    const id = 'ID-raster', name = 'raster',
      type = 'wms',
      url = '//geoservice.dlr.de/eoc/basemap/wms',
      removable = true,
      visible = true,
      params = {
        layers: 'litemap'
      };

    const newRasterlayer = new RasterLayer({
      id,
      name,
      type,
      url,
      removable,
      visible,
      params
    });

    /** mandatory */
    expect(newRasterlayer.id).toBe(id);
    expect(newRasterlayer.name).toBe(name);
    expect(newRasterlayer.type).toBe(type);

    /** optional or defaults */
    expect(newRasterlayer.opacity).toBe(1);
    expect(newRasterlayer.visible).toBe(visible);
    expect(newRasterlayer.removable).toBe(removable);
    expect(newRasterlayer.filtertype).toBe('Layers');
    expect(newRasterlayer.continuousWorld).toBe(false);

    expect(newRasterlayer.attribution).toBe(undefined);
    expect(newRasterlayer.displayName).toBe(undefined);
    expect(newRasterlayer.description).toBe(undefined);
    expect(newRasterlayer.time).toBe(undefined);
    expect(newRasterlayer.minResolution).toBe(undefined);
    expect(newRasterlayer.maxResolution).toBe(undefined);
    expect(newRasterlayer.legendImg).toBe(undefined);
    expect(newRasterlayer.bbox).toBe(undefined);
    expect(newRasterlayer.dimensions).toBe(undefined);
    expect(newRasterlayer.popup).toBe(undefined);
    expect(newRasterlayer.actions).toBe(undefined);
    expect(newRasterlayer.styles).toBe(undefined);
    expect(newRasterlayer.crossOrigin).toBe(undefined);

    /** raster specific */
    expect(newRasterlayer.url).toBe(url);
    expect(newRasterlayer.subdomains).toBe(undefined);
    expect(newRasterlayer.params).toBe(params);
    expect(newRasterlayer.tileSize).toBe(undefined);
  });


  it('should created a VectorLayer with options merged', () => {
    const id = 'ID-vector', name = 'vector',
      type = 'geojson',
      visible = true,
      data = { Feature: {} },
      cluster = true,
      options = { style: () => { } };



    const newRasterlayer = new VectorLayer({
      id,
      name,
      type,
      data,
      cluster,
      options
    });

    /** mandatory */
    expect(newRasterlayer.id).toBe(id);
    expect(newRasterlayer.name).toBe(name);
    expect(newRasterlayer.type).toBe(type);

    /** optional or defaults */
    expect(newRasterlayer.opacity).toBe(1);
    expect(newRasterlayer.visible).toBe(visible);
    expect(newRasterlayer.removable).toBe(false);
    expect(newRasterlayer.filtertype).toBe('Layers');
    expect(newRasterlayer.continuousWorld).toBe(false);

    expect(newRasterlayer.attribution).toBe(undefined);
    expect(newRasterlayer.displayName).toBe(undefined);
    expect(newRasterlayer.description).toBe(undefined);
    expect(newRasterlayer.time).toBe(undefined);
    expect(newRasterlayer.minResolution).toBe(undefined);
    expect(newRasterlayer.maxResolution).toBe(undefined);
    expect(newRasterlayer.legendImg).toBe(undefined);
    expect(newRasterlayer.bbox).toBe(undefined);
    expect(newRasterlayer.dimensions).toBe(undefined);
    expect(newRasterlayer.popup).toBe(undefined);
    expect(newRasterlayer.actions).toBe(undefined);
    expect(newRasterlayer.styles).toBe(undefined);
    expect(newRasterlayer.crossOrigin).toBe(undefined);

    /** vector specific */
    expect(newRasterlayer.data).toBe(data);
    expect(newRasterlayer.url).toBe(undefined);
    expect(newRasterlayer.subdomains).toBe(undefined);
    expect(newRasterlayer.options).toBe(options);
    expect(newRasterlayer.cluster).toBe(cluster);
  });


  it('should created a LayerGroup with options merged', () => {
    const id = 'ID-group', name = 'group',
      visible = true,
      filtertype = 'Overlays',
      layers = [rasterlayer, vectorlayer, customlayer];


    const newRasterlayer = new LayerGroup({
      id,
      visible, // set visible on each layer
      name,
      filtertype,
      layers
    });

    /** mandatory */
    expect(newRasterlayer.id).toBe(id);
    expect(newRasterlayer.name).toBe(name);
    expect(newRasterlayer.layers.length).toBe(layers.length);
    // is set by visible in options ---
    newRasterlayer.layers.forEach(l => {
      expect(l.visible).toBe(visible);
    });
    // also on object reference
    layers.forEach(l => {
      expect(l.visible).toBe(visible);
    });
    // ---------------------------------

    /** optional or defaults */
    expect(newRasterlayer.visible).toBe(visible);
    expect(newRasterlayer.removable).toBe(true);
    expect(newRasterlayer.layerRemovable).toBe(true);
    expect(newRasterlayer.filtertype).toBe(filtertype);

    expect(newRasterlayer.displayName).toBe(undefined);
    expect(newRasterlayer.description).toBe(undefined);
    expect(newRasterlayer.bbox).toBe(undefined);
    expect(newRasterlayer.actions).toBe(undefined);
  });
});
