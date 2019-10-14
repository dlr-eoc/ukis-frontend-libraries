import { NgModule } from '@angular/core';
import { OwcJsonService } from './owc/owc-json.service';
import { WmtsClientService } from './wmts/wmtsclient.service';
import { WpsClient } from './wps/wpsclient';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [OwcJsonService, WmtsClientService, WpsClient]
})
export class ServicesOgcModule { }
