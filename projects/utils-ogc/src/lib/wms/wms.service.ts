import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WMSCapabilities } from 'ol/format';


export interface WmsHttpClientRequestParameters {
  headers?: object;
  [key: string]: any;
}

/**
* This library attempts to be largely independent of angular. 
* As such, we allow other http-clients than @angular/http.
*/
export interface WmsHttpClient {
  get(url: string, paras?: WmsHttpClientRequestParameters): Observable<string>;
  post(url: string, body: string, paras?: WmsHttpClientRequestParameters): Observable<string>;
}



export type WmsVersion = '1.1.0' | '1.1.1' | '1.3.0';

@Injectable({
  providedIn: 'root'
})
export class WmsClient {
  private parser: WMSCapabilities;

  constructor(private http: WmsHttpClient) {
    this.parser = new WMSCapabilities();
  }

  public getCapabilities(url: string, version: WmsVersion = '1.1.0'): Observable<any> {
    const getCapabilitiesUrl = `${url}?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=${version}`;
    return this.http.get(getCapabilitiesUrl, { headers: {
      'Content-Type': 'text/xml',
      'Accept': 'text/xml, application/xml'
    }, responseType: 'text' }).pipe(
      map(response => {
        return this.parser.read(response);
      })
    );
  }

  public getLayerFromCapabilities(name: string, capabilities: any) {
    /** http://schemas.opengis.net/wms/1.3.0/capabilities_1_3_0.xsd - The Layer Element */
    const rootLayer: null | any = capabilities.Capability.Layer;
    return this.getLayerFromCapabilitiesLayer(name, rootLayer);
  }
  
  /**
   * @param name
   * @param layer http://schemas.opengis.net/wms/1.3.0/capabilities_1_3_0.xsd - The Layer Element
   * @returns any
   */
  private getLayerFromCapabilitiesLayer(name: string, layer: any): any {
    const rootLayer: null | any = layer;
    if (rootLayer) {
      if (rootLayer.Name && rootLayer.Name === name) {
        return rootLayer;
      } else {
        if (rootLayer.Layer && Array.isArray(rootLayer.Layer)) {
          // find layer from array... recursive
          return rootLayer.Layer.find(item => {
            return this.getLayerFromCapabilitiesLayer(name, item);
          });
        } else if (rootLayer.Layer && rootLayer.Layer.Name && rootLayer.Layer.Name === name) {
          return rootLayer.Layer;
        }
      }
    } else {
      return null;
    }
  }
  
  /**
   * 
   * @param layer 
   * @param wmsVersion 
   * @returns 
   */
  public getTimeDimensionFromLayer(layer: any) {
    return layer.Dimension?.find(d => d.name === 'time');
  }
  
}
