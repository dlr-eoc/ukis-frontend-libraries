import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LayersService } from '@dlr-eoc/services-layers';
import { Layer } from '@dlr-eoc/services-layers';
import { TGeoExtent, MapState } from '@dlr-eoc/services-map-state';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { Subscription } from 'rxjs';
import { OwcJsonService } from '@dlr-eoc/services-ogc';

@Component({
  selector: 'ukis-owc-control',
  templateUrl: "owc-control.component.html",
  styles: []
})
export class OwcControlComponent implements OnInit, OnDestroy {

  @Input() layerSvc: LayersService;
  @Input() mapStateSvc: MapStateService;
  private baselayers: Layer[] = [];
  private overlays: Layer[] = [];
  private layers: Layer[] = [];
  private extent: TGeoExtent;
  private state: MapState;
  private sub: Subscription[] = [];

  constructor(
    private owcSvc: OwcJsonService
  ) { }

  ngOnInit() {
    this.sub.push(this.layerSvc.getBaseLayers().subscribe((blays: Layer[]) => {
      this.baselayers = blays;
    }));
    this.sub.push(this.layerSvc.getOverlays().subscribe((olays: Layer[]) => {
      this.overlays = olays;
    }));
    this.layerSvc.getLayers().subscribe((llays: Layer[]) => {
      this.layers = llays;
    });
    this.sub.push(this.mapStateSvc.getExtent().subscribe((extent: TGeoExtent) => {
      this.extent = extent;
    }));
    this.sub.push(this.mapStateSvc.getMapState().subscribe((state: MapState) => {
      this.state = state;
    }));
  }

  ngOnDestroy() {
    this.sub.map(sub => sub.unsubscribe());
  }

  onClickExport() {
    let id = "myContext";
    let owc = this.owcSvc.generateOwsContextFrom(id, [...this.baselayers, ...this.overlays, ...this.layers], this.extent);
    this.downloadFile(owc, `${id}.json`);
  }

  private downloadFile(data, fileName: string) {
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: 'text/json;charset=utf-8;' });

    //window.open(url) doesn't work here. Instead, we create a temporary link item and simulate a click on it.
    const url = window.URL.createObjectURL(blob);

    var a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = "none";
    a.href = url;
    a.download = fileName;
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }


}
