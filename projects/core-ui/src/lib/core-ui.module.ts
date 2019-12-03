import { NgModule } from '@angular/core';
import { CoreUiComponent } from './core-ui.component';
import { GlobalAlertComponent } from './global-alert/global-alert.component';
import { AlertService } from './global-alert/alert.service';
import { GlobalProgressComponent } from './global-progress/global-progress.component';
import { ProgressService } from './global-progress/progress.service';
import { UkisShapes } from './icons/ukis';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';


@NgModule({
  declarations: [CoreUiComponent, GlobalAlertComponent, GlobalProgressComponent],
  imports: [CommonModule, ClarityModule],
  exports: [CoreUiComponent, GlobalAlertComponent, GlobalProgressComponent ],
  providers: [AlertService, ProgressService]
})
export class CoreUiModule { }
