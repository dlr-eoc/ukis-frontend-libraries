import Map from 'ol/Map';
import View from 'ol/View';
import { Group as LayerGroup, Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { getWidth } from 'ol/extent';
import XYZ from 'ol/source/XYZ';

import VectorImageLayer from 'ol/layer/VectorImage';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import MVT from 'ol/format/MVT';
import ImageLayer from 'ol/layer/Image';
import ImageStaticSource from 'ol/source/ImageStatic';
import Projection from 'ol/proj/Projection';

import {
  addLayer, getLayersByKey, getLayers, getLayersFromGroup, isLayerInGroup, removeAllLayers, removeLayerFromGroup,
  flattenLayers, getLayerGroupForLayer, getLayerGroups, removeLayerByKey, removeLayerByKeyFromGroup, setRecursiveKey, getTileGrid, getTileGridAuto
} from './utils-ol-layers';
import { DEFAULT_TILE_SIZE } from 'ol/src/tilegrid/common';


let rasterLayer: TileLayer;
let osmLayer: TileLayer;
let vectorLayer: VectorLayer, vectorData;
let vectorTileLayer: VectorTileLayer;
let imageLayer: ImageLayer;
let vectorImageLayer: VectorImageLayer, vectorImageData;

let layerGroupRaster: LayerGroup;
let layerGroupVector: LayerGroup;
let layerGroupImage: LayerGroup;

let layerGroupLayerGroup: LayerGroup;

let layerGroupLayerGroupLayerGroup: LayerGroup;

let map: Map;

describe('Utils OpenLayers Layers: ', () => {
  beforeEach(() => {
    map = new Map({
      layers: [],
      target: 'map',
      view: new View({
        center: fromLonLat([37.40570, 8.81566]),
        zoom: 4
      })
    });

    rasterLayer = new TileLayer({
      source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attributions: ['&copy, <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors'],
        wrapX: false
      })
    });
    rasterLayer.set('id', 'ID-TileLayer');
    rasterLayer.set('name', 'OpenStreetMap');


    osmLayer = new TileLayer({
      source: new OSM(),
    });
    osmLayer.set('id', 'ID-OsmLayer');
    osmLayer.set('name', 'OpenStreetMap');

    vectorData = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [
              [
                2.63671875,
                44.32384807250689
              ],
              [
                3.504638671875,
                44.95702412512118
              ],
              [
                4.449462890625,
                44.75453548416007
              ]
            ]
          }
        },
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [
              4.74609375,
              44.32384807250689
            ]
          }
        },
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [
                  4.28466796875,
                  45.46783598133375
                ],
                [
                  4.976806640625,
                  45.1742925240767
                ],
                [
                  5.4931640625,
                  45.56021795715051
                ],
                [
                  5.4052734375,
                  46.027481852486645
                ],
                [
                  4.46044921875,
                  45.84410779560204
                ],
                [
                  4.28466796875,
                  45.46783598133375
                ]
              ]
            ]
          }
        }
      ]
    };

    vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: (new GeoJSON()).readFeatures(vectorData)
      })
    });
    vectorLayer.set('id', 'ID-VectorLayer');
    vectorLayer.set('name', 'GeoJSON Vector Layer');


    vectorTileLayer = new VectorTileLayer({
      source: new VectorTileSource({
        maxZoom: 15,
        format: new MVT({
          idProperty: 'iso_a3',
        }),
        url:
          'https://ahocevar.com/geoserver/gwc/service/tms/1.0.0/' +
          'ne:ne_10m_admin_0_countries@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf',
      })
    });
    vectorTileLayer.set('id', 'ID-VectorTileLayer');
    vectorTileLayer.set('name', 'Vector Tile Layer Layer');


    imageLayer = new ImageLayer({
      source: new ImageStaticSource({
        attributions: '© <a href="http://xkcd.com/license.html">xkcd</a>',
        url: 'https://imgs.xkcd.com/comics/online_communities.png',
        imageExtent: [0, 0, 1024, 968],
        projection: new Projection({
          code: 'xkcd-image',
          units: 'pixels',
          extent: [0, 0, 1024, 968]
        })
      })
    });
    imageLayer.set('id', 'ID-ImageLayer');
    imageLayer.set('name', 'Image Layer');


    vectorImageData = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [
              4.74609375,
              44.32384807250689
            ]
          }
        }
      ]
    };

    vectorImageLayer = new VectorImageLayer({
      imageRatio: 2,
      source: new VectorSource({
        features: (new GeoJSON()).readFeatures(vectorImageData)
      })
    });
    vectorImageLayer.set('id', 'ID-VectorImageLayer');

    layerGroupRaster = new LayerGroup({
      layers: [rasterLayer]
    });
    layerGroupRaster.set('id', 'ID-GroupRaster');

    layerGroupVector = new LayerGroup({
      layers: [vectorLayer, vectorTileLayer]
    });
    layerGroupVector.set('id', 'ID-GroupVector');

    layerGroupImage = new LayerGroup({
      layers: [imageLayer, vectorImageLayer]
    });
    layerGroupImage.set('id', 'ID-GroupImage');

    layerGroupLayerGroup = new LayerGroup({
      layers: [layerGroupRaster, layerGroupImage, layerGroupVector]
    });
    layerGroupLayerGroup.set('id', 'ID-layerGroupLayerGroup');


    layerGroupLayerGroupLayerGroup = new LayerGroup({
      layers: [layerGroupLayerGroup]
    });
    layerGroupLayerGroupLayerGroup.set('id', 'ID-layerGroupLayerGroupLayerGroup');

  });

  it('setRecursiveKey: should set a value for a key on a Layer or Group recrusive', () => {
    expect(layerGroupImage.get('testType')).toBe(undefined);
    setRecursiveKey(layerGroupImage, 'a', 'testType');

    expect(layerGroupImage.get('testType')).toBe('a');
    layerGroupImage.getLayersArray().forEach(l => {
      expect(l.get('testType')).toBe('a');
    });
  });

  it('addLayer: should add/get a Layer or Group to/from the map with a filtertypeKey set to filtertype', () => {
    addLayer(map, layerGroupImage, 'Overlays', 'type');
    addLayer(map, layerGroupVector, 'Layers', 'type');
    addLayer(map, layerGroupRaster, 'Baselayers');

    const GroupsVector = getLayers(map, 'Layers', 'type');
    expect(GroupsVector.includes(layerGroupVector)).toBeTrue();

    const GroupsImage = getLayers(map, 'Overlays', 'type');
    expect(GroupsImage.includes(layerGroupImage)).toBeTrue();

    const GroupsRaster = getLayers(map, 'Baselayers');
    expect(GroupsRaster.includes(layerGroupRaster)).toBeTrue();
  });


  it('getLayers: should get all Layers from the map recursive! and optional only for a type', () => {

    addLayer(map, layerGroupLayerGroupLayerGroup, 'Layers', 'type');
    addLayer(map, osmLayer, 'Overlays', 'type');

    // !!! if the same Layer objects get added again to a different group - then the Filtertype get changed and rewrites the others!!!
    // so create new instances of the layers if you want to add them again
    // addLayer(map, layerGroupVector, 'Overlays', 'type');

    // get all layers without filtering for a type
    const allLayers = getLayers(map, null, null, true);
    expect(allLayers.length).toBe(11);

    // get all layers filtered by get('type') = Layers
    const allLayersLayers = getLayers(map, 'Layers', 'type', true);
    expect(allLayersLayers.length).toBe(10);

    // get all layers filtered by get('type') = Layers
    const allLayersOverlays = getLayers(map, 'Overlays', 'type', true);
    expect(allLayersOverlays.length).toBe(1);
  });


  it('getLayerGroups: should get all direct Layer Groups added to the map', () => {
    addLayer(map, layerGroupImage, 'Overlays', 'type');
    addLayer(map, layerGroupVector, 'Layers', 'type');
    addLayer(map, layerGroupRaster, 'Baselayers');


    const layerGroups = getLayerGroups(map, null);
    expect(layerGroups.length).toBe(3);
    expect(layerGroups.includes(layerGroupImage)).toBeTrue();
    expect(layerGroups.includes(layerGroupRaster)).toBeTrue();
    expect(layerGroups.includes(layerGroupVector)).toBeTrue();
  });

  it('getLayerGroups: should get all direct Layer Groups with filtertype Baselayers and default filtertypeKey', () => {
    addLayer(map, layerGroupImage, 'Overlays', 'type');
    addLayer(map, layerGroupVector, 'Layers', 'type');
    addLayer(map, layerGroupRaster, 'Baselayers');

    const filteredLayerGroups = getLayerGroups(map, 'Baselayers');
    expect(filteredLayerGroups.length).toBe(1);
  });

  it('getLayerGroups: should get all dirext Layer Groups with filtertype Layers and custom filtertypeKey', () => {
    addLayer(map, layerGroupImage, 'Overlays', 'type');
    addLayer(map, layerGroupVector, 'Layers', 'type');
    addLayer(map, layerGroupRaster, 'Baselayers');

    const filteredLayerGroupsType = getLayerGroups(map, 'Layers', 'type');
    expect(filteredLayerGroupsType.length).toBe(1);
  });

  it('getLayersFromGroup: should get all Layers/Groups from a layerGroup with a filtertypeKey set to filtertype', () => {
    addLayer(map, layerGroupVector, 'Layers', 'type');

    const filteredLayerGroupsType = getLayerGroups(map, 'Layers', 'type');
    expect(filteredLayerGroupsType.length).toBe(1);

    const groupLayers = getLayersFromGroup(filteredLayerGroupsType[0], 'Layers', 'type', false);
    expect(groupLayers.length).toBe(2);


    const recursiveGroupLayers = getLayersFromGroup(layerGroupLayerGroup, null, null, true);
    expect(recursiveGroupLayers.length).toBe(8);
    expect(recursiveGroupLayers.includes(layerGroupImage)).toBeTrue();
    expect(recursiveGroupLayers.includes(layerGroupRaster)).toBeTrue();
    expect(recursiveGroupLayers.includes(layerGroupVector)).toBeTrue();

    expect(recursiveGroupLayers.includes(rasterLayer)).toBeTrue();
    expect(recursiveGroupLayers.includes(vectorLayer)).toBeTrue();
    expect(recursiveGroupLayers.includes(vectorTileLayer)).toBeTrue();
    expect(recursiveGroupLayers.includes(imageLayer)).toBeTrue();
    expect(recursiveGroupLayers.includes(vectorImageLayer)).toBeTrue();
  });

  it('getLayerByKey: should get a Layer from the Map filtered by a key (property )', () => {
    // layerGroupVector and vectorLayer are in layerGroupLayerGroupLayerGroup
    addLayer(map, layerGroupLayerGroupLayerGroup, 'Layers');

    const tempLayers = getLayersByKey(map, 'id', vectorLayer.get('id'));
    expect(tempLayers.find(i => i === vectorLayer)).toBeTruthy();


    const tempGroup = getLayersByKey(map, 'id', layerGroupVector.get('id'));
    expect(tempGroup.find(i => i === layerGroupVector)).toBeTruthy();
  });

  it('isLayerInGroup: should return if a Layer or Group is in a LayerGroup', () => {
    addLayer(map, layerGroupLayerGroup, 'Layers', 'type');

    const layerGroups = getLayerGroups(map, 'Layers', 'type');
    expect(layerGroups.length).toBe(1);

    const haseLayer = isLayerInGroup(vectorLayer, layerGroups[0]);
    expect(haseLayer).toBeTrue();

    const haseLayerGroup = isLayerInGroup(layerGroupVector, layerGroups[0]);
    expect(haseLayerGroup).toBeTrue();
  });

  it('removeAllLayers: should remove all Layers or Groups', () => {
    addLayer(map, layerGroupImage, 'Overlays');
    addLayer(map, layerGroupVector, 'Layers');
    addLayer(map, layerGroupRaster, 'Baselayers');
    addLayer(map, osmLayer, 'Baselayers');

    removeAllLayers(map);
    const layers = getLayers(map);
    expect(layers.length).toBe(0);
  });

  it('removeAllLayers: should remove all Layers or Groups only for a filtertype', () => {
    addLayer(map, layerGroupImage, 'Overlays');
    addLayer(map, layerGroupVector, 'Layers');
    addLayer(map, layerGroupRaster, 'Baselayers');
    addLayer(map, osmLayer, 'Baselayers');

    removeAllLayers(map, 'Layers');
    removeAllLayers(map, 'Overlays');
    const layers = getLayers(map);
    expect(layers.length).toBe(2);
  });

  it('removeLayerFromGroup: should remove a Layer or Group from a LayerGroup', () => {
    addLayer(map, layerGroupLayerGroup);
    const layers = getLayers(map);
    expect(layers.length).toBe(1);
    const haseLayerForRemove = getLayersByKey(map, 'id', layerGroupImage.get('id'));
    expect(haseLayerForRemove.length).toBe(1);

    removeLayerFromGroup(layerGroupImage, layerGroupLayerGroup);
    const layersAfterRemove = getLayersFromGroup(layerGroupLayerGroup);
    expect(layersAfterRemove.length).toBe(2);

    const haseLayer = getLayersByKey(map, 'id', layerGroupImage.get('id'));
    expect(haseLayer.length).toBe(0);
  });

  it('removeLayerByKeyFromGroup: should remove a Layer or Group from a LayerGroup', () => {
    addLayer(map, layerGroupLayerGroup);
    const layers = getLayers(map);
    expect(layers.length).toBe(1);
    const haseLayerForRemove = getLayersByKey(map, 'id', layerGroupImage.get('id'));
    expect(haseLayerForRemove.length).toBe(1);


    removeLayerByKeyFromGroup('id', layerGroupImage.get('id'), layerGroupLayerGroup);
    const layersAfterRemove = getLayersFromGroup(layerGroupLayerGroup);
    expect(layersAfterRemove.length).toBe(2);

    const haseLayer = getLayersByKey(map, 'id', layerGroupImage.get('id'));
    expect(haseLayer.length).toBe(0);
  });

  it('getLayerGroupForLayerByKey: should get the group from a Layer', () => {
    // layerGroupLayerGroupLayerGroup.layers[
    //  layerGroupLayerGroup.layers[layerGroupRaster, layerGroupImage, layerGroupVector]
    // ]
    addLayer(map, osmLayer);
    addLayer(map, layerGroupLayerGroupLayerGroup);
    const layers = getLayers(map);
    expect(layers.length).toBe(2);

    const obj1 = getLayerGroupForLayer(map, layerGroupRaster);
    expect(obj1.group === layerGroupLayerGroup).toBeTrue();
    expect(obj1.layer === layerGroupRaster).toBeTrue();

    const obj2 = getLayerGroupForLayer(map, vectorLayer);
    expect(obj2.group === layerGroupVector).toBeTrue();
    expect(obj2.layer === vectorLayer).toBeTrue();


    const obj3 = getLayerGroupForLayer(map, osmLayer);
    expect(obj3.group === map.getLayerGroup()).toBeTrue();
    expect(obj3.layer === osmLayer).toBeTrue();
  });

  it('removeLayerByKey: should remove a Layer or Group by key from the map', () => {
    addLayer(map, layerGroupLayerGroup);
    const layers = getLayers(map);
    expect(layers.length).toBe(1);
    const haseLayerForRemove = getLayersByKey(map, 'id', layerGroupImage.get('id'));
    expect(haseLayerForRemove.length).toBe(1);



    removeLayerByKey(map, 'id', layerGroupImage.get('id'));
    const layersAfterRemove = getLayersFromGroup(layerGroupLayerGroup);
    expect(layersAfterRemove.length).toBe(2);

    const haseLayer = getLayersByKey(map, 'id', layerGroupImage.get('id'));
    expect(haseLayer.length).toBe(0);
  });


  // TODO:
  /* it('resolutionsFromExtent: ...', () => {
  });

  it('matrixIdsFromResolutions: ...', () => {
  });
   */

  it('getTileGrid should return a properly formatted TileGrid', () => {
    const extent = map.getView().getProjection().getExtent();
    const tileSize = DEFAULT_TILE_SIZE;
    const depth = 14;
    const width = getWidth(extent);
    const resolutions = [];
    for (let z = 0; z <= depth; z++) {
      resolutions.push((width / tileSize) / Math.pow(2, z));
    }

    const tileGrid = getTileGrid(extent, resolutions, tileSize);

    expect(tileGrid.getMinZoom()).toEqual(0);
    expect(tileGrid.getMaxZoom()).toEqual(depth);
    expect(tileGrid.getResolutions().length).toEqual(depth + 1);
    expect(tileGrid.getResolutions()[0] * tileSize).toBeCloseTo(width);
  });

  it('getTileGridAuto should return a properly formatted TileGrid', () => {
    const extent = map.getView().getProjection().getExtent();
    const tileSize = DEFAULT_TILE_SIZE;
    const depth = 14;
    const width = getWidth(extent);

    const tileGrid = getTileGridAuto(extent, depth, tileSize);

    expect(tileGrid.getMinZoom()).toEqual(0);
    expect(tileGrid.getMaxZoom()).toEqual(depth);
    expect(tileGrid.getResolutions().length).toEqual(depth + 1);
    expect(tileGrid.getResolutions()[0] * tileSize).toBeCloseTo(width);
  });

});


describe('flattenLayers test suite', () => {
  it('flattenLayers should work with nested groups', () => {

    const map2 = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }), new LayerGroup({
          layers: [
            new VectorLayer({
              source: new VectorSource({
                features: (new GeoJSON()).readFeatures({
                  type: 'FeatureCollection',
                  features: [{
                    type: 'Feature',
                    properties: {},
                    geometry: {
                      type: 'Point',
                      coordinates: [-1.40625, 51.83577752045248]
                    }
                  }]
                })
              })
            })
          ]
        })
      ],
      target: 'map',
      view: new View({
        center: fromLonLat([37.40570, 8.81566]),
        zoom: 4
      })
    });

    const flattenedLayers = flattenLayers(map2.getLayers().getArray());
    expect(flattenedLayers.length).toBe(2);
  });
});
