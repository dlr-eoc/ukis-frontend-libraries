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

  constructor(@Inject(LayersService)private layerSvc: LayersService) {

    google_earth.visible = true;
    this.layerSvc.addBaseLayer(google_earth);

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
