import { Component, OnInit, Input } from '@angular/core';
import { LayersService } from '@ukis/services-layers/src/public_api';
import { Observable } from 'rxjs';
import { Layer } from '@ukis/datatypes-layers/src/lib/Layers';
import { OwcJsonService } from '@ukis/services-owc-json/src/lib/owc-json.service';
import { IOwsContext } from '@ukis/datatypes-owc-json/src/public_api';

@Component({
  selector: 'ukis-owc-control',
  templateUrl: "owc-control.component.html",
  styles: []
})
export class OwcControlComponent implements OnInit {

  @Input() layerSvc: LayersService;
  private baselayers: Layer[] = [];
  private overlays: Layer[] = [];

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
  }

  onClickExport() {
    let owc = this.owcSvc.generateOwsContextFrom("sampleId", this.baselayers, this.overlays);
    console.log(owc);
    //this.downloadFile(owc);
  }

  private downloadFile(data) {
    const blob = new Blob([data], { type: 'text/json' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }


}
