import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';

import { LayerControlComponent } from './layer-control/layer-control.component';
import { LayerentryComponent } from './layerentry/layerentry.component';
import { LayerentryGroupComponent } from './layerentry-group/layerentry-group.component';
import { ObjTypePipe, ItemsFilterPipe } from './utils/obj-type.pipe';
import { ReversePipe } from './utils/array-reverse.pipe';


import { DragDropModule } from '@angular/cdk/drag-drop';
import { BaseLayerControlComponent } from './base-layer-control/base-layer-control.component';
import { CoreUiModule } from '@dlr-eoc/core-ui';


@NgModule({
  declarations: [LayerControlComponent, LayerentryComponent, LayerentryGroupComponent, ObjTypePipe, ItemsFilterPipe, ReversePipe, BaseLayerControlComponent],
  imports: [CommonModule, ClarityModule, FormsModule, DragDropModule, CoreUiModule],
  exports: [LayerControlComponent, LayerentryComponent, LayerentryGroupComponent, ObjTypePipe, ItemsFilterPipe, ReversePipe, BaseLayerControlComponent],
})
export class LayerControlModule { }
