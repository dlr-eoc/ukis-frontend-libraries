import { NgModule } from '@angular/core';

import { CommonModule } from "@angular/common"
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';

import { LayerControlComponent } from './layer-control/layer-control.component';
import { LayerentryComponent } from './layerentry/layerentry.component';
import { LayerentryGroupComponent } from './layerentry-group/layerentry-group.component';
import { ObjTypePipe } from './obj-type.pipe';
import { ReversePipe } from './array-reverse.pipe';
import { reverseForOf } from './revers-loop.directive';


import {DragDropModule} from '@angular/cdk/drag-drop';
import { BaseLayerControlComponent } from './base-layer-control/base-layer-control.component';



@NgModule({
  declarations: [LayerControlComponent, LayerentryComponent, LayerentryGroupComponent, ObjTypePipe, ReversePipe, reverseForOf, BaseLayerControlComponent],
  imports: [CommonModule, ClarityModule, FormsModule, DragDropModule],
  exports: [LayerControlComponent, LayerentryComponent, LayerentryGroupComponent, ObjTypePipe, ReversePipe, reverseForOf, BaseLayerControlComponent],
})
export class LayerControlModule { }
