import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common"; //for ngClss

import { CookieAlertComponent } from './cookie-alert.component';

@NgModule({
  declarations: [CookieAlertComponent],
  imports: [
    CommonModule
  ],
  exports: [CookieAlertComponent]
})
export class CookieAlertModule { }
