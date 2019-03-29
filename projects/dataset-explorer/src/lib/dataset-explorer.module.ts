import { NgModule } from '@angular/core';
import { DatasetExplorerComponent } from './dataset-explorer.component';
import { DatasetExplorerService } from './dataset-explorer.service';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { DateRangeComponent } from './date-range/date-range.component'

@NgModule({
  declarations: [DatasetExplorerComponent, DateRangeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  exports: [DatasetExplorerComponent, DateRangeComponent],
  providers: [DatasetExplorerService]
})
export class DatasetExplorerModule { }
