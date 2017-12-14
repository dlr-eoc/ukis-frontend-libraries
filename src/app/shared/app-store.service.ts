import { Injectable } from '@angular/core';
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
