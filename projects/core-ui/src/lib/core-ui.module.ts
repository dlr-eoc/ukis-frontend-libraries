import { NgModule } from '@angular/core';
import { GlobalAlertComponent } from './global-alert/global-alert.component';
import { AlertService } from './global-alert/alert.service';
import { GlobalProgressComponent } from './global-progress/global-progress.component';
import { ProgressService } from './global-progress/progress.service';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ChangedetectorComponent } from './changedetector/changedetector.component';


@NgModule({
  declarations: [GlobalAlertComponent, GlobalProgressComponent, ChangedetectorComponent],
  imports: [CommonModule, ClarityModule],
  exports: [GlobalAlertComponent, GlobalProgressComponent, ChangedetectorComponent],
  providers: [AlertService, ProgressService]
})
export class CoreUiModule { }
