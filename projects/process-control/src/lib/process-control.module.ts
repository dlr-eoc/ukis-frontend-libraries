import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { DynformsModule } from '@ukis/dynforms';
import { ProcessWizardComponent } from './process-wizard/process-wizard.component';
import { WizardElementComponent } from './wizard-element/wizard-element.component';

@NgModule({
  declarations: [ProcessWizardComponent, WizardElementComponent],
  imports: [
    CommonModule,
    ClarityModule,
    DynformsModule
  ],
  exports: [ProcessWizardComponent, WizardElementComponent]
})
export class ProcessControlModule { }
