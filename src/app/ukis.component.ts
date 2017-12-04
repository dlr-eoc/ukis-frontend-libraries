import {Component, Inject} from '@angular/core';
import { NgModel } from '@angular/forms';
import {NgForm} from '@angular/forms';

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

import { Layer } from '@ukis/datatypes/Layer';
import { LayersService } from '@ukis/services/src/app/layers/layers.service';

import { google_earth, google_hybrid, google_maps, osm } from '@ukis/baseLayers/rasterBaseLayers';
import {Subscription} from 'rxjs/Subscription';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis enim aliquid mollitia odio?';

@Component({
  selector: 'ukis-root',
  templateUrl: './ukis.component.html',
  styleUrls: []
})
export class UkisComponent {
  title = 'ukis';

  alert;

  baseLayersSubscription: Subscription;

  ui = {
    floating: true,
    flipped: false
  };

  layergroups = [
    {
      'name': 'Baselayers',
      'inputtype': 'radio',
      'layers': []
    },
    {
      'name': 'Overlays',
      'inputtype': 'checkbox',
      'layers': [
        google_maps, osm
      ]
    }
  ];

  private layergroupSubj = new BehaviorSubject(this.layergroups);


  constructor(@Inject(LayersService)private layerSvc: LayersService) {

    google_earth.visible = true;
    this.layerSvc.addRasterBaseLayer(google_earth);
    this.layerSvc.addRasterBaseLayer(google_hybrid);
    this.layerSvc.addRasterBaseLayer(google_maps);
    this.layerSvc.addRasterBaseLayer(osm);

    this.baseLayersSubscription = this.layerSvc.getRasterBaseLayers().subscribe(baseLayers => {
      this.layergroups[0].layers = baseLayers;
      console.log(this.layergroups[0].layers)
    });


  }

  baseLayerSwitch(layer){
    console.log(layer)
  }

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
