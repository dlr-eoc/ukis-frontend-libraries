import { NgModule } from '@angular/core';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormStringFieldComponent } from './form-string-field/form-string-field.component';
import { FormSelectFieldComponent } from './form-select-field/form-select-field.component';
import { FormBboxFieldComponent } from './form-bbox-field/form-bbox-field.component';
import { ClarityModule } from '@clr/angular';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    FormStringFieldComponent,
    FormSelectFieldComponent, 
    FormBboxFieldComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule
  ],
  exports: [FormComponent]
})
export class DynamicFormsModule { }
