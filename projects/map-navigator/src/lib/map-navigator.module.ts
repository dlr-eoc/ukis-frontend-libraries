import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { MapNavigatorComponent } from './map-navigator.component';

@NgModule({
  declarations: [MapNavigatorComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [MapNavigatorComponent]
})
export class MapNavigatorModule { }
