import { NgModule } from '@angular/core';
import { WpsConfigurationComponent } from './wps-configuration.component';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [WpsConfigurationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule
  ],
  exports: [WpsConfigurationComponent]
})
export class WpsConfigurationModule { }
