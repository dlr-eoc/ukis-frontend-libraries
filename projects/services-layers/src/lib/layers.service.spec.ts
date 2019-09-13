import { TestBed, async } from '@angular/core/testing';
import { RasterLayer, Layer } from './types/Layers';
import { LayerGroup } from './types/LayerGroup';
import { LayersService } from './layers.service';
import { first } from 'rxjs/operators';


let layer1: Layer, layer2: Layer, layergroup1: LayerGroup, layergroup2: LayerGroup, layer3: Layer, layer4: Layer;


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
      visible: true,
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
      visible: false,
      name: 'baslayer Group',
      filtertype: 'Overlays',
      id: 'baselayer_group',
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

  /**
   * logs - 'layer or Group with id: layer1 already exists!
   */
  it('should not add a layer if the id already exists!', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    service.addLayer(layer1, 'Layers');
    service.addLayer(layer1, 'Layers');
    expect(service.getLayersCount()).toEqual(1);
    // clean up
    service.removeLayer(layer1);
    expect(service.getLayersCount()).toEqual(0);
  }));

  it('should add a layer to BaseLayers', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    service.addLayer(layer1, 'Baselayers');
    expect(service.getBaseLayersCount()).toEqual(1);
    // clean up
    service.removeLayer(layer1);
    expect(service.getBaseLayersCount()).toEqual(0);
  }));

  it('should remove a layer from BaseLayers', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    service.addLayer(layer1, 'Baselayers');
    expect(service.getBaseLayersCount()).toEqual(1);

    service.removeLayer(layer1, 'Baselayers');
    expect(service.getBaseLayersCount()).toEqual(0);
  }));

  it('should remove a layer with its filtertype even it was set on add Layer', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    expect(layer1.filtertype).toEqual('Layers');
    service.addLayer(layer1, 'Overlays');
    expect(service.getOverlaysCount()).toEqual(1);

    expect(layer1.filtertype).toEqual('Overlays');
    service.removeLayer(layer1);
    expect(service.getOverlaysCount()).toEqual(0);
    expect(service.getLayerGroupsCount()).toEqual(0);
  }));

  it('should remove a layer by ID', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    service.addLayer(layer1, 'Overlays');
    expect(service.getOverlaysCount()).toEqual(1);
    service.removeLayer(layer1, 'Overlays');
    expect(service.getOverlaysCount()).toEqual(0);
  }));

  it('should add a layer to Layers', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    service.addLayer(layer1, 'Layers');
    expect(service.getLayersCount()).toEqual(1);
    // clean up
    service.removeLayer(layer1, layer1.filtertype);
    expect(service.getLayersCount()).toEqual(0);
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
    expect(service.getOverlaysCount()).toEqual(1);
    // clean up
    service.removeLayer(layer1, layer1.filtertype);
    expect(service.getOverlaysCount()).toEqual(0);
  }));

  it('should remove a layer from Overlays', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    service.addLayer(layer1, 'Overlays');
    expect(service.getOverlaysCount()).toEqual(1);

    service.removeLayer(layer1, 'Overlays');
    expect(service.getOverlaysCount()).toEqual(0);

    // clean up;
    service.setLayerGroups([]);
    expect(service.getLayerGroupsCount()).toEqual(0);
  }));

  it('should add a layer to a layerGroup', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    // layergroup1.filtertype = 'Layers';
    service.addLayerGroup(layergroup1, 'Layers');
    expect(service.getLayersCount()).toEqual(1);
    expect(service.getLayerGroupsCount()).toEqual(1);

    service.addLayerToGroup(layer2, layergroup1);
    expect(service.getLayersCount()).toEqual(2);
    // clean up
    service.removeLayerGroup(layergroup1);
    expect(service.getLayerGroupsCount()).toEqual(0);
    expect(service.getLayersCount()).toEqual(0);
  }));


  it('should add a layerGroup to Layers', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    // layergroup1.filtertype = 'Layers';
    service.addLayerGroup(layergroup1, 'Layers');
    expect(service.getLayersCount()).toEqual(1);
    expect(service.getLayerGroupsCount()).toEqual(1);
    // clean up
    service.removeLayerGroup(layergroup1);
    expect(service.getLayerGroupsCount()).toEqual(0);
    expect(service.getLayersCount()).toEqual(0);
  }));

  it('should add a layerGroup and replace its filtertype on itself and all layers', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    // layergroup1.filtertype = 'Layers';
    expect(layergroup1.filtertype).toEqual('Overlays');
    service.addLayerGroup(layergroup1, 'Layers');
    expect(service.getLayersCount()).toEqual(1);
    expect(service.getLayerGroupsCount()).toEqual(1);
    expect(layergroup1.filtertype).toEqual('Layers');
    // check if filtertype is replaced on all Layers
    layergroup1.layers.map(l => {
      expect(l.filtertype).toEqual('Layers');
    });
    // clean up
    service.removeLayerGroup(layergroup1);
    expect(service.getLayerGroupsCount()).toEqual(0);
    expect(service.getLayersCount()).toEqual(0);
    expect(service.getOverlaysCount()).toEqual(0);
  }));

  it('should remove a layerGroup by ID', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    layergroup1.id = 'removable_group';
    service.addLayerGroup(layergroup1, 'Overlays');
    service.removeLayerOrGroupById('removable_group');
    expect(service.getLayerGroupsCount()).toEqual(0);

    // clean up;
    service.setLayerGroups([]);
    expect(service.getLayerGroupsCount()).toEqual(0);
  }));

  // this creates - LOG: 'layerGroup: baselayer_group is not removable!'
  it('should not remove a non removable layerGroup', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    layergroup1.removable = false;
    service.addLayerGroup(layergroup1, 'Baselayers');
    service.removeLayerGroup(layergroup1);
    expect(service.getLayerGroupsCount()).toEqual(1);

    // clean up;
    service.setLayerGroups([]);
    expect(service.getLayerGroupsCount()).toEqual(0);
  }));

  it('should add a layerGroup to Overlays', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    // layergroup1.filtertype = 'Overlays';
    service.addLayerGroup(layergroup1, 'Overlays');
    expect(service.getOverlaysCount()).toEqual(1);
    expect(service.getLayerGroupsCount()).toEqual(1);
    // clean up
    service.removeLayerGroup(layergroup1);
    expect(service.getLayerGroupsCount()).toEqual(0);
    expect(service.getOverlaysCount()).toEqual(0);
  }));

  it('should remove a layer from a layerGroup but not the group', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    service.addLayerGroup(layergroup1, 'Overlays');
    expect(service.getLayerGroupsCount()).toEqual(1);
    expect(service.getOverlaysCount()).toEqual(1);
    // clean up
    service.removeLayerFromGroup(layer1, layergroup1, false);
    expect(service.getLayerGroupsCount()).toEqual(1);
    expect(service.getOverlaysCount()).toEqual(0);
  }));

  it('should remove a layer by Id from a layerGroup and the group if only one layer was on the group', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    service.addLayerGroup(layergroup1, 'Overlays');
    expect(service.getLayerGroupsCount()).toEqual(1);
    expect(service.getOverlaysCount()).toEqual(1);
    // clean up;
    service.removeLayerGroup(layergroup1);
    expect(service.getLayerGroupsCount()).toEqual(0);
    expect(service.getOverlaysCount()).toEqual(0);
  }));

  it('should remove multiple or all layers from the Overlays-Slot', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    service.addLayerGroup(layergroup1, 'Overlays');
    service.addLayer(layer2, 'Overlays');
    // Layer and LayerGroups Count -getLayerGroupsCount()
    expect(service.getLayerGroupsCount()).toEqual(2);
    expect(service.getOverlaysCount()).toEqual(2);
    // clean up;
    service.removeOverlays();
    expect(service.getLayerGroupsCount()).toEqual(0);
    expect(service.getOverlaysCount()).toEqual(0);
  }));

  it('should remove multiple or all layers from the Layers-Slot', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    [layer1, layer2, layer3].forEach(l => service.addLayer(l, 'Layers'));
    expect(service.getLayersCount()).toEqual(3);

    service.removeLayers((layer) => {
      return layer.id !== layer1.id;
    });
    expect(service.getLayersCount()).toEqual(1);


    // clean up;
    service.setLayerGroups([]);
    expect(service.getLayerGroupsCount()).toEqual(0);
  }));

  it('should remove multiple or all layers from the BaseLayers-Slot', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    [layer1, layer2, layer3].forEach(l => service.addLayer(l, 'Baselayers'))
    expect(service.getBaseLayersCount()).toEqual(3);
    // clean up;
    service.removeBaseLayers((layer) => {
      return layer.id !== layer1.id;
    });
    expect(service.getBaseLayersCount()).toEqual(1);


    // clean up;
    service.setLayerGroups([]);
    expect(service.getLayerGroupsCount()).toEqual(0);
  }));

  it('should replace all Layers and Groups in LayerGroups', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    const groups = [layergroup1, layer2, layergroup2];
    service.setLayerGroups(groups);
    expect(service.getLayerOrGroupById('baselayer_group')).toBeDefined();
    expect(service.getLayerOrGroupById('layer2')).toBeDefined();
    expect(service.getLayerOrGroupById('group2')).toBeDefined();

    // clean up;
    service.setLayerGroups([]);
    expect(service.getLayerGroupsCount()).toEqual(0);
  }));

  it('should get all LayerGroups', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    const groups = [layergroup1, layer2, layergroup2];
    service.setLayerGroups(groups);
    service.getLayerGroups().pipe(first()).subscribe(_groups => {
      expect(_groups.length).toEqual(3);

      // clean up;
      service.setLayerGroups([]);
      expect(service.getLayerGroupsCount()).toEqual(0);
    });
  }));

  it('should get all Overlays', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    service.addLayerGroup(layergroup2, 'Overlays');

    service.getOverlays().pipe(first()).subscribe(overlays => {
      expect(overlays.length).toEqual(2);

      // clean up;
      service.setLayerGroups([]);
      expect(service.getLayerGroupsCount()).toEqual(0);
    });
  }));

  it('should get all Layers', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    [layer1, layer2].map(l => service.addLayer(l, 'Layers'));

    service.getLayers().pipe(first()).subscribe(layers => {
      expect(layers.length).toEqual(2);

      // clean up;
      service.setLayerGroups([]);
      expect(service.getLayerGroupsCount()).toEqual(0);
    });
  }));

  it('should get all Baselayers', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    [layer1, layer2].map(l => service.addLayer(l, 'Baselayers'));

    service.getBaseLayers().pipe(first()).subscribe(baselayers => {
      expect(baselayers.length).toEqual(2);

      // clean up;
      service.setLayerGroups([]);
      expect(service.getLayerGroupsCount()).toEqual(0);
    });
  }));

  it('should update a Layer', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    service.addLayer(layer1, 'Layers');
    expect(layer1.visible).toEqual(true);
    layer1.visible = false;
    service.updateLayer(layer1, 'Layers');
    expect(service.getLayerById(layer1.id).visible).toEqual(false);

    // clean up;
    service.setLayerGroups([]);
    expect(service.getLayerGroupsCount()).toEqual(0);
  }));

  it('should update a LayerGroup', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    service.addLayerGroup(layergroup1, 'Overlays');
    expect(layergroup1.visible).toEqual(true);


    // clean up;
    service.setLayerGroups([]);
    expect(service.getLayerGroupsCount()).toEqual(0);
  }));

  // test for layer-control arrows up and down
  it('should move group or layer up and down in the array', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    // layer2 == 0, layer1 == 1, layer4 == 2 layer3 == 3
    const layers = [layer2, layergroup2, layer3];
    service.setLayerGroups(layers);

    // layer2 after layer1 and layer4
    service.setGroupLayerIndex(layer2, 'down');
    // layer4 before layer1
    service.setLayerIndexInGroup(layer4, 'up', layergroup2);
    service.getLayerGroups().pipe(first()).subscribe(groups => {
      const flatt = service.flattenDeepArray(groups);
      expect(flatt[0]).toBe(layer4);
      expect(flatt[1]).toBe(layer1);
      expect(flatt[2]).toBe(layer2);
      expect(flatt[3]).toBe(layer3);

      // clean up;
      service.setLayerGroups([]);
      expect(service.getLayerGroupsCount()).toEqual(0);
    });
  }));

  // test for layer-control drag and drop
  it('should set correct zIndex for groups or layers', async(() => {
    const service: LayersService = TestBed.get(LayersService);
    // layer2 == 0, layer1 == 1, layer4 == 2 layer3 == 3
    const layers = [layer2, layergroup2, layer3];
    service.setLayerGroups(layers);

    // layer2 after layer1 and layer4
    service.arrayMove(layers, 1, 0);
    service.setLayerGroups(layers);
    // layer4 before layer1
    service.arrayMove(layergroup2.layers, 1, 0);
    service.updateLayerGroup(layergroup2);
    service.getLayerGroups().pipe(first()).subscribe(groups => {
      const flatt = service.flattenDeepArray(groups);
      expect(flatt[0]).toBe(layer4);
      expect(flatt[1]).toBe(layer1);
      expect(flatt[2]).toBe(layer2);
      expect(flatt[3]).toBe(layer3);

      // clean up;
      service.setLayerGroups([]);
      expect(service.getLayerGroupsCount()).toEqual(0);
    });

  }));
});
