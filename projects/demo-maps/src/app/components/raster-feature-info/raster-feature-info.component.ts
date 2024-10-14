import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MapBrowserEvent } from 'ol';
import { Layer } from 'ol/layer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgIf, NgFor, AsyncPipe, KeyValuePipe } from '@angular/common';
import { ClrSpinnerModule } from '@clr/angular';

@Component({
    selector: 'app-raster-feature-info',
    templateUrl: './raster-feature-info.component.html',
    styleUrls: ['./raster-feature-info.component.scss'],
    standalone: true,
    imports: [NgIf, NgFor, ClrSpinnerModule, AsyncPipe, KeyValuePipe]
})
export class RasterFeatureInfoComponent implements OnInit {

  @Input() layer: Layer<any>;
  @Input() event: MapBrowserEvent<any>;
  public data$: Observable<object>;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.data$ = this.getFeatureInfo().pipe(map(
      (data: any) => data.features[0].properties
    ));
  }

  private getFeatureInfo() {
    const url = this.layer.getSource().getFeatureInfoUrl(
      this.event.coordinate,
      this.event.frameState.viewState.resolution,
      this.event.frameState.viewState.projection.getCode(),
      { 'INFO_FORMAT': 'application/json' }
    );
    console.log('getting', url)
    return this.http.get(url);
  }

}
