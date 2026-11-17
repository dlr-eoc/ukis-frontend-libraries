import { Component, OnInit, HostBinding, OnDestroy, ChangeDetectionStrategy, signal, inject, DestroyRef, effect } from '@angular/core';
import { LayersService, VectorLayer } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { EocLitemap, EocLiteoverlayTile, WorldReliefBwTile } from '@dlr-eoc/base-layers-raster';
import { MapOlService, IMapControls } from '@dlr-eoc/map-ol';
import { Subscription } from 'rxjs';
import { GeoJSONFeature, GeoJSONFeatureCollection } from 'ol/format/GeoJSON';

import { ClarityIcons, layersIcon, worldIcon, tableIcon } from '@clr/angular/icon';
import { MapOlComponent } from '@dlr-eoc/map-ol';
import { ClrVerticalNavModule, ClrStandaloneCdkTrapFocus, ClrNavigationModule, ClrIcon } from '@clr/angular';
import { LayerControlComponent, BaseLayerControlComponent } from '@dlr-eoc/ngx-ukis-ui-clarity';
ClarityIcons.addIcons(layersIcon, worldIcon, tableIcon);

interface IpopupData {
  headers: string[],
  features: GeoJSONFeature[]
}

@Component({
  imports: [MapOlComponent, ClrVerticalNavModule, ClrStandaloneCdkTrapFocus, ClrNavigationModule, ClrIcon, LayerControlComponent, BaseLayerControlComponent],
  selector: 'app-layout-example',
  styleUrl: './layout-example.scss',
  templateUrl: './layout-example.html',
  host: {
    class: 'content-container'
  }
})
export class LayoutExample {
  controls: IMapControls;


  public geojsonData = signal<GeoJSONFeatureCollection | undefined>(undefined);
  public popupData = signal<IpopupData>({
    headers: [],
    features: []
  });

  showTable = signal(false);
  subs: Subscription[] = [];

  public layersSvc = inject(LayersService);
  public mapStateSvc = inject(MapStateService);
  public mapSvc = inject(MapOlService);
  private destroyRef = inject(DestroyRef);
  constructor() {
    this.controls = {
      attribution: true,
      scaleLine: true
    };

    // old ngOnInit()
    const effectRef = effect(() => {
      this.addBaseLayers();
      this.addLayers();
      this.addOverlays();
      /** set map extent or IMapState (zoom, center...) with the MapStateService */
      this.mapStateSvc.setExtent([-14, 33, 40, 57]);
      this.checkVisibleLayers();

      this.mapSvc.popupEvents.subscribe(evt => {
        if (evt.popupParams.properties) {
          const headers = Object.keys(evt.popupParams.properties);
          const f: any = {
            properties: evt.popupParams.properties
          };
          const features = [f]

          this.popupData.set({ headers, features });
        } else {
          this.popupData.set({ headers: [], features: [] });
        }
      });

      effectRef.destroy();
    }, { manualCleanup: true });


    /**
     * old ngOnDestroy
     */
    this.destroyRef.onDestroy(() => {
      this.subs.forEach(sub => sub.unsubscribe());
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
    this.geojsonData.set({
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
    });

    const vectorLayer = new VectorLayer({
      id: 'geojson_test',
      name: 'GeoJSON Vector Layer',
      type: 'geojson',
      data: this.geojsonData(),
      visible: false,
      popup: [
        {
          event: 'click',
          asObservable: true
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
            this.showTable.set(true);
          } else if (layer.id === 'geojson_test' && layer.visible === false) {
            this.showTable.set(false);
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
}
