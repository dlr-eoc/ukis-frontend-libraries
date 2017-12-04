import { Component } from '@angular/core';
import {AppStoreService} from './shared/app-store.service'


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

@Component({
  selector: 'ukis-root',
  templateUrl: './ukis.component.html',
  styleUrls: ['./ukis.component.css']
})
export class UkisComponent {
  title = 'ukis';

  alert;

  ui = {
    floating: true,
    flipped: false
  };

  layergroups = [
    {
      'name': 'Baselayers',
      'inputtype': 'radio',
      'layers': [
        {
          'name': 'Light',
          'enabled': true
        },
        {
          'name': 'Dark',
          'enabled': false
        },
        {
          'name': 'Street',
          'enabled': false
        }
      ]
    },
    {
      'name': 'Overlays',
      'inputtype': 'checkbox',
      'layers': [
        {
          'name': 'Modis',
          'enabled': true
        },
        {
          'name': 'GUF 90',
          'enabled': false
        },
        {
          'name': 'NDVI',
          'enabled': true
        },
        {
          'name': 'Sentinel 2',
          'enabled': false
        }
      ]
    }
  ];


  constructor(private AppStoreService: AppStoreService) {
    console.log(AppStoreService)
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
