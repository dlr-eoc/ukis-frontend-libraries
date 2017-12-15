import {Component, Inject} from '@angular/core';
import { NgModel, NgForm, RadioControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import { NgIf } from '@angular/common';

// import '@webcomponents/custom-elements';
// import 'clarity-icons';
// import 'clarity-icons/shapes/all-shapes';
// import 'clarity-icons/shapes/commerce-shapes';
import 'clarity-icons/shapes/core-shapes';
import 'clarity-icons/shapes/essential-shapes';
// import 'clarity-icons/shapes/media-shapes';
// import 'clarity-icons/shapes/social-shapes';
import 'clarity-icons/shapes/technology-shapes';
import 'clarity-icons/shapes/travel-shapes';
import './icons/ukis';

import { google_earth, google_hybrid, google_maps, osm, eoc_litemap } from '@ukis/baseLayers/rasterBaseLayers';
import { LayersService } from '@ukis/services/src/app/layers/layers.service';
import {Subscription} from 'rxjs/Subscription';

import { Ol4MapSvc, IOl4MapSvc } from '@ukis/ol-map/src/app/ol-map/ol-map.service';


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
  title = 'UKIS UI';

  alert;

  obsListOpen = false;

  ui = {
    floating: true,
    flipped: false,
    footer:false
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
    @Inject(LayersService)private layerSvc: LayersService,
    @Inject(Ol4MapSvc)private mapSvc: IOl4MapSvc) {

      google_earth.visible = true;
      this.layerSvc.addBaseLayer(google_earth);
      this.layerSvc.addBaseLayer(google_maps);
      //this.layerSvc.addBaseLayer(eoc_litemap);

      this.layerSvc.addOverlay(google_hybrid);
      this.layerSvc.addOverlay(osm);

      this.baseLayersSubscription = this.layerSvc.getBaseLayers().subscribe(baseLayers => {
      this.layergroups[0].layers = baseLayers;
      //console.log(this.layergroups[0].layers)
    });

    this.overlaysSubscription = this.layerSvc.getOverlays().subscribe(overlays => {
      this.layergroups[1].layers = overlays;
      //console.log(this.layergroups[1].layers)
    });


  }

  zoom(value:'-' | '+'){
    this.mapSvc.zoomInOut(value)
  }

  layerUpdate = (event, group, layer) => {

    layer = event.layer;

    if (group.inputtype=="checkbox") {
      this.layerSvc.setOverlays(group.layers);
    }
    if (group.inputtype=="radio") {
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
