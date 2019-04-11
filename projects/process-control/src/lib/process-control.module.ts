import { NgModule } from '@angular/core';
import { DynamicFormsModule } from 'projects/dynamic-forms/src/public-api';
import { ProcessWizardComponent } from './process-wizard/process-wizard.component';
import { WizardElementComponent } from './wizard-element/wizard-element.component';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';

@NgModule({
  declarations: [ProcessWizardComponent, WizardElementComponent],
  imports: [
    CommonModule,
    ClarityModule,
    DynamicFormsModule
  ],
  exports: [ProcessWizardComponent, WizardElementComponent]
})
export class ProcessControlModule { }
