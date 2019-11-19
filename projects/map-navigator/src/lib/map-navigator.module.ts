import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapNavigatorComponent } from './navigator/map-navigator.component';
import { MousePositionComponent } from './mouse-position/mouse-position.component';

@NgModule({
  declarations: [MapNavigatorComponent, MousePositionComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [MapNavigatorComponent, MousePositionComponent]
})
export class MapNavigatorModule { }
