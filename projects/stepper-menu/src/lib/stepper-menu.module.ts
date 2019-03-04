import { NgModule } from '@angular/core';
import { StepperMenuComponent } from './stepper-menu/stepper-menu.component';
import { StepperElementComponent } from './stepper-element/stepper-element.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    StepperMenuComponent, 
    StepperElementComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StepperMenuComponent, 
    StepperElementComponent
  ]
})
export class StepperMenuModule { }
