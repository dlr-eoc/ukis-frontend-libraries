import { Injectable } from '@angular/core';


import { Layer, VectorLayer, CustomLayer, RasterLayer, popup, IRasterLayerOptions, ICustomLayerOptions } from '@ukis/services-layers';

import olMap from 'ol/Map';
import olView from 'ol/View';

import olBaseLayer from 'ol/layer/Base';
import olLayerGroup from 'ol/layer/Group';
import olOverlay from 'ol/Overlay';

import olTileLayer from 'ol/layer/Tile';
import olVectorLayer from 'ol/layer/Vector';
import olImageLayer from 'ol/layer/Image';
import olVectorTileLayer from 'ol/layer/VectorTile';

import olXYZ from 'ol/source/XYZ';
import olTileWMS from 'ol/source/TileWMS';
import olWMTS from 'ol/source/WMTS';
import olWMTSTileGrid from 'ol/tilegrid/WMTS';
import olVectorSource from 'ol/source/Vector';
import olTileJSON from 'ol/source/TileJSON';
import olCluster from 'ol/source/Cluster';
// import ImageWMS from 'ol/source/ImageWMS';
// import VectorTileSource from 'ol/source/VectorTile';
import olFeature from 'ol/Feature';

import olCollection from 'ol/Collection';
import olGeoJSON from 'ol/format/GeoJSON';
import olProjection from 'ol/proj/Projection.js';
import { transformExtent, get as getProjection, transform } from 'ol/proj.js';
import { extend as olExtend, getWidth, getTopLeft } from 'ol/extent.js';
import { easeOut } from 'ol/easing.js';
import olCoordinate from 'ol/coordinate';


import olStyle from 'ol/style/Style';
import olText from 'ol/style/Text';
import olFill from 'ol/style/Fill';
import olCircleStyle from 'ol/style/Circle';
import olStroke from 'ol/style/Stroke';

import { DragBox, Select } from 'ol/interaction';
import { IEocOwsWmtsMatrixSet } from '@ukis/services-owc-json';



@Injectable({
  providedIn: 'root'
})
export class MapOlService {
  public map: olMap; // ol.Map;
  public view: olView;
  public temp: any;
  public EPSG: string;
  private hitTolerance = 0;
  constructor() {
    this.map = new olMap();
    this.view = new olView();
    this.temp = {};
    this.EPSG = 'EPSG:3857'; // 'EPSG:4326'; EPSG:3857
    // this.createMap();
  }

  public createMap(target?: HTMLElement) {
    const zoom = 3;
    const center = {
      lat: 0,
      lon: 0
    };

    const _baselayerGroup = new olLayerGroup(<any>{
      title: 'Base maps',
      type: 'baselayers',
      layers: []
    });


    const _layersGroup = new olLayerGroup(<any>{
      title: 'Layers',
      type: 'layers',
      layers: []
    });

    // ---------------------------------------------------------------------------------------------------
    const _overlayGroup = new olLayerGroup(<any>{
      title: 'Overlays',
      type: 'overlays',
      layers: []
    });

    const _view = new olView({
      center: transform([center.lon, center.lat], 'EPSG:4326', this.EPSG),
      zoom: zoom,
      projection: getProjection(this.EPSG)
    });

    /** define map in constructor so it is created before to use it in projects onInit Method  */
    [_baselayerGroup, _layersGroup, _overlayGroup].map(layer => this.map.addLayer(layer));
    this.map.setView(_view);
    this.map.set('controls', []);
    this.view = this.map.getView();
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
   * @param conditionForDrawing 
   * @param onBoxStart 
   * @param onBoxEnd 
   */
  public addBboxSelection(conditionForDrawing: (evt: any) => boolean, onBoxStart: () => void, onBoxEnd: (any) => void) {

    let dragBox = new DragBox({
      condition: conditionForDrawing
    });

    dragBox.on('boxstart', function () {
      onBoxStart();
    });

    dragBox.on('boxend', function () {
      var extent = dragBox.getGeometry().getExtent();
      onBoxEnd(extent);
    });

    this.map.addInteraction(dragBox);
  }

  public getLayers(type: 'baselayers' | 'layers' | 'overlays'): olBaseLayer[] {
    let layers;
    this.map.getLayers().getArray().forEach((layerGroup: olLayerGroup) => {
      if (layerGroup.get('type') === type) {
        layers = layerGroup.getLayers().getArray();
      }
    });
    return layers;
  }

  public getLayerByKey(key: { key: string, value: string }, type: 'baselayers' | 'layers' | 'overlays') {
    const layers = this.getLayers(type);
    let _layer;
    layers.forEach((layer) => {
      if (layer.get(key.key) && layer.get(key.key) === key.value) {
        _layer = layer;
      }
    });
    return _layer;
  }

  public addLayer(layer: olBaseLayer, type: 'baselayers' | 'layers' | 'overlays') {
    let layers;
    this.map.getLayers().getArray().forEach((layerGroup: olLayerGroup) => {
      if (layerGroup.get('type') === type) {
        layers = layerGroup.getLayers().getArray();
        layers.push(layer);
        layerGroup.setLayers(new olCollection(layers));
      }
    });
    return layers;
  }

  public addLayers(layers: olBaseLayer[], type: 'baselayers' | 'layers' | 'overlays') {
    let _layers;
    this.map.getLayers().getArray().forEach((layerGroup: olLayerGroup) => {
      if (layerGroup.get('type') === type) {
        _layers = layers;
        layerGroup.setLayers(new olCollection(_layers));
      }
    });
    return layers;
  }

  public removeLayerByKey(key: { key: string, value: string }, type: 'baselayers' | 'layers' | 'overlays') {
    const layer = this.getLayerByKey(key, type);
    this.map.removeLayer(layer);
  }

  public removeAllLayers(type: 'baselayers' | 'layers' | 'overlays') {
    let layers;
    this.map.getLayers().getArray().forEach((layerGroup: olLayerGroup) => {
      if (layerGroup.get('type') === type) {
        layers = layerGroup.getLayers();
        layers.clear();
      }
    });

  }
  /** if only one group of them map is used and setLayers is called then the map flickers!
   * this is because of all layers are new created and the have all new ol_uid's
   *
   * can we deep check if a layer is exactly the same and dont create it new???
   */
  public setLayers(layers: Array<Layer>, type: 'baselayers' | 'layers' | 'overlays') {
    const _oldLayers: olBaseLayer[] = this.getLayers(type);
    const __layers = <any>[];
    const _layers = this.sortOldAndNewLayers(_oldLayers, layers);

    // TODO try to deep check if a layer if exactly the same and dont create it new
    if (_layers.length < 1 && type !== 'baselayers') {
      // this.removeAllLayers('overlays');
      // this.removeAllLayers('layers');
      this.removeAllLayers(type);
    } else {
      _layers.forEach((item) => {
        let _layer;
        switch (item.newlayer.type) {
          case 'xyz':
            _layer = this.create_xyz_layer(<RasterLayer>item.newlayer, item.oldlayer);
            break;
          case 'wms':
            _layer = this.create_wms_layer(<RasterLayer>item.newlayer, item.oldlayer);
            break;
          case 'wmts':
            _layer = this.create_wmts_layer(<RasterLayer>item.newlayer, item.oldlayer);
            break;
          case 'geojson':
            _layer = this.create_geojson_layer(<VectorLayer>item.newlayer, item.oldlayer);
            break;
          case 'custom':
            _layer = this.create_custom_layer(<CustomLayer>item.newlayer, item.oldlayer);
            break;
        }
        // check if layer not undefined
        if (_layer) {
          __layers.push(_layer);
        }
      });
    }

    if (__layers.length > 0) {
      this.addLayers(__layers, type);
    }
  }

  public setLayer(newLayer: Layer, type: 'baselayers' | 'layers' | 'overlays'): void {
    const oldLayers: olBaseLayer[] = this.getLayers(type);
    const oldLayer = oldLayers.find(l => l.get('id') === newLayer.id);
    let newOlLayer;
    switch (newLayer.type) {
      case 'xyz':
          newOlLayer = this.create_xyz_layer(<RasterLayer>newLayer, oldLayer);
        break;
      case 'wms':
          newOlLayer = this.create_wms_layer(<RasterLayer>newLayer, oldLayer);
        break;
      case 'wmts':
          newOlLayer = this.create_wmts_layer(<RasterLayer>newLayer, oldLayer);
        break;
      case 'geojson':
          newOlLayer = this.create_geojson_layer(<VectorLayer>newLayer, oldLayer);
        break;
      case 'custom':
          newOlLayer = this.create_custom_layer(<CustomLayer>newLayer, oldLayer);
        break;
    }
    this.removeLayerByKey({key: 'id', value: oldLayer.get('id')}, type);
    this.addLayer(newOlLayer, type);
  }

  sortOldAndNewLayers(oldlayers: olBaseLayer[], newlayers: Layer[]): {oldlayer: olBaseLayer | null, newlayer: Layer}[] {
    const _layers = newlayers.map((layer) => {
      return {
        oldlayer: oldlayers.filter(_layer => _layer.get('id') === layer.id)[0],
        newlayer: layer
      };
    });
    return _layers;
  }

  /**
   * define layer types
   */
  private create_xyz_layer(l: RasterLayer, oldlayer?: olBaseLayer): olTileLayer {
    const xyz_options: any = {
      attributions: [l.attribution],
      wrapX: l.continuousWorld
    };

    if (l['crossOrigin']) {
      xyz_options.crossOrigin = l['crossOrigin'];
    }

    const _source = new olXYZ(xyz_options);

    if (l.subdomains) {
      const _urls = l.subdomains.map((item) => l.url.replace('{s}', `${item}`));
      _source.setUrls(_urls);

    } else {
      _source.setUrl(l.url);
    }

    const _layeroptions: any = {
      type: 'xyz',
      name: l.name,
      id: l.id,
      visible: l.visible,
      legendImg: l.legendImg,
      opacity: l.opacity || 1,
      zIndex: l.zIndex || 1,
      source: _source
    };

    if (l.popup) {
      _layeroptions.popup = l.popup;
    }

    if (l.bbox) {
      _layeroptions.extent = transformExtent(l.bbox, 'EPSG:4326', this.map.getView().getProjection().getCode());
    }

    return new olTileLayer(_layeroptions);
  }

  private create_wms_layer(l: RasterLayer, oldlayer?: olBaseLayer): olTileLayer {

    const tile_options: any = {
      attributions: [l.attribution],
      wrapX: l.continuousWorld,
      params: this.keysToUppercase(l.params)
    };

    if (l['crossOrigin']) {
      tile_options.crossOrigin = l['crossOrigin'];
    }

    const _source = new olTileWMS(tile_options);

    if (l.subdomains) {
      const _urls = l.subdomains.map((item) => l.url.replace('{s}', `${item}`));
      _source.setUrls(_urls);

    } else {
      _source.setUrl(l.url);
    }

    const _layeroptions: any = {
      type: 'wms',
      name: l.name,
      id: l.id,
      visible: l.visible,
      legendImg: l.legendImg,
      opacity: l.opacity || 1,
      zIndex: l.zIndex || 1,
      source: _source
    };

    if (l.popup) {
      _layeroptions.popup = l.popup;
    }

    if (l.bbox) {
      _layeroptions.extent = transformExtent(l.bbox, 'EPSG:4326', this.map.getView().getProjection().getCode());
    }
    const newlayer = new olTileLayer(_layeroptions);
    return newlayer;
  }

  public getProjection() {
    return this.map.getView().getProjection();
  }

  private getWmtsMatrixSet(projection: any): string {
    const matrixSet = projection.getCode();
    return matrixSet;
  }

  private getWmtsTileGrid(matrixSetName: string, matrixSets?: IEocOwsWmtsMatrixSet): olWMTSTileGrid {
    const projection = this.getProjection();
    const projectionExtent = projection.getExtent();

    let resolutions;
    let matrixIds;

    if (matrixSets && matrixSets[matrixSetName]) {
      // if the given matrixSet is already provided, use it.

      const matrixSet = matrixSets[matrixSetName];
      resolutions = matrixSet.resolutions;
      matrixIds = matrixSet.matrixIds;

    } else {
      // else create a default matrixSet.

      const UnitsPerPixLargestTile = getWidth(projectionExtent) / 256;
      resolutions = new Array(14);
      matrixIds = new Array(14);
      for (let z = 0; z < 14; ++z) {
        resolutions[z] = UnitsPerPixLargestTile / Math.pow(2, z);
        matrixIds[z] = projection.getCode() + ':' + z;
      }

    }

    const tileGrid = new olWMTSTileGrid({
      origin: getTopLeft(projectionExtent),
      resolutions: resolutions,
      matrixIds: matrixIds
    });
    return tileGrid;
  }

  private create_wmts_layer(l: RasterLayer, oldlayer?: olBaseLayer): olTileLayer {

    // TODO: here we create a standard-tilegrid. While this will be enough for most of our wmts,
    // it would be more rigorous to make a getCapabilites-request to the server instead.
    // https://openlayers.org/en/latest/examples/wmts-layer-from-capabilities.html?q=wmts

    const projection = this.getProjection();
    const matrixSet = this.getWmtsMatrixSet(projection);
    const tileGrid = this.getWmtsTileGrid(matrixSet, l.params.matrixSets);

    const wmts_options: any = {
      url: l.url,
      matrixSet: matrixSet || l.params.matrixSet,
      tileGrid: tileGrid || l.params.tileGrid,
      projection: projection,
      attributions: [l.attribution],
      wrapX: l.continuousWorld,
    };
    
    if (l.params) {
      wmts_options['layer'] = l.params.layer || l.params.LAYER;
      wmts_options['style'] = l.params.style || l.params.STYLE;
      wmts_options['version'] = l.params.version || l.params.VERSION || '1.0.0';
      wmts_options['format'] = l.params.format || l.params.FORMAT || 'image/png';
    }

    if (l['crossOrigin']) {
      wmts_options.crossOrigin = l['crossOrigin'];
    }

    const _source = new olWMTS(wmts_options);


    if (l.subdomains) {
      const _urls = l.subdomains.map((item) => l.url.replace('{s}', `${item}`));
      _source.setUrls(_urls);

    } else {
      _source.setUrl(l.url);
    }

    const _layeroptions: any = {
      type: 'wmts',
      name: l.name,
      id: l.id,
      visible: l.visible,
      legendImg: l.legendImg,
      opacity: l.opacity || 1,
      zIndex: l.zIndex || 1,
      source: _source
    };

    if (l.popup) {
      _layeroptions.popup = l.popup;
    }

    if (l.bbox) {
      _layeroptions.extent = transformExtent(l.bbox, 'EPSG:4326', this.map.getView().getProjection().getCode());
    }

    return new olTileLayer(_layeroptions);
  }


  private create_geojson_layer(l: VectorLayer, oldlayer?: olBaseLayer) {
    let _source;
    if (l.data) {
      _source = new olVectorSource({
        features: this.geoJsonToFeatures(l.data),
        format: new olGeoJSON(),
        wrapX: l.continuousWorld
      });
    } else if (l.url) {
      _source = new olTileJSON({
        url: l.url,
        crossOrigin: 'anonymous'
      });
    }

    const _layeroptions = <any>{
      type: 'geojson',
      name: l.name,
      id: l.id,
      visible: l.visible,
      legendImg: l.legendImg,
      opacity: l.opacity || 1,
      zIndex: l.zIndex || 1,
      source: _source
    };

    if (l.popup) {
      _layeroptions.popup = l.popup;
    }

    if (l.bbox) {
      _layeroptions.extent = transformExtent(l.bbox, 'EPSG:4326', this.map.getView().getProjection().getCode());
    }

    if (l.cluster) {
      const clusteroptions: any = {};
      if (typeof l.cluster === 'object') {
        Object.assign(clusteroptions, l.cluster);
      }
      clusteroptions.source = _source;
      const clusterSource = new olCluster(clusteroptions);
      _layeroptions.source = clusterSource;
      const styleCache = {};
      _layeroptions.style = (feature) => {
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
      Object.assign(_layeroptions, l.options);
    }

    return new olVectorLayer(_layeroptions);
  }

  private create_custom_layer(l: CustomLayer, oldlayer?: olBaseLayer) {
    if (l.custom_layer) {
      const layer = l.custom_layer;

      const _source = layer.getSource();
      if (l.attribution) {
        _source.setAttributions([l.attribution]);
      }
      if (l.continuousWorld) {
        _source.set('wrapX', l.continuousWorld);
      }

      const _layeroptions = <any>{
        type: 'custom',
        name: l.name,
        id: l.id,
        visible: l.visible,
        legendImg: l.legendImg,
        opacity: l.opacity || 1,
        zIndex: l.zIndex || 1,
      };

      if (l.maxResolution) {
        _layeroptions.maxResolution = l.maxResolution;
      }
      if (l.minResolution) {
        _layeroptions.minResolution = l.minResolution;
      }

      if (l.popup) {
        _layeroptions.popup = l.popup;
      }

      if (l.bbox) {
        _layeroptions.extent = transformExtent(l.bbox, 'EPSG:4326', this.map.getView().getProjection().getCode());
      }

      layer.setProperties(_layeroptions);
      // don't delete the custom Layer, it is used to newly create all layer from layerservice after map all layers removed!
      // delete l.custom_layer;
      return layer;

    } else {
      console.log('attribute custom_layer not set on layer type custom!');
    }
  }

  public vector_on_click(evt) {
    const FeaturesAtPixel = [];
    this.map.forEachFeatureAtPixel(evt.pixel, (_layer, layer) => {
      // console.log(layer);
      // console.log(evt, _layer, layer, layer.get('type'))
      FeaturesAtPixel.push({ _layer: _layer, layer: layer });
    }, {
        layerFilter: (layer: olVectorLayer) => {
          if (layer instanceof olVectorLayer) {
            const _source: olCluster | olVectorSource = layer.getSource();
            if (_source instanceof olCluster) {
              return (_source as any).getSource() instanceof olVectorSource;
            } else {
              return _source instanceof olVectorSource;
            }
          }
        },
        hitTolerance: this.hitTolerance
      });

    FeaturesAtPixel.forEach((item, index) => {
      const topFeature = 0;
      if (index == topFeature) {
        const layer = item.layer, _layer = item._layer;
        const layerpopup: popup = layer.get('popup');
        let _properties: any = {};

        if (layer instanceof olVectorLayer && layerpopup) {
          const features = _layer.getProperties().features;
          if (features && features.length === 1) {
            const feature = features[0];
            _properties = feature.getProperties();
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
            _properties = _layer.getProperties();
          }

          const args = {
            modelName: _properties.id,
            properties: _properties,
            layer: _layer,
            event: evt
          };

          if (layerpopup.pupupFunktion) {
            args['popupFn'] = layerpopup.pupupFunktion;
          }

          let popupproperties = Object.assign({}, _properties);

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
    let _properties: any = {};

    if (layerpopup) {
      _properties = layer.getProperties();
      _properties.evt = evt;
      if (color) {
        _properties.color = color;
      }

      const args = {
        modelName: _properties.id,
        properties: _properties,
        layer: layer,
        event: evt
      };

      if (layerpopup.pupupFunktion) {
        args['popupFn'] = layerpopup.pupupFunktion;
      }

      let popupproperties = Object.assign({}, _properties);

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
          // console.log(html);
          this.addPopup(args, popupproperties, html);
        });
      } else {
        this.addPopup(args, popupproperties);
      }
    }
  }

  public layers_on_click(evt) {
    // pixel, callback, opt_options
    const LayersAtPixel = [];
    this.map.forEachLayerAtPixel(evt.pixel, (layer, color) => {
      LayersAtPixel.push({ layer: layer, color: color });
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
      const topLayer = 0;
      if (index == topLayer) {
        this.layer_on_click(evt, item.layer, item.color);
      }
    });
  }


  public layer_on_click(evt, layer, color?) {
    if (layer instanceof olImageLayer) {
      this.raster_on_click(evt, layer, color);
    } else if (layer instanceof olTileLayer) {
      this.raster_on_click(evt, layer, color);
    } else if (layer instanceof olVectorLayer) {
      this.vector_on_click(evt);
    } else if (layer instanceof olVectorTileLayer) {
      this.vector_on_click(evt);
    }
  }

  public addPopup(args: any, popupObj: any, html?: string) {
    const content = document.createElement('div');
    content.className = 'ol-popup-content';

    let popup_html = '';
    if (args.popupFn) {
      popup_html = args.popupFn(popupObj);
    } else if (html) {
      popup_html = html;
    } else {
      popup_html = this.createPopupHtml(popupObj);
    }
    content.innerHTML = popup_html;

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

    const overlay = new olOverlay(<any>overlayoptions);
    overlay.set('type', 'popup');

    let coordinate;
    if (args.properties && args.properties.geometry && args.properties.geometry.getType() == 'Point') {
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

  public setExtent(extent: olExtend, geographic?: boolean, fitOptions?: any): any {
    // var _extent = ol.extent.boundingExtent([destLoc,currentLoc]);
    const projection = (geographic) ? getProjection('EPSG:4326') : getProjection(this.EPSG);
    const transfomExtent = transformExtent(extent, projection, this.map.getView().getProjection().getCode());
    const _fitOptions = {
      size: this.map.getSize(),
      padding: [100, 200, 100, 100] // Padding (in pixels) to be cleared inside the view. Values in the array are top, right, bottom and left padding. Default is [0, 0, 0, 0].
    };
    if (fitOptions) {
      Object.assign(_fitOptions, fitOptions);
    }
    this.map.getView().fit(transfomExtent, fitOptions);
    return transfomExtent;
  }
  /** ol.Coordinate xy */
  public setCenter(center: olCoordinate, geographic?: boolean) {
    const projection = (geographic) ? getProjection('EPSG:4326') : getProjection(this.EPSG);
    const transfomCenter = transform(center, projection, this.map.getView().getProjection().getCode());
    // console.log('set center in svc', transfomCenter)
    // console.log(this.map.getView().getCenter())
    this.map.getView().setCenter(transfomCenter);
  }

  public getCenter(geographic?: boolean): any {
    const dstProjection = (geographic) ? getProjection('EPSG:4326') : getProjection(this.EPSG);
    const srcProjection = getProjection(this.map.getView().getProjection().getCode());

    const transfomCenter = transform(this.map.getView().getCenter(), srcProjection, dstProjection);
    // console.log('set center in svc', transfomCenter)
    // console.log(this.map.getView().getCenter())
    // console.log(transfomCenter)
    // console.log(srcProjection)
    // console.log(dstProjection)
    return transfomCenter;
  }

  public getFeaturesExtent(features: olFeature[]): any {
    const extent: any = features[0].getGeometry().getExtent().slice(0);
    features.forEach((feature) => {
      olExtend(extent, feature.getGeometry().getExtent());
    });
    return extent;
  }

  public getCurrentExtent(geographic?: boolean): olExtend {
    const projection = (geographic) ? getProjection('EPSG:4326') : getProjection(this.EPSG);
    const extent = this.map.getView().calculateExtent();
    const transfomExtent = transformExtent(extent, this.map.getView().getProjection().getCode(), projection);
    return transfomExtent;
  }

  public setZoom(zoom: number, notifier?: 'map' | 'user') {
    const view = this.map.getView();
    view.setZoom(zoom);
  }

  public zoomInOut(value: '-' | '+') {
    const view = this.map.getView();
    if (!view) {
      // the map does not have a view, so we can't act
      // upon it
      return;
    }
    let delta = 1, newResolution, duration = 250;
    const currentResolution = view.getResolution();
    if (currentResolution) {
      newResolution = view.constrainResolution(currentResolution, delta);
      if (value === '+') {
        newResolution = view.constrainResolution(currentResolution, delta);
      }
      if (value === '-') {
        newResolution = view.constrainResolution(currentResolution, -delta);
      }

      if (duration > 0) {
        if (view.getAnimating()) {
          view.cancelAnimations();
        }
        view.animate({
          resolution: newResolution,
          duration: duration,
          easing: easeOut
        });
      } else {
        view.setResolution(newResolution);
      }
    }
  }

  public geoJsonToFeature(geojson: any): olFeature {
    const GEOJSON = new olGeoJSON({
      defaultDataProjection: 'EPSG:4326',
      featureProjection: this.EPSG
    });
    return GEOJSON.readFeature(geojson);
  }

  public geoJsonToFeatures(geojson: any): Array<olFeature> {
    const GEOJSON = new olGeoJSON({
      defaultDataProjection: 'EPSG:4326',
      featureProjection: this.EPSG
    });
    return GEOJSON.readFeatures(geojson);
  }

  /**
   * projection is proj~ProjectionLike
   */
  public setProjection(projection: any) {
    if (projection) {
      let _view;
      if (projection instanceof olProjection) {
        _view = new olView({
          projection: projection,
          center: this.map.getView().getCenter(),
          extent: projection.getExtent(),
          zoom: this.map.getView().getZoom()
        });
      } else if (typeof projection === 'string') {
        _view = new olView({
          projection: projection,
          center: this.map.getView().getCenter(),
          zoom: this.map.getView().getZoom()
        });
      }

      this.map.setView(_view);
      this.EPSG = _view.getProjection().getCode();

      // this.removeAllLayers('baselayers')
      /*
      this.getLayers('baselayers').forEach((layer) => {
        this.addLayer(layer, 'baselayers')
      })
      */
    } else {
      // console.log('projection code is undefined');
    }
  }

  private keysToUppercase(obj: Object) {
    const newObj = {};
    for (const key in obj) {
      newObj[key.toUpperCase()] = obj[key];
    }
    return newObj;
  }
}
