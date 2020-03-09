import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapNavigatorComponent } from './navigator/map-navigator.component';
import { MousePositionComponent } from './mouse-position/mouse-position.component';
import { ProjectionSwitchComponent } from './projection-switch/projection-switch.component';
import { ClarityModule } from '@clr/angular';

@NgModule({
  declarations: [MapNavigatorComponent, MousePositionComponent, ProjectionSwitchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule
  ],
  exports: [MapNavigatorComponent, MousePositionComponent, ProjectionSwitchComponent]
})
export class MapToolsModule { }
