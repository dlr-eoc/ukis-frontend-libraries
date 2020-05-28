import { NgModule } from '@angular/core';
import { GlobalAlertComponent } from './global-alert/global-alert.component';
import { AlertService } from './global-alert/alert.service';
import { GlobalProgressComponent } from './global-progress/global-progress.component';
import { ProgressService } from './global-progress/progress.service';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { HeaderComponent } from './header/header.component';
import { ViewRefDirective, DynamicComponentComponent } from './dynamic-component/dynamic-component.component';


@NgModule({
  declarations: [GlobalAlertComponent, GlobalProgressComponent, HeaderComponent, ViewRefDirective, DynamicComponentComponent],
  imports: [CommonModule, ClarityModule],
  exports: [GlobalAlertComponent, GlobalProgressComponent, HeaderComponent, ViewRefDirective, DynamicComponentComponent],
  providers: [AlertService, ProgressService]
})
export class CoreUiModule { }
