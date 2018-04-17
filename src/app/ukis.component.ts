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

import { Subscription } from 'rxjs/Subscription';

//for User
import { AlertService } from './alert.service';


const lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis enim aliquid mollitia odio?';

/**
 * root component
 */
@Component({
  selector: 'ukis-root',
  templateUrl: './ukis.component.html',
  styleUrls: [],
  providers: []
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

  constructor(private alertService: AlertService) {
    alertService.alert$.subscribe((ev) => {
      console.log("test");
      this.setAlert(ev)
    });
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
