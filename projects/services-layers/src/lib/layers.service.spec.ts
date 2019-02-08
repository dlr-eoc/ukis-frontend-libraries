import { TestBed, async } from '@angular/core/testing';
import { LayerGroup, RasterLayer } from '@ukis/datatypes-layers';
import { LayersService } from './layers.service';

describe('LayersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LayersService = TestBed.get(LayersService);
    expect(service).toBeTruthy();
  });

  it('should add a layer to BaseLayers', async(() => {
    const service: LayersService = TestBed.get(LayersService);

    let layer = new RasterLayer({
      name: 'test layer',
      type: 'wms',
      id: 'test_layer',
      url: '//geoservice.dlr.de/eoc/basemap/wms',
      params: {
        layers: 'litemap'
      }
    });

    service.addLayer(layer, 'Baselayers');

    service.getBaseLayers().subscribe((layers) => {
      expect(layers.length).toEqual(1)
    })
  }));

  it('should remove a layer from BaseLayers', async(() => {
    const service: LayersService = TestBed.get(LayersService);

    let layer = new RasterLayer({
      name: 'test layer',
      type: 'wms',
      id: 'test_layer',
      url: '//geoservice.dlr.de/eoc/basemap/wms',
      params: {
        layers: 'litemap'
      }
    });
    service.addLayer(layer, 'Baselayers');
    expect(service.getBaseLayersCount()).toEqual(1)

    service.removeLayer(layer, 'Baselayers')
    expect(service.getBaseLayersCount()).toEqual(0)
  }));

  it('should add a layer to Overlays', async(() => {
    const service: LayersService = TestBed.get(LayersService);

    let layer = new RasterLayer({
      name: 'test layer',
      type: 'wms',
      id: 'test_layer',
      url: '//geoservice.dlr.de/eoc/basemap/wms',
      params: {
        layers: 'litemap'
      }
    });

    service.addLayer(layer, 'Overlays');

    service.getOverlays().subscribe((layers) => {
      expect(layers.length).toEqual(1)
    })
  }));

  it('should remove a layer from Overlays', async(() => {
    const service: LayersService = TestBed.get(LayersService);

    let layer = new RasterLayer({
      name: 'test layer',
      type: 'wms',
      id: 'test_layer',
      url: '//geoservice.dlr.de/eoc/basemap/wms',
      params: {
        layers: 'litemap'
      }
    });
    service.addLayer(layer, 'Overlays');
    expect(service.getOverlaysCount()).toEqual(1)

    service.removeLayer(layer, 'Overlays')
    expect(service.getOverlaysCount()).toEqual(0)
  }));


  it('should add a layerGroup', async(() => {
    const service: LayersService = TestBed.get(LayersService);

    let layergroup = new LayerGroup({
      name: 'baslayer Group',
      //type: 'baselayers',
      id: 'baslayer_group',
      layers: []
    });

    service.addLayerGroup(layergroup)
    expect(service.getLayerGroupsCount()).toEqual(1)
  }));

  it('should remove a layerGroup by ID', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    let layergroup = new LayerGroup({
      name: 'removable Group',
      //type: 'Overlays',
      id: 'removable_group',
      layers: []
    });
    service.addLayerGroup(layergroup)
    expect(service.getLayerGroupsCount()).toEqual(1)
    service.removeLayerOrGroupById('removable_group')
    
    expect(service.getLayerGroupsCount()).toEqual(0)
  }));
});
