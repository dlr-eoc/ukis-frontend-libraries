import { NgModule } from '@angular/core';
import { CoreUiComponent } from './core-ui.component';
import { GlobalAlertComponent } from './global-alert/global-alert.component';
import { AlertService } from './global-alert/alert.service';



@NgModule({
  declarations: [CoreUiComponent, GlobalAlertComponent],
  imports: [],
  exports: [CoreUiComponent, GlobalAlertComponent],
  providers: [AlertService]
})
export class CoreUiModule { }
