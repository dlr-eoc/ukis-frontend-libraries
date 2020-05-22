import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LayersService, VectorLayer } from '@dlr-eoc/services-layers';
import { Fill as olFill, Stroke as olStroke, Style as olStyle } from 'ol/style';
import { VectorSource } from 'ol/source';
import { GeoJSON } from 'ol/format';
// import simplify from '@turf/simplify';
// import bbox from '@turf/bbox';
// import { reproject } from 'reproject';
import proj4 from 'proj4';
import { BehaviorSubject } from 'rxjs';
import { MapOlService } from '@dlr-eoc/map-ol/src/public-api';


type fetchState = 'ready' | 'fetching' | 'done' | 'error';


@Component({
  selector: 'app-fetchbutton',
  templateUrl: './fetchbutton.component.html',
  styleUrls: ['./fetchbutton.component.scss']
})
export class FetchbuttonComponent implements OnInit {

  public state$ = new BehaviorSubject<fetchState>('ready');

  constructor(
    private http: HttpClient,
    private layersSvc: LayersService,
    private olSvc: MapOlService
  ) { }

  ngOnInit(): void {
  }

  fetchClicked() {
    const fileUrl = 'https://bloomington.in.gov/geoserver/publicgis/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=publicgis:Buildings&outputFormat=application%2Fjson';
    this.state$.next('fetching');
    this.http.get(fileUrl).subscribe((data) => {
      this.addLayers(data);
      this.state$.next('done');
    });
  }

  private addLayers(dataOrig: any) {

    proj4.defs('EPSG:2966', '+proj=tmerc +lat_0=37.5 +lon_0=-87.08333333333333 +k=0.999966667 +x_0=900000 +y_0=249999.9998983998 +datum=NAD83 +units=us-ft +no_defs');
    const geojsonFormat = new GeoJSON({
      featureProjection: 'EPSG:2966',
      dataProjection: 'EPSG:4326'
    });
    const features =  geojsonFormat.readFeatures(dataOrig);
    const bx = this.olSvc.getFeaturesExtent(features);

    const exposureLarge = new VectorLayer({
      id: 'largeVectorLayer',
      name: 'Large VectorLayer',
      type: 'geojson',
      data: features,
      bbox: bx,
      popup: true,
      visible: false
    });
    this.layersSvc.addLayer(exposureLarge);

    const exposureLargeStyled = new VectorLayer({
      id: 'largeVectorLayerStyled',
      name: 'Large, styled VectorLayer',
      type: 'geojson',
      data: features,
      bbox: bx,
      popup: true,
      visible: false,
      options: {
        style: (feature, res) => {
          const r = Math.floor(Math.random() * 255);
          const g = Math.floor(Math.random() * 255);
          const b = Math.floor(Math.random() * 255);
          return new olStyle({
            stroke: new olStroke({
              color: 'gray',
              width: 1
            }),
            fill: new olFill({
              color: `rgba(${r}, ${g}, ${b},0.9)`
            })
          });
        }
      }
    });
    this.layersSvc.addLayer(exposureLargeStyled);

    const dataNoProps = JSON.parse(JSON.stringify(data));
    for (const feature of dataNoProps.features) {
      feature.properties = undefined;
    }
    const exposureNoprops = new VectorLayer({
      id: 'nopropsVectorLayer',
      name: 'Noprops VectorLayer',
      type: 'geojson',
      data: dataNoProps,
      bbox: bx,
      popup: true,
      visible: false
    });
    this.layersSvc.addLayer(exposureNoprops);

    const dataSimpleGeo = simplify(data);
    const exposureSimpleGeom = new VectorLayer({
      id: 'simpleVectorLayer',
      name: 'Simple geometry VectorLayer',
      type: 'geojson',
      data: dataSimpleGeo,
      bbox: bx,
      popup: true,
      visible: false
    });
    this.layersSvc.addLayer(exposureSimpleGeom);

  }
}
