import { NgModule } from '@angular/core';
import { CoreUiComponent } from './core-ui.component';
import { GlobalAlertComponent } from './global-alert/global-alert.component';
import { AlertService } from './global-alert/alert.service';
import { GlobalProgressComponent } from './global-progress/global-progress.component';
import { ProgressService } from './global-progress/progress.service';
import { UkisShapes } from './icons/ukis';


@NgModule({
  declarations: [CoreUiComponent, GlobalAlertComponent, GlobalProgressComponent],
  imports: [],
  exports: [CoreUiComponent, GlobalAlertComponent, GlobalProgressComponent, UkisShapes],
  providers: [AlertService, ProgressService]
})
export class CoreUiModule { }
