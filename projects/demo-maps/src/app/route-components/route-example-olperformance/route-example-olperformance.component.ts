import { Component, OnInit, HostBinding } from '@angular/core';
import { LayersService, VectorLayer } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { MapOlService } from '@dlr-eoc/map-ol';
import { OsmTileLayer } from '@dlr-eoc/base-layers-raster';
import { HttpClient } from '@angular/common/http';
import { Fill as olFill, Stroke as olStroke, Style as olStyle } from 'ol/style';
import simplify from '@turf/simplify';
import bbox from '@turf/bbox';
import { reproject, epsg, toWgs84 } from 'reproject';
import proj4 from 'proj4';
import { get as getProjection } from 'ol/proj';

@Component({
  selector: 'app-route-example-olperformance',
  templateUrl: './route-example-olperformance.component.html',
  styleUrls: ['./route-example-olperformance.component.scss'],
  providers: [LayersService, MapStateService, MapOlService]
})
export class RouteExampleOlperformanceComponent implements OnInit {
  @HostBinding('class') class = 'content-container';

  constructor(
    public layersSvc: LayersService,
    public mapStateSvc: MapStateService,
    public mapSvc: MapOlService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.mapSvc.setProjection('EPSG:4326');

    const bgLayer = new OsmTileLayer({
      visible: true
    });
    this.layersSvc.addLayer(bgLayer, 'Layers');

    const fileUrl = 'https://bloomington.in.gov/geoserver/publicgis/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=publicgis:Buildings&outputFormat=application%2Fjson';

    this.http.get(fileUrl).subscribe((dataOrig: any) => {
      const str2966 = '+proj=tmerc +lat_0=37.5 +lon_0=-87.08333333333333 +k=0.999966667 +x_0=900000 +y_0=249999.9998983998 +datum=NAD83 +units=us-ft +no_defs';
      const data = reproject(dataOrig, str2966, proj4.WGS84);
      console.log(data);
      const bx = bbox(data);

      const exposureLarge = new VectorLayer({
        id: 'largeVectorLayer',
        name: 'Large VectorLayer',
        type: 'geojson',
        data: data,
        bbox: bx,
        popup: true,
        visible: false
      });
      this.layersSvc.addLayer(exposureLarge);

      const exposureLargeStyled = new VectorLayer({
        id: 'largeVectorLayerStyled',
        name: 'Large, styled VectorLayer',
        type: 'geojson',
        data: data,
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

    });
  }

}
