import { HttpClient } from '@angular/common/http';
import { Component, effect, inject, Input, input, signal, } from '@angular/core';
import { MapBrowserEvent } from 'ol';
import { TileWMS } from 'ol/source';
import { Layer } from 'ol/layer';
import { KeyValuePipe } from '@angular/common';
import { ClrSpinnerModule } from '@clr/angular';

@Component({
  imports: [ClrSpinnerModule, KeyValuePipe],
  selector: 'app-raster-feature-info',
  styleUrl: './raster-feature-info.scss',
  templateUrl: './raster-feature-info.html',
})
export class RasterFeatureInfo {

  layer = input<Layer>();
  event = input<MapBrowserEvent<PointerEvent>>();
  dataLoaded = signal(false);
  data = signal<object | undefined>(undefined);

  private http = inject(HttpClient);
  constructor() {
    effect(() => {
      const layer = this.layer();
      if (layer) {
        this.getFeatureInfo(layer);
      }
    });
  }

  private getFeatureInfo(layer: Layer) {
    const event = this.event();
    if (event && layer) {
      const source = layer.getSource() as TileWMS;
      const url = source?.getFeatureInfoUrl(
        event.coordinate,
        event.frameState?.viewState.resolution!,
        event.frameState?.viewState.projection.getCode(),
        { 'INFO_FORMAT': 'application/json' }
      );

      if (url) {
        this.http.get(url).subscribe((data: any) => {
          const properties = data.features[0].properties
          console.log('getting', url, properties)
          this.data.set(properties);
        })
      }
    }
  }
}
