import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jsonix } from 'jsonix';
import { map } from 'rxjs/operators';
import * as XLink_1_0_Factory from 'w3c-schemas/lib/XLink_1_0';
const XLink_1_0 = XLink_1_0_Factory.XLink_1_0;
import * as OWS_1_1_0_Factory from 'ogc-schemas/lib/OWS_1_1_0';
const OWS_1_1_0 = OWS_1_1_0_Factory.OWS_1_1_0;
import * as SMIL_2_0_Factory from 'ogc-schemas/lib/SMIL_2_0';
const SMIL_2_0 = SMIL_2_0_Factory.SMIL_2_0;
import * as SMIL_2_0_Language_Factory from 'ogc-schemas/lib/SMIL_2_0_Language';
const SMIL_2_0_Language = SMIL_2_0_Language_Factory.SMIL_2_0_Language;
import * as GML_3_1_1_Factory from 'ogc-schemas/lib/GML_3_1_1';
const GML_3_1_1 = GML_3_1_1_Factory.GML_3_1_1;
import * as WMTS_1_0_Factory from 'ogc-schemas/lib/WMTS_1_0';
const WMTS_1_0 = WMTS_1_0_Factory.WMTS_1_0;



@Injectable({
  providedIn: 'root'
})
export class WmtsClientService {

  private xmlmarshaller;
  private xmlunmarshaller;

  constructor(private http: HttpClient) {
    const context = new Jsonix.Context([SMIL_2_0, SMIL_2_0_Language, GML_3_1_1, XLink_1_0, OWS_1_1_0, WMTS_1_0]);
    this.xmlunmarshaller = context.createUnmarshaller();
    this.xmlmarshaller = context.createMarshaller();
  }

  public getCapabilities(url: string, version = '1.1.0'): Observable<object> {
    // example: https://tiles.geoservice.dlr.de/service/wmts?SERVICE=WMTS&REQUEST=GetCapabilities&VERSION=1.1.0
    const getCapabilitiesUrl = `${url}?SERVICE=WMTS&REQUEST=GetCapabilities&VERSION=${version}`;
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      Accept: 'text/xml, application/xml'
    });
    return this.http.get(getCapabilitiesUrl, { headers, responseType: 'text' }).pipe(
      map(response => {
        return this.xmlunmarshaller.unmarshalString(response);
      })
    );
  }

}
