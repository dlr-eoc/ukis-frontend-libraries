import { Injectable, ApplicationRef, ComponentRef, createComponent, EnvironmentInjector } from '@angular/core';


import { Layer, VectorLayer, CustomLayer, RasterLayer, popup, WmtsLayer, WmsLayer, TGeoExtent, ILayerOptions, StackedLayer, StackedLayertype, CustomLayertype, WfsLayertype, KmlLayertype, GeojsonLayertype, TmsLayertype, WmtsLayertype, WmsLayertype, XyzLayertype } from '@dlr-eoc/services-layers';

import olMap from 'ol/Map';
import olView, { FitOptions as olFitOptions } from 'ol/View';
import { ViewOptions as olViewOptions } from 'ol/View';

import olBaseLayer from 'ol/layer/Base';
import olSource from 'ol/source/Source';
import olGeometry from 'ol/geom/Geometry';
import olLayer from 'ol/layer/Layer';
import { Options as olLayerOptions } from 'ol/layer/Layer';
import CanvasVectorLayerRenderer from 'ol/renderer/canvas/VectorLayer';
import CanvasTileLayerRenderer from 'ol/renderer/canvas/TileLayer';
import CanvasImageLayerRenderer from 'ol/renderer/canvas/ImageLayer';
import olLayerGroup from 'ol/layer/Group';
import { Options as olLayerGroupOptions } from 'ol/layer/Group';
import olOverlay from 'ol/Overlay';
import { Options as olOverlayOptions } from 'ol/Overlay';

import olBaseTileLayer from 'ol/layer/BaseTile';
import { Options as olBaseTileLayerOptions } from 'ol/layer/BaseTile';
import olBaseVectorLayer from 'ol/layer/BaseVector';
import { Options as olBaseVectorLayerOptions } from 'ol/layer/BaseVector';
import olBaseImageLayer from 'ol/layer/BaseImage';
import { Options as olBaseImageLayerOptions } from 'ol/layer/BaseImage';

import olImageLayer from 'ol/layer/Image';

import olTileLayer from 'ol/layer/Tile';
import olVectorLayer from 'ol/layer/Vector';
import olVectorTile from 'ol/source/VectorTile';

import olVectorTileLayer from 'ol/layer/VectorTile';
import { Options as olVectorTileLayerOptions } from 'ol/layer/VectorTile';
import olVectorTileSource from 'ol/source/VectorTile';
import { applyStyle } from 'ol-mapbox-style';
import { createXYZ } from 'ol/tilegrid';
import olMVT from 'ol/format/MVT';

import olXYZ from 'ol/source/XYZ';
import olTileSource from 'ol/source/Tile';

import { Options as olXYZOptions } from 'ol/source/XYZ';
import olTileWMS from 'ol/source/TileWMS';
import { Options as olTileWMSOptions } from 'ol/source/TileWMS';
import olImageWMS from 'ol/source/ImageWMS';
import { Options as olImageWMSOptions } from 'ol/source/ImageWMS';
import olTileImageSource from 'ol/source/TileImage';
import olImageSource from 'ol/source/Image';
import olWMTS from 'ol/source/WMTS';
import { Options as olWMTSOptions } from 'ol/source/WMTS';
import olWMTSTileGrid from 'ol/tilegrid/WMTS';
import olTileGrid from 'ol/tilegrid/TileGrid';
import olVectorSource from 'ol/source/Vector';
import olRasterSource from 'ol/source/Raster';
import olCluster from 'ol/source/Cluster';
import { Options as olClusterOptions } from 'ol/source/Cluster';
import olFeature from 'ol/Feature';

import olCollection from 'ol/Collection';
import olGeoJSON from 'ol/format/GeoJSON';
import olKML from 'ol/format/KML';
import olProjection from 'ol/proj/Projection';
import { Options as olProjectionOptions } from 'ol/proj/Projection';
import { transformExtent, get as getProjection, transform } from 'ol/proj';
import { register as olRegister } from 'ol/proj/proj4';
import proj4 from 'proj4';
import { extend as olExtend, getWidth as olGetWidth, getHeight as olGetHeight, getTopLeft as olGetTopLeft, containsCoordinate as olContainsCoordinate } from 'ol/extent';
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
  popupFn?: popup['popupFunction'];
  dynamicPopup?: popup['dynamicPopup'];
}


export interface IDynamicPopupArgs {
  properties: popup['properties']; // will be filtered by popup['filterkeys'] (if given)
  layer: IPopupArgs['layer'];
  feature?: IPopupArgs['feature'];
  event: olMapBrowserEvent<PointerEvent>;
  dynamicPopup: popup['dynamicPopup'];
}


type tmsReturnType<T> = T extends RasterLayer ? olTileLayer<olTileSource> :
  T extends VectorLayer ? olVectorTileLayer : never;

type LayerOptionsSources = olTileSource | olVectorTileSource | olImageSource | olSource;

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
    private app: ApplicationRef,
    private envInjector: EnvironmentInjector
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
    /** if the map has already been created remove all layers before adding the layer groups  */
    this.map.getLayerGroup().getLayers().clear();

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
    const keyLayers: (olBaseLayer | olLayerGroup)[] = [];
    flattenedLayers.forEach((item) => {
      if (item.get(key.key) && item.get(key.key) === key.value) {
        if (keyLayers.indexOf(item) === -1) {
          keyLayers.push(item);
        }
      }
    });
    /** if the layer is not in flattenedLayers it could be a olLayerGroup */
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
  public getLayerGroups(filtertype?: string) {
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
  private cleanUpEventListeners(layerGroup: olLayerGroup, newLayers: olBaseLayer[]) {
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
      if (typeof (layer as any).getSource === 'function') {
        const source = (layer as any).getSource() as olSource;
        if (source) {
          // https://github.com/dlr-eoc/ukis-frontend-libraries/issues/100
          if (source instanceof olRasterSource) {
            source.dispose();
          }
          if (source.hasListener()) {
            (source as any).disposeInternal();
          }
        }
      }
      if (layer.hasListener()) {
        (layer as any).disposeInternal();
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
              this.setZIndexForLayerAndGroup(oldLayer, newZIndex, true);
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
  public setUkisLayers(layers: Array<Layer>, filtertype: Tgroupfiltertype, appendToZIndex?: number) {
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
    const tempLayers: olBaseLayer[] = [];

    if (layers.length < 1 && lowerType !== 'baselayers') {
      this.removeAllLayers(lowerType);
    } else {
      layers.forEach((newLayer, index) => {
        const layer = this.create_layers(newLayer);
        // check if layer not undefined
        if (layer) {
          if (appendToZIndex > 0) {
            this.setZIndexForLayerAndGroup(layer, index, false, appendToZIndex);
          } else {
            this.setZIndexForLayerAndGroup(layer, index);
          }
          tempLayers.push(layer);
        }
      });
    }

    if (tempLayers.length > 0) {
      this.setLayers(tempLayers, lowerType);
      // TODO: checkt to replace type with filtertype -> but breaking Change!!
      const newTempLayers: { type: Tgroupfiltertype, layers: olBaseLayer[] } = {
        type: lowerType, layers: tempLayers
      };
      return newTempLayers;
    }
  }

  /**
   * this function is more for internal use in MapOlComponent
   * 
   * set zIndex for olLayer and olLayerGroup layers
   * if updateCollection = true - moves items in the collection to the index
   * this should only be use in map ol
   */
  public setZIndexForLayerAndGroup(ollayer: olBaseLayer | olLayerGroup, index: number, updateCollection = false, appendToZIndex?: number) {
    if (appendToZIndex > 0) {
      ollayer.setZIndex(index + appendToZIndex);
    } else {
      ollayer.setZIndex(index);
    }

    // addresses an issue in openlayers: https://github.com/openlayers/openlayers/issues/6654
    if (ollayer instanceof olLayerGroup) {
      const collection = (ollayer as olLayerGroup).getLayers();
      if (updateCollection) {
        collection.getArray().forEach(l => {
          collection.remove(l);
          collection.insertAt(index, l);
        });
      }
      // Set the index of the group layers to the same as the group.
      // This is also done in olLayerGroup [getLayerStatesArray](https://github.com/openlayers/openlayers/blob/v7.1.0/src/ol/layer/Group.js#L288-L289) if not set
      collection.forEach(l => {
        if (appendToZIndex > 0) {
          l.setZIndex(index + appendToZIndex);
        } else {
          l.setZIndex(index);
        }
      });
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
      case XyzLayertype:
        newOlLayer = this.create_xyz_layer(newLayer as RasterLayer);
        break;
      case WmsLayertype:
        newOlLayer = this.create_wms_layer(newLayer as WmsLayer);
        break;
      case WmtsLayertype:
        newOlLayer = this.create_wmts_layer(newLayer as WmtsLayer);
        break;
      case TmsLayertype:
        newOlLayer = this.create_tms_layer(newLayer as VectorLayer | RasterLayer);
        break;
      case GeojsonLayertype:
        newOlLayer = this.create_geojson_layer(newLayer as VectorLayer);
        break;
      case KmlLayertype:
        newOlLayer = this.create_kml_layer(newLayer as VectorLayer);
        break;
      case WfsLayertype:
        newOlLayer = this.create_wfs_layer(newLayer as VectorLayer);
        break;
      case CustomLayertype:
        newOlLayer = this.create_custom_layer(newLayer as CustomLayer);
        break;
      case StackedLayertype:
        newOlLayer = this.create_stacked_layer(newLayer as StackedLayer);
        break;
    }
    return newOlLayer;
  }

  /**
   * create layeroptions olLayerOptions<OptionSources> & ILayerOptions
   * - id
   * - name
   * - filtertype
   * - type
   * - legendImg
   * - visible
   * - zIndex
   * - opacity
   * - attribution
   * - continuousWorld
   * - set crossOrigin for popup layers
   * - set source on layeroptions
   * - popup
   * - maxResolution/minResolution
   * - maxZoom/minZoom
   * - bbox
   */
  private createOlLayerOptions(l: Layer, type: Layer['type'], source?: olSource) {
    if (source) {
      if (l.attribution) {
        source.setAttributions([l.attribution]);
      }

      if (l.continuousWorld) {
        /**
         * set wrapX after source creation is not possible so we have to use the private property
         * https://github.com/openlayers/openlayers/blob/v6.13.0/src/ol/source/Source.js#L48
         */
        // tslint:disable-next-line: no-string-literal
        source['wrapX_'] = l.continuousWorld;
      }

      /** set crossOrigin for popup layers  */
      if (l.popup && !l.crossOrigin && l.crossOrigin !== null) {
        this.sourceSetCross(source);
      }
      if (l.crossOrigin || l.crossOrigin === null) {
        this.sourceSetCross(source);
      }
    }

    // ------------------------------------------
    const layeroptions: olLayerOptions<LayerOptionsSources> & ILayerOptions = {
      // className - if
      opacity: l.opacity || 1,
      visible: l.visible,
      // extent - if
      zIndex: 1,
      // minResolution - if
      // maxResolution - if
      // minZoom - if
      // maxZoom - if
      // source - if
      // map - not set
      // render - not set
      // properties - not set
      id: l.id,
      name: l.name,
      filtertype: l.filtertype,
      type,
      legendImg: l.legendImg
    };

    if (source) {
      layeroptions.source = source;
    }

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

    return layeroptions;
  }

  /**
   * define layer types
   */

  /**
   * https://openlayers.org/en/latest/apidoc/module-ol_layer_Tile-TileLayer.html
   * https://openlayers.org/en/latest/apidoc/module-ol_source_XYZ-XYZ.html
   */
  private create_xyz_layer(l: RasterLayer): olTileLayer<olTileSource> {
    const xyzOptions: olXYZOptions = {
      wrapX: false
    };

    if (l.crossOrigin) {
      xyzOptions.crossOrigin = l.crossOrigin;
    }

    const olsource = new olXYZ(xyzOptions);

    const layeroptions = this.createOlLayerOptions(l, 'xyz', olsource);

    const baseTileLayerOptions: olBaseTileLayerOptions<olTileSource> = {
      preload: 0,
      useInterimTilesOnError: true
    };
    const newlayer = new olTileLayer(Object.assign(layeroptions, baseTileLayerOptions));
    this.setSubdomains(l, newlayer);
    this.setCrossOrigin(l, newlayer);
    this.addEventsToLayer(l, newlayer, olsource);
    return newlayer;
  }


  /**
   * create_xyz_layer for Raster
   *
   * or
   *
   * https://openlayers.org/en/latest/apidoc/module-ol_layer_VectorTile-VectorTileLayer.html
   * https://openlayers.org/en/latest/apidoc/module-ol_source_VectorTile-VectorTile.html
   * https://openlayers.org/en/latest/apidoc/module-ol_format_MVT-MVT.html
   */
  private create_tms_layer<T extends RasterLayer | VectorLayer>(l: T): tmsReturnType<T> {
    let newlayer = null;
    if (l instanceof RasterLayer) {
      newlayer = this.create_xyz_layer(l);
      newlayer.set('type', 'tms');
      return newlayer;

    } else if (l instanceof VectorLayer) {
      const olsource = new olVectorTileSource({
        format: new olMVT(),
        tileGrid: createXYZ({ minZoom: l.minZoom || undefined, maxZoom: l.maxZoom || undefined }),
        url: l.url,
        wrapX: false
      });

      const layeroptions = this.createOlLayerOptions(l, 'tms', olsource);

      const vectorTileLayerOptions: olVectorTileLayerOptions = {
        declutter: true,
        renderMode: 'hybrid'
      };

      newlayer = new olVectorTileLayer(Object.assign(layeroptions, vectorTileLayerOptions));
      this.setCrossOrigin(l, newlayer);
      this.addEventsToLayer(l, newlayer, olsource);

      const style = l?.options?.style;
      const mapboxSourceKey = l?.options?.styleSource;
      if (style && mapboxSourceKey) {
        /**
         * The urls from olsource are not used if sources.<source>.url are set in the open map style
         * if tms service is used or no correct TileJSON is available we have to override the urls
         */
        applyStyle(newlayer, style, mapboxSourceKey).then(res => {
          this.setSubdomains(l, newlayer);
        });
      }

      return newlayer;
    }
  }

  private create_wms_layer(l: WmsLayer) {
    let newlayer: olTileLayer<olTileSource> | olImageLayer<olImageSource>;
    if (l.params?.TILED === 'true' || l.params?.TILED === undefined || l.params?.TILED === null) {
      newlayer = this.create_tiled_wms_layer(l);
    } else if (l.params?.TILED === 'false') {
      newlayer = this.create_image_wms_layer(l);
    }
    return newlayer;
  }

  /**
   * https://openlayers.org/en/latest/apidoc/module-ol_layer_Tile-TileLayer.html
   * https://openlayers.org/en/latest/apidoc/module-ol_source_TileWMS-TileWMS.html
   */
  private create_tiled_wms_layer(l: WmsLayer): olTileLayer<olTileSource> {
    const tileOptions: olTileWMSOptions = {
      /** use assign here otherwise params is passed by object reference to the openlayers layer! */
      params: Object.assign({}, this.keysToUppercase(l.params)), // params: {} = { ...l.params } ~ same as assign destructuring
      wrapX: false
    };

    if (l.tileSize) {
      tileOptions['tileGrid'] = this.getTileGrid<olTileGrid>('default', null, l.tileSize);
      delete tileOptions.params['tileSize'];
    }

    if (l.crossOrigin) {
      tileOptions.crossOrigin = l.crossOrigin;
    }
    const olsource = new olTileWMS(tileOptions);
    const baseTileLayerOptions: olBaseTileLayerOptions<olTileSource> = {
      preload: 0,
      useInterimTilesOnError: true
    };

    const layeroptions = this.createOlLayerOptions(l, 'wms', olsource);
    const newlayer = new olTileLayer(Object.assign(layeroptions, baseTileLayerOptions));
    this.setSubdomains(l, newlayer);
    this.addEventsToLayer(l, newlayer, olsource);
    return newlayer;
  }

  /**
   * https://openlayers.org/en/latest/apidoc/module-ol_layer_Image-ImageLayer.html
   * https://openlayers.org/en/latest/apidoc/module-ol_source_ImageWMS-ImageWMS.html
   */
  private create_image_wms_layer(l: WmsLayer): olImageLayer<olImageSource> {
    const options: olImageWMSOptions = {
      /**
       * use assign here otherwise params is passed by object reference to the openlayers layer!
       * https://thecodebarbarian.com/object-assign-vs-object-spread.html
       */
      params: Object.assign({}, this.keysToUppercase(l.params)), // params: {} = { ...l.params } ~ same as assign destructuring
      url: l.url
    };
    const olsource = new olImageWMS(options);
    const layeroptions = this.createOlLayerOptions(l, 'wms', olsource);
    const baseImageLayerOptions: olBaseImageLayerOptions<olImageSource> = {

    };
    const newlayer = new olImageLayer(Object.assign(layeroptions, baseImageLayerOptions));
    this.addEventsToLayer(l, newlayer, olsource);
    return newlayer;
  }

  /**
   * https://openlayers.org/en/latest/apidoc/module-ol_layer_Tile-TileLayer.html
   * https://openlayers.org/en/latest/apidoc/module-ol_source_WMTS-WMTS.html
   */
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
      wmtsOptions = Object.assign({}, wmtsOptions, l.params);


      if (l.crossOrigin) {
        wmtsOptions.crossOrigin = l.crossOrigin;
      }

      const olsource = new olWMTS(wmtsOptions);
      const layeroptions = this.createOlLayerOptions(l, 'wmts', olsource);
      const baseTileLayerOptions: olBaseTileLayerOptions<olTileSource> = {};

      const newlayer = new olTileLayer(Object.assign(layeroptions, baseTileLayerOptions));
      this.setSubdomains(l, newlayer);
      this.setCrossOrigin(l, newlayer);
      this.addEventsToLayer(l, newlayer, olsource);
      return newlayer;
    } else {
      const layer = l as Layer;
      console.error(`layer with id: ${layer.id} and type ${layer.type} is no instanceof WmtsLayer!`);
    }
  }

  /**
   * check projects/demo-maps/src/app/route-components/route-example-olperformance/services/largelayers.service.ts
   * for WFS examples.
   *
   * https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html
   * https://openlayers.org/en/latest/apidoc/module-ol_source_Vector-VectorSource.html
   */
  private create_wfs_layer(l: VectorLayer): olVectorLayer<olVectorSource<olGeometry>> {
    let url = null;
    if (l.url.indexOf('http://') === 0 || l.url.indexOf('https://') === 0) {
      url = new URL(l.url);
    } else {
      url = new URL(l.url, window.location.origin);
    }

    // making sure that srsname is set to current projection
    url.searchParams.set('srsname', this.EPSG);
    // note that we don't need to adjust the bbox. contrary to wms'es, in a wfs,
    // a bbox may use another projection than the srsname.

    const olsource = new olVectorSource({
      format: new olGeoJSON(),
      url: url.toString()
    });

    const layeroptions = this.createOlLayerOptions(l, 'wfs', olsource);
    const baseVectorLayerOptions: olBaseVectorLayerOptions<olVectorSource<olGeometry>> = {};

    if (l.options) {
      // here Object.assign modifies the target object - style... is included
      Object.assign(baseVectorLayerOptions, l.options);
    }

    const newlayer = new olVectorLayer(Object.assign(layeroptions, baseVectorLayerOptions));
    if (l.cluster) {
      this.setCluster(l, newlayer, olsource, {});
    }
    this.setSubdomains(l, newlayer);
    this.setCrossOrigin(l, newlayer);
    this.addEventsToLayer(l, newlayer, olsource);
    return newlayer;
  }

  /**
   * https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html
   * https://openlayers.org/en/latest/apidoc/module-ol_source_Vector-VectorSource.html
   * https://openlayers.org/en/latest/apidoc/module-ol_format_GeoJSON-GeoJSON.html
   */
  private create_geojson_layer(l: VectorLayer) {
    let olsource: olVectorSource;
    if (l.data) {
      olsource = new olVectorSource({
        features: this.geoJsonToFeatures(l.data),
        format: new olGeoJSON(),
        wrapX: false
      });
    } else if (l.url) {
      olsource = new olVectorSource({
        url: l.url,
        format: new olGeoJSON({
          dataProjection: WGS84,
          featureProjection: this.EPSG
        }),
        wrapX: false
      });
    }

    const layeroptions = this.createOlLayerOptions(l, 'geojson', olsource);

    const baseVectorLayerOptions: olBaseVectorLayerOptions<olVectorSource<olGeometry>> = {};
    if (l.options) {
      // here Object.assign modifies the target object - style... is included
      Object.assign(baseVectorLayerOptions, l.options);
    }

    const newlayer = new olVectorLayer(Object.assign(layeroptions, baseVectorLayerOptions));
    if (l.cluster) {
      this.setCluster(l, newlayer, olsource, {});
    }
    this.setCrossOrigin(l, newlayer);
    this.addEventsToLayer(l, newlayer, olsource);
    return newlayer;
  }

  /**
   * https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html
   * https://openlayers.org/en/latest/apidoc/module-ol_source_Vector-VectorSource.html
   * https://openlayers.org/en/latest/apidoc/module-ol_format_KML-KML.html
   */
  private create_kml_layer(l: VectorLayer) {
    let olsource: olVectorSource;
    if (l.data) {
      olsource = new olVectorSource({
        features: new olKML({ extractStyles: true }).readFeatures(l.data, {
          dataProjection: WGS84,
          featureProjection: this.EPSG
        }),
        format: new olKML(),
        wrapX: false
      });
    } else if (l.url) {
      olsource = new olVectorSource({
        url: l.url,
        format: new olKML({
          extractStyles: true,
          crossOrigin: (l.crossOrigin && l.crossOrigin === null) ? l.crossOrigin : 'anonymous',
        }),
        wrapX: false
      });
    }

    const layeroptions = this.createOlLayerOptions(l, 'kml', olsource);

    const baseVectorLayerOptions: olBaseVectorLayerOptions<olVectorSource<olGeometry>> = {};
    if (l.options) {
      // here Object.assign modifies the target object - style... is included
      Object.assign(baseVectorLayerOptions, l.options);
    }

    const newlayer = new olVectorLayer(Object.assign(layeroptions, baseVectorLayerOptions));
    if (l.cluster) {
      this.setCluster(l, newlayer, olsource, {});
    }
    this.setCrossOrigin(l, newlayer);
    this.addEventsToLayer(l, newlayer, layeroptions.source);
    return newlayer;
  }

  /** bug fix: https://github.com/openlayers/openlayers/issues/10099 */
  private setCrossOrigin(l: Layer, layer: olLayer<olSource>): void {
    if (layer instanceof olLayer) {
      const olsource = layer.getSource();
      /** set crossOrigin for popup layers  */
      if (l.popup && !l.crossOrigin && l.crossOrigin !== null) {
        this.sourceSetCross(olsource);
      }

      if (l.crossOrigin || l.crossOrigin === null) {
        this.sourceSetCross(olsource);
      }
    }
  }

  /**
   * set cluster source and style for point layers
   */
  private setCluster(l: VectorLayer, layer: olVectorLayer<olVectorSource>, source: olVectorSource, styleCache: { [key: string]: any }): void {
    if (l.cluster) {
      const clusteroptions: olClusterOptions = {};
      if (typeof l.cluster === 'object') {
        // here Object.assign modifies the target object
        Object.assign(clusteroptions, l.cluster);
      }
      clusteroptions.source = source;
      const clusterSource = new olCluster(clusteroptions);
      // layeroptions.source = clusterSource;
      layer.setSource(clusterSource);
      layer.setStyle((feature) => {
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
      });
    }
  }

  /** use subdomains to setUrl/s on source */
  private setSubdomains(l: Layer, layer: olLayer<olSource>): void {
    if (l instanceof VectorLayer || l instanceof RasterLayer) {
      const source = layer.getSource() as olXYZ | olVectorTile | olTileWMS | olWMTS | olVectorSource<olGeometry>;
      if (l.subdomains) {
        if (l.type === 'wfs' && (source instanceof olVectorSource)) {
          l.url = l.url.replace('{s}', `${l.subdomains[0]}-${l.subdomains[l.subdomains.length - 1]}`);
          source.setUrl(l.url);
        } else if (!(source instanceof olVectorSource)) {
          const urls = l.subdomains.map((item) => l.url.replace('{s}', `${item}`));
          source.setUrls(urls);
        }
      } else {
        source.setUrl(l.url);
      }
    }
  }

  private sourceSetCross(source: olSource): void {
    /**
     * https://github.com/search?q=crossOrigin+repo%3Aopenlayers%2Fopenlayers+path%3Asrc%2Fol%2Fsource%2F&type=Code&ref=advsearch&l=&l=
     */
    if (source instanceof olImageSource || source instanceof olTileImageSource || source instanceof olTileSource) {
      source['crossOrigin'] = 'anonymous';
      source['crossOrigin_'] = 'anonymous';
    }
  }

  /**
   * Use this Layer to add a not supported OpenLayers layer
   *
   * custom_layer: olBaseLayer
   */
  private create_custom_layer(l: CustomLayer<olBaseLayer>) {
    if (l.custom_layer) {
      const layer = l.custom_layer;

      if (layer instanceof olLayer) {
        const olsource = layer.getSource() as olSource;
        if (l.attribution) {
          olsource.setAttributions([l.attribution]);
        }

        if (l.continuousWorld) {
          /**
           * set wrapX after source creation is not possible so we have to use the private property
           * It works based on a test in codesandbox.io
           * https://github.com/openlayers/openlayers/blob/v6.13.0/src/ol/source/Source.js#L48
           */
          // tslint:disable-next-line: no-string-literal
          olsource['wrapX_'] = l.continuousWorld;
        } else {
          // tslint:disable-next-line: no-string-literal
          olsource['wrapX_'] = false;
        }
        this.setCrossOrigin(l, layer);
        this.addEventsToLayer(l, layer, olsource);

        // https://github.com/dlr-eoc/ukis-frontend-libraries/issues/100
        if (olsource instanceof olRasterSource) {
          layer.on('change:source', (evt) => {
            evt.oldValue.dispose();
          });
        }
      } else if (layer instanceof olLayerGroup) {
        layer.getLayers().forEach(gl => {
          /** fix add olUID to check if a group layer */
          const layerId = `${l.id}_olUID:Layer_${olGetUid(gl)}`;
          if (!gl.get('id')) {
            gl.set('id', layerId);
          }
          if (gl instanceof olLayer) {
            this.setCrossOrigin(l, gl);
            this.addEventsToLayer(l, gl, gl.getSource());
          }
          /**
           * groups are flattened in map.getAllLayers so add popup to each layer
           * will show the popup for top layer in the Group if there is a pixel color or feature
           */
          if (l.popup && !gl.get('popup')) {
            gl.set('popup', l.popup);
            /** set className if not default ol-layer */
            if (gl.getClassName() === 'ol-layer') {
              gl['className_'] = layerId;
            }
          }

          /** fix set bbox for layers in olLayerGroup not only for the group */
          if (l.bbox) {
            const extent = transformExtent(l.bbox.slice(0, 4) as [number, number, number, number], WGS84, this.getProjection().getCode());
            gl.setExtent(extent);
          }
        });
      } else {
        console.error(`The custom_layer of ${l.id} in not a openlayers Layer`);
      }

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

      const layeroptions: ILayerOptions & olLayerOptions<LayerOptionsSources> = {
        type: 'custom',
        name: l.name,
        id: l.id,
        visible: l.visible,
        legendImg: l.legendImg,
        opacity: l.opacity || 1,
        zIndex: 1,
      };

      if (l.popup && !(layer instanceof olLayerGroup)) {
        layeroptions.popup = l.popup;
        /**
         * ol 6.x problem if popup (map.forEachLayerAtPixel) use className
         * needs the class Name to detect if it is a different layer at the pixel value
         * https://github.com/openlayers/openlayers/releases/tag/v6.0.0
         */
        // tslint:disable-next-line: no-string-literal
        layer['className_'] = l.id;
      }

      if (l.bbox) {
        const extent = transformExtent(l.bbox.slice(0, 4) as [number, number, number, number], WGS84, this.getProjection().getCode());
        layer.setExtent(extent);
      }

      layer.setProperties(layeroptions);
      // don't delete the custom Layer, it is used to newly create all layers from layerservice after map all layers removed!
      // delete l.custom_layer;
      return layer;

    } else {
      console.log('attribute custom_layer not set on layer type custom!', l);
    }
  }

  /**
   * Use this Layer to stack multiple ukis layers in one.
   * creates a olLayerGroup from create_layers
   */
  private create_stacked_layer(l: StackedLayer) {
    if (l instanceof StackedLayer) {
      const layers = l.layers.map(ml => {
        /** Set all to visible because the visibility of merge layers cannot be controlled later */
        ml.visible = true;
        /** popups are get from the olLayer later so add them */
        ml.popup = l.popup;
        /** events are get from the olLayer later so add them */
        ml.events = l.events;
        return this.create_layers(ml);
      });

      const baseLayerOptions = this.createOlLayerOptions(l, 'custom');
      const groupOptions: olLayerGroupOptions = {
        layers
      };

      const layerGroup = new olLayerGroup(Object.assign(baseLayerOptions, groupOptions));
      return layerGroup;
    } else {
      console.log('layer is not of type StackedLayer!', l);
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

  private eventIsBrowserEvent(popupEvt: popup['event'], evt: olMapBrowserEvent<PointerEvent>) {
    if (popupEvt === 'move' && evt.type === 'pointermove') {
      return true;
    } else if (popupEvt === 'click' && evt.type === 'click') {
      return true;
    }
  }



  /** USED in map-ol.component */
  /**
   *
   * - map.getFeaturesAtPixel: Detect features that intersect a pixel on the viewport
   *   Vector Layers
   *
   * - layer.getData: Detect layers that have a color value at a pixel on the viewport
   *   Raster Layers
   *   Data for an image can only be retrieved if the source's crossOrigin property is set.
   */

  /**
   *  1. on a Map event iterate through map.getAllLayers if:
   *  - layer visible
   *  - opacity > 0
   *  - pixel coordinate in layer extent
   *  - layer has popup
   * 
   *  - filterLayerNoPopup
   *  - layer has pixel data
   *  - pixel data alpha value > 0
   *  - layer is raster
   * 
   *  - filterLayerNoPopup
   *  - pixel coordinate in layer extent
   *  - layer is vector
   *  - layer has features at pixel
   * 
   * returns top visible layer - so no popups are shown for layers beneath if layer.opacity > 0 https://github.com/dlr-eoc/ukis-frontend-libraries/issues/94#issuecomment-916759628
   *  2. check top layer event (click or move)
   *  3. set cursor for Layers with a color value or feature
   *  4. differentiate between raster and vector
   * 
   *  5. limit properties if popup property is: Array<string> | popup | popup[] -> popup?.filterkeys
   *  6. overwrite properties if popup property is: popup | popup[]
   *  7. check for popupFunction, asyncPopup and dynamicPopup
   *  8. use addPopup() or addPopupObj()
   *
   *  9. check popup event and if move popup exists => reuse old popup
   *  10. remove move popups if different event or !popup.event
   *  11. create new popup if not 9. or 10.
   *  12. prepare ol overlayoptions
   *  13. remove DynamicPopup if exists
   *  14. createPopupContainer
   *  15. set ol overlay addEvent and type = popup
   *  16. get coordinate from geometry or map.event
   *  17. set Position and map.addOverlay(overlay) if popup not exists
   */
  public layersOnMapEvent(evt: olMapBrowserEvent<PointerEvent>) {
    let layerHit = false;
    const allMapLayers = this.map.getAllLayers();
    let layersLength = allMapLayers.length;

    /** iterate in reverse order (from top to bottom) if a layer has data/feature at the pixel, if a layer is found break out to only use top layer  */
    let item: { layer: olLayer<any>, color?: Uint8ClampedArray | Uint8Array | Float32Array | DataView, feature?: olFeature | olRenderFeature } = null;
    while (layersLength--) {
      const layer = allMapLayers[layersLength];
      const layerVisible = layer.getVisible();
      const layerOpacity = layer.getOpacity();
      // check for layers with no popup above others
      if (layerVisible && layerOpacity !== 0 && this.filterLayerExtent(layer, evt.pixel) && !layer.get('popup')) {
        break;
      } else if (this.filterLayerNoPopup(layer) && layer.getData && layer.getData(evt.pixel) && this.checkIsRaster(layer)) {
        // rgba Data
        const pixelData = layer.getData(evt.pixel);
        let a
        if (pixelData instanceof Uint8ClampedArray || pixelData instanceof Uint8Array || pixelData instanceof Float32Array) {
          a = pixelData[3];
        }

        if (a || pixelData instanceof DataView) {
          item = {
            layer,
            color: pixelData
          };
          break;
        }

      } else if (this.filterLayerNoPopup(layer) && this.filterLayerExtent(layer, evt.pixel) && this.checkIsVector(layer)) {
        // fixes: https://github.com/dlr-eoc/ukis-frontend-libraries/issues/120
        const features = this.map.getFeaturesAtPixel(evt.pixel, {
          layerFilter: (l) => {
            return layer.get('id') === l.get('id')
          }
        });
        if (features.length) {
          item = {
            layer,
            feature: features[0]
          };
          break;
        }
      }
    }

    if (item) {
      const popup: Layer['popup'] = (item.layer.get('popup'));

      /** check if cursor was set (we need this only on move?) */
      this.hitLayerCurr = item.layer.get('id');
      if (!this.hitLayerPrev) {
        this.hitLayerPrev = this.hitLayerCurr;
      }

      /** set cursor for Layers with a color value */
      if (item.color || item.feature) {
        layerHit = true;
      }

      /** remove cursor and move-popups on layer change */
      if (this.hitLayerPrev && this.hitLayerPrev !== this.hitLayerCurr) {
        layerHit = false;
        this.hitLayerPrev = this.hitLayerCurr;
      }
      const useEvent = this.checkTopLayerEvent(evt, popup);
      if (useEvent) {
        this.layerOnEvent(evt, item.layer, item.color, item.feature);
      }

    }

    if (layerHit) {
      this.map.getTargetElement().style.cursor = 'pointer';
    } else {
      this.removeAllPopups((item) => {
        return item.get('addEvent') === 'pointermove';
      });
      this.map.getTargetElement().style.cursor = '';
    }
  }

  /**
   * To filtered out layers with no popup or show the popup beneath e.g. text overlays
   * in map.forEachLayerAtPixel for raster and map.forEachFeatureAtPixel for vector
   */
  private filterLayerNoPopup = (l: olLayer<olSource>) => {
    const popup: Layer['popup'] = (l.get('popup'));
    let shouldNotFilterLayer = true;
    if (!popup) {
      shouldNotFilterLayer = false;
    }
    if (popup && this.isPopupObj(popup)) {
      if (popup.filterLayer === true) {
        shouldNotFilterLayer = false;
      }
    }
    return shouldNotFilterLayer;
  }

  private checkTopLayerEvent(evt: olMapBrowserEvent<PointerEvent>, popup: Layer['popup']) {
    let useEvent: 'click' | 'move' = null;
    const clickOrMove = (evt: olMapBrowserEvent<PointerEvent>, popup: popup) => {
      if (popup.event) {
        if (this.eventIsBrowserEvent(popup.event, evt) && this.isPopupObjClick(popup)) {
          useEvent = 'click';
        } else if (this.eventIsBrowserEvent(popup.event, evt) && this.isPopupObjMove(popup)) {
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
        /** only show popups without an event for browser click  */
        if (evt.type === 'click') {
          useEvent = 'click';
        }
      }
    } else if (this.isPopupStringArray(popup)) {
      /** only show popups without an event for browser click  */
      if (evt.type === 'click') {
        useEvent = 'click';
      }
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
  private checkIsRaster(layer: olLayer<any>): layer is olBaseImageLayer<olImageSource, CanvasImageLayerRenderer> | olBaseTileLayer<olTileSource, CanvasTileLayerRenderer> {
    if (layer instanceof olBaseImageLayer || layer instanceof olBaseTileLayer) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * https://openlayers.org/en/latest/apidoc/module-ol_layer_Layer-Layer.html#Subclasses
   */
  private checkIsVector(layer: olLayer<any>): layer is olBaseVectorLayer<olVectorSource<any>, CanvasVectorLayerRenderer> {
    if (layer instanceof olBaseVectorLayer && !this.checkIsRaster(layer)) {
      return true;
    } else {
      return false;
    }
  }

  public layerOnEvent(evt: olMapBrowserEvent<PointerEvent>, layer: olLayer<any>, color?: Uint8ClampedArray | Uint8Array | Float32Array | DataView, feature?: olFeature | olRenderFeature) {
    if (this.checkIsRaster(layer)) {
      this.rasterOnEvent(evt, layer, color);
    } else if (this.checkIsVector(layer)) {
      this.vectorOnEvent(evt, layer, feature);
    }
  }

  private filterLayerExtent(layer, pixel) {
    let shouldNotFilterLayer = true;
    /** fix for https://github.com/openlayers/openlayers/issues/12886 */
    const layerExtent = layer.getExtent();
    if (layerExtent) {
      const pixelCoordinate = this.map.getCoordinateFromPixel(pixel);
      if (!olContainsCoordinate(layerExtent, pixelCoordinate)) {
        shouldNotFilterLayer = false;
      }
    }

    return shouldNotFilterLayer;
  }

  public vectorOnEvent(evt: olMapBrowserEvent<PointerEvent>, layer: olLayer<any>, feature: olFeature | olRenderFeature) {
    if (layer && feature) {
      const popup: Layer['popup'] = layer.get('popup');
      /** add layername and layerid to feature properties */
      let properties: any = {};

      const childFeatures = feature.getProperties().features;
      if (childFeatures && childFeatures.length === 1) {
        const childFeature = childFeatures[0];
        properties = childFeature.getProperties();
      } else if (childFeatures && childFeatures.length > 1) {
        /**
         * zoom to cluster on click
         * or check for layerpopup.event !== move
         */
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
      this.prepareAddPopup(properties, layer, feature, evt, popup);
    }
  }

  public rasterOnEvent(evt: olMapBrowserEvent<PointerEvent>, layer: olLayer<any>, color?: Uint8ClampedArray | Uint8Array | Float32Array | DataView) {
    const popup: Layer['popup'] = layer.get('popup');
    let properties: any = {};

    if (popup) {
      properties = layer.getProperties();
      properties.evt = evt;
      if (color) {
        properties.color = color;
      }

      this.prepareAddPopup(properties, layer, null, evt, popup);
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
      const popupObj = layerpopup.find(p => this.eventIsBrowserEvent(p.event, evt));
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
        if (this.eventIsBrowserEvent(p.event, evt)) {
          overwritePopup(p);
        }
      })
    } else if (this.isPopupObj(layerpopup)) {
      overwritePopup(layerpopup);
    }

    const addPopupObj = (popupObj: popup) => {
      /** async function where you can paste a html string to the callback */
      if ('asyncPopup' in popupObj) {
        popupObj.asyncPopup(popupProperties, (html) => {
          this.addPopup(args, null, html, popupObj.event, popupObj.single);
        });
        /** add event if popup object */
      } else {

        /** adjust args if popupFunction or dynamicPopup*/
        if (popupObj.popupFunction) {
          args.popupFn = popupObj.popupFunction; //This could be done in createPopupContainer()
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
        if (this.eventIsBrowserEvent(p.event, evt)) {
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
    const moveKeyLayerFeature = 'move_ID_L_F';
    const movePopup = this.getPopups().find(item => item.getId() === moveID);
    const browserEvent = args.event;

    let moveIDlf = null;
    if (event === 'move') {
      /** only on raster color is added - see rasterOnEvent()*/
      if (args.properties?.color) {
        moveIDlf = `${layerID}:${args.properties?.color.toString()}`;
      } else {
        if (args.feature) {
          moveIDlf = `${layerID}:${olGetUid(args.feature)}`;
        } else if (args.layer) {
          moveIDlf = `${layerID}:${olGetUid(args.layer)}`;
        }
      }
    }

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

      /** check if layer or feature changes, then only create new container */
      if (moveIDlf !== movePopup.get(moveKeyLayerFeature)) {
        const container = this.createPopupContainer(movePopup, args, popupObj, html, event);
        movePopup.setElement(container);
      }

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
        id: popupID,
        autoPan: {
          animation: {
            duration: 250
          }
        },
        positioning: 'bottom-center',
        stopEvent: true,
        insertFirst: false,
      };

      let overlayoptions = defaultOptions;

      /**
       * Check if popup is an array of popup obj's or a popup obj
       * then merge the popup?.options with the default ol/overlay options
       */
      if (this.isPopupObjArray(layerpopup)) {
        const objForEvent = layerpopup.find(p => this.eventIsBrowserEvent(p.event, browserEvent));
        if (objForEvent.options) {
          overlayoptions = Object.assign(defaultOptions, objForEvent.options);
        }
      } else if (this.isPopupObj(layerpopup) && layerpopup.options) {
        overlayoptions = Object.assign(defaultOptions, layerpopup.options);
      }

      const overlay = new olOverlay(overlayoptions);
      if (moveIDlf) {
        overlay.set(moveKeyLayerFeature, moveIDlf);
      }

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

  public hideAllPopups(hide: boolean, filter?: (item: olOverlay) => boolean) {
    let popups = this.getPopups();
    if (filter) {
      popups = this.getPopups().filter(filter);
    }
    popups.forEach((overlay) => {
      if (overlay.get(OVERLAY_TYPE_KEY) === 'popup') {
        const element = overlay.getElement();
        if (hide) {
          element.classList.add('hidden');
        } else {
          element.classList.remove('hidden');
        }
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
    const popupBody = createComponent(args.dynamicPopup.component, {
      environmentInjector: this.envInjector,
      hostElement: anchorElement
    });

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
  public setExtent(extent: TGeoExtent, geographic?: boolean, fitOptions?: olFitOptions): TGeoExtent {
    const projection = (geographic) ? getProjection(WGS84) : getProjection(this.EPSG);
    const transfomExtent = transformExtent(extent.slice(0, 4) as [number, number, number, number], projection, this.getProjection().getCode());
    const newFitOptions: olFitOptions = {
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

  public zoomInOut(value: '-' | '+', animateOptions?: { callback?: (complete) => void, duration?: number, easing?: (arg: number) => number, zoomStep?: number }) {
    const view = this.map.getView();
    if (!view) {
      // the map does not have a view, so we can't act
      // upon it
      return;
    }

    const zoomStep = animateOptions?.zoomStep || 1;
    const delta = value === '+' ? zoomStep : -1 * zoomStep;
    const currentZoom = view.getZoom();
    if (currentZoom !== undefined) {
      const newZoom = view.getConstrainedZoom(currentZoom + delta);
      if (view.getAnimating()) {
        view.cancelAnimations();
      }
      view.animate({
        zoom: newZoom,
        duration: animateOptions?.duration || 250,
        easing: animateOptions?.easing || easeOut
      }, (complete) => {
        if (animateOptions.callback) {
          animateOptions.callback(complete);
        }
      });
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
