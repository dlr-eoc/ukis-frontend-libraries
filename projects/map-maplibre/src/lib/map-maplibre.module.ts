import { NgModule } from '@angular/core';
import { MapMaplibreComponent } from './map-maplibre.component';
import { CommonModule } from '@angular/common';
import { MapMaplibreService } from './map-maplibre.service';

@NgModule({
  declarations: [
    MapMaplibreComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MapMaplibreComponent
  ],
  providers: [MapMaplibreService]
})
export class MapMaplibreModule { }
