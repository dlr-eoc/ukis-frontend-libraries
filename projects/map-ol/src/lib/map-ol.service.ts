import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, ComponentRef } from '@angular/core';


import { Layer, VectorLayer, CustomLayer, RasterLayer, popup, WmtsLayer, WmsLayer, TGeoExtent } from '@dlr-eoc/services-layers';

import olMap from 'ol/Map';
import olView from 'ol/View';
import { ViewOptions as olViewOptions } from 'ol/View';

import olBaseLayer from 'ol/layer/Base';
import olSource from 'ol/source/Source';
import olGeometry from 'ol/geom/Geometry';
import olLayer from 'ol/layer/Layer';
import olLayerGroup from 'ol/layer/Group';
import olOverlay from 'ol/Overlay';
import { Options as olOverlayOptions } from 'ol/Overlay';

import olBaseTileLayer from 'ol/layer/BaseTile';
import olBaseVectorLayer from 'ol/layer/BaseVector';
import olBaseImageLayer from 'ol/layer/BaseImage';

import olTileLayer from 'ol/layer/Tile';
import olVectorLayer from 'ol/layer/Vector';
import olVectorTile from 'ol/source/VectorTile';


import olXYZ from 'ol/source/XYZ';
import olTileSource from 'ol/source/Tile';

import { Options as olXYZOptions } from 'ol/source/XYZ';
import olTileWMS from 'ol/source/TileWMS';
import olTileImageSource from 'ol/source/TileImage';
import olImageSource from "ol/source/Image";
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
import { Options as olProjectionOptions } from 'ol/proj/Projection';
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
import olMapBrowserEvent from 'ol/MapBrowserEvent';
import olRenderFeature from 'ol/render/Feature';
import olEvent from 'ol/events/Event';
import { Options as DragBoxOptions } from 'ol/interaction/DragBox';
import { getUid as olGetUid } from 'ol/util';
import { Subject } from 'rxjs';
import { flattenLayers } from '@dlr-eoc/utils-maps';
import OverlayPositioning from 'ol/OverlayPositioning';


export declare type Tgroupfiltertype = 'baselayers' | 'layers' | 'overlays' | 'Baselayers' | 'Overlays' | 'Layers';
const OVERLAY_TYPE_KEY = 'type';
const FILTER_TYPE_KEY = 'filtertype';
const ID_KEY = 'id';
const TITLE_KEY = 'title';
const WebMercator = 'EPSG:3857';
const WGS84 = 'EPSG:4326';

/**
 * While @dlr-eoc/services-layers.popup already contains instructions about how to build a popup,
 * IPopupArgs adds additional, map-ol-specific context like the olLayer, the feature, and the olMapBrowserEvent.
 */
export interface IPopupArgs {
  modelName: string;
  properties: popup['properties']; // will be filtered by popup['filterkeys'] (if given)
  layer: olLayer<any>;
  feature?: olFeature<any> | olRenderFeature;
  event: olMapBrowserEvent<PointerEvent>;
  popupFn?: popup['pupupFunktion'];
  dynamicPopup?: popup['dynamicPopup'];
}


export interface IDynamicPopupArgs {
  properties: popup['properties']; // will be filtered by popup['filterkeys'] (if given)
  layer: IPopupArgs['layer'];
  feature?: IPopupArgs['feature'];
  event: olMapBrowserEvent<PointerEvent>;
  dynamicPopup: popup['dynamicPopup'];
}

type ItemAtPixel = { layer: olLayer<any>, color?: Uint8ClampedArray | Uint8Array };

@Injectable({
  providedIn: 'root'
})
export class MapOlService {
  public map: olMap; // ol.Map;
  public view: olView;
  private viewOptions: olViewOptions;
  public EPSG: string;
  private hitTolerance = 0;
  private hitLayerCurr = null;
  private hitLayerPrev = null;
  /** 'olProjection' */
  public projectionChange = new Subject<olProjection>();
  /**
   * This object keeps track of currently bound angular-components that are being used as popups.
   * We keep a reference to them here so that we can remove them again after they are no longer displayed.
   */
  private dynamicPopupComponents: Map<string, ComponentRef<any>> = new Map();

  constructor(
    private crf: ComponentFactoryResolver,
    private app: ApplicationRef,
    private injector: Injector
  ) {
    this.map = new olMap({ controls: [] });
    this.view = new olView();
    this.EPSG = WebMercator;
  }

  /**
   * if this is used in an angular component then set the target after the view is created
   * e.g. this.map.setTarget(this.mapDivView.nativeElement) in ngAfterViewInit()
   */
  public createMap(target?: HTMLElement) {
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
      center: transform([center.lon, center.lat], WGS84, this.EPSG),
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
    if (target) {
      this.map.setTarget(target);
    }
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
  public addBboxSelection(conditionForDrawing: (evt: any) => boolean, onBoxStart?: (evt: olEvent) => void, onBoxEnd?: (ext, evt: olEvent) => void, dragBoxOptions?: DragBoxOptions) {
    const options = {
      className: 'ol-drag-select',
      condition: conditionForDrawing,
    };
    Object.assign(options, dragBoxOptions);
    const dragBox = new DragBox(dragBoxOptions);
    if (onBoxStart) {
      /** TODO: check Types on the next ol update */
      (dragBox as any).on('boxstart', (evt) => {
        onBoxStart(evt);
      });
    }

    if (onBoxEnd) {
      dragBox.on('boxend', (evt) => {
        const extent = dragBox.getGeometry().getExtent();
        onBoxEnd(extent, evt);
      });
    }

    this.map.addInteraction(dragBox);
    return dragBox;
  }

  /**
   * get an array of olLayers from a group type
   */
  public getLayers(filtertype: Tgroupfiltertype) {
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
    let layers: olBaseLayer[];
    this.map.getLayers().getArray().forEach((layerGroup: olLayerGroup) => {
      if (layerGroup.get(FILTER_TYPE_KEY) === lowerType) {
        layers = layerGroup.getLayers().getArray();
      }
    });
    return layers;
  }

  private getLayersFromGroup(group: olLayerGroup, filtertype?: string, recursive = false) {
    const layers = group.getLayers().getArray();
    let tempLayers = layers;
    if (recursive) {
      let groups: olBaseLayer[] = [].concat(layers);
      layers.forEach(l => {
        if (l instanceof olLayerGroup) {
          groups = groups.concat(this.getLayersFromGroup(l, filtertype, true));
        }
      });
      tempLayers = groups;
    }

    if (filtertype) {
      return tempLayers.filter(l => l.get(FILTER_TYPE_KEY) && l.get(FILTER_TYPE_KEY).toLowerCase() === filtertype.toLowerCase());
    } else {
      return tempLayers;
    }
  }

  public getLayerByKey(key: { key: string, value: string }, filtertype?: Tgroupfiltertype) {
    const layers = this.getLayersFromGroup(this.map.getLayerGroup(), filtertype);
    const flattenedLayers = flattenLayers(layers);
    const keyLayers: olBaseLayer[] = [];
    flattenedLayers.forEach((item) => {
      if (item.get(key.key) && item.get(key.key) === key.value) {
        if (keyLayers.indexOf(item) === -1) {
          keyLayers.push(item);
        }
      }
    });
    if (!keyLayers.length) {
      const subLayers = this.getLayersFromGroup(this.map.getLayerGroup(), filtertype, true); // (map.getLayerGroup(), filtertype, filtertypeKey, true);
      if (subLayers.length) {
        subLayers.forEach((item) => {
          if (item.get(key.key) && item.get(key.key) === key.value) {
            if (keyLayers.indexOf(item) === -1) {
              keyLayers.push(item);
            }
          }
        });
      }
    }

    // there could maybe more the one layers with the same key!!!!
    if (keyLayers.length === 1) {
      return keyLayers[0];
    } else {
      return null;
    }
  }


  /**
   * set a FilterType to a Layer or Group recursively
   *
   * @param key [key='filtertype']
   */
  private setRecursiveKey(layer: olBaseLayer, value: string, key = FILTER_TYPE_KEY) {
    layer.set(key, value);
    if (layer instanceof olLayerGroup) {
      layer.getLayers().forEach(l => {
        this.setRecursiveKey(l, value, key);
      });
    }
  }

  /**
   * add a olLayer to a group if it is not there
   */
  public addLayer(layer: olBaseLayer, filtertype: Tgroupfiltertype) {
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
    let layers;
    this.map.getLayers().getArray().forEach((layerGroup: olLayerGroup) => {
      if (layerGroup.get(FILTER_TYPE_KEY) === lowerType) {
        if (!this.isLayerInGroup(layer, layerGroup)) {
          layers = layerGroup.getLayers().getArray();
          this.setRecursiveKey(layer, lowerType, FILTER_TYPE_KEY);
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
    * Get all direkt Layer Groups added to the map
    *
    * @param filtertypeKey [filtertypeKey='filtertype']
    */
  private getLayerGroups(filtertype?: string) {
    const layerGroups: olLayerGroup[] = [];
    this.map.getLayers().forEach((lg: olLayerGroup | olBaseLayer) => {
      if (lg instanceof olLayerGroup) {
        if (filtertype) {
          if (lg.get(FILTER_TYPE_KEY) && lg.get(FILTER_TYPE_KEY).toLowerCase() === filtertype.toLowerCase()) {
            layerGroups.push(lg);
          }
        } else {
          layerGroups.push(lg);
        }
      }
    });
    return layerGroups;
  }


  /**
   * add a array of olLayers to a group if they are not there
   */
  public addLayers(layers: olBaseLayer[], filtertype: Tgroupfiltertype) {
    const lowerType = filtertype.toLocaleLowerCase() as Tgroupfiltertype;
    let newLayers: olBaseLayer[];
    const layerGroups = this.getLayerGroups(lowerType);
    layerGroups.forEach(lg => {
      const groupLayers = lg.getLayers();
      if (groupLayers.getLength() > 0) {
        // I think doing it like this should be more performant like as using the addLayer in a loop
        newLayers = lg.getLayers().getArray();
        layers.map(layer => {
          if (!this.isLayerInGroup(layer, lg)) {
            newLayers.push(layer);
          }
        });
      } else {
        newLayers = layers;
      }
      newLayers.forEach(l => {
        if (l instanceof olLayerGroup) {
          this.setRecursiveKey(l, lowerType, FILTER_TYPE_KEY);
        }
      });
      lg.setLayers(new olCollection(newLayers));
    });
    return newLayers;
  }

  /**
   * reset a group with an array of olLayers
   */
  public setLayers(layers: olBaseLayer[], filtertype: Tgroupfiltertype) {
    const lowerType = filtertype.toLocaleLowerCase() as Tgroupfiltertype;
    const layerGroups = this.getLayerGroups(lowerType);
    layers.forEach(l => {
      if (l instanceof olLayerGroup) {
        this.setRecursiveKey(l, filtertype.toLocaleLowerCase(), FILTER_TYPE_KEY);
      }
    });
    layerGroups.forEach(l => {
      this.cleanUpEventListeners(l, layers);
      l.setLayers(new olCollection(layers));
    });
    return layers;
  }

  /**
   * Clean up event listeners from layers and sources
   *
   * TODO: is this needed? when layers or sources are removed, then there is no Target anymore which listens for events?
   * there are also other functions like removeLayerByKey(), removeAllLayers()
   */
  private cleanUpEventListeners(layerGroup: olLayerGroup, newLayers) {
    /** get Difference of old layers and new layers */
    const layersToRemove = layerGroup.getLayers().getArray().filter(x => !newLayers.map(l => l.get('id')).includes(x.get('id')));
    this.removeListenersFromOldLayers(layersToRemove);

    // TODO: is this done by setLayers??
    layersToRemove.forEach(l => layerGroup.getLayers().remove(l));
  }

  /**
   * on() and un() are functions of olObservable which extends EventTarget
   *
   * https://github.com/openlayers/openlayers/blob/v6.5.0/src/ol/events/Target.js#L145
   * https://github.com/openlayers/openlayers/blob/v6.5.0/src/ol/events/Target.js#L134
   */
  private addEventsToLayer(ukisLayer: Layer, olLayer: olLayer<any>, olSource: olSource) {
    if (ukisLayer.events) {
      if (ukisLayer.events.layer) {
        ukisLayer.events.layer.forEach(e => {
          const listeners = olLayer.getListeners(e.event);
          /** only add listener if it was not registered on the olLayer object (for CustomLayer) */
          if (!listeners) {
            /** TODO: check Types on the next ol update - we only define a string so the user has to check if the right event is used */
            olLayer.on(e.event as any, e.listener);
          }
        });
      }

      if (ukisLayer.events.source) {
        ukisLayer.events.source.forEach(e => {
          const listeners = olSource.getListeners(e.event);
          /** only add listener if it was not registered on the olSource object (for CustomLayer) */
          if (!listeners) {
            /** TODO: check Types on the next ol update - we only define a string so the user has to check if the right event is used */
            olSource.on(e.event as any, e.listener);
          }
        });
      }
    }
  }

  /** TODO: try to remove/replace this function - Property 'disposeInternal' is protected ol function */
  private removeListenersFromOldLayers(layers: Array<olBaseLayer | olLayerGroup>) {
    const disposeLayerInternal = (layer: olBaseLayer) => {
      if (layer.hasListener()) {
        (layer as any).disposeInternal();
      }
      if (typeof (layer as any).getSource === 'function') {
        const source = (layer as any).getSource() as olSource;
        if (source) {
          if (source.hasListener()) {
            (source as any).disposeInternal();
          }
        }
      }
    };

    layers.forEach(l => {
      if (l instanceof olLayerGroup) {
        l.getLayers().forEach(subL => {
          disposeLayerInternal(subL);
        });
      } else if (l instanceof olBaseLayer) {
        disposeLayerInternal(l);
      }
    });
  }

  /**
   * get corresponding Layer Group on which the layer is added
   */
  private getLayerGroupForLayer(layer: olBaseLayer) {
    const subLayers = this.getLayersFromGroup(this.map.getLayerGroup(), null, true);
    subLayers.push(this.map.getLayerGroup());
    let lyerGroup: { group: olLayerGroup, layer: olBaseLayer } | null = null;
    subLayers.forEach((l) => {
      if (l instanceof olLayerGroup) {
        const groupLayers = this.getLayersFromGroup(l);
        const hasLayer = groupLayers.find(i => i === layer);
        if (hasLayer) {
          lyerGroup = {
            group: l,
            layer: hasLayer
          };
        }
      }
    });
    return lyerGroup;
  }


  public removeLayerByKey(key: { key: string, value: string }, filtertype: Tgroupfiltertype) {
    const lowerType = filtertype.toLocaleLowerCase() as Tgroupfiltertype;
    const layer = this.getLayerByKey(key, lowerType);
    if (layer) {
      const gropObj = this.getLayerGroupForLayer(layer);
      if (gropObj.group) {
        const filterdLayers = this.getLayersFromGroup(gropObj.group).filter(i => i !== layer);
        gropObj.group.setLayers(new olCollection(filterdLayers));
      }
    }
  }

  public updateLayerByKey(key: { key: string, value: string }, newLayer: olBaseLayer, filtertype: Tgroupfiltertype) {
    const lowerType = filtertype.toLocaleLowerCase() as Tgroupfiltertype;
    this.map.getLayers().forEach((layerGroup: olLayerGroup) => {
      if (layerGroup.get(FILTER_TYPE_KEY) === lowerType) {
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

  public removeAllLayers(filtertype: Tgroupfiltertype) {
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
    let layers;
    this.map.getLayers().getArray().forEach((layerGroup: olLayerGroup) => {
      if (layerGroup.get(FILTER_TYPE_KEY) === lowerType) {
        layers = layerGroup.getLayers();
        layers.clear();
      }
    });

  }

  /**
   * This function resets/adds all olLayers of a type with the new UKIS-Layers
   *
   * if only one group of them map is used and setLayers is called then the map flickers!
   * this is because all layers are newly created and each get new ol_uid's
   */
  public setUkisLayers(layers: Array<Layer>, filtertype: Tgroupfiltertype) {
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
    const tempLayers: olBaseLayer[] = [];
    // TODO try to deep check if a layer if exactly the same and dont create it new
    // create hash from layer???

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
  public setUkisLayer(newLayer: Layer, filtertype?: Tgroupfiltertype): void {
    if (!filtertype) {
      filtertype = newLayer.filtertype;
    }
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
    const oldLayers = this.getLayers(lowerType);
    const oldLayer = oldLayers.find(l => l.get('id') === newLayer.id);
    const newOlLayer = this.create_layers(newLayer);
    if (oldLayer) {
      this.removeLayerByKey({ key: ID_KEY, value: oldLayer.get(ID_KEY) }, filtertype);
      this.addLayer(newOlLayer, filtertype);
    } else {
      this.addLayer(newOlLayer, filtertype);
    }
  }

  public updateUkisLayer(newLayer: Layer, filtertype?: Tgroupfiltertype): void {
    if (!filtertype) {
      filtertype = newLayer.filtertype;
    }
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
    const oldLayers = this.getLayers(lowerType);
    const oldLayer = oldLayers.find(l => l.get('id') === newLayer.id);
    const newOlLayer = this.create_layers(newLayer);
    if (newOlLayer) {
      this.updateLayerByKey({ key: ID_KEY, value: oldLayer.get(ID_KEY) }, newOlLayer, filtertype);
    }
  }


  private create_layers(newLayer: Layer) {
    let newOlLayer: olTileLayer<olTileSource> | olVectorLayer<olVectorSource<olGeometry>> | olBaseLayer;
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
      case 'wfs':
        newOlLayer = this.create_wfs_layer(newLayer as VectorLayer);
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
  private create_xyz_layer(l: RasterLayer): olTileLayer<olTileSource> {
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
      filtertype: l.filtertype,
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
      layeroptions.extent = transformExtent(l.bbox.slice(0, 4) as [number, number, number, number], WGS84, this.getProjection().getCode());
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

    const newlayer = new olTileLayer(layeroptions);
    this.addEventsToLayer(l, newlayer, olSource);
    return newlayer;
  }

  private create_wms_layer(l: WmsLayer): olTileLayer<olTileSource> {

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

    const layeroptions: any = {
      type: 'wms',
      filtertype: l.filtertype,
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
      layeroptions.extent = transformExtent(l.bbox.slice(0, 4) as [number, number, number, number], WGS84, this.getProjection().getCode());
    }
    const newlayer = new olTileLayer(layeroptions);
    this.addEventsToLayer(l, newlayer, olSource);
    return newlayer;
  }

  private create_wmts_layer(l: WmtsLayer): olTileLayer<olTileSource> {
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
        filtertype: l.filtertype,
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
        layeroptions.extent = transformExtent(l.bbox.slice(0, 4) as [number, number, number, number], WGS84, this.getProjection().getCode());
      }

      const newlayer = new olTileLayer(layeroptions);
      this.addEventsToLayer(l, newlayer, olSource);
      return newlayer;
    } else {
      const layer = l as Layer;
      console.error(`layer with id: ${layer.id} and type ${layer.type} is no instanceof WmtsLayer!`);
    }
  }

  private create_wfs_layer(l: VectorLayer): olVectorLayer<olVectorSource<olGeometry>> {

    const url = new URL(l.url);
    // making sure that srsname is set to current projection
    url.searchParams.set('srsname', this.EPSG);
    // note that we don't need to adjust the bbox. contrary to wms'es, in a wfs,
    // a bbox may use another projection than the srsname.

    const wfsSource = new olVectorSource({
      format: new olGeoJSON(),
      url: url.toString()
    });

    const styling = l.options?.style || undefined;

    const layeroptions: any = {
      type: 'wfs',
      filtertype: l.filtertype,
      name: l.name,
      id: l.id,
      visible: l.visible,
      legendImg: l.legendImg,
      opacity: l.opacity || 1,
      zIndex: 1,
      source: wfsSource,
      style: styling
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
      layeroptions.extent = transformExtent(l.bbox.slice(0, 4) as [number, number, number, number], WGS84, this.getProjection().getCode());
    }

    if (l.options) {
      Object.assign(layeroptions, l.options);
    }

    const newlayer = new olVectorLayer(layeroptions);
    this.addEventsToLayer(l, newlayer, wfsSource);
    return newlayer;
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
      layeroptions.extent = transformExtent(l.bbox.slice(0, 4) as [number, number, number, number], WGS84, this.getProjection().getCode());
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

    const newlayer = new olVectorLayer(layeroptions);
    this.addEventsToLayer(l, newlayer, layeroptions.source);
    return newlayer;
  }

  /** bug fix: https://github.com/openlayers/openlayers/issues/10099 */
  private setCrossOrigin(l: Layer, layer) {
    if (layer instanceof olLayer) {
      const olSource = layer.getSource();
      /** set crossOrigin for popup layers  */
      if (l.crossOrigin || l.crossOrigin === null) {
        if (olSource instanceof olImageSource || olSource instanceof olTileImageSource || olSource instanceof olTileSource) {
          olSource['crossOrigin'] = l.crossOrigin
        }
      } else if (l.popup && !l.crossOrigin) {
        if (olSource instanceof olImageSource || olSource instanceof olTileImageSource || olSource instanceof olTileSource) {
          olSource['crossOrigin'] = 'anonymous';
        }
      }
    }
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
        this.setCrossOrigin(l, layer);
        this.addEventsToLayer(l, layer, olSource);
      } else if (layer instanceof olLayerGroup) {
        layer.getLayers().forEach(gl => {
          this.setCrossOrigin(l, gl);
          if (gl instanceof olLayer) {
            this.addEventsToLayer(l, gl, gl.getSource());
          }
          /**
           * groups are flattened in map.forEachLayerAtPixel so add popup to each layer
           * popup will be shown for top layer in the Group if there is a pixel color
           */
          if (l.popup) {
            gl.set('popup', l.popup);
            gl['className_'] = `${l.id}_${olGetUid(gl)}`;
          }
        });
      } else {
        console.error(`The custom_layer of ${l.id} in not a openlayers Layer`);
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
        layer.setMaxResolution(l.maxResolution);
      }
      if (l.minResolution) {
        layer.setMinResolution(l.minResolution);
      }

      if (l.maxZoom) {
        layer.setMaxZoom(l.maxZoom);
      }
      if (l.minZoom) {
        layer.setMinZoom(l.minZoom);
      }

      if (l.popup && !(layer instanceof olLayerGroup)) {
        layeroptions.popup = l.popup;
        /**
         * ol 6.x problem if popup (map.forEachLayerAtPixel) use className
         * needs the class Name to detect if it is a different layer at the pixel value
         * https://github.com/openlayers/openlayers/releases/tag/v6.0.0
         */
        layer['className_'] = l.id;
      }

      if (l.bbox) {
        const extent = transformExtent(l.bbox.slice(0, 4) as [number, number, number, number], WGS84, this.getProjection().getCode());
        layer.setExtent(extent);
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

  private isPopupObj(layerpopup: Layer['popup'] | string): layerpopup is popup {
    return (layerpopup && typeof layerpopup === 'object') && !Array.isArray(layerpopup);
  }

  private isPopupObjMove(layerpopup: Layer['popup']): layerpopup is popup {
    return (this.isPopupObj(layerpopup) && layerpopup.event === 'move');
  }

  private isPopupObjClick(layerpopup: Layer['popup']): layerpopup is popup {
    return (this.isPopupObj(layerpopup) && layerpopup.event === 'click');
  }

  private isPopupObjArray(layerpopup: Layer['popup']): layerpopup is popup[] {
    return Array.isArray(layerpopup) && layerpopup.length && this.isPopupObj(layerpopup[0]);
  }

  private isPopupStringArray(layerpopup: Layer['popup']): layerpopup is string[] {
    return Array.isArray(layerpopup) && layerpopup.length && typeof layerpopup[0] === 'string';
  }

  private popupEventIsBrowserEvent(popup: popup, evt: olMapBrowserEvent<PointerEvent>) {
    if (popup.event === 'move' && evt.type === 'pointermove') {
      return true;
    } else if (popup.event === 'click' && evt.type === 'click') {
      return true;
    }
  }



  /** USED in map-ol.component */
  /**
   * TODO:
   * - check the pointer event
   * - on move event set cursor -> depends on which kind of layer??
   *   layers with features and only color pixel
   *
   * - forEachFeatureAtPixel: Detect features that intersect a pixel on the viewport
   *   Vector Layers???
   *
   * - forEachLayerAtPixel: Detect layers that have a color value at a pixel on the viewport (false positives unless the map layers have had different className)
   *   Raster Layers???
   */

  /**
   *  layers_on_click() and layers_on_pointermove() should be removed
   *  this filtering must be done later
   *
   *  1. on a Map event Filter if map has layers on the pixel
   *  forEachLayerAtPixel: Detect layers that have a color value at a pixel on the viewport (false positives unless the map layers have had different className)
   *  check layer source crossOrigin = anonymous
   *
   *  2. Filter if it is the top visible layer - so no popups are shown for layers beneath https://github.com/dlr-eoc/ukis-frontend-libraries/issues/94#issuecomment-916759628
   *  3. check if the top visible layer has a popup property
   *  4. For this Layers change the cursor on forEachLayerAtPixel -> hit
   *
   *  5. Differentiate between raster and vector to get features or layer.color for the properties passed to the popup
   *  For Features change the cursor on forEachFeatureAtPixel -> hit
   *
   *  6. limit properties if popup property is: Array<string> | popup | popup[] -> popup?.filterkeys
   *  7. overwrite properties if popup property is: popup | popup[]
   *  7. check for pupupFunktion, asyncPupup and dynamicPopup
   *  8. use addPopup() or addPopupObj()
   *
   * 6. prepare popup properties and check if popup property is: boolean | Array<string> | popup | popup[]
   */
  public layersOnMapEvent(evt: olMapBrowserEvent<PointerEvent>) {
    const LayersAtPixel: ItemAtPixel[] = [];
    let layerHit = false;

    /**
     * Detect layers that have a color value at a pixel on the viewport, and execute a callback with each matching layer.
     * Layers included in the detection can be configured through opt_layerFilter.
     *
     * Note: this may give false positives unless the map layers have had different *className* properties assigned to them.
     * Also there could be cross-origin data, so set crossOrigin: 'anonymous' for layers where you want get pixel data!!
     *
     * If forEachLayerAtPixel is using return, it is only fired once!!!
     */
    this.map.forEachLayerAtPixel(evt.pixel, (layer, color) => {
      LayersAtPixel.push({ layer, color });
    });
    LayersAtPixel.forEach((item, index) => {
      /**
       * only show for top layer and if top layer has popup
       * should this be configurable at the layer ??
       */
      const topLayer = 0;
      if (index === topLayer) {
        const hasPopup = (item.layer.get('popup'));
        if (hasPopup) {
        /** check if cursor was set (we need this only on move?) */
        this.hitLayerCurr = item.layer.get('id');
        if (!this.hitLayerPrev) {
          this.hitLayerPrev = this.hitLayerCurr;
        }

        /** set cursor for Layers with a color value */
        if (item.color) {
          layerHit = true;
        }

        /** remove cursor and move-popups on layer change */
        if (this.hitLayerPrev && this.hitLayerPrev !== this.hitLayerCurr) {
          layerHit = false;
          this.hitLayerPrev = this.hitLayerCurr;
        }
          const useEvent = this.topLayerCheckEvent(evt, hasPopup);
          if (useEvent) {
            if (useEvent === 'click') {
              this.layer_on_click(evt, item.layer, item.color);
            } else if (useEvent === 'move') {
              this.layer_on_click(evt, item.layer, item.color);
            }
          }
        }
      }
    });

    if (layerHit) {
      this.map.getTargetElement().style.cursor = 'pointer';
    } else {
      this.removeAllPopups((item) => {
        return item.get('addEvent') === 'pointermove';
      });
      this.map.getTargetElement().style.cursor = '';
    }
  }

  private topLayerCheckEvent(evt: olMapBrowserEvent<PointerEvent>, popup: Layer['popup']) {
    let useEvent: 'click' | 'move' = null;
    const clickOrMove = (evt: olMapBrowserEvent<PointerEvent>, popup: popup) => {
      if (popup.event) {
        if (this.popupEventIsBrowserEvent(popup, evt) && this.isPopupObjClick(popup)) {
          useEvent = 'click';
        } else if (this.popupEventIsBrowserEvent(popup, evt) && this.isPopupObjMove(popup)) {
          useEvent = 'move';
        }
      } else {
        /** only show popups without an event for browser click  */
        if (evt.type === 'click') {
          useEvent = 'click';
        }
      }
    }
    // check event is browser event
    if (typeof popup === 'boolean') {
      if (popup === true) {
        useEvent = 'click';
      }
    } else if (this.isPopupStringArray(popup)) {
      useEvent = 'click';
    } else {
      /** popup is  popup | popup[] */
      if (this.isPopupObjArray(popup)) {
        popup.map(p => {
          clickOrMove(evt, p);
        });
      } else {
        clickOrMove(evt, popup);
      }
    }

    return useEvent;
  }

  /**
   * https://openlayers.org/en/latest/apidoc/module-ol_layer_Layer-Layer.html#Subclasses
   */
  private checkIsRaster(layer: olLayer<any>): layer is olBaseImageLayer<olImageSource> | olBaseTileLayer<olTileSource> {
    if (layer instanceof olBaseImageLayer || layer instanceof olBaseTileLayer) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * https://openlayers.org/en/latest/apidoc/module-ol_layer_Layer-Layer.html#Subclasses
   */
  private checkIsVector(layer: olLayer<any>): layer is olBaseVectorLayer<olVectorSource<any>> {
    if (layer instanceof olBaseVectorLayer && !this.checkIsRaster(layer)) {
      return true;
    } else {
      return false;
    }
  }

  public layer_on_click(evt: olMapBrowserEvent<PointerEvent>, layer: olLayer<any>, color?: Uint8ClampedArray | Uint8Array) {
    if (this.checkIsRaster(layer)) {
      this.raster_on_click(evt, layer, color);
      } else if (this.checkIsVector(layer)) {
      this.vector_on_click(evt);
    }
  }

  public vector_on_click(evt: olMapBrowserEvent<PointerEvent>) {
    const FeaturesAtPixel: { feature: olFeature<any> | olRenderFeature, layer: olLayer<any> }[] = [];
    let featureHit = false;
    this.map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
      /** set cursor for features with a color value */
      featureHit = true;
      FeaturesAtPixel.push({ feature, layer });
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
        const layer = item.layer;
        const feature = item.feature;
        const layerpopup: Layer['popup'] = layer.get('popup');
        let properties: any = {};

        if (layer instanceof olBaseVectorLayer && layerpopup) {
          const childFeatures = feature.getProperties().features;
          if (childFeatures && childFeatures.length === 1) {
            const childFeature = childFeatures[0];
            properties = childFeature.getProperties();
          } else if (childFeatures && childFeatures.length > 1) {
            /** or check for layerpopup.event !== move */
            if (evt.type === 'click') {
              const extent = this.getFeaturesExtent(feature.getProperties().features);
              this.setExtent(extent);
              return false;
            } else {
              return true;
            }
          } else {
            // type no cluster
            properties = feature.getProperties();
          }
          this.prepareAddPopup(properties, layer, feature, evt, layerpopup);
        }
      }
    });

    if (featureHit) {
      this.map.getTargetElement().style.cursor = 'pointer';
    } else {
      this.map.getTargetElement().style.cursor = '';
    }
  }

  public raster_on_click(evt: olMapBrowserEvent<PointerEvent>, layer: olLayer<any>, color?: Uint8ClampedArray | Uint8Array) {
    const layerpopup: Layer['popup'] = layer.get('popup');
    let properties: any = {};

    if (layerpopup) {
      properties = layer.getProperties();
      properties.evt = evt;
      if (color) {
        properties.color = color;
      }

      this.prepareAddPopup(properties, layer, null, evt, layerpopup);
    }
  }

  private prepareAddPopup(layerProperties: any, layer: olLayer<any>, feature: olFeature<any> | olRenderFeature, evt: olMapBrowserEvent<PointerEvent>, layerpopup: Layer['popup']) {
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

    const limitPopupObjProperties = (popupObj: popup) => {
      if (popupObj && popupObj.filterkeys) {
        popupProperties = Object.keys(popupProperties)
          .filter(key => popupObj.filterkeys.includes(key))
          .reduce((obj, key) => {
            obj[key] = popupProperties[key];
            return obj;
          }, {});
      }
    }

    /** Popup is array - limit properties */
    if (this.isPopupStringArray(layerpopup)) {
      popupProperties = Object.keys(popupProperties)
        .filter(key => layerpopup.includes(key))
        .reduce((obj, key) => {
          obj[key] = popupProperties[key];
          return obj;
        }, {});
    }
    /** Popup is array of popupObj - limit properties */
    else if (this.isPopupObjArray(layerpopup)) {
      // is the first popupObj in the array with the same event as evt.type
      const popupObj = layerpopup.find(p => this.popupEventIsBrowserEvent(p, evt));
      limitPopupObjProperties(popupObj);
    }
    /** Popup is object - limit properties */
    else if (this.isPopupObj(layerpopup)) {
      limitPopupObjProperties(layerpopup);
    }


    const overwritePopup = (popupObj: popup) => {
      /** overwrite the keys of the layer properties */
      if (popupObj.properties) {
        const usedProperties = Object.keys(popupObj.properties);
        if (Array.isArray(usedProperties)) {
          popupProperties = Object.keys(popupProperties)
            /* .filter(key => usedProperties.includes(key)) */
            .reduce((obj, key) => {
              const newKey = popupObj.properties[key];
              if (newKey) {
                obj[newKey] = popupProperties[key];
              } else {
                obj[key] = popupProperties[key];
              }
              return obj;
            }, {});
        }


      }
    }

    /** overwrite and us popupFunction or dynamicPopup */
    if (this.isPopupObjArray(layerpopup)) {
      layerpopup.forEach(p => {
        if (this.popupEventIsBrowserEvent(p, evt)) {
          overwritePopup(p);
        }
      })
    } else if (this.isPopupObj(layerpopup)) {
      overwritePopup(layerpopup);
    }

    const addPopupObj = (popupObj: popup) => {
      /** async function where you can paste a html string to the callback */
      if ('asyncPupup' in popupObj) {
        popupObj.asyncPupup(popupProperties, (html) => {
          this.addPopup(args, null, html, popupObj.event, popupObj.single);
        });
        /** add event if popup object */
      } else {

        /** adjust args if pupupFunktion or dynamicPopup*/
        if (popupObj.pupupFunktion) {
          args.popupFn = popupObj.pupupFunktion; //This could be done in createPopupContainer()
        } else if (popupObj.dynamicPopup) {
          args.dynamicPopup = popupObj.dynamicPopup; // This could be done in createPopupContainer()
        }

        this.addPopup(args, popupProperties, null, popupObj.event, popupObj.single);
      }
    }

    /** popup is boolean or string array */
    if (typeof layerpopup === 'boolean' || this.isPopupStringArray(layerpopup)) {
      this.addPopup(args, popupProperties, null);
    }
    /** popup array of popupObj */
    else if (this.isPopupObjArray(layerpopup)) {
      layerpopup.forEach(p => {
        // filter that browser event and popup event are the same
        if (this.popupEventIsBrowserEvent(p, evt)) {
          addPopupObj(p);
        }
      });
    }
    /** popup is a popupObj */
    else if (layerpopup) {
      addPopupObj(layerpopup);
    }
  }

  // TODO: overlapping layers - move popup is added on click ???
  public addPopup(args: IPopupArgs, popupObj: any, html?: string, event?: 'click' | 'move', removePopups?: boolean) {
    const layerpopup: Layer['popup'] = args.layer.get('popup');
    // check if popup is already there and event is move
    const layerID = args.layer.get('id');
    const moveID = `popup_move_ID`;
    const movePopup = this.getPopups().find(item => item.getId() === moveID);
    const browserEvent = args.event;
    /**
     * If event move and the map already has a Overlay for move
     * then only create new html container and set the position
     */
    if (event === 'move' && browserEvent.type === 'pointermove' && movePopup) {
      let coordinate;
      if (args.properties && args.properties.geometry && args.properties.geometry.getType() === 'Point') {
        coordinate = args.properties.geometry.getCoordinates();
      } else {
        coordinate = browserEvent.coordinate;
      }
      const container = this.createPopupContainer(movePopup, args, popupObj, html, event);
      movePopup.setElement(container);
      movePopup.setPosition(coordinate);
      /** update movePopup to be rendered over the previous added popup */
      movePopup.getElement().parentElement.style.zIndex = '1';
    } else if (browserEvent.type === 'pointermove' && !event) {
      /** remove move popup if move on a click layer */
      if (movePopup) {
        this.removeAllPopups((item) => {
          return item.get('addEvent') === 'pointermove';
        });
      }
    } else if (browserEvent.type === 'pointermove' && event === 'click') {
      if (movePopup) {
        this.removeAllPopups((item) => {
          return item.get('addEvent') === 'pointermove';
        });
      }
    } else {
      let popupID = null;
      if (event === 'move') {
        popupID = moveID;
      } else {
        if (args.feature) {
          popupID = `${layerID}:${olGetUid(args.feature)}`;
        } else if (args.layer) {
          popupID = `${layerID}:${olGetUid(args.layer)}`;
        } else {
          popupID = `${layerID}:popup_${new Date().getTime()}`;
        }
      }

      const defaultOptions: olOverlayOptions = {
        // element: container,
        autoPan: true,
        id: popupID,
        autoPanAnimation: {
          duration: 250
        },
        positioning: OverlayPositioning.BOTTOM_CENTER,
        stopEvent: true,
        insertFirst: false,
      };

      let overlayoptions = defaultOptions;

      /**
       * Check if popup is an array of popup obj's or a popup obj
       * then merge the popup?.options with the default ol/overlay options
       */
      if (this.isPopupObjArray(layerpopup)) {
        const objForEvent = layerpopup.find(p => this.popupEventIsBrowserEvent(p, browserEvent));
        if (objForEvent.options) {
          overlayoptions = Object.assign(defaultOptions, objForEvent.options);
        }
      } else if (this.isPopupObj(layerpopup) && layerpopup.options) {
        overlayoptions = Object.assign(defaultOptions, layerpopup.options);
      }

      const overlay = new olOverlay(overlayoptions);

      if (removePopups) {
        this.removeAllPopups((item) => {
          // only remove the popups from the current layer
          const elementID = item.getId();
          const layer = elementID.toString().split(':')[0];
          if (layer) {
            if (layerID === layer) {
              return layerID === layer;
            }
          } else {
            return true;
          }
        });
      }

      const hasPopup = this.getPopups().find(item => (item.getId() === overlay.getId() && overlay.getId() !== moveID));
      if (hasPopup) {
        // removes ol-part of popup
        this.map.removeOverlay(hasPopup);
        // removes angular-part of popup
        this.destroyDynamicPopupComponent(hasPopup.getId().toString());
      }

      const container = this.createPopupContainer(overlay, args, popupObj, html, event);
      /** edge case when moving and clicking sometimes the browser event is not like the popup event */
      if (overlay.getId() === moveID) {
        overlay.set('addEvent', 'pointermove');
      } else {
        overlay.set('addEvent', browserEvent.type);
      }
      overlay.set(OVERLAY_TYPE_KEY, 'popup');
      overlay.setElement(container);

      let coordinate;
      if (args.properties && args.properties.geometry && args.properties.geometry.getType() === 'Point') {
        coordinate = args.properties.geometry.getCoordinates();
      } else {
        coordinate = browserEvent.coordinate;
      }

      overlay.setPosition(coordinate);

      /**
       * edge case prevent add multiple movePopup's
       * only add a new popup if it's not a movePopup or there isn't a already existing movePopup
       */
      if (!(movePopup && event === 'move')) {
        this.map.addOverlay(overlay);
      }
    }
  }

  private createPopupContainer(overlay: olOverlay, args: IPopupArgs, popupObj: any, html?: string, event?: 'click' | 'move') {
    const content = document.createElement('div');
    content.className = 'ol-popup-content';
    let popupHtml = '';
    if (args.popupFn) {
      popupHtml = args.popupFn(popupObj);
    } else if (html && (!popupObj || Object.keys(popupObj).length === 0)) {
      popupHtml = html;
    } else {
      popupHtml = this.createPopupHtml(popupObj);
    }
    content.innerHTML = popupHtml;
    if (args.dynamicPopup) {
      // To prevent memory leak:
      // if this very popup already has been created (for example `popup_move_ID`),
      // then destroy it before creating a new one.
      const id = overlay.getId().toString();
      this.destroyDynamicPopupComponent(id);
      // Only now create a new one.
      const dArgs: IDynamicPopupArgs = {
        event: args.event,
        layer: args.layer,
        feature: args.feature || null,
        dynamicPopup: args.dynamicPopup,
        properties: popupObj,
      };
      this.createDynamicPopupComponent(id, content, dArgs);
    }

    const container = document.createElement('div');
    container.className = 'ol-popup';
    container.id = overlay.getId().toString();
    container.style.display = 'block';

    if (!event || event !== 'move') {
      const closer = document.createElement('a');
      closer.className = 'ol-popup-closer';
      container.appendChild(closer);

      const closeFunction = () => {
        closer.removeEventListener('click', closeFunction, false);
        // removes ol-part of popup
        this.map.removeOverlay(overlay);
        // removes angular-part of popup
        this.destroyDynamicPopupComponent(overlay.getId().toString());
      };
      closer.addEventListener('click', closeFunction, false);
    }
    container.appendChild(content);
    return container;
  }

  /** USED in map-ol.component */
  public removeAllPopups(filter?: (item: olOverlay) => boolean) {
    let popups = this.getPopups();
    if (filter) {
      popups = this.getPopups().filter(filter);
    }
    popups.forEach((overlay) => {
      if (overlay.get(OVERLAY_TYPE_KEY) === 'popup') {
        // removes ol-part of popup
        this.map.removeOverlay(overlay);
        // removes angular-part of popup
        this.destroyDynamicPopupComponent(overlay.getId().toString());
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
      if (overlay.get(OVERLAY_TYPE_KEY) === 'popup') {
        popups.push(overlay);
      }
    });
    return popups;
  }

  /**
   * Destroys a popup-component.
   *  - kills the component (with `.destroy()`)
   *  - detaches it from angular-application (with `.destroy()`)
   *  - removes the entry from `this.dynamicPopupComponents`
   * @param id : The string under which the popup-component has been stored in `this.dynamicPopupComponents`
   */
  private destroyDynamicPopupComponent(id: string): void {
    if (this.dynamicPopupComponents.has(id)) {
      this.dynamicPopupComponents.get(id).destroy();
      this.dynamicPopupComponents.delete(id);
    }
  }

  /**
   * Creates an angular component to be used as popup-body.
   *  - creates component
   *  - attaches component-view to angular-application
   *  - keeps reference to component in `this.dynamicPopupComponents` for later removal.
   *
   * @param id : The container-id. Also the id under which the component will be stored in `this.dynamicPopupComponents`.
   * @param anchorElement : The html-element to which the popup-component shall be attached
   * @param args : Must contain `dynamicPopup`
   */
  private createDynamicPopupComponent(id: string, anchorElement: HTMLElement, args: IDynamicPopupArgs): void {
    const factory = this.crf.resolveComponentFactory(args.dynamicPopup.component);
    const popupBody = factory.create(this.injector, [], anchorElement);

    if (args.dynamicPopup.getAttributes) {
      const attributes = args.dynamicPopup.getAttributes(args);
      for (const key in attributes) {
        if (attributes[key] !== 'undefined') {
          popupBody.instance[key] = attributes[key];
        }
      }
    }
    this.app.attachView(popupBody.hostView);
    this.dynamicPopupComponents.set(id, popupBody);
  }

  /**
   *
   * @param extent: [minX, minY, maxX, maxY]
   * @param geographic: boolean
   * @param fitOptions: olFitOptions
   * @returns olExtend: [minX, minY, maxX, maxY]
   */
  public setExtent(extent: TGeoExtent, geographic?: boolean, fitOptions?: any): TGeoExtent {
    const projection = (geographic) ? getProjection(WGS84) : getProjection(this.EPSG);
    const transfomExtent = transformExtent(extent.slice(0, 4) as [number, number, number, number], projection, this.getProjection().getCode());
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
    const projection = (geographic) ? getProjection(WGS84) : getProjection(this.EPSG);
    const transfomCenter = transform(center, projection, this.getProjection().getCode());
    // console.log('set center in svc', transfomCenter)
    // console.log(this.map.getView().getCenter())
    this.map.getView().setCenter(transfomCenter);
    return transfomCenter;
  }

  /** USED in map-ol.component */
  public getCenter(geographic?: boolean): any {
    const dstProjection = (geographic) ? getProjection(WGS84) : getProjection(this.EPSG);
    const srcProjection = getProjection(this.getProjection().getCode());
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
      const projection = getProjection(WGS84);
      const transfomExtent = transformExtent(extent, this.getProjection().getCode(), projection);
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
    const projection = (geographic) ? getProjection(WGS84) : getProjection(this.EPSG);
    const extent = this.map.getView().calculateExtent();
    const transfomExtent = transformExtent(extent, this.getProjection().getCode(), projection);
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
    const duration = 250;
    const delta = value === '+' ? 1 : -1;
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
      dataProjection: WGS84,
      featureProjection: this.EPSG
    });
    return GEOJSON.readFeature(geojson);
  }

  public geoJsonToFeatures(geojson: any): Array<olFeature<any>> {
    const GEOJSON = new olGeoJSON({
      dataProjection: WGS84,
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

  /**
   * @param projDef.code - e.g.: "EPSG:4326"
   * @param projDef.proj4js - e.g.: "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees"
   */
  public registerProjection(projDef: { code: string, proj4js: string }) {
    proj4.defs(projDef.code, projDef.proj4js);
    olRegister(proj4);
  }

  /**
   * Returns a OpenLayers Projection from Options
   */
  public getOlProjection(projDef: olProjectionOptions): olProjection {
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
