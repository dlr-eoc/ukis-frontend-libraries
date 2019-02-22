import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWpsCapabilities } from 'projects/datatypes-wps/src/lib/wps';
import { map } from 'rxjs/operators';
import { Jsonix } from 'jsonix';

@Injectable({
  providedIn: 'root'
})
export class ServicesWpsService {
  
  unmarshaller: any;

  constructor(
    private http: HttpClient
  ) {
    let jsonixContext = new Jsonix.Context([IWpsCapabilities]);
    this.unmarshaller = jsonixContext.createUnmarshaller();
  }


  // getCapabilities ----------------------------------------------------------------------------
  // http://geoprocessing.info/wpsdoc/serv?request=HYPERLINKED&schema=wps:Capabilities
  getCapabilities(url: string)//: Observable<IWpsCapabilities> 
  {
    var wpsQuery = {
      service: 'WPS',
      version: '1.0.0',
      request: 'GetCapabilities'
    };
    var pathUrl = url + this.objectToUriParameters(wpsQuery);
    var wpsurl = encodeURIComponent(pathUrl);

    // return this.http.get(wpsurl).pipe(
    //   map((response: Response) => {
    //     this.unmashaller.unmarshal
    //   })
    // );
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

