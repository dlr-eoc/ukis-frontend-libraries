import Map from 'ol/Map';
import View from 'ol/View';
import { Group as LayerGroup, Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { flattenLayers, getLayerGroups } from './utils-ol-layers';


import XYZ from 'ol/source/XYZ';

import VectorImageLayer from 'ol/layer/VectorImage';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import MVT from 'ol/format/MVT';
import ImageLayer from 'ol/layer/Image';
import ImageStaticSource from 'ol/source/ImageStatic';
import Projection from 'ol/proj/Projection';


import { getUid } from 'ol/util';
import { addLayer, getLayerByKey, getLayers, getLayersFromGroup, isLayerInGroup, removeAllLayers, removeLayerFromGroup } from './utils-ol-layers';


let rasterLayer: TileLayer;
let osmLayer: TileLayer;
let vectorLayer: VectorLayer, vetorData;
let vectorTileLayer: VectorTileLayer;
let imageLayer: ImageLayer;
let vectorImageLayer: VectorImageLayer, vectorImageData;

let layerGroupRaster: LayerGroup;
let layerGroupVector: LayerGroup;
let layerGroupImage: LayerGroup;

let layerLayerGroup: LayerGroup;

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

    vetorData = {
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
        features: (new GeoJSON()).readFeatures(vetorData)
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

    layerLayerGroup = new LayerGroup({
      layers: [layerGroupRaster, layerGroupImage, layerGroupVector]
    });
    layerLayerGroup.set('id', 'ID-layerLayerGroup');
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

  it('getLayerGroups: should get all direkt Layer Groups added to the map', () => {
    addLayer(map, layerGroupImage, 'Overlays', 'type');
    addLayer(map, layerGroupVector, 'Layers', 'type');
    addLayer(map, layerGroupRaster, 'Baselayers');


    const layerGroups = getLayerGroups(map, null);
    expect(layerGroups.length).toEqual(3);
    expect(layerGroups.includes(layerGroupImage)).toBeTrue();
    expect(layerGroups.includes(layerGroupRaster)).toBeTrue();
    expect(layerGroups.includes(layerGroupVector)).toBeTrue();
  });

  it('getLayerGroups: should get all direkt Layer Groups with filtertype Baselayers and default filtertypeKey', () => {
    addLayer(map, layerGroupImage, 'Overlays', 'type');
    addLayer(map, layerGroupVector, 'Layers', 'type');
    addLayer(map, layerGroupRaster, 'Baselayers');

    const filteredLayerGroups = getLayerGroups(map, 'Baselayers');
    expect(filteredLayerGroups.length).toEqual(1);
  });

  it('getLayerGroups: should get all direkt Layer Groups with filtertype Layers and custom filtertypeKey', () => {
    addLayer(map, layerGroupImage, 'Overlays', 'type');
    addLayer(map, layerGroupVector, 'Layers', 'type');
    addLayer(map, layerGroupRaster, 'Baselayers');

    const filteredLayerGroupsType = getLayerGroups(map, 'Layers', 'type');
    expect(filteredLayerGroupsType.length).toEqual(1);
  });

  it('getLayersFromGroup: should get all Layers/Groups from a layerGroup with a filtertypeKey set to filtertype', () => {
    addLayer(map, layerGroupVector, 'Layers', 'type');

    const filteredLayerGroupsType = getLayerGroups(map, 'Layers', 'type');
    expect(filteredLayerGroupsType.length).toEqual(1);

    const groupLayers = getLayersFromGroup(filteredLayerGroupsType[0], 'Layers', 'type', false);
    expect(groupLayers.length).toEqual(2);


    const recursiveGroupLayers = getLayersFromGroup(layerLayerGroup, null, null, true);
    expect(recursiveGroupLayers.length).toEqual(8);
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
    addLayer(map, layerGroupVector, 'Layers');

    const tempLayer = getLayerByKey(map, 'id', vectorLayer.get('id'));
    expect(tempLayer === vectorLayer).toBeTrue();


    const tempGroup = getLayerByKey(map, 'id', layerGroupVector.get('id'));
    expect(tempGroup === layerGroupVector).toBeTrue();
  });


  it('isLayerInGroup: should return if a Layer or Group is in a LayerGroup', () => {
    addLayer(map, layerLayerGroup, 'Layers', 'type');

    const layerGroups = getLayerGroups(map, 'Layers', 'type');
    expect(layerGroups.length).toEqual(1);

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
    expect(layers.length).toEqual(0);
  });

  it('removeAllLayers: should remove all Layers or Groups only for a filtertype', () => {
    addLayer(map, layerGroupImage, 'Overlays');
    addLayer(map, layerGroupVector, 'Layers');
    addLayer(map, layerGroupRaster, 'Baselayers');
    addLayer(map, osmLayer, 'Baselayers');

    removeAllLayers(map, 'Layers');
    removeAllLayers(map, 'Overlays');
    const layers = getLayers(map);
    expect(layers.length).toEqual(2);
  });


  it('removeLayerFromGroup: should remove a Layer or Group from a LayerGroup', () => {
    addLayer(map, layerLayerGroup);
    const layers = getLayers(map);
    expect(layers.length).toEqual(1);
    const haseLayerForRemove = getLayerByKey(map, 'id', layerGroupImage.get('id'));
    expect(haseLayerForRemove).toBeTruthy();

    removeLayerFromGroup(layerGroupImage, layerLayerGroup);
    const layersAfterRemove = getLayersFromGroup(layerLayerGroup);
    expect(layersAfterRemove.length).toEqual(2);

    const haseLayer = getLayerByKey(map, 'id', layerGroupImage.get('id'));
    expect(haseLayer).toBeFalsy();
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
    expect(flattenedLayers.length).toEqual(2);
  });
});
