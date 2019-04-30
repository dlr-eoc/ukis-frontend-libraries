import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DynformsModule } from '@ukis/dynforms/src/public_api';
import { MapOlModule } from '@ukis/map-ol/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DynformsModule, 
    MapOlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
