import { Injectable, Version } from '@angular/core';


import { Layer, VectorLayer, CustomLayer, RasterLayer, popup } from '@ukis/datatypes-layers';

import olMap from 'ol/Map';
import olView from 'ol/View';


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
//import ImageWMS from 'ol/source/ImageWMS';
//import VectorTileSource from 'ol/source/VectorTile';
import olFeature from 'ol/Feature';

import olCollection from 'ol/Collection';
import olGeoJSON from 'ol/format/GeoJSON';
import olProjection from 'ol/proj/Projection.js';
import { transformExtent, get, transform } from 'ol/proj.js';
import { extend as olExtend, getWidth, getTopLeft} from 'ol/extent.js';
import { easeOut } from 'ol/easing.js'
import olCoordinate from 'ol/coordinate'


import olStyle from 'ol/style/Style';
import olText from 'ol/style/Text';
import olFill from 'ol/style/Fill';
import olCircleStyle from 'ol/style/Circle';
import olStroke from 'ol/style/Stroke';

@Injectable({
  providedIn: 'root'
})
export class MapOlService {
  public map: olMap; //ol.Map;
  public view: olView;
  public temp: any;
  public EPSG: string;
  constructor() {
    this.map = <any>{};
    this.view = <any>{};
    this.temp = {};
    this.EPSG = 'EPSG:3857';//'EPSG:4326'; EPSG:3857
    //this.createMap();
  }

  public createMap(target?) {
    let _EPSG = this.EPSG;
    let zoom = 3;
    let center = {
      lat: 0,
      lon: 0
    };

    var _baselayers = [];
    var _baselayerGroup = new olLayerGroup(<any>{
      title: 'Base maps',
      type: 'baselayers',
      layers: _baselayers
    })

    //---------------------------------------------------------------------------------------------------
    //var _overlays = this.store.overlays;
    var _overlays = [];

    var _overlayGroup = new olLayerGroup(<any>{
      title: 'Overlays',
      type: 'overlays',
      layers: _overlays
    })

    var _view = new olView({
      center: transform([center.lon, center.lat], 'EPSG:4326', _EPSG),
      zoom: zoom,
      projection: _EPSG
    })

    var _map = new olMap({
      layers: [_baselayerGroup, _overlayGroup],
      view: _view,
      controls: []
    });

    if (target && !_map.getTarget()) {
      _map.setTarget(target);
    }

    this.map = _map;
    this.view = this.map.getView();
    return {
      map: this.map,
      view: this.view
    }
  }

  public getLayers(type: 'overlays' | 'baselayers') {
    var layers;
    this.map.getLayers().getArray().forEach((layerGroup: olLayerGroup) => {
      if (layerGroup.get('type') === type) {
        layers = layerGroup.getLayers().getArray();
      }
    })
    return layers;
  }

  public getLayerByKey(key: { key: string, value: string }, type: 'overlays' | 'baselayers') {
    var layers = this.getLayers(type);
    var _layer;
    layers.forEach((layer) => {
      if (layer.get(key.key) && layer.get(key.key) == key.value) {
        _layer = layer
      }
    })
    return _layer;
  }

  public addLayer(layer: any, type: 'overlays' | 'baselayers') {
    var layers;
    this.map.getLayers().getArray().forEach((layerGroup: olLayerGroup) => {
      if (layerGroup.get('type') === type) {
        layers = layerGroup.getLayers().getArray();
        layers.push(layer);
        layerGroup.setLayers(new olCollection(layers))
      }
    })
    return layers;
  }

  public addLayers(layers: olCollection<Layer>, type: 'overlays' | 'baselayers') {
    var _layers;
    //console.log(this.map)
    this.map.getLayers().getArray().forEach((layerGroup: olLayerGroup) => {
      if (layerGroup.get('type') === type) {
        _layers = layers;
        layerGroup.setLayers(new olCollection(_layers))
      }
    })
    return layers;
  }

  public removeLayerByKey(key: { key: string, value: string }, type: 'overlays' | 'baselayers') {
    var layer = this.getLayerByKey(key, type);
    this.map.removeLayer(layer);
  }

  public removeAllLayers(type: 'overlays' | 'baselayers') {
    var layers;
    this.map.getLayers().getArray().forEach((layerGroup: olLayerGroup) => {
      if (layerGroup.get('type') === type) {
        layers = layerGroup.getLayers()
        layers.clear();
      }
    })

  }

  public setBaseLayers(layers: Array<Layer>) {
    let _layers = <any>[];
    layers.forEach((layer) => {

      let _layer;
      switch (layer.type) {
        case 'xyz':
          _layer = this.create_xyz_layer(<RasterLayer>layer)
          break;
        case 'wms':
          _layer = this.create_wms_layer(<RasterLayer>layer)
          break;
        case 'custom':
          _layer = this.create_custom_layer(<CustomLayer>layer)
          break;
        /*
      default:
        // Anweisungen werden ausgeführt,
        // falls keine der case-Klauseln mit expression übereinstimmt
        break;
        */
      }
      // check if layer not undefined
      if (_layer) {
        _layers.push(_layer)
      }
    })

    if (_layers.length > 0) {
      this.addLayers(_layers, 'baselayers')
    }
  }

  public setOverlays(layers: Array<Layer>) {
    let _layers = <any>[];
    if (layers.length < 1) {
      this.removeAllLayers('overlays');
    } else {
      layers.forEach((layer) => {
        let _layer;
        switch (layer.type) {
          case 'xyz':
            _layer = this.create_xyz_layer(<RasterLayer>layer)
            break;
          case 'wms':
            _layer = this.create_wms_layer(<RasterLayer>layer)
            break;
          case "wmts":
            _layer = this.create_wmts_layer(<RasterLayer>layer);
            break;
          case 'geojson':
            _layer = this.create_geojson_layer(<VectorLayer>layer)
            break;
          case 'custom':
            _layer = this.create_custom_layer(<CustomLayer>layer)
            break;
        }
        // check if layer not undefined
        if (_layer) {
          _layers.push(_layer)
        }
      })
    }

    if (_layers.length > 0) {
      this.addLayers(_layers, 'overlays')
    }
  }

  /**
   * define layer types
   */
  private create_xyz_layer(l: RasterLayer) {
    let xyz_options: any = {
      attributions: [l.attribution],
      wrapX: l.continuousWorld
    };

    if (l['crossOrigin']) {
      xyz_options.crossOrigin = l['crossOrigin'];
    }

    let _source = new olXYZ(xyz_options);

    if (l.subdomains) {
      let _urls = l.subdomains.map((item) => { return l.url.replace('{s}', `${item}`) });
      _source.setUrls(_urls)

    } else {
      _source.setUrl(l.url)
    }

    let _layeroptions: any = {
      type: 'xyz',
      name: l.name,
      id: l.id,
      visible: l.visible,
      legendImg: l.legendImg,
      opacity: l.opacity || 1,
      zIndex: l.zIndex || 1,
      source: _source
    }

    if (l.popup) {
      _layeroptions.popup = l.popup;
    }

    if (l.bbox) {
      _layeroptions.extent = transformExtent(l.bbox, 'EPSG:4326', this.map.getView().getProjection().getCode());
    }

    return new olTileLayer(_layeroptions)
  }

  private create_wms_layer(l: RasterLayer) {

    let tile_options: any = {
      attributions: [l.attribution],
      wrapX: l.continuousWorld,
      params: this.keysToUppercase(l.params)
    };

    if (l['crossOrigin']) {
      tile_options.crossOrigin = l['crossOrigin'];
    }

    let _source = new olTileWMS(tile_options);

    if (l.subdomains) {
      let _urls = l.subdomains.map((item) => { return l.url.replace('{s}', `${item}`) });
      _source.setUrls(_urls)

    } else {
      _source.setUrl(l.url)
    }

    let _layeroptions: any = {
      type: 'wms',
      name: l.name,
      id: l.id,
      visible: l.visible,
      legendImg: l.legendImg,
      opacity: l.opacity || 1,
      zIndex: l.zIndex || 1,
      source: _source
    }

    if (l.popup) {
      _layeroptions.popup = l.popup;
    }

    if (l.bbox) {
      _layeroptions.extent = transformExtent(l.bbox, 'EPSG:4326', this.map.getView().getProjection().getCode());
    }

    return new olTileLayer(_layeroptions)
  }

  public getProjection() {
    return this.map.getView().getProjection();
  }


  private create_wmts_layer(l: RasterLayer) {

    // TODO: here we create a standard-tilegrid. While this will be enough for most of our wmts, it would be more rigorous to make a getCapabilites-request to the server instead. 
    // https://openlayers.org/en/latest/examples/wmts-layer-from-capabilities.html?q=wmts 

    let projection = this.getProjection();
    let matrixSet = projection.getCode();
    let projectionExtent = projection.getExtent();
    let UnitsPerPixLargestTile = getWidth(projectionExtent) / 256;
    let resolutions = new Array(14);
    let matrixIds = new Array(14);
    for (let z = 0; z < 14; ++z) {
      resolutions[z] = UnitsPerPixLargestTile / Math.pow(2, z);
      matrixIds[z] = matrixSet + ":" + z;  
    }

    let tileGrid = new olWMTSTileGrid({
      origin: getTopLeft(projectionExtent),
      resolutions: resolutions,
      matrixIds: matrixIds
    });

    let wmts_options: any = {
      url: l.url,
      layer: l.id,
      matrixSet: matrixSet,
      tileGrid: tileGrid,
      projection: projection,
      version: l.params.version || "1.0.0",
      format:l.params.format || 'image/png',
      attributions: [l.attribution],
      wrapX: l.continuousWorld,
    };

    if (l['crossOrigin']) {
      wmts_options.crossOrigin = l['crossOrigin'];
    }

    let _source = new olWMTS(wmts_options);


    if (l.subdomains) {
      let _urls = l.subdomains.map((item) => { return l.url.replace('{s}', `${item}`) });
      _source.setUrls(_urls)

    } else {
      _source.setUrl(l.url)
    }

    let _layeroptions: any = {
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


  private create_geojson_layer(l: VectorLayer) {
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

    let _layeroptions = <any>{
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
      let clusteroptions: any = {};
      if (typeof l.cluster === 'object') {
        Object.assign(clusteroptions, l.cluster);
      }
      clusteroptions.source = _source
      let clusterSource = new olCluster(clusteroptions);
      _layeroptions.source = clusterSource;
      let styleCache = {};
      _layeroptions.style = (feature) => {
        var size = feature.get('features').length;
        var style = styleCache[size];
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
      }
    }

    if (l.options) {
      Object.assign(_layeroptions, l.options);
    }

    return new olVectorLayer(_layeroptions);
  }

  private create_custom_layer(l: CustomLayer) {
    if (l.custom_layer) {
      let layer = l.custom_layer;

      let _source = layer.getSource();
      if (l.attribution) {
        _source.setAttributions([l.attribution])
      }
      if (l.continuousWorld) {
        _source.set('wrapX', l.continuousWorld);
      }

      let _layeroptions = <any>{
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

      layer.setProperties(_layeroptions)
      delete l.custom_layer;
      return layer;

    } else {
      console.log('attribute custom_layer not set on layer type custom!');
    }
  }

  public vector_on_click(evt) {
    var FeaturesAtPixel = [];
    this.map.forEachFeatureAtPixel(evt.pixel, (_layer, layer) => {
      console.log(layer)
      //console.log(evt, _layer, layer, layer.get('type'))
      FeaturesAtPixel.push({ _layer: _layer, layer: layer })
    }, {
        layerFilter: (layer: olVectorLayer) => {
          if (layer instanceof olVectorLayer) {
            let _source: olCluster | olVectorSource = layer.getSource();
            if (_source instanceof olCluster) {
              return (_source as any).getSource() instanceof olVectorSource;
            } else {
              return _source instanceof olVectorSource;
            }
          }
        },
        hitTolerance: 0
      });

    FeaturesAtPixel.forEach((item, index) => {
      let topFeature = 0;
      if (index == topFeature) {
        let layer = item.layer, _layer = item._layer;
        let layerpopup: popup = layer.get('popup');
        let _properties: any = {};

        if (layer instanceof VectorLayer && layerpopup) {
          let features = _layer.getProperties().features;
          if (features && features.length == 1) {
            let feature = features[0];
            _properties = feature.getProperties();
          } else if (features && features.length > 1) {
            //zoom in TODO
            //_layer.getProperties()
            //_layer.getGeometry().getExtent()
            var extent = this.getFeaturesExtent(_layer.getProperties().features);
            //console.log(_layer, extent)
            this.setExtent(extent);
            return false;
          } else {
            //type no cluster
            _properties = _layer.getProperties();
          }

          let args = {
            modelName: _properties.id,
            properties: _properties,
            layer: _layer,
            event: evt
          };

          if (layerpopup.pupupFunktion) {
            args['popupFn'] = layerpopup.pupupFunktion;
          }

          let popupproperties = Object.assign({}, _properties);

          //console.log(popupproperties);
          if (layerpopup['properties']) {
            if (Array.isArray(Object.keys(layerpopup['properties']))) {
              popupproperties = Object.keys(popupproperties)
                .filter(key => Object.keys(layerpopup['properties']).includes(key))
                .reduce((obj, key) => {
                  //obj[key] = popupproperties[key];
                  let newKey = layerpopup['properties'][key];
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
              this.addPopup(args, popupproperties, html)
            })
          } else {
            this.addPopup(args, popupproperties)
          }
        }
      }
    })
  }

  public raster_on_click(evt, layer, color?) {
    let layerpopup: popup = layer.get('popup');
    let _properties: any = {};

    if (layerpopup) {
      _properties = layer.getProperties();
      _properties.evt = evt;
      if (color) {
        _properties.color = color;
      }

      let args = {
        modelName: _properties.id,
        properties: _properties,
        layer: layer,
        event: evt
      };

      if (layerpopup.pupupFunktion) {
        args['popupFn'] = layerpopup.pupupFunktion;
      }

      let popupproperties = Object.assign({}, _properties);

      //console.log(popupproperties);
      if (layerpopup['properties']) {
        if (Array.isArray(Object.keys(layerpopup['properties']))) {
          popupproperties = Object.keys(popupproperties)
            .filter(key => Object.keys(layerpopup['properties']).includes(key))
            .reduce((obj, key) => {
              //obj[key] = popupproperties[key];
              let newKey = layerpopup['properties'][key];
              obj[newKey] = popupproperties[key];
              return obj;
            }, {});
        }
      }
      if (popupproperties.geometry) {
        delete popupproperties.geometry;
      }
      console.log(popupproperties)

      if (layerpopup.asyncPupup) {
        layerpopup.asyncPupup(popupproperties, (html) => {
          console.log(html);
          this.addPopup(args, popupproperties, html)
        })
      } else {
        this.addPopup(args, popupproperties)
      }
    }
  }

  public layers_on_click(evt) {
    //pixel, callback, opt_options
    var LayersAtPixel = [];
    this.map.forEachLayerAtPixel(evt.pixel, (layer, color) => {
      LayersAtPixel.push({ layer: layer, color: color })
    }, {
        layerFilter: (layer) => {
          //try to catch CORS error in getImageData!!!
          //layer.sourceChangeKey_ && layer.sourceChangeKey_.target && layer.sourceChangeKey_.target.crossOrigin != "anonymous"
          //console.log(layer)
          if (layer.get('popup')) {
            return true;
          }
        }
      });
    LayersAtPixel.forEach((item, index) => {
      let topLayer = 0;
      if (index == topLayer) {
        this.layer_on_click(evt, item.layer, item.color)
      }
    })
  }


  public layer_on_click(evt, layer, color?) {
    if (layer instanceof olImageLayer) {
      this.raster_on_click(evt, layer, color)
    } else if (layer instanceof olTileLayer) {
      this.raster_on_click(evt, layer, color)
    } else if (layer instanceof olVectorLayer) {
      this.vector_on_click(evt)
    } else if (layer instanceof olVectorTileLayer) {
      this.vector_on_click(evt)
    }
  }

  public addPopup(args: any, popupObj: any, html?: string) {
    let content = document.createElement('div');
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

    let closer = document.createElement('a');
    closer.className = 'ol-popup-closer';

    let container = document.createElement('div');
    container.className = 'ol-popup';
    container.id = `popup_${new Date().getTime()}`;
    container.style.display = 'block';

    container.appendChild(closer);
    container.appendChild(content);

    let overlayoptions = {
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

    var overlay = new olOverlay(<any>overlayoptions);
    overlay.set('type', 'popup');

    let coordinate;
    if (args.properties && args.properties.geometry && args.properties.geometry.getType() == 'Point') {
      coordinate = args.properties.geometry.getCoordinates();
    } else {
      coordinate = args.event.coordinate;
    }

    overlay.setPosition(coordinate);
    let closeFunction = () => {
      closer.removeEventListener('click', closeFunction, false)
      this.map.removeOverlay(overlay);
    }
    closer.addEventListener('click', closeFunction, false);

    this.map.addOverlay(overlay);
  }

  public removeAllPopups() {
    let popups = this.getPopups();
    popups.forEach((overlay) => {
      if (overlay.get('type') === 'popup') {
        this.map.removeOverlay(overlay);
      }
    });
  }

  public createPopupHtml(obj: any) {
    var htmlStr = '<table>';
    for (var o in obj) {
      if (obj.hasOwnProperty(o)) {
        htmlStr += '<tr><td style="vertical-align: top; padding-right: 7px;"><b>' + o + ': </b></td><td>' + obj[o] +
          '</td></tr>'
      }
    }
    htmlStr = htmlStr + '</table>'
    return htmlStr
  }

  public getPopups(): olOverlay[] {
    let popups = [];
    this.map.getOverlays().getArray().slice(0).forEach((overlay) => {
      if (overlay.get('type') === 'popup') {
        popups.push(overlay);
      }
    });
    return popups;
  }

  public setExtent(extent: olExtend, geographic?: boolean, fitOptions?: any): any {
    //var _extent = ol.extent.boundingExtent([destLoc,currentLoc]);
    var projection = (geographic) ? get('EPSG:4326') : get(this.EPSG);
    var transfomExtent = transformExtent(extent, projection, this.map.getView().getProjection().getCode());
    var _fitOptions = {
      size: this.map.getSize(),
      padding: [100, 200, 100, 100] //Padding (in pixels) to be cleared inside the view. Values in the array are top, right, bottom and left padding. Default is [0, 0, 0, 0].
    }
    if (fitOptions) {
      Object.assign(_fitOptions, fitOptions)
    }
    this.map.getView().fit(transfomExtent, fitOptions);
    return transfomExtent;
  }
  /** ol.Coordinate xy */
  public setCenter(center: olCoordinate, geographic?: boolean) {
    var projection = (geographic) ? get('EPSG:4326') : get(this.EPSG);
    var transfomCenter = transform(center, projection, this.map.getView().getProjection().getCode());
    //console.log('set center in svc', transfomCenter)
    //console.log(this.map.getView().getCenter())
    this.map.getView().setCenter(transfomCenter);
  }

  public getCenter(geographic?: boolean): any {
    var dstProjection = (geographic) ? get('EPSG:4326') : get(this.EPSG);
    var srcProjection = get(this.map.getView().getProjection().getCode());

    var transfomCenter = transform(this.map.getView().getCenter(), srcProjection, dstProjection);
    //console.log('set center in svc', transfomCenter)
    //console.log(this.map.getView().getCenter())
    //console.log(transfomCenter)
    //console.log(srcProjection)
    //console.log(dstProjection)
    return transfomCenter;
  }

  public getFeaturesExtent(features: olFeature[]): any {
    var extent: any = features[0].getGeometry().getExtent().slice(0);
    features.forEach((feature) => {
      olExtend(extent, feature.getGeometry().getExtent());
    });
    return extent;
  }

  public getCurrentExtent(geographic?: boolean): olExtend {
    var projection = (geographic) ? get('EPSG:4326') : get(this.EPSG);
    var extent = this.map.getView().calculateExtent();
    var transfomExtent = transformExtent(extent, this.map.getView().getProjection().getCode(), projection);
    return transfomExtent;
  }

  public setZoom(zoom: number, notifier?: 'map' | 'user') {
    var view = this.map.getView();
    view.setZoom(zoom);
  }

  public zoomInOut(value: '-' | '+') {
    var view = this.map.getView();
    if (!view) {
      // the map does not have a view, so we can't act
      // upon it
      return;
    }
    var delta = 1, newResolution, duration = 250;
    var currentResolution = view.getResolution();
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
    var GEOJSON = new olGeoJSON({
      defaultDataProjection: 'EPSG:4326',
      featureProjection: this.EPSG
    });
    return GEOJSON.readFeature(geojson)
  }

  public geoJsonToFeatures(geojson: any): Array<olFeature> {
    var GEOJSON = new olGeoJSON({
      defaultDataProjection: 'EPSG:4326',
      featureProjection: this.EPSG
    });
    return GEOJSON.readFeatures(geojson)
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
      } else if (typeof projection == 'string') {
        _view = new olView({
          projection: projection,
          center: this.map.getView().getCenter(),
          zoom: this.map.getView().getZoom()
        });
      }

      this.map.setView(_view)
      this.EPSG = _view.getProjection().getCode();

      //this.removeAllLayers('baselayers')
      /*
      this.getLayers('baselayers').forEach((layer) => {
        this.addLayer(layer, 'baselayers')
      })
      */
    } else {
      //console.log('projection code is undefined');
    }
  }

  private keysToUppercase(obj: Object) {
    let newObj = {};
    for(let key in obj) {
      newObj[key.toUpperCase()] = obj[key];
    }
    return newObj;
  }
}
