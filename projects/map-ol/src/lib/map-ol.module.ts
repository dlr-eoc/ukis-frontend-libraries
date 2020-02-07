import { NgModule } from '@angular/core';
import { MapOlComponent } from './map-ol.component';
import { MapOlService } from './map-ol.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MapOlComponent],
  imports: [
    CommonModule
  ],
  exports: [MapOlComponent],
  providers: [MapOlService]
})
export class MapOlModule { }
