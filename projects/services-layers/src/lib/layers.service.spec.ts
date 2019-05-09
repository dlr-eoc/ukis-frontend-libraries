import { TestBed, async } from '@angular/core/testing';
import { RasterLayer, Layer } from './types/Layers';
import { LayerGroup } from './types/LayerGroup';
import { LayersService } from './layers.service';
import { first } from 'rxjs/operators';


let layer1, layer2, layergroup1, layergroup2, layer3, layer4;


describe('LayersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
    // create test layers
    layer1 = new RasterLayer({
      name: 'test layer1',
      type: 'wms',
      id: 'layer1',
      url: '//geoservice.dlr.de/eoc/basemap/wms',
      removable: true,
      params: {
        layers: 'litemap'
      }
    });

    layer2 = new RasterLayer({
      name: 'test layer2',
      type: 'wms',
      id: 'layer2',
      url: '//geoservice.dlr.de/eoc/basemap/wms',
      removable: true,
      params: {
        layers: 'litemap'
      }
    });
    layergroup1 = new LayerGroup({
      name: 'baslayer Group',
      filtertype: 'Overlays',
      id: 'baslayer_group',
      layers: [layer1]
    });

    layer3 = new RasterLayer({
      name: 'test layer3',
      type: 'wms',
      id: 'layer3',
      url: '//geoservice.dlr.de/eoc/basemap/wms',
      removable: true,
      params: {
        layers: 'litemap'
      }
    });

    layer4 = new RasterLayer({
      name: 'test layer4',
      type: 'wms',
      id: 'layer4',
      url: '//geoservice.dlr.de/eoc/basemap/wms',
      removable: true,
      params: {
        layers: 'litemap'
      }
    });

    layergroup2 = new LayerGroup({
      name: 'Group 2',
      filtertype: 'Overlays',
      id: 'group2',
      layers: [layer1, layer4]
    });

  });



  it('should be created', () => {
    const service: LayersService = TestBed.get(LayersService);
    expect(service).toBeTruthy();
  });

  it('should add a layer to BaseLayers', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    service.addLayer(layer1, 'Baselayers');
    service.getBaseLayers().subscribe((layers) => {
      expect(layers.length).toEqual(1);
    });
  }));

  it('should remove a layer from BaseLayers', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    service.addLayer(layer1, 'Baselayers');
    expect(service.getBaseLayersCount()).toEqual(1);

    service.removeLayer(layer1, 'Baselayers');
    expect(service.getBaseLayersCount()).toEqual(0);
  }));

  it('should remove a layer by ID', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    service.addLayer(layer1, 'Overlays');
    service.removeLayer(layer1, 'Overlays');
    expect(service.getOverlaysCount()).toEqual(0);
  }));

  it('should add a layer to Layers', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    service.addLayer(layer1, 'Layers');

    service.getLayers().subscribe((layers) => {
      expect(layers.length).toEqual(1);
    });
  }));

  it('should remove a layer from Layers', async(() => {
    const service: LayersService = TestBed.get(LayersService);

    service.addLayer(layer1, 'Layers');
    expect(service.getLayersCount()).toEqual(1);

    service.removeLayer(layer1, 'Layers');
    expect(service.getLayersCount()).toEqual(0);
  }));

  it('should add a layer to Overlays', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    service.addLayer(layer1, 'Overlays');
    service.getOverlays().subscribe((layers) => {
      expect(layers.length).toEqual(1);
    });
  }));

  it('should remove a layer from Overlays', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    service.addLayer(layer1, 'Overlays');
    expect(service.getOverlaysCount()).toEqual(1);

    service.removeLayer(layer1, 'Overlays');
    expect(service.getOverlaysCount()).toEqual(0);
  }));


  it('should add a layerGroup to Layers', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    layergroup1.filtertype = 'Layers';
    service.addLayerGroup(layergroup1);
    expect(service.getLayersCount()).toEqual(1);
    expect(service.getLayerGroupsCount()).toEqual(1);
    // clean up
    service.removeLayerGroup(layergroup1);
    expect(service.getLayersCount()).toEqual(0);
  }));

  it('should remove a layerGroup by ID', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    layergroup1.id = 'removable_group';
    service.addLayerGroup(layergroup1);
    service.removeLayerOrGroupById('removable_group');
    expect(service.getLayerGroupsCount()).toEqual(0);
  }));

  it('should not remove a non removable layerGroup', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    layergroup1.removable = false;
    service.addLayerGroup(layergroup1);
    service.removeLayerGroup(layergroup1);
    expect(service.getLayerGroupsCount()).toEqual(1);
  }));

  it('should add a layerGroup to Overlays', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    layergroup1.filtertype = 'Overlays';
    service.addLayerGroup(layergroup1);
    expect(service.getOverlaysCount()).toEqual(1);
    expect(service.getLayerGroupsCount()).toEqual(1);
    // clean up
    service.removeLayerGroup(layergroup1);
    expect(service.getOverlaysCount()).toEqual(0);
  }));

  it('should remove a layer from a layerGroup', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    service.addLayerGroup(layergroup1);
    expect(service.getLayerGroupsCount()).toEqual(1);
    expect(service.getOverlaysCount()).toEqual(1);
    // clean up
    service.removeLayerFromGroup(layer1, layergroup1, false);
    expect(service.getLayerGroupsCount()).toEqual(1);
    expect(service.getOverlaysCount()).toEqual(0);
  }));

  it('should remove a layer by Id from a layerGroup', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    service.addLayerGroup(layergroup1);
    expect(service.getLayerGroupsCount()).toEqual(1);
    expect(service.getOverlaysCount()).toEqual(1);
    // clean up;
    service.removeLayerGroup(layergroup1);
    expect(service.getLayerGroupsCount()).toEqual(0);
    expect(service.getOverlaysCount()).toEqual(0);
  }));

  /** test for layer-control arrows up and down */
  it('should move group or layer up and down in the array', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    /** layer2 == 0, layer1 == 1, layer4 == 2 layer3 == 3  */
    const layers = [layer2, layergroup2, layer3];
    service.setLayerGroups(layers);

    /** layer2 after layer1 and layer4 */
    service.setGroupLayerIndex(layer2, 'down');
    /** layer4 before layer1 */
    service.setLayerIndexInGroup(layer4, 'up', layergroup2);
    service.getLayerGroups().pipe(first()).subscribe(groups => {
      const flatt = service.flattenDeepArray(groups);
      expect(flatt[0]).toBe(layer4);
      expect(flatt[1]).toBe(layer1);
      expect(flatt[2]).toBe(layer2);
      expect(flatt[3]).toBe(layer3);
    });
  }));

  /** test for layer-control drag and drop */
  it('should set correct zIndex for groups or layers', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    /** layer2 == 0, layer1 == 1, layer4 == 2 layer3 == 3  */
    const layers = [layer2, layergroup2, layer3];
    service.setLayerGroups(layers);

    /** layer2 after layer1 and layer4 */
    service.arrayMove(layers, 1, 0);
    service.setLayerGroups(layers);
    /** layer4 before layer1 */
    service.arrayMove(layergroup2.layers, 1, 0);
    service.updateLayerGroup(layergroup2);
    service.getLayerGroups().pipe(first()).subscribe(groups => {
      const flatt = service.flattenDeepArray(groups);
      expect(flatt[0]).toBe(layer4);
      expect(flatt[1]).toBe(layer1);
      expect(flatt[2]).toBe(layer2);
      expect(flatt[3]).toBe(layer3);
    });

  }));
});
