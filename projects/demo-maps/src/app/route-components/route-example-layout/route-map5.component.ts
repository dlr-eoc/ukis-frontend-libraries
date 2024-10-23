import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { LayersService, VectorLayer } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { EocLitemap, EocLiteoverlayTile, WorldReliefBwTile } from '@dlr-eoc/base-layers-raster';
import { MapOlService, IMapControls } from '@dlr-eoc/map-ol';
import { Subscription } from 'rxjs';
import { GeoJSONFeature, GeoJSONFeatureCollection } from 'ol/format/GeoJSON';

import { ClarityIcons, layersIcon, worldIcon, tableIcon } from '@cds/core/icon';
import { NgStyle, NgClass } from '@angular/common';
import { MapOlComponent } from '@dlr-eoc/map-ol';
import { ClrVerticalNavModule, ClrStandaloneCdkTrapFocus, ClrNavigationModule, ClrIconModule } from '@clr/angular';
import { LayerControlComponent, BaseLayerControlComponent } from '@dlr-eoc/layer-control';
ClarityIcons.addIcons(...[layersIcon, worldIcon, tableIcon]);

@Component({
    selector: 'app-route-map5',
    templateUrl: './route-map5.component.html',
    styleUrls: ['./route-map5.component.scss'],
    /** use differnt instances of the services only for testing with diffenr routs  */
    providers: [LayersService, MapStateService, MapOlService],
    standalone: true,
    imports: [NgStyle, MapOlComponent, ClrVerticalNavModule, ClrStandaloneCdkTrapFocus, ClrNavigationModule, ClrIconModule, LayerControlComponent, BaseLayerControlComponent, NgClass]
})
export class RouteMap5Component implements OnInit, OnDestroy {
  @HostBinding('class') class = 'content-container';
  controls: IMapControls;


  public geojsonData: GeoJSONFeatureCollection;
  public popupData: {
    headers: string[],
    features: GeoJSONFeature[]
  } = {
      headers: [],
      features: []
    };

  showTable = false;
  subs: Subscription[] = [];
  constructor(
    public layersSvc: LayersService,
    public mapStateSvc: MapStateService,
    public mapSvc: MapOlService) {

    this.controls = {
      attribution: true,
      scaleLine: true
    };
  }


  ngOnInit(): void {
    this.addBaseLayers();
    this.addLayers();
    this.addOverlays();
    /** set map extent or IMapState (zoom, center...) with the MapStateService */
    this.mapStateSvc.setExtent([-14, 33, 40, 57]);
    this.checkVisibleLayers();

    this.mapSvc.popupEvents.subscribe(evt => {
      if (evt.popupParams.properties) {
        this.popupData.headers = Object.keys(evt.popupParams.properties);
        const f: any = {
          properties: evt.popupParams.properties
        }
        this.popupData.features = [f];
      } else {
        this.popupData.features = [];
      }
    });
  }

  addBaseLayers() {
    const eocLitemapLayer = new EocLitemap({
      visible: true
    });

    // not working in WGS84
    const worldRelief = new WorldReliefBwTile();

    const layers = [eocLitemapLayer, worldRelief];

    /** add layers with the LayersService */
    layers.map(layer => this.layersSvc.addLayer(layer, 'Baselayers'));
  }

  addLayers() {
    this.geojsonData = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: { title: 'Polygon', foo: '1', bar: 'test', baz: '555' },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [
                  11.53564453125,
                  48.80686346108517
                ],
                [
                  11.42578125,
                  48.61838518688487
                ],
                [
                  11.97509765625,
                  48.516604348867475
                ],
                [
                  12.2607421875,
                  48.69096039092549
                ],
                [
                  12.0849609375,
                  48.99463598353405
                ],
                [
                  11.53564453125,
                  48.80686346108517
                ]
              ]
            ]
          }
        },
        {
          type: 'Feature',
          properties: { title: 'Rectangle', foo: '2', bar: 'test2', baz: '66667' },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [
                  10.986328125,
                  43.89789239125797
                ],
                [
                  11.755371093749998,
                  43.89789239125797
                ],
                [
                  11.755371093749998,
                  44.41808794374846
                ],
                [
                  10.986328125,
                  44.41808794374846
                ],
                [
                  10.986328125,
                  43.89789239125797
                ]
              ]
            ]
          }
        },
        {
          type: 'Feature',
          properties: { title: 'Line', foo: '3', bar: 'test3', baz: '111' },
          geometry: {
            type: 'LineString',
            coordinates: [
              [
                13.29345703125,
                48.268569112964336
              ],
              [
                15.073242187499998,
                47.56170075451973
              ],
              [
                14.1064453125,
                46.40756396630067
              ],
              [
                15.886230468750002,
                44.94924926661153
              ]
            ]
          }
        },
        {
          type: 'Feature',
          properties: { title: 'Point', foo: '4', bar: 'test4', baz: '444' },
          geometry: {
            type: 'Point',
            coordinates: [
              11.513671874999998,
              46.42271253466717
            ]
          }
        }
      ]
    };

    const vectorLayer = new VectorLayer({
      id: 'geojson_test',
      name: 'GeoJSON Vector Layer',
      type: 'geojson',
      data: this.geojsonData,
      visible: false,
      popup: [
        {
          event: 'click',
          asObservable:true
        },
        {
          event: 'move'
        }
      ]
    });

    this.layersSvc.addLayer(vectorLayer, 'Layers');
  }

  checkVisibleLayers() {
    const sub = this.layersSvc.getLayers().subscribe((layers) => {
      layers.map((layer) => {
        if (layer) {
          if (layer.id === 'geojson_test' && layer.visible === true) {
            this.showTable = true;
          } else if (layer.id === 'geojson_test' && layer.visible === false) {
            this.showTable = false;
          }
        }
      });
    });
    this.subs.push(sub);
  }

  addOverlays() {
    const onTopp = new EocLiteoverlayTile();
    this.layersSvc.addLayer(onTopp, 'Overlays');
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
