import { Component, OnInit, ViewEncapsulation, Input, Inject, OnDestroy } from '@angular/core';


import { MapState } from '@ukis/services-map-state';
import { MapStateService } from '@ukis/services-map-state';
import { Subscription, BehaviorSubject } from 'rxjs';
import { MapOlService } from './map-ol.service';
import { LayersService } from '@ukis/services-layers';

import Map from 'ol/Map';
import View from 'ol/View';
import Attribution from 'ol/control/Attribution';
import ScaleLine from 'ol/control/ScaleLine';
import Zoom from 'ol/control/Zoom';


@Component({
  selector: 'ukis-map-ol',
  templateUrl: './map-ol.component.html',
  styleUrls: ['./map-ol.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapOlComponent implements OnInit, OnDestroy {
  @Input('layersSvc') layersSvc: LayersService;
  @Input('mapState') mapStateSvc: MapStateService;
  @Input('controls') controls: { attribution?: boolean, scaleLine?: boolean, zoom?: boolean, crosshair?: boolean };

  map: Map;
  view: View;

  viewSubj = new BehaviorSubject(this.view);

  zoom: number; //default value
  center: any //default value
  mapState: MapState;
  mapStateOn: Subscription;
  extent: Array<number>;
  extentOn: Subscription;
  layersAddRemoveOn: Subscription;
  baselayersAddRemoveOn: Subscription;
  mapOnMoveend;
  mapOnClick;
  mapOnDclick;
  constructor(
    @Inject(MapOlService) private mapSvc: MapOlService
  ) {
    this.zoom = 3;
    this.center = {
      lat: 0,
      lon: 0
    };
    //console.log(this.mapSvc)
    let ms = new MapState(this.zoom, this.center);
    this.mapState = ms;
    ///define initial center and zoom
    //this.initMap();

  }

  ngOnInit() {
    this.initMap();
    this.mapStateSvc.setMapState(this.mapState);
  }

  /** is  */
  ngAfterViewChecked() {
    this.map.updateSize();
  }

  ngOnDestroy() {
    this.mapStateOn.unsubscribe();
    this.layersAddRemoveOn.unsubscribe();
    this.baselayersAddRemoveOn.unsubscribe();
    this.map.un('moveend', this.mapOnMoveend);
    this.map.un('click', this.mapOnClick);
    this.map.un('dblclick', this.mapOnDclick);
  }


  private initMap() {
    let _ol = this.mapSvc.createMap('map')
    this.map = _ol.map; //
    this.view = _ol.view; //

    //add Control only if this functions is defined
    if (this.controls) {
      if (this.controls.attribution) {
        let attribution = new Attribution({
          //collapsible: false,
          collapsed: false
        });
        this.map.addControl(attribution)
      }
      if (this.controls.scaleLine) {
        let scaleLineControl = new ScaleLine();
        this.map.addControl(scaleLineControl)
      }
      if (this.controls.zoom) {
        let zoomControl = new Zoom();
        this.map.addControl(zoomControl)
      }
    }
    if (!this.layersSvc) {
      console.log('there is no layersSvc as defined!')
    }

    if (!this.mapStateSvc) {
      console.log('there is no mapStateSvc as defined!')
    }


    //----------------------
    //add/remove layers
    if (this.layersSvc) {
      this.baselayersAddRemoveOn = this.layersSvc.getBaseLayers().subscribe(layers => {
        //console.log("Baselayer add or remove", layers)
        if (layers.length != this.mapSvc.getLayers('baselayers').length) {

          //set only one visible at start
          let visiblelayers = layers.filter(l => l.visible === true);
          if (visiblelayers.length === 0) {
            layers[0].visible = true
          } else if (visiblelayers.length > 1) {
            layers.forEach(l => l.visible = false);
            layers[0].visible = true
          }

          this.mapSvc.setBaseLayers(layers)
        }
        //change baselayer visibility and opacity
        else {
          for (let layer of layers) {
            let bllayer = this.mapSvc.getLayerByKey({ key: 'id', value: layer.id }, 'baselayers');
            if (bllayer) {
              //bllayer.setVisible(layer.visible);
              //console.log(layer)
              if (bllayer.getVisible() != layer.visible) {
                //console.log('setVisible', layer.name, layer.visible, ollayer.getVisible());
                bllayer.setVisible(layer.visible);
              }
              if (bllayer.getZIndex() != layers.indexOf(layer)) {
                //console.log('setZIndex', layer.name, layers.indexOf(layer), bllayer.getZIndex());
                bllayer.setZIndex(layers.indexOf(layer));
              }
              if (bllayer.getOpacity() != layer.opacity) {
                //console.log('setOpacity', layer.name, layer.opacity, ollayer.getOpacity());
                bllayer.setOpacity(layer.opacity);
              }
            }
          }
        }
      });

      this.layersAddRemoveOn = this.layersSvc.getOverlays().subscribe(layers => {
        let _baselayerslength = this.mapSvc.getLayers('baselayers').length;
        if (layers.length != this.mapSvc.getLayers('overlays').length) {
          //console.log("Layer add or remove", layers)
          this.mapSvc.setOverlays(layers)
          //if baslayers set zIndex on add layer
          if (_baselayerslength > 0) {
            for (let layer of layers) {
              let ollayer = this.mapSvc.getLayerByKey({ key: 'id', value: layer.id }, 'overlays');
              if (ollayer) {
                //console.log("layer.zIndex", layer.zIndex)
                if (ollayer.getZIndex() != layers.indexOf(layer) + _baselayerslength) {
                  //console.log('setZIndex', layer.name, layers.indexOf(layer), ollayer.getZIndex());
                  ollayer.setZIndex(layers.indexOf(layer) + _baselayerslength);
                }
              }
            }
          }
        }
        else {
          //console.log(layers)
          for (let layer of layers) {
            let ollayer = this.mapSvc.getLayerByKey({ key: 'id', value: layer.id }, 'overlays');
            if (ollayer) {
              if (ollayer.getVisible() != layer.visible) {
                //console.log('setVisible', layer.name, layer.visible, ollayer.getVisible());
                ollayer.setVisible(layer.visible);
              }
              if (ollayer.getOpacity() != layer.opacity) {
                //console.log('setOpacity', layer.name, layer.opacity, ollayer.getOpacity());
                ollayer.setOpacity(layer.opacity);
              }
              if (_baselayerslength > 0) {
                //console.log("layer.zIndex", layer.zIndex)
                if (ollayer.getZIndex() != layers.indexOf(layer) + _baselayerslength) {
                  //console.log('setZIndex', layer.name, layers.indexOf(layer), ollayer.getZIndex());
                  ollayer.setZIndex(layers.indexOf(layer) + _baselayerslength);
                }

              } else {
                //console.log('set zIndex with no baselayers')
                if (ollayer.getZIndex() != layers.indexOf(layer)) {
                  //console.log('setZIndex', layer.name, layers.indexOf(layer), ollayer.getZIndex());
                  ollayer.setZIndex(layers.indexOf(layer));
                }
              }
              //hard set zIndex
              /*
              if(layer.zIndex){
                ollayer.setZIndex(layer.zIndex);
              }
              */
            }
          }
        }
      });


    }

    if (this.mapStateSvc) {
      this.mapStateOn = this.mapStateSvc.getMapState().subscribe(mapState => {
        if (mapState.options.notifier === 'user') {
          this.mapState = mapState;
          //console.log("User triggered mapState change", mapState)
          this.mapSvc.setZoom(mapState.zoom, mapState.options.notifier);
          this.mapSvc.setCenter([mapState.center.lon, mapState.center.lat], true);
        } else if (mapState.options.notifier === 'map') {
          //console.log("Map triggered mapState change", mapState)
        }
      });
    }

    this.mapOnMoveend = (evt) => {
      //console.log(this.mapState.zoom,this.mapState.center, this.mapState.options)
      //console.log("mapOn fired", evt)
      let zoom = Math.round(this.view.getZoom());
      let center = this.mapSvc.getCenter(true);
      let extent = this.mapSvc.getCurrentExtent(true);
      let ms = new MapState(zoom, { lat: parseFloat(center[1].toFixed(6)), lon: parseFloat(center[0].toFixed(6)) }, { notifier: 'map' }, extent, null);
      this.mapState = ms;
      this.mapStateSvc.setMapState(ms);
    }
    this.map.on('moveend', this.mapOnMoveend);

    this.extentOn = this.mapStateSvc.getExtent().subscribe(extent => {
      //console.log("new extent is: ", extent);
      if (extent[0] && extent[1] && extent[2] && extent[3]) {
        this.mapSvc.setExtent([extent[0], extent[1], extent[2], extent[3]], true, { duration: 500 });
      }
    })

    /** handle click on vektor layers */
    this.mapOnClick = (evt) => {
      this.mapSvc.layers_on_click(evt);
    }
    this.map.on("click", this.mapOnClick)

    /** handle double click */
    this.mapOnDclick = (evt) => {
      this.mapSvc.removeAllPopups();
    }
    this.map.on("dblclick", this.mapOnDclick)
  }

}
