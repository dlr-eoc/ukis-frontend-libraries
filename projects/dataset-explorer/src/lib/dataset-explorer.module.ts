import { NgModule } from '@angular/core';
import { DatasetExplorerComponent } from './dataset-explorer.component';
import { DatasetExplorerService } from './dataset-explorer.service';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [DatasetExplorerComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ClarityModule,
    BrowserAnimationsModule
  ],
  exports: [DatasetExplorerComponent],
  providers: [DatasetExplorerService]
})
export class DatasetExplorerModule { }
