import { NgModule } from '@angular/core';
import { ObservationExplorerComponent } from './observation-explorer.component';
import { ObservationExplorerService } from './observation-explorer.service';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [ObservationExplorerComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ClarityModule,
    BrowserAnimationsModule
  ],
  exports: [ObservationExplorerComponent],
  providers: [ObservationExplorerService]
})
export class ObservationExplorerModule { }
