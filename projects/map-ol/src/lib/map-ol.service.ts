import { Injectable } from '@angular/core';


import { Layer, VectorLayer, CustomLayer, RasterLayer, popup, WmtsLayer, WmsLayer, TGeoExtent } from '@dlr-eoc/services-layers';

import olMap from 'ol/Map';
import olView from 'ol/View';
import { ViewOptions as olViewOptions } from 'ol/View';

import olBaseLayer from 'ol/layer/Base';
import olLayer from 'ol/layer/Layer';
import olLayerGroup from 'ol/layer/Group';
import olOverlay from 'ol/Overlay';

import olBaseTileLayer from 'ol/layer/BaseTile';
import olBaseVectorLayer from 'ol/layer/BaseVector';
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
import olTileGrid from 'ol/tilegrid/TileGrid';
import olVectorSource from 'ol/source/Vector';
import olTileJSON from 'ol/source/TileJSON';
import olCluster from 'ol/source/Cluster';
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

import { DragBox } from 'ol/interaction';
import { Subject } from 'rxjs';


export declare type Tgroupfiltertype = 'baselayers' | 'layers' | 'overlays' | 'Baselayers' | 'Overlays' | 'Layers';

@Injectable({
  providedIn: 'root'
})
export class MapOlService {
  public map: olMap; // ol.Map;
  public view: olView;
  private viewOptions: olViewOptions;
  public EPSG: string;
  private hitTolerance = 0;
  /** 'olProjection' */
  public projectionChange = new Subject<olProjection>();
  constructor() {
    this.map = new olMap({ controls: [] });
    this.view = new olView();
    this.EPSG = 'EPSG:3857'; // 'EPSG:4326'; EPSG:3857
    // this.createMap();
  }

  /** USED in map-ol.component */
  public createMap(target?: HTMLElement) {
    const zoom = 0;
    const center = {
      lat: 0,
      lon: 0
    };

    const baselayerGroup = new olLayerGroup({
      title: 'Base maps',
      type: 'baselayers',
      layers: []
    } as any);


    const layersGroup = new olLayerGroup({
      title: 'Layers',
      type: 'layers',
      layers: []
    } as any);

    // ---------------------------------------------------------------------------------------------------
    const overlayGroup = new olLayerGroup({
      title: 'Overlays',
      type: 'overlays',
      layers: []
    } as any);

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

  public setHitTolerance(tolerance: number) {
    this.hitTolerance = tolerance;
  }

  public getHitTolerance() {
    return this.hitTolerance;
  }

  /**
   * See this example:
   * https://openlayers.org/en/latest/examples/box-selection.html
   */
  public addBboxSelection(conditionForDrawing: (evt: any) => boolean, onBoxStart: () => void, onBoxEnd: (ext) => void) {

    const dragBox = new DragBox({
      condition: conditionForDrawing,
      className: 'ol-drag-select'
    });

    dragBox.on('boxstart', () => {
      onBoxStart();
    });

    dragBox.on('boxend', () => {
      const extent = dragBox.getGeometry().getExtent();
      onBoxEnd(extent);
    });

    this.map.addInteraction(dragBox);
  }

  /**
   * get an array of olLayers from a group type
   */
  public getLayers(type: Tgroupfiltertype) {
    const lowerType = type.toLowerCase() as Tgroupfiltertype;
    let layers: olBaseLayer[];
    this.map.getLayers().getArray().forEach((layerGroup: olLayerGroup) => {
      if (layerGroup.get('type') === lowerType) {
        layers = layerGroup.getLayers().getArray();
      }
    });
    return layers;
  }

  public getLayerByKey(key: { key: string, value: string }, type: Tgroupfiltertype) {
    const lowerType = type.toLowerCase() as Tgroupfiltertype;
    const layers = this.getLayers(lowerType);
    let layer;
    layers.forEach((item) => {
      if (item.get(key.key) && item.get(key.key) === key.value) {
        layer = item;
      }
    });
    return layer;
  }

  /**
   * add a olLayer to a group if it is not there
   */
  public addLayer(layer: olBaseLayer, type: Tgroupfiltertype) {
    const lowerType = type.toLowerCase() as Tgroupfiltertype;
    let layers;
    this.map.getLayers().getArray().forEach((layerGroup: olLayerGroup) => {
      if (layerGroup.get('type') === lowerType) {
        if (!this.isLayerInGroup(layer, layerGroup)) {
          layers = layerGroup.getLayers().getArray();
          layers.push(layer);
          layerGroup.setLayers(new olCollection(layers));
        }
      }
    });
    return layers;
  }

  private isLayerInGroup(layer: olBaseLayer, layerGroup: olLayerGroup) {
    const layers = layerGroup.getLayers().getArray();
    const haseLayer = layers.filter(l => l.get('id') === layer.get('id'));
    if (haseLayer.length) {
      return true;
    } else {
      return false;
    }
  }


  /**
   * add a array of olLayers to a group if they are not there
   */
  public addLayers(layers: olBaseLayer[], type: Tgroupfiltertype) {
    const lowerType = type.toLocaleLowerCase() as Tgroupfiltertype;
    this.map.getLayers().forEach((layerGroup: olLayerGroup) => {
      if (layerGroup.get('type') === lowerType) {
        const groupLayers = layerGroup.getLayers();

        if (groupLayers.getLength() > 0) {
          const mergLayers = layerGroup.getLayers().getArray();
          layers.map(layer => {
            if (!this.isLayerInGroup(layer, layerGroup)) {
              mergLayers.push(layer);
            }
          });
          layerGroup.setLayers(new olCollection(mergLayers));
        } else {
          layerGroup.setLayers(new olCollection(layers));
        }
      }
    });
    return layers;
  }

  /**
   * reset a group with an array of olLayers
   */
  public setLayers(layers: olBaseLayer[], type: Tgroupfiltertype) {
    const lowerType = type.toLocaleLowerCase() as Tgroupfiltertype;
    this.map.getLayers().forEach((layerGroup: olLayerGroup) => {
      if (layerGroup.get('type') === lowerType) {
        layerGroup.setLayers(new olCollection(layers));
      }
    });
    return layers;
  }


  public removeLayerByKey(key: { key: string, value: string }, type: Tgroupfiltertype) {
    const lowerType = type.toLocaleLowerCase() as Tgroupfiltertype;
    this.map.getLayers().forEach((layerGroup: olLayerGroup) => {
      if (layerGroup.get('type') === lowerType) {
        const groupLayers = layerGroup.getLayers();
        let removeLayer;
        groupLayers.forEach((layer) => {
          if (layer.get(key.key) && layer.get(key.key) === key.value) {
            removeLayer = layer;
          }
        });
        if (removeLayer) {
          groupLayers.remove(removeLayer);
          layerGroup.setLayers(groupLayers);
        }
      }
    });
  }

  public updateLayerByKey(key: { key: string, value: string }, newLayer: olBaseLayer, type: Tgroupfiltertype) {
    const lowerType = type.toLocaleLowerCase() as Tgroupfiltertype;
    this.map.getLayers().forEach((layerGroup: olLayerGroup) => {
      if (layerGroup.get('type') === lowerType) {
        const groupLayers = layerGroup.getLayers();
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
        layerGroup.setLayers(groupLayers);
      }
    });
  }

  public removeAllLayers(type: Tgroupfiltertype) {
    const lowerType = type.toLowerCase() as Tgroupfiltertype;
    let layers;
    this.map.getLayers().getArray().forEach((layerGroup: olLayerGroup) => {
      if (layerGroup.get('type') === lowerType) {
        layers = layerGroup.getLayers();
        layers.clear();
      }
    });

  }

  /**
   * This function resets/adds all olLayers of a type with the new UKIS-Layers
   *
   * if only one group of them map is used and setLayers is called then the map flickers!
   * this is because of all layers are new created and the have all new ol_uid's
   */
  public setUkisLayers(layers: Array<Layer>, type: Tgroupfiltertype) {
    const lowerType = type.toLowerCase() as Tgroupfiltertype;
    const tempLayers: olBaseLayer[] = [];
    console.log(layers)
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
      const newTempLayer: { type: Tgroupfiltertype, layers: olBaseLayer[] } = {
        type: lowerType, layers: tempLayers
      };
      return newTempLayer;
    }
  }

  /** This function resets/adds a olLayer of a type with the new UKIS-Layer */
  public setUkisLayer(newLayer: Layer, type?: Tgroupfiltertype): void {
    if (!type) {
      type = newLayer.filtertype;
    }
    const lowerType = type.toLowerCase() as Tgroupfiltertype;
    const oldLayers = this.getLayers(lowerType);
    const oldLayer = oldLayers.find(l => l.get('id') === newLayer.id);
    const newOlLayer = this.create_layers(newLayer);
    if (newOlLayer) {
      this.removeLayerByKey({ key: 'id', value: oldLayer.get('id') }, type);
      this.addLayer(newOlLayer, type);
    }
  }

  public updateUkisLayer(newLayer: Layer, type?: Tgroupfiltertype): void {
    if (!type) {
      type = newLayer.filtertype;
    }
    const lowerType = type.toLowerCase() as Tgroupfiltertype;
    const oldLayers = this.getLayers(lowerType);
    const oldLayer = oldLayers.find(l => l.get('id') === newLayer.id);
    const newOlLayer = this.create_layers(newLayer);
    if (newOlLayer) {
      this.updateLayerByKey({ key: 'id', value: oldLayer.get('id') }, newOlLayer, type);
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

    const layeroptions: any = {
      type: 'xyz',
      name: l.name,
      id: l.id,
      visible: l.visible,
      legendImg: l.legendImg,
      opacity: l.opacity || 1,
      zIndex: 1,
      source: olSource
    };

    if (l.popup) {
      layeroptions.popup = l.popup;
    }

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

    return new olTileLayer(layeroptions);
  }

  private create_wms_layer(l: WmsLayer): olTileLayer {

    const tileOptions: olTileWMSOptions = {
      /** use assign here otherwise params is passed by object reference to the openlayers layer! */
      params: Object.assign({}, l.params), // params: {} = { ...l.params } ~ same as assign destructuring
      wrapX: false
    };

    if (l.tileSize) {
      // console.log(l.tileSize)
      tileOptions['tileGrid'] = this.getTileGrid<olTileGrid>('default', null, l.tileSize);
      delete tileOptions.params['tileSize'];
    }

    // console.log(tile_options);

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

    const layeroptions: any = {
      type: 'wms',
      name: l.name,
      id: l.id,
      visible: l.visible,
      legendImg: l.legendImg,
      opacity: l.opacity || 1,
      zIndex: 1,
      source: olSource
    };

    if (l.popup) {
      layeroptions.popup = l.popup;
      /**
       * ol 6.x problem if popup (map.forEachLayerAtPixel) use className
       * https://github.com/openlayers/openlayers/releases/tag/v6.0.0
       */
      layeroptions.className = l.id;
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

    if (l.bbox) {
      layeroptions.extent = transformExtent(l.bbox, 'EPSG:4326', this.map.getView().getProjection().getCode());
    }
    const newlayer = new olTileLayer(layeroptions);
    return newlayer;
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

      const layeroptions: any = {
        type: 'wmts',
        name: l.name,
        id: l.id,
        visible: l.visible,
        legendImg: l.legendImg,
        opacity: l.opacity || 1,
        zIndex: 1,
        source: olSource
      };

      if (l.popup) {
        layeroptions.popup = l.popup;
        /**
         * ol 6.x problem if popup (map.forEachLayerAtPixel) use className
         * https://github.com/openlayers/openlayers/releases/tag/v6.0.0
         */
        layeroptions.className = l.id;
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

      if (l.bbox) {
        layeroptions.extent = transformExtent(l.bbox, 'EPSG:4326', this.map.getView().getProjection().getCode());
      }

      return new olTileLayer(layeroptions);
    } else {
      const layer = l as Layer;
      console.error(`layer with id: ${layer.id} and type ${layer.type} is no instanceof WmtsLayer!`);
    }
  }


  private create_geojson_layer(l: VectorLayer) {
    let olSource;
    if (l.data) {
      olSource = new olVectorSource({
        features: this.geoJsonToFeatures(l.data),
        format: new olGeoJSON(),
        wrapX: false
      });
    } else if (l.url) {
      olSource = new olTileJSON({
        url: l.url,
        crossOrigin: 'anonymous',
        wrapX: false
      });
    }

    if (l.continuousWorld) {
      olSource.set('wrapX', l.continuousWorld);
    }

    const layeroptions = {
      type: 'geojson',
      name: l.name,
      id: l.id,
      visible: l.visible,
      legendImg: l.legendImg,
      opacity: l.opacity || 1,
      zIndex: 1,
      source: olSource
    } as any;

    if (l.popup) {
      layeroptions.popup = l.popup;
      /**
       * ol 6.x problem if popup (map.forEachLayerAtPixel) use className
       * https://github.com/openlayers/openlayers/releases/tag/v6.0.0
       */
      layeroptions.className = l.id;
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

    if (l.bbox) {
      layeroptions.extent = transformExtent(l.bbox, 'EPSG:4326', this.map.getView().getProjection().getCode());
    }

    if (l.cluster) {
      const clusteroptions: any = {};
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

    return new olVectorLayer(layeroptions);
  }

  private create_custom_layer(l: CustomLayer) {
    if (l.custom_layer) {
      const layer = (l.custom_layer as olBaseLayer);

      if (layer instanceof olLayer) {
        const olSource = layer.getSource();
        olSource.set('wrapX', false);

        if (l.attribution) {
          olSource.setAttributions([l.attribution]);
        }

        if (l.continuousWorld) {
          olSource.set('wrapX', l.continuousWorld);
        }
      }

      const layeroptions = {
        type: 'custom',
        name: l.name,
        id: l.id,
        visible: l.visible,
        legendImg: l.legendImg,
        opacity: l.opacity || 1,
        zIndex: 1,
      } as any;

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

      if (l.popup) {
        layeroptions.popup = l.popup;
        /**
         * ol 6.x problem if popup (map.forEachLayerAtPixel) use className
         * https://github.com/openlayers/openlayers/releases/tag/v6.0.0
         */
        layeroptions.className = l.id;
      }

      if (l.bbox) {
        layeroptions.extent = transformExtent(l.bbox, 'EPSG:4326', this.map.getView().getProjection().getCode());
      }

      layer.setProperties(layeroptions);
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
        return l;
      }
    });
  }

  public getTileGrid<T>(type: 'wmts' | 'default' = 'default', resolutionLevels?: number, tileSize?: number, matrixIdPrefix?: string, resolutions?: Array<string | number>, matrixIds?: Array<string | number>): T {
    const newResolutionLevels = resolutionLevels || DEFAULT_MAX_ZOOM;
    const newTileSize = tileSize || DEFAULT_TILE_SIZE;
    const newMatrixIdPrefix = matrixIdPrefix || '';

    const projectionExtent = this.getProjection().getExtent();
    const defaultResolutions = this.resolutionsFromExtent(projectionExtent, newResolutionLevels, newTileSize);
    const defaultMatrixIds = this.matrixIdsFromResolutions(defaultResolutions.length, newMatrixIdPrefix);
    /** how to generate matrix ids is not in the wms GetCapabilities ?? */

    const tileGridOptions: any = {
      extent: projectionExtent,
      origin: olGetTopLeft(projectionExtent),
      resolutions: resolutions || defaultResolutions,
      tileSize: [newTileSize, newTileSize]
    };

    if (type === 'wmts') {
      tileGridOptions.matrixIds = matrixIds || defaultMatrixIds;
      const grid = new olWMTSTileGrid(tileGridOptions);
      return grid as unknown as T;
    } else if (type === 'default') {
      const grid = new olTileGrid(tileGridOptions);
      return grid as unknown as T;
    }
  }

  public vector_on_click(evt) {
    const FeaturesAtPixel = [];
    this.map.forEachFeatureAtPixel(evt.pixel, (featureLayer, layer) => {
      // console.log(evt, _layer, layer, layer.get('type'))
      FeaturesAtPixel.push({ _layer: featureLayer, layer });
    }, {
      layerFilter: (layer) => {
        if (layer instanceof olBaseVectorLayer) {
          const olSource: olCluster | olVectorSource<any> | olVectorTile = layer.getSource();
          if (olSource instanceof olCluster) {
            return (olSource as any).getSource() instanceof olVectorSource;
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
        const layer = item.layer, _layer = item._layer;
        const layerpopup: popup = layer.get('popup');
        let properties: any = {};

        if (layer instanceof olBaseVectorLayer && layerpopup) {
          const features = _layer.getProperties().features;
          if (features && features.length === 1) {
            const feature = features[0];
            properties = feature.getProperties();
          } else if (features && features.length > 1) {
            // zoom in TODO
            // _layer.getProperties()
            // _layer.getGeometry().getExtent()
            const extent = this.getFeaturesExtent(_layer.getProperties().features);
            // console.log(_layer, extent)
            this.setExtent(extent);
            return false;
          } else {
            // type no cluster
            properties = _layer.getProperties();
          }

          const args = {
            modelName: properties.id,
            properties,
            layer: _layer,
            event: evt
          };

          if (layerpopup.pupupFunktion) {
            args['popupFn'] = layerpopup.pupupFunktion;
          }

          let popupproperties = Object.assign({}, properties);

          // console.log(popupproperties);
          if (layerpopup['properties']) {
            if (Array.isArray(Object.keys(layerpopup['properties']))) {
              popupproperties = Object.keys(popupproperties)
                .filter(key => Object.keys(layerpopup['properties']).includes(key))
                .reduce((obj, key) => {
                  // obj[key] = popupproperties[key];
                  const newKey = layerpopup['properties'][key];
                  obj[newKey] = popupproperties[key];
                  return obj;
                }, {});
            }
          }
          if (popupproperties.geometry) {
            delete popupproperties.geometry;
          }
          if (layerpopup.asyncPupup) {
            layerpopup.asyncPupup(popupproperties, (html) => {
              this.addPopup(args, popupproperties, html);
            });
          } else {
            this.addPopup(args, popupproperties);
          }
        }
      }
    });
  }

  public raster_on_click(evt, layer, color?) {
    const layerpopup: popup = layer.get('popup');
    let properties: any = {};

    if (layerpopup) {
      properties = layer.getProperties();
      properties.evt = evt;
      if (color) {
        properties.color = color;
      }

      const args = {
        modelName: properties.id,
        properties,
        layer,
        event: evt
      };

      if (layerpopup.pupupFunktion) {
        args['popupFn'] = layerpopup.pupupFunktion;
      }

      let popupproperties = Object.assign({}, properties);

      // console.log(popupproperties);
      if (layerpopup['properties']) {
        if (Array.isArray(Object.keys(layerpopup['properties']))) {
          popupproperties = Object.keys(popupproperties)
            .filter(key => Object.keys(layerpopup['properties']).includes(key))
            .reduce((obj, key) => {
              // obj[key] = popupproperties[key];
              const newKey = layerpopup['properties'][key];
              obj[newKey] = popupproperties[key];
              return obj;
            }, {});
        }
      }
      if (popupproperties.geometry) {
        delete popupproperties.geometry;
      }
      // console.log(popupproperties);

      if (layerpopup.asyncPupup) {
        layerpopup.asyncPupup(popupproperties, (html) => {
          if (html) {
            this.addPopup(args, null, html);
          }
        });
      } else {
        this.addPopup(args, popupproperties);
      }
    }
  }

  /** USED in map-ol.component */
  public layers_on_click(evt) {
    // pixel, callback, opt_options
    const LayersAtPixel = [];
    this.map.forEachLayerAtPixel(evt.pixel, (layer, color) => {
      LayersAtPixel.push({ layer, color });
    }, {
      layerFilter: (layer) => {
        // try to catch CORS error in getImageData!!!
        // layer.sourceChangeKey_ && layer.sourceChangeKey_.target && layer.sourceChangeKey_.target.crossOrigin != "anonymous"
        // console.log(layer)
        if (layer.get('popup')) {
          return true;
        }
      }
    });
    LayersAtPixel.forEach((item, index) => {
      // console.log(item, index);
      const topLayer = 0;
      if (index === topLayer) {
        this.layer_on_click(evt, item.layer, item.color);
      }
    });
  }


  public layer_on_click(evt, layer, color?) {
    if (layer instanceof olBaseImageLayer) {
      this.raster_on_click(evt, layer, color);
    } else if (layer instanceof olBaseTileLayer) {
      this.raster_on_click(evt, layer, color);
    } else if (layer instanceof olBaseVectorLayer) {
      this.vector_on_click(evt);
    }
  }

  public addPopup(args: any, popupObj: any, html?: string) {
    const content = document.createElement('div');
    content.className = 'ol-popup-content';

    let popupHtml = '';
    if (args.popupFn) {
      popupHtml = args.popupFn(popupObj);
    } else if (html && !popupObj) {
      popupHtml = html;
    } else {
      popupHtml = this.createPopupHtml(popupObj);
    }
    content.innerHTML = popupHtml;

    const closer = document.createElement('a');
    closer.className = 'ol-popup-closer';

    const container = document.createElement('div');
    container.className = 'ol-popup';
    container.id = `popup_${new Date().getTime()}`;
    container.style.display = 'block';

    container.appendChild(closer);
    container.appendChild(content);

    const overlayoptions = {
      element: container,
      autoPan: true,
      id: (args.layer && args.layer.ol_uid) ? args.layer.ol_uid : `popup_${new Date().getTime()}`,
      autoPanAnimation: {
        duration: 250
      },
      positioning: 'bottom-center',
      stopEvent: true,
      insertFirst: false
    };

    const overlay = new olOverlay(overlayoptions as any);
    overlay.set('type', 'popup');

    let coordinate;
    if (args.properties && args.properties.geometry && args.properties.geometry.getType() === 'Point') {
      coordinate = args.properties.geometry.getCoordinates();
    } else {
      coordinate = args.event.coordinate;
    }

    overlay.setPosition(coordinate);
    const closeFunction = () => {
      closer.removeEventListener('click', closeFunction, false);
      this.map.removeOverlay(overlay);
    };
    closer.addEventListener('click', closeFunction, false);

    this.map.addOverlay(overlay);
  }

  /** USED in map-ol.component */
  public removeAllPopups() {
    const popups = this.getPopups();
    popups.forEach((overlay) => {
      if (overlay.get('type') === 'popup') {
        this.map.removeOverlay(overlay);
      }
    });
  }

  public createPopupHtml(obj: any) {
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

  public getPopups(): olOverlay[] {
    const popups = [];
    this.map.getOverlays().getArray().slice(0).forEach((overlay) => {
      if (overlay.get('type') === 'popup') {
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
  public setExtent(extent: TGeoExtent, geographic?: boolean, fitOptions?: any): TGeoExtent {
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
  public setCenter(center: number[], geographic?: boolean): number[] {
    const projection = (geographic) ? getProjection('EPSG:4326') : getProjection(this.EPSG);
    const transfomCenter = transform(center, projection, this.map.getView().getProjection().getCode());
    // console.log('set center in svc', transfomCenter)
    // console.log(this.map.getView().getCenter())
    this.map.getView().setCenter(transfomCenter);
    return transfomCenter;
  }

  /** USED in map-ol.component */
  public getCenter(geographic?: boolean): any {
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
  public getFeaturesExtent(features: olFeature<any>[], geographic?: boolean): TGeoExtent {
    const extent: any = features[0].getGeometry().getExtent().slice(0);
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
  public getCurrentExtent(geographic?: boolean): TGeoExtent {
    const projection = (geographic) ? getProjection('EPSG:4326') : getProjection(this.EPSG);
    const extent = this.map.getView().calculateExtent();
    const transfomExtent = transformExtent(extent, this.map.getView().getProjection().getCode(), projection);
    return (transfomExtent as TGeoExtent);
  }

  /** USED in map-ol.component */
  public setZoom(zoom: number, notifier?: 'map' | 'user') {
    const view = this.map.getView();
    view.setZoom(zoom);
  }

  /** USED in map-ol.component */
  public getZoom(): number {
    return this.map.getView().getZoom();
  }

  public zoomInOut(value: '-' | '+') {
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

  public geoJsonToFeature(geojson: any): olFeature<any> {
    const GEOJSON = new olGeoJSON({
      dataProjection: 'EPSG:4326',
      featureProjection: this.EPSG
    });
    return GEOJSON.readFeature(geojson);
  }

  public geoJsonToFeatures(geojson: any): Array<olFeature<any>> {
    const GEOJSON = new olGeoJSON({
      dataProjection: 'EPSG:4326',
      featureProjection: this.EPSG
    });
    return GEOJSON.readFeatures(geojson);
  }

  /**
   * @returns 'olProjection'
   */
  public getProjection() {
    return this.map.getView().getProjection();
  }

  /**
   * function to reproject vector features
   * @param source:  olVectorSource
   * @param srcProj: string (e.g. 'EPSG:4326')
   * @param dstProj: string (e.g. 'EPSG:3857')
   */
  public reprojectFeatures(source: olVectorSource<any>, srcProj: string, dstProj: string) {
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
  public setProjection(projection: olProjection | string) {
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

  public registerProjection(projDef: any) {
    proj4.defs(projDef.code, projDef.proj4js);
    olRegister(proj4);
  }

  public getOlProjection(projDef: any): olProjection {
    return new olProjection({
      code: projDef.code,
      extent: projDef.extent ? projDef.extent : undefined,
      worldExtent: projDef.worldExtent ? projDef.worldExtent : undefined,
      global: projDef.global ? projDef.global : false,
      units: projDef.units ? projDef.units : undefined
    });
  }

  private keysToUppercase<T>(obj: { [k: string]: any }) {
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
