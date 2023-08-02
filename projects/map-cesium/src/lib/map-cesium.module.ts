import { NgModule } from '@angular/core';
import { MapCesiumComponent } from './map-cesium.component';
import { CommonModule } from '@angular/common';
import { MapCesiumService } from './map-cesium.service';



@NgModule({
  declarations: [
    MapCesiumComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MapCesiumComponent
  ],
  providers: [MapCesiumService]
})
export class MapCesiumModule { }