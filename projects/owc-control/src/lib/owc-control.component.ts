import { Component, OnInit, Input } from '@angular/core';
import { LayersService } from '@ukis/services-layers';
import { Layer } from '@ukis/services-layers';
import { OwcJsonService } from '@ukis/services-owc-json';
import { TGeoExtent, MapState } from '@ukis/services-map-state';
import { MapStateService } from '@ukis/services-map-state';

@Component({
  selector: 'ukis-owc-control',
  templateUrl: "owc-control.component.html",
  styles: []
})
export class OwcControlComponent implements OnInit {

  @Input() layerSvc: LayersService;
  @Input() mapStateSvc: MapStateService;
  private baselayers: Layer[] = [];
  private overlays: Layer[] = [];
  private extent: TGeoExtent;
  private state: MapState;

  constructor(
    private owcSvc: OwcJsonService
  ) { }

  ngOnInit() {
    this.layerSvc.getBaseLayers().subscribe((blays: Layer[]) => {
      this.baselayers = blays;
    });
    this.layerSvc.getOverlays().subscribe((olays: Layer[]) => {
      this.overlays = olays;
    });
    this.mapStateSvc.getExtent().subscribe((extent: TGeoExtent) => {
      this.extent = extent;
    });
    this.mapStateSvc.getMapState().subscribe((state: MapState) => {
      this.state = state;
    });
  }

  onClickExport() {
    let id = "myContext";
    let owc = this.owcSvc.generateOwsContextFrom(id, this.baselayers, this.overlays, this.extent);
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
