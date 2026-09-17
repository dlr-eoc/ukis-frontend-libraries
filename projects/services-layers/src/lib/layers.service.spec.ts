import { TestBed } from '@angular/core/testing';
import { RasterLayer, Layer, CustomLayer, TGeoExtent, VectorLayer } from './types/Layers';
import { WmsLayer, WmtsLayer } from './types/RasterLayers';
import { LayerGroup } from './types/LayerGroup';
import { LayersService } from './layers.service';
import { first } from 'rxjs/operators';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import testData1 from '@dlr-eoc/shared-assets/geojson/testData1.json';
import testData2 from '@dlr-eoc/shared-assets/geojson/testData2.json';


let layer1: Layer,
  layer2: Layer,
  layergroup1: LayerGroup,
  layergroup2: LayerGroup,
  layer3: Layer,
  layer4: Layer,
  layer5: CustomLayer,
  layergroup3: LayerGroup,
  layer6: WmsLayer,
  layer7: WmtsLayer,
  layer8: VectorLayer;



describe('LayersService', () => {
  let service: LayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayersService);
  });

  beforeEach(async () => {
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
      name: 'baselayer Group',
      filtertype: 'Overlays',
      id: 'layergroup1',
      layers: []
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
      id: 'layergroup2',
      layers: []
    });


    layer5 = new CustomLayer({
      id: 'ID-vector-image',
      name: 'Custom Layer KML',
      type: 'custom',
      custom_layer: new Object({ ol_uid: 245 }),
      visible: false
    });

    layergroup3 = new LayerGroup({
      visible: true,
      name: 'Group 3',
      filtertype: 'Layers',
      id: 'group3',
      layers: []
    });

    layer6 = new WmsLayer({
      name: 'test layer6',
      type: 'wms',
      id: 'layer6',
      url: '//geoservice.dlr.de/eoc/basemap/wms',
      removable: true,
      params: {
        LAYERS: 'litemap'
      }
    });

    layer7 = new WmtsLayer({
      name: 'test layer7',
      type: 'wmts',
      id: 'layer7',
      url: 'https://tiles.geoservice.dlr.de/service/wmts',
      removable: true,
      params: {
        layer: 'eoc:world_relief_bw',
        style: '_empty',
        matrixSetOptions: {
          matrixSet: 'EPSG:3857',
          tileMatrixPrefix: 'EPSG:3857'
        }
      }
    });

    layer8 = new VectorLayer({
      name: 'test layer8',
      type: 'geojson',
      id: 'layer8',
      data: testData1
    });

    service.setLayerGroups([]);
    await firstValueFrom(service.getLayerGroups())
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update a Subject', async () => {
    const subject1 = new BehaviorSubject([layer5]);
    const testVal1 = await firstValueFrom(subject1.asObservable());
    expect(testVal1[0]).toBe(layer5);

    const newLayer = new CustomLayer({
      id: 'ID-vector-image',
      name: 'Custom Layer KML',
      type: 'custom',
      custom_layer: new Object({ ol_uid: 600 }),
      visible: true
    });

    subject1.next([newLayer]);
    const testVal = await firstValueFrom(subject1.asObservable());
    expect(testVal[0]).toBe(newLayer);
  });

  /**
   * logs - 'layer or Group with id: layer1 already exists!
   */
  it('should not add a layer if the id already exists!', async () => {
    service.addLayer(layer1, 'Layers');
    await firstValueFrom(service.getLayers());
    expect(service.getLayersCount()).toEqual(1);
  });

  it('should add a layer to BaseLayers', async () => {
    service.addLayer(layer1, 'Baselayers');
    await firstValueFrom(service.getLayers());
    expect(service.getBaseLayersCount()).toEqual(1);
  });

  it('should remove a layer from BaseLayers', async () => {
    service.addLayer(layer1, 'Baselayers');
    service.addLayer(layer2, 'Baselayers');
    await firstValueFrom(service.getLayers());
    expect(service.getBaseLayersCount()).toEqual(2);

    service.removeLayer(layer1, 'Baselayers');
    await firstValueFrom(service.getLayers());
    expect(service.getBaseLayersCount()).toEqual(1);
  });


  it('should set the filtertype on a layer by adding it to the store', async () => {
    service.addLayer(layer1, 'Overlays');
    await firstValueFrom(service.getLayers());

    const layer1FromStore = service.getLayerById('layer1');
    expect(layer1FromStore).toBeTruthy();
    expect(layer1FromStore && layer1FromStore.filtertype).toEqual('Overlays');
  });

  it('should remove a layer and use its filtertype', async () => {
    expect(layer1.filtertype).toEqual('Layers');
    service.addLayer(layer1, 'Overlays');
    await firstValueFrom(service.getLayers());
    expect(service.getOverlaysCount()).toEqual(1);

    expect(layer1.filtertype).toEqual('Overlays');
    service.removeLayer(layer1);
    await firstValueFrom(service.getLayers());
    expect(service.getOverlaysCount()).toEqual(0);
    expect(service.getLayerGroupsCount()).toEqual(0);
  });

  it('should remove a layer by ID', async () => {
    service.addLayer(layer1, 'Overlays');
    await firstValueFrom(service.getLayers());
    expect(service.getOverlaysCount()).toEqual(1);
    service.removeLayerOrGroupById('layer1');
    await firstValueFrom(service.getLayerGroups());
    expect(service.getOverlaysCount()).toEqual(0);
  });

  it('should add a layer to Layers', async () => {
    service.addLayer(layer1, 'Layers');
    await firstValueFrom(service.getLayers());
    expect(service.getLayersCount()).toEqual(1);
  });

  it('should remove a layer from Layers', async () => {
    service.addLayer(layer1, 'Layers');
    await firstValueFrom(service.getLayers());
    expect(service.getLayersCount()).toEqual(1);

    service.removeLayer(layer1, 'Layers');
    await firstValueFrom(service.getLayers());
    expect(service.getLayersCount()).toEqual(0);
  });

  it('should add/remove a layer to Overlays', async () => {
    service.addLayer(layer1, 'Overlays');
    await firstValueFrom(service.getLayers());
    expect(service.getOverlaysCount()).toEqual(1);

    service.removeLayer(layer1, 'Overlays');
    await firstValueFrom(service.getLayers());
    expect(service.getOverlaysCount()).toEqual(0);
  });

  it('should add a layer to a layerGroup', async () => {
    layergroup1.layers.push(layer1);
    service.addLayerGroup(layergroup1, 'Layers');
    await firstValueFrom(service.getLayerGroups());
    expect(service.getLayersCount()).toEqual(1);
    expect(service.getLayerGroupsCount()).toEqual(1);

    service.addLayerToGroup(layer2, layergroup1);
    await firstValueFrom(service.getLayerGroups());
    expect(service.getLayersCount()).toEqual(2);
  });


  it('should add a layerGroup to Layers', async () => {
    layergroup1.layers.push(layer1);
    service.addLayerGroup(layergroup1, 'Layers');
    await firstValueFrom(service.getLayerGroups());
    expect(service.getLayersCount()).toEqual(1);
    expect(service.getLayerGroupsCount()).toEqual(1);
  });

  it('should add a layerGroup and replace its filtertype on itself and all layers', async () => {
    layergroup1.layers.push(layer1);
    expect(layer1.filtertype).toEqual('Layers');
    expect(layergroup1.filtertype).toEqual('Overlays');
    const replaceFiltertype = 'Baselayers';

    service.addLayerGroup(layergroup1, replaceFiltertype);
    await firstValueFrom(service.getLayerGroups());
    expect(service.getBaseLayersCount()).toEqual(1);
    expect(service.getLayerGroupsCount()).toEqual(1);
    expect(layergroup1.filtertype).toEqual(replaceFiltertype);
    // check if filtertype is replaced on all Layers
    layergroup1.layers.map(l => {
      expect(l.filtertype).toEqual(replaceFiltertype);
    });
  });

  it('should remove a layerGroup by ID', async () => {
    layergroup1.id = 'removable_group';
    layergroup1.layers.push(layer1);
    service.addLayerGroup(layergroup1, 'Overlays');
    service.removeLayerOrGroupById('removable_group');
    await firstValueFrom(service.getLayerGroups());
    expect(service.getLayerGroupsCount()).toEqual(0);
  });

  // this creates - LOG: 'layerGroup: layergroup1 is not removable!'
  it('should not remove a non removable layer', async () => {
    layer1.removable = false;
    service.addLayer(layer1, 'Baselayers');
    service.removeLayer(layer1);
    await firstValueFrom(service.getLayerGroups());
    expect(service.getLayerGroupsCount()).toEqual(1);
  });

  // this creates - LOG: 'layer: layer1 is removed with force!'
  it('should remove a non removable layer with force', async () => {
    layer1.removable = false;
    service.addLayer(layer1, 'Baselayers');
    service.removeLayer(layer1, layer1.filtertype, true);
    await firstValueFrom(service.getLayerGroups());
    expect(service.getLayerGroupsCount()).toEqual(0);
  });

  // this creates - LOG: 'layerGroup: layergroup1 is not removable!'
  it('should not remove a non removable layerGroup', async () => {
    layergroup1.layers.push(layer1);
    layergroup1.removable = false;
    service.addLayerGroup(layergroup1, 'Baselayers');
    service.removeLayerGroup(layergroup1);
    await firstValueFrom(service.getLayerGroups());
    expect(service.getLayerGroupsCount()).toEqual(1);
  });

  // this creates - LOG: 'layerGroup: layergroup1 is not removable!'
  it('should remove a non removable layerGroup with force', async () => {
    layergroup1.layers.push(layer1);
    layergroup1.removable = false;
    service.addLayerGroup(layergroup1, 'Baselayers');
    service.removeLayerGroup(layergroup1, true);
    await firstValueFrom(service.getLayerGroups());
    expect(service.getLayerGroupsCount()).toEqual(0);
  });

  it('should add a layerGroup to Overlays', async () => {
    layergroup1.layers.push(layer1);
    service.addLayerGroup(layergroup1, 'Overlays');
    await firstValueFrom(service.getLayerGroups());
    expect(service.getOverlaysCount()).toEqual(1);
    expect(service.getLayerGroupsCount()).toEqual(1);
  });

  it('should remove a layer from a layerGroup but not the group', async () => {
    layergroup1.layers.push(layer1);
    // layergroup1.removable = false;
    service.addLayerGroup(layergroup1, 'Overlays');
    await firstValueFrom(service.getLayerGroups());
    expect(service.getLayerGroupsCount()).toEqual(1);
    expect(service.getOverlaysCount()).toEqual(1);

    service.removeLayerFromGroup(layer1, layergroup1, false);
    await firstValueFrom(service.getLayerGroups());
    expect(service.getLayerGroupsCount()).toEqual(1);
    expect(service.getOverlaysCount()).toEqual(0);
  });

  it('should remove a layer by Id from a layerGroup and the group if only one layer was on the group', async () => {
    layergroup1.layers.push(layer1);
    layergroup1.removable = true;
    service.addLayerGroup(layergroup1, 'Overlays');
    await firstValueFrom(service.getLayerGroups());
    expect(service.getLayerGroupsCount()).toEqual(1);
    expect(service.getOverlaysCount()).toEqual(1);

    service.removeLayerOrGroupById('layer1');
    await firstValueFrom(service.getLayerGroups());
    expect(service.getLayerGroupsCount()).toEqual(0);
    expect(service.getOverlaysCount()).toEqual(0);
  });

  it('should remove multiple or all layers from the Overlays-Slot', async () => {
    layergroup1.layers = [layer1, layer3];
    service.addLayerGroup(layergroup1, 'Overlays');
    service.addLayer(layer2, 'Overlays');
    await firstValueFrom(service.getLayerGroups());
    // Layer and LayerGroups Count -getLayerGroupsCount()
    expect(service.getLayerGroupsCount()).toEqual(2);
    expect(service.getOverlaysCount()).toEqual(3);

    service.removeOverlays();
    await firstValueFrom(service.getLayerGroups());
    expect(service.getLayerGroupsCount()).toEqual(0);
    expect(service.getOverlaysCount()).toEqual(0);
  });

  it('should remove multiple or all layers from the Layers-Slot with a filter', async () => {
    [layer1, layer2, layer3].forEach(l => service.addLayer(l, 'Layers'));
    await firstValueFrom(service.getLayers());
    expect(service.getLayersCount()).toEqual(3);

    service.removeLayers((layer) => {
      return layer.id !== layer1.id;
    });
    await firstValueFrom(service.getLayers());
    expect(service.getLayersCount()).toEqual(1);
  });

  it('should remove multiple or all layers from the BaseLayers-Slot with a filter', async () => {
    [layer1, layer2, layer3].forEach(l => service.addLayer(l, 'Baselayers'));
    await firstValueFrom(service.getBaseLayers());
    expect(service.getBaseLayersCount()).toEqual(3);

    service.removeBaseLayers((layer) => {
      return layer.id !== layer1.id;
    });
    await firstValueFrom(service.getBaseLayers());
    expect(service.getBaseLayersCount()).toEqual(1);
  });

  it('should get a Layer or Group by Id', async () => {
    layergroup1.layers.push(layer1);
    service.addLayerGroup(layergroup1, 'Overlays');
    await firstValueFrom(service.getOverlays());

    expect(service.getOverlaysCount()).toBe(1);
    expect(service.getLayerGroupsCount()).toBe(1);

    const layer1FromStore = service.getLayerOrGroupById('layer1');
    expect(layer1FromStore).toBe(layer1);
    const layergroup1FromStore = service.getLayerOrGroupById('layergroup1');
    expect(layergroup1FromStore).toBe(layergroup1);
  });

  it('should get all LayerGroups', async () => {
    layergroup1.layers.push(layer1);
    layergroup2.layers = [layer1, layer4];
    const testGroups = [layergroup1, layer2, layergroup2];
    service.setLayerGroups(testGroups);

    const groups = await firstValueFrom(service.getLayerGroups());
    expect(groups.length).toEqual(3);
  });

  it('should get all Overlays', async () => {
    layergroup2.layers = [layer1, layer4];
    service.addLayerGroup(layergroup2, 'Overlays');
    service.addLayer(layer3, 'Layers');
    const overlays = await firstValueFrom(service.getOverlays());

    expect(overlays.length).toEqual(2);
    expect(overlays[0]).toBe(layer1);
    expect(overlays[1]).toBe(layer4);
  });

  it('should get all Layers', async () => {
    [layer1, layer2].map(l => service.addLayer(l, 'Layers'));

    const layers = await firstValueFrom(service.getLayers());
    expect(layers.length).toEqual(2);
  });

  it('should get all Baselayers', async () => {
    [layer1, layer2].map(l => service.addLayer(l, 'Baselayers'));

    const baselayers = await firstValueFrom(service.getBaseLayers());
    expect(baselayers.length).toEqual(2);
  });

  it('should update a Layer', async () => {
    layer5.visible = false;
    service.addLayer(layer5, 'Layers');
    await firstValueFrom(service.getLayerGroups());
    expect(service.getLayerById(layer5.id)?.visible).toEqual(false);

    const newLayer5 = new CustomLayer({
      id: 'ID-vector-image',
      name: 'Custom Layer KML',
      type: 'custom',
      custom_layer: new Object({ ol_uid: 600 }),
      visible: true
    });

    service.updateLayer(newLayer5, 'Layers');
    await firstValueFrom(service.getLayers());

    const layerFromSvc = service.getLayerById(newLayer5.id);
    expect(layerFromSvc).toBeTruthy();
    expect(layerFromSvc?.visible).toEqual(true);
    expect((layerFromSvc as CustomLayer).custom_layer.ol_uid).toEqual(600);
  });

  it('should update a VectorLayer', async () => {
    service.addLayer(layer8, 'Layers');
    await firstValueFrom(service.getLayers());

    // layer has been added
    expect(service.getLayerById(layer8.id)).toBeTruthy();
    // layer data has 1 feature
    expect((service.getLayerById(layer8.id) as VectorLayer).data.features.length).toEqual(1);

    // after `service.updateLayer`, layer data has indeed been updated.
    layer8.data = testData2;
    service.updateLayer(layer8, 'Layers');
    await firstValueFrom(service.getLayers());

    expect((service.getLayerById(layer8.id) as VectorLayer).data.features.length).toEqual(5);
  });


  it('should update a LayerGroup', async () => {
    layer1.visible = false;
    layergroup1.layers.push(layer1);
    service.addLayerGroup(layergroup1);
    await firstValueFrom(service.getLayerGroups());

    expect(layergroup1.visible).toBe(false);
    expect(layergroup1.bbox).toBe(undefined); // like defined above
    expect(layergroup1.layers.length).toEqual(1); // like defined above
    expect(layer1.visible).toBe(layergroup1.visible); // set from group

    const bbox: TGeoExtent = [-180, -90, 180, 90];
    const newLayergroup1 = new LayerGroup({
      visible: true,
      name: 'baslayer Group',
      filtertype: 'Layers',
      id: 'layergroup1',
      bbox,
      layers: [layer5, layer2]
    });
    // set by group
    expect(layer5.visible).toBe(newLayergroup1.visible);

    service.updateLayerGroup(newLayergroup1);
    await firstValueFrom(service.getLayerGroups());

    const layerFromSvc = service.getLayerOrGroupById(newLayergroup1.id);
    expect(layerFromSvc).toBeTruthy();
    expect(layerFromSvc?.visible).toEqual(newLayergroup1.visible);
    expect((layerFromSvc as LayerGroup).layers[0]).toEqual(layer5);
    expect((layerFromSvc as LayerGroup).layers[1]).toEqual(layer2);
    expect((layerFromSvc as LayerGroup).bbox).toEqual(bbox);
  });

  // test for layer-control arrows up and down
  it('should move group or layer up and down in the array', async () => {
    layergroup2.layers = [layer1, layer4];
    const layers = [layer2, layergroup2, layer3];
    // layer2,       layer1, layer4,      layer3
    service.setLayerGroups(layers);

    service.setGroupLayerIndex(layer2, 'down');
    // layer2 after layer1 and layer4
    const groups1 = await firstValueFrom(service.getLayerGroups());
    const flatt1 = service.flattenDeepArray(groups1);
    expect(flatt1[0]).toBe(layer1);
    expect(flatt1[1]).toBe(layer4);
    expect(flatt1[2]).toBe(layer2);
    expect(flatt1[3]).toBe(layer3);


    service.setLayerIndexInGroup(layer4, 'up', layergroup2);
    // layer4 before layer1

    const groups2 = await firstValueFrom(service.getLayerGroups());
    const flatt2 = service.flattenDeepArray(groups2);
    expect(flatt2[0]).toBe(layer4);
    expect(flatt2[1]).toBe(layer1);
    expect(flatt2[2]).toBe(layer2);
    expect(flatt2[3]).toBe(layer3);
  });

  // test for layer-control drag and drop
  it('should set correct zIndex for groups or layers', async () => {
    // layer2 == 0, layer1 == 1, layer4 == 2 layer3 == 3
    layergroup2.layers = [layer1, layer4];
    const layers = [layer2, layergroup2, layer3];
    service.setLayerGroups(layers);


    service.arrayMove(layers, 1, 0);
    service.setLayerGroups(layers);
    // layer2 after layer1 and layer4
    const groups1 = await firstValueFrom(service.getLayerGroups());
    const flatt1 = service.flattenDeepArray(groups1);
    expect(flatt1[0]).toBe(layer1);
    expect(flatt1[1]).toBe(layer4);
    expect(flatt1[2]).toBe(layer2);
    expect(flatt1[3]).toBe(layer3);


    service.arrayMove(layergroup2.layers, 1, 0);
    service.updateLayerGroup(layergroup2);
    // layer4 before layer1

    const groups2 = await firstValueFrom(service.getLayerGroups());
    const flatt2 = service.flattenDeepArray(groups2);
    expect(flatt2[0]).toBe(layer4);
    expect(flatt2[1]).toBe(layer1);
    expect(flatt2[2]).toBe(layer2);
    expect(flatt2[3]).toBe(layer3);
  });

  it('should replace all Layers and Groups in LayerGroups', async () => {
    layergroup1.layers.push(layer3);
    const groupsFor1 = [layergroup1];
    service.setLayerGroups(groupsFor1);

    const groups1 = await firstValueFrom(service.getLayerGroups());
    const flatt1 = service.flattenDeepArray(groups1);
    expect(flatt1.length).toBe(1);
    expect(flatt1[0]).toBe(layer3);


    layergroup2.layers = [layer1, layer4];
    const groupsFor2 = [layergroup1, layer2, layergroup2];
    service.setLayerGroups(groupsFor2);
    // replace all Groups

    const groups2 = await firstValueFrom(service.getLayerGroups());
    const flatt2 = service.flattenDeepArray(groups2);
    expect(flatt2.length).toBe(4);
    expect(flatt2[0]).toBe(layer3);
    expect(flatt2[1]).toBe(layer2);
    expect(flatt2[2]).toBe(layer1);
    expect(flatt2[3]).toBe(layer4);
  });


  it('should set/reset all Groups or layers for a filtertype', async () => {
    // add only Baselayers -----------------------
    const baseLayers = [layer1, layer2];
    service.setLayerGroups(baseLayers, 'Baselayers');
    await firstValueFrom(service.getLayerGroups());

    expect(service.getBaseLayersCount()).toBe(2);

    const groups1 = await firstValueFrom(service.getLayerGroups());
    const flatt1 = service.flattenDeepArray(groups1);
    expect(flatt1.length).toBe(2);
    expect(flatt1[0]).toBe(layer1);
    expect(flatt1[1]).toBe(layer2);


    // add Layers above Baselayers ----------------
    layergroup3.layers = [layer3, layer4, layer5];
    const layers = [layergroup3, layer6, layer7];
    service.setLayerGroups(layers, 'Layers');

    await firstValueFrom(service.getLayerGroups());

    expect(service.getLayersCount()).toBe(5);

    const groups2 = await firstValueFrom(service.getLayerGroups());
    const flatt2 = service.flattenDeepArray(groups2);
    expect(flatt2.length).toBe(7);
    expect(flatt2[0]).toBe(layer1);
    expect(flatt2[1]).toBe(layer2);

    expect(flatt2[2]).toBe(layer3);
    expect(flatt2[3]).toBe(layer4);
    expect(flatt2[4]).toBe(layer5);
    expect(flatt2[5]).toBe(layer6);
    expect(flatt2[6]).toBe(layer7);



    // reset Layers -------------------------------
    const layersNew = [layer6, layer7];
    service.setLayerGroups(layersNew, 'Layers');

    await firstValueFrom(service.getLayerGroups());

    expect(service.getLayersCount()).toBe(2);

    const groups3 = await firstValueFrom(service.getLayerGroups());
    const flatt3 = service.flattenDeepArray(groups3);
    expect(flatt3.length).toBe(4);

    expect(flatt3[0]).toBe(layer1);
    expect(flatt3[1]).toBe(layer2);

    expect(flatt3[2]).toBe(layer6);
    expect(flatt3[3]).toBe(layer7);
  });
});
