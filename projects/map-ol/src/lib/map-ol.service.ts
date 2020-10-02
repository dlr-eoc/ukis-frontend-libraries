import { Injectable } from '@angular/core';


import { Layer, VectorLayer, CustomLayer, RasterLayer, popup, WmtsLayer, WmsLayer, TGeoExtent, IAnyObject } from '@dlr-eoc/services-layers';

import olMap from 'ol/Map';
import olView from 'ol/View';
import { ViewOptions as olViewOptions } from 'ol/View';

import olBaseLayer from 'ol/layer/Base';
import { Options as olBaseLayerOptions } from 'ol/layer/Base';
import olLayer from 'ol/layer/Layer';
import olLayerGroup from 'ol/layer/Group';
import { Options as olLayerGroupOptions } from 'ol/layer/Group';
import olOverlay from 'ol/Overlay';
import { Options as olOverlayOptions } from 'ol/Overlay';

import olBaseTileLayer from 'ol/layer/BaseTile';
import { Options as olBaseTileLayerOptions } from 'ol/layer/BaseTile';
import olBaseVectorLayer from 'ol/layer/BaseVector';
import { Options as olBaseVectorLayerOptions } from 'ol/layer/BaseVector';
import olBaseImageLayer from 'ol/layer/BaseImage';

import olTileLayer from 'ol/layer/Tile';
import olVectorLayer from 'ol/layer/Vector';
import olVectorTile from 'ol/source/VectorTile';


import olXYZ from 'ol/source/XYZ';
import { Options as olXYZOptions } from 'ol/source/XYZ';
import olTileWMS from 'ol/source/TileWMS';
import { Options as olTileWMSOptions } from 'ol/source/TileWMS';
import olWMTS from 'ol/source/WMTS';
import { Options as olWMTSOptions } from 'ol/source/WMTS';
import olWMTSTileGrid from 'ol/tilegrid/WMTS';
import { Options as olWMTSTileGridOptions } from 'ol/tilegrid/WMTS';
import olTileGrid from 'ol/tilegrid/TileGrid';
import { Options as olTileGridOptions } from 'ol/tilegrid/TileGrid';

import olVectorSource from 'ol/source/Vector';
import olTileJSON from 'ol/source/TileJSON';
import olCluster from 'ol/source/Cluster';
import { Options as olClusterOptions } from 'ol/source/Cluster';
import olFeature from 'ol/Feature';

import olCollection from 'ol/Collection';
import olGeoJSON from 'ol/format/GeoJSON';
import olProjection from 'ol/proj/Projection';
import { transformExtent, get as getProjection, transform } from 'ol/proj';
import { register as olRegister } from 'ol/proj/proj4';
import proj4 from 'proj4';
import { extend as olExtend, getWidth as olGetWidth, getHeight as olGetHeight, getTopLeft as olGetTopLeft } from 'ol/extent';
import { DEFAULT_MAX_ZOOM, DEFAULT_TILE_SIZE } from 'ol/tilegrid/common';
import { easeOut } from 'ol/easing.js';


import olStyle from 'ol/style/Style';
import olText from 'ol/style/Text';
import olFill from 'ol/style/Fill';
import olCircleStyle from 'ol/style/Circle';
import olStroke from 'ol/style/Stroke';

import { Options as olDragBoxOptions } from 'ol/interaction/DragBox';
import olEvent from 'ol/events/Event';
import olMapBrowserEvent from 'ol/MapBrowserEvent';
import olRenderFeature from 'ol/render/Feature';
import { getUid as olGetUid } from 'ol/util';
import { Subject } from 'rxjs';

import { addBboxSelection, getLayerGroups, getLayersFromGroup, getLayersByKey, isLayerInGroup, removeLayerByKey, setRecursiveKey } from '@dlr-eoc/utils-maps';
import { GeoJSONFeature } from 'ol/format/GeoJSON';
import { GeoJSONFeatureCollection } from 'ol/format/GeoJSON';


export declare type Tgroupfiltertype = 'baselayers' | 'layers' | 'overlays' | 'Baselayers' | 'Overlays' | 'Layers';
const OVERLAY_TYPE_KEY = 'type';
const FILTER_TYPE_KEY = 'filtertype';
const ID_KEY = 'id';
const TITLE_KEY = 'title';

export interface IProjDef {
  code: string;
  proj4js: string | proj4.ProjectionDefinition;
  extent?: number[];
  worldExtent?: number[];
  global?: boolean;
  units?: any;
}

export interface IPopupArgs {
  modelName: string;
  properties: IAnyObject;
  layer: olLayer<any>;
  feature?: olFeature<any> | olRenderFeature;
  event: olMapBrowserEvent<PointerEvent>;
  popupFn?: popup['pupupFunktion'];
}

@Injectable({
  providedIn: 'root'
})
export class MapOlService {
  map: olMap; // ol.Map;
  view: olView;
  EPSG: string;
  /** 'olProjection' */
  projectionChange = new Subject<olProjection>();

  private viewOptions: olViewOptions;
  private hitTolerance = 0;
  constructor() {
    this.map = new olMap({ controls: [] });
    this.view = new olView();
    this.EPSG = 'EPSG:3857'; // 'EPSG:4326'; EPSG:3857
  }

  /** USED in map-ol.component */
  createMap(target?: HTMLElement) {
    const zoom = 0;
    const center = {
      lat: 0,
      lon: 0
    };

    const baselayerGroup = new olLayerGroup({
      layers: []
    });
    baselayerGroup.set(FILTER_TYPE_KEY, 'baselayers');
    baselayerGroup.set(TITLE_KEY, 'Base maps');
    baselayerGroup.set(ID_KEY, 'ID_filtertype_baselayers');


    const layersGroup = new olLayerGroup({
      layers: []
    });
    layersGroup.set(FILTER_TYPE_KEY, 'layers');
    layersGroup.set(TITLE_KEY, 'Layers');
    layersGroup.set(ID_KEY, 'ID_filtertype_layers');

    // ---------------------------------------------------------------------------------------------------
    const overlayGroup = new olLayerGroup({
      layers: []
    });
    overlayGroup.set(FILTER_TYPE_KEY, 'overlays');
    overlayGroup.set(TITLE_KEY, 'Overlays');
    overlayGroup.set(ID_KEY, 'ID_filtertype_overlays');

    /**
     * set default viewOptions
     */
    this.viewOptions = {
      center: transform([center.lon, center.lat], 'EPSG:4326', this.EPSG),
      zoom,
      projection: getProjection(this.EPSG)
    };

    if (this.view['constrainRotation']) {
      this.viewOptions.constrainRotation = this.view['constrainRotation'];
    }

    if (this.view['enableRotation']) {
      this.viewOptions.enableRotation = this.view['enableRotation'];
    }

    if (this.view['extent']) {
      this.viewOptions.extent = this.view['extent'];
    }

    if (this.view['constrainOnlyCenter']) {
      this.viewOptions.constrainOnlyCenter = this.view['constrainOnlyCenter'];
    }

    if (this.view['smoothExtentConstraint']) {
      this.viewOptions.smoothExtentConstraint = this.view['smoothExtentConstraint'];
    }

    if (this.view.getMaxResolution()) {
      this.viewOptions.maxResolution = this.view.getMaxResolution();
    }

    if (this.view.getMinResolution()) {
      this.viewOptions.minResolution = this.view.getMinResolution();
    }

    if (this.view.getMaxZoom()) {
      this.viewOptions.maxZoom = this.view.getMaxZoom();
    }

    if (this.view.getMinZoom()) {
      this.viewOptions.minZoom = this.view.getMinZoom();
    }

    if (this.view['multiWorld']) {
      this.viewOptions.multiWorld = this.view['multiWorld'];
    }

    if (this.view['constrainResolution']) {
      this.viewOptions.constrainResolution = this.view['constrainResolution'];
    }

    if (this.view['smoothResolutionConstraint']) {
      this.viewOptions.smoothResolutionConstraint = this.view['smoothResolutionConstraint'];
    }

    if (this.view.getResolution()) {
      this.viewOptions.resolution = this.view.getResolution();
    }

    if (this.view.getResolutions()) {
      this.viewOptions.resolutions = this.view.getResolutions();
    }

    if (this.view['rotation']) {
      this.viewOptions.rotation = this.view['rotation'];
    }

    if (this.view['zoomFactor']) {
      this.viewOptions.zoomFactor = this.view['zoomFactor'];
    }
    const tempview = new olView(this.viewOptions);

    /** define map in constructor so it is created before to use it in projects onInit Method  */
    [baselayerGroup, layersGroup, overlayGroup].map(layer => this.map.addLayer(layer));
    this.map.setView(tempview);
    // this.map.getControls().clear();
    this.view = this.map.getView();
    this.setProjection(this.EPSG);
    return {
      map: this.map,
      view: this.view
    };
  }

  setHitTolerance(tolerance: number) {
    this.hitTolerance = tolerance;
  }

  getHitTolerance() {
    return this.hitTolerance;
  }

  /**
   * See this example:
   * https://openlayers.org/en/latest/examples/box-selection.html
   */
  addBboxSelection(conditionForDrawing: (evt: olMapBrowserEvent<any>) => boolean, onBoxStart?: (evt: olEvent) => void, onBoxEnd?: (ext: TGeoExtent, evt: olEvent) => void) {
    const options: olDragBoxOptions = {
      className: 'ol-drag-select',
      condition: conditionForDrawing
    };
    return addBboxSelection(this.map, onBoxStart, onBoxEnd, options);
  }

  /**
   * get an array of olLayers from one of the base groups of filtertype - so all direkt child layers from one of the layergroups
   *
   * base groups: baselayerGroup | layersGroup | overlayGroup
   */
  getLayers(filtertype: Tgroupfiltertype) {
    let layers: olBaseLayer[] = [];
    const layerGroups = getLayerGroups(this.map, filtertype, FILTER_TYPE_KEY);
    layerGroups.forEach(l => {
      layers = layers.concat(getLayersFromGroup(l));
    });
    return layers;
  }

  /**
   * get a layer from the map by key and value - this is working recursive so even if the layer is in a group
   */
  getLayerByKey(key: { key: string, value: string }, filtertype?: Tgroupfiltertype) {
    let layers: olBaseLayer[] = [];
    if (filtertype) {
      layers = getLayersByKey(this.map, key.key, key.value, filtertype, FILTER_TYPE_KEY);
    } else {
      layers = getLayersByKey(this.map, key.key, key.value);
    }

    // there could maybe more the one layers with the same key!!!!
    if (layers.length === 1) {
      return layers[0];
    } else {
      return null;
    }
  }

  /**
   * add a olLayer to one of the base groups if it is not already in the group
   *
   * base groups: baselayerGroup | layersGroup | overlayGroup
   *
   * returns the new layers which are then in the group
   */
  addLayer(layer: olBaseLayer, filtertype: Tgroupfiltertype) {
    let layers: olBaseLayer[];
    const layerGroups = getLayerGroups(this.map, filtertype, FILTER_TYPE_KEY);
    layerGroups.forEach(l => {
      if (!this.isLayerInGroup(layer, l)) {
        layers = l.getLayers().getArray();
        setRecursiveKey(layer, filtertype.toLocaleLowerCase(), FILTER_TYPE_KEY);
        layers.push(layer);
        l.setLayers(new olCollection(layers));
      }
    });
    return layers;
  }

  private isLayerInGroup(layer: olBaseLayer, layerGroup: olLayerGroup) {
    return isLayerInGroup(layer, layerGroup, null, null, ID_KEY);
  }


  /**
   * add a array of olLayers to a base group if they are not there
   *
   * base groups: baselayerGroup | layersGroup | overlayGroup
   */
  addLayers(layers: olBaseLayer[], filtertype: Tgroupfiltertype) {
    let newLayers: olBaseLayer[];
    const layerGroups = getLayerGroups(this.map, filtertype, FILTER_TYPE_KEY);
    layerGroups.forEach(l => {
      const groupLayers = l.getLayers();
      if (groupLayers.getLength() > 0) {
        // I think doing it like this should be more performant like as using the addLayer in a loop
        newLayers = l.getLayers().getArray();
        layers.map(layer => {
          if (!this.isLayerInGroup(layer, l)) {
            newLayers.push(layer);
          }
        });
      } else {
        newLayers = layers;
      }
      l.setLayers(new olCollection(newLayers));
    });
    return newLayers;
  }

  /**
   * reset a base group with an array of olLayers
   *
   * base groups: baselayerGroup | layersGroup | overlayGroup
   */
  setLayers(layers: olBaseLayer[], filtertype: Tgroupfiltertype) {
    const layerGroups = getLayerGroups(this.map, filtertype, FILTER_TYPE_KEY);
    layerGroups.forEach(l => {
      l.setLayers(new olCollection(layers));
    });
    return layers;
  }

  /**
   *
   */
  removeLayerByKey(key: { key: string, value: string }, filtertype: Tgroupfiltertype) {
    removeLayerByKey(this.map, key.key, key.value, filtertype, FILTER_TYPE_KEY);
    /* const layerGroups = getLayerGroups(this.map, filtertype, FILTER_TYPE_KEY);
    layerGroups.forEach(l => {
      removeLayerByKeyFromGroup(key.key, key.value, l);
    }); */
  }

  updateLayerByKey(key: { key: string, value: string }, newLayer: olBaseLayer, filtertype: Tgroupfiltertype) {
    const layerGroups = getLayerGroups(this.map, filtertype, FILTER_TYPE_KEY);
    layerGroups.forEach(l => {
      const groupLayers = l.getLayers();
      groupLayers.forEach((oldLayer, index) => {
        if (oldLayer.get(key.key) && oldLayer.get(key.key) === key.value) {

          const newProperties = newLayer.getProperties();
          const newExtent = newLayer.getExtent();

          const newMaxZoom = newLayer.getMaxZoom();
          const newMinZoom = newLayer.getMinZoom();

          const newOpacity = newLayer.getOpacity();
          const newVisible = newLayer.getVisible();

          const newZIndex = newLayer.getZIndex();

          if (oldLayer instanceof olLayer && newLayer instanceof olLayer) {
            const newSource = newLayer.getSource();
            oldLayer.setSource(newSource);
          }
          if (newProperties) {
            oldLayer.setProperties(newProperties);
          }
          if (newExtent) {
            oldLayer.setExtent(newExtent);
          }
          if (newMaxZoom) {
            oldLayer.setMaxZoom(newMaxZoom);
          }
          if (newMinZoom) {
            oldLayer.setMinZoom(newMinZoom);
          }
          if (newOpacity) {
            oldLayer.setOpacity(newOpacity);
          }
          if (newVisible) {
            oldLayer.setVisible(newVisible);
          }
          if (newZIndex) {
            oldLayer.setZIndex(newZIndex);
          }
          oldLayer.changed();
          groupLayers.setAt(index, oldLayer);
        }
      });
      l.setLayers(groupLayers);
    });
  }

  removeAllLayers(filtertype: Tgroupfiltertype) {
    const layerGroups = getLayerGroups(this.map, filtertype, FILTER_TYPE_KEY);
    layerGroups.forEach(l => {
      l.getLayers().clear();
    });
  }

  /**
   * This function resets/adds all olLayers of a type with the new UKIS-Layers
   *
   * if only one group of them map is used and setLayers is called then the map flickers!
   * this is because of all layers are new created and the have all new ol_uid's
   */
  setUkisLayers(layers: Array<Layer>, filtertype: Tgroupfiltertype) {
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
    const tempLayers: olBaseLayer[] = [];
    // TODO try to deep check if a layer if exactly the same and dont create it new

    if (layers.length < 1 && lowerType !== 'baselayers') {
      // this.removeAllLayers('overlays');
      // this.removeAllLayers('layers');
      this.removeAllLayers(lowerType);
    } else {
      layers.forEach((newLayer) => {
        const layer = this.create_layers(newLayer);
        // check if layer not undefined
        if (layer) {
          tempLayers.push(layer);
        }
      });
    }

    if (tempLayers.length > 0) {
      this.setLayers(tempLayers, lowerType);
      // TODO: checkt to replace type with filtertype -> but breaking Change!!
      const newTempLayer: { type: Tgroupfiltertype, layers: olBaseLayer[] } = {
        type: lowerType, layers: tempLayers
      };
      return newTempLayer;
    }
  }

  /** This function resets/adds a olLayer of a type with the new UKIS-Layer */
  setUkisLayer(newLayer: Layer, filtertype?: Tgroupfiltertype): void {
    if (!filtertype) {
      filtertype = newLayer.filtertype;
    }
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
    const oldLayers = this.getLayers(lowerType);
    const oldLayer = oldLayers.find(l => l.get(ID_KEY) === newLayer.id);
    const newOlLayer = this.create_layers(newLayer);
    if (newOlLayer) {
      this.removeLayerByKey({ key: ID_KEY, value: oldLayer.get(ID_KEY) }, filtertype);
      this.addLayer(newOlLayer, filtertype);
    }
  }

  updateUkisLayer(newLayer: Layer, filtertype?: Tgroupfiltertype): void {
    if (!filtertype) {
      filtertype = newLayer.filtertype;
    }
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
    const oldLayers = this.getLayers(lowerType);
    const oldLayer = oldLayers.find(l => l.get(ID_KEY) === newLayer.id);
    const newOlLayer = this.create_layers(newLayer);
    if (newOlLayer) {
      this.updateLayerByKey({ key: ID_KEY, value: oldLayer.get(ID_KEY) }, newOlLayer, filtertype);
    }
  }


  private create_layers(newLayer: Layer) {
    let newOlLayer: olTileLayer | olVectorLayer | olBaseLayer;
    switch (newLayer.type) {
      case 'xyz':
        newOlLayer = this.create_xyz_layer(newLayer as RasterLayer);
        break;
      case 'wms':
        newOlLayer = this.create_wms_layer(newLayer as WmsLayer);
        break;
      case 'wmts':
        newOlLayer = this.create_wmts_layer(newLayer as WmtsLayer);
        break;
      case 'geojson':
        newOlLayer = this.create_geojson_layer(newLayer as VectorLayer);
        break;
      case 'custom':
        newOlLayer = this.create_custom_layer(newLayer as CustomLayer);
        break;
    }
    return newOlLayer;
  }

  /**
   * define layer types
   */
  private create_xyz_layer(l: RasterLayer): olTileLayer {
    const xyzOptions: olXYZOptions = {
      wrapX: false
    };

    if (l.crossOrigin) {
      xyzOptions.crossOrigin = l.crossOrigin;
    }

    const olSource = new olXYZ(xyzOptions);

    if (l.attribution) {
      olSource.setAttributions([l.attribution]);
    }

    if (l.continuousWorld) {
      olSource.set('wrapX', l.continuousWorld);
    }

    if (l.subdomains) {
      const urls = l.subdomains.map((item) => l.url.replace('{s}', `${item}`));
      olSource.setUrls(urls);

    } else {
      olSource.setUrl(l.url);
    }

    const layeroptions: olBaseTileLayerOptions = {
      visible: l.visible,
      opacity: l.opacity || 1,
      zIndex: 1,
      source: olSource
    };

    if (l.bbox) {
      layeroptions.extent = transformExtent(l.bbox, 'EPSG:4326', this.map.getView().getProjection().getCode());
    }

    if (l.maxResolution) {
      layeroptions.maxResolution = l.maxResolution;
    }
    if (l.minResolution) {
      layeroptions.minResolution = l.minResolution;
    }

    if (l.maxZoom) {
      layeroptions.maxZoom = l.maxZoom;
    }
    if (l.minZoom) {
      layeroptions.minZoom = l.minZoom;
    }
    const newLayer = new olTileLayer(layeroptions);

    if (l.popup) {
      newLayer.set('popup', l.popup);
      /**
       * ol 6.x problem if popup (map.forEachLayerAtPixel) use className
       * https://github.com/openlayers/openlayers/releases/tag/v6.0.0
       */
      newLayer.set('className', l.id);
    }

    newLayer.setProperties({
      type: 'xyz',
      filtertype: l.filtertype,
      name: l.name,
      id: l.id,
      legendImg: l.legendImg
    });
    return newLayer;
  }

  private create_wms_layer(l: WmsLayer): olTileLayer {

    const tileOptions: olTileWMSOptions = {
      /** use assign here otherwise params is passed by object reference to the openlayers layer! */
      params: Object.assign({}, l.params), // params: {} = { ...l.params } ~ same as assign destructuring
      wrapX: false
    };

    if (l.tileSize) {
      tileOptions['tileGrid'] = this.getTileGrid<olTileGrid>('default', null, l.tileSize);
      delete tileOptions.params['tileSize'];
    }

    if (l.crossOrigin) {
      tileOptions.crossOrigin = l.crossOrigin;
    }

    tileOptions.params = this.keysToUppercase(tileOptions.params);
    const olSource = new olTileWMS(tileOptions);

    if (l.attribution) {
      olSource.setAttributions([l.attribution]);
    }

    if (l.continuousWorld) {
      olSource.set('wrapX', l.continuousWorld);
    }

    if (l.subdomains) {
      const urls = l.subdomains.map((item) => l.url.replace('{s}', `${item}`));
      olSource.setUrls(urls);

    } else {
      olSource.setUrl(l.url);
    }

    const layeroptions: olBaseTileLayerOptions = {
      visible: l.visible,
      opacity: l.opacity || 1,
      zIndex: 1,
      source: olSource
    };

    if (l.maxResolution) {
      layeroptions.maxResolution = l.maxResolution;
    }
    if (l.minResolution) {
      layeroptions.minResolution = l.minResolution;
    }

    if (l.maxZoom) {
      layeroptions.maxZoom = l.maxZoom;
    }
    if (l.minZoom) {
      layeroptions.minZoom = l.minZoom;
    }

    if (l.bbox) {
      layeroptions.extent = transformExtent(l.bbox, 'EPSG:4326', this.map.getView().getProjection().getCode());
    }
    const newLayer = new olTileLayer(layeroptions);

    if (l.popup) {
      newLayer.set('popup', l.popup);
      /**
       * ol 6.x problem if popup (map.forEachLayerAtPixel) use className
       * https://github.com/openlayers/openlayers/releases/tag/v6.0.0
       */
      newLayer.set('className', l.id);
    }
    newLayer.setProperties({
      type: 'wms',
      filtertype: l.filtertype,
      name: l.name,
      id: l.id,
      legendImg: l.legendImg
    });
    return newLayer;
  }

  private create_wmts_layer(l: WmtsLayer): olTileLayer {
    if (l instanceof WmtsLayer) {

      let tileGrid = this.getTileGrid<olWMTSTileGrid>('wmts');
      let matrixSet = this.EPSG;
      if (l.params.matrixSetOptions) {
        matrixSet = l.params.matrixSetOptions.matrixSet;
        if ('resolutions' in l.params.matrixSetOptions) {
          const resolutions: Array<string | number> = l.params.matrixSetOptions.resolutions;
          tileGrid = this.getTileGrid<olWMTSTileGrid>('wmts', null, l.tileSize, null, resolutions);
        } else if ('resolutionLevels' in l.params.matrixSetOptions || 'tileMatrixPrefix' in l.params.matrixSetOptions) { /** ISimpleMatrixSet */
          const resolutionLevels = l.params.matrixSetOptions.resolutionLevels;
          const tileMatrixPrefix = l.params.matrixSetOptions.tileMatrixPrefix;
          tileGrid = this.getTileGrid<olWMTSTileGrid>('wmts', resolutionLevels, l.tileSize, tileMatrixPrefix, null);
        }
        if ('matrixIds' in l.params.matrixSetOptions) {
          const matrixIds = l.params.matrixSetOptions.matrixIds;
          tileGrid = this.getTileGrid<olWMTSTileGrid>('wmts', null, l.tileSize, null, null, matrixIds);
        }
      }

      let wmtsOptions: olWMTSOptions = {
        url: l.url,
        tileGrid,
        matrixSet,
        wrapX: false,
        layer: l.params.layer,
        style: l.params.style
      };
      wmtsOptions = Object.assign(wmtsOptions, l.params);


      if (l.crossOrigin) {
        wmtsOptions.crossOrigin = l.crossOrigin;
      }

      const olSource = new olWMTS(wmtsOptions);

      if (l.attribution) {
        olSource.setAttributions([l.attribution]);
      }

      if (l.continuousWorld) {
        olSource.set('wrapX', l.continuousWorld);
      }


      if (l.subdomains) {
        const urls = l.subdomains.map((item) => l.url.replace('{s}', `${item}`));
        olSource.setUrls(urls);

      } else {
        olSource.setUrl(l.url);
      }

      const layeroptions: olBaseTileLayerOptions = {
        visible: l.visible,
        opacity: l.opacity || 1,
        zIndex: 1,
        source: olSource
      };

      if (l.maxResolution) {
        layeroptions.maxResolution = l.maxResolution;
      }
      if (l.minResolution) {
        layeroptions.minResolution = l.minResolution;
      }

      if (l.maxZoom) {
        layeroptions.maxZoom = l.maxZoom;
      }
      if (l.minZoom) {
        layeroptions.minZoom = l.minZoom;
      }

      if (l.bbox) {
        layeroptions.extent = transformExtent(l.bbox, 'EPSG:4326', this.map.getView().getProjection().getCode());
      }

      const newLayer = new olTileLayer(layeroptions);

      if (l.popup) {
        newLayer.set('popup', l.popup);
        /**
         * ol 6.x problem if popup (map.forEachLayerAtPixel) use className
         * https://github.com/openlayers/openlayers/releases/tag/v6.0.0
         */
        newLayer.set('className', l.id);
      }

      newLayer.setProperties({
        type: 'wmts',
        filtertype: l.filtertype,
        name: l.name,
        id: l.id,
        legendImg: l.legendImg
      });
      return newLayer;
    } else {
      const layer = l as Layer;
      console.error(`layer with id: ${layer.id} and type ${layer.type} is no instanceof WmtsLayer!`);
    }
  }


  private create_geojson_layer(l: VectorLayer) {
    let olSource: olVectorSource<any>;
    if (l.data) {
      olSource = new olVectorSource({
        features: this.geoJsonToFeatures(l.data),
        format: new olGeoJSON({
          dataProjection: 'EPSG:4326',
          featureProjection: this.EPSG
        }),
        wrapX: false
      });
    } else if (l.url) {
      olSource = new olVectorSource({
        url: l.url,
        format: new olGeoJSON({
          dataProjection: 'EPSG:4326',
          featureProjection: this.EPSG
        }),
        wrapX: false
      });
    }

    if (l.continuousWorld) {
      olSource.set('wrapX', l.continuousWorld);
    }

    const layeroptions: olBaseVectorLayerOptions = {
      visible: l.visible,
      opacity: l.opacity || 1,
      zIndex: 1,
      source: olSource
    };

    if (l.maxResolution) {
      layeroptions.maxResolution = l.maxResolution;
    }
    if (l.minResolution) {
      layeroptions.minResolution = l.minResolution;
    }

    if (l.maxZoom) {
      layeroptions.maxZoom = l.maxZoom;
    }
    if (l.minZoom) {
      layeroptions.minZoom = l.minZoom;
    }

    if (l.bbox) {
      layeroptions.extent = transformExtent(l.bbox, 'EPSG:4326', this.map.getView().getProjection().getCode());
    }

    if (l.cluster) {
      const clusteroptions: olClusterOptions = {};
      if (typeof l.cluster === 'object') {
        Object.assign(clusteroptions, l.cluster);
      }
      clusteroptions.source = olSource;
      const clusterSource = new olCluster(clusteroptions);
      layeroptions.source = clusterSource;
      const styleCache = {};
      layeroptions.style = (feature) => {
        const size = feature.get('features').length;
        let style = styleCache[size];
        if (!style) {
          style = new olStyle({
            image: new olCircleStyle({
              radius: 10,
              stroke: new olStroke({
                color: '#fff'
              }),
              fill: new olFill({
                color: '#3399CC'
              })
            }),
            text: new olText({
              text: size.toString(),
              fill: new olFill({
                color: '#fff'
              })
            })
          });
          styleCache[size] = style;
        }
        return style;
      };
    }

    if (l.options) {
      Object.assign(layeroptions, l.options);
    }

    const newLayer = new olVectorLayer(layeroptions);

    if (l.popup) {
      newLayer.set('popup', l.popup);
      /**
       * ol 6.x problem if popup (map.forEachLayerAtPixel) use className
       * https://github.com/openlayers/openlayers/releases/tag/v6.0.0
       */
      newLayer.set('className', l.id);
    }

    newLayer.setProperties({
      type: 'geojson',
      name: l.name,
      id: l.id,
      legendImg: l.legendImg
    });
    return newLayer;
  }

  private create_custom_layer(l: CustomLayer) {
    const updateLayerSource = (layer: olLayer<any>) => {
      const olSource = layer.getSource();
      olSource.set('wrapX', false);

      if (l.attribution) {
        olSource.setAttributions([l.attribution]);
      }

      if (l.continuousWorld) {
        olSource.set('wrapX', l.continuousWorld);
      }
    };
    if (l.custom_layer) {
      const layer: olBaseLayer | olLayerGroup = l.custom_layer;
      if (layer instanceof olLayer) {
        updateLayerSource(layer);

        // if custom_layer is a olLayerGroup update all layers (object) and set group filtertype
      } else if (layer instanceof olLayerGroup) {
        const groupLayers = getLayersFromGroup(layer, null, null, true);
        groupLayers.forEach(gl => {
          if (gl instanceof olLayer) {
            gl.set(FILTER_TYPE_KEY, l.filtertype);
            updateLayerSource(gl);
          }
        });
      }

      const layeroptions: olLayerGroupOptions | olBaseLayerOptions = {
        visible: l.visible,
        opacity: l.opacity || 1,
        zIndex: 1,
      };

      if (l.maxResolution) {
        layeroptions.maxResolution = l.maxResolution;
      }
      if (l.minResolution) {
        layeroptions.minResolution = l.minResolution;
      }

      if (l.maxZoom) {
        layeroptions.maxZoom = l.maxZoom;
      }
      if (l.minZoom) {
        layeroptions.minZoom = l.minZoom;
      }

      if (l.bbox) {
        layeroptions.extent = transformExtent(l.bbox, 'EPSG:4326', this.getProjection().getCode());
      }

      layer.setProperties(layeroptions);
      layer.setProperties({
        type: 'custom',
        filtertype: l.filtertype,
        name: l.name,
        id: l.id,
        legendImg: l.legendImg
      });

      if (l.popup) {
        layer.set('popup', l.popup);
        /**
         * ol 6.x problem if popup (map.forEachLayerAtPixel) use className
         * https://github.com/openlayers/openlayers/releases/tag/v6.0.0
         */
        layer.set('className', l.id);
      }
      // don't delete the custom Layer, it is used to newly create all layer from layerservice after map all layers removed!
      // delete l.custom_layer;
      return layer;

    } else {
      console.log('attribute custom_layer not set on layer type custom!');
    }
  }

  private resolutionsFromExtent(extent, optMaxZoom: number, tileSize: number) {
    const maxZoom = optMaxZoom;

    const height = olGetHeight(extent);
    const width = olGetWidth(extent);

    const maxResolution = Math.max(width / tileSize, height / tileSize);

    const length = maxZoom + 1;
    const resolutions = new Array(length);
    for (let z = 0; z < length; ++z) {
      resolutions[z] = maxResolution / Math.pow(2, z);
    }
    return resolutions;
  }

  private matrixIdsFromResolutions(resolutionLevels: number, matrixIdPrefix?: string) {
    return Array.from(Array(resolutionLevels).keys()).map(l => {
      if (matrixIdPrefix) {
        return `${matrixIdPrefix}:${l}`;
      } else {
        return `${l}`;
      }
    });
  }

  getTileGrid<T>(type: 'wmts' | 'default' = 'default', resolutionLevels?: number, tileSize?: number, matrixIdPrefix?: string, resolutions?: Array<string | number>, matrixIds?: Array<string>): T {
    const newResolutionLevels = resolutionLevels || DEFAULT_MAX_ZOOM;
    const newTileSize = tileSize || DEFAULT_TILE_SIZE;
    const newMatrixIdPrefix = matrixIdPrefix || '';

    const projectionExtent = this.getProjection().getExtent();
    const defaultResolutions = this.resolutionsFromExtent(projectionExtent, newResolutionLevels, newTileSize);
    const defaultMatrixIds = this.matrixIdsFromResolutions(defaultResolutions.length, newMatrixIdPrefix);
    /** how to generate matrix ids is not in the wms GetCapabilities ?? */

    const tileGridOptions: olTileGridOptions | olWMTSTileGridOptions = {
      extent: projectionExtent,
      origin: olGetTopLeft(projectionExtent),
      resolutions: resolutions || defaultResolutions,
      tileSize: [newTileSize, newTileSize]
    };

    if (type === 'wmts') {
      (tileGridOptions as olWMTSTileGridOptions).matrixIds = matrixIds || defaultMatrixIds;
      const grid = new olWMTSTileGrid(tileGridOptions as olWMTSTileGridOptions);
      return grid as unknown as T;
    } else if (type === 'default') {
      const grid = new olTileGrid(tileGridOptions);
      return grid as unknown as T;
    }
  }

  /** USED in map-ol.component */
  layers_on_click(evt: olMapBrowserEvent<PointerEvent>) {
    const layerFilter = (layer) => {
      // try to catch CORS error in getImageData!!!
      // layer.sourceChangeKey_ && layer.sourceChangeKey_.target && layer.sourceChangeKey_.target.crossOrigin != "anonymous"
      const layerpopup: Layer['popup'] = layer.get('popup');
      if (layerpopup) {
        return true;
      }
    };
    this.layers_on_click_move(evt, layerFilter);
  }

  layers_on_pointermove(evt: olMapBrowserEvent<PointerEvent>) {
    const layerFilter = (layer) => {
      // try to catch CORS error in getImageData!!!
      // layer.sourceChangeKey_ && layer.sourceChangeKey_.target && layer.sourceChangeKey_.target.crossOrigin != "anonymous"
      const layerpopup: Layer['popup'] = layer.get('popup');
      if (layerpopup && typeof layerpopup === 'object' && !Array.isArray(layerpopup) && layerpopup.event === 'move') {
        return true;
      }
    };
    this.layers_on_click_move(evt, layerFilter);
  }

  private layers_on_click_move(evt: olMapBrowserEvent<PointerEvent>, layerFilter: (layer: olLayer<any>) => boolean) {
    /** set cursor for features */
    if (evt.type === 'pointermove') {
      const hit = this.map.forEachFeatureAtPixel(evt.pixel, () => {
        return true;
      });
      if (hit) {
        this.map.getTargetElement().style.cursor = 'pointer';
      } else {
        this.removeAllPopups((item) => {
          return item.get('addEvent') === 'pointermove';
        });
        this.map.getTargetElement().style.cursor = '';
      }
    }

    const LayersAtPixel: { layer: olLayer<any>, color?: Uint8ClampedArray | Uint8Array }[] = [];
    this.map.forEachLayerAtPixel(evt.pixel, (layer, color) => {
      LayersAtPixel.push({ layer, color });
    }, {
      layerFilter
    });
    LayersAtPixel.forEach((item, index) => {
      // console.log(item, index);
      const topLayer = 0;
      if (index === topLayer) {
        this.layer_on_click(evt, item.layer, item.color);
      }
    });
  }

  layer_on_click(evt: olMapBrowserEvent<PointerEvent>, layer: olLayer<any>, color?: Uint8ClampedArray | Uint8Array) {
    if (layer instanceof olBaseImageLayer) {
      this.raster_on_click(evt, layer, color);
    } else if (layer instanceof olBaseTileLayer) {
      this.raster_on_click(evt, layer, color);
    } else if (layer instanceof olBaseVectorLayer) {
      this.vector_on_click(evt);
    }
  }

  vector_on_click(evt: olMapBrowserEvent<PointerEvent>) {
    const FeaturesAtPixel: { feature: olFeature<any> | olRenderFeature, layer: olLayer<any> }[] = [];
    this.map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
      FeaturesAtPixel.push({ feature, layer });
    }, {
      layerFilter: (layer) => {
        if (layer instanceof olBaseVectorLayer) {
          const olSource: olCluster | olVectorSource<any> | olVectorTile = layer.getSource();
          if (olSource instanceof olCluster) {
            return olSource.getSource() instanceof olVectorSource;
          } else {
            return olSource instanceof olVectorSource || olSource instanceof olVectorTile;
          }
        }
      },
      hitTolerance: this.hitTolerance
    });

    FeaturesAtPixel.forEach((item, index) => {
      const topFeature = 0;
      if (index === topFeature) {
        const layer = item.layer;
        const feature = item.feature;
        const layerpopup: Layer['popup'] = layer.get('popup');
        let properties = {};

        if (layer instanceof olBaseVectorLayer && layerpopup) {
          const childFeatures = feature.getProperties().features;
          if (childFeatures && childFeatures.length === 1) {
            const childFeature = childFeatures[0];
            properties = childFeature.getProperties();
          } else if (childFeatures && childFeatures.length > 1) {
            // zoom in TODO
            // _layer.getProperties()
            // _layer.getGeometry().getExtent()
            const extent = this.getFeaturesExtent(feature.getProperties().features);
            this.setExtent(extent);
            return false;
          } else {
            // type no cluster
            properties = feature.getProperties();
          }

          this.prepareAddPopup(properties, layer, feature, evt, layerpopup);
        }
      }
    });
  }

  raster_on_click(evt: olMapBrowserEvent<PointerEvent>, layer: olLayer<any>, color?: Uint8ClampedArray | Uint8Array) {
    const layerpopup: Layer['popup'] = layer.get('popup');
    let properties: IAnyObject = {};

    if (layerpopup) {
      properties = layer.getProperties();
      properties.evt = evt;
      if (color) {
        properties.color = color;
      }

      this.prepareAddPopup(properties, layer, null, evt, layerpopup);
    }
  }

  private prepareAddPopup(layerProperties: IAnyObject, layer: olLayer<any>, feature: olFeature<any> | olRenderFeature, evt: olMapBrowserEvent<PointerEvent>, layerpopup: Layer['popup']) {
    const args: IPopupArgs = {
      modelName: layerProperties.id,
      properties: layerProperties,
      layer,
      feature,
      event: evt
    };

    let popupProperties = Object.assign({}, layerProperties);
    if (popupProperties.geometry) {
      delete popupProperties.geometry;
    }

    /** Popup is array - limit properties */
    if (Array.isArray(layerpopup)) {
      popupProperties = Object.keys(popupProperties)
        .filter(key => layerpopup.includes(key))
        .reduce((obj, key) => {
          obj[key] = popupProperties[key];
          return obj;
        }, {});
    }
    /** Popup is object - limit properties */
    if (typeof layerpopup === 'object' && !Array.isArray(layerpopup) && layerpopup.filterkeys) {
      popupProperties = Object.keys(popupProperties)
        .filter(key => layerpopup.filterkeys.includes(key))
        .reduce((obj, key) => {
          obj[key] = popupProperties[key];
          return obj;
        }, {});
    }

    if (typeof layerpopup === 'object' && !Array.isArray(layerpopup)) {
      /** overwrite the keys of the layer properties */
      if (layerpopup.properties) {
        const usedProperties = Object.keys(layerpopup.properties);
        if (Array.isArray(usedProperties)) {
          popupProperties = Object.keys(popupProperties)
            /* .filter(key => usedProperties.includes(key)) */
            .reduce((obj, key) => {
              const newKey = layerpopup.properties[key];
              if (newKey) {
                obj[newKey] = popupProperties[key];
              } else {
                obj[key] = popupProperties[key];
              }
              return obj;
            }, {});
        }

        /** function to create html string */
      } else if (layerpopup.pupupFunktion) {
        args.popupFn = layerpopup.pupupFunktion;
      }
    }

    if (typeof layerpopup === 'object' && !Array.isArray(layerpopup)) {
      /** async function where you can paste a html string to the callback */
      if ('asyncPupup' in layerpopup) {
        layerpopup.asyncPupup(popupProperties, (html) => {
          this.addPopup(args, null, html, layerpopup.event, layerpopup.single);
        });
        /** add event if popup object */
      } else {
        this.addPopup(args, popupProperties, null, layerpopup.event, layerpopup.single);
      }

      /** popup is boolean */
    } else {
      this.addPopup(args, popupProperties, null);
    }
  }

  addPopup(args: IPopupArgs, popupObj: IAnyObject, html?: string, event?: 'click' | 'move', removePopups?: boolean) {
    const layerpopup: Layer['popup'] = args.layer.get('popup');
    const content = document.createElement('div');
    content.className = 'ol-popup-content';
    // console.log(args, popupObj, html)
    let popupHtml = '';
    if (args.popupFn) {
      popupHtml = args.popupFn(popupObj);
    }
    else if (html && (!popupObj || Object.keys(popupObj).length === 0)) {
      popupHtml = html;
    } else {
      popupHtml = this.createPopupHtml(popupObj);
    }
    content.innerHTML = popupHtml;

    const container = document.createElement('div');
    container.className = 'ol-popup';
    container.id = `popup_${new Date().getTime()}`;
    container.style.display = 'block';

    if (!event || event !== 'move') {
      const closer = document.createElement('a');
      closer.className = 'ol-popup-closer';
      container.appendChild(closer);

      const closeFunction = () => {
        closer.removeEventListener('click', closeFunction, false);
        this.map.removeOverlay(overlay);
      };
      closer.addEventListener('click', closeFunction, false);
    }


    container.appendChild(content);
    let popupID = null;
    if (args.feature) {
      popupID = olGetUid(args.feature);
    } else if (args.layer) {
      popupID = olGetUid(args.layer);
    } else {
      popupID = `popup_${new Date().getTime()}`;
    }

    const defaultOptions: olOverlayOptions = {
      element: container,
      autoPan: true,
      id: popupID,
      autoPanAnimation: {
        duration: 250
      },
      positioning: 'bottom-center',
      stopEvent: true,
      insertFirst: false,
    };

    let overlayoptions = defaultOptions;

    if (layerpopup && typeof layerpopup === 'object' && !Array.isArray(layerpopup) && layerpopup.options) {
      overlayoptions = Object.assign(defaultOptions, layerpopup.options);
    }

    const overlay = new olOverlay(overlayoptions);
    overlay.set('addEvent', args.event.type);
    overlay.set(OVERLAY_TYPE_KEY, 'popup');

    let coordinate;
    if (args.properties && args.properties.geometry && args.properties.geometry.getType() === 'Point') {
      coordinate = args.properties.geometry.getCoordinates();
    } else {
      coordinate = args.event.coordinate;
    }

    overlay.setPosition(coordinate);

    if (removePopups) {
      this.removeAllPopups();
    } else if (event === 'move' && removePopups !== false) {
      this.removeAllPopups((item) => {
        return item.get('addEvent') === 'pointermove';
      });
    }

    const hasPopup = this.getPopups().find(item => item.getId() === overlay.getId());
    if (hasPopup) {
      this.map.removeOverlay(hasPopup);
    }

    this.map.addOverlay(overlay);
  }

  /** USED in map-ol.component */
  removeAllPopups(filter?: (item: olOverlay) => boolean) {
    let popups = this.getPopups();
    if (filter) {
      popups = this.getPopups().filter(filter);
    }
    popups.forEach((overlay) => {
      if (overlay.get(OVERLAY_TYPE_KEY) === 'popup') {
        this.map.removeOverlay(overlay);
      }
    });
  }

  createPopupHtml(obj: IAnyObject) {
    let htmlStr = '<table>';
    for (const o in obj) {
      if (obj.hasOwnProperty(o)) {
        htmlStr += '<tr><td style="vertical-align: top; padding-right: 7px;"><b>' + o + ': </b></td><td>' + obj[o] +
          '</td></tr>';
      }
    }
    htmlStr = htmlStr + '</table>';
    return htmlStr;
  }

  getPopups(): olOverlay[] {
    const popups = [];
    this.map.getOverlays().getArray().slice(0).forEach((overlay) => {
      if (overlay.get(OVERLAY_TYPE_KEY) === 'popup') {
        popups.push(overlay);
      }
    });
    return popups;
  }
  /**
   *
   * @param extent: [minX, minY, maxX, maxY]
   * @param geographic: boolean
   * @param fitOptions: olFitOptions
   * @returns olExtend: [minX, minY, maxX, maxY]
   */
  setExtent(extent: TGeoExtent, geographic?: boolean, fitOptions?: any): TGeoExtent {
    const projection = (geographic) ? getProjection('EPSG:4326') : getProjection(this.EPSG);
    const transfomExtent = transformExtent(extent, projection, this.map.getView().getProjection().getCode());
    const newFitOptions = {
      size: this.map.getSize(),
      // padding: [100, 200, 100, 100] // Padding (in pixels) to be cleared inside the view. Values in the array are top, right, bottom and left padding. Default is [0, 0, 0, 0].
    };
    if (fitOptions) {
      Object.assign(newFitOptions, fitOptions);
    }
    this.map.getView().fit(transfomExtent, fitOptions);
    return (transfomExtent as TGeoExtent);
  }

  /** USED in map-ol.component */
  /** ol.Coordinate xy */
  setCenter(center: number[], geographic?: boolean): number[] {
    const projection = (geographic) ? getProjection('EPSG:4326') : getProjection(this.EPSG);
    const transfomCenter = transform(center, projection, this.map.getView().getProjection().getCode());
    // console.log('set center in svc', transfomCenter)
    // console.log(this.map.getView().getCenter())
    this.map.getView().setCenter(transfomCenter);
    return transfomCenter;
  }

  /** USED in map-ol.component */
  getCenter(geographic?: boolean) {
    const dstProjection = (geographic) ? getProjection('EPSG:4326') : getProjection(this.EPSG);
    const srcProjection = getProjection(this.map.getView().getProjection().getCode());
    const transfomCenter = transform(this.map.getView().getCenter(), srcProjection, dstProjection);
    return transfomCenter;
  }
  /**
   *
   * @param features: olFeature[]
   * @param geographic: boolean
   * @returns olExtend: [minX, minY, maxX, maxY]
   */
  getFeaturesExtent(features: olFeature<any>[], geographic?: boolean): TGeoExtent {
    const extent = features[0].getGeometry().getExtent().slice(0);
    features.forEach((feature) => {
      olExtend(extent, feature.getGeometry().getExtent());
    });
    if (geographic) {
      const projection = getProjection('EPSG:4326');
      const transfomExtent = transformExtent(extent, this.map.getView().getProjection().getCode(), projection);
      return (transfomExtent as TGeoExtent);
    } else {
      return extent;
    }
  }

  /** USED in map-ol.component */
  /**
   * @param geographic: boolean
   * @returns olExtend: [minX, minY, maxX, maxY]
   */
  getCurrentExtent(geographic?: boolean): TGeoExtent {
    const projection = (geographic) ? getProjection('EPSG:4326') : getProjection(this.EPSG);
    const extent = this.map.getView().calculateExtent();
    const transfomExtent = transformExtent(extent, this.map.getView().getProjection().getCode(), projection);
    return (transfomExtent as TGeoExtent);
  }

  /** USED in map-ol.component */
  setZoom(zoom: number, notifier?: 'map' | 'user') {
    const view = this.map.getView();
    view.setZoom(zoom);
  }

  /** USED in map-ol.component */
  getZoom(): number {
    return this.map.getView().getZoom();
  }

  zoomInOut(value: '-' | '+') {
    const view = this.map.getView();
    if (!view) {
      // the map does not have a view, so we can't act
      // upon it
      return;
    }
    const delta = 1, duration = 250;
    const currentZoom = view.getZoom();
    if (currentZoom !== undefined) {
      const newZoom = view.getConstrainedZoom(currentZoom + delta);
      if (duration > 0) {
        if (view.getAnimating()) {
          view.cancelAnimations();
        }
        view.animate({
          zoom: newZoom,
          duration,
          easing: easeOut
        });
      } else {
        view.setZoom(newZoom);
      }
    }
  }

  geoJsonToFeature(geojson: GeoJSONFeature): olFeature<any> {
    const GEOJSON = new olGeoJSON({
      dataProjection: 'EPSG:4326',
      featureProjection: this.EPSG
    });
    return GEOJSON.readFeature(geojson);
  }

  geoJsonToFeatures(geojson: GeoJSONFeatureCollection): Array<olFeature<any>> {
    const GEOJSON = new olGeoJSON({
      dataProjection: 'EPSG:4326',
      featureProjection: this.EPSG
    });
    return GEOJSON.readFeatures(geojson);
  }

  /**
   * @returns 'olProjection'
   */
  getProjection() {
    return this.map.getView().getProjection();
  }

  /**
   * function to reproject vector features
   * @param source:  olVectorSource
   * @param srcProj: string (e.g. 'EPSG:4326')
   * @param dstProj: string (e.g. 'EPSG:3857')
   */
  reprojectFeatures(source: olVectorSource<any>, srcProj: string, dstProj: string) {
    source.getFeatures().forEach(feature => {
      feature.getGeometry().transform(srcProj, dstProj);
    });
  }

  /**
   * vector layers will be reprojected automatically
   * wms layers will be updated with corresponding proj def in the requests.
   * for other raster layers and for those wms layers which backend does not support target projection, please
   * define initial(default) layer projection, so openlayers will reproject on the client side
   * projection is proj~ProjectionLike
   */
  setProjection(projection: olProjection | string) {
    if (projection) {
      let viewOptions: olViewOptions = {};
      if (this.viewOptions) {
        viewOptions = this.viewOptions;
        viewOptions.minResolution = undefined;
        viewOptions.maxResolution = undefined;
        viewOptions.resolution = undefined;
        viewOptions.resolutions = undefined;
      }
      if (projection instanceof olProjection) {
        viewOptions.projection = projection;
        const newCenter = transform(this.map.getView().getCenter(), this.map.getView().getProjection(), projection); // get center coordinates in the new projection
        viewOptions.center = newCenter; // this.map.getView().getCenter();
        // _viewOptions.extent = projection.getExtent();// || undefined;
        viewOptions.zoom = this.map.getView().getZoom();
      } else if (typeof projection === 'string') {
        viewOptions.projection = projection;
        viewOptions.center = this.map.getView().getCenter();
        viewOptions.zoom = this.map.getView().getZoom();
      }
      const view = new olView(viewOptions);
      const oldProjection = this.EPSG;
      this.EPSG = view.getProjection().getCode();
      this.map.setView(view);
      this.view = this.map.getView();

      // reprojecting vector layers
      this.map.getLayers().getArray().forEach((layerGroup: olLayerGroup) => {
        layerGroup.getLayers().getArray().forEach(layer => {
          if (layer instanceof olLayer) {
            let source = layer.getSource();
            // check for nested sources, e.g. cluster or cluster of clusters etc
            while (source['source']) {
              source = source['source'];
            }
            if (source instanceof olVectorSource) {
              this.reprojectFeatures(source, oldProjection, this.EPSG);
            }
          }
        });
      });
      this.projectionChange.next(this.getProjection());
    } else {
      // console.log('projection code is undefined');
    }
  }

  registerProjection(projDef: IProjDef) {
    proj4.defs(projDef.code, projDef.proj4js);
    olRegister(proj4);
  }

  getOlProjection(projDef: IProjDef): olProjection {
    return new olProjection({
      code: projDef.code,
      extent: projDef.extent ? projDef.extent : undefined,
      worldExtent: projDef.worldExtent ? projDef.worldExtent : undefined,
      global: projDef.global ? projDef.global : false,
      units: projDef.units ? projDef.units : undefined
    });
  }

  private keysToUppercase<T>(obj: IAnyObject) {
    Object.keys(obj).forEach((key) => {
      const k = key.toUpperCase();
      if (k !== key) {
        obj[k] = obj[key];
        delete obj[key];
      }
    });
    return obj as T;
  }
}
