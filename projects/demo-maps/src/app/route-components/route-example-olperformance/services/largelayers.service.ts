import { Injectable } from '@angular/core';
import { Extent } from 'ol/extent';
import { Projection } from 'ol/proj';
import { Vector as VectorSource } from 'ol/source';
import { Vector as OlVectorLayer } from 'ol/layer';
import { GeoJSON } from 'ol/format';
import {get as getProjection, getTransform} from 'ol/proj';
import {register} from 'ol/proj/proj4';
import proj4 from 'proj4';
import { HttpClient } from '@angular/common/http';
import { LayersService, VectorLayer, CustomLayer } from '@dlr-eoc/services-layers/src/public-api';
import { MapOlService } from '@dlr-eoc/map-ol/src/public-api';
import { Observable } from 'rxjs';
import { all, bbox, tile } from 'ol/loadingstrategy';


export type DataStrategy =  'all' | 'bbox' | 'tile' | 'simplifyGeometry' | 'noprops';


@Injectable({
  providedIn: 'root'
})
export class LargelayersService {

  private remoteService = 'https://bloomington.in.gov/geoserver/publicgis/ows';
  private geojson2966To4326: GeoJSON;
  private geojson4326: GeoJSON;

  constructor(
    private http: HttpClient,
    private layersSvc: LayersService,
    private olSvc: MapOlService
  ) {
    proj4.defs('EPSG:2966', '+proj=tmerc +lat_0=37.5 +lon_0=-87.08333333333333 +k=0.999966667 +x_0=900000 +y_0=249999.9998983998 +datum=NAD83 +units=us-ft +no_defs');
    register(proj4);
    const newProj = getProjection('EPSG:2966');
    const toWgs84 = getTransform(newProj, 'EPSG:4326');

    this.geojson2966To4326 = new GeoJSON({
      dataProjection: 'EPSG:2966',
      featureProjection: 'EPSG:4326'
    });
    this.geojson4326 = new GeoJSON({
      featureProjection: 'EPSG:4326'
    });
  }

  private getWfsSource(strategy: DataStrategy): VectorSource {

    switch (strategy) {
      case 'all':
        return new VectorSource({
          format: new GeoJSON(),
          url: `${this.remoteService}?service=WFS&version=1.0.0&request=GetFeature&typeName=publicgis:Buildings&outputFormat=application/json&srsname=${this.olSvc.EPSG}`,
          strategy: all
        });

      case 'bbox':
        return new VectorSource({
          format: new GeoJSON(),
          url: (extent: Extent, resolution: number, projection: Projection) => {
            const srsCode = projection.getCode();
            return `${this.remoteService}?service=WFS&version=1.0.0&request=GetFeature&typeName=publicgis:Buildings&outputFormat=application/json&srsname=${srsCode}&bbox=${extent.join(',')}`
          },
          strategy: bbox
        });

      case 'simplifyGeometry':
        const simplifiedSource = new VectorSource({
          loader: (extent: Extent, resolution: number, projection: Projection) => {
            const srsCode = projection.getCode();
            this.getRawData(srsCode).subscribe((data) => {
              const features = new GeoJSON().readFeatures(data);
              for (const feature of features) {
                feature.geometry = feature.getGeometry().simplify(1000);
              }
              simplifiedSource.addFeatures(features);
            });
          },
          strategy: all
        });
        return simplifiedSource;

      case 'noprops':
        const nopropsSource = new VectorSource({
          loader: (extent: Extent, resolution: number, projection: Projection) => {
            const srsCode = projection.getCode();
            this.getRawData(srsCode).subscribe((data) => {
              const features = new GeoJSON().readFeatures(data);
              for (const feature of features) {
                feature.setProperties({});
              }
              nopropsSource.addFeatures(features);
            });
          },
          strategy: all
        });
        return nopropsSource;

      case 'tile':
        throw new Error('Tile-Strategy source not yet implemented.');
    }
  }

  private getRawData(srsCode: string): Observable<object> {
    const url = `${this.remoteService}?service=WFS&version=1.0.0&request=GetFeature&typeName=publicgis:Buildings&outputFormat=application/json&srsname=${srsCode}`;
    return this.http.get(url);
  }

  public makeLayer(id: string, name: string, dataStrat: DataStrategy, styling?): CustomLayer {

    const wfsSource = this.getWfsSource(dataStrat);
    const layer = new OlVectorLayer({
      source: wfsSource,
      style: styling
    });

    return new CustomLayer({
      id,
      name,
      custom_layer: layer,
      popup: true,
      visible: false
    });
  }

}
