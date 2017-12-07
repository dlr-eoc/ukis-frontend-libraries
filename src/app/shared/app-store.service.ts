import { Injectable } from '@angular/core';
import * as ol from 'openlayers'
import { osm } from '@ukis/baseLayers/rasterBaseLayers';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';


export interface IAppStoreService {
  showModal:boolean;
}


@Injectable()
export class AppStoreService implements IAppStoreService{
    showModal:boolean = false;

    constructor() {}
}
