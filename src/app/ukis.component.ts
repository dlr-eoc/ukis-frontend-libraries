import { Component, Inject } from '@angular/core';
import { NgModel, NgForm, RadioControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import { NgIf } from '@angular/common';

import '@webcomponents/custom-elements';
import '@clr/icons/shapes/all-shapes';
import '@clr/icons/shapes/commerce-shapes';
import '@clr/icons/shapes/core-shapes';
import '@clr/icons/shapes/essential-shapes';
import '@clr/icons/shapes/media-shapes';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/technology-shapes';
import '@clr/icons/shapes/travel-shapes';
import './icons/ukis';

import { google_earth, google_hybrid, google_maps, osm, eoc_litemap } from '@ukis/baseLayers/rasterBaseLayers';
import { RasterLayer } from '@ukis/datatypes/Layer';
import { LayersService } from '@ukis/services/src/app/layers/layers.service';
import { Subscription } from 'rxjs/Subscription';

import { Ol4MapSvc, IOl4MapSvc } from '@ukis/ol-map/src/app/ol-map/ol-map.service';

//for User
import { AuthService } from '@ukis/services/src/app/user/dummy-auth.service';


const lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis enim aliquid mollitia odio?';

/**
 * root component
 */
@Component({
  selector: 'ukis-root',
  templateUrl: './ukis.component.html',
  styleUrls: []
})
export class UkisComponent {
  title = 'Drought Distribution';

  alert;

  obsListOpen = false;

  ui = {
    floating: true,
    flipped: false,
    footer: false
  };


  baseLayersSubscription: Subscription;
  overlaysSubscription: Subscription;
  layergroups = [
    {
      'name': 'Baselayers',
      'inputtype': 'radio',
      'removable': false,
      'layers': []
    },
    {
      'name': 'Overlays',
      'inputtype': 'checkbox',
      'removable': true,
      'layers': []
    }
  ];

  constructor(
    @Inject(LayersService) private layerSvc: LayersService,
    @Inject(Ol4MapSvc) private mapSvc: IOl4MapSvc,
    private authService: AuthService) {

    var layer_cloud = new RasterLayer({
      name: 'Drought Frequency',
      ukisID: 'Drought_Frequency',
      visible: true,
      type: 'wms',
      url: 'http://sedac.ciesin.columbia.edu/geoserver/wms',
      options: {
        layers: 'ndh:ndh-drought-hazard-frequency-distribution',
        format: 'image/png',
        transparent: true,
        attribution: "Â© sedac",
        zIndex: 1
      },
      continuousWorld: false,
      opacity: 1
    })

    google_earth.visible = true;
    this.layerSvc.addBaseLayer(google_earth);
    this.layerSvc.addBaseLayer(eoc_litemap);

    this.layerSvc.addOverlay(layer_cloud);

    this.baseLayersSubscription = this.layerSvc.getBaseLayers().subscribe(baseLayers => {
      this.layergroups[0].layers = baseLayers;
      //console.log(this.layergroups[0].layers)
    });

    this.overlaysSubscription = this.layerSvc.getOverlays().subscribe(overlays => {
      this.layergroups[1].layers = overlays;
      //console.log(this.layergroups[1].layers)
    });


  }

  zoom(value: '-' | '+') {
    this.mapSvc.zoomInOut(value)
  }

  layerUpdate = (event, group, layer) => {

    layer = event.layer;

    if (group.inputtype == "checkbox") {
      this.layerSvc.setOverlays(group.layers);
    }
    if (group.inputtype == "radio") {
      this.layerSvc.setBaseLayers(group.layers);
    }
  };


  setAlert = (type: string = 'info') => {
    // structure of (app-level) alert
    // TODO use shared service
    this.alert = {
      type: type || 'info',
      text: `<strong>Alert-Type: ${type.toUpperCase()}</strong> ${lorem}`,
      closeable: true,
      actions: [
        {
          title: 'ACTION',
          callback: () => {
            console.log('received click');
          }
        }]
    };
  }


}
