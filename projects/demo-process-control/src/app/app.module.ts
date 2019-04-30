import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProcessControlModule } from '@ukis/process-control/src/public_api';
import { MapOlModule } from '@ukis/map-ol/src/public_api';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynformsModule } from '@ukis/dynforms/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    ProcessControlModule,
    MapOlModule,
    DynformsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
