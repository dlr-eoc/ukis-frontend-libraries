import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { wps } from './jsonixMappings/wps';
//var Jsonix = require('jsonix').Jsonix;
import { Jsonix } from '@boundlessgeo/jsonix';
import { IWpsCapabilities, IWpsProcess, IWpsProcessDescriptions } from 'datatypes-wps/src/lib/datatypes-wps';


@Injectable({
  providedIn: 'root'
})
export class ServicesWpsService {
  
  unmarshaller: any;

  constructor(
    private http: HttpClient
  ) {
    let jsonixContext = new Jsonix.Context([wps]);
    this.unmarshaller = jsonixContext.createUnmarshaller();
  }

 
  /**
   * http://geoprocessing.info/wpsdoc/serv?request=HYPERLINKED&schema=wps:Capabilities
   */
  getCapabilities(url: string): Observable<IWpsCapabilities> {

    let wpsQueryParams = {
      service: 'WPS',
      version: '1.0.0',
      request: 'GetCapabilities'
    };

    let wpsUrl = url + this.objectToUriParameters(wpsQueryParams);

    let headers = new HttpHeaders({ 'Content-Type': 'text/xml' }).set('Accept', 'text/xml');

    return this.http.get(wpsUrl, {headers: headers, responseType: 'text'}).pipe(
      map((response: string): IWpsCapabilities => {
        return this.unmarshaller.unmarshalString(response);
      })
    );
  }

  /**
   * http://geoprocessing.info/wpsdoc/serv?request=HYPERLINKED&schema=wps:ProcessDescription
   */
  describeProcess(url: string, process: IWpsProcess): Observable<IWpsProcessDescriptions> {

    let identifier = process.title[0].value;

    let wpsQueryParams = {
        service: 'WPS',
        version: '1.0.0',
        request: 'DescribeProcess',
        identifier: identifier
    };

    let wpsUrl = url + this.objectToUriParameters(wpsQueryParams);

    let headers = new HttpHeaders({ 'Content-Type': 'text/xml' }).set('Accept', 'text/xml');

    return this.http.get(wpsUrl, {headers: headers, responseType: 'text'}).pipe(
      map((response: string): IWpsProcessDescriptions => {
        return this.unmarshaller.unmarshalString(response);
      })
    );
  }


  executeProcess(url:string, process: IWpsProcess, body, responseFormType) {

    let identifier = process.title[0].value;

    var wpsQueryParams = {
        service: 'WPS',
        version: '1.0.0',
        request: 'Execute',
        identifier: identifier
    };

    let wpsUrl = url + this.objectToUriParameters(wpsQueryParams);

    // @TODO: body needs a type and needs to be marshalled from js to xml

    let headers = new HttpHeaders({ 'Content-Type': 'text/xml' }).set('Accept', 'text/xml');

    return this.http.post(wpsUrl, body, {headers: headers, responseType: 'text'});
}


  private objectToUriParameters(obj: Object) : string {
    var query = "?";
    for (var k in obj) {
        query += k + "=" + obj[k] + "&";
    }
    //TODO: uri encode proposed in RFC not working with Django-AS
    query = query.substr(0, query.length - 1);
    return query;
}

}

