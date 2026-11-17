import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WMTSCapabilities } from 'ol/format';
import { HttpClient } from '../httpClient/httpclient';


export type WmtsVersion = '1.0.0';

export class WmtsClient {
  private parser: WMTSCapabilities;

  constructor(private http: HttpClient) {
    this.parser = new WMTSCapabilities();
  }


  public getCapabilitiesUrl(url: string, version: WmtsVersion = '1.0.0'){
    return `${url}?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=${version}`;
  }


  public getCapabilities(url: string, version: WmtsVersion = '1.0.0'): Observable<object> {
    const getCapabilitiesUrl = this.getCapabilitiesUrl(url, version);
    return this.http.get(getCapabilitiesUrl, { headers: {
      'Content-Type': 'text/xml',
      'Accept': 'text/xml, application/xml'
    }, responseType: 'text' }).pipe(
      map(response => {
        return this.parser.read(response);
      })
    );
  }
}

