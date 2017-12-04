import { Component } from '@angular/core';


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

  layers = [
    {
      'type': 'Baselayers',
      'selected': true,
      'expanded': false,
      'layers': [
        {
          'name': 'Light',
          'enable': true
        },
        {
          'name': 'Dark',
          'enable': false
        },
        {
          'name': 'Street',
          'enable': false
        }
      ]
    },
    {
      'type': 'Overlays',
      'selected': true,
      'expanded': false,
      'layers': [
        {
          'name': 'Modis',
          'enable': true
        },
        {
          'name': 'GUF 90',
          'enable': false
        },
        {
          'name': 'NDVI',
          'enable': true
        },
        {
          'name': 'Sentinel 2',
          'enable': false
        }
      ]
    }
  ];


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
