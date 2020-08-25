import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jsonix } from '@michaellangbein/jsonix';
import { map } from 'rxjs/operators';
import * as XLink_1_0_Factory from 'w3c-schemas/lib/XLink_1_0';
const XLink_1_0 = XLink_1_0_Factory.XLink_1_0;
import * as OWS_1_1_0_Factory from 'ogc-schemas/lib/OWS_1_1_0';
const OWS_1_1_0 = OWS_1_1_0_Factory.OWS_1_1_0;

import * as WMS_1_0_0_Factory from 'ogc-schemas/lib/WMS_1_0_0';
const WMS_1_0_0 = WMS_1_0_0_Factory.WMS_1_0_0;

import * as WMS_1_1_0_Factory from 'ogc-schemas/lib/WMS_1_1_0';
const WMS_1_1_0 = WMS_1_1_0_Factory.WMS_1_1_0;

import * as WMS_1_1_1_Factory from 'ogc-schemas/lib/WMS_1_1_1';
const WMS_1_1_1 = WMS_1_1_1_Factory.WMS_1_1_1;

import * as WMS_1_3_0_Factory from 'ogc-schemas/lib/WMS_1_3_0';
const WMS_1_3_0 = WMS_1_3_0_Factory.WMS_1_3_0;

import * as WMS_1_3_0_Exceptions_Factory from 'ogc-schemas/lib/WMS_1_3_0_Exceptions';
const WMS_1_3_0_Exceptions = WMS_1_3_0_Exceptions_Factory.WMS_1_3_0_Exceptions;

@Injectable({
  providedIn: 'root'
})
export class WmsService {
  private xmlmarshaller;
  private xmlunmarshaller;

  constructor(private http: HttpClient) {
    const context = new Jsonix.Context([XLink_1_0, WMS_1_0_0, WMS_1_1_0, WMS_1_1_1, WMS_1_3_0, WMS_1_3_0_Exceptions]);
    this.xmlunmarshaller = context.createUnmarshaller();
    this.xmlmarshaller = context.createMarshaller();
  }

  public getCapabilities(url: string, version = '1.1.0'): Observable<object> {
    // example: https://tiles.geoservice.dlr.de/service/wmts?SERVICE=WMTS&REQUEST=GetCapabilities&VERSION=1.1.0
    const getCapabilitiesUrl = `${url}?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=${version}`;
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'Accept': 'text/xml, application/xml'
    });
    return this.http.get(getCapabilitiesUrl, { headers, responseType: 'text' }).pipe(
      map(response => {
        return this.xmlunmarshaller.unmarshalString(response);
      })
    );
  }
}
