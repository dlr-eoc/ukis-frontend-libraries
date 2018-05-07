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
import { BasicAuthService } from '@ukis/services/src/app/auth/basic-auth.service';

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
  title = '';

  alert;

  obsListOpen = false;

  ui = {
    floating: true,
    flipped: false,
    footer: false
  };

  constructor(private alertService: AlertService, private authService: BasicAuthService) {
    this.getHtmlMeta(['title','version','description']);

    if (this['TITLE']) {
      this.title = this['TITLE'];
    }

    console.log(this)

    alertService.alert$.subscribe((ev) => {
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

  getHtmlMeta(names:string[]) {
    var _ref = document.getElementsByTagName('meta');
    for (let _i = 0, _len = _ref.length; _i < _len; _i++) {
      let meta = _ref[_i];
      let name = meta.getAttribute('name');
      if (names.includes(name)) {
        this[name.toUpperCase()] = meta.getAttribute('content') || eval(meta.getAttribute('value'));
      }
    }
  }


}
