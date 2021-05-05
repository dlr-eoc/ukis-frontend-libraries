import { NgModule } from '@angular/core';
import { WmtsClientService } from './wmts/wmtsclient.service';
import { WmsService } from './wms/wmsclient.service';
import { WpsClient } from './wps/wpsclient';
import { OwcJsonService } from './owc/owc-json.service';


@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [WmtsClientService, WmsService, OwcJsonService, WpsClient]
})
export class ServicesOgcModule { }
