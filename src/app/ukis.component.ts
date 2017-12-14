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

  constructor() {


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
