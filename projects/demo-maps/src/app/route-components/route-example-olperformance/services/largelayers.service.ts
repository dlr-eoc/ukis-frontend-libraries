import { Injectable } from '@angular/core';
import { Extent } from 'ol/extent';
import { Projection } from 'ol/proj';
import { Vector as VectorSource } from 'ol/source';
import { Vector as OlVectorLayer } from 'ol/layer';
import { MVT } from 'ol/format';
import { VectorTile as VectorTileLayer } from 'ol/layer';
import { VectorTile as VectorTileSource } from 'ol/source';
import { GeoJSON } from 'ol/format';
import { get as getProjection, getTransform } from 'ol/proj';
import { HttpClient } from '@angular/common/http';
import { CustomLayer } from '@dlr-eoc/services-layers';
import { MapOlService } from '@dlr-eoc/map-ol';
import { all, bbox } from 'ol/loadingstrategy';
import { IProjDef } from '@dlr-eoc/services-map-state';


export type DataStrategy = 'all' | 'bbox' | 'tile' | 'simplifyGeometry' | 'noProps';


@Injectable({
  providedIn: 'root'
})
export class LargeLayersService {

  private geojson2966To4326: GeoJSON;
  private geojson4326: GeoJSON;

  constructor(
    private http: HttpClient,
    private olSvc: MapOlService
  ) {
    const IndianaWest: IProjDef = {
      code: 'EPSG:2966',
      proj4js: '+proj=tmerc +lat_0=37.5 +lon_0=-87.08333333333333 +k=0.999966667 +x_0=900000 +y_0=249999.9998983998 +datum=NAD83 +units=us-ft +no_defs',
      title: 'NAD83 / Indiana West',
      extent: [2658876.73, 918525.73, 3618576.69, 2383977.36],
      worldExtent: [-88.1, 37.77, -84.78, 41.77],
      global: false,
      units: 'degrees'
    }
    this.olSvc.registerProjection(IndianaWest);
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

  private getWfsSource(strategy: DataStrategy) {

    switch (strategy) {
      case 'all':
        return new VectorSource({
          format: new GeoJSON(),
          url: this.getRequestUrl(this.olSvc.EPSG),
          strategy: all
        });

      case 'bbox':
        return new VectorSource({
          format: new GeoJSON(),
          url: (extent: Extent, resolution: number, projection: Projection) => {
            const srsCode = projection.getCode();
            return this.getRequestUrl(srsCode, extent);
          },
          strategy: bbox
        });

      case 'simplifyGeometry':
        const simplifiedSource = new VectorSource({
          loader: (extent: Extent, resolution: number, projection: Projection) => {
            const srsCode = projection.getCode();
            this.http.get(this.getRequestUrl(srsCode, extent)).subscribe((data) => {
              const features = new GeoJSON().readFeatures(data);
              for (const feature of features) {
                (feature as any).geometry = feature.getGeometry().simplify(1000);
              }
              simplifiedSource.addFeatures(features);
            });
          },
          strategy: bbox
        });
        return simplifiedSource;

      case 'noProps':
        const noPropsSource = new VectorSource({
          loader: (extent: Extent, resolution: number, projection: Projection) => {
            const srsCode = projection.getCode();
            this.http.get(this.getRequestUrl(srsCode, extent)).subscribe((data) => {
              const features = new GeoJSON().readFeatures(data);
              for (const feature of features) {
                feature.setProperties({});
              }
              noPropsSource.addFeatures(features);
            });
          },
          strategy: bbox
        });
        return noPropsSource;

      case 'tile':
        throw new Error('Tile-Strategy source not yet implemented.');
    }
  }

  private getRequestUrl(srsCode?: string, bbx?: Extent): string {
    if (!srsCode) {
      srsCode = 'EPSG:4326';
    }

    let url = 'https://ahocevar.com/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature';
    url += `&outputFormat=application/json&srsname=${srsCode}`;
    url += '&typename=osm:water_areas';
    if (bbx) {
      url += `&bbox=${bbx.join(',')},${srsCode}`;
    }

    return url;
  }


  public createWfsLayer(id: string, name: string, dataStrategy: DataStrategy, styling?): CustomLayer {

    const wfsSource = this.getWfsSource(dataStrategy);
    const wfs = new OlVectorLayer({
      source: wfsSource,
      style: styling
    });

    return new CustomLayer({
      id,
      name,
      custom_layer: wfs,
      popup: true,
      visible: false
    });
  }

  /**
   * Unfortunately, I could not find a dataset that is both available per VectorTile and per WFS.
   * So we cannot really compare performance between WFS and VectorTiles.
   * This method is therefore only here as a placeholder.
   * If we can find such a data source, we can change the methods `createVectorTileLayer`
   * and `createWfsLayer` to access the same data set and get a much better comparison.
   */
  public createVectorTileLayer(id: string, name: string): CustomLayer {

    const vtsSource = new VectorTileSource({
      format: new MVT(),
      url: 'https://ahocevar.com/geoserver/gwc/service/tms/1.0.0/ne:ne_10m_admin_0_countries@EPSG:4326@pbf/{z}/{x}/{-y}.pbf'
    });

    const vts = new VectorTileLayer({
      source: vtsSource
    });

    return new CustomLayer({
      id,
      name,
      custom_layer: vts,
      popup: true,
      visible: false
    });
  }

}
