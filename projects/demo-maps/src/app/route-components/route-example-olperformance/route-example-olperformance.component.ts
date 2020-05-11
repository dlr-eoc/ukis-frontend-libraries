import { Component, OnInit, HostBinding } from '@angular/core';
import { LayersService, VectorLayer } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { MapOlService } from '@dlr-eoc/map-ol';
import { OsmTileLayer } from '@dlr-eoc/base-layers-raster';
import { HttpClient } from '@angular/common/http';
import { Fill as olFill, Stroke as olStroke, Style as olStyle } from 'ol/style';

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
    const bgLayer = new OsmTileLayer({
      visible: true
    });


    this.http.get('./assets/data/json/exposure_large.json').subscribe(data => {
      const exposureLarge = new VectorLayer({
        id: 'largeVectorLayer',
        name: 'Large VectorLayer',
        type: 'geojson',
        data: data,
        popup: true,
        visible: false
      });
      this.layersSvc.addLayer(exposureLarge);

      const exposureLargeStyled = new VectorLayer({
        id: 'largeVectorLayerStyled',
        name: 'Large, styled VectorLayer',
        type: 'geojson',
        data: data,
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
    });

    this.http.get('./assets/data/json/exposure_noprops.json').subscribe(data => {
      const nopropsLayer = new VectorLayer({
        id: 'nopropsVectorLayer',
        name: 'Noprops VectorLayer',
        type: 'geojson',
        data: data,
        popup: true,
        visible: false
      });
      this.layersSvc.addLayer(nopropsLayer);
    });

    this.http.get('./assets/data/json/exposure_simpleGeom.json').subscribe(data => {
      const simpleLayer = new VectorLayer({
        id: 'simpleGeomVectorLayer',
        name: 'Simple geometry VectorLayer',
        type: 'geojson',
        data: data,
        popup: true,
        visible: false
      });
      this.layersSvc.addLayer(simpleLayer);
    });

    const layers = [bgLayer];

    for (const layer of layers) {
      this.layersSvc.addLayer(layer, 'Layers');
    }
  }

}
