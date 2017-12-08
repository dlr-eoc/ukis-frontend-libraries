import {Component, Inject} from '@angular/core';
import { NgModel } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { RadioControlValueAccessor } from '@angular/forms';
import {FormControl, FormGroup} from '@angular/forms';

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

import { Layer, RasterLayer, VectorLayer } from '@ukis/datatypes/Layer';
import { LayersService } from '@ukis/services/src/app/layers/layers.service';
import {AppStoreService} from './shared/app-store.service';
import {RestService} from '@ukis/services/src/app/rest/rest.service';

import { google_earth, google_hybrid, google_maps, osm, eoc_litemap } from '@ukis/baseLayers/rasterBaseLayers';
import {Subscription} from 'rxjs/Subscription';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

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
  title = 'ukis';

  alert;

  baseLayersSubscription: Subscription;
  overlaysSubscription: Subscription;

  ui = {
    floating: true,
    flipped: false
  };

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


  constructor(private authService: AuthService, @Inject(LayersService)private layerSvc: LayersService, @Inject(RestService)private restSvc: RestService, private AppStoreService: AppStoreService) {

    this.restSvc.http.get('https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_populated_places_simple.geojson').subscribe(FeatureCollection => {


      let testGeoJsonLayer = new VectorLayer({
        name: 'Test Json',
        ukisID: 'Test_Json',
        visible: false,
        type: 'geojson',
        attribution: '&copy, <a href="https://www.google.de/maps">Google</a> contributors',
        continuousWorld: false,
        opacity: 1,
        data: FeatureCollection
      });
      console.log(testGeoJsonLayer)
      this.layerSvc.addOverlay(testGeoJsonLayer);

    });


    google_earth.visible = true;
    this.layerSvc.addBaseLayer(google_earth);
    this.layerSvc.addBaseLayer(google_maps);
    this.layerSvc.addBaseLayer(eoc_litemap);

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

  showHideLayerSwitch = (group, selectedLayer) => {
    if (group.inputtype=="checkbox") {
      selectedLayer.visible = !selectedLayer.visible;
      this.layerSvc.setOverlays(group.layers);
    }
    if (group.inputtype=="radio") {
      for (let layer of group.layers) {
        layer.visible = layer === selectedLayer;
      }
      this.layerSvc.setBaseLayers(group.layers);
    }
  };


  changeOpacity = (group, selectedLayer) => {
    if (group.inputtype=="checkbox") {
      this.layerSvc.setOverlays(group.layers);
    }
    if (group.inputtype=="radio") {
      this.layerSvc.setBaseLayers(group.layers);
    }

    //console.log(selectedLayer);
  };

  layerUpdate = (event, group, layer) => {

    layer = event.layer;

    if (group.inputtype=="checkbox") {
      this.layerSvc.setOverlays(group.layers);
    }
    if (group.inputtype=="radio") {
      this.layerSvc.setBaseLayers(group.layers);
    }

    //console.log(selectedLayer);
  };

  removeLayer = (group, selectedLayer) => {
    //console.log("delete "+selectedLayer.name)
    this.layerSvc.removeLayer(selectedLayer, group.name);
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
